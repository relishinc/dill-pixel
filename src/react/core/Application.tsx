import { Stage } from '@pixi/react';
import * as React from 'react';
import * as Debug from '../debug';
import { useHLF } from '../global';
import { useDefaultState, useSetAppSize } from '../hooks';
import { Popup, PopupManager } from '../popups';
import { LoadingState, State, StateManager } from '../state';

const isDev = process.env.NODE_ENV === 'development';

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

// create a standard application component that wraps a PIXI React application in the HLF context
export const Application: ReactApplication = ({
  el,
  states,
  popups,
  defaultState,
  loadingState,
  enableDevTools,
  showDevMenu,
  showFPSInProduction,
  children,
}) => {
  const { appStates, appStateNames } = React.useMemo(() => {
    return { appStates: states, appStateNames: states.map((S) => S.name) };
  }, []);

  const { appPopups } = React.useMemo(() => {
    return { appPopups: popups };
  }, [popups]);

  const [size, currentState] = useHLF((state) => [state.size, state.currentState, state.transitionTo]);

  useSetAppSize(el);
  useDefaultState(defaultState, appStates, appStateNames);
  return (
    <>
      <Stage key={'Stage'} {...size} options={{ resizeTo: el }}>
        {/* create a debug menu to select game states */}
        {(isDev || enableDevTools) && <Debug.DevTools />}
        <StateManager
          key={'StateManager'}
          states={appStates}
          stateNames={appStateNames}
          currentState={currentState}
          loadingState={loadingState}
        />
        {appPopups && <PopupManager key={'PopupManager'} popups={appPopups} />}
        {children}
      </Stage>

      {(isDev || showDevMenu || showFPSInProduction) && (
        <Debug.Menu
          defaultState={currentState}
          appStates={appStates}
          appStateNames={appStateNames}
          isDev={isDev}
          showMenu={showDevMenu}
          showFPSInProduction={showFPSInProduction}
        />
      )}
    </>
  );
};
