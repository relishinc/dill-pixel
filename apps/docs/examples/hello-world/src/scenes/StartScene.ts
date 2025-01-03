import BaseScene from '@/scenes/BaseScene';
import { FONT_KUMBH_SANS } from '@/utils/Constants';
import { FlexContainer } from 'dill-pixel';

export const id = 'start';
export const debug = {
  label: 'Start',
};

export default class StartScene extends BaseScene {
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

    const startButton = this._layout.add.button({
      sheet: 'ui',
      scale: 0.5,
      cursor: 'pointer',
      textures: {
        default: 'btn/blue',
        hover: 'btn/red',
        active: 'btn/green',
      },
    });

    startButton.add.text({
      text: 'Start',
      style: { fontFamily: FONT_KUMBH_SANS, fontWeight: 'bold', fill: 0xffffff, align: 'center', fontSize: 60 },
      resolution: 2,
      anchor: 0.5,
    });

    this.addSignalConnection(
      startButton.onClick.connect(() => {
        this.app.exec.loadScene({ id: 'game', method: 'exitEnter' });
      }),
    );
  }

  // enter / exit animations (basic)
  async enter() {
    return this.animate({ alpha: 1, duration: 1, ease: 'sine.out' });
  }

  async exit() {
    return this.animate({ alpha: 0, duration: 0.5, ease: 'sine.in' });
  }

  start() {}
}
