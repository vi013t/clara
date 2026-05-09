import type { AttributeTypeNameValue, AttributeTypeName, AttributeValue } from "@clara/api/attribute";
import { getIcon, type Icon, type IconIdentifier } from "@clara/api/ui";
import { Debug, type Serialize } from "@clara/api/utils";

let registry: Randomizer[] = $state([]);

export function registerRandomizer(randomizer: Randomizer) {
	registry.push(randomizer);
	Debug.log(`Registered randomizer with ID ${randomizer.id} from plugin ${randomizer.pluginId}`, import.meta.url);
}

export function randomizers() {
	return registry;
}

export type SerializedRandomizer = {
	id: string;
	pluginId: string;
};

export type RandomizerArguments<P extends Record<string, AttributeTypeName>> = {
	[N in keyof P]: AttributeTypeNameValue<AttributeValue<P[N]>>;
};

export abstract class Randomizer<
	P extends Record<string, AttributeTypeName> = any,
	T = any,
> implements Serialize<SerializedRandomizer> {
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

	public abstract parameters(): P;

	public abstract random(parameters: RandomizerArguments<P>): T;

	public serialize(): SerializedRandomizer {
		return {
			pluginId: this.pluginId,
			id: this.id,
		};
	}
}
