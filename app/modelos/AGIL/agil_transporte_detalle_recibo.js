module.exports = function (sequelize, Sequelize) {
    var DetalleRecibo = sequelize.define('agil_transporte_detalle_recibo', {
        id_recibo: {
            type: Sequelize.INTEGER,
            field: 'id_recibo'
        },
        importe: {
            type: Sequelize.DECIMAL(20, 4),
            field: 'importe'
        },
        id_ruta: {
            type: Sequelize.INTEGER,
            field: 'id_ruta'
        },
        peso: {
            type: Sequelize.DECIMAL(20, 4),
            field: 'peso'
        },
        unidad: {
            type: Sequelize.STRING,
            field: 'unidad'
        },
        descripcion_descuento: {
            type: Sequelize.STRING,
            field: 'descripcion_descuento'
        },
        observacion: {
            type: Sequelize.STRING,
            field: 'observacion'
        },
        
    }, {
            freezeTableName: true
        });

    DetalleRecibo.sync().then(function () {

    });

    return DetalleRecibo;
}