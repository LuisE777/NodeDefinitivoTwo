module.exports = function (sequelize, Sequelize) {
    var CuentasBancoProveedor = sequelize.define('agil_cuentas_banco_proveedor', {
        id_proveedor: {
            type: Sequelize.INTEGER,
            field: 'id_proveedor',
        },
        id_banco: {
            type: Sequelize.INTEGER,
            field: 'id_banco'
        },
        nro_cuenta: {
            type: Sequelize.STRING,
            field: 'nro_cuenta'
        },
        predefinido: {
            type: Sequelize.BOOLEAN,
            field: 'predefinido',
            defaultValue: false
        },
        eliminado: {
            type: Sequelize.BOOLEAN,
            field: 'eliminado',
            defaultValue:false
        }
    }, {
            freezeTableName: true
        });
        CuentasBancoProveedor.sync().then(function () {
    });
    return CuentasBancoProveedor;
}