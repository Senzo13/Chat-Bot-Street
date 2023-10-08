import { writeMessage } from "./modules/chatRenderer.js";

const inputElement = document.getElementById("input-send");

inputElement.addEventListener("keydown", (e) => {
  if (e.keyCode === 13 && inputElement.value !== "") {
    writeMessage(inputElement.value);
  }
});

const iconElement = document.getElementById("button-send");
iconElement.addEventListener("click", () => {
  if (inputElement.value !== "") {
    writeMessage(inputElement.value);
  }
});

inputElement.addEventListener("input", function () {
  if (this.value.trim().length > 0) {
    iconElement.style.color = "white";
    iconElement.style.backgroundColor = "#AB68FF";
  } else {
    iconElement.style.color = "#6B6C7B";
    iconElement.style.backgroundColor = "#40414F";
  }
});
