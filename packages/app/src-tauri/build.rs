use std::{env, fs, path::Path};

fn main() {
	// compile_cli();
	generate_plugin_bridge_macro();
	tauri_build::build();
}

fn generate_plugin_bridge_macro() {
	let out_dir = env::var("OUT_DIR").unwrap();
	let dest_path = Path::new(&out_dir).join("generated_api_map.rs");

	let gen_path = Path::new("../../../generated");
	println!("cargo:rerun-if-changed={}", gen_path.display());

	let mut match_arms = String::new();

	if let Ok(entries) = fs::read_dir(gen_path) {
		for entry in entries.flatten() {
			let path = entry.path();
			if path.extension().and_then(|s| s.to_str()) == Some("js") {
				let file_name = path.file_name().unwrap().to_str().unwrap();
				let absolute_path = path.canonicalize().unwrap();
				let escaped_path = absolute_path.to_str().unwrap().replace("\\", "\\\\");

				match_arms.push_str(&format!("\t\t\t\"{}\" => Some(include_str!(\"{}\")),\n", file_name, escaped_path));
			}
		}
	}

	let content = format!(
		"macro_rules! get_virtual_api {{
	($name:expr) => {{
		match $name {{
{}
			_ => None,
		}}
	}};
}}",
		match_arms
	);

	fs::write(dest_path, content).unwrap();
}

fn compile_cli() {
	let cli_project_dir = "../../../tools/clara-cli";
	let target_binary = "../../../tools/clara-cli/target/release/clara.exe";
	let destination = "bin/clara.exe";

	let status = std::process::Command::new("cargo")
		.args(&["build", "--release"])
		.current_dir(cli_project_dir)
		.status()
		.expect("Failed to build CLI");

	if status.success() {
		std::fs::create_dir_all("bin").unwrap();
		std::fs::copy(target_binary, destination).expect("Failed to copy CLI binary");
	}

	println!("cargo:rerun-if-changed=../../../clara-cli/src");
}
