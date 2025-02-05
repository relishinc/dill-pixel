import { Platform, PlatformConfig, PlatformMovementConfigOpts } from '@/entities/snap/Platform';
import { Collision, default as SnapPhysics } from '@dill-pixel/plugin-snap-physics';
import { Button, Container, Joystick, UICanvas } from 'dill-pixel';

import { Door } from '@/entities/snap/Door';
import { EndlessRunner } from '@/entities/snap/EndlessRunner';
import { Player } from '@/entities/snap/Player';
import { Portal } from '@/entities/snap/Portal';
import { SegmentConfig } from '@/entities/snap/Segment';
import BaseScene from '@/scenes/BaseScene';

export const id = 'snap-endless-runner';
export const debug = {
  group: 'Physics',
  label: 'Snap - Endless Runner',
  order: 3,
};

export const plugins = ['snap-physics'];

export const assets = {
  preload: {
    bundles: ['spine'],
  },
};

export default class SnapEndlessRunnerScene extends BaseScene {
  ui: UICanvas;
  level: Container;
  player: Player;
  platforms: Platform[] = [];
  doors: Door[] = [];
  portals: Portal[] = [];
  _isPaused: boolean = false;
  protected readonly title = 'Snap Physics - Endless Runner';
  protected readonly subtitle = 'Arrows to move, up to jump, "Q" for hoverboard, "P" to pause';
  protected config = {
    speed: 1,
    useSpatialHash: true,
    gridCellSize: 300,
    debug: false,
  };
  private _segments: SegmentConfig[];
  private _joystick: Joystick;

  // private _debugGfx = new Graphics();

  protected get physics(): SnapPhysics {
    return this.app.getPlugin('snap-physics') as unknown as SnapPhysics;
  }

  configureGUI() {
    this.gui.add(this.config, 'speed', 0, 10, 0.1).onChange(this._speedChanged).name('Speed');

    const spatialHashFolder = this.gui.addFolder('Spatial Hash Collisions');
    spatialHashFolder.open();

    spatialHashFolder.add(this.config, 'useSpatialHash').onChange(this._handleSpatialHashChanged).name('Active');

    spatialHashFolder
      .add(this.config, 'gridCellSize', 50, 800, 50)
      .onChange(this._handleGridCellSizeChange)
      .name('Cell Size');

    this.gui.add(this.config, 'debug').onChange(this._handleDebugChanged).name('Debug Physics');
  }

  async initialize() {
    await super.initialize();

    this.app.focus.addFocusLayer(this.id);

    this.level = this.add.container({
      label: 'Level',
      position: [-this.app.size.width * 0.5, -this.app.size.height * 0.5],
    });

    this.physics.system.initialize({
      gravity: 10,
      container: this.level,
      debug: false,
      fps: 60,
      useSpatialHashGrid: this.config.useSpatialHash,
      cellSize: this.config.gridCellSize,
      collisionResolver: this._resolveCollision,
    });

    this.physics.system.enabled = true;
    this.physics.system.updateHooks.add(this.fixedUpdate);

    const bottom = this.app.size.height - 200;
    this._segments = this.createSegments(bottom);

    EndlessRunner.initialize(this.app.size.width * 0.75, [1, 0], this.level);

    while (EndlessRunner.currentWidth < EndlessRunner.width * 0.75) {
      this.getEmptySegment(bottom);
    }

    EndlessRunner.width = this.app.size.width * 2;

    this.addPlayer();

    this._handleDebugChanged();

    this.addSignalConnection(this.app.actions('toggle_pause').connect(this._togglePause));
    this.addControls();
    this.app.actionContext = 'game';
  }

  fixedUpdate() {
    if (this._isPaused) return;
    EndlessRunner.update();

    // add more segments if needed
    if (!EndlessRunner.hasEnoughSegments) {
      while (!EndlessRunner.hasEnoughSegments && !this._isPaused) {
        this.createRandomSegment();
      }
    }

    if (this.player.x < -50 || this.player.y > this.app.size.height + 50) {
      this.player.kill();
    }
  }

  createRandomSegment() {
    return EndlessRunner.createSegment(this._segments[Math.floor(Math.random() * this._segments.length)]);
  }

  getEmptySegment(bottom: number) {
    const emptySegmentConfig = {
      width: 1000,
      platforms: [this.getPlatFormConfig(500, bottom, 1000, 20)],
    };
    return EndlessRunner.createSegment(emptySegmentConfig);
  }

