import { assignedLater } from "../util/utils.svelte";
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
		let left = Math.min(...others.map(rect => rect.left)) - pad.left;
		let top = Math.min(...others.map(rect => rect.top)) + pad.top;
		let right = Math.max(...others.map(rect => rect.right)) + pad.right;
		let bottom = Math.max(...others.map(rect => rect.bottom)) + pad.bottom;
		return Rectangle.fromBounds({ left, top, right, bottom });
	}

	public static fromBounds({ left, top, right, bottom }: { left: number; top: number; bottom: number; right: number }) {
		return new Rectangle(left, top, right - left, bottom - top);
	}
}

export type PackingResult = {
	circles: Point2D[];
	parentRadius: number;
};

export function getPrettyPacking(smallCircles: number, smallCircleRadius: number): PackingResult {
	// Base Cases
	if (smallCircles <= 0) return { circles: [], parentRadius: 0 };
	if (smallCircles === 1) return { circles: [new Point2D({ x: 0, y: 0 })], parentRadius: smallCircleRadius };

	// Special case for n=2 (symmetry is just a line/diameter)
	if (smallCircles === 2) {
		return {
			circles: [new Point2D({ x: -smallCircleRadius, y: 0 }), new Point2D({ x: smallCircleRadius, y: 0 })],
			parentRadius: 2 * smallCircleRadius,
		};
	}

	let bestR = Infinity;
	let bestConfig: { m: number; coreResult: PackingResult } | null = null;

	/**
	 * We iterate through possible counts for the outer ring (m).
	 * To maintain the "outermost circles form a polygon" rule, m >= 3.
	 * We check which m allows the remaining (n-m) circles to fit inside
	 * the inner void while minimizing the total radius R.
	 */
	for (let m = smallCircles; m >= 3; m--) {
		const nCore = smallCircles - m;

		// Calculate R based on m circles on the outer ring
		// Formula: R = r * (1 + 1 / sin(PI / m))
		const currentR = smallCircleRadius * (1 + 1 / Math.sin(Math.PI / m));
		const dOuter = currentR - smallCircleRadius; // Distance from parent center to small circle center
		const rInnerVoid = dOuter - smallCircleRadius; // Max radius available for the core

		// If there is a core, check if it actually fits
		if (nCore > 0) {
			const coreResult = getPrettyPacking(nCore, smallCircleRadius);
			if (coreResult.parentRadius <= rInnerVoid + 0.00001) {
				// Floating point buffer
				if (currentR < bestR) {
					bestR = currentR;
					bestConfig = { m, coreResult };
				}
			}
		} else {
			// No core, this is a single-ring packing
			if (currentR < bestR) {
				bestR = currentR;
				bestConfig = { m, coreResult: { circles: [], parentRadius: 0 } };
			}
		}
	}

	// Fallback: If no symmetric m-gon works, we default to the largest ring (m=n)
	if (!bestConfig) {
		const m = smallCircles;
		const R = smallCircleRadius * (1 + 1 / Math.sin(Math.PI / m));
		return {
			circles: generateRing(m, R - smallCircleRadius),
			parentRadius: R,
		};
	}

	// Generate the points for the chosen configuration
	const outerPoints = generateRing(bestConfig.m, bestR - smallCircleRadius);
	return {
		circles: [...outerPoints, ...bestConfig.coreResult.circles],
		parentRadius: bestR,
	};
}

/**
 * Helper to generate (x, y) coordinates for m circles on a ring of radius d
 */
function generateRing(m: number, d: number): Point2D[] {
	const points: Point2D[] = [];
	for (let possibleOuterRingRadius = 0; possibleOuterRingRadius < m; possibleOuterRingRadius++) {
		const angle = (possibleOuterRingRadius * 2 * Math.PI) / m;
		points.push(
			new Point2D({
				x: d * Math.cos(angle),
				y: d * Math.sin(angle),
			}),
		);
	}
	return points;
}
