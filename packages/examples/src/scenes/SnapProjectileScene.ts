import { CircSolid, Projectile, RectSolid } from '@/entities/snap/entities';
import BaseScene from '@/scenes/BaseScene';
import { FONT_KUMBH_SANS } from '@/utils/Constants';
import { Collision, default as SnapPhysics } from '@dill-pixel/plugin-snap-physics';
import { Container } from 'dill-pixel';
import { FederatedPointerEvent, Point, Pool, Text } from 'pixi.js';

export const id = 'snap-projectiles';
export const debug = {
  group: 'Physics',
  label: 'Snap - Projectiles',
};

export const plugins = ['physics'];

class Ball extends Projectile {
  type = 'Ball';

  update(deltaTime: number) {
    super.update(deltaTime);
    if (this.velocity.y < this.system.gravity) {
      this.velocity.y += this.velocity.y < 0 ? 1 : 0.5;
      this.velocity.y = Math.min(this.system.gravity, this.velocity.y);
    }
  }
}

class Bullet extends Projectile {
  type = 'Bullet';
}

export default class SnapProjectileScene extends BaseScene {
  title = 'Snap Projectiles';
  subtitle = 'Change the projectile mode in settings, then, click anywhere to add projectiles';
  level: Container;
  countText: Text;

  protected config = {
    mode: 'ball',
    numToAdd: 10,
    useSpatialHash: true,
    gridCellSize: 200,
    debug: true,
  };

  private _mode: 'ball' | 'bullet' = 'ball';

  private bulletPool: Pool<Bullet> = new Pool<Bullet>(Bullet, 1000);
  private ballPool: Pool<Ball> = new Pool<Ball>(Ball, 1000);

  private _balls: Projectile[] = [];
  private _bullets: Projectile[] = [];
  private _obstacles: (CircSolid | RectSolid)[] = [];
  private obstacleRect: RectSolid;
  private obstacleCirc: CircSolid;

  protected get physics(): SnapPhysics {
    return this.app.getPlugin('physics') as unknown as SnapPhysics;
  }

  update() {
    this.countText.text = `Balls: ${this._balls.length}\nBullets: ${this._bullets.length}`;
  }

  physicsUpdate() {}

  configureGUI() {
    this.gui
      .add(this.config, 'mode', ['ball', 'bullet'])
      .name('Mode')
      .onChange(() => {
        this._mode = this.config.mode as 'ball' | 'bullet';
      });

    this.gui.add(this.config, 'numToAdd', 1, 50, 1).name('Projectiles to add');
    const spatialHashFolder = this.gui.addFolder('Spatial Hash Collisions');
    spatialHashFolder.open();

    spatialHashFolder
      .add(this.config, 'useSpatialHash')
      .onChange(() => {
        this._handleSpatialHashChanged();
      })
      .name('Active');

    spatialHashFolder
      .add(this.config, 'gridCellSize', 50, 800, 50)
      .onChange(() => {
        this._handleGridCellSizeChange();
      })
      .name('Cell Size');

    this.gui
      .add(this.config, 'debug')
      .onChange(() => {
        this._handleDebugChanged();
      })
      .name('Debug Physics');
  }

