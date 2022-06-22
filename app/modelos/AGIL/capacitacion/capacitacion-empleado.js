module.exports = function (sequelize, Sequelize) {
	CapacitacionEstudiante = sequelize.define('agil_capacitacion_estudiante', {
		id_capacitacion: {
			type: Sequelize.INTEGER,
			field: 'capacitacion'
		},
        id_empleado: {
			type: Sequelize.INTEGER,
			field: 'empleado'
		},
        nombre_empleado: {
            type: Sequelize.STRING,
			field: 'nombre_empleado'
        },
		ci: {
			type: Sequelize.STRING,
			field: 'ci'
		},
        campo: {
			type: Sequelize.STRING,
			field: 'campo'
		},
        nota: {
			type: Sequelize.STRING,
			field: 'nota'
		},
		comentario: {
			type: Sequelize.TEXT("long"),
			field: 'comentario'
		},
		eliminado: {
			type: Sequelize.BOOLEAN,
			field: 'eliminado',
            defaultValue: false
		},
		
	}, {
		freezeTableName: true
	});

	CapacitacionEstudiante.sync().then(function () {

	});

	return CapacitacionEstudiante;
}