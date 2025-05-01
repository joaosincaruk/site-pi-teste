//Importando o sequelize
import Sequelize from "sequelize";

//Criando os dados de conexão com o banco de dados:
const connection = new Sequelize("greenrise", "root", "", {
    //instância da classe de Sequelize
    dialect: 'mysql',
    host: 'localhost',
    port: '3306',
    username:'root',
    password: '', //sem senha
    //Comente a linha abaixo na primeira execução do projeto
     database:'greenrise', //nome do banco (primeiro precisa criar o banco)
    timezone: "-03:00",
}) 
export default connection; //exportando o módulo    