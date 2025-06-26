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

export function assetpackPlugin(manifestUrl = defaultManifestUrl, pixiPipesConfig = defaultPixiPipesConfig) {
  let mode;
  let ap;
  let apConfig;
  let isBuilding = false;

  async function getConfig() {
    if (!apConfig) {
      const userConfig = await loadUserAssetpackConfig();
      apConfig = userConfig || assetpackConfig(manifestUrl, pixiPipesConfig);
    }
  }

  return {
    name: 'vite-plugin-assetpack',
    async configResolved(resolvedConfig) {
      mode = resolvedConfig.command;
      if (!resolvedConfig.publicDir) return;
      await getConfig();
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
      if (isBuilding) return;
      isBuilding = true;
      // Load config if not already loaded
      await getConfig();
      if (mode === 'serve') {
        if (ap) return;
        ap = new AssetPack(apConfig);
        await ap.watch();
      } else {
        await new AssetPack(apConfig).run();
      }
      isBuilding = false;
    },
    buildEnd: async () => {
      if (ap) {
        await ap.stop();
        ap = undefined;
      }
    },
  };
}
