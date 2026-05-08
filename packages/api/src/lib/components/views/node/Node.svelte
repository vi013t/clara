<script module>
	export type Type = "number" | "string" | "boolean" | "item" | "any";

	export type NodeType = {
		name: string;
		inputs: { [key: string]: Type };
		outputs: { [key: string]: Type };
	};

	export type NodeInstance = {
		type: NodeType;
		inputs: { [key: string]: NodeInstance };
		outputs: { [key: string]: NodeInstance };
	};

	let allNodes: NodeType[] = $state([
		{
			name: "Item",
			inputs: { item: "item" },
			outputs: { item: "item" },
		},
		{
			name: "Attribute",
			inputs: { item: "item", name: "string" },
			outputs: { value: "any" },
		},
		{
			name: "Concatenate",
			inputs: { left: "string", right: "string" },
			outputs: { result: "string" },
		},
	] as NodeType[]);

	export function nodes() {
		return allNodes;
	}

	export function node(name: string): NodeInstance {
		return {
			type: nodes().find(node => node.name === name)!,
			inputs: {},
			outputs: {},
		};
	}
</script>

<script lang="ts">
	let { node }: { node: NodeInstance } = $props();

	const typeColors: { [Key in Type]: string } = {
		string: "var(--green)",
		number: "var(--orange)",
		boolean: "var(--purple)",
		item: "var(--red)",
		any: "var(--indigo)",
	};
</script>

<div class="node">
	<h1>{node.type.name}</h1>
	<div class="attributes">
		{#each Object.entries(node.type.outputs) as [name, type]}
			<div class="output">
				<div class="output-name">{name}</div>
				<div class="output-circle"></div>
			</div>
		{/each}
		<div class="inputs">
			<div class="input-names">
				{#each Object.entries(node.type.inputs) as [name, type]}
					<div class="input input-name">
						<div style:background-color={typeColors[type]} class="input-circle"></div>
						{name}
					</div>
				{/each}
			</div>
			<div class="input-inputs">
				{#each Object.entries(node.type.inputs) as [name, type]}
					{#if type === "string"}
						<input class="input input-value string-attribute" />
					{/if}
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	h1 {
		color: var(--background-dark);
		font-size: 1rem;
		background-color: var(--indigo);
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0.25rem;
		border-top-left-radius: 0.25rem;
		border-top-right-radius: 0.25rem;
	}

	.node {
		border-radius: 0.25rem;
		border: 1px solid var(--border);
		width: fit-content;
		background-color: var(--background);
		box-shadow: 0px 0px 0.5rem black;
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
	}

	.input-circle {
		border: 1px solid var(--border);
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
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
		gap: 0.5rem;
	}

	.input-names {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.input-inputs {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
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
	}
</style>
