/**
 * Returns `null` coerced to `any`. use this when you need to provide a non-null value
 * (like in class $state fields), but you know the value will be assigned before use
 * (like in constructors).
 *
 * Even in cases where there are obvious default values - like "" for strings, it
 * still conveys more specific intent to use `empty()`. It means "there's nothing here
 * now, so typescript will yell at me, but I promise there will be something here
 * before it gets read."
 */
export function empty(): any {
	return null;
}
