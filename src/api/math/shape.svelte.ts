import type { Cloneable } from "../util/Clone.svelte";
import { assignedLater } from "../util/utils.svelte";
import { clamp } from "./arrays.svelte";
import { Point2D, type Point2DLike } from "./matrix.svelte";

interface ShapeBase<T extends ShapeBase<T>> extends Cloneable<T> {
	overlaps(other: Shape, padding?: number): boolean;
	contains(other: Shape, padding?: number): boolean;
}

export type Shape = Rectangle | Circle;

export class Circle implements ShapeBase<Circle> {
	public radius = $state(assignedLater<number>());
	public center = $state(assignedLater<Point2D>());

	public constructor(radius: number, center: Point2D) {
		this.radius = radius;
		this.center = center;
	}

	public clone(): Circle {
		return new Circle(this.radius, this.center.clone());
	}

	public getConstrainedShift(desiredShift: [number, number], parent: Circle, padding: number = 0): [number, number] {
		const [dx, dy] = desiredShift;

		// 1. Where does the circle *want* to go?
		const targetX = this.center.x + dx;
		const targetY = this.center.y + dy;

		// 2. What is the maximum allowed distance from the parent's center?
		const maxSafeDistance = parent.radius - this.radius - padding;

		// Safety check: if padding makes the safe area negative, no movement allowed
		if (maxSafeDistance <= 0) return [0, 0];

		// 3. How far will the target center be from the parent's center?
		const distX = targetX - parent.center.x;
		const distY = targetY - parent.center.y;
		const distanceToParentCenter = Math.hypot(distX, distY);

		// 4. If the target is within the safe zone, allow the full movement!
		if (distanceToParentCenter <= maxSafeDistance) {
			return [dx, dy];
		}

		// 5. If it overshoots, snap it exactly to the curved boundary edge.
		// We find the angle from the parent center to the target point,
		// and project our center exactly 'maxSafeDistance' away along that angle.
		const angle = Math.atan2(distY, distX);

		const constrainedX = parent.center.x + Math.cos(angle) * maxSafeDistance;
		const constrainedY = parent.center.y + Math.sin(angle) * maxSafeDistance;

		// Return the actual delta we are allowed to move
		return [constrainedX - this.center.x, constrainedY - this.center.y];
	}

	public overlaps(other: Shape, padding: number = 0): boolean {
		if (other instanceof Circle) {
			const threshold = this.radius + other.radius - padding;
			return this.center.distanceTo(other.center) < threshold;
		}

		// Rectangle logic: Clamp center to rectangle bounds
		const closest = new Point2D(clamp(this.center.x, other.left, other.right), clamp(this.center.y, other.top, other.bottom));
		const distance = this.center.distanceTo(closest);

		// Subtract padding from radius threshold
		return distance <= this.radius - padding;
	}

	public contains(other: Shape, padding: number = 0): boolean {
		const safeRadius = this.radius - padding;

		if (safeRadius < 0) return false; // Padding is larger than the circle itself

		if (other instanceof Circle) {
			const distance = this.center.distanceTo(other.center);
			// The inner circle's edge (distance + radius) must be within our safe radius
			return distance + other.radius <= safeRadius;
		}

		// Rectangle: Check if all four corners are within the safe radius
		const corners = [
			new Point2D(other.left, other.top),
			new Point2D(other.right, other.top),
			new Point2D(other.left, other.bottom),
			new Point2D(other.right, other.bottom),
		];

		return corners.every(corner => this.center.distanceTo(corner) <= safeRadius);
	}

	public static unit(): Circle {
		return new Circle(0, Point2D.origin());
	}
}

export class Rectangle implements ShapeBase<Rectangle> {
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

	public clone(): Rectangle {
		return new Rectangle(this.left, this.top, this.width, this.height);
	}

	public overlaps(other: Shape, padding: number = 0): boolean {
		if (other instanceof Circle) {
			return other.overlaps(this, padding);
		}

		return (
			this.left < other.right - padding &&
			this.right > other.left + padding &&
			this.top < other.bottom - padding &&
			this.bottom > other.top + padding
		);
	}

	public static squareFromCenter(center: Point2DLike, radius: number): Rectangle {
		let centerPoint = new Point2D(center);
		return new Rectangle(centerPoint.x - radius, centerPoint.y - radius, radius * 2, radius * 2);
	}

	public contains(other: Shape, padding: number = 0): boolean {
		const innerLeft = this.left + padding;
		const innerRight = this.right - padding;
		const innerTop = this.top + padding;
		const innerBottom = this.bottom - padding;

		// Ensure the padded box isn't inverted
		if (innerLeft > innerRight || innerTop > innerBottom) return false;

		if (other instanceof Circle) {
			// The circle's extents (center +/- radius) must be within our padded bounds
			return (
				other.center.x - other.radius >= innerLeft &&
				other.center.x + other.radius <= innerRight &&
				other.center.y - other.radius >= innerTop &&
				other.center.y + other.radius <= innerBottom
			);
		}

		return other.left >= innerLeft && other.right <= innerRight && other.top >= innerTop && other.bottom <= innerBottom;
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
