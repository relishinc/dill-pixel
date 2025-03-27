import BaseScene from '@/scenes/BaseScene';
import { FONT_KUMBH_SANS } from '@/utils/Constants';
import { Entity, default as MatterPhysics } from '@dill-pixel/plugin-matter-physics';
import { Container, ParticleContainer, UICanvas } from 'dill-pixel';
import { FederatedPointerEvent, Particle, ParticleOptions, Rectangle, Text, Texture } from 'pixi.js';

export const id = 'matter-physics';
export const debug = {
  group: 'Matter Physics',
  label: 'Object Creation',
  order: 4,
};

export const plugins = ['matter-physics'];

class FlourishParticle extends Particle {
  direction: number;
  speed: number;
  renderCount: number;
  constructor(options: ParticleOptions & { direction: number }) {
    super(options);
    this.renderCount = 0;
    this.direction = options.direction;
    this.speed = Math.random() * 5 - 10;
  }
}

class Particles extends ParticleContainer {
  constructor() {
    super({ dynamicProperties: { alpha: true, position: true } });
  }
  addFlourish(pos: { x: number; y: number }, numParticles: number = 50) {
    for (let i = 0; i < numParticles; i++) {
      this.addParticle(
        new FlourishParticle({
          x: pos.x,
          y: pos.y,
          texture: Texture.WHITE,
          scaleX: 4,
          scaleY: 4,
          anchorX: 0.5,
          anchorY: 0.5,
          rotation: 0,
          alpha: 1,
          direction: 20 + Math.random() * Math.PI * 10,
        }),
      );
    }
  }

  updateParticles() {
    this.particleChildren.forEach((child) => {
      const p = child as FlourishParticle;
      p.y += p.speed;
      p.x += Math.cos(p.direction) * 1;
      if (p.speed < 10) {
        p.speed += 0.25;
      }
      if (p.alpha > 0) {
        p.alpha -= 0.025; // doesn't seem to work
      }
      p.renderCount++;
      if (p.renderCount > 200) {
        this.removeParticle(p);
      }
    });
  }

  update() {
    this.updateParticles();
    super.update();
  }
}

export default class MatterPhysicsScene extends BaseScene {
  ui: UICanvas;
  countText: Text;
  protected readonly title = 'Matter Physics';
  protected readonly subtitle = 'Click to add an object';
  protected level: Container;
  protected _entities: Entity[] = [];
  protected _particles: Particles;
  protected config = {
    debug: true,
    numToAdd: 1,
  };

  protected get physics(): MatterPhysics {
    return this.app.getPlugin('matter-physics') as unknown as MatterPhysics;
  }

  configureGUI() {
    this.gui
      .add(this.config, 'debug')
      .onChange(() => {
        this._handleDebugChanged();
      })
      .name('Debug Physics');

    this.gui.add(this.config, 'numToAdd', 1, 50, 1).name('Objects to add');
  }

  destroy() {
    this.off('pointerup', this._drop);
    this.physics?.destroy();
    super.destroy();
  }

  async initialize() {
    await super.initialize();

    // needed for the drop action to work
    this.app.actionContext = 'game';

    this.app.focus.addFocusLayer(this.id);
    this.level = this.add.container();

    this.countText = this.add.text({
      style: { fontFamily: FONT_KUMBH_SANS, fill: 'white', fontSize: 18 },
      x: -this.app.size.width * 0.5 + 30,
      y: -this.app.size.height * 0.5 + 120,
    });

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
      createWalls: { thickness: 10, bottom: true, left: true, right: true },
      worldBounds: new Rectangle(0, 0, this.app.size.width, this.app.size.height - 20),
    });

    this.physics.system.enabled = true;

    this._particles = this.level.add.existing(new Particles());

    this.on('pointerup', this._drop);

    this.addSignalConnection(
      this.app.actions('drop').connect((e) => {
        this._addEntity(e.data!);
      }),
    );

    this._handleDebugChanged();

    // setTimeout(() => {
    //   Logger.log('pausing physics');
    //   this.app.pause({ pauseOther: [this.physics] });
    // }, 2000);

    // setTimeout(() => {
    //   Logger.log('resuming physics');
    //   this.app.resume();
    // }, 4000);
  }

  _drop(e: FederatedPointerEvent) {
    this.app.sendAction('drop', e);
  }

  update() {
    this.countText.text = `Entities: ${this._entities.length}`;
  }

  protected _handleDebugChanged() {
    const { debug } = this.config;
    this.physics.system.debug = debug;
  }

  private _addEntity(e: FederatedPointerEvent) {
    const pos = this.level.toLocal(e.global);

    for (let i = 0; i < this.config.numToAdd; i++) {
      const isJar = Math.random() < 0.3;
      let entity: Entity;
      if (isJar) {
        entity = new Entity({
          bodyType: 'circle',
          view: this.make.sprite({
            asset: 'jar',
            sheet: 'game/sheet',
            scale: 0.1 + Math.random() * 0.1,
            anchor: 0.5,
          }),
        });
      } else {
        const isCircle = Math.random() < 0.5;
        const size = Math.random() * 25 + 25;
        const color = Math.random() * 0xffffff;
        entity = new Entity({
          bodyType: isCircle ? 'circle' : 'rectangle',
          bodyDefinition: { restitution: 0.1, friction: 0.5, angle: Math.random() * Math.PI },
          view: isCircle
            ? this.make.graphics().circle(0, 0, size).fill({ color })
            : this.make.sprite({
                asset: Texture.WHITE,
                width: 25 + Math.random() * 25,
                height: 25 + Math.random() * 25,
                anchor: 0.5,
                tint: color,
              }),
        });
      }

      entity.position.set(pos.x, pos.y);
      this.level.add.existing(entity);
      this._entities.push(entity);

      this._particles.addFlourish(pos);
    }
  }
}
