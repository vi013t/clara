<script lang="ts" module>
	import { plugin } from "../index.svelte.ts";

	export const breadcrumbsPlugin = plugin({
		name: "Breadcrumbs",
		identifier: "breadcrumbs",
		icon: "SquareChevronRight",
		description: "Displays group, item, and attribute paths at the top of views.",

		onLoad() {},
	});
</script>
