<script lang="ts">
	import { onMount } from "svelte";
	import { DocumentContent, Style, StyledText } from "../../api/data/attribute/attribute.svelte";
	import { getFonts } from "../../api/system.svelte";
	import type { Container } from "../../api/util/Clone.svelte";
	import BoldIcon from "../icons/BoldIcon.svelte";
	import BookIcon from "../icons/BookIcon.svelte";
	import DashIcon from "../icons/DashIcon.svelte";
	import ItalicIcon from "../icons/ItalicIcon.svelte";
	import LineSpacingIcon from "../icons/LineSpacingIcon.svelte";
	import MoonIcon from "../icons/MoonIcon.svelte";
	import PlusIcon from "../icons/PlusIcon.svelte";
	import SaveIcon from "../icons/SaveIcon.svelte";
	import SunIcon from "../icons/SunIcon.svelte";
	import UnderlineIcon from "../icons/UnderlineIcon.svelte";
	import UndoIcon from "../icons/UndoIcon.svelte";
	import Select from "../input/Select.svelte";

	let {
		title,
		doc = $bindable(),
	}: {
		title?: string;
		doc?: DocumentContent;
	} = $props();

	let internalDocument = $state(doc ?? new DocumentContent());

	$effect(() => {
		doc = internalDocument;
	});

	$effect(() => {
		if (doc !== undefined && doc !== internalDocument) {
			internalDocument = doc;
		}
	});

	export function getTitle() {
		return title;
	}

	export function getIcon() {
		return BookIcon;
	}

	let currentPartIndex = $state(0);
	// svelte-ignore state_referenced_locally
	let cursorPosition = $state(internalDocument.partAtIndex(currentPartIndex).ref().text.length);
	let childElements = $derived(
		internalDocument.toHTML().map(element => {
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
		internalDocument.some((part, index) => {
			let partClone = part.clone();
			if (index === currentPartIndex) partClone.text = partClone.text.substring(0, cursorPosition);
			html += partClone.toHTML(index, index === internalDocument.partCount() - 1).outerHTML;
			return index === currentPartIndex;
		});
		return html;
	});

	let editor: HTMLElement;
	let cursorContent: HTMLElement;

	function currentPart(): Container<StyledText> {
		return internalDocument.partAtIndex(currentPartIndex);
	}

	function currentStyle(): Container<Style> {
		return internalDocument.partAtIndex(currentPartIndex).ref().style;
	}

	function moveCursor(amount: number) {
		cursorPosition += amount;

		while (cursorPosition < 0 && currentPartIndex > 0) {
			currentPartIndex--;
			cursorPosition = currentPart().ref().text.length - cursorPosition;
		}

		while (cursorPosition > currentPart().ref().text.length && currentPartIndex < internalDocument.partCount() - 2) {
			const oldPartLength = currentPart().ref().text.length;
			currentPartIndex++;
			cursorPosition = cursorPosition - oldPartLength;
		}

		if (currentPartIndex === 0) cursorPosition = Math.max(0, cursorPosition);
		if (currentPartIndex === internalDocument.partCount() - 1)
			cursorPosition = Math.min(cursorPosition, currentPart().ref().text.length);
	}

	function typeAtCursor(text: string) {
		let before = currentPart().ref().text.substring(0, cursorPosition);
		let after = currentPart().ref().text.substring(cursorPosition);
		internalDocument.partAtIndex(currentPartIndex).ref().text = before + text + after;
		cursorPosition += text.length;
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
			if (cursorPosition !== 0 || currentPartIndex !== 0) {
				let before = currentPart()
					.ref()
					.text.substring(0, cursorPosition - 1);
				let after = currentPart().ref().text.substring(cursorPosition);
				internalDocument.partAtIndex(currentPartIndex).ref().text = before + after;
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
		currentPartIndex = Number(element.getAttribute("data-part-index"));
		let accumulatedValue = 0;
		if (
			!Array.from(element.children).some((character, characterIndex) => {
				accumulatedValue += character.getBoundingClientRect().width;
				if (accumulatedValue > event.clientX - element.getBoundingClientRect().left) {
					cursorPosition = characterIndex + 1;
					return true;
				}
				return false;
			})
		) {
			cursorPosition = 0;
		}
	}

	function cleanup() {
		// Move cursor out of empty part (about to be removed)
		while (currentPart().ref().text === "" && currentPartIndex > 0) {
			currentPartIndex--;
			cursorPosition = 0;
		}

		// Remove empty parts
		internalDocument = internalDocument.filter((part, index) => part.text !== "" || index === 0);

		// Merge adjacent parts with equivalent styles
		let newDocument = new DocumentContent();
		let removedAmount = 0;
		for (let index = 0; index < internalDocument.partCount() - 1; index += 2) {
			let first = internalDocument.partAtIndex(index).ref();
			let second = internalDocument.partAtIndex(index + 1).ref();
			if (first.style.ref().equals(second.style.ref())) {
				newDocument.addPart(new StyledText(first.text + second.text, first.style.clone()));
				if (currentPartIndex >= index + 1) {
					removedAmount++;
				}
			} else {
				newDocument.addPart(first);
				newDocument.addPart(second);
			}
		}
		internalDocument = newDocument;
	}

	function toggleBold() {
		const style = currentStyle().cloneContainer();
		style.ref().bold = !style.ref().bold;

		// End
		if (currentPartIndex === internalDocument.partCount() - 1 && cursorPosition === currentPart().ref().text.length) {
			const part = new StyledText("", style.clone());
			internalDocument.addPart(part);
			currentPartIndex = internalDocument.partCount() - 1;
			cursorPosition = 0;
		}

		// Beginning
		else if (currentPartIndex === 0 && cursorPosition === 0) {
			const part = new StyledText("", style.clone());
			internalDocument.prependPart(part);
			currentPartIndex = 0;
			cursorPosition = 0;
		} else {
			let currentPartAfter = new StyledText(
				currentPart().ref().text.substring(cursorPosition),
				currentPart().ref().style.clone(),
			);
			let newPart = new StyledText("", style.clone());
			internalDocument.partAtIndex(currentPartIndex).ref().text = currentPart().ref().text.substring(0, cursorPosition);
			internalDocument.addPartAtIndex(newPart, currentPartIndex + 1);
			internalDocument.addPartAtIndex(currentPartAfter, currentPartIndex + 2);
			currentPartIndex += 1;
			cursorPosition = 0;
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
	}

	function onfocus() {
		currentPartIndex = internalDocument.partCount() - 1;
		cursorPosition = currentPart().ref().text.length;
	}

	onMount(() => {
		editor.focus();
	});

	function addFontSize(amount: number) {
		return function () {
			fontSize = `${Math.max(parseInt(fontSize) + amount, 1)}`;
		};
	}

	let font = $state("Garamond");
	let fontSize = $state("16");
	let viewMode: "light" | "dark" = $state("dark");

	function save() {}
</script>

<svelte:document onkeydown={onDocumentKeydown} />

<div class={["wrapper", viewMode === "light" && "light"]}>
	{#if title}
		<h1 contenteditable bind:textContent={title}></h1>
	{/if}
	<div class="toolbar">
		<div class="formatting">
			<button>
				<UndoIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
			</button>
			<button>
				<UndoIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem; transform: scaleX(-100%);" />
			</button>
		</div>
		<div class="font-size">
			<button onmousedown={addFontSize(-1)}>
				<DashIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
			</button>
			<input bind:value={fontSize} />
			<button onmousedown={addFontSize(1)}>
				<PlusIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
			</button>
		</div>
		{#await getFonts() then fonts}
			<Select
				style="background-color: transparent; border: none; color: {viewMode === 'dark' ? '#cdd6f4' : 'black'};"
				options={fonts.map(font => ({ name: font, style: `font-family: "${font}"` }))}
				bind:value={font}
				width="7rem"
			/>
		{/await}
		<div class="formatting">
			<button>
				<BoldIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
			</button>
			<button>
				<ItalicIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
			</button>
			<button>
				<UnderlineIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
			</button>
		</div>
		<div class="formatting">
			<button>
				<LineSpacingIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
			</button>
			<button onmousedown={() => (viewMode = viewMode === "light" ? "dark" : "light")}>
				{#if viewMode === "dark"}
					<SunIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
				{:else}
					<MoonIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
				{/if}
			</button>
		</div>
		<div class="formatting">
			<button>
				<SaveIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
			</button>
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
		color: #cdd6f4;
		font-size: 1.5rem;
	}

	.toolbar {
		display: flex;
		gap: 0.5rem;
		border-bottom: 1px solid #313244;
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
		border-left: 1px solid #313244;
		padding-right: 0.75rem;
		padding-left: 1.1rem;

		&:first-child {
			border: none;
		}

		button {
			padding: 0.25rem;
			border-radius: 0.25rem;
			display: flex;
			align-items: center;
			justify-content: center;
			--stroke: #cdd6f4;

			&:hover {
				--stroke: #181825;
				background-color: #b4befe;
			}
		}
	}

	.font-size {
		width: fit-content;
		display: flex;
		gap: 0.5rem;
		border-right: 1px solid #313244;
		border-left: 1px solid #313244;
		padding-left: 0.5rem;
		padding-right: 0.5rem;
		align-items: center;

		input {
			color: #cdd6f4;
			width: 2rem;
			text-align: center;
			border: 1px solid #313244;
			height: 1.5rem;
			border-radius: 0.25rem;
		}

		button {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0.25rem;
			border-radius: 0.25rem;
			--stroke: #cdd6f4;

			&:hover {
				--stroke: #181825;
				background-color: #b4befe;
			}
		}
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		height: calc(100% - 2rem);

		&.light {
			background-color: white;

			.editor {
				border-color: #cccccc;
				color: black;
			}

			button {
				--stroke: black;
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
		}
	}

	.content {
		position: relative;
		width: 100%;
		flex-grow: 1;

		.editor {
			cursor: text;
			color: #cdd6f4;
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
