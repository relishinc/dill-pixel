import { BaseState } from '@/state/BaseState';
import { AssetMapData, FlexContainer, MathUtils } from 'dill-pixel';
import { Point, Sprite, TextStyle } from 'pixi.js';

const whiteTextStyle = (size: number) =>
  new TextStyle({
    fontFamily: 'Kumbh Sans',
    fontWeight: '600',
    fill: 0xffffff,
    fontSize: size ?? 24,
  });

export class FlexContainerExample extends BaseState {
  protected backing: Sprite;
  protected flexContainer: FlexContainer;
  protected config = {
    useBacking: true,
    width: 800,
    height: 200,
    numItems: 4,
    varySizes: false,
    gap: 0,
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    nested: false,
  };

  public static get NAME(): string {
    return 'FlexContainerExample';
  }

  public static get Assets(): AssetMapData[] {
    return [];
  }

  async init(size: Point) {
    super.init(size);

    this.addGUI();
    this.configureGUI();

    this.setHeaderText('Flex container example');
    this.setMainText('Use the controls to adjust the flex container properties');

    this.backing = this.add.coloredSprite({
      color: 0x000000,
      size: [size.x, size.y],
      shape: 'rectangle',
      alpha: 0.25,
      anchor: 0,
    });

    this.flexContainer = this.add.flexContainer({
      gap: this.config.gap as number,
      flexDirection: this.config.flexDirection as 'row' | 'column',
      flexWrap: this.config.flexWrap as 'nowrap' | 'wrap',
      justifyContent: this.config.justifyContent as
        | 'flex-start'
        | 'center'
        | 'flex-end'
        | 'space-between'
        | 'space-around'
        | 'space-evenly',
      alignItems: this.config.alignItems as 'center' | 'flex-start' | 'flex-end',
      width: this.config.width as number,
      height: this.config.height as number,
    });

    this.addItems();
  }

  onResize(pSize: Point) {
    if (this.backing) {
      this.backing.position.set(-this.backing.width / 2, -this.backing.height / 2);
      this.flexContainer.position.set(this.backing.position.x, this.backing.position.y);
      if (this.config.useBacking) {
        this.flexContainer.size = [this.backing.width, this.backing.height];
      }
    }
    super.onResize(pSize);
  }

  destroy() {
    if (this.gui) {
      this.gui.destroy();
    }
  }

  configureGUI() {
    this.gui
      .add(this.config, 'useBacking')
      .onChange(() => {
        this.addItems();
      })
      .name('Show backing');

    this.gui.add(this.config, 'width', 0, 2000, 1).onChange(() => {
      this.addItems();
    });

    this.gui.add(this.config, 'height', 0, 2000, 1).onChange(() => {
      this.addItems();
    });

    this.gui
      .add(this.config, 'numItems', 1, 20, 1)
      .onChange(() => {
        this.addItems();
      })
      .name('Number of items');

    this.gui
      .add(this.config, 'varySizes')
      .onChange(() => {
        this.addItems();
      })
      .name('Vary sizes');

    this.gui.add(this.config, 'gap', 0, 100, 1).onChange(() => {
      this.flexContainer.gap = this.config.gap;
    });

    this.gui.add(this.config, 'flexWrap', ['nowrap', 'wrap']).onChange(() => {
      this.flexContainer.flexWrap = this.config.flexWrap as 'nowrap' | 'wrap';
    });

    this.gui.add(this.config, 'flexDirection', ['row', 'column']).onChange(() => {
      this.flexContainer.flexDirection = this.config.flexDirection as 'row' | 'column';
    });

    this.gui.add(this.config, 'alignItems', ['flex-start', 'center', 'flex-end']).onChange(() => {
      this.flexContainer.alignItems = this.config.alignItems as 'center' | 'flex-start' | 'flex-end';
    });

    this.gui
      .add(this.config, 'justifyContent', [
        'flex-start',
        'center',
        'flex-end',
        'space-between',
        'space-around',
        'space-evenly',
      ])
      .onChange(() => {
        this.flexContainer.justifyContent = this.config.justifyContent as
          | 'flex-start'
          | 'center'
          | 'flex-end'
          | 'space-between'
          | 'space-around'
          | 'space-evenly';
      });

    this.gui
      .add(this.config, 'nested')
      .onChange(() => {
        this.addItems();
      })
      .name('Nested');
  }

  addItems() {
    const { numItems, varySizes, useBacking } = this.config;
    this.backing.visible = useBacking;

    const width = this.config.width;
    const height = this.config.height;

    if (this.backing.visible) {
      this.backing.width = width;
      this.backing.height = height;
    }

    this.flexContainer.removeChildren();

    this.flexContainer.size = [width, height];

    Array.from({ length: numItems }).forEach((_, i) => {
      if (this.config.nested && numItems > 1 && i === 1) {
        const nested: FlexContainer = this.flexContainer.add.flexContainer({
          flexDirection: this.config.flexDirection === 'row' ? 'column' : 'row',
          gap: 10,
          alignItems: 'center',
          justifyContent: 'center',
        });
        Array.from({ length: numItems }).forEach((_, n) => {
          nested.add.text(`Nested ${n + 1}`, whiteTextStyle(24), 1, 0, 0);
        });
      }
      this.flexContainer.add.text(
        `Item ${i + 1}`,
        whiteTextStyle(varySizes ? MathUtils.clamp(Math.random() * 48 + 24, 24, 72) : 48),
        1,
        0,
        0,
      );
    });

    this.onResize(this.app.size);
  }
}
