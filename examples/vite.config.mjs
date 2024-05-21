import {extendConfig} from 'dill-pixel/config/vite';


export default extendConfig({
	define: {
		__APP_VERSION__: JSON.stringify(process.env.npm_package_version),
	},
});
