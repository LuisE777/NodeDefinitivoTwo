module.exports=function(sequelize,Sequelize){
	var RRHHPlanillaIncrementos = sequelize.define('agil_rrhh_planilla_incrementos', {
		id_empresa: {
			type: Sequelize.INTEGER,
			field: 'empresa'
		},
		anio: {
			type: Sequelize.STRING,
			field: 'anio'
		},
	    importe_sueldo_basico:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'importe_sueldo_basico'
		},
		importe_incrementos: {
			type: Sequelize.DECIMAL(20,4),
			field: 'importe_incrementos'
		},
		importe_incremento_adicional: {
			type: Sequelize.DECIMAL(20,4),
			field: 'importe_incremento_adicional'
		},
	    importe_nuevo_sueldo:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'importe_nuevo_sueldo'
	    }
	}, {
	  freezeTableName: true 
	});

	RRHHPlanillaIncrementos.sync();	
	return RRHHPlanillaIncrementos;
}