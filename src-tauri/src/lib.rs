use directories::ProjectDirs;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
	tauri::Builder::default()
		.plugin(tauri_plugin_opener::init())
		.plugin(tauri_plugin_dialog::init())
		.plugin(tauri_plugin_fs::init())
		.invoke_handler(tauri::generate_handler![new_project, read_project, get_fonts, save_user_settings, load_user_settings])
		.run(tauri::generate_context!())
		.expect("error while running tauri application");
}

#[derive(serde::Serialize, serde::Deserialize, PartialEq, Eq)]
struct Project {
	location: String,
	name: String,
	framework: String,
}

trait Bincodable: Sized
where
	Self: for<'a> serde::Deserialize<'a>,
	Self: serde::Serialize,
{
	fn to_bytes(&self) -> bincode::Result<Vec<u8>> {
		bincode::serialize(self)
	}

	fn from_bytes(bytes: &[u8]) -> bincode::Result<Self> {
		bincode::deserialize(bytes)
	}
}

impl Bincodable for Project {}

#[tauri::command]
async fn read_project(path: String) -> Result<Project, String> {
	let mut project_file = None;
	for file in std::fs::read_dir(&path).map_err(|_| "Error opening project directory")?.filter_map(Result::ok) {
		let Ok(file_type) = file.file_type() else {
			continue;
		};
		if !file_type.is_file() {
			continue;
		}
		let path = file.path();
		let Some(extension) = path.extension() else {
			continue;
		};
		let Some(extension_string) = extension.to_str() else {
			continue;
		};
		if extension_string == "wlfr" {
			project_file = Some(file.path());
			break;
		}
	}
	let Some(project_file) = project_file else {
		return Err("No project file found in selected location".to_owned());
	};
	let bytes = std::fs::read(project_file).map_err(|_| "Error reading project file")?;
	Project::from_bytes(&bytes).map_err(|_| "Error deserializing project".to_owned())
}

#[tauri::command]
async fn new_project(location: String, name: String, framework: String) -> Result<(), String> {
	let path = std::path::Path::new(&location).join(&name);
	std::fs::create_dir_all(&path).map_err(|_| "Error creating project directory".to_owned())?;
	std::fs::create_dir_all(path.join("assets")).map_err(|_| "Error creating assets directory".to_owned())?;
	let project = Project {
		location,
		name: name.clone(),
		framework,
	};
	std::fs::write(path.join(format!("{name}.wlfr")), project.to_bytes().map_err(|_| "Error serializing project".to_owned())?)
		.map_err(|_| "Error creating project file".to_owned())?;
	Ok(())
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

type DataRow = std::collections::HashMap<String, serde_json::Value>;

#[derive(serde::Serialize, serde::Deserialize)]
#[serde(rename_all = "camelCase")]
struct DataRowTreeNode {
	parent: Option<Box<DataRowTreeNode>>,
	children: Vec<DataRowTreeNode>,
	data: DataRow,
	is_group: bool,
}

#[derive(serde::Serialize, serde::Deserialize)]
#[serde(rename_all = "camelCase")]
struct Field {
	name: String,
	value_type: String,
}

#[derive(serde::Serialize, serde::Deserialize)]
struct ManualDataset {
	name: String,
	icon: String,
	data: DataRowTreeNode,
	fields: Vec<Field>,
	description: Option<String>,
}

#[derive(serde::Serialize, serde::Deserialize)]
enum Dataset {
	Manual(ManualDataset),
}

#[derive(serde::Serialize, serde::Deserialize)]
struct Template {
	dataset: Dataset,
	name: String,
	description: String,
}

#[derive(serde::Serialize, serde::Deserialize)]
struct UserSettings {
	templates: Vec<Template>,
}

impl Bincodable for UserSettings {}

#[tauri::command]
fn save_user_settings(user_settings: UserSettings) -> Result<(), String> {
	let Some(project_dirs) = ProjectDirs::from("", "", "Wallflower") else {
		return Err("Error finding home environment".to_owned());
	};

	let storage_dir = project_dirs.config_dir();
	std::fs::create_dir_all(storage_dir).map_err(|_| "Error creating config directory".to_owned())?;

	let user_settings_file = storage_dir.join("settings.wd");
	std::fs::write(user_settings_file, user_settings.to_bytes().map_err(|_| "Error serializing user settings".to_owned())?)
		.map_err(|_| "Error writing to settings file.".to_owned())?;

	Ok(())
}

#[tauri::command]
fn load_user_settings() -> Result<UserSettings, String> {
	let Some(project_dirs) = ProjectDirs::from("", "", "Wallflower") else {
		return Err("Error finding home environment".to_owned());
	};

	let storage_dir = project_dirs.config_dir();
	std::fs::create_dir_all(storage_dir).map_err(|_| "Error creating config directory".to_owned())?;

	let user_settings_file = storage_dir.join("settings.wd");
	let bytes = std::fs::read(user_settings_file).map_err(|_| "Error reading user settings file".to_owned())?;

	UserSettings::from_bytes(&bytes).map_err(|_| "Error deserializing user settings".to_owned())
}
