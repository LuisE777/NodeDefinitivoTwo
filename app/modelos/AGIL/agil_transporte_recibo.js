module.exports = function (sequelize, Sequelize) {
    var Recibo = sequelize.define('agil_transporte_recibo', {
        id_usuario: {
            type: Sequelize.INTEGER,
            field: 'id_usuario'
        },
        id_sucursal: {
            type: Sequelize.INTEGER,
            field: 'id_sucursal'
        },
        id_moneda: {
            type: Sequelize.INTEGER,
            field: 'id_moneda'
        },
        fecha: {
            type: Sequelize.DATE,
            field: 'fecha'
        },
        observacion: {
            type: Sequelize.STRING,
            field: 'observacion'
        },
        id_chofer: {
            type: Sequelize.INTEGER,
            field: 'id_chofer'
        },
        id_vehiculo: {
            type: Sequelize.INTEGER,
            field: 'id_vehiculo'
        },
        metodo_pago: {
            type: Sequelize.STRING,
            field: 'metodo_pago'
        },
        id_banco: {
            type: Sequelize.INTEGER,
            field: 'id_banco'
        },
        id_banco_destino: {
            type: Sequelize.INTEGER,
            field: 'id_banco_destino'
        },
        nro_cheque: {
            type: Sequelize.STRING,
            field: 'nro_cheque'
        },
        correlativo: {
            type: Sequelize.INTEGER,
            field: 'correlativo'
        },
        id_estado: {
            type: Sequelize.INTEGER,
            field: 'id_estado'
        },
        eliminado: {
            type: Sequelize.BOOLEAN,
            field: 'eliminado'
        }
    
    }, {
            freezeTableName: true
        });

    Recibo.sync().then(function () {

    });

    return Recibo;
}