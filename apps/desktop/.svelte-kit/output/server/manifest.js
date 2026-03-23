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
		client: {start:"_app/immutable/entry/start.BQgxicRt.js",app:"_app/immutable/entry/app.DYhDrg2M.js",imports:["_app/immutable/entry/start.BQgxicRt.js","_app/immutable/chunks/CvJP_YN6.js","_app/immutable/chunks/CM3IyF1N.js","_app/immutable/chunks/Coxf4pLH.js","_app/immutable/entry/app.DYhDrg2M.js","_app/immutable/chunks/CM3IyF1N.js","_app/immutable/chunks/OB8_tYIV.js","_app/immutable/chunks/eChS_UJr.js","_app/immutable/chunks/Coxf4pLH.js","_app/immutable/chunks/J62fGBks.js","_app/immutable/chunks/4jV4CTR3.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
