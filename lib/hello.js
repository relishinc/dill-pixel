import { LogUtils } from './utils';
import { version } from './version';
export function sayHello() {
    let hello = `%cDill Pixel v${version}`;
    hello += ' - %chttps://reli.sh';
    console.log(hello, LogUtils.STYLE_RELISH, LogUtils.STYLE_RELISH_BOLD);
}
//# sourceMappingURL=hello.js.map