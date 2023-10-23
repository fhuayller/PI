const getDetailedDriver = require('./getDetailedDriver'); //Busqueda ID en base de datos y API
const getDetailDriverDb = require ('./getDetailDriverDb');

const getIdDriver = async (req, res) =>{
    const idDriver = req.params.idDriver

    try{
        const apiDriver = await getDetailedDriver(idDriver);
        const dbDriver =  await getDetailDriverDb(idDriver);

        if(apiDriver){
            return res.json(apiDriver);
        }

        if(dbDriver){
            return res.json(dbDriver)
        }
        
        return res.status(404).json({message: "No se encontró el conductor"})
    }
    catch(error){
        console.error(error.message)
        return res.status(500).json({message: 'Error interno del servidor'})
    }
}

module.exports = getIdDriver;