module.exports=function(sequelize,Sequelize){
	var RrhhParametrosAreasFrontera = sequelize.define('agil_rrhh_parametros_areas_frontera', {
		id_parametro: {
			type: Sequelize.INTEGER,
			field: 'parametro' 
			},
        id_area: {
            type: Sequelize.INTEGER,
            field: 'area'
        }
	}, {
	  freezeTableName: true 
	});
	
	RrhhParametrosAreasFrontera.sync().then(function(){
		
	});
	
	return RrhhParametrosAreasFrontera;
}