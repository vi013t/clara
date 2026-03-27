import { $ } from "bun";
import { intro, select, text } from "@clack/prompts";
import { mkdirSync, writeFileSync } from "fs";

console.log("");

intro("create-clara-plugin");

const name = (await text({
	message: "What is your plugin called?",
	placeholder: "clara-plugin-example",
	validate(value) {
		if (!value?.length) return `Name is required!`;
	},
})) as string;

const description = (await text({
	message: "What is your plugin description?",
	placeholder: "An example plugin.",
	defaultValue: "An example plugin.",
})) as string;

const packageManager = (await select({
	message: "What package manager do you want to use?",
	options: [
		{ value: "bun", label: "bun" },
		{ value: "pnpm", label: "pnpm" },
		{ value: "npm", label: "npm" },
		{ value: "yarn", label: "yarn" },
	],
})) as string;

console.log("");
console.log("Generating plugin...");

console.log("\tCreating files...");
mkdirSync(`${name}`);
await $`bunx sv create ${name} --template library --types ts --install ${packageManager} --add prettier`;
await $`cd ${name} && bun install @clara/api`;

writeFileSync(
	`./${name}/src/lib/index.ts`,
	`import { plugin } from "@clara/api/plugin";
    
export default plugin({
	name: "${name}",
	description: "${description}",
	onLoad() {
		console.log("Hello from ${name}");
	},
});`,
);

console.log("Done!");
