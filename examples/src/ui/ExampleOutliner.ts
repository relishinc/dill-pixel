import { Animated, FocusOutliner, FocusOutlinerConfig, IFocusable } from '@relish-studios/dill-pixel';
import { Graphics } from 'pixi.js';
import { gsap } from 'gsap';

export class ExampleOutliner extends Animated(FocusOutliner) {
  private static readonly animationOffset: number = 3;
  _anim: gsap.core.Timeline;
  private _corner1: Graphics = new Graphics();
  private _corner2: Graphics = new Graphics();
  private _corner3: Graphics = new Graphics();
  private _corner4: Graphics = new Graphics();
  private _corners: Graphics[] = [this._corner1, this._corner2, this._corner3, this._corner4];

  constructor(config?: Partial<FocusOutlinerConfig>) {
    super(config);
    this.initialize();
  }

  initialize(): void {
    this._corners.forEach((corner) => {
      corner.strokeStyle = { width: 4, color: this._config.color, alpha: 1, alignment: 0.5 };
      this.addChild(corner);
    });
  }

  draw(focusTarget: IFocusable): void {
    this.clear();
    this.setFocusTarget(focusTarget);
    if (!this.focusTarget) {
      return;
    }
    this.position.set(this.focusBounds.left, this.focusBounds.top);
    this._corners.forEach((c) => c.position.set(0, 0));

    //tl
    this._corner1.moveTo(0, -2).lineTo(0, 12).stroke();
    this._corner1.moveTo(-2, 0).lineTo(12, 0).stroke();

    //tr
    this._corner2.moveTo(this.focusBounds.width, -2).lineTo(this.focusBounds.width, 12).stroke();
    this._corner2
      .moveTo(this.focusBounds.width + 2, 0)
      .lineTo(this.focusBounds.width - 12, 0)
      .stroke();

    //bl
    this._corner3.moveTo(-2, this.focusBounds.height).lineTo(12, this.focusBounds.height).stroke();
    this._corner3
      .moveTo(0, this.focusBounds.height + 2)
      .lineTo(0, this.focusBounds.height - 12)
      .stroke();

    //br
    this._corner4
      .moveTo(this.focusBounds.width + 2, this.focusBounds.height)
      .lineTo(this.focusBounds.width - 12, this.focusBounds.height)
      .stroke();
    this._corner4
      .moveTo(this.focusBounds.width, this.focusBounds.height + 2)
      .lineTo(this.focusBounds.width, this.focusBounds.height - 12)
      .stroke();

    this._anim = gsap.timeline();
    this._anim.to(
      this._corner1,
      {
        x: `-=${ExampleOutliner.animationOffset}`,
        y: `-=${ExampleOutliner.animationOffset}`,
        duration: 0.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      },
      0,
    );
    this._anim.to(
      this._corner2,
      {
        x: `+=${ExampleOutliner.animationOffset}`,
        y: `-=${ExampleOutliner.animationOffset}`,
        duration: 0.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      },
      0,
    );
    this._anim.to(
      this._corner3,
      {
        x: `-=${ExampleOutliner.animationOffset}`,
        y: `+=${ExampleOutliner.animationOffset}`,
        duration: 0.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      },
      0,
    );
    this._anim.to(
      this._corner4,
      {
        x: `+=${ExampleOutliner.animationOffset}`,
        y: `+=${ExampleOutliner.animationOffset}`,
        duration: 0.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      },
      0,
    );
  }

  clear(): void {
    this.clearFocusTarget();
    this._corners.forEach((corner) => {
      corner.clear();
    });

    if (this._anim) {
      this._anim.kill();
    }
  }
}
