import { invoke } from "@tauri-apps/api/core";
import { Database, type BackendDatabase } from "./data/dataset.svelte";
import { ProjectBase } from "./userdata/template.svelte";
import { assignedLater } from "./util/utils.svelte";
import { open } from "@tauri-apps/plugin-dialog";

export class Project extends ProjectBase {
	private location: string = $state(assignedLater());

	public constructor({ name, location, database }: { name: string; location: string; database: Database }) {
		super({ name, database });
		this.location = location;
	}

	public static set(project: Project): void {
		currentProject = project;
	}

	public static get(): Project | null {
		return currentProject;
	}

	public static fromBackend(project: BackendProject): Project {
		return new Project({
			name: project.name,
			location: project.location,
			database: Database.fromBackend(project.database),
		});
	}

	public toBackend(): BackendProject {
		return {
			name: this.name,
			location: this.location,
			database: this.database.ref().toBackend(),
		};
	}

	public static async open() {
		const selected = await open({
			directory: true,
			multiple: false,
			title: "Select a directory",
		});

		// Directory Chosen
		if (typeof selected === "string") {
			const project = await invoke<BackendProject>("read_project", { path: selected });
			Project.set(Project.fromBackend(project));
		}

		// No directory chosen
		else {
			console.log("No directory selected");
		}
	}

	public static async save(): Promise<void> {
		let project = Project.get();
		if (!project) return;

		const bytes = project.toBackend();
		await invoke("save_project", { project: bytes });
	}
}

export type BackendProject = {
	name: string;
	location: string;
	database: BackendDatabase;
};

let currentProject: Project | null = $state(null);
