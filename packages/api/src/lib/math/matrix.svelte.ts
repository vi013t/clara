import type { Cloneable } from "../util/Clone.svelte";

type InternalMatrix = readonly [
	readonly [number, number, number],
	readonly [number, number, number],
	readonly [number, number, number],
];

export class Matrix3x3 {
	public readonly values: InternalMatrix = $state([
		[1, 0, 0],
		[0, 1, 0],
		[0, 0, 1],
	]);

	private constructor(values?: InternalMatrix) {
		if (values) this.values = values;
	}

	public getScale(): Point2D {
		let [[x, _b, _c], [_d, y, _f], [_g, _h, _i]] = this.values;
		return new Point2D(x, y);
	}

	public static identity() {
		return new Matrix3x3();
	}

	public times(other: Matrix3x3) {
		let [[a, b, c], [d, e, f], [g, h, i]] = this.values;
		let [[j, k, l], [m, n, o], [p, q, r]] = other.values;
		return new Matrix3x3([
			[a * j + b * m + c * p, a * k + b * n + c * q, a * l + b * o + c * r],
			[d * j + e * m + f * p, d * k + e * n + f * q, d * l + e * o + f * r],
			[g * j + h * m + i * p, g * k + h * n + i * q, g * l + h * o + i * r],
		]);
	}

	public timesPoint(pointLike: Point2DLike): Point2D {
		let { x, y } = new Point2D(pointLike);
		let [[a, b, c], [d, e, f], [g, h, i]] = this.values;
		return new Point2D({ x: a * x + b * y + c, y: d * x + e * y + f });
	}

	public get inverse(): Matrix3x3 {
		let [[a, b, c], [d, e, f], [g, h, i]] = this.values;
		const invDet = 1 / this.determinant;

		return new Matrix3x3([
			[(e * i - f * h) * invDet, (c * h - b * i) * invDet, (b * f - c * e) * invDet],
			[(f * g - d * i) * invDet, (a * i - c * g) * invDet, (c * d - a * f) * invDet],
			[(d * h - e * g) * invDet, (b * g - a * h) * invDet, (a * e - b * d) * invDet],
		]);
	}

	public get determinant(): number {
		let [[a, b, c], [d, e, f], [g, h, i]] = this.values;
		return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
	}

	public static translation(pointLike: Point2DLike) {
		let { x, y } = new Point2D(pointLike);
		return new Matrix3x3([
			[1, 0, x],
			[0, 1, y],
			[0, 0, 1],
		]);
	}

	public static rotation(angle: number) {
		return new Matrix3x3([
			[Math.cos(angle), -Math.sin(angle), 0],
			[Math.sin(angle), Math.cos(angle), 0],
			[0, 0, 1],
		]);
	}

	public static scale(point: Point2DLike | number) {
		let { x, y } = new Point2D(typeof point === "object" ? point : [point, point]);
		return new Matrix3x3([
			[x, 0, 0],
			[0, y, 0],
			[0, 0, 1],
		]);
	}

	public get css(): string {
		const [[a, c, e], [b, d, f], _] = this.values;
		return `matrix(${a}, ${b}, ${c}, ${d}, ${e}, ${f})`;
	}
}

export type Point2DLike = { x: number; y: number } | [number, number] | Point2D;

export class Point2D implements Cloneable<Point2D> {
	public readonly x: number;
	public readonly y: number;

	public constructor(x: number, y: number);
	public constructor(point: Point2DLike);
	public constructor(x: number | Point2DLike, y?: number) {
		let x_: number;
		let y_: number;
		if (typeof x === "object") {
			if (Array.isArray(x)) {
				x_ = x[0];
				y_ = x[1];
			} else {
				x_ = x.x;
				y_ = x.y;
			}
		} else {
			x_ = x;
			y_ = y!;
		}

		this.x = $state(x_);
		this.y = $state(y_);
	}

	public clone(): Point2D {
		return new Point2D(this);
	}

	public plus(other: Point2DLike): Point2D {
		let point = new Point2D(other);
		return new Point2D(this.x + point.x, this.y + point.y);
	}

	public equals(other: Point2DLike): boolean {
		let point = new Point2D(other);
		return this.x == point.x && this.y == point.y;
	}

	public moveAwayFrom(point: Point2DLike, distance: number): Point2D {
		let center = new Point2D(point);
		let radius = this.distanceTo(center);
		return new Point2D(this.x + (distance * (this.x - center.x)) / radius, this.y + (distance * (this.y - center.y)) / radius);
	}

	public static average(points: Point2DLike[]): Point2D {
		return points
			.map(point => new Point2D(point))
			.reduce((accumulator, current) => accumulator.plus(current), Point2D.origin())
			.dividedBy(points.length);
	}

	public static polar(radius: number, angle: number): Point2D {
		return new Point2D(radius * Math.cos(angle), radius * Math.sin(angle));
	}

	public polar(): { radius: number; angle: number } {
		return { radius: this.distanceTo(Point2D.origin()), angle: Math.atan(this.y / this.x) };
	}

	public polarRelativeTo(center: Point2D): { radius: number; angle: number } {
		let angle = Math.atan((this.y - center.y) / (this.x - center.x));
		let radius = this.distanceTo(center);
		return { radius, angle };
	}

	public static sum(...pointLikes: Point2DLike[]): Point2D {
		let points = pointLikes.map(point => new Point2D(point));
		return points.reduce((total, current) => total.plus(current), Point2D.origin());
	}

	public dividedBy(other: Point2DLike | number): Point2D {
		let point = typeof other === "object" ? new Point2D(other) : new Point2D([other, other]);
		return new Point2D(this.x / point.x, this.y / point.y);
	}

	public distanceTo(other: Point2DLike): number {
		let point = new Point2D(other);
		return Math.sqrt(Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2));
	}

	public squared(): Point2D {
		return this.times(this);
	}

	public times(other: Point2DLike): Point2D {
		let point = new Point2D(other);
		return new Point2D(this.x * point.x, this.y * point.y);
	}

	public distanceSquared(other: Point2DLike): number {
		return Math.pow(this.distanceTo(other), 2);
	}

	public minus(other: Point2DLike): Point2D {
		let point = new Point2D(other);
		return new Point2D(this.x - point.x, this.y - point.y);
	}

	public static origin(): Point2D {
		return new Point2D(0, 0);
	}
}
