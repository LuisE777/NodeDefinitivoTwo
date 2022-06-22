module.exports = function (sequelize, Sequelize) {
	var DetalleComanda = sequelize.define('detalle_comanda', {
		id_comanda: {
			type: Sequelize.INTEGER,
			field: 'id_comanda'
		},
		id_producto: {
			type: Sequelize.INTEGER,
			field: 'id_producto'
		},
		precio_unitario: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'precio_unitario'
		},
		cantidad: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'cantidad'
		},
		total: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'total'
		}
	}, {
		freezeTableName: true
	});

	DetalleComanda.sync();

	return DetalleComanda;
}