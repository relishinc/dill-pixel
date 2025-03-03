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
 * Be sure to provide your Application class as a generic parameter in your scene or base scene - it will give you intellisense for your actions and contexts.
 */
export default class BaseScene extends Scene<MyApplication> {
  constructor() {
    super();
    this.alpha = 0;
    this.addColoredBackground(COLOR_SLATE);
  }
}
