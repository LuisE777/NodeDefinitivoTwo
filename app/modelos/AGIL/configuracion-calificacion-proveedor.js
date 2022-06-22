module.exports = function (sequelize, Sequelize) {
	var ConfiguracionCalificacionProveedor = sequelize.define('agil_configuracion_calificacion_proveedor', {
		id_empresa: {
			type: Sequelize.INTEGER,
			field: 'empresa'
		},
		id_concepto: {
			type: Sequelize.INTEGER,
			field: 'concepto'
        },
		porcentaje: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'porcentaje'
        },
	}, {
			freezeTableName: true
		});

		ConfiguracionCalificacionProveedor.sync().then(function () {

	});

	return ConfiguracionCalificacionProveedor;
}