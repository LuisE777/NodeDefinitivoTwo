module.exports=function(sequelize,Sequelize){
	var VentaAmbiente = sequelize.define('inv_venta_ambiente', {
	  id_venta: {
		type: Sequelize.INTEGER,
		field: 'id_venta'
	  },
	  id_ambiente: {
		type: Sequelize.INTEGER,
		field: 'id_ambiente'
	  },
      id_encargado: {
        type: Sequelize.INTEGER,
        field: 'id_encargado'
      },
	  liquidado: {
		type: Sequelize.BOOLEAN,
		field: 'liquidado',
		defaultValue: false
	  },
      fecha: {
        type: Sequelize.DATE,
        field: 'fecha'
      },
      hora_inicio: {
        type: Sequelize.TIME,
        field: 'hora_inicio'
      },
      hora_fin: {
          type: Sequelize.TIME,
          field: 'hora_fin'
      }
	}, {
	  freezeTableName: true 
	});
	
	VentaAmbiente.sync();
	
	return VentaAmbiente;
}