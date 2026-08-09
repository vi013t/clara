import { AttributeType, type AttributeBox, type AttributeTypeName } from "@clara/api/attribute";
import type { Icon } from "@clara/api/icons";
import { Randomizer } from "@clara/api/random";
import { uniqueId, type Cloneable, type Id, type Serialize } from "@clara/api/utils";

export type SerializedAttributeDefinition = {
	name: string;
	type: AttributeTypeName;
	id: number;
};

export type RandomizerWithArguments<Parameters extends Record<string, AttributeTypeName>> = {
	randomizer: Randomizer<Parameters>;
	arguments: Record<keyof Parameters, AttributeBox>;
};

export class AttributeDefinition implements Serialize<SerializedAttributeDefinition>, Cloneable<AttributeDefinition> {
	public name: string;
	public icon: Icon;
	public typeName: AttributeTypeName;

	public type: AttributeType;
	private id_: number;
	public randomizer: RandomizerWithArguments<any> | null = $state(null);

	private static nextID = 0;

	public constructor({ name, type, id, hidden }: { name: string; type: AttributeType; id?: Id; hidden?: true }) {
		this.name = $state(name);
		this.type = type;
		this.id_ = $state(id ?? uniqueId());
		this.icon = $state(type.icon);
		this.typeName = $state(this.type.name);
	}

	public static simpleList(values: Record<string, AttributeTypeName>): AttributeDefinition[] {
		return Object.entries(values).map(
			([name, typeName]) => new AttributeDefinition({ name, type: AttributeType.fromName(typeName) }),
		);
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
