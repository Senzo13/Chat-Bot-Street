import router from "~routes/data.routes";
import express from "express";
import cors from "cors";
import https from "https";
import fs from "fs";

const app = express();
const SERVER_PORT = 3021;
const SERVER_HOSTNAME = "chat-bot.lgiralt.com";

/* Permet de convertir les caractères spéciaux en caractères HTML pour éviter les failles XSS */
app.use(express.json());

// const sslOptions = {
//   pfx: fs.readFileSync(
//     "C:\\ProgramData\\certify\\assets\\chat-bot.lgiralt.com\\20240106_efe12df0.pfx"
//   ),
// };

// Servir les fichiers statiques de votre projet
app.use(express.static("public"));

// const server = https.createServer(sslOptions, app);

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
