#!/usr/bin/env node
import {green} from "kleur/colors";
import fs from "node:fs";
import {create} from "./create.mjs";

const currentVersion = process.versions.node;
const requiredMajorVersion = parseInt(currentVersion.split('.')[0], 10);
const minimumMajorVersion = 18;

if (requiredMajorVersion < minimumMajorVersion) {
	console.error(`Node.js v${currentVersion} is out of date and unsupported!`);
	console.error(`Please use Node.js v${minimumMajorVersion} or higher.`);
	process.exit(1);
}

const {version} = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf-8'));


console.log(`
${green(`Dill Pixel ${version}`)}
`);

const args = process.argv.slice(2);
console.log(args);

if (args.length === 0) {
	console.log('Please provide a subcommand.');
	process.exit(1);
}

switch (args[0]) {
	case 'create':
		let cwd = args[1] || '.';
		await create(cwd);
		break;
	default:
		console.log(`Unknown subcommand: ${args[0]}`);
		process.exit(1);
}
