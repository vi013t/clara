use strum::IntoEnumIterator as _;

impl Icon {
	pub fn names() -> Vec<&'static str> {
		Icon::iter().map(|icon| icon.into()).collect()
	}
}

// copypastad from lucide-icons crate
// cuz i need strum stuffs
#[derive(strum_macros::EnumIter, strum_macros::IntoStaticStr)]
pub enum Icon {
	///[a-arrow-down](https://lucide.dev/icons/a-arrow-down) icon
	AArrowDown,
	///[a-arrow-up](https://lucide.dev/icons/a-arrow-up) icon
	AArrowUp,
	///[a-large-small](https://lucide.dev/icons/a-large-small) icon
	ALargeSmall,
	///[accessibility](https://lucide.dev/icons/accessibility) icon
	Accessibility,
	///[activity](https://lucide.dev/icons/activity) icon
	Activity,
	///[air-vent](https://lucide.dev/icons/air-vent) icon
	AirVent,
	///[airplay](https://lucide.dev/icons/airplay) icon
	Airplay,
	///[alarm-clock](https://lucide.dev/icons/alarm-clock) icon
	AlarmClock,
	///[alarm-clock-check](https://lucide.dev/icons/alarm-clock-check) icon
	AlarmClockCheck,
	///[alarm-clock-minus](https://lucide.dev/icons/alarm-clock-minus) icon
	AlarmClockMinus,
	///[alarm-clock-off](https://lucide.dev/icons/alarm-clock-off) icon
	AlarmClockOff,
	///[alarm-clock-plus](https://lucide.dev/icons/alarm-clock-plus) icon
	AlarmClockPlus,
	///[alarm-smoke](https://lucide.dev/icons/alarm-smoke) icon
	AlarmSmoke,
	///[album](https://lucide.dev/icons/album) icon
	Album,
	///[align-center-horizontal](https://lucide.dev/icons/align-center-horizontal) icon
	AlignCenterHorizontal,
	///[align-center-vertical](https://lucide.dev/icons/align-center-vertical) icon
	AlignCenterVertical,
	///[align-end-horizontal](https://lucide.dev/icons/align-end-horizontal) icon
	AlignEndHorizontal,
	///[align-end-vertical](https://lucide.dev/icons/align-end-vertical) icon
	AlignEndVertical,
	///[align-horizontal-distribute-center](https://lucide.dev/icons/align-horizontal-distribute-center) icon
	AlignHorizontalDistributeCenter,
	///[align-horizontal-distribute-end](https://lucide.dev/icons/align-horizontal-distribute-end) icon
	AlignHorizontalDistributeEnd,
	///[align-horizontal-distribute-start](https://lucide.dev/icons/align-horizontal-distribute-start) icon
	AlignHorizontalDistributeStart,
	///[align-horizontal-justify-center](https://lucide.dev/icons/align-horizontal-justify-center) icon
	AlignHorizontalJustifyCenter,
	///[align-horizontal-justify-end](https://lucide.dev/icons/align-horizontal-justify-end) icon
	AlignHorizontalJustifyEnd,
	///[align-horizontal-justify-start](https://lucide.dev/icons/align-horizontal-justify-start) icon
	AlignHorizontalJustifyStart,
	///[align-horizontal-space-around](https://lucide.dev/icons/align-horizontal-space-around) icon
	AlignHorizontalSpaceAround,
	///[align-horizontal-space-between](https://lucide.dev/icons/align-horizontal-space-between) icon
	AlignHorizontalSpaceBetween,
	///[align-start-horizontal](https://lucide.dev/icons/align-start-horizontal) icon
	AlignStartHorizontal,
	///[align-start-vertical](https://lucide.dev/icons/align-start-vertical) icon
	AlignStartVertical,
	///[align-vertical-distribute-center](https://lucide.dev/icons/align-vertical-distribute-center) icon
	AlignVerticalDistributeCenter,
	///[align-vertical-distribute-end](https://lucide.dev/icons/align-vertical-distribute-end) icon
	AlignVerticalDistributeEnd,
	///[align-vertical-distribute-start](https://lucide.dev/icons/align-vertical-distribute-start) icon
	AlignVerticalDistributeStart,
	///[align-vertical-justify-center](https://lucide.dev/icons/align-vertical-justify-center) icon
	AlignVerticalJustifyCenter,
	///[align-vertical-justify-end](https://lucide.dev/icons/align-vertical-justify-end) icon
	AlignVerticalJustifyEnd,
	///[align-vertical-justify-start](https://lucide.dev/icons/align-vertical-justify-start) icon
	AlignVerticalJustifyStart,
	///[align-vertical-space-around](https://lucide.dev/icons/align-vertical-space-around) icon
	AlignVerticalSpaceAround,
	///[align-vertical-space-between](https://lucide.dev/icons/align-vertical-space-between) icon
	AlignVerticalSpaceBetween,
	///[ambulance](https://lucide.dev/icons/ambulance) icon
	Ambulance,
	///[ampersand](https://lucide.dev/icons/ampersand) icon
	Ampersand,
	///[ampersands](https://lucide.dev/icons/ampersands) icon
	Ampersands,
	///[amphora](https://lucide.dev/icons/amphora) icon
	Amphora,
	///[anchor](https://lucide.dev/icons/anchor) icon
	Anchor,
	///[angry](https://lucide.dev/icons/angry) icon
	Angry,
	///[annoyed](https://lucide.dev/icons/annoyed) icon
	Annoyed,
	///[antenna](https://lucide.dev/icons/antenna) icon
	Antenna,
	///[anvil](https://lucide.dev/icons/anvil) icon
	Anvil,
	///[aperture](https://lucide.dev/icons/aperture) icon
	Aperture,
	///[app-window](https://lucide.dev/icons/app-window) icon
	AppWindow,
	///[app-window-mac](https://lucide.dev/icons/app-window-mac) icon
	AppWindowMac,
	///[apple](https://lucide.dev/icons/apple) icon
	Apple,
	///[archive](https://lucide.dev/icons/archive) icon
	Archive,
	///[archive-restore](https://lucide.dev/icons/archive-restore) icon
	ArchiveRestore,
	///[archive-x](https://lucide.dev/icons/archive-x) icon
	ArchiveX,
	///[armchair](https://lucide.dev/icons/armchair) icon
	Armchair,
	///[arrow-big-down](https://lucide.dev/icons/arrow-big-down) icon
	ArrowBigDown,
	///[arrow-big-down-dash](https://lucide.dev/icons/arrow-big-down-dash) icon
	ArrowBigDownDash,
	///[arrow-big-left](https://lucide.dev/icons/arrow-big-left) icon
	ArrowBigLeft,
	///[arrow-big-left-dash](https://lucide.dev/icons/arrow-big-left-dash) icon
	ArrowBigLeftDash,
	///[arrow-big-right](https://lucide.dev/icons/arrow-big-right) icon
	ArrowBigRight,
	///[arrow-big-right-dash](https://lucide.dev/icons/arrow-big-right-dash) icon
	ArrowBigRightDash,
	///[arrow-big-up](https://lucide.dev/icons/arrow-big-up) icon
	ArrowBigUp,
	///[arrow-big-up-dash](https://lucide.dev/icons/arrow-big-up-dash) icon
	ArrowBigUpDash,
	///[arrow-down](https://lucide.dev/icons/arrow-down) icon
	ArrowDown,
	///[arrow-down-0-1](https://lucide.dev/icons/arrow-down-0-1) icon
	ArrowDown01,
	///[arrow-down-1-0](https://lucide.dev/icons/arrow-down-1-0) icon
	ArrowDown10,
	///[arrow-down-a-z](https://lucide.dev/icons/arrow-down-a-z) icon
	ArrowDownAZ,
	///[arrow-down-from-line](https://lucide.dev/icons/arrow-down-from-line) icon
	ArrowDownFromLine,
	///[arrow-down-left](https://lucide.dev/icons/arrow-down-left) icon
	ArrowDownLeft,
	///[arrow-down-narrow-wide](https://lucide.dev/icons/arrow-down-narrow-wide) icon
	ArrowDownNarrowWide,
	///[arrow-down-right](https://lucide.dev/icons/arrow-down-right) icon
	ArrowDownRight,
	///[arrow-down-to-dot](https://lucide.dev/icons/arrow-down-to-dot) icon
	ArrowDownToDot,
	///[arrow-down-to-line](https://lucide.dev/icons/arrow-down-to-line) icon
	ArrowDownToLine,
	///[arrow-down-up](https://lucide.dev/icons/arrow-down-up) icon
	ArrowDownUp,
	///[arrow-down-wide-narrow](https://lucide.dev/icons/arrow-down-wide-narrow) icon
	ArrowDownWideNarrow,
	///[arrow-down-z-a](https://lucide.dev/icons/arrow-down-z-a) icon
	ArrowDownZA,
	///[arrow-left](https://lucide.dev/icons/arrow-left) icon
	ArrowLeft,
	///[arrow-left-from-line](https://lucide.dev/icons/arrow-left-from-line) icon
	ArrowLeftFromLine,
	///[arrow-left-right](https://lucide.dev/icons/arrow-left-right) icon
	ArrowLeftRight,
	///[arrow-left-to-line](https://lucide.dev/icons/arrow-left-to-line) icon
	ArrowLeftToLine,
	///[arrow-right](https://lucide.dev/icons/arrow-right) icon
	ArrowRight,
	///[arrow-right-from-line](https://lucide.dev/icons/arrow-right-from-line) icon
	ArrowRightFromLine,
	///[arrow-right-left](https://lucide.dev/icons/arrow-right-left) icon
	ArrowRightLeft,
	///[arrow-right-to-line](https://lucide.dev/icons/arrow-right-to-line) icon
	ArrowRightToLine,
	///[arrow-up](https://lucide.dev/icons/arrow-up) icon
	ArrowUp,
	///[arrow-up-0-1](https://lucide.dev/icons/arrow-up-0-1) icon
	ArrowUp01,
	///[arrow-up-1-0](https://lucide.dev/icons/arrow-up-1-0) icon
	ArrowUp10,
	///[arrow-up-a-z](https://lucide.dev/icons/arrow-up-a-z) icon
	ArrowUpAZ,
	///[arrow-up-down](https://lucide.dev/icons/arrow-up-down) icon
	ArrowUpDown,
	///[arrow-up-from-dot](https://lucide.dev/icons/arrow-up-from-dot) icon
	ArrowUpFromDot,
	///[arrow-up-from-line](https://lucide.dev/icons/arrow-up-from-line) icon
	ArrowUpFromLine,
	///[arrow-up-left](https://lucide.dev/icons/arrow-up-left) icon
	ArrowUpLeft,
	///[arrow-up-narrow-wide](https://lucide.dev/icons/arrow-up-narrow-wide) icon
	ArrowUpNarrowWide,
	///[arrow-up-right](https://lucide.dev/icons/arrow-up-right) icon
	ArrowUpRight,
	///[arrow-up-to-line](https://lucide.dev/icons/arrow-up-to-line) icon
	ArrowUpToLine,
	///[arrow-up-wide-narrow](https://lucide.dev/icons/arrow-up-wide-narrow) icon
	ArrowUpWideNarrow,
	///[arrow-up-z-a](https://lucide.dev/icons/arrow-up-z-a) icon
	ArrowUpZA,
	///[arrows-up-from-line](https://lucide.dev/icons/arrows-up-from-line) icon
	ArrowsUpFromLine,
	///[asterisk](https://lucide.dev/icons/asterisk) icon
	Asterisk,
	///[at-sign](https://lucide.dev/icons/at-sign) icon
	AtSign,
	///[atom](https://lucide.dev/icons/atom) icon
	Atom,
	///[audio-lines](https://lucide.dev/icons/audio-lines) icon
	AudioLines,
	///[audio-waveform](https://lucide.dev/icons/audio-waveform) icon
	AudioWaveform,
	///[award](https://lucide.dev/icons/award) icon
	Award,
	///[axe](https://lucide.dev/icons/axe) icon
	Axe,
	///[axis-3d](https://lucide.dev/icons/axis-3d) icon
	Axis3d,
	///[baby](https://lucide.dev/icons/baby) icon
	Baby,
	///[backpack](https://lucide.dev/icons/backpack) icon
	Backpack,
	///[badge](https://lucide.dev/icons/badge) icon
	Badge,
	///[badge-alert](https://lucide.dev/icons/badge-alert) icon
	BadgeAlert,
	///[badge-cent](https://lucide.dev/icons/badge-cent) icon
	BadgeCent,
	///[badge-check](https://lucide.dev/icons/badge-check) icon
	BadgeCheck,
	///[badge-dollar-sign](https://lucide.dev/icons/badge-dollar-sign) icon
	BadgeDollarSign,
	///[badge-euro](https://lucide.dev/icons/badge-euro) icon
	BadgeEuro,
	///[badge-indian-rupee](https://lucide.dev/icons/badge-indian-rupee) icon
	BadgeIndianRupee,
	///[badge-info](https://lucide.dev/icons/badge-info) icon
	BadgeInfo,
	///[badge-japanese-yen](https://lucide.dev/icons/badge-japanese-yen) icon
	BadgeJapaneseYen,
	///[badge-minus](https://lucide.dev/icons/badge-minus) icon
	BadgeMinus,
	///[badge-percent](https://lucide.dev/icons/badge-percent) icon
	BadgePercent,
	///[badge-plus](https://lucide.dev/icons/badge-plus) icon
	BadgePlus,
	///[badge-pound-sterling](https://lucide.dev/icons/badge-pound-sterling) icon
	BadgePoundSterling,
	///[badge-question-mark](https://lucide.dev/icons/badge-question-mark) icon
	BadgeQuestionMark,
	///[badge-russian-ruble](https://lucide.dev/icons/badge-russian-ruble) icon
	BadgeRussianRuble,
	///[badge-swiss-franc](https://lucide.dev/icons/badge-swiss-franc) icon
	BadgeSwissFranc,
	///[badge-turkish-lira](https://lucide.dev/icons/badge-turkish-lira) icon
	BadgeTurkishLira,
	///[badge-x](https://lucide.dev/icons/badge-x) icon
	BadgeX,
	///[baggage-claim](https://lucide.dev/icons/baggage-claim) icon
	BaggageClaim,
	///[balloon](https://lucide.dev/icons/balloon) icon
	Balloon,
	///[ban](https://lucide.dev/icons/ban) icon
	Ban,
	///[banana](https://lucide.dev/icons/banana) icon
	Banana,
	///[bandage](https://lucide.dev/icons/bandage) icon
	Bandage,
	///[banknote](https://lucide.dev/icons/banknote) icon
	Banknote,
	///[banknote-arrow-down](https://lucide.dev/icons/banknote-arrow-down) icon
	BanknoteArrowDown,
	///[banknote-arrow-up](https://lucide.dev/icons/banknote-arrow-up) icon
	BanknoteArrowUp,
	///[banknote-x](https://lucide.dev/icons/banknote-x) icon
	BanknoteX,
	///[barcode](https://lucide.dev/icons/barcode) icon
	Barcode,
	///[barrel](https://lucide.dev/icons/barrel) icon
	Barrel,
	///[baseline](https://lucide.dev/icons/baseline) icon
	Baseline,
	///[bath](https://lucide.dev/icons/bath) icon
	Bath,
	///[battery](https://lucide.dev/icons/battery) icon
	Battery,
	///[battery-charging](https://lucide.dev/icons/battery-charging) icon
	BatteryCharging,
	///[battery-full](https://lucide.dev/icons/battery-full) icon
	BatteryFull,
	///[battery-low](https://lucide.dev/icons/battery-low) icon
	BatteryLow,
	///[battery-medium](https://lucide.dev/icons/battery-medium) icon
	BatteryMedium,
	///[battery-plus](https://lucide.dev/icons/battery-plus) icon
	BatteryPlus,
	///[battery-warning](https://lucide.dev/icons/battery-warning) icon
	BatteryWarning,
	///[beaker](https://lucide.dev/icons/beaker) icon
	Beaker,
	///[bean](https://lucide.dev/icons/bean) icon
	Bean,
	///[bean-off](https://lucide.dev/icons/bean-off) icon
	BeanOff,
	///[bed](https://lucide.dev/icons/bed) icon
	Bed,
	///[bed-double](https://lucide.dev/icons/bed-double) icon
	BedDouble,
	///[bed-single](https://lucide.dev/icons/bed-single) icon
	BedSingle,
	///[beef](https://lucide.dev/icons/beef) icon
	Beef,
	///[beer](https://lucide.dev/icons/beer) icon
	Beer,
	///[beer-off](https://lucide.dev/icons/beer-off) icon
	BeerOff,
	///[bell](https://lucide.dev/icons/bell) icon
	Bell,
	///[bell-dot](https://lucide.dev/icons/bell-dot) icon
	BellDot,
	///[bell-electric](https://lucide.dev/icons/bell-electric) icon
	BellElectric,
	///[bell-minus](https://lucide.dev/icons/bell-minus) icon
	BellMinus,
	///[bell-off](https://lucide.dev/icons/bell-off) icon
	BellOff,
	///[bell-plus](https://lucide.dev/icons/bell-plus) icon
	BellPlus,
	///[bell-ring](https://lucide.dev/icons/bell-ring) icon
	BellRing,
	///[between-horizontal-end](https://lucide.dev/icons/between-horizontal-end) icon
	BetweenHorizontalEnd,
	///[between-horizontal-start](https://lucide.dev/icons/between-horizontal-start) icon
	BetweenHorizontalStart,
	///[between-vertical-end](https://lucide.dev/icons/between-vertical-end) icon
	BetweenVerticalEnd,
	///[between-vertical-start](https://lucide.dev/icons/between-vertical-start) icon
	BetweenVerticalStart,
	///[biceps-flexed](https://lucide.dev/icons/biceps-flexed) icon
	BicepsFlexed,
	///[bike](https://lucide.dev/icons/bike) icon
	Bike,
	///[binary](https://lucide.dev/icons/binary) icon
	Binary,
	///[binoculars](https://lucide.dev/icons/binoculars) icon
	Binoculars,
	///[biohazard](https://lucide.dev/icons/biohazard) icon
	Biohazard,
	///[bird](https://lucide.dev/icons/bird) icon
	Bird,
	///[birdhouse](https://lucide.dev/icons/birdhouse) icon
	Birdhouse,
	///[bitcoin](https://lucide.dev/icons/bitcoin) icon
	Bitcoin,
	///[blend](https://lucide.dev/icons/blend) icon
	Blend,
	///[blinds](https://lucide.dev/icons/blinds) icon
	Blinds,
	///[blocks](https://lucide.dev/icons/blocks) icon
	Blocks,
	///[bluetooth](https://lucide.dev/icons/bluetooth) icon
	Bluetooth,
	///[bluetooth-connected](https://lucide.dev/icons/bluetooth-connected) icon
	BluetoothConnected,
	///[bluetooth-off](https://lucide.dev/icons/bluetooth-off) icon
	BluetoothOff,
	///[bluetooth-searching](https://lucide.dev/icons/bluetooth-searching) icon
	BluetoothSearching,
	///[bold](https://lucide.dev/icons/bold) icon
	Bold,
	///[bolt](https://lucide.dev/icons/bolt) icon
	Bolt,
	///[bomb](https://lucide.dev/icons/bomb) icon
	Bomb,
	///[bone](https://lucide.dev/icons/bone) icon
	Bone,
	///[book](https://lucide.dev/icons/book) icon
	Book,
	///[book-a](https://lucide.dev/icons/book-a) icon
	BookA,
	///[book-alert](https://lucide.dev/icons/book-alert) icon
	BookAlert,
	///[book-audio](https://lucide.dev/icons/book-audio) icon
	BookAudio,
	///[book-check](https://lucide.dev/icons/book-check) icon
	BookCheck,
	///[book-copy](https://lucide.dev/icons/book-copy) icon
	BookCopy,
	///[book-dashed](https://lucide.dev/icons/book-dashed) icon
	BookDashed,
	///[book-down](https://lucide.dev/icons/book-down) icon
	BookDown,
	///[book-headphones](https://lucide.dev/icons/book-headphones) icon
	BookHeadphones,
	///[book-heart](https://lucide.dev/icons/book-heart) icon
	BookHeart,
	///[book-image](https://lucide.dev/icons/book-image) icon
	BookImage,
	///[book-key](https://lucide.dev/icons/book-key) icon
	BookKey,
	///[book-lock](https://lucide.dev/icons/book-lock) icon
	BookLock,
	///[book-marked](https://lucide.dev/icons/book-marked) icon
	BookMarked,
	///[book-minus](https://lucide.dev/icons/book-minus) icon
	BookMinus,
	///[book-open](https://lucide.dev/icons/book-open) icon
	BookOpen,
	///[book-open-check](https://lucide.dev/icons/book-open-check) icon
	BookOpenCheck,
	///[book-open-text](https://lucide.dev/icons/book-open-text) icon
	BookOpenText,
	///[book-plus](https://lucide.dev/icons/book-plus) icon
	BookPlus,
	///[book-search](https://lucide.dev/icons/book-search) icon
	BookSearch,
	///[book-text](https://lucide.dev/icons/book-text) icon
	BookText,
	///[book-type](https://lucide.dev/icons/book-type) icon
	BookType,
	///[book-up](https://lucide.dev/icons/book-up) icon
	BookUp,
	///[book-up-2](https://lucide.dev/icons/book-up-2) icon
	BookUp2,
	///[book-user](https://lucide.dev/icons/book-user) icon
	BookUser,
	///[book-x](https://lucide.dev/icons/book-x) icon
	BookX,
	///[bookmark](https://lucide.dev/icons/bookmark) icon
	Bookmark,
	///[bookmark-check](https://lucide.dev/icons/bookmark-check) icon
	BookmarkCheck,
	///[bookmark-minus](https://lucide.dev/icons/bookmark-minus) icon
	BookmarkMinus,
	///[bookmark-plus](https://lucide.dev/icons/bookmark-plus) icon
	BookmarkPlus,
	///[bookmark-x](https://lucide.dev/icons/bookmark-x) icon
	BookmarkX,
	///[boom-box](https://lucide.dev/icons/boom-box) icon
	BoomBox,
	///[bot](https://lucide.dev/icons/bot) icon
	Bot,
	///[bot-message-square](https://lucide.dev/icons/bot-message-square) icon
	BotMessageSquare,
	///[bot-off](https://lucide.dev/icons/bot-off) icon
	BotOff,
	///[bottle-wine](https://lucide.dev/icons/bottle-wine) icon
	BottleWine,
	///[bow-arrow](https://lucide.dev/icons/bow-arrow) icon
	BowArrow,
	///[box](https://lucide.dev/icons/box) icon
	Box,
	///[boxes](https://lucide.dev/icons/boxes) icon
	Boxes,
	///[braces](https://lucide.dev/icons/braces) icon
	Braces,
	///[brackets](https://lucide.dev/icons/brackets) icon
	Brackets,
	///[brain](https://lucide.dev/icons/brain) icon
	Brain,
	///[brain-circuit](https://lucide.dev/icons/brain-circuit) icon
	BrainCircuit,
	///[brain-cog](https://lucide.dev/icons/brain-cog) icon
	BrainCog,
	///[brick-wall](https://lucide.dev/icons/brick-wall) icon
	BrickWall,
	///[brick-wall-fire](https://lucide.dev/icons/brick-wall-fire) icon
	BrickWallFire,
	///[brick-wall-shield](https://lucide.dev/icons/brick-wall-shield) icon
	BrickWallShield,
	///[briefcase](https://lucide.dev/icons/briefcase) icon
	Briefcase,
	///[briefcase-business](https://lucide.dev/icons/briefcase-business) icon
	BriefcaseBusiness,
	///[briefcase-conveyor-belt](https://lucide.dev/icons/briefcase-conveyor-belt) icon
	BriefcaseConveyorBelt,
	///[briefcase-medical](https://lucide.dev/icons/briefcase-medical) icon
	BriefcaseMedical,
	///[bring-to-front](https://lucide.dev/icons/bring-to-front) icon
	BringToFront,
	///[brush](https://lucide.dev/icons/brush) icon
	Brush,
	///[brush-cleaning](https://lucide.dev/icons/brush-cleaning) icon
	BrushCleaning,
	///[bubbles](https://lucide.dev/icons/bubbles) icon
	Bubbles,
	///[bug](https://lucide.dev/icons/bug) icon
	Bug,
	///[bug-off](https://lucide.dev/icons/bug-off) icon
	BugOff,
	///[bug-play](https://lucide.dev/icons/bug-play) icon
	BugPlay,
	///[building](https://lucide.dev/icons/building) icon
	Building,
	///[building-2](https://lucide.dev/icons/building-2) icon
	Building2,
	///[bus](https://lucide.dev/icons/bus) icon
	Bus,
	///[bus-front](https://lucide.dev/icons/bus-front) icon
	BusFront,
	///[cable](https://lucide.dev/icons/cable) icon
	Cable,
	///[cable-car](https://lucide.dev/icons/cable-car) icon
	CableCar,
	///[cake](https://lucide.dev/icons/cake) icon
	Cake,
	///[cake-slice](https://lucide.dev/icons/cake-slice) icon
	CakeSlice,
	///[calculator](https://lucide.dev/icons/calculator) icon
	Calculator,
	///[calendar](https://lucide.dev/icons/calendar) icon
	Calendar,
	///[calendar-1](https://lucide.dev/icons/calendar-1) icon
	Calendar1,
	///[calendar-arrow-down](https://lucide.dev/icons/calendar-arrow-down) icon
	CalendarArrowDown,
	///[calendar-arrow-up](https://lucide.dev/icons/calendar-arrow-up) icon
	CalendarArrowUp,
	///[calendar-check](https://lucide.dev/icons/calendar-check) icon
	CalendarCheck,
	///[calendar-check-2](https://lucide.dev/icons/calendar-check-2) icon
	CalendarCheck2,
	///[calendar-clock](https://lucide.dev/icons/calendar-clock) icon
	CalendarClock,
	///[calendar-cog](https://lucide.dev/icons/calendar-cog) icon
	CalendarCog,
	///[calendar-days](https://lucide.dev/icons/calendar-days) icon
	CalendarDays,
	///[calendar-fold](https://lucide.dev/icons/calendar-fold) icon
	CalendarFold,
	///[calendar-heart](https://lucide.dev/icons/calendar-heart) icon
	CalendarHeart,
	///[calendar-minus](https://lucide.dev/icons/calendar-minus) icon
	CalendarMinus,
	///[calendar-minus-2](https://lucide.dev/icons/calendar-minus-2) icon
	CalendarMinus2,
	///[calendar-off](https://lucide.dev/icons/calendar-off) icon
	CalendarOff,
	///[calendar-plus](https://lucide.dev/icons/calendar-plus) icon
	CalendarPlus,
	///[calendar-plus-2](https://lucide.dev/icons/calendar-plus-2) icon
	CalendarPlus2,
	///[calendar-range](https://lucide.dev/icons/calendar-range) icon
	CalendarRange,
	///[calendar-search](https://lucide.dev/icons/calendar-search) icon
	CalendarSearch,
	///[calendar-sync](https://lucide.dev/icons/calendar-sync) icon
	CalendarSync,
	///[calendar-x](https://lucide.dev/icons/calendar-x) icon
	CalendarX,
	///[calendar-x-2](https://lucide.dev/icons/calendar-x-2) icon
	CalendarX2,
	///[calendars](https://lucide.dev/icons/calendars) icon
	Calendars,
	///[camera](https://lucide.dev/icons/camera) icon
	Camera,
	///[camera-off](https://lucide.dev/icons/camera-off) icon
	CameraOff,
	///[candy](https://lucide.dev/icons/candy) icon
	Candy,
	///[candy-cane](https://lucide.dev/icons/candy-cane) icon
	CandyCane,
	///[candy-off](https://lucide.dev/icons/candy-off) icon
	CandyOff,
	///[cannabis](https://lucide.dev/icons/cannabis) icon
	Cannabis,
	///[cannabis-off](https://lucide.dev/icons/cannabis-off) icon
	CannabisOff,
	///[captions](https://lucide.dev/icons/captions) icon
	Captions,
	///[captions-off](https://lucide.dev/icons/captions-off) icon
	CaptionsOff,
	///[car](https://lucide.dev/icons/car) icon
	Car,
	///[car-front](https://lucide.dev/icons/car-front) icon
	CarFront,
	///[car-taxi-front](https://lucide.dev/icons/car-taxi-front) icon
	CarTaxiFront,
	///[caravan](https://lucide.dev/icons/caravan) icon
	Caravan,
	///[card-sim](https://lucide.dev/icons/card-sim) icon
	CardSim,
	///[carrot](https://lucide.dev/icons/carrot) icon
	Carrot,
	///[case-lower](https://lucide.dev/icons/case-lower) icon
	CaseLower,
	///[case-sensitive](https://lucide.dev/icons/case-sensitive) icon
	CaseSensitive,
	///[case-upper](https://lucide.dev/icons/case-upper) icon
	CaseUpper,
	///[cassette-tape](https://lucide.dev/icons/cassette-tape) icon
	CassetteTape,
	///[cast](https://lucide.dev/icons/cast) icon
	Cast,
	///[castle](https://lucide.dev/icons/castle) icon
	Castle,
	///[cat](https://lucide.dev/icons/cat) icon
	Cat,
	///[cctv](https://lucide.dev/icons/cctv) icon
	Cctv,
	///[chart-area](https://lucide.dev/icons/chart-area) icon
	ChartArea,
	///[chart-bar](https://lucide.dev/icons/chart-bar) icon
	ChartBar,
	///[chart-bar-big](https://lucide.dev/icons/chart-bar-big) icon
	ChartBarBig,
	///[chart-bar-decreasing](https://lucide.dev/icons/chart-bar-decreasing) icon
	ChartBarDecreasing,
	///[chart-bar-increasing](https://lucide.dev/icons/chart-bar-increasing) icon
	ChartBarIncreasing,
	///[chart-bar-stacked](https://lucide.dev/icons/chart-bar-stacked) icon
	ChartBarStacked,
	///[chart-candlestick](https://lucide.dev/icons/chart-candlestick) icon
	ChartCandlestick,
	///[chart-column](https://lucide.dev/icons/chart-column) icon
	ChartColumn,
	///[chart-column-big](https://lucide.dev/icons/chart-column-big) icon
	ChartColumnBig,
	///[chart-column-decreasing](https://lucide.dev/icons/chart-column-decreasing) icon
	ChartColumnDecreasing,
	///[chart-column-increasing](https://lucide.dev/icons/chart-column-increasing) icon
	ChartColumnIncreasing,
	///[chart-column-stacked](https://lucide.dev/icons/chart-column-stacked) icon
	ChartColumnStacked,
	///[chart-gantt](https://lucide.dev/icons/chart-gantt) icon
	ChartGantt,
	///[chart-line](https://lucide.dev/icons/chart-line) icon
	ChartLine,
	///[chart-network](https://lucide.dev/icons/chart-network) icon
	ChartNetwork,
	///[chart-no-axes-column](https://lucide.dev/icons/chart-no-axes-column) icon
	ChartNoAxesColumn,
	///[chart-no-axes-column-decreasing](https://lucide.dev/icons/chart-no-axes-column-decreasing) icon
	ChartNoAxesColumnDecreasing,
	///[chart-no-axes-column-increasing](https://lucide.dev/icons/chart-no-axes-column-increasing) icon
	ChartNoAxesColumnIncreasing,
	///[chart-no-axes-combined](https://lucide.dev/icons/chart-no-axes-combined) icon
	ChartNoAxesCombined,
	///[chart-no-axes-gantt](https://lucide.dev/icons/chart-no-axes-gantt) icon
	ChartNoAxesGantt,
	///[chart-pie](https://lucide.dev/icons/chart-pie) icon
	ChartPie,
	///[chart-scatter](https://lucide.dev/icons/chart-scatter) icon
	ChartScatter,
	///[chart-spline](https://lucide.dev/icons/chart-spline) icon
	ChartSpline,
	///[check](https://lucide.dev/icons/check) icon
	Check,
	///[check-check](https://lucide.dev/icons/check-check) icon
	CheckCheck,
	///[check-line](https://lucide.dev/icons/check-line) icon
	CheckLine,
	///[chef-hat](https://lucide.dev/icons/chef-hat) icon
	ChefHat,
	///[cherry](https://lucide.dev/icons/cherry) icon
	Cherry,
	///[chess-bishop](https://lucide.dev/icons/chess-bishop) icon
	ChessBishop,
	///[chess-king](https://lucide.dev/icons/chess-king) icon
	ChessKing,
	///[chess-knight](https://lucide.dev/icons/chess-knight) icon
	ChessKnight,
	///[chess-pawn](https://lucide.dev/icons/chess-pawn) icon
	ChessPawn,
	///[chess-queen](https://lucide.dev/icons/chess-queen) icon
	ChessQueen,
	///[chess-rook](https://lucide.dev/icons/chess-rook) icon
	ChessRook,
	///[chevron-down](https://lucide.dev/icons/chevron-down) icon
	ChevronDown,
	///[chevron-first](https://lucide.dev/icons/chevron-first) icon
	ChevronFirst,
	///[chevron-last](https://lucide.dev/icons/chevron-last) icon
	ChevronLast,
	///[chevron-left](https://lucide.dev/icons/chevron-left) icon
	ChevronLeft,
	///[chevron-right](https://lucide.dev/icons/chevron-right) icon
	ChevronRight,
	///[chevron-up](https://lucide.dev/icons/chevron-up) icon
	ChevronUp,
	///[chevrons-down](https://lucide.dev/icons/chevrons-down) icon
	ChevronsDown,
	///[chevrons-down-up](https://lucide.dev/icons/chevrons-down-up) icon
	ChevronsDownUp,
	///[chevrons-left](https://lucide.dev/icons/chevrons-left) icon
	ChevronsLeft,
	///[chevrons-left-right](https://lucide.dev/icons/chevrons-left-right) icon
	ChevronsLeftRight,
	///[chevrons-left-right-ellipsis](https://lucide.dev/icons/chevrons-left-right-ellipsis) icon
	ChevronsLeftRightEllipsis,
	///[chevrons-right](https://lucide.dev/icons/chevrons-right) icon
	ChevronsRight,
	///[chevrons-right-left](https://lucide.dev/icons/chevrons-right-left) icon
	ChevronsRightLeft,
	///[chevrons-up](https://lucide.dev/icons/chevrons-up) icon
	ChevronsUp,
	///[chevrons-up-down](https://lucide.dev/icons/chevrons-up-down) icon
	ChevronsUpDown,
	///[chromium](https://lucide.dev/icons/chromium) icon
	Chromium,
	///[church](https://lucide.dev/icons/church) icon
	Church,
	///[cigarette](https://lucide.dev/icons/cigarette) icon
	Cigarette,
	///[cigarette-off](https://lucide.dev/icons/cigarette-off) icon
	CigaretteOff,
	///[circle](https://lucide.dev/icons/circle) icon
	Circle,
	///[circle-alert](https://lucide.dev/icons/circle-alert) icon
	CircleAlert,
	///[circle-arrow-down](https://lucide.dev/icons/circle-arrow-down) icon
	CircleArrowDown,
	///[circle-arrow-left](https://lucide.dev/icons/circle-arrow-left) icon
	CircleArrowLeft,
	///[circle-arrow-out-down-left](https://lucide.dev/icons/circle-arrow-out-down-left) icon
	CircleArrowOutDownLeft,
	///[circle-arrow-out-down-right](https://lucide.dev/icons/circle-arrow-out-down-right) icon
	CircleArrowOutDownRight,
	///[circle-arrow-out-up-left](https://lucide.dev/icons/circle-arrow-out-up-left) icon
	CircleArrowOutUpLeft,
	///[circle-arrow-out-up-right](https://lucide.dev/icons/circle-arrow-out-up-right) icon
	CircleArrowOutUpRight,
	///[circle-arrow-right](https://lucide.dev/icons/circle-arrow-right) icon
	CircleArrowRight,
	///[circle-arrow-up](https://lucide.dev/icons/circle-arrow-up) icon
	CircleArrowUp,
	///[circle-check](https://lucide.dev/icons/circle-check) icon
	CircleCheck,
	///[circle-check-big](https://lucide.dev/icons/circle-check-big) icon
	CircleCheckBig,
	///[circle-chevron-down](https://lucide.dev/icons/circle-chevron-down) icon
	CircleChevronDown,
	///[circle-chevron-left](https://lucide.dev/icons/circle-chevron-left) icon
	CircleChevronLeft,
	///[circle-chevron-right](https://lucide.dev/icons/circle-chevron-right) icon
	CircleChevronRight,
	///[circle-chevron-up](https://lucide.dev/icons/circle-chevron-up) icon
	CircleChevronUp,
	///[circle-dashed](https://lucide.dev/icons/circle-dashed) icon
	CircleDashed,
	///[circle-divide](https://lucide.dev/icons/circle-divide) icon
	CircleDivide,
	///[circle-dollar-sign](https://lucide.dev/icons/circle-dollar-sign) icon
	CircleDollarSign,
	///[circle-dot](https://lucide.dev/icons/circle-dot) icon
	CircleDot,
	///[circle-dot-dashed](https://lucide.dev/icons/circle-dot-dashed) icon
	CircleDotDashed,
	///[circle-ellipsis](https://lucide.dev/icons/circle-ellipsis) icon
	CircleEllipsis,
	///[circle-equal](https://lucide.dev/icons/circle-equal) icon
	CircleEqual,
	///[circle-fading-arrow-up](https://lucide.dev/icons/circle-fading-arrow-up) icon
	CircleFadingArrowUp,
	///[circle-fading-plus](https://lucide.dev/icons/circle-fading-plus) icon
	CircleFadingPlus,
	///[circle-gauge](https://lucide.dev/icons/circle-gauge) icon
	CircleGauge,
	///[circle-minus](https://lucide.dev/icons/circle-minus) icon
	CircleMinus,
	///[circle-off](https://lucide.dev/icons/circle-off) icon
	CircleOff,
	///[circle-parking](https://lucide.dev/icons/circle-parking) icon
	CircleParking,
	///[circle-parking-off](https://lucide.dev/icons/circle-parking-off) icon
	CircleParkingOff,
	///[circle-pause](https://lucide.dev/icons/circle-pause) icon
	CirclePause,
	///[circle-percent](https://lucide.dev/icons/circle-percent) icon
	CirclePercent,
	///[circle-pile](https://lucide.dev/icons/circle-pile) icon
	CirclePile,
	///[circle-play](https://lucide.dev/icons/circle-play) icon
	CirclePlay,
	///[circle-plus](https://lucide.dev/icons/circle-plus) icon
	CirclePlus,
	///[circle-pound-sterling](https://lucide.dev/icons/circle-pound-sterling) icon
	CirclePoundSterling,
	///[circle-power](https://lucide.dev/icons/circle-power) icon
	CirclePower,
	///[circle-question-mark](https://lucide.dev/icons/circle-question-mark) icon
	CircleQuestionMark,
	///[circle-slash](https://lucide.dev/icons/circle-slash) icon
	CircleSlash,
	///[circle-slash-2](https://lucide.dev/icons/circle-slash-2) icon
	CircleSlash2,
	///[circle-small](https://lucide.dev/icons/circle-small) icon
	CircleSmall,
	///[circle-star](https://lucide.dev/icons/circle-star) icon
	CircleStar,
	///[circle-stop](https://lucide.dev/icons/circle-stop) icon
	CircleStop,
	///[circle-user](https://lucide.dev/icons/circle-user) icon
	CircleUser,
	///[circle-user-round](https://lucide.dev/icons/circle-user-round) icon
	CircleUserRound,
	///[circle-x](https://lucide.dev/icons/circle-x) icon
	CircleX,
	///[circuit-board](https://lucide.dev/icons/circuit-board) icon
	CircuitBoard,
	///[citrus](https://lucide.dev/icons/citrus) icon
	Citrus,
	///[clapperboard](https://lucide.dev/icons/clapperboard) icon
	Clapperboard,
	///[clipboard](https://lucide.dev/icons/clipboard) icon
	Clipboard,
	///[clipboard-check](https://lucide.dev/icons/clipboard-check) icon
	ClipboardCheck,
	///[clipboard-clock](https://lucide.dev/icons/clipboard-clock) icon
	ClipboardClock,
	///[clipboard-copy](https://lucide.dev/icons/clipboard-copy) icon
	ClipboardCopy,
	///[clipboard-list](https://lucide.dev/icons/clipboard-list) icon
	ClipboardList,
	///[clipboard-minus](https://lucide.dev/icons/clipboard-minus) icon
	ClipboardMinus,
	///[clipboard-paste](https://lucide.dev/icons/clipboard-paste) icon
	ClipboardPaste,
	///[clipboard-pen](https://lucide.dev/icons/clipboard-pen) icon
	ClipboardPen,
	///[clipboard-pen-line](https://lucide.dev/icons/clipboard-pen-line) icon
	ClipboardPenLine,
	///[clipboard-plus](https://lucide.dev/icons/clipboard-plus) icon
	ClipboardPlus,
	///[clipboard-type](https://lucide.dev/icons/clipboard-type) icon
	ClipboardType,
	///[clipboard-x](https://lucide.dev/icons/clipboard-x) icon
	ClipboardX,
	///[clock](https://lucide.dev/icons/clock) icon
	Clock,
	///[clock-1](https://lucide.dev/icons/clock-1) icon
	Clock1,
	///[clock-10](https://lucide.dev/icons/clock-10) icon
	Clock10,
	///[clock-11](https://lucide.dev/icons/clock-11) icon
	Clock11,
	///[clock-12](https://lucide.dev/icons/clock-12) icon
	Clock12,
	///[clock-2](https://lucide.dev/icons/clock-2) icon
	Clock2,
	///[clock-3](https://lucide.dev/icons/clock-3) icon
	Clock3,
	///[clock-4](https://lucide.dev/icons/clock-4) icon
	Clock4,
	///[clock-5](https://lucide.dev/icons/clock-5) icon
	Clock5,
	///[clock-6](https://lucide.dev/icons/clock-6) icon
	Clock6,
	///[clock-7](https://lucide.dev/icons/clock-7) icon
	Clock7,
	///[clock-8](https://lucide.dev/icons/clock-8) icon
	Clock8,
	///[clock-9](https://lucide.dev/icons/clock-9) icon
	Clock9,
	///[clock-alert](https://lucide.dev/icons/clock-alert) icon
	ClockAlert,
	///[clock-arrow-down](https://lucide.dev/icons/clock-arrow-down) icon
	ClockArrowDown,
	///[clock-arrow-up](https://lucide.dev/icons/clock-arrow-up) icon
	ClockArrowUp,
	///[clock-check](https://lucide.dev/icons/clock-check) icon
	ClockCheck,
	///[clock-fading](https://lucide.dev/icons/clock-fading) icon
	ClockFading,
	///[clock-plus](https://lucide.dev/icons/clock-plus) icon
	ClockPlus,
	///[closed-caption](https://lucide.dev/icons/closed-caption) icon
	ClosedCaption,
	///[cloud](https://lucide.dev/icons/cloud) icon
	Cloud,
	///[cloud-alert](https://lucide.dev/icons/cloud-alert) icon
	CloudAlert,
	///[cloud-backup](https://lucide.dev/icons/cloud-backup) icon
	CloudBackup,
	///[cloud-check](https://lucide.dev/icons/cloud-check) icon
	CloudCheck,
	///[cloud-cog](https://lucide.dev/icons/cloud-cog) icon
	CloudCog,
	///[cloud-download](https://lucide.dev/icons/cloud-download) icon
	CloudDownload,
	///[cloud-drizzle](https://lucide.dev/icons/cloud-drizzle) icon
	CloudDrizzle,
	///[cloud-fog](https://lucide.dev/icons/cloud-fog) icon
	CloudFog,
	///[cloud-hail](https://lucide.dev/icons/cloud-hail) icon
	CloudHail,
	///[cloud-lightning](https://lucide.dev/icons/cloud-lightning) icon
	CloudLightning,
	///[cloud-moon](https://lucide.dev/icons/cloud-moon) icon
	CloudMoon,
	///[cloud-moon-rain](https://lucide.dev/icons/cloud-moon-rain) icon
	CloudMoonRain,
	///[cloud-off](https://lucide.dev/icons/cloud-off) icon
	CloudOff,
	///[cloud-rain](https://lucide.dev/icons/cloud-rain) icon
	CloudRain,
	///[cloud-rain-wind](https://lucide.dev/icons/cloud-rain-wind) icon
	CloudRainWind,
	///[cloud-snow](https://lucide.dev/icons/cloud-snow) icon
	CloudSnow,
	///[cloud-sun](https://lucide.dev/icons/cloud-sun) icon
	CloudSun,
	///[cloud-sun-rain](https://lucide.dev/icons/cloud-sun-rain) icon
	CloudSunRain,
	///[cloud-sync](https://lucide.dev/icons/cloud-sync) icon
	CloudSync,
	///[cloud-upload](https://lucide.dev/icons/cloud-upload) icon
	CloudUpload,
	///[cloudy](https://lucide.dev/icons/cloudy) icon
	Cloudy,
	///[clover](https://lucide.dev/icons/clover) icon
	Clover,
	///[club](https://lucide.dev/icons/club) icon
	Club,
	///[code](https://lucide.dev/icons/code) icon
	Code,
	///[code-xml](https://lucide.dev/icons/code-xml) icon
	CodeXml,
	///[codepen](https://lucide.dev/icons/codepen) icon
	Codepen,
	///[codesandbox](https://lucide.dev/icons/codesandbox) icon
	Codesandbox,
	///[coffee](https://lucide.dev/icons/coffee) icon
	Coffee,
	///[cog](https://lucide.dev/icons/cog) icon
	Cog,
	///[coins](https://lucide.dev/icons/coins) icon
	Coins,
	///[columns-2](https://lucide.dev/icons/columns-2) icon
	Columns2,
	///[columns-3](https://lucide.dev/icons/columns-3) icon
	Columns3,
	///[columns-3-cog](https://lucide.dev/icons/columns-3-cog) icon
	Columns3Cog,
	///[columns-4](https://lucide.dev/icons/columns-4) icon
	Columns4,
	///[combine](https://lucide.dev/icons/combine) icon
	Combine,
	///[command](https://lucide.dev/icons/command) icon
	Command,
	///[compass](https://lucide.dev/icons/compass) icon
	Compass,
	///[component](https://lucide.dev/icons/component) icon
	Component,
	///[concierge-bell](https://lucide.dev/icons/concierge-bell) icon
	ConciergeBell,
	///[cone](https://lucide.dev/icons/cone) icon
	Cone,
	///[construction](https://lucide.dev/icons/construction) icon
	Construction,
	///[contact](https://lucide.dev/icons/contact) icon
	Contact,
	///[contact-round](https://lucide.dev/icons/contact-round) icon
	ContactRound,
	///[container](https://lucide.dev/icons/container) icon
	Container,
	///[contrast](https://lucide.dev/icons/contrast) icon
	Contrast,
	///[cookie](https://lucide.dev/icons/cookie) icon
	Cookie,
	///[cooking-pot](https://lucide.dev/icons/cooking-pot) icon
	CookingPot,
	///[copy](https://lucide.dev/icons/copy) icon
	Copy,
	///[copy-check](https://lucide.dev/icons/copy-check) icon
	CopyCheck,
	///[copy-minus](https://lucide.dev/icons/copy-minus) icon
	CopyMinus,
	///[copy-plus](https://lucide.dev/icons/copy-plus) icon
	CopyPlus,
	///[copy-slash](https://lucide.dev/icons/copy-slash) icon
	CopySlash,
	///[copy-x](https://lucide.dev/icons/copy-x) icon
	CopyX,
	///[copyleft](https://lucide.dev/icons/copyleft) icon
	Copyleft,
	///[copyright](https://lucide.dev/icons/copyright) icon
	Copyright,
	///[corner-down-left](https://lucide.dev/icons/corner-down-left) icon
	CornerDownLeft,
	///[corner-down-right](https://lucide.dev/icons/corner-down-right) icon
	CornerDownRight,
	///[corner-left-down](https://lucide.dev/icons/corner-left-down) icon
	CornerLeftDown,
	///[corner-left-up](https://lucide.dev/icons/corner-left-up) icon
	CornerLeftUp,
	///[corner-right-down](https://lucide.dev/icons/corner-right-down) icon
	CornerRightDown,
	///[corner-right-up](https://lucide.dev/icons/corner-right-up) icon
	CornerRightUp,
	///[corner-up-left](https://lucide.dev/icons/corner-up-left) icon
	CornerUpLeft,
	///[corner-up-right](https://lucide.dev/icons/corner-up-right) icon
	CornerUpRight,
	///[cpu](https://lucide.dev/icons/cpu) icon
	Cpu,
	///[creative-commons](https://lucide.dev/icons/creative-commons) icon
	CreativeCommons,
	///[credit-card](https://lucide.dev/icons/credit-card) icon
	CreditCard,
	///[croissant](https://lucide.dev/icons/croissant) icon
	Croissant,
	///[crop](https://lucide.dev/icons/crop) icon
	Crop,
	///[cross](https://lucide.dev/icons/cross) icon
	Cross,
	///[crosshair](https://lucide.dev/icons/crosshair) icon
	Crosshair,
	///[crown](https://lucide.dev/icons/crown) icon
	Crown,
	///[cuboid](https://lucide.dev/icons/cuboid) icon
	Cuboid,
	///[cup-soda](https://lucide.dev/icons/cup-soda) icon
	CupSoda,
	///[currency](https://lucide.dev/icons/currency) icon
	Currency,
	///[cylinder](https://lucide.dev/icons/cylinder) icon
	Cylinder,
	///[dam](https://lucide.dev/icons/dam) icon
	Dam,
	///[database](https://lucide.dev/icons/database) icon
	Database,
	///[database-backup](https://lucide.dev/icons/database-backup) icon
	DatabaseBackup,
	///[database-search](https://lucide.dev/icons/database-search) icon
	DatabaseSearch,
	///[database-zap](https://lucide.dev/icons/database-zap) icon
	DatabaseZap,
	///[decimals-arrow-left](https://lucide.dev/icons/decimals-arrow-left) icon
	DecimalsArrowLeft,
	///[decimals-arrow-right](https://lucide.dev/icons/decimals-arrow-right) icon
	DecimalsArrowRight,
	///[delete](https://lucide.dev/icons/delete) icon
	Delete,
	///[dessert](https://lucide.dev/icons/dessert) icon
	Dessert,
	///[diameter](https://lucide.dev/icons/diameter) icon
	Diameter,
	///[diamond](https://lucide.dev/icons/diamond) icon
	Diamond,
	///[diamond-minus](https://lucide.dev/icons/diamond-minus) icon
	DiamondMinus,
	///[diamond-percent](https://lucide.dev/icons/diamond-percent) icon
	DiamondPercent,
	///[diamond-plus](https://lucide.dev/icons/diamond-plus) icon
	DiamondPlus,
	///[dice-1](https://lucide.dev/icons/dice-1) icon
	Dice1,
	///[dice-2](https://lucide.dev/icons/dice-2) icon
	Dice2,
	///[dice-3](https://lucide.dev/icons/dice-3) icon
	Dice3,
	///[dice-4](https://lucide.dev/icons/dice-4) icon
	Dice4,
	///[dice-5](https://lucide.dev/icons/dice-5) icon
	Dice5,
	///[dice-6](https://lucide.dev/icons/dice-6) icon
	Dice6,
	///[dices](https://lucide.dev/icons/dices) icon
	Dices,
	///[diff](https://lucide.dev/icons/diff) icon
	Diff,
	///[disc](https://lucide.dev/icons/disc) icon
	Disc,
	///[disc-2](https://lucide.dev/icons/disc-2) icon
	Disc2,
	///[disc-3](https://lucide.dev/icons/disc-3) icon
	Disc3,
	///[disc-album](https://lucide.dev/icons/disc-album) icon
	DiscAlbum,
	///[divide](https://lucide.dev/icons/divide) icon
	Divide,
	///[dna](https://lucide.dev/icons/dna) icon
	Dna,
	///[dna-off](https://lucide.dev/icons/dna-off) icon
	DnaOff,
	///[dock](https://lucide.dev/icons/dock) icon
	Dock,
	///[dog](https://lucide.dev/icons/dog) icon
	Dog,
	///[dollar-sign](https://lucide.dev/icons/dollar-sign) icon
	DollarSign,
	///[donut](https://lucide.dev/icons/donut) icon
	Donut,
	///[door-closed](https://lucide.dev/icons/door-closed) icon
	DoorClosed,
	///[door-closed-locked](https://lucide.dev/icons/door-closed-locked) icon
	DoorClosedLocked,
	///[door-open](https://lucide.dev/icons/door-open) icon
	DoorOpen,
	///[dot](https://lucide.dev/icons/dot) icon
	Dot,
	///[download](https://lucide.dev/icons/download) icon
	Download,
	///[drafting-compass](https://lucide.dev/icons/drafting-compass) icon
	DraftingCompass,
	///[drama](https://lucide.dev/icons/drama) icon
	Drama,
	///[dribbble](https://lucide.dev/icons/dribbble) icon
	Dribbble,
	///[drill](https://lucide.dev/icons/drill) icon
	Drill,
	///[drone](https://lucide.dev/icons/drone) icon
	Drone,
	///[droplet](https://lucide.dev/icons/droplet) icon
	Droplet,
	///[droplet-off](https://lucide.dev/icons/droplet-off) icon
	DropletOff,
	///[droplets](https://lucide.dev/icons/droplets) icon
	Droplets,
	///[drum](https://lucide.dev/icons/drum) icon
	Drum,
	///[drumstick](https://lucide.dev/icons/drumstick) icon
	Drumstick,
	///[dumbbell](https://lucide.dev/icons/dumbbell) icon
	Dumbbell,
	///[ear](https://lucide.dev/icons/ear) icon
	Ear,
	///[ear-off](https://lucide.dev/icons/ear-off) icon
	EarOff,
	///[earth](https://lucide.dev/icons/earth) icon
	Earth,
	///[earth-lock](https://lucide.dev/icons/earth-lock) icon
	EarthLock,
	///[eclipse](https://lucide.dev/icons/eclipse) icon
	Eclipse,
	///[egg](https://lucide.dev/icons/egg) icon
	Egg,
	///[egg-fried](https://lucide.dev/icons/egg-fried) icon
	EggFried,
	///[egg-off](https://lucide.dev/icons/egg-off) icon
	EggOff,
	///[ellipsis](https://lucide.dev/icons/ellipsis) icon
	Ellipsis,
	///[ellipsis-vertical](https://lucide.dev/icons/ellipsis-vertical) icon
	EllipsisVertical,
	///[equal](https://lucide.dev/icons/equal) icon
	Equal,
	///[equal-approximately](https://lucide.dev/icons/equal-approximately) icon
	EqualApproximately,
	///[equal-not](https://lucide.dev/icons/equal-not) icon
	EqualNot,
	///[eraser](https://lucide.dev/icons/eraser) icon
	Eraser,
	///[ethernet-port](https://lucide.dev/icons/ethernet-port) icon
	EthernetPort,
	///[euro](https://lucide.dev/icons/euro) icon
	Euro,
	///[ev-charger](https://lucide.dev/icons/ev-charger) icon
	EvCharger,
	///[expand](https://lucide.dev/icons/expand) icon
	Expand,
	///[external-link](https://lucide.dev/icons/external-link) icon
	ExternalLink,
	///[eye](https://lucide.dev/icons/eye) icon
	Eye,
	///[eye-closed](https://lucide.dev/icons/eye-closed) icon
	EyeClosed,
	///[eye-off](https://lucide.dev/icons/eye-off) icon
	EyeOff,
	///[facebook](https://lucide.dev/icons/facebook) icon
	Facebook,
	///[factory](https://lucide.dev/icons/factory) icon
	Factory,
	///[fan](https://lucide.dev/icons/fan) icon
	Fan,
	///[fast-forward](https://lucide.dev/icons/fast-forward) icon
	FastForward,
	///[feather](https://lucide.dev/icons/feather) icon
	Feather,
	///[fence](https://lucide.dev/icons/fence) icon
	Fence,
	///[ferris-wheel](https://lucide.dev/icons/ferris-wheel) icon
	FerrisWheel,
	///[figma](https://lucide.dev/icons/figma) icon
	Figma,
	///[file](https://lucide.dev/icons/file) icon
	File,
	///[file-archive](https://lucide.dev/icons/file-archive) icon
	FileArchive,
	///[file-axis-3d](https://lucide.dev/icons/file-axis-3d) icon
	FileAxis3d,
	///[file-badge](https://lucide.dev/icons/file-badge) icon
	FileBadge,
	///[file-box](https://lucide.dev/icons/file-box) icon
	FileBox,
	///[file-braces](https://lucide.dev/icons/file-braces) icon
	FileBraces,
	///[file-braces-corner](https://lucide.dev/icons/file-braces-corner) icon
	FileBracesCorner,
	///[file-chart-column](https://lucide.dev/icons/file-chart-column) icon
	FileChartColumn,
	///[file-chart-column-increasing](https://lucide.dev/icons/file-chart-column-increasing) icon
	FileChartColumnIncreasing,
	///[file-chart-line](https://lucide.dev/icons/file-chart-line) icon
	FileChartLine,
	///[file-chart-pie](https://lucide.dev/icons/file-chart-pie) icon
	FileChartPie,
	///[file-check](https://lucide.dev/icons/file-check) icon
	FileCheck,
	///[file-check-corner](https://lucide.dev/icons/file-check-corner) icon
	FileCheckCorner,
	///[file-clock](https://lucide.dev/icons/file-clock) icon
	FileClock,
	///[file-code](https://lucide.dev/icons/file-code) icon
	FileCode,
	///[file-code-corner](https://lucide.dev/icons/file-code-corner) icon
	FileCodeCorner,
	///[file-cog](https://lucide.dev/icons/file-cog) icon
	FileCog,
	///[file-diff](https://lucide.dev/icons/file-diff) icon
	FileDiff,
	///[file-digit](https://lucide.dev/icons/file-digit) icon
	FileDigit,
	///[file-down](https://lucide.dev/icons/file-down) icon
	FileDown,
	///[file-exclamation-point](https://lucide.dev/icons/file-exclamation-point) icon
	FileExclamationPoint,
	///[file-headphone](https://lucide.dev/icons/file-headphone) icon
	FileHeadphone,
	///[file-heart](https://lucide.dev/icons/file-heart) icon
	FileHeart,
	///[file-image](https://lucide.dev/icons/file-image) icon
	FileImage,
	///[file-input](https://lucide.dev/icons/file-input) icon
	FileInput,
	///[file-key](https://lucide.dev/icons/file-key) icon
	FileKey,
	///[file-lock](https://lucide.dev/icons/file-lock) icon
	FileLock,
	///[file-minus](https://lucide.dev/icons/file-minus) icon
	FileMinus,
	///[file-minus-corner](https://lucide.dev/icons/file-minus-corner) icon
	FileMinusCorner,
	///[file-music](https://lucide.dev/icons/file-music) icon
	FileMusic,
	///[file-output](https://lucide.dev/icons/file-output) icon
	FileOutput,
	///[file-pen](https://lucide.dev/icons/file-pen) icon
	FilePen,
	///[file-pen-line](https://lucide.dev/icons/file-pen-line) icon
	FilePenLine,
	///[file-play](https://lucide.dev/icons/file-play) icon
	FilePlay,
	///[file-plus](https://lucide.dev/icons/file-plus) icon
	FilePlus,
	///[file-plus-corner](https://lucide.dev/icons/file-plus-corner) icon
	FilePlusCorner,
	///[file-question-mark](https://lucide.dev/icons/file-question-mark) icon
	FileQuestionMark,
	///[file-scan](https://lucide.dev/icons/file-scan) icon
	FileScan,
	///[file-search](https://lucide.dev/icons/file-search) icon
	FileSearch,
	///[file-search-corner](https://lucide.dev/icons/file-search-corner) icon
	FileSearchCorner,
	///[file-signal](https://lucide.dev/icons/file-signal) icon
	FileSignal,
	///[file-sliders](https://lucide.dev/icons/file-sliders) icon
	FileSliders,
	///[file-spreadsheet](https://lucide.dev/icons/file-spreadsheet) icon
	FileSpreadsheet,
	///[file-stack](https://lucide.dev/icons/file-stack) icon
	FileStack,
	///[file-symlink](https://lucide.dev/icons/file-symlink) icon
	FileSymlink,
	///[file-terminal](https://lucide.dev/icons/file-terminal) icon
	FileTerminal,
	///[file-text](https://lucide.dev/icons/file-text) icon
	FileText,
	///[file-type](https://lucide.dev/icons/file-type) icon
	FileType,
	///[file-type-corner](https://lucide.dev/icons/file-type-corner) icon
	FileTypeCorner,
	///[file-up](https://lucide.dev/icons/file-up) icon
	FileUp,
	///[file-user](https://lucide.dev/icons/file-user) icon
	FileUser,
	///[file-video-camera](https://lucide.dev/icons/file-video-camera) icon
	FileVideoCamera,
	///[file-volume](https://lucide.dev/icons/file-volume) icon
	FileVolume,
	///[file-x](https://lucide.dev/icons/file-x) icon
	FileX,
	///[file-x-corner](https://lucide.dev/icons/file-x-corner) icon
	FileXCorner,
	///[files](https://lucide.dev/icons/files) icon
	Files,
	///[film](https://lucide.dev/icons/film) icon
	Film,
	///[fingerprint-pattern](https://lucide.dev/icons/fingerprint-pattern) icon
	FingerprintPattern,
	///[fire-extinguisher](https://lucide.dev/icons/fire-extinguisher) icon
	FireExtinguisher,
	///[fish](https://lucide.dev/icons/fish) icon
	Fish,
	///[fish-off](https://lucide.dev/icons/fish-off) icon
	FishOff,
	///[fish-symbol](https://lucide.dev/icons/fish-symbol) icon
	FishSymbol,
	///[fishing-hook](https://lucide.dev/icons/fishing-hook) icon
	FishingHook,
	///[flag](https://lucide.dev/icons/flag) icon
	Flag,
	///[flag-off](https://lucide.dev/icons/flag-off) icon
	FlagOff,
	///[flag-triangle-left](https://lucide.dev/icons/flag-triangle-left) icon
	FlagTriangleLeft,
	///[flag-triangle-right](https://lucide.dev/icons/flag-triangle-right) icon
	FlagTriangleRight,
	///[flame](https://lucide.dev/icons/flame) icon
	Flame,
	///[flame-kindling](https://lucide.dev/icons/flame-kindling) icon
	FlameKindling,
	///[flashlight](https://lucide.dev/icons/flashlight) icon
	Flashlight,
	///[flashlight-off](https://lucide.dev/icons/flashlight-off) icon
	FlashlightOff,
	///[flask-conical](https://lucide.dev/icons/flask-conical) icon
	FlaskConical,
	///[flask-conical-off](https://lucide.dev/icons/flask-conical-off) icon
	FlaskConicalOff,
	///[flask-round](https://lucide.dev/icons/flask-round) icon
	FlaskRound,
	///[flip-horizontal-2](https://lucide.dev/icons/flip-horizontal-2) icon
	FlipHorizontal2,
	///[flip-vertical-2](https://lucide.dev/icons/flip-vertical-2) icon
	FlipVertical2,
	///[flower](https://lucide.dev/icons/flower) icon
	Flower,
	///[flower-2](https://lucide.dev/icons/flower-2) icon
	Flower2,
	///[focus](https://lucide.dev/icons/focus) icon
	Focus,
	///[fold-horizontal](https://lucide.dev/icons/fold-horizontal) icon
	FoldHorizontal,
	///[fold-vertical](https://lucide.dev/icons/fold-vertical) icon
	FoldVertical,
	///[folder](https://lucide.dev/icons/folder) icon
	Folder,
	///[folder-archive](https://lucide.dev/icons/folder-archive) icon
	FolderArchive,
	///[folder-check](https://lucide.dev/icons/folder-check) icon
	FolderCheck,
	///[folder-clock](https://lucide.dev/icons/folder-clock) icon
	FolderClock,
	///[folder-closed](https://lucide.dev/icons/folder-closed) icon
	FolderClosed,
	///[folder-code](https://lucide.dev/icons/folder-code) icon
	FolderCode,
	///[folder-cog](https://lucide.dev/icons/folder-cog) icon
	FolderCog,
	///[folder-dot](https://lucide.dev/icons/folder-dot) icon
	FolderDot,
	///[folder-down](https://lucide.dev/icons/folder-down) icon
	FolderDown,
	///[folder-git](https://lucide.dev/icons/folder-git) icon
	FolderGit,
	///[folder-git-2](https://lucide.dev/icons/folder-git-2) icon
	FolderGit2,
	///[folder-heart](https://lucide.dev/icons/folder-heart) icon
	FolderHeart,
	///[folder-input](https://lucide.dev/icons/folder-input) icon
	FolderInput,
	///[folder-kanban](https://lucide.dev/icons/folder-kanban) icon
	FolderKanban,
	///[folder-key](https://lucide.dev/icons/folder-key) icon
	FolderKey,
	///[folder-lock](https://lucide.dev/icons/folder-lock) icon
	FolderLock,
	///[folder-minus](https://lucide.dev/icons/folder-minus) icon
	FolderMinus,
	///[folder-open](https://lucide.dev/icons/folder-open) icon
	FolderOpen,
	///[folder-open-dot](https://lucide.dev/icons/folder-open-dot) icon
	FolderOpenDot,
	///[folder-output](https://lucide.dev/icons/folder-output) icon
	FolderOutput,
	///[folder-pen](https://lucide.dev/icons/folder-pen) icon
	FolderPen,
	///[folder-plus](https://lucide.dev/icons/folder-plus) icon
	FolderPlus,
	///[folder-root](https://lucide.dev/icons/folder-root) icon
	FolderRoot,
	///[folder-search](https://lucide.dev/icons/folder-search) icon
	FolderSearch,
	///[folder-search-2](https://lucide.dev/icons/folder-search-2) icon
	FolderSearch2,
	///[folder-symlink](https://lucide.dev/icons/folder-symlink) icon
	FolderSymlink,
	///[folder-sync](https://lucide.dev/icons/folder-sync) icon
	FolderSync,
	///[folder-tree](https://lucide.dev/icons/folder-tree) icon
	FolderTree,
	///[folder-up](https://lucide.dev/icons/folder-up) icon
	FolderUp,
	///[folder-x](https://lucide.dev/icons/folder-x) icon
	FolderX,
	///[folders](https://lucide.dev/icons/folders) icon
	Folders,
	///[footprints](https://lucide.dev/icons/footprints) icon
	Footprints,
	///[forklift](https://lucide.dev/icons/forklift) icon
	Forklift,
	///[form](https://lucide.dev/icons/form) icon
	Form,
	///[forward](https://lucide.dev/icons/forward) icon
	Forward,
	///[frame](https://lucide.dev/icons/frame) icon
	Frame,
	///[framer](https://lucide.dev/icons/framer) icon
	Framer,
	///[frown](https://lucide.dev/icons/frown) icon
	Frown,
	///[fuel](https://lucide.dev/icons/fuel) icon
	Fuel,
	///[fullscreen](https://lucide.dev/icons/fullscreen) icon
	Fullscreen,
	///[funnel](https://lucide.dev/icons/funnel) icon
	Funnel,
	///[funnel-plus](https://lucide.dev/icons/funnel-plus) icon
	FunnelPlus,
	///[funnel-x](https://lucide.dev/icons/funnel-x) icon
	FunnelX,
	///[gallery-horizontal](https://lucide.dev/icons/gallery-horizontal) icon
	GalleryHorizontal,
	///[gallery-horizontal-end](https://lucide.dev/icons/gallery-horizontal-end) icon
	GalleryHorizontalEnd,
	///[gallery-thumbnails](https://lucide.dev/icons/gallery-thumbnails) icon
	GalleryThumbnails,
	///[gallery-vertical](https://lucide.dev/icons/gallery-vertical) icon
	GalleryVertical,
	///[gallery-vertical-end](https://lucide.dev/icons/gallery-vertical-end) icon
	GalleryVerticalEnd,
	///[gamepad](https://lucide.dev/icons/gamepad) icon
	Gamepad,
	///[gamepad-2](https://lucide.dev/icons/gamepad-2) icon
	Gamepad2,
	///[gamepad-directional](https://lucide.dev/icons/gamepad-directional) icon
	GamepadDirectional,
	///[gauge](https://lucide.dev/icons/gauge) icon
	Gauge,
	///[gavel](https://lucide.dev/icons/gavel) icon
	Gavel,
	///[gem](https://lucide.dev/icons/gem) icon
	Gem,
	///[georgian-lari](https://lucide.dev/icons/georgian-lari) icon
	GeorgianLari,
	///[ghost](https://lucide.dev/icons/ghost) icon
	Ghost,
	///[gift](https://lucide.dev/icons/gift) icon
	Gift,
	///[git-branch](https://lucide.dev/icons/git-branch) icon
	GitBranch,
	///[git-branch-minus](https://lucide.dev/icons/git-branch-minus) icon
	GitBranchMinus,
	///[git-branch-plus](https://lucide.dev/icons/git-branch-plus) icon
	GitBranchPlus,
	///[git-commit-horizontal](https://lucide.dev/icons/git-commit-horizontal) icon
	GitCommitHorizontal,
	///[git-commit-vertical](https://lucide.dev/icons/git-commit-vertical) icon
	GitCommitVertical,
	///[git-compare](https://lucide.dev/icons/git-compare) icon
	GitCompare,
	///[git-compare-arrows](https://lucide.dev/icons/git-compare-arrows) icon
	GitCompareArrows,
	///[git-fork](https://lucide.dev/icons/git-fork) icon
	GitFork,
	///[git-graph](https://lucide.dev/icons/git-graph) icon
	GitGraph,
	///[git-merge](https://lucide.dev/icons/git-merge) icon
	GitMerge,
	///[git-merge-conflict](https://lucide.dev/icons/git-merge-conflict) icon
	GitMergeConflict,
	///[git-pull-request](https://lucide.dev/icons/git-pull-request) icon
	GitPullRequest,
	///[git-pull-request-arrow](https://lucide.dev/icons/git-pull-request-arrow) icon
	GitPullRequestArrow,
	///[git-pull-request-closed](https://lucide.dev/icons/git-pull-request-closed) icon
	GitPullRequestClosed,
	///[git-pull-request-create](https://lucide.dev/icons/git-pull-request-create) icon
	GitPullRequestCreate,
	///[git-pull-request-create-arrow](https://lucide.dev/icons/git-pull-request-create-arrow) icon
	GitPullRequestCreateArrow,
	///[git-pull-request-draft](https://lucide.dev/icons/git-pull-request-draft) icon
	GitPullRequestDraft,
	///[github](https://lucide.dev/icons/github) icon
	Github,
	///[gitlab](https://lucide.dev/icons/gitlab) icon
	Gitlab,
	///[glass-water](https://lucide.dev/icons/glass-water) icon
	GlassWater,
	///[glasses](https://lucide.dev/icons/glasses) icon
	Glasses,
	///[globe](https://lucide.dev/icons/globe) icon
	Globe,
	///[globe-lock](https://lucide.dev/icons/globe-lock) icon
	GlobeLock,
	///[globe-off](https://lucide.dev/icons/globe-off) icon
	GlobeOff,
	///[globe-x](https://lucide.dev/icons/globe-x) icon
	GlobeX,
	///[goal](https://lucide.dev/icons/goal) icon
	Goal,
	///[gpu](https://lucide.dev/icons/gpu) icon
	Gpu,
	///[graduation-cap](https://lucide.dev/icons/graduation-cap) icon
	GraduationCap,
	///[grape](https://lucide.dev/icons/grape) icon
	Grape,
	///[grid-2x2](https://lucide.dev/icons/grid-2x2) icon
	Grid2x2,
	///[grid-2x2-check](https://lucide.dev/icons/grid-2x2-check) icon
	Grid2x2Check,
	///[grid-2x2-plus](https://lucide.dev/icons/grid-2x2-plus) icon
	Grid2x2Plus,
	///[grid-2x2-x](https://lucide.dev/icons/grid-2x2-x) icon
	Grid2x2X,
	///[grid-3x2](https://lucide.dev/icons/grid-3x2) icon
	Grid3x2,
	///[grid-3x3](https://lucide.dev/icons/grid-3x3) icon
	Grid3x3,
	///[grip](https://lucide.dev/icons/grip) icon
	Grip,
	///[grip-horizontal](https://lucide.dev/icons/grip-horizontal) icon
	GripHorizontal,
	///[grip-vertical](https://lucide.dev/icons/grip-vertical) icon
	GripVertical,
	///[group](https://lucide.dev/icons/group) icon
	Group,
	///[guitar](https://lucide.dev/icons/guitar) icon
	Guitar,
	///[ham](https://lucide.dev/icons/ham) icon
	Ham,
	///[hamburger](https://lucide.dev/icons/hamburger) icon
	Hamburger,
	///[hammer](https://lucide.dev/icons/hammer) icon
	Hammer,
	///[hand](https://lucide.dev/icons/hand) icon
	Hand,
	///[hand-coins](https://lucide.dev/icons/hand-coins) icon
	HandCoins,
	///[hand-fist](https://lucide.dev/icons/hand-fist) icon
	HandFist,
	///[hand-grab](https://lucide.dev/icons/hand-grab) icon
	HandGrab,
	///[hand-heart](https://lucide.dev/icons/hand-heart) icon
	HandHeart,
	///[hand-helping](https://lucide.dev/icons/hand-helping) icon
	HandHelping,
	///[hand-metal](https://lucide.dev/icons/hand-metal) icon
	HandMetal,
	///[hand-platter](https://lucide.dev/icons/hand-platter) icon
	HandPlatter,
	///[handbag](https://lucide.dev/icons/handbag) icon
	Handbag,
	///[handshake](https://lucide.dev/icons/handshake) icon
	Handshake,
	///[hard-drive](https://lucide.dev/icons/hard-drive) icon
	HardDrive,
	///[hard-drive-download](https://lucide.dev/icons/hard-drive-download) icon
	HardDriveDownload,
	///[hard-drive-upload](https://lucide.dev/icons/hard-drive-upload) icon
	HardDriveUpload,
	///[hard-hat](https://lucide.dev/icons/hard-hat) icon
	HardHat,
	///[hash](https://lucide.dev/icons/hash) icon
	Hash,
	///[hat-glasses](https://lucide.dev/icons/hat-glasses) icon
	HatGlasses,
	///[haze](https://lucide.dev/icons/haze) icon
	Haze,
	///[hd](https://lucide.dev/icons/hd) icon
	Hd,
	///[hdmi-port](https://lucide.dev/icons/hdmi-port) icon
	HdmiPort,
	///[heading](https://lucide.dev/icons/heading) icon
	Heading,
	///[heading-1](https://lucide.dev/icons/heading-1) icon
	Heading1,
	///[heading-2](https://lucide.dev/icons/heading-2) icon
	Heading2,
	///[heading-3](https://lucide.dev/icons/heading-3) icon
	Heading3,
	///[heading-4](https://lucide.dev/icons/heading-4) icon
	Heading4,
	///[heading-5](https://lucide.dev/icons/heading-5) icon
	Heading5,
	///[heading-6](https://lucide.dev/icons/heading-6) icon
	Heading6,
	///[headphone-off](https://lucide.dev/icons/headphone-off) icon
	HeadphoneOff,
	///[headphones](https://lucide.dev/icons/headphones) icon
	Headphones,
	///[headset](https://lucide.dev/icons/headset) icon
	Headset,
	///[heart](https://lucide.dev/icons/heart) icon
	Heart,
	///[heart-crack](https://lucide.dev/icons/heart-crack) icon
	HeartCrack,
	///[heart-handshake](https://lucide.dev/icons/heart-handshake) icon
	HeartHandshake,
	///[heart-minus](https://lucide.dev/icons/heart-minus) icon
	HeartMinus,
	///[heart-off](https://lucide.dev/icons/heart-off) icon
	HeartOff,
	///[heart-plus](https://lucide.dev/icons/heart-plus) icon
	HeartPlus,
	///[heart-pulse](https://lucide.dev/icons/heart-pulse) icon
	HeartPulse,
	///[heater](https://lucide.dev/icons/heater) icon
	Heater,
	///[helicopter](https://lucide.dev/icons/helicopter) icon
	Helicopter,
	///[hexagon](https://lucide.dev/icons/hexagon) icon
	Hexagon,
	///[highlighter](https://lucide.dev/icons/highlighter) icon
	Highlighter,
	///[history](https://lucide.dev/icons/history) icon
	History,
	///[hop](https://lucide.dev/icons/hop) icon
	Hop,
	///[hop-off](https://lucide.dev/icons/hop-off) icon
	HopOff,
	///[hospital](https://lucide.dev/icons/hospital) icon
	Hospital,
	///[hotel](https://lucide.dev/icons/hotel) icon
	Hotel,
	///[hourglass](https://lucide.dev/icons/hourglass) icon
	Hourglass,
	///[house](https://lucide.dev/icons/house) icon
	House,
	///[house-heart](https://lucide.dev/icons/house-heart) icon
	HouseHeart,
	///[house-plug](https://lucide.dev/icons/house-plug) icon
	HousePlug,
	///[house-plus](https://lucide.dev/icons/house-plus) icon
	HousePlus,
	///[house-wifi](https://lucide.dev/icons/house-wifi) icon
	HouseWifi,
	///[ice-cream-bowl](https://lucide.dev/icons/ice-cream-bowl) icon
	IceCreamBowl,
	///[ice-cream-cone](https://lucide.dev/icons/ice-cream-cone) icon
	IceCreamCone,
	///[id-card](https://lucide.dev/icons/id-card) icon
	IdCard,
	///[id-card-lanyard](https://lucide.dev/icons/id-card-lanyard) icon
	IdCardLanyard,
	///[image](https://lucide.dev/icons/image) icon
	Image,
	///[image-down](https://lucide.dev/icons/image-down) icon
	ImageDown,
	///[image-minus](https://lucide.dev/icons/image-minus) icon
	ImageMinus,
	///[image-off](https://lucide.dev/icons/image-off) icon
	ImageOff,
	///[image-play](https://lucide.dev/icons/image-play) icon
	ImagePlay,
	///[image-plus](https://lucide.dev/icons/image-plus) icon
	ImagePlus,
	///[image-up](https://lucide.dev/icons/image-up) icon
	ImageUp,
	///[image-upscale](https://lucide.dev/icons/image-upscale) icon
	ImageUpscale,
	///[images](https://lucide.dev/icons/images) icon
	Images,
	///[import](https://lucide.dev/icons/import) icon
	Import,
	///[inbox](https://lucide.dev/icons/inbox) icon
	Inbox,
	///[indian-rupee](https://lucide.dev/icons/indian-rupee) icon
	IndianRupee,
	///[infinity](https://lucide.dev/icons/infinity) icon
	Infinity,
	///[info](https://lucide.dev/icons/info) icon
	Info,
	///[inspection-panel](https://lucide.dev/icons/inspection-panel) icon
	InspectionPanel,
	///[instagram](https://lucide.dev/icons/instagram) icon
	Instagram,
	///[italic](https://lucide.dev/icons/italic) icon
	Italic,
	///[iteration-ccw](https://lucide.dev/icons/iteration-ccw) icon
	IterationCcw,
	///[iteration-cw](https://lucide.dev/icons/iteration-cw) icon
	IterationCw,
	///[japanese-yen](https://lucide.dev/icons/japanese-yen) icon
	JapaneseYen,
	///[joystick](https://lucide.dev/icons/joystick) icon
	Joystick,
	///[kanban](https://lucide.dev/icons/kanban) icon
	Kanban,
	///[kayak](https://lucide.dev/icons/kayak) icon
	Kayak,
	///[key](https://lucide.dev/icons/key) icon
	Key,
	///[key-round](https://lucide.dev/icons/key-round) icon
	KeyRound,
	///[key-square](https://lucide.dev/icons/key-square) icon
	KeySquare,
	///[keyboard](https://lucide.dev/icons/keyboard) icon
	Keyboard,
	///[keyboard-music](https://lucide.dev/icons/keyboard-music) icon
	KeyboardMusic,
	///[keyboard-off](https://lucide.dev/icons/keyboard-off) icon
	KeyboardOff,
	///[lamp](https://lucide.dev/icons/lamp) icon
	Lamp,
	///[lamp-ceiling](https://lucide.dev/icons/lamp-ceiling) icon
	LampCeiling,
	///[lamp-desk](https://lucide.dev/icons/lamp-desk) icon
	LampDesk,
	///[lamp-floor](https://lucide.dev/icons/lamp-floor) icon
	LampFloor,
	///[lamp-wall-down](https://lucide.dev/icons/lamp-wall-down) icon
	LampWallDown,
	///[lamp-wall-up](https://lucide.dev/icons/lamp-wall-up) icon
	LampWallUp,
	///[land-plot](https://lucide.dev/icons/land-plot) icon
	LandPlot,
	///[landmark](https://lucide.dev/icons/landmark) icon
	Landmark,
	///[languages](https://lucide.dev/icons/languages) icon
	Languages,
	///[laptop](https://lucide.dev/icons/laptop) icon
	Laptop,
	///[laptop-minimal](https://lucide.dev/icons/laptop-minimal) icon
	LaptopMinimal,
	///[laptop-minimal-check](https://lucide.dev/icons/laptop-minimal-check) icon
	LaptopMinimalCheck,
	///[lasso](https://lucide.dev/icons/lasso) icon
	Lasso,
	///[lasso-select](https://lucide.dev/icons/lasso-select) icon
	LassoSelect,
	///[laugh](https://lucide.dev/icons/laugh) icon
	Laugh,
	///[layers](https://lucide.dev/icons/layers) icon
	Layers,
	///[layers-2](https://lucide.dev/icons/layers-2) icon
	Layers2,
	///[layers-plus](https://lucide.dev/icons/layers-plus) icon
	LayersPlus,
	///[layout-dashboard](https://lucide.dev/icons/layout-dashboard) icon
	LayoutDashboard,
	///[layout-grid](https://lucide.dev/icons/layout-grid) icon
	LayoutGrid,
	///[layout-list](https://lucide.dev/icons/layout-list) icon
	LayoutList,
	///[layout-panel-left](https://lucide.dev/icons/layout-panel-left) icon
	LayoutPanelLeft,
	///[layout-panel-top](https://lucide.dev/icons/layout-panel-top) icon
	LayoutPanelTop,
	///[layout-template](https://lucide.dev/icons/layout-template) icon
	LayoutTemplate,
	///[leaf](https://lucide.dev/icons/leaf) icon
	Leaf,
	///[leafy-green](https://lucide.dev/icons/leafy-green) icon
	LeafyGreen,
	///[lectern](https://lucide.dev/icons/lectern) icon
	Lectern,
	///[lens-concave](https://lucide.dev/icons/lens-concave) icon
	LensConcave,
	///[lens-convex](https://lucide.dev/icons/lens-convex) icon
	LensConvex,
	///[library](https://lucide.dev/icons/library) icon
	Library,
	///[library-big](https://lucide.dev/icons/library-big) icon
	LibraryBig,
	///[life-buoy](https://lucide.dev/icons/life-buoy) icon
	LifeBuoy,
	///[ligature](https://lucide.dev/icons/ligature) icon
	Ligature,
	///[lightbulb](https://lucide.dev/icons/lightbulb) icon
	Lightbulb,
	///[lightbulb-off](https://lucide.dev/icons/lightbulb-off) icon
	LightbulbOff,
	///[line-dot-right-horizontal](https://lucide.dev/icons/line-dot-right-horizontal) icon
	LineDotRightHorizontal,
	///[line-squiggle](https://lucide.dev/icons/line-squiggle) icon
	LineSquiggle,
	///[link](https://lucide.dev/icons/link) icon
	Link,
	///[link-2](https://lucide.dev/icons/link-2) icon
	Link2,
	///[link-2-off](https://lucide.dev/icons/link-2-off) icon
	Link2Off,
	///[linkedin](https://lucide.dev/icons/linkedin) icon
	Linkedin,
	///[list](https://lucide.dev/icons/list) icon
	List,
	///[list-check](https://lucide.dev/icons/list-check) icon
	ListCheck,
	///[list-checks](https://lucide.dev/icons/list-checks) icon
	ListChecks,
	///[list-chevrons-down-up](https://lucide.dev/icons/list-chevrons-down-up) icon
	ListChevronsDownUp,
	///[list-chevrons-up-down](https://lucide.dev/icons/list-chevrons-up-down) icon
	ListChevronsUpDown,
	///[list-collapse](https://lucide.dev/icons/list-collapse) icon
	ListCollapse,
	///[list-end](https://lucide.dev/icons/list-end) icon
	ListEnd,
	///[list-filter](https://lucide.dev/icons/list-filter) icon
	ListFilter,
	///[list-filter-plus](https://lucide.dev/icons/list-filter-plus) icon
	ListFilterPlus,
	///[list-indent-decrease](https://lucide.dev/icons/list-indent-decrease) icon
	ListIndentDecrease,
	///[list-indent-increase](https://lucide.dev/icons/list-indent-increase) icon
	ListIndentIncrease,
	///[list-minus](https://lucide.dev/icons/list-minus) icon
	ListMinus,
	///[list-music](https://lucide.dev/icons/list-music) icon
	ListMusic,
	///[list-ordered](https://lucide.dev/icons/list-ordered) icon
	ListOrdered,
	///[list-plus](https://lucide.dev/icons/list-plus) icon
	ListPlus,
	///[list-restart](https://lucide.dev/icons/list-restart) icon
	ListRestart,
	///[list-start](https://lucide.dev/icons/list-start) icon
	ListStart,
	///[list-todo](https://lucide.dev/icons/list-todo) icon
	ListTodo,
	///[list-tree](https://lucide.dev/icons/list-tree) icon
	ListTree,
	///[list-video](https://lucide.dev/icons/list-video) icon
	ListVideo,
	///[list-x](https://lucide.dev/icons/list-x) icon
	ListX,
	///[loader](https://lucide.dev/icons/loader) icon
	Loader,
	///[loader-circle](https://lucide.dev/icons/loader-circle) icon
	LoaderCircle,
	///[loader-pinwheel](https://lucide.dev/icons/loader-pinwheel) icon
	LoaderPinwheel,
	///[locate](https://lucide.dev/icons/locate) icon
	Locate,
	///[locate-fixed](https://lucide.dev/icons/locate-fixed) icon
	LocateFixed,
	///[locate-off](https://lucide.dev/icons/locate-off) icon
	LocateOff,
	///[lock](https://lucide.dev/icons/lock) icon
	Lock,
	///[lock-keyhole](https://lucide.dev/icons/lock-keyhole) icon
	LockKeyhole,
	///[lock-keyhole-open](https://lucide.dev/icons/lock-keyhole-open) icon
	LockKeyholeOpen,
	///[lock-open](https://lucide.dev/icons/lock-open) icon
	LockOpen,
	///[log-in](https://lucide.dev/icons/log-in) icon
	LogIn,
	///[log-out](https://lucide.dev/icons/log-out) icon
	LogOut,
	///[logs](https://lucide.dev/icons/logs) icon
	Logs,
	///[lollipop](https://lucide.dev/icons/lollipop) icon
	Lollipop,
	///[luggage](https://lucide.dev/icons/luggage) icon
	Luggage,
	///[magnet](https://lucide.dev/icons/magnet) icon
	Magnet,
	///[mail](https://lucide.dev/icons/mail) icon
	Mail,
	///[mail-check](https://lucide.dev/icons/mail-check) icon
	MailCheck,
	///[mail-minus](https://lucide.dev/icons/mail-minus) icon
	MailMinus,
	///[mail-open](https://lucide.dev/icons/mail-open) icon
	MailOpen,
	///[mail-plus](https://lucide.dev/icons/mail-plus) icon
	MailPlus,
	///[mail-question-mark](https://lucide.dev/icons/mail-question-mark) icon
	MailQuestionMark,
	///[mail-search](https://lucide.dev/icons/mail-search) icon
	MailSearch,
	///[mail-warning](https://lucide.dev/icons/mail-warning) icon
	MailWarning,
	///[mail-x](https://lucide.dev/icons/mail-x) icon
	MailX,
	///[mailbox](https://lucide.dev/icons/mailbox) icon
	Mailbox,
	///[mails](https://lucide.dev/icons/mails) icon
	Mails,
	///[map](https://lucide.dev/icons/map) icon
	Map,
	///[map-minus](https://lucide.dev/icons/map-minus) icon
	MapMinus,
	///[map-pin](https://lucide.dev/icons/map-pin) icon
	MapPin,
	///[map-pin-check](https://lucide.dev/icons/map-pin-check) icon
	MapPinCheck,
	///[map-pin-check-inside](https://lucide.dev/icons/map-pin-check-inside) icon
	MapPinCheckInside,
	///[map-pin-house](https://lucide.dev/icons/map-pin-house) icon
	MapPinHouse,
	///[map-pin-minus](https://lucide.dev/icons/map-pin-minus) icon
	MapPinMinus,
	///[map-pin-minus-inside](https://lucide.dev/icons/map-pin-minus-inside) icon
	MapPinMinusInside,
	///[map-pin-off](https://lucide.dev/icons/map-pin-off) icon
	MapPinOff,
	///[map-pin-pen](https://lucide.dev/icons/map-pin-pen) icon
	MapPinPen,
	///[map-pin-plus](https://lucide.dev/icons/map-pin-plus) icon
	MapPinPlus,
	///[map-pin-plus-inside](https://lucide.dev/icons/map-pin-plus-inside) icon
	MapPinPlusInside,
	///[map-pin-x](https://lucide.dev/icons/map-pin-x) icon
	MapPinX,
	///[map-pin-x-inside](https://lucide.dev/icons/map-pin-x-inside) icon
	MapPinXInside,
	///[map-pinned](https://lucide.dev/icons/map-pinned) icon
	MapPinned,
	///[map-plus](https://lucide.dev/icons/map-plus) icon
	MapPlus,
	///[mars](https://lucide.dev/icons/mars) icon
	Mars,
	///[mars-stroke](https://lucide.dev/icons/mars-stroke) icon
	MarsStroke,
	///[martini](https://lucide.dev/icons/martini) icon
	Martini,
	///[maximize](https://lucide.dev/icons/maximize) icon
	Maximize,
	///[maximize-2](https://lucide.dev/icons/maximize-2) icon
	Maximize2,
	///[medal](https://lucide.dev/icons/medal) icon
	Medal,
	///[megaphone](https://lucide.dev/icons/megaphone) icon
	Megaphone,
	///[megaphone-off](https://lucide.dev/icons/megaphone-off) icon
	MegaphoneOff,
	///[meh](https://lucide.dev/icons/meh) icon
	Meh,
	///[memory-stick](https://lucide.dev/icons/memory-stick) icon
	MemoryStick,
	///[menu](https://lucide.dev/icons/menu) icon
	Menu,
	///[merge](https://lucide.dev/icons/merge) icon
	Merge,
	///[message-circle](https://lucide.dev/icons/message-circle) icon
	MessageCircle,
	///[message-circle-check](https://lucide.dev/icons/message-circle-check) icon
	MessageCircleCheck,
	///[message-circle-code](https://lucide.dev/icons/message-circle-code) icon
	MessageCircleCode,
	///[message-circle-dashed](https://lucide.dev/icons/message-circle-dashed) icon
	MessageCircleDashed,
	///[message-circle-heart](https://lucide.dev/icons/message-circle-heart) icon
	MessageCircleHeart,
	///[message-circle-more](https://lucide.dev/icons/message-circle-more) icon
	MessageCircleMore,
	///[message-circle-off](https://lucide.dev/icons/message-circle-off) icon
	MessageCircleOff,
	///[message-circle-plus](https://lucide.dev/icons/message-circle-plus) icon
	MessageCirclePlus,
	///[message-circle-question-mark](https://lucide.dev/icons/message-circle-question-mark) icon
	MessageCircleQuestionMark,
	///[message-circle-reply](https://lucide.dev/icons/message-circle-reply) icon
	MessageCircleReply,
	///[message-circle-warning](https://lucide.dev/icons/message-circle-warning) icon
	MessageCircleWarning,
	///[message-circle-x](https://lucide.dev/icons/message-circle-x) icon
	MessageCircleX,
	///[message-square](https://lucide.dev/icons/message-square) icon
	MessageSquare,
	///[message-square-check](https://lucide.dev/icons/message-square-check) icon
	MessageSquareCheck,
	///[message-square-code](https://lucide.dev/icons/message-square-code) icon
	MessageSquareCode,
	///[message-square-dashed](https://lucide.dev/icons/message-square-dashed) icon
	MessageSquareDashed,
	///[message-square-diff](https://lucide.dev/icons/message-square-diff) icon
	MessageSquareDiff,
	///[message-square-dot](https://lucide.dev/icons/message-square-dot) icon
	MessageSquareDot,
	///[message-square-heart](https://lucide.dev/icons/message-square-heart) icon
	MessageSquareHeart,
	///[message-square-lock](https://lucide.dev/icons/message-square-lock) icon
	MessageSquareLock,
	///[message-square-more](https://lucide.dev/icons/message-square-more) icon
	MessageSquareMore,
	///[message-square-off](https://lucide.dev/icons/message-square-off) icon
	MessageSquareOff,
	///[message-square-plus](https://lucide.dev/icons/message-square-plus) icon
	MessageSquarePlus,
	///[message-square-quote](https://lucide.dev/icons/message-square-quote) icon
	MessageSquareQuote,
	///[message-square-reply](https://lucide.dev/icons/message-square-reply) icon
	MessageSquareReply,
	///[message-square-share](https://lucide.dev/icons/message-square-share) icon
	MessageSquareShare,
	///[message-square-text](https://lucide.dev/icons/message-square-text) icon
	MessageSquareText,
	///[message-square-warning](https://lucide.dev/icons/message-square-warning) icon
	MessageSquareWarning,
	///[message-square-x](https://lucide.dev/icons/message-square-x) icon
	MessageSquareX,
	///[messages-square](https://lucide.dev/icons/messages-square) icon
	MessagesSquare,
	///[metronome](https://lucide.dev/icons/metronome) icon
	Metronome,
	///[mic](https://lucide.dev/icons/mic) icon
	Mic,
	///[mic-off](https://lucide.dev/icons/mic-off) icon
	MicOff,
	///[mic-vocal](https://lucide.dev/icons/mic-vocal) icon
	MicVocal,
	///[microchip](https://lucide.dev/icons/microchip) icon
	Microchip,
	///[microscope](https://lucide.dev/icons/microscope) icon
	Microscope,
	///[microwave](https://lucide.dev/icons/microwave) icon
	Microwave,
	///[milestone](https://lucide.dev/icons/milestone) icon
	Milestone,
	///[milk](https://lucide.dev/icons/milk) icon
	Milk,
	///[milk-off](https://lucide.dev/icons/milk-off) icon
	MilkOff,
	///[minimize](https://lucide.dev/icons/minimize) icon
	Minimize,
	///[minimize-2](https://lucide.dev/icons/minimize-2) icon
	Minimize2,
	///[minus](https://lucide.dev/icons/minus) icon
	Minus,
	///[mirror-rectangular](https://lucide.dev/icons/mirror-rectangular) icon
	MirrorRectangular,
	///[mirror-round](https://lucide.dev/icons/mirror-round) icon
	MirrorRound,
	///[monitor](https://lucide.dev/icons/monitor) icon
	Monitor,
	///[monitor-check](https://lucide.dev/icons/monitor-check) icon
	MonitorCheck,
	///[monitor-cloud](https://lucide.dev/icons/monitor-cloud) icon
	MonitorCloud,
	///[monitor-cog](https://lucide.dev/icons/monitor-cog) icon
	MonitorCog,
	///[monitor-dot](https://lucide.dev/icons/monitor-dot) icon
	MonitorDot,
	///[monitor-down](https://lucide.dev/icons/monitor-down) icon
	MonitorDown,
	///[monitor-off](https://lucide.dev/icons/monitor-off) icon
	MonitorOff,
	///[monitor-pause](https://lucide.dev/icons/monitor-pause) icon
	MonitorPause,
	///[monitor-play](https://lucide.dev/icons/monitor-play) icon
	MonitorPlay,
	///[monitor-smartphone](https://lucide.dev/icons/monitor-smartphone) icon
	MonitorSmartphone,
	///[monitor-speaker](https://lucide.dev/icons/monitor-speaker) icon
	MonitorSpeaker,
	///[monitor-stop](https://lucide.dev/icons/monitor-stop) icon
	MonitorStop,
	///[monitor-up](https://lucide.dev/icons/monitor-up) icon
	MonitorUp,
	///[monitor-x](https://lucide.dev/icons/monitor-x) icon
	MonitorX,
	///[moon](https://lucide.dev/icons/moon) icon
	Moon,
	///[moon-star](https://lucide.dev/icons/moon-star) icon
	MoonStar,
	///[motorbike](https://lucide.dev/icons/motorbike) icon
	Motorbike,
	///[mountain](https://lucide.dev/icons/mountain) icon
	Mountain,
	///[mountain-snow](https://lucide.dev/icons/mountain-snow) icon
	MountainSnow,
	///[mouse](https://lucide.dev/icons/mouse) icon
	Mouse,
	///[mouse-left](https://lucide.dev/icons/mouse-left) icon
	MouseLeft,
	///[mouse-off](https://lucide.dev/icons/mouse-off) icon
	MouseOff,
	///[mouse-pointer](https://lucide.dev/icons/mouse-pointer) icon
	MousePointer,
	///[mouse-pointer-2](https://lucide.dev/icons/mouse-pointer-2) icon
	MousePointer2,
	///[mouse-pointer-2-off](https://lucide.dev/icons/mouse-pointer-2-off) icon
	MousePointer2Off,
	///[mouse-pointer-ban](https://lucide.dev/icons/mouse-pointer-ban) icon
	MousePointerBan,
	///[mouse-pointer-click](https://lucide.dev/icons/mouse-pointer-click) icon
	MousePointerClick,
	///[mouse-right](https://lucide.dev/icons/mouse-right) icon
	MouseRight,
	///[move](https://lucide.dev/icons/move) icon
	Move,
	///[move-3d](https://lucide.dev/icons/move-3d) icon
	Move3d,
	///[move-diagonal](https://lucide.dev/icons/move-diagonal) icon
	MoveDiagonal,
	///[move-diagonal-2](https://lucide.dev/icons/move-diagonal-2) icon
	MoveDiagonal2,
	///[move-down](https://lucide.dev/icons/move-down) icon
	MoveDown,
	///[move-down-left](https://lucide.dev/icons/move-down-left) icon
	MoveDownLeft,
	///[move-down-right](https://lucide.dev/icons/move-down-right) icon
	MoveDownRight,
	///[move-horizontal](https://lucide.dev/icons/move-horizontal) icon
	MoveHorizontal,
	///[move-left](https://lucide.dev/icons/move-left) icon
	MoveLeft,
	///[move-right](https://lucide.dev/icons/move-right) icon
	MoveRight,
	///[move-up](https://lucide.dev/icons/move-up) icon
	MoveUp,
	///[move-up-left](https://lucide.dev/icons/move-up-left) icon
	MoveUpLeft,
	///[move-up-right](https://lucide.dev/icons/move-up-right) icon
	MoveUpRight,
	///[move-vertical](https://lucide.dev/icons/move-vertical) icon
	MoveVertical,
	///[music](https://lucide.dev/icons/music) icon
	Music,
	///[music-2](https://lucide.dev/icons/music-2) icon
	Music2,
	///[music-3](https://lucide.dev/icons/music-3) icon
	Music3,
	///[music-4](https://lucide.dev/icons/music-4) icon
	Music4,
	///[navigation](https://lucide.dev/icons/navigation) icon
	Navigation,
	///[navigation-2](https://lucide.dev/icons/navigation-2) icon
	Navigation2,
	///[navigation-2-off](https://lucide.dev/icons/navigation-2-off) icon
	Navigation2Off,
	///[navigation-off](https://lucide.dev/icons/navigation-off) icon
	NavigationOff,
	///[network](https://lucide.dev/icons/network) icon
	Network,
	///[newspaper](https://lucide.dev/icons/newspaper) icon
	Newspaper,
	///[nfc](https://lucide.dev/icons/nfc) icon
	Nfc,
	///[non-binary](https://lucide.dev/icons/non-binary) icon
	NonBinary,
	///[notebook](https://lucide.dev/icons/notebook) icon
	Notebook,
	///[notebook-pen](https://lucide.dev/icons/notebook-pen) icon
	NotebookPen,
	///[notebook-tabs](https://lucide.dev/icons/notebook-tabs) icon
	NotebookTabs,
	///[notebook-text](https://lucide.dev/icons/notebook-text) icon
	NotebookText,
	///[notepad-text](https://lucide.dev/icons/notepad-text) icon
	NotepadText,
	///[notepad-text-dashed](https://lucide.dev/icons/notepad-text-dashed) icon
	NotepadTextDashed,
	///[nut](https://lucide.dev/icons/nut) icon
	Nut,
	///[nut-off](https://lucide.dev/icons/nut-off) icon
	NutOff,
	///[octagon](https://lucide.dev/icons/octagon) icon
	Octagon,
	///[octagon-alert](https://lucide.dev/icons/octagon-alert) icon
	OctagonAlert,
	///[octagon-minus](https://lucide.dev/icons/octagon-minus) icon
	OctagonMinus,
	///[octagon-pause](https://lucide.dev/icons/octagon-pause) icon
	OctagonPause,
	///[octagon-x](https://lucide.dev/icons/octagon-x) icon
	OctagonX,
	///[omega](https://lucide.dev/icons/omega) icon
	Omega,
	///[option](https://lucide.dev/icons/option) icon
	Option,
	///[orbit](https://lucide.dev/icons/orbit) icon
	Orbit,
	///[origami](https://lucide.dev/icons/origami) icon
	Origami,
	///[package](https://lucide.dev/icons/package) icon
	Package,
	///[package-2](https://lucide.dev/icons/package-2) icon
	Package2,
	///[package-check](https://lucide.dev/icons/package-check) icon
	PackageCheck,
	///[package-minus](https://lucide.dev/icons/package-minus) icon
	PackageMinus,
	///[package-open](https://lucide.dev/icons/package-open) icon
	PackageOpen,
	///[package-plus](https://lucide.dev/icons/package-plus) icon
	PackagePlus,
	///[package-search](https://lucide.dev/icons/package-search) icon
	PackageSearch,
	///[package-x](https://lucide.dev/icons/package-x) icon
	PackageX,
	///[paint-bucket](https://lucide.dev/icons/paint-bucket) icon
	PaintBucket,
	///[paint-roller](https://lucide.dev/icons/paint-roller) icon
	PaintRoller,
	///[paintbrush](https://lucide.dev/icons/paintbrush) icon
	Paintbrush,
	///[paintbrush-vertical](https://lucide.dev/icons/paintbrush-vertical) icon
	PaintbrushVertical,
	///[palette](https://lucide.dev/icons/palette) icon
	Palette,
	///[panda](https://lucide.dev/icons/panda) icon
	Panda,
	///[panel-bottom](https://lucide.dev/icons/panel-bottom) icon
	PanelBottom,
	///[panel-bottom-close](https://lucide.dev/icons/panel-bottom-close) icon
	PanelBottomClose,
	///[panel-bottom-dashed](https://lucide.dev/icons/panel-bottom-dashed) icon
	PanelBottomDashed,
	///[panel-bottom-open](https://lucide.dev/icons/panel-bottom-open) icon
	PanelBottomOpen,
	///[panel-left](https://lucide.dev/icons/panel-left) icon
	PanelLeft,
	///[panel-left-close](https://lucide.dev/icons/panel-left-close) icon
	PanelLeftClose,
	///[panel-left-dashed](https://lucide.dev/icons/panel-left-dashed) icon
	PanelLeftDashed,
	///[panel-left-open](https://lucide.dev/icons/panel-left-open) icon
	PanelLeftOpen,
	///[panel-left-right-dashed](https://lucide.dev/icons/panel-left-right-dashed) icon
	PanelLeftRightDashed,
	///[panel-right](https://lucide.dev/icons/panel-right) icon
	PanelRight,
	///[panel-right-close](https://lucide.dev/icons/panel-right-close) icon
	PanelRightClose,
	///[panel-right-dashed](https://lucide.dev/icons/panel-right-dashed) icon
	PanelRightDashed,
	///[panel-right-open](https://lucide.dev/icons/panel-right-open) icon
	PanelRightOpen,
	///[panel-top](https://lucide.dev/icons/panel-top) icon
	PanelTop,
	///[panel-top-bottom-dashed](https://lucide.dev/icons/panel-top-bottom-dashed) icon
	PanelTopBottomDashed,
	///[panel-top-close](https://lucide.dev/icons/panel-top-close) icon
	PanelTopClose,
	///[panel-top-dashed](https://lucide.dev/icons/panel-top-dashed) icon
	PanelTopDashed,
	///[panel-top-open](https://lucide.dev/icons/panel-top-open) icon
	PanelTopOpen,
	///[panels-left-bottom](https://lucide.dev/icons/panels-left-bottom) icon
	PanelsLeftBottom,
	///[panels-right-bottom](https://lucide.dev/icons/panels-right-bottom) icon
	PanelsRightBottom,
	///[panels-top-left](https://lucide.dev/icons/panels-top-left) icon
	PanelsTopLeft,
	///[paperclip](https://lucide.dev/icons/paperclip) icon
	Paperclip,
	///[parentheses](https://lucide.dev/icons/parentheses) icon
	Parentheses,
	///[parking-meter](https://lucide.dev/icons/parking-meter) icon
	ParkingMeter,
	///[party-popper](https://lucide.dev/icons/party-popper) icon
	PartyPopper,
	///[pause](https://lucide.dev/icons/pause) icon
	Pause,
	///[paw-print](https://lucide.dev/icons/paw-print) icon
	PawPrint,
	///[pc-case](https://lucide.dev/icons/pc-case) icon
	PcCase,
	///[pen](https://lucide.dev/icons/pen) icon
	Pen,
	///[pen-line](https://lucide.dev/icons/pen-line) icon
	PenLine,
	///[pen-off](https://lucide.dev/icons/pen-off) icon
	PenOff,
	///[pen-tool](https://lucide.dev/icons/pen-tool) icon
	PenTool,
	///[pencil](https://lucide.dev/icons/pencil) icon
	Pencil,
	///[pencil-line](https://lucide.dev/icons/pencil-line) icon
	PencilLine,
	///[pencil-off](https://lucide.dev/icons/pencil-off) icon
	PencilOff,
	///[pencil-ruler](https://lucide.dev/icons/pencil-ruler) icon
	PencilRuler,
	///[pentagon](https://lucide.dev/icons/pentagon) icon
	Pentagon,
	///[percent](https://lucide.dev/icons/percent) icon
	Percent,
	///[person-standing](https://lucide.dev/icons/person-standing) icon
	PersonStanding,
	///[philippine-peso](https://lucide.dev/icons/philippine-peso) icon
	PhilippinePeso,
	///[phone](https://lucide.dev/icons/phone) icon
	Phone,
	///[phone-call](https://lucide.dev/icons/phone-call) icon
	PhoneCall,
	///[phone-forwarded](https://lucide.dev/icons/phone-forwarded) icon
	PhoneForwarded,
	///[phone-incoming](https://lucide.dev/icons/phone-incoming) icon
	PhoneIncoming,
	///[phone-missed](https://lucide.dev/icons/phone-missed) icon
	PhoneMissed,
	///[phone-off](https://lucide.dev/icons/phone-off) icon
	PhoneOff,
	///[phone-outgoing](https://lucide.dev/icons/phone-outgoing) icon
	PhoneOutgoing,
	///[pi](https://lucide.dev/icons/pi) icon
	Pi,
	///[piano](https://lucide.dev/icons/piano) icon
	Piano,
	///[pickaxe](https://lucide.dev/icons/pickaxe) icon
	Pickaxe,
	///[picture-in-picture](https://lucide.dev/icons/picture-in-picture) icon
	PictureInPicture,
	///[picture-in-picture-2](https://lucide.dev/icons/picture-in-picture-2) icon
	PictureInPicture2,
	///[piggy-bank](https://lucide.dev/icons/piggy-bank) icon
	PiggyBank,
	///[pilcrow](https://lucide.dev/icons/pilcrow) icon
	Pilcrow,
	///[pilcrow-left](https://lucide.dev/icons/pilcrow-left) icon
	PilcrowLeft,
	///[pilcrow-right](https://lucide.dev/icons/pilcrow-right) icon
	PilcrowRight,
	///[pill](https://lucide.dev/icons/pill) icon
	Pill,
	///[pill-bottle](https://lucide.dev/icons/pill-bottle) icon
	PillBottle,
	///[pin](https://lucide.dev/icons/pin) icon
	Pin,
	///[pin-off](https://lucide.dev/icons/pin-off) icon
	PinOff,
	///[pipette](https://lucide.dev/icons/pipette) icon
	Pipette,
	///[pizza](https://lucide.dev/icons/pizza) icon
	Pizza,
	///[plane](https://lucide.dev/icons/plane) icon
	Plane,
	///[plane-landing](https://lucide.dev/icons/plane-landing) icon
	PlaneLanding,
	///[plane-takeoff](https://lucide.dev/icons/plane-takeoff) icon
	PlaneTakeoff,
	///[play](https://lucide.dev/icons/play) icon
	Play,
	///[plug](https://lucide.dev/icons/plug) icon
	Plug,
	///[plug-2](https://lucide.dev/icons/plug-2) icon
	Plug2,
	///[plug-zap](https://lucide.dev/icons/plug-zap) icon
	PlugZap,
	///[plus](https://lucide.dev/icons/plus) icon
	Plus,
	///[pocket](https://lucide.dev/icons/pocket) icon
	Pocket,
	///[pocket-knife](https://lucide.dev/icons/pocket-knife) icon
	PocketKnife,
	///[podcast](https://lucide.dev/icons/podcast) icon
	Podcast,
	///[pointer](https://lucide.dev/icons/pointer) icon
	Pointer,
	///[pointer-off](https://lucide.dev/icons/pointer-off) icon
	PointerOff,
	///[popcorn](https://lucide.dev/icons/popcorn) icon
	Popcorn,
	///[popsicle](https://lucide.dev/icons/popsicle) icon
	Popsicle,
	///[pound-sterling](https://lucide.dev/icons/pound-sterling) icon
	PoundSterling,
	///[power](https://lucide.dev/icons/power) icon
	Power,
	///[power-off](https://lucide.dev/icons/power-off) icon
	PowerOff,
	///[presentation](https://lucide.dev/icons/presentation) icon
	Presentation,
	///[printer](https://lucide.dev/icons/printer) icon
	Printer,
	///[printer-check](https://lucide.dev/icons/printer-check) icon
	PrinterCheck,
	///[printer-x](https://lucide.dev/icons/printer-x) icon
	PrinterX,
	///[projector](https://lucide.dev/icons/projector) icon
	Projector,
	///[proportions](https://lucide.dev/icons/proportions) icon
	Proportions,
	///[puzzle](https://lucide.dev/icons/puzzle) icon
	Puzzle,
	///[pyramid](https://lucide.dev/icons/pyramid) icon
	Pyramid,
	///[qr-code](https://lucide.dev/icons/qr-code) icon
	QrCode,
	///[quote](https://lucide.dev/icons/quote) icon
	Quote,
	///[rabbit](https://lucide.dev/icons/rabbit) icon
	Rabbit,
	///[radar](https://lucide.dev/icons/radar) icon
	Radar,
	///[radiation](https://lucide.dev/icons/radiation) icon
	Radiation,
	///[radical](https://lucide.dev/icons/radical) icon
	Radical,
	///[radio](https://lucide.dev/icons/radio) icon
	Radio,
	///[radio-receiver](https://lucide.dev/icons/radio-receiver) icon
	RadioReceiver,
	///[radio-tower](https://lucide.dev/icons/radio-tower) icon
	RadioTower,
	///[radius](https://lucide.dev/icons/radius) icon
	Radius,
	///[rail-symbol](https://lucide.dev/icons/rail-symbol) icon
	RailSymbol,
	///[rainbow](https://lucide.dev/icons/rainbow) icon
	Rainbow,
	///[rat](https://lucide.dev/icons/rat) icon
	Rat,
	///[ratio](https://lucide.dev/icons/ratio) icon
	Ratio,
	///[receipt](https://lucide.dev/icons/receipt) icon
	Receipt,
	///[receipt-cent](https://lucide.dev/icons/receipt-cent) icon
	ReceiptCent,
	///[receipt-euro](https://lucide.dev/icons/receipt-euro) icon
	ReceiptEuro,
	///[receipt-indian-rupee](https://lucide.dev/icons/receipt-indian-rupee) icon
	ReceiptIndianRupee,
	///[receipt-japanese-yen](https://lucide.dev/icons/receipt-japanese-yen) icon
	ReceiptJapaneseYen,
	///[receipt-pound-sterling](https://lucide.dev/icons/receipt-pound-sterling) icon
	ReceiptPoundSterling,
	///[receipt-russian-ruble](https://lucide.dev/icons/receipt-russian-ruble) icon
	ReceiptRussianRuble,
	///[receipt-swiss-franc](https://lucide.dev/icons/receipt-swiss-franc) icon
	ReceiptSwissFranc,
	///[receipt-text](https://lucide.dev/icons/receipt-text) icon
	ReceiptText,
	///[receipt-turkish-lira](https://lucide.dev/icons/receipt-turkish-lira) icon
	ReceiptTurkishLira,
	///[rectangle-circle](https://lucide.dev/icons/rectangle-circle) icon
	RectangleCircle,
	///[rectangle-ellipsis](https://lucide.dev/icons/rectangle-ellipsis) icon
	RectangleEllipsis,
	///[rectangle-goggles](https://lucide.dev/icons/rectangle-goggles) icon
	RectangleGoggles,
	///[rectangle-horizontal](https://lucide.dev/icons/rectangle-horizontal) icon
	RectangleHorizontal,
	///[rectangle-vertical](https://lucide.dev/icons/rectangle-vertical) icon
	RectangleVertical,
	///[recycle](https://lucide.dev/icons/recycle) icon
	Recycle,
	///[redo](https://lucide.dev/icons/redo) icon
	Redo,
	///[redo-2](https://lucide.dev/icons/redo-2) icon
	Redo2,
	///[redo-dot](https://lucide.dev/icons/redo-dot) icon
	RedoDot,
	///[refresh-ccw](https://lucide.dev/icons/refresh-ccw) icon
	RefreshCcw,
	///[refresh-ccw-dot](https://lucide.dev/icons/refresh-ccw-dot) icon
	RefreshCcwDot,
	///[refresh-cw](https://lucide.dev/icons/refresh-cw) icon
	RefreshCw,
	///[refresh-cw-off](https://lucide.dev/icons/refresh-cw-off) icon
	RefreshCwOff,
	///[refrigerator](https://lucide.dev/icons/refrigerator) icon
	Refrigerator,
	///[regex](https://lucide.dev/icons/regex) icon
	Regex,
	///[remove-formatting](https://lucide.dev/icons/remove-formatting) icon
	RemoveFormatting,
	///[repeat](https://lucide.dev/icons/repeat) icon
	Repeat,
	///[repeat-1](https://lucide.dev/icons/repeat-1) icon
	Repeat1,
	///[repeat-2](https://lucide.dev/icons/repeat-2) icon
	Repeat2,
	///[replace](https://lucide.dev/icons/replace) icon
	Replace,
	///[replace-all](https://lucide.dev/icons/replace-all) icon
	ReplaceAll,
	///[reply](https://lucide.dev/icons/reply) icon
	Reply,
	///[reply-all](https://lucide.dev/icons/reply-all) icon
	ReplyAll,
	///[rewind](https://lucide.dev/icons/rewind) icon
	Rewind,
	///[ribbon](https://lucide.dev/icons/ribbon) icon
	Ribbon,
	///[rocket](https://lucide.dev/icons/rocket) icon
	Rocket,
	///[rocking-chair](https://lucide.dev/icons/rocking-chair) icon
	RockingChair,
	///[roller-coaster](https://lucide.dev/icons/roller-coaster) icon
	RollerCoaster,
	///[rose](https://lucide.dev/icons/rose) icon
	Rose,
	///[rotate-3d](https://lucide.dev/icons/rotate-3d) icon
	Rotate3d,
	///[rotate-ccw](https://lucide.dev/icons/rotate-ccw) icon
	RotateCcw,
	///[rotate-ccw-key](https://lucide.dev/icons/rotate-ccw-key) icon
	RotateCcwKey,
	///[rotate-ccw-square](https://lucide.dev/icons/rotate-ccw-square) icon
	RotateCcwSquare,
	///[rotate-cw](https://lucide.dev/icons/rotate-cw) icon
	RotateCw,
	///[rotate-cw-square](https://lucide.dev/icons/rotate-cw-square) icon
	RotateCwSquare,
	///[route](https://lucide.dev/icons/route) icon
	Route,
	///[route-off](https://lucide.dev/icons/route-off) icon
	RouteOff,
	///[router](https://lucide.dev/icons/router) icon
	Router,
	///[rows-2](https://lucide.dev/icons/rows-2) icon
	Rows2,
	///[rows-3](https://lucide.dev/icons/rows-3) icon
	Rows3,
	///[rows-4](https://lucide.dev/icons/rows-4) icon
	Rows4,
	///[rss](https://lucide.dev/icons/rss) icon
	Rss,
	///[ruler](https://lucide.dev/icons/ruler) icon
	Ruler,
	///[ruler-dimension-line](https://lucide.dev/icons/ruler-dimension-line) icon
	RulerDimensionLine,
	///[russian-ruble](https://lucide.dev/icons/russian-ruble) icon
	RussianRuble,
	///[sailboat](https://lucide.dev/icons/sailboat) icon
	Sailboat,
	///[salad](https://lucide.dev/icons/salad) icon
	Salad,
	///[sandwich](https://lucide.dev/icons/sandwich) icon
	Sandwich,
	///[satellite](https://lucide.dev/icons/satellite) icon
	Satellite,
	///[satellite-dish](https://lucide.dev/icons/satellite-dish) icon
	SatelliteDish,
	///[saudi-riyal](https://lucide.dev/icons/saudi-riyal) icon
	SaudiRiyal,
	///[save](https://lucide.dev/icons/save) icon
	Save,
	///[save-all](https://lucide.dev/icons/save-all) icon
	SaveAll,
	///[save-off](https://lucide.dev/icons/save-off) icon
	SaveOff,
	///[scale](https://lucide.dev/icons/scale) icon
	Scale,
	///[scale-3d](https://lucide.dev/icons/scale-3d) icon
	Scale3d,
	///[scaling](https://lucide.dev/icons/scaling) icon
	Scaling,
	///[scan](https://lucide.dev/icons/scan) icon
	Scan,
	///[scan-barcode](https://lucide.dev/icons/scan-barcode) icon
	ScanBarcode,
	///[scan-eye](https://lucide.dev/icons/scan-eye) icon
	ScanEye,
	///[scan-face](https://lucide.dev/icons/scan-face) icon
	ScanFace,
	///[scan-heart](https://lucide.dev/icons/scan-heart) icon
	ScanHeart,
	///[scan-line](https://lucide.dev/icons/scan-line) icon
	ScanLine,
	///[scan-qr-code](https://lucide.dev/icons/scan-qr-code) icon
	ScanQrCode,
	///[scan-search](https://lucide.dev/icons/scan-search) icon
	ScanSearch,
	///[scan-text](https://lucide.dev/icons/scan-text) icon
	ScanText,
	///[school](https://lucide.dev/icons/school) icon
	School,
	///[scissors](https://lucide.dev/icons/scissors) icon
	Scissors,
	///[scissors-line-dashed](https://lucide.dev/icons/scissors-line-dashed) icon
	ScissorsLineDashed,
	///[scooter](https://lucide.dev/icons/scooter) icon
	Scooter,
	///[screen-share](https://lucide.dev/icons/screen-share) icon
	ScreenShare,
	///[screen-share-off](https://lucide.dev/icons/screen-share-off) icon
	ScreenShareOff,
	///[scroll](https://lucide.dev/icons/scroll) icon
	Scroll,
	///[scroll-text](https://lucide.dev/icons/scroll-text) icon
	ScrollText,
	///[search](https://lucide.dev/icons/search) icon
	Search,
	///[search-alert](https://lucide.dev/icons/search-alert) icon
	SearchAlert,
	///[search-check](https://lucide.dev/icons/search-check) icon
	SearchCheck,
	///[search-code](https://lucide.dev/icons/search-code) icon
	SearchCode,
	///[search-slash](https://lucide.dev/icons/search-slash) icon
	SearchSlash,
	///[search-x](https://lucide.dev/icons/search-x) icon
	SearchX,
	///[section](https://lucide.dev/icons/section) icon
	Section,
	///[send](https://lucide.dev/icons/send) icon
	Send,
	///[send-horizontal](https://lucide.dev/icons/send-horizontal) icon
	SendHorizontal,
	///[send-to-back](https://lucide.dev/icons/send-to-back) icon
	SendToBack,
	///[separator-horizontal](https://lucide.dev/icons/separator-horizontal) icon
	SeparatorHorizontal,
	///[separator-vertical](https://lucide.dev/icons/separator-vertical) icon
	SeparatorVertical,
	///[server](https://lucide.dev/icons/server) icon
	Server,
	///[server-cog](https://lucide.dev/icons/server-cog) icon
	ServerCog,
	///[server-crash](https://lucide.dev/icons/server-crash) icon
	ServerCrash,
	///[server-off](https://lucide.dev/icons/server-off) icon
	ServerOff,
	///[settings](https://lucide.dev/icons/settings) icon
	Settings,
	///[settings-2](https://lucide.dev/icons/settings-2) icon
	Settings2,
	///[shapes](https://lucide.dev/icons/shapes) icon
	Shapes,
	///[share](https://lucide.dev/icons/share) icon
	Share,
	///[share-2](https://lucide.dev/icons/share-2) icon
	Share2,
	///[sheet](https://lucide.dev/icons/sheet) icon
	Sheet,
	///[shell](https://lucide.dev/icons/shell) icon
	Shell,
	///[shelving-unit](https://lucide.dev/icons/shelving-unit) icon
	ShelvingUnit,
	///[shield](https://lucide.dev/icons/shield) icon
	Shield,
	///[shield-alert](https://lucide.dev/icons/shield-alert) icon
	ShieldAlert,
	///[shield-ban](https://lucide.dev/icons/shield-ban) icon
	ShieldBan,
	///[shield-check](https://lucide.dev/icons/shield-check) icon
	ShieldCheck,
	///[shield-ellipsis](https://lucide.dev/icons/shield-ellipsis) icon
	ShieldEllipsis,
	///[shield-half](https://lucide.dev/icons/shield-half) icon
	ShieldHalf,
	///[shield-minus](https://lucide.dev/icons/shield-minus) icon
	ShieldMinus,
	///[shield-off](https://lucide.dev/icons/shield-off) icon
	ShieldOff,
	///[shield-plus](https://lucide.dev/icons/shield-plus) icon
	ShieldPlus,
	///[shield-question-mark](https://lucide.dev/icons/shield-question-mark) icon
	ShieldQuestionMark,
	///[shield-user](https://lucide.dev/icons/shield-user) icon
	ShieldUser,
	///[shield-x](https://lucide.dev/icons/shield-x) icon
	ShieldX,
	///[ship](https://lucide.dev/icons/ship) icon
	Ship,
	///[ship-wheel](https://lucide.dev/icons/ship-wheel) icon
	ShipWheel,
	///[shirt](https://lucide.dev/icons/shirt) icon
	Shirt,
	///[shopping-bag](https://lucide.dev/icons/shopping-bag) icon
	ShoppingBag,
	///[shopping-basket](https://lucide.dev/icons/shopping-basket) icon
	ShoppingBasket,
	///[shopping-cart](https://lucide.dev/icons/shopping-cart) icon
	ShoppingCart,
	///[shovel](https://lucide.dev/icons/shovel) icon
	Shovel,
	///[shower-head](https://lucide.dev/icons/shower-head) icon
	ShowerHead,
	///[shredder](https://lucide.dev/icons/shredder) icon
	Shredder,
	///[shrimp](https://lucide.dev/icons/shrimp) icon
	Shrimp,
	///[shrink](https://lucide.dev/icons/shrink) icon
	Shrink,
	///[shrub](https://lucide.dev/icons/shrub) icon
	Shrub,
	///[shuffle](https://lucide.dev/icons/shuffle) icon
	Shuffle,
	///[sigma](https://lucide.dev/icons/sigma) icon
	Sigma,
	///[signal](https://lucide.dev/icons/signal) icon
	Signal,
	///[signal-high](https://lucide.dev/icons/signal-high) icon
	SignalHigh,
	///[signal-low](https://lucide.dev/icons/signal-low) icon
	SignalLow,
	///[signal-medium](https://lucide.dev/icons/signal-medium) icon
	SignalMedium,
	///[signal-zero](https://lucide.dev/icons/signal-zero) icon
	SignalZero,
	///[signature](https://lucide.dev/icons/signature) icon
	Signature,
	///[signpost](https://lucide.dev/icons/signpost) icon
	Signpost,
	///[signpost-big](https://lucide.dev/icons/signpost-big) icon
	SignpostBig,
	///[siren](https://lucide.dev/icons/siren) icon
	Siren,
	///[skip-back](https://lucide.dev/icons/skip-back) icon
	SkipBack,
	///[skip-forward](https://lucide.dev/icons/skip-forward) icon
	SkipForward,
	///[skull](https://lucide.dev/icons/skull) icon
	Skull,
	///[slack](https://lucide.dev/icons/slack) icon
	Slack,
	///[slash](https://lucide.dev/icons/slash) icon
	Slash,
	///[slice](https://lucide.dev/icons/slice) icon
	Slice,
	///[sliders-horizontal](https://lucide.dev/icons/sliders-horizontal) icon
	SlidersHorizontal,
	///[sliders-vertical](https://lucide.dev/icons/sliders-vertical) icon
	SlidersVertical,
	///[smartphone](https://lucide.dev/icons/smartphone) icon
	Smartphone,
	///[smartphone-charging](https://lucide.dev/icons/smartphone-charging) icon
	SmartphoneCharging,
	///[smartphone-nfc](https://lucide.dev/icons/smartphone-nfc) icon
	SmartphoneNfc,
	///[smile](https://lucide.dev/icons/smile) icon
	Smile,
	///[smile-plus](https://lucide.dev/icons/smile-plus) icon
	SmilePlus,
	///[snail](https://lucide.dev/icons/snail) icon
	Snail,
	///[snowflake](https://lucide.dev/icons/snowflake) icon
	Snowflake,
	///[soap-dispenser-droplet](https://lucide.dev/icons/soap-dispenser-droplet) icon
	SoapDispenserDroplet,
	///[sofa](https://lucide.dev/icons/sofa) icon
	Sofa,
	///[solar-panel](https://lucide.dev/icons/solar-panel) icon
	SolarPanel,
	///[soup](https://lucide.dev/icons/soup) icon
	Soup,
	///[space](https://lucide.dev/icons/space) icon
	Space,
	///[spade](https://lucide.dev/icons/spade) icon
	Spade,
	///[sparkle](https://lucide.dev/icons/sparkle) icon
	Sparkle,
	///[sparkles](https://lucide.dev/icons/sparkles) icon
	Sparkles,
	///[speaker](https://lucide.dev/icons/speaker) icon
	Speaker,
	///[speech](https://lucide.dev/icons/speech) icon
	Speech,
	///[spell-check](https://lucide.dev/icons/spell-check) icon
	SpellCheck,
	///[spell-check-2](https://lucide.dev/icons/spell-check-2) icon
	SpellCheck2,
	///[spline](https://lucide.dev/icons/spline) icon
	Spline,
	///[spline-pointer](https://lucide.dev/icons/spline-pointer) icon
	SplinePointer,
	///[split](https://lucide.dev/icons/split) icon
	Split,
	///[spool](https://lucide.dev/icons/spool) icon
	Spool,
	///[spotlight](https://lucide.dev/icons/spotlight) icon
	Spotlight,
	///[spray-can](https://lucide.dev/icons/spray-can) icon
	SprayCan,
	///[sprout](https://lucide.dev/icons/sprout) icon
	Sprout,
	///[square](https://lucide.dev/icons/square) icon
	Square,
	///[square-activity](https://lucide.dev/icons/square-activity) icon
	SquareActivity,
	///[square-arrow-down](https://lucide.dev/icons/square-arrow-down) icon
	SquareArrowDown,
	///[square-arrow-down-left](https://lucide.dev/icons/square-arrow-down-left) icon
	SquareArrowDownLeft,
	///[square-arrow-down-right](https://lucide.dev/icons/square-arrow-down-right) icon
	SquareArrowDownRight,
	///[square-arrow-left](https://lucide.dev/icons/square-arrow-left) icon
	SquareArrowLeft,
	///[square-arrow-out-down-left](https://lucide.dev/icons/square-arrow-out-down-left) icon
	SquareArrowOutDownLeft,
	///[square-arrow-out-down-right](https://lucide.dev/icons/square-arrow-out-down-right) icon
	SquareArrowOutDownRight,
	///[square-arrow-out-up-left](https://lucide.dev/icons/square-arrow-out-up-left) icon
	SquareArrowOutUpLeft,
	///[square-arrow-out-up-right](https://lucide.dev/icons/square-arrow-out-up-right) icon
	SquareArrowOutUpRight,
	///[square-arrow-right](https://lucide.dev/icons/square-arrow-right) icon
	SquareArrowRight,
	///[square-arrow-right-enter](https://lucide.dev/icons/square-arrow-right-enter) icon
	SquareArrowRightEnter,
	///[square-arrow-right-exit](https://lucide.dev/icons/square-arrow-right-exit) icon
	SquareArrowRightExit,
	///[square-arrow-up](https://lucide.dev/icons/square-arrow-up) icon
	SquareArrowUp,
	///[square-arrow-up-left](https://lucide.dev/icons/square-arrow-up-left) icon
	SquareArrowUpLeft,
	///[square-arrow-up-right](https://lucide.dev/icons/square-arrow-up-right) icon
	SquareArrowUpRight,
	///[square-asterisk](https://lucide.dev/icons/square-asterisk) icon
	SquareAsterisk,
	///[square-bottom-dashed-scissors](https://lucide.dev/icons/square-bottom-dashed-scissors) icon
	SquareBottomDashedScissors,
	///[square-centerline-dashed-horizontal](https://lucide.dev/icons/square-centerline-dashed-horizontal) icon
	SquareCenterlineDashedHorizontal,
	///[square-centerline-dashed-vertical](https://lucide.dev/icons/square-centerline-dashed-vertical) icon
	SquareCenterlineDashedVertical,
	///[square-chart-gantt](https://lucide.dev/icons/square-chart-gantt) icon
	SquareChartGantt,
	///[square-check](https://lucide.dev/icons/square-check) icon
	SquareCheck,
	///[square-check-big](https://lucide.dev/icons/square-check-big) icon
	SquareCheckBig,
	///[square-chevron-down](https://lucide.dev/icons/square-chevron-down) icon
	SquareChevronDown,
	///[square-chevron-left](https://lucide.dev/icons/square-chevron-left) icon
	SquareChevronLeft,
	///[square-chevron-right](https://lucide.dev/icons/square-chevron-right) icon
	SquareChevronRight,
	///[square-chevron-up](https://lucide.dev/icons/square-chevron-up) icon
	SquareChevronUp,
	///[square-code](https://lucide.dev/icons/square-code) icon
	SquareCode,
	///[square-dashed](https://lucide.dev/icons/square-dashed) icon
	SquareDashed,
	///[square-dashed-bottom](https://lucide.dev/icons/square-dashed-bottom) icon
	SquareDashedBottom,
	///[square-dashed-bottom-code](https://lucide.dev/icons/square-dashed-bottom-code) icon
	SquareDashedBottomCode,
	///[square-dashed-kanban](https://lucide.dev/icons/square-dashed-kanban) icon
	SquareDashedKanban,
	///[square-dashed-mouse-pointer](https://lucide.dev/icons/square-dashed-mouse-pointer) icon
	SquareDashedMousePointer,
	///[square-dashed-top-solid](https://lucide.dev/icons/square-dashed-top-solid) icon
	SquareDashedTopSolid,
	///[square-divide](https://lucide.dev/icons/square-divide) icon
	SquareDivide,
	///[square-dot](https://lucide.dev/icons/square-dot) icon
	SquareDot,
	///[square-equal](https://lucide.dev/icons/square-equal) icon
	SquareEqual,
	///[square-function](https://lucide.dev/icons/square-function) icon
	SquareFunction,
	///[square-kanban](https://lucide.dev/icons/square-kanban) icon
	SquareKanban,
	///[square-library](https://lucide.dev/icons/square-library) icon
	SquareLibrary,
	///[square-m](https://lucide.dev/icons/square-m) icon
	SquareM,
	///[square-menu](https://lucide.dev/icons/square-menu) icon
	SquareMenu,
	///[square-minus](https://lucide.dev/icons/square-minus) icon
	SquareMinus,
	///[square-mouse-pointer](https://lucide.dev/icons/square-mouse-pointer) icon
	SquareMousePointer,
	///[square-parking](https://lucide.dev/icons/square-parking) icon
	SquareParking,
	///[square-parking-off](https://lucide.dev/icons/square-parking-off) icon
	SquareParkingOff,
	///[square-pause](https://lucide.dev/icons/square-pause) icon
	SquarePause,
	///[square-pen](https://lucide.dev/icons/square-pen) icon
	SquarePen,
	///[square-percent](https://lucide.dev/icons/square-percent) icon
	SquarePercent,
	///[square-pi](https://lucide.dev/icons/square-pi) icon
	SquarePi,
	///[square-pilcrow](https://lucide.dev/icons/square-pilcrow) icon
	SquarePilcrow,
	///[square-play](https://lucide.dev/icons/square-play) icon
	SquarePlay,
	///[square-plus](https://lucide.dev/icons/square-plus) icon
	SquarePlus,
	///[square-power](https://lucide.dev/icons/square-power) icon
	SquarePower,
	///[square-radical](https://lucide.dev/icons/square-radical) icon
	SquareRadical,
	///[square-round-corner](https://lucide.dev/icons/square-round-corner) icon
	SquareRoundCorner,
	///[square-scissors](https://lucide.dev/icons/square-scissors) icon
	SquareScissors,
	///[square-sigma](https://lucide.dev/icons/square-sigma) icon
	SquareSigma,
	///[square-slash](https://lucide.dev/icons/square-slash) icon
	SquareSlash,
	///[square-split-horizontal](https://lucide.dev/icons/square-split-horizontal) icon
	SquareSplitHorizontal,
	///[square-split-vertical](https://lucide.dev/icons/square-split-vertical) icon
	SquareSplitVertical,
	///[square-square](https://lucide.dev/icons/square-square) icon
	SquareSquare,
	///[square-stack](https://lucide.dev/icons/square-stack) icon
	SquareStack,
	///[square-star](https://lucide.dev/icons/square-star) icon
	SquareStar,
	///[square-stop](https://lucide.dev/icons/square-stop) icon
	SquareStop,
	///[square-terminal](https://lucide.dev/icons/square-terminal) icon
	SquareTerminal,
	///[square-user](https://lucide.dev/icons/square-user) icon
	SquareUser,
	///[square-user-round](https://lucide.dev/icons/square-user-round) icon
	SquareUserRound,
	///[square-x](https://lucide.dev/icons/square-x) icon
	SquareX,
	///[squares-exclude](https://lucide.dev/icons/squares-exclude) icon
	SquaresExclude,
	///[squares-intersect](https://lucide.dev/icons/squares-intersect) icon
	SquaresIntersect,
	///[squares-subtract](https://lucide.dev/icons/squares-subtract) icon
	SquaresSubtract,
	///[squares-unite](https://lucide.dev/icons/squares-unite) icon
	SquaresUnite,
	///[squircle](https://lucide.dev/icons/squircle) icon
	Squircle,
	///[squircle-dashed](https://lucide.dev/icons/squircle-dashed) icon
	SquircleDashed,
	///[squirrel](https://lucide.dev/icons/squirrel) icon
	Squirrel,
	///[stamp](https://lucide.dev/icons/stamp) icon
	Stamp,
	///[star](https://lucide.dev/icons/star) icon
	Star,
	///[star-half](https://lucide.dev/icons/star-half) icon
	StarHalf,
	///[star-off](https://lucide.dev/icons/star-off) icon
	StarOff,
	///[step-back](https://lucide.dev/icons/step-back) icon
	StepBack,
	///[step-forward](https://lucide.dev/icons/step-forward) icon
	StepForward,
	///[stethoscope](https://lucide.dev/icons/stethoscope) icon
	Stethoscope,
	///[sticker](https://lucide.dev/icons/sticker) icon
	Sticker,
	///[sticky-note](https://lucide.dev/icons/sticky-note) icon
	StickyNote,
	///[stone](https://lucide.dev/icons/stone) icon
	Stone,
	///[store](https://lucide.dev/icons/store) icon
	Store,
	///[stretch-horizontal](https://lucide.dev/icons/stretch-horizontal) icon
	StretchHorizontal,
	///[stretch-vertical](https://lucide.dev/icons/stretch-vertical) icon
	StretchVertical,
	///[strikethrough](https://lucide.dev/icons/strikethrough) icon
	Strikethrough,
	///[subscript](https://lucide.dev/icons/subscript) icon
	Subscript,
	///[sun](https://lucide.dev/icons/sun) icon
	Sun,
	///[sun-dim](https://lucide.dev/icons/sun-dim) icon
	SunDim,
	///[sun-medium](https://lucide.dev/icons/sun-medium) icon
	SunMedium,
	///[sun-moon](https://lucide.dev/icons/sun-moon) icon
	SunMoon,
	///[sun-snow](https://lucide.dev/icons/sun-snow) icon
	SunSnow,
	///[sunrise](https://lucide.dev/icons/sunrise) icon
	Sunrise,
	///[sunset](https://lucide.dev/icons/sunset) icon
	Sunset,
	///[superscript](https://lucide.dev/icons/superscript) icon
	Superscript,
	///[swatch-book](https://lucide.dev/icons/swatch-book) icon
	SwatchBook,
	///[swiss-franc](https://lucide.dev/icons/swiss-franc) icon
	SwissFranc,
	///[switch-camera](https://lucide.dev/icons/switch-camera) icon
	SwitchCamera,
	///[sword](https://lucide.dev/icons/sword) icon
	Sword,
	///[swords](https://lucide.dev/icons/swords) icon
	Swords,
	///[syringe](https://lucide.dev/icons/syringe) icon
	Syringe,
	///[table](https://lucide.dev/icons/table) icon
	Table,
	///[table-2](https://lucide.dev/icons/table-2) icon
	Table2,
	///[table-cells-merge](https://lucide.dev/icons/table-cells-merge) icon
	TableCellsMerge,
	///[table-cells-split](https://lucide.dev/icons/table-cells-split) icon
	TableCellsSplit,
	///[table-columns-split](https://lucide.dev/icons/table-columns-split) icon
	TableColumnsSplit,
	///[table-of-contents](https://lucide.dev/icons/table-of-contents) icon
	TableOfContents,
	///[table-properties](https://lucide.dev/icons/table-properties) icon
	TableProperties,
	///[table-rows-split](https://lucide.dev/icons/table-rows-split) icon
	TableRowsSplit,
	///[tablet](https://lucide.dev/icons/tablet) icon
	Tablet,
	///[tablet-smartphone](https://lucide.dev/icons/tablet-smartphone) icon
	TabletSmartphone,
	///[tablets](https://lucide.dev/icons/tablets) icon
	Tablets,
	///[tag](https://lucide.dev/icons/tag) icon
	Tag,
	///[tags](https://lucide.dev/icons/tags) icon
	Tags,
	///[tally-1](https://lucide.dev/icons/tally-1) icon
	Tally1,
	///[tally-2](https://lucide.dev/icons/tally-2) icon
	Tally2,
	///[tally-3](https://lucide.dev/icons/tally-3) icon
	Tally3,
	///[tally-4](https://lucide.dev/icons/tally-4) icon
	Tally4,
	///[tally-5](https://lucide.dev/icons/tally-5) icon
	Tally5,
	///[tangent](https://lucide.dev/icons/tangent) icon
	Tangent,
	///[target](https://lucide.dev/icons/target) icon
	Target,
	///[telescope](https://lucide.dev/icons/telescope) icon
	Telescope,
	///[tent](https://lucide.dev/icons/tent) icon
	Tent,
	///[tent-tree](https://lucide.dev/icons/tent-tree) icon
	TentTree,
	///[terminal](https://lucide.dev/icons/terminal) icon
	Terminal,
	///[test-tube](https://lucide.dev/icons/test-tube) icon
	TestTube,
	///[test-tube-diagonal](https://lucide.dev/icons/test-tube-diagonal) icon
	TestTubeDiagonal,
	///[test-tubes](https://lucide.dev/icons/test-tubes) icon
	TestTubes,
	///[text-align-center](https://lucide.dev/icons/text-align-center) icon
	TextAlignCenter,
	///[text-align-end](https://lucide.dev/icons/text-align-end) icon
	TextAlignEnd,
	///[text-align-justify](https://lucide.dev/icons/text-align-justify) icon
	TextAlignJustify,
	///[text-align-start](https://lucide.dev/icons/text-align-start) icon
	TextAlignStart,
	///[text-cursor](https://lucide.dev/icons/text-cursor) icon
	TextCursor,
	///[text-cursor-input](https://lucide.dev/icons/text-cursor-input) icon
	TextCursorInput,
	///[text-initial](https://lucide.dev/icons/text-initial) icon
	TextInitial,
	///[text-quote](https://lucide.dev/icons/text-quote) icon
	TextQuote,
	///[text-search](https://lucide.dev/icons/text-search) icon
	TextSearch,
	///[text-select](https://lucide.dev/icons/text-select) icon
	TextSelect,
	///[text-wrap](https://lucide.dev/icons/text-wrap) icon
	TextWrap,
	///[theater](https://lucide.dev/icons/theater) icon
	Theater,
	///[thermometer](https://lucide.dev/icons/thermometer) icon
	Thermometer,
	///[thermometer-snowflake](https://lucide.dev/icons/thermometer-snowflake) icon
	ThermometerSnowflake,
	///[thermometer-sun](https://lucide.dev/icons/thermometer-sun) icon
	ThermometerSun,
	///[thumbs-down](https://lucide.dev/icons/thumbs-down) icon
	ThumbsDown,
	///[thumbs-up](https://lucide.dev/icons/thumbs-up) icon
	ThumbsUp,
	///[ticket](https://lucide.dev/icons/ticket) icon
	Ticket,
	///[ticket-check](https://lucide.dev/icons/ticket-check) icon
	TicketCheck,
	///[ticket-minus](https://lucide.dev/icons/ticket-minus) icon
	TicketMinus,
	///[ticket-percent](https://lucide.dev/icons/ticket-percent) icon
	TicketPercent,
	///[ticket-plus](https://lucide.dev/icons/ticket-plus) icon
	TicketPlus,
	///[ticket-slash](https://lucide.dev/icons/ticket-slash) icon
	TicketSlash,
	///[ticket-x](https://lucide.dev/icons/ticket-x) icon
	TicketX,
	///[tickets](https://lucide.dev/icons/tickets) icon
	Tickets,
	///[tickets-plane](https://lucide.dev/icons/tickets-plane) icon
	TicketsPlane,
	///[timer](https://lucide.dev/icons/timer) icon
	Timer,
	///[timer-off](https://lucide.dev/icons/timer-off) icon
	TimerOff,
	///[timer-reset](https://lucide.dev/icons/timer-reset) icon
	TimerReset,
	///[toggle-left](https://lucide.dev/icons/toggle-left) icon
	ToggleLeft,
	///[toggle-right](https://lucide.dev/icons/toggle-right) icon
	ToggleRight,
	///[toilet](https://lucide.dev/icons/toilet) icon
	Toilet,
	///[tool-case](https://lucide.dev/icons/tool-case) icon
	ToolCase,
	///[toolbox](https://lucide.dev/icons/toolbox) icon
	Toolbox,
	///[tornado](https://lucide.dev/icons/tornado) icon
	Tornado,
	///[torus](https://lucide.dev/icons/torus) icon
	Torus,
	///[touchpad](https://lucide.dev/icons/touchpad) icon
	Touchpad,
	///[touchpad-off](https://lucide.dev/icons/touchpad-off) icon
	TouchpadOff,
	///[towel-rack](https://lucide.dev/icons/towel-rack) icon
	TowelRack,
	///[tower-control](https://lucide.dev/icons/tower-control) icon
	TowerControl,
	///[toy-brick](https://lucide.dev/icons/toy-brick) icon
	ToyBrick,
	///[tractor](https://lucide.dev/icons/tractor) icon
	Tractor,
	///[traffic-cone](https://lucide.dev/icons/traffic-cone) icon
	TrafficCone,
	///[train-front](https://lucide.dev/icons/train-front) icon
	TrainFront,
	///[train-front-tunnel](https://lucide.dev/icons/train-front-tunnel) icon
	TrainFrontTunnel,
	///[train-track](https://lucide.dev/icons/train-track) icon
	TrainTrack,
	///[tram-front](https://lucide.dev/icons/tram-front) icon
	TramFront,
	///[transgender](https://lucide.dev/icons/transgender) icon
	Transgender,
	///[trash](https://lucide.dev/icons/trash) icon
	Trash,
	///[trash-2](https://lucide.dev/icons/trash-2) icon
	Trash2,
	///[tree-deciduous](https://lucide.dev/icons/tree-deciduous) icon
	TreeDeciduous,
	///[tree-palm](https://lucide.dev/icons/tree-palm) icon
	TreePalm,
	///[tree-pine](https://lucide.dev/icons/tree-pine) icon
	TreePine,
	///[trees](https://lucide.dev/icons/trees) icon
	Trees,
	///[trello](https://lucide.dev/icons/trello) icon
	Trello,
	///[trending-down](https://lucide.dev/icons/trending-down) icon
	TrendingDown,
	///[trending-up](https://lucide.dev/icons/trending-up) icon
	TrendingUp,
	///[trending-up-down](https://lucide.dev/icons/trending-up-down) icon
	TrendingUpDown,
	///[triangle](https://lucide.dev/icons/triangle) icon
	Triangle,
	///[triangle-alert](https://lucide.dev/icons/triangle-alert) icon
	TriangleAlert,
	///[triangle-dashed](https://lucide.dev/icons/triangle-dashed) icon
	TriangleDashed,
	///[triangle-right](https://lucide.dev/icons/triangle-right) icon
	TriangleRight,
	///[trophy](https://lucide.dev/icons/trophy) icon
	Trophy,
	///[truck](https://lucide.dev/icons/truck) icon
	Truck,
	///[truck-electric](https://lucide.dev/icons/truck-electric) icon
	TruckElectric,
	///[turkish-lira](https://lucide.dev/icons/turkish-lira) icon
	TurkishLira,
	///[turntable](https://lucide.dev/icons/turntable) icon
	Turntable,
	///[turtle](https://lucide.dev/icons/turtle) icon
	Turtle,
	///[tv](https://lucide.dev/icons/tv) icon
	Tv,
	///[tv-minimal](https://lucide.dev/icons/tv-minimal) icon
	TvMinimal,
	///[tv-minimal-play](https://lucide.dev/icons/tv-minimal-play) icon
	TvMinimalPlay,
	///[twitch](https://lucide.dev/icons/twitch) icon
	Twitch,
	///[twitter](https://lucide.dev/icons/twitter) icon
	Twitter,
	///[type](https://lucide.dev/icons/type) icon
	Type,
	///[type-outline](https://lucide.dev/icons/type-outline) icon
	TypeOutline,
	///[umbrella](https://lucide.dev/icons/umbrella) icon
	Umbrella,
	///[umbrella-off](https://lucide.dev/icons/umbrella-off) icon
	UmbrellaOff,
	///[underline](https://lucide.dev/icons/underline) icon
	Underline,
	///[undo](https://lucide.dev/icons/undo) icon
	Undo,
	///[undo-2](https://lucide.dev/icons/undo-2) icon
	Undo2,
	///[undo-dot](https://lucide.dev/icons/undo-dot) icon
	UndoDot,
	///[unfold-horizontal](https://lucide.dev/icons/unfold-horizontal) icon
	UnfoldHorizontal,
	///[unfold-vertical](https://lucide.dev/icons/unfold-vertical) icon
	UnfoldVertical,
	///[ungroup](https://lucide.dev/icons/ungroup) icon
	Ungroup,
	///[university](https://lucide.dev/icons/university) icon
	University,
	///[unlink](https://lucide.dev/icons/unlink) icon
	Unlink,
	///[unlink-2](https://lucide.dev/icons/unlink-2) icon
	Unlink2,
	///[unplug](https://lucide.dev/icons/unplug) icon
	Unplug,
	///[upload](https://lucide.dev/icons/upload) icon
	Upload,
	///[usb](https://lucide.dev/icons/usb) icon
	Usb,
	///[user](https://lucide.dev/icons/user) icon
	User,
	///[user-check](https://lucide.dev/icons/user-check) icon
	UserCheck,
	///[user-cog](https://lucide.dev/icons/user-cog) icon
	UserCog,
	///[user-key](https://lucide.dev/icons/user-key) icon
	UserKey,
	///[user-lock](https://lucide.dev/icons/user-lock) icon
	UserLock,
	///[user-minus](https://lucide.dev/icons/user-minus) icon
	UserMinus,
	///[user-pen](https://lucide.dev/icons/user-pen) icon
	UserPen,
	///[user-plus](https://lucide.dev/icons/user-plus) icon
	UserPlus,
	///[user-round](https://lucide.dev/icons/user-round) icon
	UserRound,
	///[user-round-check](https://lucide.dev/icons/user-round-check) icon
	UserRoundCheck,
	///[user-round-cog](https://lucide.dev/icons/user-round-cog) icon
	UserRoundCog,
	///[user-round-key](https://lucide.dev/icons/user-round-key) icon
	UserRoundKey,
	///[user-round-minus](https://lucide.dev/icons/user-round-minus) icon
	UserRoundMinus,
	///[user-round-pen](https://lucide.dev/icons/user-round-pen) icon
	UserRoundPen,
	///[user-round-plus](https://lucide.dev/icons/user-round-plus) icon
	UserRoundPlus,
	///[user-round-search](https://lucide.dev/icons/user-round-search) icon
	UserRoundSearch,
	///[user-round-x](https://lucide.dev/icons/user-round-x) icon
	UserRoundX,
	///[user-search](https://lucide.dev/icons/user-search) icon
	UserSearch,
	///[user-star](https://lucide.dev/icons/user-star) icon
	UserStar,
	///[user-x](https://lucide.dev/icons/user-x) icon
	UserX,
	///[users](https://lucide.dev/icons/users) icon
	Users,
	///[users-round](https://lucide.dev/icons/users-round) icon
	UsersRound,
	///[utensils](https://lucide.dev/icons/utensils) icon
	Utensils,
	///[utensils-crossed](https://lucide.dev/icons/utensils-crossed) icon
	UtensilsCrossed,
	///[utility-pole](https://lucide.dev/icons/utility-pole) icon
	UtilityPole,
	///[van](https://lucide.dev/icons/van) icon
	Van,
	///[variable](https://lucide.dev/icons/variable) icon
	Variable,
	///[vault](https://lucide.dev/icons/vault) icon
	Vault,
	///[vector-square](https://lucide.dev/icons/vector-square) icon
	VectorSquare,
	///[vegan](https://lucide.dev/icons/vegan) icon
	Vegan,
	///[venetian-mask](https://lucide.dev/icons/venetian-mask) icon
	VenetianMask,
	///[venus](https://lucide.dev/icons/venus) icon
	Venus,
	///[venus-and-mars](https://lucide.dev/icons/venus-and-mars) icon
	VenusAndMars,
	///[vibrate](https://lucide.dev/icons/vibrate) icon
	Vibrate,
	///[vibrate-off](https://lucide.dev/icons/vibrate-off) icon
	VibrateOff,
	///[video](https://lucide.dev/icons/video) icon
	Video,
	///[video-off](https://lucide.dev/icons/video-off) icon
	VideoOff,
	///[videotape](https://lucide.dev/icons/videotape) icon
	Videotape,
	///[view](https://lucide.dev/icons/view) icon
	View,
	///[voicemail](https://lucide.dev/icons/voicemail) icon
	Voicemail,
	///[volleyball](https://lucide.dev/icons/volleyball) icon
	Volleyball,
	///[volume](https://lucide.dev/icons/volume) icon
	Volume,
	///[volume-1](https://lucide.dev/icons/volume-1) icon
	Volume1,
	///[volume-2](https://lucide.dev/icons/volume-2) icon
	Volume2,
	///[volume-off](https://lucide.dev/icons/volume-off) icon
	VolumeOff,
	///[volume-x](https://lucide.dev/icons/volume-x) icon
	VolumeX,
	///[vote](https://lucide.dev/icons/vote) icon
	Vote,
	///[wallet](https://lucide.dev/icons/wallet) icon
	Wallet,
	///[wallet-cards](https://lucide.dev/icons/wallet-cards) icon
	WalletCards,
	///[wallet-minimal](https://lucide.dev/icons/wallet-minimal) icon
	WalletMinimal,
	///[wallpaper](https://lucide.dev/icons/wallpaper) icon
	Wallpaper,
	///[wand](https://lucide.dev/icons/wand) icon
	Wand,
	///[wand-sparkles](https://lucide.dev/icons/wand-sparkles) icon
	WandSparkles,
	///[warehouse](https://lucide.dev/icons/warehouse) icon
	Warehouse,
	///[washing-machine](https://lucide.dev/icons/washing-machine) icon
	WashingMachine,
	///[watch](https://lucide.dev/icons/watch) icon
	Watch,
	///[waves](https://lucide.dev/icons/waves) icon
	Waves,
	///[waves-arrow-down](https://lucide.dev/icons/waves-arrow-down) icon
	WavesArrowDown,
	///[waves-arrow-up](https://lucide.dev/icons/waves-arrow-up) icon
	WavesArrowUp,
	///[waves-ladder](https://lucide.dev/icons/waves-ladder) icon
	WavesLadder,
	///[waypoints](https://lucide.dev/icons/waypoints) icon
	Waypoints,
	///[webcam](https://lucide.dev/icons/webcam) icon
	Webcam,
	///[webhook](https://lucide.dev/icons/webhook) icon
	Webhook,
	///[webhook-off](https://lucide.dev/icons/webhook-off) icon
	WebhookOff,
	///[weight](https://lucide.dev/icons/weight) icon
	Weight,
	///[weight-tilde](https://lucide.dev/icons/weight-tilde) icon
	WeightTilde,
	///[wheat](https://lucide.dev/icons/wheat) icon
	Wheat,
	///[wheat-off](https://lucide.dev/icons/wheat-off) icon
	WheatOff,
	///[whole-word](https://lucide.dev/icons/whole-word) icon
	WholeWord,
	///[wifi](https://lucide.dev/icons/wifi) icon
	Wifi,
	///[wifi-cog](https://lucide.dev/icons/wifi-cog) icon
	WifiCog,
	///[wifi-high](https://lucide.dev/icons/wifi-high) icon
	WifiHigh,
	///[wifi-low](https://lucide.dev/icons/wifi-low) icon
	WifiLow,
	///[wifi-off](https://lucide.dev/icons/wifi-off) icon
	WifiOff,
	///[wifi-pen](https://lucide.dev/icons/wifi-pen) icon
	WifiPen,
	///[wifi-sync](https://lucide.dev/icons/wifi-sync) icon
	WifiSync,
	///[wifi-zero](https://lucide.dev/icons/wifi-zero) icon
	WifiZero,
	///[wind](https://lucide.dev/icons/wind) icon
	Wind,
	///[wind-arrow-down](https://lucide.dev/icons/wind-arrow-down) icon
	WindArrowDown,
	///[wine](https://lucide.dev/icons/wine) icon
	Wine,
	///[wine-off](https://lucide.dev/icons/wine-off) icon
	WineOff,
	///[workflow](https://lucide.dev/icons/workflow) icon
	Workflow,
	///[worm](https://lucide.dev/icons/worm) icon
	Worm,
	///[wrench](https://lucide.dev/icons/wrench) icon
	Wrench,
	///[x](https://lucide.dev/icons/x) icon
	X,
	///[x-line-top](https://lucide.dev/icons/x-line-top) icon
	XLineTop,
	///[youtube](https://lucide.dev/icons/youtube) icon
	Youtube,
	///[zap](https://lucide.dev/icons/zap) icon
	Zap,
	///[zap-off](https://lucide.dev/icons/zap-off) icon
	ZapOff,
	///[zoom-in](https://lucide.dev/icons/zoom-in) icon
	ZoomIn,
	///[zoom-out](https://lucide.dev/icons/zoom-out) icon
	ZoomOut,
}
