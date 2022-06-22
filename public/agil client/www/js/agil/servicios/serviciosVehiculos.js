angular.module('agil.servicios')

.factory('DatosRegistroOtsVehiculo',  ['$resource',function ($resource) {
	return $resource(restServer + "registros-vehiculo-externo-mantenimiento/vehiculo/:id_vehiculo", null,
		{
			'update': { method: 'PUT' }
		});
}])

.factory('BuscarRegistroOtsVehiculo', ['DatosRegistroOtsVehiculo', '$q', function (DatosRegistroOtsVehiculo, $q) {
	var res = function (id_vehiculo) {
		var delay = $q.defer();
		DatosRegistroOtsVehiculo.get(
			{id_vehiculo:id_vehiculo}
		, function (datos) {
			delay.resolve(datos);
		}, function (error) {
			delay.reject(error);
		});
		return delay.promise;
	};
	return res;
}])
.factory('datosVehiculo',  ['$resource',function ($resource) {
		return $resource(restServer + "mantenimiento-vehiculo/empresa/:id_empresa/Mantenimiento/:id_mantenimiento", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ObtenerDatosVehiculo', ['datosVehiculo', '$q', function (datosVehiculo, $q) {
		var res = function (idEmpresa,idMantenimiento) {
			var delay = $q.defer();
			datosVehiculo.get({id_empresa:idEmpresa,id_mantenimiento:idMantenimiento}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('NuevaOrdenDeTrabajo',  ['$resource',function ($resource) {
		return $resource(restServer + "orden-de-trabajo/empresa/:id_empresa", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('GuardarNuevaOrdendeTrabajo', ['NuevaOrdenDeTrabajo', '$q', function (NuevaOrdenDeTrabajo, $q) {
		var res = function (ordentrabajo,idEmpresa) {
			var delay = $q.defer();
			NuevaOrdenDeTrabajo.save({id_empresa:idEmpresa},ordentrabajo, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('ActualizarOrdendeTrabajo', ['NuevaOrdenDeTrabajo', '$q', function (NuevaOrdenDeTrabajo, $q) {
		var res = function (ordentrabajo) {
			var delay = $q.defer();
			NuevaOrdenDeTrabajo.update(ordentrabajo, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('Vehiculos',  ['$resource',function ($resource) {
		return $resource(restServer + "vehiculos/empresa/:id_empresa", { id_empresa: '@id_empresa' },
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ListaFechasVehiculos',  ['$resource',function ($resource) {
		return $resource(restServer + "orden-de-trabajo/empresa/:id_empresa/correctivo/:correctivo/preventivo/:preventivo/rutina/:rutina/entrega/:entrega", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('DatosFechasVehiculos', ['ListaFechasVehiculos', '$q', function (ListaFechasVehiculos, $q) {
		var res = function (dato) {
			var delay = $q.defer();
			ListaFechasVehiculos.query({
				id_empresa: dato.id_empresa,
				correctivo: dato.correctivo,
				preventivo: dato.preventivo,
				rutina: dato.rutina,
				entrega: dato.entrega,
			}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	//paginador

	.factory('VehiculosEmpresaPaginador',  ['$resource',function ($resource) {
		return $resource(restServer + "mantenimiento/vehiculo/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/inicio/:inicio/fin/:fin/tipo_activo/:tipo_activo/placa/:placa/marca/:marca/modelo/:modelo/anio/:anio/tipo_mantenimiento/:tipo_mantenimiento/numero_ot/:numero_ot/estado_ot/:estado_ot/campamento/:campamento/sucursal/:sucursal/internoExterno/:internoExterno/admin/:admin/usuario/:usuario", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('VehiculosPaginador', ['VehiculosEmpresaPaginador', '$q', function (ProductosEmpresaPaginador, $q) {
		var res = function (paginator, usuario) {
			var delay = $q.defer();
			ProductosEmpresaPaginador.get({
				id_empresa: paginator.filter.empresa,
				pagina: paginator.currentPage,
				items_pagina: paginator.itemsPerPage,
				texto_busqueda: paginator.search,
				columna: paginator.column,
				direccion: paginator.direction,
				inicio: paginator.filter.inicio,
				fin: paginator.filter.fin,
				tipo_activo: paginator.filter.tipo_activo,
				placa:paginator.filter.placa,
				marca: paginator.filter.marca,
				modelo: paginator.filter.modelo,
				anio: paginator.filter.anio,
				tipo_mantenimiento: paginator.filter.tipo_mantenimiento,
				numero_ot:paginator.filter.numero_ot,
				estado_ot:paginator.filter.estado_ot,
				campamento:paginator.filter.campamento,
				sucursal:paginator.filter.sucursal ,
				internoExterno:paginator.filter.internoExterno == true || paginator.filter.internoExterno=='1' ? 1 : 0,
				admin: paginator.isAdmin ? 1 : 0,
				usuario: usuario
			}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	// autocompletar numero placa interno
	.factory('MantenimientoVehiculo',  ['$resource',function ($resource) {
		return $resource(restServer + "mantenimiento-vehiculo/empresa/:id_empresa/busqueda/:buscar", { id_empresa: '@id_empresa', buscar: '@buscar' },
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('ListaMantenimientoVehiculo', ['MantenimientoVehiculo', '$q', function (MantenimientoVehiculo, $q) {
		var res = function (id_empresa, buscar) {
			var delay = $q.defer();
			MantenimientoVehiculo.query({ id_empresa: id_empresa, buscar: buscar }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	// autocompletar numero placa externo
	.factory('MantenimientoVehiculoExterno',  ['$resource',function ($resource) {
		return $resource(restServer + "mantenimiento-vehiculo-externo/empresa/:id_empresa/busqueda/:buscar", { id_empresa: '@id_empresa', buscar: '@buscar' },
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('ListaMantenimientoVehiculoExterno', ['MantenimientoVehiculoExterno', '$q', function (MantenimientoVehiculoExterno, $q) {
		var res = function (id_empresa, buscar) {
			var delay = $q.defer();
			MantenimientoVehiculoExterno.query({ id_empresa: id_empresa, buscar: buscar }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	// autocompletar encargado
	.factory('MantenimientoEncargado',  ['$resource',function ($resource) {
		return $resource(restServer + "mantenimiento-encargado/empresa/:id_empresa/busqueda/:buscar", { id_empresa: '@id_empresa', buscar: '@buscar' },
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('ListaMantenimientoEncargado', ['MantenimientoEncargado', '$q', function (MantenimientoEncargado, $q) {
		var res = function (id_empresa, buscar) {
			var delay = $q.defer();
			MantenimientoEncargado.query({ id_empresa: id_empresa, buscar: buscar }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
//guardar nuevoOt

.factory('MantenimientoSucursal',  ['$resource',function ($resource) {
	return $resource(restServer + "mantenimiento-sucursales/id_empresa/:id_empresa", null,
		{
			'update': { method: 'PUT' }
		});
}])

.factory('ListaMantenimientoSucursal', ['MantenimientoSucursal', '$q', function (MantenimientoSucursal, $q) {
	var res = function (id_empresa, buscar) {
		var delay = $q.defer();
		MantenimientoSucursal.query({ id_empresa: id_empresa}, function (entidades) {
			delay.resolve(entidades);
		}, function (error) {
			delay.reject(error);
		});
		return delay.promise;
	};
	return res;
}])

.factory('EmpresaTipoMantenimiento',  ['$resource',function ($resource) {
	return $resource(restServer + "mantenimiento-empresa/id_empresa/:id_empresa", null,
		{
			'update': { method: 'PUT' }
		});
}])

.factory('tipoMantenimiento', ['EmpresaTipoMantenimiento', '$q', function (EmpresaTipoMantenimiento, $q) {
	var res = function (id_empresa) {
		var delay = $q.defer();
		EmpresaTipoMantenimiento.query({ 
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

.factory('DatosVehiculosExternos',  ['$resource',function ($resource) {
	return $resource(restServer + "vehiculos-externos", null,
		{
			'update': { method: 'PUT' }
		});
}])

.factory('guardarDatosVehiculo', ['DatosVehiculosExternos', '$q', function (DatosVehiculosExternos, $q) {
	var res = function (datosvehiculo) {
		var delay = $q.defer();
		DatosVehiculosExternos.save(
			datosvehiculo
		
		, function (entidades) {
			delay.resolve(entidades);
		}, function (error) {
			delay.reject(error);
		});
		return delay.promise;
	};
	return res;
}])


.factory('DatosCliente',  ['$resource',function ($resource) {
	return $resource(restServer + "cliente-mantenimiento", null,
		{
			'update': { method: 'PUT' }
		});
}])

.factory('guardarClienteMantenimiento', ['DatosCliente', '$q', function (DatosCliente, $q) {
	var res = function (datosCliente) {
		var delay = $q.defer();
		DatosCliente.save(
			datosCliente
		, function (datos) {
			delay.resolve(datos);
		}, function (error) {
			delay.reject(error);
		});
		return delay.promise;
	};
	return res;
}])

.factory('ListaVehiculosOt', ['$resource', function ($resource) {
	return $resource(restServer + "lista-vehiculos-ot/empresa/:id_empresa/marca/:marca/modelo/:modelo/placa/:placa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion");
}])

.factory('ObtenerListaVehiculosOt', ['ListaVehiculosOt', '$q', function (ListaVehiculosOt, $q) {
	var res = function (paginator)//idEmpresa, xxx
	{
		var delay = $q.defer();
		ListaVehiculosOt.get({
			id_empresa: paginator.filter.id_empresa,
			marca: paginator.filter.marca,
			modelo: paginator.filter.modelo,
			placa: paginator.filter.placa,
			pagina: paginator.currentPage,
			items_pagina: paginator.itemsPerPage,
			texto_busqueda: paginator.search,
			columna: paginator.column,
			direccion: paginator.direction
		}, function (entidades) {
			delay.resolve(entidades);
		}, function (error) {
			delay.reject(error);
		});
		return delay.promise;
	};
	return res;
}])

.factory('KardexVehiculosOt', ['$resource', function ($resource) {
	return $resource(restServer + "kardex-vehiculos-ot/vehiculo/:id_vehiculo/inicio/:inicio/fin/:fin/estado/:estado/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion");
}])

.factory('ObtenerKardexVehiculosOt', ['KardexVehiculosOt', '$q', function (KardexVehiculosOt, $q) {
	var res = function (paginator)//idEmpresa, xxx
	{
		var delay = $q.defer();
		KardexVehiculosOt.get({
			id_vehiculo: paginator.filter.id_vehiculo,
			inicio: paginator.filter.inicio,
			fin: paginator.filter.fin,
			estado: paginator.filter.estado,
			pagina: paginator.currentPage,
			items_pagina: paginator.itemsPerPage,
			texto_busqueda: paginator.search,
			columna: paginator.column,
			direccion: paginator.direction
		}, function (entidades) {
			delay.resolve(entidades);
		}, function (error) {
			delay.reject(error);
		});
		return delay.promise;
	};
	return res;
}])

.factory('liquidacionMantenimiento',  ['$resource',function ($resource) {
	return $resource(restServer + "mantenimiento-vehiculo/liquidacion/empresa/:id_empresa/Mantenimiento/:id_mantenimiento", null,
		{
			'update': { method: 'PUT' }
		});
}])
.factory('guardarLiquidacion', ['liquidacionMantenimiento', '$q', function (liquidacionMantenimiento, $q) {
	var res = function (idEmpresa, idMantenimiento, liquidacion) {
		var delay = $q.defer();
		liquidacionMantenimiento.post({id_empresa:idEmpresa,id_mantenimiento:idMantenimiento}, liquidacion, function (entidades) {
			delay.resolve(entidades);
		}, function (error) {
			delay.reject(error);
		});
		return delay.promise;
	};
	return res;
}])

.factory('SalarioPersonaEntre200',  ['$resource',function ($resource) {
	return $resource(restServer + "/orden-de-trabajo/mano-obra/factor/:factor/:idpersona", null,
		{
			'update': { method: 'PUT' }
		});
}])
.factory('SalarioPersona', ['SalarioPersonaEntre200', '$q', function (SalarioPersonaEntre200, $q) {
	var res = function (factor, idpersona) {
		var delay = $q.defer();
		SalarioPersonaEntre200.get({factor:factor, idpersona:idpersona}, function (entidades) {
			delay.resolve(entidades);
		}, function (error) {
			delay.reject(error);
		});
		return delay.promise;
	};
	return res;
}])

.factory('EspecialidesPreciosRuta', ['$resource',function($resource) {
	return $resource(restServer+"especialidad-precios/empresa/:id_empresa/especiades/:id_especialidad");
}])
.factory('EspecialidesPrecios', ['EspecialidesPreciosRuta','$q',function(EspecialidesPreciosRuta, $q) 
{
	var res = function(id_especialidad,id_empresa) 
	{
		var delay = $q.defer();
		EspecialidesPreciosRuta.get({id_especialidad:id_especialidad,id_empresa:id_empresa},function(entidad) 
		{        
			delay.resolve(entidad);
		}, function(error) 
			{
				delay.reject(error);
			});
		return delay.promise;
	};
	return res;
}])
.factory('EspecialidesPreciosUpdate', ['$resource', function ($resource) {
	return $resource(restServer + "especialidades-precios/empresa/:id_empresa", null,
		{
			'update': { method: 'PUT' }
		});
}])

.factory('OrdenTrabajoEmpresaDatos',  ['$resource',function ($resource) {
	return $resource(restServer + "mantenimiento-ot/:id/empresa/:id_empresa", null,
		{
			'update': { method: 'PUT' }
		});
}])
.factory('PagosOTCreditos', ['OrdenTrabajoEmpresaDatos', '$q', function (OrdenTrabajoEmpresaDatos, $q) {
	var res = function (id_ot, id_empresa,datos) {
		var delay = $q.defer();
		OrdenTrabajoEmpresaDatos.update({ id: id_ot, id_empresa: id_empresa },datos, function (entidad) {
			delay.resolve(entidad);
		}, function (error) {
				delay.reject(error);
			});
		return delay.promise;
	};
	return res;
}])

.factory('MantenimientoInterno',  ['$resource',function ($resource) {
	return $resource(restServer + "mantenimiento/interno/empresa/:id_empresa/id_producto/:id_producto", null,
		{
			'update': { method: 'PUT' }
		});
}])
.factory('ObtenerVehiculoProducto', ['MantenimientoInterno', '$q', function (MantenimientoInterno, $q) {
	var res = function (idEmpresa, codigo) {
		var delay = $q.defer();
		MantenimientoInterno.get({id_empresa:idEmpresa, id_producto: codigo}, function (entidades) {
			delay.resolve(entidades);
		}, function (error) {
			delay.reject(error);
		});
		return delay.promise;
	};
	return res;
}])

.factory('ReporteMantenimiento',  ['$resource',function ($resource) {
	return $resource(restServer + "mantenimiento/interno/empresa/:empresa/inicio/:inicio/fin/:fin/externo/:externo", null,
		{
			'update': { method: 'PUT' }
		});
}])

.factory('ObtenerOrdenesDeTrabajo', ['ReporteMantenimiento', '$q', function (ReporteMantenimiento, $q) {
	var res = function (empresa, inicio, fin, externo) {
		var delay = $q.defer();
		ReporteMantenimiento.get({empresa:empresa, inicio: inicio, fin: fin, externo: externo ? 1 : 0 }, function (entidades) {
			delay.resolve(entidades);
		}, function (error) {
			delay.reject(error);
		});
		return delay.promise;
	};
	return res;
}])

.factory('GetOtMaterial',  ['$resource',function ($resource) {
	return $resource(restServer + "mantenimiento/empresa/:empresa/inicio/:inicio/fin/:fin/externo/:externo", null,
		{
			'update': { method: 'PUT' }
		});
}])

.factory('ObtenerOtMateriales', ['GetOtMaterial', '$q', function (GetOtMaterial, $q) {
	var res = function (empresa, inicio, fin, externo) {
		var delay = $q.defer();
		GetOtMaterial.get({empresa:empresa, inicio: inicio, fin: fin, externo: externo ? 1 : 0 }, function (entidades) {
			delay.resolve(entidades);
		}, function (error) {
			delay.reject(error);
		});
		return delay.promise;
	};
	return res;
}])
.factory('MaterialesRegistro',  ['$resource',function ($resource) {
	return $resource(restServer + "orden-de-trabajo/materiales/:ids", null,
		{
			'update': { method: 'PUT' }
		});
}])

.factory('OptenerMaterialesRegistro', ['MaterialesRegistro', '$q', function (MaterialesRegistro, $q) {
	var res = function (ids) {
		var delay = $q.defer();
		MaterialesRegistro.query({ids:ids}, function (entidades) {
			delay.resolve(entidades);
		}, function (error) {
			delay.reject(error);
		});
		return delay.promise;
	};
	return res;
}])
.factory('Config',  ['$resource',function ($resource) {
	return $resource(restServer + "mantenimiento/configuraciones/empresa/:id_empresa", null,
		{
			'update': { method: 'PUT' }
		});
}])

.factory('GetConfig', ['Config', '$q', function (Config, $q) {
	var res = function (id) {
		var delay = $q.defer();
		Config.get({id_empresa:id}, function (entidades) {
			delay.resolve(entidades);
		}, function (error) {
			delay.reject(error);
		});
		return delay.promise;
	};
	return res;
}])

.factory('SaveConfig', ['Config', '$q', function (Config, $q) {
	var res = function (id, config) {
		var delay = $q.defer();
		Config.save({id_empresa:id}, config, function (entidades) {
			delay.resolve(entidades);
		}, function (error) {
			delay.reject(error);
		});
		return delay.promise;
	};
	return res;
}])
.factory('ActivosFijos',  ['$resource',function ($resource) {
	return $resource(restServer + "mantenimiento/filtro/tipos-activo-fijo/empresa/:id_empresa", null,
		{
			'update': { method: 'PUT' }
		});
}])

.factory('GetTiposActivosFijos', ['ActivosFijos', '$q', function (ActivosFijos, $q) {
	var res = function (id) {
		var delay = $q.defer();
		ActivosFijos.get({id_empresa:id}, function (entidades) {
			delay.resolve(entidades);
		}, function (error) {
			delay.reject(error);
		});
		return delay.promise;
	};
	return res;
}])
