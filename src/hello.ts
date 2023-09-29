import { LogUtils } from './utils';
import { version } from './version';

export function sayHello() {
  let hello: string = `%cDill Pixel v${version}`;
  hello += ' - %chttps://reli.sh';
  console.log(hello, LogUtils.STYLE_RELISH, LogUtils.STYLE_RELISH_BOLD);
}
