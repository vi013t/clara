import namer from "color-namer";
import { assignedLater } from "../../util/utils.svelte";
import type { Serialize } from "../../util/serialize.svelte";
import type { Cloneable } from "../../util/Clone.svelte";

type BuildRange<N extends number, Acc extends number[] = []> = Acc["length"] extends N
	? Acc[number]
	: BuildRange<N, [...Acc, Acc["length"]]>;

export type Range<Min extends number, Max extends number> = Exclude<BuildRange<Max>, BuildRange<Min>> | Min;

type Byte = Range<0, 256>;

export type ToColor = Color | [Byte, Byte, Byte] | string | { r: Byte; g: Byte; b: Byte };

export class Color implements Serialize<string>, Cloneable<Color> {
	public red = $state(assignedLater<Byte>());
	public green = $state(assignedLater<Byte>());
	public blue = $state(assignedLater<Byte>());
	public alpha = $state(assignedLater<number>());

	private constructor(red: Byte, green: Byte, blue: Byte, alpha: number = 1) {
		this.red = red;
		this.green = green;
		this.blue = blue;
		this.alpha = alpha;
	}

	public serialize(): string {
		return this.hex;
	}

	public static deserialize(color: string): Color {
		return Color.hex(color);
	}

	public static get black(): Color {
		return Color.rgb(0, 0, 0);
	}

	public static get white(): Color {
		return Color.rgb(255, 255, 255);
	}

	public static rgb(red: Byte, green: Byte, blue: Byte, alpha: number = 1): Color {
		return new Color(red, green, blue, alpha);
	}

	public static css(name: CSSColor, alpha: number = 1): Color {
		let { r, g, b } = cssColorMap[name];
		return new Color(r, g, b, alpha);
	}

	public static from(value: ToColor): Color {
		if (typeof value === "string") return Color.hex(value);
		if (Array.isArray(value)) return Color.rgb(value[0], value[1], value[2]);
		if ("r" in value) return Color.rgb(value.r, value.g, value.b);
		return value.clone();
	}

	public clone() {
		return new Color(this.red, this.green, this.blue);
	}

	public get name(): string {
		return Object.values(namer(this.hex))
			.map(nameList => ({ name: nameList[0].name, distance: nameList[0].distance }))
			.toSorted((a, b) => a.distance - b.distance)[0].name;
	}

	public get hue() {
		return this.hsl.h;
	}

	public get saturation() {
		return this.hsl.s;
	}

	public get lightness() {
		return this.hsl.l;
	}

	public get value() {
		return this.hsv.v;
	}

	public static tryHex(color: string): Color | null {
		try {
			return Color.hex(color);
		} catch (error) {
			return null;
		}
	}

	public static hex(color: string): Color {
		if (color.startsWith("#")) color = color.substring(1);

		if (color.length === 3 || color.length === 4) {
			color = color
				.split("")
				.map(c => c + c)
				.join("");
		}

		let alpha = 1;
		if (color.length === 8) {
			alpha = parseInt(color.substring(6, 8), 16) / 255;
			color = color.substring(0, 6);
		}

		if (color.length !== 6) throw new Error("Invalid hex color: #" + color);

		const rgb: [Byte, Byte, Byte] = [0, 0, 0];
		for (let segment = 0; segment < 3; segment++) {
			rgb[segment] = parseInt(color.substring(segment * 2, segment * 2 + 2), 16) as Byte;
		}

		return new Color(rgb[0], rgb[1], rgb[2], alpha);
	}

	public static hsl(h: number, s: number, l: number, alpha: number = 1): Color {
		s /= 100;
		l /= 100;
		const k = (n: number) => (n + h / 30) % 12;
		const a = s * Math.min(l, 1 - l);
		const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

		return new Color(Math.round(255 * f(0)) as Byte, Math.round(255 * f(8)) as Byte, Math.round(255 * f(4)) as Byte, alpha);
	}

	public static hsv(h: number, s: number, v: number, alpha: number = 1): Color {
		s /= 100;
		v /= 100;
		const f = (n: number, k = (n + h / 60) % 6) => v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);

