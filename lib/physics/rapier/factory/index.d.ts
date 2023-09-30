import { Container } from 'pixi.js';
import { Add } from './Add';
import { Make } from './Make';
export declare class Factory {
    private app;
    private _add;
    constructor();
    set container(value: Container);
    get add(): Add;
    get make(): typeof Make;
}
//# sourceMappingURL=index.d.ts.map