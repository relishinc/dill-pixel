import {parse} from 'csv-parse/sync';
import {bgGreen, bold, green, white} from 'kleur/colors';
import {exec} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {walkDir} from './utils.mjs';


const durations = {};
const captions = {};

async function readDurations(dir) {
	const files = [];
	const outputDir = path.join(dir, 'output');
	if (!fs.existsSync(outputDir)) {
		return Promise.reject(`Output directory not found at "${outputDir}". Please run \`dill-pixel audio compress\` first.`);
	}
	walkDir(path.join(dir, 'output'), file => {
		if (/\.(wav|mp3)$/i.test(file)) {
			files.push(file);
		}
	});
	await Promise.all(files.map(file => new Promise((resolve, reject) => {
		exec(`ffprobe -v quiet -print_format compact=print_section=0:nokey=1:escape=csv -show_entries format=duration "${file}"`, (e, duration) => {
			duration = parseInt((parseFloat(duration) * 1000).toFixed(0));
			const name = path.basename(file).replace(/\.(wav|mp3)$/, '');
			durations[name] = duration;
			console.log(bold(bgGreen(white('[Get Duration]'))), green(name), white(duration));
			resolve();
		});
	})));
}

async function readCaptions(dir) {
	const captionsDir = path.join(dir, 'captions');

	if (!fs.existsSync(captionsDir)) {
		return Promise.reject(`Captions directory not found. Please create a captions directory at "${captionsDir}", and add your captions CSV files.`)
	}

	for (const csvFileName of fs.readdirSync(captionsDir)) {
		if (path.extname(csvFileName) !== '.csv') {
			continue;
		}
		const csvFile = path.join(captionsDir, csvFileName);
		console.log(bold(bgGreen(white('[Read CSV]'))), green(csvFile));
		const csv = parse(fs.readFileSync(csvFile, {encoding: 'utf-8'}), {
			comment: '#'
		});
		const sectionColumn = csv[0].reduce((a, t, i) => t === 'Section' ? i : a, -1);
		const fileColumn = csv[0].reduce((a, t, i) => t === 'FILENAME' || t === 'File Name' ? i : a, -1);
		const textColumn = csv[0].reduce((a, t, i) => t === 'LINE' || t === 'VO Line' ? i : a, -1);
		const startOffsetColumn = csv[0].indexOf('START_OFFSET');
		const endOffsetColumn = csv[0].indexOf('END_OFFSET');

		function processRow(file, row) {
			const duration = durations[file];
			const text = normalizeText(row[textColumn]);
			if (file && text && duration && !captions[file]) {
				const lines = text.split('--').map(it => normalizeText(it)).filter(it => !!it);
				fixSpecialCases(file, lines);
				if (lines.length > 0) {
					let start = 0;
					const length = lines.reduce((a, t) => a + t.length, 0);
					captions[file] = [];
					for (const line of lines) {
						const end = start + line.length;
						const startOffset = parseInt(row[startOffsetColumn] || 0);
						const endOffset = parseInt(row[endOffsetColumn] || 0);
						captions[file].push({
							content: `<p>${line}</p>`,
							start: Math.round(duration * start / length) + startOffset,
							end: Math.round(duration * end / length) + endOffset
						});
						start = end;
					}
				} else {
					captions[file] = [{content: `<p>${text}</p>`, start: 0, end: duration}];
				}
				console.log(`\t${bold(bgGreen(white(`[Generate CC]`)))}`, green(file));
				for (const cc of captions[file]) {
					console.log('\t\t', cc.start, cc.end, cc.content);
				}
			}
		}
	}
}

function normalizeText(text) {
	text = text ?? '';
	text = text.replace(/^\s+/, '');
	text = text.replace(/\s+$/, '');
	text = text.replace(/(\s*)–(\s*)/ig, '$1-$2');
	text = text.replace(/’/ig, '\'');
	text = text.replace(/“/ig, '"');
	text = text.replace(/”/ig, '"');
	text = text.replace(/…/ig, '...');
	text = text.replace(/^--/ig, '');
	text = text.replace(/--$/ig, '');
	return text;
}

async function writeCaptions(outputDir) {
	console.log(bold(bgGreen(white('[Writing Captions]'))), green(outputDir));
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, {recursive: true});
	}
	fs.writeFileSync(`${outputDir}/cc.json`, JSON.stringify(captions, null, 2), {encoding: 'utf-8'});
}

function fixSpecialCases(file, lines) {
	switch (file) {
		case 'anim-03-c':
			lines.pop();
			break;
	}
}

export async function generateCaptions(dir, outputDir = dir) {
	return readDurations(dir).then(() => readCaptions(dir)).then(() => writeCaptions(outputDir))
}
