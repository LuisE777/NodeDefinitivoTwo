module.exports = function (sequelize, Sequelize) {
	var RrhhEmpleadoHoraExtraOrdinaria = sequelize.define('agil_rrhh_empleado_hora_extra_ordinaria', {
		id_ficha: {
			type: Sequelize.INTEGER,
			field: 'ficha'
		},
		fecha: {
			type: Sequelize.DATE,
			field: 'fecha'
		},
		id_tipo: {
			type: Sequelize.INTEGER,
			field: 'tipo'
		},
		horas: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'horas'
		},
		eliminado: {
			type: Sequelize.BOOLEAN,
			field: 'eliminado'
		},
		cerrado: {
			type: Sequelize.BOOLEAN,
			field: 'cerrado'
		},
		fecha_cierre: {
			type: Sequelize.DATE,
			field: 'fecha_cierre'
		}
	}, {
			freezeTableName: true
		});

	RrhhEmpleadoHoraExtraOrdinaria.sync().then(function () {

	});

	return RrhhEmpleadoHoraExtraOrdinaria;
}
