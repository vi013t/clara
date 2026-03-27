use clap::Parser as _;
use colored::Colorize as _;

#[derive(clap::Parser)]
struct CommandLineArguments {
    #[command(subcommand)]
    command: Command,
}

#[derive(clap::Subcommand)]
enum Command {
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
    let location = std::env::current_dir()
        .map_err(|_| "Error getting CWD".to_owned())?
        .display()
        .to_string();
    let description: String =
        dialoguer::Input::with_theme(&dialoguer::theme::ColorfulTheme::default())
            .with_prompt("Description:")
            .interact_text()
            .unwrap();
    clara_api::project::new_project(clara_api::project::Project::new(
        &location,
        &name,
        &description,
    ))?;

    println!(
        "\n{} project at {}.\n",
        "Created".green().bold(),
        format!("{location}/{name}").bold().cyan()
    );

    Ok(())
}

fn create_plugin() -> Result<(), String> {
    println!("\n{} a new Clara plugin:\n", "Create".green().bold());

    let name: String = dialoguer::Input::with_theme(&dialoguer::theme::ColorfulTheme::default())
        .with_prompt("Name:")
        .interact_text()
        .unwrap();
    let description: String =
        dialoguer::Input::with_theme(&dialoguer::theme::ColorfulTheme::default())
            .with_prompt("Description:")
            .interact_text()
            .unwrap();

    println!("\n{} plugin...", "Generating".green().bold());

    std::process::Command::new("bunx")
        .arg("sv")
        .arg("create")
        .arg(&name)
        .arg("--template")
        .arg("library")
        .arg("--types")
        .arg("ts")
        .arg("--install")
        .arg("bun")
        .arg("--add")
        .arg("prettier")
        .stdout(std::process::Stdio::null())
        .spawn()
        .map_err(|_| "Error spawning process")?
        .wait()
        .map_err(|_| "Error waiting for process")?;

    std::fs::write(
        format!("./{name}/src/lib/index.ts"),
        format!(
            r#"import {{ plugin }} from "@clara/api/plugin";

export default plugin({{
	name: "{name}",
	description: "{description}",
	onLoad() {{
		console.log("Hello from {name}!");
    }},
}});"#
        ),
    )
    .map_err(|err| format!("Error writing to main file: {err}"))?;

    println!(
        "\n{} plugin at {}.\n",
        "Created".green().bold(),
        format!("./{name}").bold().cyan()
    );

    Ok(())
}
