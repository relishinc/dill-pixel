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

  preFixedUpdate(): void;

  fixedUpdate(deltaTime?: number): void;

  postFixedUpdate(): void;
}
