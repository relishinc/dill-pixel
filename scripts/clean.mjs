import fs from 'node:fs';
import path from 'node:path';

function deleteFilesWithExtensions(dirPath, extensions) {
	if (!fs.existsSync(dirPath)) {
		console.log(`Directory ${dirPath} does not exist.`);
		return;
	}

	const files = fs.readdirSync(dirPath);

	for (let i = 0; i < files.length; i++) {
		const filePath = path.join(dirPath, files[i]);
		const stat = fs.statSync(filePath);

		if (stat.isDirectory()) {
			deleteFilesWithExtensions(filePath, extensions);
		} else if (extensions.some((ext) => filePath.endsWith(ext))) {
			fs.unlinkSync(filePath);
			console.log(`Deleted file ${filePath}`);
		}
	}
}

let dirPath = './src'; // replace this with the directory you want to clean
let extensions = ['.d.ts', '.map']; // the file extensions you want to delete

// check args for --dir and --extensions
const args = process.argv.slice(2);
const dirIndex = args.indexOf('--dir');
const extIndex = args.indexOf('--extensions');

if (dirIndex !== -1) {
	dirPath = args[dirIndex + 1];
}

if (extIndex !== -1) {
	extensions = args.slice(extIndex + 1);
}

console.log(`Cleaning directory ${dirPath} of files with extensions ${extensions}`);

deleteFilesWithExtensions(dirPath, extensions);
