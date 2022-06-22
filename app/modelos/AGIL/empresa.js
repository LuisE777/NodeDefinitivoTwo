module.exports = function (sequelize, Sequelize) {
	var Empresa = sequelize.define('agil_empresa', {
		razon_social: {
			type: Sequelize.STRING,
			field: 'razon_social'
		},
		nit: {
			type: Sequelize.STRING,
			field: 'nit'
		},
		imagen: {
			type: Sequelize.STRING,
			field: 'imagen'
		},
		direccion: {
			type: Sequelize.STRING,
			field: 'direccion'
		},
		telefono1: {
			type: Sequelize.STRING,
			field: 'telefono1'
		},
		telefono2: {
			type: Sequelize.STRING,
			field: 'telefono2'
		},
		telefono3: {
			type: Sequelize.STRING,
			field: 'telefono3'
		},
		id_departamento: {
			type: Sequelize.INTEGER,
			field: 'departamento'
		},
		id_municipio: {
			type: Sequelize.INTEGER,
			field: 'municipio'
		},
		usar_panel: {
			type: Sequelize.BOOLEAN,
			field: 'usar_panel'
		},
		usar_vencimientos: {
			type: Sequelize.BOOLEAN,
			field: 'usar_vencimientos'
		},
		usar_servicios: {
			type: Sequelize.BOOLEAN,
			field: 'usar_servicios'
		},
		usar_consumos: {
			type: Sequelize.BOOLEAN,
			field: 'usar_consumos'
		},
		usar_descuentos: {
			type: Sequelize.BOOLEAN,
			field: 'usar_descuentos'
		},
		usar_georeferenciacion: {
			type: Sequelize.BOOLEAN,
			field: 'usar_georeferenciacion'
		},
		usar_pedidos: {
			type: Sequelize.BOOLEAN,
			field: 'usar_pedidos'
		},
		usar_pantalla_cliente: {
			type: Sequelize.BOOLEAN,
			field: 'usar_pantalla_cliente'
		},
		usar_pantalla_despacho: {
			type: Sequelize.BOOLEAN,
			field: 'usar_pantalla_despacho'
		},
		usar_mesas: {
			type: Sequelize.BOOLEAN,
			field: 'usar_mesas'
		},
		usar_salas: {
			type: Sequelize.BOOLEAN,
			field: 'usar_salas'
		},
		usar_contabilidad: {
			type: Sequelize.BOOLEAN,
			field: 'usar_contabilidad'
		},
		usar_medico: {
			type: Sequelize.BOOLEAN,
			field: 'usar_medico'
		},
		usar_mantenimiento: {
			type: Sequelize.BOOLEAN,
			field: 'usar_mantenimiento'
		},
		usar_cuentas_auxiliares: {
			type: Sequelize.BOOLEAN,
			field: 'usar_cuentas_auxiliares'
		},
		usar_proformas: {
			type: Sequelize.BOOLEAN,
			field: 'usar_proforma'
		},
		usar_creditos: {
			type: Sequelize.BOOLEAN,
			field: 'usar_creditos'
		},
		usar_destinos: {
			type: Sequelize.BOOLEAN,
			field: 'usar_destinos'
		},
		usar_razon_social: {
			type: Sequelize.BOOLEAN,
			field: 'usar_razon_social'
		},
		usar_correlativos_clientes: {
			type: Sequelize.BOOLEAN,
			field: 'usar_correlativos_clientes'
		},
		usar_correlativos_destinos: {
			type: Sequelize.BOOLEAN,
			field: 'usar_correlativos_destinos'
		},
		usar_funciones_erp: {
			type: Sequelize.BOOLEAN,
			field: 'usar_funciones_erp'
		},
		usar_estado_resultados_no_contables: {
			type: Sequelize.BOOLEAN,
			field: 'usar_estado_resultados_no_contables'
		},
		usar_peps: {
			type: Sequelize.BOOLEAN,
			field: 'usar_peps',
			default: true
		},
		usar_edicion_venta:{
			type: Sequelize.BOOLEAN,
			field: 'usar_edicion_venta'
		},
		usar_venta_servicio:{
			type: Sequelize.BOOLEAN,
			field: 'usar_venta_servicio'
		},
		usar_facturacion_masiva:{
			type: Sequelize.BOOLEAN,
			field: 'usar_facturacion_masiva'
		},
		usar_cotizacion:{
			type: Sequelize.BOOLEAN,
			field: 'usar_cotizacion'
		},
		usar_tipo_precio:{
			type: Sequelize.BOOLEAN,
			field: 'usar_tipo_precio'
		},
		usar_pago_anticipado:{
			type: Sequelize.BOOLEAN,
			field: 'usar_pago_anticipado'
		},
		usar_ceros_plan_cuenta:{
			type: Sequelize.BOOLEAN,
			field: 'usar_ceros_plan_cuenta'
		},
		usar_importacion_compra:{
			type: Sequelize.BOOLEAN,
			field: 'usar_importacion_compra'
		},
		usar_importacion_venta:{
			type: Sequelize.BOOLEAN,
			field: 'usar_importacion_venta'
		},
		usar_vencimiento_productos:{
			type: Sequelize.BOOLEAN,
			field: 'usar_vencimiento_productos',
			defaultValue: 0
		},
		usar_vencimiento_creditos:{
			type: Sequelize.BOOLEAN,
			field: 'usar_vencimiento_creditos',
			defaultValue: 0
		},
		usar_vencimiento_deudas:{
			type: Sequelize.BOOLEAN,
			field: 'usar_vencimiento_deudas',
			defaultValue: 0
		},
		usar_filtro_lote:{
			type: Sequelize.BOOLEAN,
			field: 'usar_filtro_lote',
			defaultValue: 0
		},
		ver_costos_dolares:{
			type: Sequelize.BOOLEAN,
			field: 'ver_costos_dolares',
			defaultValue: 0
		},
		tipo_cambio_dolar:{
			type: Sequelize.DECIMAL(20,4),
			field: 'tipo_cambio_dolar',
			defaultValue: 0
		},
		usar_anticipo_caja_chica:{
			type: Sequelize.BOOLEAN,
			field: 'usar_anticipo_caja_chica',
			defaultValue: 0
		},
		usar_anticipo_recursos_humanos:{
			type: Sequelize.BOOLEAN,
			field: 'usar_anticipo_recursos_humanos',
			defaultValue: 0
		},
		usar_integracion:{
			type: Sequelize.BOOLEAN,
			field: 'usar_integracion',
			defaultValue: 0
		},
		usar_mantenimiento_externo_propio:{
			type: Sequelize.BOOLEAN,
			field: 'usar_mantenimiento_externo_propio',
			defaultValue: 0
		},
		
		usar_promocion_producto:{
			type: Sequelize.BOOLEAN,
			field: 'usar_promocion_producto',
			defaultValue: 0
		},
		restar_solo_despacho:{
			type: Sequelize.BOOLEAN,
			field: 'restar_solo_despacho',
			defaultValue: 0
		},
		usar_prestacion_compra:{
			type: Sequelize.BOOLEAN,
			field: 'usar_prestacion_compra',
			defaultValue: 0
		},
		usar_indice_rotacion_producto:{
			type: Sequelize.BOOLEAN,
			field: 'usar_indice_rotacion_producto',
			defaultValue: 0
		},
		usar_restaurante_express:{
			type: Sequelize.BOOLEAN,
			field: 'usar_restaurante_express',
			defaultValue: false
		},
		usar_productos_derivados_panel:{
			type: Sequelize.BOOLEAN,
			field: 'usar_productos_derivados_panel',
			defaultValue: false
		},
		ver_precio_compra_en_venta:{
			type: Sequelize.BOOLEAN,
			field: 'ver_precio_compra_en_venta',
			defaultValue: false
		},
		usar_promocion_producto_puntos:{
			type: Sequelize.BOOLEAN,
			field: 'usar_promocion_producto_puntos',
			defaultValue: 0
		},
		usar_calificaciones_proveedor:{
			type: Sequelize.BOOLEAN,
			field: 'usar_calificaciones_proveedor',
			defaultValue: false
		},
		ver_usuario_en_ticket:{
			type: Sequelize.BOOLEAN,
			field: 'ver_usuario_en_ticket',
			defaultValue: false
		},
		usar_precio_por_sucursal:{
			type: Sequelize.BOOLEAN,
			field: 'usar_precio_por_sucursal',
			defaultValue: false
		},
		usar_combo_producto_final:{
			type: Sequelize.BOOLEAN,
			field: 'usar_combo_producto_final',
			defaultValue: false
		},
		usar_configuracion_iso:{
			type: Sequelize.BOOLEAN,
			field: 'usar_configuracion_iso',
			defaultValue: false
		},
		representante_legal: {
			type: Sequelize.STRING,
			field: 'representante_legal'
		},
		repr_ci: {
			type: Sequelize.STRING,
			field: 'repr_ci'
		},
		repr_extension_ci: {
			type: Sequelize.STRING,
			field: 'repr_extension_ci'
		},
		repr_direccion: {
			type: Sequelize.STRING,
			field: 'repr_direccion'
		},
		repr_telefono: {
			type: Sequelize.STRING,
			field: 'repr_telefono'
		},
		repr_correo_electronico: {
			type: Sequelize.STRING,
			field: 'repr_correo_electronico'
		},
		usar_panel_cotizaciones: {
			type: Sequelize.BOOLEAN,
			field: 'usar_panel_cotizaciones',
			defaultValue: false
		},
		usar_devoluciones: {
			type: Sequelize.BOOLEAN,
			field: 'usar_devoluciones',
			defaultValue: false
		},
		usar_generador_series: {
			type: Sequelize.BOOLEAN,
			field: 'usar_generador_series',
			defaultValue: false
		},
		usar_ingreso_por_ajuste: {
			type: Sequelize.BOOLEAN,
			field: 'usar_ingreso_por_ajuste',
			defaultValue: false
		},
		usar_traspaso_automatico: {
			type: Sequelize.BOOLEAN,
			field: 'usar_traspaso_automatico',
			defaultValue: false
		},
		usar_produccion_compra: {
			type: Sequelize.BOOLEAN,
			field: 'usar_produccion_compra',
			defaultValue: false
		},
		nombre_comercial: {
			type: Sequelize.STRING,
			field: 'nombre_comercial',
			defaultValue: null
		},
		usar_programacion_pago_proveedor: {
			type: Sequelize.BOOLEAN,
			field: 'usar_programacion_pago_proveedor',
			defaultValue: false
		},
		usar_relacion_compra_rendicion: {
			type: Sequelize.BOOLEAN,
			field: 'usar_relacion_compra_rendicion',
			defaultValue: false
		},
		usar_envio_correos: {
			type: Sequelize.BOOLEAN,
			field: 'usar_envio_correos',
			defaultValue: false
		},
		usar_correo_imstitucional: {
			type: Sequelize.BOOLEAN,
			field: 'usar_correo_imstitucional',
			defaultValue: false
		},
		email_host: {
			type: Sequelize.STRING,
			field: 'email_host',
			defaultValue: null
		},
		email_puerto: {
			type: Sequelize.STRING,
			field: 'email_puerto',
			defaultValue: null
		},
		email_empresa_aplicacion: {
			type: Sequelize.STRING,
			field: 'email_empresa_aplicacion',
			defaultValue: null
		},
		email_password_aplicacion: {
			type: Sequelize.STRING,
			field: 'email_password_aplicacion',
			defaultValue: null
		},
		asunto_email: {
			type: Sequelize.STRING,
			field: 'asunto_email',
			defaultValue: null
		},
		correlativo_iso_viajes: {
			type: Sequelize.INTEGER,
			field: 'correlativo_iso_viajes',
			defaultValue: null
		},
		usar_facturacion_electronica: {
			type: Sequelize.BOOLEAN,
			field: 'usar_facturacion_electronica',
			defaultValue: false
		},
		token: {
			type: Sequelize.TEXT("long"),
			field: 'token',
			defaultValue: null
		}
	}, {
			freezeTableName: true
		});

	Empresa.sync().then(function () {

	});

	return Empresa;
}