import BookIcon from "../../components/icons/BookIcon.svelte";
import { Database, type BackendDatabase } from "../data/dataset.svelte";
import { getIconByName, getIconName, type IconComponent, type IconName } from "../ui/icons.svelte";
import { Container } from "../util/Clone.svelte";
import type { Serialize } from "../util/serialize.svelte";
import { assignedLater } from "../util/utils.svelte";

export class ProjectBase {
	name: string = $state(assignedLater());
	database: Container<Database> = $state(assignedLater());
	description?: string = $state(assignedLater());
	icon: IconComponent = $state(assignedLater());
	id: number = $state(assignedLater());

	private static projectID = 0;

	public constructor({
		name,
		database,
		description = undefined,
		icon = BookIcon,
	}: {
		name: string;
		database: Database;
		description?: string;
		icon?: IconComponent;
	}) {
		this.name = name;
		this.database = new Container(database);
		this.description = description;
		this.icon = icon;
		this.id = ProjectBase.projectID++;
	}
}

type BackendTemplate = {
	name: string;
	description: string;
	database: BackendDatabase;
	icon: IconName;
};

export class Template extends ProjectBase implements Serialize<BackendTemplate> {
	toBackend(): BackendTemplate {
		return {
			name: this.name,
			description: this.description ?? "",
			icon: getIconName(this.icon),
			database: this.database.ref().toBackend(),
		};
	}

	public static fromBackend(template: BackendTemplate): Template {
		return new Template({
			name: template.name,
			description: template.description,
			database: Database.fromBackend(template.database),
			icon: getIconByName(template.icon),
		});
	}
}
