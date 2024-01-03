#!/usr/bin/env node
import {execSync} from 'node:child_process';
import {package_manager} from './utils.mjs';

const install_path = 'github:relishinc/dill-pixel';

export async function update() {
	return execSync(`${package_manager} install ${install_path}`);
}
