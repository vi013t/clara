// running this script automatically installs the plugin locally for you
// this script is automatially run during postbuild (after build)

import fs from "fs";
import os from "os";
import path from "path";

const pluginIdentifier = "%PLUGIN_IDENTIFIER%";

let dataDir: string;
if (process.platform === "win32") {
	dataDir = process.env.APPDATA as string;
} else if (process.platform === "darwin") {
	dataDir = path.join(os.homedir(), "Library", "Application Support");
} else {
	dataDir = path.join(os.homedir(), ".local", "share");
}

const targetDir = path.join(dataDir, "Clara", "plugins", pluginIdentifier);

fs.cpSync("dist", targetDir, { recursive: true, force: true });
