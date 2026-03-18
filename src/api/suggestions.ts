import AsexualIcon from "../components/icons/AsexualIcon.svelte";
import BisexualIcon from "../components/icons/BisexualIcon.svelte";
import GayIcon from "../components/icons/GayIcon.svelte";
import HeterosexualIcon from "../components/icons/HeterosexualIcon.svelte";
import HomosexualIcon from "../components/icons/HomosexualIcon.svelte";
import LesbianIcon from "../components/icons/LesbianIcon.svelte";
import PansexualIcon from "../components/icons/PansexualIcon.svelte";
import type { Icon } from "./components";

export type Suggestion = {
	name: string;
	icon: Icon;
};

const suggestions: { aliases: string[]; suggestions: { name: string; icon: Icon }[] }[] = [
	{
		aliases: ["sexuality", "sexual orientation"],
		suggestions: [
			{ name: "Asexual", icon: AsexualIcon },
			{ name: "Bisexual", icon: BisexualIcon },
			{ name: "Gay", icon: GayIcon },
			{ name: "Homosexual", icon: HomosexualIcon },
			{ name: "Heterosexual", icon: HeterosexualIcon },
			{ name: "Lesbian", icon: LesbianIcon },
			{ name: "Pansexual", icon: PansexualIcon },
			{ name: "Straight", icon: HeterosexualIcon },
		],
	},
	{
		aliases: ["gender"],
		suggestions: [],
	},
];

export function getSuggestions(category: string, word: string = ""): { name: string; icon: Icon }[] {
	return suggestions
		.find(suggestion => suggestion.aliases.includes(category))!
		.suggestions.filter(suggestion => suggestion.name.startsWith(word));
}
