#!/usr/bin/env node
import {bgRed, bold, green, red, white} from 'kleur/colors';
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

const hr = () => {
	return console.log(bold(green('-'.repeat(80))));
};

if (!(!args[0] || args[0] === 'version')) {} else {
	console.log(bold(green(`Dill Pixel ${version}`)));
}

if (args.length === 0) {
	console.log(bold(green('Dill Pixel - Please provide a subcommand.')));
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
		hr();
		console.log(bold(green(`Updating Dill Pixel to the latest version...`)));
		await update();
		const {version: newVersion} = JSON.parse(fs.readFileSync(new URL('./package.json', import.meta.url), 'utf-8'));
		console.log(`${bold(green(`Updated Dill Pixel to version ${newVersion}`))}`);
		hr();
		break;
	case 'audio':
		hr();
		switch (args[1]) {
			case 'compress':
				const audioDirectory = args[2] || './src/assets/audio';
				console.log(bold(green(`Dill Pixel is compressing your audio files...`)));
				try {
					await compress(audioDirectory);
				} catch (e) {
					console.error(red(`Error compressing your audio files: ${e}`))
				}
				console.log(bold(green(`Dill Pixel has finished compressing your audio files! Find them in "${audioDirectory}/output."`)));
				break;
			case 'captions':
				const captionsCSVDirectory = args[2] || './src/assets/audio/captions';
				const captionsOutputDirectory = args[3] || './src/assets/json';
				console.log(bold(green(`Dill Pixel is preparing your closed captioning files...`)));
				try {
					await generateCaptions(captionsCSVDirectory, captionsOutputDirectory);
					console.log(bold(green(`Dill Pixel has generating your closed captioning files! Find them in "${captionsOutputDirectory}/cc.json"`)));
				} catch (e) {
					console.error(bold(bgRed(white(`Error generating captions:`))), red(e))
				}
				break;
			default:
				console.error(bold(bgRed(white(`Unknown audio command: "${args[1]}".`))), red(`Please use "compress" or "captions".`));
				break;
		}
		hr();
		break;
	default:
		console.error(red(bold(`Dill Pixel - Unknown subcommand: ${args[0]}`)));
		process.exit(1);
}
