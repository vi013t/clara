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
		alias: {
			...Object.fromEntries(
				Object.entries(apiJson.exports)
					.map(([importPath, exportConfig]) => {
						if (importPath == ".") return [];

						const key = platformPath(`@clara/api/${importPath.replace(/^\.\//, "")}`);
						const distPath = typeof exportConfig === "string" ? exportConfig : exportConfig.svelte;
						const sourcePath = distPath.replace(/^.\/dist\//, platformPath("../api/src/lib/")).replace(/\.js$/, ".ts");
						return [
							[key.replaceAll(/\\/g, "/"), path.resolve(sourcePath)],
							[key.replaceAll(/\//g, "\\"), path.resolve(sourcePath)],
						];
					})
					.flat(),
			),
			"@clara/api": path.resolve("../api/src/lib/index.svelte.ts"),
			"@clara\\api": path.resolve("../api/src/lib/index.svelte.ts"),
		},
	},
};

export default config;
