module.exports = function (sequelize, Sequelize) {
    var DetalleOrdenServicioEntrega = sequelize.define('agil_detalle_orden_servicio_entrega', {
        id_detalle_orden_servicio: {
            type: Sequelize.INTEGER,
            field: 'detalle_orden_servicio'
        },
        entregado:Sequelize.DECIMAL(20, 4),
        restante:Sequelize.DECIMAL(20, 4),
        fecha:Sequelize.DATE
    }, {
            freezeTableName: true
        });
    DetalleOrdenServicioEntrega.sync().then(function () {
    });
    return DetalleOrdenServicioEntrega;
}