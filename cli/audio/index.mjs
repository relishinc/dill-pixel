import fs from 'node:fs';
import path from 'node:path';
import {execPromise, walkDir} from './utils.mjs';

const SOURCE_DIR = 'source';
const OUTPUT_DIR = 'output';

/**
 * @param {string} file
 * @returns {Promise<Awaited<unknown>[]>}
 */
async function compressFile(file) {
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

async function normalizeAndCompressFile(filePath) {
	let outDir = path.dirname(filePath).replace(SOURCE_DIR, OUTPUT_DIR);
	let outFile = path.join(outDir, path.basename(filePath)).replace(/\.\w+$/, '');

	// First pass to analyze the audio and get normalization parameters
	const analyzeCmd = `ffmpeg -i "${filePath}" -af loudnorm=I=-23:LRA=7:TP=-2:print_format=json -f null -`;

	return execPromise(analyzeCmd).then((result) => {
		const {stderr} = result;
		const loudnessInfoIndex = stderr.split('\n').findIndex(line => line.startsWith('[Parsed_loudnorm'));
		let loudnessInfo = stderr.split('\n').slice(loudnessInfoIndex);
		loudnessInfo.pop();
		loudnessInfo.shift();
		loudnessInfo = loudnessInfo.map(line => line.trim()).join('\n');

		const normalizationParams = JSON.parse(loudnessInfo);

		// Handle the case where loudness analysis fails (e.g., silent or too short files)
		if (normalizationParams.input_i === '-inf') {
			// Handle the case where loudness analysis fails (e.g., silent or too short files)
			console.warn(`Loudness analysis failed for file: ${filePath}. Skipping normalization.`);
			return;
		}

		// Second pass to normalize and compress the audio
		const normalizeCmd = execPromise(`ffmpeg -i "${filePath}" -y -c:a libmp3lame -b:a 128k -ac 1 -af "loudnorm=I=-23:LRA=7:TP=-2:measured_I=${normalizationParams.input_i}:measured_LRA=${normalizationParams.input_lra}:measured_TP=${normalizationParams.input_tp}:measured_thresh=${normalizationParams.input_thresh}:offset=${normalizationParams.target_offset}" "${outFile}.mp3"`)

		const normalizeCmd2 = execPromise(`ffmpeg -i "${filePath}" -y -c:a libvorbis -q:a 1 -ac 1 -af "loudnorm=I=-23:LRA=7:TP=-2:measured_I=${normalizationParams.input_i}:measured_LRA=${normalizationParams.input_lra}:measured_TP=${normalizationParams.input_tp}:measured_thresh=${normalizationParams.input_thresh}:offset=${normalizationParams.target_offset}" "${outFile}.webm"`)


		return Promise.all([normalizeCmd, normalizeCmd2]);
	})
}

/**
 * Compresses audio files in a directory.
 * @param dir
 * @param normalize
 * @returns {Promise<*[]>}
 */
export async function compress(dir, normalize = false) {
	const sourceDir = path.join(dir, SOURCE_DIR);
	if (!fs.existsSync(sourceDir)) {
		return new Promise((resolve, reject) => {
			reject(`No source directory found at ${sourceDir}`);
		})
	}

	if (normalize) {
		console.log('Normalizing audio...');
		return walkDir(sourceDir, normalizeAndCompressFile);
	}

	console.log('Compressing audio...');
	return walkDir(sourceDir, compressFile);
}

