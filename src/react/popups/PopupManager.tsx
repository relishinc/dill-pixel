import { Container } from '@pixi/react';
import React from 'react';
import { useHLF } from '../global';
import { Popup } from './Popup';

type PopupManagerProps = {
  popups: Popup[];
};

export const PopupManager = (props: PopupManagerProps) => {
  const [activePopupsList, removePopup, size] = useHLF((globalState) => [
    globalState.popups,
    globalState.removePopup,
    globalState.size,
  ]);

  const popups = React.useMemo(() => {
    return activePopupsList
      .map((p, idx) => {
        const PopupView = props.popups.find((popup) => popup.name === p.name);
        if (PopupView) {
          return (
            <PopupView
              key={p.id}
              id={p.id}
              size={size}
              animationState={p.visible ? 'in' : 'out'}
              onOutAnimationComplete={() => {
                removePopup(p.id);
              }}
            />
          );
        }
        return null;
      })
      .filter(Boolean);
  }, [activePopupsList]);

  return <Container>{popups}</Container>;
};
