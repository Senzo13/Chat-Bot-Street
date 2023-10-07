import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-analytics.js";
import {
  getDatabase,
  ref,
  onValue,
  child,
  get,
  update,
} from "https://www.gstatic.com/firebasejs/9.9.1/firebase-database.js";
import { firebase } from "./firebaseService.js";

let textArea = document.getElementById("textAreaExample");
let event_code = 0;
textArea.addEventListener("keydown", (e) => {
  if (e.keyCode === 13 && textArea.value !== "") {
    writeMessage(textArea.value);
  }
});

const btnClick = document.getElementById("btnClick");
btnClick.addEventListener("click", () => {
  if (textArea.value !== "") {
    writeMessage(textArea.value);
  }
});

function writeMessage(message) {
  event_code = 1;
  const div = document.createElement("div");
  const div2 = document.createElement("div");
  const img = document.createElement("img");
  img.style.width = "45px";
  img.style.height = "100%";
  img.src =
    "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp";
  div.className = "d-flex flex-row justify-content-start mb-4";
  div2.className = "p-3 ms-3";
  div2.style.borderRadius = "15px";
  div2.style.backgroundColor = "rgba(57, 192, 237,.2)";
  let p = document.createElement("p");
  p.className = "small mb-0";
  p.innerHTML = message;
  div.appendChild(img);
  div.appendChild(div2);
  div2.appendChild(p);
  msg.appendChild(div);
  container.scrollTop = container.scrollHeight;
  textArea.value = "";
  setTimeout(() => {
    search(message);
  }, 1500);
  //autoTrainWithLastAnswer();// IN WORKING
}

