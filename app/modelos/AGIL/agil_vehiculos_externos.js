module.exports = function (sequelize, Sequelize) {
    var VehiculoExterno = sequelize.define('agil_vehiculos_externos', {
        marca: {
            type: Sequelize.STRING,
            field: 'marca'
        },
        chasis: {
            type: Sequelize.STRING,
            field: 'chasis'
        },
        placa: {
            type: Sequelize.STRING,
            field: 'placa'
        },
        color: {
            type: Sequelize.STRING,
            field: 'color'
        },
        km: {
            type: Sequelize.STRING,
            field: 'km'
        },
        anio: {
            type: Sequelize.STRING,
            field: 'anio'
        },
        modelo: {
            type: Sequelize.STRING,
            field: 'modelo'
        },
        id_empresa: {
            type: Sequelize.STRING,
            field: 'empresa'
        },
        id_producto: {
            type: Sequelize.INTEGER,
            field: 'id_producto',
            default: null
        },
        capacidad: {
            type: Sequelize.DECIMAL(10, 4),
            field: 'capacidad',
            default: null
        }
    }, {
            freezeTableName: true
        });

    VehiculoExterno.sync().then(function () {

    });

    return VehiculoExterno;
}