import BaseScene from '@/scenes/BaseScene';
import { V8Application } from '@/V8Application';
import TowerfallPhysicsPlugin, {
  Actor,
  CollisionResult,
  ITowerfallPhysicsPlugin,
  Sensor,
  Solid,
} from '@dill-pixel/plugin-towerfall-physics';
import { Application, bool, Container, Signal } from 'dill-pixel';
import gsap from 'gsap';
import { Graphics, Rectangle, Ticker } from 'pixi.js';

export const id = 'endless-runner';

export const debug = {
  group: 'Physics',
  label: 'Towerfall - Endless Runner',
  order: 7,
};

export const plugins = ['towerfall-physics'];

class Runner extends Actor<V8Application> {
  excludeCollisionTypes = new Set(['Coin']);

  private isJumping = false;
  private isHit = false;
  private hitCooldown: any;
  private isDead = false;
  private score = 0;
  public speed = -3;
  public jumpForce = Math.max(this.system.gravity * 0.25, 600);
  public onKilled = new Signal<() => void>();
  public active: boolean = false;

  initialize(): void {
    this.addSignalConnection(
      this.app.actions('jump').connect(this._jump),
      this.app.actions('move_right').connect(this._moveRight),
      this.app.actions('move_left').connect(this._moveLeft),
      this.app.actions('stop_move_left').connect(this._stopMoveLeft),
      this.app.actions('stop_move_right').connect(this._stopMoveRight),
    );

    gsap.to(this.view, {
      alpha: 0,
      duration: 0.5,
      ease: 'none',
      yoyo: true,
      repeat: 3,
      onComplete: () => {
        this.active = true;
      },
    });
  }

  onCull(): void {
    this.die();
  }

  public squish(): void {
    this.die();
  }

  public onCollide(result: CollisionResult): void {
    if (this.excludeCollisionTypes.has(result.solid.type)) {
      return;
    }

    switch (result.solid.type) {
      case 'Obstacle': {
        if (result.normal?.y === -1) {
          // hit upwards
          this.isHit = true;
          this.velocity.y = -800;
          if (result.normal.x === 0) {
            this.velocity.x = -800;
          }
        } else if (result.normal?.y === 1) {
          this.velocity.y = 300;
        }
        if (result.normal?.x === -1 || result.normal?.x === 1) {
          this.isHit = true;
          this.velocity.x = 1000 * result.normal.x;
        }

        clearTimeout(this.hitCooldown);

        this.hitCooldown = setTimeout(() => {
          this.isHit = false;
        }, 150);

        gsap.to(this.view, {
          alpha: 0.25,
          duration: 0.3,
          ease: 'none',
          yoyo: true,
          repeat: 3,
          onComplete: () => {
            this.view.alpha = 1;
          },
        });
        break;
      }
      default: {
        if (result.normal?.y === 1) {
          this.velocity.y = 0;
        }
        break;
      }
    }
  }

  private die(): void {
    if (this.isDead) return;
    this.isDead = true;
    this.system.removeActor(this);
    this.onKilled.emit();
  }

  private _jump() {
    if (this.isRidingSolid() && !this.isJumping) {
      this.velocity.y = -this.jumpForce;
      this.isJumping = true;
    }
  }

  public postUpdate(): void {
    if (this.isRidingSolid()) {
      this.isJumping = false;
      this.velocity.x *= 0.8;
    }
  }

  private _moveRight() {
    if (this.isHit) {
      return;
    }
    this.velocity.x = Math.max(-this.speed * 100, 20);
  }

  private _moveLeft() {
    if (this.isHit) {
      return;
    }
    this.velocity.x = this.speed * 110;
  }
  private _stopMoveLeft() {
    this.velocity.x = 0;
  }

  private _stopMoveRight() {
    this.velocity.x = 0;
  }

  public addScore(points: number): void {
    this.score += points;
  }

  public getScore(): number {
    return this.score;
  }
}

class Coin extends Sensor<V8Application> {
  public type = 'Coin';
  public collidableTypes = ['Runner'];
  public collected = false;
  public shouldRemoveOnCull = false;

  constructor(config?: any) {
    super(config);
    this.velocity = { x: 0, y: 0 };
    this.isStatic = true;
  }

  initialize(): void {
    const sprite = new Graphics();
    sprite.circle(12, 12, 12);
    sprite.fill({ color: 0xffd700, alpha: 0.75 });
    this.view = sprite;
    this.view.visible = true;
    this.width = 20;
    this.height = 20;
  }

  onActorEnter(actor: Actor): void {
    if (!this.collected && actor.type === 'Runner') {
      this.collected = true;
      (actor as Runner).addScore(10);
      this.system.removeSensor(this);
    }
  }

