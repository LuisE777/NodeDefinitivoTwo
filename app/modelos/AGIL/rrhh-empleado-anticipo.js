
module.exports = function (sequelize, Sequelize) {
	var RrhhAnticipo = sequelize.define('agil_rrhh_empleado_anticipo', {
		id_empleado: {
			type: Sequelize.INTEGER,
			field: 'empleado'
		},
		id_ficha: {
			type: Sequelize.INTEGER,
			field: 'ficha'
		},
		fecha: {
			type: Sequelize.DATE,
			field: 'fecha'
		},
		monto: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'monto'
		},
		id_tipo: {
			type: Sequelize.INTEGER,
			field: 'tipo'
		},
		total: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'total'
		},
		eliminado: {
			type: Sequelize.BOOLEAN,
			field: 'eliminado'
		},
		entregado: {
			type: Sequelize.BOOLEAN,
			field: 'entregado',
			defaultValue: false
		},
		tope: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'tope'
		},
		salario_basico: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'salario_basico'
		},
		tipo_porcentual: {
			type: Sequelize.BOOLEAN,
			field: 'tipo_porcentual'
		},
		porcentaje: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'porcentaje'
		},
		id_caja_chica: {
			type: Sequelize.INTEGER,
			field: 'caja_chica'
		},
		detalle: {
			type: Sequelize.STRING,
			field: 'detalle'
		},
		promedio_total_ganado: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'promedio_total_ganado'
		},
		matriz_reutilizable:{
			type: Sequelize.BOOLEAN,
			field: 'matriz_reutilizable',
			defaultValue: false
		},
		id_asiento_contabilidad:{
			type: Sequelize.INTEGER,
			field: 'asiento_contabilidad',
		}
	}, {
		freezeTableName: true
	});

	RrhhAnticipo.sync().then(function () {

	});

	return RrhhAnticipo;
}