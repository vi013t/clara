import { Database, Dataset, type BackendDatabase } from "./data/dataset.svelte";
import { ProjectBase, Template } from "./userdata/template.svelte";
import { empty } from "./util/utils.svelte";

export class Project extends ProjectBase {
	private location: string = $state(empty());

	public constructor({ name, location, database }: { name: string; location: string; database: Database }) {
		super({ name, database });
		this.location = location;
	}

	public static fromBackend(project: BackendProject): Project {
		return new Project({
			name: project.name,
			location: project.location,
			database: new Database(...project.database.map(dataset => Dataset.fromBackend(dataset))),
		});
	}

	public static set(project: Project): void {
		currentProject = project;
	}

	public static get(): Project {
		return currentProject;
	}
}

export type BackendProject = {
	name: string;
	location: string;
	framework: string;
	database: BackendDatabase;
};

let currentProject = $state(
	new Project({
		name: "Book Title",
		location: "/",
		database: Template.all[0].database.clone(),
	}),
);
