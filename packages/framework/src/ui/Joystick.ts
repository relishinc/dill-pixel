import { DestroyOptions, FederatedPointerEvent, Graphics, Point, Sprite } from 'pixi.js';
import { Container } from '../display';
import { Signal } from '../signals';
import { JoystickDirection } from '../plugins';

export interface IJoystick {
  onChange: Signal<(detail: JoystickSignalDetail) => void>;
  onStart: Signal<() => void>;
  onEnd: Signal<() => void>;
  onDestroy: Signal<() => void>;
  settings: JoystickSettings;
  outerRadius: number;
  innerRadius: number;
  outer: Sprite | Graphics;
  inner: Sprite | Graphics;
  dragging: boolean;
  pointData: Point;
  power: number;
  startPosition: Point;
  direction: JoystickDirection;
}

export interface JoystickSignalDetail {
  angle: number;
  direction: JoystickDirection;
  power: number;
}

export interface JoystickSettings {
  outer?: Sprite | Graphics;
  inner?: Sprite | Graphics;
  outerScale?: number;
  innerScale?: number;
  threshold?: number;
}

export class Joystick extends Container implements IJoystick {
  onChange = new Signal<(detail: JoystickSignalDetail) => void>();
  onStart = new Signal<() => void>();
  onEnd = new Signal<() => void>();
  onDestroy = new Signal<() => void>();
  settings: JoystickSettings;
  outerRadius: number = 0;
  innerRadius: number = 0;

  outer!: Sprite | Graphics;
  inner!: Sprite | Graphics;

  innerAlphaStandby = 0.5;

  dragging: boolean = false;
  pointData: Point = new Point();
  power: number;
  startPosition: Point;
  direction: JoystickDirection = JoystickDirection.None;
  threshold: number;

  private _pointerId?: number;

  constructor(opts: Partial<JoystickSettings>) {
    super();

    this.settings = Object.assign(
      {
        outerScale: 1,
        innerScale: 1,
      },
      opts,
    );

    if (!this.settings.outer) {
      const outer = new Graphics();
      outer.circle(0, 0, 60).fill({ color: 0x0 });
      outer.alpha = 0.5;
      this.settings.outer = outer;
    }

    if (!this.settings.inner) {
      const inner = new Graphics();
      inner.circle(0, 0, 35).fill({ color: 0x0 });
      inner.alpha = this.innerAlphaStandby;
      this.settings.inner = inner;
    }

    this.threshold = this.settings.threshold ?? 0.01;

    this.initialize();
  }

  initialize() {
    this.outer = this.settings.outer!;
    this.inner = this.settings.inner!;

    this.outer.scale.set(this.settings.outerScale, this.settings.outerScale);
    this.inner.scale.set(this.settings.innerScale, this.settings.innerScale);

    if ('anchor' in this.outer) {
      this.outer.anchor.set(0.5);
    }
    if ('anchor' in this.inner) {
      this.inner.anchor.set(0.5);
    }

    this.add.existing(this.outer);
    this.add.existing(this.inner);

    // this.outerRadius = this.containerJoystick.width / 2;
    this.outerRadius = this.width / 2.5;
    this.innerRadius = this.inner.width / 2;

    this.bindEvents();
  }

