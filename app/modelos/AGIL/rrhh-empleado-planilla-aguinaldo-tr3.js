
module.exports = function (sequelize, Sequelize) {
    var RrhhEmpleadoAguinaldoTr3 = sequelize.define('agil_rrhh_planilla_aguinaldo_tr3', {
        id_planilla_aguinaldo: {
            type: Sequelize.INTEGER,
            field: 'planilla_aguinaldo'
        },
        id_tr3: {
            type: Sequelize.INTEGER,
            field: 'tr3'
        },
        eliminado: {
            type: Sequelize.BOOLEAN,
            field: 'eliminado',
            defaultValue: false
        }

    }, {
            freezeTableName: true
        });

        RrhhEmpleadoAguinaldoTr3.sync().then(function () {

    });

    return RrhhEmpleadoAguinaldoTr3;
}