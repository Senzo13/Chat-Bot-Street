import fs from "fs";
import { formatInput } from "~helpers/format.input.helper";
import { readDatabase } from "~helpers/database.helper";

class DataController {
  constructor() {}

  getData(_, res) {
    console.log("Récupération des données...")
    const data = readDatabase();
    console.log("Données récupérées : ", data);
    res.json(data);
  }

  search(req, res) {
    const query = formatInput(req.query.q);
    const matches = this.data.goodResponse.filter(
      (item) => item.answer.includes(query) || item.question.includes(query)
    );
    res.json(matches);
  }

  deleteEntry(req, res) {
    const { id } = req.params; // Assumer que chaque question/réponse a un identifiant unique
    const index = this.data.goodResponse.findIndex((item) => item.id === id);

    if (index === -1) {
      return res.status(404).send("Entrée non trouvée.");
    }

    this.data.goodResponse.splice(index, 1);
    fs.writeFileSync("bd.json", JSON.stringify(this.data), "utf8");
    res.send("Entrée supprimée avec succès !");
  }

  editEntry(req, res) {
    const { id } = req.params;
    const { question, answer } = req.body;
    const index = this.data.goodResponse.findIndex((item) => item.id === id);

    if (index === -1) {
      return res.status(404).send("Entrée non trouvée.");
    }

    if (question) {
      this.data.goodResponse[index].question = formatInput(question);
    }
    if (answer) {
      this.data.goodResponse[index].answer = formatInput(answer);
    }

    fs.writeFileSync("bd.json", JSON.stringify(this.data), "utf8");
    res.send("Entrée mise à jour avec succès !");
  }

  addLogs(req, res) {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).send("Question ou réponse manquante.");
    }

    this.data.logs.push({
      question: question.replace(/'/g, ""),
      answer,
    });

    fs.writeFileSync("bd.json", JSON.stringify(this.data), "utf8");
    res.send("Ajouté avec succès !");
  }

  addGoodQuestionAndAnswer(req, res) {
    let { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).send("Question ou réponse manquante.");
    }

    question = formatInput(question);
    answer = formatInput(answer);

    this.data.goodResponse.push({
      question,
      answer,
    });

    fs.writeFileSync("bd.json", JSON.stringify(this.data), "utf8");
    res.send("Ajouté avec succès !");
  }
}

export default new DataController();
