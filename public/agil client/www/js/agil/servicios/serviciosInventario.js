angular.module('agil.servicios')


	.factory('Compra', ['$resource', function ($resource) {
		return $resource(restServer + "compras/:id", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('ActualizarDetalleMovimiento', ['$resource', function ($resource) {
		return $resource(restServer + "actualizar-movimiento-detalle/:id", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('VentaInfo', ['$resource', function ($resource) {
		return $resource(restServer + "ventas/:id/info", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('InfoVenta', ['VentaInfo', '$q', function (VentaInfo, $q) {
		var res = function (id_VentaInfo) {
			var delay = $q.defer();
			VentaInfo.get({ id: id_VentaInfo }, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('CompraDatos', ['Compra', '$q', function (Compra, $q) {
		var res = function (id_compra) {
			var delay = $q.defer();
			Compra.get({ id: id_compra }, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('CompraDatosCredito', ['Compra', '$q', function (Compra, $q) {
		var res = function (id_compra, datos) {
			var delay = $q.defer();
			Compra.update({ id: id_compra }, datos, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('SaveCompra', ['Compra', '$q', function (Compra, $q) {
		var res = function (datos) {
			var delay = $q.defer();
			Compra.save({}, datos, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])


	.factory('Venta', ['$resource', function ($resource) {
		return $resource(restServer + "ventas/:id", { id: '@id' },
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('EliminarVentaServicio', ['Venta', '$q', function (Venta, $q) {
		var res = function (venta) {
			var delay = $q.defer();
			Venta.save({ id: venta.id }, venta, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('ModificarVenta', ['Venta', '$q', function (Venta, $q) {
		var res = function (venta) {
			var delay = $q.defer();
			Venta.update({ id: venta.id }, venta, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('CompraEmpresaDatos', ['$resource', function ($resource) {
		return $resource(restServer + "compras/:id/empresa/:id_empresa", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('DatosCompra', ['CompraEmpresaDatos', '$q', function (CompraEmpresaDatos, $q) {
		var res = function (id_compra, id_empresa) {
			var delay = $q.defer();
			CompraEmpresaDatos.get({ id: id_compra, id_empresa: id_empresa }, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('CompraFiltro', function ($resource) {
		return $resource(restServer + "compras/:idsSucursales/inicio/:inicio/fin/:fin/razon-social/:razon_social/nit/:nit/monto/:monto/tipo-compra/:tipo_compra/sucursal/:sucursal/usuario/:usuario/user/:id_usuario/tipo/:tipo/:dociso", null,
			{
				'update': { method: 'PUT' }
			});
	})

	.factory('Compras', ['CompraFiltro', '$q', function (CompraFiltro, $q) {
		var res = function (sucursales, inicio, fin, razon_social, nit, monto, tipo_pago, sucursal, usuario, id_usuario, tipo, dociso) {
			var delay = $q.defer();
			CompraFiltro.query({ idsSucursales: sucursales, inicio: inicio, fin: fin, razon_social: razon_social, nit: nit, monto: monto, tipo_compra: tipo_pago, sucursal: sucursal, usuario: usuario, id_usuario: id_usuario, tipo: tipo, dociso }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('InventarioEmpresaPaginador', ['$resource', function ($resource) {
		return $resource(restServer + "inventarios/empresa/:id_empresa/almacen/:id_almacen/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/cantidad/:cantidad/grupo/:id_grupo/user/:id_usuario/verEstado/:verEstado/subGrupo/:id_subgrupo");
	}])

	.factory('InventarioPaginador', ['InventarioEmpresaPaginador', '$q', function (InventarioEmpresaPaginador, $q) {
		var res = function (idEmpresa, idAlmacen, pagina, itemsPagina, texto, columna, direccion, cantidad, grupo, subgrupo, id_usuario, verEstado) {
			var delay = $q.defer();
			InventarioEmpresaPaginador.get({ id_empresa: idEmpresa, id_almacen: idAlmacen, pagina: pagina, items_pagina: itemsPagina, texto_busqueda: texto, columna: columna, direccion: direccion, cantidad: cantidad, id_grupo: (grupo !== undefined && grupo !== null && grupo !== "") ? grupo : 0, id_subgrupo: (subgrupo !== undefined && subgrupo !== null && subgrupo !== "") ? subgrupo : 0, id_usuario: id_usuario, verEstado: verEstado }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('Inventario', ['$resource', function ($resource) {
		return $resource(restServer + "inventarios/:id_empresa", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('InventariosIncial', ['$resource', function ($resource) {
		return $resource(restServer + "inventarios", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('Inventarios', ['Inventario', '$q', function (Inventario, $q) {
		var res = function (id_empresa) {
			var delay = $q.defer();
			Inventario.query({ id_empresa: id_empresa }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('InventarioInicial', ['InventariosIncial', '$q', function (InventariosIncial, $q) {
		var res = function (producto) {
			var delay = $q.defer();
			InventariosIncial.save(producto, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])



	/*.factory('ActualizarVenta', ['Venta', '$q', function (Venta, $q) {
		var res = function (venta) {
			var delay = $q.defer();
			Venta.update({ id: venta.id}, venta, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])*/

	.factory('FacturaVentaEmail', ['$resource', function ($resource) {
		return $resource(restServer + "ventas/send/mail", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('EmailFacturaVentas', ['FacturaVentaEmail', '$q', function (FacturaVentaEmail, $q) {
		var res = function (data) {
			var delay = $q.defer();
			FacturaVentaEmail.save({}, data, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('VentaEmpresaDatos', ['$resource', function ($resource) {
		return $resource(restServer + "ventas/:id/empresa/:id_empresa", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('DatosVenta', ['VentaEmpresaDatos', '$q', function (VentaEmpresaDatos, $q) {
		var res = function (id_venta, id_empresa) {
			var delay = $q.defer();
			VentaEmpresaDatos.get({ id: id_venta ? id_venta : 0, id_empresa: id_empresa ? id_empresa : 0 }, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('PagosVentaCreditos', ['VentaEmpresaDatos', '$q', function (VentaEmpresaDatos, $q) {
		var res = function (id_venta, id_empresa, datos) {
			var delay = $q.defer();
			VentaEmpresaDatos.update({ id: id_venta, id_empresa: id_empresa }, datos, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('CompensacionVentaEmpresaDatos', ['$resource', function ($resource) {
		return $resource(restServer + "compensacion/ventas/:id/empresa/:id_empresa/cliente/:id_cliente", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('PagosVentaCreditosAnticipo', ['CompensacionVentaEmpresaDatos', '$q', function (CompensacionVentaEmpresaDatos, $q) {
		var res = function (id_venta, id_empresa, id_cliente, datos) {
			var delay = $q.defer();
			CompensacionVentaEmpresaDatos.update({ id: id_venta, id_empresa: id_empresa, id_cliente: id_cliente }, datos, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('CompensacionCompraEmpresaDatos', ['$resource', function ($resource) {
		return $resource(restServer + "compensacion/compra/:id/empresa/:id_empresa/proveedor/:id_proveedor", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('PagosCompraCreditosAnticipo', ['CompensacionCompraEmpresaDatos', '$q', function (CompensacionCompraEmpresaDatos, $q) {
		var res = function (id_venta, id_empresa, id_proveedor, datos) {
			var delay = $q.defer();
			CompensacionCompraEmpresaDatos.update({ id: id_venta, id_empresa: id_empresa, id_proveedor: id_proveedor }, datos, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('DetallesVentasExpressPorFactura', ['$resource', function ($resource) {
		return $resource(restServer + "detallesVentas-express/mesero/:mesero/liquidacion/:id_liquidacion", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ObtenerDetallesVentasExpressPorFactura', ['DetallesVentasExpressPorFactura', '$q', function (DetallesVentasExpressPorFactura, $q) {
		var res = function (mesero, id_liquidacion) {
			var delay = $q.defer();
			DetallesVentasExpressPorFactura.get({ mesero: mesero, id_liquidacion: id_liquidacion }, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('CorrelativoDetalleProduccion', ['$resource', function ($resource) {
		return $resource(restServer + "obtener-correlativo-detalle-produccion/fecha/:fecha/id_almacen/:id_almacen", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('UltimoCorrelativoDetalleProduccion', ['CorrelativoDetalleProduccion', '$q', function (CorrelativoDetalleProduccion, $q) {
		var res = function (fecha, id_almacen) {
			var delay = $q.defer();
			CorrelativoDetalleProduccion.get({ fecha: fecha, id_almacen: id_almacen }, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('VentaFiltro', ['$resource', function ($resource) {
		return $resource(restServer + "ventas/:idsSucursales/inicio/:inicio/fin/:fin/razon-social/:razon_social/nit/:nit/monto/:monto/tipo-venta/:tipo_venta/sucursal/:sucursal/transaccion/:transaccion/usuario/:usuario/estado/:estado/express/:tipo_express/almacen_traspaso/:almacen_traspaso/sucursal_traspaso/:sucursal_traspaso/:id_usuario", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('Ventas', ['VentaFiltro', '$q', function (VentaFiltro, $q) {
		var res = function (sucursales, inicio, fin, filtro, id_usuario) {
			var delay = $q.defer();
			VentaFiltro.query({
				idsSucursales: sucursales,
				inicio: inicio, fin: fin,
				razon_social: filtro.razon_social,
				nit: filtro.nit,
				monto: filtro.monto,
				tipo_venta: filtro.tipo_pago,
				sucursal: filtro.sucursal,
				transaccion: filtro.transaccion,
				usuario: filtro.usuario,
				estado: filtro.estado,
				tipo_express: filtro.tipo_filtro_express,
				almacen_traspaso: filtro.almacenDestino,
				sucursal_traspaso: filtro.sucursalDestino,
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

	.factory('VentaFiltroProducto', ['$resource', function ($resource) {
		return $resource(restServer + "ventasProductos/:idsSucursales/inicio/:inicio/fin/:fin/sucursal/:sucursal/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('VentasProductos', ['VentaFiltroProducto', '$q', function (VentaFiltro, $q) {
		var res = function (paginador) {
			var delay = $q.defer();
			VentaFiltro.get({
				idsSucursales: paginador.filter.sucursalUsuario,
				inicio: paginador.filter.inicio,
				fin: paginador.filter.fin,
				pagina: paginador.currentPage,
				items_pagina: paginador.itemsPerPage,
				texto_busqueda: paginador.search,
				columna: paginador.column,
				direccion: paginador.direction,
				sucursal: paginador.filter.sucursal
			}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('detalleVentaEmpresa', ['$resource', function ($resource) {
		return $resource(restServer + "ventasDetalleEmpresa/:idsSucursales/inicio/:inicio/fin/:fin/sucursal/:sucursal/idEmpresa/:idEmpresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('ventasDetalleEmpresa', ['detalleVentaEmpresa', '$q', function (detalleEmpresa, $q) {
		var res = function (paginador) {
			var delay = $q.defer();
			detalleEmpresa.get({
				idsSucursales: paginador.filter.idsSucursales,
				inicio: paginador.filter.inicio,
				fin: paginador.filter.fin,
				sucursal: paginador.filter.sucursal,
				idEmpresa: paginador.filter.idEmpresa,
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
		};
		return res;
	}])


	.factory('detalleProductos', ['$resource', function ($resource) {
		return $resource(restServer + "detalle/:inicio/:fin/:idEmpresa/:id", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('detalle', ['detalleProductos', '$q', function (detalle, $q) {
		var res = function (inicio, fin, idEmpresa, id) {
			var delay = $q.defer();
			detalle.query({ inicio: inicio, fin: fin, idEmpresa: idEmpresa, id: id }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('OptenerRendicionesCompraDoc', ['$resource', function ($resource) {
		return $resource(restServer + "verificar-doc-rendicion/:id_sucursal/doc/:doc", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('RendicionesCompraDoc', ['OptenerRendicionesCompraDoc', '$q', function (OptenerRendicionesCompraDoc, $q) {
		var res = function (id_sucursal, doc) {
			var delay = $q.defer();
			OptenerRendicionesCompraDoc.query({ id_sucursal: id_sucursal, doc: doc }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('OptenerComprasRendicionDoc', ['$resource', function ($resource) {
		return $resource(restServer + "verificar-doc-rendicion-compras/:id_sucursal/doc/:doc", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('ComprasRendicionDoc', ['OptenerComprasRendicionDoc', '$q', function (OptenerComprasRendicionDoc, $q) {
		var res = function (id_sucursal, doc) {
			var delay = $q.defer();
			OptenerComprasRendicionDoc.get({ id_sucursal: id_sucursal, doc: doc }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('detalleEmpresas', ['$resource', function ($resource) {
		return $resource(restServer + "detalleEmpresa/:inicio/:fin/:idEmpresa/:id", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('detalleEmpresa', ['detalleEmpresas', '$q', function (detalle, $q) {
		var res = function (inicio, fin, idEmpresa, id) {
			var delay = $q.defer();
			detalle.query({ inicio: inicio, fin: fin, idEmpresa: idEmpresa, id: id }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('VentaContado', ['$resource', function ($resource) {
		return $resource(restServer + "ventas-contado/:idsSucursales/inicio/:inicio/fin/:fin/usuario/:id_usuario/cierre-caja/:id_cierre_caja", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('VentasContado', ['VentaContado', '$q', function (VentaContado, $q) {
		var res = function (sucursales, inicio, fin, id_usuario, id_cierre_caja, mesero) {
			var delay = $q.defer();
			VentaContado.query({ idsSucursales: sucursales, inicio: inicio, fin: fin, id_usuario: id_usuario, id_cierre_caja: id_cierre_caja }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('VentaCredito', ['$resource', function ($resource) {
		return $resource(restServer + "ventas-credito/:idsSucursales/inicio/:inicio/fin/:fin/usuario/:id_usuario/cierre-caja/:id_cierre_caja", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('VentasCredito', ['VentaCredito', '$q', function (VentaCredito, $q) {
		var res = function (sucursales, inicio, fin, id_usuario, id_cierre_caja) {
			var delay = $q.defer();
			VentaCredito.query({ idsSucursales: sucursales, inicio: inicio, fin: fin, id_usuario: id_usuario, id_cierre_caja: id_cierre_caja }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('VentaTarjetaCredito', ['$resource', function ($resource) {
		return $resource(restServer + "ventas-tarjeta-credito/:idsSucursales/inicio/:inicio/fin/:fin/usuario/:id_usuario/cierre-caja/:id_cierre_caja", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('VentasTarjetaCredito', ['VentaTarjetaCredito', '$q', function (VentaTarjetaCredito, $q) {
		var res = function (sucursales, inicio, fin, id_usuario, id_cierre_caja) {
			var delay = $q.defer();
			VentaTarjetaCredito.query({ idsSucursales: sucursales, inicio: inicio, fin: fin, id_usuario: id_usuario, id_cierre_caja: id_cierre_caja }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('VentaContadoMesero', ['$resource', function ($resource) {
		return $resource(restServer + "ventas-contado-mesero/:idsSucursales/inicio/:inicio/fin/:fin/usuario/:id_usuario/cierre-caja/:id_cierre_caja_mesero/mesero/:id_mesero", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('VentasContadoMesero', ['VentaContadoMesero', '$q', function (VentaContadoMesero, $q) {
		var res = function (sucursales, inicio, fin, id_usuario, id_cierre_caja_mesero, idMesero) {
			var delay = $q.defer();
			VentaContadoMesero.query({ idsSucursales: sucursales, inicio: inicio, fin: fin, id_usuario: id_usuario, id_cierre_caja_mesero: id_cierre_caja_mesero, id_mesero: idMesero }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('VentaCreditoMesero', ['$resource', function ($resource) {
		return $resource(restServer + "ventas-credito-mesero/:idsSucursales/inicio/:inicio/fin/:fin/usuario/:id_usuario/cierre-caja/:id_cierre_caja_mesero/mesero/:id_mesero", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('VentasCreditoMesero', ['VentaCreditoMesero', '$q', function (VentaCreditoMesero, $q) {
		var res = function (sucursales, inicio, fin, id_usuario, id_cierre_caja_mesero, idMesero) {
			var delay = $q.defer();
			VentaCreditoMesero.query({ idsSucursales: sucursales, inicio: inicio, fin: fin, id_usuario: id_usuario, id_cierre_caja_mesero: id_cierre_caja_mesero, id_mesero: idMesero }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('PagoVenta', ['$resource', function ($resource) {
		return $resource(restServer + "pagos-venta/:idsSucursales/inicio/:inicio/fin/:fin/usuario/:id_usuario/cierre-caja/:id_cierre_caja", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('PagosVenta', ['PagoVenta', '$q', function (PagoVenta, $q) {
		var res = function (sucursales, inicio, fin, id_usuario, id_cierre_caja) {
			var delay = $q.defer();
			PagoVenta.query({ idsSucursales: sucursales, inicio: inicio, fin: fin, id_usuario: id_usuario, id_cierre_caja: id_cierre_caja }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('PagoCompra', ['$resource', function ($resource) {
		return $resource(restServer + "pagos-compra/:idsSucursales/inicio/:inicio/fin/:fin/usuario/:id_usuario/cierre-caja/:id_cierre_caja", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('PagosCompra', ['PagoCompra', '$q', function (PagoCompra, $q) {
		var res = function (sucursales, inicio, fin, id_usuario, id_cierre_caja) {
			var delay = $q.defer();
			PagoCompra.query({ idsSucursales: sucursales, inicio: inicio, fin: fin, id_usuario: id_usuario, id_cierre_caja: id_cierre_caja }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('VentaEmpresa', ['$resource', function ($resource) {
		return $resource(restServer + "ventas/:id_empresa/inicio/:inicio/fin/:fin", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('VentasEmpresa', ['VentaEmpresa', '$q', function (VentaEmpresa, $q) {
		var res = function (idEmpresa, inicio, fin) {
			var delay = $q.defer();
			VentaEmpresa.query({ id_empresa: idEmpresa, inicio: inicio, fin: fin }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('IngresosPorInventario', ['$resource', function ($resource) {
		return $resource(restServer + "ingreso-por-inventario/:id_empresa", { id_empresa: '@idEmpresa' },
			{
				get: { method: 'GET', isArray: true }
			});
	}])
	.factory('IngPorInventario', ['IngresosPorInventario', '$q', function (IngresosPorInventario, $q) {
		var res = function (idEmpresa) {
			var delay = $q.defer();
			IngresosPorInventario.get({ id_empresa: idEmpresa }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('IngresosPorInventarioDetalle', ['$resource', function ($resource) {
		return $resource(restServer + "ingreso-por-inventario/detalle/:id_movimiento", { id_movimiento: '@idMovimiento' },
			{
				get: { method: 'GET', isArray: true }
			});
	}])
	.factory('IngPorInventarioDetalle', ['IngresosPorInventarioDetalle', '$q', function (IngresosPorInventarioDetalle, $q) {
		var res = function (idMovimiento) {
			var delay = $q.defer();
			IngresosPorInventarioDetalle.get({ id_movimiento: idMovimiento }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('IngresosPorInventarioTodoRuta', ['$resource', function ($resource) {
		return $resource(restServer + "ingreso-por-inventario/prueba", null,
			{
				query: { method: 'GET', params: {}, isArray: true }
			});
	}])

	.factory('IngresosPorInventarioTodo', ['IngresosPorInventarioTodoRuta', '$q', function (IngresosPorInventarioTodoRuta, $q) {
		var res = function (inventarios) {
			var delay = $q.defer();
			IngresosPorInventarioTodoRuta.query({ ids: inventarios }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	/*.factory('IngPorInventario', function($resource) {
			return $resource(restServer+"ingreso-por-inventario/:id_empresa", null,
			{
				'update': { method:'PUT' }
			});
	})
	
	.factory('IngresosPorInventario', ['IngPorInventario','$q',function(IngPorInventario, $q) 
		{
		var res = function(idEmpresa) 
		{
			var delay = $q.defer();
			IngPorInventario.query({id_empresa:idEmpresa},function(entidades) 
			{        
				delay.resolve(entidades);
			}, function(error) 
				{
					delay.reject(error);
				});
			return delay.promise;
		};
			return res;
		}])*/
	.factory('ActualizacionInventario', ['$resource', function ($resource) {
		return $resource(restServer + "inventario/:id", { id: '@id' },
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('CompraContado', ['$resource', function ($resource) {
		return $resource(restServer + "compras-contado/:idsSucursales/inicio/:inicio/fin/:fin/usuario/:id_usuario/cierre-caja/:id_cierre_caja", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('ComprasContado', ['CompraContado', '$q', function (CompraContado, $q) {
		var res = function (sucursales, inicio, fin, id_usuario, id_cierre_caja) {
			var delay = $q.defer();
			CompraContado.query({ idsSucursales: sucursales, inicio: inicio, fin: fin, id_usuario: id_usuario, id_cierre_caja: id_cierre_caja }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('CompraCredito', ['$resource', function ($resource) {
		return $resource(restServer + "compras-credito/:idsSucursales/inicio/:inicio/fin/:fin/usuario/:id_usuario/cierre-caja/:id_cierre_caja", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('ComprasCredito', ['CompraCredito', '$q', function (CompraCredito, $q) {
		var res = function (sucursales, inicio, fin, id_usuario, id_cierre_caja) {
			var delay = $q.defer();
			CompraCredito.query({ idsSucursales: sucursales, inicio: inicio, fin: fin, id_usuario: id_usuario, id_cierre_caja: id_cierre_caja }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('VerificarExesoCredito', ['$resource', function ($resource) {
		return $resource(restServer + "cliente/verificar-credito/:id_cliente/tipo/:id_tipo", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('VerificarLimiteCredito', ['VerificarExesoCredito', '$q', function (VerificarExesoCredito, $q) {
		var res = function (venta) {
			var delay = $q.defer();
			VerificarExesoCredito.get({ id_cliente: venta.cliente.id, id_tipo: venta.tipoPago.id }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('CompraDetallesPedidoEmpresa', ['$resource', function ($resource) {
		return $resource(restServer + "compra/pedido/detalles/:id_pedido/:tipo", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('DetallesPedidosCompraEmpresa', ['CompraDetallesPedidoEmpresa', '$q', function (CompraDetallesPedidoEmpresa, $q) {
		var res = function (idPedido, tipo) {
			var delay = $q.defer();
			CompraDetallesPedidoEmpresa.get({
				id_pedido: idPedido, tipo: tipo
			}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('AlmacenesSucursales', ['$resource', function ($resource) {
		return $resource(restServer + "almacenes/sucursales", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('ObtenerAlmacenesSucursales', ['AlmacenesSucursales', '$q', function (AlmacenesSucursales, $q) {
		var res = function (id_empresa, sucursales) {
			sucursales = sucursales.map(sucursal => sucursal.id)
			var delay = $q.defer();
			AlmacenesSucursales.save({ id_empresa: id_empresa, sucursales: sucursales }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('CompraPedidosEmpresa', ['$resource', function ($resource) {
		return $resource(restServer + "compra/pedido/empresa/:id_empresa/pagina/:pagina/items_pagina/:items_pagina/texto_busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/fecha_inicio/:fecha_inicio/fecha_fin/:fecha_fin/correlativo/:correlativo/:dociso/:tipo", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('ListaCompraPedidosEmpresa', ['CompraPedidosEmpresa', '$q', function (CompraPedidosEmpresa, $q) {
		var res = function (paginator) {
			var delay = $q.defer();
			CompraPedidosEmpresa.get({
				id_empresa: paginator.filter.id_empresa,
				pagina: paginator.currentPage,
				items_pagina: paginator.itemsPerPage,
				texto_busqueda: paginator.search,
				columna: paginator.column,
				direccion: paginator.direction,
				fecha_inicio: paginator.filter.fecha_inicio || 0,
				fecha_fin: paginator.filter.fecha_fin || 0,
				correlativo: paginator.filter.correlativo || 0,
				dociso: paginator.filter.dociso || 0,
				tipo: paginator.filter.tipo
			}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('VentaReposocionPedidosEmpresa', ['$resource', function ($resource) {
		return $resource(restServer + "venta/ordenes-reposicion/empresa/:id_empresa/pagina/:pagina/items_pagina/:items_pagina/texto_busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/sucursal/:id_sucursal/almacen/:id_almacen", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('ListaReposicionPedidosEmpresa', ['VentaReposocionPedidosEmpresa', '$q', function (VentaReposocionPedidosEmpresa, $q) {
		var res = function (paginator) {
			var delay = $q.defer();
			VentaReposocionPedidosEmpresa.get({
				id_empresa: paginator.filter.id_empresa,
				pagina: paginator.currentPage,
				items_pagina: paginator.itemsPerPage,
				texto_busqueda: paginator.search,
				columna: paginator.column,
				direccion: paginator.direction,
				id_sucursal: paginator.filter.id_sucursal,
				id_almacen: paginator.filter.id_almacen,
			}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('VentaDetalleReposocionPedidosEmpresa', ['$resource', function ($resource) {
		return $resource(restServer + "venta/detalles-ordenes-reposicion/id/:id_reposicion/almacen/:id_almacen", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('DetallesReposicionAlmacenEmpresa', ['VentaDetalleReposocionPedidosEmpresa', '$q', function (VentaDetalleReposocionPedidosEmpresa, $q) {
		var res = function (idRepo, idAlmacen) {
			var delay = $q.defer();
			VentaDetalleReposocionPedidosEmpresa.get({
				id_reposicion: idRepo,
				id_almacen: idAlmacen
			}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('RegistroPedidoPorId', ['$resource', function ($resource) {
		return $resource(restServer + "compra/pedido/:id_pedido", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('ObtenerRegistroPedidoPorId', ['RegistroPedidoPorId', '$q', function (RegistroPedidoPorId, $q) {
		var res = function (id) {
			var delay = $q.defer();
			RegistroPedidoPorId.get({ id_pedido: id }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('ServiciosVentas', ['$resource', function ($resource) {
		return $resource(restServer + "servicios-venta/empresa/:id_empresa/busqueda/:texto_busqueda", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('ListaServiciosVentas', ['ServiciosVentas', 'IndexDbListaServiciosVentas', 'IndexDbSaveServiciosVentas', '$q', '$window', function (ServiciosVentas, IndexDbListaServiciosVentas, IndexDbSaveServiciosVentas, $q,$window) {
		var res = function (idEmpresa, texto) {
			const online = $window.navigator.onLine;
			if (!online) {
				return IndexDbListaServiciosVentas(idEmpresa);
			}
			var delay = $q.defer();
			ServiciosVentas.get({ id_empresa: idEmpresa, texto_busqueda: texto }, function (entidades) {
				if (texto == 0) {
					IndexDbSaveServiciosVentas(entidades)
				}
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('GuardarListaServiciosVentas', ['ServiciosVentas', '$q', function (ServiciosVentas, $q) {
		var res = function (idEmpresa, datos) {
			var delay = $q.defer();
			ServiciosVentas.save({ id_empresa: idEmpresa, texto_busqueda: 0 }, datos, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('VentasServicioImportados', ['$resource', function ($resource) {
		return $resource(restServer + "importacion-ventas-servicio", { id: '@id' },
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('GuardarVentasImportados', ['VentasServicioImportados', '$q', function (VentasServicioImportados, $q) {
		var res = function (ventas, arregloServicios, arregloClientes) {
			var delay = $q.defer();
			VentasServicioImportados.save(null, { ventas: ventas, arregloServicios: arregloServicios, arregloClientes: arregloClientes }, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('EliminarDetalleVentaEdicionVenta', ['$resource', function ($resource) {
		return $resource(restServer + "eliminar-detalle-venta/movimiento/:id_movimiento", { id: '@id' },
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('EliminarDetalleVentaEdicion', ['EliminarDetalleVentaEdicionVenta', '$q', function (EliminarDetalleVentaEdicionVenta, $q) {
		var res = function (detalleVenta, idMov, venta) {
			var delay = $q.defer();
			EliminarDetalleVentaEdicionVenta.update({ id_movimiento: idMov }, { detalleVenta: detalleVenta, venta: venta }, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('ImportacionComprasIngresoDiario', ['$resource', function ($resource) {
		return $resource(restServer + "importar-compras-ingresos-diarios/empresa/:id_empresa", { id_empresa: '@id_empresa' },
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('GuardarImportacionComprasIngresoDiario', ['ImportacionComprasIngresoDiario', '$q', function (ImportacionComprasIngresoDiario, $q) {
		var res = function (compras, proveedores, centrosCosto, productos, idEmpresa) {
			var delay = $q.defer();
			ImportacionComprasIngresoDiario.save({ id_empresa: idEmpresa }, { proveedores: proveedores, compras: compras, centrosCosto: centrosCosto, productos: productos }, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('ProductoVentasTraspaso', ['$resource', function ($resource) {
		return $resource(restServer + "importar-ventas-Traspaso/producto/empresa/:id_empresa", { id_empresa: '@id_empresa' },
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ObtenerProductoVentasTraspaso', ['ProductoVentasTraspaso', '$q', function (ProductoVentasTraspaso, $q) {
		var res = function (producto, detalle, venta, idEmpresa) {
			var delay = $q.defer();
			ProductoVentasTraspaso.save({ id_empresa: idEmpresa }, { venta: venta, detalleVenta: detalle, producto: producto }, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('ImportacionVentasTraspaso', ['$resource', function ($resource) {
		return $resource(restServer + "importar-ventas-Traspaso/empresa/:id_empresa", { id_empresa: '@id_empresa' },
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('GuardarImportacionVentasTraspaso', ['ImportacionVentasTraspaso', '$q', function (ImportacionVentasTraspaso, $q) {
		var res = function (ventas, idEmpresa) {
			var delay = $q.defer();
			ImportacionVentasTraspaso.save({ id_empresa: idEmpresa }, { ventas: ventas }, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('ImportacionVentasFacturacion', ['$resource', function ($resource) {
		return $resource(restServer + "importar-ventas-facturacion/empresa/:id_empresa", { id_empresa: '@id_empresa' },
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('GuardarImportacionVentasFacturacion', ['ImportacionVentasFacturacion', '$q', function (ImportacionVentasFacturacion, $q) {
		var res = function (ventas, clientes, idEmpresa) {
			var delay = $q.defer();
			ImportacionVentasFacturacion.save({ id_empresa: idEmpresa }, { clientes: clientes, ventas: ventas }, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('ImportacionPagosCompras', ['$resource', function ($resource) {
		return $resource(restServer + "importar-pagos-compra/empresa/:id_empresa", { id_empresa: '@id_empresa' },
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('GuardarImportacionPagosCompras', ['ImportacionPagosCompras', '$q', function (ImportacionPagosCompras, $q) {
		var res = function (pagos, idEmpresa) {
			var delay = $q.defer();
			ImportacionPagosCompras.save({ id_empresa: idEmpresa }, { pagos: pagos }, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('ImportacionPagosVentas', ['$resource', function ($resource) {
		return $resource(restServer + "importar-pagos-ventas/empresa/:id_empresa", { id_empresa: '@id_empresa' },
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('GuardarImportacionPagosVenta', ['ImportacionPagosVentas', '$q', function (ImportacionPagosVentas, $q) {
		var res = function (pagos, idEmpresa) {
			var delay = $q.defer();
			ImportacionPagosVentas.save({ id_empresa: idEmpresa }, { pagos: pagos }, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('VentaEmpresaDatosMailer', ['$resource', function ($resource) {
		return $resource(restServer + "ventas/mail/:token", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('DatosVentaMailer', ['VentaEmpresaDatosMailer', '$q', function (VentaEmpresaDatosMailer, $q) {
		var res = function (token) {
			var delay = $q.defer();
			VentaEmpresaDatosMailer.get({ token: token }, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('detalleVentaClientePuntajeRuta', ['$resource', function ($resource) {
		return $resource(restServer + "ventas-cliente-puntajes/:idsSucursales/inicio/:inicio/fin/:fin/sucursal/:sucursal/idEmpresa/:idEmpresa/ubicacion/:ubicacion/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('ventasDetalleClientePuntajes', ['detalleVentaClientePuntajeRuta', '$q', function (detalleVentaClientePuntajeRuta, $q) {
		var res = function (paginador) {
			var delay = $q.defer();
			detalleVentaClientePuntajeRuta.get({
				idsSucursales: paginador.filter.idsSucursales,
				inicio: paginador.filter.inicio,
				fin: paginador.filter.fin,
				sucursal: paginador.filter.sucursal,
				idEmpresa: paginador.filter.idEmpresa,
				ubicacion: paginador.filter.ubicacion,
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
		};
		return res;
	}])

	.factory('detalleClientePuntajeRuta', ['$resource', function ($resource) {
		return $resource(restServer + "detalle-cliente-puntaje/:inicio/:fin/:idEmpresa/:id", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('detalleClientePuntaje', ['detalleClientePuntajeRuta', '$q', function (detalle, $q) {
		var res = function (inicio, fin, idEmpresa, id) {
			var delay = $q.defer();
			detalle.query({ inicio: inicio, fin: fin, idEmpresa: idEmpresa, id: id }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('VentasMesasRuta', ['$resource', function ($resource) {
		return $resource(restServer + "ventas/mesas/mesero/:mesero/mesa/:mesa/user/:id_usuario", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('UpdateVentasMesasRuta', ['VentasMesasRuta', '$q', function (VentasMesasRuta, $q) {
		var res = function (cierremesa, id_usuario) {
			var delay = $q.defer();
			VentasMesasRuta.update({ mesero: cierremesa.mesero.id, mesa: cierremesa.mesa, id_usuario: id_usuario }, cierremesa, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('InfoVentasMesas', ['VentasMesasRuta', '$q', function (VentasMesasRuta, $q) {
		var res = function (mesero, mesa, id_usuario) {
			var delay = $q.defer();
			VentasMesasRuta.query({ mesero: mesero, mesa: mesa, id_usuario: id_usuario }, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('RevisionInventariosRuta', ['$resource', function ($resource) {
		return $resource(restServer + "revision-inventarios/empresa/:id_empresa", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('RevisionInventarios', ['RevisionInventariosRuta', '$q', function (RevisionInventariosRuta, $q) {
		var res = function (idEmpresa, datos) {
			var delay = $q.defer();
			RevisionInventariosRuta.save({ id_empresa: idEmpresa }, datos, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('ReporteMovimientosConsolidadosRuta', ['$resource', function ($resource) {
		return $resource(restServer + "productos/movimientos-consolidados/empresa/:id_empresa/sucursal/:id_sucursal/almacen/:id_almacen/grupo/:grupo/inicio/:inicio/fin/:fin");
	}])

	.factory('ReporteMovimientosConsolidados', ['ReporteMovimientosConsolidadosRuta', '$q', function (ReporteMovimientosConsolidadosRuta, $q) {
		var res = function (idEmpresa, filtro) {
			var delay = $q.defer();
			ReporteMovimientosConsolidadosRuta.query({
				id_empresa: idEmpresa,
				id_sucursal: filtro.sucursal.id,
				id_almacen: filtro.almacen.id,
				grupo: filtro.grupo ? filtro.grupo.id : 0,
				inicio: filtro.inicio,
				fin: filtro.fin
			}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('VentaFiltroProductoPorMesero', ['$resource', function ($resource) {
		return $resource(restServer + "ventasProductos/:idsSucursales/inicio/:inicio/fin/:fin/sucursal/:sucursal/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/mesero/:id_mesero", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('VentasProductosMesero', ['VentaFiltroProductoPorMesero', '$q', function (VentaFiltroProductoPorMesero, $q) {
		var res = function (paginador, mesero) {
			var delay = $q.defer();
			VentaFiltroProductoPorMesero.get({
				idsSucursales: paginador.filter.sucursalUsuario,
				inicio: paginador.filter.inicio,
				fin: paginador.filter.fin,
				pagina: paginador.currentPage,
				items_pagina: paginador.itemsPerPage,
				texto_busqueda: paginador.search,
				columna: paginador.column,
				direccion: paginador.direction,
				sucursal: paginador.filter.sucursal,
				id_mesero: mesero
			}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}]).factory('VentaFiltroProductoPorMesa', ['$resource', function ($resource) {
		return $resource(restServer + "ventasProductos/:idsSucursales/inicio/:inicio/fin/:fin/sucursal/:sucursal/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/mesa/:id_mesa", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('VentasProductosMesa', ['VentaFiltroProductoPorMesa', '$q', function (VentaFiltroProductoPorMesa, $q) {
		var res = function (paginador, mesa) {
			var delay = $q.defer();
			VentaFiltroProductoPorMesa.get({
				idsSucursales: paginador.filter.sucursalUsuario,
				inicio: paginador.filter.inicio,
				fin: paginador.filter.fin,
				pagina: paginador.currentPage,
				items_pagina: paginador.itemsPerPage,
				texto_busqueda: paginador.search,
				columna: paginador.column,
				direccion: paginador.direction,
				sucursal: paginador.filter.sucursal,
				id_mesa: mesa
			}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('InventarioEmpresaReporte', ['$resource', function ($resource) {
		return $resource(restServer + "inventarios/reporte/:id_empresa/almacen/:id_almacen/busqueda/:texto_busqueda/grupo/:id_grupo/subGrupo/:id_subgrupo");
	}])

	.factory('InventarioReporte', ['InventarioEmpresaReporte', '$q', function (InventarioEmpresaReporte, $q) {
		var res = function (idEmpresa, idAlmacen, texto, grupo, subgrupo) {
			var delay = $q.defer();
			InventarioEmpresaReporte.get({ id_empresa: idEmpresa, id_almacen: idAlmacen, texto_busqueda: texto, id_grupo: (grupo !== undefined && grupo !== null && grupo !== "") ? grupo : 0, id_subgrupo: (subgrupo !== undefined && subgrupo !== null && subgrupo !== "") ? subgrupo : 0 }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('ObteneralifiacionesProveedores', ['$resource', function ($resource) {
		return $resource(restServer + "calificacion-proveedor/sucursal/:id_sucursal/desde/:desde/hasta/:hasta/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion");
	}])

	.factory('BuscarCalifiacionesProveedores', ['ObteneralifiacionesProveedores', '$q', function (ObteneralifiacionesProveedores, $q) {
		var res = function (paginador) {
			var delay = $q.defer();
			ObteneralifiacionesProveedores.get({
				id_sucursal: paginador.filter.id_sucursal,
				desde: paginador.filter.fecha_inicio,
				hasta: paginador.filter.fecha_fin,
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
		};
		return res;
	}])
	.factory('DetalleCalificacionesCompraProve', ['$resource', function ($resource) {
		return $resource(restServer + "calificacion-proveedor/:id_proveedor", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('DetallesCalifiacionProveedor', ['DetalleCalificacionesCompraProve', '$q', function (DetalleCalificacionesCompraProve, $q) {
		var res = function (id) {
			var delay = $q.defer();
			DetalleCalificacionesCompraProve.get({ id_proveedor: id }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('ListaDeHermanosPorProducto', ['$resource', function ($resource) {
		return $resource(restServer + "venta-lista-hermanos-productos-editables/almacen/:id_almacen", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ObtenerListaDeHermanosPorProducto', ['ListaDeHermanosPorProducto', '$q', function (ListaDeHermanosPorProducto, $q) {
		var res = function (data, idAlmacen) {
			var delay = $q.defer();
			ListaDeHermanosPorProducto.update({ id_almacen: idAlmacen }, data, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('ObtenerDatosMesasOcupadas', ['$resource', function ($resource) {
		return $resource(restServer + "venta-lista-mesas-ocupadas/id_sucursal/:id_sucursal", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ObtenerMesasOcupadas', ['ObtenerDatosMesasOcupadas', '$q', function (ObtenerDatosMesasOcupadas, $q) {
		var res = function (id_sucursal) {
			var delay = $q.defer();
			ObtenerDatosMesasOcupadas.get({ id_sucursal: id_sucursal }, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('reportePrecios', ['$resource', ($resource) => {
		return $resource(restServer + "reporte/precios/compra/:id_empresa", {
			'update': { method: 'PUT' }
		});
	}])

	.factory('obtenerReportePrecios', ['reportePrecios', '$q', (reportePrecios, $q) => {
		const res = (empresa) => {
			const delay = $q.defer();
			reportePrecios.get({
				id_empresa: empresa
			}, (entidades) => {
				delay.resolve(entidades);
			}, (error) => {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RutaDevolucionProductoNuevo', ['$resource', function ($resource) {
		return $resource(restServer + "devolucion-producto-venta/:id_detalle", { id_detalle: '@id_detalle' },
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('CrearDevolucionItem', ['RutaDevolucionProductoNuevo', '$q', function (RutaDevolucionProductoNuevo, $q) {
		var res = function (idDetalle, devolucion) {
			var delay = $q.defer();
			RutaDevolucionProductoNuevo.save({ id_detalle: idDetalle }, devolucion, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('RutaReposicionProductoNuevo', ['$resource', function ($resource) {
		return $resource(restServer + "reposicion-producto-venta/:id_detalle", { id_detalle: '@id_detalle' },
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('CrearReposicionItem', ['RutaReposicionProductoNuevo', '$q', function (RutaReposicionProductoNuevo, $q) {
		var res = function (idDetalle, devolucion) {
			var delay = $q.defer();
			RutaReposicionProductoNuevo.save({ id_detalle: idDetalle }, devolucion, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('rutaActualizarCompra', ['$resource', function ($resource) {
		return $resource(restServer + "modificar-libro-compra/:id_compra", null, {
			'update': { method: 'PUT' }
		});
	}])
	.factory('ActualizarLibroCompra', ['rutaActualizarCompra', '$q', function (rutaActualizarCompra, $q) {
		var res = function (compra, id_compra) {
			var delay = $q.defer();
			rutaActualizarCompra.update({ id_compra: id_compra }, compra, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('ConfirmarTraspasoOrdenReposicionVenta', ['$resource', function ($resource) {
		return $resource(restServer + "cerrar-traspaso-venta/:id_venta/:id_almacen", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ConfirmarTraspasoOrdenReposicion', ['ConfirmarTraspasoOrdenReposicionVenta', '$q', function (ConfirmarTraspasoOrdenReposicionVenta, $q) {
		var res = function (venta) {
			var delay = $q.defer();
			ConfirmarTraspasoOrdenReposicionVenta.save({ id_venta: venta.id, id_almacen: venta.almacen.id }, venta, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('ListaTraspasosCampamento', ['$resource', function ($resource) {
		return $resource(restServer + "traspasos-campamento/pagina/:pagina/items_pagina/:items_pagina/texto_busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/sucursal/:id_sucursal/almacen/:id_almacen/fecha/:fecha", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ObtenerTraspasosCampamento', ['ListaTraspasosCampamento', '$q', function (ListaTraspasosCampamento, $q) {
		var res = function (paginator) {
			var delay = $q.defer();
			ListaTraspasosCampamento.get({
				pagina: paginator.currentPage,
				items_pagina: paginator.itemsPerPage,
				texto_busqueda: paginator.search,
				columna: paginator.column,
				direccion: paginator.direction,
				id_almacen: paginator.filter.almacenDestino,
				id_sucursal: paginator.filter.sucursalDestino,
				fecha: paginator.filter.fecha
			}, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('FechaTraspasoCampamento', ['$resource', function ($resource) {
		return $resource(restServer + "traspasos-campamento/fecha/:fecha/sincronizar/:sincronizar", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('GuardarFechaTraspasoCampamento', ['FechaTraspasoCampamento', '$q', function (FechaTraspasoCampamento, $q) {
		var res = function (traspasos, sincronizar) {
			var delay = $q.defer();
			FechaTraspasoCampamento.save({ fecha: new Date(), sincronizar: sincronizar }, traspasos, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('TraspasosSincronizados', ['$resource', ($resource) => {
		return $resource(restServer + "traspasos-campamento/:ids", null, {
			'update': { method: 'PUT' }
		});
	}])

	.factory('ObtenerTraspasosSincronizados', ['TraspasosSincronizados', '$q', (TraspasosSincronizados, $q) => {
		const res = (ids) => {
			const delay = $q.defer();
			TraspasosSincronizados.get({
				ids: ids
			}, (entidades) => {
				delay.resolve(entidades);
			}, (error) => {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RutaValidarImportacionVentas', ['$resource', function ($resource) {
		return $resource(restServer + "validar-importar-ventas/empresa/:id_empresa", { id_empresa: '@id_empresa' },
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('ValidarImportacionVentas', ['RutaValidarImportacionVentas', '$q', function (RutaValidarImportacionVentas, $q) {
		var res = function (ventas, idEmpresa, id_usuario) {
			var delay = $q.defer();
			RutaValidarImportacionVentas.save({ id_empresa: idEmpresa }, { ventas: ventas, id_usuario: id_usuario }, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('RutaConfiguracionCalificacionEvalProv', ['$resource', function ($resource) {
		return $resource(restServer + "configuracion-calificacion-eval-proveedor/empresa/:id_empresa", null,
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('BuscarConfigCalifiaciones', ['RutaConfiguracionCalificacionEvalProv', '$q', function (RutaConfiguracionCalificacionEvalProv, $q) {
		var res = function (idEmpresa) {
			var delay = $q.defer();
			RutaConfiguracionCalificacionEvalProv.get({ id_empresa: idEmpresa }, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('GuardarConfiguracionEvalProv', ['RutaConfiguracionCalificacionEvalProv', '$q', function (RutaConfiguracionCalificacionEvalProv, $q) {
		var res = function (configuraciones, idEmpresa) {
			var delay = $q.defer();
			RutaConfiguracionCalificacionEvalProv.save({ id_empresa: idEmpresa }, { configuraciones: configuraciones }, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RutaInventariosNegativos', ['$resource', function ($resource) {
		return $resource(restServer + "inventarios-negativos/empresa/:id_empresa", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('DatosSaldosNegativosEmpresa', ['RutaInventariosNegativos', '$q', function (RutaInventariosNegativos, $q) {
		var res = function (id_empresa) {
			var delay = $q.defer();
			RutaInventariosNegativos.get({ id_empresa: id_empresa }, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

