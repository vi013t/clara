import { Group } from "../data/database.svelte.ts";
import { invoke } from "@tauri-apps/api/core";
import type { Theme } from "./theme.svelte.ts";
import { assignedLater, type Serialize } from "../util/index.svelte.ts";
import { type ClaraPlugin } from "../plugin/index.svelte.ts";
import { Template, type SerializedTemplate } from "@clara/api/project";
import { getIcon, Tab, TabList } from "@clara/api/ui";
import { pressHotkey, runAction, type ActionName, type Keybinding, key } from "./action.svelte.ts";

export { pressHotkey, runAction, key };

export type { ActionName, Keybinding };

type SerializedUserSettings = { templates: SerializedTemplate[]; themes: Theme[]; selectedTheme: string };

class UserSettings implements Serialize<SerializedUserSettings> {
	private templates_ = $state(assignedLater<Template[]>());
	private themes_ = $state(assignedLater<Theme[]>());
	private selectedTheme_ = $state(assignedLater<string>());
	private plugins_: ClaraPlugin<any>[] = $state([]);
	public autosave = $state(true);
	public hotkeys: { [Key in ActionName]?: Keybinding } = $state({
		"New Tab": key("n", "ctrl"),
		"Save Project": key("s", "ctrl"),
	});

	public constructor() {
		let tablist = new TabList([new Tab(getIcon("StickyNote"))]);
		let database = new Group({
			name: "Blank",
			icon: "StickyNote",
			description: "A blank project with no datasets.",
		});
		this.templates_ = [
			new Template({
				database,
				layout: { split: "none", tabline: tablist, selectedTabID: 0 },
				pinnedGroups: [database],
			}),
		];
		this.themes_ = [];
		this.selectedTheme_ = "";
	}

	public addTheme(theme: Theme): void {
		this.themes_.push(theme);
	}

	public addPlugin(plugin: ClaraPlugin<any>): void {
		this.plugins_.push(plugin);
	}

	public get themes(): readonly Theme[] {
		return this.themes_;
	}

	public get plugins(): ClaraPlugin<any>[] {
		return this.plugins_;
	}

	public get selectedTheme(): Theme {
		return this.themes.find(theme => theme.name === this.selectedTheme_)!;
	}

	public selectTheme(name: string): void {
		this.selectedTheme_ = name;
		if (!document) return;
		document.querySelector("[data-theme]")?.remove();

		let style = document.createElement("style");
		style.innerHTML = this.selectedTheme.css;
		document.head.appendChild(style);
	}

	public get templates(): readonly Template[] {
		return this.templates_;
	}

	public addTemplate(template: Template): void {
		this.templates_.push(template);
	}

	public serialize(): SerializedUserSettings {
		return {
			templates: this.templates_.map(template => template.serialize()),
			themes: this.themes_,
			selectedTheme: this.selectedTheme_,
		};
	}
}

let storedUserData: UserSettings | null = $state(null);

export function userSettings(): UserSettings {
	if (!storedUserData) storedUserData = new UserSettings();
	return storedUserData;
}

export async function saveUserSettings() {
	await invoke("save_user_data", { data: userSettings().serialize() });
}

export type SessionData = {
	lastProjectPath: string | null;
	projectsDirPath: string | null;
};

let sessionData: SessionData = $state(loadSessionData());

function loadSessionData(): SessionData {
	return JSON.parse(
		localStorage.getItem("session-data") ??
			JSON.stringify({
				lastProjectPath: null,
				projectsDirPath: null,
			}),
	);
}

function saveSessionData() {
	localStorage.setItem("session-data", JSON.stringify(sessionData));
}

export function cache(values: Partial<SessionData>) {
	sessionData = { ...sessionData, ...values };
	saveSessionData();
}

export function getFromCache<Key extends keyof SessionData>(key: Key): SessionData[Key] {
	return sessionData[key];
}
