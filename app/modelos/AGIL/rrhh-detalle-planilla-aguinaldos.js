module.exports=function(sequelize,Sequelize){
	var RRHHDetallePlanillaAguinaldos = sequelize.define('agil_rrhh_detalle_planilla_aguinaldos', {
		planilla: {
			type: Sequelize.INTEGER,
			field: 'planilla'
		},
		ficha: {
			type: Sequelize.INTEGER,
			field: 'ficha'
		},
		promedio_basico:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'promedio_basico'
		},
		prom_horas_extras:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'prom_horas_extras'
	    },
		prom_recargo_nocturno: {
			type: Sequelize.DECIMAL(20,4),
			field: 'prom_recargo_nocturno'
		},
		prom_bono_antiguedad: {
			type: Sequelize.DECIMAL(20,4),
			field: 'prom_bono_antiguedad'
		},
		prom_bono_frontera: {
			type: Sequelize.DECIMAL(20,4),
			field: 'prom_bono_frontera'
		},
	    prom_otros_bonos:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'prom_otros_bonos'
	    },
	    prom_total_ganado:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'prom_total_ganado'
	    },
	    dias_trabajados:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'dias_trabajados'
	    },
	    liquido_pagable:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'total_ganado'
		},
		id_asiento_contabilidad: {
			type: Sequelize.INTEGER,
			field: 'asiento_contabilidad'
		},
	}, {
	  freezeTableName: true 
	});

	RRHHDetallePlanillaAguinaldos.sync();	
	return RRHHDetallePlanillaAguinaldos;
}