import fs from 'node:fs';

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const version = pkg.version;

fs.writeFileSync('./src/version.ts', `export const version = '${version}';`);
