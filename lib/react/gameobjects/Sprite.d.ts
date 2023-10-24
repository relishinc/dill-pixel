import { _ReactPixi } from '@pixi/react';
import React from 'react';
interface ISpriteProps extends _ReactPixi.ISprite {
    asset?: string;
    sheet?: string;
    editable?: boolean;
}
export declare const Sprite: React.ForwardRefExoticComponent<Omit<ISpriteProps, "ref"> & React.RefAttributes<import("pixi.js").Sprite>>;
export {};
//# sourceMappingURL=Sprite.d.ts.map