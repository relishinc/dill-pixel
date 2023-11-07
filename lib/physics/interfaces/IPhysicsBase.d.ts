export interface IPhysicsBase {
    update: (pDeltaTime: number) => void;
    set debug(value: boolean);
    get debug(): boolean;
    init(pAutoStart: boolean, pDebug: boolean, autoCreateBounds: boolean, pEngineOptions: any): void;
}
//# sourceMappingURL=IPhysicsBase.d.ts.map