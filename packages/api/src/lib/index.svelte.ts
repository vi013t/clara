import { invoke } from "@tauri-apps/api/core";
import type { ClaraPlugin } from "./plugin/index.svelte.ts";

import { attachPluginData, importMap } from "./plugin_loader.svelte.ts";

async function loadPlugin(absolutePluginPath: string): Promise<ClaraPlugin<any> | null> {
	const isWindows = navigator.userAgent.includes("Windows");
	const scheme = isWindows ? "http://plugin.localhost/" : "plugin://localhost/";
	const sanitizedPath = absolutePluginPath.replace(/^\/+/, "");
	const moduleUrl = `${scheme}${sanitizedPath}`;

	try {
		const userPlugin = await import(/* @vite-ignore */ `${moduleUrl}?t=${Date.now()}`);
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
	const map = document.createElement("script");
	map.type = "importmap";
	map.textContent = JSON.stringify({
		imports: importMap,
	});

	document.head.appendChild(map);
}

async function loadPlugins() {
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

export async function startPlugins() {
	attachPluginData();
	createImportMap();
	loadPlugins();
}
