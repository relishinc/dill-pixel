import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { ExamplePopup } from '@/popups/ExamplePopup';
import { SpringPopup } from '@/popups/SpringPopup.tsx';
import { PlatformerExample } from '@/state/PlatformerExample.tsx';
import { PopupExample } from '@/state/PopupExample.tsx';
import { SpriteExample } from '@/state/SpriteExample.tsx';
import { UIListExample } from '@/state/UIListExample.tsx';
import { Loader } from '@/ui/Loader';
import { Application } from 'html-living-framework/react';
export function App({ el }) {
    return (_jsx(_Fragment, { children: _jsx(Application, { el: el, defaultState: PopupExample, loadingState: Loader, states: [PlatformerExample, SpriteExample, PopupExample, UIListExample], popups: [ExamplePopup, SpringPopup] }) }));
}
//# sourceMappingURL=App.js.map