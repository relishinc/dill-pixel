import { build, createServer, loadConfigFromFile, mergeConfig, preview } from 'vite';
import { defaultConfig } from '../config/vite.mjs';

async function getMergedViteConfig(command, mode) {
  // Load user's vite.config.js file if it exists
  const userConfig = await loadConfigFromFile({
    command,
    mode,
  });

  // Merge user config with default config
  const mergedConfig = mergeConfig(defaultConfig, userConfig?.config || {});

  return mergedConfig;
}

export async function startDevServer() {
  const config = await getMergedViteConfig('serve', 'development');
  const server = await createServer(config);
  await server.listen();

  server.printUrls();
}

export async function runBuild() {
  const config = await getMergedViteConfig('build', 'production');
  await build(config);
}

export async function runPreview() {
  const config = await getMergedViteConfig('serve', 'production');
  const server = await preview(config);

  server.printUrls();
}
