export interface IModule {
  initialize(): Promise<void>;

  destroy(): void;
}
