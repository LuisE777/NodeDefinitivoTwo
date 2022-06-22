module.exports = (sequelize, Sequelize) => {
    const DetalleTransaccion = sequelize.define('agil_cuenta_transaccion_detalle', {
        id_transaccion: {
            type: Sequelize.INTEGER,
            field: 'transaccion'
        },
        fecha: {
            type: Sequelize.DATE,
            field: 'fecha'
        },
        id_proforma: {
            type: Sequelize.INTEGER,
            field: 'detalle'
        },
        id_compra: {
            type: Sequelize.INTEGER,
            field: 'id_compra'
        },
        monto: {
            type: Sequelize.DECIMAL(20,4),
            field: 'monto'
        }
    }, {
            freezeTableName: true
        });
    DetalleTransaccion.sync().then(function () {
    });
    return DetalleTransaccion;
}