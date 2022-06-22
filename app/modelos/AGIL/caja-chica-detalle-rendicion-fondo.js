module.exports = function (sequelize, Sequelize) {
	var CajaChicaDetalleRendicionFondo = sequelize.define('agil_caja_chica_detalle_rendicion_fondo', {
		id_gasto: {
			type: Sequelize.INTEGER,
			field: 'gasto'
		},
		fecha: Sequelize.DATE,
		numero_factura_recargo: {
			type: Sequelize.INTEGER,
			field: 'numero_factura_recargo'
		},
		detalle:Sequelize.TEXT('long'),
		monto:Sequelize.DOUBLE(20,4),
		id_area:{
			type:Sequelize.INTEGER,
			field:'area'
		},
		usar_factura:{
			type: Sequelize.BOOLEAN,
			field: 'usar_factura'
		},
		rembolsado:{
			type: Sequelize.BOOLEAN,
			field: 'rembolsado'
		},
		eliminado:{
			type: Sequelize.BOOLEAN,
			field: 'eliminado'
		},
		id_rendicion_fondo:{
			type: Sequelize.INTEGER,
			field: 'rendicion_fondo'
		},
		id_compra:{
			type: Sequelize.INTEGER,
			field: 'compra'
		}
	}, {
			freezeTableName: true
		});

	CajaChicaDetalleRendicionFondo.sync();

	return CajaChicaDetalleRendicionFondo;
}