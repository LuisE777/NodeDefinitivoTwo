module.exports=function(sequelize,Sequelize){
	var ContabilidadCuentaGrupo = sequelize.define('agil_contabilidad_cuenta_grupo', {
	  id_cuenta: {
		type: Sequelize.INTEGER,
		field: 'cuenta'
	  },
	  id_grupo: {
		type: Sequelize.INTEGER,
		field: 'grupo' 
	  }
	}, {
	  freezeTableName: true 
	});
	
	ContabilidadCuentaGrupo.sync().then(function(){
	});
	
	return ContabilidadCuentaGrupo;
}