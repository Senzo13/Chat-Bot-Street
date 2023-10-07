import { findBestResponse } from "./answerEngine.js";
import { getDataFromAPI } from "./db.service.js";

let container = document.getElementById("container");
let msg = document.getElementById("message");

// Crée un élément DOM pour le message complet
const createMessageElement = (messageContent) => {
  console.log("Message à afficher : ", messageContent);
  // Élément conteneur pour le message
  const messageWrapper = document.createElement("div");
  messageWrapper.className = "d-flex flex-row justify-content-start mb-4";

  // Crée une image pour l'utilisateur et une bulle pour le message
  const userImage = createUserImageElement();
  const messageBubble = createMessageBubbleElement(messageContent);

  // Ajoute l'image et la bulle au conteneur du message
  messageWrapper.appendChild(userImage);
  messageWrapper.appendChild(messageBubble);

  return messageWrapper;
};

// Crée une image pour l'utilisateur
function createUserImageElement() {
  const userImage = document.createElement("img");
  userImage.style.width = "45px";
  userImage.style.height = "100%";
  userImage.src =
    "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp";

  return userImage;
}

// Crée une bulle de texte pour le message
function createMessageBubbleElement(content) {
  const messageBubble = document.createElement("div");
  messageBubble.className = "p-3 ms-3";
  messageBubble.style.borderRadius = "15px";
  messageBubble.style.backgroundColor = "rgba(57, 192, 237,.2)";

  // Crée le texte du message et l'ajoute à la bulle
  const messageText = document.createElement("p");
  messageText.className = "small mb-0";
  messageText.textContent = content;

  messageBubble.appendChild(messageText);

  return messageBubble;
}

// Écrit le message sur la page et gère la réponse
export const writeMessage = (message) => {
  const textArea = document.getElementById("textAreaExample"); // Récupère l'élément de saisie du message
  const msgContainer = document.getElementById("message"); // Récupère le conteneur des messages
  const container = document.getElementById("container"); // Récupère le conteneur principal du chat

  textArea.disabled = true; // Désactive la zone de texte pendant que le bot répond

  const messageElement = createMessageElement(message); // Crée l'élément DOM pour le message
  msgContainer.appendChild(messageElement); // Ajoute le message à la page

  container.scrollTop = container.scrollHeight; // Défile vers le bas pour montrer le dernier message
  textArea.value = ""; // Vide la zone de texte

  setTimeout(() => {
    handleSearchResponse(message); // Gère la réponse après un délai

    textArea.disabled = false; // Réactive la zone de texte
  }, 1500);

  //autoTrainWithLastAnswer(); // En cours de développement
};

/**
 * Gère l'envoi de la meilleure réponse et l'ajout aux logs.
 * @param {string} input - La question/phrase de recherche.
 */
function handleSearchResponse(input) {
  getDataFromAPI().then((data) => {
    if (!data) {
      console.log("Aucune donnée disponible");
      return;
    }

    console.log("Base de données : ", data);
    const finalResponse = findBestResponse(input, data);

    // Envoyer la réponse finale au bot
    createBotResponseElement(finalResponse);

    // Ajouter la question et la réponse à la base de données des logs
    addGoodQuestionAndAnswerOtherDb(
      data["logs"],
      input.replace(/'/g, ""),
      finalResponse
    );
  });
}

function createBotResponseElement(message) {
  // Création des éléments
  const responseWrapper = document.createElement("div");
  const messageBox = document.createElement("div");
  const avatar = document.createElement("img");
  const messageText = document.createElement("p");

  // Configuration de l'avatar
  avatar.src = "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp";
  avatar.style.width = "45px";
  avatar.style.height = "100%";

  // Configuration du texte du message
  messageText.className = "small mb-0";
  messageText.innerHTML = message;

  // Configuration de la boîte de message
  messageBox.className = "p-3 me-3 border";
  messageBox.style.borderRadius = "15px";
  messageBox.style.backgroundColor = "#fbfbfb";
  messageBox.appendChild(messageText); // Ajout du texte à la boîte de message

  // Configuration du conteneur principal
  responseWrapper.className = "d-flex flex-row justify-content-end mb-4";
  responseWrapper.appendChild(messageBox); // Ajout de la boîte de message au conteneur principal
  responseWrapper.appendChild(avatar); // Ajout de l'avatar au conteneur principal

  // Ajout du conteneur principal à l'élément 'msg' (qui doit être défini ailleurs dans votre code)
  msg.appendChild(responseWrapper);

  // Scrolling pour voir le dernier message
  container.scrollTop = container.scrollHeight;
}

