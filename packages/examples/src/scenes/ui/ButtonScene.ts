import BaseScene from '@/scenes/BaseScene';
import { Button, FlexContainer } from 'dill-pixel';
import { Text } from 'pixi.js';

export const id = 'buttons';
export const debug = {
  group: 'UI',
  label: 'Buttons',
  order: 1,
};

export default class ButtonScene extends BaseScene {
  title = 'Button Scene';
  subtitle = 'Basic button functionality';
  container: FlexContainer;
  playSoundButton: Button;
  playSoundLabel: Text;
  enabledButton: Button;
  listenerButton: Button;
  currentSound: string = 'A';

  public async initialize() {
    await super.initialize();

    this.app.focus.addFocusLayer(this.id);

    this.container = this.add.flexContainer({
      gap: 50,
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
    });

    // create 'play sound' button
    this.playSoundButton = this.container.add.button({
      textures: {
        default: 'btn/green',
        hover: 'btn/yellow',
        disabled: 'btn/red',
      },
      scale: 0.65,
    });
    this.playSoundLabel = this.playSoundButton.add.text({
      text: 'Play Sound A',
      anchor: 0.5,
      style: {
        fontSize: 60,
        fill: 0xffffff,
      },
    });
    this.playSoundButton.onClick.connect(this.onClickPlaySoundA);

    // create 'toggle enabled' button, which toggles the interactability of the 'play sound' button
    this.enabledButton = this.container.add.button({
      textures: {
        default: 'btn/purple',
        hover: 'btn/yellow',
      },
      anchor: [0.5, 0.5],
      scale: 0.65,
    });
    this.enabledButton.add.text({
      text: 'Toggle Enabled',
      anchor: 0.5,
      style: {
        fontSize: 60,
        fill: 0xffffff,
      },
    });
    this.enabledButton.onClick.connect(this.onClickToggleEnabled);

    // create 'cycle listener' button, which cycles between different listener types for the 'play sound' button
    this.listenerButton = this.container.add.button({
      textures: {
        default: 'btn/purple',
        hover: 'btn/yellow',
      },
      anchor: [0.5, 0.5],
      scale: 0.65,
    });
    this.listenerButton.add.text({
      text: 'Cycle Listener',
      anchor: 0.5,
      style: {
        fontSize: 60,
        fill: 0xffffff,
      },
    });
    this.listenerButton.onClick.connect(this.onClickCycleListener);

    this.app.focus.add(this.playSoundButton);
    this.app.focus.add(this.enabledButton);
    this.app.focus.add(this.listenerButton);
  }

  private onClickPlaySoundA() {
    // play the click sound, a .ogg source file
    this.app.audio.play('click', 'sfx');
  }

  private onClickPlaySoundB() {
    // play the clonk sound, a .wav source file
    this.app.audio.play('clonk', 'sfx');
  }

  private onClickToggleEnabled() {
    // toggle playSoundButton to the opposite of its current interactive/enabled state
    this.playSoundButton.enabled = !this.playSoundButton.enabled;
  }

  // switches between signal-based listeners and event-based listeners
  private onClickCycleListener() {
    // if currently using signal-based listener
    this.currentSound = this.currentSound === 'A' ? 'B' : 'A';

    if (this.currentSound === 'B') {
      // switch to event-based listener
      this.playSoundButton.onClick.disconnectAll();
      this.playSoundButton.onClick.connect(this.onClickPlaySoundB);
      this.playSoundLabel.text = 'Play Sound B';
    } else {
      // otherwise switch back to signal-based listener
      this.playSoundButton.onClick.disconnectAll();
      this.playSoundButton.onClick.connect(this.onClickPlaySoundA);
      this.playSoundLabel.text = 'Play Sound A';
    }
  }
}
