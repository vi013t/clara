

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const universal = {
  "ssr": false
};
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.DM0XTMHX.js","_app/immutable/chunks/DwzWcyEo.js","_app/immutable/chunks/cqX1MtS0.js","_app/immutable/chunks/D9Ptw1rF.js","_app/immutable/chunks/Dz56NASM.js"];
export const stylesheets = [];
export const fonts = [];
