import { getIcon, type Icon } from "../../ui/icons.svelte";
import type { Cloneable } from "../../util/Clone.svelte";
import type { Serialize } from "../../util/serialize.svelte";
import { assignedLater } from "../../util/utils.svelte";
import type { Group } from "../database.svelte";
import { AttributeType, type AttributeTypeName } from "./attributetype.svelte";

export type SerializedAttributeDefinition = {
	name: string;
	type: AttributeTypeName;
	id: number;
	groupId: number;
};

export type AttributeDefinitionBuilder = (group: Group) => AttributeDefinition;

export class AttributeDefinition implements Serialize<SerializedAttributeDefinition>, Cloneable<AttributeDefinition> {
	public name = $state(assignedLater<string>());
	public type = $state(assignedLater<AttributeType>());
	private id_ = $state(assignedLater<number>());
	public group = $state(assignedLater<Group>());

	private static nextID = 0;

	private constructor(name: string, type: AttributeType, group: Group, id?: number) {
		this.name = name;
		this.type = type;
		this.group = group;
		this.id_ = id ?? AttributeDefinition.nextID++;
	}

	public clone(): AttributeDefinition {
		return new AttributeDefinition(this.name, this.type, this.group);
	}

	public serialize(): SerializedAttributeDefinition {
		return {
			name: this.name,
			type: this.type.name,
			id: this.id_,
			groupId: this.group.id,
		};
	}

	public static deserialize(attribute: SerializedAttributeDefinition, group: Group): AttributeDefinition {
		if (AttributeDefinition.nextID <= attribute.id) AttributeDefinition.nextID = attribute.id + 1;
		const definition = new AttributeDefinition(attribute.name, AttributeType.fromName(attribute.type), null!);
		definition.group = group;
		return definition;
	}

	public get id() {
		return this.id_;
	}

	public static basic(name: string, type: AttributeTypeName): AttributeDefinitionBuilder {
		return (group: Group) => new AttributeDefinition(name, AttributeType.fromName(type), group);
	}
}
