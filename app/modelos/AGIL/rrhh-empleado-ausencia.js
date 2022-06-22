
module.exports = function (sequelize, Sequelize) {
    var RrhhEmpleadoAusencia = sequelize.define('agil_rrhh_empleado_ausencia', {
         id_usuario: {
            type: Sequelize.INTEGER,
            field: 'usuario'
        }, 
        id_ficha: {
            type: Sequelize.INTEGER,
            field: 'ficha'
        },
        id_tipo: {
            type: Sequelize.INTEGER,
            field: 'tipo'
        },
        fecha_inicio: {
            type: Sequelize.DATE,
            field: 'fecha_inicio'
        },
        fecha_fin: {
            type: Sequelize.DATE,
            field: 'fecha_fin'
        },
        fecha_inicio_solicitud: {
            type: Sequelize.DATE,
            field: 'fecha_inicio_solicitud'
        },
        fecha_fin_solicitud: {
            type: Sequelize.DATE,
            field: 'fecha_fin_solicitud'
        },
        diagnostico: {
            type: Sequelize.STRING,
            field: 'diagnostico'
        },
        observacion: {
            type: Sequelize.STRING,
            field: 'observacion'
        },
        dias: {
            type: Sequelize.INTEGER,
            field: 'dias'
        },
        eliminado:{
            type: Sequelize.BOOLEAN,
            field: 'eliminado'
        },
        primera_baja:{
            type: Sequelize.BOOLEAN,
            field: 'primera_baja'
        },
        horas: {
            type: Sequelize.TIME,
            field: 'horas'
        },
        planilla:{
            type: Sequelize.BOOLEAN,
            field: 'planilla'
        },
        id_estado:{
            type: Sequelize.INTEGER,
            field: 'estado'
        },
        id_vehiculo:{
            type: Sequelize.INTEGER,
            field: 'vehiculo'
        },
        usar_vehiculo:{
            type: Sequelize.BOOLEAN,
            field: 'usar_vehiculo'
        },
        id_autorizador:{
            type: Sequelize.INTEGER,
            field: 'autorizador'
        },        
        id_portero_salida:{
            type: Sequelize.INTEGER,
            field: 'portero_salida'
        },
        id_portero_retorno:{
            type: Sequelize.INTEGER,
            field: 'portero_retorno'
        },
        sin_ingreso:{
            type: Sequelize.BOOLEAN,
            field: 'sin_ingreso'
        },
        sin_retorno:{
            type: Sequelize.BOOLEAN,
            field: 'sin_retorno'
        }
    }, {
            freezeTableName: true
        });

        RrhhEmpleadoAusencia.sync().then(function () {

    });

    return RrhhEmpleadoAusencia;
}