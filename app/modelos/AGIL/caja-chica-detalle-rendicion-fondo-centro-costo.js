module.exports = function (sequelize, Sequelize) {
	var CajaChicaDetalleRendicionFondoCentroCosto = sequelize.define('agil_caja_chica_detalle_rendicion_fondo_centro_costo', {
		id_detalle_rendicion_fondo: {
			type: Sequelize.INTEGER,
			field: 'detalle_rendicion_fondo'
		},		
		id_centro_costo:{
			type:Sequelize.INTEGER,
			field:'centro_costo'
		},
	}, {
			freezeTableName: true
		});

	CajaChicaDetalleRendicionFondoCentroCosto.sync();

	return CajaChicaDetalleRendicionFondoCentroCosto;
}