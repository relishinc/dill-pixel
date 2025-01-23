import { V8Application } from '@/V8Application';
import { Actor, Solid, WithVelocity } from '@dill-pixel/plugin-snap-physics';
import { Signal, Size } from 'dill-pixel';
import { Texture } from 'pixi.js';

type BasicSolidConfig = {
  color: number;
};

type BasicActorConfig = {
  color: number;
  activeColor: number;
};

export class BasicActor<T extends BasicActorConfig = BasicActorConfig> extends Actor<T, V8Application> {
  static speed: number = 5;
  static onActivated = new Signal<(actor: BasicActor) => void>();

  constructor(config?: Partial<T>) {
    super(config);
    this.initialize();
  }

  private _active: boolean = false;

  get active(): boolean {
    return this._active;
  }

  set active(value: boolean) {
    if (this._active === value) {
      return;
    }
    this._active = value;
    if (this._active) {
      BasicActor.onActivated.emit(this);
    }
    this.setColor();
  }

  initialize() {
    this.eventMode = 'static';
    this.on('pointerup', this._setActive);
  }

  destroy() {
    this.off('pointerup', this._setActive);
    super.destroy();
  }

  added() {
    super.added();
    this.setColor();
  }

  fixedUpdate(deltaTime?: number) {
    void deltaTime;
    if (!this._active) {
      return;
    }
    if (this.app.isActionActive('move_left')) {
      this.moveX(-BasicActor.speed);
    }
    if (this.app.isActionActive('move_right')) {
      this.moveX(BasicActor.speed);
    }
    if (this.app.isActionActive('jump')) {
      this.moveY(-BasicActor.speed);
    }
    if (this.app.isActionActive('move_down')) {
      this.moveY(BasicActor.speed);
    }
  }

  setColor() {
    this.view.tint = this._active ? (this.config.activeColor ?? this.config.color) : this.config.color;
  }

  protected _setActive() {
    this.active = true;
  }
}

export class BasicSolid<T extends BasicSolidConfig = BasicSolidConfig> extends Solid<T> {
  static onActivated = new Signal<(actor: BasicActor) => void>();

  constructor(config?: Partial<T>) {
    super(config);
    this.initialize();
    this.eventMode = 'none';
    this.interactiveChildren = false;
  }

  added() {
    super.added();
    this.setColor();
  }

  setColor() {
    this.view.tint = this.config.color;
  }
}

type CircActorConfig = BasicActorConfig & {
  radius: number;
};
type RectActorConfig = BasicActorConfig & {
  size: Size;
};

type RectSolidConfig = BasicSolidConfig & {
  size: Size;
};
type CircSolidConfig = BasicSolidConfig & {
  radius: number;
};

export class CircActor extends BasicActor<CircActorConfig> {
  static texture: Texture;
  static defaults: CircActorConfig = {
    radius: 50,
    color: 0x00fff0,
    activeColor: 0x0000ff,
  };
  type = 'Circ';
  isCircle = true;

  constructor(config?: Partial<CircActorConfig>) {
    super({ ...CircActor.defaults, ...(config ?? {}) });
  }

  initialize() {
    super.initialize();
    if (!CircActor.texture) {
      const gfx = this.make.graphics().circle(0, 0, 250).fill({ color: 0xffffff });
      CircActor.texture = this.app.renderer.generateTexture(gfx);
    }
    this.view = this.add.sprite({
      asset: CircActor.texture,
      anchor: 0.5,
      width: this.config.radius * 2,
      height: this.config.radius * 2,
      tint: this.config.color,
    });
  }

  init(config?: Partial<CircActorConfig>) {
    this.config = { ...CircActor.defaults, ...(config ?? {}) };
    if (this.view) {
      this.removeChild(this.view);
    }
    this.initialize();
  }

  reset() {
    this.active = false;
    this.x = 0;
    this.y = 0;
  }
}

export class RectActor extends BasicActor<RectActorConfig> {
  static defaults: RectActorConfig = {
    size: { width: 200, height: 100 },
    color: 0x00fff0,
    activeColor: 0x0000ff,
  };
  type = 'Rect';

  constructor(config?: Partial<RectActorConfig>) {
    super({ ...RectActor.defaults, ...(config ?? {}) });
  }

  initialize() {
    super.initialize();
    const gfx = this.make
      .graphics()
      .rect(0, 0, this.config.size.width, this.config.size.height)
      .fill({ color: 0xffffff });

    this.view = this.add.sprite({ asset: this.app.renderer.generateTexture(gfx), anchor: 0.5 });
  }

  init(config?: Partial<RectActorConfig>) {
    this.config = { ...RectActor.defaults, ...(config ?? {}) };
    if (this.view) {
      this.removeChild(this.view);
    }
    this.initialize();
  }

  reset() {
    this.active = false;
    this.x = 0;
    this.y = 0;
  }
}

export class RectSolid extends BasicSolid<RectSolidConfig> {
  static defaults: RectSolidConfig = {
    size: { width: 150, height: 100 },
    color: 0x00ff00,
  };
  type = 'RectSolid';

  constructor(config?: Partial<RectSolidConfig>) {
    super({ ...RectSolid.defaults, ...(config ?? {}) });
  }

  initialize() {
    const gfx = this.make
      .graphics()
      .rect(0, 0, this.config.size.width, this.config.size.height)
      .fill({ color: 0xffffff });

    this.view = this.add.sprite({ asset: this.app.renderer.generateTexture(gfx), anchor: 0.5 });
  }
}

export class CircSolid extends BasicSolid<CircSolidConfig> {
  static defaults: CircSolidConfig = {
    radius: 100,
    color: 0x00ff00,
  };
  type = 'CircSolid';
  isCircle = true;

  constructor(config?: Partial<CircSolidConfig>) {
    super({ ...CircSolid.defaults, ...(config ?? {}) });
  }

  initialize() {
    const gfx = this.make.graphics().circle(0, 0, this.config.radius).fill({ color: 0xffffff });
    this.view = this.add.sprite({ asset: this.app.renderer.generateTexture(gfx), anchor: 0.5 });
  }
}

export class Projectile extends WithVelocity(CircActor) {
  type = 'Projectile';

  initialize() {
    super.initialize();
    this.eventMode = 'none';
    this.interactiveChildren = false;
  }

  fixedUpdate(deltaTime: number) {
    super.fixedUpdate(deltaTime);
    this.moveByVelocity(deltaTime);
  }
}
