import Base from '@/scenes/Base';
import { FONT_KUMBH_SANS } from '@/utils/Constants';
import { FlexContainer } from 'dill-pixel';

export const id = 'start';
export const debug = {
  label: 'Start Scene',
};

export default class Start extends Base {
  private container: FlexContainer;

  initialize() {
    // a temporary layout container
    this.container = this.add.flexContainer({
      label: 'Main Container',
      layout: {
        flexDirection: 'column',
        gap: 25,
        alignItems: 'center',
        justifyContent: 'center',
      },
    });

    // some title text
    this.container.add.text({
      text: 'Hello Dill Pixel',
      resolution: 2,
      style: { fontFamily: FONT_KUMBH_SANS, fontWeight: 'bold', fill: 0xffffff },
    });

    // from src/assets.json
    this.container.add.sprite({ asset: 'jar.png', scale: 0.25, layout: { applySizeDirectly: true } });
  }

  start() {}
}
