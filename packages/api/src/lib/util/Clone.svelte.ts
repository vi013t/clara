export interface Cloneable<T extends Cloneable<T>> {
	/**
	 * Creates a deep clone of this value.
	 *
	 * Any objects that store some sort of unique ID will **not have the same ID as the cloned object**.
	 *
	 * Objects which are immutable may just return themselves.
	 */
	clone(): T;
}

export class ImmutableContainer<T extends Cloneable<T>> {
	protected data: T;

	public constructor(data: T) {
		this.data = $state(data);
	}

	public clone(): T {
		if (Array.isArray(this.data)) return this.data.map(item => item.clone()) as unknown as T;
		return this.data.clone();
	}

	public cloneContainer(): Container<T> {
		return new Container(this.clone());
	}

	public ref(): T {
		return this.data;
	}
}

/**
 * A safety container for cloneable objects that forces the caller to explicitly state if they
 * would like to clone or reference the object. We're working with a lot of databases here -
 * copying databases from templates to project, editing project databases in place, editing
 * template databases in place, cloning templates, etc. This helps prevent bugs where objects
 * are accidentally not cloned and are mistakenly overwritten instead.
 *
 * **Example:**
 *
 * ```ts
 * let container = new Container(value);
 *
 * let clone = container.clone(); // clone the object
 * let reference = container.ref(); // reference the object
 *
 * let invalid = container.value // object is not accessible directly
 * ```
 *
 * To use `Container` effectively, use it for **return types**, and **not parameters**. let the caller
 * pass the objects as-is, but when *retrieving* and object, make them decide whether to clone or reference
 * it.
 *
 * `Container` also provides an `overwrite()` method to set the value. To use this effectively, ensure
 * all `Container` instances are const or readonly. This way, callers must explicitly state that they
 * are overwriting the original value, not a clone. `ImmutableContainer` also exists without this method.
 */
export class Container<T extends Cloneable<T>> extends ImmutableContainer<T> {
	public overwrite(data: T): void {
		this.data = data;
	}

	public bindSet() {
		return (value: T) => {
			this.overwrite(value);
		};
	}

	public bindGet() {
		return () => this.ref();
	}
}

export function refs<T extends Cloneable<T>>(objects: Container<T>[]): T[] {
	return objects.map(value => value.ref());
}

export function clones<T extends Cloneable<T>>(objects: Container<T>[]): T[] {
	return objects.map(value => value.clone());
}
