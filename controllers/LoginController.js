import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login"); // Certifique-se de ter uma view chamada 'login.ejs'
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado!' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: 'Senha incorreta!' });
    }

    // Caso a autenticação seja bem-sucedida
    res.json({ message: 'Login bem-sucedido!' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Erro no servidor!' });
  }
});

export default router;