  handleDragMove(e: FederatedPointerEvent) {
    if (!this.dragging || e.pointerId !== this._pointerId) {
      return;
    }
    const newPosition = this.toLocal(e.global);
    const sideX = newPosition.x - this.startPosition.x;
    const sideY = newPosition.y - this.startPosition.y;

    const centerPoint = new Point(0, 0);
    let angle = 0;
    let direction = JoystickDirection.None;
    if (sideX == 0 && sideY == 0) {
      this.direction = direction;
      return;
    }

    if (sideX === 0) {
      if (sideY > 0) {
        centerPoint.set(0, sideY > this.outerRadius ? this.outerRadius : sideY);
        angle = 270;
        direction = JoystickDirection.Bottom;
      } else {
        centerPoint.set(0, -(Math.abs(sideY) > this.outerRadius ? this.outerRadius : Math.abs(sideY)));
        angle = 90;
        direction = JoystickDirection.Top;
      }
      this.inner.position.set(centerPoint.x, centerPoint.y);
      this.power = this.getPower(centerPoint);
      if (this.power >= this.threshold) {
        this.direction = direction;
        this.onChange.emit({ angle, direction, power: this.power });
        return;
      }
    }

    if (sideY === 0) {
      if (sideX > 0) {
        centerPoint.set(Math.abs(sideX) > this.outerRadius ? this.outerRadius : Math.abs(sideX), 0);
        angle = 0;
        direction = JoystickDirection.Right;
      } else {
        centerPoint.set(-(Math.abs(sideX) > this.outerRadius ? this.outerRadius : Math.abs(sideX)), 0);
        angle = 180;
        direction = JoystickDirection.Left;
      }

      this.inner.position.set(centerPoint.x, centerPoint.y);
      this.power = this.getPower(centerPoint);
      if (this.power >= this.threshold) {
        this.direction = direction;
        this.onChange.emit({ angle, direction, power: this.power });
        return;
      }
    }

    const tanVal = Math.abs(sideY / sideX);
    const radian = Math.atan(tanVal);
    angle = (radian * 180) / Math.PI;

    let centerX = 0;
    let centerY = 0;

    if (sideX * sideX + sideY * sideY >= this.outerRadius * this.outerRadius) {
      centerX = this.outerRadius * Math.cos(radian);
      centerY = this.outerRadius * Math.sin(radian);
    } else {
      centerX = Math.abs(sideX) > this.outerRadius ? this.outerRadius : Math.abs(sideX);
      centerY = Math.abs(sideY) > this.outerRadius ? this.outerRadius : Math.abs(sideY);
    }

    if (sideY < 0) {
      centerY = -Math.abs(centerY);
    }

    if (sideX < 0) {
      centerX = -Math.abs(centerX);
    }

    if (sideX > 0 && sideY < 0) {
      // < 90
    } else if (sideX < 0 && sideY < 0) {
      // 90 ~ 180
      angle = 180 - angle;
    } else if (sideX < 0 && sideY > 0) {
      // 180 ~ 270
      angle = angle + 180;
    } else if (sideX > 0 && sideY > 0) {
      // 270 ~ 369
      angle = 360 - angle;
    }
    centerPoint.set(centerX, centerY);
    this.power = this.getPower(centerPoint);
    if (this.power >= this.threshold) {
      direction = this.getDirection(centerPoint);
      this.direction = direction;
      this.inner.position.set(centerPoint.x, centerPoint.y);
      this.onChange.emit({ angle, direction, power: this.power });
    }
  }

  destroy(options?: DestroyOptions) {
    this.off('pointerdown', this.handleDragStart)
      .off('pointerup', this.handleDragEnd)
      .off('pointerupoutside', this.handleDragEnd)
      .off('pointermove', this.handleDragMove);
    window.removeEventListener('pointerup', this.handleDragEnd);
    this.onDestroy.emit();
    super.destroy(options);
  }

  protected handleDragStart(e: FederatedPointerEvent) {
    if (this._pointerId !== undefined) {
      return;
    }
    this._pointerId = e.pointerId;
    this.startPosition = this.toLocal(e.global);
    this.dragging = true;
    this.inner.alpha = 1;
    this.onStart.emit();
  }

  protected handleDragEnd(e: FederatedPointerEvent | PointerEvent) {
    if (this._pointerId !== e.pointerId) {
      return;
    }
    this.direction = JoystickDirection.None;
    this.inner.position.set(0, 0);
    this.dragging = false;
    this.inner.alpha = this.innerAlphaStandby;
    this.onEnd.emit();
    this._pointerId = undefined;
  }

  protected bindEvents() {
    this.eventMode = 'static';
    this.on('pointerdown', this.handleDragStart)
      .on('pointerup', this.handleDragEnd)
      .on('pointerupoutside', this.handleDragEnd)
      .on('pointermove', this.handleDragMove);

    window.addEventListener('pointerup', this.handleDragEnd);
  }

  protected getPower(centerPoint: Point) {
    const a = centerPoint.x;
    const b = centerPoint.y;
    return Math.min(1, Math.sqrt(a * a + b * b) / this.outerRadius);
  }

  protected getDirection(center: Point) {
    const rad = Math.atan2(center.y, center.x); // [-PI, PI]
    if ((rad >= -Math.PI / 8 && rad < 0) || (rad >= 0 && rad < Math.PI / 8)) {
      return JoystickDirection.Right;
    } else if (rad >= Math.PI / 8 && rad < (3 * Math.PI) / 8) {
      return JoystickDirection.BottomRight;
    } else if (rad >= (3 * Math.PI) / 8 && rad < (5 * Math.PI) / 8) {
      return JoystickDirection.Bottom;
    } else if (rad >= (5 * Math.PI) / 8 && rad < (7 * Math.PI) / 8) {
      return JoystickDirection.BottomLeft;
    } else if ((rad >= (7 * Math.PI) / 8 && rad < Math.PI) || (rad >= -Math.PI && rad < (-7 * Math.PI) / 8)) {
      return JoystickDirection.Left;
    } else if (rad >= (-7 * Math.PI) / 8 && rad < (-5 * Math.PI) / 8) {
      return JoystickDirection.TopLeft;
    } else if (rad >= (-5 * Math.PI) / 8 && rad < (-3 * Math.PI) / 8) {
      return JoystickDirection.Top;
    } else {
      return JoystickDirection.TopRight;
    }
  }
}
