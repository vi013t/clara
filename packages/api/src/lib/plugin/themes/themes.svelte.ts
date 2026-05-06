import { plugin } from "../index.svelte.ts";
import { userSettings } from "../../usersettings/index.svelte.ts";

export default plugin({
	name: "Default themes",
	identifier: "default-themes",
	icon: "Palette",
	description: "Clara's default themes.",
	onLoad() {
		userSettings().addTheme({
			name: "Catppuccin Mocha",
			css: `
				* {
					--background: #1e1e2e;
					--background-dark: #181825;
					--background-darker: #11111b;
					--border: #313244;
					--border-bright: #6c7086;

					--foreground-bright: #cdd6f4;
					--foreground: #a6adc8;
					--foreground-dark: #585b70;

					--pink: #f5c2e7;
					--red: #f38ba8;
					--orange: #fab387;
					--yellow: #f9e2af;
					--green: #a6e3a1;
					--teal: #94e2d5;
					--blue: #89b4fa;
					--indigo: #b4befe;
					--purple: #cba6f7;
				}
			`,
		});

		userSettings().addTheme({
			name: "Catppuccin Latte",
			css: `
				* {
					--background: #eff1f5;
					--background-dark: #e6e9ef;
					--background-darker: #dce0e8;
					--border: #ccd0da;
					--border-bright: #9ca0b0;

					--foreground-bright: #4c4f69;
					--foreground: #6c6f85;
					--foreground-dark: #acb0be;

					--pink: #ea76cb;
					--red: #d20f39;
					--orange: #fe640b;
					--yellow: #df8e1d;
					--green: #40a02b;
					--teal: #179299;
					--blue: #1e66f5;
					--indigo: #7287fd;
					--purple: #8839ef;
				}
			`,
		});
	},
});
