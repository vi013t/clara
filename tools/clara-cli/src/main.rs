use std::{io::Write as _, time::Duration};
mod icons;
mod package;

use clap::Parser as _;
use colored::Colorize as _;
use indicatif::{ProgressBar, ProgressStyle};
use serde::Serialize as _;
use serde_json::{Value, ser::PrettyFormatter};

#[derive(clap::Parser)]
struct CommandLineArguments {
	#[command(subcommand)]
	command: Command,
}

#[derive(clap::Subcommand)]
enum Command {
	#[command(alias = "new")]
	Create { kind: CreateKind },
}

#[derive(clap::Parser, clap::ValueEnum, Clone)]
enum CreateKind {
	Plugin,
	Project,
}

fn main() -> Result<(), String> {
	let command_line_arguments = CommandLineArguments::parse();

	match command_line_arguments.command {
		Command::Create { kind } => match kind {
			CreateKind::Plugin => create_plugin()?,
			CreateKind::Project => create_project()?,
		},
	}

	Ok(())
}

fn create_project() -> Result<(), String> {
	println!("\n{} a new Clara project:\n", "Create".green().bold());

	let name: String = dialoguer::Input::with_theme(&dialoguer::theme::ColorfulTheme::default())
		.with_prompt("Name:")
		.interact_text()
		.unwrap();
	let location = std::env::current_dir().map_err(|_| "Error getting CWD".to_owned())?.display().to_string();
	let description: String = dialoguer::Input::with_theme(&dialoguer::theme::ColorfulTheme::default())
		.with_prompt("Description:")
		.interact_text()
		.unwrap();
	clara_api::project::new_project(clara_api::project::Project::new(&location, &name, clara_api::project::PaneLayout::basic(), &description))?;

	println!("\n{} project at {}.\n", "Created".green().bold(), format!("{location}/{name}").bold().cyan());

	Ok(())
}

