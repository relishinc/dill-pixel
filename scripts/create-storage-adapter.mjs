#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import {fileURLToPath} from 'url';

// Utility functions
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cwd = process.cwd();

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const toCamelCase = (str, capitalize = false) => {
	const camelCaseStr = str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
	return capitalize ? camelCaseStr.charAt(0).toUpperCase() + camelCaseStr.slice(1) : camelCaseStr;
};

const copyAndRenameFiles = (srcDir, destDir, pluginName) => {
	const files = fs.readdirSync(srcDir);

	files.forEach(file => {
		const srcFilePath = path.join(srcDir, file);
		let destFileName = file.replace('.template', '');
		if (file === 'StorageAdapter.template.ts') {
			destFileName = `${toCamelCase(pluginName, true)}Adapter.ts`;
		}

		const destFilePath = path.join(destDir, destFileName);

		if (fs.lstatSync(srcFilePath).isDirectory()) {
			if (!fs.existsSync(destFilePath)) {
				fs.mkdirSync(destFilePath);
			}
			copyAndRenameFiles(srcFilePath, destFilePath, pluginName);
		} else {
			const data = fs.readFileSync(srcFilePath, 'utf8');
			fs.writeFileSync(destFilePath, data, 'utf8');
		}
	});
};

const replacePlaceholders = (dir, pluginName) => {
	const files = fs.readdirSync(dir);

	files.forEach(file => {
		const filePath = path.join(dir, file);
		if (fs.lstatSync(filePath).isDirectory()) {
			replacePlaceholders(filePath, pluginName);
		} else {
			let data = fs.readFileSync(filePath, 'utf8');
			data = data.replace(/~pluginName~/g, toCamelCase(pluginName));
			data = data.replace(/~PluginName~/g, toCamelCase(pluginName, true));
			data = data.replace(/~PLUGIN_NAME~/g, pluginName.toUpperCase());
			data = data.replace(/@pluginName/g, pluginName);
			fs.writeFileSync(filePath, data, 'utf8');
		}
	});
};

const clearDirectory = (dir) => {
	fs.readdirSync(dir).forEach(file => {
		const filePath = path.join(dir, file);
		if (fs.lstatSync(filePath).isDirectory()) {
			clearDirectory(filePath);
			fs.rmdirSync(filePath);
		} else {
			fs.unlinkSync(filePath);
		}
	});
};

const promptOverwrite = (pluginPath) => {
	return new Promise((resolve) => {
		rl.question(`The directory ${pluginPath} already exists. Do you want to overwrite it? (yes/no) `, (answer) => {
			resolve(answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y');
		});
	});
};

rl.question('Enter storage adapter name: ', async (pluginName) => {
	const pluginPath = path.join(cwd, `./packages/storage-adapters/${pluginName}`);

	if (fs.existsSync(pluginPath)) {
		const overwrite = await promptOverwrite(pluginPath);
		if (!overwrite) {
			console.log('Operation cancelled.');
			rl.close();
			return;
		}
		clearDirectory(pluginPath);
	}

	if (!fs.existsSync(pluginPath)) {
		fs.mkdirSync(pluginPath, {recursive: true});
	}

	copyAndRenameFiles(path.join(cwd, './packages/framework/templates/storage-adapter'), pluginPath, pluginName);
	replacePlaceholders(pluginPath, pluginName);

	rl.close();
	console.log(`The Storage Adapter: ${pluginName} was created successfully.`);
});
