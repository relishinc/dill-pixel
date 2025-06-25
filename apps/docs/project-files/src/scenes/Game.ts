import Base from '@/scenes/Base;
import { FlexContainer } from 'dill-pixel';

export const id = 'game';
export const debug = {
  label: 'Game',
};

/**
 * Game scene
 * so you can access the application's properties and methods in all scenes extending this one
 * it also allows you to add custom logic to the scene that can be shared across scenes
 */
export default class Game extends Base {
  private _layout: FlexContainer;

  initialize() {
    super.initialize();
    // a temporary layout container
    this._layout = this.add.flexContainer({
      layout: {
        flexDirection: 'column',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        bindToAppSize: true,
      },
    });

    // some title text
    this._layout.add.text({
      text: 'My',
      style: { fontSize: 18, fontFamily: "KumbhSans", fill: 0xffffff },
    });
    // from src/assets.json
    this._layout.add.sprite({ asset: 'wordmark.svg', scale: 1 });

    this._layout.add.text({
      text: 'GAME',
      style: { fontFamily: "KumbhSans", fontWeight: 'bold', fill: 0xffffff },
    });
  }

  async enter() {
    return this.animate({ alpha: 1, duration: 1, ease: 'sine.out' });
  }

  async exit() {
    return this.animate({ alpha: 0, duration: 0.5, ease: 'sine.in' });
  }
}