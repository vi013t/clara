# Clara

An app for data visualization.

## Installation

Clara is in alpha. You can find the latest test build [in the builds folder](https://github.com/vi013t/clara/tree/main/packages/app/builds), or build from source (see below).

### Building from source

You can build and launch the app from source yourself. You need:

- [Rust](https://rust-lang.org/)
- [Bun](https://bun.com)

To build:

```bash
git clone https://github.com/vi013t/clara.git
cd clara
bun install
bun run build
```

The application will be placed in `/packages/app/builds`.

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
