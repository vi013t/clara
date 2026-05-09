import { type Cloneable, type Serialize, assignedLater } from "@clara/api/utils";
import type { Group } from "@clara/api/database";
import { AttributeType, type AttributeTypeName } from "@clara/api/attribute";
import { Randomizer } from "@clara/api/random";

export type SerializedAttributeDefinition = {
	name: string;
	type: AttributeTypeName;
	id: number;
};

export type AttributeDefinitionBuilder = (group: Group) => AttributeDefinition;

export class AttributeDefinition implements Serialize<SerializedAttributeDefinition>, Cloneable<AttributeDefinition> {
	public name = $state(assignedLater<string>());
	public type = $state(assignedLater<AttributeType>());
	private id_ = $state(assignedLater<number>());
	public randomizer: Randomizer | null = $state(null);

	private static nextID = 0;

	public constructor({ name, type, id }: { name: string; type: AttributeType; id?: number }) {
		this.name = name;
		this.type = type;
		this.id_ = id ?? AttributeDefinition.nextID++;
	}

	public clone(): AttributeDefinition {
		return new AttributeDefinition({ name: this.name, type: this.type });
	}

	public serialize(): SerializedAttributeDefinition {
		return {
			name: this.name,
			type: this.type.name,
			id: this.id_,
		};
	}

	public static deserialize(attribute: SerializedAttributeDefinition): AttributeDefinition {
		if (AttributeDefinition.nextID <= attribute.id) AttributeDefinition.nextID = attribute.id + 1;
		const definition = new AttributeDefinition({ name: attribute.name, type: AttributeType.fromName(attribute.type) });
		return definition;
	}

	public get id() {
		return this.id_;
	}
}
