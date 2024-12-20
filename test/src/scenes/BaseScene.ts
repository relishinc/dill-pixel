import { Test } from '@/Test';
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
 */
export default class BaseScene extends Scene<Test> {
  constructor() {
    super();
    this.alpha = 0;
    this.addColoredBackground(COLOR_SLATE);
  }
}
