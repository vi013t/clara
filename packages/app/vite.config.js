import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import path from "path";

const host = process.env.TAURI_DEV_HOST;

export default defineConfig({
	plugins: [sveltekit()],
	clearScreen: false,
	resolve: {
		alias: {
			api: path.resolve(__dirname, "../api/src"),
		},
	},
	server: {
		port: 1420,
		strictPort: true,
		host: host || false,
		fs: {
			allow: ["../api"],
		},
		hmr: host
			? {
					protocol: "ws",
					host,
					port: 1421,
				}
			: undefined,
		watch: {
			ignored: ["**/src-tauri/**"],
		},
	},
});
