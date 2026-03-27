use crate::BinaryData as _;

#[derive(serde::Serialize, serde::Deserialize, Clone, Debug)]
pub struct Project {
    location: String,
    database: Database,
}

impl Project {
    pub fn new(location: &str, name: &str, description: &str) -> Project {
        Project {
            location: location.to_owned(),
            database: Database {
                root: 0,
                groups: vec![Group {
                    id: 0,
                    children: Vec::new(),
                    attributes: GroupAttributes::Inherit,
                    name: name.to_owned(),
                    icon_name: "inherit".to_owned(),
                    description: description.to_owned(),
                }],
                items: Vec::new(),
            },
        }
    }
}

impl Database {
    fn root(&self) -> &Group {
        self.groups
            .iter()
            .find(|group| group.id == self.root)
            .unwrap()
    }
}

impl crate::BinaryData for Project {}

type Id = u32;

#[derive(serde::Serialize, serde::Deserialize, Clone, Debug)]
pub struct Database {
    root: Id,
    groups: Vec<Group>,
    items: Vec<Item>,
}

#[derive(serde::Serialize, serde::Deserialize, Clone, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Group {
    id: Id,
    children: Vec<Id>,

    name: String,
    description: String,
    icon_name: String,
    attributes: GroupAttributes,
}

#[derive(serde::Serialize, serde::Deserialize, Clone, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Item {
    id: Id,

    attributes: std::collections::HashMap<String, Option<AttributeValue>>,
}

#[derive(serde::Serialize, serde::Deserialize, Clone, Debug)]
#[serde(rename_all = "camelCase", tag = "type")]
pub enum GroupAttributes {
    Inherit,
    Own { own: Vec<AttributeDefinition> },
}

#[derive(serde::Serialize, serde::Deserialize, Clone, Debug)]
#[serde(rename_all = "camelCase")]
pub struct AttributeDefinition {
    name: String,
    r#type: String,
    id: Id,
    group_id: Id,
}

#[derive(serde::Serialize, serde::Deserialize, Clone, Debug)]
#[serde(rename_all = "camelCase", tag = "type")]
pub enum AttributeValue {
    Number { value: f64 },
    Color { value: String },
    ShortText { value: String },
    LongText { value: RichText },
    Length { value: Measurement },
    Weight { value: Measurement },
    Entries { value: Vec<Id> },
}

#[derive(serde::Serialize, serde::Deserialize, Clone, Debug)]
pub struct RichText {
    parts: Vec<StyledText>,
}

#[derive(serde::Serialize, serde::Deserialize, Clone, Debug)]
pub struct StyledText {
    text: String,
    style: Style,
}

#[derive(serde::Serialize, serde::Deserialize, Clone, Debug)]
pub struct Style {
    bold: bool,
    italic: bool,
}

#[derive(serde::Serialize, serde::Deserialize, Clone, Debug)]
pub struct Measurement {
    count: f64,
    unit: String,
}

pub fn read_project(path: String) -> Result<Project, String> {
    let mut project_file = None;
    for file in std::fs::read_dir(&path)
        .map_err(|_| "Error opening project directory")?
        .filter_map(Result::ok)
    {
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
        if extension_string == "clara" {
            project_file = Some(file.path());
            break;
        }
    }
    let Some(project_file) = project_file else {
        return Err("No project file found in selected location".to_owned());
    };
    let bytes = std::fs::read(project_file).map_err(|_| "Error reading project file")?;
    Project::from_bytes(&bytes).map_err(|error| format!("Error deserializing project: {error}"))
}

pub fn new_project(project: Project) -> Result<(), String> {
    let path = std::path::Path::new(&project.location).join(&project.database.root().name);
    std::fs::create_dir_all(&path).map_err(|_| "Error creating project directory".to_owned())?;
    std::fs::create_dir_all(path.join("assets"))
        .map_err(|_| "Error creating assets directory".to_owned())?;
    std::fs::write(
        path.join(format!("{}.clara", project.database.root().name)),
        project
            .to_bytes()
            .map_err(|_| "Error serializing project".to_owned())?,
    )
    .map_err(|_| "Error creating project file".to_owned())?;
    Ok(())
}

pub fn save_project(project: Project) -> Result<(), String> {
    std::fs::write(
        std::path::Path::new(&project.location)
            .join(format!("{}.clara", project.database.root().name)),
        project
            .to_bytes()
            .map_err(|_| "Error serializing project".to_owned())?,
    )
    .map_err(|_| "Error writing to project file".to_owned())
}
