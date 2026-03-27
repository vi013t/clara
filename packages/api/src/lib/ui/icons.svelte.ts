import ArrowIcon from "../components/icons/ArrowIcon.svelte";
import AsexualIcon from "../components/icons/AsexualIcon.svelte";
import BisexualIcon from "../components/icons/BisexualIcon.svelte";
import BlankPageIcon from "../components/icons/BlankPageIcon.svelte";
import BoldIcon from "../components/icons/BoldIcon.svelte";
import BookIcon from "../components/icons/BookIcon.svelte";
import BugIcon from "../components/icons/BugIcon.svelte";
import CalendarIcon from "../components/icons/CalendarIcon.svelte";
import CatIcon from "../components/icons/CatIcon.svelte";
import CharacterCountIcon from "../components/icons/CharacterCountIcon.svelte";
import CircledPlusIcon from "../components/icons/CircledPlusIcon.svelte";
import ClockIcon from "../components/icons/ClockIcon.svelte";
import CloseIcon from "../components/icons/CloseIcon.svelte";
import ColorPaletteIcon from "../components/icons/ColorPaletteIcon.svelte";
import DashIcon from "../components/icons/DashIcon.svelte";
import DiceIcon from "../components/icons/DiceIcon.svelte";
import EllipsisIcon from "../components/icons/EllipsisIcon.svelte";
import EyeIcon from "../components/icons/EyeIcon.svelte";
import FichteanCurveIcon from "../components/icons/FichteanCurveIcon.svelte";
import FilterIcon from "../components/icons/FilterIcon.svelte";
import FolderIcon from "../components/icons/FolderIcon.svelte";
import GayIcon from "../components/icons/GayIcon.svelte";
import GearIcon from "../components/icons/GearIcon.svelte";
import GraphIcon from "../components/icons/GraphIcon.svelte";
import HeterosexualIcon from "../components/icons/HeterosexualIcon.svelte";
import HexagonIcon from "../components/icons/HexagonIcon.svelte";
import HomosexualIcon from "../components/icons/HomosexualIcon.svelte";
import IOIcon from "../components/icons/IOIcon.svelte";
import ItalicIcon from "../components/icons/ItalicIcon.svelte";
import KeyboardKeyIcon from "../components/icons/KeyboardKeyIcon.svelte";
import LesbianIcon from "../components/icons/LesbianIcon.svelte";
import LicenseIcon from "../components/icons/LicenseIcon.svelte";
import LineSpacingIcon from "../components/icons/LineSpacingIcon.svelte";
import LocationIcon from "../components/icons/LocationIcon.svelte";
import MarkdownIcon from "../components/icons/MarkdownIcon.svelte";
import MinimizeIcon from "../components/icons/MinimizeIcon.svelte";
import MoonIcon from "../components/icons/MoonIcon.svelte";
import NumberSignIcon from "../components/icons/NumberSignIcon.svelte";
import PackageIcon from "../components/icons/PackageIcon.svelte";
import PageIcon from "../components/icons/PageIcon.svelte";
import PansexualIcon from "../components/icons/PansexualIcon.svelte";
import ParagraphIcon from "../components/icons/ParagraphIcon.svelte";
import PencilIcon from "../components/icons/PencilIcon.svelte";
import PersonIcon from "../components/icons/PersonIcon.svelte";
import PlugIcon from "../components/icons/PlugIcon.svelte";
import PlusIcon from "../components/icons/PlusIcon.svelte";
import PrivacyIcon from "../components/icons/PrivacyIcon.svelte";
import PyramidIcon from "../components/icons/PyramidIcon.svelte";
import QuestionMarkIcon from "../components/icons/QuestionMarkIcon.svelte";
import RenameIcon from "../components/icons/RenameIcon.svelte";
import RulerIcon from "../components/icons/RulerIcon.svelte";
import SaveIcon from "../components/icons/SaveIcon.svelte";
import SevenPointStructureIcon from "../components/icons/SevenPointStructureIcon.svelte";
import SplitHorizontalIcon from "../components/icons/SplitHorizontalIcon.svelte";
import SpreadsheetIcon from "../components/icons/SpreadsheetIcon.svelte";
import SproutIcon from "../components/icons/SproutIcon.svelte";
import SunIcon from "../components/icons/SunIcon.svelte";
import SwordIcon from "../components/icons/SwordIcon.svelte";
import TextIcon from "../components/icons/TextIcon.svelte";
import TheaterIcon from "../components/icons/TheaterIcon.svelte";
import TransferIcon from "../components/icons/TransferIcon.svelte";
import TrashIcon from "../components/icons/TrashIcon.svelte";
import TreeIcon from "../components/icons/TreeIcon.svelte";
import UnderlineIcon from "../components/icons/UnderlineIcon.svelte";
import UndoIcon from "../components/icons/UndoIcon.svelte";
import VersionControlIcon from "../components/icons/VersionControlIcon.svelte";
import WeightScaleIcon from "../components/icons/WeightScaleIcon.svelte";
import WheelIcon from "../components/icons/WheelIcon.svelte";
import WordCountIcon from "../components/icons/WordCountIcon.svelte";

