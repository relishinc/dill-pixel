import { AST_NODE_TYPES, parse } from '@typescript-eslint/typescript-estree';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { mergeConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import topLevelAwait from 'vite-plugin-top-level-await';
import wasm from 'vite-plugin-wasm';

const env = process.env.NODE_ENV;
const cwd = process.cwd();

import { assetpackPlugin } from './assetpack.mjs';

/** PLUGINS */
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

function createEmptyPlugin({ virtualModuleId, moduleTemplate }) {
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
        return generateVirtualModule([], moduleTemplate);
      }
    },
  };
}

// Plugin discovery plugin
export function pluginListPlugin(isProject = true) {
  const func = isProject ? createDiscoveryPlugin : createEmptyPlugin;
  return func({
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
        module: ()=>import('${plugin.importPath}')
      }`,
    },
  });
}

// Storage adapter discovery plugin
export function storageAdapterListPlugin(isProject = true) {
  const func = isProject ? createDiscoveryPlugin : createEmptyPlugin;
  return func({
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
        module: import('${adapter.importPath}')
      }`,
    },
  });
}

// scene list plugin
async function findTypeScriptFiles(dir) {
  const files = [];

  async function scan(directory) {
    const entries = await fs.promises.readdir(directory, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        await scan(fullPath);
      } else if (entry.isFile() && /\.ts?$/.test(entry.name)) {
        files.push(fullPath);
      }
    }
  }

  await scan(dir);
  return files;
}

function findExportedConstants(ast) {
  const exports = {};

  function extractValue(node) {
    switch (node.type) {
      case AST_NODE_TYPES.Literal:
        return node.value;
      case AST_NODE_TYPES.ArrayExpression:
        return node.elements.map((element) => element && extractValue(element)).filter((value) => value !== undefined);
      case AST_NODE_TYPES.ObjectExpression: {
        const obj = {};
        for (const prop of node.properties) {
          if (prop.type === AST_NODE_TYPES.Property && prop.key.type === AST_NODE_TYPES.Identifier) {
            obj[prop.key.name] = extractValue(prop.value);
          }
        }
        return obj;
      }
      default:
        return undefined;
    }
  }

  for (const node of ast.body) {
    if (
      node.type === AST_NODE_TYPES.ExportNamedDeclaration &&
      node.declaration?.type === AST_NODE_TYPES.VariableDeclaration
    ) {
      for (const declarator of node.declaration.declarations) {
        if (declarator.id.type === AST_NODE_TYPES.Identifier && declarator.init) {
          exports[declarator.id.name] = extractValue(declarator.init);
        }
      }
    }
  }

  return exports;
}

