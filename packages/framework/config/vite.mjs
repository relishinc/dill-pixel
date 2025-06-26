import { AST_NODE_TYPES, parse } from '@typescript-eslint/typescript-estree';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { createLogger, mergeConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import { VitePWA } from 'vite-plugin-pwa';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import topLevelAwait from 'vite-plugin-top-level-await';
import wasm from 'vite-plugin-wasm';

const env = process.env.NODE_ENV;
const cwd = process.cwd();

const logger = createLogger('dill-pixel-config');

import { assetpackPlugin } from './assetpack.mjs';

const DTS_FILE_NAME = 'dill-pixel-app.d.ts';
const ASSET_DTS_FILE_NAME = 'dill-pixel-assets.d.ts';

// write a debounce function
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

// Function to generate TypeScript types from the manifest
async function generateAssetTypes(manifest) {
  // Extract all assets from bundles
  const assetsByType = {
    textures: new Set(),
    spritesheets: new Set(),
    tpsFrames: new Set(),
    fonts: new Set(),
    bitmapFonts: new Set(),
    fontFamilies: new Set(),
    bitmapFontFamilies: new Set(),
    audio: new Set(),
    json: new Set(),
    spine: new Set(),
    rive: new Set(),
  };

  const bundles = manifest.bundles || [];
  const bundleNames = new Set();

  // Process each bundle
  for (const bundle of bundles) {
    bundleNames.add(bundle.name);

    // Process each asset in the bundle
    for (const asset of bundle.assets) {
      const aliases = asset.alias || [];
      const srcs = Array.isArray(asset.src) ? asset.src : [asset.src];
      const firstSrc = srcs[0];
      const ext = path.extname(firstSrc).toLowerCase();

      // Add to appropriate category based on extension and data tags
      if (asset.data?.tags?.tps || (ext === '.json' && firstSrc.includes('sheet'))) {
        aliases.forEach((alias) => assetsByType.spritesheets.add(alias));

        // Extract frame names from TPS JSON files
        if (asset.data?.tags?.tps) {
          try {
            // Find the first .json file in the src array
            const jsonSrc = srcs.find((src) => src.endsWith('.json'));
            if (jsonSrc) {
              // Construct the full path to the JSON file
              const jsonPath = path.join(process.cwd(), 'public', 'assets', jsonSrc);

              // Read and parse the JSON file
              const jsonContent = await fs.promises.readFile(jsonPath, 'utf8');
              const tpsData = JSON.parse(jsonContent);

              // Extract frame names from the "frames" object
              if (tpsData.frames) {
                Object.keys(tpsData.frames).forEach((frameName) => {
                  assetsByType.tpsFrames.add(frameName); // Add to separate category
                });
              }
            }
          } catch (error) {
            logger.warn(`Failed to load TPS frames from ${firstSrc}:`, error.message);
          }
        }
      } else if (ext === '.json' && !firstSrc.includes('atlas')) {
        aliases.forEach((alias) => assetsByType.json.add(alias));
      } else if (['.png', '.webp', '.jpg', '.jpeg', '.svg'].includes(ext)) {
        aliases.forEach((alias) => assetsByType.textures.add(alias));
      } else if (['.mp3', '.ogg', '.wav'].includes(ext)) {
        aliases.forEach((alias) => assetsByType.audio.add(alias));
      } else if (['.ttf', '.woff', '.woff2'].includes(ext) || asset.data?.tags?.wf) {
        aliases.forEach((alias) => assetsByType.fonts.add(alias));
        if (asset.data?.family) {
          assetsByType.fontFamilies.add(asset.data.family); // Add family name
        }
      } else if (['.fnt'].includes(ext)) {
        aliases.forEach((alias) => {
          assetsByType.bitmapFonts.add(alias);
          assetsByType.bitmapFontFamilies.add(alias); // Add family name
        });
      } else if (['.atlas', '.skel', '.json'].some((e) => firstSrc.includes(e)) && firstSrc.includes('spine')) {
        aliases.forEach((alias) => assetsByType.spine.add(alias));
      } else if (ext === '.riv') {
        aliases.forEach((alias) => assetsByType.rive.add(alias));
      }
    }
  }

  // Convert Sets to sorted arrays for consistent output
  const types = Object.fromEntries(Object.entries(assetsByType).map(([key, value]) => [key, [...value].sort()]));

  return `// This file is auto-generated. Do not edit.
import type { ResolvedAsset, Texture, Spritesheet } from 'pixi.js';

/**
 * Available bundle names in the asset manifest
 * @example
 * const bundle: AssetBundles = 'game';
 */
export type AssetBundles = ${[...bundleNames].length ? `\n  | '${[...bundleNames].sort().join("'\n  | '")}'` : 'never'};

/**
 * Available texture names in the asset manifest
 * @example
 * const texture: AssetTextures = 'game/wordmark';
 */
export type AssetTextures = ${types.textures.length ? `\n  | '${types.textures.join("'\n  | '")}'` : 'never'};

/**
 * Available spritesheet names in the asset manifest
 * @example
 * const spritesheet: AssetSpritesheets = 'game/sheet';
 */
export type AssetSpritesheets = ${types.spritesheets.length ? `\n  | '${types.spritesheets.join("'\n  | '")}'` : 'never'};

/**
 * Available TPS frame names from spritesheets
 * @example
 * const frame: AssetTPSFrames = 'btn/blue';
 */
export type AssetTPSFrames = ${types.tpsFrames.length ? `\n  | '${types.tpsFrames.join("'\n  | '")}'` : 'never'};

/**
 * Available font names in the asset manifest
 * @example
 * const font: AssetFonts = 'KumbhSans-Regular';
 */
export type AssetFonts = ${types.fonts.length ? `\n  | '${types.fonts.join("'\n  | '")}'` : 'never'};

/**
 * Available font names in the asset manifest
 * @example
 * const font: AssetFonts = 'KumbhSans-Regular';
 */
export type AssetBitmapFonts = ${types.bitmapFonts.length ? `\n  | '${types.bitmapFonts.join("'\n  | '")}'` : 'never'};

/**
 * Available audio names in the asset manifest
 * @example
 * const audio: AssetAudio = 'click';
 */
export type AssetAudio = ${types.audio.length ? `\n  | '${types.audio.join("'\n  | '")}'` : 'never'};

/**
 * Available JSON file names in the asset manifest
 * @example
 * const json: AssetJson = 'locales/en';
 */
export type AssetJson = ${types.json.length ? `\n  | '${types.json.join("'\n  | '")}'` : 'never'};

/**
 * Available Spine animation names in the asset manifest
 * @example
 * const spine: AssetSpine = 'spine/hero';
 */
export type AssetSpine = ${types.spine.length ? `\n  | '${types.spine.join("'\n  | '")}'` : 'never'};

/**
 * Available Rive animation names in the asset manifest
 * @example
 * const rive: AssetRive = 'static/marty';
 */
export type AssetRive = ${types.rive.length ? `\n  | '${types.rive.join("'\n  | '")}'` : 'never'};

/**
 * Available font family names
 * @example
 * const fontFamily: AssetFontFamilies = 'KumbhSans';
 */
export type AssetFontFamilies = ${types.fontFamilies.length ? `\n  | '${types.fontFamilies.join("'\n  | '")}'` : 'never'};

/**
 * Available font family names
 * @example
 * const fontFamily: AssetFontFamilies = 'KumbhSans';
 */
export type AssetBitmapFontFamilies = ${types.bitmapFontFamilies.length ? `\n  | '${types.bitmapFontFamilies.join("'\n  | '")}'` : 'never'};

/**
 * Union type of all asset names
 * @example
 * const asset: AssetAlias = 'game/wordmark';
 */
export type AssetAlias = 
  | AssetTextures 
  | AssetSpritesheets 
  | AssetTPSFrames
  | AssetFonts 
  | AssetBitmapFonts
  | AssetAudio 
  | AssetJson
  | AssetSpine
  | AssetRive;

/**
 * Type-safe manifest structure
 */
export interface AssetManifest {
  bundles: {
    [K in AssetBundles]: {
      name: K;
      assets: ResolvedAsset[];
    }
  };
}

/**
 * Type-safe asset types after loading
 */
export interface AssetTypes {
  textures: Record<AssetTextures, Texture>;
  spritesheets: Record<AssetSpritesheets, Spritesheet>;
  tpsFrames: Record<AssetTPSFrames, Texture>;
  fonts: Record<AssetFonts, any>;
  audio: Record<AssetAudio, HTMLAudioElement>;
  json: Record<AssetJson, any>;
  spine: Record<AssetSpine, any>;
  rive: Record<AssetRive, any>;
  fontFamilies: Record<AssetFontFamilies, any>;
  bitmapFonts: Record<AssetBitmapFonts, any>;
  bitmapFontFamilies: Record<AssetBitmapFontFamilies, any>;
}

/**
 * Helper type to get the asset type for a given alias
 * @example
 * type MyTextureType = AssetTypeOf<'game/wordmark'>; // Texture
 */
export type AssetTypeOf<T extends AssetAlias> = 
  T extends AssetTextures ? Texture :
  T extends AssetSpritesheets ? Spritesheet :
  T extends AssetTPSFrames ? Texture :
  T extends AssetFonts ? any :
  T extends AssetBitmapFonts ? any :
  T extends AssetAudio ? HTMLAudioElement :
  T extends AssetJson ? any :
  T extends AssetSpine ? any :
  T extends AssetRive ? any :
  T extends AssetFontFamilies ? any :
  T extends AssetBitmapFontFamilies ? any :
  never;
  

/**
 * Get the bundle name for a given asset
 * @example
 * type MyBundle = AssetBundleOf<'game/wordmark'>; // 'game'
 */
export type AssetBundleOf<T extends AssetAlias> = Extract<AssetBundles, T extends \`\${infer B}/\${string}\` ? B : never>;

/**
 * Add type overrides to the framework
 */
declare module 'dill-pixel' {
  interface AssetTypeOverrides {
    Texture: AssetTextures;
    TPSFrames: AssetTPSFrames; 
    SpriteSheet: AssetSpritesheets;
    SpineData: AssetSpine;
    Audio: AssetAudio;
    FontFamily: AssetFontFamilies;
    BitmapFontFamily: AssetBitmapFontFamilies;
    Bundles: AssetBundles;
  }
}
`;
}

// Function to write types file
async function writeAssetTypes(manifest, outputDir) {
  const types = await generateAssetTypes(manifest);
  // Change output path to ./src/types/
  const srcTypesDir = path.join(process.cwd(), 'src', 'types');

  try {
    // Ensure the directory exists
    await fs.promises.mkdir(srcTypesDir, { recursive: true });
    const typesPath = path.join(srcTypesDir, ASSET_DTS_FILE_NAME);
    await fs.promises.writeFile(typesPath, types, 'utf8');
    logger.info(`Dill Pixel asset types plugin:: Generated types at ${typesPath}`);
  } catch (error) {
    logger.error('Dill Pixel asset types plugin:: Error writing types file:', error);
    // Fallback to original location if src folder doesn't exist
    const typesPath = path.join(outputDir, ASSET_DTS_FILE_NAME);
    await fs.promises.writeFile(typesPath, types, 'utf8');
    logger.info(`Dill Pixel asset types plugin:: Generated types at fallback location ${typesPath}`);
  }
}

// Asset types generation plugin
export function assetTypesPlugin(manifestUrl = 'assets.json') {
  let viteServer;
  let manifestWatcher;
  let initialBuild = false;

  async function watchManifest() {
    try {
      const manifestPath = path.join(process.cwd(), 'public', 'assets', manifestUrl);
      const manifest = JSON.parse(await fs.promises.readFile(manifestPath, 'utf8'));
      await writeAssetTypes(manifest, path.dirname(manifestPath));
      logger.info('Dill Pixel asset types plugin:: manifest changed, reloading browser...');
      viteServer?.ws?.send({ type: 'full-reload' });
    } catch (error) {
      logger.error('Dill Pixel asset types plugin:: Error handling manifest change:', error);
    }
  }

  const debouncedHandleManifestChange = debounce(watchManifest, 100);

  return {
    name: 'vite-plugin-asset-types',
    async buildStart() {
      initialBuild = true;
      // Try to generate types on build start if manifest exists
      try {
        const manifestPath = path.join(process.cwd(), 'public', 'assets', manifestUrl);
        if (fs.existsSync(manifestPath)) {
          const manifest = JSON.parse(await fs.promises.readFile(manifestPath, 'utf8'));
          await writeAssetTypes(manifest, path.dirname(manifestPath));
        }
      } catch (error) {
        // Ignore errors on build start, manifest might not exist yet
      }
    },
    configureServer(server) {
      viteServer = server;

      // Watch for manifest changes in development
      const manifestPath = path.join(process.cwd(), 'public', 'assets', manifestUrl);
      if (fs.existsSync(manifestPath)) {
        logger.info(`Dill Pixel asset types plugin:: watching manifest at ${manifestPath}`);
        manifestWatcher = fs.watch(manifestPath, async (eventType) => {
          if (initialBuild && eventType === 'change') {
            await debouncedHandleManifestChange();
          }
        });
      }
    },
    async buildEnd() {
      manifestWatcher?.close();

      // Generate types in build mode as well
      try {
        const manifestPath = path.join(process.cwd(), 'public', 'assets', manifestUrl);
        if (fs.existsSync(manifestPath)) {
          const manifest = JSON.parse(await fs.promises.readFile(manifestPath, 'utf8'));
          await writeAssetTypes(manifest, path.dirname(manifestPath));
        }
      } catch (error) {
        logger.error('Dill Pixel asset types plugin:: Error generating types during build:', error);
      }
    },
  };
}

function dillPixelConfigPlugin(isProject = true) {
  const virtualModuleId = 'virtual:dill-pixel-config';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  async function generateTypes() {
    if (!isProject) return 'export {}';

    const configPath = path.resolve(cwd, 'dill-pixel.config.ts');

    let ast;
    try {
      const content = await fs.promises.readFile(configPath, 'utf-8');
      if (!content.trim()) {
        // This can happen during file saves, where the file is temporarily empty.
        return '/* dill-pixel.config.ts is empty, skipping augmentation. */';
      }
      ast = parse(content, { jsx: false });
    } catch (e) {
      if (e.code === 'ENOENT') {
        // This can happen during file saves that do a delete/recreate.
        return '/* dill-pixel.config.ts not found, skipping augmentation. */';
      }
      console.error('[dill-pixel] Error parsing dill-pixel.config.ts:', e.message);
      return '/* Error parsing dill-pixel.config.ts, skipping augmentation. See console for details. */';
    }

    let appClassName = 'Application';
    let appImportPath = 'dill-pixel';
    let dataTypeName = 'Record<string, any>';
    let dataSchemaName = '';
    let hasActions = false;
    let hasContexts = false;

    let configObject;

    for (const node of ast.body) {
      if (
        node.type === AST_NODE_TYPES.ExportNamedDeclaration &&
        node.declaration?.type === AST_NODE_TYPES.VariableDeclaration
      ) {
        // Find data schema
        const dataDecl = node.declaration.declarations.find(
          (d) => d.init?.type === AST_NODE_TYPES.CallExpression && d.init.callee.name === 'defineData',
        );
        if (dataDecl && dataDecl.id.type === AST_NODE_TYPES.Identifier) {
          dataSchemaName = dataDecl.id.name;
          dataTypeName = `typeof ${dataSchemaName}`;
        }

        // Find actions
        if (node.declaration.declarations.some((d) => d.id.name === 'actions')) {
          hasActions = true;
        }

        // Find contexts
        if (node.declaration.declarations.some((d) => d.id.name === 'contexts')) {
          hasContexts = true;
        }

        // Find defineConfig to get application class
        const configDecl = node.declaration.declarations.find(
          (d) => d.init?.type === AST_NODE_TYPES.CallExpression && d.init.callee.name === 'defineConfig',
        );
        if (configDecl?.init.type === AST_NODE_TYPES.CallExpression) {
          configObject = configDecl.init.arguments[0];
        }
      } else if (
        node.type === AST_NODE_TYPES.ExportDefaultDeclaration &&
        node.declaration.type === AST_NODE_TYPES.CallExpression &&
        node.declaration.callee.name === 'defineConfig'
      ) {
        configObject = node.declaration.arguments[0];
      }
    }

    if (configObject?.type === AST_NODE_TYPES.ObjectExpression) {
      const appProperty = configObject.properties.find(
        (p) =>
          p.type === AST_NODE_TYPES.Property &&
          p.key.name === 'application' &&
          p.value.type === AST_NODE_TYPES.Identifier,
      );

      if (appProperty) {
        const importedAppName = appProperty.value.name;
        const importDecl = ast.body.find(
          (n) =>
            n.type === AST_NODE_TYPES.ImportDeclaration && n.specifiers.some((s) => s.local.name === importedAppName),
        );
        if (importDecl) {
          appClassName = importedAppName;
          appImportPath = importDecl.source.value;
        }
      }
    }

    // Discover scenes, plugins, and storage adapters
    const scenes = await discoverScenes();
    const plugins = findRegistryAndLocal({
      packagePrefix: '@dill-pixel/plugin-',
      localPaths: ['./src/plugins'],
      idPrefix: '@dill-pixel/plugin-',
    });
    const storageAdapters = findRegistryAndLocal({
      packagePrefix: '@dill-pixel/storage-adapter-',
      localPaths: ['./src/storage-adapters', './src/adapters'],
      idPrefix: '@dill-pixel/storage-adapter-',
    });

    // Generate union types for IDs
    const sceneIds = scenes.map((s) => s.id);
    const pluginIds = plugins.map((p) => p.id);
    const storageAdapterIds = storageAdapters.map((a) => a.id);

    const sceneIdType = sceneIds.length > 0 ? `\n  | '${sceneIds.join("'\n  | '")}'` : 'string';
    const pluginIdType = pluginIds.length > 0 ? `\n  | '${pluginIds.join("'\n  | '")}'` : 'string';
    const storageAdapterIdType =
      storageAdapterIds.length > 0 ? `\n  | '${storageAdapterIds.join("'\n  | '")}'` : 'string';

    const configDir = path.dirname(configPath);
    const dtsDir = path.resolve(configDir, 'src/types');

    let relativeAppPath = appImportPath;
    if (appImportPath.startsWith('.')) {
      relativeAppPath = path.relative(dtsDir, path.resolve(configDir, appImportPath)).replace(/\\/g, '/');
      if (relativeAppPath.endsWith('.ts')) {
        relativeAppPath = relativeAppPath.slice(0, -3);
      }
    }

    const relativeConfigPath = path.relative(dtsDir, configPath).replace(/\\/g, '/').replace(/\.ts$/, '');

    const imports = [];
    if (appClassName === 'Application') {
      imports.push(`import type { Application } from 'dill-pixel';`);
    }
    if (fs.existsSync(configPath)) {
      const configParts = [];
      if (dataSchemaName) {
        configParts.push(dataSchemaName);
      }
      if (hasActions) {
        configParts.push('actions');
      }
      if (hasContexts) {
        configParts.push('contexts');
      }
      if (configParts.length > 0) {
        imports.push(`import type { ${configParts.join(', ')} } from '${relativeConfigPath}';`);
      }
    }
    if (appClassName !== 'Application') {
      imports.push(`import type { ${appClassName} } from '${relativeAppPath}';`);
    }

    return `
// This file is auto-generated by dill-pixel. Do not edit.
${imports.join('\n')}
// Data
type AppData = ${dataTypeName};

// Action Contexts
${hasContexts ? 'type AppContexts = (typeof contexts)[number];' : 'type AppContexts = string;'}

// Actions
${hasActions ? 'type AppActionMap = typeof actions;' : 'type AppActionMap = Record<string, any>;'}
${hasActions ? 'type AppActions = keyof AppActionMap;' : 'type AppActions = string;'}

// Scenes
type AppScenes = ${sceneIdType};

// Plugins
type AppPlugins = ${pluginIdType};

// Storage adapters
type AppStorageAdapters = ${storageAdapterIdType};

/**
 * Add type overrides to the framework
 */
declare module 'dill-pixel' {
  interface AppTypeOverrides {
    App: ${appClassName};
    Data: AppData;
    Contexts: AppContexts;
    Actions: AppActions;
    ActionMap: AppActionMap;
    Scenes: AppScenes;
    Plugins: AppPlugins;
    StorageAdapters: AppStorageAdapters;
    Eases: Eases;
  }
}
`;
  }

  async function build(msg = `Building ${DTS_FILE_NAME}`) {
    logger.info(msg);
    const types = await generateTypes();
    const typesDir = path.resolve(cwd, 'src/types');
    await fs.promises.mkdir(typesDir, { recursive: true });
    await fs.promises.writeFile(path.join(typesDir, DTS_FILE_NAME), types, 'utf-8');
  }

  return {
    name: 'vite-plugin-dill-pixel-config',
    enforce: 'pre',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    async load(id) {
      if (id === resolvedVirtualModuleId) {
        return `
          const configModule = await import('/dill-pixel.config.ts');
          export default configModule.default;
        `;
      }
    },
    async buildStart() {
      if (!isProject) return;
      await build('Generating types from dill-pixel.config.ts');
    },
    configureServer(server) {
      if (!isProject) return;

      const configPath = path.resolve(cwd, 'dill-pixel.config.ts');
      const scenesDir = path.resolve(cwd, 'src/scenes');

      const handleFileChange = async (file) => {
        const isScene = file.startsWith(scenesDir);
        const isConfig = file === configPath;

        if (!isScene && !isConfig) return;

        const msg = isScene ? `Scene file changed` : `Config file changed`;
        await build(`${msg}, regenerating types...`);
        server.ws.send({ type: 'full-reload' });
      };

      if (fs.existsSync(configPath)) {
        server.watcher.add(configPath);
      }
      if (fs.existsSync(scenesDir)) {
        server.watcher.add(scenesDir);
      }

      server.watcher.on('change', handleFileChange);
      server.watcher.on('add', handleFileChange);
      server.watcher.on('unlink', handleFileChange);
    },
  };
}

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

  if (!fs.existsSync(scenesDir)) {
    return [];
  }

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

export function sceneListPlugin(isProject = true) {
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

function createDillPixelRuntimePlugin() {
  const virtualModuleId = 'dill-pixel-runtime';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  return {
    name: 'vite-plugin-dill-pixel-runtime',
    enforce: 'pre',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return `
          import { pluginsList } from 'virtual:dill-pixel-plugins';
          import { sceneList } from 'virtual:dill-pixel-scenes';
          import { storageAdaptersList } from 'virtual:dill-pixel-storage-adapters';
          import { create } from 'dill-pixel';

          (globalThis).DillPixel = (globalThis).DillPixel || {};

          try {
            (globalThis).DillPixel.APP_NAME = __DILL_PIXEL_APP_NAME;
            (globalThis).DillPixel.APP_VERSION = __DILL_PIXEL_APP_VERSION;
          } catch (e) {
            console.error('Failed to set app name and version', e);
          }

          (globalThis).DillPixel.sceneList = sceneList;
          (globalThis).DillPixel.pluginsList = pluginsList;
          (globalThis).DillPixel.storageAdaptersList = storageAdaptersList;

          (globalThis).DillPixel.sceneIds = sceneList.map((scene) => scene.id);
          (globalThis).DillPixel.pluginIds = pluginsList.map((plugin) => plugin.id);
          (globalThis).DillPixel.storageAdapterIds = storageAdaptersList.map((adapter) => adapter.id);

          (globalThis).DillPixel.get = function (key) {
            (globalThis).DillPixel = (globalThis).DillPixel || {};
            return key ? (globalThis).DillPixel[key] : (globalThis).DillPixel;
          };

          async function bootstrap() {
            const configModule = await import('virtual:dill-pixel-config');
            const config = configModule.default;
            (globalThis).DillPixel.config = config;
            const app = await create(config);
            const mains = import.meta.glob('/src/main.ts', { eager: true });
            const mainPath = Object.keys(mains)[0];

            if (mainPath) {
              const mainModule = mains[mainPath];
              if (mainModule && typeof mainModule.default === 'function') {
                await mainModule.default(app);
              }
            }
          }
          bootstrap();
        `;
      }
    },
  };
}

