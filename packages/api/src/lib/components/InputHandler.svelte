<script module lang="ts">
	import { Point2D } from "@clara/api/math";
	import { assignedLater } from "@clara/api/utils";

	class Mouse {
		private client_ = $state(Point2D.origin());
		private offset_ = $state(Point2D.origin());
		private leftClicking_ = $state(false);
		private rightClicking_ = $state(false);
		private middleClicking_ = $state(false);
		private isMoving_ = $state(false);
		private isDragging_ = $state(false);

		private handlers: { event: string; callback: (event: MouseEvent) => any }[] = $state([]);

		public get isLeftClicking(): boolean {
			return this.leftClicking_;
		}

		public get isRightClicking(): boolean {
			return this.rightClicking_;
		}

		public get isMiddleClicking(): boolean {
			return this.middleClicking_;
		}

		public get client(): Point2D {
			return this.client_;
		}

		public get offsetY(): Point2D {
			return this.offset_;
		}

		public relativeTo(element: HTMLElement): Point2D {
			if (!element.offsetParent) return Point2D.origin();
			return new Point2D(
				this.client.x - element!.offsetParent.getBoundingClientRect().left,
				this.client.y - element!.offsetParent.getBoundingClientRect().top,
			);
		}

		public get isMoving(): boolean {
			return this.isMoving_;
		}

		public get isDragging(): boolean {
			return this.isDragging_;
		}

		public onLeftClick(callback: (event: MouseEvent) => any) {
			this.handlers.push({ event: "mousedown", callback });
		}

		public onMove(callback: (event: MouseEvent) => any) {
			this.handlers.push({ event: "move", callback });
		}

		public onClickAndRelease(callback: (event: MouseEvent) => any) {
			this.handlers.push({ event: "click", callback });
		}

		public onRelease(callback: (event: MouseEvent) => any) {
			this.handlers.push({ event: "mouseup", callback });
		}
	}

	let mouseState = $state(new Mouse());

	export function mouse() {
		return mouseState;
	}
</script>

<script lang="ts">
	let moveTimeout: NodeJS.Timeout | null = $state(null);
	let clickedElement = $state(assignedLater<HTMLElement>());

	function onmousemove(event: MouseEvent) {
		(mouseState as any).client_ = new Point2D(event.clientX, event.clientY);
		(mouseState as any).offset_ = new Point2D(event.offsetX, event.offsetY);

		// isDragging
		if (mouseState.isLeftClicking) (mouseState as any).isDragging_ = true;

		// isMoving
		(mouseState as any).isMoving_ = true;
		if (moveTimeout) clearTimeout(moveTimeout);
		moveTimeout = setTimeout(() => {
			(mouseState as any).isMoving_ = false;
		}, 200);

		// onmove events
		((mouseState as any).handlers as { event: string; callback: (event: MouseEvent) => void }[])
			.filter(handler => handler.event === "move")
			.forEach(handler => handler.callback(event));
	}

	function onmousedown(event: MouseEvent) {
		if (event.button === 0) (mouseState as any).leftClicking_ = true;
		if (event.button === 1) (mouseState as any).rightClicking_ = true;
		if (event.button === 2) (mouseState as any).middleClicking_ = true;

		((mouseState as any).handlers as { event: string; callback: (event: MouseEvent) => void }[])
			.filter(handler => handler.event === "mousedown")
			.forEach(handler => handler.callback(event));

		clickedElement = event.target as HTMLElement;
		(mouseState as any).absolute_ = new Point2D(
			event.clientX - (clickedElement.offsetParent?.getBoundingClientRect().left ?? 0),
			event.clientY - (clickedElement.offsetParent?.getBoundingClientRect().top ?? 0),
		);
	}

	function onmouseup(event: MouseEvent) {
		if (event.button === 0) {
			(mouseState as any).leftClicking_ = false;
			(mouseState as any).isDragging_ = true;
		} else if (event.button === 1) {
			(mouseState as any).rightClicking_ = false;
		} else if (event.button === 2) {
			(mouseState as any).middleClicking_ = false;
		}

		((mouseState as any).handlers as { event: string; callback: (event: MouseEvent) => void }[])
			.filter(handler => handler.event === "mouseup")
			.forEach(handler => handler.callback(event));
	}
</script>

<svelte:document {onmousemove} {onmouseup} {onmousedown} />
