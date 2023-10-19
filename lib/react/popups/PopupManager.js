import { jsx as _jsx } from "react/jsx-runtime";
import { Container } from '@pixi/react';
import React from 'react';
import { useHLF } from '../global';
export const PopupManager = (props) => {
    const [activePopupsList, removePopup, size] = useHLF((globalState) => [
        globalState.popups,
        globalState.removePopup,
        globalState.size,
    ]);
    const popups = React.useMemo(() => {
        return activePopupsList
            .map((p) => {
            const PopupView = props.popups.find((popup) => popup.name === p.name);
            if (PopupView) {
                return (_jsx(PopupView, { id: p.id, size: size, animationState: p.visible ? 'in' : 'out', onOutAnimationComplete: () => {
                        removePopup(p.id);
                    } }, p.id));
            }
            return null;
        })
            .filter(Boolean);
    }, [activePopupsList]);
    return _jsx(Container, { children: popups });
};
//# sourceMappingURL=PopupManager.js.map