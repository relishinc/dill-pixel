import { BaseState } from '@/state/BaseState';
import { MatterPhysicsSpriteExample } from '@/state/gameobjects/MatterPhysicsSpriteExample';
import { AssetMapData, AssetType, MatterPhysics, PhysicsBodyType, TextureAsset } from '@relish-studios/dill-pixel';
import { Point } from 'pixi.js';

export class MatterPhysicsExample extends BaseState {
  public static NAME: string = 'MatterPhysicsExample';

  constructor() {
    super();
  }

  public static get Assets(): AssetMapData[] {
    return [new TextureAsset('jar', AssetType.PNG)];
  }

  public get physics(): MatterPhysics {
    return this.app.physics as MatterPhysics;
  }

  public destroy() {
    window.removeEventListener('keyup', this.onKeyup);
    this.physics.destroy();
    super.destroy();
  }

  public async init(pSize: Point) {
    super.init(pSize);
    this.onKeyup = this.onKeyup.bind(this);
    this.setHeaderText('Matter physics example');
    this.setMainText("Click anywhere to add a physics-enabled sprite.\nPress the 'D' key to toggle debug mode.");

    await this.startPhysics();
  }

  protected onKeyup(e: KeyboardEvent) {
    if (e.key === 'd') {
      this.app.physics.debug = !this.app.physics.debug;
    }
  }

  protected getObjectSize() {
    return Math.random() * 50 + 50;
  }

  protected async startPhysics() {
    await this.app.addPhysics();

    this.physics.init(true, false);
    this.physics.container = this;

    const gfx = this.make.graphics();

    // if the D key is pressed, toggle debug mode
    window.addEventListener('keyup', this.onKeyup);

    // on pointer down, add a random colored rect or circle
    this.eventMode = 'static';
    this.on('pointerdown', (e) => {
      const pt = e.getLocalPosition(this);
      const type = Math.random() > 0.5 ? PhysicsBodyType.CIRCLE : PhysicsBodyType.RECTANGLE;
      const size: [number, number?] | number =
        type === PhysicsBodyType.CIRCLE ? this.getObjectSize() : [this.getObjectSize(), this.getObjectSize()];

      // make a random colored texture from graphics
      gfx.clear();
      gfx.beginFill(Math.floor(Math.random() * 0xffffff));

      if (type === PhysicsBodyType.CIRCLE) {
        gfx.drawCircle(0, 0, (size as number) * 0.5);
        gfx.endFill();
        const useJar = Math.random() > 0.5;

        // test with a sprite that extends the base MatterPhysicsSprite
        const spr: MatterPhysicsSpriteExample = new MatterPhysicsSpriteExample(
          useJar ? 'jar' : this.app.renderer.generateTexture(gfx),
          undefined,
          size,
          type,
        );
        spr.position.set(pt.x, pt.y);

        // test adding an existing sprite
        this.physics.add.existing(spr);
      } else {
        gfx.drawRect(0, 0, (size as [number, number])[0], (size as [number, number])[1]);
        gfx.endFill();
        this.physics.add.physicsSprite(this.app.renderer.generateTexture(gfx), undefined, size, type, 1, pt);
      }
      gfx.clear();
    });
  }
}
