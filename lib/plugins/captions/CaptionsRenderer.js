import { gsap } from 'gsap';
import { Texture } from 'pixi.js';
import { Container } from '../../display/Container';
import { Logger } from '../../utils/console/Logger';
export class CaptionsRenderer extends Container {
    plugin;
    _bg;
    _text;
    _size = { width: 0, height: 0 };
    fontSize = 48;
    constructor(plugin) {
        super();
        this.plugin = plugin;
        this._bg = this.add.sprite({ asset: Texture.WHITE, anchor: [0.5, 0] });
        this._bg.tint = this.plugin.options.backgroundColor;
        this._bg.alpha = 0;
        this._text = this.add.bitmapText({
            font: plugin.options.fontName,
            resolution: 2,
            roundPixels: true,
            style: {
                fill: this.plugin.options.textColor,
                fontSize: this.fontSize * this.getSizeMultiplier(),
                fontWeight: 'bold',
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
    start() {
        this._text.visible = true;
        this._bg.visible = true;
        gsap.killTweensOf([this._bg, this._text]);
        this.animate({ alpha: this.plugin.options.backgroundAlpha, visible: true, duration: 0.2 }, this._bg);
        this.animate({ alpha: 1, visible: true, duration: 0.2 }, this._text);
    }
    stop() {
        Logger.log('CaptionsRenderer', 'stop');
        gsap.killTweensOf([this._bg, this._text]);
        this.animate({ alpha: 0, visible: false, duration: 0.2 }, [this._bg, this._text]);
    }
    lineBegin(line) {
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
    lineEnd(_line) { }
    resize() {
        const size = this.app.size;
        const opts = this.plugin.options;
        this._size.width = size.width;
        this._size.height = size.height;
        this._text.style.fontSize = this.fontSize * this.getSizeMultiplier();
        this._text.style.wordWrapWidth = opts.maxWidth * 2;
        this._text.scale.set(0.5);
        this._text.position.set(this._size.width * 0.5, 0);
        this._bg.position.set(this._size.width * 0.5, 0);
        let h = this._text.height;
        if (opts.padding.top) {
            h += opts.padding.top;
        }
        if (opts.padding.bottom) {
            h += opts.padding.bottom;
        }
        this._bg.height = h;
        this._text.y += opts.padding.top;
        if (opts.floating) {
            let w = this._text.width;
            if (opts.padding.left) {
                w += opts.padding.left;
            }
            if (opts.padding.right) {
                w += opts.padding.right;
            }
            this._bg.x += opts.padding.right * 0.5 - opts.padding.left * 0.5;
            this._bg.width = w;
        }
        else {
            this._bg.width = size.width;
        }
        if (opts.position === 'top') {
            this.position.set(-size.width * 0.5, Math.round(-size.height * 0.5));
            if (opts.floating) {
                this.position.y += Math.round(opts.distance - this._bg.y);
            }
        }
        else {
            this.position.set(-size.width * 0.5, Math.round(size.height * 0.5 - this._bg.height));
            if (opts.floating) {
                this.position.y -= Math.round(opts.distance + this._bg.y);
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
        }
        else {
            this.stop();
            this._bg.visible = false;
            this._text.visible = false;
            this._bg.alpha = this._text.alpha = 0;
        }
    }
    getSizeMultiplier() {
        return this.plugin.options.fontSizeMultiplier;
    }
}
