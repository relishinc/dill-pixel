import { ExamplePopup } from '@/popups/ExamplePopup';
import { SpringPopup } from '@/popups/SpringPopup';
import { PlatformerExample } from '@/state/PlatformerExample';
import { PopupExample } from '@/state/PopupExample';
import { SpriteExample } from '@/state/SpriteExample';
import { UIListExample } from '@/state/UIListExample';
import { Loader } from '@/ui/Loader';
import { Application } from 'dill-pixel/react';
import { Leva } from 'leva';
import * as React from 'react';
import { toHex } from '../../lib';
import { UIFlexContainerExample } from './state/UIFlexContainerExample';
import { COLOR_GREEN } from './utils/Constants';

export function App({ el }: { el: HTMLElement | Window }) {
  return (
    <>
      <Leva
        titleBar={{ drag: false, title: 'Controls', position: { x: -86, y: 0 } }}
        theme={{
          fonts: { mono: 'arboria', sans: 'arboria' },
          colors: { elevation1: toHex(COLOR_GREEN), highlight1: 'white', highlight2: 'white' },
          radii: { xs: '0', sm: '0', lg: '0' },
          sizes: { titleBarHeight: '43px' },
          shadows: { level1: 'none', level2: 'none' },
        }}
      />
      <Application
        el={el}
        defaultState={PopupExample}
        loadingState={Loader}
        states={[PlatformerExample, SpriteExample, PopupExample, UIListExample, UIFlexContainerExample]}
        popups={[ExamplePopup, SpringPopup]}
      />
    </>
  );
}
