import { invoke } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-dialog";
import { Group, type Database, type SerializedDatabase } from "./data/database.svelte";
import type { Serialize, Serialized } from "./util/serialize.svelte";
import { Debug } from "./util/index.svelte";
import { cache, userSettings } from "./usersettings/index.svelte.ts";
import { notify } from "./components/index.svelte.ts";
import { Randomizer, randomizers, type SerializedRandomizer } from "@clara/api/random";
import { ItemType, type SerializedItemType } from "./data/type.svelte.js";
import { AttributeDefinition, AttributeType } from "@clara/api/attribute";
import { type SerializedPaneLayout, PaneLayout } from "@clara/api/ui";

export type SerializedTemplate = {
	database: SerializedDatabase;
	layout: SerializedPaneLayout;
	pinnedGroups: number[];
	randomizers: SerializedRandomizer[];
	types: SerializedItemType[];
	plugin_id: string;
};

export class Template implements Serialize<SerializedTemplate> {
	public database: Database;
	public layout: PaneLayout;
	public pinnedGroups: Group[];
	public randomizers: Randomizer[];
	public types: ItemType[];
	public readonly plugin_id: string;

	public constructor({
		database,
		layout,
		pinnedGroups,
		randomizers = [],
		types,
		plugin_id,
	}: {
		layout: PaneLayout;
		database: Database;
		pinnedGroups: Group[];
		randomizers?: Randomizer[];
		types: ItemType[];
		plugin_id: string;
	}) {
		this.database = $state(database);
		this.layout = $state(layout);
		this.pinnedGroups = $state(pinnedGroups);
		this.randomizers = $state(randomizers);
		this.types = $state(types);
		if (!this.types.some(type => type.name === "Document")) {
			this.types.push(
				new ItemType({
					name: "Document",
					icon: "FileText",
					attributes: [
						new AttributeDefinition({ name: "Name", type: AttributeType.fromName("shortText") }),
						new AttributeDefinition({ name: "Content", type: AttributeType.fromName("longText") }),
					],
					defaultView: "Editor",
				}),
				new ItemType({
					name: "Node",
					icon: "GitCompare",
					attributes: [
						new AttributeDefinition({ name: "Name", type: AttributeType.fromName("shortText") }),
						new AttributeDefinition({ name: "Generator", type: AttributeType.fromName("generated") }),
					],
					defaultView: "Node Editor",
				}),
			);
		}
		this.plugin_id = $state(plugin_id);
	}

	public serialize(): SerializedTemplate {
		return {
			database: this.database.serialize(),
			layout: this.layout.serialize(),
			pinnedGroups: this.pinnedGroups.map(group => group.id),
			randomizers: this.randomizers.map(randomizer => randomizer.serialize()),
			types: this.types.map(type => type.serialize()),
			plugin_id: this.plugin_id,
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
			layout: this.layout.clone(),
			pinnedGroups,
			randomizers: this.randomizers,
			types: this.types.map(type => type.clone()),
			plugin_id: this.plugin_id,
		});
	}

	public static deserialize(template: SerializedTemplate): Template {
		let temp = new Template({
			database: Group.deserialize(template.database),
			layout: PaneLayout.deserialize(template.layout),
			pinnedGroups: [],
			randomizers: template.randomizers
				.map(randomizer => randomizers().find(other => randomizer.id === other.id && randomizer.pluginId === other.pluginId)!)
				.filter((randomizer, index) => {
					if (!randomizer) {
						Debug.warn(
							`No randomizer found with ID ${template.randomizers[index].id} and plugin ID ${template.randomizers[index].id}`,
							import.meta.url,
						);

						return false;
					}

					return true;
				}),
			types: template.types.map(type => ItemType.deserialize(type)),
			plugin_id: template.plugin_id,
		});
		let all = temp.database.dfsBranches();
		temp.pinnedGroups = template.pinnedGroups.map(id => all.find(group => group.id == id)!);
		return temp;
	}
}

export type AttachedProjectData<T extends Serialize<S>, S = Serialized<T>> = {
	data: T;
	deserialize(s: S): T;
};

export class Project extends Template implements Serialize<SerializedProject> {
	private location: string;

	private static onSetListeners: ((project: Project) => void)[] = [];
	private static extraData: Map<string, Map<string, AttachedProjectData<any>>> = new Map();

	private constructor({
		location,
		database,
		layout,
		pinnedGroups,
		randomizers = [],
		types,
	}: {
		layout: PaneLayout;
		location: string;
		database: Database;
		pinnedGroups: Group[];
		types: ItemType[];
		randomizers?: Randomizer[];
	}) {
		super({
			database,
			layout,
			pinnedGroups,
			randomizers,
			types,
			plugin_id: "clara",
		});
		this.location = $state(location);
	}

	public static attachData<T extends Serialize<S>, S = Serialized<T>>(
		data: AttachedProjectData<T, S> & { pluginId: string; dataId: string },
	): void {
		this.extraData.getOrInsert(data.pluginId, new Map()).set(data.dataId, data);
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
			types: template.types,
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
			layout: PaneLayout.deserialize(project.layout),
			pinnedGroups: [],
			types: project.types.map(type => ItemType.deserialize(type)),
			randomizers: project.randomizers
				.map(randomizer => randomizers().find(other => randomizer.id === other.id && randomizer.pluginId === other.pluginId)!)
				.filter((randomizer, index) => {
					if (!randomizer) {
						Debug.warn(
							`No randomizer found with ID ${project.randomizers[index].id} and plugin ID ${project.randomizers[index].id}; Available randomizers are: ${randomizers()
								.map(randomizer => `[${(randomizer.id, randomizer.pluginId)}]`)
								.join(", ")}`,
							import.meta.url,
						);

						return false;
					}

					return true;
				}),
		});

		let all = proj.database.dfsGroups();
		proj.pinnedGroups = project.pinnedGroups.map(id => all.find(group => group.id == id)!);

		return proj;
	}

	public override serialize(): SerializedProject {
		return {
			location: this.location,
			database: this.database.serialize(),
			layout: this.layout.serialize(),
			pinnedGroups: this.pinnedGroups.map(group => group.id),
			randomizers: this.randomizers.map(randomizer => randomizer.serialize()),
			types: this.types.map(type => type.serialize()),
			plugin_id: this.plugin_id,
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
	types: SerializedItemType[];
	plugin_id: string;
};

let currentProject: Project | null = $state(null);
