# Clara

An app for data visualization.

## Installation

Clara is in pre-alpha. You can find the latest test build [in the builds folder](https://github.com/vi013t/clara/tree/main/packages/app/builds), or build from source (see below); Note that **_things will break_**. That's what pre-alpha means. The app is literally not done yet.

### Building from source

You can build and launch the app from source yourself. You need:

- [Rust](https://rust-lang.org/)
- [Bun](https://bun.com)

To build:

```bash
git clone https://github.com/vi013t/clara.git
cd clara
bun install
bun run build # to build locally, or:
bun run install # to install onto your machine
```

If built locally, the application will be placed in `/packages/app/builds`.

## Development

Developing Clara requires:

- [Rust](https://rust-lang.org/)
- [Bun](https://bun.com)

To pull the files and start the dev server:

```bash
git clone https://github.com/vi013t/clara.git
cd clara
bun install
bun dev
```

If you run into strange caching issues at any point, run `bun clean`.
