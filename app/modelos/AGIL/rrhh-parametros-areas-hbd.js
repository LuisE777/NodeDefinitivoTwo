module.exports=function(sequelize,Sequelize){
	var RrhhParametrosAreasHBD = sequelize.define('agil_rrhh_parametros_areas_hbd', {
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
	
	RrhhParametrosAreasHBD.sync().then(function(){
		
	});
	
	return RrhhParametrosAreasHBD;
}