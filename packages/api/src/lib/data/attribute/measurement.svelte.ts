// yeah i hate me too

import { assignedLater } from "$lib/util/index.svelte";
import type { Cloneable } from "../../util/Clone.svelte";
import type { Serialize } from "../../util/serialize.svelte";

export abstract class MeasurementTypeInstance<
	Standard extends Measurement<Self, Standard, Standard> = any,
	Self extends MeasurementTypeInstance<Standard, Self> = any,
> {
	_tag = "type instance";
}

export type MeasurementType<
	Standard extends Measurement<Instance, Standard, Standard> = any,
	Instance extends MeasurementTypeInstance<Standard, Instance> = any,
> = {
	new (): Instance;
	units(): Unit<Instance, Standard, any>[];
	standard(): Unit<Instance, Standard, Standard>;
	of<Output extends Measurement<Instance, Standard, Output>>(value: number, unit: Unit<Instance, Standard, Output>): Output;
	name(): string;
};

export type Unit<
	Type extends MeasurementTypeInstance<Standard, Type>,
	Standard extends Measurement<Type, Standard, Standard>,
	Instance extends Measurement<Type, Standard, Instance>,
> = {
	new (count: number): Instance;
	fromStandard(value: Standard): Instance;
	abbreviation(): string;
};

export type SerializedMeasurement = {
	count: number;
	units: string;
};

export abstract class Measurement<
	Type extends MeasurementTypeInstance<Standard, Type>,
	Standard extends Measurement<Type, Standard, Standard> = any,
	Self extends Measurement<Type, Standard, Self> = any,
>
	implements Serialize<SerializedMeasurement>, Cloneable<Measurement<Type, Standard, Self>>
{
	protected count_: number = $state(assignedLater());

	public constructor(value: number) {
		this.count_ = value;
	}

	public serialize(): SerializedMeasurement {
		return {
			count: this.count,
			units: this.unit().abbreviation(),
		};
	}

	public static deserialize<
		Type extends MeasurementTypeInstance<Standard, Type>,
		Standard extends Measurement<Type, Standard, Standard> = any,
		Self extends Measurement<Type, Standard, Self> = any,
	>(measurement: SerializedMeasurement): Measurement<Type, Standard, Self> {
		const builder = units[measurement.units as "m"];
		return new builder(measurement.count) as unknown as Measurement<Type, Standard, Self>;
	}

	public abstract toStandard(): Standard;
	public abstract type(): MeasurementType<Standard, Type>;
	public abstract unit(): Unit<Type, Standard, Self>;
	public abstract clone(): Self;

	public to<T extends Measurement<Type, Standard, T>>(unit: Unit<Type, Standard, T>): T {
		return unit.fromStandard(this.toStandard());
	}

	public get count(): number {
		return this.count_;
	}
}

export class Length extends MeasurementTypeInstance<Meters, Length> {
	public static of<T extends Measurement<Length, Meters, T>>(value: number, unit: Unit<Length, Meters, T>): T {
		return new unit(value);
	}

	public static units(): Unit<Length, Meters, any>[] {
		return [Meters, Kilometers];
	}

	public static standard(): Unit<Length, Meters, Meters> {
		return Meters;
	}

	public static name(): string {
		return "length";
	}
}

export class Meters extends Measurement<Length, Meters, Meters> implements Cloneable<Meters> {
	private readonly _meters = true;

	public clone(): Meters {
		return new Meters(this.count);
	}

	public override type(): MeasurementType<Meters, Length> {
		return Length;
	}

	public override toStandard(): Meters {
		return this;
	}

	public override unit(): Unit<Length, Meters, Meters> {
		return Meters;
	}

	public static fromStandard(value: Meters): Meters {
		return value;
	}

	public static abbreviation(): string {
		return "m";
	}
}

export class Kilometers extends Measurement<Length, Meters, Kilometers> implements Cloneable<Kilometers> {
	private readonly _kilometers = true;

	public clone(): Kilometers {
		return new Kilometers(this.count);
	}

	public override type(): MeasurementType<Meters, Length> {
		return Length;
	}

	public override toStandard(): Meters {
		return Length.of(this.count * 1000, Meters);
	}

	public static fromStandard(value: Meters): Kilometers {
		return Length.of(value.count / 1000, Kilometers);
	}

	public override unit(): Unit<Length, Meters, Kilometers> {
		return Kilometers;
	}

	public static abbreviation(): string {
		return "km";
	}
}

export class Weight extends MeasurementTypeInstance<Kilograms, Weight> {
	public static of<T extends Measurement<Weight, Kilograms, T>>(value: number, unit: Unit<Weight, Kilograms, T>): T {
		return new unit(value);
	}

	public static units(): Unit<Weight, Kilograms, any>[] {
		return [Kilograms, Grams];
	}

	public static standard(): Unit<Length, Kilograms, Kilograms> {
		return Kilograms;
	}

	public static name(): string {
		return "weight";
	}
}

export class Kilograms extends Measurement<Weight, Kilograms, Kilograms> implements Cloneable<Kilograms> {
	private readonly _kilograms = true;

	public clone(): Kilograms {
		return new Kilograms(this.count);
	}

	public override type(): MeasurementType<Kilograms, Weight> {
		return Weight;
	}

	public override toStandard(): Kilograms {
		return this;
	}

	public override unit(): Unit<Weight, Kilograms, Kilograms> {
		return Kilograms;
	}

	public static fromStandard(value: Kilograms): Kilograms {
		return value;
	}

	public static abbreviation(): string {
		return "kg";
	}
}

export class Grams extends Measurement<Weight, Kilograms, Grams> implements Cloneable<Grams> {
	private readonly _grams = true;

	public clone(): Grams {
		return new Grams(this.count);
	}

	public override type(): MeasurementType<Kilograms, Weight> {
		return Weight;
	}

	public override toStandard(): Kilograms {
		return Weight.of(this.count * 1000, Kilograms);
	}

	public static fromStandard(value: Kilograms): Grams {
		return Weight.of(value.count / 1000, Grams);
	}

	public override unit(): Unit<Weight, Kilograms, Grams> {
		return Grams;
	}

	public static abbreviation(): string {
		return "g";
	}
}

const units = {
	m: Meters,
	km: Kilometers,
	kg: Kilograms,
	g: Grams,
} as const satisfies { [key: string]: Unit<any, any, any> };
