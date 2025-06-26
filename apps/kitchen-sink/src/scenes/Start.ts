import { FlexContainer, type SceneDebug } from 'dill-pixel';
import Base from './BaseScene';

export const id = 'start';
export const debug: SceneDebug = {
  label: 'Hello World',
  group: 'Start',
};

export default class Start extends Base {
  title = 'Hello World';
  private container: FlexContainer;

  async initialize() {
    await super.initialize();
    // a layout container
    this.container = this.add.flexContainer({
      label: 'Main Container',
      bindToAppSize: true,
      layout: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
      },
    });

    // some title text
    this.container.add.text({
      text: 'Hello Dill Pixel',
      style: { fontFamily: 'KumbhSans', fontSize: 48, fill: 0xffffff },
    });

    // from src/assets.json
    this.container.add.sprite({
      asset: 'jar',
      label: 'Jar',
      scale: 0.5,
      anchor: 0.5,
      layout: { applySizeDirectly: true, width: 150, height: 150, aspectRatio: 590 / 664, flexGrow: 0, flexShrink: 0 },
    });
  }

  start() {
    // start the scene's jobs here
  }

  resize() {
    super.resize();
    // the layout container binds to the app size,
    // but we still need to center it
    this.container.position.set(-this.app.size.width * 0.5, -this.app.size.height * 0.5);
  }
}
