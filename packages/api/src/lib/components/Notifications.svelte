<script lang="ts">
	import { getNotifications } from "@clara/api/components";
	import Notification from "./Notification.svelte";
</script>

{#each getNotifications() as notification (notification.id)}
	<Notification title={notification.title} text={notification.text} />
{/each}
