module.exports = function (sequelize, Sequelize) {
	var RrhhEmpleadoBeneficioSocial = sequelize.define('agil_rrhh_empleado_beneficio_social', {
		id_ficha: {
			type: Sequelize.INTEGER,
			field: 'ficha'
		},
		id_motivo: {
			type: Sequelize.INTEGER,
			field: 'motivo'
		},
		fecha_elaboracion: {
			type: Sequelize.DATE,
			field: 'fecha_elaboracion'
		},
		fecha_asistensia: {
			type: Sequelize.DATE,
			field: 'fecha_asistensia'
		},
		fecha_ingreso: {
			type: Sequelize.DATE,
			field: 'fecha_ingreso'
		},
		fecha_retiro: {
			type: Sequelize.DATE,
			field: 'fecha_retiro'
		},
		primer_mes: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'primer_mes'
		},
		usar_primer_mes: {
			type: Sequelize.BOOLEAN,
			field: 'usar_primer_mes'
		},
		segundo_mes: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'segundo_mes'
		},
		usar_segundo_mes: {
			type: Sequelize.BOOLEAN,
			field: 'usar_segundo_mes'
		},
		tercer_mes: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'tercer_mes'
		},
		mes_uno: {
			type: Sequelize.INTEGER,
			field: 'mes_uno'
		},
		mes_dos: {
			type: Sequelize.INTEGER,
			field: 'mes_dos'
		},
		mes_tres: {
			type: Sequelize.INTEGER,
			field: 'mes_tres'
		},
		promedio: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'promedio'
		},
		numero_quinquenio: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'numero_quinquenio'
		},
		quinquenio_adelantado: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'quinquenio_adelantado'
		},
		total_quinquenio: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'total_quinquenio'
		},
		tipo_beneficio: {
			type: Sequelize.BOOLEAN,
			field: 'tipo_beneficio'
		},
		desahucio: {
			type: Sequelize.BOOLEAN,
			field: 'desahucio'
		},
		total_ingresos: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'total_ingresos'
		},
		total_deducciones: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'total_deducciones'
		},
		eliminado: {
			type: Sequelize.BOOLEAN,
			field: 'eliminado'
		},
		id_cuenta_banco: {
			type: Sequelize.INTEGER,
			field: 'cuenta_banco'
		},
		empleado_cargo_impresion: {
			type: Sequelize.STRING,
			field: 'empleado_cargo_impresion'
		},
		cargo_imprecion: {
			type: Sequelize.STRING,
			field: 'cargo_imprecion'
		},
		cargo: {
			type:Sequelize.STRING,
			field: 'cargo'
		},
		anios_servicio: {
			type:Sequelize.INTEGER,
			field: 'anios_servicio'
		},
		meses_servicio: {
			type:Sequelize.INTEGER,
			field: 'meses_servicio'
		},
		dias_servicio: {
			type:Sequelize.INTEGER,
			field: 'dias_servicio'
		},
		anios_importe: {
			type:Sequelize.DECIMAL(20, 4),
			field: 'anios_importe'
		},
		meses_importe: {
			type:Sequelize.DECIMAL(20, 4),
			field: 'meses_importe'
		},
		dias_importe: {
			type:Sequelize.DECIMAL(20, 4),
			field: 'dias_importe'
		},
		meses_navidad: {
			type:Sequelize.INTEGER,
			field: 'meses_navidad'
		},
		dias_navidad: {
			type:Sequelize.INTEGER,
			field: 'dias_navidad'
		},
		navidad_importe: {
			type:Sequelize.DECIMAL(20, 4),
			field: 'navidad_importe'
		},
		mes_prima: {
			type:Sequelize.INTEGER,
			field: 'mes_prima'
		},
		dias_prima: {
			type:Sequelize.INTEGER,
			field: 'dias_prima'
		},
		importe_prima: {
			type:Sequelize.DECIMAL(20, 4),
			field: 'importe_prima'
		},
		mes_vacacion: {
			type:Sequelize.INTEGER,
			field: 'mes_vacacion'
		},
		dias_vacacion: {
			type:Sequelize.INTEGER,
			field: 'dias_vacacion'
		},
		importe_vacacion: {
			type:Sequelize.DECIMAL(20, 4),
			field: 'importe_vacacion'
		},
	}, {
			freezeTableName: true
		});

	RrhhEmpleadoBeneficioSocial.sync().then(function () {

	});

	return RrhhEmpleadoBeneficioSocial;
}