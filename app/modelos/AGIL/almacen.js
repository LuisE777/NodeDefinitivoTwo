module.exports=function(sequelize,Sequelize){
	var Almacen = sequelize.define('agil_almacen', {
	  id_sucursal: {
		type: Sequelize.INTEGER,
		field: 'sucursal' 
	  },
	  nombre: {
		type: Sequelize.STRING,
		field: 'nombre'
	  },
	  numero: {
		type: Sequelize.INTEGER,
		field: 'numero'
	  },
	  direccion: {
		type: Sequelize.STRING,
		field: 'direccion'
	  },
	  telefono:{
		type: Sequelize.STRING,
		field: 'telefono'  
	  },
	  numero_correlativo_iso_compra:{
		type: Sequelize.INTEGER,
		field: 'numero_correlativo_iso_compra'  
	  },
	  numero_correlativo_iso_consumo:{
		type: Sequelize.INTEGER,
		field: 'numero_correlativo_iso_consumo'  
	  },
	  numero_correlativo_iso_orden_compra:{
		type: Sequelize.INTEGER,
		field: 'numero_correlativo_iso_orden_compra'  
	  },
	  numero_correlativo_iso_traspaso_salida:{
		type: Sequelize.INTEGER,
		field: 'numero_correlativo_iso_traspaso_salida' 
	  },
	  numero_correlativo_iso_dotacion_ropa:{
		type: Sequelize.INTEGER,
		field: 'numero_correlativo_iso_dotacion_ropa' 
	  },
	  numero_correlativo_iso_baja:{
		type: Sequelize.INTEGER,
		field: 'numero_correlativo_iso_baja' 
	  },
	  numero_correlativo_iso_orden_servicio:{
		type: Sequelize.INTEGER,
		field: 'numero_correlativo_iso_orden_servicio' 
	  },
	  correlativo_iso_gestion_recepcion:{
		type: Sequelize.INTEGER,
		field: 'correlativo_iso_gestion_recepcion' 
	  },
	  correlativo_iso_gestion_envio:{
		type: Sequelize.INTEGER,
		field: 'correlativo_iso_gestion_envio' 
	  },
	  id_cuenta:{
		type: Sequelize.INTEGER,
		field: 'cuenta' 
	  }
	}, {
	  freezeTableName: true 
	});
	
	Almacen.sync().then(function(){
		
	});
	
	return Almacen;
}