module.exports = function (sequelize, Sequelize) {
    var AsientoContabilidadCentroCosto = sequelize.define('agil_asiento_contabilidad_centro_costo', {
        id_asiento_contabilidad: {
            type: Sequelize.INTEGER,
            field: 'asiento_contabilidad'
        },
        id_centro_costo: {
            type: Sequelize.INTEGER,
            field: 'centro_costo'
        },
    }, {
            freezeTableName: true
        });

    AsientoContabilidadCentroCosto.sync();

    return AsientoContabilidadCentroCosto;
}