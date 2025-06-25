import { COLOR_SLATE } from '@/utils/Constants';
import { Scene } from 'dill-pixel';

// include this scene in the bundle
export const dynamic = false;

// make it inactive in the scene list (debug mode)
export const active = false;

/**
 * Base scene
 * this is a nice way to make a scene that can be extended by other scenes
 * it casts the scene to the application type,
 * so you can access the application's properties and methods in all scenes extending this one
 * it also allows you to add custom logic to the scene that can be shared across scenes
 * commented out is an example of how you can use enter / exit animations
 */
export default class Base extends Scene {
  constructor() {
    super();
    this.addColoredBackground(COLOR_SLATE);

    // // for enter / exit animations you could start the scene with 0 opacity, and fade in / out
    // this.alpha = 0;
  }

  // // enter / exit animations (basic)
  // async enter() {
  // // fade in on enter
  //   return this.animate({ alpha: 1, duration: 1, ease: 'sine.out' });
  // }

  // async exit() {
  // // fade out on exit
  //   return this.animate({ alpha: 0, duration: 0.5, ease: 'sine.in' });
  // }
}
