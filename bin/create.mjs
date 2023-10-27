#!/usr/bin/env node
import * as p from '@clack/prompts';
import {bold, cyan, green} from 'kleur/colors';
import fs from 'node:fs';
import path from 'node:path';
import {create} from './index.mjs';
import {dist, package_manager} from './utils.mjs';

const currentVersion = process.versions.node;
const requiredMajorVersion = parseInt(currentVersion.split('.')[0], 10);
const minimumMajorVersion = 18;

if (requiredMajorVersion < minimumMajorVersion) {
	console.error(`Node.js v${currentVersion} is out of date and unsupported!`);
	console.error(`Please use Node.js v${minimumMajorVersion} or higher.`);
	process.exit(1);
}

const {version} = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf-8'));
let cwd = process.argv[2] || '.';

console.log(`
${green(`Dill Pixel ${version}`)}
`);

p.intro('This utility will walk you through creating a new Dill Pixel project.');

if (cwd === '.') {
	const dir = await p.text({
		message: 'Where should we create your project?',
		placeholder: '  (hit Enter to use current directory)',
	});

	if (p.isCancel(dir)) {
		process.exit(1);
	}

	if (dir) {
		cwd = /** @type {string} */ (dir);
	}
}

if (fs.existsSync(cwd)) {
	if (fs.readdirSync(cwd).length > 0) {
		const force = await p.confirm({
			message: 'Directory not empty. Continue?',
			initialValue: false,
		});

		// bail if `force` is `false` or the user cancelled with Ctrl-C
		if (force !== true) {
			process.exit(1);
		}
	}
}

const options = await p.group({
	template: () =>
		p.select({
			message: 'Which template?',
			// @ts-expect-error i have no idea what is going on here
			options: fs.readdirSync(dist('templates')).map((dir) => {
				const meta_file = dist(`templates/${dir}/.meta.json`);
				const {title, description} = JSON.parse(fs.readFileSync(meta_file, 'utf8'));

				return {
					label: title,
					hint: description,
					value: dir,
				};
			}),
		}),
});

await create(cwd, {
	name: path.basename(path.resolve(cwd)),
	template: /** @type {'default' | 'react'} */ (options.template),
});

p.outro('Your project is ready!');

console.log('\nNext steps:');
let i = 1;

const relative = path.relative(process.cwd(), cwd);
if (relative !== '') {
	console.log(`  ${i++}: ${bold(cyan(`cd ${relative}`))}`);
}

console.log(`  ${i++}: ${bold(cyan(`${package_manager} install`))}`);
// prettier-ignore
console.log(`  ${i++}: ${bold(cyan('git init && git add -A && git commit -m "Initial commit"'))} (optional)`);
console.log(`  ${i++}: ${bold(cyan(`${package_manager} run dev -- --open`))}`);

console.log(`\nTo close the dev server, hit ${bold(cyan('Ctrl-C'))}`);
