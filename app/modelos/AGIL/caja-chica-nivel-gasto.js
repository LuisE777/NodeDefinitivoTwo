module.exports = function (sequelize, Sequelize) {
	var CajaChicaNivelGasto = sequelize.define('agil_caja_chica_nivel_gasto', {
		numero: {
			type: Sequelize.INTEGER,
			field: 'numero'
		},
		nombre: {
			type: Sequelize.STRING,
			field: 'nombre'
		},
		id_empresa: {
			type: Sequelize.INTEGER,
			field: 'empresa'
		},
		eliminado:{
			type: Sequelize.BOOLEAN,
			field: 'eliminado'
		}
	}, {
			freezeTableName: true
		});

	CajaChicaNivelGasto.sync();

	return CajaChicaNivelGasto;
}