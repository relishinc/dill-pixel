import {extendConfig} from 'dill-pixel/config/vite';
import path from 'node:path';

export default extendConfig({
	resolve: {
		alias: {
			'dill-pixel': path.resolve(__dirname, '../framework'),
			'@dill-pixel/plugin-snap-physics': path.resolve(__dirname, '../plugins/physics-snap'),
			'@dill-pixel/plugin-arcade-physics': path.resolve(__dirname, '../plugins/physics-arcade'),
			'@dill-pixel/plugin-matter-physics': path.resolve(__dirname, '../plugins/physics-matter'),
			'@dill-pixel/plugin-rive': path.resolve(__dirname, '../plugins/rive'),
			'@dill-pixel/storage-adapter-firebase': path.resolve(__dirname, '../storage-adapters/firebase'),
		}
	},
});
