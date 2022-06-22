module.exports = function (sequelize, Sequelize) {
    var InventarioRecepcion = sequelize.define('agil_inventario_de_recepcion', {
        id_mantenimiento_ot: {
            type: Sequelize.INTEGER,
            field: 'id_mantenimiento_ot'
        },
        parabrisas_delantero: {
            type: Sequelize.BOOLEAN,
            field: 'parabrisas_delantero'
        },
        parabrisas_trasero: {
            type: Sequelize.BOOLEAN,
            field: 'parabrisas_trasero'
        },
        vidrio_techo_solar: {
            type: Sequelize.BOOLEAN,
            field: 'vidrio_techo_solar'
        },
        radio: {
            type: Sequelize.BOOLEAN,
            field: 'radio'
        },
        retrovisor: {
            type: Sequelize.BOOLEAN,
            field: 'retrovisor'
        },
        llanta_auxilio: {
            type: Sequelize.BOOLEAN,
            field: 'modelo'
        },
        tapa_valvulas: {
            type: Sequelize.BOOLEAN,
            field: 'tapa_valvulas'
        },
        gata: {
            type: Sequelize.BOOLEAN,
            field: 'gata'
        },
        faroles_delanteros: {
            type: Sequelize.BOOLEAN,
            field: 'faroles_delanteros'
        },
        guiniadores: {
            type: Sequelize.BOOLEAN,
            field: 'guiniadores'
        },
        limpia_parabrisas_delantero: {
            type: Sequelize.BOOLEAN,
            field: 'limpia_parabrisas_delantero'
        },
        limpia_parabrisas_trasero: {
            type: Sequelize.BOOLEAN,
            field: 'limpia_parabrisas_trasero'
        },
        ventanas_delanteras: {
            type: Sequelize.BOOLEAN,
            field: 'ventanas_delanteras'
        },
        ventanas_traseras: {
            type: Sequelize.BOOLEAN,
            field: 'ventanas_traseras'
        },
        encendedor: {
            type: Sequelize.BOOLEAN,
            field: 'encendedor'
        },
        antena: {
            type: Sequelize.BOOLEAN,
            field: 'antena'
        },
        emblema: {
            type: Sequelize.BOOLEAN,
            field: 'emblema'
        },
        tapa_cubos: {
            type: Sequelize.BOOLEAN,
            field: 'tapa_cubos'
        },
        herramientas: {
            type: Sequelize.BOOLEAN,
            field: 'herramientas'
        },
        tapa_tanque_combustible: {
            type: Sequelize.BOOLEAN,
            field: 'tapa_tanque_combustible'
        },
        stops: {
            type: Sequelize.BOOLEAN,
            field: 'stops'
        },
        sobrepisos: {
            type: Sequelize.BOOLEAN,
            field: 'sobrepisos'
        },
        id_tamanio_tanque: {
            type: Sequelize.INTEGER,
            field: 'tamanio_tanque'
        },
        otros: {
            type: Sequelize.STRING,
            field: 'otros'
        }
         
    }, {
            freezeTableName: true
        });

        InventarioRecepcion.sync().then(function () {

    });

    return InventarioRecepcion;
}