import { AssetsManifest } from 'pixi.js';
import { PluginListItem } from 'virtual:dill-pixel-plugins';
import { IPlugin } from '../plugins/Plugin';
import { DataSchema } from '../store';
import { ImportList } from '../utils';
import { AppConfig } from './types';

export type PluginOrAdapterConfig = string | [string, { autoLoad?: boolean; options?: any }];

export function generatePluginList(plugins: PluginListItem[]): ImportList<IPlugin> {
  return plugins.map((plugin) => ({
    id: plugin.id,
    path: plugin.path,
    module: plugin.plugin(),
  }));
}

export function defineConfig<D extends DataSchema = DataSchema>(config: Partial<AppConfig<D>>): AppConfig<D> {
  // Provide sensible defaults
  return {
    id: 'DillPixelApplication',
    showStats: false,
    showSceneDebugMenu: false,
    useHash: false,
    useSpine: false,
    useVoiceover: false,
    defaultSceneLoadMethod: 'immediate',
    data: {
      initial: {} as D,
      backupAll: false,
    },
    assets: {
      manifest: {} as unknown as string | AssetsManifest | Promise<AssetsManifest> | undefined,
      preload: {
        bundles: ['required'],
      },
      background: {
        bundles: [],
      },
    },
    plugins: [],
    scenes: [],
    ...config,
  };
}
