NPM=bun

.PHONY: clean all build dev

make: build

dev:
	$(NPM) run dev

build:
	$(NPM) install
	$(NPM) run build

clean:
	rm node_modules -rf
	rm apps/desktop/node_modules -rf
	rm apps/desktop/build -rf
	rm apps/desktop/src-tauri/target -rf
	rm packages/api/node_modules -rf