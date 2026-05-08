import type { Icon } from "@clara/api/ui";

export abstract class Randomizer<P extends Record<string, string> = any, T = any> {
	public constructor(
		public readonly name: string,
		public readonly description: string,
		public readonly icon: Icon,
	) {}
	public abstract random(parameters: P): T;
}
