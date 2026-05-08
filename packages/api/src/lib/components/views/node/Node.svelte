<script module>
	export type Type = "number" | "string" | "boolean" | "item" | "any" | "group" | "list";
	export type NodeCategory = "value" | "operation" | "data";

	export const nodeCategoryColors = {
		value: "var(--green)",
		operation: "var(--indigo)",
		data: "var(--yellow)",
	};

	export type NodeParameter = {
		type: Type;
		subtype?: Type;
		required?: boolean;
	};

	export type NodeNodeArgument = {
		node: NodeInstance;
		outputName: string;
	};

	export type NodeArgument = NodeNodeArgument | { value: any; type: Type };

	export type NodeType = {
		name: string;
		inputs: { [key: string]: NodeParameter };
		outputs: { [key: string]: NodeParameter };
		categories: NodeCategory[];
	};

	export type NodeInstance = {
		type: NodeType;
		inputs: { [key: string]: NodeArgument };
		outputs: { [key: string]: NodeArgument };
		x: number;
		y: number;
		id: number;
	};

	let allNodes: NodeType[] = $state([
		{
			name: "Create Item",
			inputs: { name: { type: "string", required: true }, attributes: { type: "list" } },
			outputs: { item: { type: "item" } },
			categories: ["data"],
		},
		{
			name: "Store",
			inputs: { entry: { type: "any" }, location: { type: "group" } },
			outputs: {},
			categories: ["data"],
		},
		{
			name: "Group",
			inputs: { group: { type: "group" } },
			outputs: { group: { type: "group" } },
			categories: ["value"],
		},
		{
			name: "Create Attribute",
			inputs: { name: { type: "string", required: true }, value: { type: "any", required: true } },
			outputs: { attribute: { type: "any" } },
			categories: ["data"],
		},
		{
			name: "Input",
			inputs: { name: { type: "string", required: true }, type: { type: "any" }, value: { type: "any" } },
			outputs: { attribute: { type: "any" } },
			categories: ["value"],
		},
		{
			name: "Concatenate",
			inputs: { left: { type: "string", required: true }, right: { type: "string", required: true } },
			outputs: { result: { type: "string" } },
			categories: ["operation"],
		},
		{
			name: "Text",
			inputs: { text: { type: "string" } },
			outputs: { text: { type: "string" } },
			categories: ["value"],
		},
	] as NodeType[]);

	export function nodes() {
		return allNodes;
	}

	let nextID = $state(0);

	export function node(name: string): NodeInstance {
		return {
			type: nodes().find(node => node.name === name)!,
			inputs: {},
			outputs: {},
			x: 0,
			y: 0,
			id: nextID++,
		};
	}

	export const typeColors: { [Key in Type]: string } = {
		string: "var(--green)",
		number: "var(--orange)",
		boolean: "var(--purple)",
		item: "var(--purple)",
		any: "var(--indigo)",
		group: "var(--pink)",
		list: "var(--teal)",
	};
</script>

<script lang="ts">
	import { Icon, mouse } from "@clara/api/components";
	import { type Camera } from "@clara/api/camera";

	let {
		node = $bindable(),
		camera,
		canPan = $bindable(),
		onmove = () => {},
	}: { node: NodeInstance; camera: Camera; canPan: boolean; onmove?: () => void } = $props();

	let outputs: { [key: string]: HTMLElement } = $state({});
	let inputs: { [key: string]: HTMLElement } = $state({});

	function position(element: HTMLElement, parent: Element) {
		return [
			element.getBoundingClientRect().left - parent.getBoundingClientRect().left,
			element.getBoundingClientRect().top - parent.getBoundingClientRect().top,
		];
	}

	export function inputPosition(parent: Element, inputName: string): [number, number] {
		let element = inputs[inputName];
		let [x, y] = position(element, parent);
		let rect = element.getBoundingClientRect();
		return [x + rect.width / 2, y + rect.height / 2];
	}

	export function outputPosition(parent: Element, outputName: string): [number, number] {
		let element = outputs[outputName];
		let [x, y] = position(element, parent);
		let rect = element.getBoundingClientRect();
		return [x + rect.width / 2, y + rect.height / 2];
	}

	let grabbed = $state(false);

	function grab() {
		grabbed = true;
		canPan = false;
	}

	function release() {
		grabbed = false;
		canPan = true;
	}

	mouse().onRelease(() => release());

	mouse().onMove(event => {
		if (grabbed) {
			let delta: [number, number] = [event.movementX * camera.getScale().x, event.movementY * camera.getScale().y];
			node.x += delta[0];
			node.y += delta[1];
			onmove();
		}
	});
