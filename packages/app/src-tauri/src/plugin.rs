use tauri::http::{Request, Response};

#[tauri::command]
pub fn get_plugins() -> Result<Vec<String>, String> {
	clara_api::plugin::get_plugins()
}

include!(concat!(env!("OUT_DIR"), "/generated_api_map.rs"));

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
		let js_content = get_virtual_api!(submodule.as_str());

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
