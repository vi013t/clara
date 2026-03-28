import { type Serialize } from "../../util/serialize.svelte";
import type { Cloneable } from "../../util/Clone.svelte";
import { assignedLater } from "../../util/index.svelte";

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
		throw new Error("implement ser/de on datetime");
	}

	public static deserialize(date: SerializedDataTime): DateTime {
		throw new Error("implement ser/de on datetime");
	}

	clone(): DateTime {
		throw new Error("implement clone datetime");
	}
}
