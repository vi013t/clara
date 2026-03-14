<script lang="ts">
	import { onMount } from "svelte";
	import Pane from "../Pane.svelte";
	import BookIcon from "../icons/BookIcon.svelte";
	import View from "../views/View.svelte";

    let { title = undefined }: { title?: string } = $props();

    type Style = {
        bold: boolean;
        italic: boolean;
    }

    type Part = {
        text: string;
        style: Style;
    }

    function stylesAreEqual(style1: Style, style2: Style): boolean {
        return style1.bold === style2.bold
            && style1.italic === style2.italic;
    }

    function partToHTML(part: Part, index: number, addCursor: boolean = false): HTMLElement {
        let element = document.createElement("pre");
        element.setAttribute("data-part-index", `${index}`)
        element.addEventListener("mousedown", (event) => onPartClick(element, event));

        let html = "";
        if (part.style.bold) html += "<b>";

        for (let character of part.text) {
            html += `<pre class="character">${character}</pre>`
        }

        if (part.style.bold) html += "</b>";

        if (addCursor) html += "<span class='cursor'>|</span>"
        element.innerHTML = html;

        return element;
    }

    let internalDocument: Part[] = $state([{ text: "", style: { bold: false, italic: false } }]);
    let currentPartIndex = $state(0);
    let cursorPosition = $state(internalDocument[currentPartIndex].text.length);
    let childElements = $derived(internalDocument.map((part, index) => partToHTML(part, index)));

    $effect(() => {
        editor.innerHTML = "";
        for (let element of childElements) {
            editor.appendChild(element);
        }
        editor.focus();
    });

    let cursorContentHTML = $derived.by(() => {
        let html = ""
        internalDocument.some((part, index) => {
            let partClone = structuredClone($state.snapshot(part));
            if (index === currentPartIndex) partClone.text = partClone.text.substring(0, cursorPosition);
            html += partToHTML(partClone, index, index === internalDocument.length - 1).outerHTML;
            return index === currentPartIndex;
        });
        return html;
    })

    let editor: HTMLElement;
    let cursorContent: HTMLElement;

    function currentPart(): Part {
        return internalDocument[currentPartIndex];
    }

    function currentStyle(): Style {
        return internalDocument[currentPartIndex].style;
    }

    function moveCursor(amount: number) { 
        cursorPosition += amount;

        while (cursorPosition < 0 && currentPartIndex > 0) {
            currentPartIndex--;
            cursorPosition = currentPart().text.length - cursorPosition;
        }

        while (cursorPosition > currentPart().text.length && currentPartIndex < internalDocument.length - 2) {
            const oldPartLength = currentPart().text.length;
            currentPartIndex++;
            cursorPosition = cursorPosition - oldPartLength;
        }

        if (currentPartIndex === 0) cursorPosition = Math.max(0, cursorPosition);
        if (currentPartIndex === internalDocument.length - 1) cursorPosition = Math.min(cursorPosition, currentPart().text.length);
    }

    function onkeypress(event: KeyboardEvent) {
        if (event.ctrlKey || event.metaKey || event.altKey) return;
        event.preventDefault();

        if (event.key === "ArrowLeft") {
            moveCursor(-1);
        }

        if (event.key === "ArrowRight") {
            moveCursor(1);
        }

        if (event.key === "Backspace") {
            if (cursorPosition !== 0 || currentPartIndex !== 0) {
                let before = currentPart().text.substring(0, cursorPosition - 1);
                let after = currentPart().text.substring(cursorPosition);
                internalDocument[currentPartIndex].text = before + after;
                moveCursor(-1);
            }
            return;
        }

        if (event.key.length !== 1 || event.key.charCodeAt(0) > 127) {
            return;
        }

        let before = currentPart().text.substring(0, cursorPosition);
        let after = currentPart().text.substring(cursorPosition);
        internalDocument[currentPartIndex].text = before + event.key + after;
        cursorPosition++;
    }

    function onPartClick(element: HTMLElement, event: MouseEvent) {
        currentPartIndex = Number(element.getAttribute("data-part-index"));
        let accumulatedValue = 0;
        if (!Array.from(element.children).some((character, characterIndex) => {
            accumulatedValue += character.getBoundingClientRect().width;
            if (accumulatedValue > event.clientX - element.getBoundingClientRect().left) {
                cursorPosition = characterIndex + 1;
                return true;
            }
            return false;
        })) {
            cursorPosition = 0;
        }
    }

    function cleanup() {
        // Move cursor out of empty part (about to be removed)
        while (currentPart().text === "" && currentPartIndex > 0) {
            currentPartIndex--;
            cursorPosition = 0;
        }

        // Remove empty parts
        internalDocument = internalDocument.filter((part, index) => part.text !== "" || index === 0);

        // Merge adjacent parts with equivalent styles
        let newDocument: Part[] = [];
        let removedAmount = 0;
        for (let index = 0; index < internalDocument.length - 1; index += 2) {
            let first = internalDocument[index];
            let second = internalDocument[index + 1];
            if (stylesAreEqual(first.style, second.style)) {
                newDocument.push({
                    text: first.text + second.text,
                    style: first.style
                });
                if (currentPartIndex >= index + 1) {
                    removedAmount++;
                }
            } else {
                newDocument.push(first);
                newDocument.push(second);
            }
        }
    }

    function toggleBold() {
        const style = structuredClone($state.snapshot(currentStyle()));
        style.bold = !style.bold;

        // End
        if (currentPartIndex === internalDocument.length - 1 && cursorPosition === currentPart().text.length) {
            const part: Part = {
                text: "",
                style
            }
            internalDocument.push(part);
            currentPartIndex = internalDocument.length - 1;
            cursorPosition = 0;
        }

        // Beginning
        else if (currentPartIndex === 0 && cursorPosition === 0) {
            const part: Part = {
                text: "",
                style
            }
            internalDocument.unshift(part);
            currentPartIndex = 0;
            cursorPosition = 0;
        }

        else {
            let currentPartAfter: Part = {
                text: currentPart().text.substring(cursorPosition),
                style: structuredClone($state.snapshot(currentPart().style))
            };
            let newPart: Part = {
                text: "",
                style
            };
            internalDocument[currentPartIndex].text = currentPart().text.substring(0, cursorPosition);
            internalDocument.splice(currentPartIndex + 1, 0, newPart);
            internalDocument.splice(currentPartIndex + 2, 0, currentPartAfter);
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
        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        if ((isMac ? event.metaKey : event.ctrlKey) && event.key === 'b') {
            event.preventDefault();
            toggleBold();
        }
        else if ((isMac ? event.metaKey : event.ctrlKey) && event.key === 'a') {
            if (document.activeElement === $state.snapshot(editor) as any) {
                event.preventDefault();
                highlightAll();
            }
        }
    }

    function onfocus() {
        currentPartIndex = internalDocument.length - 1;
        cursorPosition = currentPart().text.length;
    }

    onMount(() => {
        editor.focus();
    });
</script>

<svelte:document onkeydown={onDocumentKeydown} />

<Pane tabs={[{ title: "Editor", icon: BookIcon }]} width="38rem"> 
    <View views={["markdown", "preview"]} view="preview">
        {#if title}
            <h1>{title}</h1>
        {/if}
        <div class="content">
            <div class="editor" bind:this={editor} tabindex="0" onblur={cleanup} {onfocus} onkeydown={onkeypress}></div>
            <div class="cursor-content" bind:this={cursorContent}>
                {@html cursorContentHTML}
            </div>
        </div>
    </View>
</Pane>

<style>
    h1 {
        color: #cdd6f4;
        margin-bottom: 1rem;
    }

    .content {
        position: relative;
        width: 100%;
        height: 100%;

        .editor {
            cursor: text;
            color: #cdd6f4;
        }

        .editor, .cursor-content {
            width: 100%;
            height: 100%;
            overflow: scroll;
            position: absolute;
            top: 0px; left: 0px;

            :global(> *, .character) {
                text-wrap: wrap;
                display: inline;
            }
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
            color: white;
        }
        50% {
            color: white;
        }
        51% {
            color: transparent;
        }
        100% {
            color: transparent;
        }
    }
</style>