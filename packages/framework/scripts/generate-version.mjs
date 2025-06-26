import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import {dirname} from 'path';
import {fileURLToPath} from 'url';

const cwd = process.cwd();
const dillPixelPackageJson = JSON.parse(fs.readFileSync(path.resolve(cwd, './package.json'), 'utf8'));
const pixiPackageJson = JSON.parse(fs.readFileSync(path.resolve(cwd, './node_modules/pixi.js/package.json'), 'utf8'));

// Derive __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const version = dillPixelPackageJson.version;
const pixiVersion = pixiPackageJson.version;
const versionFileContent = `// This file is auto-generated during the build process.\nexport const version: string = '${version}';\nexport const pixiVersion: string = '${pixiVersion}';\n`;

fs.writeFileSync(path.resolve(__dirname, '../src/version.ts'), versionFileContent);
