angular.module('agil.servicios')

	.factory('BusquedaProductosEmpresa', ['$resource', function ($resource) {
		return $resource(restServer + "productos/empresa/:idEmpresa/texto/:texto");
	}])

	.factory('ListaProductosEmpresa', ['BusquedaProductosEmpresa', '$q', function (BusquedaProductosEmpresa, $q) {
		var res = function (idEmpresa, texto) {
			var delay = $q.defer();
			BusquedaProductosEmpresa.query({ idEmpresa: idEmpresa, texto: texto }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])
	.factory('BusquedaProductosManteniemiento', ['$resource', function ($resource) {
		return $resource(restServer + "productos-mantenimiento/almacen/:id_almacen/texto/:texto");
	}])

	.factory('ListaProductosMantenimiento', ['BusquedaProductosManteniemiento', '$q', function (BusquedaProductosManteniemiento, $q) {
		var res = function (idAlmacen, texto) {
			var delay = $q.defer();
			BusquedaProductosManteniemiento.query({ id_almacen: idAlmacen, texto: texto }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])
	.factory('BusquedaProductosEmpresaUsuario', ['$resource', function ($resource) {
		return $resource(restServer + "productos/empresa/:idEmpresa/texto/:texto/user/:id_usuario/almacen/:id_almacen");
	}])

	.factory('ListaProductosEmpresaUsuario', ['BusquedaProductosEmpresaUsuario', '$q', function (BusquedaProductosEmpresaUsuario, $q) {
		var res = function (idEmpresa, texto, id_usuario, id_almacen) {
			var delay = $q.defer();
			BusquedaProductosEmpresaUsuario.query({ idEmpresa: idEmpresa, texto: texto, id_usuario: id_usuario, id_almacen: id_almacen }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])


	//Verificar si existe codigo o no
	.factory('BusquedaCodigoProducto', ['$resource', function ($resource) {
		return $resource(restServer + "productos-codigo/empresa/:id_empresa/codigo/:texto");
	}])

	.factory('VerificarCodigoProducto', ['BusquedaCodigoProducto', '$q', function (BusquedaCodigoProducto, $q) {
		var res = function (idEmpresa, texto) {
			var delay = $q.defer();
			BusquedaCodigoProducto.query({ id_empresa: idEmpresa, texto: texto }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])
	//fin del verificadors

	.factory('InventariosProducto', ['$resource', function ($resource) {
		return $resource(restServer + "inventarios/producto/:id_producto/almacen/:id_almacen/:lote?");
	}])

	.factory('ListaInventariosProducto', ['InventariosProducto', '$q', function (InventariosProducto, $q) {
		var res = function (id_producto, id_almacen, lote) {
			var delay = $q.defer();
			InventariosProducto.query({ id_producto: id_producto, id_almacen: id_almacen, lote: lote }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])

	.factory('InventariosAntiguosProducto', ['$resource', function ($resource) {
		return $resource(restServer + "inventarios-antiguos/producto/:id_producto/almacen/:id_almacen/:lote?");
	}])

	.factory('ListaInventariosAntiguosProducto', ['InventariosAntiguosProducto', '$q', function (InventariosAntiguosProducto, $q) {
		var res = function (id_producto, id_almacen, lote) {
			var delay = $q.defer();
			InventariosAntiguosProducto.query({ id_producto: id_producto, id_almacen: id_almacen, lote: lote }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])
	.factory('ActInvYmodRegistros', ['$resource', function ($resource) {
		return $resource(restServer + "actualizar-registros-inv");
	}])

	.factory('ActualizarInvYmodRegistros', ['ActInvYmodRegistros', '$q', function (ActInvYmodRegistros, $q) {
		var res = function (inv) {
			var delay = $q.defer();
			ActInvYmodRegistros.save({},inv, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])

	.factory('ConfiguracionVentaVista', ['$resource', function ($resource) {
		return $resource(restServer + "empresas/:id_empresa/configuracion-venta-vista", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('ConfiguracionVentaVistaDatos', ['ConfiguracionVentaVista','IndexDbConfigVentaVistaDatos','IndexDbSaveConfigVentaVistaDatos', '$q','$window',
	 function (ConfiguracionVentaVista,IndexDbConfigVentaVistaDatos,IndexDbSaveConfigVentaVistaDatos, $q,$window) {
		var res = function (id_empresa) {
			const online = $window.navigator.onLine;
			if(!online){
				return IndexDbConfigVentaVistaDatos(id_empresa);
			}
			var delay = $q.defer();
			ConfiguracionVentaVista.get({ id_empresa: id_empresa }, function (entidades) {
				IndexDbSaveConfigVentaVistaDatos(entidades,id_empresa);
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])

	.factory('ConfiguracionCompraVista', ['$resource', function ($resource) {
		return $resource(restServer + "empresas/:id_empresa/configuracion-compra-vista", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('ConfiguracionCompraVistaDatos', ['ConfiguracionCompraVista', '$q', function (ConfiguracionCompraVista, $q) {
		var res = function (id_empresa) {
			var delay = $q.defer();
			ConfiguracionCompraVista.get({ id_empresa: id_empresa }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])

	.factory('GruposProductoEmpresa', ['$resource', function ($resource) {
		return $resource(restServer + "grupos/empresa/:id_empresa", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('ListaGruposProductoEmpresa', ['GruposProductoEmpresa', '$q', function (GruposProductoEmpresa, $q) {
		var res = function (id_empresa) {
			var delay = $q.defer();
			GruposProductoEmpresa.query({ id_empresa: id_empresa }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])

	.factory('GruposProductoUsuario', ['$resource', function ($resource) {
		return $resource(restServer + "grupos/empresa/:id_empresa/user/:id_usuario", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('ListaGruposProductoUsuario', ['GruposProductoUsuario', '$q', function (GruposProductoUsuario, $q) {
		var res = function (id_empresa, id_usuario) {
			var delay = $q.defer();
			GruposProductoUsuario.query({ id_empresa: id_empresa, id_usuario: id_usuario }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])

	.factory('SubGruposProductoUsuario', ['$resource', function ($resource) {
		return $resource(restServer + "subgrupos/empresa/:id_empresa/user/:id_usuario", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('ListaSubGruposProductoUsuario', ['SubGruposProductoUsuario', '$q', function (SubGruposProductoUsuario, $q) {
		var res = function (id_empresa, id_usuario) {
			var delay = $q.defer();
			SubGruposProductoUsuario.query({ id_empresa: id_empresa, id_usuario: id_usuario }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])
	.factory('GruposProductoUsuariov2', ['$resource', function ($resource) {
		return $resource(restServer + "gruposv2/empresa/:id_empresa/user/:id_usuario", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('ListaGruposProductoUsuariov2', ['GruposProductoUsuariov2', '$q', function (GruposProductoUsuariov2, $q) {
		var res = function (id_empresa, id_usuario) {
			var delay = $q.defer();
			GruposProductoUsuariov2.get({ id_empresa: id_empresa, id_usuario: id_usuario }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])
	.factory('VendedorVenta', ['$resource', function ($resource) {
		return $resource(restServer + "vendedor-venta/empresa/:id_empresa", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('ListaVendedorVenta', ['VendedorVenta', '$q','$window', function (VendedorVenta, $q,$window) {
		var res = function (id_empresa) {
			var delay = $q.defer();	
			const online = $window.navigator.onLine;
			if (!online) {
				delay = $q.defer();
					delay.resolve([]);
					return delay.promise;
			}		
			VendedorVenta.query({ id_empresa: id_empresa }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])

	.factory('VendedorVentaActualizacion', ['$resource', function ($resource) {
		return $resource(restServer + "vendedor-venta/:id_vendedor", { id_vendedor: '@id' },
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('SubGruposProductoEmpresa', ['$resource', function ($resource) {
		return $resource(restServer + "subgrupos/empresa/:id_empresa", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('ListaSubGruposProductoEmpresa', ['SubGruposProductoEmpresa', '$q', function (SubGruposProductoEmpresa, $q) {
		var res = function (id_empresa) {
			var delay = $q.defer();
			SubGruposProductoEmpresa.query({ id_empresa: id_empresa }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])
	.factory('InventariosProductosVentaEdicion', ['$resource', function ($resource) {
		return $resource(restServer + "inventarios-venta-edicion/producto/:id_producto/almacen/:id_almacen/fecha/:fecha");
	}])

	.factory('ListaInventariosProductoVentaEdicion', ['InventariosProductosVentaEdicion', '$q', function (InventariosProductosVentaEdicion, $q) {
		var res = function (id_producto, id_almacen, fecha) {
			var delay = $q.defer();
			InventariosProductosVentaEdicion.query({ id_producto: id_producto, id_almacen: id_almacen, fecha: fecha }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])
	.factory('MeseroVenta', ['$resource', function ($resource) {
		return $resource(restServer + "mesero-venta/empresa/:id_empresa", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('CrearMeseroVenta', ['MeseroVenta', '$q', function (MeseroVenta, $q) {
		var res = function (id_empresa,datos) {
			var delay = $q.defer();
			MeseroVenta.save({ id_empresa: id_empresa },datos, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])
	.factory('MeserosVenta', ['$resource', function ($resource) {
		return $resource(restServer + "mesero-venta/empresa/:id_empresa", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('ListaMeserosVenta', ['MeserosVenta', '$q', function (MeserosVenta, $q) {
		var res = function (id_empresa) {
			var delay = $q.defer();
			MeserosVenta.query({ id_empresa: id_empresa }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])
	.factory('ValidarCodigoMesero', ['$resource',function ($resource) {
		return $resource(restServer+"validar-codigo/mesero/:id_empresa", { id_empresa: '@id_empresa' },
		{
			'update': { method:'PUT' }
		});
	}])
	.factory('RutaBusquedaProductosVentaUsuario', ['$resource', function ($resource) {
		return $resource(restServer + "productos-venta/empresa/:id_empresa/texto/:texto/user/:id_usuario/almacen/:id_almacen/cliente/:id_cliente");
	}])

	.factory('ListaProductosVentaUsuario', ['RutaBusquedaProductosVentaUsuario', '$q', function (RutaBusquedaProductosVentaUsuario, $q) {
		var res = function (idEmpresa, texto, id_usuario, id_almacen, id_cliente) {
			var delay = $q.defer();
			RutaBusquedaProductosVentaUsuario.query({ id_empresa: idEmpresa, texto: texto, id_usuario: id_usuario, id_almacen: id_almacen , id_cliente: id_cliente}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])