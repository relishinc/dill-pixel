import { Ticker } from 'pixi.js';
import { TowerFallPhysicsPlugin } from '../../../src/plugins/physics/towerfall';
import { Platform, PlatformMovementConfigOpts } from '../entities/physics/Platform.ts';
import { Player } from '../entities/physics/Player.ts';
import { BaseScene } from './BaseScene';

export class TowerFallPhysicsScene extends BaseScene {
  protected readonly title = 'TowerFall Physics';

  player: Player;
  platforms: Platform[] = [];
  _isPaused: boolean = false;

  protected get physics(): TowerFallPhysicsPlugin {
    return this.app.getPlugin('physics') as TowerFallPhysicsPlugin;
  }

  async initialize() {
    await super.initialize();
    this.physics.setWorldContainer(this);
    this.addPlatforms();
    this.addPlayer();
  }

  async start() {
    console.log('start');
    console.log(this.player);
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
    this.physics.update(ticker.deltaTime);
  }

  addPlatforms() {
    this.addPlatForm(0, 300, 2000);
    this.addPlatForm(-300, 250, 30, 100);
    this.addPlatForm(300, 250, 30, 100);
    // vert
    // this.addPlatForm(0, -100, 300, 30, true, { speed: [0, 1], startingDirection: { x: 0, y: 1 }, range: [200, 300] });

    // hor
    // this.addPlatForm(0, 150, 300, 30, true, { speed: [1, 0], startingDirection: { x: 1, y: 0 }, range: [200, 200] });

    // both hor and vert
    this.addPlatForm(0, 150, 300, 15, true, { speed: [1, 1], startingDirection: { x: 1, y: 1 }, range: [200, 200] });
  }

  addPlatForm(
    x: number,
    y: number,
    width: number,
    height = 15,
    moving: boolean = false,
    movementConfig?: PlatformMovementConfigOpts,
    color: number = 0x00ff00,
  ) {
    const platform = this.add.existing(new Platform({ width, height, color, moving, movementConfig }), { x, y });
    this.platforms.push(platform);
  }

  addPlayer() {
    this.player = this.add.existing(new Player(), { y: -300 });
    this.player.onKilled.connect(this._handlePlayerKilled);
  }

  _handlePlayerKilled() {
    this.removeChild(this.player);
    this.player.y = -300;
    this.add.existing(this.player);
  }
}
