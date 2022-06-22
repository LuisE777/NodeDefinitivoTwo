module.exports = function (sequelize, Sequelize) {
    var ConfigMantenimiento = sequelize.define('agil_config_mantenimiento', {
        id_empresa: {
            type: Sequelize.INTEGER,
            field: 'id_empresa'
        },
        mantenimiento_default: {
            type: Sequelize.STRING,
            field: 'mantenimiento_default'
        },
        hrs_hombre: {
            type: Sequelize.DECIMAL(20,2),
            field: 'hrs_hombre'
        },
        factor_hhmm: {
            type: Sequelize.BOOLEAN,
            field: 'factor_hhmm'
        },
        especialidades_grupal: {
            type: Sequelize.BOOLEAN,
            field: 'especialidades_grupal'
        }
    }, {
            freezeTableName: true
        });

    ConfigMantenimiento.sync();

    return ConfigMantenimiento;
}