export function sceneListPlugin(isProject = true) {
  function findDefaultExportedScene(ast) {
    let sceneClass = null;

    for (const node of ast.body) {
      if (node.type === AST_NODE_TYPES.ExportDefaultDeclaration) {
        if (node.declaration.type === AST_NODE_TYPES.ClassDeclaration) {
          sceneClass = node.declaration;
          break;
        }
      }
    }

    return sceneClass;
  }
  async function discoverScenes() {
    const scenesDir = path.resolve(process.cwd(), 'src/scenes');
    const scenes = [];

    const files = await findTypeScriptFiles(scenesDir);

    for (const file of files) {
      const content = await fs.promises.readFile(file, 'utf-8');
      const ast = parse(content, {
        jsx: false,
        loc: true,
        comment: false,
      });

      const sceneClass = findDefaultExportedScene(ast);
      if (!sceneClass) continue;

      const exports = findExportedConstants(ast);

      const relativePath = file.replace(process.cwd(), '').replace(/\\/g, '/').split('/src')[1];
      // remove /src
      const importPath = `@${relativePath}`;
      const id = exports.id || sceneClass.id?.name || path.basename(file, '.ts');

      scenes.push({
        id,
        module:
          exports.dynamic === false
            ? importPath
            : {
                toString: () => `() => import('${importPath}')`,
                isFunction: true, // Add a flag to identify dynamic imports
              },
        active: exports.active === false ? false : true,
        debugLabel: exports.debug?.label || id,
        debugGroup: exports.debug?.group || undefined,
        debugOrder: exports.debug?.order >= 0 ? exports.debug.order : Number.MAX_SAFE_INTEGER,
        assets: exports.assets ?? undefined,
        plugins: exports.plugins ?? undefined,
        autoUnloadAssets: exports.assets?.autoUnload ?? false,
      });
    }
    return scenes;
  }

  function extractClassName(scene) {
    const basename = path.basename(scene.module);
    // remove .ts
    return basename.replace('.ts', '');
  }

  function generateSceneListModule(scenes) {
    // extract non function scenes from the list
    const nonFunctionScenes = scenes.filter((scene) => !scene.module.isFunction);

    const imports = nonFunctionScenes.map((scene) => `import ${extractClassName(scene)} from '${scene.module}';`);

    const result = `
    ${imports.join('\n')}
    export const sceneList = [
      ${scenes
        .map(
          (scene) => `{
        id: '${scene.id}',
        active: ${scene.active},
        module: ${scene.module.isFunction ? scene.module.toString() : extractClassName(scene)},
        debugLabel: ${JSON.stringify(scene.debugLabel)},
        debugGroup: ${JSON.stringify(scene.debugGroup)},
        debugOrder: ${scene.debugOrder},
        assets: ${JSON.stringify(scene.assets)},
        plugins: ${JSON.stringify(scene.plugins)},
        autoUnloadAssets: ${scene.autoUnloadAssets}
      }`,
        )
        .join(',\n')}
    ];
  `;
    return result;
  }

  const virtualModuleId = 'virtual:dill-pixel-scenes';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  return {
    name: 'vite-plugin-scenes',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    async load(id) {
      if (id === resolvedVirtualModuleId) {
        let scenes = [];
        if (isProject) {
          scenes = await discoverScenes();
        }
        return generateSceneListModule(scenes);
      }
    },
  };
}
function createDillPixelGlobalsPlugin() {
  const entryId = 'dill-pixel-globals';
  const resolvedEntryId = '\0' + entryId;

  return {
    name: 'vite-virtual-entry',
    enforce: 'pre',
    resolveId(id) {
      if (id === entryId) {
        return resolvedEntryId;
      }
    },
    load(id) {
      if (id === resolvedEntryId) {
        return `
          import {sceneList} from 'virtual:dill-pixel-scenes';
          import {pluginsList} from 'virtual:dill-pixel-plugins';
          import {storageAdaptersList} from 'virtual:dill-pixel-storage-adapters';

          globalThis.__DILL_PIXEL = globalThis.__DILL_PIXEL || {};
          globalThis.__DILL_PIXEL.sceneList = sceneList;
          globalThis.__DILL_PIXEL.pluginsList = pluginsList;
          globalThis.__DILL_PIXEL.storageAdaptersList = storageAdaptersList;

          globalThis.getDillPixel = function(key) {
            globalThis.__DILL_PIXEL = globalThis.__DILL_PIXEL || {};
            return key ? globalThis.__DILL_PIXEL[key] : globalThis.__DILL_PIXEL;
          };
        `;
      }
    },
    config(config) {
      // Add our virtual entry to the input array
      const input = config.build?.rollupOptions?.input || 'index.html';
      const inputs = Array.isArray(input) ? input : [input];

      return {
        build: {
          rollupOptions: {
            input: [entryId, ...inputs],
          },
        },
      };
    },
  };
}
/** END PLUGINS */

/** CONFIG */
/**
 * @type {import('vite').UserConfig}
 */
const defaultConfig = {
  cacheDir: '.cache',
  logLevel: 'info',
  publicDir: './public',
  base: env === 'development' ? '/' : './',
  server: {
    port: 3000,
    host: true,
    open: true,
  },
  preview: {
    host: true,
    port: 8080,
  },
  plugins: [
    wasm(),
    topLevelAwait(),
    createHtmlPlugin(),
    createDillPixelGlobalsPlugin(),
    viteStaticCopy({
      targets: [
        {
          src: './node_modules/dill-pixel/src/plugins/captions/font/*.*',
          dest: './dill-pixel/font',
        },
      ],
    }),
    storageAdapterListPlugin(),
    pluginListPlugin(),
    sceneListPlugin(),
    assetpackPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(cwd, './src'),
    },
  },
  define: {
    __DILL_PIXEL_APP_NAME: JSON.stringify(process.env.npm_package_name),
    __DILL_PIXEL_APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
};

// config without assetpack plugin
const noAssetpackConfig = { ...defaultConfig };
// remove assetpack plugin
noAssetpackConfig.plugins = noAssetpackConfig.plugins.filter((plugin) => plugin.name !== 'vite-plugin-assetpack');

function extendConfig(userConfig = {}) {
  return mergeConfig(defaultConfig, userConfig);
}

export { extendConfig, noAssetpackConfig };

export default defaultConfig;
