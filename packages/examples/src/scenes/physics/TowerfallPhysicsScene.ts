import BaseScene from '@/scenes/BaseScene';
import { V8Application } from '@/V8Application';
import TowerfallPhysicsPlugin, { Actor, CollisionResult, Solid } from '@dill-pixel/plugin-towerfall-physics';
import { ActionDetail, Container } from 'dill-pixel';
import gsap from 'gsap';
import { FederatedPointerEvent, Graphics, Point, Rectangle } from 'pixi.js';

export const id = 'towerfall-physics';

export const debug = {
  group: 'Physics',
  label: 'Towerfall',
  order: 6,
};

export const plugins = ['towerfall-physics'];
export const assets = {
  preload: {
    bundles: ['spine'],
  },
};

class Player extends Actor<V8Application> {
  private isJumping = false;

  protected initialize(): void {
    this.app.actions('jump').connect(this._jump);
  }

  private _jump() {
    if (this.isRidingSolid() && !this.isJumping) {
      const JUMP_FORCE = -600;
      this.velocity.y = JUMP_FORCE;
      this.isJumping = true;
    }
  }

  public onCollide(result: CollisionResult): void {
    // If we hit something while moving up, stop upward velocity
    if (result.normal?.y === 1) {
      this.velocity.y = 0;
    }
    // If we hit something while moving down, we've landed
    else if (result.normal?.y === -1) {
      this.isJumping = false;
      this.velocity.y = 0;
    }
    // If we hit something horizontally, stop horizontal velocity
    else if (result.normal?.x !== 0) {
      this.velocity.x = 0;
    }
  }
}

export default class TowerfallPhysicsScene extends BaseScene {
  title = 'Towerfall Physics';
  subtitle = 'Actors: 1';

  private player: Player;
  private physicsContainer: Container;
  private numActors = 1;
  protected config = {
    debug: true,
    itemsToAdd: 20,
    gravity: 1000,
    maxVelocity: 900,
    gridCellSize: 100,
  };

  get physics(): TowerfallPhysicsPlugin {
    return this.app.getPlugin('towerfall-physics') as TowerfallPhysicsPlugin;
  }

  configureGUI() {
    const physicsFolder = this.gui.addFolder('Physics Settings');
    physicsFolder.open();
    physicsFolder.add(this.config, 'itemsToAdd', 0, 200, 10);
    physicsFolder.add(this.config, 'gravity', 0, 2000, 100).onChange(() => {
      this.physics.system.gravity = this.config.gravity;
    });

    physicsFolder.add(this.config, 'maxVelocity', 0, 2000, 100).onChange(() => {
      this.physics.system.maxVelocity = this.config.maxVelocity;
    });

    physicsFolder
      .add(this.config, 'debug')
      .onChange(() => {
        this._handleDebugChanged();
      })
      .name('Debug Physics');

    physicsFolder
      .add(this.config, 'gridCellSize', 50, 400, 50)
      .onChange(() => {
        this._handleGridCellSizeChange();
      })
      .name('Grid Cell Size');
  }

  async initialize() {
    super.initialize();

    this.app.actionContext = 'game';
    this.physicsContainer = this.add.container();

    // Initialize physics
    await this.physics.initialize(this.app, {
      container: this.physicsContainer,
      gravity: this.config.gravity,
      maxVelocity: this.config.maxVelocity,
      gridSize: this.config.gridCellSize,
      debug: this.config.debug,
      shouldCull: true,
      boundary: new Rectangle(0, 0, this.app.size.width, this.app.size.height),
    });

    // Create player sprite (circular)
    const playerSprite = new Graphics();
    playerSprite.rect(0, 0, 32, 32);
    playerSprite.fill({ color: 0x00ff00, alpha: 0.5 });

    this.physicsContainer.add.existing(playerSprite);

    // Create player with sprite as view
    this.player = new Player({ type: 'Player', position: [100, 100], size: 32 }, playerSprite);
    this.physics.system.addActor(this.player);

    // Create platforms
    this.createPlatform(0, this.app.size.height - 32, this.app.size.width, 32); // Ground

    const pf1 = this.createPlatform(100, 600, 200, 32); // Platform 1
    gsap.to(pf1, {
      x: 400,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'none',
      delay: 1,
    });
    // Create moving platform
    const pf = this.createPlatform(400, 800, 200, 32);
    gsap.to(pf, {
      y: 1000,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'none',
    });

    // Platform 2
    this.createPlatform(200, 200, 200, 32); // Platform 3

    // Setup input handlers
    this.addSignalConnection(
      this.app.actions('move_left').connect(this._movePlayer),
      this.app.actions('move_right').connect(this._movePlayer),
    );

    this.eventMode = 'static';
    this.on('click', (event: FederatedPointerEvent) => this._addActors(new Point(event.globalX, event.globalY)));
  }

  protected _handleDebugChanged() {
    this.physics.system.debug = this.config.debug;
  }

  protected _handleGridCellSizeChange() {
    this.physics.system.gridSize = this.config.gridCellSize;
  }

  private createPlatform(x: number, y: number, width: number, height: number): Solid {
    const sprite = new Graphics();
    sprite.rect(0, 0, width, height);
    sprite.fill({ color: 0x000fff });

    this.physicsContainer.add.existing(sprite);
    return this.physics.createSolid({ type: 'Platform', x, y, width, height }, sprite);
  }

  private _movePlayer(detail: ActionDetail) {
    const MOVE_SPEED = 600;
    const direction = detail.id === 'move_left' ? -1 : 1;
    this.player.velocity.x = direction * MOVE_SPEED;
  }

  private _addActors(pt: Point) {
    const amount = this.config.itemsToAdd;
    for (let i = 0; i < amount; i++) {
      const sprite = new Graphics();

      const size = Math.round(16 + Math.random() * 16);
      sprite.rect(0, 0, size, size);
      sprite.fill({ color: Math.random() * 0xffffff, alpha: 0.5 });
      this.physicsContainer.add.existing(sprite);

      const actor = this.physics.createActor({ type: 'fx', position: pt, size }, sprite);

      // Give initial random velocity
      const angle = Math.random() * Math.PI * 2;

      const speed = 200 + Math.random() * 200;

      actor.velocity.x = Math.cos(angle) * speed;
      actor.velocity.y = Math.sin(angle) * speed;
      actor.onCollide = () => {
        actor.velocity.x *= 0.975;
      };
    }

    this.numActors += amount;
    this._subtitle.text = `Actors: ${this.numActors}`;
  }

  update() {
    // Add some air control
    this.player.velocity.x *= 0.3; // Deceleration
  }

  resize() {
    super.resize();
    this.physicsContainer.position.set(-this.app.size.width / 2, -this.app.size.height / 2);
  }

  destroy(): void {
    this.app.ticker.remove(this.update);
    super.destroy();
  }
}
