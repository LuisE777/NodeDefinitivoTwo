module.exports = function (sequelize, Sequelize) {
    var SolicitudCajaChica = sequelize.define('agil_solicitud_caja_chica', {
        id_usuario: {
            type: Sequelize.INTEGER,
            field: 'usuario'
        },
        fecha: {
            type: Sequelize.DATE,
            field: 'fecha'
        },
        id_solicitante: {
            type: Sequelize.INTEGER,
            field: 'solicitante'
        },
        id_sucursal: {
            type: Sequelize.INTEGER,
            field: 'sucursal'
        },
        id_concepto: {
            type: Sequelize.INTEGER,
            field: 'concepto'
        },
        detalle: {
            type: Sequelize.TEXT("long"),
            field: 'detalle'
        },
        monto: {
            type: Sequelize.DECIMAL(20, 4),
            field: 'monto',
        },

        eliminado: {
            type: Sequelize.BOOLEAN,
            field: 'eliminado'
        },
        id_estado: {
            type: Sequelize.INTEGER,
            field: 'estado'
        },
        id_autorizador: {
            type: Sequelize.INTEGER,
            field: 'autorizador'
        },
        id_verificador: {
            type: Sequelize.INTEGER,
            field: 'verificador'
        },
        incremento: {
            type: Sequelize.DECIMAL(20, 4),
            field: 'incremento',
            default: 0
        },
        fecha_incremento: {
            type: Sequelize.DATE,
            field: 'fecha_incremento'
        },
        numero_correlativo_incremento: {
            type: Sequelize.INTEGER,
            field: 'numero_correlativo_incremento'
        },
        id_proveedor:{
            type: Sequelize.INTEGER,
            field: 'proveedor'
        },
        numero_orden_compra:{
            type: Sequelize.INTEGER,
            field: 'numero_orden_compra'
        }
    }, {
            freezeTableName: true
        });
    SolicitudCajaChica.sync().then(function () {
    });
    return SolicitudCajaChica;
}