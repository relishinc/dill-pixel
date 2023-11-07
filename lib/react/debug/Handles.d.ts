import { Container, Graphics } from '@pixi/react';
import React from 'react';
interface HandlesProps extends React.ComponentProps<typeof Container> {
    children: React.ReactNode;
}
interface HandleProps extends React.ComponentProps<typeof Graphics> {
    color?: number;
}
interface DraggerProps extends React.ComponentProps<typeof Graphics> {
    width: number;
    height: number;
}
export declare const Handle: React.FC<HandleProps>;
export declare const Dragger: React.FC<DraggerProps>;
export declare const Handles: React.FC<HandlesProps>;
export {};
//# sourceMappingURL=Handles.d.ts.map