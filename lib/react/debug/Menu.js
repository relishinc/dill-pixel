import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// @ts-ignore
import ReactFpsStats from 'react-fps-stats';
import { useHLF } from '../global';
export const Menu = ({ defaultState, appStates, appStateNames }) => {
    const setCurrentState = useHLF((state) => state.transitionTo);
    return (_jsxs(_Fragment, { children: [_jsx("style", { dangerouslySetInnerHTML: {
                    __html: `
            #debug {
              position: absolute;
              top:0; 
              right:0;
              display:flex;
              flex-direction:row;
              flex:0 auto;
            }
            #debug > div{
              position:relative !important;
              display:block;
            }
            #fps{}
            #fps > div{
              position:relative !important;
            }
          `,
                } }), _jsxs("div", { id: 'debug', children: [_jsx("div", { id: 'fps', children: _jsx(ReactFpsStats, { id: 'fps', style: { position: 'absolute' } }) }), _jsxs("select", { defaultValue: defaultState?.name, onChange: (event) => {
                            const value = event.target.value;
                            const newState = appStates?.find((S) => S.name === value);
                            if (newState) {
                                setCurrentState(newState);
                            }
                        }, children: [_jsx("option", { disabled: true, children: "Select a game state" }), appStateNames?.map((name) => _jsx("option", { children: name }, name))] })] })] }));
};
//# sourceMappingURL=Menu.js.map