import { invoke } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-dialog";
import { Group, type Database, type SerializedDatabase } from "./data/database.svelte";
import type { Serialize } from "./util/serialize.svelte";
import { assignedLater } from "./util/index.svelte";
import { cache, userSettings } from "./usersettings/index.svelte.ts";
import { TabList, type SerializedTabList } from "./ui/tab.svelte.js";
import { notify } from "./components/index.svelte.ts";
import { Randomizer, randomizers, type SerializedRandomizer } from "@clara/api/random";

export type PaneLayout = SinglePane | MultiPane;

export type SinglePane = {
	split: "none";
	tabline: TabList;
	selectedTabID: number;
};

export type MultiPane = {
	split: "horizontal" | "vertical";
	percent: number;
	panes: [PaneLayout, PaneLayout];
};

export type SerializedSinglePane = {
	split: "none";
	tabline: SerializedTabList;
	selectedTabID: number;
};

export type SerializedMultPane = {
	split: "horizontal" | "vertical";
	percent: number;
	panes: [SerializedPaneLayout, SerializedPaneLayout];
};

export type SerializedPaneLayout = SerializedSinglePane | SerializedMultPane;

function serializePaneLayout(layout: PaneLayout): SerializedPaneLayout {
	if (layout.split === "none") {
		return {
			split: "none",
			tabline: layout.tabline.serialize(),
			selectedTabID: layout.selectedTabID,
		};
	}

	return {
		split: layout.split,
		percent: layout.percent,
		panes: [serializePaneLayout(layout.panes[0]), serializePaneLayout(layout.panes[1])],
	};
}

function deserializePaneLayout(layout: SerializedPaneLayout): PaneLayout {
	if (layout.split === "none") {
		return {
			split: "none",
			tabline: TabList.deserialize(layout.tabline),
			selectedTabID: layout.selectedTabID,
		};
	}

	return {
		split: layout.split,
		percent: layout.percent,
		panes: [deserializePaneLayout(layout.panes[0]), deserializePaneLayout(layout.panes[1])],
	};
}

export type SerializedTemplate = {
	database: SerializedDatabase;
	layout: SerializedPaneLayout;
	pinnedGroups: number[];
	randomizers: SerializedRandomizer[];
};

export class Template implements Serialize<SerializedTemplate> {
	public database: Database = $state(assignedLater());
	public layout: PaneLayout = $state(assignedLater());
	public pinnedGroups: Group[] = $state([]);
	public randomizers: Randomizer[] = $state([]);

	public constructor({
		database,
		layout,
		pinnedGroups,
		randomizers = [],
	}: {
		layout: PaneLayout;
		database: Database;
		pinnedGroups: Group[];
		randomizers?: Randomizer[];
	}) {
		this.database = database;
		this.layout = layout;
		this.pinnedGroups = pinnedGroups;
		this.randomizers = randomizers;
	}

	public serialize(): SerializedTemplate {
		return {
			database: this.database.serialize(),
			layout: serializePaneLayout(this.layout),
			pinnedGroups: this.pinnedGroups.map(group => group.id),
			randomizers: this.randomizers.map(randomizer => randomizer.serialize()),
		};
	}

	public clone(): Template {
		const database = this.database.clone();

		let oldGroups = this.database.dfsGroups();
		let newGroups = database.dfsGroups();

		const pinnedGroups = [];
		for (let index = 0; index < oldGroups.length; index++) {
			let oldGroup = oldGroups[index];
			let newGroup = newGroups[index];

			if (this.pinnedGroups.includes(oldGroup)) {
				pinnedGroups.push(newGroup);
			}
		}

		return new Template({
			database,
			layout: this.layout, // TODO: clone layout
			pinnedGroups,
			randomizers: this.randomizers.map(randomizer => randomizer),
		});
	}

	public static deserialize(template: SerializedTemplate): Template {
		let temp = new Template({
			database: Group.deserialize(template.database),
			layout: deserializePaneLayout(template.layout),
			pinnedGroups: [],
			randomizers: template.randomizers.map(
				randomizer => randomizers().find(other => randomizer.id === other.id && randomizer.pluginId === other.pluginId)!,
			),
		});
		let all = temp.database.dfsBranches();
		temp.pinnedGroups = template.pinnedGroups.map(id => all.find(group => group.id == id)!);
		return temp;
	}
}

export class Project extends Template implements Serialize<SerializedProject> {
	private location = $state(assignedLater<string>());

	private static onSetListeners: ((project: Project) => void)[] = [];

	private constructor({
		location,
		database,
		layout,
		pinnedGroups,
		randomizers = [],
	}: {
		layout: PaneLayout;
		location: string;
		database: Database;
		pinnedGroups: Group[];
		randomizers?: Randomizer[];
	}) {
		super({ database, layout, pinnedGroups, randomizers });
		this.location = location;
	}

	public static onSet(callback: (project: Project) => void) {
		Project.onSetListeners.push(callback);
	}

	public static fromTemplate(template: Template, { location }: { location: string }): Project {
		return new Project({
			database: template.database,
			layout: template.layout,
			location,
			pinnedGroups: template.pinnedGroups,
			randomizers: template.randomizers,
		});
	}

	public static set(project: Project): void {
		currentProject = project;
		cache({ lastProjectPath: `${project.location}/${project.database.name}` });
		for (const listener of Project.onSetListeners) {
			listener(project);
		}
	}

	public static get(): Project | null {
		return currentProject;
	}

	public static deserialize(project: SerializedProject): Project {
		let proj = new Project({
			location: project.location,
			database: Group.deserialize(project.database),
			layout: deserializePaneLayout(project.layout),
			pinnedGroups: [],
			randomizers: project.randomizers.map(
				randomizer => randomizers().find(other => randomizer.id === other.id && randomizer.pluginId === other.pluginId)!,
			),
		});

		let all = proj.database.dfsGroups();
		proj.pinnedGroups = project.pinnedGroups.map(id => all.find(group => group.id == id)!);

		return proj;
	}

	public serialize(): SerializedProject {
		return {
			location: this.location,
			database: this.database.serialize(),
			layout: serializePaneLayout(this.layout),
			pinnedGroups: this.pinnedGroups.map(group => group.id),
			randomizers: this.randomizers.map(randomizer => randomizer.serialize()),
		};
	}

	public static async openFromLocation(location: string) {
		const serializedProject = await invoke<SerializedProject>("read_project", { path: location });
		const project = Project.deserialize(serializedProject);
		Project.set(project);
	}

	public static async open() {
		const selected = await open({
			directory: true,
			multiple: false,
			title: "Select a directory",
		});

		// Directory Chosen
		if (typeof selected === "string") {
			const serializedProject = await invoke<SerializedProject>("read_project", { path: selected });
			const project = Project.deserialize(serializedProject);
			Project.set(project);
		}

		// No directory chosen
		else {
			console.log("No directory selected");
		}
	}

	public static async save(): Promise<void> {
		let project = Project.get();
		const bytes = project!.serialize();
		await invoke("save_project", { project: bytes });
		notify("Project saved!");
	}

	public static async autosave(): Promise<void> {
		if (userSettings().autosave) Project.save();
	}
}

export type SerializedProject = {
	location: string;
	database: SerializedDatabase;
	layout: SerializedPaneLayout;
	pinnedGroups: number[];
	randomizers: SerializedRandomizer[];
};

let currentProject: Project | null = $state(null);
