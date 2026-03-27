#[tauri::command]
pub fn save_user_data(data: clara_api::userdata::UserData) -> Result<(), String> {
	clara_api::userdata::save_user_data(data)
}
