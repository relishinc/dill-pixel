import { __APPLICATION_NAME__ } from '@/__APPLICATION_NAME__';
import { COLOR_SLATE } from '@/utils/Constants';
import { Scene } from 'dill-pixel';

export class BaseScene extends Scene<__APPLICATION_NAME__> {
  constructor() {
    super();
    this.alpha = 0;
    this.addColoredBackground(COLOR_SLATE);
  }
}
