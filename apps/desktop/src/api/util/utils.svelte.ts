/**
 * Returns `null` coerced to a type. use this when you need to provide a non-null value
 * (like in class $state fields), but you know the value will be assigned before use
 * (like in constructors).
 *
 * Even in cases where there are obvious default values - like "" for strings, it
 * still conveys more specific intent to use `assignedLater()`. It means "there's nothing here
 * now, so typescript will yell at me, but I promise there will be something here
 * before it gets read."
 */
export function assignedLater<T = any>(): T {
	return null as T;
}

export type ObjectKey = string | number | symbol;

export namespace Objects {
	export function mapValues<InputValue, OutputValue, InputKey extends ObjectKey, OutputKey extends ObjectKey>(
		obj: Record<InputKey, InputValue>,
		map: (input: InputValue) => OutputValue,
	): Record<OutputKey, OutputValue> {
		return Object.entries(obj)
			.map(([key, value]) => ({ [key]: map(value as InputValue) }))
			.reduce((accumulator, current) => ({ ...accumulator, ...current })) as Record<OutputKey, OutputValue>;
	}

	export function mapEntries<InputKey extends string, InputValue, OutputKey extends ObjectKey, OutputValue>(
		obj: Record<InputKey, InputValue>,
		map: (inputKey: InputKey, inputValue: InputValue) => [OutputKey, OutputValue],
	): Record<OutputKey, OutputValue> {
		return Object.entries<InputValue>(obj)
			.map(([inputKey, inputValue]) => map(inputKey as InputKey, inputValue))
			.reduce((object, [outputKey, outputValue]) => ({ ...object, ...{ [outputKey]: outputValue } }), {}) as Record<
			OutputKey,
			OutputValue
		>;
	}
}

export interface From<Input, Output> {
	from(value: Input): Output;
}
