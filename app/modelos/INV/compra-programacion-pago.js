module.exports=function(sequelize,Sequelize){
	var CompraProgramacionPago = sequelize.define('inv_compra_programacion_pago', {
        id_empresa: {
            type: Sequelize.INTEGER,
            field: 'id_empresa'
        },
        id_usuario: {
            type: Sequelize.INTEGER,
            field: 'id_usuario'
        },
        fecha: {
            type: Sequelize.DATE,
            field: 'fecha'
        },
        correlativo: {
            type: Sequelize.BIGINT,
            field: 'correlativo'
        },
        eliminado: {
            type: Sequelize.BOOLEAN,
            field: 'eliminado',
            defaultValue: 0
        }
        
	}, {
	  freezeTableName: true 
	});
	
	CompraProgramacionPago.sync();
	
	return CompraProgramacionPago;
}