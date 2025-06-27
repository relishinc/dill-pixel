import BaseScene from '@/scenes/BaseScene';
import {
  Actor,
  CollisionLayer,
  CollisionResult,
  Group,
  ICrunchPhysicsPlugin,
  Sensor,
  Solid,
} from '@dill-pixel/plugin-crunch-physics';
import { bool, Container, PointLike, SceneDebug, ScenePlugins, Signal } from 'dill-pixel';
import gsap from 'gsap';
import { Graphics, Rectangle, Ticker } from 'pixi.js';

export const id = 'endless-runner';

export const debug: SceneDebug = {
  group: 'Crunch Physics',
  label: 'Endless Runner',
  order: 7,
};

export const plugins: ScenePlugins = ['crunch-physics'];

class Runner extends Actor {
  type = 'Runner';
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
    // Set the collision layer to PLAYER (bit 1)
    this.collisionLayer = CollisionLayer.PLAYER;

    // Note: We don't set the collision mask here anymore
    // It's now handled by the scene's _updateCollisionRestrictions method

    this.addSignalConnection(
      this.app.actions('jump').connect(this._jump),
      this.app.actions('move_right').connect(this._moveRight),
      this.app.actions('move_left').connect(this._moveLeft),
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
    if (!this.isHit) {
      this.velocity.x = 0;
    }

    if (this.isRidingSolid()) {
      this.isJumping = false;
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

  public addScore(points: number): void {
    this.score += points;
  }

  public getScore(): number {
    return this.score;
  }
}

class Coin extends Sensor {
  type = 'Coin';
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

class Segment extends Group {
  public coins: Array<{ coin: Coin; offsetX: number; offsetY: number }> = [];
  public width: number;
  public animations: Set<gsap.core.Tween> = new Set();

  constructor(
    x: number,
    y: number,
    width: number,
    public floorLayer?: number,
  ) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;

    // Create floor platform - only this one should be on the FLOOR layer
    this._createPlatform(0, 0, width, 32, false, true);

    // Add random elevated platforms - these should NOT be on the FLOOR layer
    const platformCount = Math.floor(Math.random() * 3) + 1;

    for (let i = 0; i < platformCount; i++) {
      const platformWidth = 100 + Math.random() * 100;
      const platformX = (width * i) / platformCount + Math.random() * 50;
      const platformY = -100 - Math.random() * 100;

      // Pass false to indicate this is not a floor platform
      this._createPlatform(platformX, platformY, platformWidth, 32, true, false);
    }
  }

  private _createPlatform(
    x: number,
    y: number,
    width: number,
    height: number,
    canMove: boolean = false,
    isFloor: boolean = false,
  ): Solid {
    const sprite = new Graphics();
    sprite.rect(0, 0, width, height);

    // Use different colors for floor vs elevated platforms
    // Floor platforms (collidable) are blue, non-floor platforms are light blue
    sprite.fill({ color: isFloor ? 0x0000ff : 0x0f0f0f });

    // Add a border to indicate collision status
    sprite.rect(0, 0, width, height).stroke({ color: 0xffff00, width: 2 });

    const platform = this.physics.createSolid({
      type: isFloor ? 'Floor' : 'Platform',
      width,
      height,
      group: this,
      groupOffset: { x, y },
      view: sprite,
      // Set the collision layer based on whether it's a floor or platform
      collisionLayer: isFloor ? this.floorLayer : CollisionLayer.PLATFORM,
      // IMPORTANT: Always set the collision mask to include PLAYER
      // This ensures the platform can be collided with when the player's mask includes this layer
      collisionMask: CollisionLayer.PLAYER,
    });

    // Add debug logging for the first platform in each segment
    if (x === 0 && y === 0) {
      console.log(`Floor platform collision layer: ${platform.collisionLayer} (${isFloor ? 'FLOOR' : 'PLATFORM'})`);
      console.log(`Floor platform collision mask: ${platform.collisionMask} (PLAYER)`);
    }

    const isMoving = canMove && bool();

    platform.moving = true;

    // Add obstacles on platform
    if (Math.random() < 0.7) {
      this._createObstacle(platform, { x: width / 2, y: -32 - Math.random() * 300 }, isFloor);
    }

    const dist = bool() ? 100 : -100;
    if (Math.random() < 0.8) {
      const coinCount = Math.floor(Math.random() * 3) + 1;
      for (let j = 0; j < coinCount; j++) {
        this._createCoin(platform, {
          x: (width * (j + 1)) / (coinCount + 1),
          y: -50 - Math.random() * 30,
        });
      }
    }

    if (isMoving) {
      const xDist = bool() ? 100 : 0;
      const platformTween = gsap.to(platform.groupOffset, {
        x: platform.groupOffset.x + xDist,
        y: xDist ? platform.groupOffset.y : platform.groupOffset.y + dist,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'none',
      });
      this.animations.add(platformTween);
    }

    return platform;
  }

  private _createObstacle(platform: Solid, offset: PointLike, isOnFloor: boolean): Solid {
    const sprite = new Graphics();
    // Use different colors for obstacles based on whether they're on floor platforms
    // Add a border to indicate collision status
    sprite.rect(0, 0, 32, 32).fill({ color: 0xff0000, alpha: 0.75 }).stroke({ color: 0xffff00, width: 2 });

    const obstacle = this.physics.createSolid({
      type: 'Obstacle',
      width: 28,
      height: 28,
      view: sprite,
      group: this,
      follows: platform,
      followOffset: offset,
      // Only obstacles on floor platforms should be on the FLOOR layer
      collisionLayer: CollisionLayer.PLATFORM,
      // IMPORTANT: Always set the collision mask to include PLAYER
      collisionMask: CollisionLayer.PLAYER,
    });

    // Add debug logging for the first obstacle
    if (isOnFloor) {
      console.log('Floor obstacle collision layer:', obstacle.collisionLayer);
      console.log('Floor obstacle collision mask:', obstacle.collisionMask);
    }

    obstacle.updateView = () => {
      if (obstacle.view && obstacle.view.visible && obstacle.view.position) {
        obstacle.view.position.set(obstacle.x - 2, obstacle.y - 2);
      }
    };
    obstacle.moving = true;

    return obstacle;
  }

  private _createCoin(platform: Solid, offset: PointLike): Coin {
    const coin = new Coin({
      group: this,
      follows: platform,
      followOffset: offset,
      collisionLayer: CollisionLayer.TRIGGER,
      collisionMask: CollisionLayer.PLAYER,
    });
    this.physics.system.addSensor(coin);
    return coin;
  }

  public destroy(): void {
    this.animations.forEach((a) => a.kill());
    super.destroy();
  }
}

export default class CrunchEndlessRunnerScene extends BaseScene {
  title = 'Crunch Physics - Endless Runner';
  subtitle = 'Score: 0';

  private runner: Runner;
  private physicsContainer: Container;
  private segments: Segment[] = [];
  private gameSpeed = 100;
  private segmentWidth = 800;
  private floorLayer: CollisionLayer;

  protected config = {
    debug: true,
    gravity: 6000,
    maxVelocity: 3000,
    gameSpeed: 100,
    segmentWidth: 800,
    // showCollisionInfo: false,
    restrictCollisions: false,
  };

  get physics(): ICrunchPhysicsPlugin {
    return this.app.getPlugin('crunch-physics') as unknown as ICrunchPhysicsPlugin;
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

    // physicsFolder
    //   .add(this.config, 'showCollisionInfo')
    //   .onChange(() => {
    //     // if (this.debugText) {
    //     //   this.debugText.visible = this.config.showCollisionInfo;
    //     // }
    //   })
    //   .name('Show Collision Info');

    physicsFolder
      .add(this.config, 'restrictCollisions')
      .onChange(() => {
        this._updateCollisionRestrictions();
      })
      .name('Restrict Collisions');
  }

  async initialize() {
    super.initialize();

    this.app.actionContext = 'game';
    this.physicsContainer = this.add.container();

    await this.physics.initialize({
      container: this.physicsContainer,
      gravity: this.config.gravity,
      maxVelocity: this.config.maxVelocity,
      gridSize: 200,
      debug: this.config.debug,
      culling: true,
      boundary: new Rectangle(-100, -100, this.app.size.width + 200, this.app.size.height + 200),
    });

    // Register the FLOOR collision layer - this is a custom layer (bits 16-31)
    // The value will be 1 << (0 + 16) = 65536 (bit 16 set)
    const FLOOR = this.physics.registerCollisionLayer('FLOOR', 0, 'the floor platforms');

    // Store the FLOOR layer as a class property for use in other methods
    this.floorLayer = FLOOR;

    // Debug the collision layers
    this._debugCollisionLayers();

    // Add debug text to explain collision layers
    // this.debugText = this.add.text({
    //   text:
    //     'Collision Layers Test:\n' +
    //     '- Yellow border: On FLOOR layer (player can collide)\n' +
    //     '- Gray border: On PLATFORM layer (player cannot collide)\n' +
    //     `- FLOOR layer value: ${FLOOR}\n` +
    //     `- PLAYER layer value: ${CollisionLayer.PLAYER}\n` +
    //     `- PLATFORM layer value: ${CollisionLayer.PLATFORM}`,
    //   x: 20,
    //   y: 20,
    //   style: {
    //     fontSize: 16,
    //     fill: 0xffffff,
    //   },
    // });
    // this.debugText.visible = this.config.showCollisionInfo;

    this._createRunner();
    this._createLeftBoundaryWall();
    this._createInitialSegments();
    this.physicsContainer.position.set(-this.app.size.width / 2, -this.app.size.height / 2);
  }

  /**
   * Debug method to help understand collision layers
   */
  private _debugCollisionLayers(): void {
    console.log('===== COLLISION LAYERS DEBUG =====');
    console.log('FLOOR layer value:', this.floorLayer);
    console.log('PLAYER layer value:', CollisionLayer.PLAYER);
    console.log('PLATFORM layer value:', CollisionLayer.PLATFORM);

    // Check if bitwise operations work as expected
    console.log('FLOOR & PLAYER =', this.floorLayer & CollisionLayer.PLAYER);
    console.log('FLOOR & PLATFORM =', this.floorLayer & CollisionLayer.PLATFORM);

    // Log all registered collision layers
    console.log('All registered layers:', this.physics.getCollisionLayers());

    // Test collision detection logic
    this._testCollisionDetection();

    console.log('================================');
  }

  /**
   * Test if the collision detection logic works as expected
   */
  private _testCollisionDetection(): void {
    console.log('===== TESTING COLLISION DETECTION =====');

    // Create test entities
    const testRunner = {
      collisionLayer: CollisionLayer.PLAYER,
      collisionMask: this.floorLayer,
    };

    const testFloorPlatform = {
      collisionLayer: this.floorLayer,
      collisionMask: CollisionLayer.PLAYER,
    };

    const testElevatedPlatform = {
      collisionLayer: CollisionLayer.PLATFORM,
      collisionMask: CollisionLayer.PLAYER,
    };

    // Test collision detection
    const runnerCollidesWithFloor =
      (testRunner.collisionLayer & testFloorPlatform.collisionMask) !== 0 &&
      (testFloorPlatform.collisionLayer & testRunner.collisionMask) !== 0;

    const runnerCollidesWithElevated =
      (testRunner.collisionLayer & testElevatedPlatform.collisionMask) !== 0 &&
      (testElevatedPlatform.collisionLayer & testRunner.collisionMask) !== 0;

    console.log('Runner collides with floor platform?', runnerCollidesWithFloor);
    console.log('Runner collides with elevated platform?', runnerCollidesWithElevated);

    // Log the binary values to understand what's happening
    console.log('Runner layer (binary):', testRunner.collisionLayer.toString(2));
    console.log('Runner mask (binary):', testRunner.collisionMask.toString(2));
    console.log('Floor platform layer (binary):', testFloorPlatform.collisionLayer.toString(2));
    console.log('Floor platform mask (binary):', testFloorPlatform.collisionMask.toString(2));
    console.log('Elevated platform layer (binary):', testElevatedPlatform.collisionLayer.toString(2));
    console.log('Elevated platform mask (binary):', testElevatedPlatform.collisionMask.toString(2));

    // Test with actual entities
    if (this.runner) {
      // Create a test floor platform
      const testFloor = this.physics.createSolid({
        type: 'TestFloor',
        position: [0, 0],
        size: [10, 10],
        collisionLayer: this.floorLayer,
        collisionMask: CollisionLayer.PLAYER,
      });

      // Create a test elevated platform
      const testPlatform = this.physics.createSolid({
        type: 'TestPlatform',
        position: [0, 0],
        size: [10, 10],
        collisionLayer: CollisionLayer.PLATFORM,
        collisionMask: CollisionLayer.PLAYER,
      });

      // Test with actual entities
      console.log('Runner can collide with floor?', this.runner.canCollideWithEntity(testFloor));
      console.log('Runner can collide with platform?', this.runner.canCollideWithEntity(testPlatform));

      // Clean up test entities
      this.physics.system.removeSolid(testFloor);
      this.physics.system.removeSolid(testPlatform);
    }

    console.log('================================');
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
      collisionLayer: this.floorLayer,
      collisionMask: CollisionLayer.PLAYER,
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

    // Apply collision restrictions based on config
    this._updateCollisionRestrictions();

    // Run the collision detection test after the runner is created
    this._testCollisionDetection();
  }

  private _createInitialSegments(): void {
    // Create enough segments to fill 2x the screen width
    const minRequiredWidth = this.app.size.width * 2;
    let totalWidth = 0;

    while (totalWidth < minRequiredWidth) {
      const segment = new Segment(totalWidth, this.app.size.height - 60, this.segmentWidth, this.floorLayer);
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
        this.floorLayer,
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
    this.physics.system.boundary = new Rectangle(-100, -100, this.app.size.width + 200, this.app.size.height + 200);
    this.segments.forEach((s) => (s.y = this.app.size.height - 60));
  }

  destroy(): void {
    this.segments.forEach((s) => s.destroy());
    this.physics.destroy();
    super.destroy();
  }

  /**
   * Test if the riding logic works correctly with collision layers
   */
  private _testRidingLogic(): void {
    console.log('===== TESTING RIDING LOGIC =====');

    if (!this.runner) return;

    // Create a test floor platform (should be rideable)
    const testFloor = this.physics.createSolid({
      type: 'TestFloor',
      position: [this.runner.x, this.runner.y + this.runner.height],
      size: [100, 10],
      collisionLayer: this.floorLayer,
      collisionMask: CollisionLayer.PLAYER,
    });

    // Create a test elevated platform (should not be rideable when restrictions are enabled)
    const testPlatform = this.physics.createSolid({
      type: 'TestPlatform',
      position: [this.runner.x + 150, this.runner.y + this.runner.height],
      size: [100, 10],
      collisionLayer: CollisionLayer.PLATFORM,
      collisionMask: CollisionLayer.PLAYER,
    });

    // Test riding logic
    console.log('Runner can ride floor platform?', this.runner.isRiding(testFloor));
    console.log('Runner can ride elevated platform?', this.runner.isRiding(testPlatform));

    // Clean up test entities
    this.physics.system.removeSolid(testFloor);
    this.physics.system.removeSolid(testPlatform);

    console.log('================================');
  }

  /**
   * Update collision restrictions based on the config
   */
  private _updateCollisionRestrictions(): void {
    if (!this.runner) return;

    if (this.config.restrictCollisions) {
      // Restrict collisions to only FLOOR layer
      this.runner.collisionMask = this.floorLayer;
      console.log('Restricted collisions: Runner will only collide with FLOOR layer');
      console.log('Runner collision mask (binary):', this.runner.collisionMask.toString(2));
      console.log('FLOOR layer (binary):', this.floorLayer.toString(2));
      console.log('PLATFORM layer (binary):', CollisionLayer.PLATFORM.toString(2));
    } else {
      // Allow collisions with all layers
      this.runner.collisionMask = CollisionLayer.ALL;
      console.log('Unrestricted collisions: Runner will collide with all layers');
      console.log('Runner collision mask (binary):', this.runner.collisionMask.toString(2));
    }

    // Update the debug text
    // if (this.debugText) {
    //   this.debugText.text =
    //     'Collision Layers Test:\n' +
    //     '- Yellow border: On FLOOR layer (player can collide)\n' +
    //     '- Gray border: On PLATFORM layer (player cannot collide)\n' +
    //     `- Player ${this.config.restrictCollisions ? 'only collides with FLOOR layer and OBSTACLES' : 'collides with ALL layers'}\n` +
    //     `- FLOOR layer value: ${this.floorLayer}\n` +
    //     `- PLAYER layer value: ${CollisionLayer.PLAYER}\n` +
    //     `- PLATFORM layer value: ${CollisionLayer.PLATFORM}`;
    // }

    // Test riding logic after updating collision restrictions
    this._testRidingLogic();
  }
}
