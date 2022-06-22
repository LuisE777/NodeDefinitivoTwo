module.exports = (sequelize, Sequelize) => {
	const DetalleOrdenServicio = sequelize.define('detalle_orden_servicio', {
		id_orden_servicio: {
			type: Sequelize.INTEGER,
			field: 'orden_servicio'
		},
		descripcion:{
			type: Sequelize.TEXT('long'),
			field: 'descripcion'  
		},
        unidad_medida: {
			type: Sequelize.STRING,
			field: 'unidad_medida'
        },
        cantidad: { 
			type: Sequelize.DECIMAL(20,4),
			field: 'detalle'
        },
        costo_unitario: {
			type: Sequelize.DECIMAL(20,4),
            field: 'costo_unitario',
            defaultValue: 0.0
		},
		total: {
			type: Sequelize.DECIMAL(20,4),
            field: 'monto',
            defaultValue: 0.0
		},
		recibido: {
			type: Sequelize.BOOLEAN,
			field: 'recibido'
		},
		eliminado: {
			type: Sequelize.BOOLEAN,
			field: 'eliminado'
		},
	}, {
			freezeTableName: true
		});

	DetalleOrdenServicio.sync().then(() => {

	});

	return DetalleOrdenServicio;
}