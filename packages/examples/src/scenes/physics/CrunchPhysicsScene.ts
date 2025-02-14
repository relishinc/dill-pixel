import BaseScene from '@/scenes/BaseScene';
import { V8Application } from '@/V8Application';
import {
  Actor,
  Collision,
  CollisionResult,
  Group,
  ICrunchPhysicsPlugin,
  Sensor,
  Solid,
} from '@dill-pixel/plugin-crunch-physics';
import { ActionDetail, AnimatedSprite, Button, Camera, Container, Joystick, Signal, UICanvas } from 'dill-pixel';
import gsap from 'gsap';

import { FederatedPointerEvent, Point, Pool, Rectangle } from 'pixi.js';

export const id = 'crunch-physics';

export const debug = {
  group: 'Physics',
  label: 'Crunch Physics - Level & Camera',
  order: 6,
};

export const plugins = ['crunch-physics'];
export const assets = {
  preload: {
    bundles: ['kenney'],
  },
};

type PlatformData = {
  isOneWay: boolean;
  direction: number;
};

class Platform extends Solid<V8Application, PlatformData> {
  type = 'Platform';
  private _player: Player | null = null;

  set player(player: Player) {
    this._player = player;
  }

  public update(dt: number): void {
    if (this._player) {
      const shouldPassThroughMe = this._player.y + this._player.height > this.y;
      if (shouldPassThroughMe) {
        this.excludeCollisionType('Player');
      } else {
        this.addCollisionType('Player');
      }
    }
    super.update(dt);
  }
}

class Player extends Actor<V8Application> {
  declare view: AnimatedSprite;

  type = 'Player';
  active = false;
  debug = false;

  public onKilled: Signal<(player: Player) => void> = new Signal();
  private isJumping = false;
  private direction = 0;

  initialize(): void {
    this.direction = 1;
    this.view = this.make.animatedSprite({
      animationSpeed: 0.2,
      sheet: 'jumper',
      texturePrefix: 'Players/bunny1_',
      animations: {
        walk: { startIndex: 1, numFrames: 2, loop: true },
        jump: { numFrames: 1 },
        stand: { numFrames: 1 },
      },
    });
    this.view.width = 37;
    this.view.scale.y = this.view.scale.x;

    this.addSignalConnection(
      this.app.actions('jump').connect(this._jump),
      this.app.actions('move_left').connect(this._move),
      this.app.actions('move_right').connect(this._move),
    );

    gsap.to(this.view, {
      alpha: 0.5,
      duration: 0.5,
      repeat: 3,
      yoyo: true,
      ease: 'none',
      onComplete: () => {
        this.view.alpha = 1;
        this.active = true;
      },
    });
  }

  private _move(detail: ActionDetail) {
    this.direction = detail.id === 'move_left' ? -1 : 1;
  }

  private _stopMove() {
    this.direction = 0;
    this.velocity.x = 0;
  }

  public squish(): void {
    this.system.removeActor(this);
  }

  public onCollide(result: CollisionResult): void {
    if (result.normal?.y === 1) {
      this.velocity.y = 0;
    }
  }

  public onRemoved(): void {
    super.onRemoved();
    this.direction = 1;
    this.onKilled.emit(this);
  }

  private _jump() {
    if (this.isRidingSolid() && !this.isJumping) {
      this.isJumping = true;
    }
  }

  public update(dt: number): void {
    this.velocity.x = this.direction * 500;
    if (this.isJumping) {
      this.velocity.y = Math.min(-this.system.gravity * 0.25, -600);
      this.view.setAnimation('jump');
      this.isJumping = false;
    } else {
      if (this.direction === 0) {
        if (this.view.currentAnimation !== 'stand') {
          this.view.setAnimation('stand');
        }
      } else {
        if (this.view.currentAnimation !== 'walk') {
          this.view.setAnimation('walk');
        }
      }
    }
    super.update(dt);
  }

