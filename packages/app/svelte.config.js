import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import path from "path";
import apiJson from "../api/package.json" with { type: "json" };

function platformPath(loc) {
	return loc.replaceAll(/[\/\\]/g, path.sep);
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			fallback: "index.html",
		}),
		alias: Object.fromEntries(
			Object.entries(apiJson.exports).map(([importPath, { svelte }]) => [
				platformPath(importPath == "." ? "@clara/api" : `@clara/api/${/^\.\/(.+)/.exec(importPath)[1]}`),
				svelte.replace(/^.\/dist\//, platformPath("../api/src/lib/")),
			]),
		),
	},
};

export default config;
