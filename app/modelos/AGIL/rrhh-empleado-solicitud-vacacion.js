
module.exports = function (sequelize, Sequelize) {
    var RrhhEmpleadoSolicitudVacacion = sequelize.define('agil_rrhh_empleado_solicitud_vacacion', {
        id_ficha: {
            type: Sequelize.INTEGER,
            field: 'ficha'
        },
        sabado: {
            type: Sequelize.BOOLEAN,
            field: 'sabado'
        },
        fecha_inicio: {
            type: Sequelize.DATE,
            field: 'fecha_inicio'
        },
        fecha_fin: {
            type: Sequelize.DATE,
            field: 'fecha_fin'
        },
        observacion: {
            type: Sequelize.STRING,
            field: 'observacion'
        },
        dias: {
            type: Sequelize.DECIMAL(20, 4),
            field: 'dias'
        },
        inicio_tipo: {
            type: Sequelize.BOOLEAN,
            field: 'inicio_tipo'
        },
        fin_tipo: {
            type: Sequelize.BOOLEAN,
            field: 'fin_tipo'
        },
        eliminado: {
            type: Sequelize.BOOLEAN,
            field: 'eliminado'
        },
        domingos: {
            type: Sequelize.INTEGER,
            field: 'domingos'
        },
        feriados: {
            type: Sequelize.INTEGER,
            field: 'feriados'
        },
        fecha_creacion: {
            type: Sequelize.DATE,
            field: 'fecha_creacion'
        },
        id_estado: {
            type: Sequelize.INTEGER,
            field: 'estado'
        },
        comentario:{
            type: Sequelize.STRING,
            field: 'comentario'
        }
    }, {
        freezeTableName: true
    });

    RrhhEmpleadoSolicitudVacacion.sync().then(function () {

    });

    return RrhhEmpleadoSolicitudVacacion;
}