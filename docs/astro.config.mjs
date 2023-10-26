import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import {defineConfig} from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: "http://hlf.reli.sh/docs",
	base: "/docs",
	integrations: [
		starlight({
			title: 'Dill Pixel',
			social: {
				github: 'https://github.com/relishinc/dill-pixel',
			},
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{label: 'Setup Guide', link: '/docs/guides/setup/'},
					],
				},
				{
					label: 'Reference',
					autogenerate: {directory: 'reference'},
				},
			],
			customCss: ['./src/tailwind.css', './src/custom.css'],
		}),
		tailwind({applyBaseStyles: false}),
	],
});
