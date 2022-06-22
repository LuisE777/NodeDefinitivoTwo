module.exports = function (sequelize, Sequelize) {
	var Usuario = sequelize.define('sys_usuario', {
		id_persona: {
			type: Sequelize.INTEGER,
			field: 'persona'
		},
		id_empresa: {
			type: Sequelize.INTEGER,
			field: 'empresa'
		},
		id_empleado: {
			type: Sequelize.INTEGER,
			field: 'empleado'
		},
		nombre_usuario: {
			type: Sequelize.STRING,
			field: 'nombre_usuario'
		},
		clave: {
			type: Sequelize.STRING,
			field: 'clave'
		},
		token: {
			type: Sequelize.TEXT,
			field: 'token'
		},
		activo: {
			type: Sequelize.BOOLEAN,
			field: 'activo'
		},
		comision_general: {
			type: Sequelize.INTEGER,
			field: 'comision_general'
		},
		comision_activa: {
			type: Sequelize.BOOLEAN,
			field: 'comision_activa'
		},
		usar_lector_de_barra: {
			type: Sequelize.BOOLEAN,
			field: 'usar_lector_de_barra'
		},
		autorizacion_caja_chica: {
			type: Sequelize.BOOLEAN,
			field: 'autorizacion_caja_chica'
		},
		encargado_caja_chica: {
			type: Sequelize.BOOLEAN,
			field: 'encargado_caja_chica'
		},
		encargado_integracion_contable: {
			type: Sequelize.BOOLEAN,
			field: 'encargado_integracion_contable'
		},
		encargado_rendicion_caja_chica: {
			type: Sequelize.BOOLEAN,
			field: 'encargado_rendicion_caja_chica'
		},
		encargado_verificacion_caja_chica: {
			type: Sequelize.BOOLEAN,
			field: 'encargado_verificacion_caja_chica'
		},
		usar_importacion_venta_servicio: {
			type: Sequelize.BOOLEAN,
			field: 'usar_importacion_venta_servicio'
		},
		usar_filtro_lote: {
			type: Sequelize.BOOLEAN,
			field: 'usar_filtro_lote',
			defaultValue: 0
		},
		encargado_almacen_gestion: {
			type: Sequelize.BOOLEAN,
			field: 'encargado_almacen_gestion',
			defaultValue: 0
		},
		administrador_panel_venta: {
			type: Sequelize.BOOLEAN,
			field: 'administrador_panel_venta',
			defaultValue: 0
		},
		encargado_sincronizacion_gestion: {
			type: Sequelize.BOOLEAN,
			field: 'encargado_sincronizacion_gestion',
			defaultValue: 0
		},
		ver_listado_ventas: {
			type: Sequelize.BOOLEAN,
			field: 'ver_listado_ventas',
			defaultValue: 1
		},
		crear_comprobante_antiguo: {
			type: Sequelize.BOOLEAN,
			field: 'crear_comprobante_antiguo',
			defaultValue: false
		},
		activar_empleados_rrhh: {
			type: Sequelize.BOOLEAN,
			field: 'activar_empleados_rrhh',
			defaultValue: false
		},
		activar_cierre_mensual_proforma: {
			type: Sequelize.BOOLEAN,
			field: 'activar_cierre_mensual_proforma',
			defaultValue: false
		},
		encargado_integracion_contable_gestion: {
			type: Sequelize.BOOLEAN,
			field: 'encargado_integracion_contable_gestion',
			defaultValue: false
		},
		integracion_contable_mantenimiento: {
			type: Sequelize.BOOLEAN,
			field: 'integracion_contable_mantenimiento',
			defaultValue: false
		},
		integracion_contable_ropa_trabajo_rrhh: {
			type: Sequelize.BOOLEAN,
			field: 'integracion_contable_ropa_trabajo_rrhh',
			defaultValue: false
		},
		encargado_programar_pago: {
			type: Sequelize.BOOLEAN,
			field: 'encargado_programar_pago',
			defaultValue: false
		},
		encargado_Aprobar_Rechazar_programacion_pago: {
				type: Sequelize.BOOLEAN,
				field: 'encargado_Aprobar_Rechazar_programacion_pago',
				defaultValue: false
		},
		correccion_costo_unitario: {
			type: Sequelize.BOOLEAN,
			field: 'correccion_costo_unitario',
			defaultValue: false
		},
	}, {
		freezeTableName: true
	});

	Usuario.sync().then(function () {
		sequelize.query("INSERT IGNORE INTO sys_usuario SET id = 1,persona=1,nombre_usuario='superadmin',clave='b5933b1e3c4023774366da04a515ef37',activo=1,token='b5933b1e3c4023774366da04a515ef37',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {

		});
	});

	return Usuario;
}