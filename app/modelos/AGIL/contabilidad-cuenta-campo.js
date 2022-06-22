module.exports=function(sequelize,Sequelize){
	var ContabilidadCuentaCampo = sequelize.define('agil_contabilidad_cuenta_campo', {
	  id_cuenta: {
		type: Sequelize.INTEGER,
		field: 'cuenta'
	  },
	  id_campo: {
		type: Sequelize.INTEGER,
		field: 'campo' 
	  }
	}, {
	  freezeTableName: true 
	});
	
	ContabilidadCuentaCampo.sync().then(function(){
	});
	
	return ContabilidadCuentaCampo;
}