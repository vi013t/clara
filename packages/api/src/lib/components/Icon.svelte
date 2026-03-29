<script lang="ts">
	import { type LucideProps } from "@lucide/svelte";
	import { getIcon, type IconIdentifier } from "../ui/icons.svelte.ts";

	let { name, ...attributes }: { name: IconIdentifier } & Omit<LucideProps, "name"> = $props();

	const Icon = $derived(getIcon(name).component);
</script>

<Icon {...attributes} />
