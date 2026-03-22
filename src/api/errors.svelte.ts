import { Debug } from "./util/log";

let errorStack: string[] = $state([]);

export function asyncFn<Args extends any[]>(
	callback: (...args: Args) => Promise<void>,
	url?: string,
): (...args: Args) => Promise<void> {
	return async function (...args: Args): Promise<void> {
		try {
			return await callback(...args);
		} catch (error) {
			let location = `\n\tat ${callback.name}`;
			if (url) location = `${location} in ${Debug.file(url)}`;
			let result = `${error} ${location}`;
			errorStack.push(result);
		}
	};
}

export function errors(): string[] {
	return errorStack;
}
