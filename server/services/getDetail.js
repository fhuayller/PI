const getDbInfo = require('./getDbInfo')
const getAllDrivers = require('./getAllDrivers')

const getDetail = async () => {
    try {
      const serializedDbInfo = await getDbInfo();
      const apiDrivers = await getAllDrivers();
      const allDrivers = [...apiDrivers, ...JSON.parse(serializedDbInfo)]; // convierto la cadena JSON a un objeto antes de combinar
      console.log(allDrivers);
      return allDrivers;
    } catch (error) {
      console.error('Error al obtener detalles de conductores:', error.message);
      throw error;
    }
};

module.exports = getDetail