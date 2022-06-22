module.exports=function(sequelize,Sequelize){
	var AreaCostos = sequelize.define('agil_area_costos', {
        id_empresa: {
          type: Sequelize.INTEGER,
          field: 'id_empresa'
        },
        nombre: {
            type: Sequelize.STRING,
            field: 'nombre'
        },
        descripcion: {
            type: Sequelize.STRING,
            field: 'descripcion'
        },
        eliminado: {
          type: Sequelize.BOOLEAN,
          field: 'eliminado',
          defaultValue: false 
      }
    }, {
    freezeTableName: true 
	});
	
	AreaCostos.sync().then(function(){
		
	});
	
	return AreaCostos;
}