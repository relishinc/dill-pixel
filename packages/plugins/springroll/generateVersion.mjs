import fs from 'node:fs';

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const version = pkg.version;
const pluginPkg = JSON.parse(fs.readFileSync('./node_modules/springroll/package.json', 'utf8'));
const pluginVersion = pluginPkg.version;

fs.writeFileSync(
  './src/version.ts',
  `export const version = '${version}';\nexport const pluginVersion = '${pluginVersion}';`,
);
