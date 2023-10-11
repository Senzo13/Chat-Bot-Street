import {
  getDataFromAPI,
  addQuestionAndAnswer,
  searchDatabase,
} from "../js/modules/db.service.js";

function paginateData(data, itemsPerPage) {
  let paginatedData = [];
  for (let i = 0; i < data.length; i += itemsPerPage) {
    paginatedData.push(data.slice(i, i + itemsPerPage));
  }
  return paginatedData;
}

const ITEMS_PER_PAGE = 25;

addEventListener("DOMContentLoaded", async () => {
  const db = await getDataFromAPI();
  const paginatedDB = paginateData(db["goodResponse"], ITEMS_PER_PAGE);

  displayPage(paginatedDB[0]);
  setupPaginationButtons(paginatedDB);
  console.log("Base de données : ", db);
});

function displayPage(data) {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = ""; // Vider les entrées existantes

  data.forEach((item) => {
    const tr = document.createElement("tr");
    tr.classList.add("bg-[#202123]", "hover:bg-[#343541]");

    tr.innerHTML = `
        <td class="py-2 px-4 border-b border-[#343541] text-white">${item.question}</td>
        <td class="py-2 px-4 border-b border-[#343541] text-white">${item.answer}</td>
        <td class="py-2 px-4 border-b border-[#343541] flex justify-around">
          <ion-icon name="create-outline" class="text-blue-500 hover:text-blue-600 cursor-pointer"></ion-icon>
          <ion-icon name="trash-outline" class="text-red-500 hover:text-red-600 cursor-pointer"></ion-icon>
        </td>
      `;

    tbody.appendChild(tr);
  });
}

function setupPaginationButtons(data) {
  const paginationDiv = document.querySelector(".mt-5");
  let currentPage = 1;

  function updatePagination() {
    paginationDiv.innerHTML = ""; // Clear current pagination

    let startPage = Math.max(currentPage - 3, 1);
    let endPage = Math.min(startPage + 5, data.length); // Show max 6 pages including the current page

    for (let i = startPage; i <= endPage; i++) {
      const button = document.createElement("button");
      button.classList.add(
        "mx-1",
        "py-1",
        "px-3",
        "bg-[#202123]",
        "text-white",
        "hover:bg-[#343541]"
      );
      button.innerText = i;
      button.addEventListener("click", function () {
        currentPage = i;
        displayPage(data[i - 1]);
        updatePagination();
      });

      if (i === currentPage) {
        button.classList.add("bg-[#343541]"); // Highlight current page
      }

      paginationDiv.appendChild(button);
    }
  }
  updatePagination();
}

document.addEventListener("DOMContentLoaded", () => {
  const addMemoryButton = document.getElementById("add-memory");
  const closeModalButton = document.getElementById("close-modal");
  const modal = document.querySelector("ion-modal");
  const addMemoryBtn = document.getElementById("add-memory-btn");
  const question = document.getElementById("question");
  const answer = document.getElementById("answer");

  // Ouvrir la modal
  addMemoryButton.addEventListener("click", () => {
    modal.present();
  });

  // Ajouter la question et la réponse
  addMemoryBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const questionData = {
      question: question.value,
      answer: answer.value,
    };

    addQuestionAndAnswer(questionData).then((response) => {
      console.log("Question et réponse ajoutées avec succès : ", response.data);
      modal.dismiss();
    });
  });

  // Fermer la modal
  closeModalButton.addEventListener("click", () => {
    modal.dismiss();
  });

  // Ajouter d'autres logiques comme la sauvegarde des données si nécessaire.
});

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-btn");

// Cette fonction effectue la recherche lorsque l'utilisateur clique sur le bouton ou appuie sur "Entrée"
const performSearch = async () => {
  const searchTerm = searchInput.value.toLowerCase();

  // Faites appel à la fonction searchDatabase pour rechercher dans la base de données
  const searchResults = await searchDatabase(searchTerm).then((results) => {
    console.log("Résultats de la recherche : ", results);
    return results;
  });

  // Utilisez la fonction displayPage pour afficher les résultats
  displayPage(searchResults);
};

// Gestionnaire de clic pour le bouton
searchButton.addEventListener("click", performSearch);

// Gestionnaire d'événement pour détecter la touche "Entrée" dans l'input
searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    performSearch();
  }
});
