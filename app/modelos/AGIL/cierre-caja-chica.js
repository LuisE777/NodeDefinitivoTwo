module.exports = function (sequelize, Sequelize) {
	var CierreCajaChica = sequelize.define('agil_cierre_caja_chica', {
		inicio: {
			type: Sequelize.DATE,
			field: 'inicio'
		},
		fin: {
			type: Sequelize.DATE,
			field: 'fin'
		},
		fecha: {
			type: Sequelize.DATE,
			field: 'fecha'
		},
		saldo_inicial: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'saldo_inicial'
		},
		saldo_final: {
			type: Sequelize.DECIMAL(20, 4),
			field: 'saldo_final'
		},
		id_usuario:{
			type: Sequelize.INTEGER,
			field: 'usuario'
		},
		id_comprobante:{
			type: Sequelize.INTEGER,
			field: 'comprobante'
		}
	}, {
			freezeTableName: true
		});

	CierreCajaChica.sync().then(function () {

	});

	return CierreCajaChica;
}