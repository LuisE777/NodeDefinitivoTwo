module.exports = function (sequelize, Sequelize) {
	var Banco = sequelize.define('agil_banco', {
		id_empresa: {
			type: Sequelize.INTEGER,
			field: 'empresa'
		},
		nombre: {
			type: Sequelize.STRING,
			field: 'nombre'
		},
		numero: {
			type: Sequelize.STRING,
			field: 'numero'
		},
		id_tipo_cuenta: {
			type: Sequelize.INTEGER,
			field: 'tipo_cuenta'
		},
		id_tipo_moneda: {
			type: Sequelize.INTEGER,
			field: 'tipo_moneda'
		},
		eliminar: {
			type: Sequelize.BOOLEAN,
			field: 'eliminar'
		},
		cuenta_sueldo: {
			type: Sequelize.BOOLEAN,
			field: 'cuenta_sueldo'
		},
		id_cuenta: {
			type: Sequelize.INTEGER,
			field: 'cuenta'
		},
		glosa_individual: {
			type: Sequelize.STRING,
			field: 'glosa_individual'
		},
		nit: {
			type: Sequelize.STRING,
			field: 'nit'
		}
	}, {
		freezeTableName: true
	});

	Banco.sync().then(function () {

	});

	return Banco;
}