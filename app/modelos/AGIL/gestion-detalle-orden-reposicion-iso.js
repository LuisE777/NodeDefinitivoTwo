module.exports = function (sequelize, Sequelize) {
	var GestionDetalleOrdenReposicionIso = sequelize.define('agil_gestion_detalle_orden_reposicion_iso', {
		id_orden: {
			type: Sequelize.INTEGER,
			field: 'id_orden'
		},
		id_producto: {
			type: Sequelize.INTEGER,
			field: 'id_producto'
		},
		consumo: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'consumo'
		},
		extra: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'extra'
		},
		saldo: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'saldo'
		},
		cantidad_maxima:{
			type: Sequelize.DECIMAL(20, 4),
			field: 'cantidad_maxima'
		},
		observacion: {
			type: Sequelize.STRING,
			field: 'observacion'
		},
		observado: {
			type: Sequelize.BOOLEAN,
			field: 'observado'
		},
		observacion_revisor: {
			type: Sequelize.STRING,
			field: 'observacion_revisor'
		},
		cantidad_corregida: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'cantidad_corregida'
		},
		cantidad_sugerida:{
			type: Sequelize.DECIMAL(20, 4),
			field: 'cantidad_sugerida'
		},
		eliminado: {
			type: Sequelize.BOOLEAN,
			field: 'eliminado'
		},
		cantidad_total:{
			type: Sequelize.DECIMAL(20, 4),
			field: 'cantidad_total'
		},
		fecha_registro: {
			type: Sequelize.DATE,
			field: 'fecha_registro'
		}
	}, {
			freezeTableName: true
		});

	GestionDetalleOrdenReposicionIso.sync().then(function () {
	});

	return GestionDetalleOrdenReposicionIso;
}