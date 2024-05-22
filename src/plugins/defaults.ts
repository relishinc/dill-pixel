import type { ImportList } from '../utils/types';
import { IPlugin } from './Plugin';

export const defaultPlugins: ImportList<IPlugin> = [
  {
    id: 'assets',
    module: () => import('../plugins/AssetsPlugin'),
    namedExport: 'AssetsPlugin',
  },
  {
    id: 'input',
    module: () => import('../plugins/InputPlugin'),
    namedExport: 'InputPlugin',
  },
  {
    id: 'scenes',
    module: () => import('../plugins/SceneManagerPlugin'),
    namedExport: 'SceneManagerPlugin',
  },
  {
    id: 'webEvents',
    module: () => import('../plugins/WebEventsPlugin'),
    namedExport: 'WebEventsPlugin',
  },
  {
    id: 'keyboard',
    module: () => import('../plugins/KeyboardPlugin'),
    namedExport: 'KeyboardPlugin',
  },
  {
    id: 'focus',
    module: () => import('../plugins/focus/FocusManagerPlugin'),
    namedExport: 'FocusManagerPlugin',
  },
  {
    id: 'popups',
    module: () => import('../plugins/popups/PopupManagerPlugin'),
    namedExport: 'PopupManagerPlugin',
  },
  {
    id: 'audio',
    module: () => import('../plugins/audio/AudioManagerPlugin'),
    namedExport: 'AudioManagerPlugin',
  },
  {
    id: 'i18n',
    module: () => import('../plugins/i18nPlugin'),
    namedExport: 'i18nPlugin',
  },
  {
    id: 'resizer',
    module: () => import('../plugins/ResizerPlugin'),
    namedExport: 'ResizerPlugin',
  },
] as const;

export type DefaultPluginIds = (typeof defaultPlugins)[number]['id'];
export const allDefaults: DefaultPluginIds[] = defaultPlugins.map((p) => p.id);
