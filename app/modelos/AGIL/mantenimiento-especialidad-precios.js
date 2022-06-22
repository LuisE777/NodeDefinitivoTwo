module.exports=function(sequelize,Sequelize){
	var MantenimientoEspecialidadPrecios = sequelize.define('mantenimiento_especialidad_precios', {
	  id_especialidad: {
		type: Sequelize.INTEGER,
		field: 'especialidad' 
	  },
	  precio: {
		type: Sequelize.DECIMAL(20,4),
		field: 'precio'
	  }
	}, {
	  freezeTableName: true 
	});
	
	MantenimientoEspecialidadPrecios.sync().then(function(){
		
	});
	
	return MantenimientoEspecialidadPrecios;
}