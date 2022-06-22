module.exports = function (sequelize, Sequelize) {
	var OpcionAplicacion = sequelize.define('sys_opcion_aplicacion', {
		id_aplicacion: {
			type: Sequelize.INTEGER,
			field: 'aplicacion'
		},
		nombre: {
			type: Sequelize.STRING,
			field: 'nombre'
		}
	}, {
			freezeTableName: true
		});

	OpcionAplicacion.sync().then(function () {
		sequelize.query("INSERT IGNORE INTO sys_opcion_aplicacion SET id=1,aplicacion=39,nombre='FICHA DE PERSONA',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {

		});
		sequelize.query("INSERT IGNORE INTO sys_opcion_aplicacion SET id=2,aplicacion=39,nombre='PRE-REQUISITO',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {

		});
		sequelize.query("INSERT IGNORE INTO sys_opcion_aplicacion SET id=3,aplicacion=39,nombre='DATOS EMPLEADO',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {

		});
		sequelize.query("INSERT IGNORE INTO sys_opcion_aplicacion SET id=4,aplicacion=39,nombre='FINIQUITO',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {

		});
		sequelize.query("INSERT IGNORE INTO sys_opcion_aplicacion SET id=5,aplicacion=39,nombre='ANTICIPO EXTRAORDINARIO',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {

		});
		sequelize.query("INSERT IGNORE INTO sys_opcion_aplicacion SET id=6,aplicacion=39,nombre='PRESTAMO',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {

		});
		sequelize.query("INSERT IGNORE INTO sys_opcion_aplicacion SET id=7,aplicacion=39,nombre='AUSENCIA Y VACACION',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {

		});
		sequelize.query("INSERT IGNORE INTO sys_opcion_aplicacion SET id=8,aplicacion=39,nombre='ROL DE TURNOS',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {

		});
		sequelize.query("INSERT IGNORE INTO sys_opcion_aplicacion SET id=9,aplicacion=39,nombre='HORAS EXTRAS',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {

		});
		sequelize.query("INSERT IGNORE INTO sys_opcion_aplicacion SET id=10,aplicacion=39,nombre='HOJA DE VIDA',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {

		});
		sequelize.query("INSERT IGNORE INTO sys_opcion_aplicacion SET id=11,aplicacion=39,nombre='ROPA DE TRABAJO',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {

		});
		sequelize.query("INSERT IGNORE INTO sys_opcion_aplicacion SET id = 12,aplicacion=56,nombre = 'CIERRE DE CAJA',createdAt = NOW(),updatedAt = NOW();").spread(function(results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_opcion_aplicacion SET id = 13,aplicacion=56,nombre = 'FONDO A RENDIR',createdAt = NOW(),updatedAt = NOW();").spread(function(results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_opcion_aplicacion SET id = 14,aplicacion=14,nombre = 'FACTURACIÓN',createdAt = NOW(),updatedAt = NOW();").spread(function(results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_opcion_aplicacion SET id = 15,aplicacion=14,nombre = 'BAJA',createdAt = NOW(),updatedAt = NOW();").spread(function(results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_opcion_aplicacion SET id = 16,aplicacion=14,nombre = 'PROFORMA',createdAt = NOW(),updatedAt = NOW();").spread(function(results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_opcion_aplicacion SET id = 17,aplicacion=14,nombre = 'TRASPASO',createdAt = NOW(),updatedAt = NOW();").spread(function(results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_opcion_aplicacion SET id = 18,aplicacion=14,nombre = 'AJUSTE',createdAt = NOW(),updatedAt = NOW();").spread(function(results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_opcion_aplicacion SET id = 19,aplicacion=14,nombre = 'SERVICIO',createdAt = NOW(),updatedAt = NOW();").spread(function(results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_opcion_aplicacion SET id = 20,aplicacion=14,nombre = 'TRASPASO ALMACEN',createdAt = NOW(),updatedAt = NOW();").spread(function(results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_opcion_aplicacion SET id=21,aplicacion=39,nombre='HISTÓRICO',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {

		});
		sequelize.query("INSERT IGNORE INTO sys_opcion_aplicacion SET id=22,aplicacion=39,nombre='SUBSIDIO',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {

		});
		sequelize.query("INSERT IGNORE INTO sys_opcion_aplicacion SET id=23,aplicacion=39,nombre='LLAMADAS DE ATENCIÓN',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {

		});
		sequelize.query("INSERT IGNORE INTO sys_opcion_aplicacion SET id=24,aplicacion=14,nombre='INTEGRACION TRASPASOS',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {

		});	
		sequelize.query("INSERT IGNORE INTO sys_opcion_aplicacion SET id = 25,aplicacion=14,nombre = 'CONSUMOS',createdAt = NOW(),updatedAt = NOW();").spread(function(results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
	});

	return OpcionAplicacion;
}