import express from "express";
import Nivel from "../models/nivel.js";

const router = express.Router();

// Salvar Nivel
// Rota para salvar nível de água
router.post("/nivel", async (req, res) => {
    const { nivel_agua, id_hortalica } = req.body;
  
    try {
      await Nivel.create({
        nivel_agua,
        id_hortalica
      });
  
      console.log("Nível da água salvo com sucesso!");
      res.redirect("/registerHortalica");
    } catch (err) {
      console.error("Erro ao salvar Nível:", err);
      res.status(500).send("Erro ao salvar Nível.");
    }
  });
  
  
export default router;