  async initialize() {
    await super.initialize();
    this.app.exec.setActionContext('game');
    this.app.focus.addFocusLayer(this.id);

    this.level = this.add.container({
      position: [-this.app.size.width * 0.5, -this.app.size.height * 0.5],
      label: 'Level',
    });

    this.countText = this.add.text({
      style: { fontFamily: FONT_KUMBH_SANS, fill: 'white', fontSize: 18 },
      x: -this.app.size.width * 0.5 + 30,
      y: -this.app.size.height * 0.5 + 120,
      text: `Balls: ${this._balls.length}`,
    });

    // this.debugGfx = this.level.add.graphics();

    this.app.ticker.maxFPS = 60;
    this.physics.system.initialize({
      gravity: 30,
      container: this.level,
      debug: this.config.debug,
      useSpatialHashGrid: this.config.useSpatialHash,
      cellSize: this.config.gridCellSize,
      fps: 60,
      collisionResolver: this._resolveCollision,
      boundary: {
        padding: -5,
        thickness: 10,
        height: this.app.size.height,
        width: this.app.size.width,
      },
    });
    this.physics.system.postUpdateHooks.add(this.physicsUpdate);
    this.physics.system.enabled = true;

    // solids
    this.obstacleRect = this.level.add.existing(
      new RectSolid({
        size: { width: 400, height: 32 },
      }),
      { position: [this.app.size.width * 0.5 + 200, this.app.size.height * 0.5 + 150] },
    );

    this._obstacles.push(this.obstacleRect);

    this.obstacleCirc = this.level.add.existing(new CircSolid({ radius: 40 }), {
      position: [this.app.size.width * 0.5 - 150, this.app.size.height * 0.5],
    });

    this._obstacles.push(this.obstacleCirc);

    this.obstacleRect.animatePosition(this.obstacleRect.x, this.obstacleRect.y + 200, {
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'none',
    });
    //
    // this.obstacleCirc.animatePosition(this.obstacleCirc.x + 300, this.obstacleCirc.y, {
    //   duration: 3,
    //   repeat: -1,
    //   yoyo: true,
    //   ease: 'none',
    // });

    this.eventMode = 'static';
    this.on('pointerup', this._handlePointerUp);
  }

  _handlePointerUp(e: FederatedPointerEvent) {
    // localize the position to level
    const pt = this.level.toLocal(e.global);
    let avail = true;
    for (let i = 0; i < this._obstacles.length; i++) {
      const rect = this._obstacles[i].boundingRect.clone();
      rect.width += 100;
      rect.height += 100;
      rect.x -= 50;
      rect.y -= 50;
      if (rect.contains(pt.x, pt.y)) {
        avail = false;
        break;
      }
    }
    if (!avail) {
      return;
    }

    switch (this._mode) {
      case 'ball':
        for (let i = 0; i < this.config.numToAdd; i++) {
          this._addBall(pt);
        }
        break;
      case 'bullet':
        for (let i = 0; i < this.config.numToAdd; i++) {
          this._addBullet(pt);
        }
        break;
    }
  }

  _addBall(pos: Point) {
    const b = this.ballPool.get({ color: 0x000fff, radius: 20 });
    const dirX = Math.random() > 0.5 ? -1 : 1;
    b.velocity.set(Math.random() * 5 * dirX, this.physics.system.gravity);
    // b.velocity.set(0, 2);
    this.level.add.existing(b, {
      position: pos,
    });
    this._balls.push(b);
  }

  _addBullet(pos: Point) {
    // const b = new Bullet({ color: 0xff0000, radius: 5 });
    const b = this.bulletPool.get({ color: 0xff0000, radius: 5 });
    const dirX = Math.random() > 0.5 ? -1 : 1;
    const dirY = Math.random() > 0.5 ? -1 : 1;
    b.velocity.set((Math.random() * 10 + 5) * dirX, (Math.random() * 10 + 5) * dirY);

    this.level.add.existing(b, {
      position: pos,
    });
    this._bullets.push(b);
  }

  destroy() {
    this.off('pointerup', this._handlePointerUp);
    this.app.ticker.maxFPS = 0;
    this.physics.destroy();
    this.level.removeChildren();
    super.destroy();
  }

  protected _handleDebugChanged() {
    const { debug } = this.config;
    this.physics.system.debug = debug;
  }

  private _handleSpatialHashChanged() {
    this.physics.useSpatialHashGrid = this.config.useSpatialHash;
  }

  private _handleGridCellSizeChange() {
    this.physics.gridCellSize = this.config.gridCellSize;
  }

  private _resolveCollision(collision: Collision): boolean {
    if (collision.type.includes('Bullet')) {
      const b: Projectile = collision.entity1 as Bullet;
      b.reflect(collision);
    } else if (collision.type.includes('Ball')) {
      // find the ball;
      const b: Projectile = collision.entity1 as Ball;
      b.reflect(collision, 0.1);
    }
    return true;
  }
}
