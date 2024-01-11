#!/usr/bin/env node
import {green} from 'kleur/colors';
import fs from 'node:fs';
import {generateCaptions} from './cli/audio/cc.mjs';
import {compress} from './cli/audio/index.mjs';
import {create} from './cli/create.mjs';
import {update} from './cli/update.mjs';

const currentVersion = process.versions.node;
const requiredMajorVersion = parseInt(currentVersion.split('.')[0], 10);
const minimumMajorVersion = 18;

if (requiredMajorVersion < minimumMajorVersion) {
	console.error(`Node.js v${currentVersion} is out of date and unsupported!`);
	console.error(`Please use Node.js v${minimumMajorVersion} or higher.`);
	process.exit(1);
}

const {version} = JSON.parse(fs.readFileSync(new URL('./package.json', import.meta.url), 'utf-8'));

const args = process.argv.slice(2);

if (!args[0] || args[0] === 'version') {
	console.log(`
${green(`Dill Pixel ${version}`)}
`);
}

if (args.length === 0) {
	console.log('Please provide a subcommand.');
	process.exit(1);
}

switch (args[0]) {
	case 'version':
		break;
	case 'create':
		let cwd = args[1] || '.';
		await create(cwd);
		break;
	case 'update':
		console.log(`${green(`Updating Dill Pixel to the latest version...`)}`);
		await update();
		const {version: newVersion} = JSON.parse(fs.readFileSync(new URL('./package.json', import.meta.url), 'utf-8'));
		console.log(`${green(`Updated Dill Pixel to version ${newVersion}.`)}`);
		break;
	case 'audio':
		switch (args[1]) {
			case 'compress':
				const audioDirectory = args[2] || './src/assets/audio';
				console.log(`${green(`Dill Pixel is compressing your audio files...`)}`);
				await compress(audioDirectory);
				console.log(`${green(`Dill Pixel has finished compressing your audio files! Find them in "${audioDirectory}/output."`)}`);
				break;
			case 'captions':
				const captionsDirectory = args[2] || './src/assets/audio/captions';
				console.log(`${green(`Dill Pixel is preparing your closed captioning files...`)}`);
				await generateCaptions(captionsDirectory);
				console.log(`${green(`Dill Pixel has finished prepaeing your closed captioning files! Find them in "${captionsDirectory}/output."`)}`);
				break;
			default:
				console.log(`Unknown audio command: "${args[1]}". Please use "compress" or "captions".`);
				break;
		}
		break;
	default:
		console.log(`Unknown subcommand: ${args[0]}`);
		process.exit(1);
}
