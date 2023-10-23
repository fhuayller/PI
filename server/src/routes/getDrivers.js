const axios  = require("axios"); //solicitud a la API en la main page para mostrar solo informacion relevante, sin detalles

const getDrivers = async () =>{
    const response = await axios.get('http://localhost:5000/drivers');
        const drivers = await response.data.map(elem =>{
            return {
                id: elem.id,
                name: elem.name,
                image: elem.image,
                nationality: elem.nationality,
                teams: elem.teams
            }
        })
    return drivers
}

module.exports = getDrivers;