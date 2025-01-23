import { CircSolid, Projectile, RectSolid } from '@/entities/snap/entities';
import BaseScene from '@/scenes/BaseScene';
import { FONT_KUMBH_SANS } from '@/utils/Constants';
import { Collision, default as SnapPhysics } from '@dill-pixel/plugin-snap-physics';
import { bool, Container } from 'dill-pixel';
import { FederatedPointerEvent, Point, Pool, Text } from 'pixi.js';

export const id = 'snap-projectiles';
export const debug = {
  group: 'Physics',
  label: 'Snap - Projectiles',
  order: 2,
};

export const plugins = ['snap-physics'];

class Ball extends Projectile {
  type = 'Ball';
  private readonly BOUNCE_ENERGY_LOSS = 0.3; // Higher value = more energy loss per bounce
  private readonly GRAVITY = 1000; // Pixels per second squared (roughly like real gravity)

  fixedUpdate(deltaTime: number) {
    super.fixedUpdate(deltaTime);
    // Apply gravity acceleration
    this.velocity.y += this.GRAVITY * deltaTime;
  }

  // Override the reflect method for better bouncing
  reflect(collision: Collision) {
    super.reflect(collision, this.BOUNCE_ENERGY_LOSS);

    // Add a minimum velocity threshold to eventually stop bouncing
    if (Math.abs(this.velocity.y) < 100 && collision.bottom) {
      this.velocity.y = 0;
    }
  }
}

class Bullet extends Projectile {
  type = 'Bullet';
  private readonly BOUNCE_ENERGY_LOSS = 0.2; // Less energy loss for bullets
  private readonly MIN_SPEED = 500; // Minimum speed threshold
  private readonly COLLISION_BOOST = 1; // Increased boost to ensure separation
  private readonly SEPARATION_BOOST = 2; // Additional separation on collision

  reflect(collision: Collision) {
    // First, apply immediate separation in the direction of the collision normal
    if (collision.overlap) {
      // Move away from the collision point
      const dx = this.x - collision.overlap.x;
      const dy = this.y - collision.overlap.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 0) {
        const separationX = (dx / dist) * this.SEPARATION_BOOST;
        const separationY = (dy / dist) * this.SEPARATION_BOOST;
        this.x += separationX;
        this.y += separationY;
      }
    }

    // Call parent reflect with energy loss
    super.reflect(collision, this.BOUNCE_ENERGY_LOSS);

    // Calculate new speed
    const newSpeed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);

    // Apply minimum speed and collision boost
    const targetSpeed = Math.max(this.MIN_SPEED, newSpeed * this.COLLISION_BOOST);

    const currentSpeed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);

    if (currentSpeed > 0) {
      const speedScale = targetSpeed / currentSpeed;
      this.velocity.x *= speedScale;
      this.velocity.y *= speedScale;
    }
  }
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
    return this.app.getPlugin('snap-physics') as unknown as SnapPhysics;
  }

  update() {
    this.countText.text = `Balls: ${this._balls.length}\nBullets: ${this._bullets.length}`;
  }

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

    this.physics.system.initialize({
      gravity: 9.8,
      container: this.level,
      debug: this.config.debug,
      useSpatialHashGrid: this.config.useSpatialHash,
      cellSize: this.config.gridCellSize,
      collisionResolver: this._resolveCollision,
      boundary: {
        padding: -5,
        thickness: 10,
        height: this.app.size.height,
        width: this.app.size.width,
      },
    });

    this.physics.system.enabled = true;

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

    this.eventMode = 'static';
    this.on('pointerup', this._handlePointerUp);

    this.addSignalConnection(
      this.app.actions('toggle_pause').connect(() => {
        this.physics.system.enabled = this.app.paused ? false : true;
      }),
    );
  }

  _handlePointerUp(e: FederatedPointerEvent) {
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
    const b = this.ballPool.get({ color: 0x000fff, radius: Math.random() * 20 + 10 });
    const dirX = bool() ? -1 : 1;
    // Initial velocity for a good bounce height
    b.velocity.set(Math.random() * 500 * dirX, -50);
    this.level.add.existing(b, {
      position: pos,
    });
    this._balls.push(b);
  }

  _addBullet(pos: Point) {
    const b = this.bulletPool.get({ color: 0xff0000, radius: 5 });
    const dirX = bool() ? -1 : 1;
    const dirY = bool() ? -1 : 1;
    b.velocity.set((Math.random() * 250 + 250) * dirX, (Math.random() * 250 + 250) * dirY);

    this.level.add.existing(b, {
      position: pos,
    });
    this._bullets.push(b);
  }

  destroy() {
    this.off('pointerup', this._handlePointerUp);
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
      const b: Projectile = collision.entity1 as Ball;
      b.reflect(collision); // Energy loss is now handled in Ball's reflect method
    }
    return true;
  }
}