  resize() {
    super.resize();

    this.player.constrainX(50, this.app.size.width - 50);

    // EndlessRunner.width = this.app.size.width * 2;
    this.level.position.set(-this.app.size.width * 0.5, -this.app.size.height * 0.5);
  }

  createSegments(bottom: number): SegmentConfig[] {
    const segment0Config = {
      width: 600,
      platforms: [
        this.getPlatFormConfig(300, bottom - 50, 400, 20),
        this.getPlatFormConfig(250, bottom - 100, 30, 100),
        this.getPlatFormConfig(385, bottom - 300, 200, 20),
      ],
    };

    const segment1Config = {
      width: 500,
      platforms: [
        this.getPlatFormConfig(250, bottom, 500, 20),
        this.getPlatFormConfig(250, bottom - 100, 30, 200),
        this.getPlatFormConfig(205, bottom - 150, 60, 20, false),
        this.getPlatFormConfig(295, bottom - 150, 60, 20, false),
      ],
    };

    const segment2Config = {
      width: 300,
      platforms: [this.getPlatFormConfig(150, bottom, 300, 20), this.getPlatFormConfig(150, bottom - 75, 30, 140)],
    };

    const segment3Config = {
      width: 800,
      platforms: [
        this.getPlatFormConfig(400, bottom, 800, 20),
        this.getPlatFormConfig(400, bottom - 200, 301, 20, false),
      ],
    };

    const segment4Config = {
      width: 400,
      platforms: [
        this.getPlatFormConfig(200, bottom, 400, 20),
        this.getPlatFormConfig(200, bottom - 120, 200, 20, false, true, {
          speed: 1,
          startingDirection: { x: 0, y: 1 },
          range: [0, 200],
        }),
      ],
    };

    const segment5Config = {
      width: 300,
      platforms: [this.getPlatFormConfig(150, bottom, 300, 20), this.getPlatFormConfig(150, bottom - 250, 30, 200)],
    };

    return [segment0Config, segment1Config, segment2Config, segment3Config, segment4Config, segment5Config];
  }

  getPlatFormConfig(
    x: number,
    y: number,
    width: number | (() => number),
    height: number | (() => number) = 15,
    oneWay: boolean = false,
    moving: boolean = false,
    movementConfig?: PlatformMovementConfigOpts,
    color: number = 0x00fff0,
  ): PlatformConfig {
    return Platform.resolveConfig({
      width,
      height,
      color,
      oneWay,
      moving,
      movementConfig,
      x,
      y,
    });
  }

  addPlayer() {
    let delay = 0.5;
    if (!this.player) {
      delay = 1;
      this.player = new Player();
      this.player.constrainX(50, this.app.size.width - 50);
      this.player.onKilled.connect(this._handlePlayerKilled);
    }
    this.player.lookRight();
    this.level.add.existing(this.player);
    this.player.spawn({ x: Math.round(this.app.size.width * 0.1), y: Math.round(this.app.size.height * 0.3) }, delay);
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
    const warpButton = this._addButton('b', 'warp');

    this.ui.addElement(this._joystick, { align: 'bottom left', padding: { left: 10, bottom: 110 } });
    this.ui.addElement(jumpButton, { align: 'bottom right', padding: { bottom: 120, right: 100 } });
    this.ui.addElement(warpButton, { align: 'bottom right', padding: { bottom: 220, right: 10 } });

    this.app.controls.touch.addButton(jumpButton);
    this.app.controls.touch.addButton(warpButton);
    this.app.controls.touch.joystick = this._joystick;

    if (!this.app.isMobile) {
      this._joystick.visible = false;
      jumpButton.visible = false;
      warpButton.visible = false;
    }
  }

  async _handlePlayerKilled() {
    this.addPlayer();
  }

  destroy() {
    this.app.ticker.maxFPS = 0;
    this._isPaused = true;
    this.physics?.destroy();
    EndlessRunner?.destroy();
    this.level?.removeChildren();
    super.destroy();
  }

  protected _handleDebugChanged() {
    const { debug } = this.config;
    this.physics.system.debug = debug;
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

  private _togglePause() {
    this._isPaused = !this._isPaused;
    this.physics.system.enabled = !this._isPaused;
  }

  private _speedChanged() {
    // gsap.to(EndlessRunner.movement, { x: this.config.speed, duration: 1 });
    EndlessRunner.movement.x = this.config.speed;
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
        const platform = collision.entity2 as Platform;
        // eslint-disable-next-line no-case-declarations
        const player = collision.entity1 as Player;
        if (platform.oneWay) {
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
