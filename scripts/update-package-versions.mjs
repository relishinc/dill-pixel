import {readFileSync, writeFileSync} from 'fs';
import {glob} from 'glob';
import {dirname, resolve} from 'path';
import {fileURLToPath} from 'url';

// Resolve __dirname in ES6 module
const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(dirname(__filename), '../')

// Load the framework package.json to get the versions
const frameworkPackageJsonPath = resolve(__dirname, './packages/framework/package.json');
const frameworkPackageJson = JSON.parse(readFileSync(frameworkPackageJsonPath, 'utf8'));
const {version: dillPixelVersion, dependencies: {'pixi.js': pixiJsVersion}} = frameworkPackageJson;

// Function to update package.json files
function updatePackageJson(packageJsonPath) {
	const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
	if (packageJson.version) {
		packageJson.version = dillPixelVersion;
	}
	if (packageJson.dependencies) {
		if (packageJson.dependencies['pixi.js'] && !packageJson.dependencies['pixi.js']?.includes('workspace')) {
			packageJson.dependencies['pixi.js'] = pixiJsVersion;
		}
		if (packageJson.dependencies['dill-pixel'] && !packageJson.dependencies['dill-pixel']?.includes('workspace')) {
			packageJson.dependencies['dill-pixel'] = dillPixelVersion;
		}
	}
	if (packageJson.peerDependencies) {
		if (packageJson.peerDependencies['pixi.js']) {
			packageJson.peerDependencies['pixi.js'] = pixiJsVersion;
		}
		if (packageJson.peerDependencies['dill-pixel']) {
			packageJson.peerDependencies['dill-pixel'] = dillPixelVersion;
		}
	}

	writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
	console.log(`Updated ${packageJsonPath}`);
}

// Glob pattern to find package.json files
const globPattern = '{./packages/plugins/*/package.json,./packages/storage-adapters/*/package.json,./packages/examples/package.json,./packages/templates/*/package.json}';

function run() {
	const files = glob.sync(globPattern);
	files.forEach(updatePackageJson);
}

run();
