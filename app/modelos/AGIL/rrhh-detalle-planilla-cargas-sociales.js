module.exports=function(sequelize,Sequelize){
	var RRHHDetallePlanillaCargasSociales = sequelize.define('agil_rrhh_detalle_planilla_cargas_sociales', {
		planilla: {
			type: Sequelize.INTEGER,
			field: 'planilla'
		},
		ficha: {
			type: Sequelize.INTEGER,
			field: 'ficha'
		},
		importe_sueldo_basico:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'importe_sueldo_basico'
		},
		dt:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'dt'
		},
		ganado:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'ganado'
	    },
		horas_extras: {
			type: Sequelize.DECIMAL(20,4),
			field: 'horas_extras'
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
	    total_ganado:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'total_ganado'
	    },
	    afp:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'afp'
	    },
	    sol:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'sol'
	    },
	    pro_v:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'pro_v'
	    },
	    cns:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'cns'
		},
		prev_indemnizacion:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'prev_indemnizacion'
		},
		prov_aguinaldo:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'prov_aguinaldo'
	    }

	}, {
	  freezeTableName: true 
	});

	RRHHDetallePlanillaCargasSociales.sync();	
	return RRHHDetallePlanillaCargasSociales;
}