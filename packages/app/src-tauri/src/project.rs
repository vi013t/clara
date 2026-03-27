#[tauri::command]
pub fn read_project(path: String) -> Result<Project, String> {
	clara_api::project::read_project(path)
}

#[tauri::command]
pub fn new_project(project: Project) -> Result<(), String> {
	clara_api::project::new_project(project)
}

#[tauri::command]
pub fn save_project(project: Project) -> Result<(), String> {
	clara_api::project::save_project(project);
}
