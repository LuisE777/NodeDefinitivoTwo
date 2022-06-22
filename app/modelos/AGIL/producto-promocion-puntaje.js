module.exports = function (sequelize, Sequelize) {
    var ProductoPromocionPuntaje = sequelize.define('agil_producto_promocion_puntaje', {
        id_producto: {
            type: Sequelize.INTEGER,
            field: 'producto'
        },
        id_dia: {
            type: Sequelize.INTEGER,
            field: 'dia'
        },
        fecha_inicio: {
            type: Sequelize.DATE,
            field: 'fecha_inicio'
        },
        fecha_fin: {
            type: Sequelize.DATE,
            field: 'fecha_fin'
        },
        habilitado: {
            type: Sequelize.BOOLEAN,
            field: 'habilitado'
        },
        tipo_promocion: {
            type: Sequelize.BOOLEAN,
            field: 'tipo_promocion'
        },
        hora_inicio:{
            type: Sequelize.DATE,
            field: 'hora_inicio'
        },
        hora_fin:{
            type: Sequelize.DATE,
            field: 'hora_fin'
        },
        puntaje: {
            type: Sequelize.DECIMAL(20, 4),
            field: 'puntaje'
        }
    }, {
            freezeTableName: true
        });

    ProductoPromocionPuntaje.sync().then(function () {

    });

    return ProductoPromocionPuntaje;
}
