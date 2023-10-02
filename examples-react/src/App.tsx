import { ExamplePopup } from '@/popups/ExamplePopup';
import { SpringPopup } from '@/popups/SpringPopup';
import { PlatformerExample } from '@/state/PlatformerExample';
import { PopupExample } from '@/state/PopupExample';
import { SpriteExample } from '@/state/SpriteExample';
import { UIListExample } from '@/state/UIListExample';
import { Loader } from '@/ui/Loader';
import { Application } from 'dill-pixel/react';
import * as React from 'react';

export function App({ el }: { el: HTMLElement | Window }) {
  return (
    <>
      <Application
        el={el}
        defaultState={PopupExample}
        loadingState={Loader}
        states={[PlatformerExample, SpriteExample, PopupExample, UIListExample]}
        popups={[ExamplePopup, SpringPopup]}
      />
    </>
  );
}
