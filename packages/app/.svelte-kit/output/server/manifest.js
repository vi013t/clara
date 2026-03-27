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
		client: {start:"_app/immutable/entry/start.DUXBKWkJ.js",app:"_app/immutable/entry/app.ClWiF_3A.js",imports:["_app/immutable/entry/start.DUXBKWkJ.js","_app/immutable/chunks/DnAHTneN.js","_app/immutable/chunks/BKlAdfIx.js","_app/immutable/chunks/DSF6hJv0.js","_app/immutable/entry/app.ClWiF_3A.js","_app/immutable/chunks/BKlAdfIx.js","_app/immutable/chunks/CqL83fI8.js","_app/immutable/chunks/BkpD4Td4.js","_app/immutable/chunks/DSF6hJv0.js","_app/immutable/chunks/B9rAUB3Z.js","_app/immutable/chunks/DD5MlUUo.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
