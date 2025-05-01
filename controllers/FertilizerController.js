import express from "express";
import Fertilizantes from "../models/fertilizante.js";

const router = express.Router();

// Salvar fertilizante
router.post("/fertilizante", async (req, res) => {
  const { fertilizante, id_hortalica } = req.body;

  try {
    await Fertilizantes.create({
      fertilizante,
      id_hortalica
    });

    console.log("Fertilizante salvo com sucesso!");

    
    res.redirect("/registerHortalica");
  } catch (err) {
    console.error("Erro ao salvar fertilizante:", err);
    res.status(500).send("Erro ao salvar fertilizante.");
  }
});

export default router;
