module.exports = function (sequelize, Sequelize) {
    var MedicoVacunaProducto = sequelize.define('agil_medico_vacuna_producto', {
        id_vacuna: {
            type: Sequelize.INTEGER,
            field: 'id_vacuna'
        },
        id_producto: {
            type: Sequelize.INTEGER,
            field: 'id_producto'
        },
        eliminado: {
            type: Sequelize.BOOLEAN,
            field: 'eliminado'
        }
    }, {
            freezeTableName: true
        });

        MedicoVacunaProducto.sync().then(function () {

    });

    return MedicoVacunaProducto;
}