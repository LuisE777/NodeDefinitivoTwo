module.exports=function(sequelize,Sequelize){
	var CajaSiguienteTurnoMesero = sequelize.define('agil_caja_siguiente_turno-mesero', {
	  id_sucursal: {
		type: Sequelize.INTEGER,
		field: 'sucursal' 
	  },
	  id_mesero_siguiente_turno:{
		type: Sequelize.INTEGER,
		field: 'mesero_siguiente_turno' 
	  },
	  id_cierre_caja_mesero: {
		type: Sequelize.INTEGER,
		field: 'cierre_caja_mesero'
	  },
	  id_cierre_caja_cerrado_mesero: {
		type: Sequelize.INTEGER,
		field: 'cierre_caja_cerrado_mesero'
	  }
	}, {
	  freezeTableName: true 
	});
	
	CajaSiguienteTurnoMesero.sync().then(function(){
		
	});
	
	return CajaSiguienteTurnoMesero;
}