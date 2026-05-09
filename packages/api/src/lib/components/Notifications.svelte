<script lang="ts">
	import { getNotifications, Notification } from "@clara/api/components";
</script>

{#each getNotifications() as notification (notification.id)}
	<Notification title={notification.title} text={notification.text} />
{/each}
