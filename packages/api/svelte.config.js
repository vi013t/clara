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
		alias: {
			...Object.fromEntries(
				Object.entries(apiJson.exports)
					.map(([importPath, exportConfig]) => {
						if (importPath == ".") return [];

						const key = platformPath(`@clara/api/${importPath.replace(/^\.\//, "")}`);
						const distPath = typeof exportConfig === "string" ? exportConfig : exportConfig.svelte;
						const sourcePath = distPath.replace(/^.\/dist\//, platformPath("./src/lib/")).replace(/\.js$/, ".ts");
						return [
							[key.replaceAll(/\\/g, "/"), path.resolve(sourcePath)],
							[key.replaceAll(/\//g, "\\"), path.resolve(sourcePath)],
						];
					})
					.flat(),
			),
			"@clara/api": path.resolve("./src/lib/index.svelte.ts"),
			"@clara\\api": path.resolve("./src/lib/index.svelte.ts"),
		},
		adapter: adapter(),
	},
};

export default config;
