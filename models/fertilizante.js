import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";

const Fertilizantes = connection.define('fertilizantes', {
  id_fertilizante: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  fertilizante: {
    type: Sequelize.STRING,
    allowNull: false
  },
  id_hortalica: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});
// Criando a tabela somente se ainda não existir
Fertilizantes.sync({force: false})
export default Fertilizantes;
