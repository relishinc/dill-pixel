export interface ICollider {
  isActor: boolean;
  isSolid: boolean;
  isSensor: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  top: number;
  bottom: number;
  left: number;
  right: number;
  isCircle: boolean;

  preUpdate(): void;

  update(deltaTime?: number): void;

  postUpdate(): void;
}
