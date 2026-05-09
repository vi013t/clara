import path, { join } from "node:path";
import { homedir } from "node:os";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import { exit } from "node:process";

console.log("Installing plugins...");

const isWindows = process.platform === "win32";
const configBase = isWindows ? process.env.APPDATA! : join(homedir(), ".config");
const pluginDir = join(configBase, "Clara", "plugins");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");
const projectPluginsDir = path.join(projectRoot, "packages", "plugins");
if (!fs.existsSync(projectPluginsDir)) exit();
fs.rmSync(pluginDir, { recursive: true, force: true });
fs.mkdirSync(pluginDir);

for (let plugin of fs.readdirSync(projectPluginsDir)) {
	const pluginName = plugin;
	console.log(`\tInstalling plugin "${pluginName}"`);
	const pluginFiles = path.join(projectPluginsDir, pluginName, "dist");
	fs.mkdirSync(path.join(pluginDir, pluginName));
	fs.cpSync(pluginFiles, path.join(pluginDir, pluginName), { recursive: true });
	console.log(`\tInstalled plugin "${pluginName}"`);
}

console.log("Done! Plugins installed");
