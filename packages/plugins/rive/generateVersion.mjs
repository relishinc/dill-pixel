import fs from 'node:fs';

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const version = pkg.version;
const rivePkg = JSON.parse(fs.readFileSync('./node_modules/@rive-app/canvas-advanced-lite/package.json', 'utf8'));
const riveVersion = rivePkg.version;

fs.writeFileSync(
  './src/version.ts',
  `export const version = '${version}';\nexport const riveVersion = '${riveVersion}';`,
);
