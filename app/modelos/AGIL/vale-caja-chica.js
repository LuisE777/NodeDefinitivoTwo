module.exports = function (sequelize, Sequelize) {
    var ValeCajaChica = sequelize.define('agil_vale_caja_chica', {
        id_solicitud: {
            type: Sequelize.INTEGER,
            field: 'solicitud'
        },
        fecha: {
            type: Sequelize.DATE,
            field: 'fecha'
        },
        id_estado: {
            type: Sequelize.INTEGER,
            field: 'estado'
        },
        monto: {
            type: Sequelize.DECIMAL(20, 4),
            field: 'monto',
        }, 
        eliminado: {
            type: Sequelize.BOOLEAN,
            field: 'eliminado',
            default: false
        },
        numero_correlativo: {
			type: Sequelize.INTEGER,
			field: 'numero_correlativo'
        }
    }, {
            freezeTableName: true
        });
    ValeCajaChica.sync().then(function () {
    });
    return ValeCajaChica;
}