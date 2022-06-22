module.exports = function (sequelize, Sequelize) {
	var ProductoPadre = sequelize.define('agil_producto_padre', {
		id_producto: {
			type: Sequelize.INTEGER,
			field: 'producto'
		},
		id_producto_padre: {
			type: Sequelize.INTEGER,
			field: 'producto_padre'
		},
		eliminado:{
			type: Sequelize.BOOLEAN,
			field: 'eliminado',
			defaultValue: false
		}
	}, {
			freezeTableName: true
		});

	ProductoPadre.sync().then(function () {

	});

	return ProductoPadre;
}