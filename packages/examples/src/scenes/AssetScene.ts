import BaseScene from '@/scenes/BaseScene';
import { FlexContainer, SceneAssets } from 'dill-pixel';

export const id = 'assets';
export const debug = {
  group: 'Framework',
  label: 'Assets',
};

export default class AssetScene extends BaseScene {
  title = 'Asset Scene';
  subtitle = 'Asset loading from different sources';
  container: FlexContainer;

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
            src: 'https://reli.sh/wp-content/themes/parent/build/images/Zilla.png',
          },
          'https://reli.sh/wp-content/uploads/2023/10/tech-pickle-300x300.webp',
        ],
      },
    };
  }

  public async initialize() {
    await super.initialize();
    this.container = this.add.flexContainer({
      gap: 50,
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
    });
    this.container.add.sprite({
      asset: 'https://reli.sh/wp-content/uploads/2023/10/tech-pickle-300x300.webp',
    });
    this.container.add.sprite({ asset: 'static/jar', scale: 0.4 });
    this.container.add.sprite({ asset: 'zilla' });
    this.container.add.svg({ ctx: 'logo', scale: 0.5, resolution: 2 });
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
