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

export function mapValues<Input, Output>(
	obj: { [key: string | number | symbol]: Input },
	map: (input: Input) => Output,
): { [key: string | number | symbol]: Output } {
	return Object.entries(obj)
		.map(([key, value]) => ({ [key]: map(value) }))
		.reduce((accumulator, current) => ({ ...accumulator, ...current }));
}

export function todo(task?: string): never {
	throw `Unimplemented task` + (task ? `: ${task}` : "");
}

export type Fields<T, Base = object> = {
	[K in Exclude<keyof T, keyof Base> as T[K] extends Function ? never : K]: T[K];
};

export type Optional<Base, Values extends keyof Base> = Omit<Base, Values> & Partial<Pick<Base, Values>>;
