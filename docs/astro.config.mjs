import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import {defineConfig} from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: "http://hlf.reli.sh/docs",
	base: "/docs",
	integrations: [
		starlight({
			title: 'dill pixel',
			social: {
				github: 'https://github.com/relishinc/dill-pixel',
			},
			sidebar: [
				{
					label: 'Guides',
					items: [
						{label: 'Setup Guide', link: '/guides/setup/'},
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
