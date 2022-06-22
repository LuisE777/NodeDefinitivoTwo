module.exports = function (sequelize, Sequelize) {
    var ConfiguracionIso = sequelize.define('agil_configuracion_iso', {
        id_sucursal: {
            type: Sequelize.INTEGER,
            field: 'sucursal'
        },
        id_tipo_documento: {
            type: Sequelize.INTEGER,
            field: 'tipo_documento'
        },
        nombre: {
            type: Sequelize.STRING,
            field: 'nombre'
        },
        revicion: {
            type: Sequelize.STRING,
            field: 'revicion'
        },
        codigo: {
            type: Sequelize.STRING,
            field: 'codigo'
        },
        fecha_aprobacion: {
            type: Sequelize.DATE,
            field: 'fecha_aprobacion'
        },
        eliminado:{
            type: Sequelize.BOOLEAN,
            field: 'eliminado'
        },
        activo:{
            type: Sequelize.BOOLEAN,
            field: 'activo'
        },
        predefinido:{
            type: Sequelize.BOOLEAN,
            field: 'predefinido'
        },
        version_impresion: {
			type: Sequelize.INTEGER,
			field: 'version_impresion'
		},
    }, {
        freezeTableName: true
    });
    ConfiguracionIso.sync().then(function () {
    });
    return ConfiguracionIso;
}