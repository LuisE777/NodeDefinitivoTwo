module.exports=function(sequelize,Sequelize){
	var MantenimientoOrdenTrabajoManoObra = sequelize.define('agil_mantenimiento_orden_trabajo_mano_obra', {
	  id_orden_trabajo: {
			type: Sequelize.INTEGER,
			field: 'orden_trabajo'
		},
		id_especialidad: {
			type: Sequelize.INTEGER,
			field: 'especialidad'
		},
		fecha_inicio: {
			type: Sequelize.DATE,
			field: 'fecha_inicio'
		},
		fecha_fin: {
			type: Sequelize.DATE,
			field: 'fecha_fin'
		},
		trabajo_realizado: {
			type: Sequelize.STRING,
			field: 'trabajo_realizado'
		},
		id_persona:{
			type: Sequelize.INTEGER,
			field: 'persona'
		},
		importe_interno:{
			type: Sequelize.DECIMAL(20,4),
			field: 'importe_interno'
		},
		total_cliente:{
			type: Sequelize.DECIMAL(20,4),
			field: 'total_cliente'
		},
		horas:{
			type: Sequelize.DECIMAL(20,4),
			field: 'horas'
		},
		minutos:{
			type: Sequelize.DECIMAL(20,4),
			field: 'minutos'
		},
		requerimiento_trabajo: {
			type: Sequelize.STRING,
			field: 'requerimiento_trabajo'
		}
	}, {
	  freezeTableName: true 
	});
	
	MantenimientoOrdenTrabajoManoObra.sync().then(function(){
		
	});
	
	return MantenimientoOrdenTrabajoManoObra;
}