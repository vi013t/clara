pub fn get_plugins() -> Result<Vec<String>, String> {
	let Some(app_dir) = directories::ProjectDirs::from("", "", "Clara") else {
		return Err("Error getting app directory".to_owned());
	};

	let plugin_dir = app_dir.config_dir().parent().unwrap().join("plugins");
	std::fs::create_dir_all(&plugin_dir).map_err(|_| "Error creating plugin directory".to_owned())?;

	let plugins = std::fs::read_dir(&plugin_dir)
		.map_err(|_| "Error reading plugin directory")?
		.filter_map(Result::ok)
		.map(|entry| entry.path().join("main.js").canonicalize().unwrap().to_str().unwrap().to_owned())
		.collect();

	Ok(plugins)
}
