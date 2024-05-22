import { Application } from 'dill-pixel';
import { Actor } from './Actor';
import { Entity } from './Entity';

export declare class Sensor<T = any, A extends Application = Application> extends Actor<T, A> {
    type: string;
    isSensor: boolean;
    get collideables(): Entity[];
    added(): void;
    removed(): void;
}
//# sourceMappingURL=Sensor.d.ts.map