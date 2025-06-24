import { SceneTransition } from 'dill-pixel';
import { gsap } from 'gsap';
import { Sprite } from 'pixi.js';
import { COLOR_BG } from './utils/Constants';

export class Transition extends SceneTransition {
  private _timeline: gsap.core.Timeline;
  private _jar: Sprite;
  private _bg: Sprite;

  constructor() {
    super(true);
  }

  initialize() {
    this._bg = this.addColoredBackground({ color: COLOR_BG, alpha: 1 });
    this._bg.visible = false;

    this._jar = this.add.sprite({ asset: 'required/jar.png', anchor: 0.5, scale: 0.25, alpha: 0, pivot: [0, -40] });
  }

  async enter() {
    const tl = gsap.timeline();
    tl.set(this._bg, { visible: true, x: -this.app.size.width * 0.6 });
    tl.to(
      this._bg,
      {
        x: 0,
        ease: 'expo.out',
        duration: 0.5,
      },
      0,
    );

    tl.addLabel('jar');

    tl.to(
      this._jar.pivot,
      {
        y: 0,
        ease: 'expo.out',
        duration: 0.75,
      },
      'jar',
    );

    tl.to(
      this._jar,
      {
        alpha: 1,
        ease: 'sine.out',
        duration: 0.4,
      },
      'jar',
    );

    this._timeline = tl;

    return this._timeline;
  }

  async exit() {
    const tl = gsap.timeline();
    tl.addLabel('jar');
    tl.to(
      this._jar.pivot,
      {
        y: 20,
        ease: 'expo.in',
        duration: 0.6,
      },
      'jar',
    );

    tl.to(
      this._jar,
      {
        alpha: 0,
        ease: 'sine.in',
        duration: 0.6,
      },
      'jar',
    );
    tl.to(this._bg, {
      x: this.app.size.width * 0.6,
      ease: 'expo.in',
      duration: 0.3,
    });
    tl.set(this._bg, { visible: false });
    tl.set(this._jar.pivot, { y: -40 });
    this._timeline = tl;

    return this._timeline;
  }
}
