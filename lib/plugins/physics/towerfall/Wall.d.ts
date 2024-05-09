import { Solid as TowerFallSolid } from './Solid';
export type WallConfig = {
    width: number;
    height: number;
    debugColor: number;
};
export declare class Wall extends TowerFallSolid<WallConfig> {
    type: string;
    constructor(config?: Partial<WallConfig>);
    protected initialize(): void;
}
