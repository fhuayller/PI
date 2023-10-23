const axios = require("axios"); //solicitud de ID solo a la API

const getDetailedDriver = async (req, res) => {
  const idDriver = req.params.idDriver;

  try {
    const response = await axios.get(`http://localhost:5000/drivers/${idDriver}`);

    if (!response.data) {
      return res.status(404).json({ message: "Conductor no encontrado en la API" });
    }

    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ message: "Conductor no encontrado en la API" });
    }
    console.error('Error al obtener detalles del conductor desde la API:', error.message);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = getDetailedDriver;