module.exports = function (sequelize, Sequelize) {
	var DetalleCompra = sequelize.define('inv_detalle_compra', {
		id_compra: {
			type: Sequelize.INTEGER,
			field: 'compra'
		},
		id_producto: {
			type: Sequelize.INTEGER,
			field: 'producto'
		},
		correlativo_produccion: {
			type: Sequelize.INTEGER,
			field: 'correlativo_produccion'
		},
		id_centro_costo: {
			type: Sequelize.INTEGER,
			field: 'centro_costo'
		},
		costo_unitario: {
			type: Sequelize.DECIMAL(20, 6),
			field: 'costo_unitario'
		},
		costo_unitario_dolares: {
			type: Sequelize.DECIMAL(20, 6),
			field: 'costo_unitario_dolares'
		},
		cantidad: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'cantidad'
		},
		importe: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'importe'
		},
		importe_dolares: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'importe_dolares'
		},
		descuento: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'descuento'
		},
		recargo: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'recargo'
		},
		ice: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'ice'
		},
		excento: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'excento'
		},
		descuento_dolares: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'descuento_dolares'
		},
		recargo_dolares: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'recargo_dolares'
		},
		ice_dolares: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'ice_dolares'
		},
		excento_dolares: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'excento_dolares'
		},
		tipo_descuento: {
			type: Sequelize.BOOLEAN,
			field: 'tipo_descuento'
		},
		tipo_recargo: {
			type: Sequelize.BOOLEAN,
			field: 'tipo_recargo'
		},
		total: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'total'
		},
		total_dolares: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'total_dolares'
		},
		id_inventario: {
			type: Sequelize.INTEGER,
			field: 'inventario'
		},
		it: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'it'
		},
		iue: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'iue'
		},
		id_servicio: {
			type: Sequelize.INTEGER,
			field: 'servicio'
		},
		id_caja_chica_detalle_rendicion:{
			type: Sequelize.INTEGER,
			field: 'caja_chica_detalle_rendicion'
		},
		observacion:{
			type: Sequelize.STRING,
			field: 'observacion'
		},
		iehd: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'iehd',
			defaultValue: 0.00
		},
		ipj: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'ipj',
			defaultValue: 0.00
		},
		tasas: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'tasas',
			defaultValue: 0.00
		},
		otros_ns_cf: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'otros_ns_cf',
			defaultValue: 0.00
		},
		grav_tasa_cero: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'grav_tasa_cero',
			defaultValue: 0.00
		}
	}, {
			freezeTableName: true
		});

	DetalleCompra.sync();

	return DetalleCompra;
}