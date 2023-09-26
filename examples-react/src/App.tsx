import { ExamplePopup } from '@/popups/ExamplePopup';
import { SpringPopup } from '@/popups/SpringPopup.tsx';
import { PlatformerExample } from '@/state/PlatformerExample.tsx';
import { PopupExample } from '@/state/PopupExample.tsx';
import { SpriteExample } from '@/state/SpriteExample.tsx';
import { UIListExample } from '@/state/UIListExample.tsx';
import { Loader } from '@/ui/Loader';
import { Application } from 'html-living-framework/react';
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
