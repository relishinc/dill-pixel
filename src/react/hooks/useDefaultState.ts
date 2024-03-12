import React from 'react';
import { useHLF } from '../index';
import { State } from '../state';

const isDev = process.env.NODE_ENV === 'development';

export const useDefaultState = (defaultState: State, states: State[], stateNames: string[]) => {
  const transitionTo = useHLF((state) => state.transitionTo);

  React.useEffect(() => {
    if (isDev) {
      const hash = window.location.hash?.substring(1);
      if (hash) {
        // check if the hash matches any state names
        const state = states.find((s) => s.name.toLowerCase() === hash.toLowerCase());
        if (state) {
          transitionTo(state);
          return;
        }
      }
    }
    transitionTo(defaultState);
  }, [defaultState, states, stateNames]);
};