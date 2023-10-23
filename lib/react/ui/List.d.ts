import { _ReactPixi, Container } from '@pixi/react';
import React from 'react';
import PointLike = _ReactPixi.PointLike;
interface ListProps extends React.ComponentProps<typeof Container> {
    type?: 'horizontal' | 'vertical';
    elementsMargin?: number;
    vertPadding?: number;
    horPadding?: number;
    anchor?: PointLike;
}
export declare const useContainerAnchor: (anchor: PointLike, dimensions: {
    width: number;
    height: number;
}, vertPadding?: number, horPadding?: number, ...deps: any[]) => {
    x: number;
    y: number;
};
export declare const List: React.FC<ListProps>;
export {};
//# sourceMappingURL=List.d.ts.map