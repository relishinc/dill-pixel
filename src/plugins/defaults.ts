import type { ImportList } from '../utils';
import type { IPlugin } from './Plugin';
import { AssetsPlugin } from './AssetsPlugin';
import { WebEventsPlugin } from './WebEventsPlugin';
import { SceneManagerPlugin } from './SceneManagerPlugin';
import { InputPlugin } from './input';
import { KeyboardPlugin } from './KeyboardPlugin';
import { FocusManagerPlugin } from './focus';
import { PopupManagerPlugin } from './PopupManagerPlugin';
import { AudioManagerPlugin } from './audio';
import { i18nPlugin } from './i18nPlugin';
import { ResizerPlugin } from './ResizerPlugin';

export const defaultPlugins: ImportList<IPlugin> = [
  {
    id: 'assets',
    // module: () => import('./AssetsPlugin'),
    module: AssetsPlugin,
    namedExport: 'AssetsPlugin',
  },
  {
    id: 'webEvents',
    module: WebEventsPlugin,
    namedExport: 'WebEventsPlugin',
  },
  {
    id: 'scenes',
    module: SceneManagerPlugin,
    namedExport: 'SceneManagerPlugin',
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
  {
    id: 'resizer',
    module: ResizerPlugin,
    namedExport: 'ResizerPlugin',
  },
] as const;
