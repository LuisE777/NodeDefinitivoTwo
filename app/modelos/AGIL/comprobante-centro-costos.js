module.exports=function(sequelize,Sequelize){
	var ComprobanteCentroCostos = sequelize.define('agil_comprobante_centro_costos', {
        id_centro_costos: {
            type: Sequelize.INTEGER,
            field: 'id_centro_costos' 
        },
        id_area_costos: {
            type: Sequelize.INTEGER,
            field: 'id_area_costos'
        },
        descripcion: {
            type: Sequelize.STRING,
            field: 'descripcion'
        },
        prorrateo: {
          type: Sequelize.BOOLEAN,
          field: 'prorrateo',
		      defaultValue: false 
		    },
        eliminado: {
          type: Sequelize.BOOLEAN,
          field: 'eliminado',
		      defaultValue: false 
		    }
	  }, {
	  freezeTableName: true 
	});
	ComprobanteCentroCostos.sync().then(function(){
	});
	return ComprobanteCentroCostos;
}