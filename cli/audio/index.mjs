import fs from 'node:fs';
import path from 'node:path';
import {execPromise, walkDir} from './utils.mjs';

const SOURCE_DIR = 'source';
const OUTPUT_DIR = 'output';

/**
 * @param {string} file
 * @returns {Promise<Awaited<unknown>[]>}
 */
function compressFile(file) {
	if (/\.(wav|m4a|mp3|ogg)$/i.test(file)) {
		let outDir = path.dirname(file).replace(SOURCE_DIR, OUTPUT_DIR);
		let outFile = path.join(outDir, path.basename(file)).replace(/\.\w+$/, '');

		if (!fs.existsSync(outDir)) {
			fs.mkdirSync(outDir);
		}

		const p1 = execPromise(`ffmpeg -i "${file}" -y -c:a libvorbis -q:a 1 -ac 1 "${outFile}.webm"`)
		const p2 = execPromise(`ffmpeg -i "${file}" -y -c:a libmp3lame -b:a 128k -ac 1 "${outFile}.mp3"`)

		return Promise.all([p1, p2]);
	}
}

/**
 * Compresses audio files in a directory.
 * @param dir
 * @returns {Promise<*[]>}
 */
export async function compress(dir) {
	const sourceDir = path.join(dir, SOURCE_DIR);
	if (!fs.existsSync(sourceDir)) {
		return new Promise((resolve, reject) => {
			console.error(`No source directory found at ${sourceDir}`);
			reject();
		})
	}
	return walkDir(sourceDir, compressFile);
}

