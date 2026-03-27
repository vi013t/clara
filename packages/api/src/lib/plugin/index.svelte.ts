type Setting<Name extends string> = {
	name: Name;
};

type Settings<Names extends string> = {
	get(name: Names): Setting<Names>;
};

type WallflowerPlugin<SettingNames extends string> = {
	name: string;
	description: string;
	settings: Setting<SettingNames>[];
	init(info: PluginInfo<SettingNames>): void;
};

type PluginInfo<SettingNames extends string> = {
	files: string;
	settings: Settings<SettingNames>;
};

export function plugin<const SettingNames extends string>(plugin: WallflowerPlugin<SettingNames>): void {}
