module.exports = function (sequelize, Sequelize) {
	var EvaluacionProveedor = sequelize.define('agil_evaluacion_proveedor', {
		id_proveedor: {
			type: Sequelize.INTEGER,
			field: 'proveedor'
		},
		razon_social_proveedor: {
			type: Sequelize.STRING,
			field: 'razon_social_proveedor'
		},
		nombre_usuario: {
			type: Sequelize.STRING,
			field: 'nombre_usuario'
		},
		direccion: {
			type: Sequelize.STRING,
			field: 'direccion'
		},
		telefono: {
			type: Sequelize.STRING,
			field: 'telefono'
		},
		responsable_venta: {
			type: Sequelize.STRING,
			field: 'responsable_venta'
		},
		cargo: {
			type: Sequelize.STRING,
			field: 'cargo'
		},
		area: {
			type: Sequelize.STRING,
			field: 'area'
		},
		fecha_elaboracion: {
			type: Sequelize.DATE,
			field: 'fecha_elaboracion'
		},
		inicio: {
			type: Sequelize.DATE,
			field: 'inicio'
		},
		fin: {
			type: Sequelize.DATE,
			field: 'fin'
		},
		registros: {
			type: Sequelize.TEXT("long"),
			field: 'registros'
		},
		productos: {
			type: Sequelize.TEXT("long"),
			field: 'productos'
		},
		eliminado: {
			type: Sequelize.BOOLEAN,
			field: 'eliminado'
		},
		id_configuracion_iso:{
			type: Sequelize.INTEGER,
			field: 'configuracion_iso'
		},
		total:{
			type: Sequelize.DECIMAL(20,4),
			field: 'total'
		},
		tipo_proveedor:{
			type: Sequelize.STRING,
			field: 'tipo_proveedor'
		},
		eliminado: {
			type: Sequelize.BOOLEAN,
			field: 'eliminado',
			defaultValue: false
			},
	}, {
			freezeTableName: true
		});

	EvaluacionProveedor.sync();

	return EvaluacionProveedor;
}