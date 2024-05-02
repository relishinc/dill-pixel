import { pixiManifest } from '@assetpack/plugin-manifest';
import assetPack from '@relish-studios/dill-pixel/assetpack';

const config = {
  ...assetPack, plugins: {
    ...assetPack.plugins, manifest: pixiManifest({
      output: './src/assets.json',
      createShortcuts: true,
    }),
  },
};

export default config;
