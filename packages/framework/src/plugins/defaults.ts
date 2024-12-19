import type { ImportList } from '../utils';
import { AssetsPlugin } from './AssetsPlugin';
import { KeyboardPlugin } from './KeyboardPlugin';
import type { IPlugin } from './Plugin';
import { PopupManagerPlugin } from './PopupManagerPlugin';
import { ResizerPlugin } from './ResizerPlugin';
import { SceneManagerPlugin } from './SceneManagerPlugin';
import { WebEventsPlugin } from './WebEventsPlugin';
import { ActionsPlugin } from './actions';
import { AudioManagerPlugin } from './audio';
import { FocusManagerPlugin } from './focus';
import { i18nPlugin } from './i18nPlugin';
import { InputPlugin } from './input';

export const defaultPlugins: ImportList<IPlugin> = [
  {
    id: 'webEvents',
    module: WebEventsPlugin,
    namedExport: 'WebEventsPlugin',
  },
  {
    id: 'resizer',
    module: ResizerPlugin,
    namedExport: 'ResizerPlugin',
  },
  {
    id: 'assets',
    module: AssetsPlugin,
    namedExport: 'AssetsPlugin',
  },
  {
    id: 'scenes',
    module: SceneManagerPlugin,
    namedExport: 'SceneManagerPlugin',
  },
  {
    id: 'actions',
    module: ActionsPlugin,
    namedExport: 'ActionsPlugin',
  },
  {
    id: 'input',
    module: InputPlugin,
    namedExport: 'InputPlugin',
  },
  {
    id: 'keyboard',
    module: KeyboardPlugin,
    namedExport: 'KeyboardPlugin',
  },
  {
    id: 'focus',
    module: FocusManagerPlugin,
    namedExport: 'FocusManagerPlugin',
  },
  {
    id: 'popups',
    module: PopupManagerPlugin,
    namedExport: 'PopupManagerPlugin',
  },
  {
    id: 'audio',
    module: AudioManagerPlugin,
    namedExport: 'AudioManagerPlugin',
  },
  {
    id: 'i18n',
    module: i18nPlugin,
    namedExport: 'i18nPlugin',
  },
  
] as const;
