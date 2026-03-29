import { plugin } from "@clara/api/plugin";

export default plugin({
	name: "%PLUGIN_NAME%",
	description: "%PLUGIN_DESCRIPTION%",
	icon: "%PLUGIN_ICON%",
	onLoad() {
		console.log("Hello from %PLUGIN_NAME%!");
	},
});
