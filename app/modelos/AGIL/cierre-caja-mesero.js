module.exports=function(sequelize,Sequelize){
	var CierreCajaMesero = sequelize.define('agil_cierre_caja_mesero', {
	  id_sucursal: {
		type: Sequelize.INTEGER,
		field: 'sucursal' 
	  },
	  id_mesero:{
		type: Sequelize.INTEGER,
		field: 'mesero'   
	  },
	  fecha: {
		type: Sequelize.DATE,
		field: 'fecha'
	  },
	  id_usuario: {
		type: Sequelize.INTEGER,
		field: 'usuario' 
	  },
	  importe: {
		type: Sequelize.DECIMAL(20,4),
		field: 'importe'
	  },
	  id_destino: {
		type: Sequelize.INTEGER,
		field: 'destino'
	  },
	  id_banco_destino: {
		type: Sequelize.INTEGER,
		field: 'banco_destino'
	  },
	  persona_destino: {
		type: Sequelize.STRING,
		field: 'persona_destino'
	  },
	  importe_entrega: {
		type: Sequelize.DECIMAL(20,4),
		field: 'importe_entrega'
	  },
	  fecha_entrega: {
		type: Sequelize.DATE,
		field: 'fecha_entrega'
	  },
	  numero_documento: {
		type: Sequelize.INTEGER,
		field: 'numero_documento' 
	  },
	  saldo_inicial: {
		type: Sequelize.DECIMAL(20,4),
		field: 'saldo_inicial'
	  },
	  gastos: {
		type: Sequelize.DECIMAL(20,4),
		field: 'gastos'
	  }
	}, {
	  freezeTableName: true 
	});
	
	CierreCajaMesero.sync().then(function(){
		
	});
	
	return CierreCajaMesero;
}