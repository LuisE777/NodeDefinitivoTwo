module.exports = function (sequelize, Sequelize) {
	var SucursalActividadDosificacion = sequelize.define('agil_sucursal_actividad_dosificacion', {
		id_sucursal: {
			type: Sequelize.INTEGER,
			field: 'sucursal'
		},
		id_actividad: {
			type: Sequelize.INTEGER,
			field: 'actividad'
		},
		id_cuenta: {
			type: Sequelize.INTEGER,
			field: 'cuenta'
		},
		id_cuenta_caja_banco: {
			type: Sequelize.INTEGER,
			field: 'cuenta_caja_banco'
		},
		id_dosificacion: {
			type: Sequelize.INTEGER,
			field: 'dosificacion'
		},
		expirado: {
			type: Sequelize.BOOLEAN,
			field: 'expirado'
		}
	}, {
		freezeTableName: true
	});

	SucursalActividadDosificacion.sync().then(function () {

	});

	return SucursalActividadDosificacion;
}