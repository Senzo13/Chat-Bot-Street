import express from "express";
import DataController from "~controllers/data.controllers";

const router = express.Router();

/* Permet d'ajouter les logs de chaque question posée par l'utilisateur */
router.post("/api/logs/add", DataController.addLogs); // Route pour ajouter les logs

/* Permet d'ajouter une question/réponse à la base de données */
router.post("/api/questions/add", DataController.addGoodQuestionAndAnswer);

/* Permet de récupérer la base de données */
router.get("/api/data", DataController.getData); // Route pour récupérer la base de données

/* Permet de chercher dans la base de données */
router.get("/api/search", DataController.search); // Route pour chercher dans la base de données

/* Permet de supprimer une entrée de la base de données */
router.delete("/api/delete/:id", DataController.deleteEntry);

/* Permet d'éditer une entrée de la base de données */
router.put("/api/edit/:id", DataController.editEntry);

export default router;
