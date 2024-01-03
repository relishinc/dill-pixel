#!/usr/bin/env node
import {bold, cyan} from 'kleur/colors';
import {execSync} from 'node:child_process';
import {package_manager} from './utils.mjs';

const install_path = 'github:relishinc/dill-pixel';

export function update() {
	// log a message that we're updating to the latest version from github
	console.log(`${cyan(`Running`)} ${bold(cyan(`${package_manager} install ${install_path}`))}`);
	// execute install command from the chosen package manager
	execSync(`${package_manager} install ${install_path}`);
	// log when we're done
	console.log(`${cyan(`Done!`)}`);
}
