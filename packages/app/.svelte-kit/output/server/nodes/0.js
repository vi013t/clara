

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const universal = {
  "ssr": false
};
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.OEX6_Gqd.js","_app/immutable/chunks/BkpD4Td4.js","_app/immutable/chunks/BKlAdfIx.js","_app/immutable/chunks/6sds28cC.js","_app/immutable/chunks/DD5MlUUo.js"];
export const stylesheets = [];
export const fonts = [];
