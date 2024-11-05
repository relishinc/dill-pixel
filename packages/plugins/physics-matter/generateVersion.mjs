import fs from 'node:fs';

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const version = pkg.version;
const matterPkg = JSON.parse(fs.readFileSync('./node_modules/matter-js/package.json', 'utf8'));
const matterVersion = matterPkg.version;

fs.writeFileSync(
  './src/version.ts',
  `export const version = '${version}';\nexport const matterVersion = '${matterVersion}';`,
);
