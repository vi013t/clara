export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.DoBM616l.js",app:"_app/immutable/entry/app.BwiXPH7J.js",imports:["_app/immutable/entry/start.DoBM616l.js","_app/immutable/chunks/DgmH74kW.js","_app/immutable/chunks/cqX1MtS0.js","_app/immutable/chunks/Dpba3mj_.js","_app/immutable/entry/app.BwiXPH7J.js","_app/immutable/chunks/cqX1MtS0.js","_app/immutable/chunks/D-u8wt_n.js","_app/immutable/chunks/DwzWcyEo.js","_app/immutable/chunks/Dpba3mj_.js","_app/immutable/chunks/3rtwB7gb.js","_app/immutable/chunks/Dz56NASM.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
