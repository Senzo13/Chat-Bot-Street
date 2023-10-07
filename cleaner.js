import fs from "fs";
import { config } from "~helpers/bd";

// Fonction pour supprimer les caractères spécifiques d'une chaîne
const supprimerCaracteresSpeciaux = (chaine) => {
  return chaine.replace(/['?!]/g, "");
};

// Parcourir chaque entrée dans la base de données
config.data.forEach((entry) => {
  const questionOriginale = entry.question;
  const questionCorrigee = supprimerCaracteresSpeciaux(questionOriginale);

  // Mettre à jour la question avec la correction
  entry.question = questionCorrigee;
});

// Écrire la base de données mise à jour dans le fichier bd.js
fs.writeFile("./bd.js", JSON.stringify(bd, null, 2), (err) => {
  if (err) {
    console.error("Erreur lors de l'écriture du fichier bd.js :", err);
  } else {
    console.log("Le fichier bd.js a été mis à jour avec succès.");
  }
});
