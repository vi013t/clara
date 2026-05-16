<script lang="ts" module>
	import { registerNavbarButton } from "../../components/Navbar.svelte";
	import { plugin } from "../index.svelte.ts";
	import ManualPopup from "./ManualPopup.svelte";

	export const manualPlugin = plugin({
		name: "Manual",
		identifier: "manual",
		description: "Clara manual.",
		icon: "BookOpenCheck",
		onLoad() {
			registerNavbarButton({
				icon: "CircleQuestionMark",
				render: manual,
			});
		},
	});
</script>

{#snippet manual(close: () => void)}
	<ManualPopup {close} />
{/snippet}
