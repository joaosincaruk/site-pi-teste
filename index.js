// Importando Express

import express from "express";

//Importando Rotas

import HortalicasController from "./controllers/HortalicasController.js";
import FertilizerController from "./controllers/FertilizerController.js";
import WaterLevelController from "./controllers/WaterLevelController.js";
import AiAutomationController from "./controllers/AiAutomationController.js";
import DashboardController from "./controllers/DashboardController.js";
import GestaoHortalicasController from "./controllers/GestaoHortalicasController.js";
import "./models/associations.js";
import GestaoEditController from "./controllers/GestaoEditController.js";
import RegisterController from "./controllers/RegisterController.js";
import LoginController from "./controllers/LoginController.js";

connection.sync()
  .then(() => {
    console.log("Banco de dados sincronizado!");
  })
  .catch((error) => {
    console.log("Erro ao sincronizar o banco de dados:", error);
  });


// Iniciando express na variável app

const app = express();

// Configurando a view engine
app.set("view engine", "ejs");

// Servindo arquivos estáticos
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // ← necessário para POST de formulário

// Rota principal
app.get("/", (req, res) => {
  res.render("index");
});


// Rotas
app.use("/", HortalicasController);
app.use("/", FertilizerController);
app.use("/", WaterLevelController);
app.use("/", AiAutomationController);
app.use("/", DashboardController);
app.use("/", GestaoHortalicasController);
app.use("/", GestaoEditController);
app.use("/", RegisterController);
app.use("/", LoginController);


// Inicialização do servidor
app.listen(8080, (error) => {
  if (error) {
    console.error("Erro ao iniciar o servidor:", error);
  } else {
    console.log("Servidor iniciado com sucesso na porta 8080!");
  }
});

//Importando o Sequelize-config com os dados da conexão
import connection from "./config/sequelize-config.js";

//Realizando a conexão com o banco de dados
//Then() -> trata o sucesso
//catch() -> trata a falha

// Comentando banco de dados para não dar erro!

connection
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco realizada com sucesso!");
  })
  .catch((error) => {
    console.log(error); //conceito promisse
  });
  

//Criando o banco de dados do projeto (se ele ainda não existir)
// Comentando banco de dados para não dar erro!

connection
  .query(`CREATE DATABASE IF NOT EXISTS greenrise;`)
  .then(() => {
    console.log("O banco de dados está criado!");
  })
  .catch((error) => {
    console.log(error);
  }); //abrir o Xampp e iniciar o servidor

import "./models/hortalicas.js";
