import { assignedLater } from "../util/utils.svelte";
import { max, min } from "./arrays.svelte";
import { Point2D, type Point2DLike } from "./matrix.svelte";

export class Rectangle {
	public left = $state(assignedLater<number>());
	public top = $state(assignedLater<number>());
	public width = $state(assignedLater<number>());
	public height = $state(assignedLater<number>());

	private constructor(left: number, top: number, width: number, height: number) {
		this.left = left;
		this.top = top;
		this.width = width;
		this.height = height;
	}

	public static squareFromCenter(center: Point2DLike, radius: number): Rectangle {
		let centerPoint = new Point2D(center);
		return new Rectangle(centerPoint.x - radius, centerPoint.y - radius, radius * 2, radius * 2);
	}

	public static fromXYWH({ x, y, width, height }: { x: number; y: number; width: number; height: number }): Rectangle {
		return new Rectangle(x, y, width, height);
	}

	public shiftRight(amount: number): void {
		this.left += amount;
	}

	public get center(): Point2D {
		return new Point2D([this.width / 2 + this.left, this.height / 2 + this.top]);
	}

	public get right(): number {
		return this.left + this.width;
	}

	public get bottom(): number {
		return this.top + this.height;
	}

	public get size() {
		return new Point2D(this.width, this.height);
	}

	public static around(
		others: Rectangle[],
		padding: Partial<{ top: number; left: number; bottom: number; right: number }> = {},
	): Rectangle {
		let pad = { top: 0, left: 0, right: 0, bottom: 0, ...padding };
		let left = min(...others.map(rect => rect.left)) - pad.left;
		let top = min(...others.map(rect => rect.top)) + pad.top;
		let right = max(...others.map(rect => rect.right)) + pad.right;
		let bottom = max(...others.map(rect => rect.bottom)) + pad.bottom;
		return Rectangle.fromBounds({ left, top, right, bottom });
	}

	public static fromBounds({ left, top, right, bottom }: { left: number; top: number; bottom: number; right: number }) {
		return new Rectangle(left, top, right - left, bottom - top);
	}
}
