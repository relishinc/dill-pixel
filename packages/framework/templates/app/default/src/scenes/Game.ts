import Base from '@/scenes/Base';
import { FlexContainer } from 'dill-pixel';

export const id = 'game';
export const debug = {
  label: 'Game',
};

export default class Game extends Base {
  private container: FlexContainer;

  initialize() {
    this.app.focus.addFocusLayer(this.id);

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
      text: 'My Game',
      style: { fontFamily: 'KumbhSans', fontSize: 48, fill: 0xffffff },
    });

    const btn = this.container.add.button({
      label: 'Button',
      anchor: 0.5,
      cursor: 'pointer',
      y: 50,
      textures: {
        default: 'btn/blue',
        hover: 'btn/yellow',
        disabled: 'btn/grey',
        active: 'btn/red',
      },
      textLabel: {
        text: 'Play',
        style: { fontFamily: 'KumbhSans', fontSize: 32, fill: 0xffffff },
      },
      layout: {
        width: 256,
        height: 70,
        applySizeDirectly: true,
        isLeaf: true,
      },
      sounds: {
        click: 'click',
        hover: 'hover',
      },
    });

    btn.onClick.connectOnce(() => this.app.scenes.loadScene('game'));

    this.app.focus.add(btn);
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
