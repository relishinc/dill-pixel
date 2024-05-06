import { Camera, CameraController } from '@/entities/Camera';
import { Door } from '@/entities/physics/Door';
import { Platform, PlatformMovementConfigOpts } from '@/entities/physics/Platform';
import { Player } from '@/entities/physics/Player';
import { Portal } from '@/entities/physics/Portal';

import { BaseScene } from '@/scenes/BaseScene';
import { Container, delay, FlexContainer } from '@relish-studios/dill-pixel';
import { Assets, Ticker } from 'pixi.js';
import { Collision, TowerFallPhysicsPlugin } from '../../../src/plugins/physics/towerfall';

export class TowerFallPhysicsScene extends BaseScene {
  protected readonly title = 'TowerFall Physics';
  protected readonly subtitle = 'Arrows to move, up to jump';
  protected config = {
    useCamera: true,
    debug: false,
  };
  controls: FlexContainer;
  level: Container;
  player: Player;
  platforms: Platform[] = [];
  doors: Door[] = [];
  portals: Portal[] = [];
  _isPaused: boolean = false;

  camera: Camera;
  cameraController: CameraController;

  protected get physics(): TowerFallPhysicsPlugin {
    return this.app.getPlugin('physics') as TowerFallPhysicsPlugin;
  }

  configureGUI() {
    this.gui
      .add(this.config, 'useCamera')
      .onChange(() => {
        this._handleUseCameraChanged();
      })
      .name('Use Camera');

    this.gui
      .add(this.config, 'debug')
      .onChange(() => {
        this._handleDebugChanged();
      })
      .name('Debug Physics');
  }

  async initialize() {
    await super.initialize();
    await Assets.loadBundle('spine');
    this.app.focus.addFocusLayer(this.id);
    this.level = this.add.container();

    this.physics.system.initialize({
      gravity: 9.8,
      container: this.level,
      debug: false,
      boundary: {
        width: Math.max(2000, this.app.size.width),
        height: this.app.size.height,
        thickness: 10,
        padding: 5,
        sides: ['bottom', 'left', 'right'],
      },
      collisionResolver: this._resolveCollision,
    });

    this.addPlatforms();
    this.addDoors();
    this.addPortals();
    this.addPlayer();
    this.addControls();

    this._handleUseCameraChanged();
  }

  async start() {
    await delay(0.5);
  }

  update(ticker: Ticker) {
    if (this._isPaused) return;

    if (
      this.app.keyboard.isKeyDown('ArrowUp') ||
      this.app.keyboard.isKeyDown(' ') ||
      this.app.keyboard.isKeyDown('w')
    ) {
      this.app.sendAction('jump');
    }

    if (this.app.keyboard.isKeyDown('ArrowLeft')) {
      this.app.sendAction('move_left');
    }
    if (this.app.keyboard.isKeyDown('a')) {
      this.app.sendAction('move_left');
    }
    if (this.app.keyboard.isKeyDown('ArrowRight')) {
      this.app.sendAction('move_right');
    }
    if (this.app.keyboard.isKeyDown('d')) {
      this.app.sendAction('move_right');
    }

    this.physics.system.update(ticker.deltaTime);
    if (this.camera) {
      this.camera.update();
    }
  }

  resize() {
    super.resize();
    this.controls.x = -this.app.size.width * 0.5 + 20;
    this.controls.y = this.app.size.height * 0.5 - (window.innerHeight > window.innerWidth ? 400 : 100);
    this.controls.containerWidth = this.app.size.width - 40;
  }

  addPlatforms() {
    this.addPlatForm(0, 300, Math.max(2000, this.app.size.width));
    this.addPlatForm(-300, 213, 30, 160);
    this.addPlatForm(-300, 123, 150, 20, false);
    this.addPlatForm(300, 118, 30, 350);
    this.addPlatForm(365, 100, 100, 20, false);
    this.addPlatForm(this.app.size.width * 0.5 - 100, -120, 200, 20, false, true, {
      speed: [0, 1],
      startingDirection: { x: 0, y: 1 },
      range: [200, 300],
    });
    // vert
    this.addPlatForm(210, 100, 150, 20, false, true, {
      speed: [0, 1],
      startingDirection: { x: 0, y: 1 },
      range: [200, 300],
    });

    // hor
    this.addPlatForm(-50, 0, 200, 20, false, true, {
      speed: [1, 0],
      startingDirection: { x: 1, y: 0 },
      range: [180, 0],
    });

    // both hor and vert
    // this.addPlatForm(0, 150, 300, 15, true, { speed: [1, 1], startingDirection: { x: 1, y: 1 }, range: [200, 200] });
  }

