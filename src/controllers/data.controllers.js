import fs from "fs";
import path from "path";
import { formatInput } from "~helpers/format.input.helper";
import { config } from "~helpers/bd";

const data = config.data;
class DataController {
  constructor() {
    this.addGoodQuestionAndAnswer = this.addGoodQuestionAndAnswer.bind(this);
  }

  getData(_, res) {
    res.send(data);
  }

  search(req, res) {
    const query = formatInput(req.query.q);
    const matches = data.goodResponse.filter(
      (item) =>
        item.answer.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
        item.question.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );
    res.send(matches);
  }

  deleteEntry(req, res) {
    const { id } = req.params; // Assumer que chaque question/réponse a un identifiant unique
    const index = data.goodResponse.findIndex((item) => item.id === id);

    if (index === -1) {
      return res.status(404).send("Entrée non trouvée.");
    }

    data.goodResponse.splice(index, 1);
    fs.writeFileSync("bd.json", JSON.stringify(data), "utf8");
    res.send("Entrée supprimée avec succès !");
  }

  editEntry(req, res) {
    const { id } = req.params;
    const { question, answer } = req.body;
    const index = data.goodResponse.findIndex((item) => item.id === id);

    if (index === -1) {
      return res.status(404).send("Entrée non trouvée.");
    }

    if (question) {
      data.goodResponse[index].question = formatInput(question);
    }
    if (answer) {
      data.goodResponse[index].answer = formatInput(answer);
    }

    fs.writeFileSync("bd.json", JSON.stringify(data), "utf8");
    res.send("Entrée mise à jour avec succès !");
  }

  addLogs(req, res) {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).send("Question ou réponse manquante.");
    }

    data.logs.push({
      question: question.replace(/'/g, ""),
      answer,
    });

    fs.writeFileSync("bd.json", JSON.stringify(data), "utf8");
    res.send("Ajouté avec succès !");
  }

  addGoodQuestionAndAnswer(req, res) {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).send("Question ou réponse manquante.");
    }

    // Trouvez l'ID le plus élevé dans data.goodResponse
    const highestId = data.goodResponse.reduce((maxId, item) => {
      return item.id && item.id > maxId ? item.id : maxId;
    }, 0);

    // Incrémentez cet ID de 1
    const newId = highestId + 1;

    // Ajoutez la nouvelle question et réponse à la copie en mémoire
    data.goodResponse.push({
      id: newId,
      question: this.escapeForJSString(formatInput(question)),
      answer: this.escapeForJSString(formatInput(answer)),
    });

    // Écrivez les données mises à jour dans le fichier bd.js
    const filePath = path.join(__dirname, "../helpers/bd.js");
    const fileContent = `export const config = ${JSON.stringify(
      config,
      null,
      4
    )};`;

    fs.writeFileSync(filePath, fileContent, "utf8");

    res.send("Ajouté avec succès !");
  }

  escapeForJSString(str) {
    return str.replace(/"/g, '\\"').replace(/\n/g, "\\n");
  }
}

export default new DataController();
