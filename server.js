const express = require("express");
const app = express();
const PORT = 3021;

// Servir les fichiers statiques de votre projet
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
