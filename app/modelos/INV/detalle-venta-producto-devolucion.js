module.exports = function (sequelize, Sequelize) {
	var DetalleVentaProductoDevolucion = sequelize.define('inv_detalle_venta_producto_devolucion', {
		id_detalle_venta: {
			type: Sequelize.INTEGER,
			field: 'detalle_venta'
		},
		fecha: {
            type: Sequelize.DATE,
            field: 'fecha' 
        },
        entrega: {
            type: Sequelize.STRING,
            field: 'entrega' 
        },
        recibe: {
            type: Sequelize.STRING,
            field: 'recibe' 
        },
        observaciones: {
            type: Sequelize.STRING,
            field: 'observaciones' 
        },
        numero_documento: {
            type: Sequelize.INTEGER,
            field: 'numero_documento' 
        }
		
	}, {
			freezeTableName: true
		});

	DetalleVentaProductoDevolucion.sync();

	return DetalleVentaProductoDevolucion;
}