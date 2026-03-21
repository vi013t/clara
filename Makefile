NPM=bun

.PHONY: clean all build dev

make: build

dev:
	$(NPM) run tauri dev

build:
	$(NPM) install
	$(NPM) run tauri build

clean:
	rm node_modules -rf
	rm src-tauri/target -rf
	rm build -rf