const starlightPlugin = require('@astrojs/starlight-tailwind');


// Generated color palettes
const accent = {200: '#abd79d', 600: '#2f8000', 900: '#123d00', 950: '#0b2c00'};
const gray = {
	100: '#f2f7f9',
	200: '#e6f0f3',
	300: '#b9c4c8',
	400: '#7a9097',
	500: '#475c63',
	700: '#283c42',
	800: '#172a30',
	900: '#111a1c'
};


/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				// Your preferred accent color. Indigo is closest to Starlight’s defaults.
				accent,
				// Your preferred gray scale. Zinc is closest to Starlight’s defaults.
				gray
			},
		},
	},
	plugins: [starlightPlugin()],
};
