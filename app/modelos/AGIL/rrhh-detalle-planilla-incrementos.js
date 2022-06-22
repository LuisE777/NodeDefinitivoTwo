module.exports=function(sequelize,Sequelize){
	var RRHHDetallePlanillaIncrementos = sequelize.define('agil_rrhh_detalle_planilla_incrementos', {
		planilla: {
			type: Sequelize.INTEGER,
			field: 'planilla'
		},
		ficha: {
			type: Sequelize.INTEGER,
			field: 'ficha'
		},
		sueldo_basico:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'sueldo_basico'
		},
		incremento_salarial:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'incremento_salarial'
	    },
		incremento_adicional: {
			type: Sequelize.DECIMAL(20,4),
			field: 'incremento_adicional'
		},
		nuevo_sueldo: {
			type: Sequelize.DECIMAL(20,4),
			field: 'nuevo_sueldo'
		},
		sueldo_basico_ficha:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'sueldo_basico_ficha'
		}
	}, {
	  freezeTableName: true 
	});

	RRHHDetallePlanillaIncrementos.sync();	
	return RRHHDetallePlanillaIncrementos;
}