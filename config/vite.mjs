import path from 'node:path';
import process from 'node:process';
import {mergeConfig} from 'vite';
import {createHtmlPlugin} from 'vite-plugin-html';
import topLevelAwait from 'vite-plugin-top-level-await';

const env = process.env.NODE_ENV;
const cwd = process.cwd();

const defaultConfig = {
	cacheDir: '.cache',
	logLevel: 'info',
	base: env === 'development' ? '/' : './',
	server: {
		port: 3000,
		host: true,
		open: true,
	},
	preview: {
		host: true,
		port: 8080,
	},
	plugins: [
		topLevelAwait(),
		createHtmlPlugin(),
	],
	resolve: {
		alias: {
			'@': path.resolve(cwd, './src'),
		},
	},
	define: {
		__APP_VERSION__: JSON.stringify(process.env.npm_package_version),
	},
};

function extendConfig(userConfig = {}) {
	return mergeConfig(defaultConfig, userConfig);
}

export {defaultConfig, extendConfig};
