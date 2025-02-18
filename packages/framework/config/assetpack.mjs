import { AssetPack, Logger } from '@assetpack/core';
import { pixiPipes } from '@assetpack/core/pixi';
import fs from 'node:fs';
import process from 'node:process';
import path from 'path';
const cwd = process.cwd();
const defaultManifestUrl = 'assets.json';

const defaultPixiPipesConfig = {
  cacheBust: false,
  resolutions: { default: 1, low: 0.5 },
  compression: { jpg: true, png: true, webp: true },
  texturePacker: {
    nameStyle: 'relative',
    removeFileExtension: true,
    texturePacker: { nameStyle: 'relative', removeFileExtension: true },
  },
  audio: {},
  webfont: {},
  manifest: { trimExtensions: true, createShortcuts: true, output: defaultManifestUrl },
};
export const assetpackConfig = (manifestUrl = defaultManifestUrl, pixiPipesConfig = defaultPixiPipesConfig) => ({
  manifestUrl,
  entry: './assets',
  logLevel: 'info',
  cache: false,
  pipes: [
    ...pixiPipes({
      ...pixiPipesConfig,
    }),
  ],
});

export default assetpackConfig;

// write a debounce function
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

// Function to generate TypeScript types from the manifest
function generateAssetTypes(manifest) {
  // Extract all assets from bundles
  const assetsByType = {
    textures: new Set(),
    spritesheets: new Set(),
    fonts: new Set(),
    audio: new Set(),
    json: new Set(),
    spine: new Set(),
    rive: new Set(),
  };

  const bundles = manifest.bundles || [];
  const bundleNames = new Set();

  // Process each bundle
  bundles.forEach((bundle) => {
    bundleNames.add(bundle.name);

    // Process each asset in the bundle
    bundle.assets.forEach((asset) => {
      const aliases = asset.alias || [];
      const srcs = Array.isArray(asset.src) ? asset.src : [asset.src];
      const firstSrc = srcs[0];
      const ext = path.extname(firstSrc).toLowerCase();

      // Add to appropriate category based on extension and data tags
      if (asset.data?.tags?.tps || (ext === '.json' && firstSrc.includes('sheet'))) {
        aliases.forEach((alias) => assetsByType.spritesheets.add(alias));
      } else if (ext === '.json' && !firstSrc.includes('atlas')) {
        aliases.forEach((alias) => assetsByType.json.add(alias));
      } else if (['.png', '.webp', '.jpg', '.jpeg', '.svg'].includes(ext)) {
        aliases.forEach((alias) => assetsByType.textures.add(alias));
      } else if (['.mp3', '.ogg', '.wav'].includes(ext)) {
        aliases.forEach((alias) => assetsByType.audio.add(alias));
      } else if (['.ttf', '.woff', '.woff2', '.fnt'].includes(ext) || asset.data?.tags?.wf) {
        aliases.forEach((alias) => assetsByType.fonts.add(alias));
      } else if (['.atlas', '.skel', '.json'].some((e) => firstSrc.includes(e)) && firstSrc.includes('spine')) {
        aliases.forEach((alias) => assetsByType.spine.add(alias));
      } else if (ext === '.riv') {
        aliases.forEach((alias) => assetsByType.rive.add(alias));
      }
    });
  });

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
 * Available font names in the asset manifest
 * @example
 * const font: AssetFonts = 'KumbhSans-Regular';
 */
export type AssetFonts = ${types.fonts.length ? `\n  | '${types.fonts.join("'\n  | '")}'` : 'never'};

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
 * Union type of all asset names
 * @example
 * const asset: AssetAlias = 'game/wordmark';
 */
export type AssetAlias = 
  | AssetTextures 
  | AssetSpritesheets 
  | AssetFonts 
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
  fonts: Record<AssetFonts, any>;
  audio: Record<AssetAudio, HTMLAudioElement>;
  json: Record<AssetJson, any>;
  spine: Record<AssetSpine, any>;
  rive: Record<AssetRive, any>;
}

/**
 * Helper type to get the asset type for a given alias
 * @example
 * type MyTextureType = AssetTypeOf<'game/wordmark'>; // Texture
 */
export type AssetTypeOf<T extends AssetAlias> = 
  T extends AssetTextures ? Texture :
  T extends AssetSpritesheets ? Spritesheet :
  T extends AssetFonts ? any :
  T extends AssetAudio ? HTMLAudioElement :
  T extends AssetJson ? any :
  T extends AssetSpine ? any :
  T extends AssetRive ? any :
  never;

