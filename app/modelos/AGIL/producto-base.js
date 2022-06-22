module.exports=function(sequelize,Sequelize){
	var ProductoBase = sequelize.define('agil_producto_base', {
	  id_producto: {
		type: Sequelize.INTEGER,
		field: 'producto' 
	  },
	  id_producto_base: {
		type: Sequelize.INTEGER,
		field: 'producto_base'
	  },
	  formulacion:{
	  	type: Sequelize.DECIMAL(20,4),
	  	field:'formulacion'
	  },
	  habilitar_cambio:{
		type: Sequelize.BOOLEAN,
		field: 'habilitar_cambio',
		defaultValue: false
	  }
	}, {
	  freezeTableName: true 
	});
	
	ProductoBase.sync().then(function(){
		
	});

	return ProductoBase;
}
