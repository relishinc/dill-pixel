import { Camera, CameraController } from '../entities/Camera.ts';
import { Collision, TowerFallPhysicsPlugin } from '../../../src/plugins/physics/towerfall';
import { Container, delay } from '@relish-studios/dill-pixel';
import { Platform, PlatformMovementConfigOpts } from '../entities/physics/Platform.ts';

import { BaseScene } from './BaseScene';
import { Door } from '../entities/physics/Door.ts';
import { Player } from '../entities/physics/Player.ts';
import { Portal } from '../entities/physics/Portal.ts';
import { Ticker } from 'pixi.js';

export class TowerFallPhysicsScene extends BaseScene {
  protected readonly title = 'TowerFall Physics';
  protected readonly subtitle = 'Arrows to move, up to jump';
  protected config = {
    useCamera: false,
    debug: false,
  };

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
    this.level = this.add.container();

    this.physics.system.initialize({
      gravity: 9.8,
      container: this.level,
      debug: false,
      boundary: {
        width: this.app.size.width,
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
    this.physics.system.onCollision.connect(this._handleCollision);

    this.app.func.onKeyDown('D').connect(() => {
      this.physics.system.debug = !this.physics.system.debug;
    });
  }

  async start() {
    await delay(0.5);
  }

  update(ticker: Ticker) {
    if (this._isPaused) return;

    if (this.app.keyboard.isKeyDown('ArrowLeft')) {
      this.app.func.sendAction('move_left');
    }
    if (this.app.keyboard.isKeyDown('ArrowRight')) {
      this.app.func.sendAction('move_right');
    }
    if (this.app.keyboard.isKeyDown('ArrowUp')) {
      this.app.func.sendAction('jump');
    }

    this.physics.system.update(ticker.deltaTime);
    if (this.camera) {
      this.camera.update();
    }
  }

  _handleCollision(collision: Collision) {
    switch (collision.type) {
      case 'Portal|Player':
      case 'Portal|FX':
        if ((collision.entity1 as Portal).connectedPortal && (collision.entity1 as Portal).connectedPortal.enabled) {
          (collision.entity1 as Portal).passThrough(collision.entity2);
        }
        break;
    }
  }

  addPlatforms() {
    this.addPlatForm(0, 300, this.app.size.width);
    this.addPlatForm(-300, 213, 30, 160);
    this.addPlatForm(-300, 123, 150, 20);
    this.addPlatForm(300, 118, 30, 350);
    this.addPlatForm(365, 100, 100, 20);
    this.addPlatForm(this.app.size.width * 0.5 - 100, -120, 200, 20, true, {
      speed: [0, 1],
      startingDirection: { x: 0, y: 1 },
      range: [200, 300],
    });
    // vert
    this.addPlatForm(210, 100, 150, 20, true, { speed: [0, 1], startingDirection: { x: 0, y: 1 }, range: [200, 300] });

    // hor
    this.addPlatForm(-50, 0, 200, 20, true, { speed: [1, 0], startingDirection: { x: 1, y: 0 }, range: [180, 0] });

    // both hor and vert
    // this.addPlatForm(0, 150, 300, 15, true, { speed: [1, 1], startingDirection: { x: 1, y: 1 }, range: [200, 200] });
  }

  addPlatForm(
    x: number,
    y: number,
    width: number,
    height = 15,
    moving: boolean = false,
    movementConfig?: PlatformMovementConfigOpts,
    color: number = 0x00fff0,
  ) {
    const platform = this.level.add.existing(
      new Platform({
        width,
        height,
        color,
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
      this.camera = null;
      this.level.position.set(0, 0);
      this.level.pivot.set(0, 0);
    }
  }

  private _resolveCollision(collision: Collision) {
    switch (collision.type) {
      case 'Portal|Player':
      case 'Portal|FX':
        return false;
      default:
        return true;
    }
  }
}
