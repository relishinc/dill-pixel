import {compressJpg, compressPng} from '@assetpack/plugin-compress';
import {audio} from '@assetpack/plugin-ffmpeg';
import {json} from '@assetpack/plugin-json';
import {pixiManifest} from '@assetpack/plugin-manifest';
import {mipmap, spineAtlasMipmap} from '@assetpack/plugin-mipmap';
import {pixiTexturePacker} from '@assetpack/plugin-texture-packer';
import {webfont} from '@assetpack/plugin-webfont';
import path from 'node:path';
import process from 'node:process';

const cwd = process.cwd();

export default {
	entry: path.resolve(cwd, './assets'),
	output: path.resolve(cwd, './public'),
	cache: false,
	plugins: {
		webfont: webfont(),
		compressJpg: compressJpg(),
		compressPng: compressPng(),
		audio: audio(),
		json: json(),
		texture: pixiTexturePacker({
			texturePacker: {
				removeFileExtension: true,
			},
		}),
		manifest: pixiManifest({
			output: path.resolve(cwd, './src/assets.json'),
			createShortcuts: true,
			
		}),
		mipmap: mipmap(),
		spine: spineAtlasMipmap(),
	},
};
