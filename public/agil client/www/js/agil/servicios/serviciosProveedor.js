angular.module('agil.servicios')
	.factory('ProveedorVencimientoCredito', ['$resource', function ($resource) {
		return $resource(restServer + "proveedor-vencimiento-Deudas/:id", { id: '@id' },
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('Proveedor', ['$resource', function ($resource) {
		return $resource(restServer + "proveedores/:idProveedor", { idProveedor: '@id' },
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('EliminarProveedor', ['Proveedor', '$q', function (Proveedor, $q) {
		var res = function (proveedor) {
			var delay = $q.defer();
			Proveedor.delete({ idProveedor: proveedor }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('ProveedoresEmpresaPaginador', ['$resource', function ($resource) {
		return $resource(restServer + "proveedor/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda");
	}])

	.factory('ProveedoresPaginador', ['ProveedoresEmpresaPaginador', '$q', function (ProveedoresEmpresaPaginador, $q) {
		var res = function (idEmpresa, pagina, itemsPagina, texto) {
			var delay = $q.defer();
			ProveedoresEmpresaPaginador.get({ id_empresa: idEmpresa, pagina: pagina, items_pagina: itemsPagina, texto_busqueda: texto }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('ProveedoresEmpresa', ['$resource', function ($resource) {
		return $resource(restServer + "proveedores/empresa/:idEmpresa");
	}])

	.factory('Proveedores', ['ProveedoresEmpresa', '$q', function (ProveedoresEmpresa, $q) {
		var res = function (idEmpresa) {
			var delay = $q.defer();
			ProveedoresEmpresa.query({ idEmpresa: idEmpresa }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('BusquedaProveedoresNit', ['$resource', function ($resource) {
		return $resource(restServer + "proveedores/empresa/:idEmpresa/texto/:texto");
	}])

	.factory('ProveedoresNit', ['BusquedaProveedoresNit', '$q', function (BusquedaProveedoresNit, $q) {
		var res = function (idEmpresa, texto) {
			var delay = $q.defer();
			BusquedaProveedoresNit.query({ idEmpresa: idEmpresa, texto: texto }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('ObtenerProductosProveedor', ['$resource', function ($resource) {
		return $resource(restServer + "proveedores/productos/empresa/:id_empresa/:id_proveedor", null)
	}])

	.factory('ListaProductosProveedores', ['ObtenerProductosProveedor', '$q', function (ObtenerProductosProveedor, $q) {
		var res = function (idEmpresa, proveedor) {
			var delay = $q.defer();
			ObtenerProductosProveedor.get({ id_empresa: idEmpresa, id_proveedor: proveedor.id }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('AsignarProductosProveedor', ['$resource', function ($resource) {
		return $resource(restServer + "proveedores/productos/empresa/:id_empresa", null)
	}])

	.factory('ActualizarProductosProveedor', ['AsignarProductosProveedor', '$q', function (AsignarProductosProveedor, $q) {
		var res = function (idEmpresa, info, proveedor) {
			var delay = $q.defer();
			AsignarProductosProveedor.save({ id_empresa: idEmpresa }, { id_proveedor: proveedor.id, productos: info }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('AnticipoProveedor', ['$resource', function ($resource) {
		return $resource(restServer + "anticipo-proveedor/proveedor/:id_proveedor");
	}])

	.factory('ObtenerAnticiposProveedor', ['AnticipoProveedor', '$q', function (AnticipoProveedor, $q) {
		var res = function (idProveedor) {
			var delay = $q.defer();
			AnticipoProveedor.query({ id_proveedor: idProveedor }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('GuardarAnticipoProveedor', ['AnticipoProveedor', '$q', function (AnticipoProveedor, $q) {
		var res = function (idProveedor, datos) {
			var delay = $q.defer();
			AnticipoProveedor.save({ id_proveedor: idProveedor }, datos, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RutaProveedorBusquedaCodigo', ['$resource', function ($resource) {
		return $resource(restServer + "busquedaProveedorCodigo/empresa/:id_empresa/texto/:texto");
	}])
	.factory('ListaProvCodigo', ['RutaProveedorBusquedaCodigo', '$q', function (RutaProveedorBusquedaCodigo, $q) {
		var res = function (idEmpresa, texto) {
			var delay = $q.defer();
			RutaProveedorBusquedaCodigo.query({ id_empresa: idEmpresa, texto: texto }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])


	.factory('RutaProveedorBusquedaNit', ['$resource', function ($resource) {
		return $resource(restServer + "busquedaProveedorNit/empresa/:id_empresa/texto/:texto");
	}])
	.factory('ListaProvNit', ['RutaProveedorBusquedaNit', '$q', function (RutaProveedorBusquedaNit, $q) {
		var res = function (idEmpresa, texto) {
			var delay = $q.defer();
			RutaProveedorBusquedaNit.query({ id_empresa: idEmpresa, texto: texto }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('GetRegistroEvaluacionProveedor', ['$resource', function ($resource) {
		return $resource(restServer + "registro-evaluacion-proveedor/:id_evaluacion", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('RegistroEvaluacionProveedor', ['$resource', function ($resource) {
		return $resource(restServer + "registro-evaluacion-proveedor/proveedor/:id_proveedor/inicio/:inicio/fin/:fin/fecha_elaboracion/:fecha_elaboracion/configuracion_iso/:id_configuracion_iso/usuario/:id_usuario", null,
		{
			'update': { method: 'PUT' }
		});
}])
	.factory('PaginatorEvaluacionProveedor', ['$resource', function ($resource) {
		return $resource(restServer + "registro-evaluacion-proveedor/proveedor/:id_proveedor/inicio/:inicio/fin/:fin/pagina/:pagina/items_pagina/:items_pagina/texto_busqueda/:texto_busqueda/columna/:columna/direccion/:direccion", null,
		{
			'update': { method: 'PUT' }
		});
}])
	.factory('ObtenerDatosTablaCalProv', ['PaginatorEvaluacionProveedor', '$q', function (PaginatorEvaluacionProveedor, $q) {
		var res = function (paginator) {
			var delay = $q.defer();
			PaginatorEvaluacionProveedor.get({
				id_proveedor: paginator.filter.id_proveedor,
				inicio: paginator.filter.inicio,
				fin: paginator.filter.fin,
				pagina: paginator.currentPage,
				items_pagina: paginator.itemsPerPage,
				texto_busqueda: paginator.search,
				columna: paginator.column,
				direccion: paginator.direction,
			}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('GuardarRegistroEvaluacionProveedor', ['RegistroEvaluacionProveedor', '$q', function (RegistroEvaluacionProveedor, $q) {
		var res = function (filtro,fecha_elaboracion,id_configuracion_iso,id_usuario,convertirFecha) {
			var delay = $q.defer();
			RegistroEvaluacionProveedor.get({
				id_proveedor: filtro.id_proveedor,
				inicio: new Date(convertirFecha(filtro.inicio)),
				fin: new Date(convertirFecha(filtro.fin)),
				fecha_elaboracion:fecha_elaboracion,
				id_configuracion_iso:id_configuracion_iso,
				id_usuario:id_usuario
			}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('ObtenerRegistroEvaluacionProveedor', ['GetRegistroEvaluacionProveedor', '$q', function (GetRegistroEvaluacionProveedor, $q) {
		var res = function (idEval) {
			var delay = $q.defer();
			GetRegistroEvaluacionProveedor.get({
				id_evaluacion: idEval,
			}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('GetRegistroEvaluacionProveGral', ['$resource', function ($resource) {
		return $resource(restServer + "registro-evaluacion-proveedor-gral/:id_evaluacion", null,
		{
			'update': { method: 'PUT' }
		});
}])
	.factory('RegistroEvaluacionProvGral', ['$resource', function ($resource) {
		return $resource(restServer + "registro-evaluacion-proveedor-gral/inicio/:inicio/fin/:fin/fecha_elaboracion/:fecha_elaboracion/configuracion_iso/:id_configuracion_iso/usuario/:id_usuario/tipo_proveedor/:tipo_proveedor", null,
		{
			'update': { method: 'PUT' }
		});
}])
	.factory('PaginatorEvaluacionProvGral', ['$resource', function ($resource) {
		return $resource(restServer + "registro-evaluacion-proveedor-gral/empresa/:id_empresa/inicio/:inicio/fin/:fin/pagina/:pagina/items_pagina/:items_pagina/texto_busqueda/:texto_busqueda/columna/:columna/direccion/:direccion", null,
		{
			'update': { method: 'PUT' }
		});
}])
	.factory('ObtenerDatosTablaCalProvGral', ['PaginatorEvaluacionProvGral', '$q', function (PaginatorEvaluacionProvGral, $q) {
		var res = function (paginator) {
			var delay = $q.defer();
			PaginatorEvaluacionProvGral.get({
				id_empresa:paginator.filter.id_empresa,
				inicio: paginator.filter.inicio,
				fin: paginator.filter.fin,
				pagina: paginator.currentPage,
				items_pagina: paginator.itemsPerPage,
				texto_busqueda: paginator.search,
				columna: paginator.column,
				direccion: paginator.direction,
			}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('GuardarRegistroEvaluacionProvGral', ['RegistroEvaluacionProvGral', '$q', function (RegistroEvaluacionProvGral, $q) {
		var res = function (filtro,fecha_elaboracion,id_configuracion_iso,id_usuario,convertirFecha) {
			var delay = $q.defer();
			RegistroEvaluacionProvGral.get({
				inicio: new Date(convertirFecha(filtro.inicio)),
				fin: new Date(convertirFecha(filtro.fin)),
				fecha_elaboracion:fecha_elaboracion,
				id_configuracion_iso:id_configuracion_iso,
				id_usuario:id_usuario,
				tipo_proveedor:filtro.tipoProveedor
			}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('ObtenerRegistroEvaluacionProvGral', ['GetRegistroEvaluacionProveGral', '$q', function (GetRegistroEvaluacionProveGral, $q) {
		var res = function (idEval) {
			var delay = $q.defer();
			GetRegistroEvaluacionProveGral.get({
				id_evaluacion: idEval,
			}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])


	.factory('listaBancosASFI',  ['$resource',function ($resource) {
        return $resource(restServer+"proveedor/bancos/asfi");
    }])
    .factory('buscarBancoASFI', ['listaBancosASFI', '$q', function (listaBancosASFI, $q) {
    var res = function () {
        var delay = $q.defer();
        listaBancosASFI.get( function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
    }])

	.factory('GuardarNroCuentasBancos', ['$resource', function ($resource) {
		return $resource(restServer + "proveedor/nrocuentas/bancos/empresa");
	}])
	.factory('GuardarNroCuentas', ['GuardarNroCuentasBancos', '$q', function (GuardarNroCuentasBancos, $q) {
		var res = function (datos) {
			var delay = $q.defer();
			GuardarNroCuentasBancos.save(datos, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])  

	.factory('ListaNroCuentas',  ['$resource',function ($resource) {
        return $resource(restServer+"proveedor/bancos/nrocuenta/:id_proveedor");
    }])
    .factory('buscarListaNroCuentas', ['ListaNroCuentas', '$q', function (ListaNroCuentas, $q) {
    var res = function (id_proveedor) {
        var delay = $q.defer();
        ListaNroCuentas.get({id_proveedor:id_proveedor}, function (entidades) {
            delay.resolve(entidades);
        }, function (error) {
            delay.reject(error);
        });
        return delay.promise;
    };
    return res;
    }])

	.factory('eliminarNroCuentasBancos', ['$resource', function ($resource) {
		return $resource(restServer + "eliminar/proveedor/nrocuentas/bancos/empresa");
	}])
	.factory('eliminarNroCuentas', ['eliminarNroCuentasBancos', '$q', function (eliminarNroCuentasBancos, $q) {
		var res = function (datos) {
			var delay = $q.defer();
			eliminarNroCuentasBancos.save(datos, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])  

	.factory('GuardarNroCuentasBancosPredefinidoSeleccionado', ['$resource', function ($resource) {
		return $resource(restServer + "predefinido/seleccionado/proveedor/nrocuentas/bancos/empresa");
	}])
	.factory('guardarCheckSeleccionado', ['GuardarNroCuentasBancosPredefinidoSeleccionado', '$q', function (GuardarNroCuentasBancosPredefinidoSeleccionado, $q) {
		var res = function (datos) {
			var delay = $q.defer();
			GuardarNroCuentasBancosPredefinidoSeleccionado.save(datos, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])  