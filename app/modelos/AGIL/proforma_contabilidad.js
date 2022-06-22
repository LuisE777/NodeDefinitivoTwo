module.exports = function (sequelize, Sequelize) {
    var ProformaContabilidad = sequelize.define('agil_proforma_contabilidad', {
       
        id_proforma: {
            type: Sequelize.INTEGER,
            field: 'id_proforma'
        },
        id_asiento_contabilidad: {
            type: Sequelize.INTEGER,
            field: 'asiento_contabilidad'
        },
        monto: {
            type: Sequelize.DECIMAL(20,4),
            field: 'monto'
        },
        id_cliente: {
            type: Sequelize.INTEGER,
            field: 'cliente',
        },
        totalImporteSus: {
            type: Sequelize.DECIMAL(20,4),
            field: 'totalImporteSus'
        },
        cambio_dolar: {
            type: Sequelize.DECIMAL(20,4),
            field: 'cambio_dolar'
        },
        fecha_factura: {
            type: Sequelize.DATE,
            field: 'fecha_factura'
        },
        factura: {
            type: Sequelize.BIGINT,
            field: 'factura'
        },
        autorizacion: {
            type: Sequelize.BIGINT,
            field: 'autorizacion'
        },
    }, {
            freezeTableName: true
        });
        ProformaContabilidad.sync().then(function () {
    });
    return ProformaContabilidad;
}