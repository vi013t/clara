<script lang="ts">
	import { onMount } from "svelte";
	import { RichText, Style, StyledText } from "@clara/api/attribute";
	import { LittleButton } from "@clara/api/components";
	import { AttributeTab } from "@clara/api/ui";
	import { getListeners } from "@clara/api/plugin";
	import { Project } from "@clara/api/project";

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

	let content = $derived(tab.attribute.valueAs<RichText>()!);

	let cursor = $state({ part: 0, position: 0 });

	export function getTitle() {
		return title;
	}

	// svelte-ignore state_referenced_locally
	cursor.position = content.partAtIndex(cursor.part).text.length;
	let childElements = $derived(
		content.toHTML().map(element => {
			element.addEventListener("mousedown", event => onPartClick(element, event));
			return element;
		}),
	);

	$effect(() => {
		editor.innerHTML = "";
		for (let element of childElements) {
			editor.appendChild(element);
		}
	});

	let cursorContentHTML = $derived.by(() => {
		let html = "";
		content.some((part, index) => {
			let partClone = part.clone();
			if (index === cursor.part) partClone.text = partClone.text.substring(0, cursor.position);
			html += partClone.toHTML(index, index === content.partCount() - 1).outerHTML;
			return index === cursor.part;
		});
		return html;
	});

	let editor: HTMLElement;
	let cursorContent: HTMLElement;

	function currentPart(): StyledText {
		return content.partAtIndex(cursor.part);
	}

	function currentStyle(): Style {
		return content.partAtIndex(cursor.part).style;
	}

	function moveCursor(amount: number) {
		cursor.position += amount;

		while (cursor.position < 0 && cursor.part > 0) {
			cursor.part--;
			cursor.position = currentPart().text.length - cursor.position;
		}

		while (cursor.position > currentPart().text.length && cursor.part < content.partCount() - 2) {
			const oldPartLength = currentPart().text.length;
			cursor.part++;
			cursor.position = cursor.position - oldPartLength;
		}

		if (cursor.part === 0) cursor.position = Math.max(0, cursor.position);
		if (cursor.part === content.partCount() - 1) cursor.position = Math.min(cursor.position, currentPart().text.length);
	}

	function typeAtCursor(text: string) {
		let before = currentPart().text.substring(0, cursor.position);
		let after = currentPart().text.substring(cursor.position);
		content.partAtIndex(cursor.part).text = before + text + after;
		cursor.position += text.length;
	}

	function onkeypress(event: KeyboardEvent) {
		if (event.ctrlKey || event.metaKey || event.altKey) return;
		event.preventDefault();

		if (event.key === "ArrowLeft") {
			moveCursor(-1);
			return;
		}

		if (event.key === "ArrowRight") {
			moveCursor(1);
			return;
		}

		if (event.key === "Tab") {
			typeAtCursor("\t");
			return;
		}

		if (event.key === "Enter") {
			typeAtCursor("\n\t");
			return;
		}

		if (event.key === "Backspace") {
			if (cursor.position !== 0 || cursor.part !== 0) {
				let before = currentPart().text.substring(0, cursor.position - 1);
				let after = currentPart().text.substring(cursor.position);
				content.partAtIndex(cursor.part).text = before + after;
				moveCursor(-1);
			}
			return;
		}

		if (event.key.length !== 1 || event.key.charCodeAt(0) > 127) {
			return;
		}

		typeAtCursor(event.key);
	}

	function onPartClick(element: HTMLElement, event: MouseEvent) {
		cursor.part = Number(element.getAttribute("data-part-index"));
		let accumulatedValue = 0;
		if (
			!Array.from(element.children).some((character, characterIndex) => {
				accumulatedValue += character.getBoundingClientRect().width;
				if (accumulatedValue > event.clientX - element.getBoundingClientRect().left) {
					cursor.position = characterIndex + 1;
					return true;
				}
				return false;
			})
		) {
			cursor.position = 0;
		}
	}

	function cleanup() {
		// Move cursor out of empty part (about to be removed)
		while (currentPart().text === "" && cursor.part > 0) {
			cursor.part--;
			cursor.position = 0;
		}

		// Remove empty parts
		content = content.filter((part, index) => part.text !== "" || index === 0);

		// Merge adjacent parts with equivalent styles
		let newDocument = new RichText();
		let removedAmount = 0;
		for (let index = 0; index < content.partCount() - 1; index += 2) {
			let first = content.partAtIndex(index);
			let second = content.partAtIndex(index + 1);
			if (first.style.equals(second.style)) {
				newDocument.addPart(new StyledText(first.text + second.text, first.style.clone()));
				if (cursor.part >= index + 1) {
					removedAmount++;
				}
			} else {
				newDocument.addPart(first);
				newDocument.addPart(second);
			}
		}
		content = newDocument;
	}

	function toggleBold() {
		const style = currentStyle().clone();
		style.bold = !style.bold;

		// End
		if (cursor.part === content.partCount() - 1 && cursor.position === currentPart().text.length) {
			const part = new StyledText("", style.clone());
			content.addPart(part);
			cursor.part = content.partCount() - 1;
			cursor.position = 0;
		}

		// Beginning
		else if (cursor.part === 0 && cursor.position === 0) {
			const part = new StyledText("", style.clone());
			content.prependPart(part);
			cursor.part = 0;
			cursor.position = 0;
		} else {
			let currentPartAfter = new StyledText(currentPart().text.substring(cursor.position), currentPart().style.clone());
			let newPart = new StyledText("", style.clone());
			content.partAtIndex(cursor.part).text = currentPart().text.substring(0, cursor.position);
			content.addPartAtIndex(newPart, cursor.part + 1);
			content.addPartAtIndex(currentPartAfter, cursor.part + 2);
			cursor.part += 1;
			cursor.position = 0;
		}
	}

	function highlightAll() {
		const range = document.createRange();
		range.selectNodeContents(editor);

		const selection = window.getSelection()!;
		selection.removeAllRanges();
		selection.addRange(range);
	}

	function onDocumentKeydown(event: KeyboardEvent) {
		const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
		if ((isMac ? event.metaKey : event.ctrlKey) && event.key === "b") {
			event.preventDefault();
			toggleBold();
		} else if ((isMac ? event.metaKey : event.ctrlKey) && event.key === "a") {
			if (document.activeElement === ($state.snapshot(editor) as any)) {
				event.preventDefault();
				highlightAll();
			}
		}

		getListeners({ inside: "Editor", on: "keydown" }).forEach(listener => listener.run({ tab, project: Project.get()!, event }));
	}

	function onfocus() {
		cursor.part = content.partCount() - 1;
		cursor.position = currentPart().text.length;
	}

	onMount(() => {
		editor.focus();
	});

	let font = $state("Segoe UI");
	let fontSize = $state("16");

	let foreground = "var(--foreground)";
	let element: HTMLElement;
