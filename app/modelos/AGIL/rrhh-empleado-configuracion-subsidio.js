
module.exports = function (sequelize, Sequelize) {
    var RrhhEmpleadoConfiguracionSubsidio = sequelize.define('agil_rrhh_empleado_configuracion_subsidio', {     
        id_empresa: {
            type: Sequelize.INTEGER,
            field: 'id_empresa'
        },
        tipo_subsidio: {
			type: Sequelize.STRING,
			field: 'tipo_subsidio'
		},
        meses: {
            type: Sequelize.INTEGER,
            field: 'meses'
        },
        mes_gestacion: {
            type: Sequelize.INTEGER,
            field: 'mes_gestacion'
        },
        monto: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'monto'
		},
        control_medico: {
            type: Sequelize.BOOLEAN,
            field: 'control_medico'
        },
        vincular_hijo: {
            type: Sequelize.BOOLEAN,
            field: 'vincular_hijo'
        },
        planillas: {
            type: Sequelize.BOOLEAN,
            field: 'planillas'
        }
    }, {
            freezeTableName: true
        });

        RrhhEmpleadoConfiguracionSubsidio.sync().then(function () {

    });

    return RrhhEmpleadoConfiguracionSubsidio;
}