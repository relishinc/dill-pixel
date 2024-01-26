import {exec} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Logs the output of an exec command.
 * @param err
 * @param stdout
 * @param stderr
 */
export function logExec(err, stdout, stderr) {
	console.log(stdout);
	console.error(err);
	console.error(stderr);
}

/**
 * Executes a command and returns a promise.
 * @param command
 * @returns {Promise<unknown>}
 */
export function execPromise(command) {
	return new Promise((resolve, reject) => {
		exec(command, (err, stdout, stderr) => {
			logExec(err, stdout, stderr);
			if (err) {
				reject(err);
			}
			resolve();
		});
	})
}


/**
 * Walks a directory and executes a callback on each file.
 * @param dir
 * @param callback
 * @param promises
 * @returns {*[]}
 */
export function walkDir(dir, callback, promises = []) {
	const files = fs.readdirSync(dir);
	for (let i = 0; i < files.length; i++) {
		const f = files[i];
		let dirPath = path.join(dir, f);
		let isDirectory = fs.statSync(dirPath).isDirectory();
		if (isDirectory) {
			walkDir(dirPath, callback, promises);
		} else {
			promises.push(callback(path.join(dir, f)));
		}
	}
	return promises;
}

