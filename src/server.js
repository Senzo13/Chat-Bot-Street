import router from "~routes/data.routes";
import express from "express";
import cors from "cors";

const app = express();
const SERVER_PORT = 3021;
const SERVER_HOSTNAME = "0.0.0.0";

/* Permet de convertir les caractères spéciaux en caractères HTML pour éviter les failles XSS */
app.use(express.json());

// Servir les fichiers statiques de votre projet
app.use(express.static("public"));

// Autoriser les requêtes cross-origin
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.send("Bonjour depuis Express avec ES6!");
});

app.use("/", router);

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on http://${SERVER_HOSTNAME}:${SERVER_PORT}`);
});
