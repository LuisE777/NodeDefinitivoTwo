angular.module('agil.servicios')
.factory('ProveedorCompraComprobante',  ['$resource',function ($resource) {
	return $resource(restServer + "proveedores/comprobante/compra/empresa/:id_empresa",null,
		{
			'update': { method: 'PUT' }
		});
}])
.factory('GuardarProveedorCompraComprobante', ['ProveedorCompraComprobante', '$q', function (ProveedorCompraComprobante, $q) {
	var res = function (datos,idEmpresa) {
		var delay = $q.defer();
		ProveedorCompraComprobante.save({id_empresa:idEmpresa },datos, function (entidades) {
			delay.resolve(entidades);
		}, function (error) {
			delay.reject(error);
		});
		return delay.promise;
	};
	return res;
}])
	.factory('ContabilidadCambioMoneda',  ['$resource',function ($resource) {
		return $resource(restServer + "comprobante-contabilidad/monedaCambio/empresa/:id_empresa",null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('GuardarContabilidadCambioMoneda', ['ContabilidadCambioMoneda', '$q', function (ContabilidadCambioMoneda, $q) {
		var res = function (datos,idEmpresa) {
			var delay = $q.defer();
			ContabilidadCambioMoneda.save({id_empresa:idEmpresa },datos, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('CambioMoneda',  ['$resource',function ($resource) {
		return $resource(restServer + "comprobante-contabilidad/monedaCambio/:fecha/empresa/:id_empresa", { fecha: "@fecha",id_empresa: "@id_empresa" },
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ObtenerCambioMoneda', ['CambioMoneda', '$q', function (CambioMoneda, $q) {
		var res = function (fecha,idEmpresa) {
			var delay = $q.defer();
			CambioMoneda.get({ fecha: fecha,id_empresa:idEmpresa }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('EditarComprobanteContabilidad',  ['$resource',function ($resource) {
		return $resource(restServer + "comprobante-contabilidad-edicion/id/:id", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('EdicionComprobanteContabilidad', ['EditarComprobanteContabilidad', '$q', function (EditarComprobanteContabilidad, $q) {
		var res = function (id) {
			var delay = $q.defer();
			EditarComprobanteContabilidad.get({ id: id }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('CompraAsignadaComprobante',  ['$resource',function ($resource) {
		return $resource(restServer + "comprobante-contabilidad-edicion/compra/asiento/:id", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	
	.factory('ObtenerCompraAsignadaComprobante', ['CompraAsignadaComprobante', '$q', function (CompraAsignadaComprobante, $q) {
		var res = function (id) {
			var delay = $q.defer();
			CompraAsignadaComprobante.get({ id: id }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('CambioMonedas',  ['$resource',function ($resource) {
		return $resource(restServer + "comprobante-contabilidad/monedaCambio/mes/:mes/anio/:anio/empresa/:id_empresa");
	}])

	.factory('ListaCambioMoneda', ['CambioMonedas', '$q', function (CambioMonedas, $q) {
		var res = function (filtro,idEmpresa) {
			var delay = $q.defer();
			CambioMonedas.query({ mes: filtro.mes, anio: filtro.anio,id_empresa:idEmpresa }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	
	.factory('ActualizarCambio',  ['$resource',function ($resource) {
		return $resource(restServer + "comprobante-contabilidad/monedaCambio/:id_moneda", { id_moneda: "@id_moneda" },
		{
			'update': { method: 'PUT' }
		});
	}])

	.factory('ActualizarCambioMoneda', ['ActualizarCambio', '$q', function (ActualizarCambio, $q) {
		var res = function (moneda) {
			var delay = $q.defer();
			ActualizarCambio.update({ id_moneda: moneda.id },moneda, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('UltimaFechaTipoComp',  ['$resource',function ($resource) {
		return $resource(restServer + "ultima-fecha-comprobante/empresa/:id_empresa/tipo/:id_tipo", { id_moneda: "@id_moneda" },
		{
			'update': { method: 'PUT' }
		});
	}])

	.factory('UltimaFechaTipoComprobante', ['UltimaFechaTipoComp', '$q', function (UltimaFechaTipoComp, $q) {
		var res = function (idEmpresa,idTipo) {
			var delay = $q.defer();
			UltimaFechaTipoComp.get({ id_empresa: idEmpresa,id_tipo:idTipo }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('ImportarComprobantes',  ['$resource',function ($resource) {
		return $resource(restServer + "importar-comprobantes/usuario/:id_usuario/empresa/:id_empresa", null,
		{
			'update': { method: 'PUT' }
		});
	}])

	.factory('GuardarComprobantesImportados', ['ImportarComprobantes', '$q', function (ImportarComprobantes, $q) {
		var res = function (comprobantes,idusuario,idEmpresa) {
			var delay = $q.defer();
			var delay = $q.defer();
			ImportarComprobantes.save({id_empresa:idEmpresa, id_usuario: idusuario },comprobantes, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('ListaAsientosDeComprobantes',  ['$resource',function ($resource) {
		return $resource(restServer + "lista-asientos-contabilidad-comprobantes/empresa/:id_empresa/inicio/:inicio/fin/:fin", null,
		{
			'update': { method: 'PUT' }
		});
	}])

	.factory('DescargarListaAsientosDeComprobantes', ['ListaAsientosDeComprobantes', '$q', function (ListaAsientosDeComprobantes, $q) {
		var res = function (idEmpresa,inicio,fin) {
			var delay = $q.defer();			
			ListaAsientosDeComprobantes.get({id_empresa:idEmpresa, inicio: inicio,fin:fin }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
/* centro de costos */
	.factory('rutaComprobanteArea',  ['$resource',function ($resource) {
		return $resource(restServer + "comprobante-area/empresa/:id_empresa", null,
		{
			'update': { method: 'PUT' }
		});
	}])
	.factory('ListaComprobanteArea', ['rutaComprobanteArea', '$q', function (rutaComprobanteArea, $q) {
		var res = function (idEmpresa) {
			var delay = $q.defer();			
			rutaComprobanteArea.get({id_empresa:idEmpresa }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('GuardarAreaCosto', ['rutaComprobanteArea', '$q', function (rutaComprobanteArea, $q) {
		var res = function (datos,idEmpresa) {
			var delay = $q.defer();
			rutaComprobanteArea.save({id_empresa:idEmpresa },datos, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('rutaEliminadoComprobanteArea',  ['$resource',function ($resource) {
		return $resource(restServer + "comprobante-area-costo/eliminar", null,
		{
			'update': { method: 'PUT' }
		});
	}])
	.factory('GuardarElimAreaCosto', ['rutaEliminadoComprobanteArea', '$q', function (rutaEliminadoComprobanteArea, $q) {
		var res = function (datos) {
			var delay = $q.defer();
			rutaEliminadoComprobanteArea.save(datos, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('rutaComprobanteCentroCosto',  ['$resource',function ($resource) {
		return $resource(restServer + "comprobante-CentroCosto/empresa/:id_empresaa", null,
		{
			'update': { method: 'PUT' }
		});
	}])
	.factory('ListaComprobanteCentroCosto', ['rutaComprobanteCentroCosto', '$q', function (rutaComprobanteCentroCosto, $q) {
		var res = function (idEmpresa) {
			var delay = $q.defer();			
			rutaComprobanteCentroCosto.get({id_empresaa:idEmpresa }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])


	.factory('rutaDetalleCentroCosto',  ['$resource',function ($resource) {
		return $resource(restServer + "comprobante-areaCentroCostos/empresa/:id_empresaa/cencos/:id_cencos", null,
		{
			'update': { method: 'PUT' }
		});
	}])
	.factory('ListaDetallCentroCosto', ['rutaDetalleCentroCosto', '$q', function (rutaDetalleCentroCosto, $q) {
		var res = function (idEmpresa, id_cencoss) {
			var delay = $q.defer();			
			rutaDetalleCentroCosto.get({id_empresaa:idEmpresa,id_cencos:id_cencoss}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('rutaComprobanteCentroCostoArea',  ['$resource',function ($resource) {
		return $resource(restServer + "comprobante-centro-costo", null,
		{
			'update': { method: 'PUT' }
		});
	}])
	.factory('GuardarCentroCosto', ['rutaComprobanteCentroCostoArea', '$q', function (rutaComprobanteCentroCostoArea, $q) {
		var res = function (datos) {
			var delay = $q.defer();
			rutaComprobanteCentroCostoArea.save(datos, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('rutaComprobanteCentroCostoAreaMofic',  ['$resource',function ($resource) {
		return $resource(restServer + "comprobante-centro-costoModif", null,
		{
			'update': { method: 'PUT' }
		});
	}])
	.factory('ModificarCentroCosto', ['rutaComprobanteCentroCostoAreaMofic', '$q', function (rutaComprobanteCentroCostoAreaMofic, $q) {
		var res = function (datos) {
			var delay = $q.defer();
			rutaComprobanteCentroCostoAreaMofic.save(datos, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('rutaEliminadoComprobanteCentroCosto',  ['$resource',function ($resource) {
		return $resource(restServer + "comprobante-centro-costo/eliminar", null,
		{
			'update': { method: 'PUT' }
		});
	}])
	.factory('elimCentroCosto', ['rutaEliminadoComprobanteCentroCosto', '$q', function (rutaEliminadoComprobanteCentroCosto, $q) {
		var res = function (datos) {
			var delay = $q.defer();
			rutaEliminadoComprobanteCentroCosto.save(datos, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('rutaTikComprobanteCentroCosto',  ['$resource',function ($resource) {
		return $resource(restServer + "comprobante-centro-costo/tik", null,
		{
			'update': { method: 'PUT' }
		});
	}])
	.factory('tikCentroCosto', ['rutaTikComprobanteCentroCosto', '$q', function (rutaTikComprobanteCentroCosto, $q) {
		var res = function (datos) {
			var delay = $q.defer();
			rutaTikComprobanteCentroCosto.save(datos, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])


	.factory('ListaCentroCostoTablaDinam',  ['$resource',function ($resource) {
		return $resource(restServer + "lista-centro-costos-tablas/empresa/:id_empresa/gestion/:gestion/mes/:mes", null,
		{
			'update': { method: 'PUT' }
		});
	}])
	.factory('ListaCentroCostoTablaDinamicas', ['ListaCentroCostoTablaDinam', '$q', function (ListaCentroCostoTablaDinam, $q) {
		var res = function (idEmpresa,gestion,mes) {
			var delay = $q.defer();			
			ListaCentroCostoTablaDinam.get({id_empresa:idEmpresa,gestion:gestion,mes:mes?mes:0}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])


	.factory('ListaProformaTablaDinam',  ['$resource',function ($resource) {
		return $resource(restServer + "lista-proformas-tablas/empresa/:id_empresa/gestion/:gestion/mes/:mes", null,
		{
			'update': { method: 'PUT' }
		});
	}])
	.factory('ListaProformaTablaDinamicas', ['ListaProformaTablaDinam', '$q', function (ListaProformaTablaDinam, $q) {
		var res = function (idEmpresa,gestion,mes) {
			var delay = $q.defer();			
			ListaProformaTablaDinam.get({id_empresa:idEmpresa,gestion:gestion,mes:mes?mes:0}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('ListaCostosTablaDinam',  ['$resource',function ($resource) {
		return $resource(restServer + "lista-costos-tablas/empresa/:id_empresa/gestion/:gestion/mes/:mes", null,
		{
			'update': { method: 'PUT' }
		});
	}])
	.factory('ListaCostosTablaDinamicas', ['ListaCostosTablaDinam', '$q', function (ListaCostosTablaDinam, $q) {
		var res = function (idEmpresa,gestion,mes) {
			var delay = $q.defer();			
			ListaCostosTablaDinam.get({id_empresa:idEmpresa,gestion:gestion,mes:mes?mes:0}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('GuardarCompraComprobanteVerificada',  ['$resource', ($resource) => {
		return $resource(restServer + "comprobante-contabilidad/compra/verificada/empresa/:id_empresa",null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('GuardarVerificacionCompraComprobante', ['GuardarCompraComprobanteVerificada', '$q',  (GuardarCompraComprobanteVerificada, $q) => {
		const res =  (idEmpresa,compra) => {
			const delay = $q.defer();			
			GuardarCompraComprobanteVerificada.save({id_empresa:idEmpresa},compra,  (entidades) => {
				delay.resolve(entidades);
			},  (error) => {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])