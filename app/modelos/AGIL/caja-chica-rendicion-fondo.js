module.exports = function (sequelize, Sequelize) {
	var CajaChicaRendicionFondo = sequelize.define('agil_caja_chica_rendicion_fondo', {
		id_rendicion: {
			type: Sequelize.INTEGER,
			field: 'rendicion'
		},
		fecha: Sequelize.DATE,
		fecha_salida: Sequelize.DATE,
		fecha_entrada: Sequelize.DATE,
		odometro_salida: Sequelize.DECIMAL(20, 4),
		odometro_entrada: Sequelize.DECIMAL(20, 4),
		litros: Sequelize.DECIMAL(20, 4),
		id_conductor: {
			type: Sequelize.INTEGER,
			field: 'conductor'
		},
		id_vehiculo: {
			type: Sequelize.INTEGER,
			field: 'vehiculo'
		},
		numero_correlativo: Sequelize.INTEGER,
		total: Sequelize.DECIMAL(20, 4),
		id_solicitud: {
			type: Sequelize.INTEGER,
			field: 'solicitud'
		},
		id_empresa: {
			type: Sequelize.INTEGER,
			field: 'empresa',
			allowNull: false
		}
	}, {
			freezeTableName: true
		});

	CajaChicaRendicionFondo.sync();

	return CajaChicaRendicionFondo;
}