const getDetail = require('./getApiDb'); //problema al modularizar no se encuentra el findAll, va en router.get, pero no funciona

const routerGet = async (req, res) => {
  try {
    const getDr = await getDetail();

    if (getDr) {
      return res.json(getDr);
    } else {
      return res.status(404).json({ message: 'No existen conductores' });
    }
  } catch (error) {
    console.error('Error en la ruta:', error.message);
    return res.status(500).send('Error interno del servidor');
  }
};

module.exports = {
  routerGet,
};