import { Camera, Container, delay, UICanvas } from 'dill-pixel';
import { Collision, default as SnapPhysics } from '@dill-pixel/plugin-snap-physics';
import { Platform, PlatformMovementConfigOpts } from '@/entities/physics/Platform';

import { BaseScene } from '@/scenes/BaseScene';
import { Door } from '@/entities/physics/Door';
import { GUIController } from 'dat.gui';
import { Joystick } from '@/ui/Joystick';
import { Player } from '@/entities/physics/Player';
import { Portal } from '@/entities/physics/Portal';
import { gsap } from 'gsap';

export class SnapPhysicsScene extends BaseScene {
  ui: UICanvas;
  level: Container;
  player: Player;
  platforms: Platform[] = [];
  doors: Door[] = [];
  portals: Portal[] = [];
  _isPaused: boolean = false;
  camera: Camera;
  protected readonly title = 'Snap Physics';
  protected readonly subtitle = 'Arrows to move, up to jump';
  protected config = {
    useCamera: true,
    zoom: 1,
    useSpatialHash: true,
    gridCellSize: 300,
    debug: true,
  };
  private _zoomController: GUIController;

  private _joystick: Joystick;

  protected get physics(): SnapPhysics {
    return this.app.getPlugin('physics') as unknown as SnapPhysics;
  }

