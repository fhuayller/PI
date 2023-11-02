const { Router } = require("express");
const router = Router();
const express = require('express');
const {getDrivers, getIdDriver, getNames, getTeams, postDriver} = require ('../../getSolicitudes/getSolicitud')
// const getIdDriver = require('./getDriversApiDb');
const app = express();

app.use(express.json())

router.get('/drivers', getDrivers)

router.get("/drivers/name", getNames)

router.get("/drivers/:idDriver", getIdDriver)

router.post("/drivers", postDriver)

router.get("/teams", getTeams)

module.exports = router;
