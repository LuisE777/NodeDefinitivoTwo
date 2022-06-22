module.exports = function (sequelize, Sequelize) {
	var GestionDetalleOrdenReposicion = sequelize.define('agil_gestion_detalle_orden_reposicion', {
		id_orden_reposicion: {
			type: Sequelize.INTEGER,
			field: 'orden_reposicion'
		},
		observado: {
			type: Sequelize.BOOLEAN,
			field: 'observado'
		},
		observacion_revisor: {
			type: Sequelize.STRING,
			field: 'observacion_revisor'
		},
		observacion: {
			type: Sequelize.STRING,
			field: 'observacion'
		},
		cantidad: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'cantidad'
		},
		extra: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'extra'
		},
		cantidad_maxima:{
			type: Sequelize.DECIMAL(20, 4),
			field: 'cantidad_maxima'
		},
		cantidad_sugerida:{
			type: Sequelize.DECIMAL(20, 4),
			field: 'cantidad_sugerida'
		},
		cantidad_total:{
			type: Sequelize.DECIMAL(20, 4),
			field: 'cantidad_total'
		},
		inventario_disponible: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'inventario_disponible'
		},
		eliminado: {
			type: Sequelize.BOOLEAN,
			field: 'eliminado'
		},
		id_producto: {
			type: Sequelize.INTEGER,
			field: 'producto'
		},
		id_detalle_pedido: {
			type: Sequelize.INTEGER,
			field: 'detalle_pedido'
		},
		cantidad_corregida: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'cantidad_corregida'
		},
		justificativo: {
			type: Sequelize.STRING,
			field: 'justificativo'
		},
		id_detalle_orden_reposicion_campamento: {
			type: Sequelize.INTEGER,
			field: 'detalle_orden_reposicion_campamento'
		},
		cantidad_fijo:{
			type: Sequelize.DECIMAL(20, 4),
			field: 'cantidad_fijo'
		},
	}, {
			freezeTableName: true
		});

	GestionDetalleOrdenReposicion.sync().then(function () {
	});

	return GestionDetalleOrdenReposicion;
}