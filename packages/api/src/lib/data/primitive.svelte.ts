import type { IconIdentifier } from "@clara/api/icons";

export class PrimitiveType<T> {
	public readonly base: string;
	protected validators: ((value: T) => string | null)[] = [];

	protected constructor(base: string) {
		this.base = base;
	}

	public getError(value: T): string | null {
		for (const validator of this.validators) {
			const errorMessage = validator(value);
			if (errorMessage) return errorMessage;
		}

		return null;
	}

	public get color(): string {
		return {
			string: "#a6e3a1",
			number: "#f38ba8",
			boolean: "#89dceb",
			select: "#f9e2af",
			any: "#f5c2e7",
		}[this.base] as string;
	}
}

export class StringType extends PrimitiveType<string> {
	private length_: NumberType = $state(new NumberType());

	public constructor() {
		super("string");
	}

	public numeric(): StringType {
		this.validators.push(value => {
			if (!/^-?\d+(\.\d+)?$/.test(value)) return `This value must be a number.`;
			return null;
		});
		return this;
	}

	public length(type: NumberType): StringType {
		this.length_ = type;
		this.validators.push(value => {
			const error = this.length_.getError(value.length);
			if (error) {
				return `Length: ${error}`;
			}

			return null;
		});
		return this;
	}

	public unique(): StringType {
		this.validators.push(value => {
			const seenCharacters: Set<string> = new Set();
			for (let index = 0; index < value.length; index++) {
				const character = value.charAt(index);
				if (seenCharacters.has(character)) {
					return `Each character in this value must be unique, but the character "${character}" appears twice.`;
				}
				seenCharacters.add(character);
			}

			return null;
		});
		return this;
	}
}

export class NumberType extends PrimitiveType<number> {
	public constructor() {
		super("number");
	}

	public nonzero(): NumberType {
		this.validators.push(value => {
			if (value === 0) {
				return `This value cannot be zero.`;
			}

			return null;
		});

		return this;
	}

	public integeric(): NumberType {
		this.validators.push(value => {
			if (Math.floor(value) !== value) {
				return `This value must be an integer`;
			}

			return null;
		});

		return this;
	}

	public natural(): NumberType {
		return this.integeric().positive();
	}

	public exactly(value: number): NumberType {
		return this.max(value).min(value);
	}

	public positive(): NumberType {
		this.validators.push(value => {
			if (value <= 0) {
				return `This value must be positive.`;
			}

			return null;
		});

		return this;
	}

	public nonnegative(): NumberType {
		return this.min(0);
	}

	public min(min: number): NumberType {
		this.validators.push(value => {
			if (value < min) {
				return `This value cannot be less than ${min}.`;
			}
			return null;
		});

		return this;
	}

	public max(max: number): NumberType {
		this.validators.push(value => {
			if (value > max) {
				return `This value cannot be greater than ${max}.`;
			}
			return null;
		});

		return this;
	}
}

export class SelectType extends PrimitiveType<string> {
	private options_: { name: string; icon: IconIdentifier }[] = $state([]);

	public constructor() {
		super("select");
	}

	public get options() {
		return this.options_;
	}

	public withOptions(...options: { name: string; icon: IconIdentifier }[]): SelectType {
		this.options_ = options;
		return this;
	}
}

export class BooleanType extends PrimitiveType<boolean> {
	public constructor() {
		super("boolean");
	}
}

export class ListType extends PrimitiveType<any[]> {
	private subtype_: PrimitiveType<any>;

	public constructor(subtype: PrimitiveType<any>) {
		super("list");
		this.subtype_ = subtype;
	}

	public override get color(): string {
		return {
			string: "#a6e3a1",
			number: "#fab387",
			boolean: "#cba6f7",
			any: "#f5c2e7",
		}[this.subtype_.base] as string;
	}
}

export class ObjectType extends PrimitiveType<Record<string, PrimitiveType<any>>> {
	private properties_: Record<string, PrimitiveType<any>> = $state({});

	public constructor() {
		super("object");
	}

	public withProperties(properties: Record<string, PrimitiveType<any>>) {
		this.properties_ = properties;
		return this;
	}

	public get properties() {
		return this.properties_;
	}
}

export class AnyType extends PrimitiveType<any> {
	public constructor() {
		super("any");
	}
}
