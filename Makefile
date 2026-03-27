NPM ?= bun

ifeq ($(OS),Windows_NT)
    CONFIG_DIR := $(subst \,/,$(APPDATA))
else
    CONFIG_DIR := $(HOME)/.config
endif

PLUGIN_DIR := $(CONFIG_DIR)/Clara/plugins

.PHONY: clean all build dev build-api preprocess build-plugins

make: build

preprocess:
	$(NPM) scripts/generate_plugin_bridge.ts

dev: build-plugins
	$(NPM) run dev

build-api:
	cd packages/api && $(NPM) run build
	$(MAKE) preprocess

build: build-plugins
	$(NPM) install
	$(NPM) run build

build-plugins: build-api
	rm -rf $(PLUGIN_DIR)/*
	for dir in packages/plugins/*; do \
		cd $$dir && \
		$(NPM) run build && \
		cp -r dist $(PLUGIN_DIR)/$$(basename $$dir); \
	done

clean:
	rm generated
	rm -rf node_modules bun.lock bun.lockb
	rm -rf **/node_modules **/bun.lock **/bun.lockb
	rm -rf **/dist **/build **/target
	bun pm cache rm