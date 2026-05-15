<script lang="ts" module>
	import { getIcon, GroupTab, registerGlobalView, SinglePane, type GroupView } from "@clara/api/ui";
	import { plugin } from "@clara/api/plugin";
	import type { Group } from "@clara/api/database";
	import BulletinBoard from "./board/BulletinBoard.svelte";

	export const bulletinBoardView: GroupView = {
		name: "Bulletin Board",
		icon: getIcon("StickyNote"),
		render: bulletinBoard,
		type: "group",
	};

	const extraViewsPlugin = plugin({
		name: "Extra Views",
		identifier: "extra-views",
		icon: "View",
		description: "Extra views for Clara.",

		onLoad() {
			registerGlobalView(bulletinBoardView);
		},
	});

	export { extraViewsPlugin };
</script>

{#snippet bulletinBoard({ group, pane, tab }: { group: Group; pane: SinglePane; tab: GroupTab })}
	<BulletinBoard {group} />
{/snippet}
