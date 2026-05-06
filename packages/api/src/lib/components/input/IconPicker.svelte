<script lang="ts">
	import { type IconName, icons } from "@clara/api/icons";
	import { mouse, LittleButton } from "@clara/api/components";
	import tags from "lucide-static/tags.json";

	let {
		value = $bindable(null),

		visible = $bindable(false),
		opener = null,
	}: { value?: IconName | null; opener?: HTMLElement | null; visible?: boolean } = $props();

	let searchTerm = $state("");

	function kebabToTitle(text: string): string {
		let builder = "";
		for (let index = 0; index < text.length; index++) {
			if (index === 0) {
				builder += text.charAt(index).toUpperCase();
				continue;
			}

			if (text.charAt(index - 1) === "-") {
				builder += text.charAt(index).toUpperCase();
				continue;
			}

			if (text.charAt(index) === "-") {
				continue;
			}

			builder += text.charAt(index);
		}

		return builder;
	}

	let shownIcons: IconName[] = $derived.by(() => {
		const query = searchTerm.toLowerCase().replaceAll(/[^a-zA-Z]/g, "");
		if (!query) return (Object.keys(icons) as IconName[]).slice(0, 50);
		return Object.entries(tags)
			.filter(([iconName, tags]) => {
				const matchName = iconName.toLowerCase().replaceAll("-", "").includes(query);
				const matchTags = tags.some(tag => tag.toLowerCase().includes(query));
				return matchName || matchTags;
			})
			.map(([iconName, _icon]) => kebabToTitle(iconName) as IconName)
			.slice(0, 50);
	});

	mouse().onLeftClick(event => {
		if (!event.composedPath().includes(popup) && (!opener || !event.composedPath().includes(opener))) {
			hide();
		}
	});

	let popup: HTMLElement;

	let left = $state("0px");
	let top = $state("0px");

	export function open() {
		let position = mouse().relativeTo(popup);
		left = `${position.x}px`;
		top = `${position.y}px`;
		visible = true;
	}

	function choose(icon: IconName) {
		return function () {
			value = icon;
			hide();
		};
	}

	export function hide() {
		visible = false;
	}
</script>

<section bind:this={popup} style:top style:left style:scale={visible ? "100%" : "0%"}>
	<input bind:value={searchTerm} placeholder="Search for an icon..." />
	<div class="icons">
		{#each shownIcons as icon}
			<LittleButton {icon} onmousedown={choose(icon)} />
		{/each}
	</div>
</section>

<style>
	section {
		position: absolute;
		background: var(--background-darker);
		border: 1px solid var(--border);
		border-radius: 0.25rem;
		z-index: 9999;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 20rem;
		height: 11.9rem;
	}

	input {
		background-color: var(--background);
		width: 100%;
		border-radius: 0.25rem;
		padding: 0.25rem;
		color: var(--foreground);
		font-size: 0.8rem;

		&::placeholder {
			color: var(--foreground-dark);
		}
	}

	.icons {
		display: grid;
		gap: 0.25rem;
		grid-template-rows: repeat(5, 1fr);
		grid-template-columns: repeat(10, 1fr);
		color: var(--foreground);
	}
</style>
