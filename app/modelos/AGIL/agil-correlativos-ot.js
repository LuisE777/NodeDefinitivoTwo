module.exports = function (sequelize, Sequelize) {
    var CorrelativoOt = sequelize.define('agil_correlativos_ot', {
        id_sucursal: {
            type: Sequelize.INTEGER,
            field: 'id_sucursal'
        },
        id_especialidad: {
            type: Sequelize.INTEGER,
            field: 'id_especialidad'
        },
        activo: {
			type: Sequelize.BOOLEAN,
			field: 'activo'
		},
        numeracion: {
            type: Sequelize.INTEGER,
            field: 'numeracion',
            default: 1
        }
    }, {
        freezeTableName: true
    });
    CorrelativoOt.sync().then(function () {
    });
    return CorrelativoOt;
}