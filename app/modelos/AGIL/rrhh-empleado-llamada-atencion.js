module.exports = function (sequelize, Sequelize) {
	var RrhhEmpleadoLlamadaAtencion = sequelize.define('agil_rrhh_empleado_llamada_atencion', {
		id_ficha: {
			type: Sequelize.INTEGER,
			field: 'ficha'
		},
		id_motivo: {
			type: Sequelize.INTEGER,
			field: 'motivo'
		},
		numero_correlativo:{
			type: Sequelize.INTEGER,
			field: 'numero_correlativo'
		},
		fecha: {
			type: Sequelize.DATE,
			field: 'fecha'
		},
		fecha_solicitud: {
			type: Sequelize.DATE,
			field: 'fecha_solicitud'
		},
		fecha_realizado: {
			type: Sequelize.DATE,
			field: 'fecha_realizado'
		},
		fecha_entrega: {
			type: Sequelize.DATE,
			field: 'fecha_entrega'
		},
		fecha_devolucion: {
			type: Sequelize.DATE,
			field: 'fecha_devolucion'
		},
		id_solicitante: {
			type: Sequelize.INTEGER,
			field: 'solicitante'
		},
		id_recepcionista: {
			type: Sequelize.INTEGER,
			field: 'recepcionista'
		},
		visado: {
			type: Sequelize.BOOLEAN,
			field: 'visado'
		},
		eliminado: {
			type: Sequelize.BOOLEAN,
			field: 'eliminado',
			defaultValue: false
		},
		cerrado: {
			type: Sequelize.BOOLEAN,
			field: 'cerrado',
			defaultValue: false
		},
		id_firmante: {
			type: Sequelize.INTEGER,
			field: 'firmante'
		},
		detalle: {
			type: Sequelize.TEXT('long'),
			field: 'detalle'
		},
		observacion: {
			type: Sequelize.TEXT('long'),
			field: 'observacion'
		},
	}, {
		freezeTableName: true
	});

	RrhhEmpleadoLlamadaAtencion.sync().then(function () {

	});

	return RrhhEmpleadoLlamadaAtencion;
}