import type { ImportList } from '../utils/types';
import { IPlugin } from './Plugin';

export const defaultPlugins: ImportList<IPlugin> = [
  {
    id: 'assets',
    module: () => import('./AssetsPlugin'),
    namedExport: 'AssetsPlugin',
  },
  {
    id: 'webEvents',
    module: () => import('./WebEventsPlugin'),
    namedExport: 'WebEventsPlugin',
  },
  {
    id: 'scenes',
    module: () => import('./SceneManagerPlugin'),
    namedExport: 'SceneManagerPlugin',
  },
  {
    id: 'input',
    module: () => import('./input/InputPlugin'),
    namedExport: 'InputPlugin',
  },
  {
    id: 'keyboard',
    module: () => import('./KeyboardPlugin'),
    namedExport: 'KeyboardPlugin',
  },
  {
    id: 'focus',
    module: () => import('./focus/FocusManagerPlugin'),
    namedExport: 'FocusManagerPlugin',
  },
  {
    id: 'popups',
    module: () => import('./popups/PopupManagerPlugin'),
    namedExport: 'PopupManagerPlugin',
  },
  {
    id: 'audio',
    module: () => import('./audio/AudioManagerPlugin'),
    namedExport: 'AudioManagerPlugin',
  },
  {
    id: 'i18n',
    module: () => import('./i18nPlugin'),
    namedExport: 'i18nPlugin',
  },
  {
    id: 'resizer',
    module: () => import('./ResizerPlugin'),
    namedExport: 'ResizerPlugin',
  },
] as const;
