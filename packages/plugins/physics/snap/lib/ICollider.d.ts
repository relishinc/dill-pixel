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
    preUpdate(): void;
    update(deltaTime?: number): void;
    postUpdate(): void;
}
//# sourceMappingURL=ICollider.d.ts.map