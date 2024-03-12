import { LogUtils } from './utils';
import { pixiVersion, version } from './version';

export function sayHello() {
  const hello: string = `%cDill Pixel Game Framework v${version} - %chttps://reli.sh\nPixi.js v${pixiVersion}`;
  console.log(hello, LogUtils.STYLE_RELISH, LogUtils.STYLE_RELISH_BOLD);
}
