export const getDataFromAPI = async () => {
  try {
    const response = await axios.get(
      "http://chat-bot.lgiralt.com:3021/api/data"
    );
    const db = response.data;
    return db;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de la base de données : ",
      error
    );
    throw error;
  }
};

async function addLogs(logData) {
  try {
    const response = await axios.post(
      "http://chat-bot.lgiralt.com:3021/api/logs/add",
      logData
    );
    console.log("Logs ajoutés avec succès : ", response.data);
  } catch (error) {
    console.error("Erreur lors de l'ajout des logs : ", error);
  }
}

export const addQuestionAndAnswer = async (questionData) => {
  try {
    const response = await axios.post(
      "http://chat-bot.lgiralt.com:3021/api/questions/add",
      questionData
    );
    return response;
  } catch (error) {
    console.error(
      "Erreur lors de l'ajout de la question et de la réponse : ",
      error
    );
  }
};

export const searchDatabase = async (query) => {
  try {
    const response = await axios.get(
      `http://chat-bot.lgiralt.com:3021/api/search?q=${query}`
    );
    const searchResults = response.data;
    return searchResults;
  } catch (error) {
    console.error(
      "Erreur lors de la recherche dans la base de données : ",
      error
    );
    throw error;
  }
};

async function deleteEntry(entryId) {
  try {
    const response = await axios.delete(
      `http://chat-bot.lgiralt.com:3021/api/delete/${entryId}`
    );
    console.log("Entrée supprimée avec succès : ", response.data);
  } catch (error) {
    console.error("Erreur lors de la suppression de l'entrée : ", error);
  }
}

async function editEntry(entryId, newData) {
  try {
    const response = await axios.put(
      `http://chat-bot.lgiralt.com:3021/api/edit/${entryId}`,
      newData
    );
    console.log("Entrée éditée avec succès : ", response.data);
  } catch (error) {
    console.error("Erreur lors de l'édition de l'entrée : ", error);
  }
}
