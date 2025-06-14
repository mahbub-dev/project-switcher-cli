#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Parse CLI args
const [, , command, ...args] = process.argv;

// Helper to check base folder config
function getBaseFolder() {
  const configPath = path.join(__dirname, 'config.json');
  if (!fs.existsSync(configPath)) return null;

  try {
    const { baseFolder } = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    if (baseFolder && fs.existsSync(baseFolder)) {
      return baseFolder;
    }
  } catch {
    return null;
  }

  return null;
}

const baseFolder = getBaseFolder();

// If baseFolder is not valid, force user to run `set`
if (!baseFolder && command !== 'set') {
  console.log('⚠️ Base folder is not set or invalid.');
  console.log('🔧 Launching "ps set"...');
  require('./commands/set')();
  return;
}

// Route to command
switch (command) {
  case '--version':
    require('./commands/--version')(args[0]);
    break;
  case 'set':
    require('./commands/set')();
    break;
  case 'list':
    require('./commands/list')();
    break;
  case 'open':
    require('./commands/open')(args[0]);
    break;
  case 'openi':
    require('./commands/open-by-index')(args[0]);
    break;
  case 'openany':
    require('./commands/openany')();
    break;
  default:
    console.log('❓ Unknown command. Try:');
    console.log('  ps set         → Select base project folder');
    console.log('  ps list        → List and open project');
    console.log('  ps open        → Open project by GUI');
    console.log('  ps openi       → Open project by name or index');
    console.log('  ps openany     → Browse and open any folder');
}
