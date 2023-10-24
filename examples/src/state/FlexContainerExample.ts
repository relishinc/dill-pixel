import { BaseState } from '@/state/BaseState';
import { AssetMapData, FlexContainer, MathUtils } from 'dill-pixel';
import { Point, TextStyle } from 'pixi.js';

const whiteTextStyle = (size: number) =>
  new TextStyle({
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fill: 0xffffff,
    fontSize: size ?? 24,
  });

export class FlexContainerExample extends BaseState {
  protected flexContainer: FlexContainer;
  protected config = {
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

  init(size: Point) {
    super.init(size);

    this.addGUI();
    this.configureGUI();

    this.setHeaderText('Flex Container Example');

    this.flexContainer = this.add.flexContainer(1, [-size.x * 0.5 + 30, -size.y * 0.5 + 100], { width: size.x - 60 });

    this.addItems();
  }

  configureGUI() {
    this.gui.add(this.config, 'numItems', 1, 20, 1).onChange(() => {
      this.addItems();
    });

    this.gui.add(this.config, 'varySizes').onChange(() => {
      this.addItems();
    });

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
    const { numItems, varySizes } = this.config;
    this.flexContainer.removeChildren();
    Array.from({ length: numItems }).forEach((_, i) => {
      this.flexContainer.add.text(
        `Item ${i + 1}`,
        whiteTextStyle(varySizes ? MathUtils.clamp(Math.random() * 48 + 24, 24, 72) : 48),
        1,
        0,
        0,
      );
    });
    setTimeout(() => this.flexContainer.layout(), 1000);
  }
}
