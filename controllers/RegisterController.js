import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post("/register", async (req, res) => {
  const { firstname, lastname, email, phoneNumber, password, confirmPassword, gender } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'As senhas não coincidem!' });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email já registrado!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstname,
      lastname,
      email,
      phoneNumber,
      password: hashedPassword,
      gender,
    });

    res.status(201).json({ message: 'Usuário criado com sucesso!' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Erro no servidor!' });
  }
});

router.get("/register", (req, res) => {
  res.render("register"); // Certifique-se de ter uma view chamada 'register.ejs'
});

router.put("/update-email", async (req, res) => {
    const { userId, newEmail } = req.body;
  
    try {
      const user = await User.findByPk(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado!' });
      }
  
      user.email = newEmail;
      await user.save();
  
      res.json({ message: 'E-mail alterado com sucesso!' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro no servidor!' });
    }
  });
  

  router.delete("/delete-account", async (req, res) => {
    const { userId } = req.body;
  
    try {
      const user = await User.findByPk(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado!' });
      }
  
      await user.destroy();
      res.json({ message: 'Conta deletada com sucesso!' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro no servidor!' });
    }
  });
  

export default router;
