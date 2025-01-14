import fs from 'node:fs';

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const version = pkg.version;
const rollbarPkg = JSON.parse(fs.readFileSync('./node_modules/rollbar/package.json', 'utf8'));
const rollbarVersion = rollbarPkg.version;

fs.writeFileSync(
  './src/version.ts',
  `export const version = '${version}';\nexport const rollbarVersion = '${rollbarVersion}';`,
);
