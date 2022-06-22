module.exports = function (sequelize, Sequelize) {
    var ConfigVacunaProducto = sequelize.define('agil_config_vacuna_producto', {
        id_grupo: {
            type: Sequelize.INTEGER,
            field: 'id_grupo'
        },
        id_subgrupo: {
            type: Sequelize.INTEGER,
            field: 'id_subgrupo'
        },
        id_empresa: {
            type: Sequelize.INTEGER,
            field: 'id_empresa'
        },
        eliminado: {
            type: Sequelize.BOOLEAN,
            field: 'eliminado'
        }
    }, {
            freezeTableName: true
        });

        ConfigVacunaProducto.sync().then(function () {

    });
    return ConfigVacunaProducto;
}