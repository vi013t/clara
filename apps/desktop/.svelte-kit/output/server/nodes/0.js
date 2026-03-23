

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const universal = {
  "ssr": false
};
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.BtaHt_z2.js","_app/immutable/chunks/eChS_UJr.js","_app/immutable/chunks/CM3IyF1N.js","_app/immutable/chunks/BcmUV0fO.js","_app/immutable/chunks/4jV4CTR3.js"];
export const stylesheets = [];
export const fonts = [];
