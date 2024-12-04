import { BasicActor, CircActor, CircSolid, Projectile, RectActor, RectSolid } from '@/entities/snap/entities';
import { BaseScene } from '@/scenes/BaseScene';
import { Collision, default as SnapPhysics } from '@dill-pixel/plugin-snap-physics';
import { Container } from 'dill-pixel';

export class SnapCollisionsScene extends BaseScene {
  title = 'Snap Circle Collisions';
  subtitle =
    'Click a blue shape actor to activate it, then use the arrows to move it.\nActors will collide with the green solids, not with each other.';
  level: Container;

  protected config = {
    useSpatialHash: true,
    gridCellSize: 300,
    debug: true,
  };
  // private debugGfx: Graphics;
  private actors: BasicActor[] = [];

  protected get physics(): SnapPhysics {
    return this.app.getPlugin('physics') as unknown as SnapPhysics;
  }

  configureGUI() {
    this.gui;
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
    this.app.actionContext = 'game';
    this.app.focus.addFocusLayer(this.id);

    this.level = this.add.container({
      position: [-this.app.size.width * 0.5, -this.app.size.height * 0.5],
      label: 'Level',
    });

    // this.debugGfx = this.level.add.graphics();

    this.app.ticker.maxFPS = 60;
    this.physics.system.initialize({
      gravity: 10,
      container: this.level,
      debug: this.config.debug,
      useSpatialHashGrid: this.config.useSpatialHash,
      cellSize: this.config.gridCellSize,
      fps: 60,
      collisionResolver: this._resolveCollision,
      boundary: {
        padding: 10,
        thickness: 10,
        height: this.app.size.height,
        width: this.app.size.width,
      },
    });
    this.physics.system.enabled = true;

    // actors
    let actor: BasicActor = this.level.add.existing(
      new CircActor({
        radius: 50,
      }),
      { position: [this.app.size.width * 0.5 - 100, this.app.size.height * 0.5 - 150] },
    );
    this.actors.push(actor);

    actor = this.level.add.existing(new RectActor({}), {
      position: [this.app.size.width * 0.5 - 100, this.app.size.height * 0.5 + 150],
    });
    this.actors.push(actor);

    // solids
    this.level.add.existing(
      new RectSolid({
        size: { width: 150, height: 100 },
      }),
      { position: [this.app.size.width * 0.5 + 100, this.app.size.height * 0.5 - 150] },
    );
    this.level.add.existing(new CircSolid({ radius: 60 }), {
      position: [this.app.size.width * 0.5 + 100, this.app.size.height * 0.5 + 150],
    });

    this.addSignalConnection(BasicActor.onActivated.connect(this._handleBasicActorActivated));
  }

  destroy() {
    this.app.ticker.maxFPS = 0;
    this.physics.destroy();
    this.level.removeChildren();
    super.destroy();
  }

  protected _handleDebugChanged() {
    const { debug } = this.config;
    this.physics.system.debug = debug;
  }

  private _handleBasicActorActivated(actor: BasicActor) {
    this.actors.forEach((a) => {
      if (actor !== a) {
        a.active = false;
      }
    });
  }

  private _handleSpatialHashChanged() {
    this.physics.useSpatialHashGrid = this.config.useSpatialHash;
  }

  private _handleGridCellSizeChange() {
    this.physics.gridCellSize = this.config.gridCellSize;
  }

  private _resolveCollision(collision: Collision): boolean {
    if (collision.type === 'Bullet|CircSolid') {
      return false;
    }
    if (collision.type.includes('Bullet')) {
      // find the bullet;
      const b: Projectile =
        collision.entity1.type === 'Bullet' ? (collision.entity1 as Projectile) : (collision.entity2 as Projectile);

      b.reflect(collision);
    }
    return true;
  }
}
