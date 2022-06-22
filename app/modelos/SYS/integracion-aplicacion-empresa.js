module.exports = function (sequelize, Sequelize) {
	var EmpresaIntegracion = sequelize.define('sys_integracion_empresa', {
		id_integracion: {
			type: Sequelize.INTEGER,
			field: 'integracion'
		},
		id_empresa: {
			type: Sequelize.INTEGER,
			field: 'empresa'
		},
		usar_integracion: {
			type: Sequelize.BOOLEAN,
			field: 'usar_integracion',
			defaultValue: 0
		}
	}, {
			freezeTableName: true
		});

		EmpresaIntegracion.sync().then(function () {

	});

	return EmpresaIntegracion;
}