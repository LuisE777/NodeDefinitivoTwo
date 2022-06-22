module.exports = function (sequelize, Sequelize) {
	var ProductoPrecioPorSucursal = sequelize.define('agil_producto_precio_por_sucursal', {
		id_producto: {
			type: Sequelize.INTEGER,
			field: 'producto'
		},
		id_sucursal: {
			type: Sequelize.INTEGER,
			field: 'sucursal'
		},
		precio_unitario: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'precio_unitario'
		},
		rango_positivo: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'rango_positivo'
		},
		rango_negativo: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'rango_negativo'
		},
		eliminado:{
			type: Sequelize.BOOLEAN,
			field: 'eliminado'
		}
	}, {
			freezeTableName: true
		});

	ProductoPrecioPorSucursal.sync().then(function () {

	});

	return ProductoPrecioPorSucursal;
}