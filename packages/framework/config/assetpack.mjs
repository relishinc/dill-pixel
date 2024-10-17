import { AssetPack } from '@assetpack/core';
import { pixiPipes } from '@assetpack/core/pixi';
import process from 'node:process';
const cwd = process.cwd();

export const assetpackConfig = {
  entry: './assets',
  output: './public',
  logLevel: 4,
  cache: false,
  pipes: [
    ...pixiPipes({
      cacheBust: false,
      resolutions: { default: 1, low: 0.5 },
      compression: { jpg: true, png: true, webp: true },
      texturePacker: {
        nameStyle: 'relative',
        removeFileExtension: true,
        texturePacker: { nameStyle: 'relative', removeFileExtension: true },
      },
      audio: {},
      manifest: { trimExtensions: true, createShortcuts: true, output: './src/assets.json' },
    }),
  ],
};

export default assetpackConfig;

export function assetpackPlugin() {
  let mode;
  let ap;

  return {
    name: 'vite-plugin-assetpack',
    configResolved(resolvedConfig) {
      mode = resolvedConfig.command;
      if (!resolvedConfig.publicDir) return;
      if (assetpackConfig.output) return;
      const publicDir = resolvedConfig.publicDir.replace(cwd, '');
      assetpackConfig.output = `${publicDir}/assets/`;
    },
    buildStart: async () => {
      if (mode === 'serve') {
        if (ap) return;
        ap = new AssetPack(assetpackConfig);
        void ap.watch();
      } else {
        await new AssetPack(assetpackConfig).run();
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
