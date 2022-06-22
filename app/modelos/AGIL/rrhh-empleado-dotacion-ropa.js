
module.exports = function (sequelize, Sequelize) {
    var RrhhEmpleadoDotacionRopa = sequelize.define('agil_rrhh_empleado_dotacion_ropa', {
        fecha : {
            type: Sequelize.DATE,
            field: 'fecha'
        },   
        fecha_vencimiento : {
            type: Sequelize.DATE,
            field: 'fecha_vencimiento'
        },       
        id_cumplimiento : {
            type: Sequelize.INTEGER,
            field: 'cumplimiento'
        },
        id_comprobante : {
            type: Sequelize.INTEGER,
            field: 'comprobante'
        },
        id_ficha : {
            type: Sequelize.INTEGER,
            field: 'ficha'
        },
        numero_iso_dotacion_ropa: {
            type: Sequelize.INTEGER,
            field: 'numero_iso_dotacion_ropa'
        },
        id_periodo: {
            type: Sequelize.INTEGER,
            field: 'periodo'
        },
        id_estado: {
            type: Sequelize.INTEGER,
            field: 'estado'
        },
        id_empleado: {
            type: Sequelize.INTEGER,
            field: 'empleado'
        },
        id_usuario: {
            type: Sequelize.INTEGER,
            field: 'usuario'
        },
        id_sucursal: {
            type: Sequelize.INTEGER,
            field: 'sucursal'
        },
        id_almacen: {
            type: Sequelize.INTEGER,
            field: 'almacen'
        },
        observacion: {
            type: Sequelize.STRING,
            field: 'observacion'
        },        
        numero: {
            type: Sequelize.INTEGER,
            field: 'numero'
        },
        eliminado:{
            type: Sequelize.BOOLEAN,
            field: 'eliminado'
        },
        config_doc_iso: {
			type:Sequelize.INTEGER,
			field: 'config_doc_iso',
			defaultValue: null
		}
    }, {
            freezeTableName: true
        });

        RrhhEmpleadoDotacionRopa.sync().then(function () {

    });

    return RrhhEmpleadoDotacionRopa;
}