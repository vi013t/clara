import { assignedLater } from "../../util/utils.svelte";
import { type Serialize } from "../../util/serialize.svelte";
import { todo } from "../../errors.svelte";
import type { Cloneable } from "../../util/Clone.svelte";

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

type SerializedDataTime = {};

export class DateTime implements Serialize<SerializedDataTime>, Cloneable<DateTime> {
	private month = $state(assignedLater<Month>());
	private day = $state(assignedLater<Month>());

	public serialize(): SerializedDataTime {
		todo("implement ser/de on datetime");
	}

	public static deserialize(date: SerializedDataTime): DateTime {
		todo("implement ser/de on datetime");
	}

	clone(): DateTime {
		todo("implement clone datetime");
	}
}
