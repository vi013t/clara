<script lang="ts">
	import { onMount, type Snippet } from "svelte";
	import { mouse } from "../InputHandler.svelte";

	let {
		left = $bindable(),
		right,
		bottom,
		top = $bindable(),
		onclose = () => {},
		children,
	}: {
		left?: string;
		top?: string;
		bottom?: string;
		right?: string;
		submenu?: boolean;
		onclose?: () => void;
		children: Snippet;
	} = $props();

	let visible = $state(false);
	let doneTransitioning = $state(true);
	let transitionTimer: NodeJS.Timeout | null = $state(null);
	let innerWidth: number = $state(0);
	let domElement: HTMLElement | null = $state(null);
	let flipX = $derived.by(() => {
		return domElement ? domElement.getBoundingClientRect().right > innerWidth : false;
	});
	let flipY = $state(false);
	let transformOriginX = $derived(left ? (flipX ? "100%" : "0%") : flipX ? "0%" : "100%");
	let transformOriginY = $derived(top ? (flipY ? "100%" : "0%") : flipY ? "0%" : "100%");

	export function toggle() {
		if (visible) close();
		else open();
	}

	export function open() {
		if (!doneTransitioning) return;
		forceOpen();
	}

	export function forceOpen() {
		doneTransitioning = false;
		visible = true;
		if (transitionTimer) clearTimeout(transitionTimer);
		transitionTimer = setTimeout(() => {
			doneTransitioning = true;
		}, 100);
	}

	export function openAtMouse(event?: MouseEvent) {
		event?.preventDefault();
		let position = mouse().relativeTo(domElement!);
		left = `${position.x}px`;
		top = `${position.y}px`;
		open();
	}

	export function close() {
		if (!doneTransitioning) return;
		forceClose();
	}

	export function forceClose() {
		doneTransitioning = false;
		visible = false;
		onclose();
		if (transitionTimer) clearTimeout(transitionTimer);
		transitionTimer = setTimeout(() => {
			doneTransitioning = true;
		}, 100);
	}

	export function element(): HTMLElement {
		return domElement!;
	}

	function onmousedown(event: MouseEvent) {
		if (visible && doneTransitioning && domElement && !event.composedPath().includes(domElement)) {
			close();
		}
	}

	export function openingState() {
		if (doneTransitioning && visible) return "open";
		if (!doneTransitioning && visible) return "opening";
		if (doneTransitioning && !visible) return "closing";
		return "closed";
	}

	let mouseInside = $state(false);

	function cursorIsInBox(
		mouseX: number,
		mouseY: number,
		box: DOMRect,
		{ padLeft, padRight, padTop, padBottom }: { padLeft?: number; padRight?: number; padTop?: number; padBottom?: number } = {},
	) {
		return (
			mouseX >= box.left - (padLeft ?? 0) &&
			mouseX <= box.right + (padRight ?? 0) &&
			mouseY >= box.top - (padTop ?? 0) &&
			mouseY <= box.bottom + (padBottom ?? 0)
		);
	}

	// Handle submenus
	onMount(() => {
		let parentMenu = domElement!.parentElement!.closest(".context-menu");
		if (!parentMenu) return;

		domElement!.parentElement!.addEventListener("mouseenter", event => {
			if (parentMenu.matches(".open") && !domElement!.parentElement!.matches(".disabled")) {
				left = `${parentMenu.getBoundingClientRect().width}px`;
				top = `${domElement!.parentElement!.getBoundingClientRect().top - domElement!.offsetParent!.getBoundingClientRect().top - 10}px`;
				forceOpen();
			}
		});

		document.addEventListener("mousemove", event => {
			const parentRect = domElement?.parentElement?.getBoundingClientRect();
			if (!parentRect) return;
			const insideParent = cursorIsInBox(event.clientX, event.clientY, parentRect, { padRight: 10 });
			const insideThis = visible && cursorIsInBox(event.clientX, event.clientY, domElement!.getBoundingClientRect());
			const disabled = domElement!.parentElement!.classList.contains("disabled");
			const insideChildMenu = Array.from(domElement!.querySelectorAll<HTMLElement>(".context-menu.open")).some(submenu =>
				cursorIsInBox(event.clientX, event.clientY, submenu.getBoundingClientRect(), { padLeft: 10 }),
			);

			if ((!insideThis && !insideParent && !insideChildMenu) || disabled) {
				forceClose();
			} else {
				left = `${parentMenu.getBoundingClientRect().width}px`;
				top = `${domElement!.parentElement!.getBoundingClientRect().top - domElement!.offsetParent!.getBoundingClientRect().top - 10}px`;
				forceOpen();
			}
		});
	});
</script>

<svelte:document {onmousedown} />
<svelte:window bind:innerWidth />

<!-- svelte-ignore a11y_no_static_element_interactions -->
<section
	onmouseenter={() => (mouseInside = true)}
	onmouseleave={() => (mouseInside = false)}
	class={["context-menu", visible && "open"]}
	bind:this={domElement}
	style:top
	style:bottom
	style:right
	style:left
>
	<div
		class="inner"
		style:scale={visible ? "100%" : "0%"}
		style:transform={flipX ? "translateX(-170px)" : undefined}
		style:transform-origin="{transformOriginX}
		{transformOriginY}"
	>
		{@render children()}
	</div>
</section>

<style>
	section {
		position: absolute;
		z-index: 9999999;
		width: 200px;
		pointer-events: none;

		.inner {
			pointer-events: auto;
			display: flex;
			flex-direction: column;
			background-color: #181825;
			box-shadow: 0px 0px 0.5rem rgba(0, 0, 0, 50%);
			border: 1px solid #585b70;
			padding: 0.5rem;
			gap: 0.25rem;
			width: 100%;
			border-radius: 0.5rem;
			transition: scale 0.05s;

			:global(> *:not(hr)) {
				width: 100%;
				color: #cdd6f4;
				height: 1.5rem;
				display: flex;
				align-items: center;
				gap: 0.5rem;
				padding-left: 0.5rem;
				font-size: 0.8rem;
				border-radius: 0.25rem;

				&[disabled],
				:global(&.disabled) {
					color: #6c7086;
				}

				:global(&:not([disabled], .disabled):hover) {
					background-color: #252634;
				}
			}

			:global(> hr) {
				width: calc(100% + 1rem);
				transform: translateX(-0.5rem);
				background-color: #313244;
				height: 1px;
			}
		}
	}
</style>
