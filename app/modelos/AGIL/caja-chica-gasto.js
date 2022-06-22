module.exports = function (sequelize, Sequelize) {
    var CajaChicaGasto = sequelize.define('agil_caja_chica_gasto', {
        numero: {
            type: Sequelize.INTEGER,
            field: 'numero'
        },
        id_nivel: {
            type: Sequelize.INTEGER,
            field: 'nivel'
        },
        nombre: {
            type: Sequelize.STRING,
            field: 'nombre'
        },
        id_cuenta: {
            type: Sequelize.INTEGER,
            field: 'cuenta'
        },
        id_concepto: {
            type: Sequelize.INTEGER,
            field: 'concepto'
        },
        combustible_recorrido: {
            type: Sequelize.BOOLEAN,
            field: 'combustible_recorrido'
        },
        usar_producto: {
            type: Sequelize.BOOLEAN,
            field: 'usar_producto'
        },
        eliminado:{
            type: Sequelize.BOOLEAN,
            field: 'eliminado'
        }
    }, {
            freezeTableName: true
        });

    CajaChicaGasto.sync();

    return CajaChicaGasto;
}