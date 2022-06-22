module.exports = function (sequelize, Sequelize) {
    var Chofer = sequelize.define('agil_transporte_chofer', {
        id_persona: {
            type: Sequelize.INTEGER,
            field: 'id_persona',
            default: null
        },
        id_categoria: {
            type: Sequelize.INTEGER,
            field: 'id_categoria',
            default: null
        },
        vencimiento: {
            type: Sequelize.DATE,
            field: 'vencimiento'
        },
        id_empresa: {
            type: Sequelize.INTEGER,
            field: 'id_empresa'
        }
    }, {
            freezeTableName: true
        });

        Chofer.sync().then(function () {

    });

    return Chofer;
}