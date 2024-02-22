import { Ticker } from 'pixi.js';
import { Size } from '../utils';
import type { IContainer } from './Container';
import { Container } from './Container';
export interface IState extends IContainer {
    id: string;
}
export declare class State extends Container implements IState {
    readonly id: string;
    constructor();
    onResize(size: Size): void;
    update(ticker: Ticker): void;
}
//# sourceMappingURL=State.d.ts.map