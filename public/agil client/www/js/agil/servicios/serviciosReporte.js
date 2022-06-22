angular.module('agil.servicios')
	.factory('ReportEstadoCuentasProveedoresDatos', ['$resource', function ($resource) {
		return $resource(restServer + "reportes/estado-cuentas-proveedores/:id_empresa", {}, {
			show: { method: 'GET', isArray: true }
		})
	}])

	.factory('ReportEstadoCuentasXproveedorRuta', ['$resource', function ($resource) {
		return $resource(restServer + "reportes/estado-cuentas-proveedores/detalle/:id_proveedor", null,
			{

				'update': { method: 'PUT' }
			});
	}])
	.factory('ReportEstadoCuentasXproveedor', ['ReportEstadoCuentasXproveedorRuta', '$q', function (ReportEstadoCuentasXproveedorRuta, $q) {
		var res = function (id_proveedor) {
			var delay = $q.defer();
			ReportEstadoCuentasXproveedorRuta.query({ id_proveedor: id_proveedor }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('ReportEstadoCuentasClientesDatos', ['$resource', function ($resource) {
		return $resource(restServer + "reportes/estado-cuentas-clientes/:id_empresa", {}, {
			show: { method: 'GET', isArray: true }
		})
	}])
	.factory('ReportEstadoCuentasClientesPaginador', ['$resource', function ($resource) {
		return $resource(restServer + "reportes/estado-cuentas-clientes/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/cuentas-liquidadas/:cuentas_liquidadas");
	}])
	.factory('ReporteClientesPaginador', ['ReportEstadoCuentasClientesPaginador', '$q', function (ReportEstadoCuentasClientesPaginador, $q) {
		var res = function (paginator) {
			var delay = $q.defer();
			ReportEstadoCuentasClientesPaginador.get({
				id_empresa: paginator.filter.empresa,
				pagina: paginator.currentPage,
				items_pagina: paginator.itemsPerPage,
				texto_busqueda: paginator.search,
				cuentas_liquidadas: paginator.filter.cuentas_liquidadas
			}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('ReportEstadoCuentasClientesMantenimiento', ['$resource', function ($resource) {
		return $resource(restServer + "reportes-mantenimiento/estado-cuentas-clientes/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/cuentas-liquidadas/:cuentas_liquidadas");
	}])
	.factory('ReporteClientesMantenimientoPaginador', ['ReportEstadoCuentasClientesMantenimiento', '$q', function (ReportEstadoCuentasClientesMantenimiento, $q) {
		var res = function (paginator) {
			var delay = $q.defer();
			ReportEstadoCuentasClientesMantenimiento.get({
				id_empresa: paginator.filter.empresa,
				pagina: paginator.currentPage,
				items_pagina: paginator.itemsPerPage,
				texto_busqueda: paginator.search,
				cuentas_liquidadas: paginator.filter.cuentas_liquidadas
			}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('ReporteLibroVentas', ['$resource', function ($resource) {
		return $resource(restServer + "reportes/libro-ventas/:id_empresa/gestion/:gestion/mes/:mes/movimiento/:id_movimiento");
	}])

	.factory('ReporteLibroVentasDatos', ['ReporteLibroVentas', '$q', function (ReporteLibroVentas, $q) {
		var res = function (id_empresa, gestion, mes, idMov) {
			if (!idMov) {
				idMov = 0
			}
			var delay = $q.defer();
			ReporteLibroVentas.get({ id_empresa: id_empresa, gestion: gestion, mes: mes, id_movimiento: idMov }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('InventarioCosto', ['$resource', function ($resource) {
		return $resource(restServer + "reportes/inventario/empresa/:id_empresa/sucursal/:id_sucursal/almacen/:id_almacen", null,
			{

				'update': { method: 'PUT' }
			});
	}])

	.factory('InventariosCosto', ['InventarioCosto', '$q', function (InventarioCosto, $q) {
		var res = function (id_empresa, id_sucursal, id_almacen) {
			var delay = $q.defer();
			InventarioCosto.query({ id_empresa: id_empresa, id_sucursal: id_sucursal, id_almacen: id_almacen }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('InventarioAlmacenPaginador', ['$resource', function ($resource) {
		return $resource(restServer + "reportes/empresa/:id_empresa/sucursal/:id_sucursal/almacen/:id_almacen/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/user/:id_usuario");
	}])

	.factory('InventarioPaginadorAlmacen', ['InventarioAlmacenPaginador', '$q', function (InventarioAlmacenPaginador, $q) {
		var res = function (idEmpresa, idSucursal, idAlmacen, pagina, itemsPagina, texto, columna, direccion, id_usuario) {
			var delay = $q.defer();
			InventarioAlmacenPaginador.get({ id_empresa: idEmpresa, id_sucursal: idSucursal, id_almacen: idAlmacen, pagina: pagina, items_pagina: itemsPagina, texto_busqueda: texto, columna: columna, direccion: direccion, id_usuario: id_usuario }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('InventarioAlmacenReporte', ['$resource', function ($resource) {
		return $resource(restServer + "reportes/empresa/:id_empresa/sucursal/:id_sucursal/almacen/:id_almacen/user/:id_usuario");
	}])

	.factory('InventarioReporteAlmacen', ['InventarioAlmacenReporte', '$q', function (InventarioAlmacenReporte, $q) {
		var res = function (idEmpresa, idSucursal, idAlmacen, id_usuario) {
			var delay = $q.defer();
			InventarioAlmacenReporte.get({ id_empresa: idEmpresa, id_sucursal: idSucursal, id_almacen: idAlmacen, id_usuario: id_usuario }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('ReporteVentasMensuales', ['$resource', function ($resource) {
		return $resource(restServer + "reportes/ventas-mensuales/:id_empresa/sucursal/:id_sucursal/inicio/:inicio/fin/:fin");
	}])

	.factory('ReporteVentasMensualesDatos', ['ReporteVentasMensuales', '$q', function (ReporteVentasMensuales, $q) {
		var res = function (id_empresa, id_sucursal, inicio, fin) {
			var delay = $q.defer();
			ReporteVentasMensuales.get({ id_empresa: id_empresa, id_sucursal: id_sucursal, inicio: inicio, fin: fin }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('ReporteVentasMensualesExcel', ['$resource', function ($resource) {
		return $resource(restServer + "reportes-excel/ventas-mensuales/:id_empresa/sucursal/:id_sucursal/inicio/:inicio/fin/:fin");
	}])

	.factory('ReporteVentasMensualesDatosExcel', ['ReporteVentasMensualesExcel', '$q', function (ReporteVentasMensualesExcel, $q) {
		var res = function (id_empresa, id_sucursal, inicio, fin) {
			var delay = $q.defer();
			ReporteVentasMensualesExcel.get({ id_empresa: id_empresa, id_sucursal: id_sucursal, inicio: inicio, fin: fin }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('ReporteComprasMensuales', ['$resource', function ($resource) {
		return $resource(restServer + "reportes/compras-mensuales/:id_empresa/sucursal/:id_sucursal/inicio/:inicio/fin/:fin");
	}])

	.factory('ReporteComprasMensualesDatos', ['ReporteComprasMensuales', '$q', function (ReporteComprasMensuales, $q) {
		var res = function (id_empresa, id_sucursal, inicio, fin) {
			var delay = $q.defer();
			ReporteComprasMensuales.get({ id_empresa: id_empresa, id_sucursal: id_sucursal, inicio: inicio, fin: fin }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('ReporteEstadoResultadosNoContable', ['$resource', function ($resource) {
		return $resource(restServer + "ventas/:id_empresa/inicio/:inicio/fin/:fin/:sucursal", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('ReporteEstadoResultadosNoContableDatos', ['ReporteEstadoResultadosNoContable', '$q', function (ReporteEstadoResultadosNoContable, $q) {
		var res = function (id_empresa, inicio, fin, sucursal) {
			var delay = $q.defer();
			ReporteEstadoResultadosNoContable.get({ 
				id_empresa,
				inicio: inicio ? inicio : 0,
				fin: fin ? fin : 0,
				sucursal: sucursal ? sucursal.id: 0
			 }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('CompensacionDeuda', ['$resource', function ($resource) {
		return $resource(restServer + "anticipo/venta/:id_venta", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('GuardarCompensacionDeuda', ['CompensacionDeuda', '$q', function (CompensacionDeuda, $q) {
		var res = function (idVenta, pago) {
			var delay = $q.defer();
			CompensacionDeuda.save({ id_venta: idVenta }, { pago: pago }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	
	.factory('ReporteLibroCompras', ['$resource', function ($resource) {
		return $resource(restServer + "/reportes/libro-compras/:id_empresa/gestion/:gestion/mes/:mes/concepto/:id_concepto/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion");
	}])

	.factory('ReporteLibroComprasDatos', ['ReporteLibroCompras', '$q', function (ReporteLibroCompras, $q) {
		var res = function (id_empresa, paginator) {
			var delay = $q.defer();
			ReporteLibroCompras.get({
				id_empresa: id_empresa,
				gestion: paginator.filter.gestion,
				mes: paginator.filter.mes.split('-')[0],
				id_concepto: paginator.filter.conceptoMoviviento ? paginator.filter.conceptoMoviviento.id : 0,
				pagina: paginator.currentPage ? paginator.currentPage : 1,
				items_pagina: paginator.itemsPerPage,
				texto_busqueda: paginator.search,
				columna: paginator.column ? paginator.column : 'fecha',
				direccion: paginator.direction ? paginator.direction : 'asc'
			}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	
	.factory('DatosImpresionReportes', ['$resource', function ($resource) {
		return $resource(restServer + "/reportes/libro-compras/:id_empresa/gestion/:gestion/mes/:mes/conceptos/:conceptos");
	}])

	.factory('ObtenerDatosImpresionReportes', ['DatosImpresionReportes', '$q', function (DatosImpresionReportes, $q) {
		var res = function (data) {
			var delay = $q.defer();
			DatosImpresionReportes.get({
				id_empresa: data.id_empresa,
				gestion: data.gestion,
				mes: data.mes.split('-')[0],
				conceptos: data.conceptos ? data.conceptos : [21,17707]
			}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('rendicionesCajaChicaReportes', ['$resource', function ($resource) {
		return $resource(restServer + "reportes/rendicion/verificado/:id_empresa/:gestion/:mes/:desde/:hasta", {}, {
			show: { method: 'GET', isArray: true }
		})
	}])
	.factory('obtenerRendicionesCajaChica', ['rendicionesCajaChicaReportes', '$q', function (rendicionesCajaChicaReportes, $q) {
		var res = function (id_empresa, desde, hasta) {
			var delay = $q.defer();
			rendicionesCajaChicaReportes.get({ id_empresa: id_empresa, gestion: 0, mes: 0, desde: (desde ? desde : 0), hasta: (hasta ? hasta : 0) }, {}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('ReporteComprasTablasDinamicas', ['$resource', function ($resource) {
		return $resource(restServer + "reportes-tablasDinamicas/compras-mensuales/:id_empresa/sucursal/:id_sucursal/inicio/:inicio/fin/:fin");
	}])

	.factory('ReporteComprasDatosTablasDinamicas', ['ReporteComprasTablasDinamicas', '$q', function (ReporteComprasTablasDinamicas, $q) {
		var res = function (id_empresa, id_sucursal, inicio, fin) {
			var delay = $q.defer();
			ReporteComprasTablasDinamicas.get({ id_empresa: id_empresa, id_sucursal: id_sucursal, inicio: inicio, fin: fin }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RutaReportEstadoCuentasClienteDetalles', ['$resource', function ($resource) {
		return $resource(restServer + "reportes-mantenimiento/estado-cuentas-clientes/detalles/:id_cliente/liquidados/:liquidados");
	}])
	.factory('ReporteClienteMantenimientoDetalles', ['RutaReportEstadoCuentasClienteDetalles', '$q', function (RutaReportEstadoCuentasClienteDetalles, $q) {
		var res = function (id_cliente, liquidados) {
			var delay = $q.defer();
			RutaReportEstadoCuentasClienteDetalles.get({
				id_cliente: id_cliente,
				liquidados: liquidados
			}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

/* LISTA DE CLIENTES CON PROFORMAS */
	.factory('rutaListaProformaReporte', ['$resource', function ($resource) {
		return $resource(restServer + "lista-proformas-reporte/clienta/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/liquidados/:liquidados");// 
	}])
	.factory('listaProformaReporte', ['rutaListaProformaReporte', '$q', function (rutaListaProformaReporte, $q) {
		var res = function (datos) {
			var delay = $q.defer();
			rutaListaProformaReporte.get({
				id_empresa: datos.filter.id_empresa,
				pagina: datos.currentPage,
				items_pagina: datos.itemsPerPage,
				texto_busqueda: datos.search,
				liquidados: datos.filter.liquidados
			}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
/* LISTA DE DETALLE DE PROFORMA POR CLIENTE */
	.factory('rutaListaProformaDetalle', ['$resource', function ($resource) {
		return $resource(restServer + "lista-proformas-detalle/clienta/:id_cliente/liquidados/:liquidados/empresa/:id_empresa");// 
	}])
	.factory('ReporteClienteProformaDetalles', ['rutaListaProformaDetalle', '$q', function (rutaListaProformaDetalle, $q) {
		var res = function (id_cliente, liquidados, id_empresa) {
			var delay = $q.defer();
			rutaListaProformaDetalle.get({
				id_cliente: id_cliente,
				liquidados: liquidados,
				id_empresa: id_empresa
			}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	/* LISTA DE DETALLE DE TRANSACCION POR PROFORMA */
	.factory('rutaListaProformaDetTransac', ['$resource', function ($resource) {
		return $resource(restServer + "lista-proformas-detalle-transaccion/cliente/empresa/:id_empresa/proforma/:id_proforma");// 
	}])
	.factory('reporteClienteProformaTrans', ['rutaListaProformaDetTransac', '$q', function (rutaListaProformaDetTransac, $q) {
		var res = function (id_empresa, id_proforma) {
			var delay = $q.defer();
			rutaListaProformaDetTransac.get({
				id_empresa: id_empresa,
				id_proforma: id_proforma
			}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])


	.factory('rutaDatosProformaTransaccion', ['$resource', function ($resource) {
		return $resource(restServer + "obtener-proformas-detalle-transaccion/cliente/empresa/:id_empresa/transaccion/:id_transaccion");// 
	}])
	.factory('ObtenerDatosProformaTransaccion', ['rutaDatosProformaTransaccion', '$q', function (rutaDatosProformaTransaccion, $q) {
		var res = function (id_empresa, id_transaccion) {
			var delay = $q.defer();
			rutaDatosProformaTransaccion.get({
				id_empresa: id_empresa,
				id_transaccion: id_transaccion
			}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])


	.factory('rutaListaProformaDetallePDF', ['$resource', function ($resource) {
		return $resource(restServer + "pdf-lista-proformas-detalle/cliente/liquidados/facturados", null,
			{'update': { method: 'PUT' }});
	}])
	.factory('ReporteClienteProformaDetallesPDF', ['rutaListaProformaDetallePDF', '$q', function (rutaListaProformaDetallePDF, $q) {
		var res = function (parametros) {
			var delay = $q.defer();
			rutaListaProformaDetallePDF.save(parametros, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

