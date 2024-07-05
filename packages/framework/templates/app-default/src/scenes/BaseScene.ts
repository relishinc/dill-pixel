import { COLOR_SLATE } from '@/utils/Constants';
import { DillPixelApplication } from '@/DillPixelApplication';
import { Scene } from 'dill-pixel';

export class BaseScene extends Scene<DillPixelApplication> {
  constructor() {
    super();
    this.alpha = 0;
    this.addColoredBackground(COLOR_SLATE);
  }
}
