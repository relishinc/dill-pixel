const fs = require('fs');
const path = require('path');
const packageJson = require('../package.json');

const version = packageJson.version;
const versionFileContent = `// This file is auto-generated during the build process.\nexport const version: string = '${version}';\n`;

fs.writeFileSync(path.resolve(__dirname, '../src/version.ts'), versionFileContent);
