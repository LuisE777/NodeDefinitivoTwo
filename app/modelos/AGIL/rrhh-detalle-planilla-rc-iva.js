module.exports=function(sequelize,Sequelize){
	var RRHHDetallePlanillaRcIva = sequelize.define('agil_rrhh_detalle_planilla_rc_iva', {
		planilla: {
			type: Sequelize.INTEGER,
			field: 'planilla'
		},
		ficha: {
			type: Sequelize.INTEGER,
			field: 'ficha'
		},
		neto_imponible:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'neto_imponible'
	    },
	    dos_smn:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'dos_smn'
	    },
	    diferencia:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'diferencia'
	    },
	    rc_iva:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'rc_iva'
	    },
	    dos_smn13:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'dos_smn13'
	    },
	    f110:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'f110'
	    },
	    rc_iva_fisico:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'rc_iva_fisico'
	    },
	    saldo_dependiente:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'saldo_dependiente'
	    },
	    saldo_anterior:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'saldo_anterior'
	    },
	    actualizacion:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'actualizacion'
	    },
	    saldo_actualizado:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'saldo_actualizado'
	    },
	    saldo_total:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'saldo_total'
	    },
	    saldo_utilizado:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'saldo_utilizado'
	    },
	    rc_iva_mes:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'rc_iva_mes'
	    },
	    nuevo_saldo:{
	        type: Sequelize.DECIMAL(20,4),
			field: 'nuevo_saldo'
		},
		saldo_fisco:{
			type: Sequelize.DECIMAL(20,4),
			field: 'saldo_fisco'
		},
		otros_ingresos:{
			type: Sequelize.DECIMAL(20,4),
			field: 'otros_ingresos'
		},
		monto_ingresos_netos:{
			type: Sequelize.DECIMAL(20,4),
			field: 'monto_ingresos_netos'
		},
		saldo_anterior_arrastrado:{
			type: Sequelize.DECIMAL(20,4),
			field: 'saldo_anterior_arrastrado'
		},
		otra_empresa: {
			type: Sequelize.STRING,
			field: 'otra_empresa'
		},
		observaciones: {
			type: Sequelize.STRING,
			field: 'observaciones'
		},
		nuevo_empleado: {
			type: Sequelize.BOOLEAN,
			field: 'nuevo_empleado',
			defaultValue: false
		},
		f110_monto_declarado:{
			type: Sequelize.DECIMAL(20,4),
			field: 'f110_monto_declarado',
			defaultValue: 0
		},
		f110_munero_facturas:{
			type: Sequelize.INTEGER,
			field: 'f110_munero_facturas',
			defaultValue: 0
		}

	}, {
	  freezeTableName: true 
	});

	RRHHDetallePlanillaRcIva.sync();	
	return RRHHDetallePlanillaRcIva;
}