</script>

<div
	class="node"
	style:left="{node.x}px"
	style:top="{node.y}px"
	style:border-color={grabbed ? nodeCategoryColors[node.type.categories[0]] : "var(--border)"}
>
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<h1 style:background-color={nodeCategoryColors[node.type.categories[0]]} onmousedown={grab}>{node.type.name}</h1>
	<div class="attributes">
		{#each Object.entries(node.type.outputs).filter(([name, type]) => !(name in node.type.inputs)) as [outputName, type]}
			<div class="output">
				<div class="output-name">{outputName}</div>
				<div style:background-color={typeColors[type.type]} class="output-circle" bind:this={outputs[outputName]}></div>
			</div>
		{/each}
		<div class="inputs">
			<div class="input-names">
				{#each Object.entries(node.type.inputs) as [inputName, type]}
					<div
						class="input input-name"
						style:color={type.required && !node.inputs[inputName] ? "var(--red)" : "var(--foreground)"}
					>
						<div
							style:background-color={typeColors[type.type]}
							bind:this={inputs[inputName]}
							class="input-circle"
							style:border={type.required && !node.inputs[inputName] ? "3px solid var(--red)" : "none"}
						></div>
						{inputName}
						{#if type.type === "list"}
							<span style="color: var(--foreground-dark)">(1)</span>
						{/if}
					</div>
					{#if type.type === "list"}
						<div
							class="input input-name"
							style:color={type.required && !node.inputs[inputName] ? "var(--red)" : "var(--foreground)"}
						>
							<div style:background-color="var(--background)" style:border="1px solid var(--border)" class="input-circle">
								<Icon name="Plus" size={12} color="var(--foreground-dark)" />
							</div>
						</div>
					{/if}
				{/each}
			</div>
			<div class="input-inputs">
				{#each Object.entries(node.type.inputs) as [name, type]}
					<div class="cell">
						{#if !node.inputs[name] || "value" in node.inputs[name]}
							{#if type.type === "string"}
								{#if node.inputs[name]}
									<input class="input input-value string-attribute" bind:value={node.inputs[name].value} />
								{/if}
							{/if}
						{/if}
					</div>
				{/each}
			</div>
			<div class="input-outputs">
				{#each Object.entries(node.type.inputs) as [inputName, type]}
					<div class="output">
						<div
							style:background-color={Object.entries(node.outputs).find(([name, type]) => name === inputName)
								? typeColors[type.type]
								: "var(--background)"}
							class="output-circle"
							bind:this={outputs[inputName]}
						></div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	h1 {
		color: var(--background-dark);
		font-size: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0.25rem;
		border-top-left-radius: 0.25rem;
		border-top-right-radius: 0.25rem;
	}

	.node {
		border-radius: 0.25rem;
		border-width: 1px;
		border-style: solid;
		width: fit-content;
		background-color: var(--background);
		box-shadow: 0px 0px 0.5rem black;
		position: absolute;
	}

	.attributes {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.output-name {
		font-size: 0.85rem;
		color: var(--foreground);
		text-transform: capitalize;
	}

	.output {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: 1rem;
		position: relative;
		right: -1.5rem;
	}

	.output-circle {
		border: 1px solid var(--border);
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		background-color: var(--indigo);
		cursor: pointer;
	}

	.input-circle {
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.string-attribute {
		background-color: var(--background-darker);
		border-radius: 0.25rem;
		padding: 0.25rem;
		color: var(--foreground);
	}

	.inputs {
		display: flex;
		width: 100%;
	}

	.input-names {
		display: flex;
		flex-direction: column;

		> * {
			height: 1.75rem;
			flex-basis: 1.75rem;
		}
	}

	.input-inputs {
		display: flex;
		flex-direction: column;
		width: 10rem;

		> * {
			height: 1.75rem;
			flex-basis: 1.75rem;
		}
	}

	.input-outputs {
		display: flex;
		flex-direction: column;

		> * {
			height: 1.75rem;
			flex-basis: 1.75rem;
		}
	}

	.input {
		height: 1.5rem;
	}

	.input-value {
		width: 10rem;
	}

	.input-name {
		color: var(--foreground);
		text-transform: capitalize;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		position: relative;
		left: -1.5rem;
		line-height: 0px;
	}

	.cell {
		display: flex;
		align-items: center;
	}
</style>
