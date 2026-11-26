<script lang="ts" module>
	import type { AttributeRef } from "@clara/api/attribute";
	import { EditorView } from "@clara/api/components";
	import { AttributeTab, AttributeView, getIcon, Tab, type View, type ViewType } from "@clara/api/ui";
	import type { ViewFactory } from "../views.svelte.ts";

	export const editorFactory: ViewFactory<"attribute"> = {
		identifier: "editor",
		icon: getIcon("Pencil"),
		type: "attribute",
		createTab(tab: Tab<View<ViewType>, ViewType>): Tab<AttributeView> {
			if (tab instanceof AttributeTab) {
				return new AttributeTab(tab.attribute, new Editor(tab.attribute));
			}

			throw new Error("Attempted to open editor view in non-attribute tab.");
		},
	};

	export class Editor extends AttributeView {
		public render = renderEditor;
		public readonly identifier = "editor";

		public constructor(attribute: AttributeRef) {
			super(attribute);
		}
	}
</script>

{#snippet renderEditor({ tab }: { tab: AttributeTab })}
	<EditorView {tab} />
{/snippet}
