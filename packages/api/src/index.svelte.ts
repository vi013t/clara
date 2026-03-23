export type PluginMetadata = {
	name: string;
	description: string;
	author: string;
};

export type TemplatesPlugin = {
	// templates: Database[];
} & PluginMetadata;

export function templatesPlugin(plugin: TemplatesPlugin) {}
export function themePlugin(plugin: TemplatesPlugin) {}
export function plugin(plugin: TemplatesPlugin) {}
