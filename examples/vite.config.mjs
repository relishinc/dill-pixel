import {extendConfig} from 'dill-pixel/config/vite';
import path from 'node:path';

export default extendConfig({
	resolve: {
		alias: {
			'dill-pixel': path.resolve(__dirname, '../src'),
			'@dill-pixel/plugin-snap-physics': path.resolve(__dirname, '../packages/plugins/physics/snap/src'),
			'@dill-pixel/plugin-arcade-physics': path.resolve(__dirname, '../packages/plugins/physics/arcade/src'),
			'@dill-pixel/plugin-matter-physics': path.resolve(__dirname, '../packages/plugins/physics/matter/src'),
		}
	},
});
