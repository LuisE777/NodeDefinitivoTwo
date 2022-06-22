module.exports=function(sequelize,Sequelize){
	var RRHHDetallePlanillaRetoActivas = sequelize.define('agil_rrhh_detalle_planilla_retroactivas', {
		planilla: {
			type: Sequelize.INTEGER,
			field: 'planilla'
		},
		ficha: {
			type: Sequelize.INTEGER,
			field: 'ficha'
		},
		id_sueldo: {
			type: Sequelize.INTEGER,
			field: 'id_sueldo'
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
	    rc_iva:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'rc_iva'
	    },
	    importe_anticipos:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'importe_anticipos'
	    },
	    importe_prestamos:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'importe_prestamos'
	    },
	    importe_total_descuento:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'importe_total_descuento'
	    },
	    liquido_pagable:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'liquido_pagable'
		},
		horas_extras_r:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'horas_extras_r'
		},
		dias_rol_turnos:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'dias_rol_turnos'
		},
		horas_extras_rol:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'horas_extras_rol'
	    },
		entrego_tr3:{
			type: Sequelize.BOOLEAN,
			field: 'entrego_tr3',
			defaultValue:false
		},
		nt:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'nt'
		}
	}, {
	  freezeTableName: true 
	});

	RRHHDetallePlanillaRetoActivas.sync();	
	return RRHHDetallePlanillaRetoActivas;
}