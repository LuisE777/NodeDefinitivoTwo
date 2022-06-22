module.exports = function (sequelize, Sequelize) {
	var MantenimientoOrdenTrabajoServicioExterno = sequelize.define('agil_mantenimiento_orden_trabajo_servicio_externo', {
		id_orden_trabajo: {
			type: Sequelize.INTEGER,
			field: 'orden_trabajo'
		},
		id_empresa: {
			type: Sequelize.INTEGER,
			field: 'empresa'
		},
		servicio: {
			type: Sequelize.STRING,
			field: 'servicio'
		},
		fecha_inicio: {
			type: Sequelize.DATE,
			field: 'fecha_inicio'
		},
		fecha_fin: {
			type: Sequelize.DATE,
			field: 'fecha_fin'
		},
		numero_factura: {
			type: Sequelize.INTEGER,
			field: 'numero_factura'
		},
		importe: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'importe'
		},
		autorizacion: {
			type: Sequelize.BIGINT,
			field: 'autorizacion'
		},
		codigo_control: {
			type: Sequelize.STRING,
			field: 'codigo_control'
		},
		importe_interno:{
			type: Sequelize.DECIMAL(20,4),
			field: 'importe_interno'
		},
		total_cliente:{
			type: Sequelize.DECIMAL(20,4),
			field: 'total_cliente'
		}
	}, {
			freezeTableName: true
		});

	MantenimientoOrdenTrabajoServicioExterno.sync().then(function () {

	});

	return MantenimientoOrdenTrabajoServicioExterno;
}