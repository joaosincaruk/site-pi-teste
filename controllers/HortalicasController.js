import express from "express";
import Hortalicas from "../models/hortalicas.js";
import Fertilizantes from "../models/fertilizante.js";
import Nivel from "../models/nivel.js"; 

const router = express.Router();


router.post("/hortalicas", async (req, res) => {
  const { nome_hortalica, tempo_estimado, tempo_real, tipo_hortalica } = req.body;

  try {
    
    await Hortalicas.create({
      nome_hortalica,
      tempo_estimado,
      tempo_real,
      tipo_hortalica,
    });

    console.log("Hortaliça salva com sucesso!");

    
    res.redirect("/registerHortalica");
  } catch (err) {
    console.error("Erro ao salvar no banco:", err);
    res.status(500).send("Erro ao salvar no banco.");
  }
});

router.get("/registerHortalica", async (req, res) => {
  try {
    const gestaoHortalicas = await Hortalicas.findAll({
      include: [
        { model: Fertilizantes, as: "fertilizantes" },
        { model: Nivel, as: "niveis" }
      ]
    });

   
    res.render("registerHortalica", { gestaoHortalicas });
  } catch (err) {
    console.error("Erro ao carregar hortaliças:", err);
    res.status(500).send("Erro ao carregar hortaliças.");
  }
});

export default router;
