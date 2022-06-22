
module.exports = function (sequelize, Sequelize) {
    var RrhhEmpleadoSeguimientoSubsidio = sequelize.define('agil_rrhh_empleado_seguimiento_subsidio', {     
        id_empleado: {
            type: Sequelize.INTEGER,
            field: 'id_empleado'
        },
        id_planificacion: {
			type: Sequelize.INTEGER,
			field: 'id_planificacion'
		},
        fecha: {
            type: Sequelize.DATE,
            field: 'fecha'
        },
        medico: {
            type: Sequelize.STRING,
            field: 'medico'
        },
        num_control: {
			type: Sequelize.INTEGER,
			field: 'num_control'
        },
        documento: {
            type: Sequelize.STRING,
            field: 'documento'
        }
    }, {
            freezeTableName: true
        });

        RrhhEmpleadoSeguimientoSubsidio.sync().then(function () {

    });

    return RrhhEmpleadoSeguimientoSubsidio;
}