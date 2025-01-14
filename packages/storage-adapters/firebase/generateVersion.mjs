import fs from 'node:fs';

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const version = pkg.version;
const firebasePkg = JSON.parse(fs.readFileSync('./node_modules/firebase/package.json', 'utf8'));
const firebaseVersion = firebasePkg.version;

fs.writeFileSync(
  './src/version.ts',
  `export const version = '${version}';\nexport const firebaseVersion = '${firebaseVersion}';`,
);
