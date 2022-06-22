module.exports = function (sequelize, Sequelize) {
	var ConfiguracionCuenta = sequelize.define('agil_configuracion_cuenta', {
		id_empresa: {
			type: Sequelize.INTEGER,
			field: 'empresa'
		},
		id_tipo: {
			type: Sequelize.INTEGER,
			field: 'tipo'
		},
		id_cuenta: {
			type: Sequelize.INTEGER,
			field: 'cuenta'
		},
		valor: {
			type: Sequelize.DECIMAL(20,4),
			field: 'valor'
		},
		nombre: {
			type: Sequelize.STRING,
			field: 'nombre'
		},id_concepto: {
			type: Sequelize.INTEGER,
			field: 'concepto'
		},id_configuracion: {
			type: Sequelize.INTEGER,
			field: 'configuracion'
		}
	}, {
			freezeTableName: true
		});
	ConfiguracionCuenta.sync();
	return ConfiguracionCuenta;
}