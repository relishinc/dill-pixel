import { BaseState } from '@/state/BaseState';
import { AssetMapData, delay, FlexContainer, Make, MathUtils } from 'dill-pixel';
import { Point, Sprite, Text, TextStyle } from 'pixi.js';

const whiteTextStyle = (size: number) =>
  new TextStyle({
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fill: 0xffffff,
    fontSize: size ?? 24,
  });

export class FlexContainerExample extends BaseState {
  protected backing: Sprite;
  protected flexContainer: FlexContainer;
  protected config = {
    useBacking: false,
    width: 0,
    height: 0,
    numItems: 4,
    varySizes: false,
    gap: 0,
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
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

    this.setHeaderText('Flex Container Example');
    this.backing = this.add.coloredSprite(
      0x000000,
      [size.x - 60, size.y - 200],
      'rectangle',
      {},
      0.5,
      [-size.x * 0.5 + 30, -size.y * 0.5 + 100],
      0,
    );
    this.flexContainer = this.add.flexContainer(1, this.backing.position);
    this.addItems();

    await delay(2);
    this.flexContainer.removeChildAt(2);
    await delay(2);
    const newChild = Make.text(`Item New`, whiteTextStyle(48), 1, 0, 0);
    this.flexContainer.addChildAt(newChild, 0);
    console.log(
      this.flexContainer.flexChildren.map((c) => ({
        index: this.flexContainer.getChildIndex(c),
        text: (c as Text).text,
      })),
    );

    // test flex container inside flex container
    // const fc1 = this.add.flexContainer({
    //   position: [200, -this.app.size.y * 0.5 + 100],
    //   width: 200,
    //   height: 300,
    //   flexDirection: 'column',
    //   justifyContent: 'space-between',
    // });
    //
    // const fcSub1 = fc1.add.flexContainer({ gap: 10, flexDirection: 'column' });
    // const fcSub2 = fc1.add.flexContainer({ gap: 10, flexDirection: 'column', justifyContent: 'flex-end' });
    //
    // fcSub1.add.text(`Top Item 1`, whiteTextStyle(24));
    // fcSub1.add.text(`Top Item 2`, whiteTextStyle(24));
    // fcSub2.add.text(`Bottom Item 1`, whiteTextStyle(24));
    // fcSub2.add.text(`Bottom Item 2`, whiteTextStyle(24));
    // end test
  }

  onResize(pSize: Point) {
    if (this.backing) {
      this.backing.position.set(-pSize.x * 0.5 + 30, -pSize.y * 0.5 + 100);
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
      this.flexContainer.containerHeight = this.config.flexDirection === 'row' ? 0 : this.app.size.y - 200;
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
      this.flexContainer.add.text(
        `Item ${i + 1}`,
        whiteTextStyle(varySizes ? MathUtils.clamp(Math.random() * 48 + 24, 24, 72) : 48),
        1,
        0,
        0,
      );
    });
  }
}
