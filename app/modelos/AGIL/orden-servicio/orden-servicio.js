module.exports = (sequelize, Sequelize) => {
	const OrdenServicio = sequelize.define('orden_servicio', {
		fecha: {
			type: Sequelize.DATE,
			field: 'fecha'
		},
		fecha_entrega: {
			type: Sequelize.DATE,
			field: 'fecha_entrega'
		},
		id_usuario: {
			type: Sequelize.INTEGER,
			field: 'usuario'
		},
		id_compra: {
			type: Sequelize.INTEGER,
			field: 'compra'
		},
		id_sucursal: {
			type: Sequelize.INTEGER,
			field: 'sucursal'
		},
		id_almacen: {
			type: Sequelize.INTEGER,
			field: 'almacen'
		},
		activo: {
			type: Sequelize.BOOLEAN,
			field: 'activo'
        },
        id_concepto: { // eq id_tipo
			type: Sequelize.INTEGER,
			field: 'concepto'
		},
		cambio_dolar: {
            type: Sequelize.DECIMAL(20,4),
            field: 'cambio_dolar'
        },
        id_detalle: { // eq id_clase
			type: Sequelize.INTEGER,
			field: 'detalle'
		},
		id_proveedor: {
			type: Sequelize.INTEGER,
			field: 'proveedor'
		},
		id_cliente: { // eq Destino
			type: Sequelize.INTEGER,
			field: 'cliente'
		},
		eliminado: {
			type: Sequelize.BOOLEAN,
			field: 'eliminado',
			defaultValue: 0
		},
		id_empresa: {
			type: Sequelize.INTEGER,
			field: 'empresa'
		},
		numero_correlativo:{
			type: Sequelize.INTEGER,
			field: 'numero_correlativo'
		},
		id_area_solicitante: {
			type: Sequelize.INTEGER,
			field: 'area_solicitante',
			defaultValue: null,
        },
        id_area_destino: {
			type: Sequelize.INTEGER,
			field: 'area_destino',
			defaultValue: null,
		},
		importe: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'importe'
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
		id_estado: {
			type: Sequelize.INTEGER,
			field: 'estado'
		},
		numero_iso:{
			type: Sequelize.INTEGER,
			field: 'numero_iso'  
		},
		descripcion:{
			type: Sequelize.TEXT('long'),
			field: 'descripcion'  
		},
		observacion:{
			type: Sequelize.TEXT('long'),
			field: 'observacion'  
		},
		config_doc_iso: {
			type:Sequelize.INTEGER,
			field: 'config_doc_iso',
			defaultValue: null
		}
	}, {
			freezeTableName: true
		});

	OrdenServicio.sync().then(() => {

	});

	return OrdenServicio;
}