function botResponse(message) {
  const div = document.createElement("div");
  const div2 = document.createElement("div");
  const img = document.createElement("img");
  img.style.width = "45px";
  img.style.height = "100%";
  img.src =
    "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp";
  div.className = "d-flex flex-row justify-content-end mb-4";
  div2.className = "p-3 me-3 border";
  div2.style.borderRadius = "15px";
  div2.style.backgroundColor = "#fbfbfb";
  let p = document.createElement("p");
  p.className = "small mb-0";
  p.innerHTML = message;
  div.appendChild(div2);
  div.appendChild(img);
  div2.appendChild(p);
  msg.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

let user = document.getElementsByClassName(
  "d-flex flex-row justify-content-start mb-4"
);
let bot = document.getElementsByClassName(
  "d-flex flex-row justify-content-start mb-4"
);
let container = document.getElementById("container");
let msg = document.getElementById("message");

// add a new question and answer to the database
function addGoodQuestionAndAnswerOtherDb(logs, questionVal, answerVal) {
  logs.push({
    question: questionVal,
    answer: answerVal,
  });
  console.log(logs);
  update(ref(firebase.db, "data"), {
    logs,
  });
}

function autoTrainWithLastAnswer() {
  get(child(firebase.dbRef, "data"))
    .then((snapshot) => {
      console.log(snapshot);
      // get last element answer from logs
      let lastAnswer =
        snapshot.val().logs[snapshot.val().logs.length - 1].answer;
      let checkAnswerCava = snapshot
        .val()
        ["goodResponse"].filter((it) =>
          it.question.toLowerCase().some(array.filter((e) => e))
        );
      console.log(checkAnswerCava);
      let compare = snapshot
        .val()
        ["goodResponse"].filter((it) =>
          lastAnswer.toLowerCase().trim().some(it.answer.toLowerCase().trim())
        );
      if (compare.length > 0) {
        console.log("ça marche");
        compare.forEach((it) => console.log(it.question));
      } else {
        console.log("ça marche pas");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function scoreByLetter(question, input) {
  let newBase = 0;
  let score = 0;
  if (question.length > input.length) {
    newBase = question.length - input.length;
  }
  for (let i = 0; i < question.length; i++) {
    if (question[i] == input[i]) {
      score++;
    }
  }
  // 13 SUR 20 MINIMUM POUR MATCHER
  return score > question.length / 1.5 ? true : false;
}

//  function search(input) {
//      get(child(firebase.dbRef, "data")).then((snapshot) => {
//          console.log(snapshot)
//          if (snapshot.exists()) {
//             const responseReverse = snapshot.val()["goodResponse"].filter(el =>  el.question.split(/\s+/).reverse().join(" ").toLowerCase().includes(input.toLowerCase()));
//             const response = snapshot.val()["goodResponse"].filter(it => it.question.toLowerCase().includes(input.toLowerCase().replace(/'/g, "").split("?").join("")));
//             //FOR DEBUG snapshot.val()["goodResponse"].forEach(it => console.log(it.question.toLowerCase()));
//             const notSensitive = snapshot.val()["goodResponse"].filter(element => scoreByLetter(element.question.toLowerCase().replace(/'/g, "").split("?").join("").split(""), input.toLowerCase().replace(/'/g, "").split("?").join("").split("")));
//             console.log("goodResponse");
//             console.log(response)
//             console.log("responseReverse");
//             console.log(responseReverse)
//             console.log("faute de frappe");
//              console.log(notSensitive);
//             const badRes = snapshot.val()["badResponse"].filter(it => it.answer)
//             const badResp = badRes[Math.floor(Math.random() * badRes.length)].answer;
//             const goodResp = response.length > 0 ? response[Math.floor(Math.random() * response.length)].answer : responseReverse.length > 0 ? responseReverse[Math.floor(Math.random() * responseReverse.length)].answer : notSensitive.length > 0 ? notSensitive[Math.floor(Math.random() * notSensitive.length)].answer : badResp;
//             botResponse(goodResp);
//             addGoodQuestionAndAnswerOtherDb(snapshot.val()["logs"], input.replace(/'/g, ""), goodResp);
//          } else {
//              console.log("No data available");
//          }
//      }).catch((error) => {
//          console.error(error);
//      });
//  }

function search(input) {
  get(child(firebase.dbRef, "data"))
    .then((snapshot) => {
      console.log(snapshot);
      if (snapshot.exists()) {
        const responseReverse = snapshot
          .val()
          ["goodResponse"].filter((el) =>
            el.question
              .split(/\s+/)
              .reverse()
              .join(" ")
              .toLowerCase()
              .includes(input.toLowerCase())
          );
        const response = snapshot
          .val()
          ["goodResponse"].filter((it) =>
            it.question
              .toLowerCase()
              .includes(
                input.toLowerCase().replace(/'/g, "").split("?").join("")
              )
          );
        //FOR DEBUG snapshot.val()["goodResponse"].forEach(it => console.log(it.question.toLowerCase()));
        const notSensitive = snapshot
          .val()
          ["goodResponse"].filter((element) =>
            scoreByLetter(
              element.question
                .toLowerCase()
                .replace(/'/g, "")
                .split("?")
                .join("")
                .split(""),
              input
                .toLowerCase()
                .replace(/'/g, "")
                .split("?")
                .join("")
                .split("")
            )
          );
        console.log("goodResponse");
        console.log(response);
        console.log("responseReverse");
        console.log(responseReverse);
        console.log("faute de frappe");
        console.log(notSensitive);
        const badRes = snapshot.val()["badResponse"].filter((it) => it.answer);
        const badResp =
          badRes[Math.floor(Math.random() * badRes.length)].answer;
        const goodResp =
          response.length > 0
            ? response[Math.floor(Math.random() * response.length)].answer
            : responseReverse.length > 0
            ? responseReverse[
                Math.floor(Math.random() * responseReverse.length)
              ].answer
            : notSensitive.length > 0
            ? notSensitive[Math.floor(Math.random() * notSensitive.length)]
                .answer
            : badResp;
        botResponse(goodResp);
        addGoodQuestionAndAnswerOtherDb(
          snapshot.val()["logs"],
          input.replace(/'/g, ""),
          goodResp
        );
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
