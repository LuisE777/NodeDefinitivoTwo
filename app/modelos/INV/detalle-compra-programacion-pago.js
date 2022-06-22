module.exports=function(sequelize,Sequelize){
	var DetalleCompraProgramacionPago = sequelize.define('inv_detalle_compra_programacion_pago', {
        id_programacion_pago: {
                type: Sequelize.INTEGER,
                field: 'id_programacion_pago'
        },
        id_compra: {
            type: Sequelize.INTEGER,
            field: 'id_compra'
        },
        id_usuario: {
            type: Sequelize.INTEGER,
            field: 'id_usuario'
        },
        fecha_vencimiento: {
            type: Sequelize.DATE,
            field: 'fecha_vencimiento'
        },
		id_estado: {
			type:Sequelize.INTEGER,
			field: 'id_estado'
		}
	}, {
	  freezeTableName: true 
	});
	
	DetalleCompraProgramacionPago.sync();
	
	return DetalleCompraProgramacionPago;
}