  configureGUI() {
    this.gui
      .add(this.config, 'useCamera')
      .onChange(() => {
        this._handleUseCameraChanged();
      })
      .name('Use Camera');

    this._zoomController = this.gui
      .add(this.config, 'zoom', 0.25, 3, 0.05)
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

  destroy() {
    this.app.ticker.maxFPS = 0;
    this.physics.destroy();
    super.destroy();
  }

  async initialize() {
    await super.initialize();

    this.app.exec.setActionContext('game');
    this.app.focus.addFocusLayer(this.id);

    this.level = this.add.container({
      position: [-this.app.size.width * 0.5, -this.app.size.height * 0.5],
      label: 'Level',
    });

    this.app.ticker.maxFPS = 60;
    this.physics.system.initialize({
      gravity: 10,
      container: this.level,
      debug: this.config.debug,
      useSpatialHashGrid: this.config.useSpatialHash,
      cellSize: this.config.gridCellSize,
      fps: 60,
      boundary: {
        width: 2400,
        height: this.app.size.height - 300,
        thickness: 20,
        padding: 0,
        sides: ['bottom'],
      },
      collisionResolver: this._resolveCollision,
    });
    const bottom = this.app.size.height - 300;
    this.addPlatforms(bottom);
    this.addDoors(bottom);
    this.addPortals(bottom);
    this.addPlayer();
    this.addControls();

    this.physics.system.enabled = true;
    this.physics.system.updateHooks.add(this.physicsUpdate);

    this._handleDebugChanged();
    this._handleUseCameraChanged();

    this.app.keyboard.onKeyDown('z').connect(this._toggleZoom);
  }

  async start() {}

  physicsUpdate() {
    if (this._isPaused) return;
    if (this.app.keyboard.isKeyDown('w')) {
      this.app.sendAction('jump');
    }

    if (this._joystick.direction.includes('left')) {
      this.app.sendAction('move_left');
    }
    if (this._joystick.direction.includes('right')) {
      this.app.sendAction('move_right');
    }
  }

  resize() {
    super.resize();
    this.camera.viewportWidth = this.app.size.width;
    this.camera.viewportHeight = this.app.size.height;
  }

  addPlatforms(bottom: number) {
    // first junction
    this.addPlatForm(500, bottom - 90, 30, 160);
    this.addPlatForm(500, bottom - 180, 150, 20, false);

    // hor
    this.addPlatForm(750, bottom - 300, 200, 20, false, true, {
      speed: 2,
      startingDirection: { x: 1, y: 0 },
      range: [180, 0],
    });

    // second junction
    this.addPlatForm(1200, bottom - 175, 30, 330);
    this.addPlatForm(1265, bottom - 140, 100, 20, false);
    // vert
    this.addPlatForm(1110, bottom - 200, 150, 20, false, true, {
      speed: 1,
      startingDirection: { x: 0, y: 1 },
      range: [0, 150],
    });

    // holds portal
    this.addPlatForm(1700, bottom - 500, 200, 20, false, true, {
      speed: 1,
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
    const portal0 = this.addPortal(380, bottom - 80);
    portal0.debug = true;
    portal0.label = 'portal0';
    const portal1 = this.addPortal(620, bottom - 80);
    const portal2 = this.addPortal(1700, bottom - 580);
    const portal3 = this.addPortal(2000, bottom - 80);

    portal0.connect(portal1);
    portal1.connect(portal2);
    portal2.connect(portal0);
    portal3.connect(portal0);
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
      this.player.constrainX(0, 2400);
      this.player.onKilled.connect(this._handlePlayerKilled);
    }
    this.level.add.existing(this.player);
    this.player.lookRight();
    this.player.spawn(
      {
        x: this.doors[0].x,
        y: this.doors[0].y + this.doors[0].getBoundingBox().height * 0.5 + 7,
      },
      delay,
    );
  }

  addControls() {
    this.ui = this.add.uiCanvas({ padding: 10, useAppSize: true });
    this.ui.zIndex = 100;

    const jumpButton = this.make.button({
      cursor: 'pointer',
      scale: 0.5,
      textures: {
        default: 'btn_circle/up',
        hover: 'btn_circle/over',
        disabled: 'btn_circle/up',
        active: 'btn_circle/down',
      },
      sheet: 'ui.json',
      accessibleTitle: 'jump',
      accessibleHint: `Press to jump`,
    });

    jumpButton.addIsDownCallback('jump', () => {
      this.app.sendAction('jump');
    });

    this._joystick = new Joystick({
      inner: this.make.sprite({
        asset: 'joystick/handle',
        sheet: 'ui.json',
      }),
      outer: this.make.sprite({
        asset: 'joystick/base',
        sheet: 'ui.json',
      }),
      innerScale: 0.7,
      outerScale: 0.7,
    });
    this.ui.addElement(this._joystick, { align: 'bottom left', padding: { left: 20 } });
    this.ui.addElement(jumpButton, { align: 'bottom right', padding: { bottom: 10, right: 20 } });

    if (!this.app.isMobile) {
      this._joystick.visible = false;
      jumpButton.visible = false;
    }
  }

  async _handlePlayerKilled() {
    this.level.removeChild(this.player);
    this.camera.lerp = 0.05;
    this.camera.follow(this.doors[0], [this.app.screen.width * 0.25, -1000]);
    await delay(1);
    this.addPlayer();
    this.camera.follow(this.player, [this.app.screen.width * 0.25, -100]);
    gsap.to(this.camera, { lerp: 0.1, duration: 0.75, ease: 'sine.out' });
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
        minX: -300,
        minY: -1000,
        maxX: 300,
        maxY: 200,
        lerp: 0.1,
      });
      this.physics.system.camera = this.camera;
      this.add.existing(this.camera);
      this.camera.follow(this.player, [this.app.screen.width * 0.25, -100]);
      this.camera.onZoom.connect(this._adjustCollisionThreshold);
      this.camera.onZoomComplete.connect(this._resetCollisionThreshold);
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

  private _adjustCollisionThreshold() {
    if (!this.camera) {
      return;
    }
    // this.physics.system.collisionThreshold = Math.round(this.camera.scale.x + 2);
    this.physics.system.collisionThreshold = 0;
  }

  private _resetCollisionThreshold() {
    this.physics.system.collisionThreshold = this.physics.system.DEFAULT_COLLISION_THRESHOLD;
  }

  private _toggleZoom() {
    if (this._zoomController.getValue() > 1) {
      this._zoomController.setValue(1);
    } else {
      this._zoomController.setValue(2);
    }
  }

  private _handleSpatialHashChanged() {
    this.physics.useSpatialHashGrid = this.config.useSpatialHash;
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
        const platform: Platform = collision.entity2 as Platform;
        // eslint-disable-next-line no-case-declarations
        const player: Player = collision.entity1 as Player;
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
