#[tauri::command]
pub fn save_user_data(data: UserData) -> Result<(), String> {
	clara_api::save_user_data(data)
}
