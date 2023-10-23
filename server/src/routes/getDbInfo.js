const { Driver } = require ('sequelize');

const getDbInfo = async () => {
    try {
      const drivers = await Driver.findAll({
        include: {
          model: Team,
          attributes: ['name'],
          through: {
            attributes: [],
          },
        },
      });
      return drivers;
    } catch (error) {
      console.error('Error al obtener conductores desde la base de datos:', error.message);
      throw error;
    }
  };

module.exports = getDbInfo;