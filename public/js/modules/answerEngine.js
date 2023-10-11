/**
 * Trouve la meilleure réponse basée sur l'input donné.
 * @param {string} input - La question/phrase de recherche.
 * @param {object} database - La base de données de réponses.
 * @returns {string} - La meilleure réponse trouvée.
 */
export const findBestResponse = (input, database) => {
  const cleanedInput = preprocessInput(input);
  // Recherche directe dans la base de données
  const directMatches = database["goodResponse"].filter((item) =>
    item.question.toLowerCase().includes(cleanedInput)
  );

  if (directMatches.length > 0) return getRandomItem(directMatches).answer;

  // Recherche avec la question inversée pour une augmentation des données
  const reversedMatches = database["goodResponse"].filter((item) =>
    item.question
      .split(/\s+/)
      .reverse()
      .join(" ")
      .toLowerCase()
      .includes(cleanedInput)
  );

  if (reversedMatches.length > 0) return getRandomItem(reversedMatches).answer;

  // Recherche tolérante aux fautes de frappe
  const typoInsensitiveMatches = database["goodResponse"].filter((item) =>
    scoreByLetter(
      item.question
        .toLowerCase()
        .replace(/'/g, "")
        .split("?")
        .join("")
        .split(""),
      cleanedInput.split("")
    )
  ); 

  if (typoInsensitiveMatches.length > 0)
    return getRandomItem(typoInsensitiveMatches).answer;

  // Si aucune réponse adéquate n'est trouvée, renvoie une réponse aléatoire "mauvaise"
  return getRandomBadResponse(database);
};

/**
 * Nettoie l'input en le mettant en minuscule, en enlevant certaines ponctuations.
 * @param {string} input - La chaîne à nettoyer.
 * @returns {string} - La chaîne nettoyée.
 */
function preprocessInput(input) {
  return input.toLowerCase().replace(/'/g, "").split("?").join("");
}

/**
 * Récupère un élément aléatoire d'un tableau.
 * @param {Array} array - Le tableau.
 * @returns {any} - Un élément aléatoire du tableau.
 */
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Renvoie une réponse aléatoire parmi les "mauvaises" réponses.
 * @param {object} database - La base de données de réponses.
 * @returns {string} - Une réponse "mauvaise" aléatoire.
 */
function getRandomBadResponse(database) {
  const badResponses = database["badResponse"].filter(
    (item) => item && item.answer
  );
  return getRandomItem(badResponses).answer;
}

/**
 * Compare deux chaînes de caractères et renvoie un score de similarité.
 * @param {string} question - La question à comparer.
 * @param {string} input - L'input à comparer.
 * @returns {number} - Le score de similarité.
 */

function scoreByLetter(question, input) {
  let score = 0;
  const minLength = Math.min(question.length, input.length);
  const threshold = question.length / 1.5; // Calculé une fois en dehors de la boucle

  for (let i = 0; i < minLength; i++) {
    if (question[i] === input[i]) {
      score++;
    }
    // Vérification précoce: si le score maximal possible restant est inférieur au seuil, sortir
    if (score + (minLength - i) < threshold) {
      return false;
    }
  }
  return score > threshold;
}
