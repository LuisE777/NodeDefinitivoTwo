module.exports = function (sequelize, Sequelize) {
	var MantenimientoOrdenTrabajoMaterial = sequelize.define('agil_mantenimiento_orden_trabajo_material', {
		id_orden_trabajo: {
			type: Sequelize.INTEGER,
			field: 'orden_trabajo'
		},
		id_producto: {
			type: Sequelize.INTEGER,
			field: 'id_producto'
		},
		cantidad: {
			type:  Sequelize.DECIMAL(20,4),
			field: 'cantidad'
		},
		importe: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'importe'
		},
		importe_interno:{
			type: Sequelize.DECIMAL(20,4),
			field: 'importe_interno'
		},
		total_cliente:{
			type: Sequelize.DECIMAL(20,4),
			field: 'total_cliente'
		},
		movimiento: {
			type: Sequelize.INTEGER,
			field: 'movimiento'
		}
	}, {
			freezeTableName: true
		})
		;

	MantenimientoOrdenTrabajoMaterial.sync().then(function () {

	});

	return MantenimientoOrdenTrabajoMaterial;
}