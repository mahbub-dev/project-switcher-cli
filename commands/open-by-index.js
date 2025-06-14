const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { exec } = require('child_process');

module.exports = function openProjectByIndex() {
  const configPath = path.join(__dirname, '..', 'config.json');
  
  if (!fs.existsSync(configPath)) {
    console.log('❌ No config found. Run `ps set` first.');
    return;
  }
  
  const { baseFolder } = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  
  if (!baseFolder || !fs.existsSync(baseFolder)) {
    console.log('❌ Base folder does not exist.');
    return;
  }

  try {
    // Get all directories in the base folder
    const projects = fs.readdirSync(baseFolder, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    if (projects.length === 0) {
      console.log('❌ No projects found in the base folder.');
      return;
    }

    // Display available projects
    console.log('\n📁 Available projects:');
    projects.forEach((project, index) => {
      console.log(`  ${index + 1}. ${project}`);
    });

    // Create readline interface
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    // Get user selection
    rl.question('\n🚀 Select a project (number or name): ', (answer) => {
      rl.close();
      
      let selectedProject;
      
      // Check if input is a number
      const projectIndex = parseInt(answer) - 1;
      if (!isNaN(projectIndex) && projectIndex >= 0 && projectIndex < projects.length) {
        selectedProject = projects[projectIndex];
      } else {
        // Check if input matches a project name (case-insensitive)
        selectedProject = projects.find(project => 
          project.toLowerCase() === answer.toLowerCase()
        );
      }
      
      if (!selectedProject) {
        console.log('❌ Invalid selection. Please try again.');
        return;
      }
      
      const folderPath = path.join(baseFolder, selectedProject);
      console.log(`🚀 Opening project: ${selectedProject}`);
      exec(`code "${folderPath}"`);
    });

  } catch (err) {
    console.error('❌ Error reading projects:', err.message);
  }
};