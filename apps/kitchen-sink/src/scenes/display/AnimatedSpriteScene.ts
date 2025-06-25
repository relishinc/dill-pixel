import BaseScene from '@/scenes/BaseScene';
import { AnimatedSprite, capitalize, FlexContainer, type SceneAssets, type SceneDebug } from 'dill-pixel';

export const id = 'animated-sprites';
export const debug: SceneDebug = {
  group: 'Display',
  label: 'Animated Sprites',
};

export const assets: SceneAssets = {
  preload: {
    bundles: ['platformer'],
  },
};

export default class AnimatedSpriteScene extends BaseScene {
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
    this.list = this.add.flexContainer({
      gap: 50,
      justifyContent: 'center',
      alignItems: 'center',
      layout: { width: this.app.size.width },
      x: -this.app.size.width * 0.5,
      y: -200,
    });
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
        fontFamily: 'KumbhSans',
        fontSize: 32,
        fontWeight: '700',
        fill: 0xffffff,
      },
      resolution: 2,
    });

    const sprite = charContainer.add.animatedSprite({
      animationSpeed: 0.2, // default animation speed
      animation: 'idle', // default
      sheet: 'characters', // default spritesheet
      texturePrefix: `${folderName}/${spriteName}_`, // default prefix
      // zeroPad: 1, // optional default zero padding
      animations: {
        idle: {
          numFrames: 1,
        },
        walk: {
          numFrames: 8,
        },
        run: {
          numFrames: 3,
        },
        climb: {
          numFrames: 2,
          animationSpeed: 0.05, // custom speed for this animation only
        },
      },
    });

    const label = charContainer.add.text({
      text: capitalize(sprite.currentAnimation),
      style: {
        fontFamily: 'KumbhSans',
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

  resize() {
    super.resize();
    this.list.layoutWidth = this.app.size.width;
    this.list.position.set(-this.app.size.width * 0.5, -200);
  }
}
