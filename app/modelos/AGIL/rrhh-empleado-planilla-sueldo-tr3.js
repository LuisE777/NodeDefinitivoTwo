
module.exports = function (sequelize, Sequelize) {
    var RrhhEmpleadoSueldoTr3 = sequelize.define('agil_rrhh_planilla_sueldo_tr3', {
        id_planilla_sueldo: {
            type: Sequelize.INTEGER,
            field: 'planilla_sueldo'
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

        RrhhEmpleadoSueldoTr3.sync().then(function () {

    });

    return RrhhEmpleadoSueldoTr3;
}