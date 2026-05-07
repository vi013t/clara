import { invoke } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-dialog";
import { Group, type Database, type SerializedDatabase } from "./data/database.svelte";
import type { Serialize } from "./util/serialize.svelte";
import { assignedLater } from "./util/index.svelte";
import { cache, userSettings } from "./usersettings/index.svelte.ts";
import { TabList, type SerializedTabList } from "./ui/tab.svelte.js";
import { notify } from "./components/index.svelte.ts";

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

export class Template {
	public database: Database = $state(assignedLater());
	public layout: PaneLayout = $state(assignedLater());
	public pinnedGroups: Group[] = $state([]);

	public constructor({ database, layout, pinnedGroups }: { layout: PaneLayout; database: Database; pinnedGroups: Group[] }) {
		this.database = database;
		this.layout = layout;
		this.pinnedGroups = pinnedGroups;
	}
}

export class Project extends Template implements Serialize<SerializedProject> {
	private location = $state(assignedLater<string>());

	private constructor({
		location,
		database,
		layout,
		pinnedGroups,
	}: {
		layout: PaneLayout;
		location: string;
		database: Database;
		pinnedGroups: Group[];
	}) {
		super({ database, layout, pinnedGroups });
		this.location = location;
	}

	public static fromTemplate(template: Template, { location }: { location: string }): Project {
		return new Project({ database: template.database, layout: template.layout, location, pinnedGroups: template.pinnedGroups });
	}

	public static set(project: Project): void {
		currentProject = project;
		cache({ lastProjectPath: `${project.location}/${project.database.name}` });
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
		});

		let all = proj.database.dfsBranches();
		proj.pinnedGroups = project.pinnedGroups.map(id => all.find(group => group.id == id)!);

		return proj;
	}

	public serialize(): SerializedProject {
		return {
			location: this.location,
			database: this.database.serialize(),
			layout: serializePaneLayout(this.layout),
			pinnedGroups: this.pinnedGroups.map(group => group.id),
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
};

let currentProject: Project | null = $state(null);