  public updateView(): void {
    this.view.position.set(this.x - 2, this.y - 2);
  }
}

class Segment {
  public platforms: Solid[] = [];
  public obstacles: Solid[] = [];
  public coins: Array<{ coin: Coin; offsetX: number; offsetY: number }> = [];
  public width: number;
  public x: number;
  public y: number;
  public tweens: gsap.core.Tween[] = [];
  public animations: Set<gsap.core.Tween> = new Set();

  get app(): Application {
    return Application.getInstance();
  }

  get physics(): ITowerfallPhysicsPlugin {
    return this.app.getPlugin('towerfall-physics') as ITowerfallPhysicsPlugin;
  }

  constructor(x: number, y: number, width: number) {
    this.x = x;
    this.y = y;
    this.width = width;

    // Create floor platform
    this._createPlatform(0, y, width, 32, false);

    // Add random elevated platforms
    const platformCount = Math.floor(Math.random() * 3) + 1;

    for (let i = 0; i < platformCount; i++) {
      const platformWidth = 100 + Math.random() * 100;
      const platformX = (width * i) / platformCount + Math.random() * 50;
      const platformY = y - 100 - Math.random() * 100;

      this._createPlatform(platformX, platformY, platformWidth, 32, true);

      // Add coins above platform
    }
  }

  private _createPlatform(x: number, y: number, width: number, height: number, canMove: boolean = false): Solid {
    const sprite = new Graphics();
    sprite.rect(0, 0, width, height);
    sprite.fill({ color: 0x0000ff });
    const platform = this.physics.createSolid({
      type: 'Platform',
      x: this.x + x,
      y,
      width,
      height,
      view: sprite,
    });

    const isMoving = canMove && bool();

    platform.moving = true;
    this.platforms.push(platform);

    // Add obstacles on platform
    let obstacle: Solid | null = null;
    if (Math.random() < 0.7) {
      obstacle = this._createObstacle(x + width / 2, y - 32 - Math.random() * 300);
      this.obstacles.push(obstacle);
    }
    const dist = bool() ? 100 : -100;
    if (Math.random() < 0.8) {
      const coinCount = Math.floor(Math.random() * 3) + 1;
      for (let j = 0; j < coinCount; j++) {
        const coin = this._createCoin(x + (width * (j + 1)) / (coinCount + 1), y - 50 - Math.random() * 30);
        if (isMoving) {
          const coinTween = gsap.to(coin.coin, {
            y: coin.coin.y + dist,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'none',
          });
          this.animations.add(coinTween);
        }
        this.coins.push(coin);
      }
    }

    if (isMoving) {
      const platformTween = gsap.to(platform, {
        y: platform.y + dist,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'none',
      });
      this.animations.add(platformTween);
      if (obstacle) {
        const obstacleTween = gsap.to(obstacle, {
          y: obstacle!.y + dist,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'none',
        });
        this.animations.add(obstacleTween);
      }
    }

    return platform;
  }

  private _createObstacle(x: number, y: number): Solid {
    const sprite = new Graphics();
    sprite.rect(0, 0, 32, 32);
    sprite.fill({ color: 0xff0000, alpha: 0.75 });

    const obstacle = this.physics.createSolid({
      type: 'Obstacle',
      x: this.x + x,
      y,
      width: 28,
      height: 28,
      view: sprite,
    });

    obstacle.updateView = () => {
      obstacle.view.position.set(obstacle.x - 2, obstacle.y - 2);
    };
    obstacle.moving = true;
    return obstacle;
  }

  private _createCoin(x: number, y: number): { coin: Coin; offsetX: number; offsetY: number } {
    const coin = new Coin({
      position: [this.x + x, y],
    });
    this.physics.system.addSensor(coin);
    // Store the coin with its relative offset from segment start
    const coinData = {
      coin,
      offsetX: x,
      offsetY: y - this.y,
    };
    this.coins.push(coinData);
    return coinData;
  }

  public move(x: number, y: number): void {
    this.x += x;

    this.platforms.forEach((p) => p.move(x, y));
    this.obstacles.forEach((o) => o.move(x, y));
    // Use absolute positioning for coins based on segment position and their offset
    this.coins.forEach(({ coin, offsetX, offsetY }) => {
      coin.moveStatic(this.x + offsetX, this.y + offsetY);
    });
  }

  public destroy(): void {
    this.animations.forEach((a) => a.kill());
    this.platforms.forEach((p) => this.physics.system.removeSolid(p, true));
    this.obstacles.forEach((o) => this.physics.system.removeSolid(o, true));
    this.coins.forEach(({ coin }) => this.physics.system.removeSensor(coin, true));

    this.platforms = [];
    this.obstacles = [];
    this.coins = [];
  }
}

export default class TowerfallEndlessRunnerScene extends BaseScene {
  title = 'Endless Runner';
  subtitle = 'Score: 0';

