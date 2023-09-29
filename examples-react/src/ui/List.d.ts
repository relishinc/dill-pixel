import { Container } from '@pixi/react';
import { ListType } from '@pixi/ui';
import React from 'react';
interface ListProps extends React.ComponentProps<typeof Container> {
    type?: ListType;
    elementsMargin?: number;
    vertPadding?: number;
    horPadding?: number;
    anchor?: [number, number] | {
        x: number;
        y: number;
    } | number;
}
export declare const useContainerAnchor: (anchor: [
    number,
    number
] | {
    x: number;
    y: number;
} | number, dimensions: {
    width: number;
    height: number;
}, vertPadding?: number, horPadding?: number, ...deps: any[]) => {
    x: number;
    y: number;
};
export declare const List: React.FC<ListProps>;
export {};
//# sourceMappingURL=List.d.ts.map