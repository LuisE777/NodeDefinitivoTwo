module.exports = function (sequelize, Sequelize) {
    var MantenimientoOrdenTrabajo = sequelize.define('agil_mantenimiento_orden_trabajo', {
        id_producto: {
            type: Sequelize.INTEGER,
            field: 'producto'
        },
        observacion: {
            type: Sequelize.STRING,
            field: 'observacion'
        },
        diagnostico: {
            type: Sequelize.STRING,
            field: 'diagnostico'
        },
        id_prioridad: {
            type: Sequelize.INTEGER,
            field: 'prioridad'
        },
        tiempo_estimado: {
            type: Sequelize.STRING,
            field: 'tiempo_estimado'
        },
        fecha_hora_aviso: {
            type: Sequelize.DATE,
            field: 'fecha_hora_aviso'
        },
        fecha_hora_inicio: {
            type: Sequelize.DATE,
            field: 'fecha_hora_inicio'
        },
          fecha_hora_fin: {
            type: Sequelize.DATE,
            field: 'fecha_hora_fin'
        },
        id_tipo_mantenimiento: {
            type: Sequelize.INTEGER,
            field: 'tipo_mantenimiento'
        },
        id_usuario: {
            type: Sequelize.INTEGER,
            field: 'usuario'
        },
        correlativo_ot: {
            type: Sequelize.INTEGER,
            field: 'correlativo_ot'
        },
        id_sucursal: {
            type: Sequelize.INTEGER,
            field: 'sucursal'
        },
        id_vehiculo: {
            type: Sequelize.INTEGER,
            field: 'id_vehiculo'
        },
        id_cliente:{
            type: Sequelize.INTEGER,
            field: 'id_cliente'
        },
        mantenimiento_externo:{
            type: Sequelize.BOOLEAN,
            field: 'mantenimiento_externo' 
        },
        id_estado:{
            type: Sequelize.INTEGER,
            field: 'estado'  
        },
        importe_facturado:{
            type: Sequelize.DECIMAL(20,4),
            field: 'importe_facturado'  
        },
        asignarATodos:{
            type: Sequelize.BOOLEAN,
            field: 'asignar_todos' 
        },
        porcentaje:{
            type: Sequelize.BOOLEAN,
            field: 'porcentaje'  
        },
        montoPorcentajeDeseado:{
            type: Sequelize.DECIMAL(20,4),
            field: 'monto_porcentaje'  
        },
        km: {
            type: Sequelize.STRING,
            field: 'km'
        },
        descuento: {
            type: Sequelize.DECIMAL(20,4),
            field: 'descuento'
        },
        observacion_descuento: {
            type: Sequelize.STRING,
            field: 'observacion_descuento'
        },
        tipo_pago:{
            type: Sequelize.INTEGER,
            field: 'tipo_pago'  
        },
        dias_credito:{
            type: Sequelize.INTEGER,
            field: 'dias_credito'  
        },
        a_cuenta: {
            type: Sequelize.DECIMAL(20,4),
            field: 'a_cuenta'
        },
        saldo: {
            type: Sequelize.DECIMAL(20,4),
            field: 'saldo'
        },
        numero_manual: {
            type: Sequelize.INTEGER,
            field: 'numero_manual'
        },
        id_comprobante: {
            type: Sequelize.INTEGER,
            field: 'comprobante'
        },
        id_campo:{
            type: Sequelize.INTEGER,
            field: 'campo'
        }
    }, {
            freezeTableName: true
        });

    MantenimientoOrdenTrabajo.sync().then(function () {

    });

    return MantenimientoOrdenTrabajo;
}