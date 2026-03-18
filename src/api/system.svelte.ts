import { invoke } from "@tauri-apps/api/core";

let fonts: string[] = $state([]);

export async function loadFonts() {
	fonts = await invoke<string[]>("get_fonts");
}

export async function getFonts(): Promise<string[]> {
	if (fonts.length === 0) await loadFonts();
	return fonts;
}
