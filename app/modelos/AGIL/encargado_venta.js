module.exports=function(sequelize,Sequelize){
	var EncargadoVenta = sequelize.define('encargado_venta', {
        id_persona: {
            type: Sequelize.INTEGER,
            field: 'id_persona'
        },
        id_empresa: {
            type: Sequelize.INTEGER,
            field: 'id_empresa'
        },
        codigo: {
            type: Sequelize.STRING,
            field: 'codigo'
        },
        activo: {
          type: Sequelize.BOOLEAN,
          field: 'activo'
        },
        eliminado: {
          type: Sequelize.BOOLEAN,
          field: 'eliminado',
          defaultValue: false 
      }
    }, {
    freezeTableName: true 
	});
	
	EncargadoVenta.sync().then(function(){
		
	});
	
	return EncargadoVenta;
}