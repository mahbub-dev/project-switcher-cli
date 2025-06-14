const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

module.exports = function openProjectByIndex(projectInput) {
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

  // If no project input provided, show usage
  if (!projectInput) {
    console.log('❌ Please specify a project name or index.');
    console.log('💡 Usage: ps openi <project-name> or ps openi <index>');
    console.log('💡 Run `ps list` to see available projects.');
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

    let selectedProject;

    // Check if input is a number (index)
    const projectIndex = parseInt(projectInput) - 1;
    if (!isNaN(projectIndex) && projectIndex >= 0 && projectIndex < projects.length) {
      selectedProject = projects[projectIndex];
    } else {
      // Try exact name match (case-insensitive)
      selectedProject = projects.find(project => 
        project.toLowerCase() === projectInput.toLowerCase()
      );
      
      // If no exact match, try partial match
      if (!selectedProject) {
        const partialMatches = projects.filter(project =>
          project.toLowerCase().includes(projectInput.toLowerCase())
        );
        
        if (partialMatches.length === 1) {
          selectedProject = partialMatches[0];
          console.log(`🎯 Found partial match: ${selectedProject}`);
        } else if (partialMatches.length > 1) {
          console.log('❌ Multiple projects match your input:');
          partialMatches.forEach((project, index) => {
            console.log(`  ${projects.indexOf(project) + 1}. ${project}`);
          });
          console.log('💡 Please be more specific or use the index number.');
          return;
        }
      }
    }

    if (!selectedProject) {
      console.log(`❌ Project "${projectInput}" not found.`);
      console.log('📁 Available projects:');
      projects.forEach((project, index) => {
        console.log(`  ${index + 1}. ${project}`);
      });
      return;
    }

    const folderPath = path.join(baseFolder, selectedProject);
    
    // Check if the project folder actually exists
    if (!fs.existsSync(folderPath)) {
      console.log(`❌ Project folder does not exist: ${folderPath}`);
      return;
    }
    
    console.log(`🚀 Opening project: ${selectedProject}`);
    console.log(`📂 Path: ${folderPath}`);
    
    // Execute with proper error handling
    exec(`code "${folderPath}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Failed to open VS Code: ${error.message}`);
        console.log('💡 Make sure VS Code is installed and "code" command is available.');
        console.log('💡 Try running: code --version');
        return;
      }
      
      if (stderr) {
        console.warn(`⚠️ Warning: ${stderr}`);
      }
      
      console.log('✅ Project opened successfully!');
    });

  } catch (err) {
    console.error('❌ Error reading projects:', err.message);
  }
};