
module.exports = function (sequelize, Sequelize) {
    var RrhhEmpleadoDocumentoFamiliar = sequelize.define('agil_rrhh_empleado_documento_familiar', {
        id_familiar: {
            type: Sequelize.INTEGER,
            field: 'familiar'
        },
        nombre: {
            type: Sequelize.STRING,
            field: 'nombre'
        },
        fecha: {
            type: Sequelize.DATE,
            field: 'fecha'
        },
        eliminado: {
            type: Sequelize.BOOLEAN,
            field: 'eliminado'
        },
        aceptado:{
            type: Sequelize.BOOLEAN,
            field: 'aceptado'
        }
    }, {
            freezeTableName: true
        });

    RrhhEmpleadoDocumentoFamiliar.sync().then(function () {

    });

    return RrhhEmpleadoDocumentoFamiliar;
}