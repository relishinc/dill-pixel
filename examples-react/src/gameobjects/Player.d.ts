import { Sprite } from '@pixi/react';
import * as React from 'react';
interface PlayerProps extends React.ComponentProps<typeof Sprite> {
    x: number;
    y: number;
    direction: 'left' | 'right';
    debug?: boolean;
}
export declare const Player: React.ForwardRefExoticComponent<Omit<PlayerProps, "ref"> & React.RefAttributes<IContainer>>;
export {};
//# sourceMappingURL=Player.d.ts.map