import { getIcon, type Icon, type IconIdentifier, type IconName } from "@clara/api/icons";
import { assignedLater, type Cloneable, type Serialize } from "@clara/api/utils";
import { AttributeDefinition, type SerializedAttributeDefinition } from "@clara/api/attribute";
import { GeneratedAttribute } from "./attribute/generated.svelte.ts";

export type SerializedItemType = {
	name: string;
	icon: string;
	attributes: SerializedAttributeDefinition[];
};

export class ItemType implements Serialize<SerializedItemType>, Cloneable<ItemType> {
	name: string = $state(assignedLater());
	icon: Icon = $state(assignedLater());
	attributes: AttributeDefinition[] = $state(assignedLater());
	pluralName: string = $state(assignedLater());

	public constructor({
		name,
		icon,
		attributes,
		pluralName,
	}: {
		name: string;
		pluralName?: string;
		icon: IconIdentifier;
		attributes: AttributeDefinition[];
	}) {
		this.name = name;
		this.icon = getIcon(icon);
		this.attributes = attributes;
		this.pluralName = pluralName ?? `${this.name}s`;
	}

	public clone(): ItemType {
		return new ItemType({ name: this.name, icon: this.icon, attributes: this.attributes.map(attribute => attribute.clone()) });
	}

	public serialize(): SerializedItemType {
		return {
			name: this.name,
			icon: this.icon.name,
			attributes: this.attributes.map(attribute => attribute.serialize()),
		};
	}

	public static deserialize(itemType: SerializedItemType): ItemType {
		return new ItemType({
			name: itemType.name,
			icon: getIcon(itemType.icon as IconName),
			attributes: itemType.attributes.map(attribute => AttributeDefinition.deserialize(attribute)),
		});
	}
}
