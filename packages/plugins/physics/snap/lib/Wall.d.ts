import { Solid as SnapSolid } from './Solid';

export type WallConfig = {
    width: number;
    height: number;
    debugColor: number;
};
export declare class Wall extends SnapSolid<WallConfig> {
    type: string;
    constructor(config?: Partial<WallConfig>);
    protected initialize(): void;
}
//# sourceMappingURL=Wall.d.ts.map