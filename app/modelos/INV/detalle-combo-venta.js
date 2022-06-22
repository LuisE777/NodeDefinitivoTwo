module.exports = function (sequelize, Sequelize) {
	var DetalleComboVenta = sequelize.define('inv_detalle_combo_venta', {
		id_detalle_venta: {
			type: Sequelize.INTEGER,
			field: 'detalle_venta'
		},
		id_producto: {
			type: Sequelize.INTEGER,
			field: 'producto'
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
		},
		observaciones: {
			type: Sequelize.STRING,
			field: 'observaciones'
		},
		mostrar: {
			type: Sequelize.BOOLEAN,
			field: 'mostrar'
		}
	}, {
		freezeTableName: true
	});

	DetalleComboVenta.sync();

	return DetalleComboVenta;
}