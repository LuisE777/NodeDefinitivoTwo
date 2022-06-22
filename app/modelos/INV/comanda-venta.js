module.exports = function (sequelize, Sequelize) {
	var ComandaVenta = sequelize.define('comanda_venta', {
		id_venta: {
			type: Sequelize.INTEGER,
			field: 'id_venta'
		},
		numero: {
			type: Sequelize.BIGINT,
			field: 'numero'
		},
		fecha: {
			type: Sequelize.DATE,
			field: 'fecha'
		},
		total: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'total'
		}
	}, {
		freezeTableName: true
	});

	ComandaVenta.sync().then(function () {

	});

	return ComandaVenta;
}