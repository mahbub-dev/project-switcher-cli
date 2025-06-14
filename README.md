# PSwitch CLI 🚀

**Quick project switching tool for developers**

Tired of navigating through endless folders to find your projects? PSwitch CLI lets you instantly switch between your coding projects with simple commands. Set your projects folder once, then open any project in VS Code with just a few keystrokes.

## ✨ Features

- 🎯 **Instant project switching** - Open any project in seconds
- 📁 **Smart folder management** - Set your base projects folder once
- 🔍 **Multiple selection methods** - GUI, terminal list, or direct name/index
- 🎨 **Clean terminal interface** - Beautiful, intuitive command output
- ⚡ **Zero configuration** - Works out of the box after setup
- 🔧 **VS Code integration** - Opens projects directly in VS Code

## 📦 Installation

```bash
npm install -g pswitch-cli
```

## 🚀 Quick Start

1. **Set your projects folder** (one-time setup):
   ```bash
   ps set
   ```

2. **List and select a project**:
   ```bash
   ps list
   ```

3. **Open a project by name**:
   ```bash
   ps openi my-project
   ```

That's it! Your project opens in VS Code instantly.

## 📖 Commands

### `ps set`
Set up your base projects folder. This is where PSwitch will look for your projects.

```bash
ps set
```

**What it does:**
- Opens a folder browser dialog
- Saves your selection for future use
- Validates the folder exists

---

### `ps list`
Display an interactive list of all projects. Navigate with arrow keys and press Enter to select.

```bash
ps list
```

**What it does:**
- Shows all projects in your base folder
- Navigate up/down with ↑↓ arrow keys
- Press Enter to open selected project in VS Code
- Press Esc to cancel

**Example interaction:**
```
📁 Available projects:
  → my-portfolio
    react-app
    node-api
    python-scripts

Use ↑↓ arrows to navigate, Enter to select, Esc to cancel
```

---

### `ps open`
Open a project using a graphical folder browser.

```bash
ps open
```

**What it does:**
- Opens a GUI folder picker
- Starts from your configured base folder
- Opens selected project in VS Code

---

### `ps openi`
Display all projects in a numbered list and select one to open.

```bash
ps openi
# Open by index number or name
ps openi 1
```
**Features:**
📁 Available projects:
  1. my-portfolio
  2. react-app
  3. node-api
  4. python-scripts

🚀 Select a project (number or name): 2
🚀 Opening project: react-app
---

### `ps openany`
Browse and open any folder on your system (not limited to base folder).

```bash
ps openany
```

**Use cases:**
- Opening projects outside your main projects folder
- One-time folder access
- Client projects in different locations

---

### `ps --version`
Show version information and system details.

```bash
ps --version
```

## 🛠️ Requirements

- **Node.js** 14.0.0 or higher
- **VS Code** installed and accessible via `code` command
- **Windows, macOS, or Linux**

## 💡 Usage Examples

### Daily Workflow
```bash
# Morning routine - see what projects you have
ps list

# Open a client project outside your main folder
ps openany
```

### First Time Setup
```bash
# Install globally
npm install -g pswitch-cli

# Set your projects folder (e.g., ~/Projects, C:\Dev, etc.)
ps set

# List your projects
ps list
```

### Project Organization Tips
```
📁 Your Projects Folder/
├── 📁 personal-website/
├── 📁 react-todo-app/
├── 📁 python-automation/
├── 📁 nodejs-api/
└── 📁 flutter-mobile/
```

## 🔧 Configuration

PSwitch stores its configuration in a `config.json` file in the installation directory. You can manually edit this if needed:

```json
{
  "baseFolder": "/path/to/your/projects"
}
```

## ❓ Troubleshooting

### "Base folder is not set or invalid"
Run `ps set` to configure your projects folder.

### "No projects found"
- Make sure your base folder contains project directories
- Check that the folder path is correct with `ps set`

### "VS Code not opening"
- Ensure VS Code is installed
- Make sure `code` command works in terminal
- Try: `code --version` to test

### Command not found: ps
- Make sure you installed globally: `npm install -g pswitch-cli`
- Restart your terminal
- Check npm global path: `npm config get prefix`

## 🤝 Contributing

Found a bug or want to contribute? 

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

MIT License - see LICENSE file for details.

## 🌟 Why PSwitch?

**Before PSwitch:**
```bash
cd ~/Projects
ls
cd my-awesome-project
code .
# 😩 Multiple steps, lots of typing
```

**With PSwitch:**
```bash
ps openi awesome
# ✨ One command, instant access
```

---

**Made with ❤️ for developers who value efficiency**

⭐ **Star this repo if PSwitch saves you time!**