  addPlatForm(
    x: number,
    y: number,
    width: number,
    height = 15,
    canJumpThroughBottom: boolean = false,
    moving: boolean = false,
    movementConfig?: PlatformMovementConfigOpts,
    color: number = 0x00fff0,
  ) {
    const platform = this.level.add.existing(
      new Platform({
        width,
        height,
        color,
        canJumpThroughBottom,
        moving,
        movementConfig,
      }),
      { x, y },
    );
    this.platforms.push(platform);
  }

  addDoors() {
    this.addDoor(-750, 0);
  }

  addDoor(x: number, y: number) {
    const door = this.level.add.existing(new Door(), { x, y });
    this.doors.push(door);
  }

  addPortals() {
    const portal1 = this.addPortal(this.app.size.width * 0.5 - 100, -200);
    const portal2 = this.addPortal(-500, 0);
    const portal3 = this.addPortal(-230, 200);
    portal1.debug = true;
    portal1.connect(portal3);
    portal2.connect(portal1);
    portal3.connect(portal2);
  }

  addPortal(x: number, y: number) {
    const portal = this.level.add.existing(new Portal(), { x, y });
    this.portals.push(portal);
    return portal;
  }

  addPlayer() {
    let delay = 0.5;
    if (!this.player) {
      delay = 1;
      this.player = new Player();
      this.player.onKilled.connect(this._handlePlayerKilled);
    }
    this.level.add.existing(this.player);
    this.player.spawn({ x: this.doors[0].x, y: this.doors[0].y }, delay);
  }

  addControls() {
    this.controls = this.add.flexContainer({
      justifyContent: 'space-between',
      width: this.app.size.width - 40,
      height: 100,
      x: -this.app.size.width * 0.5 + 20,
      y: this.app.size.height * 0.5 - (window.innerHeight > window.innerWidth ? 400 : 100),
    });

    const leftSide = this.controls.add.flexContainer({ gap: 10 });
    const rightSide = this.controls.add.flexContainer({ gap: 10 });

    const leftButton = this.makeControl('←', () => {
      this.app.sendAction('move_left');
    });
    const rightButton = this.makeControl('→', () => {
      this.app.sendAction('move_right');
    });
    const jumpButton = this.makeControl('JUMP', () => {
      this.app.sendAction('jump');
    });

    leftSide.add.existing(leftButton);
    leftSide.add.existing(rightButton);
    rightSide.add.existing(jumpButton);
  }

  makeControl(label: string = 'Button', callback: () => void) {
    const btn = this.make.button({
      scale: 0.5,
      cursor: 'pointer',
      textures: { default: 'btn/blue', hover: 'btn/yellow', disabled: 'btn/grey', active: 'btn/red' },
      sheet: 'ui.json',
      accessibleTitle: label,
      accessibleHint: `Press me to play a sound`,
    });

    btn.add.text({
      text: label,
      anchor: 0.5,
      style: { fill: 0xffffff, fontWeight: 'bold', fontSize: 48, align: 'center' },
    });

    btn.addIsDownCallback(label, callback);

    btn.label = label;
    this.app.focus.add(btn, this.id, false);
    return btn;
  }

  _handlePlayerKilled() {
    this.removeChild(this.player);
    this.addPlayer();
  }

  protected _handleDebugChanged() {
    const { debug } = this.config;
    this.physics.system.debug = debug;
  }

  protected _handleUseCameraChanged() {
    const { useCamera } = this.config;
    if (useCamera) {
      this.camera = new Camera({
        container: this.level,
        viewportWidth: this.app.size.width,
        viewportHeight: this.app.size.height,
        worldWidth: 4000,
        worldHeight: 4000,
        target: this.player,
        lerp: 0.05,
      });
    } else {
      // @ts-expect-error camera can't be null error
      this.camera = null;
      this.level.position.set(0, 0);
      this.level.pivot.set(0, 0);
    }
  }

  private _resolveCollision(collision: Collision) {
    switch (collision.type) {
      case 'Portal|Player':
      case 'Portal|FX':
      case 'Player|FX':
      case 'FX|Player':
        return false;
      case 'Player|Platform':
        // eslint-disable-next-line no-case-declarations
        const platform = collision.entity2 as Platform;
        // eslint-disable-next-line no-case-declarations
        const player = collision.entity1 as Player;
        if (platform.canJumpThroughBottom) {
          if (collision.top) {
            player.setPassingThrough(platform);
          } else if (player.bottom <= platform.top) {
            player.removePassingThrough(platform);
          }
          return !player.isPassingThrough(platform);
        }
        return true;
      default:
        return true;
    }
  }
}
