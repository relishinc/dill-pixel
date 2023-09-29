import { BaseState } from '@/state/BaseState.ts';
import { AssetMapData, AssetType, PhysicsBodyType, PhysicsEngineType, TextureAsset } from 'dill-pixel';
import RapierPhysics, { RapierPhysicsComposite } from 'dill-pixel/Physics/RapierPhysics';
import { Point } from 'pixi.js';

export class RapierPhysicsExample extends BaseState {
  public static NAME: string = 'RapierPhysicsExample';

  public constructor() {
    super();
  }

  public static get Assets(): AssetMapData[] {
    return [new TextureAsset('relish-logo-circle', AssetType.PNG)];
  }

  public get physics(): RapierPhysics {
    return this.app.physics as unknown as RapierPhysics;
  }

  public destroy() {
    this.physics.destroy();
    super.destroy();
  }

  public init(pSize: Point) {
    super.init(pSize);
    this.setHeaderText('Rapier Physics Example');
    this.setMainText("Click anywhere to add a physics enabled sprite.\nPress the 'D' key to toggle debug mode.");

    this.startPhysics();
  }

  protected getObjectSize() {
    return Math.random() * 50 + 50;
  }

  protected async startPhysics() {
    await this.app.addPhysics(PhysicsEngineType.RAPIER);
    this.app.physics.init(true, false);
    this.physics.container = this;

    const gfx = this.make.graphics();

    // if the D key is pressed, toggle debug mode
    window.addEventListener('keyup', (e) => {
      if (e.key === 'd') {
        this.app.physics.debug = !this.app.physics.debug;
      }
    });

    // on pointer down, add a random colored rect or circle
    this.eventMode = 'static';
    this.on('pointerdown', (e) => {
      const pt = e.getLocalPosition(this);

      const rnd = Math.random();
      switch (true) {
        case rnd < 0.5:
          const type = Math.random() > 0.5 ? PhysicsBodyType.CIRCLE : PhysicsBodyType.RECTANGLE;

          const size: [number, number?] | number =
            type === PhysicsBodyType.CIRCLE ? this.getObjectSize() : [this.getObjectSize(), this.getObjectSize()];

          // make a random colored texture from graphics
          gfx.clear();
          gfx.beginFill(Math.floor(Math.random() * 0xffffff));
          if (type === PhysicsBodyType.CIRCLE) {
            gfx.drawCircle(0, 0, (size as number) * 0.5);
            gfx.endFill();
            const useLogo = Math.random() > 0.5;
            this.physics.add.physicsSprite(
              useLogo ? 'relish-logo-circle' : this.app.renderer.generateTexture(gfx),
              undefined,
              size,
              type,
              1,
              pt,
            );
          } else {
            gfx.drawRect(0, 0, (size as [number, number])[0], (size as [number, number])[1]);
            gfx.endFill();
            this.physics.add.physicsSprite(this.app.renderer.generateTexture(gfx), undefined, size, type, 1, pt);
          }
          gfx.clear();
          break;
        default:
          const composite = new RapierPhysicsComposite();
          composite.x = pt.x;
          composite.y = pt.y;
          this.physics.add.existing(composite);
          break;
      }
    });
  }
}
