angular.module('agil.servicios')

	.factory('Sucursal', ['$resource', function ($resource) {
		return $resource(restServer + "sucursales/:idSucursal", { idSucursal: '@id' },
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('Sucursalupdate', ['$resource', function ($resource) {
		return $resource(restServer + "configuracion/factura/sucursal/:idSucursal", { idSucursal: '@id' },
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ConfiguracionFacturaSucursal', ['$resource', function ($resource) {
		return $resource(restServer + "sucursal/:idSucursal", { idSucursal: '@id' },
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('SucursalesEmpresa', ['$resource', function ($resource) {
		return $resource(restServer + "sucursales/empresa/:idEmpresa");
	}])

	.factory('Sucursales', ['SucursalesEmpresa', '$q', function (SucursalesEmpresa, $q) {
		var res = function (idEmpresa) {
			var delay = $q.defer();
			SucursalesEmpresa.query({ idEmpresa: idEmpresa }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('Sucursalesupdate', ['$resource', function ($resource) {
		return $resource(restServer + "configuracion/factura/sucursales/empresa/:id_empresa", { id_empresa: '@id_empresa' },
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('VerificarCorrelativosSucursale', ['Sucursalesupdate', '$q', function (Sucursalesupdate, $q) {
		var res = function (idEmpresa) {
			var delay = $q.defer();
			Sucursalesupdate.query({ id_empresa: idEmpresa }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('ReiniciarCorrelativo', ['$resource', function ($resource) {
		return $resource(restServer + "reiniciar-correlativo/sucursales", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('ReiniciarCorrelativoSucursales', ['ReiniciarCorrelativo', '$q', function (ReiniciarCorrelativo, $q) {
		var res = function (datos) {
			var delay = $q.defer();
			ReiniciarCorrelativo.update(datos, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('ConfiguracionIso', ['$resource', function ($resource) {
		return $resource(restServer + "configuracion-iso/sucursal/:id_sucursal", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ObtenerConfiguracionIso', ['ConfiguracionIso', '$q', function (ConfiguracionIso, $q) {
		var res = function (idSucursal) {
			var delay = $q.defer();
			ConfiguracionIso.get({ id_sucursal: idSucursal }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('GuardarConfiguracionIso', ['ConfiguracionIso', '$q', function (ConfiguracionIso, $q) {
		var res = function (datos, idSucursal) {
			var delay = $q.defer();
			ConfiguracionIso.save({ id_sucursal: idSucursal }, datos, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('HabilitacionSucursales', ['$resource', ($resource) => {
		return $resource(restServer + "habilitacion/sucursal", {},
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('SucursalHabilitacion', ['HabilitacionSucursales', '$q', (HabilitacionSucursales, $q) => {
		const res = (empresa, sucursal, activo) => {
			const delay = $q.defer();
			HabilitacionSucursales.save({ id_sucursal: sucursal, id_empresa: empresa, activo: activo }, (entidades) => {
				delay.resolve(entidades);
			}, (error) => {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RutaHabilitarEstadosISO', ['$resource', ($resource) => {
		return $resource(restServer + "habilitar/sucursal-iso", {},
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ModificarEstadoISO', ['RutaHabilitarEstadosISO', '$q', (RutaHabilitarEstadosISO, $q) => {
		const res = (config) => {
			const delay = $q.defer();
			RutaHabilitarEstadosISO.save({ id: config.id, activo: config.activo, predefinido: config.predefinido }, (entidades) => {
				delay.resolve(entidades);
			}, (error) => {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('TiposMantenimiento', ['$resource', function ($resource) {
		return $resource(restServer + "sucursal/mantenimiento/correlativos/:id_sucursal", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ObtenerTiposManteniminetoSucursal', ['TiposMantenimiento', '$q', function (TiposMantenimiento, $q) {
		var res = function (idSucursal) {
			var delay = $q.defer();
			TiposMantenimiento.get({ id_sucursal: idSucursal }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('GuardarCorrelativosOt', ['TiposMantenimiento', '$q', (TiposMantenimiento, $q) => {
		const res = (configs) => {
			const delay = $q.defer();
			TiposMantenimiento.save({id_sucursal: configs[0].id_sucursal}, {tipos:configs}, (entidades) => {
				delay.resolve(entidades);
			}, (error) => {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RutaHabilitarSFE', ['$resource', function ($resource) {
		return $resource(restServerSFE + "sucursal/", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('HabilitarSFE', ['RutaHabilitarSFE', '$q', function (RutaHabilitarSFE, $q) {
		var res = function (sucursal) {
			var delay = $q.defer();
			RutaHabilitarSFE.save({sucursal:sucursal.id, idEmpresa:sucursal.id_empresa, codigoSucursal: sucursal.numero, activo: sucursal.activo ,nombre:sucursal.nombre}, function (entidades) {
				delay.resolve(entidades);	
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('SucursalSFE', ['$resource', function ($resource) {
		return $resource(restServer + "facturacion-electronica/sucursal/:id_sucursal", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('ActualizarSucursalSFE', ['SucursalSFE', '$q', function (SucursalSFE, $q) {
		var res = function ( id_sucursal ) {
			var delay = $q.defer();
			SucursalSFE.update( { id_sucursal }, null, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RutaObtenerCatalogosSucursal', ['$resource', function ($resource) {
		return $resource(restServerSFE + "sucursal/:id_empresa", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ObtenerCatalogosSucursal', ['RutaObtenerCatalogosSucursal', '$q', function (RutaObtenerCatalogosSucursal, $q) {
		var res = function (idEmpresa) {
			var delay = $q.defer();
			RutaObtenerCatalogosSucursal.get({ id_empresa: idEmpresa }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RutaObtenerCatalogoActividades', ['$resource', function ($resource) {
		return $resource(restServerSFE + "sucursal/actividades/:id_empresa/:id_sucursal", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ObtenerCatalogoActividades', ['RutaObtenerCatalogoActividades', '$q', function (RutaObtenerCatalogoActividades, $q) {
		var res = function (idEmpresa,id_sucursal) {
			var delay = $q.defer();
			RutaObtenerCatalogoActividades.get({ id_empresa: idEmpresa, id_sucursal:id_sucursal }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RutaActualizarActividades', ['$resource', function ($resource) {
		return $resource(restServerSFE + "sucursal/actividades/:id_empresa/:id_sucursal", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ActualizarActividades', ['RutaActualizarActividades', '$q', function (RutaActualizarActividades, $q) {
		var res = function (sucursal, data) {
			var delay = $q.defer();
			RutaActualizarActividades.save({ id_empresa: sucursal.id_empresa, id_sucursal:sucursal.id }, data, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])


	.factory('RutaObtenerCatalogoMotivos', ['$resource', function ($resource) {
		return $resource(restServerSFE + "sucursal/motivo-anulacion/:id_empresa/:id_sucursal", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ObtenerCatalogoMotivos', ['RutaObtenerCatalogoMotivos', '$q', function (RutaObtenerCatalogoMotivos, $q) {
		var res = function (idEmpresa,id_sucursal) {
			var delay = $q.defer();
			RutaObtenerCatalogoMotivos.get({ id_empresa: idEmpresa, id_sucursal:id_sucursal }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RutaActualizarMotivos', ['$resource', function ($resource) {
		return $resource(restServerSFE + "sucursal/motivo-anulacion/:id_empresa/:id_sucursal", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ActualizarMotivos', ['RutaActualizarMotivos', '$q', function (RutaActualizarMotivos, $q) {
		var res = function (sucursal, data) {
			var delay = $q.defer();
			RutaActualizarMotivos.save({ id_empresa: sucursal.id_empresa, id_sucursal:sucursal.id }, data, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RutaObtenerCatalogoDocumentosIdentidad', ['$resource', function ($resource) {
		return $resource(restServerSFE + "sucursal/tipo-doc-identidad/:id_empresa/:id_sucursal", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ObtenerCatalogoDocumentosIdentidad', ['RutaObtenerCatalogoDocumentosIdentidad', '$q', function (RutaObtenerCatalogoDocumentosIdentidad, $q) {
		var res = function (idEmpresa,id_sucursal) {
			var delay = $q.defer();
			RutaObtenerCatalogoDocumentosIdentidad.get({ id_empresa: idEmpresa, id_sucursal:id_sucursal }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RutaActualizarDocumentosIdentidad', ['$resource', function ($resource) {
		return $resource(restServerSFE + "sucursal/tipo-doc-identidad/:id_empresa/:id_sucursal", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ActualizarDocumentosIdentidad', ['RutaActualizarDocumentosIdentidad', '$q', function (RutaActualizarDocumentosIdentidad, $q) {
		var res = function (sucursal, data) {
			var delay = $q.defer();
			RutaActualizarDocumentosIdentidad.save({ id_empresa: sucursal.id_empresa, id_sucursal:sucursal.id }, data, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RutaObtenerCatalogoDocumentosSector', ['$resource', function ($resource) {
		return $resource(restServerSFE + "sucursal/tipo-doc-sector/:id_empresa/:id_sucursal", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ObtenerCatalogoDocumentosSector', ['RutaObtenerCatalogoDocumentosSector', '$q', function (RutaObtenerCatalogoDocumentosSector, $q) {
		var res = function (idEmpresa,id_sucursal) {
			var delay = $q.defer();
			RutaObtenerCatalogoDocumentosSector.get({ id_empresa: idEmpresa, id_sucursal:id_sucursal }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RutaActualizarDocumentosSector', ['$resource', function ($resource) {
		return $resource(restServerSFE + "sucursal/tipo-doc-sector/:id_empresa/:id_sucursal", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ActualizarDocumentosSector', ['RutaActualizarDocumentosSector', '$q', function (RutaActualizarDocumentosSector, $q) {
		var res = function (sucursal, data) {
			var delay = $q.defer();
			RutaActualizarDocumentosSector.save({ id_empresa: sucursal.id_empresa, id_sucursal:sucursal.id }, data, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RutaObtenerCatalogoTiposEmision', ['$resource', function ($resource) {
		return $resource(restServerSFE + "sucursal/tipo-emision/:id_empresa/:id_sucursal", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ObtenerCatalogoTiposEmision', ['RutaObtenerCatalogoTiposEmision', '$q', function (RutaObtenerCatalogoTiposEmision, $q) {
		var res = function (idEmpresa,id_sucursal) {
			var delay = $q.defer();
			RutaObtenerCatalogoTiposEmision.get({ id_empresa: idEmpresa, id_sucursal:id_sucursal }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('RutaActualizarTiposEmision', ['$resource', function ($resource) {
		return $resource(restServerSFE + "sucursal/tipo-emision/:id_empresa/:id_sucursal", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ActualizarTiposEmision', ['RutaActualizarTiposEmision', '$q', function (RutaActualizarTiposEmision, $q) {
		var res = function (sucursal, data) {
			var delay = $q.defer();
			RutaActualizarTiposEmision.save({ id_empresa: sucursal.id_empresa, id_sucursal:sucursal.id }, data, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RutaObtenerCatalogoTiposEventos', ['$resource', function ($resource) {
		return $resource(restServerSFE + "sucursal/tipo-evento-significativo/:id_empresa/:id_sucursal", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ObtenerCatalogoTiposEventos', ['RutaObtenerCatalogoTiposEventos', '$q', function (RutaObtenerCatalogoTiposEventos, $q) {
		var res = function (idEmpresa,id_sucursal) {
			var delay = $q.defer();
			RutaObtenerCatalogoTiposEventos.get({ id_empresa: idEmpresa, id_sucursal:id_sucursal }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RutaActualizarTiposEventos', ['$resource', function ($resource) {
		return $resource(restServerSFE + "sucursal/tipo-evento-significativo/:id_empresa/:id_sucursal", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ActualizarTiposEventos', ['RutaActualizarTiposEventos', '$q', function (RutaActualizarTiposEventos, $q) {
		var res = function (sucursal, data) {
			var delay = $q.defer();
			RutaActualizarTiposEventos.save({ id_empresa: sucursal.id_empresa, id_sucursal:sucursal.id }, data, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])


	.factory('RutaObtenerCatalogoTiposFactura', ['$resource', function ($resource) {
		return $resource(restServerSFE + "sucursal/tipo-factura/:id_empresa/:id_sucursal", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ObtenerCatalogoTiposFactura', ['RutaObtenerCatalogoTiposFactura', '$q', function (RutaObtenerCatalogoTiposFactura, $q) {
		var res = function (idEmpresa,id_sucursal) {
			var delay = $q.defer();
			RutaObtenerCatalogoTiposFactura.get({ id_empresa: idEmpresa, id_sucursal:id_sucursal }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RutaActualizarTiposFactura', ['$resource', function ($resource) {
		return $resource(restServerSFE + "sucursal/tipo-factura/:id_empresa/:id_sucursal", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ActualizarTiposFactura', ['RutaActualizarTiposFactura', '$q', function (RutaActualizarTiposFactura, $q) {
		var res = function (sucursal, data) {
			var delay = $q.defer();
			RutaActualizarTiposFactura.save({ id_empresa: sucursal.id_empresa, id_sucursal:sucursal.id }, data, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RutaObtenerCatalogoTiposHabitacion', ['$resource', function ($resource) {
		return $resource(restServerSFE + "sucursal/tipo-habitacion/:id_empresa/:id_sucursal", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ObtenerCatalogoTiposHabitacion', ['RutaObtenerCatalogoTiposHabitacion', '$q', function (RutaObtenerCatalogoTiposHabitacion, $q) {
		var res = function (idEmpresa,id_sucursal) {
			var delay = $q.defer();
			RutaObtenerCatalogoTiposHabitacion.get({ id_empresa: idEmpresa, id_sucursal:id_sucursal }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('RutaActualizarTiposHabitacion', ['$resource', function ($resource) {
		return $resource(restServerSFE + "sucursal/tipo-habitacion/:id_empresa/:id_sucursal", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ActualizarTiposHabitacion', ['RutaActualizarTiposHabitacion', '$q', function (RutaActualizarTiposHabitacion, $q) {
		var res = function (sucursal, data) {
			var delay = $q.defer();
			RutaActualizarTiposHabitacion.save({ id_empresa: sucursal.id_empresa, id_sucursal:sucursal.id }, data, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])


	.factory('RutaObtenerCatalogoMetodosPago', ['$resource', function ($resource) {
		return $resource(restServerSFE + "sucursal/tipo-metodo-pago/:id_empresa/:id_sucursal", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ObtenerCatalogoMetodosPago', ['RutaObtenerCatalogoMetodosPago', '$q', function (RutaObtenerCatalogoMetodosPago, $q) {
		var res = function (idEmpresa,id_sucursal) {
			var delay = $q.defer();
			RutaObtenerCatalogoMetodosPago.get({ id_empresa: idEmpresa, id_sucursal:id_sucursal }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('RutaActualizarMetodosPago', ['$resource', function ($resource) {
		return $resource(restServerSFE + "sucursal/tipo-metodo-pago/:id_empresa/:id_sucursal", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	 .factory('ActualizarMetodosPago', ['RutaActualizarMetodosPago', '$q', function (RutaActualizarMetodosPago, $q) {
		var res = function (sucursal, data) {
			var delay = $q.defer();
			RutaActualizarMetodosPago.save({ id_empresa: sucursal.id_empresa, id_sucursal:sucursal.id }, data, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RutaObtenerCatalogoTiposMoneda', ['$resource', function ($resource) {
		return $resource(restServerSFE + "sucursal/tipo-moneda/:id_empresa/:id_sucursal", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ObtenerCatalogoTiposMoneda', ['RutaObtenerCatalogoTiposMoneda', '$q', function (RutaObtenerCatalogoTiposMoneda, $q) {
		var res = function (idEmpresa,id_sucursal) {
			var delay = $q.defer();
			RutaObtenerCatalogoTiposMoneda.get({ id_empresa: idEmpresa, id_sucursal:id_sucursal }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('RutaActualizarTiposMoneda', ['$resource', function ($resource) {
		return $resource(restServerSFE + "sucursal/tipo-moneda/:id_empresa/:id_sucursal", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ActualizarTiposMoneda', ['RutaActualizarTiposMoneda', '$q', function (RutaActualizarTiposMoneda, $q) {
		var res = function (sucursal, data) {
			var delay = $q.defer();
			RutaActualizarTiposMoneda.save({ id_empresa: sucursal.id_empresa, id_sucursal:sucursal.id }, data, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	
	.factory('RutaObtenerCatalogoTiposPuntoVenta', ['$resource', function ($resource) {
		return $resource(restServerSFE + "sucursal/tipo-punto-venta/:id_empresa/:id_sucursal", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ObtenerCatalogoTiposPuntoVenta', ['RutaObtenerCatalogoTiposPuntoVenta', '$q', function (RutaObtenerCatalogoTiposPuntoVenta, $q) {
		var res = function (idEmpresa,id_sucursal) {
			var delay = $q.defer();
			RutaObtenerCatalogoTiposPuntoVenta.get({ id_empresa: idEmpresa, id_sucursal:id_sucursal }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('RutaActualizarTiposPuntoVenta', ['$resource', function ($resource) {
		return $resource(restServerSFE + "sucursal/tipo-punto-venta/:id_empresa/:id_sucursal", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ActualizarTiposPuntoVenta', ['RutaActualizarTiposPuntoVenta', '$q', function (RutaActualizarTiposPuntoVenta, $q) {
		var res = function (sucursal, data) {
			var delay = $q.defer();
			RutaActualizarTiposPuntoVenta.save({ id_empresa: sucursal.id_empresa, id_sucursal:sucursal.id }, data, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])


	.factory('RutaObtenerCatalogoUnidadesMedida', ['$resource', function ($resource) {
		return $resource(restServerSFE + "sucursal/tipo-unidad-medida/:id_empresa/:id_sucursal", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ObtenerCatalogoUnidadesMedida', ['RutaObtenerCatalogoUnidadesMedida', '$q', function (RutaObtenerCatalogoUnidadesMedida, $q) {
		var res = function (idEmpresa,id_sucursal) {
			var delay = $q.defer();
			RutaObtenerCatalogoUnidadesMedida.get({ id_empresa: idEmpresa, id_sucursal:id_sucursal }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('RutaActualizarUnidadesMedida', ['$resource', function ($resource) {
		return $resource(restServerSFE + "sucursal/tipo-unidad-medida/:id_empresa/:id_sucursal", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ActualizarUnidadesMedida', ['RutaActualizarUnidadesMedida', '$q', function (RutaActualizarUnidadesMedida, $q) {
		var res = function (sucursal, data) {
			var delay = $q.defer();
			RutaActualizarUnidadesMedida.save({ id_empresa: sucursal.id_empresa, id_sucursal:sucursal.id }, data, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])


