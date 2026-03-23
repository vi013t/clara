import type { Serialize } from "../../util/serialize.svelte";
import { assignedLater } from "../../util/utils.svelte";

class PrimitiveArrayAttribute<T extends number> implements Serialize<T[]> {
	public values: T[] = $state(assignedLater());

	public constructor(value: T[]) {
		this.values = value;
	}

	public serialize(): T[] {
		return this.values;
	}
}

abstract class PrimitiveAttributeValue<T> implements Serialize<T> {
	public value: T = $state(assignedLater());

	public constructor(value: T) {
		this.value = value;
	}

	public serialize(): T {
		return this.value;
	}
}

export class StringAttribute extends PrimitiveAttributeValue<string> {
	public static deserialize(value: string): StringAttribute {
		return new StringAttribute(value);
	}
}

export class NumberAttribute extends PrimitiveAttributeValue<number> {
	public static deserialize(value: number): NumberAttribute {
		return new NumberAttribute(value);
	}
}

export class EntriesAttribute extends PrimitiveArrayAttribute<number> {
	public static deserialize(value: number[]): EntriesAttribute {
		return new EntriesAttribute(value);
	}
}
