module.exports=function(sequelize,Sequelize){
	var RRHHParametros = sequelize.define('agil_rrhh_parametros', {
		id_empresa: {
			type: Sequelize.INTEGER,
			field: 'empresa'
		  },
		salario_minimo: {
			type: Sequelize.DECIMAL(20,4),
			field: 'salario_minimo'
		},
		salario_rciva: {
			type: Sequelize.DECIMAL(20,4),
			field: 'salario-rciva'
		},
		porcentage_iva: {
			type: Sequelize.DECIMAL(20,4),
			field: 'porcentage_iva'
		},
	    decreto_supremo:{
	        type: Sequelize.STRING,
			field: 'decreto_supremo'
	    },
	    seguro_salud:{
	        type: Sequelize.STRING,
			field: 'seguro_salud'
	    },
	    aporte_serguro_salud: {
			type: Sequelize.DECIMAL(20,4),
			field: 'aporte_serguro_salud'
		},
		numero_patronal:{
	        type: Sequelize.STRING,
			field: 'numero_patronal'
	    },
	    pension_vejez: {
			type: Sequelize.DECIMAL(20,4),
			field: 'pension_vejez'
		},
		riesgo_comun: {
			type: Sequelize.DECIMAL(20,4),
			field: 'riesgo_comun'
		},
		comision: {
			type: Sequelize.DECIMAL(20,4),
			field: 'comision'
		},
		aporte_solidario_laboral: {
			type: Sequelize.DECIMAL(20,4),
			field: 'aporte_solidario_laboral'
		},
		riesgo_profesional: {
			type: Sequelize.DECIMAL(20,4),
			field: 'riesgo_profesional'
		},
		aporte_solidario_patronal: {
			type: Sequelize.DECIMAL(20,4),
			field: 'aporte_solidario_patronal'
		},
		rango_primero_inicio_solidario: {
			type: Sequelize.DECIMAL(20,4),
			field: 'rango_primero_inicio_solidario'
		},
		rango_primero_fin_solidario: {
			type: Sequelize.DECIMAL(20,4),
			field: 'rango_primero_fin_solidario'
		},
		rango_segundo_inicio_solidario: {
			type: Sequelize.DECIMAL(20,4),
			field: 'rango_segundo_inicio_solidario'
		},
		rango_segundo_fin_solidario: {
			type: Sequelize.DECIMAL(20,4),
			field: 'rango_segundo_fin_solidario'
		},
		rango_tercero_inicio_solidario: {
			type: Sequelize.DECIMAL(20,4),
			field: 'rango_tercero_inicio_solidario'
		},
		rango_tercero_fin_solidario: {
			type: Sequelize.DECIMAL(20,4),
			field: 'rango_tercero_fin_solidario'
		},
		salario_base_antiguedad: {
			type: Sequelize.DECIMAL(20,4),
			field: 'salario_base_antiguedad'
		},
		antiguedad_cero_uno: {
			type: Sequelize.DECIMAL(20,4),
			field: 'antiguedad_cero_uno'
		},
		antiguedad_dos_cuatro: {
			type: Sequelize.DECIMAL(20,4),
			field: 'antiguedad_dos_cuatro'
		},
		antiguedad_cinco_siete: {
			type: Sequelize.DECIMAL(20,4),
			field: 'antiguedad_cinco_siete'
		},
		antiguedad_ocho_diez: {
			type: Sequelize.DECIMAL(20,4),
			field: 'antiguedad_ocho_diez'
		},
		antiguedad_once_catorce: {
			type: Sequelize.DECIMAL(20,4),
			field: 'antiguedad_once_catorce'
		},
		antiguedad_quice_diecinueve: {
			type: Sequelize.DECIMAL(20,4),
			field: 'antiguedad_quice_diecinueve'
		},
		antiguedad_veinte_veinticuatro: {
			type: Sequelize.DECIMAL(20,4),
			field: 'antiguedad_veinte_veinticuatro'
		},
		antiguedad_mas_veinticinco: {
			type: Sequelize.DECIMAL(20,4),
			field: 'antiguedad_mas_veinticinco'
		},
		pro_vivienda_patronal: {
			type: Sequelize.DECIMAL(20,4),
			field: 'pro_vivienda_patronal'
		},
		solo_jubilados_mayor_65: {
			type: Sequelize.DECIMAL(20,4),
			field: 'solo_jubilados_mayor_65'
		},
		frontera_monto:{
			type: Sequelize.DECIMAL(20,4),
			field: 'frontera_monto'
		},
		frontera_porcentaje: {
            type: Sequelize.BOOLEAN,
            field: 'frontera_porcentaje'
		},
		hbd_monto:{
			type: Sequelize.DECIMAL(20,4),
			field: 'hbd_monto'
		},
		hbd_porcentaje: {
            type: Sequelize.BOOLEAN,
            field: 'hbd_porcentaje'
		},
		indemnizaciones:{
			type: Sequelize.DECIMAL(20,4),
			field: 'indemnizaciones'
		},
		aguinaldos:{
			type: Sequelize.DECIMAL(20,4),
			field: 'aguinaldos'
		},
		numero_empleador:{
	        type: Sequelize.STRING,
			field: 'numero_empleador'
		},
		factor_calculo_dias:{
	        type: Sequelize.INTEGER,
			field: 'factor_calculo_dias'
		},
		resolucion_ministerio:{
	        type: Sequelize.STRING,
			field: 'resolucion_ministerio'
		},
		dias_min_trabajos:{
			type: Sequelize.DECIMAL(20,4),
			field: 'dias_min_trabajos'
		},
		id_metodo_dias:{
	        type: Sequelize.INTEGER,
			field: 'id_metodo_dias'
		},
		solo_jubilados_menor_65: {
			type: Sequelize.DECIMAL(20,4),
			field: 'solo_jubilados_menor_65'
		}
	}, {
	  freezeTableName: true 
	});

	RRHHParametros.sync();	
	return RRHHParametros;
}