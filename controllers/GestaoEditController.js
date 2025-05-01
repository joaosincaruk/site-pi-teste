import express from "express";
import Hortalicas from "../models/hortalicas.js";
import Fertilizantes from "../models/fertilizante.js";
import Nivel from "../models/nivel.js";

const router = express.Router();

// Rota para exibir o formulário de edição de hortaliças (GET)
router.get("/gestaoHortalicas/edit/:id", async (req, res) => {
  const id = req.params.id;

  try {
    // Buscar a hortalica pelo ID
    const hortalica = await Hortalicas.findByPk(id);
    if (!hortalica) {
      return res.status(404).send("Hortaliça não encontrada.");
    }

    // Buscar o fertilizante associado
    const fertilizante = await Fertilizantes.findOne({ where: { id_hortalica: id } });

    // Buscar o nível de água associado
    const nivel = await Nivel.findOne({ where: { id_hortalica: id } });

    // Passar os dados da hortalica, fertilizante e nivel para a view
    res.render("gestaoEdit", {
      hortalica: hortalica, // Passando corretamente a variável hortalica para o EJS
      fertilizante: fertilizante,
      nivel: nivel,
      gestaoHortalicas: await Hortalicas.findAll(), // Passando todas as hortaliças para a seleção
    });
  } catch (error) {
    console.error("Erro ao editar a hortalica:", error);
    res.status(500).send("Erro ao editar a hortalica.");
  }
});

// Rota POST para salvar a edição de hortalica (EDIT)
router.post("/gestaoHortalicas/edit/:id", async (req, res) => {
  const id = req.params.id;
  const { nome_hortalica, tipo_hortalica, fertilizante, nivel_agua } = req.body;

  try {
    // Atualizar dados da hortalica
    await Hortalicas.update(
      { nome_hortalica, tipo_hortalica },
      { where: { id_hortalica: id } }
    );

    // Atualizar fertilizante
    if (fertilizante) {
      await Fertilizantes.update(
        { fertilizante },
        { where: { id_hortalica: id } }
      );
    }

    // Atualizar nível de água
    if (nivel_agua) {
      await Nivel.update(
        { nivel_agua },
        { where: { id_hortalica: id } }
      );
    }

    console.log("Dados atualizados com sucesso!");
    res.redirect("/gestaoHortalicas");
  } catch (error) {
    console.error("Erro ao salvar dados:", error);
    res.status(500).send("Erro ao salvar dados.");
  }
});

// Rota para listar hortaliças (GET)
router.get("/gestaoHortalicas", async (req, res) => {
  try {
    const gestaoHortalicas = await Hortalicas.findAll({
      include: [
        { model: Fertilizantes, as: "fertilizantes" },
        { model: Nivel, as: "niveis" },
      ],
    });
    res.render("gestaoHortalicas", { gestaoHortalicas });
  } catch (err) {
    console.error("Erro ao carregar gestão de hortaliças:", err);
    res.status(500).send("Erro ao carregar gestão de hortaliças.");
  }
});

// Rota de exclusão de hortalica
router.get("/gestaoHortalicas/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    // Excluir fertilizantes associados
    await Fertilizantes.destroy({ where: { id_hortalica: id } });

    // Excluir a hortalica
    await Hortalicas.destroy({ where: { id_hortalica: id } });

    // Excluir nível de água associado
    await Nivel.destroy({ where: { id_hortalica: id } });

    console.log(`Hortaliça com ID ${id} excluída com sucesso!`);
    res.redirect("/gestaoHortalicas");
  } catch (error) {
    console.error("Erro ao excluir:", error);
    res.status(500).send("Erro ao excluir a hortaliça.");
  }
});

export default router;
