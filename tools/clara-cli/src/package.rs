pub struct PackageManager {
	pub name: &'static str,
	pub execute: &'static str,
	pub typescript: bool,
}

pub static PACKAGE_MANAGERS: &[PackageManager] = &[
	PackageManager {
		name: "bun",
		execute: "bunx",
		typescript: true,
	},
	PackageManager {
		name: "pnpm",
		execute: "pnpm dlx",
		typescript: false,
	},
	PackageManager {
		name: "deno",
		execute: "deno run",
		typescript: true,
	},
	PackageManager {
		name: "yarm",
		execute: "yarn dlx",
		typescript: false,
	},
	PackageManager {
		name: "npm",
		execute: "npx",
		typescript: false,
	},
];
