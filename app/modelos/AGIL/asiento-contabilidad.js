module.exports = function (sequelize, Sequelize) {
    var AsientoContabilidad = sequelize.define('agil_asiento_contabilidad', {
        id_comprobante: {
            type: Sequelize.INTEGER,
            field: 'comprobante'
        },
        id_cuenta: {
            type: Sequelize.INTEGER,
            field: 'cuenta'
        },
        id_compra: {
            type: Sequelize.INTEGER,
            field: 'compra'
        },
        id_venta: {
            type: Sequelize.INTEGER,
            field: 'venta'
        },
        debe_bs: {
            type: Sequelize.DECIMAL(20, 4),
            field: 'debe_bs'
        },
        haber_bs: {
            type: Sequelize.DECIMAL(20, 4),
            field: 'haber_bs'
        },
        debe_sus: {
            type: Sequelize.DECIMAL(20, 4),
            field: 'debe_sus'
        },
        haber_sus: {
            type: Sequelize.DECIMAL(20, 4),
            field: 'haber_sus'
        },
        eliminado: {
            type: Sequelize.BOOLEAN,
            field: 'eliminado'
        },
        glosa:{
            type: Sequelize.TEXT("long"),
            field: 'glosa'
        },
        id_centro_costo:{
            type: Sequelize.INTEGER,
            field: 'centro_costo'
        },
        saldo_cuenta_bs:{
            type: Sequelize.DECIMAL(20, 4),
            field: 'saldo_cuenta_bs'
        },
        saldo_cuenta_bs:{
            type: Sequelize.DECIMAL(20, 4),
            field: 'saldo_cuenta_sus'
        }
    }, {
            freezeTableName: true
        });

    AsientoContabilidad.sync();

    return AsientoContabilidad;
}