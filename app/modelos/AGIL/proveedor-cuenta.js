module.exports=function(sequelize,Sequelize){
	var ProveedorCuenta = sequelize.define('agil_proveedor_cuenta', {
	id_cuenta: {
		type: Sequelize.INTEGER,
		field: 'cuenta'
	  },
	id_proveedor: {
		type: Sequelize.INTEGER,
		field: 'proveedor'
	  }, 
	  id_tipo: {
		type: Sequelize.INTEGER,
		field: 'tipo'
	  }    
	}, {
	  freezeTableName: true 
	});
	
	ProveedorCuenta.sync();
	
	return ProveedorCuenta;
}