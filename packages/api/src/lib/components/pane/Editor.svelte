<script lang="ts">
	import { RichText, Style, StyledText } from "@clara/api/attribute";
	import { LittleButton } from "@clara/api/components";
	import { editorBarButtons, getListeners } from "@clara/api/plugin";
	import { Project } from "@clara/api/project";
	import { AttributeTab } from "@clara/api/ui";
	import { userSettings } from "@clara/api/usersettings";
	import { onMount } from "svelte";

	let {
		title,
		tab = $bindable(),
	}: {
		title?: string;
		tab: AttributeTab;
	} = $props();

	if (!tab.attribute.value) {
		tab.attribute.value = new RichText();
	}

	let element: HTMLElement = $state(null!);

	function onDocumentKeydown(event: KeyboardEvent) {
		getListeners({ inside: "Editor", on: "keydown" }).forEach(listener => listener.run({ tab, project: Project.get()!, event }));
	}

	let foreground = "var(--foreground)";

	function oninput() {
		tab.attribute.value = parseDocument(element);
	}

	function parseDocument(element: HTMLElement) {
		const parts: StyledText[] = [];

		function visit(node: Node, inheritedStyle: Style) {
			if (node.nodeType === Node.TEXT_NODE) {
				const text = node.textContent ?? "";

				if (text.length > 0) {
					parts.push(new StyledText(text, inheritedStyle.clone()));
				}

				return;
			}

			if (!(node instanceof HTMLElement)) return;

			const style = inheritedStyle.clone();

			if (node.tagName === "B" || node.tagName === "STRONG") {
				style.bold = true;
			}

			if (node.tagName === "I" || node.tagName === "EM") {
				style.italic = true;
			}

			if (node.tagName === "U") {
				style.underline = true;
			}

			for (const child of node.childNodes) {
				visit(child, style);
			}
		}

		visit(element, new Style({}));

		return new RichText(parts);
	}

	onMount(() => {
		// tab.attribute
		// 	.valueAs<RichText>()!
		// 	.toHTML()
		// 	.map(part => element.appendChild(part));
	});

	function toggleStyle(tagName: string) {
		return function () {
			const selection = window.getSelection();

			if (!selection || !element.contains(selection.anchorNode)) return;

			const range = selection.getRangeAt(0);
			const strong = document.createElement(tagName);

			// no text selected
			if (range.collapsed) {
				range.insertNode(strong);

				const newRange = document.createRange();
				newRange.setStart(strong, 0);
				newRange.collapse(true);

				selection.removeAllRanges();
				selection.addRange(newRange);
			}

			// text selected
			else {
				const contents = range.extractContents();
				strong.appendChild(contents);
				range.insertNode(strong);

				range.selectNodeContents(strong);
				selection.removeAllRanges();
				selection.addRange(range);
			}
		};
	}

	function defaultless(other: () => void) {
		return function (event: Event) {
			event.preventDefault();
			other();
		};
	}
</script>

<svelte:document onkeydown={onDocumentKeydown} />

<div class={["wrapper"]}>
	{#if title}
		<h1 contenteditable bind:textContent={title}></h1>
	{/if}
	<div class="toolbar">
		<div class="formatting">
			<LittleButton color={foreground} icon="Bold" onmousedown={defaultless(toggleStyle("b"))} />
			<LittleButton color={foreground} icon="Italic" onmousedown={defaultless(toggleStyle("i"))} />
			<LittleButton color={foreground} icon="Underline" />
			{#each editorBarButtons() as [_pluginId, buttons]}
				<div class="separator"></div>
				{#each buttons as button}
					<LittleButton
						color={foreground}
						icon={button.icon}
						toggle
						onmousedown={() => button.action({ element }, userSettings())}
					/>
				{/each}
			{/each}
		</div>
	</div>
	<div {oninput} contenteditable="true" class="content" bind:this={element}></div>
</div>

<style>
	h1 {
		color: var(--foreground-bright);
		font-size: 1.5rem;
	}

	.separator {
		height: 100%;
		width: 1.5px;
		border-radius: 100vmax;
		background-color: var(--border);
		margin-left: 0.5rem;
		margin-right: 0.5rem;
	}

	.toolbar {
		display: flex;
		gap: 0.5rem;
		border-bottom: 1px solid var(--border);
		overflow-x: auto;
		overflow-y: visible;
		padding-left: 0.5rem;
		padding-right: 0.5rem;
		justify-content: center;
		height: 2.5rem;
		align-items: center;

		> * {
			height: 60%;
		}
	}

	.formatting {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		border-left: 1px solid var(--border);
		padding-right: 0.75rem;
		padding-left: 1.1rem;

		&:first-child {
			border: none;
		}
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		height: calc(100% - 2rem);
		overflow-y: auto;
	}

	.content {
		position: relative;
		width: 100%;
		flex-grow: 1;
		color: var(--foreground-bright);
		padding: 1rem;

		:global(strong, b) {
			font-weight: bold;
		}

		:global(*) {
			font-family: inherit;
		}
	}
</style>
