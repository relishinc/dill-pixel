#!/usr/bin/env node
import * as p from '@clack/prompts';
import {bold, cyan} from 'kleur/colors';
import fs from 'node:fs';
import path from 'node:path';
import {copy, dist, mkdirp, package_manager} from './utils.mjs';

async function write(cwd, options) {
	mkdirp(cwd);
	write_template_files(options.template, options.name, cwd);
}

function getFiles(dirPath) {
	let files = [];

	const dirFiles = fs.readdirSync(dirPath, {withFileTypes: true});
	dirFiles.forEach((file) => {
		const name = file.name;
		if (fs.statSync(path.join(dirPath, name)).isDirectory()) {
			files = files.concat(getFiles(path.join(dirPath, name)));
		} else {
			files.push({name: path.join(dirPath, name)});
		}
	});

	return files;
}

/**
 * @param {string} template
 * @param {'typescript' | 'checkjs' | null} types
 * @param {string} name
 * @param {string} cwd
 */
function write_template_files(template, name, cwd) {
	const dir = dist(`templates/${template}`);
	copy(`${dir}/package.template.json`, `${cwd}/package.json`);

	const dirPath = `${dir}`;
	const files = getFiles(dirPath);
	files.forEach((file) => {
		const dest = path.join(cwd, file.name.replace(dirPath, ''));
		copy(file.name, dest);
	});

	const pkg = fs.readFileSync(`${cwd}/package.json`, 'utf-8');
	fs.writeFileSync(`${cwd}/package.json`, pkg.replace(/~TODO~/g, name));
	try {
		fs.rmSync(`${cwd}/.meta.json`);
	} catch (e) {}
}

export async function create(cwd) {
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

	await write(cwd, {
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
}
