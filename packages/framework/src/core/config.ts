import { AssetsManifest } from 'pixi.js';
import { IPlugin } from '../plugins/Plugin';
import { DataSchema, IStorageAdapter } from '../store';
import { ImportList, Logger } from '../utils';
import { AppConfig } from './types';
import {pluginsList} from 'virtual:dill-pixel-plugins';
import {storageAdaptersList} from 'virtual:dill-pixel-storage-adapters';

export type PluginOrAdapterConfig = string | [string, { autoLoad?: boolean; options?: any }];

export function generatePluginList<T extends IPlugin = IPlugin>(plugins: PluginOrAdapterConfig[]): ImportList<T> {
  console.log('plugins', plugins, 'pluginsList', pluginsList);
  return plugins.map((plugin) => {
    const p = pluginsList.find((p) => p.id === plugin || p.id === plugin[0]);
    if (!p) {
      Logger.warn(`Plugin ${plugin} not found`);
      return null;
    }
    const pluginAsArray = plugin as [string, { autoLoad?: boolean; options?: any }];
    return {
      id: p.id,
      path: p.path,
      module: p.module(plugin),
      options: pluginAsArray[1]?.options,
      autoLoad: pluginAsArray[1]?.autoLoad === false ? false : true,
    };
  }).filter(Boolean) as ImportList<T>;
}

export function generateAdapterList<T extends IStorageAdapter = IStorageAdapter>(adapters: PluginOrAdapterConfig[]): ImportList<T> {
  return adapters.map((adapter) => {
    const a = storageAdaptersList.find((a) => a.id === adapter || a.id === adapter[0]);
    if (!a) {
      Logger.warn(`Storage Adapter ${adapter} not found`);
      return null;
    }
    const adapterAsArray = adapter as [string, { autoLoad?: boolean; options?: any }];
    return {
      id: a.id,
      path: a.path,
      module: a.module(adapter),
      options: adapterAsArray[1]?.options,
      autoLoad: adapterAsArray[1]?.autoLoad === false ? false : true,
    };
  }).filter(Boolean) as ImportList<T>;
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