  public postUpdate(): void {
    this._stopMove();
  }

  public updateView(): void {
    if (this.view && this.view.visible) {
      this.view.x = this._x - 2;
      if (this.direction === -1) {
        this.view.scale.x = -this.view.scale.y;
        this.view.x += this.view.width;
      } else {
        this.view.scale.x = this.view.scale.y;
      }
      this.view.y = this._y + 0;
    }
  }
}

class FX extends Actor<V8Application> {
  static ASSETS = ['beige', 'blue', 'brown', 'darkBrown', 'darkGrey', 'green', 'pink'];

  type = 'FX';
  debug: boolean = false;

  init(config: any) {
    super.init(config);
    const asset = FX.ASSETS[Math.floor(Math.random() * FX.ASSETS.length)];
    if (!this.view) {
      this.view = this.make.sprite({ sheet: 'jumper', asset: `Particles/particle_${asset}` });
    }
    const size = this.width;
    this.view.width = size;
    this.view.scale.y = this.view.scale.x;
  }

  update(dt: number): void {
    super.update(dt);
    if (this.isRidingSolid()) {
      this.velocity.x *= 0.95;
    }
  }
}

class Portal extends Sensor<V8Application> {
  type = 'Portal';
  collidableTypes = ['Player', 'FX'];
  private linkedPortal: Portal | null = null;
  public floating: boolean = false;
  private static PORTAL_SIZE = 48;

  constructor(config: any) {
    super({
      ...config,
      type: 'Portal',
      width: Portal.PORTAL_SIZE,
      height: Portal.PORTAL_SIZE * 1.5,
    });
  }

  initialize(): void {
    const container = new Container();

    const sprite = this.make.sprite({
      position: [Portal.PORTAL_SIZE / 2, Portal.PORTAL_SIZE / 2],
      sheet: 'jumper',
      asset: 'Items/portal_orange',
      anchor: 0.5,
      angle: 90,
      height: Portal.PORTAL_SIZE,
    });

    const sprite2 = this.make.sprite({
      position: [Portal.PORTAL_SIZE / 2, Portal.PORTAL_SIZE / 2],
      sheet: 'jumper',
      asset: 'Items/portal_yellow',
      anchor: 0.5,
      angle: 90,
      height: Portal.PORTAL_SIZE,
    });

    sprite.scale.x = sprite.scale.y / 2;
    sprite2.scale.x = sprite2.scale.y / 2;

    container.addChild(sprite);
    container.addChild(sprite2);

    gsap.to(sprite2.scale, {
      x: sprite2.scale.x * 1.5,
      y: sprite2.scale.y * 1.5,
      duration: 0.75,
      repeat: -1,
      yoyo: true,
      ease: 'none',
    });

    container.scale.y = 1.5;

    this.view = container;
    this.system.addView(this.view);
  }

  onActorEnter(actor: Actor): void {
    if (!this.active) return;
    // this.active = false;
    if (this.linkedPortal) {
      this.linkedPortal.active = false;
      if (actor.type === 'Player') {
        actor.velocity = { x: 0, y: 0 };
        actor.active = false;
        setTimeout(() => {
          actor.active = true;
        }, 100);
      }
      actor.moveTo(
        this.linkedPortal.x + this.linkedPortal.width / 2 - actor.width / 2,
        this.linkedPortal.y + this.linkedPortal.height - actor.height - 1,
      );
    }
  }

  onActorExit(): void {
    this.active = true;
  }

  linkTo(portal: Portal): void {
    this.linkedPortal = portal;
    portal.linkedPortal = this;
  }
}

export default class CrunchPhysicsScene extends BaseScene {
  title = 'Crunch Physics';
  subtitle = 'Particles: 0 (click to add more)';

  protected config = {
    debug: false,
    itemsToAdd: 100,
    gravity: 6000,
    maxVelocity: 1500,
    gridCellSize: 100,
    useCamera: false,
    boundary: {
      width: 800,
      height: 1500,
      bindToAppSize: true,
    },
    zoom: 1,
  };
  private physicsContainer: Container;
  private camera: Camera;

