import { Container, Point, Sprite } from "pixi.js";
import { Application } from "../Application";
import { LOAD_COMPLETE, STATE_INIT } from "../Data";

export interface IPadding {
  top?: number | (() => number);
  left?: number | (() => number);
  bottom?: number | (() => number);
  right?: number | (() => number);
}

export enum AnchorPosition {
  TOP_LEFT = "top left",
  LEFT = "left",
  BOTTOM_LEFT = "bottom left",
  TOP = "top",
  TOP_RIGHT = "top right",
  RIGHT = "right",
  BOTTOM_RIGHT = "bottom right",
  BOTTOM = "bottom",
  CENTER = "center",
}

export interface IAnchorValue {
  anchorPosition: AnchorPosition;
  padding?: IPadding;
  container?: Container;
}

export class AnchorManager {
  width: number = 0;
  height: number = 0;
  _registry: Map<Sprite, IAnchorValue> = new Map<Sprite, IAnchorValue>();

  constructor(private app: Application, private container: Container) {
    this.updatePositions = this.updatePositions.bind(this);

    this.width = this.container.width;
    this.height = this.container.height;

    this.app.subscribe(LOAD_COMPLETE, this.updatePositions);
    this.app.subscribe(STATE_INIT, this.updatePositions);
  }

  anchor(
    object: Sprite,
    anchorPosition: AnchorPosition,
    padding?: IPadding,
    container?: Container
  ) {
    this._registry.set(object, { anchorPosition, padding, container });
    this.positionObject(object, { anchorPosition, padding, container });
  }

  public setSize(size: Point): void {
    this.width = size.x;
    this.height = size.y;

    this.updatePositions();
  }

  positionObject(object: Sprite, value: IAnchorValue) {
    const anchorPosition = value.anchorPosition;
    const padding = value?.padding || { top: 0, left: 0, right: 0, bottom: 0 };
    const container = value?.container || this.container;
    switch (anchorPosition) {
      // tl
      case AnchorPosition.TOP_LEFT:
        object.anchor.set(0, 0);
        object.position.set(
          container.x - this.width * 0.5 + this.renderPadding(padding?.left),
          container.y - this.height * 0.5 + this.renderPadding(padding?.top)
        );
        break;
      // l
      case AnchorPosition.LEFT:
        object.anchor.set(0, 0.5);
        object.position.set(
          container.x - this.width * 0.5 + this.renderPadding(padding?.left),
          container.y
        );
        break;
      // bl
      case AnchorPosition.BOTTOM_LEFT:
        object.anchor.set(0, 1);
        object.position.set(
          container.x - this.width * 0.5 + this.renderPadding(padding?.left),
          container.y + this.height * 0.5 - this.renderPadding(padding?.bottom)
        );
        break;
      // tr
      case AnchorPosition.TOP_RIGHT:
        object.anchor.set(1, 0);
        object.position.set(
          container.x + this.width * 0.5 - this.renderPadding(padding?.right),
          container.y - this.height * 0.5 + this.renderPadding(padding?.top)
        );
        break;
      // r
      case AnchorPosition.RIGHT:
        object.anchor.set(1, 0.5);
        object.position.set(
          container.x + this.width * 0.5 - this.renderPadding(padding?.right),
          container.y
        );
        break;
      // br
      case AnchorPosition.BOTTOM_RIGHT:
        object.anchor.set(1, 1);
        object.position.set(
          container.x + this.width * 0.5 - this.renderPadding(padding?.right),
          container.y + this.height * 0.5 - this.renderPadding(padding?.bottom)
        );
        break;
      // t
      case AnchorPosition.TOP:
        object.anchor.set(0.5, 0);
        object.position.set(
          container.x,
          container.y - this.height * 0.5 + this.renderPadding(padding?.top)
        );
        break;
      // b
      case AnchorPosition.BOTTOM:
        object.anchor.set(0.5, 1);
        object.position.set(
          container.x,
          container.y + this.height * 0.5 - this.renderPadding(padding?.bottom)
        );
        break;
    }
  }

  renderPadding(padding: number | (() => number) | undefined): number {
    if (!padding) {
      return 0;
    }
    if (typeof padding === "number") {
      return padding;
    }
    return padding();
  }

  private updatePositions() {
    this._registry.forEach((value, key) => {
      this.positionObject(key, value);
    });
  }
}
