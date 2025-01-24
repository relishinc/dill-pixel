import BaseScene from '@/scenes/BaseScene';
import { Actor, TowerfallPhysicsPlugin } from '@dill-pixel/plugin-towerfall-physics';
import { ActionDetail, Container } from 'dill-pixel';
import { FederatedPointerEvent, Graphics, Point } from 'pixi.js';

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

export default class TowerfallPhysicsScene extends BaseScene {
  private physics: TowerfallPhysicsPlugin;
  private player: Actor;
  private isJumping = false;
  private canJump = false;
  private physicsContainer: Container;
  private numActors = 1;

  async initialize() {
    super.initialize();

    this.app.actionContext = 'game';
    this.physicsContainer = this.add.container();

    // Initialize physics
    this.physics = new TowerfallPhysicsPlugin();
    await this.physics.initialize(this.app, {
      container: this.physicsContainer,
      gridSize: 16,
      gravity: 1000,
      maxVelocity: 900,
      debug: true,
    });

    // Create player sprite (circular)
    const playerSprite = new Graphics();
    playerSprite.circle(0, 0, 16);
    playerSprite.fill({ color: 0x00ff00, alpha: 0.5 });
    this.physicsContainer.add.existing(playerSprite);

    // Create player with sprite as view
    this.player = this.physics.createActor(100, 100, { shape: 'circle', radius: 16 }, playerSprite);
    this.player.onCollideY = (direction: number) => {
      if (direction > 0) {
        // Hit ground
        this.canJump = true;
        this.isJumping = false;
      }
    };

    // Create platforms
    this.createPlatform(0, this.app.size.height - 32, this.app.size.width, 32); // Ground
    this.createPlatform(100, 600, 200, 32); // Platform 1
    this.createPlatform(400, 800, 200, 32); // Platform 2
    this.createPlatform(200, 200, 200, 32); // Platform 3

    // Create some circular obstacles
    this.createCircle(300, 350, 25);
    this.createCircle(500, 250, 25);
    this.createCircle(150, 150, 25);

    // Setup input handlers
    this.addSignalConnection(
      this.app.actions('move_left').connect(this._movePlayer),
      this.app.actions('move_right').connect(this._movePlayer),
      this.app.actions('jump').connect(this._jump),
    );

    this.eventMode = 'static';
    this.on('click', (event: FederatedPointerEvent) => this._addActors(new Point(event.globalX, event.globalY), 100));
  }

  private createPlatform(x: number, y: number, width: number, height: number): void {
    const sprite = new Graphics();
    sprite.rect(0, 0, width, height);
    sprite.fill({ color: 0x000fff });
    this.physicsContainer.add.existing(sprite);

    this.physics.createSolid(x, y, { shape: 'rectangle', width, height }, sprite);
  }

  private createCircle(x: number, y: number, radius: number): void {
    const sprite = new Graphics();
    sprite.circle(0, 0, radius);
    sprite.fill({ color: 0xff0000 });
    this.physicsContainer.add.existing(sprite);

    this.physics.createSolid(x, y, { shape: 'circle', radius }, sprite);
  }

  private _movePlayer = (detail: ActionDetail): void => {
    const MOVE_SPEED = 600;
    const direction = detail.id === 'move_left' ? -1 : 1;
    this.player.velocity.x = direction * MOVE_SPEED;
  };

  private _jump = (): void => {
    if (this.canJump && !this.isJumping) {
      const JUMP_FORCE = -600;
      this.player.velocity.y = JUMP_FORCE;
      this.isJumping = true;
      this.canJump = false;
    }
  };

  private _addActors(pt: Point, amount: number = 1) {
    for (let i = 0; i < amount; i++) {
      const isCircle = Math.random() > 0.5;
      const sprite = new Graphics();

      if (isCircle) {
        const radius = 5 + Math.random() * 5;
        sprite.circle(0, 0, radius);
        sprite.fill({ color: 0xff00ff, alpha: 0.5 });
        this.physicsContainer.add.existing(sprite);
        this.physics.createActor(
          amount === 1 ? pt.x : pt.x + Math.random() * 500,
          amount === 1 ? pt.y : pt.y + Math.random() * 5,
          { shape: 'circle', radius },
          sprite,
        );
      } else {
        const size = 10 + Math.random() * 10;
        sprite.rect(0, 0, size, size);
        sprite.fill({ color: 0xff00ff, alpha: 0.5 });
        this.physicsContainer.add.existing(sprite);
        this.physics.createActor(
          amount === 1 ? pt.x : pt.x + Math.random() * 500,
          amount === 1 ? pt.y : pt.y + Math.random() * 5,
          { shape: 'rectangle', width: size, height: size },
          sprite,
        );
      }
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
