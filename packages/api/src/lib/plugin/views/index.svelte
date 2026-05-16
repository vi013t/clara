<script lang="ts" module>
	import { getIcon, GroupTab, ItemTab, registerGlobalView, SinglePane, type GroupView, type ItemView } from "@clara/api/ui";
	import { plugin } from "@clara/api/plugin";
	import { Item, ItemType, type Group } from "@clara/api/database";
	import BulletinBoard from "./board/BulletinBoard.svelte";
	import { Project } from "@clara/api/project";
	import { AttributeDefinition, AttributeType } from "@clara/api/attribute";

	export const bulletinBoardView: ItemView = {
		name: "Bulletin Board",
		icon: getIcon("StickyNote"),
		render: bulletinBoard,
		type: "item",
	};

	export const timelineView: GroupView = {
		name: "Timeline",
		icon: getIcon("Clock"),
		render: timeline,
		type: "group",
	};

	const extraViewsPlugin = plugin({
		name: "Extra Views",
		identifier: "extra-views",
		icon: "View",
		description: "Extra views for Clara.",

		onLoad() {
			registerGlobalView(bulletinBoardView);
			registerGlobalView(timelineView);

			Project.onSet(project => {
				if (!project.types.some(type => type.name === "Sticky Note")) {
					project!.types.push(
						new ItemType({
							name: "Sticky Note",
							icon: "StickyNote",
							attributes: [
								new AttributeDefinition({ name: "Name", type: AttributeType.fromName("shortText") }),
								new AttributeDefinition({ name: "Content", type: AttributeType.fromName("longText") }),
								new AttributeDefinition({ name: "Color", type: AttributeType.fromName("color") }),
								new AttributeDefinition({ name: "x", type: AttributeType.fromName("number"), hidden: true }),
								new AttributeDefinition({ name: "y", type: AttributeType.fromName("number"), hidden: true }),
								new AttributeDefinition({ name: "width", type: AttributeType.fromName("number"), hidden: true }),
								new AttributeDefinition({ name: "height", type: AttributeType.fromName("number"), hidden: true }),
							],
							hidden: true,
						}),
					);

					project.types.push(
						new ItemType({
							name: "Bulletin Board",
							icon: "Pin",
							attributes: [
								new AttributeDefinition({ name: "Name", type: AttributeType.fromName("shortText") }),
								new AttributeDefinition({ name: "Notes", type: AttributeType.fromName("entries") }),
							],
							defaultView: bulletinBoardView.name,
						}),
					);
				}
			});
		},
	});

	export { extraViewsPlugin };
</script>

{#snippet bulletinBoard({ item, pane, tab }: { item: Item; pane: SinglePane; tab: ItemTab })}
	<BulletinBoard {item} />
{/snippet}

{#snippet timeline({ group, pane, tab }: { group: Group; pane: SinglePane; tab: GroupTab })}{/snippet}
