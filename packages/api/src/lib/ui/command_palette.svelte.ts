let commandPaletteOpen = $state(false);

export function isCommandPaletteOpen() {
	return commandPaletteOpen;
}

export function closeCommandPalette() {
	commandPaletteOpen = false;
}

export function openCommandPalette() {
	commandPaletteOpen = true;
}
