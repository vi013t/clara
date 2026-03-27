import { invoke } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-dialog";
import { Group, type Database, type SerializedDatabase } from "./data/database.svelte";
import type { Serialize } from "$lib/util/serialize.svelte";
import { assignedLater } from "$lib/util/index.svelte";
import { cache } from "./userdata/index.svelte.ts";

export class Project implements Serialize<SerializedProject> {
	private location = $state(assignedLater<string>());
	public database = $state(assignedLater<Database>());

	public constructor({ location, database }: { location: string; database: Database }) {
		this.location = location;
		this.database = database;
	}

	public static set(project: Project): void {
		currentProject = project;
		cache({ lastProjectPath: `${project.location}/${project.database.name}` });
	}

	public static get(): Project | null {
		return currentProject;
	}

	public static deserialize(project: SerializedProject): Project {
		return new Project({
			location: project.location,
			database: Group.deserialize(project.database),
		});
	}

	public serialize(): SerializedProject {
		return {
			location: this.location,
			database: this.database.serialize(),
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
	}
}

export type SerializedProject = {
	location: string;
	database: SerializedDatabase;
};

let currentProject: Project | null = $state(null);