function createDillPixelPWAPlugin() {
  const entryId = 'dill-pixel-pwa';
  const resolvedVirtualModuleId = '\0' + entryId;

  return {
    name: 'vite-virtual-entry',
    enforce: 'pre',
    resolveId(id) {
      if (id === entryId) {
        return resolvedVirtualModuleId;
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return `
          import {pwaInfo} from 'virtual:pwa-info';
          import {registerSW} from 'virtual:pwa-register';

          window.DillPixel = window.DillPixel || {};
          window.DillPixel.pwa = window.DillPixel.pwa || {};

          window.DillPixel.pwa.info = pwaInfo;

          window.DillPixel.pwa.onRegisteredSW = function(swScriptUrl){
            console.log('Dill Pixel PWA: SW registered: ', swScriptUrl)
          }

          window.DillPixel.pwa.offlineReady = function(){
            console.log('Dill Pixel PWA: ready to work offline')
          }

          window.DillPixel.pwa.register = function(){
            registerSW({
              immediate: true,
              onRegisteredSW(swScriptUrl) {
                window.DillPixel.pwa.onRegisteredSW(swScriptUrl)
              },
              onOfflineReady() {
                window.DillPixel.pwa.offlineReady()
              },
            });
          }
        `;
      }
    },
    config(config) {
      const input = config.build?.rollupOptions?.input || 'index.html';
      const inputs = Array.isArray(input) ? input : [input];

      return {
        build: {
          rollupOptions: {
            input: [entryId, ...inputs],
            output: {
              entryFileNames: (chunkInfo) => {
                if (chunkInfo.facadeModuleId?.includes('dill-pixel-pqa')) {
                  return 'assets/dill-pixel-[hash].js';
                }
                return 'assets/[name]-[hash].js';
              },
            },
          },
        },
      };
    },
  };
}

