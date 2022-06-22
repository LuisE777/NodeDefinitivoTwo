module.exports = function (sequelize, Sequelize) {
	var EntragaDetalleVentaCliente = sequelize.define('agil_entrega_detalle_venta', {
		id_cliente: {
			type: Sequelize.INTEGER,
			field: 'cliente'
		},
		id_detalle_venta: {
			type: Sequelize.INTEGER,
			field: 'detalle_venta'
		},
		descuento: {
			type: Sequelize.DECIMAL(20,4),
			field: 'descuento'
        },
		cantidad: {
			type: Sequelize.DECIMAL(20,4),
			field: 'cantidad'
        },
        fecha:{
            type: Sequelize.DATE,
			field: 'fecha'
        }
	}, {
			freezeTableName: true
		});

	EntragaDetalleVentaCliente.sync().then(function () {

	});

	return EntragaDetalleVentaCliente;
}