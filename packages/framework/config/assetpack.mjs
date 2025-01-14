import { AssetPack } from '@assetpack/core';
import { pixiPipes } from '@assetpack/core/pixi';
import process from 'node:process';
const cwd = process.cwd();
const defaultManifestUrl = './public/assets.json';

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
  output: './public',
  logLevel: 'info',
  cache: false,
  pipes: [
    ...pixiPipes({
      ...pixiPipesConfig,
    }),
  ],
});

export default assetpackConfig;

export function assetpackPlugin(manifestUrl = defaultManifestUrl, pixiPipesConfig = defaultPixiPipesConfig) {
  const apConfig = {
    manifestUrl,
    entry: './assets',
    output: './public',
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

  return {
    name: 'vite-plugin-assetpack',
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
        void ap.watch();
      } else {
        await new AssetPack(apConfig).run();
      }
    },
    buildEnd: async () => {
      if (ap) {
        await ap.stop();
        ap = undefined;
      }
    },
  };
}
