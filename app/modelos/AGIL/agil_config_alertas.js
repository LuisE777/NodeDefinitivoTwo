module.exports = function (sequelize, Sequelize) {
    var ConfigAlertas = sequelize.define('agil_config_alertas', {
        id_empresa: {
            type: Sequelize.INTEGER,
            field: 'id_empresa'
        },
        dias_anticipacion: {
            type: Sequelize.INTEGER,
            field: 'dias_anticipacion'
        },
        tipo: {
            type: Sequelize.STRING,
            field: 'tipo'
        }
    }, {
            freezeTableName: true
        });

    ConfigAlertas.sync().then(() => {
        sequelize.query("INSERT IGNORE INTO agil_config_alertas SET id = 1,id_empresa=35, dias_anticipacion=10, tipo='VACUNAS', createdAt = NOW(),updatedAt = NOW();").spread(function(results, metadata) {});
        sequelize.query("INSERT IGNORE INTO agil_config_alertas SET id = 2,id_empresa=35, dias_anticipacion=10, tipo='PREREQUISITOS', createdAt = NOW(),updatedAt = NOW();").spread(function(results, metadata) {});
    })

    return ConfigAlertas;
}