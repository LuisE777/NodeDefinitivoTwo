module.exports = function (sequelize, Sequelize) {
    var CierreMensualProforma = sequelize.define('agil_cierre_mensual_proforma', {
        fecha: {
            type: Sequelize.DATE,
            field: 'fecha'
        },
        periodo_mes: {
            type: Sequelize.INTEGER,
            field: 'periodo_mes'
        },
        periodo_anio: {
            type: Sequelize.INTEGER,
            field: 'periodo_anio'
        },
        id_usuario: {
            type: Sequelize.INTEGER,
            field: 'usuario'
        }
    }, {
        freezeTableName: true
    });

    CierreMensualProforma.sync().then(function () {

    });

    return CierreMensualProforma;
}