angular.module('agil.servicios')

	.factory('Tipo', ['$resource', function ($resource) {
		return $resource(restServer + "tipos/:nombre_corto");
	}])

	.factory('ClasesTipo', ['Tipo', '$q', 'IndexDbClasesTipo','IndexDbSaveClasesTipo', '$window', function (Tipo, $q, IndexDbClasesTipo,IndexDbSaveClasesTipo, $window) {
		const res = function (nombre_corto) {
			const online = $window.navigator.onLine;
			if(!online){
				return IndexDbClasesTipo(nombre_corto);
			}
			const delay = $q.defer();
			Tipo.get({ nombre_corto: nombre_corto }, function (entidad) {
				IndexDbSaveClasesTipo(entidad);
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('ClaseNombre', ['$resource', function ($resource) {
		return $resource(restServer + "clase/:nombre");
	}])

	.factory('ClaseTexto', ['ClaseNombre', '$q','$window', function (ClaseNombre, $q,  $window) {
		const res = function (nombre) {
			const online = $window.navigator.onLine;
			if(!online){
			//	return IndexDbClaseTexto(nombre);
			}
		const delay = $q.defer();
			ClaseNombre.get({ nombre: nombre }, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('Clase', ['$resource', function ($resource) {
		return $resource(restServer + "clases/:nombre_corto");
	}])

	.factory('Clases', ['Clase', '$q', '$window', function (Clase, $q, $window) {
		const res = function (nombre_corto) {
			const online = $window.navigator.onLine;
			if(!online){
				return []
			}
			const delay = $q.defer();
			Clase.query({ nombre_corto: nombre_corto }, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('ClaseEmpresa', ['$resource', function ($resource) {
		return $resource(restServer + "clases/:nombre_corto/:id_empresa");
	}])
	.factory('ClasesEmpresa', ['ClaseEmpresa', '$q','$window', function (ClaseEmpresa, $q,  $window) {
		const res = function (nombre_corto, id_empresa) {
			const online = $window.navigator.onLine;
			if(!online){
				return []
			}
			const delay = $q.defer();
			ClaseEmpresa.query({ nombre_corto: nombre_corto, id_empresa: id_empresa }, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('ClaseHijoEmpresa', ['$resource', function ($resource) {
		return $resource(restServer + "tipos/empresa/:id_empresa/padre/:id_padre");
	}])
	.factory('ClasesTipoHijosEmpresa', ['ClaseHijoEmpresa', '$q', function (ClaseHijoEmpresa, $q) {
		const res = function (id_padre, id_empresa) {
			const delay = $q.defer();
			ClaseHijoEmpresa.get({ id_padre: id_padre, id_empresa: id_empresa }, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('Pais', ['$resource', function ($resource) {
		return $resource(restServer + "paises/:nombre_corto");
	}])
	.factory('Pais', ['$resource', function ($resource) {
		return $resource(restServer + "paises/:nombre_corto");
	}])

	.factory('Paises', ['Pais', '$q', function (Pais, $q) {
		const res = function (nombre_corto) {
			const delay = $q.defer();
			Pais.query({ nombre_corto: nombre_corto }, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('Tipos', ['$resource', function ($resource) {
		return $resource(restServer + "tipos/:id_tipo", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('ListaTipos', ['Tipos', '$q', function (Tipos, $q) {
		const res = function () {
			const delay = $q.defer();
			Tipos.query(function (entities) {
				delay.resolve(entities);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('TiposEmpresa', ['$resource', function ($resource) {
		return $resource(restServer + "tipos/empresa/:id_empresa", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('ListaTiposEmpresa', ['TiposEmpresa', '$q', function (TiposEmpresa, $q) {
		const res = function (id_empresa) {
			const delay = $q.defer();
			TiposEmpresa.query({ id_empresa: id_empresa }, function (entities) {
				delay.resolve(entities);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('VencimientosCreditosCantidadRuta', ['$resource', function ($resource) {
		return $resource(restServer + "alertas/vencimientos-creditos/cantidad/:id_empresa");
	}])
	.factory('alertasCreditosVentaCantidad', ['VencimientosCreditosCantidadRuta', '$q', function (VencimientosCreditosCantidadRuta, $q) {
		const res = function (id_empresa) {
			const delay = $q.defer();
			VencimientosCreditosCantidadRuta.get({ id_empresa: id_empresa }, function (entities) {
				delay.resolve(entities);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('VencimientoCreditoEmpresa', ['$resource', function ($resource) {
		return $resource(restServer + "vencimientos-creditos/:id_empresa");
	}])

	.factory('VencimientosCreditosEmpresa', ['VencimientoCreditoEmpresa', '$q', function (VencimientoCreditoEmpresa, $q) {
		const res = function (id_empresa) {
			const delay = $q.defer();
			VencimientoCreditoEmpresa.query({ id_empresa: id_empresa }, function (entities) {
				delay.resolve(entities);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('VentasComprobantesCantidadRuta', ['$resource', function ($resource) {
		return $resource(restServer + "alertas/ventas/cantidad/:id_empresa");
	}])
	.factory('alertasVentasCantidad', ['VentasComprobantesCantidadRuta', '$q', function (VentasComprobantesCantidadRuta, $q) {
		const res = function (id_empresa) {
			const delay = $q.defer();
			VentasComprobantesCantidadRuta.get({ id_empresa: id_empresa }, function (entities) {
				delay.resolve(entities);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('VentasComprobantes', ['$resource', function ($resource) {
		return $resource(restServer + "ventas/empresa/:id_empresa/inicio/:inicio/fin/:fin/pagina/:pagina/items_pagina/:items_pagina/texto_busqueda/:texto_busqueda/columna/:columna/direccion/:direccion");
	}])
	.factory('VentasComprobantesEmpresa', ['VentasComprobantes', '$q', function (VentasComprobantes, $q) {
		const res = function (paginator) {
			const delay = $q.defer();
			VentasComprobantes.get({
				id_empresa: paginator.filter.empresa,
				inicio: paginator.filter.inicio,
				fin: paginator.filter.fin,
				pagina: paginator.currentPage,
				items_pagina: paginator.itemsPerPage,
				texto_busqueda: paginator.search,
				columna: paginator.column,
				direccion: paginator.direction,
				tipo: paginator.filter.tipo
			}, function (entities) {
				delay.resolve(entities);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('ComprasComprobantes', ['$resource', function ($resource) {
		return $resource(restServer + "compras/empresa/:id_empresa/inicio/:inicio/fin/:fin/pagina/:pagina/items_pagina/:items_pagina/texto_busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/tipo/:tipo");
	}])
	.factory('ComprasComprobantesEmpresa', ['ComprasComprobantes', '$q', function (ComprasComprobantes, $q) {
		const res = function (paginator) {
			const delay = $q.defer();
			ComprasComprobantes.get({
				id_empresa: paginator.filter.empresa,
				inicio: paginator.filter.inicio,
				fin: paginator.filter.fin,
				pagina: paginator.currentPage,
				items_pagina: paginator.itemsPerPage,
				texto_busqueda: paginator.search,
				columna: paginator.column,
				direccion: paginator.direction,
				tipo: paginator.filter.tipo
			}, function (entities) {
				delay.resolve(entities);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('alertasComprasCantidadRuta', ['$resource', function ($resource) {
		return $resource(restServer + "alertas/compras/cantidad/:id_empresa", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('alertasComprasCantidad', ['alertasComprasCantidadRuta', '$q', function (alertasComprasCantidadRuta, $q) {
		const res = function (idEmpresa) {
			const delay = $q.defer();
			alertasComprasCantidadRuta.get({
				id_empresa: idEmpresa
			}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('alertasVencimientosDeudasCantidadRuta', ['$resource', function ($resource) {
		return $resource(restServer + "alertas/vencimientos-deudas/cantidad/:id_empresa", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('alertasVencimientosDeudasCantidad', ['alertasVencimientosDeudasCantidadRuta', '$q', function (alertasVencimientosDeudasCantidadRuta, $q) {
		const res = function (idEmpresa) {
			const delay = $q.defer();
			alertasVencimientosDeudasCantidadRuta.get({
				id_empresa: idEmpresa,
			}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('VencimientoDeudaEmpresa', ['$resource', function ($resource) {
		return $resource(restServer + "vencimientos-deudas/:id_empresa/:razon_social/:factura/:desde/:hasta/:filtroFecha");
	}])
	.factory('VencimientosDeudasEmpresa', ['VencimientoDeudaEmpresa', '$q', function (VencimientoDeudaEmpresa, $q) {
		const res = function (id_empresa, filtro) {
			const delay = $q.defer();
			VencimientoDeudaEmpresa.query({
				id_empresa: id_empresa,
				razon_social: filtro ? filtro.razonSocial ? filtro.razonSocial : 0 : 0,
				factura: filtro ? filtro.factura ? filtro.factura : 0 : 0,
				desde: filtro ? filtro.desde ? filtro.desde : 0 : 0,
				hasta: filtro ? filtro.hasta ? filtro.hasta : 0 : 0,
				filtroFecha: filtro ? filtro.filtroFecha ? filtro.filtroFecha : false : false
			}, function (entities) {
				delay.resolve(entities);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('rutaProgramarPagoYmodifCompra', ['$resource', function ($resource) {
		return $resource(restServer + "ProgramarPagoYmodifCompra/modificacion-creacion");
	}])
	.factory('ProgramarPagoYmodifCompra', ['rutaProgramarPagoYmodifCompra', '$q', (rutaProgramarPagoYmodifCompra, $q) => {
		const res = (compra) => {
			const delay = $q.defer();
			rutaProgramarPagoYmodifCompra.save(compra, (entidades) => {
				delay.resolve(entidades);
			}, (error) => {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('rutaEstadoProgramPago', ['$resource', function ($resource) {
		return $resource(restServer + "listaProgrPagosEmpresa/estadoGlobal");
	}])
	.factory('estadoProgramPago', ['rutaEstadoProgramPago', '$q', function (rutaEstadoProgramPago, $q) {
		const res = function () {
			const delay = $q.defer();
			rutaEstadoProgramPago.query({
			}, function (entities) {
				delay.resolve(entities);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('rutaListaProgrPagosEmpresa', ['$resource', function ($resource) {
		return $resource(restServer + "listaProgrPagosEmpresa/:id_empresa/:razon_social/:factura/:desde/:hasta/:correlativo/:estado");
	}])
	.factory('listaProgrPagosEmpresa', ['rutaListaProgrPagosEmpresa', '$q', function (rutaListaProgrPagosEmpresa, $q) {
		const res = function (id_empresa, filtro) {
			const delay = $q.defer();
			rutaListaProgrPagosEmpresa.query({
				id_empresa: id_empresa,
				razon_social: filtro ? filtro.razonSocial ? filtro.razonSocial : 0 : 0,
				factura: filtro ? filtro.factura ? filtro.factura : 0 : 0,
				correlativo: filtro ? filtro.correlativo ? filtro.correlativo : 0 : 0,
				desde: filtro ? filtro.desde ? filtro.desde : 0 : 0,
				hasta: filtro ? filtro.hasta ? filtro.hasta : 0 : 0,
				estado: filtro ? filtro.estado ? filtro.estado.id : 0 : 0,
			}, function (entities) {
				delay.resolve(entities);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('rutaProgramarPagoAprobado', ['$resource', function ($resource) {
		return $resource(restServer + "programarPagoAprobadoCompra/aprobacion");
	}])
	.factory('programarPagoAprobado', ['rutaProgramarPagoAprobado', '$q', (rutaProgramarPagoAprobado, $q) => {
		const res = (compra) => {
			const delay = $q.defer();
			rutaProgramarPagoAprobado.save(compra, (entidades) => {
				delay.resolve(entidades);
			}, (error) => {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('rutaProgramarPagoRechazado', ['$resource', function ($resource) {
		return $resource(restServer + "programarPagoRechazarCompra/rechazar");
	}])
	.factory('programarPagoRechazado', ['rutaProgramarPagoRechazado', '$q', (rutaProgramarPagoRechazado, $q) => {
		const res = (compra) => {
			const delay = $q.defer();
			rutaProgramarPagoRechazado.save(compra, (entidades) => {
				delay.resolve(entidades);
			}, (error) => {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('rutaListaCompraPrograPagoImpres', ['$resource', function ($resource) {
		return $resource(restServer + "ListaCompraPrograPagoImpresion/programacionCompra");
	}])
	.factory('listaCompraPrograPagoImpres', ['rutaListaCompraPrograPagoImpres', '$q', (rutaListaCompraPrograPagoImpres, $q) => {
		const res = (compra) => {
			const delay = $q.defer();
			rutaListaCompraPrograPagoImpres.save(compra, (entidades) => {
				delay.resolve(entidades);
			}, (error) => {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('TipoEmpresa', ['$resource', function ($resource) {
		return $resource(restServer + "tipos/:nombre_corto/empresa/:id_empresa");
	}])

	.factory('ListaTiposNombreEmpresa', ['$resource', function ($resource) {
		return $resource(restServer + "tipos-lista/:nombre_corto/empresa/:id_empresa");
	}])

	.factory('ClasesTiposListaEmpresa', ['ListaTiposNombreEmpresa', '$q', function (ListaTiposNombreEmpresa, $q) {
		const res = function (nombre_corto, idEmpresa) {
			const delay = $q.defer();
			ListaTiposNombreEmpresa.get({ nombre_corto: nombre_corto, id_empresa: idEmpresa }, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('ClasesTipoEmpresa', ['TipoEmpresa', '$q', function (TipoEmpresa, $q) {
		const res = function (nombre_corto, idEmpresa) {
			const delay = $q.defer();
			TipoEmpresa.get({ nombre_corto: nombre_corto, id_empresa: idEmpresa }, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('ListaHerenciasTipo', ['$resource', function ($resource) {
		return $resource(restServer + "tipos-herencia/empresa/:id_empresa");
	}])

	.factory('OtenerListaHerenciasTipo', ['ListaHerenciasTipo', '$q', function (ListaHerenciasTipo, $q) {
		const res = function (idEmpresa) {
			const delay = $q.defer();
			ListaHerenciasTipo.get({ id_empresa: idEmpresa ? idEmpresa : 0 }, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('ListaHerenciaClasesTipo', ['$resource', function ($resource) {
		return $resource(restServer + "clases-tipo-herencia/tipo/:id_tipo");
	}])

	.factory('ListaHerenciaClasesoo', ['$resource', function ($resource) {
		return $resource(restServer + "heredados-clases/:id_padre", { id_padre: '@id_padre' });
	}])

	.factory('ObtenerListaHerenciaClases', ['ListaHerenciaClasesoo', '$q', function (ListaHerenciaClasesoo, $q) {
		const res = (padre) => {
			const delay = $q.defer();
			ListaHerenciaClasesoo.get({ id_padre: padre }, {}, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('ObtenerListaHerenciaClasesTipo', ['ListaHerenciaClasesTipo', '$q', function (ListaHerenciaClasesTipo, $q) {
		const res = function (idTipo) {
			const delay = $q.defer();
			ListaHerenciaClasesTipo.get({ id_tipo: idTipo }, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('ClaseHijoEmpresaRuta', ['$resource', function ($resource) {
		return $resource(restServer + "tipos-padre/empresa/:id_empresa/padre/:id_padre");
	}])
	.factory('ClasesTipoHijosPadresEmpresa', ['ClaseHijoEmpresaRuta', '$q', function (ClaseHijoEmpresaRuta, $q) {
		const res = function (id_padre, id_empresa) {
			const delay = $q.defer();
			ClaseHijoEmpresaRuta.get({ id_padre: id_padre, id_empresa: id_empresa }, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('TipoMantenimiento', ['$resource', function ($resource) {
		return $resource(restServer + "mantenimiento/especialidades/nombre_corto/:nombre_corto/empresa/:id_empresa/sucursal/:id_sucursal");
	}])
	.factory('ClasesMantenimientoSucursal', ['TipoMantenimiento', '$q', function (TipoMantenimiento, $q) {
		const res = function (nombre_corto, id_empresa, id_sucursal) {
			const delay = $q.defer();
			TipoMantenimiento.get({ nombre_corto: nombre_corto, id_empresa: id_empresa, id_sucursal: id_sucursal }, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	//OBTENER SISTEMAS
	.factory('MantenimientoSistemas', ['$resource', function ($resource) {
		return $resource(restServer + "mantenimiento/sistemas/id_padre/:id_padre/busqueda/:busqueda");
	}])
	.factory('ObtenerSistemas', ['MantenimientoSistemas', '$q', function (MantenimientoSistemas, $q) {
		const res = function (id_padre, busqueda) {
			const delay = $q.defer();
			MantenimientoSistemas.get({ id_padre: id_padre, busqueda: busqueda ? busqueda : 0 }, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	//OBTENER ESPECIALIDADES
	.factory('MantenimientoEspecialidades', ['$resource', function ($resource) {
		return $resource(restServer + "mantenimiento/especialidades/nombre_corto/:nombre_corto/busqueda/:busqueda/empresa/:empresa");
	}])
	.factory('ObtenerEspecialidades', ['MantenimientoEspecialidades', '$q', function (MantenimientoEspecialidades, $q) {
		const res = function (nombre_corto, busqueda, empresa) {
			const delay = $q.defer();
			MantenimientoEspecialidades.get({ nombre_corto: nombre_corto, busqueda: busqueda ? busqueda : 0, empresa: empresa }, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	//OBTENER PRECIOS DE LAS ESPECIALIDADES
	.factory('MantenimientoPrecios', ['$resource', function ($resource) {
		return $resource(restServer + "mantenimiento/precios/nombre_corto/:nombre_corto/busqueda/:busqueda/empresa/:empresa");
	}])
	.factory('ObtenerPreciosEspecialidad', ['MantenimientoPrecios', '$q', function (MantenimientoPrecios, $q) {
		const res = function (nombre_corto, busqueda, empresa) {
			const delay = $q.defer();
			MantenimientoPrecios.get({ nombre_corto: nombre_corto, busqueda: busqueda ? busqueda : 0, empresa: empresa }, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RutaCargosEmpresa', ['$resource', function ($resource) {
		return $resource(restServer + "cargos-empresa/empresa/:id_empresa");
	}])

	.factory('CargosEmpresa', ['RutaCargosEmpresa', '$q', function (RutaCargosEmpresa, $q) {
		const res = function (idEmpresa) {
			const delay = $q.defer();
			RutaCargosEmpresa.get({ id_empresa: idEmpresa }, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RutaTipoEmpresa', ['$resource', function ($resource) {
		return $resource(restServer + "tipos-empresa/:nombre_corto/empresa/:id_empresa");
	}])

	.factory('GetTipoClasesEmpresa', ['RutaTipoEmpresa', '$q', function (RutaTipoEmpresa, $q) {
		const res = function (nombre_corto, idEmpresa) {
			const delay = $q.defer();
			RutaTipoEmpresa.get({ nombre_corto: nombre_corto, id_empresa: idEmpresa }, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

