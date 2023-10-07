const fs = require("fs");
const path = require("path");
const JavaScriptObfuscator = require("javascript-obfuscator");

const directoryPath = path.join(__dirname, "public", "js");
const backupDirectoryPath = path.join(__dirname, "public", "js_backup");

if (!fs.existsSync(backupDirectoryPath)) {
  fs.mkdirSync(backupDirectoryPath);
}

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.log("Error reading directory:", err);
  }

  files.forEach((file) => {
    if (path.extname(file) === ".js") {
      const filePath = path.join(directoryPath, file);
      const backupFilePath = path.join(backupDirectoryPath, file);
      const fileContent = fs.readFileSync(filePath, "utf8");

      // Backup the original file
      if (!fs.existsSync(backupFilePath)) {
        fs.writeFileSync(backupFilePath, fileContent);
      }

      const obfuscatedCode = JavaScriptObfuscator.obfuscate(fileContent, {
        compact: true,
        controlFlowFlattening: true,
      });

      fs.writeFileSync(filePath, obfuscatedCode.getObfuscatedCode());
      console.log(`Obfuscated ${file}`);
    }
  });
});
