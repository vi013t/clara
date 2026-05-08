import { type Cloneable, type Serialize, assignedLater } from "@clara/api/utils";
import type { Group } from "@clara/api/database";
import { AttributeType, type AttributeTypeName } from "@clara/api/attribute";
import { Randomizer } from "@clara/api/random";

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
	public randomizer: Randomizer | null = $state(null);

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
