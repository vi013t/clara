export namespace Debug {
	export function logColor(
		message: string,
		url: string | undefined = undefined,
		severity: string = "Info",
		bright: string = "#b7d2fe",
		dark: string = "#33425b",
	) {
		if (import.meta.env.PROD) return;
		let args = [
			`%c${severity}:%c\n%c${message}${url ? ` %c\n%cAt ${Debug.path(url)}` : ""}`,
			`color: ${bright}; background: ${dark}; padding: 8px; border-radius: 5px; margin-top: 4px; font-weight: bold; margin-bottom: 8px;`,
			"",
			`color: ${bright}; background: ${dark}; padding: 16px; border-radius: 5px; margin-bottom: 8px;`,
		];
		if (url) {
			args.push("");
			args.push("color: #b7d2fe; background: #33425b; padding: 8px; border-radius: 5px; margin-bottom: 16px;");
		}
		console.log(...args);
	}

	export function errors(errors: string[]): void {
		if (import.meta.env.PROD) return;
		let log = "%c!! ERROR !!%c";
		let css: string[] = [
			`color: #f38ba8; background: #4e3534; padding: 8px; border-radius: 5px; margin-top: 4px; font-weight: bold; margin-bottom: 8px;`,
			"",
			`color: #f38ba8; background: #4e3534; padding-left: 16px; padding-right: 16px; border-radius: 5px;`,
		];
		errors.forEach(line => {
			log += `\n%c${line}`;
		});
		console.log(log, ...css);
	}

	export function success(message: string, url?: string): void {
		Debug.logColor(message, url, "Success", "#a6e3a1", "#344532");
	}

	export function info(message: string, url?: string): void {
		Debug.logColor(message, url, "Info", "#b7d2fe", "#33425b");
	}

	export function warn(message: string, url?: string): void {
		Debug.logColor(message, url, "!! Warning !!", "#f9e2af", "#413c26");
	}

	export function error(message: string, url?: string): void {
		Debug.logColor(message, url, "!! ERROR !!", "#f38ba8", "#4e3534");
	}

	export function test(value: any, message: string, url: string, severity: "error" | "warning" = "error") {
		if (!value) {
			if (severity === "error") {
				Debug.error("Failed check: " + message, url);
			} else {
				Debug.warn("Failed check: " + message, url);
			}
		} else {
			Debug.success("Successful check: " + message, url);
		}
	}

	export function file(url: string): string {
		return /([^\/\\]+)$/.exec(path(url))![1];
	}

	export function path(url: string): string {
		return /^.+(\/src.+?)(\?|:)/.exec(url)?.[1] ?? url;
	}

	export function log(...args: unknown[]): void {
		if (import.meta.env.PROD) return;
		console.log(...args);
	}
}
