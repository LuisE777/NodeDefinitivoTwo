module.exports=function(sequelize,Sequelize){
	var UsuarioAlerta = sequelize.define('sys_usuario_alerta', {
	  id_usuario: {
		type: Sequelize.INTEGER ,
		field: 'usuario'
	  },
	  usar_vencimiento_producto: {
		type: Sequelize.BOOLEAN ,
		field: 'usar_vencimiento_producto'
	  },
	  usar_vencimiento_credito: {
		type: Sequelize.BOOLEAN ,
		field: 'usar_vencimiento_credito'
	  },
	  usar_vencimiento_deuda: {
		type: Sequelize.BOOLEAN ,
		field: 'usar_vencimiento_deuda'
	  },
	  usar_pedido: {
		type: Sequelize.BOOLEAN ,
		field: 'usar_pedido'
	  },
	  usar_venta: {
		type: Sequelize.BOOLEAN ,
		field: 'usar_venta'
	  },
	  usar_proforma: {
		type: Sequelize.BOOLEAN ,
		field: 'usar_proforma'
	  },
	  usar_compra: {
		type: Sequelize.BOOLEAN ,
		field: 'usar_compra'
	  },
	  usar_banco_caja: {
		type: Sequelize.BOOLEAN ,
		field: 'usar_banco_caja'
	  },
	  usar_otros: {
		type: Sequelize.BOOLEAN ,
		field: 'usar_otros'
	  },
	  usar_preventivo: {
		type: Sequelize.BOOLEAN ,
		field: 'usar_preventivo',
	  },
	  usar_correctivo: {
		type: Sequelize.BOOLEAN ,
		field: 'usar_correctivo'
	  },
	  usar_rutina: {
		type: Sequelize.BOOLEAN ,
		field: 'usar_rutina'
	  },
	  usar_verificacion_caja_chica: {
		type: Sequelize.BOOLEAN ,
		field: 'usar_verificacion_caja_chica'
		},
		usar_cierre_caja_chica: {
			type: Sequelize.BOOLEAN ,
			field: 'usar_cierre_caja_chica'
			},
			usar_fondo_a_rendir: {
			type: Sequelize.BOOLEAN ,
			field: 'usar_fondo_a_rendir'
			}
	}, {
	  freezeTableName: true 
	});
	
	UsuarioAlerta.sync().then(function(){
		
	});
	
	return UsuarioAlerta;
}