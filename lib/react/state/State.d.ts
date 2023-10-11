import * as React from 'react';
export type StateProps = {
    size: {
        width: number;
        height: number;
    };
    onInAnimationComplete?: () => void | undefined;
    onOutAnimationComplete?: () => void | undefined;
    animationState: 'in' | 'out' | 'idle';
    children?: React.ReactNode[];
};
export type State = React.FC<StateProps> & {
    hasStateAnimations?: boolean;
    assets?: any;
};
//# sourceMappingURL=State.d.ts.map