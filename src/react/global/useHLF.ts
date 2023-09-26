import { create } from 'zustand';
import { Popup } from '../popups';
import { State } from '../state';

export type HLFGlobalState = {
  size: { width: number; height: number };
  setSize: (el: HTMLElement | Window) => void;
  currentState: State | undefined;
  transitionTo: (state: State) => void;
  //popup management
  showPopup: (popup: string | Popup) => void;
  hidePopup: (id: string) => void;
  removePopup: (id: string) => void;
  removeAllPopups: (animate: boolean) => void;
  popups: { id: string; name: string; visible: boolean }[];
};

export const useHLF = create<HLFGlobalState>((set, get) => ({
  size: { width: 0, height: 0 },
  setSize: (el) => {
    let newSize = { ...get().size };
    if (el instanceof HTMLElement) {
      newSize = { width: el.getBoundingClientRect().width, height: el.getBoundingClientRect().height };
    } else if (el instanceof Window) {
      newSize = { width: el.innerWidth, height: el.innerHeight };
    }
    set({ size: newSize });
  },
  currentState: undefined,
  transitionTo: (state) => set({ currentState: state }),
  showPopup: (popup) => {
    const popups = [...get().popups];
    if (typeof popup === 'string') {
      popups.push({ name: popup, visible: true, id: `${popup}-${popups.length}` });
    } else {
      popups.push({ name: popup.name, visible: true, id: `${popup.name}-${popups.length}` });
    }
    set({ popups });
  },
  hidePopup: (id) => {
    console.log('hide popup', id);
    const popups = [...get().popups];
    const index = popups.findIndex((p) => p.id === id);
    if (index >= 0) {
      popups[index].visible = false;
    }
    set({ popups });
  },
  removePopup: (id) => {
    const popups = [...get().popups];
    const index = popups.findIndex((p) => p.id === id);
    if (index >= 0) {
      popups.splice(index, 1);
    }
    set({ popups });
  },
  removeAllPopups: (animate) => {
    let popups = [...get().popups];
    if (animate) {
      popups.forEach((p) => (p.visible = false));
    } else {
      popups = [];
    }
    set({ popups });
  },
  popups: [],
}));
