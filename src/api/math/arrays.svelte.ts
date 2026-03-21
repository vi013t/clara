export function sum(...values: number[]) {
	return values.reduce((total, value) => total + value, 0);
}

export function clamp(value: number, minimum: number, maximum: number): number {
	return Math.min(maximum, Math.max(value, minimum));
}
