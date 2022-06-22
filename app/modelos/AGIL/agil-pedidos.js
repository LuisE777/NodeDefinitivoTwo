module.exports = function (sequelize, Sequelize) {
    var Pedidos = sequelize.define('agil_pedidos', {
        id_sucursal: {
            type: Sequelize.INTEGER,
            field: 'sucursal'
        },
        id_empresa: {
            type: Sequelize.INTEGER,
            field: 'empresa'
        },
        id_proveedor: {
            type: Sequelize.INTEGER,
            field: 'proveedor'
        },
        id_compra: {
            type: Sequelize.INTEGER,
            field: 'compra'
        },
        fecha: {
            type: Sequelize.DATE,
            field: 'fecha'
        },
        recibido: {
            type: Sequelize.BOOLEAN,
            field: 'recibido'
        },
        id_usuario: {
            type: Sequelize.INTEGER,
            field: 'usuario'
        },
        eliminado: {
            type: Sequelize.BOOLEAN,
            field: 'eliminado'
        },
        id_almacen: {
            type: Sequelize.INTEGER,
            field: 'almacen'
        },
        id_estado: {
            type: Sequelize.INTEGER,
            field: 'estado'
        },
        numero_correlativo: {
            type: Sequelize.INTEGER,
            field: 'numero_correlativo'
        },
        id_tipo_pago: {
            type: Sequelize.INTEGER,
            field: 'id_tipo_pago'
        },
        dias_credito: {
            type: Sequelize.INTEGER,
            field: 'dias_credito'
        },
        total: {
            type: Sequelize.DECIMAL(20, 4),
            field: 'total'
        },
        a_cuenta: {
            type: Sequelize.DECIMAL(20, 4),
            field: 'a_cuenta'
        },
        saldo: {
            type: Sequelize.DECIMAL(20, 4),
            field: 'saldo'
        },
        fecha_recepcion: {
            type: Sequelize.DATE,
            field: 'fecha_recepcion'
        },
        id_forma_entrega: {
            type: Sequelize.INTEGER,
            field: 'id_forma_entrega'
        },
        observacion:{
            type: Sequelize.STRING,
            field: 'observacion'
        },
        numero_iso_orden_compra: {
            type: Sequelize.INTEGER,
            field: 'numero_iso_orden_compra'
        },
        config_doc_iso: {
			type:Sequelize.INTEGER,
			field: 'config_doc_iso',
			defaultValue: null
		}
    }, {
        freezeTableName: true
    });
    Pedidos.sync().then(function () {
    });
    return Pedidos;
}