import pkg from '../package.json';
import {LogUtils} from "./Utils";

const {name: packageName, version: packageVersion} = pkg;

export function sayHello() {
	let hello: string = `%c${packageName} v${packageVersion}`;
	hello += " - %chttps://reli.sh";
	console.log(hello, LogUtils.STYLE_RELISH, LogUtils.STYLE_RELISH_BOLD);
}
