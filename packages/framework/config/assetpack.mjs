import { AssetPack, Logger } from '@assetpack/core';
import { pixiPipes } from '@assetpack/core/pixi';
import fs from 'node:fs';
import process from 'node:process';
import path from 'path';

// Check if user config exists (synchronously)
function hasUserAssetpackConfig() {
  const configPath = path.join(process.cwd(), '.assetpack.mjs');
  try {
    return fs.existsSync(configPath);
  } catch {
    return false;
  }
}

// Async function to load user config
async function loadUserAssetpackConfig() {
  if (!hasUserAssetpackConfig()) {
    return null;
  }

  try {
    const configPath = path.join(process.cwd(), '.assetpack.mjs');
    const userConfig = await import(configPath);
    Logger.info('Dill Pixel assetpack plugin:: Using user assetpack config from .assetpack.mjs');
    return userConfig.default || userConfig;
  } catch (error) {
    Logger.error('Dill Pixel assetpack plugin:: Error loading user assetpack config:', error);
    return null;
  }
}

const cwd = process.cwd();

const defaultManifestUrl = 'assets.json';

const env = process.env.NODE_ENV;
const isProduction = env === 'production';

// import the assetpack config from the user's cwd

const defaultPixiPipesConfig = {
  cacheBust: isProduction,
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

export const assetpackConfig = (manifestUrl = defaultManifestUrl, pixiPipesConfig = {}, cacheBust) => {
  pixiPipesConfig = { ...defaultPixiPipesConfig, ...pixiPipesConfig };

  if (cacheBust !== undefined) {
    pixiPipesConfig.cacheBust = cacheBust;
  }
  return {
    manifestUrl,
    entry: './assets',
    logLevel: 'info',
    pipes: [
      ...pixiPipes({
        ...pixiPipesConfig,
      }),
    ],
  };
};

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
            Logger.warn(`Failed to load TPS frames from ${firstSrc}:`, error.message);
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
    TextureLike: AssetTextures;
    TPSFrames: AssetTPSFrames; 
    SpriteSheetLike: AssetSpritesheets;
    SpineData: AssetSpine;
    Spine: AssetSpine;
    AudioLike: AssetAudio;
    FontFamily: AssetFontFamilies;
    BitmapFontFamily: AssetBitmapFontFamilies;
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
  let mode;
  let ap;
  let viteServer;
  let manifestWatcher;
  let initialBuild = false;
  let apConfig;

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
    async configResolved(resolvedConfig) {
      mode = resolvedConfig.command;
      if (!resolvedConfig.publicDir) return;
      if (!apConfig) {
        const userConfig = await loadUserAssetpackConfig();
        apConfig = userConfig || assetpackConfig(manifestUrl, pixiPipesConfig);
      }
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
      // Load config if not already loaded
      if (!apConfig) {
        const userConfig = await loadUserAssetpackConfig();
        apConfig = userConfig || assetpackConfig(manifestUrl, pixiPipesConfig);
      }

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
