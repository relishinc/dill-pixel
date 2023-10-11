import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from 'react';
// @ts-ignore
import ReactFpsStats from 'react-fps-stats';
import { useHLF } from '../global';
export const Menu = ({ defaultState, appStates, appStateNames, isDev, showMenu, showFPSInProduction, }) => {
    const selectRef = React.useRef(null);
    const setCurrentState = useHLF((state) => state.transitionTo);
    const handleHashChange = React.useCallback(() => {
        const hash = window.location.hash.substring(1);
        const newState = appStates?.find((S) => S.name.toLowerCase() === hash.toLowerCase());
        if (newState) {
            setCurrentState(newState);
        }
    }, [setCurrentState]);
    React.useEffect(() => {
        window.addEventListener('hashchange', handleHashChange);
        handleHashChange();
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx("style", { dangerouslySetInnerHTML: {
                    __html: `
            #fps {
              position: absolute;
              top:0; 
              right:0;
            }
            #fps > div{
              position:relative !important;
              display:block;
            }
            #state-select{
              position: absolute;
              bottom:0;
              right:0;
              background:rgba(0,0,0,0.5);
              padding:7px;
              border-top-left-radius:7px;
            }
            #state-select > select{
              appearance:none;
              padding:7px;
              display:block;
              position:relative;
              border-top-left-radius:5px;
            }
          `,
                } }), _jsxs("div", { id: 'debug', children: [(isDev || showFPSInProduction) && (_jsx("div", { id: 'fps', children: _jsx(ReactFpsStats, { id: 'fps', style: { position: 'absolute' } }) })), (isDev || showMenu) && appStates && appStates.length > 0 && defaultState && (_jsx("div", { id: 'state-select', children: _jsxs("select", { ref: selectRef, defaultValue: defaultState?.name, onChange: (event) => {
                                const value = event.target.value;
                                const newState = appStates?.find((S) => S.name === value);
                                if (newState) {
                                    window.location.hash = `${newState.name.toLowerCase()}`;
                                    selectRef?.current?.blur();
                                }
                            }, children: [_jsx("option", { disabled: true, children: "Select a game state" }), appStateNames?.map((name) => _jsx("option", { children: name }, name))] }) }))] })] }));
};
//# sourceMappingURL=Menu.js.map