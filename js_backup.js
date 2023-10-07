const fs = require("fs");
const path = require("path");

const directoryPath = path.join(__dirname, "public", "js");
const backupDirectoryPath = path.join(__dirname, "public", "js_backup");

// Vérifier si le dossier de sauvegarde existe
if (!fs.existsSync(backupDirectoryPath)) {
  return console.error("Le dossier de sauvegarde n'existe pas.");
}

fs.readdir(backupDirectoryPath, (err, files) => {
  if (err) {
    return console.log(
      "Erreur lors de la lecture du dossier de sauvegarde:",
      err
    );
  }

  files.forEach((file) => {
    if (path.extname(file) === ".js") {
      const filePath = path.join(directoryPath, file);
      const backupFilePath = path.join(backupDirectoryPath, file);
      const fileContent = fs.readFileSync(backupFilePath, "utf8");

      // Écrase le fichier obfusqué avec le fichier original
      fs.writeFileSync(filePath, fileContent);
      console.log(`Restauré ${file} depuis la sauvegarde`);
    }
  });
});
