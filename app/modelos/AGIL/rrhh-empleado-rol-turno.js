
module.exports = function (sequelize, Sequelize) {
    var RrhhEmpleadoRolTurno = sequelize.define('agil_rrhh_empleado_rol_turno', {
        /*        id_empleado: {
                   type: Sequelize.INTEGER,
                   field: 'empleado'
               }, */
        id_ficha: {
            type: Sequelize.INTEGER,
            field: 'ficha'
        },
        id_campo: {
            type: Sequelize.INTEGER,
            field: 'campo'
        },
        fecha_inicio: {
            type: Sequelize.DATE,
            field: 'fecha_inicio'
        },
        fecha_fin: {
            type: Sequelize.DATE,
            field: 'fecha_fin'
        },
        tipo: {
            type: Sequelize.BOOLEAN,
            field: 'tipo'
        },
        dias_trabajado: {
            type: Sequelize.INTEGER,
            field: 'dias_trabajado'
        },
        dias_descanso: {
            type: Sequelize.INTEGER,
            field: 'dias_descanso'
        },
        id_grupo: {
            type: Sequelize.INTEGER,
            field: 'grupo'
        },
        eliminado: {
            type: Sequelize.BOOLEAN,
            field: 'eliminado'
        },
        turno_dia: {
            type: Sequelize.BOOLEAN,
            field: 'turno_dia'
        },
        alerta: {
            type: Sequelize.BOOLEAN,
            field: 'alerta'
        },
        comentario: {
            type: Sequelize.STRING,
            field: 'comentario'
        },
        id_clasificacion:{
            type: Sequelize.INTEGER,
            field: 'clasificacion'
        },
    }, {
        freezeTableName: true
    });

    RrhhEmpleadoRolTurno.sync().then(function () {

    });

    return RrhhEmpleadoRolTurno;
}