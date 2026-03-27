NPM ?= bun

.PHONY: clean all build dev build-api preprocess build-plugins

make: build

preprocess:
	$(NPM) scripts/generate_plugin_bridge.ts

dev: build-api
	$(NPM) run dev

build-api:
	cd packages/api && $(NPM) run build
	$(MAKE) preprocess

build: build-api build-plugins
	$(NPM) install
	$(NPM) run build

build-plugins:
	cd packages/plugins/novel && $(NPM) run build && rm $(APPDATA)/Clara/plugins/* -rf && cp -r dist $(APPDATA)/Clara/plugins/novel

clean:
	rm -rf node_modules bun.lock bun.lockb
	rm -rf **/node_modules **/bun.lock **/bun.lockb
	rm -rf **/dist **/build **/src-tauri/target
	bun pm cache rm