  private player: Player;
  private pf1: Platform;
  private pf2: Platform;
  private pf3: Platform;
  private portal1: Portal;
  private portal2: Portal;
  private portal3: Portal;
  private pool = new Pool<FX>(FX, 0);

  private group: Group;

  ui: UICanvas;

  get physics(): ICrunchPhysicsPlugin {
    return this.app.getPlugin('crunch-physics') as ICrunchPhysicsPlugin;
  }

  configureGUI() {
    const physicsFolder = this.gui.addFolder('Physics Settings');
    physicsFolder.open();
    physicsFolder.add(this.config, 'itemsToAdd', 0, 200, 1).name('Particles to add');
    physicsFolder.add(this.config, 'gravity', -8000, 8000, 500).onChange(() => {
      this.physics.system.gravity = this.config.gravity;
    });

    physicsFolder.add(this.config, 'maxVelocity', 0, 2000, 100).onChange(() => {
      this.physics.system.maxVelocity = this.config.maxVelocity;
    });

    const boundaryFolder = physicsFolder.addFolder('Boundary');
    boundaryFolder.add(this.config.boundary, 'width', 400, 2000, 100).onChange(() => {
      this.physics.system.boundary = new Rectangle(0, 0, this.config.boundary.width, this.config.boundary.height);
    });
    boundaryFolder.add(this.config.boundary, 'height', 300, 1500, 100).onChange(() => {
      this.physics.system.boundary = new Rectangle(0, 0, this.config.boundary.width, this.config.boundary.height);
    });
    boundaryFolder.add(this.config.boundary, 'bindToAppSize', true).onChange(() => {
      if (this.config.boundary.bindToAppSize) {
        this.physics.system.boundary = new Rectangle(0, 0, this.app.size.width, this.app.size.height);
      } else {
        this.physics.system.boundary = new Rectangle(0, 0, this.config.boundary.width, this.config.boundary.height);
      }
    });

    this.gui
      .add(this.config, 'zoom', 0.25, 3, 0.25)
      .onChange(() => {
        this._handleCameraZoomChanged();
      })
      .name('Camera Zoom');

    this.gui
      .add(this.config, 'useCamera')
      .onChange(() => {
        this._handleUseCameraChanged();
      })
      .name('Use Camera');

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

  protected _handleUseCameraChanged() {
    const { useCamera } = this.config;
    if (useCamera) {
      this.camera = new Camera({
        container: this.physicsContainer,
        viewportWidth: this.app.size.width,
        viewportHeight: this.app.size.height,
        worldWidth: this.app.size.width,
        worldHeight: this.app.size.height,
        minX: -300,
        minY: -1000,
        maxX: 300,
        maxY: 200,
        lerp: 0.1,
      });

      this.add.existing(this.camera);
      this.camera.follow(this.player.view, [this.app.screen.width * 0.25, -this.app.size.height * 0.25]);
      this._handleCameraZoomChanged();
    } else {
      this.removeChild(this.camera);
      // @ts-expect-error camera can't be null error
      this.camera = null;
      this.add.existing(this.physicsContainer);
      this.setChildIndex(this._headerBg, this.getChildIndex(this.physicsContainer));
      this.setChildIndex(this.titleContainer, this.getChildIndex(this.physicsContainer));

      this.physicsContainer.position.set(-this.app.size.width * 0.5, -this.app.size.height * 0.5);
      this.physicsContainer.pivot.set(0, 0);
    }
  }

  protected _handleCameraZoomChanged() {
    const { zoom } = this.config;
    if (this.camera) {
      this.camera.zoom(zoom);
    }
  }

  async initialize() {
    super.initialize();

    this.app.actionContext = 'game';
    this.physicsContainer = this.add.container();
    this._addBg();

    // Initialize physics with boundary from config
    await this.physics.initialize(this.app, {
      container: this.physicsContainer,
      gravity: this.config.gravity,
      maxVelocity: this.config.maxVelocity,
      gridSize: this.config.gridCellSize,
      debug: this.config.debug,
      shouldCull: true,
      boundary: this.config.boundary.bindToAppSize
        ? new Rectangle(0, 0, this.app.size.width, this.app.size.height)
        : new Rectangle(0, 0, this.config.boundary.width, this.config.boundary.height),
      // collisionResolver: this._resolveCollisions,
      // overlapResolver: this._resolveOverlaps,
    });

    this._createPortals();

    // Create platforms
    // ground
    this.createPlatform(0, this.app.size.height - 32, this.app.size.width, 32, 'ground_grass', true);

    // ceiling
    // this.createPlatform(0, 0, this.app.size.width, 32, 'ground_grass', true);

    // Platform 1
    this.pf1 = this.createPlatform(100, 600, 200, 32, 'ground_grass_small');

    // Platform 2 (moving)
    this.pf2 = this.createPlatform(400, 600, 200, 32, 'ground_grass');
    gsap.to(this.pf2, {
      y: 1200,
      duration: 3,
      ease: 'none',
      repeat: -1,
      yoyo: true,
    });

    // Platform 3
    this.pf3 = this.createPlatform(200, 200, 200, 32, 'ground_grass');

    // Test group
    this.group = new Group({
      type: 'Platforms',
    });

    this.group.add(this.pf1);
    this.group.add(this.pf2);
    this.group.add(this.pf3);

    this.group.data = { direction: -1 };

    this.pf1.update = () => {
      if (this.pf1.data.direction === 1) {
        this.pf1.x += 2;
        if (this.pf1.x > this.group.x + 600) {
          this.pf1.data.direction = -1;
        }
      } else {
        this.pf1.x -= 2;
        if (this.pf1.x < this.group.x) {
          this.pf1.data.direction = 1;
        }
      }
    };

    this._createPlayer();

    this.addControls();
    // Setup input handlers
    this.eventMode = 'static';
    this.on('click', (event: FederatedPointerEvent) => this._addParticles(new Point(event.globalX, event.globalY)));

    this._handleUseCameraChanged();
  }

  addControls() {
    this.ui = this.add.uiCanvas({ padding: 10, useAppSize: true });
    this.ui.zIndex = 100;

    this._joystick = new Joystick({
      inner: this.make.sprite({
        asset: 'joystick/handle',
        sheet: 'ui',
      }),
      outer: this.make.sprite({
        asset: 'joystick/base',
        sheet: 'ui',
      }),
      innerScale: 0.7,
      outerScale: 0.7,
    });

    const jumpButton = this._addButton('a', 'jump');

    this.ui.addElement(this._joystick, { align: 'bottom left', padding: { left: 0, bottom: 20 } });
    this.ui.addElement(jumpButton, { align: 'bottom right', padding: { bottom: 10, right: 10 } });

    this.app.controls.touch.addButton(jumpButton);
    this.app.controls.touch.joystick = this._joystick;

    if (!this.app.isTouch) {
      this._joystick.visible = false;
      jumpButton.visible = false;
    }
  }

  private _addButton(buttonId: string, action: string): Button {
    return this.make.button({
      cursor: 'pointer',
      scale: 0.5,
      textures: {
        default: `btn_${buttonId}/up`,
        hover: `btn_${buttonId}/over`,
        disabled: `btn_${buttonId}/up`,
        active: `btn_${buttonId}/down`,
      },
      sheet: 'ui',
      accessibleTitle: action,
      accessibleHint: `Press to ${action}`,
      id: `${buttonId.toUpperCase()}`,
    });
  }
  private _joystick: Joystick;

  private _resolveCollisions(collisions: Collision[]): void {
    console.log(collisions);
    collisions.forEach((collision) => {
      console.log('collision', collision.type);
    });
  }

  // private _resolveOverlaps(overlaps: SensorOverlap[]): void {
  // overlaps.forEach((overlap) => {
  //   console.log('overlap', overlap.type);
  // });
  // }

  _addBg() {
    for (let i = 1; i <= 4; i++) {
      this.physicsContainer.add.sprite({
        sheet: 'jumper',
        asset: `Background/bg_layer${i}`,
        anchor: [0.5, 0],
      });
    }
  }

  protected _createPlayer(): void {
    // Create player sprite (circular)
    this.player = new Player({ position: [125, this.app.size.height - 97], size: [32, 62] });
    this.physics.system.addActor(this.player);
    this.player.onKilled.connectOnce(this._createPlayer);

    if (this.camera) {
      this.camera.follow(this.player.view, [this.app.screen.width * 0.25, -this.app.size.height * 0.25]);
    }

    if (this.pf2) {
      this.pf2.player = this.player;
    }
  }

  protected _handleDebugChanged() {
    this.physics.system.debug = this.config.debug;
  }

  protected _handleGridCellSizeChange() {
    this.physics.system.gridSize = this.config.gridCellSize;
  }

  private createPlatform(
    x: number,
    y: number,
    width: number,
    height: number,
    asset: string,
    isGround: boolean = false,
  ): Platform {
    const sprite = isGround
      ? this.physicsContainer.add.tilingSprite({
          sheet: 'jumper',
          asset: `Environment/${asset}`,
          width,
          height,
          tileScale: { x: 1, y: 0.4 },
        })
      : this.physicsContainer.add.sprite({ sheet: 'jumper', asset: `Environment/${asset}`, width, height });

    return this.physics.createSolid({
      class: Platform,
      type: 'Platform',
      x,
      y,
      width,
      height,
      view: sprite,
    }) as Platform;
  }

  private _addParticles(pt: Point) {
    pt = this.physicsContainer.toLocal(pt);
    const amount = this.config.itemsToAdd;
    for (let i = 0; i < amount; i++) {
      const size = Math.round(4 + Math.random() * 10);
      const actor = this.pool.get({ position: pt, size });

      this.physics.system.addActor(actor);
      this.physicsContainer.addChild(actor.view);

      // Give initial random velocity
      const angle = Math.random() * Math.PI * 2;
      const amt = Math.max(this.physics.system.gravity * 0.1, 200);
      const speed = amt + Math.random() * amt;

      actor.velocity.x = Math.cos(angle) * speed;
      actor.velocity.y = Math.sin(angle) * speed;

      actor.onCull = () => {
        this.pool.return(actor);
      };

      actor.squish = () => {
        this.pool.return(actor);
      };
    }
  }

  private _createPortals(): void {
    // Create two portals on opposite sides of the scene
    this.portal1 = new Portal({
      position: [200, 400],
      id: 'portal1',
    });
    this.physics.system.addSensor(this.portal1);

    this.portal2 = new Portal({
      position: [700, 800],
      id: 'portal2',
    });
    this.physics.system.addSensor(this.portal2);

    this.portal3 = new Portal({
      position: [275, 80],
      id: 'portal3',
    });
    this.physics.system.addSensor(this.portal3);

    // Link the portals together
    this.portal1.linkTo(this.portal2);

    this.portal3.linkTo(this.portal1);
  }

  update() {
    if (this.player && this.camera) {
      this.camera.update();
    }
    this.player.velocity.x *= 0.3; // Deceleration
    this._subtitle.text = `Particles: ${this.physics.system.getActorsByType('FX')?.length || 0} (click to add more)`;
  }

  resize() {
    super.resize();
    this.physicsContainer.position.set(-this.app.size.width / 2, -this.app.size.height / 2);
  }

  destroy(): void {
    this.pool.clear();
    this.physics.destroy();
    super.destroy();
  }
}
