module.exports = function (sequelize, Sequelize) {
    var DetallePedidoEntrega = sequelize.define('agil_detalle_pedido_entrega', {
        id_detalle_pedido: {
            type: Sequelize.INTEGER,
            field: 'detalle_pedido'
        },
        entregado:Sequelize.DECIMAL(20, 4),
        restante:Sequelize.DECIMAL(20, 4),
        fecha:Sequelize.DATE
    }, {
            freezeTableName: true
        });
    DetallePedidoEntrega.sync().then(function () {
    });
    return DetallePedidoEntrega;
}