</script>

<svelte:document onkeydown={onDocumentKeydown} />

<div bind:this={element} class={["wrapper"]}>
	{#if title}
		<h1 contenteditable bind:textContent={title}></h1>
	{/if}
	<div class="toolbar">
		<div class="formatting">
			<LittleButton color={foreground} icon="Bold" />
			<LittleButton color={foreground} icon="Italic" />
			<LittleButton color={foreground} icon="Underline" />
		</div>
	</div>
	<div class="content">
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="editor"
			bind:this={editor}
			tabindex="0"
			onblur={cleanup}
			{onfocus}
			onkeydown={onkeypress}
			style:font-family={font}
			style:font-size="{fontSize}px"
		></div>
		<div class="cursor-content" bind:this={cursorContent} style:font-family={font} style:font-size="{fontSize}px">
			{@html cursorContentHTML}
		</div>
	</div>
</div>

<style>
	h1 {
		color: var(--foreground-bright);
		font-size: 1.5rem;
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

		/* &.light {
			background-color: white;

			.editor {
				border-color: #cccccc;
				color: black;
			}

			.toolbar {
				border-color: #cccccc;
			}

			input {
				color: black;
			}

			.cursor-content {
				--cursor: black;
			}

			.font-size {
				border-color: #cccccc;
				border-color: #cccccc;
			}

			.formatting {
				border-color: #cccccc;
			}
		} */
	}

	.content {
		position: relative;
		width: 100%;
		flex-grow: 1;

		.editor {
			cursor: text;
			color: var(--foreground-bright);
		}

		.editor,
		.cursor-content {
			width: 100%;
			flex-grow: 1;
			font-size: 1rem;
			overflow: scroll;
			position: absolute;
			top: 0px;
			left: 0px;
			padding: 1rem;
			height: 100%;
			tab-size: 2.75em;

			:global(> *, .character) {
				text-wrap: wrap;
				white-space: pre-wrap;
				overflow-wrap: break-word;
				display: inline;
				font-family: inherit;
			}
		}

		.cursor-content {
			--cursor: white;
			transform: translateY(-5px);
		}
	}

	.content:has(.editor:focus) :global(.cursor) {
		animation: cursor-blink 1s infinite;
	}

	.content:not(:has(.editor:focus)) :global(.cursor) {
		animation: none;
		color: transparent;
	}

	.cursor-content {
		color: transparent;
		pointer-events: none;
	}

	@keyframes -global-cursor-blink {
		0% {
			color: var(--cursor);
		}
		50% {
			color: var(--cursor);
		}
		51% {
			color: transparent;
		}
		100% {
			color: transparent;
		}
	}
</style>
