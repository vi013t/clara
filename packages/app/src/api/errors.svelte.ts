import { Debug } from "./log";

type ErrorLine = {
	functionName: string;
	file: string | null;
	line: number | null;
	column: number | null;
};

function parseErrorStack(stackString: string): { message: string; stack: ErrorLine[] } {
	const lines = stackString.trim().split("\n");
	const stack: ErrorLine[] = [];
	let message = "";

	// If the first line doesn't start with "at ", it's likely the Error Message
	if (lines[0] && !lines[0].trim().startsWith("at ")) {
		message = lines.shift()!.trim();
	}

	const stackRegex = /at\s+(?:(?<functionName>.+?)\s+\()?(?<path>.+?):(?<line>\d+):(?<column>\d+)\)?|at\s+(?<anonymousPath>.+?)$/;

	for (const line of lines) {
		const match = line.match(stackRegex);

		if (match) {
			const { functionName, path, line, column, anonymousPath } = match.groups as any;

			let rawPath = path || anonymousPath || "";
			let cleanPath = rawPath;

			cleanPath = cleanPath.split("?")[0];

			const srcIndex = cleanPath.indexOf("/src/");
			if (srcIndex !== -1) {
				cleanPath = cleanPath.substring(srcIndex + 1);
			}

			stack.push({
				functionName: functionName || (rawPath.includes("<anonymous>") ? "anonymous" : "root"),
				file: cleanPath,
				line: line ? parseInt(line, 10) : null,
				column: column ? parseInt(column, 10) : null,
			});
		} else if (line.includes("<anonymous>")) {
			const funcMatch = line.match(/at\s+(.+?)\s+\(/);
			stack.push({
				functionName: funcMatch ? funcMatch[1] : "anonymous",
				file: "native",
				line: null,
				column: null,
			});
		}
	}

	return { message, stack };
}

let errorStack: string[] = $state([]);

export function asyncFn<Args extends any[]>(
	callback: (...args: Args) => Promise<void>,
	url?: string,
): (...args: Args) => Promise<void> {
	return async function (...args: Args): Promise<void> {
		try {
			return await callback(...args);
		} catch (error) {
			let message = error instanceof Error ? error.stack || error.message : String(error);
			let location = `\n\tat ${callback.name || "anonymous"}`;
			if (url) location = `${location} in ${Debug.file(url)}`;
			let parsed = parseErrorStack(message);
			let result =
				parsed.message +
				parsed.stack
					.map(line => `\n\tat ${line.functionName} in ${line.file} (line ${line.line ?? "_"}, column ${line.column ?? "_"})`)
					.join("");

			result += `\nWhen calling:${location}`;
			errorStack.push(result);
		}
	};
}

export function errors(): string[] {
	return errorStack;
}

export function todo(task?: string): never {
	throw new Error(`Unimplemented task` + (task ? `: ${task}` : ""));
}

export function unreachable(explanation?: string): never {
	throw new Error(`Unreachable code reached` + (explanation ? `: ${explanation}` : ""));
}
