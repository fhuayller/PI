const { axios } = require('axios'); //info detallada de todos los drivers tanto de la base de datos como de la API

const getAllDrivers = require('./getAllDrivers');
const getDbInfo = require ('./getDbInfo');

const getDetail = async () => {
    try {
      const drivers = await getAllDrivers();
      const dbInfo = await getDbInfo();
      const allDrivers = drivers.concat(dbInfo);
      return allDrivers;
    } catch (error) {
      console.error('Error al obtener detalles de conductores:', error.message);
      throw error;
    }
  };

module.exports = getDetail