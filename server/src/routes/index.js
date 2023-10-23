const { Router } = require("express");
const { Driver, Team } = require("../db");
const axios  = require('axios');
const router = Router();
const express = require('express')
// const getIdDriver = require('./getDriversApiDb');
const app = express();

app.use(express.json())

const getDbInfo = async () => {
  try {
    const drivers = await Driver.findAll({
      include: {
        model: Team,
        attributes: ['name'],
      },
    });
    console.log(drivers)
    return drivers;
  } catch (error) {
    console.error('Error al obtener conductores desde la base de datos:', error.message);
    throw error;
  }
};

const getAllDrivers = async () => {
  try {
    const response = await axios.get('http://localhost:5000/drivers');
    return response.data;
  } catch (error) {
    console.error('Error al obtener conductores desde la API:', error.message);
    throw error;
  }
};

const getDetail = async () => {
  try {
    const drivers = await getAllDrivers();
    const dbInfo = await getDbInfo();
    console.log(dbInfo)
    const allDrivers = drivers.concat(dbInfo);
    return allDrivers;
  } catch (error) {
    console.error('Error al obtener detalles de conductores:', error.message);
    throw error;
  }
};

router.get('/drivers', async (req, res) => {
  try {
    const getDr = await getDetail(); // Obtengo todos los drivers con las img y todos los datos.
    console.log('Aca no rompió')

    if (getDr) {
      // Modificar los datos para incluir una URL por defecto si la URL no está presente
      const driversWithDefaultImage = getDr.map(driver => ({
        ...driver,
        image: {
          url: driver.image && driver.image.url ? driver.image.url : 'https://secure.gravatar.com/avatar/998b605e85fbe8affac38e096f99ec96?s=80&d=mm&r=g',
          imageby: driver.image && driver.image.imageby ? driver.image.imageby : 'Autor Desconocido',
        },
      }));
      
      res.status(200).json(driversWithDefaultImage);
    } else {
      return res.status(404).json({ message: 'No existen conductores' });
    }
  } catch (error) {
    console.error('Error en la ruta:', error.message);
    return res.status(500).send('Error interno del servidor');
  }
});

router.get("/drivers/name", async (req, res) => {
  const searchQuery = req.query.name;

  try {
    const response = await axios.get(`http://localhost:5000/drivers`);
    const apiDrivers = response.data;

    // Filtrar conductores por nombre
    if (searchQuery) {
      const matchingDrivers = await apiDrivers.filter(driver => driver.name.forename.toLowerCase().includes(searchQuery.toLowerCase()));
      matchingDrivers.length ? // si encontró algo
        res.status(200).json(matchingDrivers) : // ":"
        res.status(404).json({ message: "No existe el conductor" });
    }
  } catch (error) {
    console.error('Error al buscar conductores por nombre en la API:', error.response.data);
    res.status(500).send("Error interno del servidor");
  }
});

router.get("/drivers/:idDriver", async (req, res) => { //listo
  const idDriver = req.params.idDriver;
  const totalDrivers = await getDetail();

  if (idDriver) {
    let driverId = totalDrivers.find(el => el.id == idDriver); 
    driverId ? //encontró algo?
      res.status(200).json(driverId) : //":" significa sino
      res.status(404).json({ message: "No se encontraron resultados" });
  }
});




router.post("/drivers", async (req, res) => {
  console.log('Solicitud recibida:', req.body);

  try {
    const { forename, surname, description, image, nationality, dob, teams } = req.body;

    if (!forename || !surname) {
      res.status(400).json({ message: "Se requieren forename, surname y al menos un equipo para crear un conductor" });
    }

    // crear el conductor en la base de datos
    const createdDriver = await Driver.create({
      forename,
      surname,
      description,
      image,
      nationality,
      dob,
  
    });

    // asociar equipos al conductor
    const associatedTeams = await Team.findAll({ where: { name: teams } }); //recorrer objetos y meter los ids en un array nuevo
    console.log(associatedTeams)
     createdDriver.addTeams(associatedTeams); //mandar unicamente IDs
     console.log(createdDriver)

    res.status(201).json({
      message: "Conductor creado exitosamente",
      driver: {
        id: createdDriver.id,
        forename: createdDriver.forename,
        surname: createdDriver.surname,
        description: createdDriver.description,
        image: createdDriver.image,
        nationality: createdDriver.nationality,
        dob: createdDriver.dob,
        updatedAt: createdDriver.updatedAt,
        createdAt: createdDriver.createdAt,
      },
    });
  } catch (error) {
    console.error("Error al crear el conductor:", error);
    res.status(500).send("Error interno del servidor");
  }
});

router.get("/teams", async (req, res) => { //listo
  try {
    const response = await axios.get("http://localhost:5000/drivers");
    const drivers = response.data;

    const teams = drivers
      .filter(driver => driver.teams && typeof driver.teams === 'string')
      .map(driver => driver.teams.split(',').map(team => team.trim()))
      .flat(); 

    const uniqueTeams = [...new Set(teams)];

    // Iterar sobre los equipos y realizar findOrCreate en la base de datos
    const teamPromises = uniqueTeams.map(async (teamName) => {
      const [team, created] = await Team.findOrCreate({
        where: { name: teamName },
      });
      return team;
    });

    const teamsFromDatabase = await Promise.all(teamPromises);

    res.status(200).json(teamsFromDatabase);
  } catch (error) {
    console.error("Error al obtener equipos desde la API o al interactuar con la base de datos:", error);
    res.status(500).send("Error interno del servidor");
  }
});


module.exports = router;
