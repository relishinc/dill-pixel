import { Graphics, Sprite, Text, Texture } from 'pixi.js';

import { COLOR_SLATE, FONT_KUMBH_SANS } from '@/utils/Constants';
import { V8Application } from '@/V8Application';
import { GUI } from 'dat.gui';
import { FlexContainer, Scene, Size } from 'dill-pixel';

// will cause the scene to be included in the bundle
export const dynamic = false;

// will cause the scene not to be a part of the scene list
export const active = false;

export default class BaseScene extends Scene<V8Application> {
  protected readonly title: string;
  protected readonly subtitle: string;
  protected titleContainer: FlexContainer;
  protected gui: GUI;
  protected config: any;
  protected _bg: Graphics;
  protected _title: Text;
  protected _subtitle: Text;
  protected _headerBg: Sprite;

  get isMobile() {
    return this.app.size.width < 1200;
  }

  public async initialize() {
    this._bg = this.add.graphics();
    this._headerBg = this.add.sprite({
      asset: Texture.WHITE,
      tint: 0x0,
      width: this.app.size.width,
      height: 110,
      alpha: 0.1,
      anchor: 0,
      x: -this.app.size.width * 0.5,
      y: -this.app.size.height * 0.5,
    });

    this.titleContainer = this.add.flexContainer({
      flexDirection: 'column',
      width: this.app.size.width,
      height: 110,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      x: -this.app.size.width * 0.5,
      y: -this.app.size.height * 0.5,
      label: 'header',
    });

    this._title = this.titleContainer.add.text({
      text: this.title ?? this.id,
      resolution: 2,
      style: { fill: 'white', fontSize: 36, fontFamily: FONT_KUMBH_SANS },
    });

    this._subtitle = this.titleContainer.add.text({
      text: this.subtitle,
      resolution: 2,
      style: {
        fill: 'white',
        fontFamily: FONT_KUMBH_SANS,
        fontSize: 16,
      },
    });

    if (this.config) {
      await this.addGUI();
      this.configureGUI();
    }
    // this.alpha = 0;
  }

  public destroy() {
    if (this.gui) {
      this.gui.destroy();
    }
    super.destroy();
  }

  resize(size?: Size) {
    super.resize(size);
    if (this._bg) {
      this._bg.clear();
      this._bg
        .rect(-this.app.size.width * 0.5, -this.app.size.height * 0.5, this.app.size.width, this.app.screen.height)
        .fill({
          color: COLOR_SLATE,
        });
    }

    if (this.titleContainer) {
      this.titleContainer.containerWidth = this.app.size.width;
      this.titleContainer.x = -this.app.size.width * 0.5;
      this.titleContainer.y = -this.app.size.height * 0.5 + 20;
    }

    if (this._title) {
      this._title.x = this.isMobile ? 20 : 30;
    }
    if (this._subtitle) {
      this._subtitle.x = this._title.x;
    }

    if (this._headerBg) {
      this._headerBg.x = -this.app.size.width * 0.5;
      this._headerBg.y = -this.app.size.height * 0.5;
      this._headerBg.width = this.app.size.width;
      this._headerBg.height = this.titleContainer.height + 45;
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
