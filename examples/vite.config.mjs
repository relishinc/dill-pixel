import {extendConfig} from '@relish-studios/dill-pixel/vite';
import path from 'node:path';


export default extendConfig({
	build: {
		target: 'es2020',
	},
	optimizeDeps: {
		include: ['@pixi/spine-pixi'],
	},
	resolve: {
		alias: {
			'@relish-studios/dill-pixel': path.resolve(__dirname, '../src'),
		},
	},
	define: {
		__APP_VERSION__: JSON.stringify(process.env.npm_package_version),
	},
});
