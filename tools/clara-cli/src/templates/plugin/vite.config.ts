import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
	plugins: [sveltekit()],
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
