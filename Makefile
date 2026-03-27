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
	rm packages/app/node_modules -rf
	rm packages/app/build -rf
	rm packages/app/src-tauri/target -rf
	rm packages/api/node_modules -rf
	rm packages/api/dist -rf