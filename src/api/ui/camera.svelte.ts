import { Matrix3x3, Point2D, type Point2DLike } from "../math/matrix.svelte";

const MIN_SCALE = 1e-6;

export class Camera {
	private translation = $state(Matrix3x3.translation({ x: 0, y: 0 }));
	private rotation = $state(Matrix3x3.rotation(0));
	private dilation = $state(Matrix3x3.scale(1));

	public get transformation() {
		return this.translation.times(this.rotation).times(this.dilation);
	}

	public get viewMatrix() {
		return this.transformation.inverse;
	}

	public getWorldSpaceOrigin(): Point2D {
		return this.project(Point2D.origin());
	}

	public project(point: Point2DLike): Point2D {
		return this.viewMatrix.timesPoint(point);
	}

	public unproject(point: Point2DLike): Point2D {
		return this.transformation.timesPoint(point);
	}

	public viewOrigin(): Point2D {
		return this.viewMatrix.timesPoint(Point2D.origin());
	}

	public moveTo(point: Point2DLike): void {
		this.translation = Matrix3x3.translation(point);
	}

	public get transformCSS(): string {
		return this.viewMatrix.css;
	}

	public shift(point: Point2DLike): void {
		this.translation = this.translation.times(Matrix3x3.translation(point));
	}

	public setRotation(angle: number): void {
		this.rotation = Matrix3x3.rotation(angle);
	}

	public rotate(angle: number): void {
		this.rotation = this.rotation.times(Matrix3x3.rotation(angle));
	}

	public scale(pointLike: Point2DLike | number): void {
		let point = new Point2D(typeof pointLike === "object" ? pointLike : [pointLike, pointLike]);
		if (Math.abs(point.x) < MIN_SCALE || Math.abs(point.y) < MIN_SCALE) return;
		this.dilation = this.dilation.times(Matrix3x3.scale(point));
	}

	public getScale(): Point2D {
		return this.dilation.getScale();
	}

	public setScale(pointLike: Point2DLike | number): void {
		let point = new Point2D(typeof pointLike === "object" ? pointLike : [pointLike, pointLike]);

		const safeX = Math.max(Math.abs(point.x), MIN_SCALE) * Math.sign(point.x || 1);
		const safeY = Math.max(Math.abs(point.y), MIN_SCALE) * Math.sign(point.y || 1);

		this.dilation = Matrix3x3.scale({ x: safeX, y: safeY });
	}

	public rotateAround(pivot: Point2DLike, angle: number): void {
		const p = new Point2D(pivot);
		const rotationMatrix = Matrix3x3.rotation(angle);

		const currentPos = new Point2D([this.translation.values[0][2], this.translation.values[1][2]]);
		const offset = { x: currentPos.x - p.x, y: currentPos.y - p.y };
		const rotatedOffset = rotationMatrix.timesPoint(offset);

		this.translation = Matrix3x3.translation({
			x: p.x + rotatedOffset.x,
			y: p.y + rotatedOffset.y,
		});

		this.rotate(angle);
	}

	public setScaleAround(pivot: Point2DLike, newScale: number | Point2DLike): void {
		const p = new Point2D(pivot);
		const target = new Point2D(typeof newScale === "object" ? newScale : [newScale, newScale]);

		const current = this.getScale();

		const factor = new Point2D({
			x: target.x / current.x,
			y: target.y / current.y,
		});

		if (Math.abs(factor.x) < MIN_SCALE || Math.abs(factor.y) < MIN_SCALE) return;

		const scaleMatrix = Matrix3x3.scale(factor);

		const currentPos = new Point2D([this.translation.values[0][2], this.translation.values[1][2]]);

		const offset = { x: currentPos.x - p.x, y: currentPos.y - p.y };
		const scaledOffset = scaleMatrix.timesPoint(offset);

		this.translation = Matrix3x3.translation({
			x: p.x + scaledOffset.x,
			y: p.y + scaledOffset.y,
		});

		this.setScale(target);
	}

	public scaleAround(pivot: Point2DLike, factor: number | Point2DLike): void {
		const p = new Point2D(pivot);
		const factorPoint = new Point2D(typeof factor === "object" ? factor : [factor, factor]);

		if (Math.abs(factorPoint.x) < MIN_SCALE || Math.abs(factorPoint.y) < MIN_SCALE) return;

		const scaleMatrix = Matrix3x3.scale(factorPoint);

		const currentPos = new Point2D([this.translation.values[0][2], this.translation.values[1][2]]);
		const offset = { x: currentPos.x - p.x, y: currentPos.y - p.y };
		const scaledOffset = scaleMatrix.timesPoint(offset);

		this.translation = Matrix3x3.translation({
			x: p.x + scaledOffset.x,
			y: p.y + scaledOffset.y,
		});

		this.scale(factorPoint);
	}
}