/** END PLUGINS */

/** CONFIG */
/**
 * @type {Partial<import('vite').UserConfig>}
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
  build: {
    minify: 'esbuild',
    sourcemap: env === 'development',
    rollupOptions: {
      external: ['dill-pixel-globals'],
      output: {
        manualChunks: {
          gsap: ['gsap'],
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
  plugins: [
    wasm(),
    topLevelAwait(),
    createHtmlPlugin(),
    createDillPixelRuntimePlugin(),
    viteStaticCopy({
      targets: [
        {
          src: './node_modules/dill-pixel/src/plugins/captions/font/*.*',
          dest: './assets/dill-pixel/font',
        },
      ],
    }),
    storageAdapterListPlugin(),
    pluginListPlugin(),
    sceneListPlugin(),
    assetpackPlugin(),
    assetTypesPlugin(),
    dillPixelConfigPlugin(),
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
// remove assetpack plugin and asset types plugin
noAssetpackConfig.plugins = noAssetpackConfig.plugins.filter(
  (plugin) => plugin.name !== 'vite-plugin-assetpack' && plugin.name !== 'vite-plugin-asset-types',
);

// withPWA
const injectRegister = process.env.SW_INLINE ?? 'auto';
const selfDestroying = process.env.SW_DESTROY === 'true';
/**
 * @type {Partial<import('vite-plugin-pwa').VitePWAOptions>}
 */
