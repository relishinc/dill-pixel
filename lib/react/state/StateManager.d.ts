import { LoadingState, State } from '../state';
type StateManagerProps = {
    currentState: State | undefined;
    states: State[];
    stateNames: string[];
    loadingState?: LoadingState;
};
export declare const StateManager: (props: StateManagerProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=StateManager.d.ts.map