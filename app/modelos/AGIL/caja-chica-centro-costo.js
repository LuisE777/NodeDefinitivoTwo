module.exports = function (sequelize, Sequelize) {
	var CajaChicaCentroCosto = sequelize.define('agil_caja_chica_centro_costo', {
		id_caja_chica: {
			type: Sequelize.INTEGER,
			field: 'caja_chica'
		},		
		id_centro_costo:{
			type:Sequelize.INTEGER,
			field:'centro_costo'
		},
	}, {
			freezeTableName: true
		});

	CajaChicaCentroCosto.sync();

	return CajaChicaCentroCosto;
}