import type { Component } from "svelte";
import type { SVGAttributes } from "svelte/elements";
import LockIcon from "../components/icons/LockIcon.svelte";
import ScaleIcon from "../components/icons/ScaleIcon.svelte";
import UnlockedIcon from "../components/icons/UnlockedIcon.svelte";
import ReticleIcon from "../components/icons/ReticleIcon.svelte";
import StartupIcon from "../components/icons/StartupIcon.svelte";

export type IconProps = { stroke?: string; scale?: number } & SVGAttributes<EventTarget>;

export const icons = [
	{ name: "ArrowIcon", categories: [], component: ArrowIcon },
	{ name: "AsexualIcon", categories: [], component: AsexualIcon },
	{ name: "BisexualIcon", categories: [], component: BisexualIcon },
	{ name: "BlankPageIcon", categories: [], component: BlankPageIcon },
	{ name: "BoldIcon", categories: [], component: BoldIcon },
	{ name: "BookIcon", categories: [], component: BookIcon },
	{ name: "BugIcon", categories: [], component: BugIcon },
	{ name: "CalendarIcon", categories: [], component: CalendarIcon },
	{ name: "CatIcon", categories: [], component: CatIcon },
	{ name: "CharacterCountIcon", categories: [], component: CharacterCountIcon },
	{ name: "CircledPlusIcon", categories: [], component: CircledPlusIcon },
	{ name: "ClockIcon", categories: [], component: ClockIcon },
	{ name: "CloseIcon", categories: [], component: CloseIcon },
	{ name: "ColorPaletteIcon", categories: [], component: ColorPaletteIcon },
	{ name: "DashIcon", categories: [], component: DashIcon },
	{ name: "DiceIcon", categories: [], component: DiceIcon },
	{ name: "EllipsisIcon", categories: [], component: EllipsisIcon },
	{ name: "EyeIcon", categories: [], component: EyeIcon },
	{ name: "FichteanCurveIcon", categories: [], component: FichteanCurveIcon },
	{ name: "FilterIcon", categories: [], component: FilterIcon },
	{ name: "FolderIcon", categories: [], component: FolderIcon },
	{ name: "GayIcon", categories: [], component: GayIcon },
	{ name: "GearIcon", categories: [], component: GearIcon },
	{ name: "GraphIcon", categories: [], component: GraphIcon },
	{ name: "HexagonIcon", categories: [], component: HexagonIcon },
	{ name: "HeterosexualIcon", categories: [], component: HeterosexualIcon },
	{ name: "HomosexualIcon", categories: [], component: HomosexualIcon },
	{ name: "IOIcon", categories: [], component: IOIcon },
	{ name: "ItalicIcon", categories: [], component: ItalicIcon },
	{ name: "KeyboardKeyIcon", categories: [], component: KeyboardKeyIcon },
	{ name: "LesbianIcon", categories: [], component: LesbianIcon },
	{ name: "LicenseIcon", categories: [], component: LicenseIcon },
	{ name: "LineSpacingIcon", categories: [], component: LineSpacingIcon },
	{ name: "LocationIcon", categories: [], component: LocationIcon },
	{ name: "LockIcon", categories: [], component: LockIcon },
	{ name: "MarkdownIcon", categories: [], component: MarkdownIcon },
	{ name: "MinimizeIcon", categories: [], component: MinimizeIcon },
	{ name: "MoonIcon", categories: [], component: MoonIcon },
	{ name: "NumberSignIcon", categories: [], component: NumberSignIcon },
	{ name: "PackageIcon", categories: [], component: PackageIcon },
	{ name: "PageIcon", categories: [], component: PageIcon },
	{ name: "PansexualIcon", categories: [], component: PansexualIcon },
	{ name: "ParagraphIcon", categories: [], component: ParagraphIcon },
	{ name: "PencilIcon", categories: [], component: PencilIcon },
	{ name: "PersonIcon", categories: [], component: PersonIcon },
	{ name: "PlugIcon", categories: [], component: PlugIcon },
	{ name: "PlusIcon", categories: [], component: PlusIcon },
	{ name: "PrivacyIcon", categories: [], component: PrivacyIcon },
	{ name: "PyramidIcon", categories: [], component: PyramidIcon },
	{ name: "QuestionMarkIcon", categories: [], component: QuestionMarkIcon },
	{ name: "RenameIcon", categories: [], component: RenameIcon },
	{ name: "ReticleIcon", categories: [], component: ReticleIcon },
	{ name: "RulerIcon", categories: [], component: RulerIcon },
	{ name: "SaveIcon", categories: [], component: SaveIcon },
	{ name: "ScaleIcon", categories: [], component: ScaleIcon },
	{ name: "SevenPointStructureIcon", categories: [], component: SevenPointStructureIcon },
	{ name: "SplitHorizontalIcon", categories: [], component: SplitHorizontalIcon },
	{ name: "SpreadsheetIcon", categories: [], component: SpreadsheetIcon },
	{ name: "SproutIcon", categories: [], component: SproutIcon },
	{ name: "StartupIcon", categories: [], component: StartupIcon },
	{ name: "SunIcon", categories: [], component: SunIcon },
	{ name: "SwordIcon", categories: [], component: SwordIcon },
	{ name: "TextIcon", categories: [], component: TextIcon },
	{ name: "TheaterIcon", categories: [], component: TheaterIcon },
	{ name: "TransferIcon", categories: [], component: TransferIcon },
	{ name: "TrashIcon", categories: [], component: TrashIcon },
	{ name: "TreeIcon", categories: [], component: TreeIcon },
	{ name: "UnderlineIcon", categories: [], component: UnderlineIcon },
	{ name: "UndoIcon", categories: [], component: UndoIcon },
	{ name: "UnlockedIcon", categories: [], component: UnlockedIcon },
	{ name: "VersionControlIcon", categories: [], component: VersionControlIcon },
	{ name: "WeightScaleIcon", categories: [], component: WeightScaleIcon },
	{ name: "WheelIcon", categories: [], component: WheelIcon },
	{ name: "WordCountIcon", categories: [], component: WordCountIcon },
] as const satisfies { name: string; categories: string[]; component: Component<IconProps> }[];

