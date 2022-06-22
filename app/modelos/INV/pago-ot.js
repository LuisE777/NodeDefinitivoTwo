module.exports=function(sequelize,Sequelize){
	var PagoOT = sequelize.define('inv_pago_ot', {
	  id_ot: {
		type: Sequelize.INTEGER,
		field: 'id_ot'
	  },
	  a_cuenta_anterior: {
		type: Sequelize.DECIMAL(20,4),
		field: 'a_cuenta_anterior'
	  },
	  saldo_anterior: {
		type: Sequelize.DECIMAL(20,4),
		field: 'saldo_anterior'
	  },
	  monto_pagado: {
		type: Sequelize.DECIMAL(20,4),
		field: 'monto_pagado'
	  },
	  id_usuario: {
		type: Sequelize.INTEGER,
		field: 'usuario' 
	  },
	  numero_documento: {
	  	type: Sequelize.INTEGER,
		field: 'numero_documento'
	  },
	  anticipo: {
		type: Sequelize.BOOLEAN,
		field: 'anticipo',
		defaultValue: false
	  }
	}, {
	  freezeTableName: true 
	});
	
	PagoOT.sync();
	
	return PagoOT;
}