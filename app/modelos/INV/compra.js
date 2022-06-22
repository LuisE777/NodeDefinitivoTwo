module.exports = function (sequelize, Sequelize) {
	var Compra = sequelize.define('inv_compra', {
		id_almacen: {
			type: Sequelize.INTEGER,
			field: 'almacen'
		},
		id_sucursal: {
			type: Sequelize.INTEGER,
			field: 'sucursal'
		},
		id_tipo_movimiento: {
			type: Sequelize.INTEGER,
			field: 'tipo_movimiento'
		},
		id_proveedor: {
			type: Sequelize.INTEGER,
			field: 'proveedor'
		},
		id_movimiento: {
			type: Sequelize.INTEGER,
			field: 'movimiento'
		},
		doc_rendicion: {
			type: Sequelize.INTEGER,
			field: 'doc_rendicion'
		},
		factura: {
			type: Sequelize.BIGINT,
			field: 'factura'
		},
		autorizacion: {
			type: Sequelize.STRING,
			field: 'autorizacion'
		},
		fecha: {
			type: Sequelize.DATE,
			field: 'fecha'
		},
		fecha_vencimiento: {
			type: Sequelize.DATE,
			field: 'fecha_vencimiento'
		},
		codigo_control: {
			type: Sequelize.STRING,
			field: 'codigo_control'
		},
		importe: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'importe'
		},
		importe_dolares: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'importe_dolares'
		},
		id_tipo_pago: {
			type: Sequelize.INTEGER,
			field: 'tipo_pago'
		},
		dias_credito: {
			type: Sequelize.INTEGER,
			field: 'dias_credito'
		},
		a_cuenta: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'a_cuenta'
		},
		saldo: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'saldo'
		},
		a_cuenta_dolares: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'a_cuenta_dolares'
		},
		saldo_dolares: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'saldo_dolares'
		},
		descuento_general: {
			type: Sequelize.BOOLEAN,
			field: 'descuento_general'
		},
		descuento: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'descuento'
		},
		recargo: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'recargo'
		},
		ice: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'ice'
		},
		excento: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'excento'
		},
		descuento_dolares: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'descuento_dolares'
		},
		recargo_dolares: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'recargo_dolares'
		},
		ice_dolares: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'ice_dolares'
		},
		excento_dolares: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'excento_dolares'
		},
		tipo_descuento: {
			type: Sequelize.BOOLEAN,
			field: 'tipo_descuento'
		},
		tipo_recargo: {
			type: Sequelize.BOOLEAN,
			field: 'tipo_recargo'
		},
		total: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'total'
		},
		total_dolares: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'total_dolares'
		},
		id_cierre_caja: {
			type: Sequelize.INTEGER,
			field: 'cierre_caja'
		},
		id_usuario: {
			type: Sequelize.INTEGER,
			field: 'usuario'
		},
		contabilizado: {
			type: Sequelize.BOOLEAN,
			field: 'contabilizado',
			defaultValue: false
		},
		compra_rendida:{
			type: Sequelize.BOOLEAN,
			field: 'compra_rendida',
			defaultValue: false
		},
		usar_producto: {
			type: Sequelize.BOOLEAN,
			field: 'usar_producto'
		},
		observacion: {
			type: Sequelize.STRING,
			field: 'observacion'
		},
		dui: {
			type: Sequelize.STRING,
			field: 'dui'
		},
		tipo_retencion: {
			type: Sequelize.BOOLEAN,
			field: 'tipo_retencion'
		},
		ver_dolares: {
			type: Sequelize.BOOLEAN,
			field: 'ver_dolares',
			defaultValue: false
		},
		calificacion_proveedor:{
			type: Sequelize.DECIMAL(20, 4),
			field: 'calificacion_proveedor'
		},
		numero_iso_compra: {
			type: Sequelize.INTEGER,
		  	field: 'numero_iso_compra'
		},
		id_asiento_contabilidad:{
			type: Sequelize.INTEGER,
		  	field: 'asiento_contabilidad'
		},
		descuento_gasolina: {
			type: Sequelize.BOOLEAN,
			field: 'descuento_gasolina',
			defaultValue: false
		},
		config_doc_iso: {
			type:Sequelize.INTEGER,
			field: 'config_doc_iso',
			defaultValue: null
		},
		verificado_para_comprobante: {
			type:Sequelize.BOOLEAN,
			field: 'verificado_para_comprobante',
			defaultValue: 0
		},
		estado_programacion_pago: {
			type:Sequelize.BOOLEAN,
			field: 'estado_programacion_pago',
			defaultValue: 0
		},
		iehd: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'iehd',
			defaultValue: 0.00
		},
		ipj: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'ipj',
			defaultValue: 0.00
		},
		tasas: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'tasas',
			defaultValue: 0.00
		},
		otros_ns_cf: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'otros_ns_cf',
			defaultValue: 0.00
		},
		grav_tasa_cero: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'grav_tasa_cero',
			defaultValue: 0.00
		}
	}, 
	{
			freezeTableName: true
	});

	Compra.sync().then(function () {

	});

	return Compra;
}