import fs from 'node:fs';
import path from 'node:path';

function findRegistryAndLocal({ packagePrefix, localPaths, idPrefix = '', importPathPrefix = '@' }) {
  // Find npm packages
  const packageJsonPath = path.resolve(process.cwd(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

  const allDependencies = {
    ...(packageJson.dependencies || {}),
    ...(packageJson.devDependencies || {}),
  };

  const npmPackages = Object.keys(allDependencies)
    .filter((dep) => dep.startsWith(packagePrefix))
    .map((packageName) => ({
      name: packageName,
      id: packageName.replace(idPrefix, ''),
      importPath: packageName,
      isLocal: false,
    }));

  // Find local implementations
  let localImplementations = [];

  for (const localPath of localPaths) {
    const localDir = path.resolve(process.cwd(), localPath);

    if (fs.existsSync(localDir)) {
      const implementations = fs
        .readdirSync(localDir)
        .filter((file) => {
          const dir = path.join(localDir, file);
          const indexPath = path.join(dir, 'index.ts');
          return fs.statSync(dir).isDirectory() && fs.existsSync(indexPath);
        })
        .map((dir) => ({
          name: dir,
          id: dir,
          importPath: `${importPathPrefix}/${localPath.replace('./src/', '')}/${dir}/index`,
          isLocal: true,
        }));

      localImplementations = [...localImplementations, ...implementations];
    }
  }

  return [...npmPackages, ...localImplementations];
}

function generateVirtualModule(items, moduleTemplate) {
  return `
    export const ${moduleTemplate.exportName} = [
      ${items.map((item) => moduleTemplate.itemTemplate(item)).join(',\n')}
    ];
  `;
}

function createDiscoveryPlugin({ virtualModuleId, packagePrefix, localPaths, idPrefix, moduleTemplate }) {
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  return {
    name: `vite-discovery-plugin-${virtualModuleId}`,
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    async load(id) {
      if (id === resolvedVirtualModuleId) {
        const items = findRegistryAndLocal({
          packagePrefix,
          localPaths,
          idPrefix,
        });
        return generateVirtualModule(items, moduleTemplate);
      }
    },
  };
}

// Plugin discovery plugin
export function pluginListPlugin() {
  return createDiscoveryPlugin({
    virtualModuleId: 'virtual:dill-pixel-plugins',
    packagePrefix: '@dill-pixel/plugin-',
    localPaths: ['./src/plugins'],
    idPrefix: '@dill-pixel/plugin-',
    moduleTemplate: {
      exportName: 'pluginsList',
      itemTemplate: (plugin) => `{
        name: '${plugin.name}',
        id: '${plugin.id}',
        isLocal: ${plugin.isLocal},
        module: (enabledPlugins) => enabledPlugins === 'all' || enabledPlugins.includes('${plugin.id}') ? import('${plugin.importPath}') : null
      }`,
    },
  });
}

// Storage adapter discovery plugin
export function storageAdapterListPlugin() {
  return createDiscoveryPlugin({
    virtualModuleId: 'virtual:dill-pixel-storage-adapters',
    packagePrefix: '@dill-pixel/storage-adapter-',
    localPaths: ['./src/storage-adapters', './src/adapters'],
    idPrefix: '@dill-pixel/storage-adapter-',
    moduleTemplate: {
      exportName: 'storageAdaptersList',
      itemTemplate: (adapter) => `{
        name: '${adapter.name}',
        id: '${adapter.id}',
        isLocal: ${adapter.isLocal},
        module: (enabledAdapters) => enabledAdapters === 'all' || enabledAdapters.includes('${adapter.id}') ? import('${adapter.importPath}') : null
      }`,
    },
  });
}
