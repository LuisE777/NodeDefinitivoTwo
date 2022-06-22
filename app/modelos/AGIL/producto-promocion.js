module.exports = function (sequelize, Sequelize) {
    var ProductoPromocion = sequelize.define('agil_producto_promocion', {
        id_producto: {
            type: Sequelize.INTEGER,
            field: 'producto'
        },
        id_dia: {
            type: Sequelize.INTEGER,
            field: 'dia'
        },
        nombre: {
            type: Sequelize.STRING,
            field: 'nombre'
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
        precio: {
            type: Sequelize.DECIMAL(20, 4),
            field: 'precio'
        }
    }, {
            freezeTableName: true
        });

    ProductoPromocion.sync().then(function () {

    });

    return ProductoPromocion;
}
