module.exports = function (sequelize, Sequelize) {
	CapacitacionDocente = sequelize.define('agil_capacitacion_docente', {
		id_capacitacion: {
			type: Sequelize.INTEGER,
			field: 'capacitacion'
		},
		detalle_docente: {
			type: Sequelize.TEXT("long"),
			field: 'detalle_docente'
		},
		eliminado: {
			type: Sequelize.BOOLEAN,
			field: 'eliminado',
            defaultValue: false
		},
		
	}, {
		freezeTableName: true
	});

	CapacitacionDocente.sync().then(function () {

	});

	return CapacitacionDocente;
}