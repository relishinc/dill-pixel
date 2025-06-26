import Base from '@/scenes/Base';
import { FlexContainer } from 'dill-pixel';

export const id = 'start';
export const debug = {
  label: 'Start Scene',
};

export default class Start extends Base {
  private container: FlexContainer;

  initialize() {
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
      scale: 0.5,
    });
  }

  start() {
    // start the scene's jobs here
  }

  resize() {
    // the layout container binds to the app size,
    // but we still need to center it
    this.container.position.set(-this.app.size.width * 0.5, -this.app.size.height * 0.5);
  }
}
