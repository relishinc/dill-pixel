import { FONT_KUMBH_SANS, FONT_KUMBH_SANS_BLACK } from '@/utils/Constants';
import { FlexContainer, Size } from 'dill-pixel';
import BaseScene from '../BaseScene';

export const id = 'text';

export const debug = {
  label: 'Text',
  group: 'UI',
  order: 0,
};

export default class TextScene extends BaseScene {
  public title = 'Text';
  public subtitle = 'Various text implementations';

  private _layout: FlexContainer;
  private _bitmapTextContainer: FlexContainer;
  private _textContainer: FlexContainer;

  async initialize() {
    super.initialize();

    this._layout = this.add.flexContainer({
      direction: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 50,
      bindToAppSize: true,
    });

    this._bitmapTextContainer = this._layout.add.flexContainer({
      direction: 'column',
      gap: 10,
    });

    this._textContainer = this._layout.add.flexContainer({
      direction: 'column',
      gap: 10,
    });

    const text = this._textContainer.add.text({
      text: 'Web font',
      style: {
        fontFamily: FONT_KUMBH_SANS,
        fontSize: 64,
        leading: -10,
        textBaseline: 'bottom',
      },
    });

    text.pivot.y = -25;

    this._bitmapTextContainer.add.bitmapText({
      text: 'Bitmap Font',
      style: {
        fontFamily: FONT_KUMBH_SANS_BLACK,
        fontSize: 64,
      },
    });
  }

  resize(size?: Size): void {
    super.resize(size);
    this._layout.x = -this.app.size.width / 2;
    this._layout.y = -this.app.size.height / 2;
  }
}
