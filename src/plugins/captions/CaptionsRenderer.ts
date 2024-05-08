import { gsap } from 'gsap';
import { BitmapText, Sprite, Texture } from 'pixi.js';
import { Container } from '../../display/Container';
import { Logger } from '../../utils/console/Logger';
import { Size } from '../../utils/types';
import { CaptionsPlugin } from './CaptionsPlugin';
import { CaptionLine, ICaptionRenderer } from './types';

export class CaptionsRenderer extends Container implements ICaptionRenderer {
  private readonly _bg: Sprite;
  private readonly _text: BitmapText;
  private readonly _size: Size = { width: 0, height: 0 };
  private readonly fontSize = 48;

  constructor(private plugin: CaptionsPlugin) {
    super();
    this._bg = this.add.sprite({ asset: Texture.WHITE, anchor: [0.5, 0] });
    this._bg.tint = this.plugin.options.backgroundColor;
    this._bg.alpha = 0;

    this._text = this.add.bitmapText({
      font: plugin.options.fontName,
      resolution: 2,
      roundPixels: true,
      style: {
        fill: this.plugin.options.textColor,
        fontWeight: 'bold',
        fontSize: this.fontSize * this.getSizeMultiplier(),
        align: 'center',
        wordWrapWidth: this.plugin.maxWidth,
        wordWrap: true,
        lineHeight: this.fontSize * this.getSizeMultiplier() * 2 + 20,
      },
    });
    this._text.style.wordWrap = true;
    this._text.alpha = 0;
    this._text.visible = false;
    this._text.anchor.x = 0.5;
    this._text.anchor.y = 0;
    this.addChild(this._text);

    if (this.plugin.debug) {
      let isTapping = false;
      this._bg.eventMode = 'static';
      this._bg.on('pointertap', () => {
        if (isTapping) {
          return;
        }
        isTapping = true;
        setTimeout(() => {
          isTapping = false;
          void this.app.voiceover.stopVO();
        }, 100);
      });
    }
  }

  public start(): void {
    this._text.visible = true;
    this._bg.visible = true;

    gsap.killTweensOf([this._bg, this._text]);
    this.animate({ alpha: this.plugin.options.backgroundAlpha, visible: true, duration: 0.2 }, this._bg);
    this.animate({ alpha: 1, visible: true, duration: 0.2 }, this._text);
  }

  public stop(): void {
    Logger.log('CaptionsRenderer', 'stop');
    gsap.killTweensOf([this._bg, this._text]);
    this.animate({ alpha: 0, visible: false, duration: 0.2 }, [this._bg, this._text]);
  }

  public lineBegin(line: CaptionLine): void {
    let text = line.content
      .replace(/<[^>]*>/gi, '') // remove html tags
      .replace(/\[.*]\W*/gi, ''); // remove brackets
    if (line.start === 0) {
      text = text.charAt(0).toUpperCase() + text.slice(1);
    }
    this._text.text = text;
    this.resize();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public lineEnd(_line: CaptionLine): void {}

  public resize(): void {
    const size = this.app.size;
    this._size.width = size.width;
    this._size.height = size.height;

    this._text.style.fontSize = this.fontSize * this.getSizeMultiplier();
    this._text.style.wordWrapWidth = this.plugin.options.maxWidth * 2;
    this._text.scale.set(0.5);
    this._text.position.set(this._size.width * 0.5, this._text.style.fontSize * 0.2);

    this._bg.position.set(this._size.width * 0.5, 0);

    if (this.plugin.options.floating) {
      let w = this._text.width;
      let h = Math.max(this._text.height);
      this._bg.y = this._text.y;
      if (this.plugin.options.floatingSettings.padding.left) {
        w += this.plugin.options.floatingSettings.padding.left;
      }
      if (this.plugin.options.floatingSettings.padding.right) {
        w += this.plugin.options.floatingSettings.padding.right;
      }

      this._bg.x +=
        this.plugin.options.floatingSettings.padding.right * 0.5 -
        this.plugin.options.floatingSettings.padding.left * 0.5;

      if (this.plugin.options.floatingSettings.padding.top) {
        h += this.plugin.options.floatingSettings.padding.top;
      }
      if (this.plugin.options.floatingSettings.padding.bottom) {
        h += this.plugin.options.floatingSettings.padding.bottom;
      }
      this._text.y += this.plugin.options.floatingSettings.padding.top;

      this._bg.width = w;
      this._bg.height = h;
    } else {
      this._bg.height = Math.max(this._text.height + this._text.y * 2, this.fontSize);
      this._bg.width = size.width;
    }

    if (this.plugin.options.position === 'top') {
      this.position.set(-size.width * 0.5, Math.round(-size.height * 0.5));
      if (this.plugin.options.floating) {
        this.position.y += Math.round(this.plugin.options.floatingSettings.distance - this._bg.y);
      }
    } else {
      this.position.set(-size.width * 0.5, Math.round(size.height * 0.5 - this._bg.height));
      if (this.plugin.options.floating) {
        this.position.y -= Math.round(this.plugin.options.floatingSettings.distance + this._bg.y);
      }
    }
  }

  updateSettings() {
    if (this.plugin.options.enabled) {
      this._text.style.fill = this.plugin.options.textColor;
      this._bg.tint = this.plugin.options.backgroundColor;
      if (this._bg.visible) {
        this._bg.alpha = this.plugin.options.backgroundAlpha;
        this.resize();
      }
    } else {
      this.stop();
      this._bg.visible = false;
      this._text.visible = false;
      this._bg.alpha = this._text.alpha = 0;
    }
  }

  private getSizeMultiplier(): number {
    return this.plugin.options.fontSizeMultiplier;
  }
}
