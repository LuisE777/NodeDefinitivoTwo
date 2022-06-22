
module.exports = function (sequelize, Sequelize) {
    var RrhhEmpleadoPlanificacionSubsidio = sequelize.define('agil_rrhh_empleado_planificacion_subsidio', {     
        id_empleado: {
            type: Sequelize.INTEGER,
            field: 'id_empleado'
        },
        tipo_subsidio: {
			type: Sequelize.INTEGER,
			field: 'tipo_subsidio'
		},
        mes_gestacion: {
            type: Sequelize.INTEGER,
            field: 'mes_gestacion'
        },
        fecha_reporte: {
            type: Sequelize.DATE,
            field: 'fecha_reporte'
        },
        cantidad: {
            type: Sequelize.INTEGER,
            field: 'cantidad'
        },
        observaciones: {
            type: Sequelize.STRING,
            field: 'observaciones'
        },
        vincular_hijo: {
			type: Sequelize.INTEGER,
			field: 'vincular_hijo'
        },
        vincular_veneficiaria: {
			type: Sequelize.INTEGER,
			field: 'vincular_veneficiaria'
        },
        hijo_gestacion: {
            type: Sequelize.INTEGER,
            field: 'hijo_gestacion'
        },
        nro_asignacion: {
            type: Sequelize.INTEGER,
            field: 'nro_asignacion'
        }
    }, {
            freezeTableName: true
        });

        RrhhEmpleadoPlanificacionSubsidio.sync().then(function () {

    });

    return RrhhEmpleadoPlanificacionSubsidio;
}