import type { LucideIcon } from "@lucide/svelte";
import { icons } from "@lucide/svelte";

export type IconName = keyof typeof icons;
export type IconComponent = LucideIcon;
export type Icon = { name: IconName; component: IconComponent };

export { icons };

/**
 * An object that can be used to identify a singular unqiue icon.
 */
export type IconIdentifier = IconName | IconComponent | Icon;

/**
 * Gets an icon from an `IconIdentifier`.
 *
 * @param identifier A unique identifier for the icon.
 *
 * @returns The icon data.
 */
export function getIcon(identifier: IconIdentifier): Icon {
	if (!identifier) return getIcon("OctagonX");
	if (typeof identifier === "string") return { name: identifier, component: icons[identifier] };
	if ("component" in identifier) return identifier;
	return {
		name: Object.entries(icons).find(([_name, component]) => component === identifier)![0] as IconName,
		component: identifier,
	};
}
