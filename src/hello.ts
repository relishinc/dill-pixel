import { pixiVersion, version } from './version';

export function sayHello() {
  const hello = `%c Dill Pixel Game Framework v${version} | %cPixi.js v${pixiVersion} %c| %chttps://dillpixel.io `;
  console.log(
    hello,
    'background: rgba(31, 41, 55, 1);color: #74b64c',
    'background: rgba(31, 41, 55, 1);color: #e91e63',
    'background: rgba(31, 41, 55, 1);color: #74b64c',
    'background: rgba(31, 41, 55, 1);color: #74b64c; font-weight: bold',
  );
}
