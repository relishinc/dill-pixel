import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname in ES6 module
const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(dirname(__filename), '../');

const mainPackageJsonPath = resolve(__dirname, './package.json');
const mainPackageJson = JSON.parse(readFileSync(mainPackageJsonPath, 'utf8'));
const { version: dillPixelVersion } = mainPackageJson;

// Load the framework package.json to get the versions
const frameworkPackageJsonPath = resolve(__dirname, './packages/framework/package.json');
const frameworkPackageJson = JSON.parse(readFileSync(frameworkPackageJsonPath, 'utf8'));
const {
  dependencies: { 'pixi.js': pixiJsVersion, '@pixi/sound': pixiSoundVersion, vite: viteVersion },
  devDependencies: { 'vite-plugin-dts': vitePluginDtsVersion },
} = frameworkPackageJson;

// Function to update package.json files
function updatePackageJson(packageJsonPath) {
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
  if (packageJson.version) {
    packageJson.version = dillPixelVersion;
  }
  if (packageJson.dependencies) {
    if (packageJson.dependencies['pixi.js'] && !packageJson.dependencies['pixi.js']?.includes('workspace')) {
      packageJson.dependencies['pixi.js'] = pixiJsVersion;
    }
    if (packageJson.dependencies['@pixi/sound'] && !packageJson.dependencies['@pixi/sound']?.includes('workspace')) {
      packageJson.dependencies['@pixi/sound'] = pixiSoundVersion;
    }
    if (packageJson.dependencies['dill-pixel'] && !packageJson.dependencies['dill-pixel']?.includes('workspace')) {
      packageJson.dependencies['dill-pixel'] = dillPixelVersion;
    }
    if (packageJson.dependencies['vite'] && !packageJson.dependencies['vite']?.includes('workspace')) {
      packageJson.dependencies['vite'] = viteVersion;
    }
  }
  if (packageJson.peerDependencies) {
    if (packageJson.peerDependencies['pixi.js']) {
      packageJson.peerDependencies['pixi.js'] = pixiJsVersion;
    }
    if (packageJson.peerDependencies['@pixi/sound']) {
      packageJson.peerDependencies['@pixi/sound'] = pixiSoundVersion;
    }
    if (packageJson.peerDependencies['dill-pixel']) {
      packageJson.peerDependencies['dill-pixel'] = dillPixelVersion;
    }
    if (packageJson.peerDependencies['vite']) {
      packageJson.peerDependencies['vite'] = viteVersion;
    }
  }

  if (packageJson.devDependencies) {
    if (packageJson.devDependencies['vite-plugin-dts']) {
      packageJson.devDependencies['vite-plugin-dts'] = vitePluginDtsVersion;
    }
    if (packageJson.devDependencies['dill-pixel']) {
      packageJson.devDependencies['dill-pixel'] = dillPixelVersion;
    }
    if (packageJson.devDependencies['vite']) {
      packageJson.devDependencies['vite'] = viteVersion;
    }
  }

  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  console.log(`Updated ${packageJsonPath}`);
}

// Glob pattern to find package.json files
const globPattern =
  '{./packages/framework/package.json,./packages/plugins/*/package.json,./packages/storage-adapters/*/package.json,./packages/examples/package.json,./packages/templates/*/package.json}';

function run() {
  const files = glob.sync(globPattern);
  files.forEach(updatePackageJson);
}

run();
