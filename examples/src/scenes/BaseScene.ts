import { Scene } from 'dill-pixel';
import { COLOR_GREEN } from '../utils/Constants';
import { V8Application } from '../V8Application';

export class BaseScene extends Scene<V8Application> {
  protected readonly title: string;
  protected gui: any;
  protected config: any;

  constructor() {
    super();
  }

  public async initialize() {
    this.add
      .graphics({
        x: -this.app.center.x,
        y: -this.app.center.y,
      })
      .rect(0, 0, this.app.size.width, this.app.screen.height)
      .fill({
        color: COLOR_GREEN,
      });

    this.add.text({
      text: this.title ?? this.id,
      style: { fill: 'white', fontWeight: 'bold', fontFamily: 'Arial' },
      x: -this.app.center.x + 100,
      y: -this.app.center.y + 50,
    });

    if (this.config) {
      await this.addGUI();
      this.configureGUI();
    }
  }

  public async enter() {
    this.alpha = 0;
    return this.animate({ alpha: 1, duration: 0.6, ease: 'sine.out' });
  }

  public async exit() {
    return this.animate({ alpha: 0, duration: 0.4, ease: 'sine.in' });
  }

  public destroy() {
    if (this.gui) {
      this.gui.destroy();
    }
    super.destroy();
  }

  protected async addGUI() {
    const dat = await import('dat.gui');
    this.gui = new dat.GUI({ name: 'Controls', closeOnTop: true });
    this.app.canvas.parentNode?.appendChild(this.gui.domElement.parentNode);
    (this.gui.domElement.parentNode as HTMLElement).style.cssText = `position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 0;
    z-index: 0;`;
  }

  protected configureGUI() {}

  private _getConfigArgs(value: any) {
    if (Array.isArray(value)) {
      return value;
    }
    return [value];
  }
}
