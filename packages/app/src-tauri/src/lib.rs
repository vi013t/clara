mod project;
use crate::{
	plugin::{get_plugins, register_plugin_uri_scheme_protocol},
	project::{new_project, read_project, save_project},
	usersettings::save_user_data,
};
mod plugin;
mod usersettings;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
	tauri::Builder::default()
		.register_uri_scheme_protocol("plugin", |_app, request| register_plugin_uri_scheme_protocol(request))
		.plugin(tauri_plugin_opener::init())
		.plugin(tauri_plugin_dialog::init())
		.plugin(tauri_plugin_fs::init())
		.invoke_handler(tauri::generate_handler![new_project, read_project, get_fonts, save_project, save_user_data, get_plugins])
		.run(tauri::generate_context!())
		.expect("error while running tauri application");
}

#[tauri::command]
async fn get_fonts() -> Vec<String> {
	let mut fonts = font_enumeration::Collection::new()
		.unwrap()
		.all()
		.map(|font| font.family_name.clone())
		.collect::<Vec<String>>();
	fonts.sort();
	fonts.dedup();
	fonts
}
