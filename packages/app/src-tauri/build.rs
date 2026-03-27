use std::{env, fs, path::Path};

fn main() {
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
	tauri_build::build();
}