/**
 * Get the bundle name for a given asset
 * @example
 * type MyBundle = AssetBundleOf<'game/wordmark'>; // 'game'
 */
export type AssetBundleOf<T extends AssetAlias> = Extract<AssetBundles, T extends \`\${infer B}/\${string}\` ? B : never>;
`;
}

// Function to write types file
async function writeAssetTypes(manifest, outputDir) {
  const types = generateAssetTypes(manifest);
  // Change output path to ./src/types/
  const srcTypesDir = path.join(process.cwd(), 'src', 'types');

  try {
    // Ensure the directory exists
    await fs.promises.mkdir(srcTypesDir, { recursive: true });
    const typesPath = path.join(srcTypesDir, 'assets.d.ts');
    await fs.promises.writeFile(typesPath, types, 'utf8');
    Logger.info(`Dill Pixel assetpack plugin:: Generated types at ${typesPath}`);
  } catch (error) {
    Logger.error('Dill Pixel assetpack plugin:: Error writing types file:', error);
    // Fallback to original location if src folder doesn't exist
    const typesPath = path.join(outputDir, 'assets.d.ts');
    await fs.promises.writeFile(typesPath, types, 'utf8');
    Logger.info(`Dill Pixel assetpack plugin:: Generated types at fallback location ${typesPath}`);
  }
}

export function assetpackPlugin(manifestUrl = defaultManifestUrl, pixiPipesConfig = defaultPixiPipesConfig) {
  const apConfig = {
    manifestUrl,
    entry: './assets',
    logLevel: 4,
    cache: false,
    pipes: [
      ...pixiPipes({
        ...pixiPipesConfig,
      }),
    ],
  };
  let mode;
  let ap;
  let viteServer;
  let manifestWatcher;
  let initialBuild = false;

  async function handleManifestChange() {
    try {
      const manifestPath = `${apConfig.output}/${manifestUrl}`;
      const manifest = JSON.parse(await fs.promises.readFile(manifestPath, 'utf8'));
      await writeAssetTypes(manifest, path.dirname(manifestPath));
      Logger.info('Dill Pixel assetpack plugin:: manifest changed, reloading browser...');
      viteServer?.ws?.send({ type: 'full-reload' });
    } catch (error) {
      Logger.error('Dill Pixel assetpack plugin:: Error handling manifest change:', error);
    }
  }

  const debouncedHandleManifestChange = debounce(handleManifestChange, 100);

  return {
    name: 'vite-plugin-assetpack',
    configureServer(server) {
      viteServer = server;
    },
    configResolved(resolvedConfig) {
      mode = resolvedConfig.command;
      if (!resolvedConfig.publicDir) return;
      if (apConfig.output) return;
      const publicDir = resolvedConfig.publicDir.replace(cwd, '');
      const outputPath = path.join(publicDir, 'assets');
      apConfig.output = path.isAbsolute(publicDir)
        ? path.join('.', outputPath).replace(/\\/g, '/')
        : `./${outputPath}`.replace(/\\/g, '/');

      // on windows, for some reason, the output path is ./C:/Users/.../assets
      // so we need to remove the first two characters
      if (apConfig.output.indexOf('./C') === 0) {
        apConfig.output = apConfig.output.substr(2);
      }
    },
    buildStart: async () => {
      if (mode === 'serve') {
        if (ap) return;
        ap = new AssetPack(apConfig);
        await ap.run();

        // Generate initial types
        await handleManifestChange();

        // wait for the manifest to be initially created
        setTimeout(() => {
          initialBuild = true;
        }, 1000);

        void ap.watch();

        if (mode === 'serve') {
          Logger.info(`Dill Pixel assetpack plugin:: watching manifest at ${apConfig.output}/${manifestUrl}`);
          manifestWatcher = fs.watch(`${apConfig.output}/${manifestUrl}`, async (eventType) => {
            if (initialBuild && eventType === 'change') {
              await debouncedHandleManifestChange();
            }
          });
        }
      } else {
        await new AssetPack(apConfig).run();
        // Generate types in build mode as well
        await handleManifestChange();
      }
    },
    buildEnd: async () => {
      manifestWatcher?.close();
      if (ap) {
        await ap.stop();
        ap = undefined;
      }
    },
  };
}
