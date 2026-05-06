import adapter from "@sveltejs/adapter-auto";
import { relative, sep } from "node:path";
import apiJson from "./package.json" with { type: "json" };
import path from "path";

function platformPath(loc) {
	return loc.replaceAll(/[\/\\]/g, path.sep);
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		runes: ({ filename }) => {
			const relativePath = relative(import.meta.dirname, filename);
			const pathSegments = relativePath.toLowerCase().split(sep);
			const isExternalLibrary = pathSegments.includes("node_modules");
			return isExternalLibrary ? undefined : true;
		},
	},
	kit: {
		alias: Object.fromEntries(
			Object.entries(apiJson.exports).map(([importPath, { svelte }]) => [
				platformPath(importPath == "." ? "@clara/api" : `src/lib/${/^\.\/(.+)/.exec(importPath)[1]}`),
				svelte.replace(/^.\/dist\//, platformPath("/src/lib")),
			]),
		),
		adapter: adapter(),
	},
};

export default config;
