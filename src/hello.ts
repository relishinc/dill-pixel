import {LogUtils} from "./Utils";
import * as BuildInfo from "./version";

export function sayHello() {
	let hello: string = `%c${BuildInfo.PACKAGE_NAME} v${BuildInfo.PACKAGE_VERSION}`;
	if (BuildInfo.GIT_BRANCH !== undefined && BuildInfo.GIT_BRANCH !== "undefined") {
		hello += ` - ${BuildInfo.GIT_BRANCH}`;
		if (BuildInfo.GIT_COMMIT !== undefined && BuildInfo.GIT_COMMIT !== "undefined") {
			hello += `#${BuildInfo.GIT_COMMIT.substr(0, 7)}`;
		}
	}
	hello += " - %chttps://reli.sh";
	console.log(hello, LogUtils.STYLE_RELISH, LogUtils.STYLE_RELISH_BOLD);
}
