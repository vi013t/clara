# Clara Plugin System

The plugin system is pretty complicated so I'm going to explain it thoroughly here.

## The Problem

Plugins live at `AppData/Clara/plugins` (on Windows at least, paths may vary). Let's say we have a plugin called `example-plugin`. Then, it's main file might live at `AppData/Clara/plugins/example-plugin/main.js`, for example.

This is outside the main project. Tauri uses a webview to run the application, which **can't dynamically import arbitrary files at runtime**. To do this would require a frontend running through node with something like Electron.

## The System

The working plugin system has a lot of moving parts that all work together to make the magic happen.

First, the list of all plugins on the user's system is loaded through the Rust backend (`/packages/app/src-tauri/src/plugin.rs` at `get_plugins()`). This is called on the frontend from `/packages/api/src/lib/index.svelte.ts` in `loadPlugins()`.

Next, plugins are routed through a custom URI scheme protocol, `plugin://`. This allows tauri to intercept plugin requests and handle them specially. Each plugin path fetched from the previous step is modified to include this scheme, in `/packages/api/src/lib/index.svelte.ts` at `loadPlugin()`.

In the Rust backend, when creating our tauri loader, we call `.register_uri_scheme_protocol()` in `/packages/app/src-tauri/src/lib.rs`. This passes the call to `register_plugin_uri_scheme_protocol` in `/packages/app/src-tauri/src/plugin.rs`.

In that function, the custom URI scheme protocol is handled. Essentially, when the frontent requests a file using that URI scheme, tauri runs it through that function in a standard HTTP `Request` and `Response` format. The function finds the specific submodule being requested (like `@clara/api/plugin` or `@clara/api/data`, and serves a _generated JavaScript file_ that corresponds to that module.

The generated modules live in `/generated`, and are generated with the build script `/scripts/generate_plugin_bridge.ts`. This script looks at each submodule and generates a JavaScript file that exposes all of the module's exports that've been placed on `globalThis`.

The properties are placed on `globalThis` in `/packages/api/src/lib/index.svelte.ts`. This goes through each API module and adds its exports to `globalThis` so that the generated scripts can access them, and therefore the plugins.

Now, plugins will attempt to import things from the API using standard es6 syntax like `import { plugin } from "@clara/api/plugin"`. This won't work on the frontend because of how the module is imported and loaded dynamically. To fix this, we use an _import map_. An import map is a script attached to the document that's basically just a `Map` which says "when something tries to import X file, serve Y instead". In our import map, We point the imports to virtual ones that use our plugin URI scheme protocol, allowing Tauri to handle it in the back as described above. The import map creation happens in `/packages/api/src/lib/index.svelte.ts` in `createImportMap()`.

Finally, the plugin can be loaded using dyanmic es6 `import()` syntax. This happens in `/packages/api/src/lib/index.svelte.ts` in `loadPlugin()`.
