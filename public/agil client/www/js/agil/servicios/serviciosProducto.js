angular.module('agil.servicios')

	.factory('Producto',  ['$resource',function ($resource) {
		return $resource(restServer + "productos/:idProducto", { idProducto: '@id' },
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('DatosProducto', ['Producto', '$q', function (Producto, $q) {
		var res = function (idProducto) {
			var delay = $q.defer();
			Producto.get({ idProducto: idProducto }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])
	.factory('ListaProductosKardex',  ['$resource',function ($resource) {
		return $resource(restServer + "productos/kardex/empresa/:id_empresa/almacen/:id_almacen/grupo/:grupo");
	}])

	.factory('ReporteProductosKardex', ['ListaProductosKardex', '$q', function (ListaProductosKardex, $q) {
		var res = function (idEmpresa, filtro) {
			var delay = $q.defer();
			ListaProductosKardex.query({ id_empresa: idEmpresa, id_almacen: filtro.almacen, grupo: filtro.grupo }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])

	
	.factory('ProductosKardex',  ['$resource',function ($resource) {
		return $resource(restServer + "productos/kardex/:id_producto/almacen/:id_almacen/fecha-inicial/:fecha_inicio/fecha-final/:fecha_fin/lote/:lote/:saldo",null,
		{
			'update': { method: 'PUT' }
		});
	}])

	.factory('ProductoKardex', ['ProductosKardex', '$q', function (ProductosKardex, $q) {
		var res = function (idProducto, filtro, saldo) {
			var delay = $q.defer();
			ProductosKardex.get({ id_producto: idProducto, id_almacen: filtro.almacen, fecha_inicio: filtro.fechaInicioTexto, fecha_fin: filtro.fechaFinTexto, lote: filtro.lote, saldo: saldo ? 1 : 0 }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		/*var res = function(paginador){
			var delay = $q.defer();
			ProductosKardex.get({ 
					id_producto:paginador.filter.id_producto,
					id_almacen: paginador.filter.id_almacen, 
					fecha_inicio: paginador.filter.fecha_inicio, 	
					fecha_fin:paginador.filter.fecha_fin,
					lote:paginador.filter.lote,				 
					pagina: paginador.currentPage,
					items_pagina: paginador.itemsPerPage,
					texto_busqueda: paginador.search,
					columna: paginador.column,
					direccion: paginador.direction,

				}, function (entidades) {
					delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
	};*/
		return res;
	}])
	
	.factory('ProductosEmpresaCreacion',  ['$resource',function ($resource) {
		return $resource(restServer + "productos/empresa");
	}])
	.factory('GuardarProductosEmpresaImportacion', ['ProductosEmpresaCreacion', '$q', function (ProductosEmpresaCreacion, $q) {
		var res = function (productos,idEmpresa) {
			var delay = $q.defer();
			ProductosEmpresaCreacion.save(null,{ productos: productos, id_empresa:idEmpresa }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])
	.factory('ProductosEmpresaCreacionFormulacion',  ['$resource',function ($resource) {
		return $resource(restServer + "productos/formulacion/empresa/:id_empresa");
	}])

	.factory('GuardarProductosFormulacion', ['ProductosEmpresaCreacionFormulacion', '$q', function (ProductosEmpresaCreacionFormulacion, $q) {
		var res = function (idEmpresa, productos) {
			var delay = $q.defer();
			ProductosEmpresaCreacionFormulacion.save({ id_empresa: idEmpresa }, productos, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])



	.factory('ProductosEmpresa',  ['$resource',function ($resource) {
		return $resource(restServer + "productos/empresa/:idEmpresa");
	}])

	.factory('ProductosEmpresaUsuario',  ['$resource',function ($resource) {
		return $resource(restServer + "productos/empresa/:idEmpresa/user/:id_usuario");
	}])

	.factory('Productos', ['ProductosEmpresa', '$q', function (ProveedoresEmpresa, $q) {
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
	.factory('ProductosUsuario', ['ProductosEmpresaUsuario', '$q', function (ProductosEmpresaUsuario, $q) {
		var res = function (idEmpresa, id_usuario) {
			var delay = $q.defer();
			ProductosEmpresaUsuario.query({ idEmpresa: idEmpresa, id_usuario: id_usuario }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])
	.factory('ProductosEmpresaPaginador',  ['$resource',function ($resource) {
		return $resource(restServer + "productos/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/grupo/:id_grupo/user/:id_usuario/relacion/:id_relacion/sub-grupo/:id_sub_grupo");
	}])

	.factory('ProductosPaginador', ['ProductosEmpresaPaginador', '$q', function (ProductosEmpresaPaginador, $q) {
		var res = function (idEmpresa, paginator, id_usuario) {
			var delay = $q.defer();
			ProductosEmpresaPaginador.get({
				id_empresa: idEmpresa,
				pagina: paginator.currentPage,
				items_pagina: paginator.itemsPerPage,
				texto_busqueda: paginator.search,
				columna: paginator.column,
				direccion: paginator.direction,
				id_grupo: paginator.filter.grupo,
				id_sub_grupo:paginator.filter.subGrupo,
				id_usuario: id_usuario,
				id_relacion: paginator.filter.idrelacion,
			}, function (entidades) {
					delay.resolve(entidades);
				}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])

	.factory('BusquedaProductos',  ['$resource',function ($resource) {
		return $resource(restServer + "productos/empresa/:idEmpresa/almacen/:idAlmacen/texto/:texto");
	}])

	.factory('ProductosNombre', ['BusquedaProductos', '$q', function (BusquedaProductos, $q) {
		var res = function (idEmpresa, idAlmacen, texto) {
			var delay = $q.defer();
			BusquedaProductos.query({ idEmpresa: idEmpresa, idAlmacen: idAlmacen, texto: texto }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])

	.factory('BusquedaProductosPanel',  ['$resource',function ($resource) {
		return $resource(restServer + "productos-panel/empresa/:idEmpresa/almacen/:idAlmacen/user/:id_usuario");
	}])

	.factory('ProductosPanel', ['BusquedaProductosPanel', '$q', function (BusquedaProductosPanel, $q) {
		var res = function (idEmpresa, idAlmacen, id_usuario) {
			var delay = $q.defer();
			BusquedaProductosPanel.query({ idEmpresa: idEmpresa, idAlmacen: idAlmacen, id_usuario: id_usuario }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])

	.factory('ProductosPanelPaginadorRuta', ['$resource', function ($resource) {
		return $resource(restServer + "productos-panel/paginacion/empresa/:id_empresa/almacen/:id_almacen/user/:id_usuario/pagina/:pagina/texto/:texto/grupo/:id_grupo");
	}])

	.factory('ProductosPanelPaginador', ['ProductosPanelPaginadorRuta', '$q', function (ProductosPanelPaginadorRuta, $q) {
		var res = function (idEmpresa, idAlmacen, idUsuario, pagina, texto, idGrupo) {
			var delay = $q.defer();
			ProductosPanelPaginadorRuta.query({ id_empresa: idEmpresa, id_almacen: idAlmacen, id_usuario: idUsuario, pagina: pagina, texto: texto, id_grupo: idGrupo}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])
	.factory('ProductosPanelPaginadorRelacionesRuta', ['$resource', function ($resource) {
		return $resource(restServer + "productos-panel-relacion/paginacion/empresa/:id_empresa/almacen/:id_almacen/user/:id_usuario/pagina/:pagina/texto/:texto/grupo/:id_grupo/padre/:id_padre");
	}])

	.factory('ProductosPanelPaginadorRelaciones', ['ProductosPanelPaginadorRelacionesRuta', '$q', function (ProductosPanelPaginadorRelacionesRuta, $q) {
		var res = function (idEmpresa, idAlmacen, idUsuario, pagina, texto, idGrupo,idPadre) {
			var delay = $q.defer();
			ProductosPanelPaginadorRelacionesRuta.query({ id_empresa: idEmpresa, id_almacen: idAlmacen, id_usuario: idUsuario, pagina: pagina, texto: texto, id_grupo: idGrupo,id_padre:idPadre}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])
	.factory('VencimientoProductoEmpresa',  ['$resource',function ($resource) {
		return $resource(restServer + "vencimientos-productos/:id_empresa");
	}])

	.factory('VencimientosProductosEmpresa', ['VencimientoProductoEmpresa', '$q', function (VencimientoProductoEmpresa, $q) {
		var res = function (id_empresa) {
			var delay = $q.defer();
			VencimientoProductoEmpresa.query({ id_empresa: id_empresa }, function (entities) {
				delay.resolve(entities);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])

	.factory('CodigoSiguienteProductoEmpresa',  ['$resource',function ($resource) {
		return $resource(restServer + "producto/empresa/:id_empresa/siguiente-codigo");
	}])

	.factory('DatoCodigoSiguienteProductoEmpresa', ['CodigoSiguienteProductoEmpresa', '$q', function (CodigoSiguienteProductoEmpresa, $q) {
		var res = function (id_empresa) {
			var delay = $q.defer();
			CodigoSiguienteProductoEmpresa.get({ id_empresa: id_empresa }, function (entities) {
				delay.resolve(entities);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])

	.factory('CatalogoProductosEmpresa',  ['$resource',function ($resource) {
		return $resource(restServer + "catalogo-productos/empresa/:id_empresa/grupo/:id_grupo/user/:id_usuario");
	}])

	.factory('CatalogoProductos', ['CatalogoProductosEmpresa', '$q', function (CatalogoProductosEmpresa, $q) {
		var res = function (idEmpresa, grupo, id_usuario) {
			var delay = $q.defer();
			CatalogoProductosEmpresa.get({
				id_empresa: idEmpresa,
				id_grupo: grupo.id,
				id_usuario: id_usuario
			}, function (entidades) {
					delay.resolve(entidades);
				}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])


	///busqueda por subgrupos de producto.
	.factory('ProductosEmpresaPaginadorSubgrupos',  ['$resource',function ($resource) {
		return $resource(restServer + "productos/asignacion/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/subgrupo/:id_subgrupo/user/:id_usuario");
	}])

	.factory('ProductosPaginadorSubgrupos', ['ProductosEmpresaPaginadorSubgrupos', '$q', function (ProductosEmpresaPaginadorSubgrupos, $q) {
		var res = function (idEmpresa, paginator, id_usuario) {
			var delay = $q.defer();
			ProductosEmpresaPaginadorSubgrupos.get({
				id_empresa: idEmpresa,
				pagina: paginator.currentPage,
				items_pagina: paginator.itemsPerPage,
				texto_busqueda: paginator.search,
				columna: paginator.column,
				direccion: paginator.direction,
				id_subgrupo: paginator.filter.id,
				id_usuario: id_usuario
			}, function (entidades) {
					delay.resolve(entidades);
				}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])

	.factory('ProductosAsignadosPaginadorProveedor',  ['$resource',function ($resource) {
		return $resource(restServer + "productos/asignados/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/subgrupo/:id_subgrupo/user/:id_usuario/:ids");
	}])

	.factory('ProductosPaginadorAsignados', ['ProductosAsignadosPaginadorProveedor', '$q', function (ProductosAsignadosPaginadorProveedor, $q) {
		var res = function (idEmpresa, paginator, id_usuario, proveedorIds, todos) {
			var delay = $q.defer();
			ProductosAsignadosPaginadorProveedor.get({
				id_empresa: idEmpresa,
				pagina: paginator.currentPage,
				items_pagina: todos ? 0 : paginator.itemsPerPage,
				texto_busqueda: paginator.search,
				columna: paginator.column,
				direccion: paginator.direction,
				id_subgrupo: paginator.filter.id,
				id_usuario: id_usuario,
				ids: proveedorIds
			}, function (entidades) {
					delay.resolve(entidades);
				}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])
	.factory('GuardarPreciosProductosEmpresa',  ['$resource',function ($resource) {
		return $resource(restServer + "importar-precios-productos/:id_empresa");
	}])

	.factory('PreciosProductosEmpresa', ['GuardarPreciosProductosEmpresa', '$q', function (GuardarPreciosProductosEmpresa, $q) {
		var res = function (productos,idEmpresa) {
			var delay = $q.defer();
			GuardarPreciosProductosEmpresa.save({
				id_empresa: idEmpresa				
			},productos, function (entidades) {
					delay.resolve(entidades);
				}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])


	.factory('GuardarProductoCompra',  ['$resource',function ($resource) {
		return $resource(restServer + "productos/compras");
	}])

	.factory('AgregarProducto', ['GuardarProductoCompra', '$q', function (GuardarProductoCompra, $q) {
		var res = function (producto) {
			var delay = $q.defer();
			GuardarProductoCompra.save(producto, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])
	.factory('PromocionProducto',  ['$resource',function ($resource) {
		return $resource(restServer + "producto/promociones/:id_producto");
	}])

	.factory('GuardarPromocionProducto', ['PromocionProducto', '$q', function (PromocionProducto, $q) {
		var res = function (idProducto,datos) {
			var delay = $q.defer();
			PromocionProducto.save({id_producto:idProducto},datos, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])
	.factory('ObtenerPromocionesProducto', ['PromocionProducto', '$q', function (PromocionProducto, $q) {
		var res = function (idProducto) {
			var delay = $q.defer();
			PromocionProducto.get({id_producto:idProducto}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])
	.factory('PromocionProductoPuntaje',  ['$resource',function ($resource) {
		return $resource(restServer + "producto/promociones-puntaje/:id_producto");
	}])

	.factory('GuardarPromocionPuntaje', ['PromocionProductoPuntaje', '$q', function (PromocionProductoPuntaje, $q) {
		var res = function (idProducto,datos) {
			var delay = $q.defer();
			PromocionProductoPuntaje.save({id_producto:idProducto},datos, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])
	.factory('ObtenerPromocionesPuntajeProducto', ['PromocionProductoPuntaje', '$q', function (PromocionProductoPuntaje, $q) {
		var res = function (idProducto) {
			var delay = $q.defer();
			PromocionProductoPuntaje.get({id_producto:idProducto}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])
	.factory('PromocionProductoPuntajeHabilitados',  ['$resource',function ($resource) {
		return $resource(restServer + "producto/promociones-puntaje/habilitados/:id_producto");
	}])
	.factory('ObtenerProductoPuntajeHabilitados', ['PromocionProductoPuntajeHabilitados', '$q', function (PromocionProductoPuntajeHabilitados, $q) {
		var res = function (idProducto) {
			var delay = $q.defer();
			PromocionProductoPuntajeHabilitados.get({id_producto:idProducto}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])

	.factory('UnidadesMedidaProducto',  ['$resource',function ($resource) {
		return $resource(restServer + "productos/unidades_medida/empresa/:id_empresa");
	}])

	.factory('ListaUnidadesMedidaProducto', ['UnidadesMedidaProducto', '$q', function (UnidadesMedidaProducto, $q) {
		var res = function (idEmpresa) {
			var delay = $q.defer();
			UnidadesMedidaProducto.get({id_empresa:idEmpresa}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])
	.factory('VerificarHijosProductoRelacion',  ['$resource',function ($resource) {
		return $resource(restServer + "productos/producto/:id_producto/relacion/:id_relacion");
	}])

	.factory('VerificarHijos', ['VerificarHijosProductoRelacion', '$q', function (VerificarHijosProductoRelacion, $q) {
		var res = function (idProducto,idRelacion) {
			var delay = $q.defer();
			VerificarHijosProductoRelacion.get({id_producto:idProducto,id_relacion:idRelacion}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])
	.factory('VerificarProductosPradre',  ['$resource',function ($resource) {
		return $resource(restServer + "productos/productos-padre/:id_empresa");
	}])

	.factory('ProductosPradre', ['VerificarProductosPradre', '$q', function (VerificarProductosPradre, $q) {
		var res = function (idEmpresa) {
			var delay = $q.defer();
			VerificarProductosPradre.get({id_empresa:idEmpresa}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])
	.factory('VerificarPadreProductoRuta',  ['$resource',function ($resource) {
		return $resource(restServer + "productos/producto/relacion-padre/:id");
	}])

	.factory('VerificarPadreGet', ['VerificarPadreProductoRuta', '$q', function (VerificarPadreProductoRuta, $q) {
		var res = function (id) {
			var delay = $q.defer();
			VerificarPadreProductoRuta.get({id:id}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])

	.factory('ProductosHeredadosEmpresaCreacion',  ['$resource',function ($resource) {
		return $resource(restServer + "productos/heredados/empresa");
	}])
	.factory('GuardarProductosHeredadosEmpresaImportacion', ['ProductosHeredadosEmpresaCreacion', '$q', function (ProductosHeredadosEmpresaCreacion, $q) {
		var res = function (productos,idEmpresa) {
			var delay = $q.defer();
			ProductosHeredadosEmpresaCreacion.save(null,{ productos: productos, id_empresa:idEmpresa }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])

	.factory('ProductosPanelPedidosRuta', ['$resource', function ($resource) {
		return $resource(restServer + "productos-app/empresa/:id_empresa/user/:id_usuario");
	}])

	.factory('ProductosPanelPedidos', ['ProductosPanelPedidosRuta', '$q', function (ProductosPanelPedidosRuta, $q) {
		var res = function (idEmpresa, idUsuario) {
			var delay = $q.defer();
			ProductosPanelPedidosRuta.query({ id_empresa: idEmpresa, id_usuario: idUsuario}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])
	.factory('IdPadreAnteriorProducto', ['$resource', function ($resource) {
		return $resource(restServer + "productos-padre/:id_padre");
	}])

	.factory('ObtenerIdPadreAnterior', ['IdPadreAnteriorProducto', '$q', function (IdPadreAnteriorProducto, $q) {
		var res = function (id_padre) {
			var delay = $q.defer();
			IdPadreAnteriorProducto.get({ id_padre: id_padre}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])
	.factory('ProductosPanelPedidos', ['ProductosPanelPedidosRuta', '$q', function (ProductosPanelPedidosRuta, $q) {
		var res = function (idEmpresa, idUsuario) {
			var delay = $q.defer();
			ProductosPanelPedidosRuta.get({
				id_empresa: idEmpresa, 
				id_usuario: idUsuario,
			}, function (entidades) {
					delay.resolve(entidades);
				}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])

	.factory('rutaListaUnidadMedida', ['$resource', function ($resource) {
		return $resource(restServerSFE + "unidad-medida/sucursal/:id_sucursal");
	}])
	.factory('ListaUnidadMedidaSin', ['rutaListaUnidadMedida', '$q', function (rutaListaUnidadMedida, $q) {
		var res = function (id_sucursal) {
			var delay = $q.defer();
			rutaListaUnidadMedida.get({ id_sucursal: id_sucursal }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])


	.factory('rutaListaActividadSin', ['$resource', function ($resource) {
		return $resource(restServerSFE + "actividad/sucursal/:id_empresa/:id_sucursal");
	}])
	.factory('ListaActividadesSin', ['rutaListaActividadSin', '$q', function (rutaListaActividadSin, $q) {
		var res = function (id_empresa, id_sucursal) {
			var delay = $q.defer();
			rutaListaActividadSin.get({id_empresa, id_sucursal }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])

	.factory('rutaListaProductoServicio', ['$resource', function ($resource) {
		return $resource(restServerSFE + "producto-servicio/:id_empresa/:codigoActividad");
	}])
	.factory('ListaProductoServicioSin', ['rutaListaProductoServicio', '$q', function (rutaListaProductoServicio, $q) {
		var res = function (id_empresa,codigoActividad) {
			var delay = $q.defer();
			rutaListaProductoServicio.get({id_empresa: id_empresa, codigoActividad: codigoActividad }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])

	