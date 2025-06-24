import { IPlugin, PluginListItem } from '../plugins/Plugin';
import { IStorageAdapter, StorageAdapterListItem } from '../store';
import { ImportList, Logger } from '../utils';
import { AppConfig } from './types';

export type PluginOrAdapterConfig = string | [string, { autoLoad?: boolean; options?: any }];

export async function generatePluginList<T extends IPlugin = IPlugin>(
  plugins: PluginOrAdapterConfig[],
): Promise<ImportList<T>> {
  const pluginsList: PluginListItem[] = DillPixel.get('pluginsList') || [];

  return plugins
    .map((plugin) => {
      const p = pluginsList.find((p) => p.id === plugin || p.id === plugin[0]);
      if (!p) {
        Logger.warn(`Plugin ${plugin} not found`);
        return null;
      }
      const pluginAsArray = plugin as [string, { autoLoad?: boolean; options?: any }];
      return {
        id: p.id,
        path: p.path,
        module: p.module,
        options: pluginAsArray[1]?.options,
        autoLoad: pluginAsArray[1]?.autoLoad === false ? false : true,
      };
    })
    .filter(Boolean) as ImportList<T>;
}

export async function generateAdapterList<T extends IStorageAdapter = IStorageAdapter>(
  adapters: PluginOrAdapterConfig[],
): Promise<ImportList<T>> {
  const storageAdaptersList: StorageAdapterListItem[] = DillPixel.get('storageAdaptersList') || [];

  return adapters
    .map((adapter) => {
      const a = storageAdaptersList.find((a) => a.id === adapter || a.id === adapter[0]);
      if (!a) {
        Logger.warn(`Storage Adapter ${adapter} not found`);
        return null;
      }
      const adapterAsArray = adapter as [string, { autoLoad?: boolean; options?: any }];
      return {
        id: a.id,
        path: a.path,
        module: a.module,
        options: adapterAsArray[1]?.options,
        autoLoad: adapterAsArray[1]?.autoLoad === false ? false : true,
      };
    })
    .filter(Boolean) as ImportList<T>;
}

export function defineConfig(config: Partial<AppConfig>) {
  return config;
}
