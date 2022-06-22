module.exports = function (sequelize, Sequelize) {
	DetalleCapacitacionCalificacion = sequelize.define('agil_capacitacion_detalle_calificacion', {
		id_calificacion: {
			type: Sequelize.INTEGER,
			field: 'calificacion'
		},
		nombre: {
			type: Sequelize.STRING,
			field: 'nombre'
		},
        desde: {
			type: Sequelize.STRING,
			field: 'desde'
		},
        hasta: {
			type: Sequelize.STRING,
			field: 'hasta'
		},
		eliminado: {
			type: Sequelize.BOOLEAN,
			field: 'eliminado',
            defaultValue: false
		},
		
	}, {
		freezeTableName: true
	});

	DetalleCapacitacionCalificacion.sync().then(function () {

	});

	return DetalleCapacitacionCalificacion;
}