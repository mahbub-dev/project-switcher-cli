const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const { exec } = require('child_process');

module.exports = async function listProjects() {
  const configPath = path.join(__dirname, '..', 'config.json');
  if (!fs.existsSync(configPath)) {
    console.log('❌ No config found. Run `ps set` first.');
    return;
  }

  const { baseFolder } = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  if (!baseFolder || !fs.existsSync(baseFolder)) {
    console.log('❌ Base folder does not exist. Set again using `ps set`.');
    return;
  }

  const projects = fs.readdirSync(baseFolder).filter(name =>
    fs.statSync(path.join(baseFolder, name)).isDirectory()
  );

  if (projects.length === 0) {
    console.log('⚠️ No projects found.');
    return;
  }

  const { selectedProject } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedProject',
      message: '📁 Select a project to open:',
      choices: projects
    }
  ]);

  const selectedPath = path.join(baseFolder, selectedProject);
  console.log(`🚀 Opening: ${selectedPath}`);
  exec(`code "${selectedPath}"`);
};
