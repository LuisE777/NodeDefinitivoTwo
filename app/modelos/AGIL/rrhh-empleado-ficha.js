module.exports = function (sequelize, Sequelize) {
	var RrhhEmpleadoFicha = sequelize.define('agil_rrhh_empleado_ficha', {
		id_empleado: {
			type: Sequelize.INTEGER,
			field: 'id_empleado'
		},
		fecha: {
			type: Sequelize.DATE,
			field: 'fecha'
		},
		fecha_expiracion: {
			type: Sequelize.DATE,
			field: 'fecha_expiracion'
		},
		codigo_empleado: {
			type: Sequelize.STRING,
			field: 'codigo_empleado'
		},
		id_tipo_contrato: {
			type: Sequelize.INTEGER,
			field: 'tipo_contrato'
		},
		fecha_inicio: {
			type: Sequelize.DATE,
			field: 'fecha_inicio'
		},
		fecha_fin: {
			type: Sequelize.DATE,
			field: 'fecha_fin'
		},
		id_tipo_personal: {
			type: Sequelize.INTEGER,
			field: 'tipo_personal'
		},
		id_carga_horarios: {
			type: Sequelize.INTEGER,
			field: 'carga_horarios'
		},
		id_area: {
			type: Sequelize.INTEGER,
			field: 'area'
		},
		id_ubicacion: {
			type: Sequelize.INTEGER,
			field: 'ubicacion'
		},
		haber_basico: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'haber_basico'
		},
		haber_basico_literal: {
			type: Sequelize.STRING,
			field: 'haber_basico_literal'
		},
		contrato: {
			type: Sequelize.STRING,
			field: 'contrato'
		},
		jubilacion: {
			type: Sequelize.BOOLEAN,
			field: 'jubilacion'
		},
		fecha_jubilacion: {
			type: Sequelize.DATE,
			field: 'fecha_jubilacion'
		},
		id_persona_referencia: {
			type: Sequelize.INTEGER,
			field: 'persona_referencia'
		},
		matricula_seguro: {
			type: Sequelize.STRING,
			field: 'matricula_seguro'
		},
		id_seguro_salud: {
			type: Sequelize.INTEGER,
			field: 'seguro_salud'
		},
		codigo_tributario: {
			type: Sequelize.STRING,
			field: 'codigo_tributario'
		},
		id_lugar_seguro_salud: {
			type: Sequelize.INTEGER,
			field: 'lugar_seguro_salud'
		},
		seguro_salud_carnet: {
			type: Sequelize.BOOLEAN,
			field: 'seguro_salud_carnet'
		},
		nua_seguro_largo_plazo: {
			type: Sequelize.STRING,
			field: 'nua_seguro_largo_plazo'
		},
		id_aporte_seguro_largo_plazo: {
			type: Sequelize.INTEGER,
			field: 'aporte_seguro_largo_plazo'
		},
		id_lugar_seguro_largo_plazo: {
			type: Sequelize.INTEGER,
			field: 'lugar_seguro_largo_plazo'
		},
		numero_cuenta: {
			type: Sequelize.STRING,
			field: 'numero_cuenta'
		},
		id_banco: {
			type: Sequelize.INTEGER,
			field: 'banco'
		},
		detalle_discapacidades: {
			type: Sequelize.STRING,
			field: 'detalle_discapacidades'
		},
		discapacidad: {
			type: Sequelize.BOOLEAN,
			field: 'discapacidad'
		},
		id_caracteristica_discapacidad: {
			type: Sequelize.INTEGER,
			field: 'caracteristica_discapacidad'
		},
		vencimiento_carnet_discapacidad: {
			type: Sequelize.DATE,
			field: 'vencimiento_carnet_discapacidad'
		},
		horas_extra:{
			type: Sequelize.BOOLEAN,
			field: 'horas_extra'
		},
		activo:{
			type: Sequelize.BOOLEAN,
			field: 'activo'
		},
		encargado_area:{
			type: Sequelize.BOOLEAN,
			field: 'encargado_area'
		},
		total_ganado_fijo: {
			type: Sequelize.BOOLEAN,
			field: 'total_ganado_fijo'
		},
		monto_total_ganado: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'monto_total_ganado'
		},
		bono_dias: {
			type: Sequelize.BOOLEAN,
			field: 'bono_dias'
		},
		costo_campo: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'costo_campo'
		},
		costo_descanso: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'costo_descanso'
		},
		horas_extra_dia_campo: {
			type: Sequelize.BOOLEAN,
			field: 'horas_extra_dia_campo'
		},
		horas_campo: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'horas_campo'
		},
		observacion: {
			type: Sequelize.STRING,
			field: 'observacion'
		},
		id_campo: {
			type: Sequelize.INTEGER,
			field: 'id_campo',
			defaultValue: null
		}
	}, {
			freezeTableName: true
		});

	RrhhEmpleadoFicha.sync().then(function () {

	});

	return RrhhEmpleadoFicha;
}