import * as React from 'react';
import { Popup } from '../popups';
import { LoadingState, State } from '../state';
type ReactApplicationProps = {
    el: HTMLElement | Window;
    defaultState: State;
    loadingState?: LoadingState;
    states: State[];
    popups: Popup[];
    children?: React.ReactNode;
    enableDevTools?: boolean;
    showDevMenu?: boolean;
    showFPSInProduction?: boolean;
};
type ReactApplication = React.FC<ReactApplicationProps>;
export declare const Application: ReactApplication;
export {};
//# sourceMappingURL=Application.d.ts.map