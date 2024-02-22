import { GREEN } from '@/utils/Constants';
import * as dat from 'dat.gui';
import { AssetMapData, AssetType, Container, IPoint, State, TextureAsset } from 'dill-pixel';
import { gsap } from 'gsap';
import { Sprite, Text } from 'pixi.js';
import { Application } from '../V8Application';

export class BaseState extends State<Application> {
  public gui: any;
  protected _bg: Sprite;
  protected _layout: Container;
  protected _header: Container;
  protected _main: Container;
  protected _footer: Container;
  protected _title: Text;
  protected _headerBg: Sprite;
  protected _mainTitle: Text;
  protected _footerTitle: Text;

  public constructor() {
    super();
  }

  public static get Assets(): AssetMapData[] {
    return [new TextureAsset('black2x2', AssetType.PNG)];
  }

  public init(pSize: IPoint) {
    super.init(pSize);

    // add the bg first, so it's always at the bottom
    this._bg = this.add.coloredSprite(GREEN);
    this._bg.eventMode = 'static';

    // add the layout
    this.createLayout();
    this._layout.alpha = 0;
    this._headerBg = this._header.add.coloredSprite(0x0, [this.app.size.x, 80], 'rectangle', {}, 0.2, 0, 0);
    this._title = this._header.add.text(
      '',
      {
        fontFamily: 'arboria',
        fontSize: 54,
        fill: 'white',
      },
      0,
      [15, 10],
      0,
    );

    this._mainTitle = this._main.add.text(
      '',
      {
        fontFamily: 'arboria',
        fill: 0xffffff,
        fontSize: 20,
        align: 'center',
      },
      0.5,
      0,
      0.5,
    );

    this._footerTitle = this._footer.add.text(
      `Ⓒ ${new Date().getFullYear()} Relish Digital`,
      {
        fontFamily: 'arboria',
        fill: 0xffffff,
        fontSize: 14,
      },
      0,
      -20,
      1,
    );

    this.onResize(pSize);
  }

  public async animateIn(pOnComplete: () => void): Promise<void> {
    const timeline = gsap.timeline();
    await timeline
      .to(this._layout, {
        alpha: 1,
        duration: 0.5,
      })
      .fromTo(
        this._header,
        { y: '-=200' },
        {
          y: -this.app.size.y * 0.5,
          duration: 0.4,
          ease: 'sine.out',
        },
      )
      .fromTo(
        [this._title, this._mainTitle, this._footerTitle],
        { alpha: 0 },
        {
          duration: 0.4,
          alpha: 1,
          stagger: 0.1,
        },
      );
    pOnComplete();
  }

  public async animateOut(pOnComplete: () => void): Promise<void> {
    const timeline = gsap.timeline();
    await timeline.to(this, {
      duration: 0.5,
      alpha: 0,
    });
    pOnComplete();
  }

  public onResize(pSize: IPoint) {
    super.onResize(pSize);
    if (this._bg) {
      this._bg.width = this._size.x;
      this._bg.height = this._size.y;
    }
    if (this._header) {
      this._header.position.set(-pSize.x * 0.5, -pSize.y * 0.5);
    }
    if (this._footer) {
      this._footer.position.set(pSize.x * 0.5, pSize.y * 0.5);
    }
    this._headerBg.width = this.app.size.x;
  }

  public destroy() {
    super.destroy();
  }

  /**
   * Creates layout
   * see https://pixijs.io/layout/storybook/?path=/story/complex--application-layout for more info
   * @param options
   */
  public createLayout() {
    this._layout = this.add.container({ position: [0, 0] });
    this._header = this._layout.add.container(1, [-this.app.size.x * 0.5, -this.app.size.y * 0.5]);
    this._main = this._layout.add.container({ alpha: 0.25 });
    this._footer = this._layout.add.container({ position: [this.app.size.x * 0.5, this.app.size.y * 0.5] });

    this._layout.childrenEditable = this._layout.editable = false;
  }

  public addGUI() {
    this.gui = new dat.GUI({ name: 'Controls', closeOnTop: true });
    this.app.view.parentNode?.appendChild(this.gui.domElement.parentNode);
    (this.gui.domElement.parentNode as HTMLElement).style.cssText = `position: absolute;
    top: 0;
    left: 0;
    right: 86px;
    height: 0;
    z-index: 0;`;
  }

  protected setHeaderText(pText: string) {
    this._title.text = pText;
  }

  protected setMainText(pText: string) {
    this._mainTitle.text = pText;
  }
}
