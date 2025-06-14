# Project Switcher (ps)

A simple and efficient CLI tool for quickly navigating and opening your development projects. No more `cd`-ing through multiple directories or remembering complex folder paths!

## 🚀 Features

- **Quick Project Access**: Open any project with a simple command
- **Smart Project Discovery**: Automatically finds projects in your base folder
- **Interactive UI**: Browse projects with an intuitive interface
- **Flexible Opening**: Open projects by name, index, or browse anywhere
- **One-time Setup**: Configure once, use everywhere

## 📦 Installation

```bash
npm install -g project-switcher-cli
```

Or if you prefer using it locally:

```bash
npm install project-switcher-cli
npx ps --help
```

## 🛠️ Setup

Before using the tool, you need to set your base project folder:

```bash
ps set
```

This will prompt you to select the folder where your projects are located. The tool will create a `config.json` file to remember this setting.

## 📋 Commands

### `ps set`
Configure or change your base project folder.

```bash
ps set
```

### `ps list`
Display all projects in your base folder and select one to open.

```bash
ps list
```

### `ps open <project>`
Open a specific project by name or index.

```bash
# Open by project name
ps open my-awesome-project

# Open by index (from list command)
ps open 3
```

### `ps openui [folder]`
Browse and open projects within your base folder using an interactive UI.

```bash
# Browse base folder
ps openui

# Browse specific subfolder
ps openui subfolder-name
```

### `ps openany`
Browse and open any folder on your system (not limited to base folder).

```bash
ps openany
```

### `ps --version [format]`
Display version information.

```bash
ps --version
```

## 🗂️ Configuration

The tool stores its configuration in a `config.json` file located in the same directory as the executable. The configuration includes:

```json
{
  "baseFolder": "/path/to/your/projects"
}
```

## 📁 Project Structure

Your projects should be organized in a base folder like this:

```
Projects/
├── web-app-1/
├── mobile-app/
├── api-server/
└── personal-website/
```

## 🔧 Usage Examples

```bash
# First-time setup
ps set

# List all projects and select one
ps list

# Quickly open a known project
ps open web-app-1

# Browse projects interactively
ps openui

# Open a project in a subfolder
ps openui mobile

# Browse any folder on your system
ps openany
```

## ⚡ Quick Tips

1. **Auto-setup**: If you haven't configured a base folder, the tool will automatically prompt you to set one
2. **Tab completion**: Use tab completion with project names for faster access
3. **Index shortcuts**: Remember project indices from `ps list` for super-quick access
4. **Subfolders**: Use `ps openui <subfolder>` to navigate organized project hierarchies

## 🐛 Troubleshooting

### "Base folder is not set or invalid"
This means your configured base folder doesn't exist or hasn't been set. Run `ps set` to reconfigure.

### Command not found
Make sure the package is installed globally (`npm install -g project-switcher-cli`) or use `npx ps` if installed locally.

### Projects not showing up
Verify that your base folder is correctly set and contains the expected project directories.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

## 📄 License

MIT License - see LICENSE file for details.

<!-- ## 🛣️ Roadmap -->

<!-- - [ ] Add project templates -->
<!-- - [ ] Git integration (show branch status) -->
<!-- - [ ] Favorite projects -->
<!-- - [ ] Recent projects history -->
<!-- - [ ] Custom project opening commands -->
<!-- - [ ] Project search functionality -->

---

**Happy coding!** 🎉