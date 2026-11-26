import { getIcon, Tab, View, type Icon, type ViewType } from "@clara/api/ui";
import type { Snippet } from "svelte";

export type StatusBarButton = {
	icon: Icon;
	menu?: Snippet;
	isToggle?: true;
	onClick?({ tab }: { tab: Tab<View<ViewType>> }): void;
	views?: string[];
};

let buttons: StatusBarButton[] = $state([
	{
		icon: getIcon("SpellCheck"),
		isToggle: true,
	},
]);

export function registerStatusBarButton(button: StatusBarButton) {
	buttons.push(button);
}

export function statusBarButtons(): StatusBarButton[] {
	return buttons;
}
