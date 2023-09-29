import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Container } from '@pixi/react';
import { Assets } from 'pixi.js';
import * as React from 'react';
import { useHLF } from '../global';
export const StateManager = (props) => {
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
    const oldState = React.useRef(undefined);
    const incomingState = React.useRef(props.currentState);
    const loadingState = React.useRef(props.loadingState);
    const stateNames = React.useRef(null);
    React.useEffect(() => {
        const initWithManifest = async () => {
            const manifest = {
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
    const onLoadProgress = React.useCallback((progress) => {
        setLoadProgress(progress);
    }, [setLoadProgress]);
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
    return (_jsxs(Container, { children: [showOldState && (_jsx(OldState, { size: size, animationState: 'out', onOutAnimationComplete: handleOutAnimationComplete }, OldState.name)), showCurrentState && _jsx(CurrentState, { size: size, animationState: 'in' }, CurrentState.name), LoadingState && shouldShowLoadingState && (_jsx(LoadingState, { size: size, progress: loadProgress, isInitial: isInitial, animationState: isCurrentStateReady ? 'out' : 'in', onInAnimationComplete: handleLoadingStateInAnimationComplete, onOutAnimationComplete: handleLoadingStateOutAnimationComplete }, "Loader"))] }));
};
//# sourceMappingURL=StateManager.js.map