import { Popup } from '../popups';
import { State } from '../state';
export type HLFGlobalState = {
    size: {
        width: number;
        height: number;
    };
    setSize: (el: HTMLElement | Window) => void;
    currentState: State | undefined;
    transitionTo: (state: State) => void;
    showPopup: (popup: string | Popup) => void;
    hidePopup: (id: string) => void;
    removePopup: (id: string) => void;
    removeAllPopups: (animate: boolean) => void;
    popups: {
        id: string;
        name: string;
        visible: boolean;
    }[];
};
export declare const useHLF: import("zustand").UseBoundStore<import("zustand").StoreApi<HLFGlobalState>>;
//# sourceMappingURL=useHLF.d.ts.map