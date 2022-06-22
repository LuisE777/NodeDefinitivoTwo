module.exports = function (sequelize, Sequelize) {
	var LiquidacionVentasMesa = sequelize.define('inv_liquidacion_ventas_mesa', {
		id_usuario: {
			type: Sequelize.INTEGER,
			field: 'usuario'
		},
		fecha: {
			type: Sequelize.DATE,
			field: 'fecha'
		},
		total: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'total'
		},
		visa: {
			type: Sequelize.INTEGER,
			field: 'visa',
		},
		pago_efectivo: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'pago_efectivo',
		}
	}, {
		freezeTableName: true
	});

	LiquidacionVentasMesa.sync();

	return LiquidacionVentasMesa;
}