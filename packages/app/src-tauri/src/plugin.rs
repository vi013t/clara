use tauri::http::{Request, Response};

#[tauri::command]
pub fn get_plugins() -> Result<Vec<String>, String> {
	let Some(app_dir) = directories::ProjectDirs::from("", "", "Clara") else {
		return Err("Error getting app directory".to_owned());
	};

	let plugin_dir = app_dir.config_dir().parent().unwrap().join("plugins");
	std::fs::create_dir_all(&plugin_dir).map_err(|_| "Error creating plugin directory".to_owned())?;

	let plugins = std::fs::read_dir(&plugin_dir)
		.map_err(|_| "Error reading plugin directory")?
		.filter_map(Result::ok)
		.map(|entry| entry.path().join("index.js").canonicalize().unwrap().to_str().unwrap().to_owned())
		.collect();

	Ok(plugins)
}

const PLUGIN_API: &str = include_str!("../../../../generated/plugin.js");

pub fn register_plugin_uri_scheme_protocol(request: Request<Vec<u8>>) -> Response<Vec<u8>> {
	let uri = request.uri().to_string();

	let raw_path = uri.replace("plugin://localhost/", "").replace("http://plugin.localhost/", "");
	let clean_raw_path = raw_path.split('?').next().unwrap_or(&raw_path);
	let mut path = urlencoding::decode(&clean_raw_path).unwrap_or_default().to_string();
	if cfg!(windows) && path.starts_with('/') {
		path = path.trim_start_matches('/').to_string();
	}

	if path.starts_with("virtual/") {
		let submodule = path.replace("virtual/", "");

		let js_content = match submodule.as_str() {
			"plugin.js" => Some(PLUGIN_API),
			_ => None,
		};

		if let Some(content) = js_content {
			return Response::builder()
				.header("Content-Type", "text/javascript")
				.header("Access-Control-Allow-Origin", "*")
				.header("Access-Control-Allow-Methods", "GET, OPTIONS")
				.status(200)
				.body(content.as_bytes().to_vec())
				.unwrap();
		}
	}

	match std::fs::read(&path) {
		Ok(content) => Response::builder()
			.header("Content-Type", "text/javascript")
			.header("Access-Control-Allow-Origin", "*")
			.header("Access-Control-Allow-Methods", "GET, OPTIONS")
			.status(200)
			.body(content)
			.unwrap(),
		Err(_) => Response::builder().status(404).header("Access-Control-Allow-Origin", "*").body(Vec::new()).unwrap(),
	}
}
