use directories::ProjectDirs;
mod project;
use crate::project::{new_project, read_project, save_project, Database};
mod test;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
	tauri::Builder::default()
		.plugin(tauri_plugin_opener::init())
		.plugin(tauri_plugin_dialog::init())
		.plugin(tauri_plugin_fs::init())
		.invoke_handler(tauri::generate_handler![
			new_project,
			read_project,
			get_fonts,
			save_user_settings,
			load_user_settings,
			save_project
		])
		.run(tauri::generate_context!())
		.expect("error while running tauri application");
}

pub trait BinaryData: Sized
where
	Self: for<'a> serde::Deserialize<'a>,
	Self: serde::Serialize,
{
	fn to_bytes(&self) -> Result<Vec<u8>, String> {
		rmp_serde::to_vec(self).map_err(|e| e.to_string())
	}

	fn from_bytes(bytes: &[u8]) -> Result<Self, String> {
		rmp_serde::from_slice(bytes).map_err(|e| e.to_string())
	}
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

#[derive(serde::Serialize, serde::Deserialize)]
struct UserSettings {
	templates: Vec<Database>,
}

impl BinaryData for UserSettings {}

#[tauri::command]
fn save_user_settings(user_settings: UserSettings) -> Result<(), String> {
	let Some(project_dirs) = ProjectDirs::from("", "", "Clara") else {
		return Err("Error finding home environment".to_owned());
	};

	let storage_dir = project_dirs.config_dir();
	std::fs::create_dir_all(storage_dir).map_err(|error| format!("Error creating config directory: {error}"))?;

	let user_settings_file = storage_dir.join("settings.wd");
	std::fs::write(
		user_settings_file,
		user_settings.to_bytes().map_err(|error| format!("Error serializing user settings: {error}"))?,
	)
	.map_err(|_| "Error writing to settings file.".to_owned())?;

	Ok(())
}

#[tauri::command]
fn load_user_settings() -> Result<UserSettings, String> {
	let Some(project_dirs) = ProjectDirs::from("", "", "Clara") else {
		return Err("Error finding home environment".to_owned());
	};

	let storage_dir = project_dirs.config_dir();
	std::fs::create_dir_all(storage_dir).map_err(|_| "Error creating config directory".to_owned())?;

	let user_settings_file = storage_dir.join("settings.wd");
	let bytes = std::fs::read(user_settings_file).map_err(|_| "Error reading user settings file".to_owned())?;

	UserSettings::from_bytes(&bytes).map_err(|_| "Error deserializing user settings".to_owned())
}
