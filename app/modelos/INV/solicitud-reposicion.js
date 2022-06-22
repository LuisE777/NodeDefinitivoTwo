module.exports = function (sequelize, Sequelize) {
	var SolicitudReposicion = sequelize.define('inv_solicitud_reposicion', {
		id_campo:{
			type: Sequelize.INTEGER,
			field: 'campo',
		},
		id_movimiento:{
			type: Sequelize.INTEGER,
			field:'movimiento'
		},
		id_almacen: {
			type: Sequelize.INTEGER,
			field: 'almacen'
		},
		fecha: {
			type: Sequelize.DATE,
			field: 'fecha'
		},
		id_usuario: {
			type: Sequelize.INTEGER,
			field: 'usuario'
		},
		activo: {
			type: Sequelize.BOOLEAN,
			field: 'activo'
		},
		monto: {
			type: Sequelize.DECIMAL(20,4),
			field: 'monto'
		},
		id_comprobante: {
			type: Sequelize.INTEGER,
			field: 'comprobante'
		},
		id_compra: {
			type: Sequelize.INTEGER,
			field: 'compra'
		},
		eliminado: {
			type: Sequelize.BOOLEAN,
			field: 'eliminado',
			defaultValue: 0
		},
		id_empresa: {
			type: Sequelize.INTEGER,
			field: 'empresa'
		},
		id_estado: {
			type: Sequelize.INTEGER,
			field: 'estado'
		},
		comensales:{
			type: Sequelize.INTEGER,
			field: 'comensales'
		},
		numero_correlativo:{
			type: Sequelize.INTEGER,
			field: 'numero_correlativo'
		},
		id_area: {
			type: Sequelize.INTEGER,
			field: 'area',
			defaultValue: null,
		},
		numero_iso_consumo:{
			type: Sequelize.INTEGER,
			field: 'numero_iso_consumo'  
		},
		descripcion:{
			type: Sequelize.TEXT('long'),
			field: 'descripcion'  
		},
		config_doc_iso: {
			type:Sequelize.INTEGER,
			field: 'config_doc_iso',
			defaultValue: null
		},
		id_solicitud_campamento:{
			type: Sequelize.INTEGER,
			field: 'solicitud_campamento'
		},
		campamento_sincronizado:{
			type: Sequelize.BOOLEAN,
			field: 'campamento_sincronizado',
			defaultValue:false
		},
		fecha_sincronizado:{
			type: Sequelize.DATE,
			field: 'fecha_sincronizado',
		},
		fecha_cierre:{
			type: Sequelize.DATE,
			field: 'fecha_cierre',
			defaultValue: null
		},
		id_cierre_usuario:{
			type: Sequelize.INTEGER,
			field: 'id_cierre_usuario',
			defaultValue: null
		},
	}, {
			freezeTableName: true
		});

	SolicitudReposicion.sync().then(function () {

	});

	return SolicitudReposicion;
}