export interface IModule {
    id: string;
    initialize(): Promise<void> | void;
    destroy(): void;
}
//# sourceMappingURL=IModule.d.ts.map