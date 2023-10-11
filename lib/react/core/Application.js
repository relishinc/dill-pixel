import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Stage } from '@pixi/react';
import * as React from 'react';
import * as Debug from '../debug';
import { useHLF } from '../global';
import { useDefaultState, useSetAppSize } from '../hooks';
import { PopupManager } from '../popups';
import { StateManager } from '../state';
const isDev = process.env.NODE_ENV === 'development';
// create a standard application component that wraps a PIXI React application in the HLF context
export const Application = ({ el, states, popups, defaultState, loadingState, enableDevTools, showDevMenu, showFPSInProduction, children, }) => {
    const { appStates, appStateNames } = React.useMemo(() => {
        return { appStates: states, appStateNames: states.map((S) => S.name) };
    }, []);
    const { appPopups } = React.useMemo(() => {
        return { appPopups: popups };
    }, [popups]);
    const [size, currentState] = useHLF((state) => [state.size, state.currentState, state.transitionTo]);
    useSetAppSize(el);
    useDefaultState(defaultState, appStates, appStateNames);
    return (_jsxs(_Fragment, { children: [_jsxs(Stage, { ...size, options: { resizeTo: el }, children: [(isDev || enableDevTools) && _jsx(Debug.DevTools, {}), _jsx(StateManager, { states: appStates, stateNames: appStateNames, currentState: currentState, loadingState: loadingState }, 'StateManager'), appPopups && _jsx(PopupManager, { popups: appPopups }, 'PopupManager'), children] }, 'Stage'), (isDev || showDevMenu || showFPSInProduction) && (_jsx(Debug.Menu, { defaultState: currentState, appStates: appStates, appStateNames: appStateNames, isDev: isDev, showMenu: showDevMenu, showFPSInProduction: showFPSInProduction }))] }));
};
//# sourceMappingURL=Application.js.map