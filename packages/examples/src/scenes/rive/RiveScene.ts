import BaseScene from '@/scenes/BaseScene';
import { RiveEntity } from '@dill-pixel/plugin-rive';
import { FlexContainer } from 'dill-pixel';
import { FederatedEvent } from 'pixi.js';

export const id = 'rive';

export const debug = {
  group: 'Rive',
  label: 'Rive (Various)',
};

export const assets = {
  preload: {
    assets: [
      {
        alias: 'vehicles',
        src: 'https://cdn.rive.app/animations/vehicles.riv',
      },
      { alias: 'reactions', src: 'static/reactions_v3.riv' },
      { alias: 'skins', src: 'static/skins_demo.riv' },
      { alias: 'cup', src: 'static/cup.riv' },
      { alias: 'marty', src: 'static/marty.riv' },
    ],
  },
  autoUnload: true,
};

export const plugins = ['rive'];

export default class RiveScene extends BaseScene {
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

    this.app.actionContext = 'default';
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
      x: -this.app.size.width * 0.5,
      y: -this.app.size.height * 0.5,
      alignItems: 'center',
      justifyContent: 'center',
      bindToAppSize: true,
      layout: { paddingTop: 110, paddingBottom: 30 },
    });

    this.reactionsList = this.mainContainer.add.flexContainer({
      layout: {
        flexDirection: 'column',
        width: 165,
        flexGrow: 0,
        flexShrink: 0,
        height: `100%`,
        justifyContent: 'center',
      },
      label: 'Reactions List',
    });

    this._addReaction('love');
    this._addReaction('mindblown');
    this._addReaction('onfire');
    this._addReaction('bullseye');

    this.app.renderer.layout.update(this.reactionsList);

    this.animation = new RiveEntity({
      asset: 'marty',
      interactive: true,
      autoPlay: true,
      cursor: 'pointer',
      anchor: 0,
      scale: 0.9,
    });

    this.animation.label = 'Marty';

    this.animation.layout = {
      width: 720,
      height: 720,
      flexGrow: 0,
      flexShrink: 1,
    };

    this.animation.onReady.connect(this._handleReady);
    this.animation.onPlay.connect((animations) => {
      console.log('play', animations);
    });
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
    reactionInstance.layout = {
      applySizeDirectly: true,
      width: 165,
      height: 150,
      flexGrow: 0,
      flexShrink: 0,
      transformOrigin: 'center center',
    };

    reactionInstance.onReady.connect(() => {
      reactionInstance.on('pointerover', this._handleHover);
      reactionInstance.on('pointerout', this._handleOut);
    });

    reactionInstance.label = artboardName;

    this.reactionsList.add.existing(reactionInstance);
  }

  async _handleReady() {
    // Logger.log({
    //   artboards: this.animation.getAvailableArtboards(),
    //   animations: this.animation.getAvailableAnimations(),
    //   stateMachines: this.animation.getAvailableStateMachines(),
    // });
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
    this.mainContainer.position.set(-this.app.size.width * 0.5, -this.app.size.height * 0.5);
    this.reactionsList.layoutHeight = '100%';
  }
}
