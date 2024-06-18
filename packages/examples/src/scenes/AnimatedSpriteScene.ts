import { BaseScene } from '@/scenes/BaseScene';
import { AnimatedSprite, capitalize, FlexContainer } from 'dill-pixel';
import { FONT_KUMBH_SANS } from '@/utils/Constants';

export class AnimatedSpriteScene extends BaseScene {
  protected readonly title = 'Animated Sprite';
  protected readonly subtitle = 'Click to change animations';
  protected config = {
    sprite1: {
      speed: 0.1,
      paused: false,
    },
    sprite2: {
      speed: 0.1,
      paused: false,
    },
  };
  private list: FlexContainer;

  private male: AnimatedSprite;
  private female: AnimatedSprite;

  configureGUI() {
    const folder1 = this.gui.addFolder('Sprite 1');
    folder1.add(this.config.sprite1, 'speed', 0, 2, 0.1).onChange(() => {
      this.male.speed = this.config.sprite1.speed;
    });
    folder1.add(this.config.sprite1, 'paused', false).onChange(() => {
      this.male.paused = this.config.sprite1.paused;
    });
    const folder2 = this.gui.addFolder('Sprite 2');
    folder2.add(this.config.sprite1, 'speed', 0, 2, 0.1).onChange(() => {
      this.female.speed = this.config.sprite1.speed;
    });
    folder2.add(this.config.sprite2, 'paused', false).onChange(() => {
      this.female.paused = this.config.sprite2.paused;
    });
  }

  async initialize() {
    await super.initialize();
    this.list = this.add.flexContainer({ gap: 50, justifyContent: 'center', alignItems: 'center' });
    this.male = this._addAnimation('male', 'character_maleAdventurer', 'Sprite 1');
    this.female = this._addAnimation('female', 'character_femaleAdventurer', 'Sprite 2');
  }

  private _addAnimation(folderName: string, spriteName: string, name: string = spriteName) {
    const charContainer = this.list.add.flexContainer({
      flexDirection: 'column',
      gap: 30,
    });

    const title = charContainer.add.text({
      text: name,
      style: {
        fontFamily: FONT_KUMBH_SANS,
        fontSize: 32,
        fontWeight: '700',
        fill: 0xffffff,
      },
      resolution: 2,
    });

    const sprite = charContainer.add.animatedSprite({
      animationSpeed: 0.2,
      animation: 'idle',
      animations: {
        idle: {
          texturePrefix: `${folderName}/${spriteName}_idle`,
          numFrames: 1,
          sheet: 'characters.json',
        },
        walk: {
          texturePrefix: `${folderName}/${spriteName}_walk`,
          numFrames: 8,
          sheet: 'characters.json',
        },
        run: {
          texturePrefix: `${folderName}/${spriteName}_run`,
          numFrames: 3,
          sheet: 'characters.json',
        },
        climb: {
          texturePrefix: `${folderName}/${spriteName}_climb`,
          numFrames: 2,
          sheet: 'characters.json',
          animationSpeed: 0.05,
        },
      },
    });

    const label = charContainer.add.text({
      text: capitalize(sprite.currentAnimation),
      style: {
        fontFamily: FONT_KUMBH_SANS,
        fontSize: 20,
        fill: 0xffffff,
      },
      resolution: 2,
    });
    title.position.set(sprite.width * 0.5 - title.width * 0.5, 0);
    label.position.set(sprite.width * 0.5 - label.width * 0.5, 0);
    sprite.onAnimationChange.connect((currentAnimation: string) => {
      label.text = capitalize(currentAnimation);
      label.resolution = 2;
      label.position.set(sprite.width * 0.5 - label.width * 0.5, 0);
    });

    sprite.eventMode = 'static';
    sprite.on('pointerup', () => {
      sprite.nextAnimation();
    });

    return sprite;
  }
}
