import { IContainer } from 'html-living-framework/react';
import React from 'react';
type PlatformProps = {
    x: number;
    y: number;
    width: number;
    height: number;
};
export type IPlatform = {
    initialColor: number;
    setColor: (color: number) => void;
    container: IContainer;
};
export declare const Platform: React.ForwardRefExoticComponent<PlatformProps & React.RefAttributes<IPlatform>>;
export type IMovingPlatform = {
    initialColor: number;
    setColor: (color: number) => void;
    container: IContainer;
};
type MovingPlatformProps = {
    x: number;
    y: number;
    width: number;
    height: number;
    threshold?: number;
    speed?: number;
};
export declare const MovingPlatform: React.ForwardRefExoticComponent<MovingPlatformProps & React.RefAttributes<IMovingPlatform>>;
export {};
//# sourceMappingURL=Platform.d.ts.map