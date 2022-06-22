module.exports = function (sequelize, Sequelize) {
	CapacitacionCalificacion = sequelize.define('agil_capacitacion_calificacion', {
		id_ponderacion: {
			type: Sequelize.INTEGER,
			field: 'ponderacion'
		},		
		eliminado: {
			type: Sequelize.BOOLEAN,
			field: 'eliminado',
            defaultValue: false
		},
		predefinido: {
			type: Sequelize.BOOLEAN,
			field: 'predefinido',
            defaultValue: false
		},
	}, {
		freezeTableName: true
	});

	CapacitacionCalificacion.sync().then(function () {

	});

	return CapacitacionCalificacion;
}