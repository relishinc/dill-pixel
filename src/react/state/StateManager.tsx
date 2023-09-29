import { Container } from '@pixi/react';
import { Assets } from 'pixi.js';
import * as React from 'react';
import { useHLF } from '../global';
import { LoadingState, State } from '../state';

type StateManagerProps = {
  currentState: State | undefined;
  states: State[];
  stateNames: string[];
  loadingState?: LoadingState;
};

export const StateManager = (props: StateManagerProps) => {
  const { size } = useHLF((globalState) => ({
    size: globalState.size,
  }));

  const [isInitial, setIsInitial] = React.useState(true);

  const [loadProgress, setLoadProgress] = React.useState(0);
  const [isCurrentStateReady, setIsCurrentStateReady] = React.useState(false);
  const [isOldStateComplete, setIsOldStateComplete] = React.useState(false);
  const [showLoadingState, setShowLoadingState] = React.useState(false);

  // ready and complete states for the loading overlay
  const [isLoadingReady, setIsLoadingReady] = React.useState(true);
  const [isLoadingComplete, setIsLoadingComplete] = React.useState(false);

  const [assetsInitted, setAssetsInitted] = React.useState(false);
  const oldState = React.useRef<State | undefined>(undefined);
  const incomingState = React.useRef<State | undefined>(props.currentState);
  const loadingState = React.useRef<LoadingState | undefined>(props.loadingState);

  const stateNames = React.useRef<string[] | null>(null);

  React.useEffect(() => {
    const initWithManifest = async () => {
      const manifest: any = {
        bundles: props.states
          .map((S) => ({
            name: S.name,
            assets: S.assets,
          }))
          .filter((b) => b.assets),
      };
      await Assets.init({ manifest });
      setAssetsInitted(true);
    };
    if (stateNames.current !== props.stateNames) {
      stateNames.current = props.stateNames;
      initWithManifest();
    }
  }, [props.stateNames]);

  React.useEffect(() => {
    if (isCurrentStateReady && isOldStateComplete && isLoadingComplete) {
      setShowLoadingState(false);
    }
  }, [isCurrentStateReady, isOldStateComplete]);

  const onLoadProgress = React.useCallback(
    (progress: number) => {
      setLoadProgress(progress);
    },
    [setLoadProgress],
  );

  const loadBundle = React.useCallback(async () => {
    if (!incomingState.current?.name) {
      return;
    }
    await Assets.loadBundle(incomingState.current.name, onLoadProgress);
    setIsInitial(false);
    setIsCurrentStateReady(true);
  }, [incomingState.current, onLoadProgress, setIsCurrentStateReady]);

  React.useEffect(() => {
    if (incomingState?.current?.name !== props?.currentState?.name) {
      oldState.current = incomingState.current;
      incomingState.current = props.currentState;
      setIsOldStateComplete(oldState?.current?.hasStateAnimations !== true);
      setIsCurrentStateReady(false);

      if (assetsInitted && incomingState.current) {
        if (!isInitial) {
          setIsLoadingReady(false);
        }
        setIsLoadingComplete(false);
        setShowLoadingState(true);
      }
    }
  }, [props.currentState, assetsInitted, isInitial]);

  React.useEffect(() => {
    if (assetsInitted && isLoadingReady) {
      loadBundle();
    }
  }, [assetsInitted, isLoadingReady]);

  React.useEffect(() => {
    setShowLoadingState(!isCurrentStateReady);
  }, [isCurrentStateReady]);

  const handleOutAnimationComplete = () => {
    setIsOldStateComplete(true);
  };

  const handleLoadingStateOutAnimationComplete = () => {
    setIsLoadingComplete(true);
  };

  const handleLoadingStateInAnimationComplete = () => {
    setIsLoadingReady(true);
  };

  const LoadingState = loadingState.current;
  const CurrentState = incomingState.current;
  const OldState = oldState.current;

  const showOldState = OldState && !isOldStateComplete && OldState.hasStateAnimations;
  const showCurrentState = CurrentState && isCurrentStateReady && !showOldState;
  const shouldShowLoadingState = showLoadingState || !isLoadingComplete;

  return (
    <Container>
      {showOldState && (
        <OldState
          key={OldState.name}
          size={size}
          animationState={'out'}
          onOutAnimationComplete={handleOutAnimationComplete}
        />
      )}
      {showCurrentState && <CurrentState key={CurrentState.name} size={size} animationState={'in'} />}
      {LoadingState && shouldShowLoadingState && (
        <LoadingState
          key="Loader"
          size={size}
          progress={loadProgress}
          isInitial={isInitial}
          animationState={isCurrentStateReady ? 'out' : 'in'}
          onInAnimationComplete={handleLoadingStateInAnimationComplete}
          onOutAnimationComplete={handleLoadingStateOutAnimationComplete}
        />
      )}
    </Container>
  );
};
