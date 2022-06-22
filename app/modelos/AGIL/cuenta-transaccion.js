module.exports = (sequelize, Sequelize) => {
    const Transaccion = sequelize.define('agil_cuenta_transaccion', {
        id_cuenta: {
            type: Sequelize.INTEGER,
            field: 'cuenta'
        },
        fecha: {
            type: Sequelize.DATE,
            field: 'fecha'
        },
        detalle: {
            type: Sequelize.TEXT('long'),
            field: 'detalle'
        },
        id_cliente: {
            type: Sequelize.INTEGER,
            field: 'cliente'
        },
        id_proveedor: {
            type: Sequelize.INTEGER,
            field: 'proveedor'
        },
        id_usuario: {
            type: Sequelize.INTEGER,
            field: 'usuario'
        },
        id_concepto: {
            type: Sequelize.INTEGER,
            field: 'concepto'
        },
        observaciones: {
            type: Sequelize.TEXT('medium'),
            field: 'observaciones'
        },
        ref_doc: {
            type: Sequelize.STRING,
            field: 'ref_doc'
        },
        tipo_doc: {
            type: Sequelize.INTEGER,
            field: 'tipo_doc'
        },
        debe: {
            type: Sequelize.DECIMAL(20,4),
            field: 'debe'
        },
        haber: {
            type: Sequelize.DECIMAL(20,4),
            field: 'haber'
        },
        saldo: {
            type: Sequelize.DECIMAL(20,4),
            field: 'saldo'
        },
        id_estado: {
            type: Sequelize.INTEGER,
            field: 'estado'
        },
        id_empresa: {
            type: Sequelize.INTEGER,
            field: 'empresa'
        },
        cerrada: {
            type: Sequelize.BOOLEAN,
            field: 'cerrada'
        },
        factura: {
            type: Sequelize.INTEGER,
            field: 'factura'
        },
        eliminado: {
            type: Sequelize.BOOLEAN,
            field: 'eliminado'
        },
        detalle_dos:{
            type: Sequelize.STRING,
            field: 'detalle_dos'
        },
        ids_proformas:{
            type: Sequelize.TEXT('long'),
            field: 'proformas'
        },
        ids_ventas:{
            type: Sequelize.STRING,
            field: 'ventas'
        },
        seguimiento:{
            type: Sequelize.BOOLEAN,
            field: 'seguimiento'
        },
        correlativo:{
            type: Sequelize.INTEGER,
            field: 'correlativo'
        },
        id_comprobante:{
            type: Sequelize.INTEGER,
            field: 'id_comprobante'
        },
        doc_respaldo: {
            type: Sequelize.STRING,
            field: 'doc_respaldo'
        },
    }, {
            freezeTableName: true, alter: true
        });
    Transaccion.sync().then(function () {
    });
    return Transaccion;
}