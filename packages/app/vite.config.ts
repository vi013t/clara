import { defineConfig, type PluginOption } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import path from "path";

const host = process.env.TAURI_DEV_HOST;

export default defineConfig({
	plugins: [sveltekit()] as PluginOption[],
	clearScreen: false,
	optimizeDeps: {
		exclude: ["@clara/api"],
	},
	server: {
		port: 1420,
		strictPort: true,
		host: host || false,
		fs: {
			allow: [path.resolve("../api")],
		},
		watch: {
			ignored: ["**/src-tauri/**", "!**/node_modules/@clara/api/**", "!**/packages/api/**"],
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
