import BaseScene from '@/scenes/BaseScene';
import TowerfallPhysicsPlugin, { Actor, Solid } from '@dill-pixel/plugin-towerfall-physics';
import { ActionDetail, Container } from 'dill-pixel';
import gsap from 'gsap';
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
  private player: Actor;
  private isJumping = false;
  private canJump = false;
  private physicsContainer: Container;
  private numActors = 1;

  get physics(): TowerfallPhysicsPlugin {
    return this.app.getPlugin('towerfall-physics') as TowerfallPhysicsPlugin;
  }

  async initialize() {
    super.initialize();

    this.app.actionContext = 'game';
    this.physicsContainer = this.add.container();

    // Initialize physics
    await this.physics.initialize(this.app, {
      container: this.physicsContainer,
      gridSize: 100,
      gravity: 1000,
      maxVelocity: 900,
      debug: true,
    });

    // Create player sprite (circular)
    const playerSprite = new Graphics();
    playerSprite.rect(0, 0, 32, 32);
    playerSprite.fill({ color: 0x00ff00, alpha: 0.5 });

    this.physicsContainer.add.existing(playerSprite);

    // Create player with sprite as view
    this.player = this.physics.createActor([100, 100], { width: 32, height: 32 }, playerSprite);

    this.player.onCollideY = (direction: number) => {
      if (direction > 0) {
        // Hit ground
        this.canJump = true;
        this.isJumping = false;
      }
    };
    this.start;

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
      this.app.actions('jump').connect(this._jump),
    );

    this.eventMode = 'static';
    this.on('click', (event: FederatedPointerEvent) => this._addActors(new Point(event.globalX, event.globalY), 100));
  }

  private createPlatform(x: number, y: number, width: number, height: number): Solid {
    const sprite = new Graphics();
    sprite.rect(0, 0, width, height);
    sprite.fill({ color: 0x000fff });

    this.physicsContainer.add.existing(sprite);
    return this.physics.createSolid({ x, y }, { width, height }, sprite);
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
      const sprite = new Graphics();

      const size = 10 + Math.random() * 10;
      sprite.rect(0, 0, size, size);
      sprite.fill({ color: Math.random() * 0xffffff, alpha: 0.5 });
      this.physicsContainer.add.existing(sprite);

      const actor = this.physics.createActor(pt, { width: size, height: size }, sprite);

      // Give initial random velocity
      const angle = Math.random() * Math.PI * 2;

      const speed = 200 + Math.random() * 300;

      actor.velocity.x = Math.cos(angle) * speed;
      actor.velocity.y = Math.sin(angle) * speed;

      // Stop on collision for rectangles
      actor.onCollideX = () => {
        actor.velocity.x = 0;
        actor.velocity.y *= 0.5;
      };

      actor.onCollideY = () => {
        actor.velocity.y = 0;
        actor.velocity.x *= 0.95;
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
