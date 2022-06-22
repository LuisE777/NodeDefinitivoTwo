module.exports = function (sequelize, Sequelize) {
	var CorrelativosEmpresa = sequelize.define('agil_correlativo_empresa', {
		id_empresa: {
			type: Sequelize.INTEGER,
			field: 'empresa'
		},
		numero_correlativo_llamada_atencion: {
			type: Sequelize.INTEGER,
			field: 'numero_correlativo_llamada_atencion',
			default: 0
		},
		numero_correlativo_programacion_pago: {
			type: Sequelize.INTEGER,
			field: 'numero_correlativo_programacion_pago',
			default: 0
		},
		numero_correlativo_transaccion_cobro: {
			type: Sequelize.INTEGER,
			field: 'numero_correlativo_transaccion_cobro',
			default: 0
		},
		numero_correlativo_transaccion_pago: {
			type: Sequelize.INTEGER,
			field: 'numero_correlativo_transaccion_pago',
			default: 0
		}
	}, {
			freezeTableName: true
		});

	CorrelativosEmpresa.sync().then(function () {

	});

	return CorrelativosEmpresa;
}