fn create_plugin() -> Result<(), String> {
	println!("\n{} a new Clara plugin:\n", "Create".green().bold());

	let name: String = dialoguer::Input::with_theme(&dialoguer::theme::ColorfulTheme::default())
		.with_prompt("Name:")
		.interact_text()
		.unwrap();

	let identifier_pattern = regex_macro::regex!("^[a-z][-a-z\\d]*[a-z\\d]$");

	let identifier: String = dialoguer::Input::with_theme(&dialoguer::theme::ColorfulTheme::default())
		.with_prompt("Identifier:")
		.validate_with(|input: &String| {
			identifier_pattern
				.is_match(input)
				.then_some(())
				.ok_or("Identifier must only contain hyphens, lowercase letters, and numbers.")
		})
		.interact_text()
		.unwrap();

	let package_manager = &crate::package::PACKAGE_MANAGERS[dialoguer::Select::with_theme(&dialoguer::theme::ColorfulTheme::default())
		.with_prompt("Package Manager:")
		.default(0)
		.items(crate::package::PACKAGE_MANAGERS.iter().map(|pm| pm.name))
		.interact()
		.unwrap()];

	let description: String = dialoguer::Input::with_theme(&dialoguer::theme::ColorfulTheme::default())
		.with_prompt("Description:")
		.interact_text()
		.unwrap();

	let icons = crate::icons::Icon::names();
	let icon = icons[dialoguer::FuzzySelect::with_theme(&dialoguer::theme::ColorfulTheme::default())
		.with_prompt("Icon:")
		.default(0)
		.items(&icons[..])
		.max_length(1)
		.interact()
		.unwrap()];

	println!("\n{} plugin...", "Generating".green().bold());

	let progress_bar = ProgressBar::new_spinner();
	progress_bar.enable_steady_tick(Duration::from_millis(120));
	progress_bar.set_style(
		ProgressStyle::with_template("{msg} {spinner:.cyan}")
			.unwrap()
			.tick_strings(&["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"]),
	);
	progress_bar.set_message(format!("    {} Svelte project...", "Initializing".green().bold()));

	std::process::Command::new(package_manager.execute)
		.arg("sv")
		.arg("create")
		.arg(&identifier)
		.arg("--template")
		.arg("library")
		.arg("--types")
		.arg("ts")
		.arg("--no-install")
		.arg("--add")
		.arg("prettier")
		.stdout(std::process::Stdio::null())
		.spawn()
		.map_err(|_| "Error spawning process")?
		.wait()
		.map_err(|_| "Error waiting for process")?;

	progress_bar.set_style(ProgressStyle::with_template("{msg}").unwrap());
	progress_bar.finish_with_message(format!("    {} Svelte project... {}", "Initializing".green().bold(), "Done!".cyan().bold()));

	print!("    {} project for Clara... ", "Setting up".bold().green());
	std::io::stdout().flush().unwrap();

	std::fs::remove_dir_all(std::path::Path::new(&identifier).join("static")).unwrap();
	std::fs::write(
		std::path::Path::new(&identifier).join("svelte.config.js"),
		include_str!("templates/plugin/svelte.config.js"),
	)
	.unwrap();

	let routes_path = std::path::Path::new(&identifier).join("src").join("routes");
	if routes_path.exists() {
		std::fs::remove_dir_all(routes_path).map_err(|_| "Failed to remove src/routes")?;
	}

	let typescript = include_str!("templates/plugin/install_script.ts");
	let javascript = include_str!("templates/plugin/install_script.js");

	std::fs::create_dir(std::path::Path::new(&identifier).join("scripts")).unwrap();
	std::fs::write(
		std::path::Path::new(&identifier).join("scripts").join("install.ts"),
		if package_manager.typescript { typescript } else { javascript }.replace("%PLUGIN_IDENTIFIER%", &identifier),
	)
	.unwrap();

	std::fs::write(format!("./{identifier}/vite.config.ts"), include_str!("templates/plugin/vite.config.ts")).map_err(|err| format!("Error writing vite.config.ts: {err}"))?;

	std::fs::write(
		format!("./{identifier}/src/lib/index.ts"),
		include_str!("templates/plugin/index.ts")
			.replace("%PLUGIN_NAME%", &name)
			.replace("%PLUGIN_IDENTIFIER%", &identifier)
			.replace("%PLUGIN_DESCRIPTION%", &description)
			.replace("%PLUGIN_ICON%", &icon),
	)
	.map_err(|err| format!("Error writing to main file: {err}"))?;

	let pkg_path = format!("./{identifier}/package.json");
	let pkg_content = std::fs::read_to_string(&pkg_path).map_err(|_| "Could not read package.json")?;
	let mut package_json: Value = serde_json::from_str(&pkg_content).map_err(|_| "Failed to parse package.json")?;

	let api_version = Value::String("latest".to_string());

	let Some(dev_dependencies) = package_json.get_mut("devDependencies").and_then(|v| v.as_object_mut()) else {
		unreachable!()
	};

	dev_dependencies.insert("@clara/api".to_string(), api_version);
	dev_dependencies.remove("@sveltejs/kit");
	dev_dependencies.remove("@sveltejs/adapter-auto");
	dev_dependencies.remove("@sveltejs/package");

	let Some(scripts) = package_json.get_mut("scripts").and_then(|v| v.as_object_mut()) else {
		unreachable!();
	};

	scripts.insert("build".to_owned(), Value::String("vite build".to_string()));
	scripts.insert(
		"postbuild".to_owned(),
		Value::String(format!(
			"{} ../scripts/install.{}",
			package_manager.name,
			if package_manager.typescript { "ts" } else { "js" }
		)),
	);

	let mut writer = Vec::new();
	let formatter = PrettyFormatter::with_indent(b"\t");
	let mut ser = serde_json::Serializer::with_formatter(&mut writer, formatter);
	package_json.serialize(&mut ser).map_err(|_| "Failed to serialize package.json")?;
	let new_pkg_content = String::from_utf8(writer).map_err(|_| "Failed to convert JSON to string")?;
	std::fs::write(pkg_path, new_pkg_content).map_err(|_| "Failed to save package.json")?;

	println!("{}", "Done!".bold().cyan());
	let progress_bar = ProgressBar::new_spinner();
	progress_bar.enable_steady_tick(Duration::from_millis(120));
	progress_bar.set_style(
		ProgressStyle::with_template("{msg} {spinner:.cyan}")
			.unwrap()
			.tick_strings(&["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"]),
	);
	progress_bar.set_message(format!("    {} dependencies...", "Installing".green().bold()));

	std::process::Command::new(package_manager.name)
		.arg("install")
		.current_dir(std::env::current_dir().unwrap().join(&identifier))
		.stdout(std::process::Stdio::null())
		.stderr(std::process::Stdio::null())
		.spawn()
		.map_err(|_| "Error spawning process")?
		.wait()
		.map_err(|_| "Error waiting for process")?;

	progress_bar.set_style(ProgressStyle::with_template("{msg}").unwrap());
	progress_bar.finish_with_message(format!("    {} dependencies... {}", "Installing".green().bold(), "Done!".cyan().bold()));

	println!("\n{} plugin at {}.\n", "Created".green().bold(), format!("./{identifier}").bold().cyan());

	Ok(())
}
