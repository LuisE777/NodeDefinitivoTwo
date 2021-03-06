module.exports = function (sequelize, Sequelize) {
	var ContabilidadCuenta = sequelize.define('agil_contabilidad_cuenta', {
		id_empresa: {
			type: Sequelize.INTEGER,
			field: 'empresa'
		},
		 id_tipo_personal: {
			type: Sequelize.INTEGER,
			field: 'tipo_personal'
		},
		id_cuenta_padre: {
			type: Sequelize.INTEGER,
			field: 'cuenta_padre'
		},
		codigo: {
			type: Sequelize.STRING,
			field: 'codigo'
		},
		nombre: {
			type: Sequelize.STRING,
			field: 'nombre'
		},
		descripcion: {
			type: Sequelize.STRING,
			field: 'descripcion'
		},
		debe: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'debe'
		},
		haber: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'haber'
		},
		saldo: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'saldo'
		},
		id_clasificacion: {
			type: Sequelize.INTEGER,
			field: 'clasificacion'
		},
		id_tipo_cuenta: {
			type: Sequelize.INTEGER,
			field: 'tipo_cuenta'
		},
		bimonetaria: {
			type: Sequelize.BOOLEAN,
			field: 'bimonetaria'
		},
		aplicar_calculo: {
			type: Sequelize.BOOLEAN,
			field: 'aplicar_calculo'
		},
		id_calculo: {
			type: Sequelize.INTEGER,
			field: 'calculo'
		},
		monto: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'monto'
		},
		eliminado: {
			type: Sequelize.BOOLEAN,
			field: 'eliminado'
		},
		id_tipo_auxiliar: {
			type: Sequelize.INTEGER,
			field: 'id_tipo_auxiliar'
		},
		especifica: {
			type: Sequelize.BOOLEAN,
			field: 'especifica'
		},
		id_especifica_texto1: {
			type: Sequelize.INTEGER,
			field: 'especifica_texto1'
		},
		id_especifica_texto2: {
			type: Sequelize.INTEGER,
			field: 'especifica_texto2'
		},
		id_especifica_texto3: {
			type: Sequelize.INTEGER,
			field: 'especifica_texto3'
		},
		tipo_especifica: {
			type: Sequelize.BOOLEAN,
			field: 'tipo_especifica'
		},
		vincular_cuenta: {
			type: Sequelize.BOOLEAN,
			field: 'vincular_cuenta'
		},
		cuenta_activo: {
			type: Sequelize.BOOLEAN,
			field: 'cuenta_activo'
		},
		estado_resultado: {
			type: Sequelize.BOOLEAN,
			field: 'estado_resultado'
		},
		resultado_acumulado: {
			type: Sequelize.BOOLEAN,
			field: 'resultado_acumulado'
		},
		no_monetaria: {
			type: Sequelize.BOOLEAN,
			field: 'no_monetaria'
		},
		libro_de_compra: {
			type: Sequelize.BOOLEAN,
			field: 'libro_de_compra'
		},
		id_almacen_lc: {
			type: Sequelize.INTEGER,
			field: 'almacen_lc'
		},
		cuenta_vinculada_lc: {
			type: Sequelize.STRING,
			field: 'cuenta_vinculada_lc'
		},
		id_cuenta_depreciacion: {
			type: Sequelize.INTEGER,
			field: 'id_cuenta_depreciacion'
		},
		patrimonial: {
			type: Sequelize.BOOLEAN,
			field: 'patrimonial',
			default: false
		},
		id_grupo: {
			type: Sequelize.INTEGER,
			field: 'grupo'
		},

	}, {
		freezeTableName: true
	});

	ContabilidadCuenta.sync();

	return ContabilidadCuenta;
}