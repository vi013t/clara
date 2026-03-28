# Clara Plugins

Clara supports user-created plugins.

## Installing a plugin

If you haven't already, install the `clara` cli:

```bash
cargo install clara-cli
```

If a plugin is uploaded to `npm` with a name like `example-plugin`, you can run:

```bash
clara add plugin example-plugin
```

## Creating a plugin

Plugins can be created using the CLI:

```bash
clara create plugin
```

The CLI will prompt you for information about your plugin.

**Note:** Due to limitations with how the plugin system works, plugins currently _cannot_ use external libraries (outside of `@clara/api`).
