angular.module('agil.servicios')
	.factory('Banco', ['$resource', function ($resource) {
		return $resource(restServer + "bancos/empresa/:idEmpresa", { id: '@idEmpresa' },
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('BancoDatos', ['$resource', function ($resource) {
		return $resource(restServer + "bancos/:id_banco", { id: '@id_banco' },
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('ListaBancos', ['Banco', '$q', function (Banco, $q) {
		var res = function (idEmpresa) {
			var delay = $q.defer();
			Banco.query({ idEmpresa: idEmpresa }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('BancoEmpresaPaginador', ['$resource', function ($resource) {
		return $resource(restServer + "bancos/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda");
	}])

	.factory('BancoPaginador', ['BancoEmpresaPaginador', '$q', function (BancoEmpresaPaginador, $q) {
		var res = function (idEmpresa, pagina, itemsPagina, texto) {
			var delay = $q.defer();
			BancoEmpresaPaginador.get({ id_empresa: idEmpresa, pagina: pagina, items_pagina: itemsPagina, texto_busqueda: texto }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('TransaccionBancoEmpresaPaginador', ['$resource', function ($resource) {
		return $resource(restServer + "transacciones/bancos/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/nombre/:texto_nombre/cta/:id_cuenta/desde/:desde/hasta/:hasta/concepto/:concepto/ref_doc/:ref_doc/tipo_doc/:tipo_doc/estado/:estado");
	}])

	.factory('TransaccionBancoPaginador', ['TransaccionBancoEmpresaPaginador', '$q', function (TransaccionBancoEmpresaPaginador, $q) {
		var res = function (idEmpresa, filtro) {
			var delay = $q.defer();
			TransaccionBancoEmpresaPaginador.get(
				{
					id_empresa: idEmpresa,
					pagina: filtro.currentPage,
					items_pagina: filtro.itemsPerPage,
					texto_nombre: filtro.filter.nombre,
					id_cuenta: (filtro.filter.cuenta.id !== undefined) ? filtro.filter.cuenta.id : 0,
					desde: filtro.filter.desde,
					hasta: filtro.filter.hasta,
					concepto: filtro.filter.concepto,
					ref_doc: filtro.filter.ref_doc,
					tipo_doc: filtro.filter.tipo_doc,
					estado: filtro.filter.estado
				}, function (entidades) {
					delay.resolve(entidades);
				}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])

	.factory('TransaccionBancoEmpresaPaginadorInicio', ['$resource', function ($resource) {
		return $resource(restServer + "transacciones/inicio/bancos/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/nombre/:texto_nombre/cta/:id_cuenta/desde/:desde/hasta/:hasta/concepto/:concepto/ref_doc/:ref_doc/tipo_doc/:tipo_doc/estado/:estado");
	}])

	.factory('TransaccionBancoPaginadorInicio', ['TransaccionBancoEmpresaPaginadorInicio', '$q', function (TransaccionBancoEmpresaPaginadorInicio, $q) {
		var res = function (idEmpresa, filtro) {
			var delay = $q.defer();
			TransaccionBancoEmpresaPaginadorInicio.get(
				{
					id_empresa: idEmpresa,
					pagina: filtro.currentPage,
					items_pagina: filtro.itemsPerPage,
					texto_nombre: filtro.filter.nombre,
					id_cuenta: (filtro.filter.cuenta.id !== undefined) ? filtro.filter.cuenta.id : 0,
					desde: filtro.filter.desde,
					hasta: filtro.filter.hasta,
					concepto: filtro.filter.concepto,
					ref_doc: filtro.filter.ref_doc,
					tipo_doc: filtro.filter.tipo_doc,
					estado: filtro.filter.estado
				}, function (entidades) {
					delay.resolve(entidades);
				}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])

	.factory('TransaccionIngresoBancoEmpresa', ['$resource', function ($resource) {
		return $resource(restServer + "transacciones/ingreso/bancos/empresa/:id_empresa/:id_usuario");
	}])

	.factory('TransaccionIngresoBanco', ['TransaccionIngresoBancoEmpresa', '$q', function (TransaccionIngresoBancoEmpresa, $q) {
		var res = function (idEmpresa, transaccion, id_usuario) {
			var delay = $q.defer();
			TransaccionIngresoBancoEmpresa.save({ id_empresa: idEmpresa, id_usuario: id_usuario }, transaccion, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('ObtenerComprobanteTransaccionEmpresa', ['$resource', ($resource) => {
		return $resource(restServer + "transacciones/comprobante");
	}])

	.factory('ObtenerComprobanteTransaccion', ['ObtenerComprobanteTransaccionEmpresa', '$q', (ObtenerComprobanteTransaccionEmpresa, $q) => {
		const res = (idtransaccion) => {
			const delay = $q.defer();
			ObtenerComprobanteTransaccionEmpresa.save({ id: idtransaccion }, (entidades) => {
				delay.resolve(entidades);
			}, (error) => {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('TransaccionSeguimientoBancoEmpresa', ['$resource', function ($resource) {
		return $resource(restServer + "transacciones/seguimiento/bancos/empresa/:id_empresa/:id_usuario");
	}])

	.factory('TransaccionSeguimientoBanco', ['TransaccionSeguimientoBancoEmpresa', '$q', function (TransaccionSeguimientoBancoEmpresa, $q) {
		var res = function (idEmpresa, seguimiento, id_usuario) {
			var delay = $q.defer();
			TransaccionSeguimientoBancoEmpresa.save({ id_empresa: idEmpresa, id_usuario: id_usuario }, seguimiento, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('TransaccionSeguimientoEstadoEmpresa', ['$resource', function ($resource) {
		return $resource(restServer + "transacciones/seguimiento/Estados/empresa", null, ///:id_empresa/:id_usuario/:id_estado
			{
				'update': { method: 'PUT' }
			})
	}])

	.factory('TransaccionSeguimientoEstado', ['TransaccionSeguimientoEstadoEmpresa', '$q', function (TransaccionSeguimientoEstadoEmpresa, $q) {
		var res = function (idEmpresa, id_estado, id_usuario, id_trans) {
			var delay = $q.defer();
			TransaccionSeguimientoEstadoEmpresa.update(null, { id: id_trans, id_empresa: idEmpresa, id_usuario: id_usuario, id_estado: id_estado }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('TransaccionRevisionEstadoEmpresa', ['$resource', function ($resource) {
		return $resource(restServer + "transacciones/revision/Estados/empresa", null, ///:id_empresa/:id_usuario/:id_trans
			{
				'update': { method: 'PUT' }
			})
	}])

	.factory('TransaccionRevisionEstado', ['TransaccionRevisionEstadoEmpresa', '$q', function (TransaccionRevisionEstadoEmpresa, $q) {
		var res = function (idEmpresa, id_usuario, id_trans) {
			var delay = $q.defer();
			TransaccionRevisionEstadoEmpresa.update(null, { id_empresa: idEmpresa, id_usuario: id_usuario, id_trans: id_trans }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('SaldoCuentaEmpresa', ['$resource', function ($resource) {
		return $resource(restServer + "transacciones/saldo/cuenta/empresa/:id_empresa/:id_cuenta/:fecha_desde/:fecha_hasta", null, ///:id_empresa/:id_usuario/:id_trans
			{
				'update': { method: 'PUT' }
			})
	}])

	.factory('SaldoCuenta', ['SaldoCuentaEmpresa', '$q', function (SaldoCuentaEmpresa, $q) {
		var res = function (idEmpresa, cuenta, desde, hasta) {
			var delay = $q.defer();
			SaldoCuentaEmpresa.get({ id_empresa: idEmpresa, id_cuenta: cuenta, fecha_desde: desde, fecha_hasta: hasta }, null, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('SaldoDisponibleCuentaEmpresa', ['$resource', function ($resource) {
		return $resource(restServer + "transacciones/saldo/disponible/empresa/:id_empresa/:id_cuenta/:fecha_desde/:fecha_hasta", null, ///:id_empresa/:id_usuario/:id_trans
			{
				'update': { method: 'PUT' }
			})
	}])

	.factory('SaldoDisponibleCuenta', ['SaldoDisponibleCuentaEmpresa', '$q', function (SaldoDisponibleCuentaEmpresa, $q) {
		var res = function (idEmpresa, cuenta, desde, hasta) {
			var delay = $q.defer();
			SaldoDisponibleCuentaEmpresa.get({ id_empresa: idEmpresa, id_cuenta: cuenta, fecha_desde: desde, fecha_hasta: hasta }, null, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('SaldoProformasEmpresa', ['$resource', function ($resource) {
		return $resource(restServer + "transacciones/saldo/proformas/empresa/:id_empresa", null, ///:id_empresa/:id_usuario/:id_trans
			{
				'update': { method: 'PUT' }
			})
	}])

	.factory('SaldoProformas', ['SaldoProformasEmpresa', '$q', function (SaldoProformasEmpresa, $q) {
		var res = function (idEmpresa) {
			var delay = $q.defer();
			SaldoProformasEmpresa.get({ id_empresa: idEmpresa }, null, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RutaBusquedaTransacion', ['$resource', function ($resource) {
		return $resource(restServer + "busquedaTransaccion/empresa/:id_empresa/texto/:texto");
	}])
	.factory('ListaProformasXcobrar', ['RutaBusquedaTransacion', '$q', function (RutaBusquedaTransacion, $q) {
		var res = function (idEmpresa, texto) {
			var delay = $q.defer();
			RutaBusquedaTransacion.query({ id_empresa: idEmpresa, texto: texto}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])

	.factory('RutaBusquedaTransacionPago', ['$resource', function ($resource) {
		return $resource(restServer + "busquedaTransaccionPago/empresa/:id_empresa/texto/:texto");
	}])
	.factory('ListaProformasXpago', ['RutaBusquedaTransacionPago', '$q', function (RutaBusquedaTransacionPago, $q) {
		var res = function (idEmpresa, texto) {
			var delay = $q.defer();
			RutaBusquedaTransacionPago.query({ id_empresa: idEmpresa, texto: texto}, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
					delay.reject(error);
				});
			return delay.promise;
		};
		return res;
	}])

	.factory('RutaAgregarTransacionPago', ['$resource', function ($resource) {
		return $resource(restServer + "AgregarTransaccionPago/empresa/:id_empresa/:id_usuario");
	}])
	.factory('ListaPagosXprogramac', ['RutaAgregarTransacionPago', '$q', function (RutaAgregarTransacionPago, $q) {
		var res = function (idEmpresa, id_usuario, seguimiento) {
			var delay = $q.defer();
			RutaAgregarTransacionPago.save({ id_empresa: idEmpresa, id_usuario: id_usuario }, seguimiento, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])


	.factory('RutaAgregarTransacionPagoEd', ['$resource', function ($resource) {
		return $resource(restServer + "AgregarTransaccionPagoEd/empresa/:id_empresa/:id_usuario");
	}])
	.factory('ListaPagosXprogramacEd', ['RutaAgregarTransacionPagoEd', '$q', function (RutaAgregarTransacionPagoEd, $q) {
		var res = function (idEmpresa, id_usuario, seguimiento) {
			var delay = $q.defer();
			RutaAgregarTransacionPagoEd.save({ id_empresa: idEmpresa, id_usuario: id_usuario }, seguimiento, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

/* 	.factory('TransaccionSeguimientoBancoEmpresa', ['$resource', function ($resource) {
		return $resource(restServer + "transacciones/seguimiento/bancos/empresa/:id_empresa/:id_usuario");
	}])

	.factory('TransaccionSeguimientoBanco', ['TransaccionSeguimientoBancoEmpresa', '$q', function (TransaccionSeguimientoBancoEmpresa, $q) {
		var res = function (idEmpresa, seguimiento, id_usuario) {
			var delay = $q.defer();
			TransaccionSeguimientoBancoEmpresa.save({ id_empresa: idEmpresa, id_usuario: id_usuario }, seguimiento, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}]) */

	.factory('ActivarBanco', ['$resource', function ($resource) {
		return $resource(restServer + "banco/activar/:id_banco", { id_banco: '@id_banco' },
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('EdicionTransaccion', ['$resource', function ($resource) {
		return $resource(restServer + "transacciones/edicion/empresa/:id_empresa/:id_usuario", null,
			{
				'update': { method: 'PUT' }
			})
	}])

	.factory('GuardarEdicionTransaccion', ['EdicionTransaccion', '$q', function (EdicionTransaccion, $q) {
		const res = function (idEmpresa, idUsuario, transaccion) {
			const delay = $q.defer();
			EdicionTransaccion.save({ id_empresa: idEmpresa, id_usuario: idUsuario}, transaccion, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RutaSaldoProformasEmpresa', ['$resource', function ($resource) {
		return $resource(restServer + "transaccionesEdic/saldo/proformas/empresa/:id_empresa/cliente/:id_cliente", null, ///:id_empresa/:id_usuario/:id_trans
			{
				'update': { method: 'PUT' }
			})
	}])

	.factory('SaldoProformasEdic', ['RutaSaldoProformasEmpresa', '$q', function (RutaSaldoProformasEmpresa, $q) {
		var res = function (idEmpresa, id_cliente) {
			var delay = $q.defer();
			RutaSaldoProformasEmpresa.get({ id_empresa: idEmpresa, id_cliente: id_cliente}, null, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])


	.factory('rutaEliminadrTransaccionEdiccion',  ['$resource',function ($resource) {
		return $resource(restServer + "EliminacionTransacciones/edicion", null,
		{
			'update': { method: 'PUT' }
		});
	}])
	.factory('elimDetalleTransacEdicion', ['rutaEliminadrTransaccionEdiccion', '$q', function (rutaEliminadrTransaccionEdiccion, $q) {
		var res = function (datos) {
			var delay = $q.defer();
			rutaEliminadrTransaccionEdiccion.save(datos, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('ObtenerTransaccionEmpresaPagos', ['$resource', ($resource) => {
		return $resource(restServer + "transacciones/integracion/pagos/proveedores");
	}])
	.factory('ObtenerTransaccionParaComprobantes', ['ObtenerTransaccionEmpresaPagos', '$q', (ObtenerTransaccionEmpresaPagos, $q) => {
		const res = (idtransaccion) => {
			const delay = $q.defer();
			ObtenerTransaccionEmpresaPagos.save({ id: idtransaccion }, (entidades) => {
				delay.resolve(entidades);
			}, (error) => {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	.factory('RutaGuardarComprobanteTransaccion', ['$resource', ($resource) => {
		return $resource(restServer + "ruta/nuevo/comprobante/transaccion/pagos/proveedores");
	}])
	.factory('GuardarComprobanteTransaccion', ['RutaGuardarComprobanteTransaccion', '$q', (RutaGuardarComprobanteTransaccion, $q) => {
		const res = (datos) => {
			const delay = $q.defer();
			RutaGuardarComprobanteTransaccion.save(datos, (entidades) => {
				delay.resolve(entidades);
			}, (error) => {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('rutaUltimaFechaTipoComp',  ['$resource',function ($resource) {
		return $resource(restServer + "transaccion/ultima_fecha_comprobante/empresa/:id_empresa/tipo/:id_tipo", { id_moneda: "@id_moneda" },
		{
			'update': { method: 'PUT' }
		});
	}])
	.factory('UltimaFechaTipoComprobanteTransaccion', ['rutaUltimaFechaTipoComp', '$q', function (rutaUltimaFechaTipoComp, $q) {
		var res = function (idEmpresa,idTipo) {
			var delay = $q.defer();
			rutaUltimaFechaTipoComp.get({ id_empresa: idEmpresa,id_tipo:idTipo }, function (entidades) {
				delay.resolve(entidades);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])

	/* .factory('comprobanteTransaccionEmail', ['$resource', function ($resource) {
		return $resource(restServer + "transaccion/proveedor/send/email", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('EmailComprobanteTransaccion', ['comprobanteTransaccionEmail', '$q', function (comprobanteTransaccionEmail, $q) {
		var res = function (data) {
			var delay = $q.defer();
			comprobanteTransaccionEmail.save({}, data, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}]) */

	.factory('comprobanteTransaccionAdjunto', ['$resource', function ($resource) {
		return $resource(restServer + "docment/respaldo/transaccion/pago", null,
			{
				'update': { method: 'PUT' }
			});
	}])

	.factory('guardarAdjuntoo', ['comprobanteTransaccionAdjunto', '$q', function (comprobanteTransaccionAdjunto, $q) {
		var res = function (data) {
			var delay = $q.defer();
			comprobanteTransaccionAdjunto.save({}, data, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])