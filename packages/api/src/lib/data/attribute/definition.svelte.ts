import { type Cloneable, type Id, type Serialize, uniqueId } from "@clara/api/utils";
import { AttributeType, type AttributeTypeName } from "@clara/api/attribute";
import { Randomizer } from "@clara/api/random";
import type { Icon } from "@clara/api/icons";

export type SerializedAttributeDefinition = {
	name: string;
	type: AttributeTypeName;
	id: number;
};

export class AttributeDefinition implements Serialize<SerializedAttributeDefinition>, Cloneable<AttributeDefinition> {
	public name: string;
	public icon: Icon;
	public typeName: AttributeTypeName;

	public type: AttributeType;
	private id_: number;
	public randomizer: Randomizer | null = $state(null);

	private static nextID = 0;

	public constructor({ name, type, id }: { name: string; type: AttributeType; id?: Id }) {
		this.name = $state(name);
		this.type = type;
		this.id_ = $state(id ?? uniqueId());
		this.icon = $state(type.icon);
		this.typeName = $state(this.type.name);
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
