const getDetailDriverDb = async (idDriver) => { //busqueda por UUID a la base de datos
    return await Driver.findByPk(idDriver, {
      include: {
        model: Team,
        attributes: ['name'],
        through: {
          attributes: [], // incluimos el modelo Team, que incluya el atributo 'name' mediante ese atributo
        },
      },
    });
};

module.exports = getDetailDriverDb