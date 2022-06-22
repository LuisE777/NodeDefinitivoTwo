module.exports=function(sequelize,Sequelize){
	var RRHHPlanillaAguinaldos = sequelize.define('agil_rrhh_planilla_aguinaldos', {
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
		importe_horas_extras: {
			type: Sequelize.DECIMAL(20,4),
			field: 'importe_horas_extras'
		},
		importe_recargo_nocturno: {
			type: Sequelize.DECIMAL(20,4),
			field: 'importe_recargo_nocturno'
		},
	    importe_bono_antiguedad:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'importe_bono_antiguedad'
	    },
	    importe_bono_frontera:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'importe_bono_frontera'
	    },
	    importe_otros_bonos:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'importe_otros_bonos'
	    },
	    importe_total_ganado:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'importe_total_ganado'
	    },
	    
	    total_dias_trabajados:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'total_dias_trabajados'
	    },
	    importe_liquido_pagable:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'importe_liquido_pagable'
	    }
	}, {
	  freezeTableName: true 
	});

	RRHHPlanillaAguinaldos.sync();	
	return RRHHPlanillaAguinaldos;
}