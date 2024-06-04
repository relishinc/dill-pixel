import { Graphics, Text } from 'pixi.js';

import { COLOR_GREEN } from '@/utils/Constants';
import { GUI } from 'dat.gui';
import { Scene } from 'dill-pixel';
import { V8Application } from '@/V8Application';

export class BaseScene extends Scene<V8Application> {
  protected readonly title: string;
  protected readonly subtitle: string;
  protected gui: GUI;
  protected config: any;
  protected _bg: Graphics;
  protected _title: Text;
  protected _subtitle: Text;

  constructor() {
    super();
  }

  public async initialize() {
    this._bg = this.add.graphics();

    this._title = this.add.text({
      text: this.title ?? this.id,
      style: { fill: 'white', fontWeight: 'bold', fontFamily: 'Arial', align: 'left' },
      x: -this.app.size.width * 0.5 + this.app.size.width * 0.1,
      y: -this.app.center.y + 50,
    });

    this._subtitle = this.add.text({
      text: this.subtitle,
      style: { fill: 'white', align: 'left', fontWeight: 'bold', fontFamily: 'Arial', fontSize: 14 },
      x: this._title.x,
      y: this._title.y + this._title.height + 10,
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

  resize() {
    if (this._bg) {
      this._bg.clear();
      this._bg
        .rect(-this.app.size.width * 0.5, -this.app.size.height * 0.5, this.app.size.width, this.app.screen.height)
        .fill({
          color: COLOR_GREEN,
        });
    }
    if (this._title) {
      this._title.position.set(-this.app.center.x + Math.min(this.app.size.width * 0.1, 100), -this.app.center.y + 50);
    }
    if (this._subtitle) {
      this._subtitle.position.set(this._title.x + 1, this._title.y + this._title.height + 10);
    }
  }

  protected async addGUI() {
    const dat = await import('dat.gui');
    this.gui = new dat.GUI({
      name: 'Controls',
      closeOnTop: true,
      closed: true,
      width: 200,
    });
    this.gui.domElement.id = 'gui';
    this.gui.domElement.style.marginRight = `0px`;
    this.app.canvas.parentNode?.appendChild(this.gui.domElement.parentNode!);
    (this.gui.domElement.parentNode as HTMLElement).style.cssText = `position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 0;
    z-index: 0;`;
  }

  protected configureGUI() {}
}
