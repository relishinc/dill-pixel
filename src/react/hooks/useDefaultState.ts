import React from 'react';
import { useHLF } from '../index';
import { State } from '../state';

export const useDefaultState = (defaultState: State) => {
  const transitionTo = useHLF((state) => state.transitionTo);
  React.useEffect(() => {
    transitionTo(defaultState);
  }, [defaultState]);
};
