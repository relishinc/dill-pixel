import { Camera } from '@/entities/Camera';
import { Door } from '@/entities/physics/Door';
import { Platform, PlatformMovementConfigOpts } from '@/entities/physics/Platform';
import { Player } from '@/entities/physics/Player';
import { Portal } from '@/entities/physics/Portal';

import { BaseScene } from '@/scenes/BaseScene';
import { Container, delay, FlexContainer } from '@relish-studios/dill-pixel';
import { Assets, Ticker } from 'pixi.js';
import { Collision, TowerFallPhysicsPlugin } from '../../../src/plugins/physics/towerfall';

export class TowerFallPhysicsScene extends BaseScene {
  controls: FlexContainer;
  level: Container;
  player: Player;
  platforms: Platform[] = [];
  doors: Door[] = [];
  portals: Portal[] = [];
  _isPaused: boolean = false;
  camera: Camera;
  protected readonly title = 'TowerFall Physics';
  protected readonly subtitle = 'Arrows to move, up to jump';
  protected config = {
    useCamera: true,
    zoom: 1,
    useSpatialHash: true,
    gridCellSize: 400,
    debug: true,
  };
  private _zoomed: boolean = false;

  // private _debugGfx = new Graphics();

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
      .add(this.config, 'zoom', 1, 4, 0.1)
      .onChange(() => {
        this._handleCameraZoomChanged();
      })
      .name('Camera Zoom');

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
    await Assets.loadBundle('spine');
    this.app.focus.addFocusLayer(this.id);

    this.level = this.add.container({
      label: 'Level',
      position: [-this.app.size.width * 0.5, -this.app.size.height * 0.5],
    });

    this.physics.system.initialize({
      gravity: 9.8,
      container: this.level,
      debug: false,
      boundary: {
        width: 2000,
        height: this.app.size.height,
        thickness: 10,
        padding: 5,
        sides: ['bottom', 'left', 'right'],
      },
      collisionResolver: this._resolveCollision,
    });
    const bottom = this.app.size.height - 150;
    this.addPlatforms(bottom);
    this.addDoors(bottom);
    this.addPortals(bottom);
    this.addPlayer();
    this.addControls();

    this._handleDebugChanged();
    this._handleUseCameraChanged();

    this.app.keyboard.onKeyDown('z').connect(this._toggleZoom);
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
    this.camera.viewportWidth = this.app.size.width;
    this.camera.viewportHeight = this.app.size.height;

    this.controls.x = -this.app.size.width * 0.5 + 20;
    this.controls.y = this.app.size.height * 0.5 - (window.innerHeight > window.innerWidth ? 400 : 100);
    this.controls.containerWidth = this.app.size.width - 40;

    // if (this._debugGfx) {
    // this._drawDebug();
    // }
  }

  addPlatforms(bottom: number) {
    // floor
    this.addPlatForm(1000, bottom, 2000);

    // first junction
    this.addPlatForm(500, bottom - 88, 30, 160);
    this.addPlatForm(500, bottom - 178, 150, 20, false);

    // hor
    this.addPlatForm(750, bottom - 300, 200, 20, false, true, {
      speed: [1, 0],
      startingDirection: { x: 1, y: 0 },
      range: [180, 0],
    });

    // second junction
    this.addPlatForm(1200, bottom - 183, 30, 350);
    this.addPlatForm(1265, bottom - 200, 100, 20, false);
    // vert
    this.addPlatForm(1110, bottom - 200, 150, 20, false, true, {
      speed: [0, 1],
      startingDirection: { x: 0, y: 1 },
      range: [200, 300],
    });

    // holds portal
    this.addPlatForm(1700, bottom - 500, 200, 20, false, true, {
      speed: [0, 1],
      startingDirection: { x: 0, y: 1 },
      range: [0, 300],
    });
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

  addDoors(bottom: number) {
    this.addDoor(150, bottom - 80);
  }

  addDoor(x: number, y: number) {
    const door = this.level.add.existing(new Door(), { x, y });
    this.doors.push(door);
  }

  addPortals(bottom: number) {
    const portal2 = this.addPortal(400, bottom - 80);
    const portal3 = this.addPortal(600, bottom - 80);

    const portal1 = this.addPortal(1700, bottom - 580);

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

    this.controls.layout();
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

  protected _handleCameraZoomChanged() {
    const { zoom } = this.config;
    if (this.camera) {
      this.camera.zoom(zoom);
    }
  }

  protected _handleUseCameraChanged() {
    const { useCamera } = this.config;
    if (useCamera) {
      this.camera = new Camera({
        container: this.level,
        viewportWidth: this.app.size.width,
        viewportHeight: this.app.size.height,
        worldWidth: this.physics.system.worldWidth,
        worldHeight: this.physics.system.worldHeight,
        minX: -50,
        minY: -1000,
        maxX: 50,
        maxY: 200,
        lerp: 0.1,
      });
      this.add.existing(this.camera);
      this.camera.follow(this.player, [this.app.screen.width * 0.25, -100]);
      this._handleCameraZoomChanged();
    } else {
      this.removeChild(this.camera);
      // @ts-expect-error camera can't be null error
      this.camera = null;
      this.addChild(this.level);
      this.level.position.set(-this.app.size.width * 0.5, -this.app.size.height * 0.5);
      this.level.pivot.set(0, 0);
    }
  }

  // private _drawDebug() {
  //   this._debugGfx.clear();
  //   this._debugGfx.strokeStyle = { width: 1, color: 0xff0000 };
  //   this._debugGfx
  //     .moveTo(0, -this.app.size.height * 0.25)
  //     .lineTo(0, this.app.size.height * 0.25)
  //     .moveTo(-this.app.size.width * 0.25, 0)
  //     .lineTo(this.app.size.width * 0.25, 0)
  //     .stroke();
  // }

  private _toggleZoom() {
    if (this._zoomed) {
      this._zoomed = false;
      this.camera.zoom(1);
    } else {
      this._zoomed = true;
      this.camera.zoom(2);
    }
  }

  private _handleSpatialHashChanged() {
    this.physics.useSpatialHash = this.config.useSpatialHash;
  }

  private _handleGridCellSizeChange() {
    this.physics.gridCellSize = this.config.gridCellSize;
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
