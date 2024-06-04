const fs = require('fs');
const path = require('path');

const imports = [
  'Application',
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

const interfaces = [];

/*let output = `import { ${imports.map((e) => `${e}`).join(', ')}} from 'pixi.js';`;

 // add all the classes as properties of the pixi object
 output += `\n\nconst PIXI = {\n${imports.map((e) => `\t${e}`).join(',\n')}\n}`;

 output += `\n\nexport { PIXI };\n`;*/
const output = `\nexport type { ${imports.map((e) => `${e} as PIXI${e}`).join(', ')}, ${interfaces.join(
  ', ',
)} } from 'pixi.js';`;

const filePath = path.join(__dirname, '../src', 'pixi.ts');
fs.writeFileSync(filePath, output);
