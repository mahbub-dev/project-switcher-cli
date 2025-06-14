const fs = require("fs");
const path = require("path");

/**
 * Version Checker Utility
 * Checks and displays version information from various sources
 */

function checkVersion() {
	console.log("🔍 Checking version information...\n");

	// Check package.json version
	checkPackageJsonVersion();

	// Check version.txt file
	// checkVersionFile();

	// Check config.json version (if exists)
	// checkConfigVersion();

	// Display Node.js version
	// checkNodeVersion();
}

function checkPackageJsonVersion() {
	const packagePath = path.join(process.cwd(), "package.json");

	if (fs.existsSync(packagePath)) {
		try {
			const packageData = JSON.parse(
				fs.readFileSync(packagePath, "utf8")
			);
			console.log("📦 Package Information:");
			console.log(`   Name: ${packageData.name || "Unknown"}`);
			console.log(
				`   Version: ${packageData.version || "Not specified"}`
			);
			console.log(
				`   Description: ${packageData.description || "No description"}`
			);
			console.log("");
		} catch (err) {
			console.log("❌ Error reading package.json:", err.message);
		}
	} else {
		console.log("📦 No package.json found in current directory\n");
	}
}

function checkVersionFile() {
	const versionPath = path.join(process.cwd(), "version.txt");

	if (fs.existsSync(versionPath)) {
		try {
			const version = fs.readFileSync(versionPath, "utf8").trim();
			console.log("📄 Version File:");
			console.log(`   Version: ${version}`);
			console.log("");
		} catch (err) {
			console.log("❌ Error reading version.txt:", err.message);
		}
	} else {
		console.log("📄 No version.txt found\n");
	}
}

function checkConfigVersion() {
	const configPath = path.join(process.cwd(), "config.json");

	if (fs.existsSync(configPath)) {
		try {
			const configData = JSON.parse(fs.readFileSync(configPath, "utf8"));
			if (configData.version) {
				console.log("⚙️  Config Version:");
				console.log(`   Version: ${configData.version}`);
				console.log("");
			}
		} catch (err) {
			console.log("❌ Error reading config.json:", err.message);
		}
	}
}

function checkNodeVersion() {
	console.log("🟢 Runtime Information:");
	console.log(`   Node.js: ${process.version}`);
	console.log(`   Platform: ${process.platform}`);
	console.log(`   Architecture: ${process.arch}`);
	console.log("");
}

// Additional utility functions
function compareVersions(version1, version2) {
	const v1Parts = version1.split(".").map(Number);
	const v2Parts = version2.split(".").map(Number);

	for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
		const v1Part = v1Parts[i] || 0;
		const v2Part = v2Parts[i] || 0;

		if (v1Part > v2Part) return 1;
		if (v1Part < v2Part) return -1;
	}

	return 0;
}

function createVersionFile(version = "1.0.0") {
	const versionPath = path.join(process.cwd(), "version.txt");
	fs.writeFileSync(versionPath, version);
	console.log(`✅ Created version.txt with version: ${version}`);
}

function updatePackageVersion(newVersion) {
	const packagePath = path.join(process.cwd(), "package.json");

	if (fs.existsSync(packagePath)) {
		try {
			const packageData = JSON.parse(
				fs.readFileSync(packagePath, "utf8")
			);
			packageData.version = newVersion;
			fs.writeFileSync(packagePath, JSON.stringify(packageData, null, 2));
			console.log(`✅ Updated package.json version to: ${newVersion}`);
		} catch (err) {
			console.log("❌ Error updating package.json:", err.message);
		}
	} else {
		console.log("❌ No package.json found to update");
	}
}

// Command line interface
function handleCommand() {
	const args = process.argv.slice(2);
	const command = args[0];

	switch (command) {
		case "check":
		case undefined:
			checkVersion();
			break;

		case "create":
			const version = args[1] || "1.0.0";
			createVersionFile(version);
			break;

		case "update":
			const newVersion = args[1];
			if (!newVersion) {
				console.log(
					"❌ Please provide a version number. Example: node version.js update 1.2.0"
				);
				return;
			}
			updatePackageVersion(newVersion);
			break;

		case "compare":
			const v1 = args[1];
			const v2 = args[2];
			if (!v1 || !v2) {
				console.log(
					"❌ Please provide two versions to compare. Example: node version.js compare 1.0.0 1.2.0"
				);
				return;
			}
			const result = compareVersions(v1, v2);
			if (result > 0) {
				console.log(`📈 ${v1} is newer than ${v2}`);
			} else if (result < 0) {
				console.log(`📉 ${v1} is older than ${v2}`);
			} else {
				console.log(`📊 ${v1} and ${v2} are the same version`);
			}
			break;

		case "help":
			console.log(`
🔍 Version Checker Utility

Usage:
  node version.js [command] [args]

Commands:
  check           Check current version information (default)
  create [ver]    Create version.txt file (default: 1.0.0)
  update <ver>    Update package.json version
  compare <v1> <v2> Compare two version numbers
  help            Show this help message

Examples:
  node version.js
  node version.js check
  node version.js create 2.1.0
  node version.js update 1.5.0
  node version.js compare 1.0.0 1.2.0
      `);
			break;

		default:
			console.log(`❌ Unknown command: ${command}`);
			console.log('Use "node version.js help" for usage information');
	}
}

// Export functions for use as module
module.exports = {
	checkVersion,
	compareVersions,
	createVersionFile,
	updatePackageVersion,
};

module.exports = checkVersion;
