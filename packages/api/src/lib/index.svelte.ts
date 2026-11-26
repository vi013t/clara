import { invoke } from "@tauri-apps/api/core";
import { corePlugins, type ClaraPlugin } from "./plugin/index.svelte.ts";

import { attachPluginData, importMap } from "./plugin_loader.svelte.ts";
import { userSettings } from "./usersettings/index.svelte.ts";

async function loadPlugin(absolutePluginPath: string): Promise<ClaraPlugin<string, string> | null> {
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

let currentPlugin: ClaraPlugin<string, string> | null = $state(null);

export function currentPluginBeingLoaded() {
	return currentPlugin;
}

function startPlugin(plugin: ClaraPlugin<string, string>) {
	console.log(`Loaded plugin "${plugin.name}".`);
	currentPlugin = plugin;
	userSettings().addPlugin(plugin);
	plugin.onLoad?.({
		settings: {
			get() {
				return null!;
			},
		},
	});
	currentPlugin = null;
}

async function loadPlugins(): Promise<ClaraPlugin<string, string>[]> {
	const pluginNames = (await invoke<string[]>("get_plugins", {})).map(plugin => {
		let path = plugin;
		if (plugin.startsWith("\\\\?\\")) path = path.slice(4);
		path = path.replace(/\\/g, "/");
		return path;
	});

	console.log(`Loading plugins: ${pluginNames} (${pluginNames.length})`);
	const plugins = (await Promise.all(pluginNames.map(plugin => loadPlugin(plugin)))).filter(plugin => plugin !== null);
	plugins.forEach(plugin => startPlugin(plugin));
	return plugins;
}

function loadCorePlugins() {
	corePlugins.forEach(plugin => startPlugin(plugin));
	userSettings().selectTheme(userSettings().themes[0].name);
}

let allPlugins: ClaraPlugin<string, string>[] = $state([]);

export async function startPlugins() {
	loadCorePlugins();
	attachPluginData();
	createImportMap();
	allPlugins = await loadPlugins();
}

export function plugins() {
	return allPlugins;
}
