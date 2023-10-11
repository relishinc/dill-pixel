import * as React from 'react';
// @ts-ignore
import ReactFpsStats from 'react-fps-stats';
import { useHLF } from '../global';
import { State } from '../state';

type DebuggerProps = {
  defaultState?: State;
  appStates?: State[];
  appStateNames?: string[];
  isDev?: boolean;
  showMenu?: boolean;
  showFPSInProduction?: boolean;
};

export const Menu = ({
  defaultState,
  appStates,
  appStateNames,
  isDev,
  showMenu,
  showFPSInProduction,
}: DebuggerProps) => {
  const selectRef = React.useRef<HTMLSelectElement>(null);
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
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
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
        }}
      />
      <div id={'debug'}>
        {(isDev || showFPSInProduction) && (
          <div id={'fps'}>
            <ReactFpsStats id={'fps'} style={{ position: 'absolute' }} />
          </div>
        )}
        {(isDev || showMenu) && appStates && appStates.length > 0 && defaultState && (
          <div id={'state-select'}>
            <select
              ref={selectRef}
              defaultValue={defaultState?.name}
              onChange={(event) => {
                const value = event.target.value;
                const newState = appStates?.find((S) => S.name === value);
                if (newState) {
                  window.location.hash = `${newState.name.toLowerCase()}`;
                  selectRef?.current?.blur();
                }
              }}
            >
              <option disabled>Select a game state</option>
              {appStateNames?.map((name) => <option key={name}>{name}</option>)}
            </select>
          </div>
        )}
      </div>
    </>
  );
};
