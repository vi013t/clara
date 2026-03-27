import { invoke } from "@tauri-apps/api/core";
import type { ClaraPlugin } from "./plugin/index.svelte.ts";

import * as pluginModule from "./plugin/index.svelte";

async function loadPlugin(absolutePluginPath: string): Promise<ClaraPlugin<any> | null> {
	const isWindows = navigator.userAgent.includes("Windows");
	const scheme = isWindows ? "http://plugin.localhost/" : "plugin://localhost/";
	const sanitizedPath = absolutePluginPath.replace(/^\/+/, "");
	const moduleUrl = `${scheme}${sanitizedPath}`;

	try {
		const userPlugin = await import(`${moduleUrl}?t=${Date.now()}`);
		return userPlugin.default;
	} catch (error) {
		console.error(`Failed to load ES6 plugin at ${moduleUrl}:`, error);
		return Promise.resolve(null);
	}
}

/**
 * Plugins need to import from @clara/api.
 */
function createImportMap() {
	const isWindows = navigator.userAgent.includes("Windows");
	const scheme = isWindows ? "http://plugin.localhost/" : "plugin://localhost/";

	const map = document.createElement("script");
	map.type = "importmap";
	map.textContent = JSON.stringify({
		imports: {
			"@clara/api/plugin": `${scheme}virtual/plugin.js`,
			"@clara/api/": `${scheme}virtual/`,
		},
	});

	document.head.appendChild(map);
}

export async function loadPlugins() {
	(globalThis as any).__CLARA_API__ = {
		plugin: pluginModule,
	};

	createImportMap();

	const pluginNames = (await invoke<string[]>("get_plugins", {})).map(plugin => {
		let path = plugin;
		if (plugin.startsWith("\\\\?\\")) path = path.slice(4);
		path = path.replace(/\\/g, "/");
		return path;
	});

	console.log(`Loading plugins: ${pluginNames} (${pluginNames.length})`);

	const plugins = (await Promise.all(pluginNames.map(plugin => loadPlugin(plugin)))).filter(plugin => plugin !== null);

	plugins.forEach(plugin => {
		console.log(`Loaded plugin "${plugin.name}".`);
		plugin.onLoad?.({
			settings: {
				get() {
					return null!;
				},
			},
		});
	});
}
