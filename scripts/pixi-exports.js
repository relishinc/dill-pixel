const fs = require('fs');
const path = require('path');

const imports = [
  'Application',
  'DisplayObject',
  'Container',
  'Sprite',
  'Graphics',
  'Text',
  'BitmapText',
  'HTMLText',
  'Texture',
  'Point',
  'Rectangle',
  'TextStyle',
  'HTMLTextStyle',
];

const interfaces = ['IApplicationOptions', 'IPoint', 'IHitArea', 'ITextStyle', 'IHTMLTextStyle', 'IBitmapTextStyle'];

let output = `/**
 * Import necessary classes and interfaces from 'pixi.js' library.
 */
 
 import { ${imports.map((e) => `${e}`).join(', ')}} from 'pixi.js';`;

// add all the classes as properties of the pixi object
output += `/**
 * Import necessary classes and interfaces from 'pixi.js' library.
 */\n\nconst PIXI = {\n${imports.map((e) => `\t${e}`).join(',\n')}\n}`;

output += `/**
 * Export the PIXI object so it can be imported and used in other files.
 */\n\nexport { PIXI };\n`;
output += `/**
 * Export the types of the imported classes and interfaces from 'pixi.js'.
 * This allows other files to use these types without needing to import 'pixi.js' directly.
 */\nexport type { ${imports.map((e) => `${e} as PIXI${e}`).join(', ')}, ${interfaces.join(', ')} } from 'pixi.js';`;

const filePath = path.join(__dirname, '../src', 'pixi.ts');
fs.writeFileSync(filePath, output);
