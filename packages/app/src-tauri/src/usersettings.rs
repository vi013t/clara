#[tauri::command]
pub fn save_user_data(data: clara_api::usersettings::UserSettings) -> Result<(), String> {
	clara_api::usersettings::save_user_data(data)
}
