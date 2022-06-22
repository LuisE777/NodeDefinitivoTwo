module.exports=function(sequelize,Sequelize){
	var RRHHPlanillaSubsidios = sequelize.define('agil_rrhh_planilla_subsidios', {
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
	    
	    total_asignaciones:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'total_asignaciones'
		},
		total_monto:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'total_monto'
		},
		total_cantidad:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'total_cantidad'
	    },
		total:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'total'
	    }

	}, {
	  freezeTableName: true 
	});

	RRHHPlanillaSubsidios.sync();	
	return RRHHPlanillaSubsidios;
}