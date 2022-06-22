module.exports = function (sequelize, Sequelize) {
	var DetalleCalificacionProveedor = sequelize.define('agil_detalle_calificacion_proveedor', {
		id_compra: {
			type: Sequelize.INTEGER,
			field: 'compra'
		},
		id_concepto: {
			type: Sequelize.INTEGER,
			field: 'concepto'
        },
		valor: {
			type: Sequelize.BOOLEAN,
			field: 'valor'
		},
		puntuacion: {
			type: Sequelize.INTEGER,
			field: 'puntuacion'
        },
	}, {
			freezeTableName: true
		});

		DetalleCalificacionProveedor.sync().then(function () {

	});

	return DetalleCalificacionProveedor;
}