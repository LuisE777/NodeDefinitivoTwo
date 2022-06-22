module.exports = function (sequelize, Sequelize) {
	var IntegracionAplicacion = sequelize.define('sys_integracion_aplicacion', {
		nombre: {
			type: Sequelize.STRING,
			field: 'nombre'
		},
		id_aplicacion: {
			type: Sequelize.INTEGER,
			field: 'aplicacion'
		}
	}, {
			freezeTableName: true
		});

	IntegracionAplicacion.sync().then(function () {
		sequelize.query("INSERT IGNORE INTO sys_integracion_aplicacion SET id = 1,nombre = 'CIERRE DE CAJA',aplicacion=56,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_integracion_aplicacion SET id = 2,nombre = 'FONDO A RENDIR',aplicacion=56,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		})
		sequelize.query("INSERT IGNORE INTO sys_integracion_aplicacion SET id = 3,nombre = 'COMPRA',aplicacion=12,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_integracion_aplicacion SET id = 4,nombre = 'VENTA',aplicacion=14,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_integracion_aplicacion SET id = 5,nombre = 'PROF/FACTURA',aplicacion=47,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_integracion_aplicacion SET id = 6,nombre = 'PLANILLA DE SUELDOS',aplicacion=65,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_integracion_aplicacion SET id = 7,nombre = 'PLANILLA DE CARGOS SOCIALES',aplicacion=67,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_integracion_aplicacion SET id = 8,nombre = 'ANTICIPO SUELDOS',aplicacion=39,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_integracion_aplicacion SET id = 9,nombre = 'PAGO DE SUELDOS',aplicacion=65,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_integracion_aplicacion SET id = 10,nombre = 'PAGO DE AGUINALDO',aplicacion=73,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_integracion_aplicacion SET id = 11,nombre = 'TRASPASOS',aplicacion=14,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_integracion_aplicacion SET id = 12,nombre = 'CONSUMOS',aplicacion=40,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_integracion_aplicacion SET id = 13,nombre = 'CONSUMOS OT',aplicacion=38,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_integracion_aplicacion SET id = 14,nombre = 'EPP´S ROPA DE TRABAJO',aplicacion=39,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_integracion_aplicacion SET id = 15,nombre = 'FONDOS A RENDIR',aplicacion=56,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_integracion_aplicacion SET id = 16,nombre = 'PAGO A PROVEEDORES',aplicacion=49,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_integracion_aplicacion SET id = 17,nombre = 'COBROS A CLIENTES',aplicacion=49,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
	});

	return IntegracionAplicacion;
}