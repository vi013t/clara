import { defineConfig, type PluginOption } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import path from "path";
import apiJson from "../api/package.json";

const host = process.env.TAURI_DEV_HOST;

function platformPath(loc: string): string {
	return loc.replaceAll(/[\/\\]/g, path.sep);
}

export default defineConfig({
	plugins: [sveltekit()] as PluginOption[],
	clearScreen: false,
	resolve: {
		alias: Object.fromEntries(
			Object.entries(apiJson.exports).map(([importPath, { svelte }]) => [
				platformPath(importPath == "." ? "@clara/api" : `@clara/api/${/^\.\/(.+)/.exec(importPath)![1]}`),
				svelte.replace(/^.\/dist\//, platformPath("../api/src/")),
			]),
		),
		extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".svelte", ".svelte.ts"],
	},
	optimizeDeps: {
		exclude: ["@clara/api"],
	},
	server: {
		port: 1420,
		strictPort: true,
		host: host || false,
		fs: {
			allow: ["../api"],
		},
		watch: {
			ignored: ["**/src-tauri/**"],
		},
		hmr: host
			? {
					protocol: "ws",
					host,
					port: 1421,
				}
			: undefined,
	},
});
