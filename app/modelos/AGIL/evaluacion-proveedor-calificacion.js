module.exports = function (sequelize, Sequelize) {
	var EvaluacionProveedorCalificacion = sequelize.define('agil_evaluacion_proveedor_calificacion', {
		id_evaluacion: {
			type: Sequelize.INTEGER,
			field: 'evaluacion'
		},
		id_concepto: {
			type: Sequelize.INTEGER,
			field: 'concepto'
		},
		total: {
			type: Sequelize.DECIMAL(20,4),
			field: 'total'
		},
	}, {
			freezeTableName: true
		});

	EvaluacionProveedorCalificacion.sync();

	return EvaluacionProveedorCalificacion;
}