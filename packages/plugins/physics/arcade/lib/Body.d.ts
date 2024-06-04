import { Body as ArcadeBody } from 'arcade-physics/lib/physics/arcade/Body';
import { StaticBody as ArcadeStaticBody } from 'arcade-physics/lib/physics/arcade/StaticBody';

declare const Body_base: {
    new (...args: any[]): {
        _entity: import('./Entity').Entity;
        entity: import('./Entity').Entity;
    };
} & typeof ArcadeBody;
export declare class Body extends Body_base {
}
declare const StaticBody_base: {
    new (...args: any[]): {
        _entity: import('./Entity').Entity;
        entity: import('./Entity').Entity;
    };
} & typeof ArcadeStaticBody;
export declare class StaticBody extends StaticBody_base {
}
export {};
//# sourceMappingURL=Body.d.ts.map