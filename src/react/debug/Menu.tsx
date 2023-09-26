import * as React from 'react';
// @ts-ignore
import ReactFpsStats from 'react-fps-stats';
import { useHLF } from '../global';
import { State } from '../state';

type DebuggerProps = {
  defaultState?: State;
  appStates?: State[];
  appStateNames?: string[];
};

export const Menu = ({ defaultState, appStates, appStateNames }: DebuggerProps) => {
  const setCurrentState = useHLF((state) => state.transitionTo);
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
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
        }}
      />
      <div id={'debug'}>
        <div id={'fps'}>
          <ReactFpsStats id={'fps'} style={{ position: 'absolute' }} />
        </div>
        <select
          defaultValue={defaultState?.name}
          onChange={(event) => {
            const value = event.target.value;
            setCurrentState(appStates.find((S) => S.name === value));
          }}
        >
          <option disabled>Select a game state</option>
          {appStateNames.map((name) => (
            <option key={name}>{name}</option>
          ))}
        </select>
      </div>
    </>
  );
};
