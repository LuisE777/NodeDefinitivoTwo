module.exports = function (sequelize, Sequelize) {
	var RrhhEmpleadoOtrosBonos = sequelize.define('agil_rrhh_empleado_otros_bonos', {
		id_ficha: {
			type: Sequelize.INTEGER,
			field: 'ficha'
		},
		fecha: {
			type: Sequelize.DATE,
			field: 'fecha'
		},
		monto: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'monto'
		},
		observacion: {
			type: Sequelize.STRING,
			field: 'observacion'
		},
		eliminado: {
			type: Sequelize.BOOLEAN,
			field: 'eliminado'
		},
		id_usuario: {
			type: Sequelize.INTEGER,
			field: 'id_usuario'
		}

	}, {
			freezeTableName: true
		});

	RrhhEmpleadoOtrosBonos.sync().then(function () {

	});

	return RrhhEmpleadoOtrosBonos;
}
