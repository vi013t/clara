/*

The plugin system is pretty complicate so I'm going to explain it thoroughly here.

The problem

*/

import * as plugin from "../packages/api/src/lib/plugin/index.svelte";
import fs from "node:fs";

const submodules = [{ name: "plugin", data: plugin }];

submodules.forEach(({ name, data }) => {
	const keys = Object.keys(data);
	const bridgeCode = `
        const internal = globalThis.__CLARA_API__.${name};
        ${keys.map(variable => `export const ${variable} = internal.${variable};`).join("\n")}
    `;

	fs.writeFileSync(`./generated/${name}.js`, bridgeCode);
});
