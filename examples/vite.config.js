import path from "path";
import {defineConfig} from "vite";
import {createHtmlPlugin} from "vite-plugin-html"
import {viteStaticCopy} from "vite-plugin-static-copy";
import topLevelAwait from "vite-plugin-top-level-await";
import wasm from "vite-plugin-wasm";

export default defineConfig((config) => ({
	...config,
	build: {
		outDir: "../dist",
		cssMinify: true,
		emptyOutDir: true,
		manifest: true,
	},
	logLevel: "info",
	root: "src",
	base: process.env.NODE_ENV === "development" ? "/" : "/",
	server: {
		port: 3000,
		host: true,
	},
	preview: {
		host: true,
		port: 8080,
	},
	plugins: [
		wasm(),
		topLevelAwait(),
		createHtmlPlugin(),
		viteStaticCopy({
			watch: true,
			targets: [
				{
					src: "assets/images/spritesheets/_output/*",
					dest: "assets/images/spritesheets",
					globOptions: {dot: false},
				},
				{
					src: "assets/images/static/**/*",
					dest: "assets/images/static",
					globOptions: {dot: false},
				},
				{
					src: "assets/audio/output/**/*",
					dest: "assets/audio",
					globOptions: {dot: false},
				},
				{
					src: "assets/fonts/**/*",
					dest: "assets/fonts",
					globOptions: {dot: false, ignore: ["**/*.bmfc"]},
				},
				{
					src: "assets/json/**/*",
					dest: "assets/json",
					globOptions: {dot: false, ignore: ["**/*.ogmo"]},
				},
			],
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"html-living-framework": path.resolve(__dirname, "../src"),
		},
	},
}));
