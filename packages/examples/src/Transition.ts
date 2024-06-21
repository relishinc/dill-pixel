import { Container, scaleToSize, SceneTransition, Size } from 'dill-pixel';
import { gsap } from 'gsap';
import { Sprite, Texture } from 'pixi.js';

export class Transition extends SceneTransition {
  static texture: Texture;
  private size: Size = { width: 150, height: 100 };
  private _jars: Sprite[] = [];
  private _shouldRegenerateJars: boolean = true;
  private _timeline: gsap.core.Timeline;
  // private _label: Text;
  private _jarsContainer: Container;

  constructor() {
    super(true);
  }

  added() {
    this._jarsContainer = this.add.container();
    // this._label = this.add.text({
    //   style: {
    //     fontFamily: FONT_KUMBH_SANS,
    //     fontWeight: 'bold',
    //     fontSize: 72,
    //     fill: 'white',
    //     dropShadow: true,
    //   },
    //   alpha: 0,
    //   anchor: 0.5,
    // });
  }

  async enter() {
    if (!Transition.texture) {
      Transition.texture = this.make.texture({ asset: 'required/jar.png' });
    }

    const tl = gsap.timeline();
    // tl.fromTo(this._label, { y: 30, alpha: 0 }, { y: 0, alpha: 1, duration: 0.5 });
    // fill the screen based on size
    const cols = Math.ceil(this.app.size.width / this.size.width);
    const rows = Math.ceil(this.app.size.height / this.size.height) + 2;

    if (this._shouldRegenerateJars) {
      this._jarsContainer.removeChildren();
      this._jars = [];
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          // add a jar
          const jar = this._jarsContainer.add.sprite({
            asset: Transition.texture,
            anchor: 0.5,
            label: `${i}:${j}`,
          });

          scaleToSize(jar, [this.size.width + 20, this.size.height + 20]);
          this._jars.push(jar);
        }
      }
    }
    this._shouldRegenerateJars = false;

    this._jars.forEach((jar) => {
      const [row, col] = jar.label.split(':');
      jar.x = -this.app.size.width * 0.5 + this.size.width * Number(col) + this.size.width * 0.5;
      jar.y = -this.app.size.height * 0.5 + this.size.height * Number(row) + this.size.height * 0.5 - this.size.height;
    });
    this._jars.sort((a, b) => {
      if (a.y === b.y) {
        return b.x - a.x;
      }
      return b.y - a.y;
    });
    tl.from(
      this._jars,
      {
        y: -this.app.size.height,
        ease: 'expo.out',
        duration: 1,
        delay: (_idx, item) => {
          return Math.min(0, 1 - item.y / this.app.size.height);
        },
      },
      0,
    );

    this._timeline = tl;
    return this._timeline;
  }

  update() {
    if (!this.active) {
      return;
    }
    // this._label.text = `${Math.round(this.progress * 100)}%`;
  }

  resize() {
    this._shouldRegenerateJars = true;
  }

  async exit() {
    this._jars.sort((a, b) => {
      if (Math.abs(a.y - b.y) < 2) {
        return a.x - b.x;
      }
      return b.y - a.y;
    });
    const tl = gsap.timeline();
    tl.to(this._jars, {
      y: this.app.size.height,
      ease: 'expo.inOut',
      duration: 1.5,
      delay: (_idx) => {
        return _idx * 0.001;
      },
    });
    this._timeline = tl;
    return this._timeline;
  }
}
