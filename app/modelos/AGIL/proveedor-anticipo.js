module.exports = function (sequelize, Sequelize) {
    var ProveedorAnticipo = sequelize.define('agil_proveedor_anticipo', {
        id_proveedor: {
            type: Sequelize.INTEGER,
            field: 'proveedor'
        },
        id_sucursal: {
            type: Sequelize.INTEGER,
            field: 'sucursal'
        },
        id_pago_compra: {
            type: Sequelize.INTEGER,
            field: 'pago_compra'
        },
        fecha: {
            type: Sequelize.DATE,
            field: 'fecha'
        },
        id_padre: {
            type: Sequelize.INTEGER,
            field: 'padre'
        },
        monto_anticipo: {
            type: Sequelize.DECIMAL(20, 4),
            field: 'monto_anticipo'
        },
        monto_salida: {
            type: Sequelize.DECIMAL(20, 4),
            field: 'monto_salida'
        },
        saldo: {
            type: Sequelize.DECIMAL(20, 4),
            field: 'saldo'
        },
        numero_correlativo_anticipo: {
            type: Sequelize.INTEGER,
            field: 'numero_correlativo_anticipo'
        },
        eliminado: {
            type: Sequelize.BOOLEAN,
            field: 'eliminado'
        },
        
    }, {
            freezeTableName: true
        });
    ProveedorAnticipo.sync();
    return ProveedorAnticipo;
}