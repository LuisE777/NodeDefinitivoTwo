module.exports = function (sequelize, Sequelize) {
	var Venta = sequelize.define('inv_venta', {
		id_almacen: {
			type: Sequelize.INTEGER,
			field: 'almacen'
		},
		id_actividad: {
			type: Sequelize.INTEGER,
			field: 'actividad'
		},
		id_cliente: {
			type: Sequelize.INTEGER,
			field: 'cliente'
		},
		id_movimiento: {
			type: Sequelize.INTEGER,
			field: 'movimiento'
		},
		factura: {
			type: Sequelize.BIGINT,
			field: 'factura'
		},
		autorizacion: {
			type: Sequelize.BIGINT,
			field: 'autorizacion'
		},
		fecha: {
			type: Sequelize.DATE,
			field: 'fecha'
		},
		fecha_limite_emision: {
			type: Sequelize.DATE,
			field: 'fecha_limite_emision'
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
		saldo_dolares: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'saldo_dolares'
		},
		total: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'total'
		},
		total_dolares: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'total_dolares'
		},
		id_usuario: {
			type: Sequelize.INTEGER,
			field: 'usuario'
		},
		pagado: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'pagado'
		},
		pagado_dolares: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'pagado_dolares'
		},
		cambio: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'cambio'
		},
		cambio_dolares: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'cambio_dolares'
		},
		activa: {
			type: Sequelize.BOOLEAN,
			field: 'activa'
		},
		id_almacen_traspaso: {
			type: Sequelize.INTEGER,
			field: 'almacen_traspaso'
		},
		pedido: {
			type: Sequelize.INTEGER,
			field: 'pedido'
		},
		despachado: {
			type: Sequelize.BOOLEAN,
			field: 'despachado'
		},
		id_cierre_caja: {
			type: Sequelize.INTEGER,
			field: 'cierre_caja'
		},
		id_cierre_caja_mesero: {
			type: Sequelize.INTEGER,
			field: 'cierre_caja_mesero'
		},
		id_vendedor: {
			type: Sequelize.INTEGER,
			field: 'vendedor'
		},
		id_mesero: {
			type: Sequelize.INTEGER,
			field: 'mesero'
		},
		mesa_activa: {
			type: Sequelize.BOOLEAN,
			field: 'mesa_activa',
			defaultValue: true
		},
		mesa: {
			type: Sequelize.INTEGER,
			field: 'mesa'
		},
		id_liquidacion: {
			type: Sequelize.INTEGER,
			field: 'liquidacion'
		},
		contabilizado: {
			type: Sequelize.BOOLEAN,
			field: 'contabilizado',
			defaultValue: false
		},
		usar_servicios: {
			type: Sequelize.BOOLEAN,
			field: 'usar_servicios',
			defaultValue: false
		},
		observacion: {
			type: Sequelize.STRING,
			field: 'observacion',
		},
		id_tipo_movimiento: {
			type: Sequelize.INTEGER,
			field: 'tipo_movimiento',
		},
		id_sucursal: {
			type: Sequelize.INTEGER,
			field: 'sucursal',
		},
		usar_descuento_general: {
			type: Sequelize.BOOLEAN,
			field: 'usar_descuento_general',
			defaultValue: false
		},
		tipo_descuento: {
			type: Sequelize.BOOLEAN,
			field: 'tipo_descuento',
			defaultValue: false
		},
		descuento: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'descuento',
			defaultValue: 0
		},
		tipo_recargo: {
			type: Sequelize.BOOLEAN,
			field: 'tipo_recargo',
			defaultValue: false
		},
		recargo: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'recargo',
			defaultValue: 0
		},
		ice: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'ice',
			defaultValue: 0
		},
		excento: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'excento',
			defaultValue: 0
		},
		total_descuento: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'descuento_general',
			defaultValue: 0
		},
		a_cuenta_dolares: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'a_cuenta_dolares',
			defaultValue: 0
		},
		total_descuento_dolares: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'descuento_general_dolares',
			defaultValue: 0
		},
		total_recargo: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'total_recargo',
			defaultValue: 0
		},
		total_recargo_dolares: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'total_recargo_dolares',
			defaultValue: 0
		},
		total_ice: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'total_ice',
			defaultValue: 0
		},
		total_ice_dolares: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'total_ice_dolares',
			defaultValue: 0
		},
		total_exento: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'total_exento',
			defaultValue: 0
		},
		total_excento_dolares: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'total_excento_dolares',
			defaultValue: 0
		},
		ver_dolares: {
			type: Sequelize.BOOLEAN,
			field: 'ver_dolares',
			defaultValue: false
		},
		numero_tarjeta_credito: {
			type: Sequelize.INTEGER,
			field: 'numero_tarjeta_credito',
			defaultValue: 0
		},
		monto_tarjeta_credito: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'monto_tarjeta_credito',
			defaultValue: 0
		},
		observacion_traspaso: {
			type: Sequelize.STRING,
			field: 'observacion_traspaso'
		},
		numero_iso_traspaso: {
			type: Sequelize.INTEGER,
			field: 'numero_iso_traspaso',
			defaultValue: 0
		},
		id_movimiento_eliminado: {
			type: Sequelize.INTEGER,
			field: 'id_movimiento_eliminado',
		},
		confirmar_traspaso: {
			type: Sequelize.BOOLEAN,
			field: 'confirmar_traspaso',
			defaultValue: false
		},
		config_doc_iso: {
			type:Sequelize.INTEGER,
			field: 'config_doc_iso',
			defaultValue: null
		},
		numero_iso_baja: {
			type:Sequelize.INTEGER,
			field: 'numero_iso_baja',
		},
		id_comprobante:{
			type:Sequelize.INTEGER,
			field: 'comprobante',
		},
		campamento_sincronizado:{
			type: Sequelize.BOOLEAN,
			field: 'campamento_sincronizado',
			defaultValue:false
		},
		fecha_sincronizado:{
			type: Sequelize.DATE,
			field: 'fecha_sincronizado',
		}
	}, {
		freezeTableName: true
	});

	Venta.sync().then(function () {

	});

	return Venta;
}