const defaultPWAConfig = {
  base: '/',
  buildBase: './',
  registerType: 'autoUpdate',
  injectRegister,
  selfDestroying,
  devOptions: {
    enabled: process.env.SW_DEV === 'true',
    navigateFallback: 'index.html',
    suppressWarnings: true,
  },
  manifest: {
    name: process.env.npm_package_name,
    short_name: process.env.npm_package_name,
    description: process.env.npm_package_description,
    theme_color: '#ffffff',
    background_color: '#000000',
    display: 'fullscreen',
    orientation: 'portrait',
    categories: ['game', 'application'],
  },
};

/**
 * @param {Partial<import('vite-plugin-pwa').VitePWAOptions>} userPWAConfig
 * @param {Partial<import('vite').UserConfig>} userConfig
 * @returns {import('vite').UserConfig}
 */
function withPWA(userPWAConfig = {}, userConfig = {}) {
  const pwaConfig = {
    ...defaultPWAConfig,
    ...userPWAConfig,
    devOptions: { ...defaultPWAConfig.devOptions, ...userPWAConfig.devOptions },
    manifest: {
      ...defaultPWAConfig.manifest,
      ...(userPWAConfig?.manifest ?? {}),
      icons: [...(userPWAConfig?.manifest?.icons ?? [])],
    },
  };
  const config = mergeConfig(defaultConfig, userConfig);
  config.plugins.push(VitePWA(pwaConfig));
  config.plugins.push(createDillPixelPWAPlugin());
  return config;
}

/**
 * @param {Partial<import('vite').UserConfig>} userConfig
 * @returns {import('vite').UserConfig}
 */
function extendConfig(userConfig = {}) {
  return mergeConfig(defaultConfig, userConfig);
}

export { extendConfig, noAssetpackConfig, withPWA };

export default defaultConfig;
