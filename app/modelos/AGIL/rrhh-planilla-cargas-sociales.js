module.exports = function (sequelize, Sequelize) {
	var RRHHPlanillaCargasSociales = sequelize.define('agil_rrhh_planilla_cargas_sociales', {
		id_empresa: {
			type: Sequelize.INTEGER,
			field: 'empresa'
		},
		mes: {
			type: Sequelize.STRING,
			field: 'mes'
		},
		anio: {
			type: Sequelize.STRING,
			field: 'anio'
		},
		total_empleados: {
			type: Sequelize.INTEGER,
			field: 'total_empleados'
		},
		total: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'total'
		},
		importe_sueldo_basico: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'importe_sueldo_basico'
		},
		importe_ganado: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'importe_ganado'
		},
		total_horas_extras: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'total_horas_extras'
		},
		importe_horas_extras: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'importe_horas_extras'
		},
		importe_recargo_nocturno: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'importe_recargo_nocturno'
		},
		importe_bono_antiguedad: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'importe_bono_antiguedad'
		},
		importe_bono_frontera: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'importe_bono_frontera'
		},
		importe_otros_bonos: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'importe_otros_bonos'
		},
		importe_total_ganado: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'importe_total_ganado'
		},

		importe_afp: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'importe_afp'
		},

		importe_sol: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'importe_sol'
		},
		importe_pro_v: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'importe_pro_v'
		},
		importe_cns: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'importe_cns'
		},
		importe_prev_indemnizacion: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'importe_prev_indemnizacion'
		},
		importe_prov_aguinaldo: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'importe_prov_aguinaldo'
		},
		id_comprobante: {
			type: Sequelize.INTEGER,
			field: 'comprobante'
		}
	}, {
		freezeTableName: true
	});

	RRHHPlanillaCargasSociales.sync();
	return RRHHPlanillaCargasSociales;
}