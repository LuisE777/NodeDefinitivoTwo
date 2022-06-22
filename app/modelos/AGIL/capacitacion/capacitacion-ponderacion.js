module.exports = function (sequelize, Sequelize) {
	CapacitacionPonderacion = sequelize.define('agil_capacitacion_ponderacion', {
        id_empresa: {
			type: Sequelize.INTEGER,
			field: 'empresa'
		},
		nombre: {
			type: Sequelize.STRING,
			field: 'nombre'
		},
        nota_maxima: {
			type: Sequelize.STRING,
			field: 'nota_maxima'
		},
        nota_minima: {
			type: Sequelize.STRING,
			field: 'nota_minima'
		},
		numerico: {
			type: Sequelize.BOOLEAN,
			field: 'numerico',
            defaultValue: false
		},
		habilitado: {
			type: Sequelize.BOOLEAN,
			field: 'habilitado',
            defaultValue: false
		},
		eliminado: {
			type: Sequelize.BOOLEAN,
			field: 'eliminado',
            defaultValue: false
		},
		
	}, {
		freezeTableName: true
	});

	CapacitacionPonderacion.sync().then(function () {

	});

	return CapacitacionPonderacion;
}