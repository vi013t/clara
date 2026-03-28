use crate::{project::Database, BinaryData};

#[derive(serde::Serialize, serde::Deserialize, Clone, Debug)]
pub struct UserSettings {
	templates: Vec<Database>,
}

impl BinaryData for UserSettings {}

pub fn save_user_data(data: UserSettings) -> Result<(), String> {
	let Some(app_dir) = directories::ProjectDirs::from("", "", "Clara") else {
		return Err("Error getting app directory".to_owned());
	};

	std::fs::create_dir_all(app_dir.data_dir()).map_err(|_| "Error creating app data directory".to_owned())?;

	std::fs::write(
		app_dir.data_dir().join("usersettings.clarb"),
		data.to_bytes().map_err(|_| "Error serializing user data".to_owned())?,
	)
	.map_err(|_| "Error writing to project file".to_owned())
}
