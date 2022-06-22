module.exports = function (sequelize, Sequelize) {
	var GestionOrdenReposicion = sequelize.define('agil_gestion_orden_reposicion', {
		fecha_creacion:{
			type: Sequelize.DATE,
			field: 'fecha_creacion'
		},
		fecha_inicio: {
			type: Sequelize.DATE,
			field: 'fecha_inicio'
		},
		fecha_consumo: {
			type: Sequelize.DATE,
			field: 'fecha_consumo'
		},
		id_almacen: {
			type: Sequelize.INTEGER,
			field: 'almacen'
		},
		id_venta: {
			type: Sequelize.INTEGER,
			field: 'venta'
		},
		usar_observacion: {//para eliminar
			type: Sequelize.BOOLEAN,
			field: 'usar_observacion'
		},
		observacion: {//para eliminar
			type: Sequelize.STRING,
			field: 'observacion'
		},
		id_usuario: {
			type: Sequelize.INTEGER,
			field: 'usuario'
		},
		eliminado: {
			type: Sequelize.BOOLEAN,
			field: 'eliminado'
		},
		id_estado: {
			type: Sequelize.INTEGER,
			field: 'estado'
		},
		confirmacion_reposicion:{
			type: Sequelize.BOOLEAN,
			field: 'confirmacion_reposicion'
		},
		indice_rotacion:{
			type: Sequelize.DECIMAL(20, 4),
			field: 'indice_rotacion'
		},
		numero_correlativo:{
			type: Sequelize.INTEGER,
			field: 'numero_correlativo'
		},
		id_orden_reposicion_campamento: {
			type: Sequelize.INTEGER,
			field: 'orden_reposicion_campamento'
		},
		campamento_sincronizado:{
			type: Sequelize.BOOLEAN,
			field: 'campamento_sincronizado',
			defaultValue:false
		},
		fecha_sincronizado:{
			type: Sequelize.DATE,
			field: 'fecha_sincronizado'
		},
		nro_correlativo_iso_recepcion:{
			type: Sequelize.INTEGER,
			field: 'nro_correlativo_iso_recepcion'
		},
		nro_correlativo_iso_envio:{
			type: Sequelize.INTEGER,
			field: 'nro_correlativo_iso_envio'
		},
		config_doc_iso_recepcion:{
			type: Sequelize.INTEGER,
			field: 'config_doc_iso_recepcion'
		},
		config_doc_iso_envio:{
			type: Sequelize.INTEGER,
			field: 'config_doc_iso_envio'
		},
		maximos:{
			type: Sequelize.BOOLEAN,
			field: 'maximos',
			defaultValue:false
		}

	}, {
			freezeTableName: true
		});

	GestionOrdenReposicion.sync().then(function () {
	});

	return GestionOrdenReposicion;
}