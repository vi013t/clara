export function sum(...values: number[]) {
	return values.reduce((total, value) => total + value, 0);
}

export function max(...values: number[]) {
	return values.reduce((total, value) => Math.max(total, value), -Infinity);
}

export function min(...values: number[]) {
	return values.reduce((total, value) => Math.min(total, value), Infinity);
}
