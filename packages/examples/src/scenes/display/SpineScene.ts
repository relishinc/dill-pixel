import BaseScene from '@/scenes/BaseScene';
import { SpineAnimation } from 'dill-pixel';
import { TrackEntry } from 'dill-pixel/plugins/spine/pixi-spine';

export const id = 'spine';
export const debug = {
  group: 'Display',
  label: 'Spine Animations',
};

export const assets = {
  preload: {
    bundles: ['spine'],
  },
};

type CharacterAnimations =
  | 'aim'
  | 'death'
  | 'hoverboard'
  | 'idle'
  | 'idle-turn'
  | 'jump'
  | 'portal'
  | 'run'
  | 'run-to-idle'
  | 'shoot'
  | 'walk';
export default class SpineScene extends BaseScene {
  protected readonly title = 'Spine';
  protected readonly subtitle = 'Click / Enter / Spacebar to change the animation';
  protected hero: SpineAnimation<CharacterAnimations>;
  protected animIndex = 0;
  protected _donePause = false;
  public async initialize() {
    await super.initialize();
    this.app.actionContext = 'default';
    this.hero = this.add.spineAnimation<CharacterAnimations>({
      data: 'spine/spineboy-pro.skel',
      animationName: 'idle',
      loop: true,
      x: 0,
      y: this.app.size.height * 0.35,
      scale: 0.7,
    });

    this.eventMode = 'static';
    this.on('pointerup', this._handleSelect);
    this.addSignalConnection(this.app.actions('select').connect(this._handleSelect));
  }

  resize() {
    super.resize();
    this.hero.y = this.app.size.height * 0.35;
  }

  private _handleSelect(e: any) {
    if (e.button !== 0) {
      this.hero.togglePause();
      return;
    }
    this.animIndex = (this.animIndex + 1) % this.hero.animationNames.length;
    this.hero.setAnimation(this.hero.animationNames[this.animIndex], true);
  }

  private _handleComplete(entry: TrackEntry) {
    console.log('complete', entry, 'islooping', entry.loop);
  }
}
