import { AttributeDefinition, type SerializedAttributeDefinition } from "@clara/api/attribute";
import { getIcon, type Icon, type IconIdentifier, type IconName } from "@clara/api/icons";
import { type Cloneable, type Serialize } from "@clara/api/utils";
import { views, type AttributeView, type ItemView, type ViewClass } from "../ui/views.svelte";

export type SerializedItemType = {
	name: string;
	icon: string;
	attributes: SerializedAttributeDefinition[];
	pluralName: string | null;
	defaultView: string | null;
	hidden: boolean;
};

export class ItemType implements Serialize<SerializedItemType>, Cloneable<ItemType> {
	public name: string;
	public icon: Icon;
	public attributes: AttributeDefinition[];
	public pluralName: string;
	public defaultView_: string | null;
	public hidden: boolean;
	public defaultAttribute: string | null;

	public constructor({
		name,
		icon,
		attributes,
		pluralName,
		defaultView,
		defaultAttribute,
		hidden,
	}: {
		name: string;
		icon: IconIdentifier;
		attributes: AttributeDefinition[];
		pluralName?: string;
		defaultView?: string;
		defaultAttribute?: string;
		hidden?: true;
	}) {
		this.name = $state(name);
		this.icon = $state(getIcon(icon));
		this.attributes = $state(attributes);
		this.pluralName = $state(pluralName ?? `${this.name}s`);
		this.defaultView_ = $state(defaultView ?? null);
		this.defaultAttribute = $state(defaultAttribute ?? null);
		this.hidden = hidden ?? false;
	}

	public get defaultView(): ViewClass<ItemView | AttributeView> | null {
		return views().find(view => view.identifier === this.defaultView_) as ViewClass<ItemView | AttributeView> | null;
	}

	public clone(): ItemType {
		return new ItemType({
			name: this.name,
			icon: this.icon,
			attributes: this.attributes.map(attribute => attribute.clone()),
			defaultView: this.defaultView_ ?? undefined,
			hidden: this.hidden ? true : undefined,
		});
	}

	public serialize(): SerializedItemType {
		return {
			name: this.name,
			icon: this.icon.name,
			attributes: this.attributes.map(attribute => attribute.serialize()),
			pluralName: this.pluralName,
			defaultView: this.defaultView_,
			hidden: this.hidden,
		};
	}

	public static deserialize(itemType: SerializedItemType): ItemType {
		return new ItemType({
			name: itemType.name,
			icon: getIcon(itemType.icon as IconName),
			attributes: itemType.attributes.map(attribute => AttributeDefinition.deserialize(attribute)),
			pluralName: itemType.pluralName ?? undefined,
			defaultView: itemType.defaultView ?? undefined,
			hidden: itemType.hidden ? true : undefined,
		});
	}
}
