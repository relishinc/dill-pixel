export interface IModule {
  id: string;

  initialize(): Promise<void>;

  destroy(): void;
}
