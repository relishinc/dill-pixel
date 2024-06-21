import { BaseScene } from '@/scenes/BaseScene';
import { IRivePlugin, RiveEntity } from '@dill-pixel/plugin-rive';
import { FlexContainer, Logger } from 'dill-pixel';
import { DestroyOptions, FederatedEvent } from 'pixi.js';

export class RiveScene extends BaseScene {
  public title = 'Rive';
  public subtitle = 'Rive animations';

  animation: RiveEntity;
  currentArtboardIndex: number = 0;
  currentAnimationIndex: number = 0;

  mainContainer: FlexContainer;
  reactionsList: FlexContainer;
  private _paused: boolean = false;

  async initialize(): Promise<void> {
    await super.initialize();
    this.app.func.setActionContext('general');
    this.app.actions('toggle_pause').connect(() => {
      this._paused = !this._paused;
      if (this._paused) {
        this.animation.pause();
      } else {
        this.animation.resume();
      }
    });
    this.mainContainer = this.add.flexContainer({
      gap: 20,
      flexDirection: 'row',
      width: this.app.size.width,
      height: this.app.size.height,
      x: -this.app.size.width * 0.5,
      y: -this.app.size.height * 0.5,
      alignItems: 'center',
      justifyContent: 'center',
    });
    this.reactionsList = this.mainContainer.add.flexContainer({
      gap: 0,
      flexDirection: 'column',
    });

    this._addReaction('love');
    this._addReaction('mindblown');
    this._addReaction('onfire');
    this._addReaction('bullseye');

    this.animation = new RiveEntity({
      asset: 'marty',
      interactive: true,
      autoPlay: true,
      cursor: 'pointer',
      anchor: 0,
      scale: 0.9,
    });

    this.animation.onReady.connect(this._handleReady);
    this.mainContainer.add.existing(this.animation);
  }

  _addReaction(artboardName: string) {
    const reactionInstance = new RiveEntity({
      asset: 'reactions',
      interactive: true,
      autoPlay: true,
      cursor: 'pointer',
      anchor: 0,
      scale: 0.2,
      artboard: artboardName,
    });

    reactionInstance.onReady.connect(() => {
      reactionInstance.on('pointerover', this._handleHover);
      reactionInstance.on('pointerout', this._handleOut);
    });

    reactionInstance.label = artboardName;

    this.reactionsList.add.existing(reactionInstance);
  }

  async _handleReady() {
    Logger.log({
      artboards: this.animation.getAvailableArtboards(),
      animations: this.animation.getAvailableAnimations(),
      stateMachines: this.animation.getAvailableStateMachines(),
    });
    this.animation.off('click', this._changeAnimation);
    // this.animation.off('click', this._changeAnimation);

    this.animation.on('click', this._changeAnimation);
    // this.animation.on('click', this._changeArtboard);
  }

  _changeArtboard() {
    let ab = this.currentArtboardIndex + 1;
    if (ab > this.animation.getAvailableArtboards().length - 1) {
      ab = 0;
    }
    this.currentArtboardIndex = ab;
    const artboard = this.animation.getAvailableArtboards()[ab];
    this.animation.loadArtboard(artboard);
  }

  destroy(options?: DestroyOptions) {
    this.app.getPlugin<IRivePlugin>('rive').cleanup();
    super.destroy(options);
  }

  _changeAnimation() {
    let anim = this.currentAnimationIndex + 1;
    if (anim > this.animation.getAvailableAnimations().length - 1) {
      anim = 0;
    }
    this.currentAnimationIndex = anim;
    const animationName = this.animation.getAvailableAnimations()[anim];
    this.animation.playAnimation(animationName);
  }

  _handleHover(e: FederatedEvent) {
    (e.target as RiveEntity).playAnimation('Hover');
  }

  _handleOut(e: FederatedEvent) {
    (e.target as RiveEntity).playAnimation('No_hover');
  }

  resize() {
    super.resize();
    this.mainContainer.size = [this.app.size.width, this.app.size.height - 130];
    this.mainContainer.position.set(-this.app.size.width * 0.5, -this.app.size.height * 0.5 + 110);
  }
}