export type IconName = typeof icons extends (infer T)[] ? (T extends { name: string } ? T["name"] : never) : never;
export type IconCategory = typeof icons extends (infer T)[]
	? T extends { categories: (infer Category)[] }
		? Category
		: never
	: never;
export type IconComponent = typeof icons extends (infer T)[]
	? T extends { component: Component<IconProps> }
		? T["component"]
		: never
	: never;

export type Icon = { name: IconName; categories: IconCategory[]; component: IconComponent };

/**
 * An object that can be used to identify a singular unqiue icon.
 */
export type IconIdentifier = IconName | IconComponent | Icon;

/**
 * Gets an icon from an `IconIdentifier`.
 *
 * @param identifier A unique identifier for the icon.
 *
 * @returns The icon data.
 */
export function getIcon(identifier: IconIdentifier): Icon {
	if (typeof identifier === "string") return icons.find(icon => icon.name === identifier)!;
	if ("categories" in identifier) return icons.find(icon => icon.name === identifier.name)!;
	return icons.find(icon => icon.component === identifier)!;
}

// Ensure all icons are registered
const modules = import.meta.glob("../components/icons/*.svelte", { eager: true });
for (const path in modules) {
	let component = (modules[path] as { default: Component }).default;
	const iconName = path
		.split("/")
		.pop()!
		.replace(/\.svelte$/, "");
	if (!getIcon(iconName as IconName)) {
		if (iconName === "UnregisteredIcon") {
			// Debug.success(
			// 	`The icon "UnregisteredIcon" has not been registered. This icon is not used and acts as a test that registry validation correctly detects unregistered icons.`,
			// 	import.meta.url,
			// );
		} else {
			// Debug.warn(
			// 	`The icon "${iconName}" has not been registered. This may cause issues if the icon is used. Adding a default registry entry for it.`,
			// 	import.meta.url,
			// );
			icons.push({ name: iconName as IconName, categories: [], component: component as IconComponent } as any);
		}
	}
}

export { ArrowIcon };
export { AsexualIcon };
export { BisexualIcon };
export { BlankPageIcon };
export { BoldIcon };
export { BookIcon };
export { BugIcon };
export { CalendarIcon };
export { CatIcon };
export { CharacterCountIcon };
export { CircledPlusIcon };
export { ClockIcon };
export { CloseIcon };
export { ColorPaletteIcon };
export { DashIcon };
export { DiceIcon };
export { EllipsisIcon };
export { EyeIcon };
export { FichteanCurveIcon };
export { FilterIcon };
export { FolderIcon };
export { GayIcon };
export { GearIcon };
export { GraphIcon };
export { HexagonIcon };
export { HeterosexualIcon };
export { HomosexualIcon };
export { IOIcon };
export { ItalicIcon };
export { KeyboardKeyIcon };
export { LesbianIcon };
export { LicenseIcon };
export { LineSpacingIcon };
export { LocationIcon };
export { LockIcon };
export { MarkdownIcon };
export { MinimizeIcon };
export { MoonIcon };
export { NumberSignIcon };
export { PackageIcon };
export { PageIcon };
export { PansexualIcon };
export { ParagraphIcon };
export { PencilIcon };
export { PersonIcon };
export { PlugIcon };
export { PlusIcon };
export { PrivacyIcon };
export { PyramidIcon };
export { QuestionMarkIcon };
export { RenameIcon };
export { ReticleIcon };
export { RulerIcon };
export { SaveIcon };
export { ScaleIcon };
export { SevenPointStructureIcon };
export { SplitHorizontalIcon };
export { SpreadsheetIcon };
export { SproutIcon };
export { StartupIcon };
export { SunIcon };
export { SwordIcon };
export { TextIcon };
export { TheaterIcon };
export { TransferIcon };
export { TrashIcon };
export { TreeIcon };
export { UnderlineIcon };
export { UndoIcon };
export { UnlockedIcon };
export { VersionControlIcon };
export { WeightScaleIcon };
export { WheelIcon };
export { WordCountIcon };
