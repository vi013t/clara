<script lang="ts">
	import { Popup, PopupSidebar } from "@clara/api/components";
	import { getIcon, type IconIdentifier } from "@clara/api/icons";
	import { userSettings } from "@clara/api/usersettings";

	let popup: Popup;

	export function open() {
		popup.open();
	}

	let view = $state("General");

	function reset() {
		view = "general";
	}
</script>

<Popup {reset} bind:this={popup}>
	<div class="popup">
		<PopupSidebar
			bind:view
			title={{ text: "Project Settings", icon: getIcon("Settings").component }}
			sections={{
				General: [["General", "Folder"]],
				Plugins: [
					...userSettings()
						.enabledPlugins()
						.filter(plugin => plugin.projectSettings)
						.map(plugin => [plugin.name, plugin.icon] as [string, IconIdentifier]),
				],
			}}
		/>
	</div>
</Popup>

<style>
	.popup {
		width: 100%;
		height: 100%;
		display: flex;
		overflow-y: auto;
	}
</style>
