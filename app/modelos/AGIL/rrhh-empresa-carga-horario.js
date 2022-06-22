
module.exports = function (sequelize, Sequelize) {
    var RrhhEmpresaCargaHorario = sequelize.define('agil_rrhh_empresa_carga_horario', {
        id_carga_horario: {
            type: Sequelize.INTEGER,
            field: 'carga_horario'
        },
        hora_inicio: {
            type: Sequelize.TIME,
            field: 'hora_inicio'
        },
        hora_fin: {
            type: Sequelize.TIME,
            field: 'hora_fin'
        },
        usar_descanso:{
            type: Sequelize.BOOLEAN,
            field: 'usar_descanso'
        },
        hora_inicio_descanso: {
            type: Sequelize.TIME,
            field: 'hora_inicio_descanso'
        },
        hora_fin_descanso: {
            type: Sequelize.TIME,
            field: 'hora_fin_descanso'
        },
        eliminado:{
            type: Sequelize.BOOLEAN,
            field: 'eliminado'
        }
    }, {
            freezeTableName: true
        });

        RrhhEmpresaCargaHorario.sync().then(function () {

    });

    return RrhhEmpresaCargaHorario;
}