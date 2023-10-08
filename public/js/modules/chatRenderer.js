import { findBestResponse } from "./answerEngine.js";
import { getDataFromAPI } from "./db.service.js";

const textArea = document.getElementById("input-send"); // Récupère l'élément de saisie du message
const iconElement = document.getElementById("button-send");
const loader = document.getElementById("loader");
let container = document.getElementById("container");
let msg = document.getElementById("message");

// Crée un élément DOM pour le message complet
const createMessageElement = (messageContent) => {
  console.log("Message à afficher : ", messageContent);
  // Élément conteneur pour le message
  const messageWrapper = document.createElement("div");
  const messageBefore = document.createElement("div");
  messageBefore.className = "w-[100%] h-auto flex items-center justify-center";
  messageBefore.style.backgroundColor = "#343541";
  messageWrapper.className =
    "response w-[60%] h-auto p-4 flex items-center justify-start";

  // Crée une image pour l'utilisateur et une bulle pour le message
  const userImage = createUserImageElement();
  const messageBubble = createMessageBubbleElement(messageContent);

  // Ajoute l'image et la bulle au conteneur du message
  messageBefore.appendChild(messageWrapper);
  messageWrapper.appendChild(userImage);
  messageWrapper.appendChild(messageBubble);

  return messageBefore;
};

// Crée une image pour l'utilisateur
function createUserImageElement() {
  const userImage = document.createElement("img");
  userImage.style.width = "25px";
  userImage.style.height = "25px";
  userImage.src =
    "https://www.eyedocs.co.uk/components/com_community/assets/user-anon.png";
  return userImage;
}

// Crée une bulle de texte pour le message
function createMessageBubbleElement(content) {
  const messageBubble = document.createElement("div");
  messageBubble.className = "user-response m-0 pl-2 h-auto";

  // Crée le texte du message et l'ajoute à la bulle
  const messageText = document.createElement("p");
  messageText.textContent = content;

  messageBubble.appendChild(messageText);

  return messageBubble;
}

// Écrit le message sur la page et gère la réponse
export const writeMessage = (message) => {
  const msgContainer = document.getElementById("message"); // Récupère le conteneur des messages
  const container = document.getElementById("container"); // Récupère le conteneur principal du chat

  textArea.disabled = true; // Désactive la zone de texte pendant que le bot répond

  const messageElement = createMessageElement(message); // Crée l'élément DOM pour le message
  msgContainer.appendChild(messageElement); // Ajoute le message à la page

  container.scrollTop = container.scrollHeight; // Défile vers le bas pour montrer le dernier message
  textArea.value = ""; // Vide la zone de texte

  iconElement.style.display = "none";
  loader.style.display = "block";
  setTimeout(() => {
    handleSearchResponse(message); // Gère la réponse après un délai
  }, 5);

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

function createBotResponseElement(messageContent) {
  // Élément conteneur pour le message

  const messageBefore = document.createElement("div");
  messageBefore.className = "w-[100%] h-auto flex items-center justify-center";
  messageBefore.style.backgroundColor = "#444654"; // Si vous voulez la même couleur de fond

  const responseWrapper = document.createElement("div");
  responseWrapper.className =
    "response w-[60%] h-auto p-4 flex items-center justify-start"; // Identique à celui de l'utilisateur

  const avatar = document.createElement("img");
  avatar.src = "https://avatars.githubusercontent.com/u/52446531?v=4"; // Ajoutez l'URL de l'avatar si nécessaire
  avatar.style.width = "25px";
  avatar.style.height = "25px";

  const messageText = document.createElement("p");
  messageText.className = "p-2 text-white rounded-md";
  messageText.style.backgroundColor = "#444654";
  // Ne pas définir innerHTML ici. Il sera défini lettre par lettre par la fonction typeMessage

  responseWrapper.appendChild(avatar);
  responseWrapper.appendChild(messageText);

  messageBefore.appendChild(responseWrapper);

  msg.appendChild(messageBefore);

  // Commence à taper le message une fois qu'il est ajouté au DOM
  typeMessage(messageText, messageContent);

  // Scrolling pour voir le dernier message (peut être déplacé à la fin de typeMessage pour le faire après avoir terminé de taper)
  container.scrollTop = container.scrollHeight;
}

function typeMessage(element, message, index = 0) {
  if (index < message.length) {
    element.innerHTML += message[index];
    setTimeout(() => typeMessage(element, message, index + 1), 15); // 20ms entre chaque lettre
  } else {
    // Une fois que le message est complètement "tapé"
    iconElement.style.color = "#6B6C7B";
    iconElement.style.backgroundColor = "#40414F";
    iconElement.style.display = "block";
    loader.style.display = "none";
    textArea.disabled = false; // Réactive la zone de texte
  }
}
