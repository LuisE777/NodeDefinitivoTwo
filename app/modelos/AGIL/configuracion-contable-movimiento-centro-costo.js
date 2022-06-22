module.exports=function(sequelize,Sequelize){
	var ConfiguracionContableMovimientoCentroCosto = sequelize.define('agil_configuracion_contable_movimiento_centro_costo', {
	  id_movimiento_caja_chica: {
		type: Sequelize.INTEGER,
		field: 'movimiento_caja_chica' 
		},
		id_configuracion_contable_comprobate: {
			type: Sequelize.INTEGER,
			field: 'configuracion_contable_comprobate' 
			}
	}, {
	  freezeTableName: true 
	});
	
	ConfiguracionContableMovimientoCentroCosto.sync().then(function(){
		
	});
	
	return ConfiguracionContableMovimientoCentroCosto;
}