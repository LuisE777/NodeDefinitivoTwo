module.exports = function (sequelize, Sequelize) {
	var EvaluacionProveedorCalificacionGeneral = sequelize.define('agil_evaluacion_proveedor_calificacion_general', {
		id_detalle_evaluacion: {
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

	EvaluacionProveedorCalificacionGeneral.sync();

	return EvaluacionProveedorCalificacionGeneral;
}