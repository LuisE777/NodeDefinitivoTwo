module.exports=function(sequelize,Sequelize){
	var Telefono = sequelize.define('gl_telefono', {
        id_persona:{
            type: Sequelize.INTEGER,
            field: 'id_persona'  
        },
		numero:{
			type: Sequelize.STRING,
			field: 'numero'  
		},
		fijo:{
			type: Sequelize.BOOLEAN,
			field: 'fijo'  	
		}
	}, {
	  freezeTableName: true 
	});
	
	Telefono.sync().then(function(){});
	
	return Telefono;
}