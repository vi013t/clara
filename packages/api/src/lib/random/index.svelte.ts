import { getIcon, type Icon, type IconIdentifier } from "@clara/api/ui";
import type { Serialize } from "@clara/api/utils";

let registry: Randomizer[] = $state([]);

export function registerRandomizer(randomizer: Randomizer) {
	registry.push(randomizer);
}

export function randomizers() {
	return registry;
}

export type SerializedRandomizer = {
	id: string;
	pluginId: string;
};

export abstract class Randomizer<P extends Record<string, string> = any, T = any> implements Serialize<SerializedRandomizer> {
	public readonly name: string;
	public readonly pluginId: string;
	public readonly id: string;
	public readonly description: string;
	public readonly icon: Icon;

	public constructor({
		name,
		id,
		pluginId,
		description,
		icon,
	}: {
		name: string;
		pluginId: string;
		id: string;
		description: string;
		icon: IconIdentifier;
	}) {
		this.name = name;
		this.id = id;
		this.description = description;
		this.pluginId = pluginId;
		this.icon = getIcon(icon);
	}

	public abstract random(parameters: P): T;

	public serialize(): SerializedRandomizer {
		return {
			pluginId: this.pluginId,
			id: this.id,
		};
	}
}
