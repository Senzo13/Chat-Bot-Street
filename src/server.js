import router from "~routes/data.routes";
import express from "express";

const app = express();
const PORT = 3021;

/* Permet de convertir les caractères spéciaux en caractères HTML pour éviter les failles XSS */
app.use(express.json());

// Servir les fichiers statiques de votre projet
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Bonjour depuis Express avec ES6!");
});

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
