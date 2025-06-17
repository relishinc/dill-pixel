import BaseScene from '@/scenes/BaseScene';
import { FlexContainer, Logger, SceneAssets } from 'dill-pixel';
import { Sprite } from 'pixi.js';

export const id = 'assets';
export const debug = {
  group: 'Framework',
  label: 'Assets',
};

export default class AssetScene extends BaseScene {
  title = 'Asset Scene';
  subtitle = 'Asset loading from different sources';
  container: FlexContainer;
  pickle: Sprite;
  jar: Sprite;
  zilla: Sprite;

  public get assets(): SceneAssets {
    return {
      preload: {
        assets: [
          {
            alias: 'logo',
            src: 'static/logo.svg',
          },
          {
            src: 'static/jar',
            ext: 'png',
          },
          {
            alias: 'zilla',
            src: 'static/Zilla.webp',
          },
          'static/tech-pickle-300x300.webp',
        ],
      },
    };
  }

  public async initialize() {
    await super.initialize();
    this.container = this.add.flexContainer({
      layout: {
        gap: 0,
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'nowrap',
      },
      label: 'Main Container',
    });
    this.pickle = this.container.add.sprite({
      asset: 'static/tech-pickle-300x300.webp',
      label: 'Pickle',
    });
    this.jar = this.container.add.sprite({ asset: 'static/jar', scale: 0.5, label: 'Jar' });
    this.zilla = this.container.add.sprite({ asset: 'zilla', label: 'Zilla' });

    Logger.log('PATHS', this.app.getAllPaths());
  }

  async start() {
    // const pickleTween = this.app.anim.to(this.pickle, {
    //   pixi: { anchor: 0.5, scale: 2, saturation: 0 },
    //   yoyo: true,
    //   repeat: -1,
    //   duration: 1,
    //   ease: EaseType.CustomInOut,
    // });
    // const jarTween = this.app.anim.to(this.jar, {
    //   pixi: { anchor: 0.5, scale: 0.7, saturation: 0 },
    //   yoyo: true,
    //   repeat: -1,
    //   duration: 1,
    //   ease: EaseType.Custom,
    // });
    // this.app.addAnimation([pickleTween, jarTween], 'AssetScene');
    // toy with animations pause / resume
    // await wait(1.5);
    // this.app.animation.pauseAll('AssetScene');
    // await wait(1.5);
    // this.app.animation.playAll('AssetScene');
  }

  resize() {
    super.resize();

    if (this.app.size.width >= this.app.size.height) {
      this.container.size = [this.app.size.width, this.app.size.height - 110];
      this.container.position.set(-this.app.size.width * 0.5, -this.app.size.height * 0.5 + 110);
      this.container.scale.set(1);
      this.container.flexDirection = 'row';
      this.container.flexWrap = 'wrap';
    } else {
      this.container.size = [0, this.app.size.height - 110];
      this.container.flexDirection = 'column';
      this.container.flexWrap = 'nowrap';
      this.container.position.set(0, -this.app.size.height * 0.5 + 100);
    }
  }
}
