const axios  = require('axios');

const getAllDrivers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/drivers');
      return response.data;
    } catch (error) {
      console.error('Error al obtener conductores desde la API:', error.message);
      throw error;
    }
};

module.exports = getAllDrivers