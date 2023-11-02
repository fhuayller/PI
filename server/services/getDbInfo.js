const { Driver, Team } = require("../src/db");

const getDbInfo = async () => {
    try {
      const drivers = await Driver.findAll({
        include: [
          {
            model: Team,
            attributes: ['id', 'name'],
            through: { attributes: [] },
          },
        ],
      });
      
      const serializedDrivers = JSON.stringify(drivers.map(driver => driver.toJSON()), (key, value) => {
        if (key === 'teams') {
          return value.map(team => ({ id: team.id, name: team.name }));
        }
        return value;
      });
  
      return serializedDrivers; 
    } catch (error) {
      console.error('Error al obtener conductores desde la base de datos:', error.message);
      throw error;
    }
};

module.exports = getDbInfo