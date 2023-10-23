import { Container } from '@pixi/react-animated';
import * as React from 'react';
interface FlexContainerProps extends React.ComponentProps<typeof Container> {
    width?: number;
    height?: number;
    gap?: number;
    flexDirection?: 'row' | 'column';
    flexWrap?: 'nowrap' | 'wrap';
    alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
    justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
    children: React.ReactNode;
}
export declare const FlexContainer: React.FC<FlexContainerProps>;
export default FlexContainer;
//# sourceMappingURL=FlexContainer.d.ts.map