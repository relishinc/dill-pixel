import React from 'react';
export type PopupProps = {
    id: string;
    animationState: 'in' | 'out' | 'idle';
    size: {
        width: number;
        height: number;
    };
    onInAnimationComplete?: () => void;
    onOutAnimationComplete?: () => void;
    children?: React.ReactNode;
};
export type Popup = React.FC<PopupProps>;
//# sourceMappingURL=Popup.d.ts.map