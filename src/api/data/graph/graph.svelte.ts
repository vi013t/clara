import { Point2D } from "../../math/matrix.svelte";
import { Circle, type Shape } from "../../math/shape.svelte";
import { Color } from "../../ui/color.svelte";
import { assignedLater } from "../../util/utils.svelte";

export class GraphOutline<T extends Shape> {
	public shape = $state(assignedLater<T>());
	public color = $state(Color.black);
	public isVisible = $state(true);

	private constructor(shape: T, color: Color) {
		this.shape = shape;
		this.color = color;
	}

	public static originCircle(radius: number): GraphOutline<Circle> {
		return new GraphOutline(new Circle(radius, Point2D.origin()), Color.black);
	}

	public static fromShapeAndColor<T extends Shape>(shape: T, color: Color): GraphOutline<T> {
		return new GraphOutline(shape, color);
	}
}
