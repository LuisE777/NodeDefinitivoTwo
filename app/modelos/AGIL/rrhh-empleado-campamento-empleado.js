
module.exports = function (sequelize, Sequelize) {
    var RrhhEmpleadoCampamentoEmpleado = sequelize.define('agil_rrhh_empleado_campamento_empleado', {

        id_campo: {
            type: Sequelize.INTEGER,
            field: 'campo'
        },
        comensales: {
            type: Sequelize.INTEGER,
            field: 'comensales'
        },
        eliminado: {
            type: Sequelize.BOOLEAN,
            field: 'eliminado'

        }
    }, {
        freezeTableName: true
    });

    RrhhEmpleadoCampamentoEmpleado.sync().then(function () {

    });

    return RrhhEmpleadoCampamentoEmpleado;
}