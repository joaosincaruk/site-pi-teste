import Hortalicas from './hortalicas.js';
import Fertilizantes from './fertilizante.js';
import Nivel from './nivel.js';

const models = {
  Hortalicas,
  Fertilizantes,
  Nivel
};

// Chamar as associações de todos os modelos
Hortalicas.associate(models);
Nivel.associate(models);

export default models;
