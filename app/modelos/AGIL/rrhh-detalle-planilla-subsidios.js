module.exports=function(sequelize,Sequelize){
	var RRHHDetallePlanillaSubsidios = sequelize.define('agil_rrhh_detalle_planilla_subsidios', {
		planilla: {
			type: Sequelize.INTEGER,
			field: 'planilla'
        },
        planificacion: {
			type: Sequelize.INTEGER,
			field: 'planificacion'
		},
		monto:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'monto'
		},
		total:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'total'
		}
	}, {
	  freezeTableName: true 
	});

	RRHHDetallePlanillaSubsidios.sync();	
	return RRHHDetallePlanillaSubsidios;
}