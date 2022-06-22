angular.module('agil.servicios')

	.factory('Empresa',  ['$resource',function ($resource) {
		return $resource(restServer + "empresas/:idEmpresa", { idEmpresa: '@id' },
			{
				'update': { 
					method: 'PUT'
				}
			});
	}])

	.factory('Empresas', ['Empresa', '$q', function (Empresa, $q) {
		var res = function (idEmpresa) {
			var delay = $q.defer();
			Empresa.query({ idEmpresa: idEmpresa }, function (empresas) {
				delay.resolve(empresas);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('EmpresaDatosInicio', ['Empresa', '$q', function (Empresa, $q) {
		var res = function (idEmpresa) {
			var delay = $q.defer();
			Empresa.query({ idEmpresa: idEmpresa }, function (empresas) {
				delay.resolve(empresas);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('AplicacionesSistema',  ['$resource',function ($resource) {
		return $resource(restServer + "sistema/aplicaciones", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ListaAplicacionesSistema', ['AplicacionesSistema', '$q', function (AplicacionesSistema, $q) {
		var res = function (app) {
			var delay = $q.defer();
			AplicacionesSistema.query({ app: app }, function (empresas) {
				delay.resolve(empresas);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('AplicacionesSistemaEmpresa',  ['$resource',function ($resource) {
		return $resource(restServer + "sistema/aplicaciones/empresa/:id_empresa", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ListaAplicacionesSistemaEmpresa', ['AplicacionesSistemaEmpresa', '$q', function (AplicacionesSistemaEmpresa, $q) {
		var res = function (idEmpresa) {
			var delay = $q.defer();
			AplicacionesSistemaEmpresa.query({ id_empresa: idEmpresa }, function (empresas) {
				delay.resolve(empresas);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('OpcionesIntegracionAplicacion',  ['$resource',function ($resource) {
		return $resource(restServer + "integraciones-aplicacion", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ListaOpcionesIntegracionAplicacion', ['OpcionesIntegracionAplicacion', '$q', function (OpcionesIntegracionAplicacion, $q) {
		var res = function () {
			var delay = $q.defer();
			OpcionesIntegracionAplicacion.query(function (datos) {
				delay.resolve(datos);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('OpcionesIntegracionAplicacionEmpresa',  ['$resource',function ($resource) {
		return $resource(restServer + "integraciones-empresa-aplicacion/:id_empresa", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ListaOpcionesIntegracionAplicacionEmpresa', ['OpcionesIntegracionAplicacionEmpresa', '$q', function (OpcionesIntegracionAplicacionEmpresa, $q) {
		var res = function (idEmpresa) {
			var delay = $q.defer();
			OpcionesIntegracionAplicacionEmpresa.query({id_empresa:idEmpresa},function (datos) {
				delay.resolve(datos);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('CorrelativosEmpresa',  ['$resource',function ($resource) {
		return $resource(restServer + "correlativos/empresa/:id_empresa",null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('GuardarCorrelativosEmpresa', ['CorrelativosEmpresa', '$q', function (CorrelativosEmpresa, $q) {
		var res = function (idEmpresa,datos) {
			var delay = $q.defer();
			CorrelativosEmpresa.save({ id_empresa: idEmpresa },datos, function (empresas) {
				delay.resolve(empresas);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('ObtenerCorrelativosEmpresa', ['CorrelativosEmpresa', '$q', function (CorrelativosEmpresa, $q) {
		var res = function (idEmpresa) {
			var delay = $q.defer();
			CorrelativosEmpresa.get({ id_empresa: idEmpresa }, function (empresas) {
				delay.resolve(empresas);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('ConfiguracionIsoEmpresa', ['$resource', function ($resource) {
		return $resource(restServer + "configuracion-iso/empresa/:id_empresa/concepto/:nombre_corto", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ObtenerConfiguracionIsoEmpresa', ['ConfiguracionIsoEmpresa', '$q', function (ConfiguracionIsoEmpresa, $q) {
		var res = function (idEmpresa,nombreCorto) {
			var delay = $q.defer();
			ConfiguracionIsoEmpresa.get({ id_empresa: idEmpresa,nombre_corto:nombreCorto }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('ConfiguracionesIsoEmpresa', ['$resource', function ($resource) {
		return $resource(restServer + "configuracion-iso/empresa/:id_empresa", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ObtenerConfiguracionesIsoEmpresa', ['ConfiguracionesIsoEmpresa', '$q', function (ConfiguracionesIsoEmpresa, $q) {
		var res = function (idEmpresa) {
			var delay = $q.defer();
			ConfiguracionesIsoEmpresa.get({ id_empresa: idEmpresa }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('GuardarConfiguracionIsoEmpresa', ['ConfiguracionesIsoEmpresa', '$q', function (ConfiguracionesIsoEmpresa, $q) {
		var res = function (datos, idEmpresa) {
			var delay = $q.defer();
			ConfiguracionesIsoEmpresa.save({ id_empresa: idEmpresa }, datos, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('RutaHabilitarEstadosISOEmpresa', ['$resource', ($resource) => {
		return $resource(restServer + "habilitar/empresa-iso", {},
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ModificarEstadoISOEmpresa', ['RutaHabilitarEstadosISOEmpresa', '$q', (RutaHabilitarEstadosISOEmpresa, $q) => {
		const res = (config) => {
			const delay = $q.defer();
			RutaHabilitarEstadosISOEmpresa.save({ id: config.id, activo: config.activo, predefinido: config.predefinido }, (entidades) => {
				delay.resolve(entidades);
			}, (error) => {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('rutaEmpresaSFE', ['$resource', function ($resource) {
		return $resource(restServerSFE + "empresa/datos/:id_empresa", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ObtenerEmpresaSFE', ['rutaEmpresaSFE', '$q', function (rutaEmpresaSFE, $q) {
		var res = function (idEmpresa) {
			var delay = $q.defer();
			rutaEmpresaSFE.get({ id_empresa: idEmpresa }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	
	.factory('rutaListaCatlogosEmpresa', ['$resource', function ($resource) {
		return $resource(restServerSFE + "empresa/catalogos/lista/:id_empresa/:nit");
	}])
	.factory('ListaCatalogosEmpresa', ['rutaListaCatlogosEmpresa', '$q', function (rutaListaCatlogosEmpresa, $q) {
		var res = function (id_empresa, nit) {
			var delay = $q.defer();
			rutaListaCatlogosEmpresa.get({id_empresa: id_empresa, nit: nit }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])

	.factory('rutaListaXcatalogosEmpresa', ['$resource', function ($resource) {
		return $resource(restServerSFE + "empresa/lista/x/catalogos/:id_empresa/:accion");
	}])
	.factory('ListaXcatalogosEmpresa', ['rutaListaXcatalogosEmpresa', '$q', function (rutaListaXcatalogosEmpresa, $q) {
		var res = function (id_empresa, accion) {
			var delay = $q.defer();
			rutaListaXcatalogosEmpresa.get({id_empresa: id_empresa, accion: accion }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])
	.factory('RutaSaveCalalogos', ['$resource', ($resource) => {
		return $resource(restServerSFE + "empresa/save/catalogos/por/tipo", {},
			{ 'update': { method: 'PUT' } });
	}])
	.factory('saveCalalogos', ['RutaSaveCalalogos', '$q', (RutaSaveCalalogos, $q) => {
		const res = (lista) => {
			const delay = $q.defer();
			RutaSaveCalalogos.save(null,lista, (entidades) => {
				delay.resolve(entidades);
			}, (error) => {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('GuardarFirmaEmpresa', function ($http){
		return {
			update: function (id_empresa, docFirma){
				var data = new FormData();
				data.append('docFirma', docFirma.data, docFirma.name);
				return $http.put(restServerSFE + 'empresa/guardar/firma/'+id_empresa, data, {
					transformRequest: angular.identity,
					headers: { 'Content-Type': undefined }
				})
			}
		}

	})
