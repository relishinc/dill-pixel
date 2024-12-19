import BaseScene from '@/scenes/BaseScene';
import {
  ArcadePhysics,
  default as ArcadePhysicsPlugin,
  Body,
  Entity,
  StaticBody,
} from '@dill-pixel/plugin-arcade-physics';
import { Button, Camera, Container, Joystick, SpineAnimation, UICanvas } from 'dill-pixel';
import { Texture, Ticker } from 'pixi.js';

export const id = 'arcade-physics';
export const debug = {
  group: 'Physics',
  label: 'Arcade',
};

export const plugins = ['arcade-physics'];
export const assets = {
  preload: {
    bundles: ['spine', 'game'],
  },
};

class Player extends Entity {
  private _jumpTimer: number = 0;
  private _time: number = 0;
  private _jumping: boolean;

  constructor() {
    super();
  }

  protected declare _view: SpineAnimation;

  get view(): SpineAnimation {
    return this._view;
  }

  set view(value: SpineAnimation) {
    this._view = value;
    this.updateBody();
  }

  getBoundingBox() {
    if (!this._cachedBounds) {
      this._cachedBounds = this.getLocalBounds();
      this._cachedBounds.width -= 20;
      this._cachedBounds.height -= 10;
    }
    return this._cachedBounds;
  }

  create() {
    this.view = this.add.spineAnimation({
      data: 'spine/spineboy-pro.skel',
      animationName: 'idle',
      loop: true,
      scale: 0.25,
    });
    this.offset.y = 78;
    this.body.setCollideWorldBounds(true);
    this.body.bounce.y = 0.01;
    this.body.maxVelocity.y = 625;
  }

  update(ticker: Ticker) {
    this.body.velocity.x = 0;
    if (this.app.controls.isActionActive('jump') && this.body.onFloor() && this._time > this._jumpTimer) {
      this._jumping = true;
      this.body.velocity.y = -1000;
    } else if (this.body.onFloor()) {
      this._jumping = false;
    }
    if (this.app.controls.isActionActive('move_left')) {
      this.view.spine.scale.x = -1;
      this.body.velocity.x = -150;
      if (!this._jumping && this.view.getCurrentAnimation() !== 'run') {
        this.view.setAnimation('run', true);
      }
    } else if (this.app.controls.isActionActive('move_right')) {
      this.view.spine.scale.x = 1;
      this.body.velocity.x = 150;
      if (!this._jumping && this.view.getCurrentAnimation() !== 'run') {
        this.view.setAnimation('run', true);
      }
    } else {
      if (!this._jumping && this.view.getCurrentAnimation() !== 'idle') {
        this.view.setAnimation('idle', true);
      }
    }
    this._time += ticker.elapsedMS;
    super.update();
  }
}

class Box extends Entity {
  constructor(isCircle: boolean = false) {
    super();
    this.bodyType = isCircle ? 'circle' : 'rectangle';
  }

  create() {
    this.view = this.add.sprite({
      asset: 'jar',
      sheet: 'game/sheet',
      scale: 0.25,
      anchor: 0.5,
    });
    if (this.bodyType === 'circle') {
      this.offset.y = -10;
      this.body.setBounce(0.8);
    } else {
      this.body.setBounce(0.2);
    }
    this.body.setCollideWorldBounds(true);
  }
}

type PlatformConfig = {
  x: number;
  y: number;
  width: number;
  height: number;
  movement?: {
    x?: { speed: number; direction: -1 | 1; range: number };
    y?: { speed: number; direction: -1 | 1; range: number };
  };
};

class Platform extends Entity {
  type = 'actor';
  startPos: { x: number; y: number };

  constructor(public config: PlatformConfig) {
    super();
  }

  create() {
    this.view = this.add.sprite({
      asset: Texture.WHITE,
      anchor: 0.5,
      width: this.config.width,
      height: this.config.height,
    });

    this.body.immovable = true;
    this.body.setAllowGravity(false);

    if (this.config.movement) {
      this.startPos = { x: this.body.x, y: this.body.y };
      if (this.config.movement.x) {
        this.body.velocity.x = this.config.movement.x.speed * this.config.movement.x.direction;
      }
      if (this.config.movement.y) {
        this.body.velocity.y = this.config.movement.y.speed * this.config.movement.y.direction;
      }
    }
  }

  update() {
    super.update();
    if (this.config.movement) {
      if (this.config.movement.x) {
        if (
          this.body.x >= this.startPos.x + this.config.movement.x.range ||
          this.body.x <= this.startPos.x - this.config.movement.x.range
        ) {
          this.body.velocity.x = this.body.velocity.x * -1;
        }
      }
      if (this.config.movement.y) {
        if (
          this.body.y >= this.startPos.y + this.config.movement.y.range ||
          this.body.y <= this.startPos.y - this.config.movement.y.range
        ) {
          this.body.velocity.y = this.body.velocity.y * -1;
        }
      }
    }
  }
}

export default class ArcadePhysicsScene extends BaseScene {
  ui: UICanvas;
  protected readonly title = 'Arcade Physics';
  protected readonly subtitle = 'Arrows to move, up to jump';
  protected level: Container;
  protected actors: Box[] = [];
  protected platforms: Platform[] = [];
  protected player: Player;
  protected config = {
    useCamera: true,
    zoom: 1,
    debug: true,
  };
  private _joystick: Joystick;
  private _camera: Camera;

