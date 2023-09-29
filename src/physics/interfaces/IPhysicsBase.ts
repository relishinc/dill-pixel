export interface IPhysicsBase {
  update: (pDeltaTime: number) => void;

  get debug(): boolean;

  init(pAutoStart: boolean, pDebug: boolean, autoCreateBounds: boolean, pEngineOptions: any): void;
}
