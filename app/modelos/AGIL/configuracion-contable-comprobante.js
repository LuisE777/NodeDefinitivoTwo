module.exports = function (sequelize, Sequelize) {
	var ConfiguracionContableComprobante = sequelize.define('agil_configuracion_contable_comprobante', {
		id_integracion: {
			type: Sequelize.INTEGER,
			field: 'integracion'
		},
		id_sucursal: {
			type: Sequelize.INTEGER,
			field: 'sucursal'
		},
		id_tipo_comprobante: {
			type: Sequelize.INTEGER,
			field: 'tipo_comprobante'
		},
		glosa_general: {
			type: Sequelize.TEXT("long"),
			field: 'glosa_general'
		},
		usar_auxiliar: {
			type: Sequelize.BOOLEAN,
			field: 'usar_auxiliar'
		},
		usar_centro_costo: {
			type: Sequelize.BOOLEAN,
			field: 'usar_centro_costo'
        },
        id_contra_cuenta_debe: {
			type: Sequelize.INTEGER,
			field: 'contra_cuenta_debe'
		},
		glosa_debe: {
			type: Sequelize.TEXT("long"),
			field: 'glosa_debe'
		},
        id_contra_cuenta_haber: {
			type: Sequelize.INTEGER,
			field: 'contra_cuenta_haber'
		},
		glosa_haber: {
			type: Sequelize.TEXT("long"),
			field: 'glosa_haber'
		},
		eliminado:{
			type: Sequelize.BOOLEAN,
			field: 'eliminado'
		}
	}, {
			freezeTableName: true
		});
	ConfiguracionContableComprobante.sync();
	return ConfiguracionContableComprobante;
}