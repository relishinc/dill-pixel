import { BaseScene } from '@/scenes/BaseScene';
import { FlexContainer, SceneAssets } from 'dill-pixel/display';

export class AssetScene extends BaseScene {
  title = 'Asset Scene';
  subtitle = 'Asset loading from different sources';

  container: FlexContainer;

  constructor() {
    super();
  }

  public get assets(): SceneAssets {
    return {
      preload: {
        assets: [
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
      width: this.app.size.width,
      flexWrap: 'wrap',
      x: -this.app.size.width * 0.5,
    });
    this.container.add.sprite({
      asset: 'https://reli.sh/wp-content/uploads/2023/10/tech-pickle-300x300.webp',
      anchor: 0.5,
    });
    this.container.add.sprite({ asset: 'static/jar', anchor: 0.5, scale: 0.4 });
    this.container.add.sprite({ asset: 'zilla', anchor: 0.5 });
  }

  resize() {
    super.resize();
    this.container.containerWidth = this.app.size.width;
    this.container.x = -this.app.size.width * 0.5;
  }
}
