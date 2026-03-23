import type { Cloneable } from "../../util/Clone.svelte";
import type { Serialize } from "../../util/serialize.svelte";
import { assignedLater } from "../../util/utils.svelte";

abstract class PrimitiveArrayAttribute<T extends number> implements Serialize<T[]>, Cloneable<PrimitiveArrayAttribute<T>> {
	public values: T[] = $state(assignedLater());

	public constructor(value: T[]) {
		this.values = value;
	}

	public serialize(): T[] {
		return this.values;
	}

	public abstract clone(): PrimitiveArrayAttribute<T>;
}

abstract class PrimitiveAttributeValue<T> implements Serialize<T>, Cloneable<PrimitiveAttributeValue<T>> {
	public value: T = $state(assignedLater());

	public constructor(value: T) {
		this.value = value;
	}
	public serialize(): T {
		return this.value;
	}

	public abstract clone(): PrimitiveAttributeValue<T>;
}

export class StringAttribute extends PrimitiveAttributeValue<string> {
	public static deserialize(value: string): StringAttribute {
		return new StringAttribute(value);
	}

	public clone(): StringAttribute {
		return new StringAttribute(this.value);
	}
}

export class NumberAttribute extends PrimitiveAttributeValue<number> {
	public static deserialize(value: number): NumberAttribute {
		return new NumberAttribute(value);
	}

	public clone(): NumberAttribute {
		return new NumberAttribute(this.value);
	}
}

export class EntriesAttribute extends PrimitiveArrayAttribute<number> {
	public static deserialize(value: number[]): EntriesAttribute {
		return new EntriesAttribute(value);
	}

	public clone(): EntriesAttribute {
		return new EntriesAttribute([...this.values]);
	}
}
