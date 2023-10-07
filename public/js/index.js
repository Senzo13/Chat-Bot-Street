import { writeMessage } from "./modules/chatRenderer.js";

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
