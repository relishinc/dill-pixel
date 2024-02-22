import {extendConfig} from 'dill-pixel/vite';
import path from 'path';

export default extendConfig({
	resolve: {
		alias: {
			'dill-pixel': path.resolve(__dirname, '../src')
		}
	}
});
