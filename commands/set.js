const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

module.exports = function setBaseFolder() {
	try {
		const psCommand = [
			"Add-Type -AssemblyName System.Windows.Forms;",
			"$f = New-Object System.Windows.Forms.FolderBrowserDialog;",
			'if ($f.ShowDialog() -eq \\"OK\\") { Write-Output $f.SelectedPath }',
		].join(" ");

		const folderPath = execSync(
			`powershell -NoProfile -Command "${psCommand}"`,
			{
				encoding: "utf8",
			}
		).trim();

		if (!folderPath) {
			console.log("⚠️ No folder selected. Exiting...");
			return;
		}

		const configPath = path.join(__dirname, "..", "config.json");
		fs.writeFileSync(
			configPath,
			JSON.stringify({ baseFolder: folderPath }, null, 2)
		);
		console.log(`Great! Base folder set to: ${folderPath}`);
		console.log(`Now run the following command as per your need`);
		console.log("  ps set         → Select base project folder");
		console.log("  ps list        → List and open project");
		console.log("  ps open        → Open project by GUI");
		console.log("  ps openi       → Open project by name or index");
		console.log("  ps openany     → Browse and open any folder");
	} catch (err) {
		console.error("❌ PowerShell error:", err.message);
	}
};
