import type { Icon } from "./components";

const modules = import.meta.glob("../components/icons/*.svelte", { eager: true });

const icons: { [key: string]: Icon } = {};

for (const path in modules) {
	const iconName = path
		.split("/")
		.pop()!
		.replace(/\.svelte$/, "");
	icons[iconName] = (modules[path] as { default: Icon }).default;
}

export function getIconByName(name: string): Icon | null {
	return icons[name] ?? null;
}

export function getIconName(icon: Icon) {
	return Object.entries(icons).find(([_name, other]) => other === $state.snapshot(icon))![0];
}
