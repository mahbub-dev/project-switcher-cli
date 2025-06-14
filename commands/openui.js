const fs = require('fs');
const path = require('path');
const { execSync, exec } = require('child_process');

module.exports = function openProject() {
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
    // Escape only double quotes and use verbatim string (@) for safe folder path handling
const psCommand = `
      $shell = New-Object -ComObject Shell.Application;
      $folder = $shell.BrowseForFolder(0, 'Please select a folder:', 0x0001, '${baseFolder.replace(/'/g, "''")}');
      if ($folder -ne $null) {
        $selectedPath = $folder.Self.Path;
        Write-Output $selectedPath
      }
    `.replace(/\n/g, ' ');


    const folderPath = execSync(`powershell -NoProfile -Command "${psCommand}"`, {
      encoding: 'utf8'
    }).trim();

    if (!folderPath || !fs.existsSync(folderPath)) {
      console.log('⚠️ No folder selected or folder does not exist.');
      return;
    }

    console.log(`🚀 Opening project: ${folderPath}`);
    exec(`code "${folderPath}"`);
  } catch (err) {
    console.error('❌ PowerShell error:', err.message);
  }
};
