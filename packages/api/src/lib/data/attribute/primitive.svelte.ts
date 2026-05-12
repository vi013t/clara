import { type Cloneable, type Serialize } from "../../util/index.svelte";
import type { AttributeTypeValue } from "./type.svelte.ts";

export abstract class PrimitiveArrayAttributeValue<T extends number>
	implements Serialize<T[]>, Cloneable<PrimitiveArrayAttributeValue<T>>
{
	public values: T[];

	public constructor(value: T[]) {
		this.values = $state(value);
	}

	public serialize(): T[] {
		return this.values;
	}

	public abstract clone(): PrimitiveArrayAttributeValue<T>;
}

export abstract class PrimitiveAttributeValue<T> implements Serialize<T>, Cloneable<PrimitiveAttributeValue<T>> {
	public value: T;

	public constructor(value: T) {
		this.value = $state(value);
	}
	public serialize(): T {
		return this.value;
	}

	public abstract clone(): PrimitiveAttributeValue<T>;
}

export class StringAttribute extends PrimitiveAttributeValue<string> implements AttributeTypeValue<string> {
	public static deserialize(value: string): StringAttribute {
		return new StringAttribute(value);
	}

	public clone(): StringAttribute {
		return new StringAttribute(this.value);
	}
}

export class NumberAttribute extends PrimitiveAttributeValue<number> implements AttributeTypeValue<number> {
	public static deserialize(value: number): NumberAttribute {
		return new NumberAttribute(value);
	}

	public clone(): NumberAttribute {
		return new NumberAttribute(this.value);
	}
}

export class EntriesAttribute extends PrimitiveArrayAttributeValue<number> implements AttributeTypeValue<number> {
	public static deserialize(value: number[]): EntriesAttribute {
		return new EntriesAttribute(value);
	}

	public clone(): EntriesAttribute {
		return new EntriesAttribute([...this.values]);
	}
}
