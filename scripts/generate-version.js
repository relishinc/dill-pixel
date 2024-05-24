const fs = require('fs');
const path = require('path');
const packageJson = require('../package.json');
const frameworkPixiPackageJson = require('../node_modules/pixi.js/package.json');

const version = packageJson.version;
const pixiVersion = frameworkPixiPackageJson.version;
const versionFileContent = `// This file is auto-generated during the build process.\nexport const version: string = '${version}';\nexport const pixiVersion: string = '${pixiVersion}';\n`;

fs.writeFileSync(path.resolve(__dirname, '../src/version.ts'), versionFileContent);
