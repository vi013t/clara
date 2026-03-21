import { invoke } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-dialog";
import type { Database } from "./data/database.svelte";
import { cache, getFromCache } from "./userdata/cache.svelte";
import { assignedLater, todo } from "./util/utils.svelte";

export class Project {
	private location = $state(assignedLater<string>());
	public database = $state(assignedLater<Database>());

	public constructor({ location, database }: { name: string; location: string; database: Database }) {
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

	public static fromBackend(project: BackendProject): Project {
		todo("deserialize project");
	}

	public toBackend(): BackendProject {
		todo("serialize project");
	}

	public static async openFromLocation(location: string) {
		const backendProject = await invoke<BackendProject>("read_project", { path: location });
		const project = Project.fromBackend(backendProject);
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
			const backendProject = await invoke<BackendProject>("read_project", { path: selected });
			const project = Project.fromBackend(backendProject);
			Project.set(project);
		}

		// No directory chosen
		else {
			console.log("No directory selected");
		}
	}

	public static async save(): Promise<void> {
		let project = Project.get();
		const bytes = project!.toBackend();
		await invoke("save_project", { project: bytes });
	}
}

export type BackendProject = {
	name: string;
	location: string;
};

let currentProject: Project | null = $state(null);
let path = getFromCache("lastProjectPath");
if (path) Project.openFromLocation(path);