  protected get physicsPlugin(): ArcadePhysicsPlugin {
    return this.app.getPlugin('arcade-physics') as unknown as ArcadePhysicsPlugin;
  }

  protected get physics(): ArcadePhysics {
    return this.physicsPlugin.physics;
  }

  configureGUI() {
    this.gui
      .add(this.config, 'useCamera')
      .onChange(() => {
        this._handleUseCameraChanged();
      })
      .name('Use Camera');

    this.gui
      .add(this.config, 'zoom', 0.24, 3, 0.05)
      .onChange(() => {
        this._handleCameraZoomChanged();
      })
      .name('Camera Zoom');

    this.gui
      .add(this.config, 'debug')
      .onChange(() => {
        this._handleDebugChanged();
      })
      .name('Debug Physics');
  }

  destroy() {
    this.physicsPlugin.destroy();
    super.destroy();
  }

  async initialize() {
    await super.initialize();
    this.app.exec.setActionContext('game');
    this.app.focus.addFocusLayer(this.id);
    this.eventMode = 'static';
    // this.on('click', this._addBox);
    this.level = this.add.container();
    this.physicsPlugin.container = this.level;
    this.level.position.set(-this.app.size.width * 0.5, -this.app.size.height * 0.5);
    this.physics.world.gravity.y = 1000;

    this._addPlatform({
      width: this.app.size.width * 2,
      height: 30,
      x: this.app.size.width * 0.5,
      y: this.app.size.height - 200,
    });
    this._addPlatform({
      width: 200,
      height: 20,
      x: this.app.size.width * 0.5,
      y: this.app.size.height - 300,
      movement: {
        y: { speed: 10, direction: -1, range: 300 },
      },
    });

    this.player = this.level.add.existing(new Player());
    this.platforms.forEach((p) => {
      this.physics.add.collider(p.body, this.player.body);
      this.physics.add.overlap(p.body, this.player.body, this._squish);
    });
    this.ui = this.add.uiCanvas({ padding: 10, useAppSize: true });
    this.ui.zIndex = 100;

    const jumpButton = this._addButton('a', 'jump');

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

    this.ui.addElement(this._joystick, { align: 'bottom left', padding: { left: 10, bottom: 110 } });
    this.ui.addElement(jumpButton, { align: 'bottom right', padding: { bottom: 120, right: 10 } });

    this.app.controls.touch.addButton(jumpButton);
    this.app.controls.touch.joystick = this._joystick;

    if (!this.app.isMobile) {
      this._joystick.visible = false;
      jumpButton.visible = false;
    }

    this.physics.world.bounds.x -= this.app.size.width * 0.5;
    this.physics.world.bounds.width = this.app.size.width * 2;

    this._handleUseCameraChanged();
    this._handleDebugChanged();
  }

  update(ticker: Ticker) {
    // this.physics.system.update(ticker.deltaTime);
    if (this.physics?.world) {
      this.physics.world.update(ticker.deltaTime, 1000 / 60);
      this.physics.world.postUpdate();
    }
    if (this._camera) {
      this._camera.update();
    }
  }

  resize() {
    super.resize();
  }

  protected _handleDebugChanged() {
    const { debug } = this.config;
    this.physicsPlugin.debug = debug;
  }

  protected _handleCameraZoomChanged() {
    const { zoom } = this.config;
    if (this._camera) {
      this._camera.zoom(zoom);
    }
  }

  protected _handleUseCameraChanged() {
    const { useCamera } = this.config;
    if (useCamera) {
      this._camera = new Camera({
        container: this.level,
        viewportWidth: this.app.size.width,
        viewportHeight: this.app.size.height,
        worldWidth: this.physics.world.bounds.width,
        worldHeight: this.physics.world.bounds.height,
        minX: -300,
        minY: -1000,
        maxX: 300,
        maxY: 200,
        lerp: 0.1,
      });
      this.add.existing(this._camera);
      this._camera.follow(this.player, [this.app.screen.width * 0.25, -100]);
      this._handleCameraZoomChanged();
    } else {
      this.removeChild(this._camera);
      // @ts-expect-error camera can't be null error
      this.camera = null;
      this.addChild(this.level);
      this.level.position.set(-this.app.size.width * 0.5, -this.app.size.height * 0.5);
      this.level.pivot.set(0, 0);
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

  private _squish(a: Body | StaticBody, b: Body | StaticBody) {
    // logic to squish player
    const platform = a as StaticBody;
    const player = b as Body;
    if (
      player.onFloor() &&
      platform.bottom > player.top + 1 &&
      platform.bottom < player.top + 5 &&
      (player.right > platform.left || player.left < platform.right)
    ) {
      player.position.set(0, 100);
    }
  }

  private _addPlatform(config: PlatformConfig) {
    const platform = new Platform(config);
    platform.x = config.x;
    platform.y = config.y;
    this.platforms.push(platform);
    this.platforms.forEach((b) => {
      this.actors.forEach((a) => {
        this.physics.add.collider(b.body, a.body);
      });
    });
    this.level.add.existing(platform);
  }
}
