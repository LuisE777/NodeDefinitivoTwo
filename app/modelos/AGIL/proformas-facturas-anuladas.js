module.exports = (sequelize, Sequelize) => {
    const ProformaFacturaAnulada = sequelize.define('agil_proforma_factura_anulada', {
        fecha_factura: {
            type: Sequelize.DATE,
            field: 'fecha_factura'
        },
        periodo_mes: {
            type: Sequelize.INTEGER,
            field: 'periodo_mes'
        },
        periodo_anio: {
            type: Sequelize.INTEGER,
            field: 'periodo_anio'
        },
        id_sucursal: {
            type: Sequelize.INTEGER,
            field: 'sucursal'
        },
        id_actividad: {
            type: Sequelize.INTEGER,
            field: 'actividad'
        },
        id_cliente: {
            type: Sequelize.INTEGER,
            field: 'cliente',
        },
        id_usuario: {
            type: Sequelize.INTEGER,
            field: 'usuario'
        },
        totalImporteBs: {
            type: Sequelize.DECIMAL(20, 4),
            field: 'monto',
            defaultValue: 0
        },
        totalImporteSus: {
            type: Sequelize.DECIMAL(20, 4),
            field: 'totalImporteSus',
            defaultValue: 0
        },
        id_empresa: {
            type: Sequelize.INTEGER,
            field: 'empresa'
        },
        factura: {
            type: Sequelize.BIGINT,
            field: 'factura'
        },
        autorizacion: {
            type: Sequelize.BIGINT,
            field: 'autorizacion'
        },
        codigo_control: {
            type: Sequelize.STRING,
            field: 'codigo_control',
            defaultValue: '0'
        },
        correlativo: {
            type: Sequelize.STRING,
            field: 'correlativo',
            defaultValue: ''
        },
        eliminado: {
            type: Sequelize.BOOLEAN,
            field: 'eliminado',
            defaultValue: false
        },
        observacion: {
            type: Sequelize.STRING,
            field: 'observacion'
        },
        proformas_anulacion: {
            type: Sequelize.STRING,
            field: 'proformas_anulacion'
        },
        factura_anulada:{
            type: Sequelize.BOOLEAN,
            field: 'factura_anulada',
            defaultValue: true
        },
        id_asiento_contabilidad:{
            type: Sequelize.INTEGER,
            field: 'asiento_contabilidad'
        }
    }, {
            freezeTableName: true
        });
        ProformaFacturaAnulada.sync().then(() => {
    });
    return ProformaFacturaAnulada;
}