module.exports = function (sequelize, Sequelize) {
	var ClasificacionCuenta = sequelize.define('agil_contabilidad_clasificacion_cuenta', {

		nombre: {
			type: Sequelize.STRING,
			field: 'nombre'
		},
		id_saldo: {
			type: Sequelize.INTEGER,
			field: 'saldo'
		},
		id_movimiento: {
			type: Sequelize.INTEGER,
			field: 'movimiento'
		},
		id_empresa: {
			type: Sequelize.INTEGER,
			field: 'empresa'
		},
		id_tipo: {
			type: Sequelize.INTEGER,
			field: 'tipo'
		},
		usar_centro_costo: {
			type: Sequelize.BOOLEAN,
			field: 'usar_centro_costo',
			defaultValue: false
		}
	}, {
		freezeTableName: true
	});

	ClasificacionCuenta.sync().then(function () {


	});

	return ClasificacionCuenta;
}