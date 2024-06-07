import { Container, Logger, UICanvas } from 'dill-pixel';
import { Entity, default as MatterPhysics } from '@dill-pixel/plugin-matter-physics';
import { FederatedPointerEvent, Rectangle, Texture } from 'pixi.js';

import { BaseScene } from '@/scenes/BaseScene';

export class MatterPhysicsScene extends BaseScene {
  ui: UICanvas;
  protected readonly title = 'Matter Physics';
  protected readonly subtitle = 'Click to add an object';
  protected level: Container;

  protected config = {
    debug: true,
  };

  configureGUI() {
    this.gui
      .add(this.config, 'debug')
      .onChange(() => {
        this._handleDebugChanged();
      })
      .name('Debug Physics');
  }

  protected get physics(): MatterPhysics {
    return this.app.getPlugin('matter') as unknown as MatterPhysics;
  }

  destroy() {
    this.physics.destroy();
    super.destroy();
  }

  async initialize() {
    await super.initialize();
    this.app.focus.addFocusLayer(this.id);
    this.level = this.add.container();


    this.eventMode = 'static';

    this.level.position.set(-this.app.size.width * 0.5, -this.app.size.height * 0.5);
    this.ui = this.add.uiCanvas({ padding: 10, useAppSize: true });
    this.ui.zIndex = 100;


    this.physics.system.initialize({
      debug: true,
      container: this.level,
      engine: {
        gravity: { y: 0.98 },
      },
      createWalls: { thickness: 10, bottom: true },
      worldBounds: new Rectangle(0, 0, this.app.size.width, this.app.size.height),
    });

    this.physics.system.enabled = true;

    this.on('click', this._addEntity);
    this._handleDebugChanged();

  }

  private _addEntity(e: FederatedPointerEvent) {

    const isJar = Math.random() < 0.3;

    let entity: Entity;
    if (isJar) {
      entity = new Entity({
        bodyType: 'circle',
        view: this.make.sprite({
          asset: 'jar',
          sheet: 'game/sheet/sheet.json',
          scale: 0.1 + Math.random() * 0.2,
          anchor: 0.5,
        }),
      });
    } else {
      const isCircle = Math.random() < 0.5;
      const size = Math.random() * 50 + 50;
      const color = Math.random() * 0xffffff;
      entity = new Entity({
        bodyType: isCircle ? 'circle' : 'rectangle',
        bodyDefinition: { restitution: 0.1, friction: 0.5, angle: Math.random() * Math.PI },
        view: isCircle ? this.make.graphics().circle(0, 0, size).fill({ color }) : this.make.sprite({
          asset: Texture.WHITE,
          width: 50 + Math.random() * 100,
          height: 50 + Math.random() * 100,
          anchor: 0.5,
          tint: color
        }),
      });
    }

    entity.position.set(e.pageX, e.pageY);
    this.level.add.existing(entity);
  }

  update() {
  }

  resize() {
    super.resize();
  }

  protected _handleDebugChanged() {
    const { debug } = this.config;
    this.physics.system.debug = debug;
  }
}
