module.exports = function (sequelize, Sequelize) {
	var EvaluacionProveedorGeneral = sequelize.define('agil_evaluacion_proveedor_general', {
		id_usuario: {
			type: Sequelize.INTEGER,
			field: 'proveedor'
		},
		tipo_proveedor:{
			type: Sequelize.STRING,
			field: 'tipo_proveedor'
		},
		fecha:{
			type: Sequelize.DATE,
			field: 'fecha'
		},
		eliminado: {
			type: Sequelize.BOOLEAN,
			field: 'eliminado',
			defaultValue: false
			},
	}, {
			freezeTableName: true
		});

	EvaluacionProveedorGeneral.sync();

	return EvaluacionProveedorGeneral;
}