  private runner: Runner;
  private physicsContainer: Container;
  private segments: Segment[] = [];
  private gameSpeed = 100;
  private segmentWidth = 800;

  protected config = {
    debug: true,
    gravity: 6000,
    maxVelocity: 3000,
    gameSpeed: 100,
    segmentWidth: 800,
  };

  get physics(): TowerfallPhysicsPlugin {
    return this.app.getPlugin('towerfall-physics') as TowerfallPhysicsPlugin;
  }

  configureGUI() {
    const gameFolder = this.gui.addFolder('Game Settings');
    gameFolder.open();
    gameFolder
      .add(this.config, 'gameSpeed', 200, 600, 50)
      .onChange(() => {
        this.gameSpeed = this.config.gameSpeed;
      })
      .name('Game Speed');

    gameFolder
      .add(this.config, 'segmentWidth', 400, 1200, 100)
      .onChange(() => {
        this.segmentWidth = this.config.segmentWidth;
      })
      .name('Segment Width');

    const physicsFolder = this.gui.addFolder('Physics Settings');
    physicsFolder.add(this.config, 'gravity', 0, 6000, 1000).onChange(() => {
      this.physics.system.gravity = this.config.gravity;
    });

    physicsFolder
      .add(this.config, 'debug')
      .onChange(() => {
        this.physics.system.debug = this.config.debug;
      })
      .name('Debug Physics');
  }

  async initialize() {
    super.initialize();

    this.app.actionContext = 'game';
    this.physicsContainer = this.add.container();

    await this.physics.initialize(this.app, {
      container: this.physicsContainer,
      gravity: this.config.gravity,
      maxVelocity: this.config.maxVelocity,
      gridSize: 200,
      debug: this.config.debug,
      shouldCull: true,
      boundary: new Rectangle(-100, -100, this.app.size.width + 200, this.app.size.height + 200),
    });

    this._createRunner();
    this._createLeftBoundaryWall();
    this._createInitialSegments();
    this.physicsContainer.position.set(-this.app.size.width / 2, -this.app.size.height / 2);
  }

  private _createLeftBoundaryWall(): void {
    const sprite = new Graphics();
    sprite.rect(0, 0, 32, this.app.size.height);
    sprite.fill({ color: 0xff0000 });

    this.physics.createSolid({
      type: 'Wall',
      x: -32,
      y: 0,
      width: 32,
      height: this.app.size.height,
      view: sprite,
    });
  }

  private _createRunner(): void {
    const sprite = new Graphics();
    sprite.rect(0, 0, 32, 64);
    sprite.fill({ color: 0x00ff00 });

    this.physicsContainer.addChild(sprite);

    this.runner = new Runner({
      type: 'Runner',
      position: [125, this.app.size.height * 0.5],
      size: [32, 64],
      view: sprite,
    });

    this.physics.system.addActor(this.runner);
    this.runner.onKilled.connectOnce(this._createRunner);
  }

  private _createInitialSegments(): void {
    // Create enough segments to fill 2x the screen width
    const minRequiredWidth = this.app.size.width * 2;
    let totalWidth = 0;

    while (totalWidth < minRequiredWidth) {
      const segment = new Segment(totalWidth, this.app.size.height - 60, this.segmentWidth);
      this.segments.push(segment);
      totalWidth += this.segmentWidth;
    }
  }

  update(ticker?: Ticker): void {
    if (!this.runner) return;

    // Move everything left
    const moveAmount = (-this.gameSpeed * (ticker?.deltaTime ?? 0)) / 60;

    for (let i = this.segments.length - 1; i >= 0; i--) {
      const segment = this.segments[i];
      segment.move(moveAmount, 0);

      if (segment.x + segment.width < 0) {
        this.segments.splice(i, 1);
        segment.destroy();
      }
    }

    let totalWidth = this.segments.reduce((sum, segment) => sum + segment.width, 0);
    const minRequiredWidth = this.app.size.width * 2;

    //Check if we need to add new segments
    while (totalWidth < minRequiredWidth) {
      const lastSegment = this.segments[this.segments.length - 1];
      const newSegment = new Segment(
        Math.round(lastSegment.x + lastSegment.width),
        this.app.size.height - 60,
        this.segmentWidth,
      );
      this.segments.push(newSegment);
      totalWidth += this.segmentWidth;
    }

    // Update score
    this._subtitle.text = `Score: ${this.runner.getScore()}`;
  }

  resize() {
    super.resize();
    this.physicsContainer.position.set(-this.app.size.width / 2, -this.app.size.height / 2);
  }

  destroy(): void {
    this.segments.forEach((s) => s.destroy());
    this.physics.destroy();
    super.destroy();
  }
}
