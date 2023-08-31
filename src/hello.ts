import info from './info.json';
import {LogUtils} from "./Utils";

const {packageName, version} = info;

export function sayHello() {
	let hello: string = `%c${packageName} v${version}`;
	hello += " - %chttps://reli.sh";
	console.log(hello, LogUtils.STYLE_RELISH, LogUtils.STYLE_RELISH_BOLD);
}
