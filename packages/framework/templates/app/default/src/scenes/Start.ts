import Base from '@/scenes/Base';
import { FONT_KUMBH_SANS } from '@/utils/Constants';
import { FlexContainer } from 'dill-pixel';

export const id = 'start';
export const debug = {
  label: 'Start',
};

export default class Start extends Base {
  private _layout: FlexContainer;

  initialize() {
    // a temporary layout container
    this._layout = this.add.flexContainer({
      flexDirection: 'column',
      gap: 25,
      alignItems: 'center',
      justifyContent: 'center',
    });

    // some title text
    this._layout.add.text({
      text: 'Hello Dill Pixel',
      resolution: 2,
      style: { fontFamily: FONT_KUMBH_SANS, fontWeight: 'bold', fill: 0xffffff },
    });

    // from src/assets.json
    this._layout.add.sprite({ asset: 'jar.png', scale: 0.25 });
  }

  start() {}
}
