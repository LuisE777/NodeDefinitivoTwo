module.exports=function(sequelize,Sequelize){
	var RRHHAguinaldoPlanillaSueldo = sequelize.define('agil_rrhh_aguinaldo_planilla-sueldo', {
		id_detalle_aguinaldo: {
			type: Sequelize.INTEGER,
			field: 'id_detalle_aguinaldo'
		},
		id_detalle_sueldo: {
			type: Sequelize.INTEGER,
			field: 'id_detalle_sueldo'
		},
		
	}, {
	  freezeTableName: true 
	});

	RRHHAguinaldoPlanillaSueldo.sync();	
	return RRHHAguinaldoPlanillaSueldo;
}