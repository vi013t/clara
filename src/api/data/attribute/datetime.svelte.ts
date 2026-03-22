import { assignedLater } from "../../util/utils.svelte";
import type { SerializedAttributeValue } from "./attribute.svelte";
import { type Serialize } from "../../util/serialize.svelte";
import { todo } from "../../errors.svelte";

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

export class DateTime implements Serialize<SerializedAttributeValue> {
	private month = $state(assignedLater<Month>());
	private day = $state(assignedLater<Month>());

	serialize(): SerializedAttributeValue {
		todo("implement ser/de on datetime");
	}
}
