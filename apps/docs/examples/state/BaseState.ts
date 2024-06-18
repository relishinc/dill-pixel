import { State } from 'dill-pixel';
import { gsap } from 'gsap';
import { Sprite, Text } from 'pixi.js';
import { Application } from '../Application';

export class BaseState extends State<Application> {

  public async animateIn(pOnComplete: () => void): Promise<void> {
    await gsap.timeline().fromTo(
      this,
      {
        alpha: 0,
      },
      {
        duration: 0.5,
        alpha: 1,
      },
    );
    pOnComplete();
  }

  public async animateOut(pOnComplete: () => void): Promise<void> {
    await gsap.timeline().fromTo(
      this,
      {
        alpha: 1,
      },
      {
        duration: 0.5,
        alpha: 0,
      },
    );
    pOnComplete();
  }

}