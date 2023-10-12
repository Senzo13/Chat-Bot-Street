const fs = require("fs");

fs.readFile("src/helpers/bd.js", "utf8", (err, data) => {
  if (err) {
    console.error("Erreur lors de la lecture du fichier", err);
    return;
  }

  let root = eval(data);
  let config = root.config;

  console.log("Original Config:", JSON.stringify(config, null, 2));

  for (let key in config.data) {
    let idCounter = 1; // Déplacez cette ligne ici pour réinitialiser le compteur pour chaque tableau.
    if (Array.isArray(config.data[key])) {
      console.log(`Adding IDs for key: ${key}`);
      for (let item of config.data[key]) {
        if (item) {
          item.id = idCounter++;
        }
      }
    }
  }

  console.log("Modified Config:", JSON.stringify(config, null, 2));

  const outputData =
    "export const config = " + JSON.stringify(config, null, 2) + ";";
  fs.writeFile("bd-copy.js", outputData, "utf8", (err) => {
    if (err) {
      console.error("Erreur lors de l'écriture du fichier", err);
    } else {
      console.log("Fichier bd-copy.js mis à jour avec succès !");
    }
  });
});
