module.exports = function (sequelize, Sequelize) {
	var DetalleVentaProductoReposicion = sequelize.define('inv_detalle_venta_producto_reposicion', {
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
        numero_serie: {
            type: Sequelize.STRING,
            field: 'numero_serie' 
        },
        observaciones: {
            type: Sequelize.STRING,
            field: 'observaciones' 
        },
        numero_documento: {
            type: Sequelize.INTEGER,
            field: 'numero_documento' 
        },
        tipo_reposicion: {
			type: Sequelize.INTEGER,
			field: 'tipo_reposicion'
        },
        id_producto_cambio: {
			type: Sequelize.INTEGER,
            field: 'id_producto_cambio',
            defaultValue: null
        },
        precio_venta: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'precio_venta'
		},
		monto: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'monto'
		},
		monto_faltante: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'monto_faltante'
		}
		
	}, {
			freezeTableName: true
		});

	DetalleVentaProductoReposicion.sync();

	return DetalleVentaProductoReposicion;
}