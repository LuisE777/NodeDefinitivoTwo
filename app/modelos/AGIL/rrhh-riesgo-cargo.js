module.exports = function (sequelize, Sequelize) {
    var RiesgoCargo = sequelize.define('agil_rrhh_riesgo_cargo', {
        id_cargo: {
            type: Sequelize.INTEGER,
            field: 'cargo'
        },
        nombre_riesgo: {
            type: Sequelize.STRING(41),
            field: 'nombre_riesgo'
        },
        descripcion: {
            type: Sequelize.STRING(151),
            field: 'descripcion'
        },
        id_empresa: {
            type: Sequelize.INTEGER,
            field: 'empresa',
            validate: {
                notEmpty: true
            }
        },
        eliminado: {
            type: Sequelize.BOOLEAN,
            field: 'eliminado',
            defaultValue: 0
        }
    }, {
            indexes: [
                {
                    unique: true,
                    fields: ['cargo', 'nombre_riesgo', 'empresa']
                }
            ]
        },
        {
            freezeTableName: true
        });

    RiesgoCargo.sync();

    return RiesgoCargo;
}