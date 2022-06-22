module.exports=function(sequelize,Sequelize){
	var MeseroVenta = sequelize.define('agil_mesero_venta', {
	  id_persona: {
		type: Sequelize.INTEGER,
		field: 'persona'
	  },
	  id_empresa: {
		type: Sequelize.INTEGER,
		field: 'empresa'
	  },
	  codigo: {
		type: Sequelize.STRING,
		field: 'codigo'
	  },
	  activo: {
		type: Sequelize.BOOLEAN,
		field: 'activo',
	},
	}, {
	  freezeTableName: true 
	});
	
	MeseroVenta.sync();
	
	return MeseroVenta;
}