		return new Color(Math.round(255 * f(5)) as Byte, Math.round(255 * f(3)) as Byte, Math.round(255 * f(1)) as Byte, alpha);
	}

	public get rgb(): number {
		return (this.red << 16) | (this.green << 8) | this.blue;
	}

	public get hex(): string {
		const toHex = (c: number) => c.toString(16).padStart(2, "0");
		let hex = `#${toHex(this.red)}${toHex(this.green)}${toHex(this.blue)}`;
		if (this.alpha < 1) hex += toHex(Math.round(this.alpha * 255));
		return hex.toUpperCase();
	}

	public get hsl(): { h: number; s: number; l: number } {
		const r = this.red / 255,
			g = this.green / 255,
			b = this.blue / 255;
		const max = Math.max(r, g, b),
			min = Math.min(r, g, b);
		let h = 0,
			s = 0,
			l = (max + min) / 2;

		if (max !== min) {
			const d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
			switch (max) {
				case r:
					h = (g - b) / d + (g < b ? 6 : 0);
					break;
				case g:
					h = (b - r) / d + 2;
					break;
				case b:
					h = (r - g) / d + 4;
					break;
			}
			h /= 6;
		}
		return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
	}

	public get hsv(): { h: number; s: number; v: number } {
		const r = this.red / 255,
			g = this.green / 255,
			b = this.blue / 255;
		const max = Math.max(r, g, b),
			min = Math.min(r, g, b);
		let h = 0,
			s = max === 0 ? 0 : (max - min) / max,
			v = max;

		if (max !== min) {
			const d = max - min;
			switch (max) {
				case r:
					h = (g - b) / d + (g < b ? 6 : 0);
					break;
				case g:
					h = (b - r) / d + 2;
					break;
				case b:
					h = (r - g) / d + 4;
					break;
			}
			h /= 6;
		}
		return { h: Math.round(h * 360), s: Math.round(s * 100), v: Math.round(v * 100) };
	}

	public get brightness(): number {
		return (this.red * 299 + this.green * 587 + this.blue * 114) / 1000;
	}

	public get luma(): number {
		return 0.2126 * this.red + 0.7152 * this.green + 0.0722 * this.blue;
	}

	public get constrastColor(): Color {
		return this.luma >= 165 ? new Color(0, 0, 0) : new Color(255, 255, 255);
	}

	public contrastRatio(other: Color): number {
		const l1 = Math.max(this.luma, other.luma) / 255;
		const l2 = Math.min(this.luma, other.luma) / 255;
		return (l1 + 0.05) / (l2 + 0.05);
	}

	/**
	 * Linearly interpolates (lerp) between this color and another.
	 * @param other The color to mix with.
	 * @param ratio A value between 0 and 1 (0 = this, 1 = other).
	 */
	public mix(other: Color, ratio: number): Color {
		ratio = Math.max(0, Math.min(1, ratio));

		const r = Math.round(this.red + (other.red - this.red) * ratio) as Byte;
		const g = Math.round(this.green + (other.green - this.green) * ratio) as Byte;
		const b = Math.round(this.blue + (other.blue - this.blue) * ratio) as Byte;
		const a = this.alpha + (other.alpha - this.alpha) * ratio;

		return new Color(r, g, b, a);
	}

	public lighten(amount: number): Color {
		const { h, s, l } = this.hsl;
		return Color.hsl(h, s, Math.min(100, l + amount), this.alpha);
	}

	public darken(amount: number): Color {
		const { h, s, l } = this.hsl;
		return Color.hsl(h, s, Math.max(0, l - amount), this.alpha);
	}

	public saturate(amount: number): Color {
		const { h, s, l } = this.hsl;
		return Color.hsl(h, Math.min(100, s + amount), l, this.alpha);
	}

	public desaturate(amount: number): Color {
		const { h, s, l } = this.hsl;
		return Color.hsl(h, Math.max(0, s - amount), l, this.alpha);
	}

	public toString(): string {
		if (this.alpha === 1) {
			return `rgb(${this.red}, ${this.green}, ${this.blue})`;
		}
		return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha.toFixed(2)})`;
	}
}

const cssColorMap = {
	aliceblue: { r: 240, g: 248, b: 255 },
	antiquewhite: { r: 250, g: 235, b: 215 },
	aqua: { r: 0, g: 255, b: 255 },
	aquamarine: { r: 127, g: 255, b: 212 },
	azure: { r: 240, g: 255, b: 255 },
	beige: { r: 245, g: 245, b: 220 },
	bisque: { r: 255, g: 228, b: 196 },
	black: { r: 0, g: 0, b: 0 },
	blanchedalmond: { r: 255, g: 235, b: 205 },
	blue: { r: 0, g: 0, b: 255 },
	blueviolet: { r: 138, g: 43, b: 226 },
	brown: { r: 165, g: 42, b: 42 },
	burlywood: { r: 222, g: 184, b: 135 },
	cadetblue: { r: 95, g: 158, b: 160 },
	chartreuse: { r: 127, g: 255, b: 0 },
	chocolate: { r: 210, g: 105, b: 30 },
	coral: { r: 255, g: 127, b: 80 },
	cornflowerblue: { r: 100, g: 149, b: 237 },
	cornsilk: { r: 255, g: 248, b: 220 },
	crimson: { r: 220, g: 20, b: 60 },
	cyan: { r: 0, g: 255, b: 255 },
	darkblue: { r: 0, g: 0, b: 139 },
	darkcyan: { r: 0, g: 139, b: 139 },
	darkgoldenrod: { r: 184, g: 134, b: 11 },
	darkgray: { r: 169, g: 169, b: 169 },
	darkgreen: { r: 0, g: 100, b: 0 },
	darkgrey: { r: 169, g: 169, b: 169 },
	darkkhaki: { r: 189, g: 183, b: 107 },
	darkmagenta: { r: 139, g: 0, b: 139 },
	darkolivegreen: { r: 85, g: 107, b: 47 },
	darkorange: { r: 255, g: 140, b: 0 },
	darkorchid: { r: 153, g: 50, b: 204 },
	darkred: { r: 139, g: 0, b: 0 },
	darksalmon: { r: 233, g: 150, b: 122 },
	darkseagreen: { r: 143, g: 188, b: 143 },
	darkslateblue: { r: 72, g: 61, b: 139 },
	darkslategray: { r: 47, g: 79, b: 79 },
	darkslategrey: { r: 47, g: 79, b: 79 },
	darkturquoise: { r: 0, g: 206, b: 209 },
	darkviolet: { r: 148, g: 0, b: 211 },
	deeppink: { r: 255, g: 20, b: 147 },
	deepskyblue: { r: 0, g: 191, b: 255 },
	dimgray: { r: 105, g: 105, b: 105 },
	dimgrey: { r: 105, g: 105, b: 105 },
	dodgerblue: { r: 30, g: 144, b: 255 },
	firebrick: { r: 178, g: 34, b: 34 },
	floralwhite: { r: 255, g: 250, b: 240 },
	forestgreen: { r: 34, g: 139, b: 34 },
	fuchsia: { r: 255, g: 0, b: 255 },
	gainsboro: { r: 220, g: 220, b: 220 },
	ghostwhite: { r: 248, g: 248, b: 255 },
	gold: { r: 255, g: 215, b: 0 },
	goldenrod: { r: 218, g: 165, b: 32 },
	gray: { r: 128, g: 128, b: 128 },
	green: { r: 0, g: 128, b: 0 },
	greenyellow: { r: 173, g: 255, b: 47 },
	grey: { r: 128, g: 128, b: 128 },
	honeydew: { r: 240, g: 255, b: 240 },
	hotpink: { r: 255, g: 105, b: 180 },
	indianred: { r: 205, g: 92, b: 92 },
	indigo: { r: 75, g: 0, b: 130 },
	ivory: { r: 255, g: 255, b: 240 },
	khaki: { r: 240, g: 230, b: 140 },
	lavender: { r: 230, g: 230, b: 250 },
	lavenderblush: { r: 255, g: 240, b: 245 },
	lawngreen: { r: 124, g: 252, b: 0 },
	lemonchiffon: { r: 255, g: 250, b: 205 },
	lightblue: { r: 173, g: 216, b: 230 },
	lightcoral: { r: 240, g: 128, b: 128 },
	lightcyan: { r: 224, g: 255, b: 255 },
	lightgoldenrodyellow: { r: 250, g: 250, b: 210 },
	lightgray: { r: 211, g: 211, b: 211 },
	lightgreen: { r: 144, g: 238, b: 144 },
	lightgrey: { r: 211, g: 211, b: 211 },
	lightpink: { r: 255, g: 182, b: 193 },
	lightsalmon: { r: 255, g: 160, b: 122 },
	lightseagreen: { r: 32, g: 178, b: 170 },
	lightskyblue: { r: 135, g: 206, b: 250 },
	lightslategray: { r: 119, g: 136, b: 153 },
	lightslategrey: { r: 119, g: 136, b: 153 },
	lightsteelblue: { r: 176, g: 196, b: 222 },
	lightyellow: { r: 255, g: 255, b: 224 },
	lime: { r: 0, g: 255, b: 0 },
	limegreen: { r: 50, g: 205, b: 50 },
	linen: { r: 250, g: 240, b: 230 },
	magenta: { r: 255, g: 0, b: 255 },
	maroon: { r: 128, g: 0, b: 0 },
	mediumaquamarine: { r: 102, g: 205, b: 170 },
	mediumblue: { r: 0, g: 0, b: 205 },
	mediumorchid: { r: 186, g: 85, b: 211 },
	mediumpurple: { r: 147, g: 112, b: 219 },
	mediumseagreen: { r: 60, g: 179, b: 113 },
	mediumslateblue: { r: 123, g: 104, b: 238 },
	mediumspringgreen: { r: 0, g: 250, b: 154 },
	mediumturquoise: { r: 72, g: 209, b: 204 },
	mediumvioletred: { r: 199, g: 21, b: 133 },
	midnightblue: { r: 25, g: 25, b: 112 },
	mintcream: { r: 245, g: 255, b: 250 },
	mistyrose: { r: 255, g: 228, b: 225 },
	moccasin: { r: 255, g: 228, b: 181 },
	navajowhite: { r: 255, g: 222, b: 173 },
	navy: { r: 0, g: 0, b: 128 },
	oldlace: { r: 253, g: 245, b: 230 },
	olive: { r: 128, g: 128, b: 0 },
	olivedrab: { r: 107, g: 142, b: 35 },
	orange: { r: 255, g: 165, b: 0 },
	orangered: { r: 255, g: 69, b: 0 },
	orchid: { r: 218, g: 112, b: 214 },
	palegoldenrod: { r: 238, g: 232, b: 170 },
	palegreen: { r: 152, g: 251, b: 152 },
	paleturquoise: { r: 175, g: 238, b: 238 },
	palevioletred: { r: 219, g: 112, b: 147 },
	papayawhip: { r: 255, g: 239, b: 213 },
	peachpuff: { r: 255, g: 218, b: 185 },
	peru: { r: 205, g: 133, b: 63 },
	pink: { r: 255, g: 192, b: 203 },
	plum: { r: 221, g: 160, b: 221 },
	powderblue: { r: 176, g: 224, b: 230 },
	purple: { r: 128, g: 0, b: 128 },
	rebeccapurple: { r: 102, g: 51, b: 153 },
	red: { r: 255, g: 0, b: 0 },
	rosybrown: { r: 188, g: 143, b: 143 },
	royalblue: { r: 65, g: 105, b: 225 },
	saddlebrown: { r: 139, g: 69, b: 19 },
	salmon: { r: 250, g: 128, b: 114 },
	sandybrown: { r: 244, g: 164, b: 96 },
	seagreen: { r: 46, g: 139, b: 87 },
	seashell: { r: 255, g: 245, b: 238 },
	sienna: { r: 160, g: 82, b: 45 },
	silver: { r: 192, g: 192, b: 192 },
	skyblue: { r: 135, g: 206, b: 235 },
	slateblue: { r: 106, g: 90, b: 205 },
	slategray: { r: 112, g: 128, b: 144 },
	slategrey: { r: 112, g: 128, b: 144 },
	snow: { r: 255, g: 250, b: 250 },
	springgreen: { r: 0, g: 255, b: 127 },
	steelblue: { r: 70, g: 130, b: 180 },
	tan: { r: 210, g: 180, b: 140 },
	teal: { r: 0, g: 128, b: 128 },
	thistle: { r: 216, g: 191, b: 216 },
	tomato: { r: 255, g: 99, b: 71 },
	turquoise: { r: 64, g: 224, b: 208 },
	violet: { r: 238, g: 130, b: 238 },
	wheat: { r: 245, g: 222, b: 179 },
	white: { r: 255, g: 255, b: 255 },
	whitesmoke: { r: 245, g: 245, b: 245 },
	yellow: { r: 255, g: 255, b: 0 },
	yellowgreen: { r: 154, g: 205, b: 50 },
} as const satisfies { [key: string]: { r: Byte; g: Byte; b: Byte } };

type CSSColor = keyof typeof cssColorMap;
