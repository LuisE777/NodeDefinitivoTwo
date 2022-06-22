module.exports = function (sequelize, Sequelize) {
	var Aplicacion = sequelize.define('sys_aplicacion', {
		titulo: {
			type: Sequelize.STRING,
			field: 'titulo'
		},
		atributo_clase: {
			type: Sequelize.STRING,
			field: 'atributo_clase'
		},
		url: {
			type: Sequelize.STRING,
			field: 'url'
		},
		id_padre: {
			type: Sequelize.INTEGER,
			field: 'padre'
		}
	}, {
		freezeTableName: true
	});

	Aplicacion.sync().then(function () {
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 1,titulo = 'CONFIGURACIONES',atributo_clase='icon-agil-configuraciones',url='configuraciones',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 2,titulo = 'EMPRESAS',atributo_clase='fa-briefcase',url='empresas',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 3,titulo = 'USUARIOS',atributo_clase='icon-agil-usuarios',url='usuarios',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 4,titulo = 'CLIENTES',atributo_clase='icon-agil-clientes',url='clientes',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 5,titulo = 'PROVEEDORES',atributo_clase='icon-agil-proveedores',url='proveedores',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 7,titulo = 'PRODUCTOS',atributo_clase='fa-gift',url='productos',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 8,titulo = 'CONCEPTOS',atributo_clase='fa-gift',url='conceptos',padre=1,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 9,titulo = 'SUCURSALES',atributo_clase='icon-agil-sucursales',url='sucursales',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 10,titulo = 'DOSIFICACIONES',atributo_clase='icon-agil-dosificacion',url='dosificaciones',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 11,titulo = 'CERT. COD. DE CONTROL',atributo_clase='fa-barcode',url='codigo-control',padre=1,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 12,titulo = 'COMPRAS',atributo_clase='icon-agil-compras',url='compras',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 13,titulo = 'INVENTARIO',atributo_clase='icon-agil-inventarios',url='inventario',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 14,titulo = 'SALIDAS',atributo_clase='icon-agil-ventas',url='salidas',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 15,titulo = 'FACTURAS',atributo_clase='fa-pencil-square-o',url='facturas',padre=1,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 16,titulo = 'REPORTES',atributo_clase='icon-agil-reporte',url='reportes',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 17,titulo = 'LIBRO DE COMPRAS',atributo_clase='fa-credit-card',url='libro-compras',padre=16,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 18,titulo = 'LIBRO DE VENTAS',atributo_clase='fa-pencil-square-o',url='libro-ventas',padre=16,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 19,titulo = 'REPORTES DE VENTAS',atributo_clase='fa-lightbulb-o',url='ventas-mensuales',padre=16,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 20,titulo = 'ALMACENES',atributo_clase='fa-pencil-square-o',url='reporte-almacenes',padre=16,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 21,titulo = 'REPORTE RÁPIDO ALMACENES',atributo_clase='fa-exchange',url='reporte-rapido-almacenes',padre=16,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 22,titulo = 'ESTADO DE RESULTADOS NO CONTABLE',atributo_clase='fa-check-square-o',url='estado-resultados-no-contable',padre=16,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 23,titulo = 'APP MOVIL',atributo_clase='fa-laptop',url='configuraciones-app',padre=1,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 24,titulo = 'RUTAS',atributo_clase='icon-agil-rutas',url='rutas',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 25,titulo = 'ESTADO DE CUENTAS CLIENTES',atributo_clase='fa-check-square-o',url='estado-cuentas-cliente',padre=16,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 26,titulo = 'ESTADO DE CUENTAS PROVEEDORES',atributo_clase='fa-check-square-o',url='estado-cuentas-proveedor',padre=16,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 27,titulo = 'SEGUIMIENTO APP',atributo_clase='fa-filter',url='seguimiento-app',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 28,titulo = 'PANTALLAS',atributo_clase='fa-desktop',url='pantallas',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 29,titulo = 'PANTALLA CLIENTE',atributo_clase='fa-users',url='pantalla-cliente',padre=28,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 30,titulo = 'PANTALLA DESPACHO',atributo_clase='fa-building',url='pantalla-despacho',padre=28,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 31,titulo = 'BANCOS',atributo_clase='icon-agil-banco',url='bancos',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 32,titulo = 'CIERRES DE CAJA',atributo_clase='fa-lock',url='cierres-caja',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 33,titulo = 'MESAS',atributo_clase='icon-agil-mesa',url='mesa',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 34,titulo = 'COTIZACIONES',atributo_clase='fa-book',url='cotizacion',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 35,titulo = 'PLAN DE CUENTAS',atributo_clase='icon-agil-plan-cuenta',url='contabilidad-cuenta',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 36,titulo = 'COMPROBANTES',atributo_clase='icon-agil-comprobantes',url='comprobantes',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 37,titulo = 'PACIENTES',atributo_clase='icon-agil-pacientes',url='pacientes',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 38,titulo = 'MANTENIMIENTO',atributo_clase='icon-agil-mantenimiento',url='mantenimiento',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 39,titulo = 'RRHH',atributo_clase='icon-agil-rrhh',url='rrhh',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 40,titulo = 'SOLICITUD DE VÍVERES',atributo_clase='fa-lemon-o',url='operaciones',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 41,titulo = 'DESPACHOS',atributo_clase='icon-agil-despacho',url='despachos',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 42,titulo = 'DESPACHO',atributo_clase='fa-bookmark',url='gtm-despachos',padre=41,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 43,titulo = 'TRANSPORTISTA',atributo_clase='fa-bookmark',url='gtm-transportista',padre=41,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 44,titulo = 'TIPO ESTIBAJE',atributo_clase='fa-bookmark',url='gtm-estibaje',padre=41,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 45,titulo = 'GRUPO ESTIBAJE',atributo_clase='fa-bookmark',url='gtm-grupo-estibaje',padre=41,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 46,titulo = 'DESTINOS',atributo_clase='fa-bookmark',url='gtm-destino',padre=41,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 47,titulo = 'PROFORMAS',atributo_clase='icon-agil-proformas',url='proformas',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 48,titulo = 'POLIFUNCIONALIDAD',atributo_clase='fa-street-view',url='polifuncionalidad',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 49,titulo = 'TRANSACCIONES',atributo_clase='icon-agil-transaccion',url='transacciones',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 50,titulo = 'PEDIDOS',atributo_clase='glyphicon-euro',url='pedidos',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 51,titulo = 'ACTIVOS',atributo_clase='icon-agil-activos',url='activos-fijos',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 52,titulo = 'GEO LOCALIZACIÓN',atributo_clase='fa-map-marker',url='geo-localizacion',padre=41,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 53,titulo = 'ESTADOS FINANCIEROS',atributo_clase='fa-usd',url='estados-financieros',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 54,titulo = 'CONFIGURACIONES GENERALES',atributo_clase='fa-cogs',url='configuraciones-estados-financieros',padre=53,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 55,titulo = 'BALANCE GENERAL',atributo_clase='fa-file-text',url='balance-general',padre=53,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 56,titulo = 'CAJA CHICA',atributo_clase='icon-agil-caja-chica',url='caja-chica',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 57,titulo = 'SOLICITUD CAJA CHICA',atributo_clase='icon-agil-solicitud',url='solicitud-caja-chica',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 58,titulo = 'ESTADO DE EVOLUCION DE PATRIMONIO NETO',atributo_clase='fa-file-text',url='estado-evolucion-patrimonio',padre=53,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 59,titulo = 'BALANCE DE COMPROBANCIÓN DE SUMAS Y SALDOS',atributo_clase='fa-file-text',url='balance-comprobacion-suma-saldo',padre=53,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 60,titulo = 'COMPROBANTES DE DIARIO',atributo_clase='fa-file-text',url='comprobante-diario',padre=53,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 61,titulo = 'ESTADO DE RESULTADO',atributo_clase='fa-file-text',url='estado-resultado',padre=53,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 62,titulo = 'COMENSALES',atributo_clase='icon-agil-comensales',url='comensales',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 63,titulo = 'PLANILLAS',atributo_clase='icon-agil-planilla',url='planillas',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 64,titulo = 'PLANILLA RC-IVA',atributo_clase='fa-file-text',url='planilla-rc-iva',padre=63,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 65,titulo = 'PLANILLA SUELDOS',atributo_clase='fa-file-text',url='planilla-sueldos',padre=63,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 67,titulo = 'PLANILLA CARGAS SOCIALES',atributo_clase='fa-file-text',url='planilla-cargas-sociales',padre=63,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 66,titulo = 'PORTERIA',atributo_clase='fa-lock',url='porteria',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 68,titulo = 'FARMACIA',atributo_clase='icon-agil-farmacia',url='farmacia',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 69,titulo = 'REPORTE RENDICIÓN CAJA CHICA',atributo_clase='fa-file-text',url='reporte-rendicion-caja-chica',padre=16,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id =70 ,titulo = 'REPORTE RRHH',atributo_clase='fa-credit-card',url='reporte-rrhh',padre=16,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 71,titulo = 'PLANILLA SUBSIDIOS',atributo_clase='fa-file-text',url='planilla-subsidios',padre=63,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 72,titulo = 'RESULTADOS ACUMULADOS',atributo_clase='fa-file-text',url='resultados-acumulados',padre=53,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 73,titulo = 'PLANILLA DE AGUINALDOS',atributo_clase='fa-file-text',url='planilla-aguinaldos',padre=63,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});

		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 74,titulo = 'CONSULTAS DINÁMICAS',atributo_clase='icon-agil-tabla-dinamica',url='consultas-dinamicas',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 75,titulo = 'CONSULTA CONTABLE',atributo_clase='fa-table',url='consulta-contable',padre=74,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 76,titulo = 'CONSULTA PROFORMA',atributo_clase='fa-table',url='consulta-proforma',padre=74,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 77,titulo = 'CONSULTA COSTOS',atributo_clase='fa-table',url='consulta-costos',padre=74,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 78,titulo = 'CONSULTA COMPRAS',atributo_clase='fa-table',url='consulta-compras',padre=74,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 79,titulo = 'ORDEN DE SERVICIO',atributo_clase='icon-agil-orden-de-servicio',url='orden-servicio',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 80,titulo = 'CONSULTA VENTAS',atributo_clase='fa-table',url='consulta-ventas',padre=74,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 81,titulo = 'PLANILLA DE INCREMENTOS',atributo_clase='fa-file-text',url='planilla-incrementos',padre=63,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 82,titulo = 'RECIBOS TRANSPORTE',atributo_clase='fa fa-clipboard',url='recibos-transporte',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});

		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 83,titulo = 'PLANILLAS RETROACTIVAS',atributo_clase='fa-file-text',url='planilla-retroactivas',padre=63,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});

		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 84,titulo = 'BALNEARIO',atributo_clase='fa fa-clipboard',url='balneario',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 85,titulo = 'CAPACITACIONES',atributo_clase='fa fa-book',url='capacitaciones',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 86,titulo = 'FACTURACIÓN',atributo_clase='fa fa-book',url='facturacion-electronica',createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 87,titulo = 'EMISIÓN',atributo_clase='fa-file-text',url='facturacion',padre=86,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 88,titulo = 'EVENTOS SIGNIFICATIVOS',atributo_clase='fa-file-text',url='eventos-significativos',padre=86,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});
		sequelize.query("INSERT IGNORE INTO sys_aplicacion SET id = 89,titulo = 'CONFIGURACIONES FACTURACIÓN',atributo_clase='fa-file-text',url='configuraciones-facturacion',padre=86,createdAt = NOW(),updatedAt = NOW();").spread(function (results, metadata) {
			//console.log(metadata+" rows affected in sys_application");
		});


	});
	return Aplicacion;
}