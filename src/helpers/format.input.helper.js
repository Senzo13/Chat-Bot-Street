export const formatInput = (input) => {
  return input
    .replace(/'/g, "") // Supprime les apostrophes
    .replace(/\?/g, "") // Supprime les points d'interrogation
    .toLowerCase(); // Convertit en minuscule
};
