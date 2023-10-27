import fs from 'node:fs';
import path from 'node:path';
import {copy, dist, mkdirp} from './utils.mjs';

/** @type {import('./types/index').create} */
export async function create(cwd, options) {
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
