import { Container, delay } from 'dill-pixel';
import { Ticker } from 'pixi.js';
import { Collision, TowerFallPhysicsPlugin } from '../../../src/plugins/physics/towerfall';
import { Door } from '../entities/physics/Door.ts';
import { Platform, PlatformMovementConfigOpts } from '../entities/physics/Platform.ts';
import { Player } from '../entities/physics/Player.ts';
import { Portal } from '../entities/physics/Portal.ts';
import { BaseScene } from './BaseScene';

export class TowerFallPhysicsScene extends BaseScene {
  protected readonly title = 'TowerFall Physics';
  platformContainer: Container = this.add.container();
  player: Player;
  platforms: Platform[] = [];
  doors: Door[] = [];
  portals: Portal[] = [];
  _isPaused: boolean = false;

  protected get physics(): TowerFallPhysicsPlugin {
    return this.app.getPlugin('physics') as TowerFallPhysicsPlugin;
  }

  async initialize() {
    await super.initialize();
    this.physics.setWorldContainer(this);
    this.physics.world.addWorldBounds(this.app.size.width, this.app.size.height, 10, 0, ['bottom', 'left', 'right']);
    this.addPlatforms();
    this.addDoors();
    this.addPortals();

    this.physics.world.onCollision.connect(this._handleCollision);
  }

  async start() {
    await delay(0.5);
    this.addPlayer();
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

  _handleCollision(collision: Collision) {
    switch (collision.type) {
      case 'Door|Player':
        break;
      case 'Portal|Player':
        const portal = collision.entity1 as Portal;
        const connectedPortal = portal.connectedPortal;
        if (connectedPortal && connectedPortal.enabled) {
          portal.passThrough(this.player);
        }
        break;
    }
  }

  addPlatforms() {
    this.addPlatForm(0, 300, 2000);
    this.addPlatForm(-300, 213, 30, 160);
    this.addPlatForm(-300, 123, 150, 20);
    this.addPlatForm(300, 117, 30, 350);
    // vert
    this.addPlatForm(210, 150, 150, 20, true, { speed: [0, 1], startingDirection: { x: 0, y: 1 }, range: [200, 350] });

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
    color: number = 0x00ff00,
  ) {
    const platform = this.platformContainer.add.existing(
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
    const door = this.add.existing(new Door(), { x, y });
    this.doors.push(door);
  }

  addPortals() {
    const portal1 = this.addPortal(500, 0);
    const portal2 = this.addPortal(-500, 0);
    const portal3 = this.addPortal(-230, 200);
    portal1.connect(portal3);
    portal2.connect(portal1);
    portal3.connect(portal2);
  }

  addPortal(x: number, y: number) {
    const portal = this.add.existing(new Portal(), { x, y });
    this.portals.push(portal);
    return portal;
  }

  addPlayer() {
    this.player = this.add.existing(new Player(), { x: this.doors[0].x, y: this.doors[0].y });
    this.player.onKilled.connect(this._handlePlayerKilled);
  }

  _handlePlayerKilled() {
    this.removeChild(this.player);
    this.player.position.set(this.doors[0].x, this.doors[0].y);
    this.add.existing(this.player);
  }
}
