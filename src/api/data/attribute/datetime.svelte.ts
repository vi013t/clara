import { assignedLater } from "../../util/utils.svelte";

const months = [
	"january",
	"february",
	"march",
	"april",
	"may",
	"june",
	"july",
	"august",
	"september",
	"october",
	"november",
] as const;

type Month = keyof typeof months;

export class DateTime {
	private month = $state(assignedLater<Month>());
	private day = $state(assignedLater<Month>());
}
