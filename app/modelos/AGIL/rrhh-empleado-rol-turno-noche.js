module.exports = function (sequelize, Sequelize) {
    var RrhhEmpleadoRolTurnoNoche = sequelize.define('agil_rrhh_empleado_rol_turno_noche', {
        id_rol_turno: {
            type: Sequelize.INTEGER,
            field: 'rol_truno'
        },
        fecha_inicio: {
            type: Sequelize.DATE,
            field: 'fecha_inicio'
        },
        fecha_fin: {
            type: Sequelize.DATE,
            field: 'fecha_fin'
        },
        dias: {
            type: Sequelize.INTEGER,
            field: 'dias_trabajado'
        },
        eliminado: {
            type: Sequelize.BOOLEAN,
            field: 'eliminado'
        },
        comentario: {
            type: Sequelize.STRING,
            field: 'comentario'
        },
        id_tipo:{
            type: Sequelize.INTEGER,
            field: 'tipo'
        }
    }, {
        freezeTableName: true
    });

    RrhhEmpleadoRolTurnoNoche.sync().then(function () {

    });

    return RrhhEmpleadoRolTurnoNoche;
}