import {
	AsexualIcon,
	BisexualIcon,
	GayIcon,
	HeterosexualIcon,
	HomosexualIcon,
	LesbianIcon,
	PansexualIcon,
	type IconComponent,
} from "../ui/icons.svelte.ts";

export type Suggestion = {
	name: string;
	icon: IconComponent;
};

const suggestions: { aliases: string[]; suggestions: { name: string; icon: IconComponent }[] }[] = [
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

export function getSuggestions(category: string, word: string = ""): { name: string; icon: IconComponent }[] {
	return suggestions
		.find(suggestion => suggestion.aliases.includes(category))!
		.suggestions.filter(suggestion => suggestion.name.startsWith(word));
}
