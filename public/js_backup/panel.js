// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-analytics.js";
import {
  getDatabase,
  ref,
  onValue,
  child,
  get,
  set,
  update,
} from "https://www.gstatic.com/firebasejs/9.9.1/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4858FBQ1o5wvbdfaH0k0WF6SqVeUwFsY",
  authDomain: "plantr-prod.firebaseapp.com",
  databaseURL:
    "https://ai-bot-e9726-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "plantr-prod",
  storageBucket: "plantr-prod.appspot.com",
  messagingSenderId: "515154813352",
  appId: "1:515154813352:web:2b44d4268fd03574b2fd9d",
  measurementId: "G-51FKKVYWDS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
const dbRef = ref(getDatabase());
var resp = document.getElementById("respPanel");
const dbRefs = ref(db, "/a/b/c");

// get the question and answer from the database
function getQuestionAndAnswer() {
  console.log("** GoodQuestionAndAnswer **");
}

window.paginationP = function (page) {
  let showList = document.getElementById("list");
  console.log("** Pagination **");
  const maxElement = 60;
  console.log("clicked page " + page);

  // do get value onDataChange function to get the data

  get(ref(db, "data"))
    .then(function (data) {
      let tage = data
        .val()
        ["goodResponse"].filter((item, index) => index >= page * maxElement);
      console.log(tage[1].question);
      const nbOfData = document.getElementById("nbOfData");
      nbOfData.innerHTML = `${data.val()["goodResponse"].length}`;
      // show the question and answer on the page in showList
      showList.innerHTML = "";
      for (let i = 0; i < maxElement; i++) {
        showList.innerHTML += `<div class="listTd"><tr>
           <td>
               <span class="custom-checkbox">
                   <input type="checkbox" id="checkbox1" name="options[]" value="1">
                   <label for="checkbox1"></label>
               </span>
           </td>
           <td id="myQuestion${i}">${tage[i].question}</td>
           <td style="width:50%" id="myReponse">${tage[i].answer}</td>
           <td></td>
           <td></td>
           <td>
               <a href="#editEmployeeModal" class="edit" onclick="edited()" key=${i} data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
               <a href="#deleteEmployeeModal" class="delete" id="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
           </td>
       </tr>
       <tr>
       </div>
           `;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

function paginationGoodQuestionAndAnswer() {
  get(ref(db, "data"))
    .then(function (data) {
      let array = data.val()["goodResponse"];
      console.log(array.length);
      console.log("** Pagination **");
      let pagination = document.getElementById("pagination");
      let paginationHTML = "";
      let maxPage = Math.ceil(array.length / 60);
      for (let i = 0; i < maxPage; i++) {
        paginationHTML += `<li class="page-item"><a class="page-link" href="#" onclick="paginationP(${i})">${
          i + 1
        }</a></li>`;
      }
      pagination.innerHTML = paginationHTML;
    })
    .catch(function (error) {
      console.log(error);
    });
}

paginationGoodQuestionAndAnswer();

paginationP(0);

getQuestionAndAnswer();

// get the question and answer from the database
function addQuestionAndAnswer(question, answer) {
  console.log("** GoodQuestionAndAnswer **");
  get(ref(db, "data"))
    .then(function (data) {
      addGoodQuestionAndAnswer(data.val()["goodResponse"], question, answer);
    })
    .catch(function (error) {
      console.log("error");
    });
}

// get the question and answer from the database
function addBadAnswer(answer) {
  console.log("** BadAnswer **");
  get(ref(db, "data"))
    .then(function (data) {
      addVeryBadAnswer(data.val()["badResponse"], answer);
    })
    .catch(function (error) {
      console.log("error");
    });
}
// add a new question and answer to the database
function addGoodQuestionAndAnswer(goodResponse, questionVal, answerVal) {
  goodResponse.push({
    question: questionVal,
    answer: answerVal,
  });
  console.log(goodResponse);
  update(ref(db, "data"), {
    goodResponse,
  });
}

// add a new answer to the database
function addVeryBadAnswer(badResponse, answerVal) {
  badResponse.push({
    answer: answerVal,
  });
  console.log(badResponse);
  update(ref(db, "data"), {
    badResponse,
  });
}

// edit the question and answer in the database
function editQuestionAndAnswer(question, answer) {
  console.log("** Edit **");
  get(ref(db, "data"))
    .then(function (data) {
      editGoodQuestionAndAnswer(data.val()["goodResponse"], question, answer);
    })
    .catch(function (error) {
      console.log("error");
    });
}

const editage = document.getElementById("edited");

editage.addEventListener("click", function (event) {
  event.preventDefault();
  // get td id in event target contains myQuestion
  console.log(event.target);
  let question = document.getElementById("myQuestion0").value;
  console.log(question);
  get(ref(db, "data")).then(function (data) {
    editQuestionAndAnswer(data.val()["goodResponse"], oldQuestion);
  });
});

// modify element array in the database
function editGoodQuestionAndAnswer(goodResponse, oldQuestion) {
  let questionNew = document.getElementById("myQuestion").value;
  let answerNew = document.getElementById("myReponse").value;
  for (let i = 0; i < goodResponse.length; i++) {
    console.log(goodResponse[i].question);
    if (goodResponse[i].question == oldQuestion) {
      goodResponse[i].answer = answerNew;
      goodResponse[i].question = questionNew;
    }
  }
  update(ref(db, "data"), {
    goodResponse,
  });
}

const addBtn = document.getElementById("addMemory");
// const closeModal = document.getElementById("addEmployeeModal");

addBtn.addEventListener("click", function (event) {
  event.preventDefault();
  get(ref(db, "data")).then(function (data) {
    let question = document.getElementById("addQuestion").value;
    let answer = document.getElementById("addAnswer").value;
    if (question != "" && answer != "") {
      setAdd(data.val()["goodResponse"], question, answer);
    } else {
      reponseTxt("Veuillez remplir tous les champs");
    }
  });
});

// add element array in the database
function setAdd(goodResponse, newQuestion, newAnswer) {
  let addQuestion = document.getElementById("addQuestion");
  let addAnswer = document.getElementById("addAnswer");

  let withoutAccent = newQuestion.replace(/'/g, "");
  goodResponse.push({
    question: withoutAccent.split("?").join(""),
    answer: newAnswer,
  });
  update(ref(db, "data"), {
    goodResponse,
  });
  addQuestion.value = "";
  addAnswer.value = "";

  reponseTxt("Question et réponse ajoutées avec succès");

  // get adress ip of the user
  function getIPAddress() {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "https://api.ipify.org?format=json");
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject({
            status: xhr.status,
            statusText: xhr.statusText,
          });
        }
      };
      xhr.send();
    });
  }
}
function reponseTxt(txt) {
  // fait moi un setTimeout pour que le message disparaisse après un certain temps
  resp.innerHTML = txt;

  setTimeout(function () {
    resp.innerHTML = "";
  }, 2000);
}
// END FIREBASE SERVICE
