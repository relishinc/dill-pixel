import { LogUtils } from './utils';
import { pixiVersion, version } from './version';
export function sayHello() {
    const hello = `%cDill Pixel Game Framework v${version} - %chttps://dillpixel.ioh\nPixi.js v${pixiVersion}`;
    console.log(hello, LogUtils.STYLE_RELISH, LogUtils.STYLE_RELISH_BOLD);
}
//# sourceMappingURL=hello.js.map