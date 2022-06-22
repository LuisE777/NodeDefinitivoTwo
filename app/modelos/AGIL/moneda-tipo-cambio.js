module.exports=function(sequelize,Sequelize){
	var MonedaTipoCambio = sequelize.define('agil_moneda_tipo_cambio', {
	  fecha: {
		type: Sequelize.DATE,
		field: 'fecha'
	  },
	  ufv: {
		type: Sequelize.DECIMAL(20,6),
		field: 'ufv' 
	  },
	  dolar: {
		type: Sequelize.DECIMAL(20,6),
		field: 'dolar'
		},
		id_empresa:{
			type: Sequelize.INTEGER,
			field: 'empresa'
		} 
	}, {
	  freezeTableName: true 
	});
	
	MonedaTipoCambio.sync().then(function(){	
	});
	
	return MonedaTipoCambio;
}