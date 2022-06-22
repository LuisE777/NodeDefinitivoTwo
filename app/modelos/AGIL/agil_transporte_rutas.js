module.exports = function (sequelize, Sequelize) {
    var Rutas = sequelize.define('agil_transporte_rutas', {
        origen: {
            type: Sequelize.STRING,
            field: 'origen'
        },
        destino: {
            type: Sequelize.STRING,
            field: 'destino'
        },
        costo: {
            type: Sequelize.INTEGER,
            field: 'costo'
        },
        id_empresa: {
            type: Sequelize.INTEGER,
            field: 'id_empresa'
        }
    }, {
            freezeTableName: true
        });

    Rutas.sync().then(function () {

    });

    return Rutas;
}