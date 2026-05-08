import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
	plugins: [svelte()],
	build: {
		lib: {
			entry: resolve(__dirname, "src/lib/index.ts"),
			name: "ClaraPlugin",
			formats: ["es"],
			fileName: "main",
		},
		rollupOptions: {
			external: [/^@clara\/api\/.*/],
		},
		outDir: "dist",
		emptyOutDir: true,
	},
});
