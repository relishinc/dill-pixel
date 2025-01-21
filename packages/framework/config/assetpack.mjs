import { AssetPack, Logger } from '@assetpack/core';
import { pixiPipes } from '@assetpack/core/pixi';
import fs from 'node:fs';
import process from 'node:process';
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

  function reload() {
    Logger.info('Dill Pixel assetpack plugin:: manifest changed, reloading browser...');
    viteServer?.ws?.send({ type: 'full-reload' });
  }

  const debouncedReload = debounce(reload, 100);

  return {
    name: 'vite-plugin-assetpack',
    configureServer(server) {
      viteServer = server;
    },
    configResolved(resolvedConfig) {
      mode = resolvedConfig.command;
      if (!resolvedConfig.publicDir) return;
      if (apConfig.output) return;
      const publicDir = resolvedConfig.publicDir.replace(process.cwd(), '');
      apConfig.output = `.${publicDir}/assets/`;
    },
    buildStart: async () => {
      if (mode === 'serve') {
        if (ap) return;
        ap = new AssetPack(apConfig);
        await ap.run();

        // wait for the manifest to be initially created
        setTimeout(() => {
          initialBuild = true;
        }, 1000);

        void ap.watch();

        if (mode === 'serve') {
          Logger.info(`Dill Pixel assetpack plugin:: watching manifest at ${apConfig.output}${manifestUrl}`);
          manifestWatcher = fs.watch(`${apConfig.output}${manifestUrl}`, async (eventType) => {
            if (initialBuild && eventType === 'change') {
              debouncedReload();
            }
          });
        }
      } else {
        await new AssetPack(apConfig).run();
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
