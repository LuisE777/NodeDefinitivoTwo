module.exports = function (sequelize, Sequelize) {
	var GestionOrdenReposicionIso = sequelize.define('agil_gestion_orden_reposicion_iso', {
		id_orden:{
			type: Sequelize.INTEGER,
			field: 'id_orden'
		},
		nro_correlativo_iso_recepcion: {
			type: Sequelize.INTEGER,
			field: 'nro_correlativo_iso_recepcion'
		},
		nro_correlativo_iso_envio: {
			type: Sequelize.INTEGER,
			field: 'nro_correlativo_iso_envio'
		},
		config_doc_iso_recepcion: {
			type: Sequelize.INTEGER,
			field: 'config_doc_iso_recepcion'
		},
		config_doc_iso_envio: {
			type: Sequelize.INTEGER,
			field: 'config_doc_iso_envio'
		},
		id_almacen: {
			type: Sequelize.INTEGER,
			field: 'id_almacen'
		},
		id_usuario: {
			type: Sequelize.INTEGER,
			field: 'id_usuario'
		},
		eliminado: {
			type: Sequelize.BOOLEAN,
			field: 'eliminado'
		},
		desde: {
			type: Sequelize.DATE,
			field: 'desde'
		},
		hasta:{
			type: Sequelize.DATE,
			field: 'hasta'
		},
		finalizado:{
			type: Sequelize.BOOLEAN,
			field: 'finalizado'
		}
	}, {
			freezeTableName: true
		});

	GestionOrdenReposicionIso.sync().then(function () {
	});

	return GestionOrdenReposicionIso;
}