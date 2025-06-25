import BaseScene from '@/scenes/BaseScene';
import MatterPhysicsPlugin, { Entity, MatterBodyType } from '@dill-pixel/plugin-matter-physics';
import { bool, Container, intBetween, type SceneAssets, type SceneDebug, type ScenePlugins } from 'dill-pixel';
import { DEG_TO_RAD, Rectangle, Texture } from 'pixi.js';
export const id = 'matter-platformer';
export const debug: SceneDebug = {
  group: 'Matter Physics',
  label: 'Platformer',
  order: 5,
};

export const plugins: ScenePlugins = ['matter-physics'];

export const assets: SceneAssets = {
  preload: {
    bundles: ['kenney'],
  },
};

class Player extends Entity {
  bodyType: MatterBodyType = 'rectangle';
  debugColor = 0xfff000;

  moveSpeed = 10;
  jumpForce = 50;

  isJumping = false;

  constructor() {
    super();

    this.view = this.add.sprite({
      sheet: 'jumper',
      asset: 'Players/bunny2_stand',
      anchor: 0.5,
      scale: 0.5,
    });

    this.app.actions('move_left').connect(this.moveLeft);
    this.app.actions('move_right').connect(this.moveRight);
    this.app.actions('jump').connect(this.jump);

    this.setSize(52, 94);
    this.onLand(this.resetJump);
  }

  createBody() {
    super.createBody();
    this.body.frictionAir = 0.05;
    this.lockRotation();
  }

  moveLeft() {
    this.setVelocityX(-this.moveSpeed);
  }

  moveRight() {
    this.setVelocityX(this.moveSpeed);
  }

  jump() {
    if (this.isJumping) return;
    this.isJumping = true;
    this.setVelocityY(-this.jumpForce);
  }

  resetJump() {
    this.isJumping = false;
  }

  update() {
    super.update();
    this.setVelocityX(this.velocity.x * (this.isGrounded ? 0.6 : 0.95));
  }
}

export default class MatterPlatformer extends BaseScene {
  title = 'Matter Physics - Platformer';
  subtitle = 'Use the arrow keys to move the player';

  protected config = {
    useCamera: true,
    zoom: 1,
  };
  protected container: Container;
  protected player: Player;

  protected get physics(): MatterPhysicsPlugin {
    return this.app.getPlugin('matter-physics') as unknown as MatterPhysicsPlugin;
  }

  configureGUI() {
    this.gui;
  }

  async initialize() {
    await super.initialize();
    this.app.actionContext = 'game';
    this.container = this.add.container();
    this.container.position.set(-this.app.size.width * 0.5, -this.app.size.height * 0.5);
    this.physics.initialize({
      autoInit: true,
      debug: true,
      container: this.container,
      engine: {
        gravity: { y: 9.8 },
      },
      createWalls: { thickness: 100, bottom: true, left: true, right: true },
      worldBounds: new Rectangle(0, 0, this.app.size.width, this.app.size.height - 20),
    });
    this.physics.system.enabled = true;
    this.physics.system.leftWall.friction = 0;
    this.physics.system.rightWall.friction = 0;
    this.physics.system.floor.friction = 1;
    this.player = new Player();
    this.player.x = 100;
    this.player.y = 100;

    this.physics.add.existing(this.player);

    this.addPlatform(0);
    this.addPlatform(200);
    this.addPlatform(300);
    this.addPlatform(500);
  }

  addPlatform(startY: number, distance: number = 300): Entity {
    const width = intBetween(150, 400);
    const height = 32;
    const angle = bool() ? DEG_TO_RAD * intBetween(-30, 30) : 0;
    const platform = new Entity({
      bodyType: 'rectangle',
      rotationBehavior: 'firstPart',
      size: { width, height },
      bodyDefinition: {
        isStatic: true,
        friction: 0,
        frictionStatic: 0,
        density: 1000,
        angle,
      },
      view: this.make.sprite({
        asset: Texture.WHITE,
        width,
        height,
        anchor: 0.5,
      }),
    });

    platform.x = 200 + Math.random() * (this.app.size.width - 400);
    platform.y = this.app.size.height - startY - intBetween(distance * 0.5, distance);
    this.physics.add.existing(platform);
    return platform;
  }

  destroy() {
    this.physics?.destroy();
    super.destroy();
  }
}
