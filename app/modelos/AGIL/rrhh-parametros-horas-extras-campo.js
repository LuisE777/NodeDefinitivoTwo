module.exports=function(sequelize,Sequelize){
	var RrhhParametrosHorasExtrasCampo = sequelize.define('agil_rrhh_parametros_horas_extras_campo', {
		id_parametro: {
			type: Sequelize.INTEGER,
			field: 'parametro' 
			},
        id_campo: {
            type: Sequelize.INTEGER,
            field: 'campo'
        },
        horas: {
			type: Sequelize.DECIMAL(20,4),
			field: 'horas'
        },
        inicio_mes: {
			type: Sequelize.STRING,
			field: 'inicio_mes'
		},
		fin_mes: {
			type: Sequelize.STRING,
			field: 'fin_mes'
        },
        eliminado: {
            type: Sequelize.BOOLEAN,
            field: 'eliminado',
            defaultValue:false
        }
	}, {
	  freezeTableName: true 
	});
	
	RrhhParametrosHorasExtrasCampo.sync().then(function(){
		
	});
	
	return RrhhParametrosHorasExtrasCampo;
}