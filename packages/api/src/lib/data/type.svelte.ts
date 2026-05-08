import type { Icon } from "@clara/api/icons";
import type { AttributeDefinition } from "./attribute/definition.svelte.ts";

export type ItemType = {
	name: string;
	icon: Icon;
	attributes: AttributeDefinition[];
};
