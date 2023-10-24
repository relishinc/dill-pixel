import { _ReactPixi } from '@pixi/react';
import React from 'react';
import { IContainerProps } from '../gameobjects';
import PointLike = _ReactPixi.PointLike;
interface ListProps extends IContainerProps {
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