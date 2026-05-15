import { getIcon, type Icon, type IconIdentifier, type IconName } from "@clara/api/icons";
import { type Cloneable, type Serialize } from "@clara/api/utils";
import { AttributeDefinition, type SerializedAttributeDefinition } from "@clara/api/attribute";

export type SerializedItemType = {
	name: string;
	icon: string;
	attributes: SerializedAttributeDefinition[];
	pluralName: string | null;
	defaultValue: "editor" | "node" | null;
};

export class ItemType implements Serialize<SerializedItemType>, Cloneable<ItemType> {
	public name: string;
	public icon: Icon;
	public attributes: AttributeDefinition[];
	public pluralName: string;
	public defaultView: "editor" | "node" | null;

	public constructor({
		name,
		icon,
		attributes,
		pluralName,
		defaultView,
	}: {
		name: string;
		icon: IconIdentifier;
		attributes: AttributeDefinition[];

		pluralName?: string;
		defaultView?: "editor" | "node";
	}) {
		this.name = $state(name);
		this.icon = $state(getIcon(icon));
		this.attributes = $state(attributes);
		this.pluralName = $state(pluralName ?? `${this.name}s`);
		this.defaultView = $state(defaultView ?? null);
	}

	public clone(): ItemType {
		return new ItemType({
			name: this.name,
			icon: this.icon,
			attributes: this.attributes.map(attribute => attribute.clone()),
			defaultView: this.defaultView ?? undefined,
		});
	}

	public serialize(): SerializedItemType {
		return {
			name: this.name,
			icon: this.icon.name,
			attributes: this.attributes.map(attribute => attribute.serialize()),
			pluralName: this.pluralName,
			defaultValue: this.defaultView,
		};
	}

	public static deserialize(itemType: SerializedItemType): ItemType {
		return new ItemType({
			name: itemType.name,
			icon: getIcon(itemType.icon as IconName),
			attributes: itemType.attributes.map(attribute => AttributeDefinition.deserialize(attribute)),
			pluralName: itemType.pluralName ?? undefined,
			defaultView: itemType.defaultValue ?? undefined,
		});
	}
}
