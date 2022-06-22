module.exports = function (router, ensureAuthorized, forEach, Compra, DetalleCompra, Almacen, Sucursal, Empresa, sequelize, Sequelize,
	Tipo, Clase, Proveedor, Producto, Movimiento, DetalleMovimiento, Inventario, Venta, DetalleVenta,
	Cliente, CodigoControl, NumeroLiteral, Diccionario, SucursalActividadDosificacion, Dosificacion,
	ConfiguracionGeneralFactura, ConfiguracionFactura, PagoVenta, PagoCompra, Usuario, DetalleVentaNoConsolidada, ClienteCuenta, ContabilidadCuenta, ProveedorCuenta, UsuarioGrupos, Pedido, DetallesPedido, ProductoBase, ServicioVenta, DetalleVentaProductoFinal, ClienteAnticipo, ProveedorAnticipo, ensureAuthorizedlogged, nodemailer, jwt, CajaChica, MeseroVenta,
	LiquidacionVentasMesa, Persona, ProductoPromocion, EntragaDetalleVentaCliente, DetallePedidoEntrega, ProductoPromocionPuntaje, DetalleCalificacionProveedor, DetalleComboVenta, DetalleVentaProductoDevolucion, DetalleVentaProductoReposicion,
	GestionOrdenReposicion, ConfiguracionIso, OrdenServicio, DetalleOrdenServicio, DetalleOrdenServicioEntrega, ConfiguracionCalificacionProveedor, UsuarioSucursal, SolicitudReposicion, ProductoTipoPrecio) {
	router.route('/venta-lista-mesas-ocupadas/id_sucursal/:id_sucursal')
		.get(function (req, res) {
			Venta.findAll({
				where: { mesa_activa: true, mesa: { $ne: null } },
				group: condicionGroupo = ["`inv_venta`.`mesa`"]
			}).then(function (data) {
				res.json({ mesas: data })
			})
		})

	router.route('/ventas/send/mail')
		//Para envio de email
		.post(function (req, res) {
			var transporter = nodemailer.createTransport({
				host: Diccionario.SMTP_HOST,
				port: Diccionario.SMTP_PORT,
				secure: true, // true for 465, false for other ports
				auth: {
					user: Diccionario.SMTP_USER,
					pass: Diccionario.SMTP_PASS
				}
			});
			var mailToken = jwt.sign(req.body, Diccionario.ClaveSuperSecreta)
			// setup email data with unicode symbols
			// Data format url '/mailer/m?d=datosaleatorios'
			var mensajeEmail;
			if (req.body.port == 80) {
				mensajeEmail = '<h2>Para ver el documento acceda al siguiente link: </h2><a href="' + req.body.protocol + '://' + req.body.domain + '/#/mailer/m?d=' + mailToken + '">' + req.body.protocol + '://' + req.body.domain + '/#/mailer/m?d=' + mailToken + '</a>'
			} else {
				mensajeEmail = '<h2>Para ver el documento acceda al siguiente link: </h2><a href="' + req.body.protocol + '://' + req.body.domain + ':' + req.body.port + '/#/mailer/m?d=' + mailToken + '">' + req.body.protocol + '://' + req.body.domain + '/#/mailer/m?d=' + mailToken + '</a>'
			}
			var mailOptions = {
				from: '"AgilSof Mailer" <agilsof.srl@gmail.com>', // sender address
				to: req.body.destinatario, // list of receivers
				subject: 'Factura', // Subject line
				// text: 'Hello world?', // plain text body
				html: mensajeEmail
			};///html line break: &#10;&#13;

			// send mail with defined transport object
			transporter.sendMail(mailOptions, function (error, info) {
				if (error) {
					return res.json({ mensaje: 'No se puede completar la petición. Mensaje de error: "' + error.message + '"' })
				} else {
					return res.json({ mensaje: info })
				}
			})
		});

	router.route('/compra/pedido/empresa/:id_empresa/pagina/:pagina/items_pagina/:items_pagina/texto_busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/fecha_inicio/:fecha_inicio/fecha_fin/:fecha_fin/correlativo/:correlativo/:dociso/:tipo')
		.get(ensureAuthorizedlogged, function (req, res) {
			let textOrder = "";
			let condicionProveedor = {};
			let condicionPedido = {
				eliminado: false,
				recibido: false,
			}
			if (req.params.fecha_inicio != 0 && req.params.fecha_fin != 0) {
				var inicio = new Date(req.params.fecha_inicio); inicio.setHours(0, 0, 0, 0);
				var fin = new Date(req.params.fecha_fin); fin.setHours(23, 59, 59, 59);
				condicionPedido.fecha = { $between: [inicio, fin] };

			}
			if (req.params.columna == 'numero_correlativo') {
				textOrder = "pedido.numero_correlativo " + req.params.direccion
			} else {
				textOrder = req.params.columna + " " + req.params.direccion
			}
			if (req.params.texto_busqueda !== '0') {
				condicionProveedor.razon_social = {
					$like: "%" + req.params.texto_busqueda + "%"
				}
			}
			if (req.params.correlativo !== '0') {
				condicionPedido.numero_correlativo = req.params.correlativo
			}


			Tipo.find({
				where: {
					nombre_corto: 'ESTMODPED'
				},
				include: [{ model: Clase, as: 'clases', where: { eliminado: false } }]
			}).then(function (entidad) {
				const estado_anulado = entidad.clases.find(clase => (clase.nombre === 'Anulado'))
				const estado_finalizado = entidad.clases.find(clase => (clase.nombre === 'Finalizado'))
				condicionPedido.id_estado = { $notIn: [estado_anulado.id, estado_finalizado.id] }
				if (req.params.tipo == '2') {
					if (req.params.dociso !== '0') {
						condicionPedido.numero_iso = req.params.dociso
					}
					delete condicionPedido.recibido
					OrdenServicio.findAndCountAll({
						where: condicionPedido,

						include: [
							{ model: Clase, as: 'estado' },
							{ model: Clase, as: 'area_solicitante' },
							{ model: Clase, as: 'area_destino' },
							{ model: Clase, as: 'concepto' },
							{ model: Clase, as: 'detalle' },
							{ model: Cliente, as: 'clientes' }, {
								model: Almacen, as: 'almacen',
								include: [
									{
										model: Sucursal, as: 'sucursal'
									}
								]
							},
							{
								model: ConfiguracionIso, as: 'configuracionesIso', required: false
							},
							{ model: Clase, as: 'tipoPago' },
							{
								model: Proveedor, as: 'proveedor', where: condicionProveedor
							},
							{ model: Usuario, as: 'usuario', include: [{ model: Persona, as: 'persona' }] }
						],
						order: [['fecha', 'DESC']],
						offset: (req.params.items_pagina * (req.params.pagina - 1)), limit: req.params.items_pagina
					}).then((pedidos) => {
						res.json({ pedidos: pedidos.rows, paginas: Math.ceil(pedidos.count / req.params.items_pagina) });
					}).catch((err) => {
						res.json({ mensaje: err.stack, hasErr: true });
					})
				} else {
					if (req.params.dociso !== '0') {
						condicionPedido.numero_iso_orden_compra = req.params.dociso
					}
					var datosbusqueda = {
						where: condicionPedido, include: [{ model: Clase, as: 'tipoPago' },
						{ model: Compra, as: 'compra', required: false }, { model: Clase, as: 'estado' }, { model: Proveedor, as: 'proveedor', where: condicionProveedor }, {
							model: Almacen, as: 'almacen', include: [{
								model: Sucursal, as: 'sucursal', where: {
									id_empresa: req.params.id_empresa
								}
							}]
						}],
					}
					datosbusqueda.group = ["`agil_pedidos`.`id`"]
					Pedido.count(
						datosbusqueda
					).then(function (count) {
						if (req.params.items_pagina != '0') {
							textOrder = textOrder + " limit " + (req.params.items_pagina * (req.params.pagina - 1)) + ", " + req.params.items_pagina
						}
						datosbusqueda.order = sequelize.literal(textOrder)
						Pedido.findAll(
							datosbusqueda
						).then(function (Pedidos) {
							res.json({ pedidos: Pedidos, paginas: Math.ceil(count.length / req.params.items_pagina) });
						})
					})
				}
			})
		});
	router.route('/compra/pedido/detalles/:id_pedido/:tipo')
		.get(ensureAuthorizedlogged, function (req, res) {
			if (req.params.tipo == 2) {
				DetalleOrdenServicio.findAll({
					where: {
						id_orden_servicio: req.params.id_pedido,
						recibido: false, eliminado: false
					},
					include: [
						{ model: DetalleOrdenServicioEntrega, as: 'entregas' },
					]
				}).then(function (DetallesPedido) {
					res.json({ detallesPedido: DetallesPedido });
					if (DetallesPedido.length === 0) {
						OrdenServicio.update({
							eliminado: true
						}, {
							where: { id: req.params.id_pedido }
						})
					}
				}).catch((err) => {
					res.json({ hasErr: true, mensaje: err.stack });
				})
			} else {
				DetallesPedido.findAll({
					where: {
						id_pedido: req.params.id_pedido,
						recibido: false, eliminado: false
					},
					include: [
						{ model: DetallePedidoEntrega, as: 'entregas' },
						{
							model: Producto, as: 'producto', include: [
								{ model: Clase, as: 'tipoProducto' }, {
									model: Inventario, as: 'inventarios', required: false, attributes: ['id', 'costo_unitario']
								}
							]
						}
					]
				}).then(function (DetallesPedido) {
					res.json({ detallesPedido: DetallesPedido });
					if (DetallesPedido.length === 0) {
						Pedido.update({
							eliminado: true
						}, {
							where: { id: req.params.id_pedido }
						})
					}
				}).catch((err) => {
					res.json({ hasErr: true, mensaje: err.stack });
				})
			}
		});
	router.route('/compra/finalizar/pedido/vacio')
		.get(ensureAuthorizedlogged, function (req, res) {
			Tipo.find({
				where: { nombre_corto: 'ESTMODPED' }
			}).then((tipoEstadoPedido) => {
				Clase.findAll({
					where: { id_tipo: tipoEstadoPedido.id }
				}).then((estadosPedido) => {
					const estadoPendiente = estadosPedido.find(estado => estado.nombre_corto === 'PENDIENTE') || {}
					const estadoParcial = estadosPedido.find(estado => estado.nombre_corto === 'PARCIAL') || {}
					const estadoFinalizado = estadosPedido.find(estado => estado.nombre_corto === 'FINALIZADO') || {}
					Pedido.findAll({
						attributes: ['id'],
						where: {
							eliminado: false,
							recibido: false
						},
						// include: [{ model: DetallePedidoEntrega, as: 'entregas' }, {
						// 	model: Producto, as: 'producto', include: [
						// 		{ model: Clase, as: 'tipoProducto' }, {
						// 			model: Inventario, as: 'inventarios', required: false, attributes: ['id', 'costo_unitario']
						// 		}
						// 	],
						// 	where: { eliminado: false }
						// }]
					}).then(function (Pedidos) {
						const promesas = []
						sequelize.transaction((t) => {
							for (let index = 0; index < Pedidos; index++) {
								promesas.push(DetallesPedido.findAll({
									where: {
										id_pedido: Pedidos[index].id,
										recibido: false, eliminado: false
									},
									include: [
										{ model: DetallePedidoEntrega, as: 'entregas' },
										{
											model: Producto, as: 'producto', include: [
												{ model: Clase, as: 'tipoProducto' }, {
													model: Inventario, as: 'inventarios', required: false, attributes: ['id', 'costo_unitario']
												}
											]
										}
									]
								}, { transaction: t }).then(function (DetallesPedido) {
									if (!DetallesPedido) {
										return Pedido.update({
											eliminado: true
										}, {
											where: { id: Pedidos[index].id }, transaction: t
										})
									}
								}).catch((err) => {
									return err
								}))
							}
							return Promise.all(promesas)
						}).then((result) => {
							res.json({ actualizados: result.length });
						}).catch((err) => {
							res.json({ hasErr: true, mensaje: err.stack })
						})
					}).catch((err) => {
						res.json({ hasErr: true, mensaje: err.stack })
					})
				})
			})


		});
	router.route('/compra/pedido/:id_pedido')
		.get(ensureAuthorizedlogged, function (req, res) {
			Pedido.find({
				where: {
					id: req.params.id_pedido,
				}, include: [
					{ model: Clase, as: 'formaEntrega' },
					{ model: Clase, as: 'tipoPago' },
					{ model: Proveedor, as: 'proveedor' },
					{ model: ConfiguracionIso, as: 'configuracionesIso', required: false },
					{
						model: Almacen, as: 'almacen',
						include: [{ model: Sucursal, as: 'sucursal' }]
					},
					{ model: Sucursal, as: 'sucursal' },
					{
						model: DetallesPedido, as: 'detallesPedido',
						include: [{
							model: Producto, as: 'producto', required: true,
							include: [{ model: Clase, as: 'tipoProducto' },
							{
								model: Inventario, as: 'inventarios', required: false, attributes: ['id', 'costo_unitario']
							}
							]
						}], where: { eliminado: false }
					}]
			}).then(function (Pedido) {
				if (!Pedido) throw new Error('Error al recuperar uno o varios productos de este pedido.')
				res.json({ pedido: Pedido });
			}).catch((err) => {
				res.json({ pedido: {}, hasErr: true, mensaje: err.stack })
			})
		});
	router.route('/inventarios/:id_empresa')
		.get(ensureAuthorizedlogged, function (req, res) {
			Producto.findAll({
				include: [{
					model: Inventario, as: 'inventarios',
					include: [{
						model: Almacen, as: 'almacen',
						include: [{
							model: Sucursal, as: 'sucursal',
							include: [{ model: Empresa, as: 'empresa', where: { id: req.params.id_empresa } }]
						}]
					}]
				}]
			}).then(function (productos) {
				res.json(productos);
			});
		});

	router.route('/obtenerDetalleVenta/empresa/:id_empresa')
		.get(ensureAuthorizedlogged, function (req, res) {
			Venta.findAll({
				include: [{
					model: DetalleVenta, as: 'detallesVenta'
				},
				{
					model: Almacen, as: 'almacen',
					include: [
						{
							model: Sucursal, as: 'sucursal', where: { id_empresa: req.params.id_empresa }
						}]
				}
				]
			}).then(function (detalle) {
				res.json(detalle);
			}).catch(function (error) {
				res.json([{ mensaje: error.stack }]);
			})
		})

	router.route('/obtenerDetalleVenta/empresa/:id_empresa/inicio/:inicio/fin/:fin')
		.get(ensureAuthorizedlogged, function (req, res) {
			var inicio = (req.params.inicio + "T00:00:00.000Z");//.split('/').reverse().join('-'); //inicio.setHours(0, 0, 0, 0, 0);
			var fin = (req.params.fin + "T23:59:59.000Z");//.split('/').reverse().join('-'); //fin.setHours(23, 59, 59, 0, 0);
			var condicionCompra = { fecha: { $between: [inicio, fin] } };
			Venta.findAll({
				where: condicionCompra,
				include: [{
					model: DetalleVenta, as: 'detallesVenta'
				},
				{
					model: Cliente, as: 'cliente'
				},
				{
					model: Movimiento, as: 'movimiento'
				},
				{
					model: Almacen, as: 'almacen',
					include: [
						{
							model: Sucursal, as: 'sucursal', where: { id_empresa: req.params.id_empresa }
						}]
				}
				]
			}).then(function (detalle) {
				res.json(detalle);
			}).catch(function (error) {
				res.json([{ mensaje: error.stack }]);
			})
		})

	router.route('/inventario/:id')
		.put(ensureAuthorizedlogged, function (req, res) {
			Inventario.update({
				cantidad: req.body.cantidad,
				costo_total: (req.body.cantidad * req.body.costo_unitario)
			}, {
				where: {
					id: req.params.id
				}
			}).then(function () {
				res.json({ message: "Inventario actualizado satisfactoriamente" });
			});

		});

	router.route('/calificacion-proveedor/:id_proveedor')
		.get(ensureAuthorizedlogged, function (req, res) {
			var condicion = "where p.id = " + req.params.id_proveedor
			sequelize.query("SELECT DISTINCT\
			p.razon_social,\
			SUM(IF(dcp.valor=1, cc.nombre_corto, 0)) AS total_calificacion,\
			c.factura,c.fecha \
			FROM inv_compra AS c\
			INNER JOIN agil_proveedor AS p ON  c.proveedor=p.id \
			LEFT JOIN agil_detalle_calificacion_proveedor AS dcp ON c.id = dcp.compra\
			LEFT JOIN gl_clase AS cc ON dcp.concepto = cc.id\
			INNER JOIN agil_almacen AS al ON c.almacen = al.id \
			"+ condicion + " \
		GROUP BY c.id", { type: sequelize.QueryTypes.SELECT })
				.then(function (data) {
					res.json({ compras: data })
				});

		})
	router.route('/calificacion-proveedor/sucursal/:id_sucursal/desde/:desde/hasta/:hasta/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion')
		.get(ensureAuthorizedlogged, function (req, res) {
			var condicionSucursal = ""
			var condicionProveedor = ""
			var condicionCompra = ""
			var condicion = ""
			if (req.params.id_sucursal != 0) {
				condicion = "where al.sucursal = " + req.params.id_sucursal
			}
			if (req.params.desde != 0 && req.params.hasta != 0) {
				var diaInicio = req.params.desde.split("/")[0]
				var diafin = req.params.hasta.split("/")[0]

				var mesinicio = req.params.desde.split("/")[1]
				var mesfin = req.params.hasta.split("/")[1]

				var anioInicio = req.params.desde.split("/")[2]
				var aniofin = req.params.hasta.split("/")[2]
				var inicio = anioInicio + "-" + mesinicio + "-" + diaInicio + " 00:00:00"
				var fin = aniofin + "-" + mesfin + "-" + diafin + " 23:59:59"

				if (condicion.length > 0) {
					condicionCompra = "c.fecha BETWEEN '" + inicio + "' AND '" + fin + "'"
					condicion = condicion + " and " + condicionCompra
				} else {
					condicion = "where c.fecha BETWEEN '" + inicio + "' AND '" + fin + "'"
				}
			}
			if (req.params.texto_busqueda != 0) {
				if (condicion.length > 0) {
					condicion = " where p.razon_social like '%" + req.params.texto_busqueda + "%'"
				} else {
					condicionProveedor = "p.razon_social like '%" + req.params.texto_busqueda + "%'"
					condicion = condicion + " and " + condicionCompra
				}
			}
			var limite = " LIMIT " + (req.params.items_pagina * (req.params.pagina - 1)) + "," + req.params.items_pagina
			if (req.params.items_pagina == "0") {
				limite = "";
			}
			sequelize.query("select DISTINCT count(p.id) ,p.razon_social, SUM(IF(dcp.valor=1, cc.nombre_corto, 0)) AS total_calificacion,c.id as id_compra  from agil_proveedor as p\
			INNER JOIN inv_compra as c on p.id=c.proveedor\
			left JOIN agil_detalle_calificacion_proveedor as dcp on c.id=dcp.compra\
			left JOIN gl_clase as cc on dcp.concepto=cc.id\
			inner join agil_almacen as al on c.almacen=al.id\
			"+ condicion + " \
			GROUP BY p.id \
			ORDER BY "+ req.params.columna + " " + req.params.direccion, { type: sequelize.QueryTypes.SELECT })
				.then(function (data) {
					sequelize.query("select DISTINCT p.id ,p.razon_social, SUM(IF(dcp.valor=1, cc.nombre_corto, 0)) AS total_calificacion,c.id as id_compra  from agil_proveedor as p\
			INNER JOIN inv_compra as c on p.id=c.proveedor\
			left JOIN agil_detalle_calificacion_proveedor as dcp on c.id=dcp.compra\
			left JOIN gl_clase as cc on dcp.concepto=cc.id\
			inner join agil_almacen as al on c.almacen=al.id\
			"+ condicion + " \
			GROUP BY p.id \
			ORDER BY "+ req.params.columna + " " + req.params.direccion + " " + limite, { type: sequelize.QueryTypes.SELECT })
						.then(function (proveedoresEncontrados) {

							res.json({ proveedores: proveedoresEncontrados, paginas: Math.ceil(data.length / req.params.items_pagina) });
						});
				});
		});

	router.route('/ventasProductos/:idsSucursales/inicio/:inicio/fin/:fin/sucursal/:sucursal/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion')
		.get(ensureAuthorizedlogged, function (req, res) {
			// var inicio = req.params.inicio.split('/').reverse().join('-'); //inicio.setHours(0, 0, 0, 0, 0);
			// var fin = req.params.fin.split('/').reverse().join('-'); //fin.setHours(23, 59, 59, 0, 0);
			var inicioS = req.params.inicio.split('  ');
			var inicio = inicioS[0].split('/').reverse().join('-') + " " + inicioS[1];
			var finS = req.params.fin.split('  ');
			var fin = finS[0].split('/').reverse().join('-') + " " + finS[1];
			condicionSucursal = { id: { $in: req.params.idsSucursales.split(',') } };
			condicionUsuario = {}, clienteRequerido = false;
			var busquedaQuery = (req.params.texto_busqueda === "0") ? " " : " AND producto.nombre like '%" + req.params.texto_busqueda + "%'";

			if (req.params.sucursal != 0) {
				condicionSucursal.id = req.params.sucursal;
			}

			var limite = " LIMIT " + (req.params.items_pagina * (req.params.pagina - 1)) + "," + req.params.items_pagina
			if (req.params.items_pagina == "0") {
				limite = "";
			}
			sequelize.query("select count(producto.id) as cantidad_productos \
		FROM\
			agil_producto AS producto\
		LEFT JOIN inv_detalle_venta AS detalle ON producto.id = detalle.producto\
		INNER JOIN inv_venta AS venta ON detalle.venta = venta.id\
		LEFT JOIN agil_almacen AS almacen ON venta.almacen = almacen.id\
		LEFT JOIN agil_sucursal AS sucursal ON almacen.sucursal = sucursal.id\
		WHERE\
		date(venta.fecha) BETWEEN '"+ inicio + "' AND '" + fin + "'\
		AND sucursal.id in ("+ req.params.idsSucursales.split(',') + ")\
		GROUP BY producto.nombre",
				{ type: sequelize.QueryTypes.SELECT })
				.then(function (data) {

					sequelize.query("SELECT\
			producto.id, producto.nombre,\
			sum(detalle.cantidad) AS cantidad, producto.unidad_medida,\
			sum(detalle.total) AS total\
		FROM\
			agil_producto AS producto\
		LEFT JOIN inv_detalle_venta AS detalle ON producto.id = detalle.producto\
		INNER JOIN inv_venta AS venta ON detalle.venta = venta.id\
		LEFT JOIN agil_almacen AS almacen ON venta.almacen = almacen.id\
		LEFT JOIN agil_sucursal AS sucursal ON almacen.sucursal = sucursal.id\
		WHERE\
		date(venta.fecha) BETWEEN '"+ inicio + "' AND '" + fin + "'\
		AND sucursal.id in ("+ req.params.idsSucursales.split(',') + ")" + busquedaQuery + "\
		AND venta.activa = true \
		GROUP BY producto.id,producto.nombre,producto.unidad_medida\
		ORDER BY "+ req.params.columna + " " + req.params.direccion + " " + limite,
						{ type: sequelize.QueryTypes.SELECT })
						.then(function (Ventas) {
							res.json({ ventas: Ventas, paginas: Math.ceil(data.length / req.params.items_pagina) });
						});
				});
		});

	router.route('/ventasProductos/:idsSucursales/inicio/:inicio/fin/:fin/sucursal/:sucursal/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/mesero/:id_mesero')
		.get(ensureAuthorizedlogged, function (req, res) {
			var inicio = req.params.inicio.split(' ')[0].split('/').reverse().join('-') + " " + req.params.inicio.split('  ')[1]; //inicio.setHours(0, 0, 0, 0, 0);
			var fin = req.params.fin.split(' ')[0].split('/').reverse().join('-') + " " + req.params.fin.split('  ')[1]; //fin.setHours(23, 59, 59, 0, 0);
			condicionSucursal = { id: { $in: req.params.idsSucursales.split(',') } };
			condicionUsuario = {}, clienteRequerido = false;
			var busquedaQuery = (req.params.texto_busqueda === "0") ? " " : " AND producto.nombre like '%" + req.params.texto_busqueda + "%'";

			if (req.params.sucursal != 0) {
				condicionSucursal.id = req.params.sucursal;
			}

			var limite = " LIMIT " + (req.params.items_pagina * (req.params.pagina - 1)) + "," + req.params.items_pagina
			if (req.params.items_pagina == "0") {
				limite = "";
			}
			sequelize.query("select count(producto.id) as cantidad_productos \
		FROM\
			agil_producto AS producto\
		LEFT JOIN inv_detalle_venta AS detalle ON producto.id = detalle.producto\
		INNER JOIN inv_venta AS venta ON detalle.venta = venta.id\
		LEFT JOIN agil_almacen AS almacen ON venta.almacen = almacen.id\
		inner join agil_cliente as cliente on venta.cliente = cliente.id\
		LEFT JOIN agil_sucursal AS sucursal ON almacen.sucursal = sucursal.id\
		WHERE venta.mesero="+ req.params.id_mesero + " and " +
				"date(venta.fecha) BETWEEN '" + inicio + "' AND '" + fin + "'\
		AND sucursal.id in ("+ req.params.idsSucursales.split(',') + ")\
		AND venta.activa=true \
		GROUP BY producto.nombre",
				{ type: sequelize.QueryTypes.SELECT })
				.then(function (data) {

					sequelize.query("SELECT\
					mesero.id as meseroid,producto.id, producto.nombre,\
			sum(detalle.cantidad) AS cantidad, producto.unidad_medida,\
			sum(detalle.total) AS total\
		FROM\
			agil_producto AS producto\
		LEFT JOIN inv_detalle_venta AS detalle ON producto.id = detalle.producto\
		INNER JOIN inv_venta AS venta ON detalle.venta = venta.id\
		INNER JOIN agil_mesero_venta AS mesero ON venta.mesero = mesero.id\
		INNER JOIN agil_cliente AS cliente ON venta.cliente = cliente.id\
		LEFT JOIN agil_almacen AS almacen ON venta.almacen = almacen.id\
		LEFT JOIN agil_sucursal AS sucursal ON almacen.sucursal = sucursal.id\
		WHERE venta.mesero="+ req.params.id_mesero + " and " +
						"date(venta.fecha) BETWEEN '" + inicio + "' AND '" + fin + "'\
		AND sucursal.id in ("+ req.params.idsSucursales.split(',') + ")" + busquedaQuery + "\
		AND venta.activa = true \
		GROUP BY producto.id,producto.nombre,producto.unidad_medida\
		ORDER BY "+ req.params.columna + " " + req.params.direccion + " " + limite,
						{ type: sequelize.QueryTypes.SELECT })
						.then(function (Ventas) {
							res.json({ ventas: Ventas, paginas: Math.ceil(data.length / req.params.items_pagina) });
						});
				});
		});
	router.route('/ventasProductos/:idsSucursales/inicio/:inicio/fin/:fin/sucursal/:sucursal/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/mesa/:id_mesa')
		.get(ensureAuthorizedlogged, function (req, res) {
			var inicio = req.params.inicio.split(' ')[0].split('/').reverse().join('-') + " " + req.params.inicio.split('  ')[1]; //inicio.setHours(0, 0, 0, 0, 0);
			var fin = req.params.fin.split(' ')[0].split('/').reverse().join('-') + " " + req.params.fin.split('  ')[1]; //fin.setHours(23, 59, 59, 0, 0);
			condicionSucursal = { id: { $in: req.params.idsSucursales.split(',') } };
			condicionUsuario = {}, clienteRequerido = false;
			var busquedaQuery = (req.params.texto_busqueda === "0") ? " " : " AND producto.nombre like '%" + req.params.texto_busqueda + "%'";

			if (req.params.sucursal != 0) {
				condicionSucursal.id = req.params.sucursal;
			}

			var limite = " LIMIT " + (req.params.items_pagina * (req.params.pagina - 1)) + "," + req.params.items_pagina
			if (req.params.items_pagina == "0") {
				limite = "";
			}
			sequelize.query("select count(producto.id) as cantidad_productos \
		FROM\
			agil_producto AS producto\
		LEFT JOIN inv_detalle_venta AS detalle ON producto.id = detalle.producto\
		INNER JOIN inv_venta AS venta ON detalle.venta = venta.id\
		LEFT JOIN agil_almacen AS almacen ON venta.almacen = almacen.id\
		inner join agil_cliente as cliente on venta.cliente = cliente.id\
		LEFT JOIN agil_sucursal AS sucursal ON almacen.sucursal = sucursal.id\
		WHERE venta.mesa="+ req.params.id_mesa + " and " +
				"date(venta.fecha) BETWEEN '" + inicio + "' AND '" + fin + "'\
		AND sucursal.id in ("+ req.params.idsSucursales.split(',') + ")\
		AND venta.activa=true \
		GROUP BY producto.nombre",
				{ type: sequelize.QueryTypes.SELECT })
				.then(function (data) {

					sequelize.query("SELECT\
					venta.mesa as mesa,producto.id, producto.nombre,\
			sum(detalle.cantidad) AS cantidad, producto.unidad_medida,\
			sum(detalle.total) AS total\
		FROM\
			agil_producto AS producto\
		LEFT JOIN inv_detalle_venta AS detalle ON producto.id = detalle.producto\
		INNER JOIN inv_venta AS venta ON detalle.venta = venta.id\
		INNER JOIN agil_mesero_venta AS mesero ON venta.mesero = mesero.id\
		INNER JOIN agil_cliente AS cliente ON venta.cliente = cliente.id\
		LEFT JOIN agil_almacen AS almacen ON venta.almacen = almacen.id\
		LEFT JOIN agil_sucursal AS sucursal ON almacen.sucursal = sucursal.id\
		WHERE venta.mesa="+ req.params.id_mesa + " and " +
						"date(venta.fecha) BETWEEN '" + inicio + "' AND '" + fin + "'\
		AND sucursal.id in ("+ req.params.idsSucursales.split(',') + ")" + busquedaQuery + "\
		AND venta.activa = true \
		GROUP BY producto.id,producto.nombre,producto.unidad_medida\
		ORDER BY "+ req.params.columna + " " + req.params.direccion + " " + limite,
						{ type: sequelize.QueryTypes.SELECT })
						.then(function (Ventas) {
							res.json({ ventas: Ventas, paginas: Math.ceil(data.length / req.params.items_pagina) });
						});
				});
		});

	router.route("/ventasDetalleEmpresa/:idsSucursales/inicio/:inicio/fin/:fin/sucursal/:sucursal/idEmpresa/:idEmpresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion")
		.get(ensureAuthorizedlogged, function (req, res) {
			// var inicio = req.params.inicio.split('/').reverse().join('-'); //inicio.setHours(0, 0, 0, 0, 0);
			// var fin = req.params.fin.split('/').reverse().join('-'); //fin.setHours(23, 59, 59, 0, 0);
			var inicioS = req.params.inicio.split('  ');
			var inicio = inicioS[0].split('/').reverse().join('-') + " " + inicioS[1];
			var finS = req.params.fin.split('  ');
			var fin = finS[0].split('/').reverse().join('-') + " " + finS[1];
			condicionSucursal = { id: { $in: req.params.idsSucursales.split(',') } };
			condicionUsuario = {}, clienteRequerido = false;
			var busquedaQuery = (req.params.texto_busqueda === "0") ? "" : " AND cli.razon_social like '%" + req.params.texto_busqueda + "%'";
			var sucursalQuery;

			if (req.params.sucursal == 0) {
				//condicionSucursal.id = req.params.sucursal;
				sucursalQuery = " AND s.id in (" + req.params.idsSucursales.split(',') + ")";
			} else {
				sucursalQuery = " AND s.id = " + req.params.sucursal;
			}

			var limite = " LIMIT " + (req.params.items_pagina * (req.params.pagina - 1)) + "," + req.params.items_pagina
			if (req.params.items_pagina == "0") {
				limite = "";
			}

			sequelize.query("SELECT COUNT(cli.razon_social) as cantidad_empresas FROM agil_cliente as cli INNER JOIN inv_venta as v on v.cliente = cli.id\
				INNER JOIN inv_detalle_venta as dv on dv.venta = v.id\
				INNER JOIN agil_almacen AS a ON v.almacen = a.id\
				INNER JOIN agil_sucursal AS s ON a.sucursal = s.id\
				WHERE date(v.fecha) BETWEEN '"+ inicio + "' AND '" + fin + "'AND v.activa = true " + sucursalQuery + "\
				AND s.empresa = "+ req.params.idEmpresa + "\
				GROUP BY \
				cli.razon_social",
				{ type: sequelize.QueryTypes.SELECT })
				.then(function (detalleCantidad) {
					//res.json(detalle);
					sequelize.query("SELECT cli.id, cli.razon_social, sum(dv.total) as total FROM agil_cliente as cli INNER JOIN inv_venta as v on v.cliente = cli.id\
								INNER JOIN inv_detalle_venta as dv on dv.venta = v.id\
								INNER JOIN agil_almacen AS a ON v.almacen = a.id\
								INNER JOIN agil_sucursal AS s ON a.sucursal = s.id\
								WHERE date(v.fecha) BETWEEN '"+ inicio + "' AND '" + fin + "'AND v.activa = true " + sucursalQuery + "\
								"+ busquedaQuery + " AND s.empresa = " + req.params.idEmpresa + "\
								GROUP BY cli.id, cli.razon_social \
								ORDER BY "+ req.params.columna + " " + req.params.direccion + " " + limite,
						{ type: sequelize.QueryTypes.SELECT })
						.then(function (detalle) {
							//res.json(detalle);
							res.json({ detalle: detalle, paginas: Math.ceil(detalleCantidad.length / req.params.items_pagina) });
						});

				});
		})

	router.route("/ventas-cliente-puntajes/:idsSucursales/inicio/:inicio/fin/:fin/sucursal/:sucursal/idEmpresa/:idEmpresa/ubicacion/:ubicacion/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion")
		.get(ensureAuthorizedlogged, function (req, res) {
			// corregir fechas con horas ============================================================
			// =====================================================================================
			// var inicio = req.params.inicio.split('/').reverse().join('-'); //inicio.setHours(0, 0, 0, 0, 0);
			var inicioS = req.params.inicio.split('  ');
			var inicio = inicioS[0].split('/').reverse().join('-') + " " + inicioS[1];
			var finS = req.params.fin.split('  ');
			var fin = finS[0].split('/').reverse().join('-') + " " + finS[1];
			// var fin = req.params.fin.split('/').reverse().join('-'); //fin.setHours(23, 59, 59, 0, 0);
			condicionSucursal = { id: { $in: req.params.idsSucursales.split(',') } };
			condicionUsuario = {}, clienteRequerido = false;
			var busquedaQuery = (req.params.texto_busqueda === "0") ? "" : " AND cli.razon_social like '%" + req.params.texto_busqueda + "%'";
			var sucursalQuery;
			var busquedaQueryUbicacion = (req.params.ubicacion === "0") ? "" : " AND cli.ubicacion_geografica like '%" + req.params.ubicacion + "%'";

			if (req.params.sucursal == 0) {
				//condicionSucursal.id = req.params.sucursal;
				sucursalQuery = " AND s.id in (" + req.params.idsSucursales.split(',') + ")";
			} else {
				sucursalQuery = " AND s.id = " + req.params.sucursal;
			}

			var limite = " LIMIT " + (req.params.items_pagina * (req.params.pagina - 1)) + "," + req.params.items_pagina
			if (req.params.items_pagina == "0") {
				limite = "";
			}

			sequelize.query("SELECT COUNT(cli.razon_social) as cantidad_empresas FROM agil_cliente as cli INNER JOIN inv_venta as v on v.cliente = cli.id\
				INNER JOIN inv_detalle_venta as dv on dv.venta = v.id\
				INNER JOIN agil_producto_promocion_puntaje as pro on dv.promocion_puntaje = pro.id\
				INNER JOIN agil_almacen AS a ON v.almacen = a.id\
				INNER JOIN agil_sucursal AS s ON a.sucursal = s.id\
				WHERE date(v.fecha) BETWEEN '"+ inicio + "' AND '" + fin + "'AND v.activa = true " + sucursalQuery + "\
				"+ busquedaQuery + busquedaQueryUbicacion + " AND s.empresa = " + req.params.idEmpresa + "\
				AND dv.promocion_puntaje IS NOT NULL\
				GROUP BY \
				cli.razon_social",
				{ type: sequelize.QueryTypes.SELECT })
				.then(function (detalleCantidad) {
					//res.json(detalle);
					sequelize.query("SELECT cli.id, cli.razon_social, cli.ubicacion_geografica, sum(pro.puntaje*dv.cantidad) as total FROM agil_cliente as cli INNER JOIN inv_venta as v on v.cliente = cli.id\
								INNER JOIN inv_detalle_venta as dv on dv.venta = v.id\
								INNER JOIN agil_producto_promocion_puntaje as pro on dv.promocion_puntaje = pro.id\
								INNER JOIN agil_almacen AS a ON v.almacen = a.id\
								INNER JOIN agil_sucursal AS s ON a.sucursal = s.id\
								WHERE date(v.fecha) BETWEEN '"+ inicio + "' AND '" + fin + "'" + sucursalQuery + "\
								"+ busquedaQuery + busquedaQueryUbicacion + " AND s.empresa = " + req.params.idEmpresa + "\
								AND dv.promocion_puntaje IS NOT NULL\
								GROUP BY cli.id, cli.razon_social \
								ORDER BY "+ req.params.columna + " " + req.params.direccion + " " + limite,
						{ type: sequelize.QueryTypes.SELECT })
						.then(function (detalle) {
							//res.json(detalle);
							res.json({ detalle: detalle, paginas: Math.ceil(detalleCantidad.length / req.params.items_pagina) });
						});

				});
		})


	router.route('/inventarios/empresa/:id_empresa/almacen/:id_almacen/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/cantidad/:cantidad/grupo/:id_grupo/user/:id_usuario/verEstado/:verEstado/subGrupo/:id_subgrupo')
		.get(ensureAuthorizedlogged, function (req, res) {

			var estado = req.params.verEstado;
			var condicionProducto = "empresa=" + req.params.id_empresa;
			var condicionCantidad = ""
			if (req.params.texto_busqueda != 0) {
				condicionProducto = condicionProducto + " and (codigo like '%" + req.params.texto_busqueda + "%' or agil_producto.nombre like '%" + req.params.texto_busqueda + "%' or unidad_medida like '%" + req.params.texto_busqueda + "%' or descripcion like '%" + req.params.texto_busqueda + "%' or gr.nombre like '%" + req.params.texto_busqueda + "%' or sgr.nombre like '%" + req.params.texto_busqueda + "%')";
			}
			if (req.params.cantidad != 0) {
				if (req.params.cantidad == 1) {
					condicionCantidad = " HAVING SUM(inv_inventario.cantidad) > 0 "
				} else {
					condicionCantidad = " HAVING SUM(inv_inventario.cantidad) < 0 "
				}
			}
			if (estado == 'false') {


				UsuarioGrupos.findAll({
					where: { id_usuario: req.params.id_usuario }
				}).then(function (grupos) {
					var condicionGrupo = ""
					if (grupos.length > 0) {
						var grupoLiteral = '('
						let subgrupoLiteral = '('
						grupos.forEach(function (grupo, i) {
							if (i == grupos.length - 1) {
								grupoLiteral += grupo.id_grupo + ')'
							} else {
								grupoLiteral += grupo.id_grupo + ','
							}
						})
						if (req.params.id_grupo != "0") {
							condicionProducto += " and agil_producto.grupo =" + req.params.id_grupo
						} else {
							condicionProducto += " and agil_producto.grupo in " + grupoLiteral
						}
						if (req.params.id_subgrupo != "0" && req.params.id_subgrupo !== "todos") {
							condicionProducto += " and agil_producto.subgrupo =" + req.params.id_subgrupo
						}

						sequelize.query("select count(*) as cantidad_productos\
					from agil_producto\
					INNER JOIN gl_clase AS tipoProducto ON (agil_producto.tipo_producto = tipoProducto.id)\
					LEFT  JOIN gl_clase AS gr ON (agil_producto.grupo = gr.id)\
					LEFT  JOIN gl_clase AS sgr ON (agil_producto.subgrupo = sgr.id)\
					LEFT OUTER JOIN inv_inventario on agil_producto.id=inv_inventario.producto\
					INNER JOIN inv_detalle_movimiento ON inv_inventario.id = inv_detalle_movimiento.inventario AND inv_detalle_movimiento.movimiento IS NOT NULL\
					 where "+ condicionProducto + " and almacen=" + req.params.id_almacen + " GROUP BY agil_producto.id " + condicionCantidad, { type: sequelize.QueryTypes.SELECT })
							.then(function (data) {
								var cantidad_productos = data.length
								var options = {
									model: Producto,
									include: [{ model: Clase, as: 'tipoProducto' }]
								};
								Sequelize.Model.$validateIncludedElements(options);
								sequelize.query("select tipoProducto.id as 'tipoProducto.id',tipoProducto.nombre as 'tipoProducto.nombre',tipoProducto.nombre_corto as 'tipoProducto.nombre_corto', agil_producto.id,agil_producto.activar_inventario,agil_producto.unidad_medida,agil_producto.descuento,agil_producto.descuento_fijo,agil_producto.precio_unitario,agil_producto.inventario_minimo,agil_producto.codigo,agil_producto.nombre,agil_producto.descripcion,agil_producto.restar_solo_despacho,sum(inv_inventario.cantidad) as cantidad,min(inv_inventario.fecha_vencimiento) as fecha_vencimiento,gr.nombre as grupo,sgr.nombre as subgrupo\
							from agil_producto\
							INNER JOIN gl_clase AS tipoProducto ON (agil_producto.tipo_producto = tipoProducto.id)\
							LEFT  JOIN gl_clase AS gr ON (agil_producto.grupo = gr.id)\
							LEFT  JOIN gl_clase AS sgr ON (agil_producto.subgrupo = sgr.id)\
							LEFT OUTER JOIN inv_inventario on agil_producto.id=inv_inventario.producto\
							INNER JOIN inv_detalle_movimiento ON inv_inventario.id = inv_detalle_movimiento.inventario\
							INNER JOIN inv_movimiento ON inv_detalle_movimiento.movimiento = inv_movimiento.id AND inv_movimiento.tipo = 6 AND inv_movimiento.clase != 605\
							where "+ condicionProducto + " and inv_inventario.almacen=" + req.params.id_almacen + " \
			                 GROUP BY agil_producto.id "+ condicionCantidad + " order by " + req.params.columna + " " + req.params.direccion + " LIMIT " + (req.params.items_pagina * (req.params.pagina - 1)) + "," + req.params.items_pagina, options)
									.then(function (productos) {
										sequelize.query("select gr.nombre as grupo\
									from agil_producto\
									INNER JOIN gl_clase AS tipoProducto ON (agil_producto.tipo_producto = tipoProducto.id)\
									LEFT  JOIN gl_clase AS gr ON (agil_producto.grupo = gr.id)\
									LEFT  JOIN gl_clase AS sgr ON (agil_producto.subgrupo = sgr.id)\
									LEFT OUTER JOIN inv_inventario on agil_producto.id=inv_inventario.producto\
									INNER JOIN inv_detalle_movimiento ON inv_inventario.id = inv_detalle_movimiento.inventario AND inv_detalle_movimiento.movimiento IS NOT NULL\
									 where "+ condicionProducto + " and almacen=" + req.params.id_almacen + " \
													 GROUP BY gr.id "+ condicionCantidad, options)
											.then(function (todos) {
												res.json({ productos: productos, todos: todos, paginas: Math.ceil(cantidad_productos / req.params.items_pagina) });
											});
									});
							});
					} else {
						res.json({ productos: [], mensaje: 'El usuario no cuenta con grupos de productos asignados.', paginas: 1 });
					}
				})
			} else {
				var options = {
					model: Producto,
					include: [{ model: Clase, as: 'tipoProducto' }]
				};
				Sequelize.Model.$validateIncludedElements(options);
				sequelize.query("select tipoProducto.id as 'tipoProducto.id',tipoProducto.nombre as 'tipoProducto.nombre',tipoProducto.nombre_corto as 'tipoProducto.nombre_corto', agil_producto.id,agil_producto.activar_inventario,agil_producto.unidad_medida,agil_producto.descuento,agil_producto.descuento_fijo,agil_producto.precio_unitario,agil_producto.inventario_minimo,agil_producto.codigo,agil_producto.nombre,agil_producto.descripcion,sum(inv_inventario.cantidad) as cantidad,min(inv_inventario.fecha_vencimiento) as fecha_vencimiento,gr.nombre as grupo,sgr.nombre as subgrupo\
			from agil_producto\
			INNER JOIN gl_clase AS tipoProducto ON (agil_producto.tipo_producto = tipoProducto.id)\
			LEFT  JOIN gl_clase AS gr ON (agil_producto.grupo = gr.id)\
			LEFT  JOIN gl_clase AS sgr ON (agil_producto.subgrupo = sgr.id)\
			LEFT OUTER JOIN inv_inventario on agil_producto.id=inv_inventario.producto\
			INNER JOIN inv_detalle_movimiento ON inv_inventario.id = inv_detalle_movimiento.inventario\
			INNER JOIN inv_movimiento ON inv_detalle_movimiento.movimiento = inv_movimiento.id AND inv_movimiento.tipo = 6 AND inv_movimiento.clase != 605\
			 where "+ condicionProducto + " and inv_inventario.almacen=" + req.params.id_almacen + " \
							 GROUP BY agil_producto.id "+ condicionCantidad + " order by " + req.params.columna + " " + req.params.direccion, options)
					.then(function (productos) {
						res.json({ productos: productos });
					});
			}
		});
	router.route('/detalle/:inicio/:fin/:idEmpresa/:id')
		.get(ensureAuthorizedlogged, function (req, res) {
			var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0, 0);
			var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 59);
			var condicionCompra = { fecha: { $between: [inicio, fin] } };
			DetalleVenta.findAll({
				where: { id_producto: req.params.id },
				include: [{ model: Producto, as: 'producto', where: { id_empresa: req.params.idEmpresa } },
				{
					model: Venta, as: 'venta', where: condicionCompra, include: [{ model: Cliente, as: 'cliente' }]
				}]
			}).then(function (Detalle) {
				res.json(Detalle);

			});
		});

	router.route('/detalleEmpresa/:inicio/:fin/:idEmpresa/:id')
		.get(ensureAuthorizedlogged, function (req, res) {
			var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0, 0);
			var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 59);
			var condicionCompra = { fecha: { $between: [inicio, fin] } };
			Producto.findAll({
				include: [{
					model: DetalleVenta, as: 'detallesVenta', include: [{ model: Venta, as: 'venta', where: condicionCompra, include: [{ model: Cliente, as: 'cliente', where: { id: req.params.id, id_empresa: req.params.idEmpresa } }] },
					]
				}]
			}).then(function (detalle) {
				res.json(detalle);
			})
		});

	router.route('/detalle-cliente-puntaje/:inicio/:fin/:idEmpresa/:id')
		.get(ensureAuthorizedlogged, function (req, res) {
			var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0, 0);
			var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 59);
			var condicionCompra = { fecha: { $between: [inicio, fin] } };
			Producto.findAll({
				include: [{
					model: DetalleVenta, as: 'detallesVenta',
					where: {
						id_promocion_puntaje: {
							$ne: null
						}
					},
					include: [
						{
							model: Venta, as: 'venta', where: condicionCompra,
							include: [{ model: Cliente, as: 'cliente', where: { id: req.params.id, id_empresa: req.params.idEmpresa } }]
						},
						{ model: ProductoPromocionPuntaje, as: 'promocionActualPuntaje' }
					]
				}]
			}).then(function (detalle) {
				res.json(detalle);
			})
		});



	router.route('/compras/:idsSucursales/inicio/:inicio/fin/:fin/razon-social/:razon_social/nit/:nit/monto/:monto/tipo-compra/:tipo_compra/sucursal/:sucursal/usuario/:usuario/user/:id_usuario/tipo/:tipo/:dociso')
		.get(ensureAuthorizedlogged, async function (req, res) {
			try {
				let sucursales = await UsuarioSucursal.findAll({
					attributes: [[sequelize.fn('GROUP_CONCAT', sequelize.col('sucursal')), 'idsSucursales']],
					where: {
						id_usuario: req.params.id_usuario
					},
				})
				req.params.idsSucursales = sucursales[0].dataValues.idsSucursales
				let inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0, 0);
				let fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 0, 0);
				let condicionProveedor = {}, condicionCompra = { fecha: { $between: [inicio, fin] } },
					condicionSucursal = { id: { $in: req.params.idsSucursales.split(',') } },
					condicionUsuario = {};
				let modelProveedor = { model: Proveedor, as: 'proveedor', required: false, where: condicionProveedor }

				if (req.params.razon_social != 0) {
					delete modelProveedor.required;
					condicionProveedor.razon_social = { $like: "%" + req.params.razon_social + "%" };
				}
				if (req.params.nit != 0) {
					delete modelProveedor.required;
					condicionProveedor.nit = parseInt(req.params.nit);
				}
				if (req.params.monto != 0) {
					condicionCompra.total = parseFloat(req.params.monto);
				}
				if (req.params.dociso != 0) {
					condicionCompra.numero_iso_compra = parseFloat(req.params.dociso);
				}
				if (req.params.tipo_compra != 0) {
					condicionCompra.id_tipo_pago = req.params.tipo_compra;
				}
				if (req.params.sucursal != 0) {
					condicionSucursal.id = req.params.sucursal;
				}
				if (req.params.usuario != 0) {
					condicionUsuario.nombre_usuario = { $like: "%" + req.params.usuario + "%" };
				}
				condicionCompra.usar_producto = true
				let compras = []
				//compras que usan producto
				let entity = await Compra.findAll({
					where: condicionCompra,
					include: [{ model: PagoCompra, as: 'pagosCompra' },/* {model:Clase,as:'tipoMovimiento'},{ model: Sucursal, as: 'sucursal',where: condicionSucursal }, */ {
						model: Movimiento, as: 'movimiento',
						include: [{ model: Clase, as: 'clase', }]
					}, {
						model: DetalleCompra, as: 'detallesCompra',
						include: [{ model: Producto, as: 'producto' },
						{ model: Clase, as: 'centroCosto',/*,where:{nombre_corto:'ALM'}*/ }]
					},
					{
						model: ConfiguracionIso, as: 'configuracionesIso', required: false
					},
					{ model: Clase, as: 'tipoPago', },
					{ model: Usuario, as: 'usuario', where: condicionUsuario },
						modelProveedor,
					{
						model: Almacen, as: 'almacen',
						include: [{
							model: Sucursal, as: 'sucursal',
							where: condicionSucursal
						}]
					}]
				})
				let ids = entity.reduce((value, x) => {
					value.push(x.id);
					return value;
				},[])
				//compras sin detalle  creo que viene desde caja chica
				condicionCompra.id = { $notIn: ids }
				let entity3 = await Compra.findAll({
					where: condicionCompra,
					include: [{ model: PagoCompra, as: 'pagosCompra' }, {
						model: Movimiento, as: 'movimiento',
						include: [{ model: Clase, as: 'clase', }]
					},
					{ model: ConfiguracionIso, as: 'configuracionesIso', required: false },
					{ model: Clase, as: 'tipoPago', },
					{ model: Usuario, as: 'usuario', where: condicionUsuario },
					{ model: Proveedor, as: 'proveedor', where: condicionProveedor },
					{
						model: Sucursal, as: 'sucursal',
						where: condicionSucursal
					}]
				})

				condicionCompra.usar_producto = false
				//compras de servicio
				entity2 = await Compra.findAll({
					where: condicionCompra,
					include: [{ model: Clase, as: 'tipoMovimiento' },
					{ model: Sucursal, as: 'sucursal', where: condicionSucursal }, {
						model: DetalleCompra, as: 'detallesCompra',
						include: [{ model: Clase, as: 'servicio' }
						]
					},
					{
						model: ConfiguracionIso, as: 'configuracionesIso', required: false
					},
					{ model: Clase, as: 'tipoPago', },
					{ model: Usuario, as: 'usuario', where: condicionUsuario },
					{ model: Proveedor, as: 'proveedor', where: condicionProveedor },
					]
				})

				entity = entity.concat(entity3);
				compras = entity.concat(entity2);

				if (req.params.tipo == 'productos') {
					res.json(entity);
				} else if (req.params.tipo == 'servicios') {
					res.json(entity2);
				} else {
					compras = compras.sort(function (a, b) {
						return a.fecha - b.fecha;
					});
					res.json(compras);
				}


			} catch (error) {
				res.json([{ mensaje: error.stack, hasErr: true }]);
			}
		});

	router.route('/compras/:id')
		.get(ensureAuthorizedlogged, function (req, res) {
			Compra.find({
				where: {
					id: req.params.id
				},
				include: [{ model: DetalleCalificacionProveedor, as: 'detalleCalifiacionProveedor', include: [{ model: Clase, as: 'concepto' }] }, { model: Clase, as: 'tipoMovimiento', required: false }, { model: Sucursal, as: 'sucursal', required: false }, {
					model: Movimiento, as: 'movimiento', required: false,
					include: [{ model: DetalleMovimiento, as: 'detallesMovimiento', required: false }, { model: Clase, as: 'clase' }]
				},
				{
					model: DetalleCompra, as: 'detallesCompra', required: false,
					include: [{ model: Producto, as: 'producto', required: false }, { model: Clase, as: 'servicio', required: false },
					{ model: Inventario, as: 'inventario', required: false, include: [{ model: DetalleMovimiento, as: 'detallesMovimiento' }] },
					{ model: Clase, as: 'centroCosto'/*,where:{nombre_corto:'ALM'}*/, required: false }]
				},
				{ model: Clase, as: 'tipoPago', required: false },
				{ model: Proveedor, as: 'proveedor', required: false },
				{
					model: Almacen, as: 'almacen', required: false,
					include: [{ model: Sucursal, as: 'sucursal', required: false }]
				}]
			}).then(function (entity) {
				res.json(entity);
			});
		})

		.put(ensureAuthorizedlogged, function (req, res) {
			Sucursal.find({
				where: {
					id: req.body.almacen ? req.body.almacen.id_sucursal : req.body.idSucursal
				}
			}).then((suc) => {
				if (!suc.activo) return res.json({ mensaje: 'La sucursal ' + suc.nombre + ' está deshabilitada. No se pueden realizar cambios.', hasErr: true })
				if (req.body.saldoRestante == 0) {
					var anticipo = 0
				} else {
					var anticipo = req.body.saldoRestante * (-1);
				}
				var pagoV = req.body.pago - anticipo
				if (req.body.esModificacion) {
					var compra = req.body;
					if (req.body.usar_producto) {
						Compra.update({
							id_almacen: compra.almacen.id,
							id_proveedor: compra.proveedor ? compra.proveedor.id : null,
							factura: compra.factura,
							autorizacion: compra.autorizacion,
							fecha: compra.fecha,
							codigo_control: compra.codigo_control,
							importe: compra.importe ? compra.importe : 0,
							importe_dolares: compra.importe_dolares ? compra.importe_dolares : 0,
							id_tipo_pago: compra.id_tipo_pago,
							dias_credito: compra.dias_credito,
							a_cuenta: compra.a_cuenta,
							saldo: compra.saldo,
							a_cuenta_dolares: compra.a_cuenta_dolares,
							saldo_dolares: compra.saldo_dolares,
							descuento_general: compra.descuento_general,
							descuento: compra.descuento,
							recargo: compra.recargo,
							ice: compra.ice,
							excento: compra.excento,
							descuento_dolares: compra.descuento_dolares,
							recargo_dolares: compra.recargo_dolares,
							ice_dolares: compra.ice_dolares,
							excento_dolares: compra.excento_dolares,
							tipo_descuento: compra.tipo_descuento,
							tipo_recargo: compra.tipo_recargo,
							total: compra.total ? compra.total : 0,
							total_dolares: compra.total_dolares ? compra.total_dolares : 0,
							usar_producto: compra.usar_producto,
							observacion: compra.observacion,
							dui: compra.dui,
							tipo_retencion: compra.tipo_retencion,
							calificacion_proveedor: compra.calificacion_proveedor,
							doc_rendicion: compra.doc_rendicion ? compra.doc_rendicion : null
						}, {
							where: {
								id: compra.id
							}
						}).then(function (compraActualizada) {
							Movimiento.update({
								id_almacen: compra.almacen.id,
								fecha: compra.fecha,
							}, {
								where: {
									id: compra.movimiento.id
								}
							}).then(function (movimientoActualizado) {
								compra.detallesCompra.forEach(function (detalleCompra, index, array) {
									if (detalleCompra.id) {
										if (!detalleCompra.eliminado) {
											if (detalleCompra.centroCosto.nombre_corto == "ALM") {
												DetalleCompra.update({
													cantidad: detalleCompra.cantidad,
													costo_unitario: detalleCompra.costo_unitario ? detalleCompra.costo_unitario : 0,
													costo_unitario_dolares: detalleCompra.costo_unitario_dolares ? detalleCompra.costo_unitario_dolares : 0,
													importe: detalleCompra.importe ? detalleCompra.importe : 0,
													importe_dolares: detalleCompra.importe_dolares ? detalleCompra.importe_dolares : 0,
													total: detalleCompra.total,
													total_dolares: detalleCompra.total_dolares,
													observacion: detalleCompra.observacion || ''
												}, {
													where: {
														id: detalleCompra.id
													}
												}).then(function (detalleCompraActualizado) {

													DetalleMovimiento.find({
														where: {
															id_inventario: detalleCompra.id_inventario,
															id_movimiento: compra.movimiento.id,
															id_producto: detalleCompra.producto.id
														}
													}).then(function (detalleMovimiento) {
														Inventario.find({
															where: {
																id: detalleCompra.id_inventario
															}
														}).then(function (inventario) {
															var diferencia = 0, cantidadInventario = inventario.cantidad;
															if (detalleCompra.cantidad > detalleMovimiento.cantidad) {
																diferencia = detalleCompra.cantidad - detalleMovimiento.cantidad;
																cantidadInventario = cantidadInventario + diferencia;
															} else if (detalleCompra.cantidad < detalleMovimiento.cantidad) {
																diferencia = detalleMovimiento.cantidad - detalleCompra.cantidad;
																cantidadInventario = cantidadInventario - diferencia;
															}

															var costo_unitario_neto = (Math.round((((detalleCompra.importe - detalleCompra.descuento) * 1) / detalleCompra.cantidad) * 100) / 100);
															if (compra.movimiento.clase.nombre_corto == "ID" || compra.movimiento.clase.nombre_corto == "IPI") {
																costo_unitario_neto = (Math.round((((detalleCompra.importe - detalleCompra.descuento) * 0.87) / detalleCompra.cantidad) * 100) / 100);
															}
															Inventario.update({
																cantidad: cantidadInventario,
																costo_unitario: detalleCompra.costo_unitario ? detalleCompra.costo_unitario : 0,
																costo_unitario_dolares: detalleCompra.costo_unitario_dolares ? detalleCompra.costo_unitario_dolares : 0,
																costo_total: detalleCompra.costo_unitario * cantidadInventario,
																costo_total_dolares: (detalleCompra.costo_unitario_dolares ? detalleCompra.costo_unitario_dolares : 0) * cantidadInventario,
																fecha_vencimiento: (detalleCompra.inventario.fechaVencimientoTexto ? new Date(detalleCompra.inventario.fechaVencimientoTexto.split('/')[1] + "/" + detalleCompra.inventario.fechaVencimientoTexto.split('/')[0] + "/" + detalleCompra.inventario.fechaVencimientoTexto.split('/')[2]) : null),
																lote: detalleCompra.inventario.lote,
																costo_unitario_neto: costo_unitario_neto
															}, {
																where: {
																	id: inventario.id
																}
															}).then(function (inventarioActualizado) {
																DetalleMovimiento.update({
																	cantidad: detalleCompra.cantidad,
																	costo_unitario: detalleCompra.costo_unitario ? detalleCompra.costo_unitario : 0,
																	costo_unitario_dolares: detalleCompra.costo_unitario_dolares ? detalleCompra.costo_unitario_dolares : 0,
																	importe: detalleCompra.importe ? detalleCompra.importe : 0,
																	importe_dolares: detalleCompra.importe_dolares ? detalleCompra.importe_dolares : 0,
																	total: detalleCompra.total ? detalleCompra.total : 0,
																	total_dolares: detalleCompra.total_dolares ? detalleCompra.total_dolares : 0
																}, {
																	where: {
																		id: detalleMovimiento.id
																	}
																}).then(function (detalleMovimientoActualizado) {

																});
															});
														});
													});

												});
											} else {
												DetalleCompra.update({
													cantidad: detalleCompra.cantidad,
													costo_unitario: detalleCompra.costo_unitario ? detalleCompra.costo_unitario : 0,
													costo_unitario_dolares: detalleCompra.costo_unitario_dolares ? detalleCompra.costo_unitario_dolares : 0,
													importe: detalleCompra.importe ? detalleCompra.importe : 0,
													importe_dolares: detalleCompra.importe_dolares ? detalleCompra.importe_dolares : 0,
													total: detalleCompra.total ? detalleCompra.total : 0,
													total_dolares: detalleCompra.total_dolares ? detalleCompra.total_dolares : 0,
													observacion: detalleCompra.observacion || ''

												}, {
													where: {
														id: detalleCompra.id
													}
												}).then(function (detalleCompraActualizado) {

												})
											}
										} else {
											if (detalleCompra.centroCosto.nombre_corto == "ALM") {
												DetalleMovimiento.destroy({
													where: {
														id_inventario: detalleCompra.id_inventario,
														id_movimiento: compra.movimiento.id,
														id_producto: detalleCompra.producto ? detalleCompra.producto.id : null
													}
												}).then(function (detalleMovimientoEliminado) {
													DetalleCompra.destroy({
														where: {
															id: detalleCompra.id
														}
													}).then(function (detalleCompraEliminado) {
														Inventario.update(
															{
																cantidad: 0
															}, {
															where: {
																id: detalleCompra.id_inventario
															}
														}).then(function (inventarioEliminado) {

														});
													});
												});
											} else {
												DetalleCompra.destroy({
													where: {
														id: detalleCompra.id
													}
												}).then(function (detalleCompraEliminado) {
												})
											}
										}
									} else {
										if (detalleCompra.centroCosto.nombre_corto == "ALM") {
											crearDetalleCompra(detalleCompra, compra.movimiento.id, compra.id, compra.almacen.id, detalleCompra.producto.id, detalleCompra.centroCosto.id, res, compra)
										} else {
											if (!detalleCompra.producto.id) {
												Producto.create({
													nombre: detalleCompra.producto.nombre,
													codigo: detalleCompra.producto.codigo,
													unidad_medida: detalleCompra.producto.unidad_medida,
													id_empresa: compra.id_empresa,
												}).then(function (productoCreado) {
													if (!detalleCompra.centroCosto.id) {
														Tipo.find({
															where: { nombre_corto: 'CCO' }
														}).then(function (tipoCentroCosto) {
															Clase.create({
																nombre: detalleCompra.centroCosto.nombre,
																id_tipo: tipoCentroCosto.id,
																eliminado: false,
																habilitado: true
															}).then(function (centroCostoCreado) {
																crearDetalleCompra(detalleCompra, compra.movimiento.id, compra.id, compra.almacen.id, productoCreado.id, detalleCompra.centroCosto.id, res, compra)
															});
														});
													} else {
														crearDetalleCompra(detalleCompra, compra.movimiento.id, compra.id, compra.almacen.id, productoCreado.id, detalleCompra.centroCosto.id, res, compra)
													}
												});
											} else {
												if (!detalleCompra.centroCosto.id) {
													Tipo.find({
														where: { nombre_corto: 'CCO' }
													}).then(function (tipoCentroCosto) {
														Clase.create({
															nombre: detalleCompra.centroCosto.nombre,
															id_tipo: tipoCentroCosto.id,
															eliminado: false,
															habilitado: true
														}).then(function (centroCostoCreado) {
															crearDetalleCompra(detalleCompra, compra.movimiento.id, compra.id, compra.almacen.id, detalleCompra.producto.id, detalleCompra.centroCosto.id, res, compra)
														});
													});
												} else {
													crearDetalleCompra(detalleCompra, compra.movimiento.id, compra.id, compra.almacen.id, detalleCompra.producto.id, detalleCompra.centroCosto.id, res, compra)
												}
											}
										}
									}
									if (index == (array.length - 1)) {
										if (compra.generado_por_pedido) {
											var RecibioPedidoTotal = true
											compra.pedido.detallesPedido.forEach(function (detalle, index, array) {
												var recibido = false
												if (detalle.entregas.length > 0) {
													detalle.cantidad = detalle.entregas.reduce(function (val, x) {
														val = val - x.entregado
														return val
													}, detalle.cantidad)
												}
												if (detalle.cantidad <= detalle.detalleCompra.cantidad_parcial) {
													recibido = true
												} else {
													recibido = detalle.detalleCompra.entregado ? detalle.detalleCompra.entregado : false
													RecibioPedidoTotal = detalle.detalleCompra.entregado ? detalle.detalleCompra.entregado : false
												}
												if (detalle.pendiente == true) {

													if (index == (array.length - 1)) {
														Pedido.update({
															recibido: RecibioPedidoTotal,
															id_compra: compra.id
														}, {
															where: { id: compra.pedido.id }
														}).then(function (productoEntregado) {
															crearCalificacionProveedor(compra, res, true)

														})
													}
												} else if (detalle.eliminado == true) {

													DetallesPedido.update({
														eliminado: true
													}, {
														where: { id: detalle.id }
													})
													if (index == (array.length - 1)) {
														Pedido.update({
															recibido: RecibioPedidoTotal,
															id_compra: compra.id
														}, {
															where: { id: compra.pedido.id }
														}).then(function (productoEntregado) {
															crearCalificacionProveedor(compra, res, true)
														})
													}
												} else {
													DetallesPedido.update({
														recibido: recibido
													}, {
														where: { id: detalle.id }
													}).then(function (detallePedidoActualizado) {
														DetallePedidoEntrega.create({
															id_detalle_pedido: detalle.id,
															entregado: detalle.detalleCompra.cantidad,
															restante: detalle.cantidad - detalle.detalleCompra.cantidad,
															fecha: compra.fecha,
														}).then(function (entregaCreada) {
															if (index == (array.length - 1)) {
																Pedido.update({
																	recibido: RecibioPedidoTotal,
																	id_compra: compra.id
																}, {
																	where: { id: compra.pedido.id }
																}).then(function (productoEntregado) {
																	crearCalificacionProveedor(compra, res, true)
																})
															}
														})
													})

												}


											})

										} else {
											crearCalificacionProveedor(compra, res, true)
										}
									}
								});
							});
						});
					} else {
						Compra.update({
							id_sucursal: compra.sucursal.id,
							id_tipo_movimiento: compra.movimiento.clase.id,
							id_proveedor: compra.proveedor.id,
							factura: compra.factura,
							autorizacion: compra.autorizacion,
							fecha: compra.fecha,
							codigo_control: compra.codigo_control,
							importe: compra.importe ? compra.importe : 0,
							importe_dolares: compra.importe_dolares ? compra.importe_dolares : 0,
							id_tipo_pago: compra.id_tipo_pago,
							dias_credito: compra.dias_credito,
							a_cuenta: compra.a_cuenta,
							saldo: compra.saldo,
							a_cuenta_dolares: compra.a_cuenta_dolares,
							saldo_dolares: compra.saldo_dolares,
							descuento_general: compra.descuento_general,
							descuento: compra.descuento,
							recargo: compra.recargo,
							ice: compra.ice,
							excento: compra.excento,
							descuento_dolares: compra.descuento_dolares,
							recargo_dolares: compra.recargo_dolares,
							ice_dolares: compra.ice_dolares,
							excento_dolares: compra.excento_dolares,
							tipo_descuento: compra.tipo_descuento,
							tipo_recargo: compra.tipo_recargo,
							total: compra.total ? compra.total : 0,
							total_dolares: compra.total_dolares ? compra.total_dolares : 0,
							id_usuario: compra.id_usuario,
							usar_producto: compra.usar_producto,
							observacion: compra.observacion,
							dui: compra.dui,
							tipo_retencion: compra.tipo_retencion,
							calificacion_proveedor: compra.calificacion_proveedor,
							doc_rendicion: compra.doc_rendicion ? compra.doc_rendicion : null
						}, {
							where: {
								id: compra.id
							}
						}).then(function (compraActualizada) {

							compra.detallesCompra.forEach(function (detalleCompra, index, array) {
								if (detalleCompra.id) {
									if (!detalleCompra.eliminado) {
										DetalleCompra.update({
											cantidad: detalleCompra.cantidad,
											costo_unitario: detalleCompra.costo_unitario,
											costo_unitario_dolares: detalleCompra.costo_unitario_dolares,
											importe: detalleCompra.importe ? detalleCompra.importe : 0,
											importe_dolares: detalleCompra.importe_dolares ? detalleCompra.importe_dolares : 0,
											total: detalleCompra.total ? detalleCompra.total : 0,
											total_dolares: detalleCompra.total_dolares ? detalleCompra.total_dolares : 0,
											observacion: detalleCompra.observacion || ''

										}, {
											where: {
												id: detalleCompra.id
											}
										}).then(function (detalleCompraActualizado) {

										});
									} else {
										DetalleMovimiento.destroy({
											where: {
												id_inventario: detalleCompra.id_inventario,
												id_movimiento: compra.movimiento.id,
												id_producto: detalleCompra.producto.id
											}
										}).then(function (detalleMovimientoEliminado) {
											DetalleCompra.destroy({
												where: {
													id: detalleCompra.id
												}
											}).then(function (detalleCompraEliminado) {

											});
										});
									}
								} else {
									crearDetalleCompraServicio(detalleCompra, compra.id, res);
								}


								if (index == (array.length - 1)) {
									res.json({ mensaje: "Compra actualizada satisfactoriamente!" });
								}
							});

						});
					}
				} else {
					Compra.find({
						where: { id: req.params.id },
						include: [{
							model: Almacen, as: 'almacen',
							include: [{ model: Sucursal, as: 'sucursal' }]
						}]
					}).then(function (compraEncontrada) {
						if (!compraEncontrada.almacen.sucursal.activo) return res.json({ mensaje: 'La sucursal ' + compraEncontrada.almacen.sucursal.nombre + ' está deshabilitada. No se pueden realizar cambios.', hasErr: true })
						Compra.update({
							a_cuenta: compraEncontrada.a_cuenta + pagoV,
							saldo: compraEncontrada.total - (compraEncontrada.a_cuenta + pagoV)
						}, {
							where: {
								id: compraEncontrada.id
							}
						}).then(function (affectedRows) {
							PagoCompra.create({
								id_compra: compraEncontrada.id,
								a_cuenta_anterior: compraEncontrada.a_cuenta,
								saldo_anterior: compraEncontrada.saldo,
								monto_pagado: pagoV,
								id_usuario: req.body.id_usuario_cajero,
								numero_documento: compraEncontrada.almacen.sucursal.nota_recibo_correlativo
							}).then(function (detalleVentaCreada) {
								Sucursal.update({
									nota_recibo_correlativo: compraEncontrada.almacen.sucursal.nota_recibo_correlativo + 1
								}, {
									where: {
										id: compraEncontrada.almacen.sucursal.id
									}
								}).then(function (affectedRows) {
									if (anticipo != 0) {
										Sucursal.find({
											where: { id: compraEncontrada.almacen.sucursal.id }
										}).then(function (sucursalEncontrada) {
											ProveedorAnticipo.create({
												id_proveedor: parseInt(compraEncontrada.id_proveedor),
												monto_anticipo: anticipo,
												fecha: req.body.fecha,
												monto_salida: 0,
												saldo: anticipo,
												id_sucursal: compraEncontrada.almacen.sucursal.id,
												numero_correlativo_anticipo: sucursalEncontrada.anticipo_proveedor_correlativo,
												eliminado: false
											}).then(function (ProvedorAnticipoCreado) {
												var correlativo = sucursalEncontrada.anticipo_proveedor_correlativo + 1
												Sucursal.update({
													anticipo_proveedor_correlativo: correlativo
												}, {
													where: { id: compraEncontrada.almacen.sucursal.id }
												}).then(function (Actualizado) {
													ProveedorAnticipo.find({
														where: { id: ProvedorAnticipoCreado.id },
														include: [{ model: Sucursal, as: 'sucursal' }, { model: Proveedor, as: 'proveedor' }]
													}).then(function (encontrado) {
														var pago = NumeroLiteral.Convertir(parseFloat(pagoV).toFixed(2).toString());
														res.json({ anticipo: encontrado, mensaje: "¡Saldo de cuenta actualizado satisfactoriamente!", pago: pago, compra: compraEncontrada });
													})

												})

											})
										})
									} else {
										var pago = NumeroLiteral.Convertir(parseFloat(pagoV).toFixed(2).toString());
										res.json({ anticipo: {}, mensaje: "¡Saldo de cuenta actualizado satisfactoriamente!", pago: pago, compra: compraEncontrada });
									}

								});
							});
						});
					});
				}

			}).catch((err) => {
				res.json({ mensaje: err.stack, hasErr: true })
			})
		});

	router.route('/comprasComprobante')
		.post(ensureAuthorizedlogged, function (req, res) {
			var compras = req.body;
			const sucursales = compras.map(compra => compra.sucursal.id)
			Sucursal.findAll({
				where: {
					id: {
						$in: sucursales
					},
					activo: false
				}
			}).then((ucursales) => {
				if (!ucursales.length > 0) return res.json({ mensaje: 'Existen sucursales deshabilitadas. No se pueden realizar cambios.', hasErr: true })
				Tipo.find({
					where: { nombre_corto: 'MOVING' }
				}).then(function (tipoMovimiento) {
					Clase.find({
						where: { nombre_corto: 'ID' }
					}).then(function (conceptoMovimiento) {
						compras.forEach(function (compra, index, array) {
							Movimiento.create({
								id_tipo: tipoMovimiento.id,
								id_clase: conceptoMovimiento.id,
								fecha: compra.fecha
							}).then(function (movimientoCreado) {
								Proveedor.find({
									where: {
										nit: compra.nit
									}
								}).then(function (provedorEncontrado) {
									if (!provedorEncontrado) {
										Proveedor.create({
											id_empresa: compra.id_empresa,
											nit: compra.nit,
											estado: "V"
										}).then(function (proveedorCreado) {
											crearCompra(compra, res, proveedorCreado.id, movimientoCreado.id, conceptoMovimiento.id);
											if (index === (array.length - 1)) {
												res.json({ mensaje: "¡Comprobante creado satisfactoriamente!" });
											}

										});
									} else {
										crearCompra(compra, res, provedorEncontrado.id, movimientoCreado.id, conceptoMovimiento.id);
										if (index === (array.length - 1)) {
											res.json({ mensaje: "¡Comprobante creado satisfactoriamente!" });
										}
									}
								})

							});
						});
					});
				});
			}).catch((err) => {
				res.json({ mensaje: err.stack, hasErr: true })
			})
		});

	//lista de compras sin contabilizar
	router.route('/compras/empresa/:id_empresa/inicio/:inicio/fin/:fin/pagina/:pagina/items_pagina/:items_pagina/texto_busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/tipo/:tipo')
		.get(ensureAuthorizedlogged, function (req, res) {
			var condicionCompra = { contabilizado: false, usar_producto: true }
			var condicionProveedor = {}
			if (req.params.inicio != 0) {
				var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0);
				var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 59);
				condicionCompra.fecha = { $between: [inicio, fin] };

			}
			if (req.params.texto_busqueda != 0) {
				condicionProveedor = {
					$or: [
						{
							razon_social: {
								$like: "%" + req.params.texto_busqueda + "%"
							}
						}
					]
				};
			}
			var ordenArreglo = []
			var textOrder = ""
			if (req.params.columna == 'razon_social') {
				textOrder = "`proveedor.razon_social` " + req.params.direccion
			} else {
				textOrder = req.params.columna + " " + req.params.direccion
			}
			if (req.params.items_pagina != '0') {
				textOrder = textOrder + " limit " + (req.params.items_pagina * (req.params.pagina - 1)) + ", " + req.params.items_pagina
			}
			var datosBusqueda = {}
			if (req.params.tipo != "0") {
				datosBusqueda = {
					where: condicionCompra,

					include: [{ model: CajaChica, as: 'cajaChica', required: false, where: { id: null } }, {
						model: DetalleCompra, as: 'detallesCompra',
						include: [{ model: Producto, as: 'producto' },
						{ model: Clase, as: 'centroCosto',/*,where:{nombre_corto:'ALM'}*/ }]
					}, {
						model: Movimiento, as: 'movimiento',
						include: [{ model: Clase, as: 'clase' }]
					},
					{
						model: Proveedor, as: 'proveedor', where: condicionProveedor,
					},

					{
						model: Almacen, as: 'almacen',
						include: [{
							model: Sucursal, as: 'sucursal',
							where: { id_empresa: req.params.id_empresa }
						}]
					},
					{ model: Clase, as: 'tipoPago' }

					],
				}
				datosBusqueda.group = ["`inv_compra`.`id`"]
				Compra.count(datosBusqueda).then(function (ComprasCount) {
					datosBusqueda.order = sequelize.literal(textOrder)
					Compra.findAll(datosBusqueda).then(async function (compras) {
						for (const compra of compras) {
							let datos = await ProveedorCuenta.findAll({
								where: { id_proveedor: compra.proveedor.id },
								include: [{
									model: ContabilidadCuenta, as: 'cuenta',
									include: [{
										model: Clase, as: 'tipoCuenta',
										model: Clase, as: 'tipoAuxiliar',
									}]
								}, { model: Clase, as: 'tipo' }]
							})
							compra.dataValues.proveedor.dataValues.proveedorCuentas = datos
						}
						res.json({ compras: compras, paginas: Math.ceil(ComprasCount.length / req.params.items_pagina) })
					})
				})
			} else {
				condicionCompra.usar_producto = false
				datosBusqueda = {
					where: condicionCompra,
					include: [{ model: CajaChica, as: 'cajaChica', required: false, where: { id: null } },
					{ model: Clase, as: 'tipoMovimiento' },
					{
						model: Sucursal, as: 'sucursal',
						where: { id_empresa: req.params.id_empresa }
					},
					{
						model: Movimiento, as: 'movimiento',
						required: false, include: [{ model: Clase, as: 'clase' }]
					},
					{
						model: Proveedor, as: 'proveedor', where: condicionProveedor,
					},
					{ model: Clase, as: 'tipoPago' }]
				}
				datosBusqueda.group = ["`inv_compra`.`id`"]
				var condicionCompra = { contabilizado: false, usar_producto: false }
				Compra.count(datosBusqueda).then(function (ComprasCount) {
					datosBusqueda.order = sequelize.literal(textOrder)
					Compra.findAll(datosBusqueda).then(async function (compras) {
						for (const compra of compras) {
							compra.proveedor.dataValues.proveedorCuentas = await ProveedorCuenta.findAll({
								where: { id_proveedor: compra.proveedor.id },
								include: [{
									model: ContabilidadCuenta, as: 'cuenta',
									include: [{
										model: Clase, as: 'tipoCuenta',
										model: Clase, as: 'tipoAuxiliar',
									}]
								}, { model: Clase, as: 'tipo' }]
							})
						}
						res.json({ compras: compras, paginas: Math.ceil(ComprasCount.length / req.params.items_pagina) })
					})
				})
			}
		})
	//cantidad de compras para alertas
	router.route('/alertas/compras/cantidad/:id_empresa')
		.get(function (req, res) {
			Compra.count({
				where: { contabilizado: false, usar_producto: true },

				include: [{ model: CajaChica, as: 'cajaChica', required: false }, {
					model: DetalleCompra, as: 'detallesCompra',
					include: [{ model: Producto, as: 'producto' },
					{ model: Clase, as: 'centroCosto',/*,where:{nombre_corto:'ALM'}*/ }]
				}, { model: Movimiento, as: 'movimiento', include: [{ model: Clase, as: 'clase' }] }, { model: Proveedor, as: 'proveedor', include: [{ model: ProveedorCuenta, as: 'proveedorCuentas', include: [{ model: ContabilidadCuenta, as: 'cuenta', include: [{ model: Clase, as: 'tipoCuenta' }] }, { model: Clase, as: 'tipo' }] }] },

				{ model: Almacen, as: 'almacen', include: [{ model: Sucursal, as: 'sucursal', where: { id_empresa: req.params.id_empresa } }] },

				]

			}).then(function (Compras) {
				Compra.count({
					where: { contabilizado: false, usar_producto: false },
					include: [{ model: CajaChica, as: 'cajaChica', required: false }, { model: Clase, as: 'tipoMovimiento' }, { model: Sucursal, as: 'sucursal', where: { id_empresa: req.params.id_empresa } }, { model: Movimiento, as: 'movimiento', required: false, include: [{ model: Clase, as: 'clase' }] }, { model: Proveedor, as: 'proveedor', include: [{ model: ProveedorCuenta, as: 'proveedorCuentas', include: [{ model: ContabilidadCuenta, as: 'cuenta', include: [{ model: Clase, as: 'tipoCuenta' }] }, { model: Clase, as: 'tipo' }] }] }

					]
				}).then(function (Compras2) {
					var cantidadComprasAlerta = Compras + Compras2;
					res.json({ compras_cantidad: cantidadComprasAlerta })
				})
			})
		})

	router.route('/alertas/ventas/cantidad/:id_empresa')
		.get(function (req, res) {
			Venta.count({
				where: { contabilizado: false },
				include: [{ model: Cliente, as: 'cliente', include: [{ model: ClienteCuenta, as: 'clienteCuenta', include: [{ model: ContabilidadCuenta, as: 'cuenta', include: [{ model: Clase, as: 'tipoCuenta' }] }] }] },
				{ model: Almacen, as: 'almacen', include: [{ model: Sucursal, as: 'sucursal', where: { id_empresa: req.params.id_empresa } }] }]
			}).then(function (ventas) {
				res.json({ cantidad_ventas: ventas })
			})
		})
	//lista de ventas sin contabilizar		
	router.route('/ventas/empresa/:id_empresa/inicio/:inicio/fin/:fin/pagina/:pagina/items_pagina/:items_pagina/texto_busqueda/:texto_busqueda/columna/:columna/direccion/:direccion')
		.get(ensureAuthorizedlogged, function (req, res) {
			var condicionVenta = { contabilizado: false, activa: true }
			var condicionCliente = {}
			if (req.params.inicio != 0) {
				var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0);
				var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 59);
				condicionVenta.fecha = { $between: [inicio, fin] };

			}
			if (req.params.texto_busqueda != 0) {
				condicionCliente = {
					$or: [
						{
							razon_social: {
								$like: "%" + req.params.texto_busqueda + "%"
							}
						}
					]
				};
			}
			var ordenArreglo = []
			var textOrder = ""
			if (req.params.columna == 'razon_social') {
				textOrder = "`proveedor.razon_social` " + req.params.direccion
			} else {
				textOrder = req.params.columna + " " + req.params.direccion
			}
			if (req.params.items_pagina != '0') {
				textOrder = textOrder + " limit " + (req.params.items_pagina * (req.params.pagina - 1)) + ", " + req.params.items_pagina
			}
			var datosBusqueda = {}

			datosBusqueda = {
				where: condicionVenta,
				include: [{
					model: Cliente, as: 'cliente', where: condicionCliente,
					include: [{
						model: ClienteCuenta, as: 'clienteCuenta',
						include: [{
							model: ContabilidadCuenta, as: 'cuenta',
							include: [{
								model: Clase, as: 'tipoCuenta',
								model: Clase, as: 'tipoAuxiliar'
							}]
						}]
					}]
				},
				{ model: Almacen, as: 'almacen', include: [{ model: Sucursal, as: 'sucursal', where: { id_empresa: req.params.id_empresa } }] }]
			}
			datosBusqueda.group = ["`inv_venta`.`id`"]
			Venta.count(datosBusqueda).then(function (VentasCount) {
				datosBusqueda.order = sequelize.literal(textOrder)
				Venta.findAll(datosBusqueda).then(function (Ventas) {
					res.json({ ventas: Ventas, paginas: Math.ceil(VentasCount.length / req.params.items_pagina) })
				})
			})
		})


	router.route('/compras')
		.post(ensureAuthorizedlogged, function (req, res) {
			var compra = req.body;
			Sucursal.find({
				where: {
					id: compra.sucursal.id
				}
			}).then((succ) => {
				if (!succ.activo) return res.json({ mensaje: 'La sucursal ' + succ.nombre + ' está deshabilitada. No se pueden realizar cambios.', hasErr: true })
				if (req.body.usar_producto) {
					if (compra.almacen && compra.usar_configuracion_iso) {
						Almacen.find({
							where: { id: compra.almacen.id },
							include: [{ model: Sucursal, as: 'sucursal' }]
						}).then(function (almacenObtenido) {
							if (!almacenObtenido.sucursal.activo) return res.json({ mensaje: 'La sucursal ' + almacenObtenido.sucursal.nombre + ' está deshabilitada. No se pueden realizar cambios.', hasErr: true })
							compra.numero_iso_compra = almacenObtenido.numero_correlativo_iso_compra;
							if (compra.movimiento.clase.nombre_corto == 'IPRO') {
								compra.numero_iso_compra = null
								compra.config_doc_iso = null
								compra.factura = almacenObtenido.sucursal.numero_correlativo_ingreso_produccion
							}
							if (compra.movimiento.clase.nombre_corto === "IPA") {
								compra.factura = almacenObtenido.sucursal.numero_correlativo_ingreso_por_ajuste
							}
							Tipo.find({
								where: { nombre_corto: 'MOVING' }
							}).then(function (tipoMovimiento) {
								Clase.find({
									where: { nombre_corto: 'ID' }
								}).then(function (conceptoMovimiento) {
									if (compra.movimiento.clase.id) {
										conceptoMovimiento = compra.movimiento.clase
									}
									Movimiento.create({
										id_tipo: tipoMovimiento.id,
										id_clase: conceptoMovimiento.id,
										id_almacen: compra.almacen.id,
										fecha: compra.fecha
									}).then(function (movimientoCreado) {
										if (conceptoMovimiento.nombre_corto === "IPA" || compra.movimiento.clase.nombre_corto == 'IPRO') {
											let proveedorCreado = { id: null }
											crearCompra(compra, res, proveedorCreado.id, movimientoCreado.id, conceptoMovimiento.id);


										} else if (!compra.proveedor.id) {
											Proveedor.create({
												id_empresa: compra.id_empresa,
												nit: compra.proveedor.nit,
												razon_social: compra.proveedor.razon_social,
												estado: "V"
											}).then(function (proveedorCreado) {
												crearCompra(compra, res, proveedorCreado.id, movimientoCreado.id, conceptoMovimiento.id);
												// if (compra.usar_peps) {
												// 	crearCompra(compra, res, proveedorCreado.id, movimientoCreado.id, conceptoMovimiento.id);
												// } else {
												// 	crearCompraPonderado(compra, res, proveedorCreado.id, movimientoCreado.id, conceptoMovimiento.id);
												// }
											});
										} else {
											crearCompra(compra, res, compra.proveedor.id, movimientoCreado.id, conceptoMovimiento.id);
											// if (compra.usar_peps) {
											// 	crearCompra(compra, res, proveedorCreado.id, movimientoCreado.id, conceptoMovimiento.id);
											// } else {
											// 	crearCompraPonderado(compra, res, proveedorCreado.id, movimientoCreado.id, conceptoMovimiento.id);
											// }
										}
									});
								});
							});
						});
					} else {

						Tipo.find({
							where: { nombre_corto: 'MOVING' }
						}).then(function (tipoMovimiento) {
							Clase.find({
								where: { nombre_corto: 'ID' }
							}).then(function (conceptoMovimiento) {
								if (compra.movimiento.clase.id) {
									conceptoMovimiento = compra.movimiento.clase
								}
								if (compra.movimiento.clase.nombre_corto == 'IPRO') {
									compra.numero_iso_compra = null
									compra.config_doc_iso = null
								}
								if (conceptoMovimiento.nombre_corto === "IPA") {
									compra.factura = almacenObtenido.sucursal.numero_correlativo_ingreso_por_ajuste
								}
								Movimiento.create({
									id_tipo: tipoMovimiento.id,
									id_clase: conceptoMovimiento.id,
									id_almacen: compra.almacen.id,
									fecha: compra.fecha
								}).then(function (movimientoCreado) {
									if (!compra.proveedor.id) {
										Proveedor.create({
											id_empresa: compra.id_empresa,
											nit: compra.proveedor.nit,
											razon_social: compra.proveedor.razon_social,
											estado: "V"
										}).then(function (proveedorCreado) {
											crearCompra(compra, res, proveedorCreado.id, movimientoCreado.id, conceptoMovimiento.id);
											// if (compra.usar_peps) {
											// 	crearCompra(compra, res, proveedorCreado.id, movimientoCreado.id, conceptoMovimiento.id);
											// } else {
											// 	crearCompraPonderado(compra, res, proveedorCreado.id, movimientoCreado.id, conceptoMovimiento.id);
											// }
										});
									} else {
										crearCompra(compra, res, compra.proveedor.id, movimientoCreado.id, conceptoMovimiento.id);
										// if (compra.usar_peps) {
										// 	crearCompra(compra, res, proveedorCreado.id, movimientoCreado.id, conceptoMovimiento.id);
										// } else {
										// 	crearCompraPonderado(compra, res, proveedorCreado.id, movimientoCreado.id, conceptoMovimiento.id);
										// }
									}
								});
							});
						});
					}

				} else {
					Tipo.find({
						where: { nombre_corto: 'MOVING' }
					}).then(function (tipoMovimiento) {
						Clase.find({
							where: { nombre_corto: 'ID' }
						}).then(function (conceptoMovimiento) {
							if (compra.movimiento.clase) {
								conceptoMovimiento = compra.movimiento.clase
							}
							if (!compra.proveedor.id) {
								Proveedor.create({
									id_empresa: compra.id_empresa,
									nit: compra.proveedor.nit,
									razon_social: compra.proveedor.razon_social,
									estado: "V"
								}).then(function (proveedorCreado) {
									crearCompraServicio(compra, res, proveedorCreado.id, conceptoMovimiento.id)
								});
							} else {
								crearCompraServicio(compra, res, compra.proveedor.id, conceptoMovimiento.id)
							}
						})
					})
				}
			}).catch((err) => {
				res.json({ mensaje: err.stack, hasErr: true })
			})

		})
	function crearCompraServicio(compra, res, idProveedor, idtipo) {
		Compra.create({
			id_sucursal: compra.sucursal.id,
			id_tipo_movimiento: idtipo,
			id_proveedor: idProveedor,
			factura: compra.factura,
			autorizacion: compra.autorizacion,
			fecha: compra.fecha,
			codigo_control: compra.codigo_control,
			importe: compra.importe,
			id_tipo_pago: compra.id_tipo_pago,
			dias_credito: compra.dias_credito,
			a_cuenta: compra.a_cuenta,
			saldo: compra.saldo,
			descuento_general: compra.descuento_general,
			descuento: compra.descuento,
			recargo: compra.recargo,
			ice: compra.ice,
			excento: compra.excento,
			tipo_descuento: compra.tipo_descuento,
			tipo_recargo: compra.tipo_recargo,
			total: compra.total,
			id_usuario: compra.id_usuario,
			usar_producto: compra.usar_producto,
			observacion: compra.observacion,
			dui: compra.dui,
			tipo_retencion: compra.tipo_retencion,
			calificacion_proveedor: compra.calificacion_proveedor,
			doc_rendicion: compra.doc_rendicion
		}).then(function (compraCreada) {
			compra.detallesCompra.forEach(function (detalleCompra, index, array) {
				crearDetalleCompraServicio(detalleCompra, compraCreada.id, res);
				if (index == (array.length - 1)) {
					compra.id = compraCreada.id;
					res.json({ compra: compra, mensaje: "creado satisfactoriamente!" });
				}
			})

		})
	}

	function crearDetalleCompraServicio(detalleCompra, idCompra, res) {
		DetalleCompra.create({
			id_compra: idCompra,
			costo_unitario: detalleCompra.costo_unitario,
			cantidad: detalleCompra.cantidad,
			importe: detalleCompra.importe,
			descuento: detalleCompra.descuento,
			recargo: detalleCompra.recargo,
			ice: detalleCompra.ice,
			excento: detalleCompra.excento,
			tipo_descuento: detalleCompra.tipo_descuento,
			tipo_recargo: detalleCompra.tipo_recargo,
			total: detalleCompra.total,
			it: detalleCompra.it,
			iue: detalleCompra.iue,
			id_servicio: detalleCompra.servicio.id,
			observacion: detalleCompra.observacion || '',
			correlativo_produccion: detalleCompra.correlativo_produccion ? parseFloat(detalleCompra.correlativo_produccion) : null
		}).then(function (detalleCompraCreada) {

		});


	}

	// function crearCompraPonderado(compra, res, idProveedor, idMovimiento, idTipo) {
	// 	Compra.create({
	// 		id_tipo_movimiento: idTipo,
	// 		id_almacen: compra.almacen.id,
	// 		id_proveedor: idProveedor,
	// 		id_movimiento: idMovimiento,
	// 		factura: compra.factura,
	// 		autorizacion: compra.autorizacion,
	// 		fecha: compra.fecha,
	// 		codigo_control: compra.codigo_control,
	// 		importe: compra.importe,
	// 		id_tipo_pago: compra.id_tipo_pago,
	// 		dias_credito: compra.dias_credito,
	// 		a_cuenta: compra.a_cuenta,
	// 		saldo: compra.saldo,
	// 		descuento_general: compra.descuento_general,
	// 		descuento: compra.descuento,
	// 		recargo: compra.recargo,
	// 		ice: compra.ice,
	// 		excento: compra.excento,
	// 		tipo_descuento: compra.tipo_descuento,
	// 		tipo_recargo: compra.tipo_recargo,
	// 		total: compra.total,
	// 		id_usuario: compra.id_usuario,
	// 		usar_producto: compra.usar_producto,
	// 		observacion: compra.observacion,
	// 		dui: compra.dui,
	// 		tipo_retencion: compra.tipo_retencion,
	// 	}).then(function (compraCreada) {
	// 		compra.detallesCompra.forEach(function (detalleCompra, index, array) {
	// 			if (!detalleCompra.producto.id) {
	// 				Producto.create({
	// 					nombre: detalleCompra.producto.nombre,
	// 					codigo: detalleCompra.producto.codigo,
	// 					unidad_medida: detalleCompra.producto.unidad_medida,
	// 					id_empresa: compra.id_empresa,
	// 				}).then(function (productoCreado) {
	// 					if (!detalleCompra.centroCosto.id) {
	// 						Tipo.find({
	// 							where: { nombre_corto: 'CCO' }
	// 						}).then(function (tipoCentroCosto) {
	// 							Clase.create({
	// 								nombre: detalleCompra.centroCosto.nombre,
	// 								id_tipo: tipoCentroCosto.id
	// 							}).then(function (centroCostoCreado) {
	// 								crearDetalleCompra(detalleCompra, idMovimiento, compraCreada.id, compra.almacen.id, productoCreado.id, centroCostoCreado.id, res, compra);
	// 							});
	// 						});
	// 					} else {
	// 						crearDetalleCompra(detalleCompra, idMovimiento, compraCreada.id, compra.almacen.id, productoCreado.id, detalleCompra.centroCosto.id, res, compra);
	// 					}
	// 				});
	// 			} else {
	// 				if (!detalleCompra.centroCosto.id) {
	// 					Tipo.find({
	// 						where: { nombre_corto: 'CCO' }
	// 					}).then(function (tipoCentroCosto) {
	// 						Clase.create({
	// 							nombre: detalleCompra.centroCosto.nombre,
	// 							id_tipo: tipoCentroCosto.id
	// 						}).then(function (centroCostoCreado) {
	// 							crearDetalleCompra(detalleCompra, idMovimiento, compraCreada.id, compra.almacen.id, detalleCompra.producto.id, centroCostoCreado.id, res, compra);
	// 						});
	// 					});
	// 				} else {
	// 					crearDetalleCompra(detalleCompra, idMovimiento, compraCreada.id, compra.almacen.id, detalleCompra.producto.id, detalleCompra.centroCosto.id, res, compra);
	// 				}
	// 			}
	// 			if (index == (array.length - 1)) {
	// 				compra.id = compraCreada.id;
	// 				if (compra.generado_por_pedido) {
	// 					compra.pedido.detallesPedido.forEach(function (detalle, index, array) {
	// 						if (detalle.eliminado == true) {
	// 							DetallesPedido.update({
	// 								eliminado: true
	// 							}, {
	// 									where: { id: detalle.id }
	// 								})
	// 							if (index == (array.length - 1)) {
	// 								Pedido.update({
	// 									recibido: true,
	// 									id_compra: compra.id
	// 								}, {
	// 										where: { id: compra.pedido.id }
	// 									}).then(function (productoEntregado) {
	// 										res.json({ compra: compra, mensaje: "creado satisfactoriamente!" });
	// 									})
	// 							}
	// 						} else {
	// 							DetallesPedido.update({
	// 								recibido: true
	// 							}, {
	// 									where: { id: detalle.id }
	// 								})
	// 							if (index == (array.length - 1)) {
	// 								Pedido.update({
	// 									recibido: true
	// 								}, {
	// 										where: { id: compra.pedido.id }
	// 									}).then(function (productoEntregado) {
	// 										res.json({ compra: compra, mensaje: "creado satisfactoriamente!" });
	// 									})
	// 							}
	// 						}


	// 					})

	// 				} else {
	// 					res.json({ compra: compra, mensaje: "creado satisfactoriamente!" });
	// 				}
	// 			}
	// 		});
	// 	});
	// }
	function crearCompra(compra, res, idProveedor, idMovimiento, idTipo) {

		Compra.create({
			id_tipo_movimiento: idTipo,
			id_almacen: compra.almacen.id,
			id_proveedor: idProveedor,
			id_movimiento: idMovimiento,
			factura: compra.factura,
			autorizacion: compra.autorizacion,
			fecha: compra.fecha,
			fecha_vencimiento: compra.fecha_vencimiento,
			codigo_control: compra.codigo_control,
			importe: compra.importe ? compra.importe : 0,
			importe_dolares: compra.importe_dolares ? compra.importe_dolares : 0,
			id_tipo_pago: compra.tipoPago ? compra.tipoPago.id : null,
			dias_credito: compra.dias_credito,
			a_cuenta: compra.a_cuenta,
			saldo: compra.saldo,
			descuento_general: compra.descuento_general,
			descuento: compra.descuento,
			recargo: compra.recargo,
			ice: compra.ice,
			excento: compra.excento,
			tipo_descuento: compra.tipo_descuento,
			tipo_recargo: compra.tipo_recargo,
			total: compra.total ? compra.total : 0,
			total_dolares: compra.total_dolares ? compra.total_dolares : 0,
			id_usuario: compra.id_usuario,
			usar_producto: compra.usar_producto,
			observacion: compra.observacion,
			dui: compra.dui,
			tipo_retencion: compra.tipo_retencion,
			calificacion_proveedor: compra.calificacion_proveedor,
			numero_iso_compra: compra.config_doc_iso != undefined ? compra.numero_iso_compra ? compra.numero_iso_compra : 0 : null,
			config_doc_iso: compra.config_doc_iso ? compra.config_doc_iso : null,
			doc_rendicion: compra.doc_rendicion
		}).then(function (compraCreada) {
			Empresa.find({
				where: { id: compra.id_empresa }
			}).then(function (empresaEncontrada) {
				compra.detallesCompra.forEach(function (detalleCompra, index, array) {
					if (!detalleCompra.producto.id) {
						Producto.create({
							nombre: detalleCompra.producto.nombre,
							codigo: detalleCompra.producto.codigo,
							unidad_medida: detalleCompra.producto.unidad_medida,
							id_empresa: compra.id_empresa,
						}).then(function (productoCreado) {
							if (!detalleCompra.centroCosto.id) {
								Tipo.find({
									where: { nombre_corto: 'CCO' }
								}).then(function (tipoCentroCosto) {
									Clase.create({
										nombre: detalleCompra.centroCosto.nombre,
										id_tipo: tipoCentroCosto.id,
										eliminado: false,
										habilitado: true
									}).then(function (centroCostoCreado) {
										if (empresaEncontrada.dataValues.usar_peps) {
											crearDetalleCompra(detalleCompra, idMovimiento, compraCreada.id, compra.almacen.id, productoCreado.id, centroCostoCreado.id, res, compra);
										} else {
											crearDetalleCompraPonderado(detalleCompra, idMovimiento, compraCreada.id, compra.almacen.id, productoCreado.id, centroCostoCreado.id, res, compra);
										}

									});
								});
							} else {
								if (empresaEncontrada.dataValues.usar_peps) {
									crearDetalleCompra(detalleCompra, idMovimiento, compraCreada.id, compra.almacen.id, productoCreado.id, detalleCompra.centroCosto.id, res, compra);
								} else {
									crearDetalleCompraPonderado(detalleCompra, idMovimiento, compraCreada.id, compra.almacen.id, productoCreado.id, detalleCompra.centroCosto.id, res, compra);
								}
							}
						});
					} else {
						if (!detalleCompra.centroCosto.id) {
							Tipo.find({
								where: { nombre_corto: 'CCO' }
							}).then(function (tipoCentroCosto) {
								Clase.create({
									nombre: detalleCompra.centroCosto.nombre,
									id_tipo: tipoCentroCosto.id,
									eliminado: false,
									habilitado: true
								}).then(function (centroCostoCreado) {
									/* 	if (empresaEncontrada.dataValues.usar_peps) { */
									crearDetalleCompra(detalleCompra, idMovimiento, compraCreada.id, compra.almacen.id, detalleCompra.producto.id, centroCostoCreado.id, res, compra);
									/* 	} else {
											crearDetalleCompraPonderado(detalleCompra, idMovimiento, compraCreada.id, compra.almacen.id, detalleCompra.producto.id, centroCostoCreado.id, res, compra);
										} */
								});
							});
						} else {
							/* if (empresaEncontrada.dataValues.usar_peps) { */
							crearDetalleCompra(detalleCompra, idMovimiento, compraCreada.id, compra.almacen.id, detalleCompra.producto.id, detalleCompra.centroCosto.id, res, compra);
							/* } else {
								crearDetalleCompraPonderado(detalleCompra, idMovimiento, compraCreada.id, compra.almacen.id, detalleCompra.producto.id, detalleCompra.centroCosto.id, res, compra);
							} */
						}
					}
					if (index == (array.length - 1)) {
						compra.id = compraCreada.id;
						if (compra.generado_por_pedido && !compra.generado_por_pedido_servicio) {
							Clase.findAll({
								include: [{ model: Tipo, as: 'tipo', where: { nombre_corto: 'ESTMODPED' } }]
							}).then((estadosPedido) => {
								const estadoParcial = estadosPedido.find(estado => estado.nombre_corto === 'PARCIAL')
								const estadoFinalizado = estadosPedido.find(estado => estado.nombre_corto === 'FINALIZADO')
								var RecibioPedidoTotal = false
								compra.pedido.detallesPedido.forEach(function (detalle, indexDet, arrayDet) {
									var recibido = false
									if (detalle.entregas.length > 0) {
										detalle.cantidad = detalle.entregas.reduce(function (val, x) {
											val = val - x.entregado
											return val
										}, detalle.cantidad)
									}
									if (detalle.cantidad <= detalle.detalleCompra.cantidad_parcial) {
										recibido = true
										RecibioPedidoTotal = true
									} else {
										recibido = detalle.detalleCompra.entregado ? detalle.detalleCompra.entregado : false
										RecibioPedidoTotal = detalle.detalleCompra.entregado ? detalle.detalleCompra.entregado : false
									}
									if (detalle.pendiente == true) {
										if (indexDet == (arrayDet.length - 1)) {
											Pedido.update({
												observacion: compra.observacion || '',
												recibido: false,
												id_compra: compra.id,
												id_estado: estadoParcial.id
											}, {
												where: { id: compra.pedido.id }
											}).then(function (productoEntregado) {
												crearCalificacionProveedor(compra, res, false)

											})
										}
									} else if (detalle.eliminado == true) {
										DetallesPedido.update({
											eliminado: true
										}, {
											where: { id: detalle.id }
										})
										if (indexDet == (arrayDet.length - 1)) {
											Pedido.update({
												observacion: compra.observacion || '',
												recibido: compra.conPendientes ? false : true,
												id_compra: compra.id,
												id_estado: (!compra.conPendientes ? estadoFinalizado.id : estadoParcial.id)
											}, {
												where: { id: compra.pedido.id }
											}).then(function (productoEntregado) {
												crearCalificacionProveedor(compra, res, false)
											})
										}
									} else {
										DetallesPedido.update({
											recibido: recibido
										}, {
											where: { id: detalle.id }
										}).then(function (detallePedidoActualizado) {
											DetallePedidoEntrega.create({
												id_detalle_pedido: detalle.id,
												entregado: detalle.detalleCompra.cantidad,
												restante: detalle.cantidad - detalle.detalleCompra.cantidad,
												fecha: compra.fecha,
											}).then(function (entregaCreada) {
												if (indexDet == (arrayDet.length - 1)) {
													Pedido.update({
														observacion: compra.observacion || '',
														recibido: compra.conPendientes ? false : true,
														id_compra: compra.id,
														id_estado: (!compra.conPendientes ? estadoFinalizado.id : estadoParcial.id)
													}, {
														where: { id: compra.pedido.id }
													}).then(function (productoEntregado) {
														crearCalificacionProveedor(compra, res, false)
													})
												}
											})
										})
									}
								})
							});
						} else if (compra.generado_por_pedido && compra.generado_por_pedido_servicio) {
							Clase.findAll({
								include: [{ model: Tipo, as: 'tipo', where: { nombre_corto: 'ESTMODPED' } }]
							}).then((estadosPedido) => {
								const estadoParcial = estadosPedido.find(estado => estado.nombre_corto === 'PARCIAL')
								const estadoFinalizado = estadosPedido.find(estado => estado.nombre_corto === 'FINALIZADO')
								var RecibioPedidoTotal = false
								compra.pedido.detallesPedido.forEach(function (detalle, indexDet, arrayDet) {
									var recibido = false
									if (detalle.entregas.length > 0) {
										detalle.cantidad = detalle.entregas.reduce(function (val, x) {
											val = val - x.entregado
											return val
										}, detalle.cantidad)
									}
									if (detalle.cantidad <= detalle.detalleCompra.cantidad_parcial) {
										recibido = true
										RecibioPedidoTotal = true
									} else {
										recibido = detalle.detalleCompra.entregado ? detalle.detalleCompra.entregado : false
										RecibioPedidoTotal = detalle.detalleCompra.entregado ? detalle.detalleCompra.entregado : false
									}
									if (detalle.pendiente == true) {
										if (indexDet == (arrayDet.length - 1)) {
											OrdenServicio.update({
												observacion: compra.observacion || '',
												recibido: false,
												id_compra: compra.id,
												id_estado: estadoParcial.id
											}, {
												where: { id: compra.pedido.id }
											}).then(function (productoEntregado) {
												crearCalificacionProveedor(compra, res, false)

											})
										}
									} else if (detalle.eliminado == true) {
										DetalleOrdenServicio.update({
											eliminado: true
										}, {
											where: { id: detalle.id }
										})
										if (indexDet == (arrayDet.length - 1)) {
											OrdenServicio.update({
												observacion: compra.observacion || '',
												recibido: compra.conPendientes ? false : true,
												id_compra: compra.id,
												id_estado: (!compra.conPendientes ? estadoFinalizado.id : estadoParcial.id)
											}, {
												where: { id: compra.pedido.id }
											}).then(function (productoEntregado) {
												crearCalificacionProveedor(compra, res, false)
											})
										}
									} else {
										DetalleOrdenServicio.update({
											recibido: recibido
										}, {
											where: { id: detalle.id }
										}).then(function (detallePedidoActualizado) {
											DetalleOrdenServicioEntrega.create({
												id_detalle_pedido: detalle.id,
												entregado: detalle.detalleCompra.cantidad,
												restante: detalle.cantidad - detalle.detalleCompra.cantidad,
												fecha: compra.fecha,
											}).then(function (entregaCreada) {
												if (indexDet == (arrayDet.length - 1)) {
													OrdenServicio.update({
														observacion: compra.observacion || '',
														recibido: compra.conPendientes ? false : true,
														id_compra: compra.id,
														id_estado: (!compra.conPendientes ? estadoFinalizado.id : estadoParcial.id)
													}, {
														where: { id: compra.pedido.id }
													}).then(function (productoEntregado) {
														crearCalificacionProveedor(compra, res, false)
													})
												}
											})
										})
									}
								})
							});
						} else {
							crearCalificacionProveedor(compra, res, false)
						}
					}
				});
			})
		}).catch(function (err) {
			res.json({ hasErr: true, mensaje: err, compra: compra, mensaje: "Error al crear." });
		})
	}
	function crearCalificacionProveedor(compra, res, actualizado) {
		if (compra.detalleCalifiacionProveedor.length > 0) {
			DetalleCalificacionProveedor.destroy({
				where: { id_compra: compra.id }
			}).then(function (data) {
				compra.detalleCalifiacionProveedor.forEach(function (califiacion, index, array) {
					if (califiacion.concepto.habilitado) {
						DetalleCalificacionProveedor.create({
							id_compra: compra.id,
							id_concepto: califiacion.concepto.id,
							valor: califiacion.valor,
							puntuacion: califiacion.puntuacion
						}).then(function (data) {
							if (index == (array.length - 1)) {
								if (actualizado === true) {
									res.json({ compra: compra, mensaje: "Compra actualizada satisfactoriamente!" });
								} else {
									if (compra.almacen && compra.usar_configuracion_iso) {
										Almacen.update({
											numero_correlativo_iso_compra: compra.config_doc_iso != undefined ? (compra.numero_iso_compra + 1) : compra.numero_iso_compra
										}, {
											where: { id: compra.almacen.id }
										}).then(function (dataAlmacen) {
											if (compra.movimiento.clase.nombre_corto === "IPA") {
												Sucursal.find({
													where: { id: compra.almacen.id_sucursal }
												}).then(function (sEncontrada) {
													Sucursal.update({
														numero_correlativo_ingreso_por_ajuste: sEncontrada.numero_correlativo_ingreso_por_ajuste + 1
													}, {
														where: { id: compra.almacen.id_sucursal }
													}).then(function (sActulizada) {
														res.json({ compra: compra, mensaje: "creado satisfactoriamente!" });
													})
												})
											} else if (compra.movimiento.clase.nombre_corto === "IPRO") {
												Sucursal.find({
													where: { id: compra.almacen.id_sucursal }
												}).then(function (sEncontrada) {
													Sucursal.update({
														numero_correlativo_ingreso_produccion: sEncontrada.numero_correlativo_ingreso_produccion + 1
													}, {
														where: { id: compra.almacen.id_sucursal }
													}).then(function (sActulizada) {
														res.json({ compra: compra, mensaje: "creado satisfactoriamente!" });
													})
												})
											} else {
												res.json({ compra: compra, mensaje: "creado satisfactoriamente!" });
											}

										});
									} else {
										if (compra.movimiento.clase.nombre_corto === "IPA") {
											Sucursal.find({
												where: { id: compra.almacen.id_sucursal }
											}).then(function (sEncontrada) {
												Sucursal.update({
													numero_correlativo_ingreso_por_ajuste: sEncontrada.numero_correlativo_ingreso_por_ajuste + 1
												}, {
													where: { id: compra.almacen.id_sucursal }
												}).then(function (sActulizada) {
													res.json({ compra: compra, mensaje: "creado satisfactoriamente!" });
												})
											})
										} else {
											res.json({ compra: compra, mensaje: "creado satisfactoriamente!" });
										}
									}
								}
							}
						})
					}
				})

			});
		} else {
			if (compra.almacen && compra.usar_configuracion_iso) {
				Almacen.update({
					numero_correlativo_iso_compra: (compra.numero_iso_compra + 1)
				}, {
					where: { id: compra.almacen.id }
				}).then(function (dataAlmacen) {
					if (compra.movimiento.clase.nombre_corto === "IPA") {
						Sucursal.find({
							where: { id: compra.almacen.id_sucursal }
						}).then(function (sEncontrada) {
							Sucursal.update({
								numero_correlativo_ingreso_por_ajuste: sEncontrada.numero_correlativo_ingreso_por_ajuste + 1
							}, {
								where: { id: compra.almacen.id_sucursal }
							}).then(function (sActulizada) {
								res.json({ compra: compra, mensaje: "creado satisfactoriamente!" });
							})
						})
					} else {
						res.json({ compra: compra, mensaje: "creado satisfactoriamente!" });
					}
				});
			} else {
				if (compra.movimiento.clase.nombre_corto === "IPA") {
					Sucursal.find({
						where: { id: compra.almacen.id_sucursal }
					}).then(function (sEncontrada) {
						Sucursal.update({
							numero_correlativo_ingreso_por_ajuste: sEncontrada.numero_correlativo_ingreso_por_ajuste + 1
						}, {
							where: { id: compra.almacen.id_sucursal }
						}).then(function (sActulizada) {
							res.json({ compra: compra, mensaje: "creado satisfactoriamente!" });
						})
					})
				} else {
					res.json({ compra: compra, mensaje: "creado satisfactoriamente!" });
				}
			}
		}
	}
	function actulizarCalificacionProveedor(compra, res) {
		if (compra.detalleCalifiacionProveedor.length > 0) {
			compra.detalleCalifiacionProveedor.forEach(function (califiacion, index, array) {
				if (califiacion.concepto.habilitado) {
					DetalleCalificacionProveedor.create({
						id_compra: compra.id,
						id_concepto: califiacion.concepto.id,
						valor: califiacion.valor
					}).then(function (data) {
						if (index == (array.length - 1)) {
							res.json({ compra: compra, mensaje: "creado satisfactoriamente!" });
						}
					})
				}


			});
		} else {
			res.json({ compra: compra, mensaje: "creado satisfactoriamente!" });
		}
	}
	function crearDetalleCompraPonderado(detalleCompra, idMovimiento, idCompra, idAlmacen, idProducto, idCentroCosto, res, compra) {
		if (detalleCompra.centroCosto.nombre_corto == "ALM") {
			Inventario.findAll({
				where: { id_producto: idProducto, id_almacen: idAlmacen, cantidad: { $gt: 0 } }
			}).then(function (inventarios) {
				var costoUnitarioPonderado = 0
				var cantidadPonderado = 0
				var costo_unitario_neto = (Math.round((((detalleCompra.importe - detalleCompra.descuento) * 1) / detalleCompra.cantidad) * 100) / 100);
				if (compra.movimiento.clase.nombre_corto == "ID" || compra.movimiento.clase.nombre_corto == "IPI") {
					costo_unitario_neto = (Math.round((((detalleCompra.importe - detalleCompra.descuento) * 0.87) / detalleCompra.cantidad) * 100) / 100);
				}
				if (inventarios.length > 0) {
					for (let i = 0; i < inventarios.length; i++) {
						costoUnitarioPonderado += inventarios[i].costo_unitario * inventarios[i].cantidad;
						cantidadPonderado += inventarios[i].cantidad;
					}
					costoUnitarioPonderado += detalleCompra.costo_unitario * detalleCompra.cantidad;
					cantidadPonderado += detalleCompra.cantidad;

					Inventario.create({
						id_almacen: idAlmacen,
						id_producto: idProducto,
						cantidad: detalleCompra.cantidad,
						costo_unitario: detalleCompra.costo_unitario,
						costo_total: detalleCompra.costo_unitario * detalleCompra.cantidad,
						fecha_vencimiento: detalleCompra.fecha_vencimiento,
						lote: detalleCompra.lote,
						costo_unitario_neto: costo_unitario_neto
					}).then(function (inventarioCreado) {
						DetalleCompra.create({
							id_compra: idCompra,
							id_producto: idProducto,
							id_centro_costo: idCentroCosto,
							costo_unitario: detalleCompra.costo_unitario,
							cantidad: detalleCompra.cantidad,
							importe: detalleCompra.importe,
							descuento: detalleCompra.descuento,
							recargo: detalleCompra.recargo,
							ice: detalleCompra.ice,
							excento: detalleCompra.excento,
							tipo_descuento: detalleCompra.tipo_descuento,
							tipo_recargo: detalleCompra.tipo_recargo,
							total: detalleCompra.total,
							id_inventario: inventarioCreado.id,
							it: detalleCompra.it,
							iue: detalleCompra.iue,
							observacion: detalleCompra.observacion || '',
							correlativo_produccion: detalleCompra.correlativo_produccion ? parseFloat(detalleCompra.correlativo_produccion) : null
						}).then(function (detalleCompraCreada) {
							DetalleMovimiento.create({
								id_movimiento: idMovimiento,
								id_producto: idProducto,
								costo_unitario: (costoUnitarioPonderado / cantidadPonderado),
								cantidad: detalleCompra.cantidad,
								importe: (detalleCompra.costo_unitario * detalleCompra.cantidad),
								descuento: detalleCompra.descuento,
								recargo: detalleCompra.recargo,
								ice: detalleCompra.ice,
								excento: detalleCompra.excento,
								tipo_descuento: detalleCompra.tipo_descuento,
								tipo_recargo: detalleCompra.tipo_recargo,
								total: detalleCompra.total,
								fecha_vencimiento: detalleCompra.fecha_vencimiento,
								lote: detalleCompra.lote,
								id_inventario: inventarioCreado.id
							}).then(function (detalleMovimientoCreado) {
								res.json({ mensaje: "creado satisfactoriamente" })
							});
						});
					});
				} else {
					Inventario.create({
						id_almacen: idAlmacen,
						id_producto: idProducto,
						cantidad: detalleCompra.cantidad,
						costo_unitario: detalleCompra.costo_unitario,
						costo_total: detalleCompra.costo_unitario * detalleCompra.cantidad,
						fecha_vencimiento: detalleCompra.fecha_vencimiento,
						lote: detalleCompra.lote,
						costo_unitario_neto: costo_unitario_neto
					}).then(function (inventarioCreado) {
						DetalleCompra.create({
							id_compra: idCompra,
							id_producto: idProducto,
							id_centro_costo: idCentroCosto,
							costo_unitario: detalleCompra.costo_unitario,
							cantidad: detalleCompra.cantidad,
							importe: detalleCompra.importe,
							descuento: detalleCompra.descuento,
							recargo: detalleCompra.recargo,
							ice: detalleCompra.ice,
							excento: detalleCompra.excento,
							tipo_descuento: detalleCompra.tipo_descuento,
							tipo_recargo: detalleCompra.tipo_recargo,
							total: detalleCompra.total,
							id_inventario: inventarioCreado.id,
							it: detalleCompra.it,
							iue: detalleCompra.iue,
							observacion: detalleCompra.observacion || '',
							correlativo_produccion: detalleCompra.correlativo_produccion ? parseFloat(detalleCompra.correlativo_produccion) : null
						}).then(function (detalleCompraCreada) {
							DetalleMovimiento.create({
								id_movimiento: idMovimiento,
								id_producto: idProducto,
								costo_unitario: detalleCompra.costo_unitario,
								cantidad: detalleCompra.cantidad,
								importe: (detalleCompra.costo_unitario * detalleCompra.cantidad),
								descuento: detalleCompra.descuento,
								recargo: detalleCompra.recargo,
								ice: detalleCompra.ice,
								excento: detalleCompra.excento,
								tipo_descuento: detalleCompra.tipo_descuento,
								tipo_recargo: detalleCompra.tipo_recargo,
								total: detalleCompra.total,
								fecha_vencimiento: detalleCompra.fecha_vencimiento,
								lote: detalleCompra.lote,
								id_inventario: inventarioCreado.id
							}).then(function (detalleMovimientoCreado) {
								res.json({ mensaje: "creado satisfactoriamente" })
							});
						});
					});
				}
			})
		} else {
			DetalleCompra.create({
				id_compra: idCompra,
				id_producto: idProducto,
				id_centro_costo: idCentroCosto,
				costo_unitario: detalleCompra.costo_unitario,
				cantidad: detalleCompra.cantidad,
				importe: detalleCompra.importe,
				descuento: detalleCompra.descuento,
				recargo: detalleCompra.recargo,
				ice: detalleCompra.ice,
				excento: detalleCompra.excento,
				tipo_descuento: detalleCompra.tipo_descuento,
				tipo_recargo: detalleCompra.tipo_recargo,
				total: detalleCompra.total,
				it: detalleCompra.it,
				iue: detalleCompra.iue,
				observacion: detalleCompra.observacion || '',
				correlativo_produccion: detalleCompra.correlativo_produccion ? parseFloat(detalleCompra.correlativo_produccion) : null
			}).then(function (detalleCompraCreada) {
				res.json({ mensaje: "creado satisfactoriamente" })
			});
		}
	}

	function crearDetalleCompra(detalleCompra, idMovimiento, idCompra, idAlmacen, idProducto, idCentroCosto, res, compra) {
		if (detalleCompra.centroCosto.nombre_corto == "ALM") {
			// Inventario.findAll({
			// 	where: {id_producto: idProducto, cantidad: {$gt: 0}}
			// })
			var costo_unitario_neto = (Math.round((((detalleCompra.importe - detalleCompra.descuento) * 1) / detalleCompra.cantidad) * 100) / 100);
			if (compra.movimiento.clase.nombre_corto == "ID" || compra.movimiento.clase.nombre_corto == "IPI") {
				costo_unitario_neto = (Math.round((((detalleCompra.importe - detalleCompra.descuento) * 0.87) / detalleCompra.cantidad) * 100) / 100);
			}

			Inventario.create({
				id_almacen: idAlmacen,
				id_producto: idProducto,
				cantidad: detalleCompra.cantidad,
				costo_unitario: detalleCompra.costo_unitario ? detalleCompra.costo_unitario : 0,
				costo_total: detalleCompra.costo_unitario ? detalleCompra.costo_unitario * detalleCompra.cantidad : 0,
				costo_unitario_dolares: detalleCompra.costo_unitario_dolares ? detalleCompra.costo_unitario_dolares : 0,
				costo_total_dolares: detalleCompra.costo_unitario_dolares ? detalleCompra.costo_unitario_dolares * detalleCompra.cantidad : 0,
				fecha_vencimiento: detalleCompra.fecha_vencimiento,
				lote: detalleCompra.lote,
				costo_unitario_neto: costo_unitario_neto
			}).then(function (inventarioCreado) {
				DetalleCompra.create({
					id_compra: idCompra,
					id_producto: idProducto,
					id_centro_costo: idCentroCosto,
					costo_unitario: detalleCompra.costo_unitario ? detalleCompra.costo_unitario : 0,
					costo_unitario_dolares: detalleCompra.costo_unitario_dolares ? detalleCompra.costo_unitario_dolares : 0,
					cantidad: detalleCompra.cantidad,
					importe: detalleCompra.importe ? detalleCompra.importe : 0,
					importe_dolares: detalleCompra.importe_dolares ? detalleCompra.importe_dolares : 0,
					descuento: detalleCompra.descuento,
					recargo: detalleCompra.recargo,
					ice: detalleCompra.ice,
					excento: detalleCompra.excento,
					tipo_descuento: detalleCompra.tipo_descuento ? detalleCompra.tipo_descuento : false,
					tipo_recargo: detalleCompra.tipo_recargo ? detalleCompra.tipo_recargo : false,
					total: detalleCompra.total ? detalleCompra.total : 0,
					total_dolares: detalleCompra.total_dolares ? detalleCompra.total_dolares : 0,
					id_inventario: inventarioCreado.id,
					observacion: detalleCompra.observacion || '',
					correlativo_produccion: detalleCompra.correlativo_produccion ? parseFloat(detalleCompra.correlativo_produccion) : null,
					it: detalleCompra.it,
					iue: detalleCompra.iue
				}).then(function (detalleCompraCreada) {
					DetalleMovimiento.create({
						id_movimiento: idMovimiento,
						id_producto: idProducto,
						costo_unitario: detalleCompra.costo_unitario ? detalleCompra.costo_unitario : 0,
						costo_unitario_dolares: detalleCompra.costo_unitario_dolares ? detalleCompra.costo_unitario_dolares : 0,
						cantidad: detalleCompra.cantidad,
						importe: ((detalleCompra.costo_unitario ? detalleCompra.costo_unitario : 0) * detalleCompra.cantidad),
						importe_dolares: ((detalleCompra.costo_unitario_dolares ? detalleCompra.costo_unitario_dolares : 0) * detalleCompra.cantidad),
						descuento: detalleCompra.descuento,
						recargo: detalleCompra.recargo,
						ice: detalleCompra.ice,
						excento: detalleCompra.excento,
						descuento_dolares: detalleCompra.descuento_dolares,
						recargo_dolares: detalleCompra.recargo_dolares,
						ice_dolares: detalleCompra.ice_dolares,
						excento_dolares: detalleCompra.excento_dolares,
						tipo_descuento: detalleCompra.tipo_descuento ? detalleCompra.tipo_descuento : false,
						tipo_recargo: detalleCompra.tipo_recargo ? detalleCompra.tipo_recargo : false,
						total: detalleCompra.total ? detalleCompra.total : 0,
						total_dolares: detalleCompra.total_dolares ? detalleCompra.total_dolares : 0,
						fecha_vencimiento: detalleCompra.fecha_vencimiento,
						lote: detalleCompra.lote,
						id_inventario: inventarioCreado.id,
						observacion: detalleCompra.observacion || ''
					}).then(function (detalleMovimientoCreado) {
						//res.json({ mensaje: "creado satisfactoriamente" })
					}).catch(function (err) {
						res.json({ hasErr: true, mensaje: err.stack })
					});
				}).catch(function (err) {
					res.json({ hasErr: true, mensaje: err.stack });
				});
			}).catch(function (err) {
				res.json({ hasErr: true, mensaje: err.stack });
			});
		} else {
			DetalleCompra.create({
				id_compra: idCompra,
				id_producto: idProducto,
				id_centro_costo: idCentroCosto,
				costo_unitario: detalleCompra.costo_unitario ? detalleCompra.costo_unitario : 0,
				costo_unitario_dolares: detalleCompra.costo_unitario_dolares ? detalleCompra.costo_unitario_dolares : 0,
				cantidad: detalleCompra.cantidad,
				importe: detalleCompra.importe ? detalleCompra.importe : 0,
				importe_dolares: detalleCompra.importe_dolares ? detalleCompra.importe_dolares : 0,
				descuento: detalleCompra.descuento,
				recargo: detalleCompra.recargo,
				ice: detalleCompra.ice,
				excento: detalleCompra.excento,
				tipo_descuento: detalleCompra.tipo_descuento ? detalleCompra.tipo_descuento : false,
				tipo_recargo: detalleCompra.tipo_recargo ? detalleCompra.tipo_recargo : false,
				total: detalleCompra.total,
				total_dolares: detalleCompra.total_dolares ? detalleCompra.total_dolares : 0,
				observacion: detalleCompra.observacion || '',
				correlativo_produccion: detalleCompra.correlativo_produccion ? parseFloat(detalleCompra.correlativo_produccion) : null
			}).then(function (detalleCompraCreada) {
				//res.json({ mensaje: "creado satisfactoriamente" })
			}).catch(function (err) {
				res.json({ hasErr: true, mensaje: err.stack })
			});
		}
		// 	Inventario.create({
		// 		id_almacen: idAlmacen,
		// 		id_producto: idProducto,
		// 		cantidad: detalleCompra.cantidad,
		// 		costo_unitario: detalleCompra.costo_unitario,
		// 		costo_total: detalleCompra.costo_unitario * detalleCompra.cantidad,
		// 		fecha_vencimiento: detalleCompra.fecha_vencimiento,
		// 		lote: detalleCompra.lote
		// 	}).then(function (inventarioCreado) {
		// 		DetalleCompra.create({
		// 			id_compra: idCompra,
		// 			id_producto: idProducto,
		// 			id_centro_costo: idCentroCosto,
		// 			costo_unitario: detalleCompra.costo_unitario,
		// 			cantidad: detalleCompra.cantidad,
		// 			importe: detalleCompra.importe,
		// 			descuento: detalleCompra.descuento,
		// 			recargo: detalleCompra.recargo,
		// 			ice: detalleCompra.ice,
		// 			excento: detalleCompra.excento,
		// 			tipo_descuento: detalleCompra.tipo_descuento,
		// 			tipo_recargo: detalleCompra.tipo_recargo,
		// 			total: detalleCompra.total,
		// 			id_inventario: inventarioCreado.id,
		// 			it: detalleCompra.it,
		// 			iue: detalleCompra.iue
		// 		}).then(function (detalleCompraCreada) {
		// 			DetalleMovimiento.create({
		// 				id_movimiento: idMovimiento,
		// 				id_producto: idProducto,
		// 				costo_unitario: detalleCompra.costo_unitario,
		// 				cantidad: detalleCompra.cantidad,
		// 				importe: (detalleCompra.costo_unitario * detalleCompra.cantidad),
		// 				descuento: detalleCompra.descuento,
		// 				recargo: detalleCompra.recargo,
		// 				ice: detalleCompra.ice,
		// 				excento: detalleCompra.excento,
		// 				tipo_descuento: detalleCompra.tipo_descuento,
		// 				tipo_recargo: detalleCompra.tipo_recargo,
		// 				total: detalleCompra.total,
		// 				fecha_vencimiento: detalleCompra.fecha_vencimiento,
		// 				lote: detalleCompra.lote,
		// 				id_inventario: inventarioCreado.id
		// 			}).then(function (detalleMovimientoCreado) {
		// 				res.json({ mensaje: "creado satisfactoriamente" })
		// 			}).catch(function (err) {
		// 				res.json({ mensaje: err.stack })
		// 			})
		// 		}).catch(function (err) {
		// 			res.json({ mensaje: err.stack })
		// 		})
		// 	});
		// } else {
		// 	DetalleCompra.create({
		// 		id_compra: idCompra,
		// 		id_producto: idProducto,
		// 		id_centro_costo: idCentroCosto,
		// 		costo_unitario: detalleCompra.costo_unitario,
		// 		cantidad: detalleCompra.cantidad,
		// 		importe: detalleCompra.importe,
		// 		descuento: detalleCompra.descuento,
		// 		recargo: detalleCompra.recargo,
		// 		ice: detalleCompra.ice,
		// 		excento: detalleCompra.excento,
		// 		tipo_descuento: detalleCompra.tipo_descuento,
		// 		tipo_recargo: detalleCompra.tipo_recargo,
		// 		total: detalleCompra.total,
		// 		it: detalleCompra.it,
		// 		iue: detalleCompra.iue
		// 	}).then(function (detalleCompraCreada) {
		// 		res.json({ mensaje: "creado satisfactoriamente" })
		// 	});
		// }
	}

	function crearDetalleMovimientoIngresoYCrearInventario(idMovimiento, idAlmacen, idProducto,
		costo_unitario, costo_unitario_dolares, cantidad, descuento, descuento_dolares,
		recargo, ice, excento, recargo_dolares, ice_dolares, excento_dolares,
		tipo_descuento, tipo_recargo,
		total, total_dolares, fecha_vencimiento, lote, traspaso, t) {
		return Inventario.create({
			id_almacen: idAlmacen,
			id_producto: idProducto,
			cantidad: cantidad,
			costo_unitario: costo_unitario,
			costo_total: total ? total : 0,
			costo_unitario_dolares: costo_unitario_dolares ? costo_unitario_dolares : 0,
			costo_total_dolares: total_dolares ? total_dolares : 0,
			fecha_vencimiento: fecha_vencimiento,
			lote: lote,
			costo_unitario_neto: (Math.round(((((cantidad * costo_unitario) - descuento) * 1) / cantidad) * 100) / 100)
		}, { transaction: t }).then(function (inventarioCreado) {
			return DetalleMovimiento.create({
				id_movimiento: idMovimiento,
				id_producto: idProducto,
				costo_unitario: costo_unitario ? costo_unitario : 0,
				costo_unitario_dolares: costo_unitario_dolares ? costo_unitario_dolares : 0,
				cantidad: cantidad,
				importe: (costo_unitario * cantidad),
				importe_dolares: (costo_unitario_dolares ? costo_unitario_dolares : 0 * cantidad),
				descuento: descuento ? descuento : 0,
				recargo: recargo,
				ice: ice,
				excento: excento,
				descuento_dolares: descuento_dolares ? descuento_dolares : 0,
				recargo_dolares: recargo_dolares,
				ice_dolares: ice_dolares,
				excento_dolares: excento_dolares,
				tipo_descuento: tipo_descuento ? tipo_descuento : false,
				tipo_recargo: tipo_recargo ? tipo_recargo : false,
				total: total,
				total_dolares: total_dolares ? total_dolares : 0,
				fecha_vencimiento: fecha_vencimiento,
				lote: lote,
				id_inventario: inventarioCreado.id
			}, { transaction: t }).then(function (detalleMovimientoCreado) {
				return new Promise(function (fulfill, reject) {
					fulfill(traspaso);
				});
			}).catch(function (err) {
				return new Promise(function (fulfill, reject) {
					reject(err);
				});
			});
		});
		// return Inventario.create({
		// 	id_almacen: idAlmacen,
		// 	id_producto: idProducto,
		// 	cantidad: cantidad,
		// 	costo_unitario: costo_unitario,
		// 	costo_total: total,
		// 	fecha_vencimiento: fecha_vencimiento,
		// 	lote: lote
		// }, { transaction: t }).then(function (inventarioCreado) {
		// 	return DetalleMovimiento.create({
		// 		id_movimiento: idMovimiento,
		// 		id_producto: idProducto,
		// 		costo_unitario: costo_unitario,
		// 		cantidad: cantidad,
		// 		importe: (costo_unitario * cantidad),
		// 		descuento: descuento,
		// 		recargo: recargo,
		// 		ice: ice,
		// 		excento: excento,
		// 		tipo_descuento: tipo_descuento,
		// 		tipo_recargo: tipo_recargo,
		// 		total: total,
		// 		id_inventario: inventarioCreado.id
		// 	}, { transaction: t }).then(function (detCreado) {
		// 		return new Promise(function (fulfill, reject) {
		// 			fulfill(traspaso);
		// 		});
		// 	});
		// });
	}

	router.route('/inventarios')
		.post(ensureAuthorizedlogged, function (req, res) {
			var header_send_status = false
			Almacen.find({
				where: {
					id: req.body.id_almacen
				},
				include: [{
					model: Sucursal, as: 'sucursal'
				}]
			}).then((almsuc) => {
				if (!almsuc.sucursal.activo) return res.json({ mensaje: 'La sucursal Esta deshabilidara, no se pueden realizar cambios.' })
				if (req.body.productos.length > 0) {
					Tipo.find({
						where: { nombre_corto: 'MOVING' }
					}).then(function (tipoMovimiento) {
						Clase.find({
							where: { nombre_corto: 'III' }
						}).then(function (conceptoMovimiento) {
							Movimiento.create({
								id_tipo: tipoMovimiento.id,
								id_clase: conceptoMovimiento.id,
								id_almacen: req.body.id_almacen,
								fecha: new Date()
							}).then(function (movimientoCreado) {
								var productos = req.body.productos;
								var mensajeRegistrados = "Los inventarios de los siguientes productos fueron registrados: "
								var lenregistrados = mensajeRegistrados.length
								var mensajeNoRegistrados = "Ocurrio un problema al registrar los inventarios de los siguientes productos: ";
								var lennoregistrados = mensajeNoRegistrados.length
								productos.forEach(function (producto, index, array) {
									Producto.find({
										where: {
											codigo: producto.codigo,
											id_empresa: req.body.id_empresa
										}
									}).then(function (productoEncontrado) {
										if (productoEncontrado) {
											Inventario.create({
												id_almacen: req.body.id_almacen,
												id_producto: productoEncontrado.id,
												cantidad: producto.cantidad,
												costo_unitario: producto.costo_unitario ? producto.costo_unitario : 0,
												costo_total: producto.costo_unitario ? producto.costo_unitario * producto.cantidad : 0,
												costo_unitario_dolares: producto.costo_unitario_dolares ? producto.costo_unitario_dolares : 0,
												costo_total_dolares: producto.costo_unitario_dolares ? producto.costo_unitario_dolares * producto.cantidad : 0,
												fecha_vencimiento: producto.fecha_vencimiento,
												lote: producto.lote,
												costo_unitario_neto: producto.costo_unitario ? producto.costo_unitario : 0
											}).then(function (inventarioCreado) {
												DetalleMovimiento.create({
													id_movimiento: movimientoCreado.id,
													id_producto: productoEncontrado.id,
													costo_unitario: producto.costo_unitario ? producto.costo_unitario : 0,
													costo_unitario_dolares: producto.costo_unitario_dolares ? producto.costo_unitario_dolares : 0,
													cantidad: producto.cantidad,
													importe: (producto.costo_unitario * producto.cantidad),
													importe_dolares: (producto.costo_unitario_dolares ? producto.costo_unitario_dolares : 0 * producto.cantidad),
													descuento: producto.descuento ? producto.descuento : 0,
													recargo: producto.recargo,
													ice: producto.ice,
													excento: producto.excento,
													tipo_descuento: producto.tipo_descuento ? producto.tipo_descuento : false,
													tipo_recargo: producto.tipo_recargo ? producto.tipo_recargo : false,
													total: producto.total,
													total_dolares: producto.total_dolares ? producto.total_dolares : 0,
													fecha_vencimiento: producto.fecha_vencimiento,
													lote: producto.lote,
													id_inventario: inventarioCreado.id
												}).then(function (detalleMovimientoCreado) {
													mensajeRegistrados = mensajeRegistrados + " " + producto.codigo;
													if (index == (array.length - 1)) {
														res.json({ message: lenregistrados < mensajeRegistrados.length && lennoregistrados == mensajeNoRegistrados.length ? mensajeRegistrados : lennoregistrados < mensajeNoRegistrados.length && lenregistrados == mensajeRegistrados.length ? mensajeNoRegistrados : mensajeRegistrados + "<|||>." + mensajeNoRegistrados });
													}
												}).catch(function (err) {
													mensajeRegistrados = mensajeRegistrados + " " + producto.codigo;
													if (!header_send_status) {
														header_send_status = true
														res.json({ hasErr: true, message: lenregistrados < mensajeRegistrados.length && lennoregistrados == mensajeNoRegistrados.length ? mensajeRegistrados : lennoregistrados < mensajeNoRegistrados.length && lenregistrados == mensajeRegistrados.length ? mensajeNoRegistrados : mensajeRegistrados + "<|||>." + mensajeNoRegistrados + '<|||>' + err.stack });
													}
												});
											});
											// Inventario.create({
											// 	id_almacen: req.body.id_almacen,
											// 	id_producto: productoEncontrado.id,
											// 	cantidad: producto.cantidad,
											// 	costo_unitario: producto.costo_unitario,
											// 	fecha_vencimiento: producto.fecha_vencimiento,
											// 	lote: producto.lote ? producto.lote.toString() : null,
											// 	costo_total: (producto.cantidad * producto.costo_unitario)
											// }).then(function (inventarioCreado) {
											// 	DetalleMovimiento.create({
											// 		id_movimiento: movimientoCreado.id,
											// 		id_producto: productoEncontrado.id,
											// 		costo_unitario: producto.costo_unitario,
											// 		cantidad: producto.cantidad,
											// 		importe: (producto.costo_unitario * producto.cantidad),
											// 		descuento: 0,
											// 		recargo: 0,
											// 		ice: 0,
											// 		excento: 0,
											// 		tipo_descuento: 0,
											// 		tipo_recargo: 0,
											// 		total: (producto.costo_unitario * producto.cantidad),
											// 		id_inventario: inventarioCreado.id
											// 	}).then(function (detalleMovimientoCreado) {
											// 		mensajeRegistrados = mensajeRegistrados + " " + producto.codigo;
											// 		if (index == (array.length - 1)) {
											// 			res.json({ message: lenregistrados < mensajeRegistrados.length && lennoregistrados == mensajeNoRegistrados.length ? mensajeRegistrados : lennoregistrados < mensajeNoRegistrados.length && lenregistrados == mensajeRegistrados.length ? mensajeNoRegistrados : mensajeRegistrados + "<|||>." + mensajeNoRegistrados });
											// 		}
											// 	});
											// });
										} else {
											mensajeNoRegistrados = mensajeNoRegistrados + " " + producto.codigo;
										}
									});
								});
							});
						});
					});
				} else {
					res.json({ message: "Ningún Item se actualizo!" });
				}
			}).catch((err) => {
				res.json({ mensaje: err.stack, message: err.stack, hasErr: true })
			})
		});

	function crearInventario() {
		return Inventario.create({
			id_almacen: req.body.id_almacen,
			id_producto: productoEncontrado.id,
			cantidad: producto.cantidad,
			costo_unitario: producto.costo_unitario,
			fecha_vencimiento: producto.fecha_vencimiento,
			lote: producto.lote ? producto.lote.toString() : null,
			costo_total: (producto.cantidad * producto.costo_unitario)
		}).then(function (inventarioCreado) {
			return DetalleMovimiento.create({
				id_movimiento: movimientoCreado.id,
				id_producto: productoEncontrado.id,
				costo_unitario: producto.costo_unitario,
				cantidad: producto.cantidad,
				importe: (producto.costo_unitario * producto.cantidad),
				descuento: 0,
				recargo: 0,
				ice: 0,
				excento: 0,
				tipo_descuento: 0,
				tipo_recargo: 0,
				total: (producto.costo_unitario * producto.cantidad),
				id_inventario: inventarioCreado.id
			}).then(function (detalleMovimientoCreado) {
				return new Promise(function (fulfill, reject) {
					fulfill('Inventario creado...')
				})
				// mensajeRegistrados = mensajeRegistrados + " " + producto.codigo;
			});
		});
	}

	function formatearFecha(fecha) {
		var mes = fecha.split('/')[1];
		var dia = fecha.split('/')[0];
		return fecha.split('/')[2] + mes + dia;
	}

	router.route('/ventasUpdate/:id_user/factura/:factura')
		.get(function (req, res) {
			sequelize.transaction(function (t) {
				console.log(req.params.factura);
				return Venta.findAll({
					where: {
						usuario: req.params.id_user,
						factura: req.params.factura,
						fecha: { $between: ['2018-06-01 00:00:00', '2019-04-30 23:59:59'] }
					},
					include: [
						{ model: Almacen, as: 'almacen' },
						{
							model: DetalleVenta, as: 'detallesVenta',
							include: [{
								model: Producto, as: 'producto',
								include: [
									{ model: Clase, as: 'tipoProducto' },
									{
										model: ProductoBase, as: 'productosBase',
										include: [{
											model: Producto, as: 'productoBase',
											include: [{ model: Clase, as: 'tipoProducto' }]
										}]
									}
								]
							}]
						},
						{
							model: Movimiento, as: 'movimiento',
							include: [{
								model: DetalleMovimiento, as: 'detallesMovimiento', required: false,
								where: {
									movimiento: {
										$eq: null
									}
								}
							}]
						}]
				}).then(function (movimiento) {
					var promises = [];
					for (var i = 0; i < movimiento.length; i++) {
						var moviget = movimiento[i].detallesVenta;
						for (var j = 0; j < moviget.length; j++) {

							if (moviget[j].producto.tipoProducto.nombre_corto == Diccionario.TIPO_PRODUCTO_BASE) {
								promises.push(calcularCostosEgresosUpdate(moviget[j], moviget[j].producto, moviget[j].cantidad, [],
									movimiento[i].movimiento, 0, 0, res, movimiento[i], t, moviget[j]));
							} else if (moviget[j].producto.tipoProducto.nombre_corto == "PFINAL") {
								// var promises = [];
								for (var k = 0; k < moviget[j].producto.productosBase.length; k++) {
									if (moviget[j].producto.productosBase[k].productoBase.tipoProducto.nombre_corto == Diccionario.TIPO_PRODUCTO_BASE) {
										var sumafinal = Number(moviget[j].producto.productosBase[k].formulacion) * moviget[j].cantidad;
										promises.push(calcularCostosEgresosUpdate(moviget[j], moviget[j].producto.productosBase[k].productoBase, sumafinal, [],
											movimiento[i].movimiento, 0, 0, res, movimiento[i], t, moviget[j]));

										// promises.push(calcularCostosEgresos(detalleVenta, detalleVenta.producto.productosBase[i].productoBase, moviget[j].producto.productosBase[k].formulacion * moviget[j].cantidad, detalleVenta.producto.productosBase[i].productoBase.inventarios,
										// 		movimientoCreado, index, array, res, venta, t, detalleVentaCreada));
									}
								}
							}
							// === descomentar en caso de error =================================
							// promises.push(calcularCostosEgresosUpdate(moviget[j], moviget[j].producto, moviget[j].cantidad, [],
							// 	movimiento[i].movimiento, 0, 0, res, movimiento[i], t, moviget[j]));
							// ========================================================================

							// return calcularCostosEgresos(moviget[j], moviget[j].producto, moviget[j].cantidad, [],
							// 	movimiento[i].movimiento, 0, 0, res, movimiento[i], t, moviget[j]);
						}
					}
					return Promise.all(promises);
					// res.json(movimiento);
				})
			}).then(function (result) {
				res.json({ mensaje: 'Se anulo la venta!' });
			}).catch(function (err) {
				res.json({ hasError: true, message: err.stack });
			})
		})

	function calcularCostosEgresosUpdate(detalleVenta, producto, cantidad, inventarios, movimientoCreado, index, array, res, venta, t, detalleVentaCreada) {
		var cantidadTotal = cantidad;
		var condicionInventario = {
			id_producto: producto.id, id_almacen: venta.almacen.id,
		}
		if (detalleVenta.lote) {
			condicionInventario.lote = detalleVenta.lote
		}
		if (detalleVenta.fecha_vencimiento) {
			var inicio = new Date(detalleVenta.fecha_vencimiento); inicio.setHours(0, 0, 0, 0, 0);
			var fin = new Date(detalleVenta.fecha_vencimiento); fin.setHours(23, 59, 59, 0, 0);

			condicionInventario.fecha_vencimiento = { $between: [inicio, fin] }
		}
		if (inventarios.length == 0) {
			return Inventario.findAll({
				where: condicionInventario, transaction: t,
				order: [['id', 'desc']]
			}).then(function (encontrado) {
				inventarios = encontrado
				if (producto.activar_inventario) {
					if (inventarios.length > 0) {
						var promises = [];

						var cantidadParcial = cantidad;
						var costosUpdate = {
							costo_unitario: inventarios[0].costo_unitario,
							costo_unitario_dolares: inventarios[0].costo_unitario_dolares,
							id: inventarios[0].id
						};

						// control para no duplicar kardex =========
						// usar findAll y mayor a 1
						return DetalleMovimiento.findAll({
							where: { movimiento: movimientoCreado.id, producto: producto.id }, transaction: t,
						}).then(function (movimientoEncontrado) {
							var detVentas = venta.detallesVenta.filter(function (v) {
								if (v.producto.tipoProducto.nombre_corto == Diccionario.TIPO_PRODUCTO_BASE) {
									return v.id_producto == producto.id
								} else if (v.producto.tipoProducto.nombre_corto == "PFINAL") {
									return v.producto.productosBase[0].productoBase.id == producto.id
								}
								// return v.id_producto == producto.id
							})
							// console.log(detVentas)
							if (movimientoEncontrado.length != detVentas.length) {
								var rrr = crearMovimientoEgresoYActualizarInventario(movimientoCreado, detalleVenta, producto, cantidad, inventarios, cantidadParcial, costosUpdate, index, array, i, res, venta, t, detalleVentaCreada);
								promises.push(new Promise(function (fulfill, reject) {
									fulfill(venta);
								}));
								return Promise.all(promises);
							} else {
								return new Promise(function (fulfill, reject) {
									fulfill(venta);
								});
							}
							// if (movimientoEncontrado == null) {
							// 	var rrr = crearMovimientoEgresoYActualizarInventario(movimientoCreado, detalleVenta, producto, cantidad, inventarios, cantidadParcial, costosUpdate, index, array, i, res, venta, t, detalleVentaCreada);
							// 	promises.push(new Promise(function (fulfill, reject) {
							// 		fulfill(venta);
							// 	}));
							// 	return Promise.all(promises);
							// }else{
							// 	return new Promise(function (fulfill, reject) {
							// 		// reject(venta);
							// 		fulfill(venta);
							// 	});
							// }
						})
						// control para no duplicar kardex =========
						// var rrr = crearMovimientoEgresoYActualizarInventario(movimientoCreado, detalleVenta, producto, cantidad, inventarios, cantidadParcial, costosUpdate, index, array, i, res, venta, t, detalleVentaCreada);
						// promises.push(new Promise(function (fulfill, reject) {
						// 	fulfill(venta);
						// }));
						// return Promise.all(promises);


					} else {
						//if (index == (array.length - 1)) {
						return new Promise(function (fulfill, reject) {
							fulfill(venta);
						});
						//}
					}
				} else {
					//if (index == (array.length - 1)) {
					return new Promise(function (fulfill, reject) {
						fulfill(venta);
					});
					//}
				}
			}).catch(function (err) {
				return new Promise(function (fulfill, reject) {
					reject(err);
				});
			})
		} else {
			if (producto.activar_inventario) {
				if (inventarios.length > 0) {
					var promises = [];

					for (var i = 0; i < inventarios.length; i++) {
						if (cantidadTotal > 0) {
							var cantidadParcial;
							if (cantidadTotal > inventarios[i].cantidad) {
								cantidadParcial = inventarios[i].cantidad;
								cantidadTotal = cantidadTotal - inventarios[i].cantidad
							} else {
								cantidadParcial = cantidadTotal;
								cantidadTotal = 0;
							}

							if (cantidadParcial > 0) {
								var rrr = crearMovimientoEgresoYActualizarInventario(movimientoCreado, detalleVenta, producto, cantidad, inventarios, cantidadParcial, inventarios[i], index, array, i, res, venta, t, detalleVentaCreada);
								//console.log(rrr);
								promises.push(new Promise(function (fulfill, reject) {
									fulfill(venta);
								}));
							} /*else {
							//if (index == (array.length - 1) && i == (inventarios.length - 1)) {
								//res.json(venta);
								promises.push(new Promise(function (fulfill, reject){
									fulfill(venta);
								}));
							//}
						}*/
						} else {
							//if (index == (array.length - 1) && i == (inventarios.length - 1)) {
							//res.json(venta);
							/*promises.push(new Promise(function (fulfill, reject){
								fulfill(venta);
							}));*/
							//}
						}
					}
					return Promise.all(promises);
				} else {
					//if (index == (array.length - 1)) {
					return new Promise(function (fulfill, reject) {
						// reject(venta);
						fulfill(venta);
					});
					//}
				}
			} else {
				//if (index == (array.length - 1)) {
				return new Promise(function (fulfill, reject) {
					fulfill(venta);
				});
				//}
			}
		}
	}

	router.route('/ventasN')
		.post(ensureAuthorizedlogged, function (req, res) {
			Tipo.find({
				where: { nombre_corto: Diccionario.MOV_EGRE },
				transaction: t
			}).then(function (tipoMovimiento) {
				sequelize.transaction(function (t) {
					return Movimiento.create({
						id_tipo: tipoMovimiento.dataValues.id,
						id_clase: req.body.movimiento.id,
						id_almacen: req.body.almacen.id,
						fecha: req.body.fecha
					}, { transaction: t }).then(function (movimientoCreado) {
						if (req.body.movimiento.nombre_corto === Diccionario.EGRE_FACTURACION) {
							return SucursalActividadDosificacion.find({
								where: {
									id_actividad: venta.actividad.id,
									id_sucursal: venta.sucursal.id,
									expirado: false
								}
							}).then(function (sucursalActividadDosificacion) {
								var dosificacion = sucursalActividadDosificacion.dosificacion;
								venta.factura = dosificacion.correlativo;
								venta.pieFactura = dosificacion.pieFactura;
								venta.codigo_control = CodigoControl.obtenerCodigoControl(dosificacion.autorizacion.toString(),
									dosificacion.correlativo.toString(),
									venta.cliente.nit.toString(),
									formatearFecha(venta.fechaTexto).toString(),
									parseFloat(venta.total).toFixed(2),
									dosificacion.llave_digital.toString());
								venta.autorizacion = dosificacion.autorizacion.toString();
								venta.fecha_limite_emision = dosificacion.fecha_limite_emision;
								venta.numero_literal = NumeroLiteral.Convertir(parseFloat(venta.total).toFixed(2).toString());
								venta.numero_literal_dolares = NumeroLiteral.Convertir(parseFloat(venta.total_dolares).toFixed(2).toString(), 'Dolares');
								if (sucursalActividadDosificacion.sucursal.empresa.usar_pedidos) {
									venta.pedido = sucursalActividadDosificacion.sucursal.pedido_correlativo;
								}
								if (!venta.cliente.id) {
									return Cliente.create({
										id_empresa: venta.id_empresa,
										nit: venta.cliente.nit,
										razon_social: venta.cliente.razon_social
									}, { transaction: t }).then(function (clienteCreado) {
										return crearVenta(req, venta, res, clienteCreado.id, movimientoCreado, dosificacion, true, sucursalActividadDosificacion.sucursal, t);
									});
								} else {
									return crearVenta(req, venta, res, venta.cliente.id, movimientoCreado, dosificacion, true, sucursalActividadDosificacion.sucursal, t);
								}
							})
						}
						if (req.body.movimiento.nombre_corto === Diccionario.EGRE_PROFORMA) {

						}
						if (req.body.movimiento.nombre_corto === Diccionario.EGRE_BAJA) {

						}
						if (req.body.movimiento.nombre_corto === Diccionario.EGRE_TRASPASO) {

						}
					})
				}).then(function (result) {

				}).catch(function (err) {

				})
			})

		})
	function crearDetalleVentaServicio(ventaCreada, detalleVenta, index, array, res, venta, t, sucursal) {
		return ServicioVenta.find({
			where: {
				nombre: detalleVenta.servicio.nombre
			}
			, transaction: t
		}).then(function (servicioEncontrado) {

			venta.servicio = servicioEncontrado

			return DetalleVenta.create({
				id_venta: ventaCreada.id,
				id_servicio: detalleVenta.servicio.id,
				importe: detalleVenta.importe,
				descuento: detalleVenta.descuento,
				recargo: detalleVenta.recargo,
				ice: detalleVenta.ice,
				excento: detalleVenta.excento,
				descuento_dolares: detalleVenta.descuento_dolares,
				recargo_dolares: detalleVenta.recargo_dolares,
				ice_dolares: detalleVenta.ice_dolares,
				excento_dolares: detalleVenta.excento_dolares,
				tipo_descuento: detalleVenta.tipo_descuento,
				tipo_recargo: detalleVenta.tipo_recargo,
				total: detalleVenta.total,
				observaciones: detalleVenta.observaciones
			}, { transaction: t }).then(function (detalleVentaCreada) {
				return new Promise(function (fulfill, reject) {
					fulfill(venta);
				});
			}).catch(function (err) {
				return new Promise(function (fulfill, reject) {
					reject(err);
				});
			})
		}).catch(function (err) {
			return new Promise(function (fulfill, reject) {
				reject(err);
			});
		})
	}
	function crearVentaServicio(req, venta, res, idCliente, dosificacion, esFactura, sucursal, t, id_movimiento) {
		return Venta.create({
			id_cliente: idCliente,
			factura: venta.factura,
			fecha: venta.fecha,
			importe: venta.importe,
			importe_dolares: venta.importe_dolares,
			id_tipo_pago: venta.tipoPago.id,
			dias_credito: venta.dias_credito,
			a_cuenta: venta.a_cuenta,
			saldo: venta.saldo,
			total: venta.total,
			total_dolares: venta.total_dolares,
			id_usuario: venta.id_usuario,
			pagado: venta.pagado,
			pagado_dolares: venta.pagado_dolares,
			cambio: venta.cambio,
			cambio_dolares: venta.cambio_dolares,
			id_vendedor: (venta.vendedor ? venta.vendedor.id : null),
			observacion: venta.observacion,
			id_tipo_movimiento: id_movimiento,
			id_sucursal: venta.sucursal.id,
			id_actividad: venta.actividad.id,
			autorizacion: venta.autorizacion,
			codigo_control: venta.codigo_control,
			fecha_limite_emision: venta.fecha_limite_emision,
			ver_dolares: venta.ver_dolares,
			usar_descuento_general: venta.usar_descuento_general,
			tipo_descuento: venta.tipo_descuento,
			descuento: venta.descuento,
			tipo_recargo: venta.tipo_recargo,
			recargo: venta.recargo,
			ice: venta.ice,
			excento: venta.excento,
			observacion_traspaso: venta.observacion_traspaso || ''
			/* pedido: venta.pedido, */
			//despachado: venta.despachado,

		}, { transaction: t }).then(function (ventaCreada) {
			req.body.id_venta = ventaCreada.id
			return Dosificacion.update({
				correlativo: (venta.factura + 1)
			}, {
				where: { id: dosificacion.id },
				transaction: t
			}).then(function (dosificacionActualizada) {

				return ConfiguracionGeneralFactura.find({
					where: {
						id_empresa: venta.id_empresa
					},
					transaction: t,
					include: [{ model: Clase, as: 'impresionFactura' },
					{ model: Clase, as: 'tipoFacturacion' },
					{ model: Clase, as: 'tamanoPapelFactura' },
					{ model: Clase, as: 'tituloFactura' },
					{ model: Clase, as: 'subtituloFactura' },
					{ model: Clase, as: 'tamanoPapelNotaVenta' },

					{ model: Clase, as: 'tamanoPapelFacturaServicio' },
					{ model: Clase, as: 'tamanoPapelNotaTraspaso' },
					{ model: Clase, as: 'tamanoPapelNotaBaja' },
					{ model: Clase, as: 'tamanoPapelNotaPedido' },
					{ model: Clase, as: 'tamanoPapelCierreCaja' },
					{ model: Clase, as: 'formatoPapelFactura' },
					{ model: Clase, as: 'formatoColorFactura' },
					{ model: Clase, as: 'formatoConFirmaFactura' },
					{ model: Clase, as: 'formatoPapelFacturaServicio' },
					{ model: Clase, as: 'formatoColorFacturaServicio' },
					{ model: Clase, as: 'tipoConfiguracion' },
					{ model: Clase, as: 'formatoPapelNotaVenta' },
					{ model: Clase, as: 'formatoColorNotaVenta' },
					{ model: Clase, as: 'tipoConfiguracionNotaVenta' },
					{ model: Clase, as: 'formatoConFirmaNotaVenta' },
					{ model: Clase, as: 'formatoPapelNotaTraspaso' },
					{ model: Clase, as: 'formatoColorNotaTraspaso' },
					{ model: Clase, as: 'tipoConfiguracionNotaTraspaso' },
					{ model: Clase, as: 'formatoPapelNotaBaja' },
					{ model: Clase, as: 'formatoColorNotaBaja' },
					{ model: Clase, as: 'tipoConfiguracionNotaBaja' }]
				}).then(function (configuracionGeneralFactura) {
					if (configuracionGeneralFactura.usar) {
						var promises = [];
						venta.configuracion = configuracionGeneralFactura;
						venta.detallesVenta.forEach(function (detalleVenta, index, array) {
							promises.push(crearDetalleVentaServicio(ventaCreada, detalleVenta, index, array, res, venta, t, sucursal));
						});
						return Promise.all(promises);
					} else {
						return ConfiguracionFactura.find({
							where: {
								id_sucursal: venta.sucursal.id
							},
							transaction: t,
							include: [{ model: Clase, as: 'impresionFactura' },
							{ model: Clase, as: 'tipoFacturacion' },
							{ model: Clase, as: 'tamanoPapelFactura' },
							{ model: Clase, as: 'tituloFactura' },
							{ model: Clase, as: 'subtituloFactura' },
							{ model: Clase, as: 'tamanoPapelNotaVenta' },

							{ model: Clase, as: 'tamanoPapelFacturaServicio' },
							{ model: Clase, as: 'tamanoPapelNotaTraspaso' },
							{ model: Clase, as: 'tamanoPapelNotaBaja' },
							{ model: Clase, as: 'tamanoPapelNotaPedido' },
							{ model: Clase, as: 'tamanoPapelCierreCaja' },
							{ model: Clase, as: 'formatoPapelFactura' },
							{ model: Clase, as: 'formatoColorFactura' },
							{ model: Clase, as: 'formatoConFirmaFactura' },
							{ model: Clase, as: 'formatoPapelFacturaServicio' },
							{ model: Clase, as: 'formatoColorFacturaServicio' },
							{ model: Clase, as: 'tipoConfiguracion' },
							{ model: Clase, as: 'formatoPapelNotaVenta' },
							{ model: Clase, as: 'formatoColorNotaVenta' },
							{ model: Clase, as: 'tipoConfiguracionNotaVenta' },
							{ model: Clase, as: 'formatoConFirmaNotaVenta' },
							{ model: Clase, as: 'formatoPapelNotaTraspaso' },
							{ model: Clase, as: 'formatoColorNotaTraspaso' },
							{ model: Clase, as: 'tipoConfiguracionNotaTraspaso' },
							{ model: Clase, as: 'formatoPapelNotaBaja' },
							{ model: Clase, as: 'formatoColorNotaBaja' },
							{ model: Clase, as: 'tipoConfiguracionNotaBaja' }]
						}).then(function (configuracionFactura) {
							var promises = [];
							venta.configuracion = configuracionFactura;
							venta.detallesVenta.forEach(function (detalleVenta, index, array) {
								promises.push(crearDetalleVentaServicio(ventaCreada, detalleVenta, index, array, res, venta, t, sucursal));
							});
							return Promise.all(promises);
						}).catch(function (err) {
							return new Promise(function (fulfill, reject) {
								reject(err);
							});
						})
					}
				}).catch(function (err) {
					return new Promise(function (fulfill, reject) {
						reject(err);
					});
				})

			}).catch(function (err) {
				return new Promise(function (fulfill, reject) {
					reject(err);
				});
			})

		}).catch(function (err) {
			return new Promise(function (fulfill, reject) {
				reject(err);
			});
		})
	}

	function crearSalida(req, res) {
		sequelize.transaction(function (t) {
			var movimiento = req.body.movimiento.nombre_corto;
			var id_movimiento = req.body.movimiento.id;
			var venta = req.body;
			var factura = {};
			factura.venta = venta;
			if (movimiento == Diccionario.EGRE_SERVICIO) {
				return SucursalActividadDosificacion.find({
					where: {
						id_actividad: venta.actividad.id,
						id_sucursal: venta.sucursal.id,
						expirado: false
					},
					transaction: t,
					include: [{ model: Dosificacion, as: 'dosificacion', include: [{ model: Clase, as: 'pieFactura' }] },
					{ model: Sucursal, as: 'sucursal', include: [{ model: Empresa, as: 'empresa' }] }]
				}).then(function (sucursalActividadDosificacion) {
					var dosificacion = sucursalActividadDosificacion.dosificacion;
					venta.factura = dosificacion.correlativo;
					venta.pieFactura = dosificacion.pieFactura;
					venta.codigo_control = CodigoControl.obtenerCodigoControl(dosificacion.autorizacion.toString(),
						dosificacion.correlativo.toString(),
						venta.cliente.nit.toString(),
						formatearFecha(venta.fechaTexto).toString(),
						parseFloat(venta.total).toFixed(2),
						dosificacion.llave_digital.toString());
					venta.autorizacion = dosificacion.autorizacion.toString();
					venta.fecha_limite_emision = dosificacion.fecha_limite_emision;
					venta.numero_literal = NumeroLiteral.Convertir(parseFloat(venta.total).toFixed(2).toString());
					venta.numero_literal_dolares = NumeroLiteral.Convertir(parseFloat(venta.total_dolares).toFixed(2).toString(), 'Dolares');
					/* if (sucursalActividadDosificacion.sucursal.empresa.usar_pedidos) {
						venta.pedido = sucursalActividadDosificacion.sucursal.pedido_correlativo;
					} */
					if (!venta.cliente.id) {
						return Cliente.create({
							id_empresa: venta.id_empresa,
							nit: venta.cliente.nit,
							razon_social: venta.cliente.razon_social
						}, { transaction: t }).then(function (clienteCreado) {
							return crearVentaServicio(req, venta, res, clienteCreado.id, dosificacion, true, sucursalActividadDosificacion.sucursal, t, id_movimiento);
						});
					} else {
						return crearVentaServicio(req, venta, res, venta.cliente.id, dosificacion, true, sucursalActividadDosificacion.sucursal, t, id_movimiento);
					}
				})
			} else {

				return Tipo.find({
					where: { nombre_corto: Diccionario.MOV_EGRE },
					transaction: t
				}).then(function (tipoMovimiento) {
					return Movimiento.create({
						id_tipo: tipoMovimiento.id,
						id_clase: id_movimiento,
						id_almacen: venta.almacen.id,
						fecha: venta.fecha
					}, { transaction: t }).then(function (movimientoCreado) {
						//SI ES FACTURACION
						if (movimiento == Diccionario.EGRE_FACTURACION) {
							return SucursalActividadDosificacion.find({
								where: {
									id_actividad: venta.actividad.id,
									id_sucursal: venta.sucursal.id,
									expirado: false
								},
								transaction: t,
								include: [{ model: Dosificacion, as: 'dosificacion', include: [{ model: Clase, as: 'pieFactura' }] },
								{ model: Sucursal, as: 'sucursal', include: [{ model: Empresa, as: 'empresa' }] }]
							}).then(function (sucursalActividadDosificacion) {

								if (venta.mesero) {
									venta.factura = null;
									venta.pieFactura = null;
									venta.codigo_control = null;
									venta.autorizacion = null;
									venta.fecha_limite_emision = null;
									if (sucursalActividadDosificacion.sucursal.empresa.usar_pedidos) {
										venta.pedido = sucursalActividadDosificacion.sucursal.pedido_correlativo;
									}
								} else {
									var dosificacion = sucursalActividadDosificacion.dosificacion;
									venta.factura = dosificacion.correlativo;
									venta.pieFactura = dosificacion.pieFactura;
									venta.codigo_control = CodigoControl.obtenerCodigoControl(dosificacion.autorizacion.toString(),
										dosificacion.correlativo.toString(),
										venta.cliente.nit.toString(),
										formatearFecha(venta.fechaTexto).toString(),
										parseFloat(venta.total).toFixed(2),
										dosificacion.llave_digital.toString());
									venta.autorizacion = dosificacion.autorizacion.toString();
									venta.fecha_limite_emision = dosificacion.fecha_limite_emision;
									if (sucursalActividadDosificacion.sucursal.empresa.usar_pedidos) {
										venta.pedido = sucursalActividadDosificacion.sucursal.pedido_correlativo;
									}
								}
								venta.numero_literal = NumeroLiteral.Convertir(parseFloat(venta.total).toFixed(2).toString());
								venta.numero_literal_dolares = NumeroLiteral.Convertir(parseFloat(venta.total_dolares).toFixed(2).toString(), 'Dolares');
								if (!venta.cliente.id) {
									if (venta.mesero) {
										return crearVenta(req, venta, res, null, movimientoCreado, dosificacion, true, sucursalActividadDosificacion.sucursal, t);
									} else {
										return Cliente.create({
											id_empresa: venta.id_empresa,
											nit: venta.cliente.nit,
											razon_social: venta.cliente.razon_social
										}, { transaction: t }).then(function (clienteCreado) {
											return crearVenta(req, venta, res, clienteCreado.id, movimientoCreado, dosificacion, true, sucursalActividadDosificacion.sucursal, t);
										});
									}

								} else {
									return crearVenta(req, venta, res, venta.cliente.id, movimientoCreado, dosificacion, true, sucursalActividadDosificacion.sucursal, t);
								}
							});
							//SI ES PROFORMA
						} else if (movimiento == Diccionario.EGRE_PROFORMA) {
							return Sucursal.find({
								where: {
									id: venta.sucursal.id
								},
								transaction: t,
								include: [{ model: Empresa, as: 'empresa' }]
							}).then(function (sucursal) {
								venta.factura = sucursal.nota_venta_correlativo;
								venta.numero_literal = NumeroLiteral.Convertir(parseFloat(venta.total).toFixed(2).toString());
								venta.numero_literal_dolares = NumeroLiteral.Convertir(parseFloat(venta.total_dolares).toFixed(2).toString(), 'Dolares');
								venta.actividad = { id: null };

								if (sucursal.empresa.usar_pedidos) {
									venta.pedido = sucursal.pedido_correlativo;
								}

								if (!venta.cliente.id) {
									if (venta.mesero) {
										venta.factura = null;
										return crearVenta(req, venta, res, venta.cliente.id, movimientoCreado, null, false, sucursal, t);
									} else {
										return Cliente.create({
											id_empresa: venta.id_empresa,
											nit: venta.cliente.nit,
											razon_social: venta.cliente.razon_social
										}, { transaction: t }).then(function (clienteCreado) {
											return crearVenta(req, venta, res, clienteCreado.id, movimientoCreado, null, false, sucursal, t);
										});
									}
								} else {
									return crearVenta(req, venta, res, venta.cliente.id, movimientoCreado, null, false, sucursal, t);
								}
							});
							//SI ES PREFACTURACION
						} else if (movimiento == Diccionario.EGRE_PRE_FACTURACION) {
							return Sucursal.find({
								where: {
									id: venta.sucursal.id
								},
								transaction: t,
								include: [{ model: Empresa, as: 'empresa' }]
							}).then(function (sucursal) {
								venta.factura = sucursal.pre_facturacion_correlativo;
								venta.numero_literal = NumeroLiteral.Convertir(parseFloat(venta.total).toFixed(2).toString());
								venta.numero_literal_dolares = NumeroLiteral.Convertir(parseFloat(venta.total_dolares).toFixed(2).toString(), 'Dolares');
								venta.actividad = { id: null };

								if (sucursal.empresa.usar_pedidos) {
									venta.pedido = sucursal.pedido_correlativo;
								}

								if (!venta.cliente.id) {
									return Cliente.create({
										id_empresa: venta.id_empresa,
										nit: venta.cliente.nit,
										razon_social: venta.cliente.razon_social
									}, { transaction: t }).then(function (clienteCreado) {
										return crearVenta(req, venta, res, clienteCreado.id, movimientoCreado, null, false, sucursal, t);
									});
								} else {
									return crearVenta(req, venta, res, venta.cliente.id, movimientoCreado, null, false, sucursal, t);
								}
							});
							//SI ES BAJA
						} else if (movimiento == Diccionario.EGRE_BAJA) {
							return Sucursal.find({
								where: {
									id: venta.sucursal.id
								},
								transaction: t,
								include: [{ model: Empresa, as: 'empresa' }]
							}).then(function (sucursal) {
								venta.factura = sucursal.nota_baja_correlativo;
								return Almacen.find({
									where: { id: venta.almacen.id },
									transaction: t
								})
									.then(almacenObtenido => {
										return Venta.create({
											id_almacen: venta.almacen.id,
											id_movimiento: movimientoCreado.id,
											fecha: venta.fecha,
											importe: (-venta.importe),
											importe_dolares: (-venta.importe_dolares),
											total: (-venta.total),
											total_dolares: (-venta.total_dolares),
											id_usuario: venta.id_usuario,
											activa: true,
											factura: venta.factura,
											observacion: venta.observacion,
											observacion_traspaso: venta.observacion_traspaso || '',
											config_doc_iso: venta.config_doc_iso ? venta.config_doc_iso : null,
											numero_iso_baja: venta.config_doc_iso ? almacenObtenido.numero_correlativo_iso_baja : null
										}, { transaction: t }).then(function (ventaCreada) {
											req.body.id_venta = ventaCreada.id
											return Sucursal.update({
												nota_baja_correlativo: (venta.factura + 1)
											}, {
												where: { id: venta.sucursal.id },
												transaction: t
											}).then(function (correlativoActualizada) {
												return Almacen.update({
													numero_correlativo_iso_baja: venta.config_doc_iso ? (almacenObtenido.numero_correlativo_iso_baja + 1) : almacenObtenido.numero_correlativo_iso_baja,
												}, {
													where: { id: venta.almacen.id }, transaction: t
												}).then(dataAlmacen => {
													return ConfiguracionGeneralFactura.find({
														where: {
															id_empresa: venta.id_empresa
														},
														transaction: t,
														include: [{ model: Clase, as: 'impresionFactura' },
														{ model: Clase, as: 'tipoFacturacion' },
														{ model: Clase, as: 'tamanoPapelFactura' },
														{ model: Clase, as: 'tituloFactura' },
														{ model: Clase, as: 'subtituloFactura' },
														{ model: Clase, as: 'tamanoPapelNotaVenta' },

														{ model: Clase, as: 'tamanoPapelFacturaServicio' },
														{ model: Clase, as: 'tamanoPapelNotaTraspaso' },
														{ model: Clase, as: 'tamanoPapelNotaBaja' },
														{ model: Clase, as: 'tamanoPapelNotaPedido' },
														{ model: Clase, as: 'tamanoPapelCierreCaja' },
														{ model: Clase, as: 'formatoPapelFactura' },
														{ model: Clase, as: 'formatoColorFactura' },
														{ model: Clase, as: 'formatoConFirmaFactura' },
														{ model: Clase, as: 'formatoPapelFacturaServicio' },
														{ model: Clase, as: 'formatoColorFacturaServicio' },
														{ model: Clase, as: 'tipoConfiguracion' },
														{ model: Clase, as: 'formatoPapelNotaVenta' },
														{ model: Clase, as: 'formatoColorNotaVenta' },
														{ model: Clase, as: 'tipoConfiguracionNotaVenta' },
														{ model: Clase, as: 'formatoConFirmaNotaVenta' },
														{ model: Clase, as: 'formatoPapelNotaTraspaso' },
														{ model: Clase, as: 'formatoColorNotaTraspaso' },
														{ model: Clase, as: 'tipoConfiguracionNotaTraspaso' },
														{ model: Clase, as: 'formatoPapelNotaBaja' },
														{ model: Clase, as: 'formatoColorNotaBaja' },
														{ model: Clase, as: 'tipoConfiguracionNotaBaja' }]
													}).then(function (configuracionGeneralFactura) {
														if (configuracionGeneralFactura.usar) {
															var promises = [];
															venta.configuracion = configuracionGeneralFactura;
															venta.detallesVenta.forEach(function (detalleVenta, index, array) {
																promises.push(crearDetalleVenta(movimientoCreado, ventaCreada, detalleVenta, -detalleVenta.precio_unitario, -detalleVenta.importe, -detalleVenta.importe_dolares, -detalleVenta.total, -detalleVenta.total_dolares, index, array, res, venta, t, sucursal));
															});
															return Promise.all(promises);
														} else {
															return ConfiguracionFactura.find({
																where: {
																	id_sucursal: venta.sucursal.id
																},
																transaction: t,
																include: [{ model: Clase, as: 'impresionFactura' },
																{ model: Clase, as: 'tipoFacturacion' },
																{ model: Clase, as: 'tamanoPapelFactura' },
																{ model: Clase, as: 'tituloFactura' },
																{ model: Clase, as: 'subtituloFactura' },
																{ model: Clase, as: 'tamanoPapelNotaVenta' },

																{ model: Clase, as: 'tamanoPapelFacturaServicio' },
																{ model: Clase, as: 'tamanoPapelNotaTraspaso' },
																{ model: Clase, as: 'tamanoPapelNotaBaja' },
																{ model: Clase, as: 'tamanoPapelNotaPedido' },
																{ model: Clase, as: 'tamanoPapelCierreCaja' },
																{ model: Clase, as: 'formatoPapelFactura' },
																{ model: Clase, as: 'formatoColorFactura' },
																{ model: Clase, as: 'formatoConFirmaFactura' },
																{ model: Clase, as: 'formatoPapelFacturaServicio' },
																{ model: Clase, as: 'formatoColorFacturaServicio' },
																{ model: Clase, as: 'tipoConfiguracion' },
																{ model: Clase, as: 'formatoPapelNotaVenta' },
																{ model: Clase, as: 'formatoColorNotaVenta' },
																{ model: Clase, as: 'tipoConfiguracionNotaVenta' },
																{ model: Clase, as: 'formatoConFirmaNotaVenta' },
																{ model: Clase, as: 'formatoPapelNotaTraspaso' },
																{ model: Clase, as: 'formatoColorNotaTraspaso' },
																{ model: Clase, as: 'tipoConfiguracionNotaTraspaso' },
																{ model: Clase, as: 'formatoPapelNotaBaja' },
																{ model: Clase, as: 'formatoColorNotaBaja' },
																{ model: Clase, as: 'tipoConfiguracionNotaBaja' }]
															}).then(function (configuracionFactura) {
																var promises = [];
																venta.configuracion = configuracionFactura;
																venta.detallesVenta.forEach(function (detalleVenta, index, array) {
																	promises.push(crearDetalleVenta(movimientoCreado, ventaCreada, detalleVenta, -detalleVenta.precio_unitario, -detalleVenta.importe, -detalleVenta.importe_dolares, -detalleVenta.total, -detalleVenta.total_dolares, index, array, res, venta, t, sucursal));
																});
																return Promise.all(promises);
															});
														}
													});
												});

											});
										});
									})

							});
							//SI ES TRASPASO A OTRA SUCURSAL
						} else if (movimiento == Diccionario.EGRE_TRASPASO) {
							return Sucursal.find({
								where: {
									id: venta.sucursal.id
								},
								transaction: t,
								include: [{ model: Empresa, as: 'empresa' }]
							}).then(function (sucursal) {
								venta.factura = sucursal.nota_traspaso_correlativo;
								if (venta.usar_configuracion_iso) {
									return Almacen.find({
										where: { id: venta.almacen.id },
										transaction: t
									}).then(function (almacenObtenido) {
										venta.numero_iso_traspaso = almacenObtenido.numero_correlativo_iso_traspaso_salida;
										return Venta.create({
											id_almacen: venta.almacen.id,
											id_movimiento: movimientoCreado.id,
											fecha: venta.fecha,
											importe: venta.importe,
											importe_dolares: venta.importe_dolares,
											total: venta.total,
											total_dolares: venta.total_dolares,
											id_usuario: venta.id_usuario,
											activa: true,
											id_almacen_traspaso: venta.almacenDestino.id,
											factura: venta.factura,
											observacion: venta.observacion,
											ver_dolares: venta.ver_dolares,
											observacion_traspaso: venta.observacion_traspaso || '',
											numero_iso_traspaso: venta.config_doc_iso ? venta.numero_iso_traspaso : null,
											config_doc_iso: venta.config_doc_iso ? venta.config_doc_iso : null,
										}, { transaction: t }).then(function (ventaCreada) {
											req.body.id_venta = ventaCreada.id
											return Sucursal.update({
												nota_traspaso_correlativo: (venta.factura + 1)
											}, {
												where: { id: venta.sucursal.id },
												transaction: t
											}).then(function (correlativoActualizada) {
												return Almacen.update({
													numero_correlativo_iso_traspaso_salida: venta.config_doc_iso ? (almacenObtenido.numero_correlativo_iso_traspaso_salida + 1) : almacenObtenido.numero_correlativo_iso_traspaso_salida,
												}, {
													where: { id: venta.almacen.id }, transaction: t
												}).then(function (dataAlmacen) {
													if (!venta.id_orden_reposicion) {
														return Tipo.find({
															where: { nombre_corto: Diccionario.MOV_ING },
															transaction: t
														}).then(function (tipoMovimiento) {
															return Clase.find({
																where: { nombre_corto: Diccionario.ING_TRASPASO },
																transaction: t
															}).then(function (conceptoMovimiento) {
																return Movimiento.create({
																	id_tipo: tipoMovimiento.id,
																	id_clase: conceptoMovimiento.id,
																	id_almacen: venta.almacenDestino.id,
																	fecha: venta.fecha
																}, { transaction: t }).then(function (movimientoIngresoCreado) {
																	return ConfiguracionGeneralFactura.find({
																		where: {
																			id_empresa: venta.id_empresa
																		},
																		transaction: t,
																		include: [{ model: Clase, as: 'impresionFactura' },
																		{ model: Clase, as: 'tipoFacturacion' },
																		{ model: Clase, as: 'tamanoPapelFactura' },
																		{ model: Clase, as: 'tituloFactura' },
																		{ model: Clase, as: 'subtituloFactura' },
																		{ model: Clase, as: 'tamanoPapelNotaVenta' },

																		{ model: Clase, as: 'tamanoPapelFacturaServicio' },
																		{ model: Clase, as: 'tamanoPapelNotaTraspaso' },
																		{ model: Clase, as: 'tamanoPapelNotaBaja' },
																		{ model: Clase, as: 'tamanoPapelNotaPedido' },
																		{ model: Clase, as: 'tamanoPapelCierreCaja' },
																		{ model: Clase, as: 'formatoPapelFactura' },
																		{ model: Clase, as: 'formatoColorFactura' },
																		{ model: Clase, as: 'formatoConFirmaFactura' },
																		{ model: Clase, as: 'formatoPapelFacturaServicio' },
																		{ model: Clase, as: 'formatoColorFacturaServicio' },
																		{ model: Clase, as: 'tipoConfiguracion' },
																		{ model: Clase, as: 'formatoPapelNotaVenta' },
																		{ model: Clase, as: 'formatoColorNotaVenta' },
																		{ model: Clase, as: 'tipoConfiguracionNotaVenta' },
																		{ model: Clase, as: 'formatoConFirmaNotaVenta' },
																		{ model: Clase, as: 'formatoPapelNotaTraspaso' },
																		{ model: Clase, as: 'formatoColorNotaTraspaso' },
																		{ model: Clase, as: 'tipoConfiguracionNotaTraspaso' },
																		{ model: Clase, as: 'formatoPapelNotaBaja' },
																		{ model: Clase, as: 'formatoColorNotaBaja' },
																		{ model: Clase, as: 'tipoConfiguracionNotaBaja' }]
																	}).then(function (configuracionGeneralFactura) {
																		if (configuracionGeneralFactura.usar) {
																			var promises = [];
																			venta.configuracion = configuracionGeneralFactura;

																			if (venta.detallesVenta[0] == null) {
																				venta.detallesVenta.splice(0, 1);
																			}
																			venta.detallesVenta.forEach(function (detalleVenta, index, array) {
																				promises.push(calcularCostosIngresos(detalleVenta, movimientoIngresoCreado, venta.almacenDestino.id, venta, t));
																				promises.push(crearDetalleVenta(movimientoCreado, ventaCreada, detalleVenta, detalleVenta.precio_unitario, detalleVenta.importe, detalleVenta.importe_dolares, detalleVenta.total, detalleVenta.total_dolares, index, array, res, venta, t, sucursal));
																			});
																			return Promise.all(promises);

																		} else {
																			return ConfiguracionFactura.find({
																				where: {
																					id_sucursal: venta.sucursal.id
																				},
																				transaction: t,
																				include: [{ model: Clase, as: 'impresionFactura' },
																				{ model: Clase, as: 'tipoFacturacion' },
																				{ model: Clase, as: 'tamanoPapelFactura' },
																				{ model: Clase, as: 'tituloFactura' },
																				{ model: Clase, as: 'subtituloFactura' },
																				{ model: Clase, as: 'tamanoPapelNotaVenta' },

																				{ model: Clase, as: 'tamanoPapelFacturaServicio' },
																				{ model: Clase, as: 'tamanoPapelNotaTraspaso' },
																				{ model: Clase, as: 'tamanoPapelNotaBaja' },
																				{ model: Clase, as: 'tamanoPapelNotaPedido' },
																				{ model: Clase, as: 'tamanoPapelCierreCaja' },
																				{ model: Clase, as: 'formatoPapelFactura' },
																				{ model: Clase, as: 'formatoColorFactura' },
																				{ model: Clase, as: 'formatoConFirmaFactura' },
																				{ model: Clase, as: 'formatoPapelFacturaServicio' },
																				{ model: Clase, as: 'formatoColorFacturaServicio' },
																				{ model: Clase, as: 'tipoConfiguracion' },
																				{ model: Clase, as: 'formatoPapelNotaVenta' },
																				{ model: Clase, as: 'formatoColorNotaVenta' },
																				{ model: Clase, as: 'tipoConfiguracionNotaVenta' },
																				{ model: Clase, as: 'formatoConFirmaNotaVenta' },
																				{ model: Clase, as: 'formatoPapelNotaTraspaso' },
																				{ model: Clase, as: 'formatoColorNotaTraspaso' },
																				{ model: Clase, as: 'tipoConfiguracionNotaTraspaso' },
																				{ model: Clase, as: 'formatoPapelNotaBaja' },
																				{ model: Clase, as: 'formatoColorNotaBaja' },
																				{ model: Clase, as: 'tipoConfiguracionNotaBaja' }]
																			}).then(function (configuracionFactura) {
																				var promises = [];
																				venta.configuracion = configuracionFactura;
																				venta.detallesVenta.forEach(function (detalleVenta, index, array) {
																					promises.push(calcularCostosIngresos(detalleVenta, movimientoIngresoCreado, venta.almacenDestino.id, venta, t));
																					promises.push(crearDetalleVenta(movimientoCreado, ventaCreada, detalleVenta, detalleVenta.precio_unitario, detalleVenta.importe, detalleVenta.importe_dolares, detalleVenta.total, detalleVenta.total_dolares, index, array, res, venta, t, sucursal));
																				});
																				return Promise.all(promises);
																			});
																		}
																	});
																});
															});
														});
													} else {
														return ConfiguracionGeneralFactura.find({
															where: {
																id_empresa: venta.id_empresa
															},
															transaction: t,
															include: [{ model: Clase, as: 'impresionFactura' },
															{ model: Clase, as: 'tipoFacturacion' },
															{ model: Clase, as: 'tamanoPapelFactura' },
															{ model: Clase, as: 'tituloFactura' },
															{ model: Clase, as: 'subtituloFactura' },
															{ model: Clase, as: 'tamanoPapelNotaVenta' },

															{ model: Clase, as: 'tamanoPapelFacturaServicio' },
															{ model: Clase, as: 'tamanoPapelNotaTraspaso' },
															{ model: Clase, as: 'tamanoPapelNotaBaja' },
															{ model: Clase, as: 'tamanoPapelNotaPedido' },
															{ model: Clase, as: 'tamanoPapelCierreCaja' },
															{ model: Clase, as: 'formatoPapelFactura' },
															{ model: Clase, as: 'formatoColorFactura' },
															{ model: Clase, as: 'formatoConFirmaFactura' },
															{ model: Clase, as: 'formatoPapelFacturaServicio' },
															{ model: Clase, as: 'formatoColorFacturaServicio' },
															{ model: Clase, as: 'tipoConfiguracion' },
															{ model: Clase, as: 'formatoPapelNotaVenta' },
															{ model: Clase, as: 'formatoColorNotaVenta' },
															{ model: Clase, as: 'tipoConfiguracionNotaVenta' },
															{ model: Clase, as: 'formatoConFirmaNotaVenta' },
															{ model: Clase, as: 'formatoPapelNotaTraspaso' },
															{ model: Clase, as: 'formatoColorNotaTraspaso' },
															{ model: Clase, as: 'tipoConfiguracionNotaTraspaso' },
															{ model: Clase, as: 'formatoPapelNotaBaja' },
															{ model: Clase, as: 'formatoColorNotaBaja' },
															{ model: Clase, as: 'tipoConfiguracionNotaBaja' }]
														}).then(function (configuracionGeneralFactura) {
															if (configuracionGeneralFactura.usar) {
																var promises = [];
																venta.configuracion = configuracionGeneralFactura;
																return GestionOrdenReposicion.update({
																	id_venta: ventaCreada.id
																}, { where: { id: venta.id_orden_reposicion }, transaction: t }).then(function (Actualizado) {
																	venta.detallesVenta.forEach(function (detalleVenta, index, array) {
																		//	promises.push(calcularCostosIngresos(detalleVenta, movimientoIngresoCreado, venta.almacenDestino.id, venta, t));
																		promises.push(crearDetalleVenta(movimientoCreado, ventaCreada, detalleVenta, detalleVenta.precio_unitario, detalleVenta.importe, detalleVenta.importe_dolares, detalleVenta.total, detalleVenta.total_dolares, index, array, res, venta, t, sucursal));
																	});

																	return Promise.all(promises);
																});

															} else {
																return ConfiguracionFactura.find({
																	where: {
																		id_sucursal: venta.sucursal.id
																	},
																	transaction: t,
																	include: [{ model: Clase, as: 'impresionFactura' },
																	{ model: Clase, as: 'tipoFacturacion' },
																	{ model: Clase, as: 'tamanoPapelFactura' },
																	{ model: Clase, as: 'tituloFactura' },
																	{ model: Clase, as: 'subtituloFactura' },
																	{ model: Clase, as: 'tamanoPapelNotaVenta' },

																	{ model: Clase, as: 'tamanoPapelFacturaServicio' },
																	{ model: Clase, as: 'tamanoPapelNotaTraspaso' },
																	{ model: Clase, as: 'tamanoPapelNotaBaja' },
																	{ model: Clase, as: 'tamanoPapelNotaPedido' },
																	{ model: Clase, as: 'tamanoPapelCierreCaja' },
																	{ model: Clase, as: 'formatoPapelFactura' },
																	{ model: Clase, as: 'formatoColorFactura' },
																	{ model: Clase, as: 'formatoConFirmaFactura' },
																	{ model: Clase, as: 'formatoPapelFacturaServicio' },
																	{ model: Clase, as: 'formatoColorFacturaServicio' },
																	{ model: Clase, as: 'tipoConfiguracion' },
																	{ model: Clase, as: 'formatoPapelNotaVenta' },
																	{ model: Clase, as: 'formatoColorNotaVenta' },
																	{ model: Clase, as: 'tipoConfiguracionNotaVenta' },
																	{ model: Clase, as: 'formatoConFirmaNotaVenta' },
																	{ model: Clase, as: 'formatoPapelNotaTraspaso' },
																	{ model: Clase, as: 'formatoColorNotaTraspaso' },
																	{ model: Clase, as: 'tipoConfiguracionNotaTraspaso' },
																	{ model: Clase, as: 'formatoPapelNotaBaja' },
																	{ model: Clase, as: 'formatoColorNotaBaja' },
																	{ model: Clase, as: 'tipoConfiguracionNotaBaja' }]
																}).then(function (configuracionFactura) {
																	var promises = [];
																	venta.configuracion = configuracionFactura;
																	return GestionOrdenReposicion.update({
																		id_venta: ventaCreada.id
																	}, { where: { id: venta.id_orden_reposicion }, transaction: t }).then(function (Actualizado) {
																		venta.detallesVenta.forEach(function (detalleVenta, index, array) {
																			//	promises.push(calcularCostosIngresos(detalleVenta, movimientoIngresoCreado, venta.almacenDestino.id, venta, t));
																			promises.push(crearDetalleVenta(movimientoCreado, ventaCreada, detalleVenta, detalleVenta.precio_unitario, detalleVenta.importe, detalleVenta.importe_dolares, detalleVenta.total, detalleVenta.total_dolares, index, array, res, venta, t, sucursal));
																		});

																		return Promise.all(promises);
																	});
																});
															}
														});

													}
												});
											});
										});

									});
								} else {
									return Venta.create({
										id_almacen: venta.almacen.id,
										id_movimiento: movimientoCreado.id,
										fecha: venta.fecha,
										importe: venta.importe,
										importe_dolares: venta.importe_dolares,
										total: venta.total,
										total_dolares: venta.total_dolares,
										id_usuario: venta.id_usuario,
										activa: true,
										id_almacen_traspaso: venta.almacenDestino.id,
										factura: venta.factura,
										observacion: venta.observacion,
										ver_dolares: venta.ver_dolares,
										observacion_traspaso: venta.observacion_traspaso || ''
									}, { transaction: t }).then(function (ventaCreada) {
										req.body.id_venta = ventaCreada.id
										return Sucursal.update({
											nota_traspaso_correlativo: (venta.factura + 1)
										}, {
											where: { id: venta.sucursal.id },
											transaction: t
										}).then(function (correlativoActualizada) {
											return Tipo.find({
												where: { nombre_corto: Diccionario.MOV_ING },
												transaction: t
											}).then(function (tipoMovimiento) {
												return Clase.find({
													where: { nombre_corto: Diccionario.ING_TRASPASO },
													transaction: t
												}).then(function (conceptoMovimiento) {
													return Movimiento.create({
														id_tipo: tipoMovimiento.id,
														id_clase: conceptoMovimiento.id,
														id_almacen: venta.almacenDestino.id,
														fecha: venta.fecha
													}, { transaction: t }).then(function (movimientoIngresoCreado) {
														return ConfiguracionGeneralFactura.find({
															where: {
																id_empresa: venta.id_empresa
															},
															transaction: t,
															include: [{ model: Clase, as: 'impresionFactura' },
															{ model: Clase, as: 'tipoFacturacion' },
															{ model: Clase, as: 'tamanoPapelFactura' },
															{ model: Clase, as: 'tituloFactura' },
															{ model: Clase, as: 'subtituloFactura' },
															{ model: Clase, as: 'tamanoPapelNotaVenta' },

															{ model: Clase, as: 'tamanoPapelFacturaServicio' },
															{ model: Clase, as: 'tamanoPapelNotaTraspaso' },
															{ model: Clase, as: 'tamanoPapelNotaBaja' },
															{ model: Clase, as: 'tamanoPapelNotaPedido' },
															{ model: Clase, as: 'tamanoPapelCierreCaja' },
															{ model: Clase, as: 'formatoPapelFactura' },
															{ model: Clase, as: 'formatoColorFactura' },
															{ model: Clase, as: 'formatoConFirmaFactura' },
															{ model: Clase, as: 'formatoPapelFacturaServicio' },
															{ model: Clase, as: 'formatoColorFacturaServicio' },
															{ model: Clase, as: 'tipoConfiguracion' },
															{ model: Clase, as: 'formatoPapelNotaVenta' },
															{ model: Clase, as: 'formatoColorNotaVenta' },
															{ model: Clase, as: 'tipoConfiguracionNotaVenta' },
															{ model: Clase, as: 'formatoConFirmaNotaVenta' },
															{ model: Clase, as: 'formatoPapelNotaTraspaso' },
															{ model: Clase, as: 'formatoColorNotaTraspaso' },
															{ model: Clase, as: 'tipoConfiguracionNotaTraspaso' },
															{ model: Clase, as: 'formatoPapelNotaBaja' },
															{ model: Clase, as: 'formatoColorNotaBaja' },
															{ model: Clase, as: 'tipoConfiguracionNotaBaja' }]
														}).then(function (configuracionGeneralFactura) {
															if (configuracionGeneralFactura.usar) {
																var promises = [];
																venta.configuracion = configuracionGeneralFactura;

																if (venta.detallesVenta[0] == null) {
																	venta.detallesVenta.splice(0, 1);
																}

																venta.detallesVenta.forEach(function (detalleVenta, index, array) {
																	promises.push(calcularCostosIngresos(detalleVenta, movimientoIngresoCreado, venta.almacenDestino.id, venta, t));
																	promises.push(crearDetalleVenta(movimientoCreado, ventaCreada, detalleVenta, detalleVenta.precio_unitario, detalleVenta.importe, detalleVenta.importe_dolares, detalleVenta.total, detalleVenta.total_dolares, index, array, res, venta, t, sucursal));
																});
																return Promise.all(promises);
															} else {
																return ConfiguracionFactura.find({
																	where: {
																		id_sucursal: venta.sucursal.id
																	},
																	transaction: t,
																	include: [{ model: Clase, as: 'impresionFactura' },
																	{ model: Clase, as: 'tipoFacturacion' },
																	{ model: Clase, as: 'tamanoPapelFactura' },
																	{ model: Clase, as: 'tituloFactura' },
																	{ model: Clase, as: 'subtituloFactura' },
																	{ model: Clase, as: 'tamanoPapelNotaVenta' },

																	{ model: Clase, as: 'tamanoPapelFacturaServicio' },
																	{ model: Clase, as: 'tamanoPapelNotaTraspaso' },
																	{ model: Clase, as: 'tamanoPapelNotaBaja' },
																	{ model: Clase, as: 'tamanoPapelNotaPedido' },
																	{ model: Clase, as: 'tamanoPapelCierreCaja' },
																	{ model: Clase, as: 'formatoPapelFactura' },
																	{ model: Clase, as: 'formatoColorFactura' },
																	{ model: Clase, as: 'formatoConFirmaFactura' },
																	{ model: Clase, as: 'formatoPapelFacturaServicio' },
																	{ model: Clase, as: 'formatoColorFacturaServicio' },
																	{ model: Clase, as: 'tipoConfiguracion' },
																	{ model: Clase, as: 'formatoPapelNotaVenta' },
																	{ model: Clase, as: 'formatoColorNotaVenta' },
																	{ model: Clase, as: 'tipoConfiguracionNotaVenta' },
																	{ model: Clase, as: 'formatoConFirmaNotaVenta' },
																	{ model: Clase, as: 'formatoPapelNotaTraspaso' },
																	{ model: Clase, as: 'formatoColorNotaTraspaso' },
																	{ model: Clase, as: 'tipoConfiguracionNotaTraspaso' },
																	{ model: Clase, as: 'formatoPapelNotaBaja' },
																	{ model: Clase, as: 'formatoColorNotaBaja' },
																	{ model: Clase, as: 'tipoConfiguracionNotaBaja' }]
																}).then(function (configuracionFactura) {
																	var promises = [];
																	venta.configuracion = configuracionFactura;
																	venta.detallesVenta.forEach(function (detalleVenta, index, array) {
																		promises.push(calcularCostosIngresos(detalleVenta, movimientoIngresoCreado, venta.almacenDestino.id, venta, t));
																		promises.push(crearDetalleVenta(movimientoCreado, ventaCreada, detalleVenta, detalleVenta.precio_unitario, detalleVenta.importe, detalleVenta.importe_dolares, detalleVenta.total, detalleVenta.total_dolares, index, array, res, venta, t, sucursal));
																	});
																	return Promise.all(promises);
																});
															}
														});
													});
												});
											});
										});
									});
								}
							});
						} else if (movimiento == Diccionario.EGRE_AJUSTE) {

						}
					});
				});
			}
		}).then(function (result) {
			//console.log(result);
			//var resV = (result.length ? (result[0].length ? (result[0][0].length ? (result[0][0][0].length ? result[0][0][0][0] : result[0][0][0]) : result[0][0]) : result[0]) : result);
			res.json({ venta: req.body });
		}).catch(function (err) {
			res.json({ hasError: true, message: err.stack });
		});
	}

	router.route('/ventas')
		.post(ensureAuthorizedlogged, function (req, res) {
			var movimiento = req.body.movimiento.nombre_corto;
			var venta = req.body;
			Sucursal.find({
				where: {
					id: venta.sucursal.id,
					activo: true
				}
			}).then((suc) => {
				if (!suc) return res.json({ mensaje: 'Sucursal Deshabilitada, no se puede realizar cambios.', message: 'Sucursal Deshabilitada, no se puede realizar cambios.', hasErr: true, hasError: true })
				if (movimiento == Diccionario.EGRE_SERVICIO) {
					crearSalida(req, res);
				} else {
					// validando inventarios disponibles antes de guardar ==============
					var detallesNoValidos = ["<span style='color:#dd3333'>No cuenta con la cantidad de inventarios disponibles</span><br/>"];
					venta.detallesVenta.forEach(function (detalleVenta, index, array) {
						if (detalleVenta.producto.activar_inventario) {
							if (detalleVenta.costos.length > 1) {
								Inventario.findAll({
									where: { id_producto: detalleVenta.producto.id, id_almacen: venta.almacen.id, cantidad: { $gt: 0 } },
									attributes: [[sequelize.fn('sum', sequelize.col('cantidad')), 'cantidadTotal']],
									group: ["`inv_inventario`.`producto`"],
									raw: true
								}).then(function (inventarios) {
									var sumaTotalInventarios = inventarios.length > 0 ? inventarios[0].cantidadTotal : 0;
									if (detalleVenta.cantidad > sumaTotalInventarios) {
										detallesNoValidos.push("<span style='font-size: 12px;'>" + detalleVenta.producto.nombre + "</span><span style='font-size: 12px;color:#FF892A'> solicitada: " + detalleVenta.cantidad + "</span><span style='font-size: 12px;color:#dd3333'> disponible: " + sumaTotalInventarios + "</span><br/>");
									}

									if (index === (array.length - 1)) {
										if (detallesNoValidos.length == 1) {
											crearSalida(req, res);
										} else {
											res.json({ hasError: true, message: "", detalles: detallesNoValidos });
										}
									}
								});
							} else {
								Inventario.find({
									where: {
										id: detalleVenta.costos[0].id
									}
								}).then(function (inventario) {
									if (detalleVenta.cantidad > inventario.cantidad) {
										detallesNoValidos.push("<span style='font-size: 12px;'>" + detalleVenta.producto.nombre + "</span><span style='font-size: 12px;color:#FF892A'> solicitada: " + detalleVenta.cantidad + "</span><span style='font-size: 12px;color:#dd3333'> disponible: " + inventario.cantidad + "</span><br/>");
									}

									if (index === (array.length - 1)) {
										if (detallesNoValidos.length == 1) {
											crearSalida(req, res);
										} else {
											res.json({ hasError: true, message: "", detalles: detallesNoValidos });
										}
									}
								})
							}
						} else {
							if (index === (array.length - 1)) {
								crearSalida(req, res);
							}
						}

					});
				}
			}).catch((err) => {
				res.json({ mensaje: err.stack, message: err.stack, hasErr: true, hasError: true })
			})


		});

	function ActualizarVenta(venta, res, idCliente, movimientoCreado, dosificacion, esFactura, sucursal, t, empresaEncontrada) {
		return Venta.update({
			importe: venta.importe ? venta.importe : 0,
			importe_dolares: venta.importe_dolares ? venta.importe_dolares : 0,
			id_tipo_pago: venta.tipoPago ? venta.tipoPago.id : null,
			dias_credito: venta.dias_credito ? venta.dias_credito : null,
			a_cuenta: venta.a_cuenta ? venta.a_cuenta : null,
			a_cuenta_dolares: venta.a_cuenta_dolares ? venta.a_cuenta_dolares : null,
			saldo: venta.saldo,
			saldo_dolares: venta.saldo_dolares,
			total: venta.total,
			total_dolares: venta.total_dolares ? venta.total_dolares : 0,
			total_descuento: venta.total_descuento,
			total_descuento_dolares: venta.total_descuento_dolares,
			total_recargo: venta.total_recargo,
			total_recargo_dolares: venta.total_recargo_dolares,
			total_ice: venta.total_ice,
			total_ice_dolares: venta.total_ice_dolares,
			total_exento: venta.total_exento,
			total_excento_dolares: venta.total_excento_dolares,
			//id_usuario: venta.id_usuario,
			activa: true,
			pagado: venta.pagado,
			pagado_dolares: venta.pagado_dolares,
			cambio: venta.cambio,
			cambio_dolares: venta.cambio_dolares,
			pedido: venta.pedido,
			numero_tarjeta_credito: venta.numero_tarjeta_credito ? venta.numero_tarjeta_credito : null,
			monto_tarjeta_credito: venta.monto_tarjeta_credito ? venta.monto_tarjeta_credito : 0,
			//despachado: venta.despachado,
			id_vendedor: (venta.vendedor ? venta.vendedor.id : null)
		}, { transaction: t, where: { id: venta.id } }).then(function (ventaActualizada) {
			var promisesVenta = [];
			promisesVenta.unshift(ConfiguracionGeneralFactura.find({
				where: {
					id_empresa: venta.id_empresa
				}, transaction: t,
				include: [{ model: Clase, as: 'impresionFactura' },
				{ model: Clase, as: 'tipoFacturacion' },
				{ model: Clase, as: 'tamanoPapelFactura' },
				{ model: Clase, as: 'tituloFactura' },
				{ model: Clase, as: 'subtituloFactura' },
				{ model: Clase, as: 'tamanoPapelNotaVenta' },

				{ model: Clase, as: 'tamanoPapelFacturaServicio' },
				{ model: Clase, as: 'tamanoPapelNotaTraspaso' },
				{ model: Clase, as: 'tamanoPapelNotaBaja' },
				{ model: Clase, as: 'tamanoPapelNotaPedido' },
				{ model: Clase, as: 'tamanoPapelCierreCaja' },
				{ model: Clase, as: 'formatoPapelFactura' },
				{ model: Clase, as: 'formatoColorFactura' },
				{ model: Clase, as: 'formatoConFirmaFactura' },
				{ model: Clase, as: 'formatoPapelFacturaServicio' },
				{ model: Clase, as: 'formatoColorFacturaServicio' },
				{ model: Clase, as: 'tipoConfiguracion' },
				{ model: Clase, as: 'formatoPapelNotaVenta' },
				{ model: Clase, as: 'formatoColorNotaVenta' },
				{ model: Clase, as: 'tipoConfiguracionNotaVenta' },
				{ model: Clase, as: 'formatoConFirmaNotaVenta' },
				{ model: Clase, as: 'formatoPapelNotaTraspaso' },
				{ model: Clase, as: 'formatoColorNotaTraspaso' },
				{ model: Clase, as: 'tipoConfiguracionNotaTraspaso' },
				{ model: Clase, as: 'formatoPapelNotaBaja' },
				{ model: Clase, as: 'formatoColorNotaBaja' },
				{ model: Clase, as: 'tipoConfiguracionNotaBaja' }]
			}).then(function (configuracionGeneralFactura) {

				if (configuracionGeneralFactura.usar) {
					var promises = [];
					venta.configuracion = configuracionGeneralFactura;
					venta.detallesVenta.forEach(function (detalleVenta, index, array) {
						if (venta.ordenReposicion) {
							promises.push(actualizarDetalleVentaTraspasoOrdenRepo(movimientoCreado, venta, detalleVenta, detalleVenta.precio_unitario, detalleVenta.importe, detalleVenta.importe_dolares, detalleVenta.total, detalleVenta.total_dolares, index, array, res, venta, t, sucursal, empresaEncontrada));
						} else {
							promises.push(actualizarDetalleVenta(movimientoCreado, venta, detalleVenta, detalleVenta.precio_unitario, detalleVenta.importe, detalleVenta.importe_dolares, detalleVenta.total, detalleVenta.total_dolares, index, array, res, venta, t, sucursal, empresaEncontrada));
						}
					});
					return Promise.all(promises)
				} else {
					return ConfiguracionFactura.find({
						where: {
							id_sucursal: venta.sucursal.id
						},
						transaction: t,
						include: [{ model: Clase, as: 'impresionFactura' },
						{ model: Clase, as: 'tipoFacturacion' },
						{ model: Clase, as: 'tamanoPapelFactura' },
						{ model: Clase, as: 'tituloFactura' },
						{ model: Clase, as: 'subtituloFactura' },
						{ model: Clase, as: 'tamanoPapelNotaVenta' },

						{ model: Clase, as: 'tamanoPapelFacturaServicio' },
						{ model: Clase, as: 'tamanoPapelNotaTraspaso' },
						{ model: Clase, as: 'tamanoPapelNotaBaja' },
						{ model: Clase, as: 'tamanoPapelNotaPedido' },
						{ model: Clase, as: 'tamanoPapelCierreCaja' },
						{ model: Clase, as: 'formatoPapelFactura' },
						{ model: Clase, as: 'formatoColorFactura' },
						{ model: Clase, as: 'formatoConFirmaFactura' },
						{ model: Clase, as: 'formatoPapelFacturaServicio' },
						{ model: Clase, as: 'formatoColorFacturaServicio' },
						{ model: Clase, as: 'tipoConfiguracion' },
						{ model: Clase, as: 'formatoPapelNotaVenta' },
						{ model: Clase, as: 'formatoColorNotaVenta' },
						{ model: Clase, as: 'tipoConfiguracionNotaVenta' },
						{ model: Clase, as: 'formatoConFirmaNotaVenta' },
						{ model: Clase, as: 'formatoPapelNotaTraspaso' },
						{ model: Clase, as: 'formatoColorNotaTraspaso' },
						{ model: Clase, as: 'tipoConfiguracionNotaTraspaso' },
						{ model: Clase, as: 'formatoPapelNotaBaja' },
						{ model: Clase, as: 'formatoColorNotaBaja' },
						{ model: Clase, as: 'tipoConfiguracionNotaBaja' }]
					}).then(function (configuracionFactura) {
						var promises = [];
						venta.configuracion = configuracionFactura;
						venta.detallesVenta.forEach(function (detalleVenta, index, array) {
							if (venta.ordenReposicion) {
								promises.push(actualizarDetalleVentaTraspasoOrdenRepo(movimientoCreado, venta, detalleVenta, detalleVenta.precio_unitario, detalleVenta.importe, detalleVenta.importe_dolares, detalleVenta.total, detalleVenta.total_dolares, index, array, res, venta, t, sucursal, empresaEncontrada));
							} else {
								promises.push(actualizarDetalleVenta(movimientoCreado, venta, detalleVenta, detalleVenta.precio_unitario, detalleVenta.importe, detalleVenta.importe_dolares, detalleVenta.total, detalleVenta.total_dolares, index, array, res, venta, t, sucursal, empresaEncontrada));
							}
						});
						return Promise.all(promises)
					}).catch(function (err) {
						return new Promise(function (fulfill, reject) {
							reject(err);
						});
					});
				}
			}).catch(function (err) {
				return new Promise(function (fulfill, reject) {
					reject(err);
				});
			}));
			return Promise.all(promisesVenta);
		}).catch(function (err) {
			return new Promise(function (fulfill, reject) {
				reject(err);
			});
		});
	}
	function actualizarDetalleVentaTraspasoOrdenRepo(movimientoCreado, ventaCreada, detalleVenta, precio_unitario, importe, importe_dolares, total, total_dolares, index, array, res, venta, t, sucursal, empresaEncontrada) {
		if (!detalleVenta.id) {
			return DetalleVenta.create({
				id_venta: ventaCreada.id,
				id_producto: detalleVenta.producto.id,
				precio_unitario: detalleVenta.precio_unitario ? detalleVenta.precio_unitario : 0,
				precio_unitario_dolares: detalleVenta.precio_unitario_dolares ? detalleVenta.precio_unitario_dolares : 0,
				cantidad: detalleVenta.cantidad,
				importe: importe ? importe : 0,
				importe_dolares: importe_dolares ? importe_dolares : 0,
				descuento: detalleVenta.descuento,
				recargo: detalleVenta.recargo,
				ice: detalleVenta.ice,
				excento: detalleVenta.excento,
				descuento_dolares: detalleVenta.descuento_dolares,
				recargo_dolares: detalleVenta.recargo_dolares,
				ice_dolares: detalleVenta.ice_dolares,
				excento_dolares: detalleVenta.excento_dolares,
				tipo_descuento: detalleVenta.tipo_descuento,
				tipo_recargo: detalleVenta.tipo_recargo,
				total: total ? total : 0,
				total_dolares: total_dolares ? total_dolares : 0,
				fecha_vencimiento: detalleVenta.fecha_vencimiento,
				lote: detalleVenta.lote,
				id_inventario: (detalleVenta.costos.length > 0) ? detalleVenta.costos[0].id : null,
				observaciones: detalleVenta.observaciones
			}, { transaction: t }).then(function (detalleVentaCreada) {
			}).catch(function (err) {
				return new Promise(function (fulfill, reject) {
					reject(err);
				});
			});
		}
	}
	function actualizarDetalleVenta(movimientoCreado, ventaCreada, detalleVenta, precio_unitario, importe, importe_dolares, total, total_dolares, index, array, res, venta, t, sucursal, empresaEncontrada) {

		if (detalleVenta.eliminado) {
			return DetalleMovimiento.destroy({
				where: {
					id_inventario: detalleVenta.id_inventario,
					id_movimiento: venta.movimientoActual.id,
					id_producto: detalleVenta.producto ? detalleVenta.producto.id : null
				}, transaction: t
			}).then(function (detalleMovimientoEliminado) {
				return DetalleVenta.destroy({
					where: {
						id: detalleVenta.id
					}, transaction: t
				}).then(function (detalleCompraEliminado) {
					return Inventario.find({
						where: {
							id: detalleVenta.id_inventario
						}, transaction: t
					}).then(function (inventarioEncontrado) {
						inventarioEncontrado.cantidad += detalleVenta.cantidad
						return Inventario.update(
							{
								cantidad: inventarioEncontrado.cantidad
							}, {
							where: {
								id: detalleVenta.id_inventario
							}, transaction: t
						}).then(function (InventarioActualizado) {

						}).catch(function (err) {
							return new Promise(function (fulfill, reject) {
								reject(err);
							});
						});
					}).catch(function (err) {
						return new Promise(function (fulfill, reject) {
							reject(err);
						});
					});
				}).catch(function (err) {
					return new Promise(function (fulfill, reject) {
						reject(err);
					});
				});
			}).catch(function (err) {
				return new Promise(function (fulfill, reject) {
					reject(err);
				});
			});
		} else if (detalleVenta.id) {
		} else {
			return DetalleVenta.create({
				id_venta: ventaCreada.id,
				id_producto: detalleVenta.producto.id,
				precio_unitario: detalleVenta.precio_unitario ? detalleVenta.precio_unitario : 0,
				precio_unitario_dolares: detalleVenta.precio_unitario_dolares ? detalleVenta.precio_unitario_dolares : 0,
				cantidad: detalleVenta.cantidad,
				importe: importe ? importe : 0,
				importe_dolares: importe_dolares ? importe_dolares : 0,
				descuento: detalleVenta.descuento,
				recargo: detalleVenta.recargo,
				ice: detalleVenta.ice,
				excento: detalleVenta.excento,
				descuento_dolares: detalleVenta.descuento_dolares,
				recargo_dolares: detalleVenta.recargo_dolares,
				ice_dolares: detalleVenta.ice_dolares,
				excento_dolares: detalleVenta.excento_dolares,
				tipo_descuento: detalleVenta.tipo_descuento,
				tipo_recargo: detalleVenta.tipo_recargo,
				total: total ? total : 0,
				total_dolares: total_dolares ? total_dolares : 0,
				fecha_vencimiento: detalleVenta.fecha_vencimiento,
				lote: detalleVenta.lote,
				id_inventario: (detalleVenta.costos.length > 0) ? detalleVenta.costos[0].id : null,
				observaciones: detalleVenta.observaciones
			}, { transaction: t }).then(function (detalleVentaCreada) {
				console.log("la sucursalllllll ============================================== ", sucursal);
				if (empresaEncontrada.dataValues.usar_peps) {
					if (detalleVenta.producto.tipoProducto.nombre_corto == Diccionario.TIPO_PRODUCTO_BASE) {
						return calcularCostosEgresos(detalleVenta, detalleVenta.producto, detalleVenta.cantidad, detalleVenta.costos,
							movimientoCreado, index, array, res, venta, t, detalleVentaCreada);
					} else if (detalleVenta.producto.tipoProducto.nombre_corto == Diccionario.TIPO_PRODUCTO_INTERMEDIO) {
						var promises = [];
						for (var i = 0; i < detalleVenta.producto.productosBase.length; i++) {
							if ((i + 1) == detalleVenta.producto.productosBase.length) {
								promises.push(calcularCostosEgresos(detalleVenta, detalleVenta.producto.productosBase[i].productoBase, detalleVenta.producto.productosBase[i].formulacion * detalleVenta.cantidad, detalleVenta.producto.productosBase[i].productoBase.inventarios,
									movimientoCreado, index, array, res, venta, t, detalleVentaCreada));
							} else {
								promises.push(calcularCostosEgresos(detalleVenta, detalleVenta.producto.productosBase[i].productoBase, detalleVenta.producto.productosBase[i].formulacion * detalleVenta.cantidad, detalleVenta.producto.productosBase[i].productoBase.inventarios,
									movimientoCreado, index - 1, array, res, venta, t, detalleVentaCreada));
							}
						}
						return Promise.all(promises);
					} else {
						var promises = [];
						for (var i = 0; i < detalleVenta.producto.productosBase.length; i++) {
							if (detalleVenta.producto.productosBase[i].productoBase.tipoProducto.nombre_corto == Diccionario.TIPO_PRODUCTO_BASE) {
								if ((i + 1) == detalleVenta.producto.productosBase.length) {
									promises.push(calcularCostosEgresos(detalleVenta, detalleVenta.producto.productosBase[i].productoBase, detalleVenta.producto.productosBase[i].formulacion * detalleVenta.cantidad, detalleVenta.producto.productosBase[i].productoBase.inventarios,
										movimientoCreado, index, array, res, venta, t, detalleVentaCreada));
								} else {
									promises.push(calcularCostosEgresos(detalleVenta, detalleVenta.producto.productosBase[i].productoBase, detalleVenta.producto.productosBase[i].formulacion * detalleVenta.cantidad, detalleVenta.producto.productosBase[i].productoBase.inventarios,
										movimientoCreado, index - 1, array, res, venta, t, detalleVentaCreada));
								}
							} else if (detalleVenta.producto.productosBase[i].productoBase.tipoProducto.nombre_corto == Diccionario.TIPO_PRODUCTO_INTERMEDIO) {
								var innerpromises = [];
								for (var j = 0; j < detalleVenta.producto.productosBase[i].productoBase.productosBase.length; j++) {
									if ((j + 1) == detalleVenta.producto.productosBase[i].productoBase.productosBase.length) {
										innerpromises.push(calcularCostosEgresos(detalleVenta, detalleVenta.producto.productosBase[i].productoBase.productosBase[j].productoBase,
											detalleVenta.producto.productosBase[i].formulacion * detalleVenta.producto.productosBase[i].productoBase.productosBase[j].formulacion * detalleVenta.cantidad,
											detalleVenta.producto.productosBase[i].productoBase.productosBase[j].productoBase.inventarios, movimientoCreado, index, array, res, venta, t, detalleVentaCreada));
									} else {
										innerpromises.push(calcularCostosEgresos(detalleVenta, detalleVenta.producto.productosBase[i].productoBase.productosBase[j].productoBase,
											detalleVenta.producto.productosBase[i].formulacion * detalleVenta.producto.productosBase[i].productoBase.productosBase[j].formulacion * detalleVenta.cantidad,
											detalleVenta.producto.productosBase[i].productoBase.productosBase[j].productoBase.inventarios, movimientoCreado, index - 1, array, res, venta, t, detalleVentaCreada));
									}
								}
								promises.push(Promise.all(innerpromises));
							}
						}
						return Promise.all(promises);
					}
				} else {
					if (detalleVenta.producto.tipoProducto.nombre_corto == Diccionario.TIPO_PRODUCTO_BASE) {
						return calcularCostosEgresosPonderado(detalleVenta, detalleVenta.producto, detalleVenta.cantidad, detalleVenta.costos,
							movimientoCreado, index, array, res, venta, t);
					} else if (detalleVenta.producto.tipoProducto.nombre_corto == Diccionario.TIPO_PRODUCTO_INTERMEDIO) {
						var promises = [];
						for (var i = 0; i < detalleVenta.producto.productosBase.length; i++) {
							if ((i + 1) == detalleVenta.producto.productosBase.length) {
								promises.push(calcularCostosEgresosPonderado(detalleVenta, detalleVenta.producto.productosBase[i].productoBase, detalleVenta.producto.productosBase[i].formulacion * detalleVenta.cantidad, detalleVenta.producto.productosBase[i].productoBase.inventarios,
									movimientoCreado, index, array, res, venta, t));
							} else {
								promises.push(calcularCostosEgresosPonderado(detalleVenta, detalleVenta.producto.productosBase[i].productoBase, detalleVenta.producto.productosBase[i].formulacion * detalleVenta.cantidad, detalleVenta.producto.productosBase[i].productoBase.inventarios,
									movimientoCreado, index - 1, array, res, venta, t));
							}
						}
						return Promise.all(promises);
					} else {
						var promises = [];
						for (var i = 0; i < detalleVenta.producto.productosBase.length; i++) {
							if (detalleVenta.producto.productosBase[i].productoBase.tipoProducto.nombre_corto == Diccionario.TIPO_PRODUCTO_BASE) {
								if ((i + 1) == detalleVenta.producto.productosBase.length) {
									promises.push(calcularCostosEgresosPonderado(detalleVenta, detalleVenta.producto.productosBase[i].productoBase, detalleVenta.producto.productosBase[i].formulacion * detalleVenta.cantidad, detalleVenta.producto.productosBase[i].productoBase.inventarios,
										movimientoCreado, index, array, res, venta, t));
								} else {
									promises.push(calcularCostosEgresosPonderado(detalleVenta, detalleVenta.producto.productosBase[i].productoBase, detalleVenta.producto.productosBase[i].formulacion * detalleVenta.cantidad, detalleVenta.producto.productosBase[i].productoBase.inventarios,
										movimientoCreado, index - 1, array, res, venta, t));
								}
							} else if (detalleVenta.producto.productosBase[i].productoBase.tipoProducto.nombre_corto == Diccionario.TIPO_PRODUCTO_INTERMEDIO) {
								var innerpromises = [];
								for (var j = 0; j < detalleVenta.producto.productosBase[i].productoBase.productosBase.length; j++) {
									if ((j + 1) == detalleVenta.producto.productosBase[i].productoBase.productosBase.length) {
										innerpromises.push(calcularCostosEgresosPonderado(detalleVenta, detalleVenta.producto.productosBase[i].productoBase.productosBase[j].productoBase,
											detalleVenta.producto.productosBase[i].formulacion * detalleVenta.producto.productosBase[i].productoBase.productosBase[j].formulacion * detalleVenta.cantidad,
											detalleVenta.producto.productosBase[i].productoBase.productosBase[j].productoBase.inventarios, movimientoCreado, index, array, res, venta, t));
									} else {
										innerpromises.push(calcularCostosEgresosPonderado(detalleVenta, detalleVenta.producto.productosBase[i].productoBase.productosBase[j].productoBase,
											detalleVenta.producto.productosBase[i].formulacion * detalleVenta.producto.productosBase[i].productoBase.productosBase[j].formulacion * detalleVenta.cantidad,
											detalleVenta.producto.productosBase[i].productoBase.productosBase[j].productoBase.inventarios, movimientoCreado, index - 1, array, res, venta, t));
									}
								}
								promises.push(Promise.all(innerpromises));
							}
						}
						return Promise.all(promises);
					}
				}
			}).catch(function (err) {
				return new Promise(function (fulfill, reject) {
					reject(err);
				});
			});
		}
	}
	function crearVenta(req, venta, res, idCliente, movimientoCreado, dosificacion, esFactura, sucursal, t) {
		return Venta.create({
			id_almacen: venta.almacen.id,
			id_cliente: idCliente,
			id_movimiento: movimientoCreado.id,
			id_actividad: venta.actividad.id,
			factura: venta.factura,
			autorizacion: venta.autorizacion,
			fecha: venta.fecha,
			codigo_control: venta.codigo_control,
			fecha_limite_emision: venta.fecha_limite_emision,
			importe: venta.importe ? venta.importe : 0,
			importe_dolares: venta.importe_dolares ? venta.importe_dolares : 0,
			id_tipo_pago: venta.tipoPago.id,
			dias_credito: venta.dias_credito,
			a_cuenta: venta.a_cuenta,
			saldo: venta.saldo,
			a_cuenta_dolares: venta.a_cuenta_dolares,
			saldo_dolares: venta.saldo_dolares,
			total: venta.total ? venta.total : 0,
			total_dolares: venta.total_dolares ? venta.total_dolares : 0,
			id_usuario: venta.id_usuario,
			activa: true,
			pagado: venta.pagado,
			pagado_dolares: venta.pagado_dolares,
			cambio: venta.cambio,
			cambio_dolares: venta.cambio_dolares,
			pedido: venta.pedido,
			despachado: venta.despachado,
			id_vendedor: (venta.vendedor ? venta.vendedor.id : null),
			observacion: venta.observacion,
			total_descuento: venta.total_descuento_general,
			total_descuento_dolares: venta.total_descuento_dolares,
			total_ice: venta.total_ice,
			total_ice_dolares: venta.total_ice_dolares,
			total_recargo: venta.total_recargo_general,
			total_recargo_dolares: venta.total_recargo_dolares,
			total_exento: venta.total_exento,
			total_excento_dolares: venta.total_excento_dolares,
			ver_dolares: venta.ver_dolares,
			id_mesero: venta.mesero ? venta.mesero.id : null,
			mesa: venta.mesa,
			mesa_activa: true,
			numero_tarjeta_credito: venta.numero_tarjeta_credito ? venta.numero_tarjeta_credito : null,
			monto_tarjeta_credito: venta.monto_tarjeta_credito ? venta.monto_tarjeta_credito : 0,
			usar_descuento_general: venta.usar_descuento_general,
			tipo_descuento: venta.tipo_descuento,
			descuento: venta.descuento,
			tipo_recargo: venta.tipo_recargo,
			recargo: venta.recargo,
			ice: venta.ice,
			excento: venta.excento,
			observacion_traspaso: venta.observacion_traspaso || ''
		}, { transaction: t }).then(function (ventaCreada) {
			req.body.id_venta = ventaCreada.id
			var promisesVenta = [];
			if (venta.mesero) {
				// var sucProm = Sucursal.update({
				// 	nota_venta_correlativo: (venta.factura + 1)
				// }, {
				// 		where: { id: venta.sucursal.id },
				// 		transaction: t
				// 	});
				// promisesVenta.push(sucProm);
			} else
				if (esFactura) {
					var dosProm = Dosificacion.update({
						correlativo: (venta.factura + 1)
					}, {
						where: { id: dosificacion.id },
						transaction: t
					});
					promisesVenta.push(dosProm);
				} else {
					var sucProm = Sucursal.update({
						nota_venta_correlativo: (venta.factura + 1)
					}, {
						where: { id: venta.sucursal.id },
						transaction: t
					});
					promisesVenta.push(sucProm);
				}

			if (sucursal.empresa.usar_pedidos) {
				var suc2Prom = Sucursal.update({
					pedido_correlativo: (venta.pedido + 1)
				}, {
					where: { id: venta.sucursal.id },
					transaction: t
				});
				promisesVenta.push(suc2Prom);
			}

			promisesVenta.unshift(ConfiguracionGeneralFactura.find({
				where: {
					id_empresa: venta.id_empresa
				},
				transaction: t,
				include: [{ model: Clase, as: 'impresionFactura' },
				{ model: Clase, as: 'tipoFacturacion' },
				{ model: Clase, as: 'tamanoPapelFactura' },
				{ model: Clase, as: 'tituloFactura' },
				{ model: Clase, as: 'subtituloFactura' },
				{ model: Clase, as: 'tamanoPapelNotaVenta' },

				{ model: Clase, as: 'tamanoPapelFacturaServicio' },
				{ model: Clase, as: 'tamanoPapelNotaTraspaso' },
				{ model: Clase, as: 'tamanoPapelNotaBaja' },
				{ model: Clase, as: 'tamanoPapelNotaPedido' },
				{ model: Clase, as: 'tamanoPapelCierreCaja' },
				{ model: Clase, as: 'formatoPapelFactura' },
				{ model: Clase, as: 'formatoColorFactura' },
				{ model: Clase, as: 'formatoConFirmaFactura' },
				{ model: Clase, as: 'formatoPapelFacturaServicio' },
				{ model: Clase, as: 'formatoColorFacturaServicio' },
				{ model: Clase, as: 'tipoConfiguracion' },
				{ model: Clase, as: 'formatoPapelNotaVenta' },
				{ model: Clase, as: 'formatoColorNotaVenta' },
				{ model: Clase, as: 'tipoConfiguracionNotaVenta' },
				{ model: Clase, as: 'formatoConFirmaNotaVenta' },
				{ model: Clase, as: 'formatoPapelNotaTraspaso' },
				{ model: Clase, as: 'formatoColorNotaTraspaso' },
				{ model: Clase, as: 'tipoConfiguracionNotaTraspaso' },
				{ model: Clase, as: 'formatoPapelNotaBaja' },
				{ model: Clase, as: 'formatoColorNotaBaja' },
				{ model: Clase, as: 'tipoConfiguracionNotaBaja' }]
			}).then(function (configuracionGeneralFactura) {
				venta.detallesVentaNoConsolidadas.forEach(function (detalleVentaNoConsolidada, index, array) {
					//crearDetalleVentaNoConsolidada(ventaCreada.id, detalleVentaNoConsolidada.producto.id, null, detalleVentaNoConsolidada);
				});
				if (configuracionGeneralFactura.usar) {
					return Sucursal.findAll({
						where: {
							id_empresa: venta.id_empresa,
							numero: 0
						}
					}).then(function (sucursalPrincipalEncontrada) {
						var promises = [];
						venta.sucursalPrincipal = sucursalPrincipalEncontrada;
						venta.configuracion = configuracionGeneralFactura;
						venta.detallesVenta.forEach(function (detalleVenta, index, array) {
							promises.push(crearDetalleVenta(movimientoCreado, ventaCreada, detalleVenta, detalleVenta.precio_unitario, detalleVenta.importe, detalleVenta.importe_dolares, detalleVenta.total, detalleVenta.total_dolares, index, array, res, venta, t, sucursal));
						});
						return Promise.all(promises)
					});
				} else {
					return ConfiguracionFactura.find({
						where: {
							id_sucursal: venta.sucursal.id
						},
						transaction: t,
						include: [{ model: Clase, as: 'impresionFactura' },
						{ model: Clase, as: 'tipoFacturacion' },
						{ model: Clase, as: 'tamanoPapelFactura' },
						{ model: Clase, as: 'tituloFactura' },
						{ model: Clase, as: 'subtituloFactura' },
						{ model: Clase, as: 'tamanoPapelNotaVenta' },

						{ model: Clase, as: 'tamanoPapelFacturaServicio' },
						{ model: Clase, as: 'tamanoPapelNotaTraspaso' },
						{ model: Clase, as: 'tamanoPapelNotaBaja' },
						{ model: Clase, as: 'tamanoPapelNotaPedido' },
						{ model: Clase, as: 'tamanoPapelCierreCaja' },
						{ model: Clase, as: 'formatoPapelFactura' },
						{ model: Clase, as: 'formatoColorFactura' },
						{ model: Clase, as: 'formatoConFirmaFactura' },
						{ model: Clase, as: 'formatoPapelFacturaServicio' },
						{ model: Clase, as: 'formatoColorFacturaServicio' },
						{ model: Clase, as: 'tipoConfiguracion' },
						{ model: Clase, as: 'formatoPapelNotaVenta' },
						{ model: Clase, as: 'formatoColorNotaVenta' },
						{ model: Clase, as: 'tipoConfiguracionNotaVenta' },
						{ model: Clase, as: 'formatoConFirmaNotaVenta' },
						{ model: Clase, as: 'formatoPapelNotaTraspaso' },
						{ model: Clase, as: 'formatoColorNotaTraspaso' },
						{ model: Clase, as: 'tipoConfiguracionNotaTraspaso' },
						{ model: Clase, as: 'formatoPapelNotaBaja' },
						{ model: Clase, as: 'formatoColorNotaBaja' },
						{ model: Clase, as: 'tipoConfiguracionNotaBaja' }]
					}).then(function (configuracionFactura) {
						return Sucursal.findAll({
							where: {
								id_empresa: venta.id_empresa,
								numero: 0
							}
						}).then(function (sucursalPrincipalEncontrada) {
							var promises = [];
							venta.sucursalPrincipal = sucursalPrincipalEncontrada;
							venta.configuracion = configuracionFactura;
							venta.detallesVenta.forEach(function (detalleVenta, index, array) {
								promises.push(crearDetalleVenta(movimientoCreado, ventaCreada, detalleVenta, detalleVenta.precio_unitario, detalleVenta.importe, detalleVenta.importe_dolares, detalleVenta.total, detalleVenta.total_dolares, index, array, res, venta, t, sucursal));
							});
							return Promise.all(promises)
						});

					});
				}
			}));
			return Promise.all(promisesVenta);
		});
	}

	function calcularCostosIngresos(detalleVenta, movimientoCreado, idAlmacen, traspaso, t) {
		var cantidadTotal = detalleVenta.cantidad;
		var promises = [];
		for (var i = 0; i < detalleVenta.costos.length; i++) {
			if (cantidadTotal > 0) {
				var cantidadParcial;
				if (cantidadTotal > detalleVenta.costos[i].cantidad) {
					cantidadParcial = detalleVenta.costos[i].cantidad;
					cantidadTotal = cantidadTotal - detalleVenta.costos[i].cantidad
				} else {
					cantidadParcial = cantidadTotal;
					cantidadTotal = 0;
				}

				if (cantidadParcial > 0) {
					promises.push(crearDetalleMovimientoIngresoYCrearInventario(movimientoCreado.id, idAlmacen, detalleVenta.producto.id,
						detalleVenta.costos[i].costo_unitario, detalleVenta.costos[i].costo_unitario_dolares, cantidadParcial, 0,
						0, 0, 0, 0, 0, 0, 0, 0, 0, (detalleVenta.costos[i].costo_unitario * cantidadParcial), (detalleVenta.costos[i].costo_unitario_dolares * cantidadParcial),
						detalleVenta.costos[i].fecha_vencimiento, detalleVenta.costos[i].lote, traspaso, t));
				}
			}
		}
		return Promise.all(promises);
	}
	function calcularCostosIngresosPonderado(detalleVenta, movimientoCreado, idAlmacen, traspaso, t) {
		var cantidadTotal = detalleVenta.cantidad;
		var promises = [];
		for (var i = 0; i < detalleVenta.costos.length; i++) {
			if (cantidadTotal > 0) {
				var cantidadParcial;
				if (cantidadTotal > detalleVenta.costos[i].cantidad) {
					cantidadParcial = detalleVenta.costos[i].cantidad;
					cantidadTotal = cantidadTotal - detalleVenta.costos[i].cantidad
				} else {
					cantidadParcial = cantidadTotal;
					cantidadTotal = 0;
				}

				if (cantidadParcial > 0) {
					promises.push(crearDetalleMovimientoIngresoYCrearInventario(movimientoCreado.id, idAlmacen, detalleVenta.producto.id,
						detalleVenta.costos[i].costo_unitario, cantidadParcial, 0,
						0, 0, 0, 0, 0, 0, 0, 0, 0, detalleVenta.costos[i].costo_unitario * cantidadParcial,
						detalleVenta.costos[i].fecha_vencimiento, detalleVenta.costos[i].lote, traspaso, t));
				}
			}
		}
		return Promise.all(promises);
	}

	function crearMovimientoEgresoYActualizarInventario(movimientoCreado, detalleVenta, producto, cantidad, inventarios, cantidadParcial, costo, index, array, i, res, datosVenta, t, detalleVentaCreada) {
		return DetalleMovimiento.create({
			id_movimiento: movimientoCreado.id,
			id_producto: producto.id,
			cantidad: cantidadParcial,
			costo_unitario: costo.costo_unitario ? costo.costo_unitario : 0,
			costo_unitario_dolares: costo.costo_unitario_dolares ? costo.costo_unitario_dolares : 0,
			importe: (cantidadParcial * (costo.costo_unitario ? costo.costo_unitario : 0)),
			importe_dolares: (cantidadParcial * (costo.costo_unitario_dolares ? costo.costo_unitario_dolares : 0)),
			total: (cantidadParcial * (costo.costo_unitario ? costo.costo_unitario : 0)),
			total_dolares: (cantidadParcial * (costo.costo_unitario_dolares ? costo.costo_unitario_dolares : 0)),
			descuento: ((detalleVenta.descuento / cantidad) * cantidadParcial),
			recargo: ((detalleVenta.recargo / cantidad) * cantidadParcial),
			ice: ((detalleVenta.ice / cantidad) * cantidadParcial),
			excento: ((detalleVenta.excento / cantidad) * cantidadParcial),
			descuento_dolares: ((detalleVenta.descuento_dolares / cantidad) * cantidadParcial),
			recargo_dolares: ((detalleVenta.recargo_dolares / cantidad) * cantidadParcial),
			ice_dolares: ((detalleVenta.ice_dolares / cantidad) * cantidadParcial),
			excento_dolares: ((detalleVenta.excento_dolares / cantidad) * cantidadParcial),
			tipo_descuento: detalleVenta.tipo_descuento,
			tipo_recargo: detalleVenta.tipo_recargo,
			fecha_vencimiento: detalleVenta.fecha_vencimiento,
			lote: detalleVenta.lote,
			id_inventario: costo.id
		}, { transaction: t }).then(function (detalleMovimientoCreado) {
			return DetalleVentaProductoFinal.create({
				id_detalle_venta: detalleVentaCreada.id,
				id_detalle_movimiento: detalleMovimientoCreado.id
			},
				{ transaction: t }).then(function (creado) {
					sequelize.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED }, function (tu) {
						return Inventario.find({
							where: {
								id: costo.id
							},
							transaction: tu,
							lock: tu.LOCK.UPDATE
						}).then(function (inventario) {
							return Inventario.update({
								cantidad: inventario.cantidad - cantidadParcial,
								costo_total: ((inventario.cantidad - cantidadParcial) * costo.costo_unitario),
								costo_total_dolares: ((inventario.cantidad - cantidadParcial) * (costo.costo_unitario_dolares ? costo.costo_unitario_dolares : 0))
							}, {
								where: {
									id: inventario.id
								},
								transaction: tu
							}).then(function (result) {
								contador++
								return new Promise(function (fulfill, reject) {
									fulfill(datosVenta);
								});
							});
						});
					}).then(function (result) {
						return new Promise(function (fulfill, reject) {
							fulfill(datosVenta);
						});
					}).catch(function (err) {
						return new Promise(function (fulfill, reject) {
							reject(err);
						});
					});
				}).catch(function (err) {
					return new Promise(function (fulfill, reject) {
						reject(err);
					});
				});
		}).catch(function (err) {
			return new Promise(function (fulfill, reject) {
				reject(err);
			});
		});
	}
	function crearMovimientoEgresoYActualizarInventarioPonderado(movimientoCreado, detalleVenta, producto, cantidad, inventarios, cantidadParcial, costo, index, array, i, res, datosVenta, t) {

		return DetalleMovimiento.create({
			id_movimiento: movimientoCreado.id,
			id_producto: producto.id,
			cantidad: cantidadParcial,
			costo_unitario: costo.costo_unitario,
			importe: (cantidadParcial * costo.costo_unitario),
			total: (cantidadParcial * costo.costo_unitario),
			descuento: ((detalleVenta.descuento / cantidad) * cantidadParcial),
			recargo: ((detalleVenta.recargo / cantidad) * cantidadParcial),
			ice: ((detalleVenta.ice / cantidad) * cantidadParcial),
			excento: ((detalleVenta.excento / cantidad) * cantidadParcial),
			tipo_descuento: detalleVenta.tipo_descuento,
			tipo_recargo: detalleVenta.tipo_recargo,
			fecha_vencimiento: detalleVenta.fecha_vencimiento,
			lote: detalleVenta.lote,
			id_inventario: costo.id[costo.id.length - 1].id
		}, { transaction: t }).then(function (detalleMovimientoCreado) {
			// sequelize.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED }, function (tu) {
			var promisesPonderado = []
			if (costo.id.length > 0) {
				for (let l = 0; l < costo.id.length; l++) {
					promisesPonderado.push(actualizarInventario(costo.id[l], cantidadParcial, t))
				}
			}
			// return Promise.all(promisesPonderado)
			return new Promise(function (fulfill, reject) {
				fulfill(datosVenta);
			});
			// }).then(function (result) {
			// 	return new Promise(function (fulfill, reject) {
			// 		fulfill(datosVenta);
			// 	});
			// }).catch(function (err) {
			// 	return new Promise(function (fulfill, reject) {
			// 		reject(err);
			// 	});
			// });
		});
	}

	function actualizarInventario(costo_id, cantidadParcial) {
		Inventario.find({
			where: {
				id: costo_id.id
			}
		}).then(function (inventario) {
			Inventario.update({
				cantidad: inventario.cantidad - cantidadParcial,
				costo_total: ((inventario.cantidad - cantidadParcial) * (inventario.costo_unitario ? inventario.costo_unitario : 0)),
				costo_total_dolares: ((inventario.cantidad - cantidadParcial) * (inventario.costo_unitario_dolares ? inventario.costo_unitario_dolares : 0))
			}, {
				where: {
					id: inventario.id
				}
			})
		});
	}

	function calcularCostosEgresosPonderado(detalleVenta, producto, cantidad, inventarios, movimientoCreado, index, array, res, venta, t) {
		var cantidadTotal = cantidad;
		var condicionInventario = {
			id_producto: producto.id, id_almacen: venta.almacen.id,
			cantidad: { $gt: 0 }
		}
		if (detalleVenta.lote) {
			condicionInventario.lote = detalleVenta.lote
		}
		if (detalleVenta.fecha_vencimiento) {
			var inicio = new Date(detalleVenta.fecha_vencimiento); inicio.setHours(0, 0, 0, 0, 0);
			var fin = new Date(detalleVenta.fecha_vencimiento); fin.setHours(23, 59, 59, 0, 0);

			condicionInventario.fecha_vencimiento = { $between: [inicio, fin] }
		}
		// if (inventarios.length == 0) {
		return Inventario.findAll({
			where: condicionInventario, transaction: t,
			order: [['id', 'asc']]

		}).then(function (encontrado) {
			return sequelize.query('select costo_unitario from inv_detalle_movimiento where producto = ' + producto.id + ' ORDER BY id DESC limit 1', { type: sequelize.QueryTypes.SELECT, transaction: t }).then(function (UltimoCostoUnitaro) {
				var inventariados = encontrado
				var cantidadE = 0
				var cantidadEParcial = 0
				var cantidadETotal = cantidad
				var costoUnitario = 0.0
				var ids = []
				if (producto.activar_inventario) {
					if (inventariados.length > 0) {
						var promises = [];
						for (var i = 0; i < inventariados.length; i++) {
							if (cantidadETotal > inventariados[i].cantidad) {
								cantidadE += inventariados[i].cantidad
								cantidadEParcial = cantidad - inventariados[i].cantidad
								cantidadETotal = cantidadEParcial
								ids.push({ id: inventariados[i].id, cantidad: inventariados[i].cantidad })
								costoUnitario += inventariados[i].cantidad * inventariados[i].costo_unitario
							} else {
								ids.push({ id: inventariados[i].id, cantidad: cantidadTotal })
								cantidadE = cantidadTotal
								costoUnitario += cantidadETotal * inventariados[i].costo_unitario
							}
						}
						var costoUnitarioPonderado = costoUnitario / cantidadE
						var costoPonderado = { id: ids, costo_unitario: UltimoCostoUnitaro[0].costo_unitario }

						if (cantidadTotal > 0) {
							var cantidadParcial;
							if (cantidadTotal > cantidad) {
								cantidadParcial = cantidad;
								cantidadTotal = cantidadTotal - cantidad
							} else {
								cantidadParcial = cantidadTotal;
								cantidadTotal = 0;
							}

							if (cantidadParcial > 0) {
								var rrr = crearMovimientoEgresoYActualizarInventarioPonderado(movimientoCreado, detalleVenta, producto, cantidad, inventarios, cantidadParcial, costoPonderado, index, array, i, res, venta, t);
								// promises.push(rrr)
								promises.push(new Promise(function (fulfill, reject) {
									fulfill(venta);
								}));
							}
						}
						return Promise.all(promises);
					} else {
						return new Promise(function (fulfill, reject) {
							fulfill(venta);
						});
					}
				} else {
					return new Promise(function (fulfill, reject) {
						fulfill(venta);
					});
				}
			})
		})
		// } else {
		// 	if (producto.activar_inventario) {
		// 		if (inventarios.length > 0) {
		// 			var promises = [];
		// 			for (var i = 0; i < inventarios.length; i++) {
		// 				if (cantidadTotal > 0) {
		// 					var cantidadParcial;
		// 					if (cantidadTotal > inventarios[i].cantidad) {
		// 						cantidadParcial = inventarios[i].cantidad;
		// 						cantidadTotal = cantidadTotal - inventarios[i].cantidad
		// 					} else {
		// 						cantidadParcial = cantidadTotal;
		// 						cantidadTotal = 0;
		// 					}

		// 					if (cantidadParcial > 0) {
		// 						var rrr = crearMovimientoEgresoYActualizarInventario(movimientoCreado, detalleVenta, producto, cantidad, inventarios, cantidadParcial, inventarios[i], index, array, i, res, venta, t);
		// 						promises.push(new Promise(function (fulfill, reject) {
		// 							fulfill(venta);
		// 						}));
		// 					}
		// 				} 
		// 			}
		// 			return Promise.all(promises);
		// 		} else {
		// 			return new Promise(function (fulfill, reject) {
		// 				fulfill(venta);
		// 			});
		// 		}
		// 	} else {
		// 		return new Promise(function (fulfill, reject) {
		// 			fulfill(venta);
		// 		});
		// 	}
		// }
	}

	function calcularCostosEgresos(detalleVenta, producto, cantidad, inventarios, movimientoCreado, index, array, res, venta, t, detalleVentaCreada) {
		var cantidadTotal = cantidad;
		var condicionInventario = {
			id_producto: producto.id, id_almacen: venta.almacen.id,
			cantidad: { $gt: 0 }
		}
		if (detalleVenta.lote) {
			condicionInventario.lote = detalleVenta.lote
		}
		if (detalleVenta.fecha_vencimiento) {
			var inicio = new Date(detalleVenta.fecha_vencimiento); inicio.setHours(0, 0, 0, 0, 0);
			var fin = new Date(detalleVenta.fecha_vencimiento); fin.setHours(23, 59, 59, 0, 0);

			condicionInventario.fecha_vencimiento = { $between: [inicio, fin] }
		}
		if (inventarios.length == 0) {
			return Inventario.findAll({
				where: condicionInventario, transaction: t,
				order: [['id', 'asc']]
			}).then(function (encontrado) {
				inventarios = encontrado
				if (producto.activar_inventario) {
					if (inventarios.length > 0) {
						var promises = [];
						for (var i = 0; i < inventarios.length; i++) {
							if (cantidadTotal > 0) {
								var cantidadParcial;
								if (cantidadTotal > inventarios[i].cantidad) {
									cantidadParcial = inventarios[i].cantidad;
									cantidadTotal = cantidadTotal - inventarios[i].cantidad
								} else {
									cantidadParcial = cantidadTotal;
									cantidadTotal = 0;
								}

								if (cantidadParcial > 0) {
									var rrr = crearMovimientoEgresoYActualizarInventario(movimientoCreado, detalleVenta, producto, cantidad, inventarios, cantidadParcial, inventarios[i], index, array, i, res, venta, t, detalleVentaCreada);
									//console.log(rrr);
									promises.push(new Promise(function (fulfill, reject) {
										fulfill(venta);
									}));
								} /*else {
							//if (index == (array.length - 1) && i == (inventarios.length - 1)) {
								//res.json(venta);
								promises.push(new Promise(function (fulfill, reject){
									fulfill(venta);
								}));
							//}
						}*/
							} else {
								//if (index == (array.length - 1) && i == (inventarios.length - 1)) {
								//res.json(venta);
								/*promises.push(new Promise(function (fulfill, reject){
									fulfill(venta);
								}));*/
								//}
							}
						}
						return Promise.all(promises);
					} else {
						//if (index == (array.length - 1)) {
						return new Promise(function (fulfill, reject) {
							// reject(venta);
							fulfill(venta);
						});
						//}
					}
				} else {
					//if (index == (array.length - 1)) {
					return new Promise(function (fulfill, reject) {
						fulfill(venta);
					});
					//}
				}
			}).catch(function (err) {
				return new Promise(function (fulfill, reject) {
					reject(err);
				});
			})
		} else {
			if (producto.activar_inventario) {
				if (inventarios.length > 0) {
					var promises = [];

					for (var i = 0; i < inventarios.length; i++) {
						if (cantidadTotal > 0) {
							var cantidadParcial;
							if (cantidadTotal > inventarios[i].cantidad) {
								cantidadParcial = inventarios[i].cantidad;
								cantidadTotal = cantidadTotal - inventarios[i].cantidad
							} else {
								cantidadParcial = cantidadTotal;
								cantidadTotal = 0;
							}

							if (cantidadParcial > 0) {
								var rrr = crearMovimientoEgresoYActualizarInventario(movimientoCreado, detalleVenta, producto, cantidad, inventarios, cantidadParcial, inventarios[i], index, array, i, res, venta, t, detalleVentaCreada);
								//console.log(rrr);
								promises.push(new Promise(function (fulfill, reject) {
									fulfill(venta);
								}));
							} /*else {
						//if (index == (array.length - 1) && i == (inventarios.length - 1)) {
							//res.json(venta);
							promises.push(new Promise(function (fulfill, reject){
								fulfill(venta);
							}));
						//}
					}*/
						} else {
							//if (index == (array.length - 1) && i == (inventarios.length - 1)) {
							//res.json(venta);
							/*promises.push(new Promise(function (fulfill, reject){
								fulfill(venta);
							}));*/
							//}
						}
					}
					return Promise.all(promises);
				} else {
					//if (index == (array.length - 1)) {
					return new Promise(function (fulfill, reject) {
						// reject(venta);
						fulfill(venta);
					});
					//}
				}
			} else {
				//if (index == (array.length - 1)) {
				return new Promise(function (fulfill, reject) {
					fulfill(venta);
				});
				//}
			}
		}
	}
	function guardarPromocionCumples(promoCumple, IdDetalleVenta, t, venta, id_empresa) {
		if (promoCumple.cliente.id) {
			return EntragaDetalleVentaCliente.create({
				id_cliente: promoCumple.cliente.id,
				id_detalle_venta: IdDetalleVenta,
				descuento: promoCumple.descuento,
				cantidad: promoCumple.cantidad,
				fecha: promoCumple.fecha
			}, { transaction: t }).then(function (creados) {
				return new Promise(function (fulfill, reject) {
					fulfill(venta);
				});
			})
		} else {
			return Cliente.create({
				id_empresa: id_empresa,
				nit: promoCumple.cliente.nit,
				razon_social: promoCumple.cliente.razon_social
			}, { transaction: t }).then(function (clienteCreado) {
				return EntragaDetalleVentaCliente.create({
					id_cliente: clienteCreado.id,
					id_detalle_venta: IdDetalleVenta,
					descuento: promoCumple.descuento,
					cantidad: promoCumple.cantidad,
					fecha: promoCumple.fecha
				}, { transaction: t }).then(function (creados) {
					return new Promise(function (fulfill, reject) {
						fulfill(venta);
					});
				})
			}).catch(function (err) {
				return new Promise(function (fulfill, reject) {
					reject(err);
				});
			});
		}
	}
	function guardaDetalleCombo(producto, detalleVenta, t, venta, id_empresa) {
		return DetalleComboVenta.create({
			id_detalle_venta: detalleVenta.id,
			id_producto: producto.productoBase.id,
			precio_unitario: producto.productoBase.precio_unitario,
			cantidad: producto.formulacion * detalleVenta.cantidad,
			total: (producto.formulacion * detalleVenta.cantidad) * producto.productoBase.precio_unitario,
			mostrar: producto.habilitar_cambio
		}, { transaction: t }).then(function (detalleComboCreado) {
			return new Promise(function (fulfill, reject) {
				fulfill(venta);
			});
		}).catch(function (err) {
			return new Promise(function (fulfill, reject) {
				reject(err);
			});
		});
	}

	function verificarTipoProductoDetalleVenta(detalleVenta, producto, cantidad, movimientoCreado, index, array, res, venta, t, detalleVentaCreada, promises) {
		promises = []
		if (producto.tipoProducto.nombre_corto == Diccionario.TIPO_PRODUCTO_BASE) {
			promises.push(calcularCostosEgresos(detalleVenta, producto, cantidad, detalleVenta.costos,
				movimientoCreado, index, array, res, venta, t, detalleVentaCreada));
			return Promise.all(promises);
		} else if (producto.tipoProducto.nombre_corto == Diccionario.TIPO_PRODUCTO_INTERMEDIO) {
			for (var i = 0; i < producto.productosBase.length; i++) {
				if ((i + 1) == producto.productosBase.length) {
					promises.push(calcularCostosEgresos(detalleVenta, producto.productosBase[i].productoBase, producto.productosBase[i].formulacion * detalleVenta.cantidad, producto.productosBase[i].productoBase.inventarios,
						movimientoCreado, index, array, res, venta, t, detalleVentaCreada));
				} else {
					promises.push(calcularCostosEgresos(detalleVenta, producto.productosBase[i].productoBase, producto.productosBase[i].formulacion * detalleVenta.cantidad, producto.productosBase[i].productoBase.inventarios,
						movimientoCreado, index - 1, array, res, venta, t, detalleVentaCreada));
				}
			}
			return Promise.all(promises);
		} else {
			for (var i = 0; i < producto.productosBase.length; i++) {
				promises.push(verificarTipoProductoDetalleVenta(detalleVenta, producto.productosBase[i].productoBase, producto.productosBase[i].formulacion * detalleVenta.cantidad, movimientoCreado, index, array, res, venta, t, detalleVentaCreada))
			}
			return Promise.all(promises);
		}

	}

	function crearDetalleVenta(movimientoCreado, ventaCreada, detalleVenta, precio_unitario, importe, importe_dolares, total, total_dolares, index, array, res, venta, t, sucursal) {
		return DetalleVenta.create({
			id_venta: ventaCreada.id,
			id_producto: detalleVenta.producto.id,
			precio_unitario: detalleVenta.precio_unitario ? detalleVenta.precio_unitario : 0,
			precio_unitario_dolares: detalleVenta.precio_unitario_dolares ? detalleVenta.precio_unitario_dolares : 0,
			cantidad: detalleVenta.cantidad,
			importe: importe ? importe : 0,
			importe_dolares: importe_dolares ? importe_dolares : 0,
			descuento: (detalleVenta.descuento !== detalleVenta.total_descuento ? detalleVenta.total_descuento ? detalleVenta.total_descuento : detalleVenta.descuento ? detalleVenta.descuento : 0 : detalleVenta.descuento ? detalleVenta.descuento : 0),
			recargo: (detalleVenta.recargo !== detalleVenta.total_recargo ? detalleVenta.total_recargo ? detalleVenta.total_recargo : detalleVenta.recargo ? detalleVenta.recargo : 0 : detalleVenta.recargo ? detalleVenta.recargo : 0),
			ice: detalleVenta.ice,
			excento: detalleVenta.excento,
			descuento_dolares: detalleVenta.descuento_dolares,
			recargo_dolares: detalleVenta.recargo_dolares,
			ice_dolares: detalleVenta.ice_dolares,
			excento_dolares: detalleVenta.excento_dolares,
			tipo_descuento: detalleVenta.tipo_descuento,
			tipo_recargo: detalleVenta.tipo_recargo,
			total: total,
			total_dolares: total_dolares,
			fecha_vencimiento: detalleVenta.fecha_vencimiento,
			lote: detalleVenta.lote,
			id_inventario: (detalleVenta.costos.length > 0) ? detalleVenta.costos[0].id : null,
			id_promocion: detalleVenta.producto.promocionActual ? detalleVenta.producto.promocionActual.id : null,
			id_promocion_puntaje: detalleVenta.promocionPuntaje ? detalleVenta.promocionPuntaje.id : null,
			observaciones: detalleVenta.observaciones
		}, { transaction: t }).then(function (detalleVentaCreada) {
			var promises = [];
			// console.log("la sucursalllllll ============================================== ", sucursal);
			if (detalleVentaCreada.id_promocion_puntaje) {
				detalleVenta.promocionActualPuntaje = detalleVenta.promocionPuntaje;
			}

			if (!detalleVenta.producto.restar_solo_despacho) {
				if (detalleVenta.promosCumple) {
					if (detalleVenta.promosCumple.length > 0) {
						for (var i = 0; i < detalleVenta.promosCumple.length; i++) {
							var promocumple = detalleVenta.promosCumple[i]
							promises.push(guardarPromocionCumples(promocumple, detalleVentaCreada.id, t, venta, detalleVenta.producto.id_empresa))
						}
					}
				}
				if (detalleVenta.producto.combo) {
					if (detalleVenta.producto.productosBase.length > 0) {
						for (var i = 0; i < detalleVenta.producto.productosBase.length; i++) {
							var productoCombo = detalleVenta.producto.productosBase[i]
							promises.push(guardaDetalleCombo(productoCombo, detalleVentaCreada, t, venta, detalleVenta.producto.id_empresa))
						}
					}
				}
				if (sucursal.empresa.dataValues.usar_peps) {
					if (!venta.id_orden_reposicion) {
						promises.push(verificarTipoProductoDetalleVenta(detalleVenta, detalleVenta.producto, detalleVenta.cantidad, movimientoCreado, index, array, res, venta, t, detalleVentaCreada))
					}
					/* if (detalleVenta.producto.tipoProducto.nombre_corto == Diccionario.TIPO_PRODUCTO_BASE) {
						promises.push(calcularCostosEgresos(detalleVenta, detalleVenta.producto, detalleVenta.cantidad, detalleVenta.costos,
							movimientoCreado, index, array, res, venta, t, detalleVentaCreada));
					} else if (detalleVenta.producto.tipoProducto.nombre_corto == Diccionario.TIPO_PRODUCTO_INTERMEDIO) {
		
						for (var i = 0; i < detalleVenta.producto.productosBase.length; i++) {
							if ((i + 1) == detalleVenta.producto.productosBase.length) {
								promises.push(calcularCostosEgresos(detalleVenta, detalleVenta.producto.productosBase[i].productoBase, detalleVenta.producto.productosBase[i].formulacion * detalleVenta.cantidad, detalleVenta.producto.productosBase[i].productoBase.inventarios,
									movimientoCreado, index, array, res, venta, t, detalleVentaCreada));
							} else {
								promises.push(calcularCostosEgresos(detalleVenta, detalleVenta.producto.productosBase[i].productoBase, detalleVenta.producto.productosBase[i].formulacion * detalleVenta.cantidad, detalleVenta.producto.productosBase[i].productoBase.inventarios,
									movimientoCreado, index - 1, array, res, venta, t, detalleVentaCreada));
							}
						}
		
					} else {
						for (var i = 0; i < detalleVenta.producto.productosBase.length; i++) {
							if (detalleVenta.producto.productosBase[i].productoBase.tipoProducto.nombre_corto == Diccionario.TIPO_PRODUCTO_BASE) {
								if ((i + 1) == detalleVenta.producto.productosBase.length) {
									promises.push(calcularCostosEgresos(detalleVenta, detalleVenta.producto.productosBase[i].productoBase, detalleVenta.producto.productosBase[i].formulacion * detalleVenta.cantidad, detalleVenta.producto.productosBase[i].productoBase.inventarios,
										movimientoCreado, index, array, res, venta, t, detalleVentaCreada));
								} else {
									promises.push(calcularCostosEgresos(detalleVenta, detalleVenta.producto.productosBase[i].productoBase, detalleVenta.producto.productosBase[i].formulacion * detalleVenta.cantidad, detalleVenta.producto.productosBase[i].productoBase.inventarios,
										movimientoCreado, index - 1, array, res, venta, t, detalleVentaCreada));
								}
							} else if (detalleVenta.producto.productosBase[i].productoBase.tipoProducto.nombre_corto == Diccionario.TIPO_PRODUCTO_INTERMEDIO) {
								var innerpromises = [];
								for (var j = 0; j < detalleVenta.producto.productosBase[i].productoBase.productosBase.length; j++) {
									if ((j + 1) == detalleVenta.producto.productosBase[i].productoBase.productosBase.length) {
										innerpromises.push(calcularCostosEgresos(detalleVenta, detalleVenta.producto.productosBase[i].productoBase.productosBase[j].productoBase,
											detalleVenta.producto.productosBase[i].formulacion * detalleVenta.producto.productosBase[i].productoBase.productosBase[j].formulacion * detalleVenta.cantidad,
											detalleVenta.producto.productosBase[i].productoBase.productosBase[j].productoBase.inventarios, movimientoCreado, index, array, res, venta, t, detalleVentaCreada));
									} else {
										innerpromises.push(calcularCostosEgresos(detalleVenta, detalleVenta.producto.productosBase[i].productoBase.productosBase[j].productoBase,
											detalleVenta.producto.productosBase[i].formulacion * detalleVenta.producto.productosBase[i].productoBase.productosBase[j].formulacion * detalleVenta.cantidad,
											detalleVenta.producto.productosBase[i].productoBase.productosBase[j].productoBase.inventarios, movimientoCreado, index - 1, array, res, venta, t, detalleVentaCreada));
									}
								}
								promises.push(Promise.all(innerpromises));
							}
						}
					
					} */
					return Promise.all(promises);
				} /* else {
					if (detalleVenta.producto.tipoProducto.nombre_corto == Diccionario.TIPO_PRODUCTO_BASE) {
						return calcularCostosEgresosPonderado(detalleVenta, detalleVenta.producto, detalleVenta.cantidad, detalleVenta.costos,
							movimientoCreado, index, array, res, venta, t);
					} else if (detalleVenta.producto.tipoProducto.nombre_corto == Diccionario.TIPO_PRODUCTO_INTERMEDIO) {
						var promises = [];
						for (var i = 0; i < detalleVenta.producto.productosBase.length; i++) {
							if ((i + 1) == detalleVenta.producto.productosBase.length) {
								promises.push(calcularCostosEgresosPonderado(detalleVenta, detalleVenta.producto.productosBase[i].productoBase, detalleVenta.producto.productosBase[i].formulacion * detalleVenta.cantidad, detalleVenta.producto.productosBase[i].productoBase.inventarios,
									movimientoCreado, index, array, res, venta, t));
							} else {
								promises.push(calcularCostosEgresosPonderado(detalleVenta, detalleVenta.producto.productosBase[i].productoBase, detalleVenta.producto.productosBase[i].formulacion * detalleVenta.cantidad, detalleVenta.producto.productosBase[i].productoBase.inventarios,
									movimientoCreado, index - 1, array, res, venta, t));
							}
						}
						return Promise.all(promises);
					} else {
						var promises = [];
						for (var i = 0; i < detalleVenta.producto.productosBase.length; i++) {
							if (detalleVenta.producto.productosBase[i].productoBase.tipoProducto.nombre_corto == Diccionario.TIPO_PRODUCTO_BASE) {
								if ((i + 1) == detalleVenta.producto.productosBase.length) {
									promises.push(calcularCostosEgresosPonderado(detalleVenta, detalleVenta.producto.productosBase[i].productoBase, detalleVenta.producto.productosBase[i].formulacion * detalleVenta.cantidad, detalleVenta.producto.productosBase[i].productoBase.inventarios,
										movimientoCreado, index, array, res, venta, t));
								} else {
									promises.push(calcularCostosEgresosPonderado(detalleVenta, detalleVenta.producto.productosBase[i].productoBase, detalleVenta.producto.productosBase[i].formulacion * detalleVenta.cantidad, detalleVenta.producto.productosBase[i].productoBase.inventarios,
										movimientoCreado, index - 1, array, res, venta, t));
								}
							} else if (detalleVenta.producto.productosBase[i].productoBase.tipoProducto.nombre_corto == Diccionario.TIPO_PRODUCTO_INTERMEDIO) {
								var innerpromises = [];
								for (var j = 0; j < detalleVenta.producto.productosBase[i].productoBase.productosBase.length; j++) {
									if ((j + 1) == detalleVenta.producto.productosBase[i].productoBase.productosBase.length) {
										innerpromises.push(calcularCostosEgresosPonderado(detalleVenta, detalleVenta.producto.productosBase[i].productoBase.productosBase[j].productoBase,
											detalleVenta.producto.productosBase[i].formulacion * detalleVenta.producto.productosBase[i].productoBase.productosBase[j].formulacion * detalleVenta.cantidad,
											detalleVenta.producto.productosBase[i].productoBase.productosBase[j].productoBase.inventarios, movimientoCreado, index, array, res, venta, t));
									} else {
										innerpromises.push(calcularCostosEgresosPonderado(detalleVenta, detalleVenta.producto.productosBase[i].productoBase.productosBase[j].productoBase,
											detalleVenta.producto.productosBase[i].formulacion * detalleVenta.producto.productosBase[i].productoBase.productosBase[j].formulacion * detalleVenta.cantidad,
											detalleVenta.producto.productosBase[i].productoBase.productosBase[j].productoBase.inventarios, movimientoCreado, index - 1, array, res, venta, t));
									}
								}
								promises.push(Promise.all(innerpromises));
							}
						}
						return Promise.all(promises);
					}
				} */
			} else {
				return new Promise(function (fulfill, reject) {
					// reject(venta);
					fulfill(venta);
				});
			}
		});
	}

	function crearDetalleMovimientoIngresoYActualizarInventario(movimiento, detalleMovimiento, t) {
		return DetalleMovimiento.create({
			id_movimiento: movimiento.id,
			id_producto: detalleMovimiento.id_producto,
			costo_unitario: detalleMovimiento.costo_unitario ? detalleMovimiento.costo_unitario : 0,
			costo_unitario_dolares: detalleMovimiento.costo_unitario_dolares ? detalleMovimiento.costo_unitario_dolares : 0,
			cantidad: detalleMovimiento.cantidad,
			importe: ((detalleMovimiento.costo_unitario ? detalleMovimiento.costo_unitario : 0) * detalleMovimiento.cantidad),
			importe_dolares: ((detalleMovimiento.costo_unitario_dolares ? detalleMovimiento.costo_unitario_dolares : 0) * detalleMovimiento.cantidad),
			descuento: detalleMovimiento.descuento,
			recargo: detalleMovimiento.recargo,
			ice: detalleMovimiento.ice,
			excento: detalleMovimiento.excento,
			tipo_descuento: detalleMovimiento.tipo_descuento,
			tipo_recargo: detalleMovimiento.tipo_recargo,
			total: detalleMovimiento.total ? detalleMovimiento.total : 0,
			total_dolares: detalleMovimiento.total_dolares ? detalleMovimiento.total_dolares : 0,
			id_inventario: detalleMovimiento.id_inventario
		}, { transaction: t }).then(function (detalleMovimientoCreado) {
			sequelize.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED }, function (tu) {
				return Inventario.find({
					where: {
						id: detalleMovimiento.id_inventario
					},
					transaction: tu,
					lock: tu.LOCK.UPDATE
				}).then(function (inventarioEncontrado) {
					return Inventario.update({
						cantidad: inventarioEncontrado.cantidad + detalleMovimientoCreado.cantidad,
						costo_total: (inventarioEncontrado.costo_unitario ? inventarioEncontrado.costo_unitario : 0) * (inventarioEncontrado.cantidad + detalleMovimientoCreado.cantidad),
						costo_total_dolares: (inventarioEncontrado.costo_unitario_dolares ? inventarioEncontrado.costo_unitario_dolares : 0) * (inventarioEncontrado.cantidad + detalleMovimientoCreado.cantidad)
					}, {
						where: {
							id: detalleMovimiento.id_inventario
						},
						transaction: tu
					});
				});
			}).then(function (result) {
				return new Promise(function (fulfill, reject) {
					fulfill({});
				});
			}).catch(function (err) {
				return new Promise(function (fulfill, reject) {
					reject(err);
				});
			});
		});
	}

	router.route('/ventas/:id')
		.put(ensureAuthorizedlogged, function (req, res) {
			Sucursal.find({
				where: {
					id: req.body.sucursal.id,
					activo: true
				}
			}).then((suc) => {
				if (!suc) return res.json({ hasError: true, message: 'Sucursal deshabilitada, no se pueden hacer cambios.' });
				sequelize.transaction(function (t) {
					var movimiento = req.body.movimiento.nombre_corto;
					var id_movimiento = req.body.movimiento.id;
					var venta = req.body;
					var factura = {};
					factura.venta = venta;
					return Empresa.find({
						where: { id: venta.id_empresa }
					}).then(function (empresaEncontrada) {
						//SI ES FACTURACION
						if (movimiento == Diccionario.EGRE_FACTURACION) {
							return ActualizarVenta(venta, res, venta.cliente.id, venta.movimientoActual, null, true, venta.sucursal, t, empresaEncontrada);
							//SI ES PROFORMA
						} else if (movimiento == Diccionario.EGRE_PROFORMA) {
							return ActualizarVenta(venta, res, venta.cliente.id, venta.movimientoActual, null, false, venta.sucursal, t, empresaEncontrada);
							//SI ES PREFACTURACION
						} else if (movimiento == Diccionario.EGRE_PRE_FACTURACION) {
							return ActualizarVenta(venta, res, venta.cliente.id, venta.movimientoActual, null, false, venta.sucursal, t, empresaEncontrada);
							//SI ES TRASPASO CON ORDEN REPOSICION
						} else if (movimiento == Diccionario.EGRE_TRASPASO && venta.ordenReposicion) {
							return ActualizarVenta(venta, res, venta.cliente.id, venta.movimientoActual, null, false, venta.sucursal, t, empresaEncontrada);
						}
					}).catch(function (err) {
						return new Promise(function (fulfill, reject) {
							reject(err);
						});
					});
				}).then(function (result) {
					console.log(result);
					/* var resV = (result.length ? (result[0].length ? (result[0][0].length ? (result[0][0][0].length ? result[0][0][0][0] : result[0][0][0]) : result[0][0]) : result[0]) : result); */
					res.json({ mensaje: 'actualizado satisfactoriamente' });
				}).catch(function (err) {
					res.json({ hasError: true, message: err.stack });
				});
			}).catch(function (err) {
				res.json({ hasError: true, message: err.stack });
			});

		})
		.post(ensureAuthorizedlogged, function (req, res) {
			Venta.find({
				where: {
					id: req.params.id
				},
				include: [
					{
						model: Sucursal, as: 'sucursal'
					}
				]
			}).then((venta) => {
				Sucursal.find({
					where: {
						id: venta.sucursal.id,
						activo: true
					}
				}).then((suc) => {
					if (!suc) return res.json({ hasError: true, message: 'Sucursal deshabilitada, no se pueden hacer cambios.' });
					sequelize.transaction(function (t) {
						return Venta.update({
							activa: false
						}, {
							where: { id: req.params.id },
							transaction: t
						}).then(function (ven) {
							new Promise(function (fulfill, reject) {
								fulfill({});
							});
						})
					}).then(function (result) {
						res.json({ mensaje: 'Se anulo la venta!' });
					}).catch(function (err) {
						res.json({ hasError: true, message: err.stack });
					})
				}).catch(function (err) {
					res.json({ hasError: true, message: err.stack });
				});
			}).catch((err) => {
				res.json({ hasError: true, message: err.stack });
			})
		})
		.delete(ensureAuthorizedlogged, function (req, res) {
			Venta.find({
				where: {
					id: req.params.id
				},
				include: [
					{

						model: Almacen, as: 'almacen'
					}
				]
			}).then((venta) => {
				Sucursal.find({
					where: {
						id: venta.almacen.id_sucursal,
						activo: true
					}
				}).then((suc) => {
					if (!suc) return res.json({ hasError: true, message: 'Sucursal deshabilitada, no se pueden hacer cambios.' });
					sequelize.transaction(function (t) {
						return Movimiento.find({
							include: [{ model: Venta, as: "venta", where: { id: req.params.id } },
							{ model: DetalleMovimiento, as: "detallesMovimiento" }],
							transaction: t
						}).then(function (movimiento) {
							return Tipo.find({
								where: { nombre_corto: 'MOVING' },
								transaction: t
							}).then(function (tipoMovimiento) {
								return Clase.find({
									where: { nombre_corto: 'IPD' },
									transaction: t
								}).then(function (conceptoMovimiento) {
									return Movimiento.create({
										id_tipo: tipoMovimiento.id,
										id_clase: conceptoMovimiento.id,
										id_almacen: movimiento.id_almacen,
										fecha: new Date()
									}, { transaction: t }).then(function (movimientoCreado) {
										return Venta.update({
											activa: false,
											id_movimiento_eliminado: movimientoCreado.id
										}, {
											where: { id: req.params.id },
											transaction: t
										}).then(function (ven) {
											var promises = [];
											if (movimiento.detallesMovimiento.length > 0) {
												for (var i = 0; i < movimiento.detallesMovimiento.length; i++) {
													var rrr = crearDetalleMovimientoIngresoYActualizarInventario(movimientoCreado, movimiento.detallesMovimiento[i], t);
													promises.push(new Promise(function (fulfill, reject) {
														fulfill({});
													}));
												}
												return Promise.all(promises);
											} else {
												return new Promise(function (fulfill, reject) {
													fulfill({});
												});
											}
										});
									});
								});
							});
						})
					}).then(function (result) {
						res.json({ mensaje: 'Se anulo la venta!' });
					}).catch(function (err) {
						res.json({ hasError: true, message: err.stack });
					});
				}).catch(function (err) {
					res.json({ hasError: true, message: err.stack });
				});
			}).catch((err) => {
				res.json({ hasError: true, message: err.stack });
			})

		});

	router.route('/venta-no-consolidada/:id')
		.put(ensureAuthorizedlogged, function (req, res) {
			req.body.forEach(function (detalleVentaNoConsolidada, index, array) {
				crearDetalleVentaNoConsolidada(null, detalleVentaNoConsolidada.producto.id, detalleVentaNoConsolidada.id_cliente, detalleVentaNoConsolidada);
				if (array.length === (index + 1)) {
					res.json({ mensaje: 'Se registro los detalles de venta no consolidados!' });
				}
			});
		});

	router.route('/venta-no-consolidada')
		.post(ensureAuthorizedlogged, function (req, res) {
			crearDetalleVentaNoConsolidada(null, null, req.body.id_cliente, req.body);
			res.json({ mensaje: 'Se registro la venta no consolidada!' });
		});

	function crearDetalleVentaNoConsolidada(idVenta, idProducto, idCliente, detalleVentaNoConsolidada) {
		DetalleVentaNoConsolidada.create({
			id_venta: idVenta,
			id_cliente: idCliente,
			id_producto: idProducto,
			precio_unitario: detalleVentaNoConsolidada.precio_unitario,
			cantidad: detalleVentaNoConsolidada.cantidad,
			importe: detalleVentaNoConsolidada.importe,
			fecha: detalleVentaNoConsolidada.fecha,
			descuento: detalleVentaNoConsolidada.descuento,
			recargo: detalleVentaNoConsolidada.recargo,
			ice: detalleVentaNoConsolidada.ice,
			excento: detalleVentaNoConsolidada.excento,
			tipo_descuento: detalleVentaNoConsolidada.tipo_descuento,
			tipo_recargo: detalleVentaNoConsolidada.tipo_recargo,
			total: detalleVentaNoConsolidada.total
		}).then(function (detalleVentaCreada) {

		});
	}
	router.route('/ventas/:id/info')
		.get(ensureAuthorizedlogged, function (req, res) {
			Venta.find({
				where: { id: req.params.id },
				include: [{
					model: DetalleVenta, as: 'detallesVenta', required: true,
					include: [{ model: DetalleVentaProductoFinal, as: 'detallesVentaProductoFinal', required: false, include: [{ model: DetalleMovimiento, as: 'detalleMovimiento' }] }, {
						model: Producto, as: 'producto', include: [
							{ model: Clase, as: 'tipoProducto' },
							{ model: Inventario, as: 'inventarios', required: false, where: { cantidad: { $gte: 0 } } },
							{
								model: ProductoBase, as: 'productosBase', required: false,
								include: [{
									model: Producto, as: 'productoBase', required: false,
									include: [{ model: Inventario, as: 'inventarios', required: false, where: { cantidad: { $gte: 0 } } },
									{ model: Clase, as: 'tipoProducto' },
									{
										model: ProductoBase, as: 'productosBase', required: false,
										include: [{
											model: Producto, as: 'productoBase', required: false,
											include: [{ model: Inventario, as: 'inventarios', required: false, where: { cantidad: { $gte: 0 } } },
											{ model: Clase, as: 'tipoProducto' }]
										}]
									}]
								}]
							}
						]
					}]
				},
				{ model: Clase, as: 'tipoPago' },
				{ model: Clase, as: 'actividad' },
				{ model: Usuario, as: 'usuario', },
				{ model: Cliente, as: 'cliente' },
				{
					model: Movimiento, as: 'movimiento',
					include: [{ model: DetalleMovimiento, as: 'detallesMovimiento' }, { model: Clase, as: 'clase' }]
				},
				{
					model: Almacen, as: 'almacen',
					include: [{
						model: Sucursal, as: 'sucursal',
						where: condicionSucursal
					}]
				},
				{
					model: Almacen, as: 'almacenTraspaso',
					include: [{
						model: Sucursal, as: 'sucursal'
					}]
				}
				/* , {
				model: Sucursal, as: 'sucursal'
			}, {
				model: Clase, as: 'movimientoServicio'
			} */]
			}).then(function (entity) {
				if (entity) {
					res.json({ ventas: ventas });
				}
				Venta.findAll({
					where: condicionVenta,
					include: [{
						model: DetalleVenta, as: 'detallesVenta',
						include: [{ model: ServicioVenta, as: 'servicio' }]
					},
					{ model: Clase, as: 'tipoPago' },
					/* { model: Clase, as: 'actividad' }, */
					{ model: Usuario, as: 'usuario', where: condicionUsuario },
					{ model: Cliente, as: 'cliente', where: condicionCliente, required: clienteRequerido },
					{
						model: Sucursal, as: 'sucursal', where: condicionSucursal
					}, {
						model: Clase, as: 'movimientoServicio', where: condicionTransaccion
					}]
				}).then(function (entity2) {
					ventas = entity.concat(entity2);
					ventas = ventas.sort(function (a, b) {
						return b.factura - a.factura;
					});
					res.json({ ventas: ventas });
				});
			});
		})

	router.route('/ventas/:idsSucursales/inicio/:inicio/fin/:fin/razon-social/:razon_social/nit/:nit/monto/:monto/tipo-venta/:tipo_venta/sucursal/:sucursal/transaccion/:transaccion/usuario/:usuario/estado/:estado/express/:tipo_express/almacen_traspaso/:almacen_traspaso/sucursal_traspaso/:sucursal_traspaso/:id_usuario')
		.get(ensureAuthorizedlogged, async function (req, res) {
			try {
				let sucursales = await UsuarioSucursal.findAll({
					attributes: [[sequelize.fn('GROUP_CONCAT', sequelize.col('sucursal')), 'idsSucursales']],
					where: {
						id_usuario: req.params.id_usuario
					},
				})
				req.params.idsSucursales = sucursales[0].dataValues.idsSucursales

				let inicio = new Date(req.params.inicio);
				let fin = new Date(req.params.fin);
				let condicionSucursalDestino = {};
				let condicionGroupo = ["`inv_venta`.`id`"]
				let condicionCliente = {}, condicionVenta = { fecha: { $between: [inicio, fin] } },
					condicionSucursal = { id: { $in: req.params.idsSucursales.split(',') } }, condicionTransaccion = {},
					condicionUsuario = {}, clienteRequerido = false;
				let datosAlmacenDestino = {
					model: Almacen, as: 'almacenTraspaso', required: false,
					include: [{
						model: Sucursal, as: 'sucursal', required: false
					}]
				}
				if (req.params.razon_social != 0) {
					condicionCliente.razon_social = { $like: "%" + req.params.razon_social + "%" };
					clienteRequerido = true;
				}
				if (req.params.nit != 0) {
					condicionCliente.nit = parseInt(req.params.nit);
					clienteRequerido = true;
				}
				if (req.params.monto != 0) {
					condicionVenta.total = parseFloat(req.params.monto);
				}
				if (req.params.tipo_venta != 0) {
					condicionVenta.id_tipo_pago = req.params.tipo_venta;
				}
				if (req.params.sucursal != 0) {
					condicionSucursal.id = req.params.sucursal;
				}
				if (req.params.almacen_traspaso != 0) {
					condicionVenta.id_almacen_traspaso = req.params.almacen_traspaso;
				}
				if (req.params.sucursal_traspaso != 0) {
					condicionSucursalDestino.id = req.params.sucursal_traspaso;
					datosAlmacenDestino = {
						model: Almacen, as: 'almacenTraspaso',
						include: [{
							model: Sucursal, as: 'sucursal', where: condicionSucursalDestino
						}]
					}
				}
				if (req.params.transaccion != 0) {
					condicionTransaccion.id = req.params.transaccion;
				}
				if (req.params.estado != 0) {
					condicionVenta.activa = (req.params.estado == "true") ? true : false;
				}
				if (req.params.usuario != 0) {
					condicionUsuario.nombre_usuario = { $like: "%" + req.params.usuario + "%" };
				}
				if (req.params.tipo_express != 0) {
					condicionGroupo = ["`inv_venta`.`factura`"]
				}
				entity = await Venta.findAll({
					where: condicionVenta,
					attributes: ['id', 'id_cliente', 'factura', "fecha",
						"createdAt",
						"dias_credito",
						"a_cuenta",
						"saldo",
						"confirmar_traspaso",
						"campamento_sincronizado",
						"fecha_sincronizado",
						"liquidacion",
						"id_comprobante",
						"numero_iso_traspaso",
						"numero_iso_baja",
						"mesa", "activa", [sequelize.fn('sum', sequelize.col('importe')), 'importe'], [sequelize.fn('sum', sequelize.col('total')), 'total']],
					include: [
						/* {
							model: DetalleVenta, as: 'detallesVenta',
							include: [{ model: DetalleVentaProductoFinal, as: 'detallesVentaProductoFinal', required: false, include: [{ model: DetalleMovimiento, as: 'detalleMovimiento' }] }, {
								model: Producto, as: 'producto', include: [
									{ model: Clase, as: 'tipoProducto' },
									{ model: Inventario, as: 'inventarios', required: false, where: { id_almacen: req.params.id_almacen, cantidad: { $gte: 0 } } },
									{
										model: ProductoBase, as: 'productosBase', required: false,
										include: [{
											model: Producto, as: 'productoBase', required: false,
											include: [{ model: Inventario, as: 'inventarios', required: false, where: { id_almacen: req.params.id_almacen, cantidad: { $gte: 0 } } },
											{ model: Clase, as: 'tipoProducto' },
											{
												model: ProductoBase, as: 'productosBase', required: false,
												include: [{
													model: Producto, as: 'productoBase', required: false,
													include: [{ model: Inventario, as: 'inventarios', required: false, where: { id_almacen: req.params.id_almacen, cantidad: { $gte: 0 } } },
													{ model: Clase, as: 'tipoProducto' }]
												}]
											}]
										}]
									}
								]
							}]
						}, */
						{ model: Clase, as: 'tipoPago' },
						{ model: GestionOrdenReposicion, as: 'ordenReposicion' },
						{ model: Clase, as: 'actividad' },
						{ model: Usuario, as: 'usuario', where: condicionUsuario },
						{ model: Cliente, as: 'cliente', where: condicionCliente, required: clienteRequerido },
						{ model: MeseroVenta, as: 'mesero', include: [{ model: Persona, as: 'persona' }] },
						{
							model: Movimiento, as: 'movimiento',
							include: [{ model: Clase, as: 'clase', where: condicionTransaccion }]
						},
						{ model: ConfiguracionIso, as: 'configuracionesIso' },
						{
							model: Almacen, as: 'almacen',
							include: [{
								model: Sucursal, as: 'sucursal',
								where: condicionSucursal
							}]
						}, datosAlmacenDestino],
					group: condicionGroupo,
				})
				entity2 = await Venta.findAll({
					where: condicionVenta,
					attributes: ['id', 'id_cliente', 'factura', "fecha",
						"createdAt",
						"numero_iso_baja",
						"dias_credito",
						"a_cuenta",
						"saldo",
						"confirmar_traspaso",
						"campamento_sincronizado",
						"fecha_sincronizado",
						"liquidacion",
						"numero_iso_traspaso",
						"id_comprobante",
						"mesa", "activa", [sequelize.fn('sum', sequelize.col('importe')), 'importe'], [sequelize.fn('sum', sequelize.col('total')), 'total']],
					include: [
						{ model: Clase, as: 'tipoPago' },
						{ model: Usuario, as: 'usuario', where: condicionUsuario },
						{ model: Cliente, as: 'cliente', where: condicionCliente, required: clienteRequerido },
						{ model: MeseroVenta, as: 'mesero', include: [{ model: Persona, as: 'persona' }] },
						{
							model: Sucursal, as: 'sucursal', where: condicionSucursal
						}, {
							model: Clase, as: 'movimientoServicio', where: condicionTransaccion
						}],
					group: condicionGroupo,
				})
				ventas = condicionSucursalDestino.id ? entity : entity.concat(entity2);
				ventas = ventas.sort(function (a, b) {
					return b.factura - a.factura;
				});
				res.json(ventas);

			} catch (error) {
				res.json([{ mensaje: error.stack, hasErr: true }]);
			}

		});

	router.route('/ventas/:id/empresa/:id_empresa')
		.get(function (req, res) {
			Sucursal.findAll({
				where: {
					id_empresa: req.params.id_empresa,
					numero: 0,
					activo: true
				},
				include: [{ model: Clase, as: 'departamento' }]
			}).then(function (sucursalPrincipalEncontrada) {
				Venta.find({
					where: {
						id: req.params.id
					},
					include: [{ model: GestionOrdenReposicion, as: 'ordenReposicion' }, { model: MeseroVenta, as: 'mesero', include: [{ model: Persona, as: 'persona' }] }, { model: Cliente, as: 'cliente' },
					{
						model: DetalleVenta, as: 'detallesVenta',
						include: [{ model: DetalleComboVenta, as: 'detallesCombo', required: false, include: [{ model: Producto, as: 'producto' }] }, { model: Inventario, as: 'inventario' }, { model: ProductoPromocion, as: 'promocionActual' }, { model: ProductoPromocionPuntaje, as: 'promocionActualPuntaje' }, { model: ServicioVenta, as: 'servicio' },
						{ model: DetalleVentaProductoFinal, as: 'detallesVentaProductoFinal', required: false, include: [{ model: DetalleMovimiento, as: 'detalleMovimiento' }] },
						{ model: DetalleVentaProductoDevolucion, as: 'detallesVentaProductoDevolucion', required: false },
						{
							model: DetalleVentaProductoReposicion, as: 'detallesVentaProductoReposicion', required: false,
							include: [
								{ model: Clase, as: 'tipoReposicion' },
								{
									model: DetalleVenta, as: 'producto_venta', required: false,
									include: [{ model: Producto, as: 'producto' }]
								}
							]
						},
						{
							model: Producto, as: 'producto', include: [
								{ model: Clase, as: 'tipoProducto' },
								{ model: Inventario, as: 'inventarios', required: false, where: { id_almacen: req.params.id_almacen, cantidad: { $gte: 0 } } },
								{
									model: ProductoBase, as: 'productosBase', required: false,
									include: [{
										model: Producto, as: 'productoBase', required: false,
										include: [{ model: Inventario, as: 'inventarios', required: false, where: { id_almacen: req.params.id_almacen, cantidad: { $gte: 0 } } },
										{ model: Clase, as: 'tipoProducto' },
										{
											model: ProductoBase, as: 'productosBase', required: false,
											include: [{
												model: Producto, as: 'productoBase', required: false,
												include: [{ model: Inventario, as: 'inventarios', required: false, where: { id_almacen: req.params.id_almacen, cantidad: { $gte: 0 } } },
												{ model: Clase, as: 'tipoProducto' }]
											}]
										}]
									}]
								}
							]
						}]
					},
					{ model: Sucursal, as: 'sucursal', include: [{ model: Clase, as: 'departamento' }] },
					{ model: Clase, as: 'movimientoServicio' },
					{ model: Almacen, as: 'almacen', include: [{ model: Sucursal, as: 'sucursal', include: [{ model: Clase, as: 'departamento' }] }] },
					{ model: ConfiguracionIso, as: 'configuracionesIso', required: false },
					{ model: Almacen, as: 'almacenTraspaso', include: [{ model: Sucursal, as: 'sucursal' }], required: false },
					{ model: Clase, as: 'actividad' },
					{ model: Clase, as: 'tipoPago' },
					{ model: Movimiento, as: 'movimiento', include: [{ model: Clase, as: 'clase' }] }],
					order: [[{ model: DetalleVenta, as: 'detallesVenta' }, 'id', 'ASC']]
				}).then(function (venta) {
					if (venta.sucursal) {
						venta.numero_literal = NumeroLiteral.Convertir(parseFloat(venta.total).toFixed(2).toString());
					} else {
						venta.sucursal = venta.almacen.sucursal;
						if (venta.movimiento.clase.nombre_corto == Diccionario.EGRE_FACTURACION ||
							venta.movimiento.clase.nombre_corto == Diccionario.EGRE_PROFORMA) {
							venta.numero_literal = NumeroLiteral.Convertir(parseFloat(venta.total).toFixed(2).toString());
							venta.numero_literal_dolares = NumeroLiteral.Convertir(parseFloat(venta.total_dolares).toFixed(2).toString(), 'Dolares');
						}
					}
					ConfiguracionGeneralFactura.find({
						where: {
							id_empresa: req.params.id_empresa
						},
						include: [{ model: Clase, as: 'impresionFactura' },
						{ model: Clase, as: 'tipoFacturacion' },
						{ model: Clase, as: 'tamanoPapelFactura' },
						{ model: Clase, as: 'tituloFactura' },
						{ model: Clase, as: 'subtituloFactura' },
						{ model: Clase, as: 'pieFactura' },
						{ model: Clase, as: 'tamanoPapelNotaVenta' },

						{ model: Clase, as: 'tamanoPapelFacturaServicio' },
						{ model: Clase, as: 'tamanoPapelNotaTraspaso' },
						{ model: Clase, as: 'tamanoPapelNotaBaja' },
						{ model: Clase, as: 'tamanoPapelNotaPedido' },
						{ model: Clase, as: 'tamanoPapelCierreCaja' },
						{ model: Clase, as: 'formatoPapelFactura' },
						{ model: Clase, as: 'formatoColorFactura' },
						{ model: Clase, as: 'formatoConFirmaFactura' },
						{ model: Clase, as: 'formatoPapelFacturaServicio' },
						{ model: Clase, as: 'formatoColorFacturaServicio' },
						{ model: Clase, as: 'tipoConfiguracion' },
						{ model: Clase, as: 'formatoPapelNotaVenta' },
						{ model: Clase, as: 'formatoColorNotaVenta' },
						{ model: Clase, as: 'tipoConfiguracionNotaVenta' },
						{ model: Clase, as: 'formatoConFirmaNotaVenta' },
						{ model: Clase, as: 'formatoPapelNotaTraspaso' },
						{ model: Clase, as: 'formatoColorNotaTraspaso' },
						{ model: Clase, as: 'tipoConfiguracionNotaTraspaso' },
						{ model: Clase, as: 'formatoPapelNotaBaja' },
						{ model: Clase, as: 'formatoColorNotaBaja' },
						{ model: Clase, as: 'tipoConfiguracionNotaBaja' },
						{ model: Clase, as: 'tipoConfiguracionNotaServicio' }]
					}).then(function (configuracionGeneralFactura) {
						if (venta.movimiento) {
							if (venta.movimiento.clase.nombre_corto == Diccionario.EGRE_FACTURACION) {
								SucursalActividadDosificacion.find({
									where: {
										id_actividad: venta.actividad.id,
										id_sucursal: venta.sucursal.id,
										expirado: false
									},
									include: [{ model: Dosificacion, as: 'dosificacion', include: [{ model: Clase, as: 'pieFactura' }] }]
								}).then(function (sucursalActividadDosificacion) {
									var dosificacion = sucursalActividadDosificacion.dosificacion;
									if (configuracionGeneralFactura.usar) {
										res.json({
											sucursalPrincipal: sucursalPrincipalEncontrada, venta: venta, configuracion: configuracionGeneralFactura, sucursal: venta.sucursal,
											numero_literal: venta.numero_literal, pieFactura: dosificacion.pieFactura, sucursalDestino: ((venta.almacenTraspaso) ? venta.almacenTraspaso.sucursal : null)
										});
									} else {
										ConfiguracionFactura.find({
											where: {
												id_sucursal: venta.sucursal.id
											},
											include: [{ model: Clase, as: 'impresionFactura' },
											{ model: Clase, as: 'tipoFacturacion' },
											{ model: Clase, as: 'tamanoPapelFactura' },
											{ model: Clase, as: 'tituloFactura' },
											{ model: Clase, as: 'subtituloFactura' },
											{ model: Clase, as: 'tamanoPapelNotaVenta' },

											{ model: Clase, as: 'tamanoPapelFacturaServicio' },
											{ model: Clase, as: 'tamanoPapelNotaTraspaso' },
											{ model: Clase, as: 'tamanoPapelNotaBaja' },
											{ model: Clase, as: 'tamanoPapelNotaPedido' },
											{ model: Clase, as: 'tamanoPapelCierreCaja' },
											{ model: Clase, as: 'formatoPapelFactura' },
											{ model: Clase, as: 'formatoColorFactura' },
											{ model: Clase, as: 'formatoConFirmaFactura' },
											{ model: Clase, as: 'formatoPapelFacturaServicio' },
											{ model: Clase, as: 'formatoColorFacturaServicio' },
											{ model: Clase, as: 'tipoConfiguracion' },
											{ model: Clase, as: 'formatoPapelNotaVenta' },
											{ model: Clase, as: 'formatoColorNotaVenta' },
											{ model: Clase, as: 'tipoConfiguracionNotaVenta' },
											{ model: Clase, as: 'formatoConFirmaNotaVenta' },
											{ model: Clase, as: 'formatoPapelNotaTraspaso' },
											{ model: Clase, as: 'formatoColorNotaTraspaso' },
											{ model: Clase, as: 'tipoConfiguracionNotaTraspaso' },
											{ model: Clase, as: 'formatoPapelNotaBaja' },
											{ model: Clase, as: 'formatoColorNotaBaja' },
											{ model: Clase, as: 'tipoConfiguracionNotaBaja' },
											{ model: Clase, as: 'tipoConfiguracionNotaServicio' }]
										}).then(function (configuracionFactura) {
											res.json({
												sucursalPrincipal: sucursalPrincipalEncontrada,
												venta: venta,
												configuracion: configuracionFactura,
												sucursal: venta.sucursal,
												numero_literal: venta.numero_literal,
												pieFactura: dosificacion.pieFactura, sucursalDestino: ((venta.almacenTraspaso) ? venta.almacenTraspaso.sucursal : null)
											});
										});
									}
								});
							} else {
								if (configuracionGeneralFactura.usar) {
									res.json({
										sucursalPrincipal: sucursalPrincipalEncontrada,
										venta: venta, configuracion: configuracionGeneralFactura, sucursal: venta.sucursal,
										numero_literal: venta.numero_literal, sucursalDestino: ((venta.almacenTraspaso) ? venta.almacenTraspaso.sucursal : null)
									});
								} else {
									ConfiguracionFactura.find({
										where: {
											id_sucursal: venta.sucursal.id
										},
										include: [{ model: Clase, as: 'impresionFactura' },
										{ model: Clase, as: 'tipoFacturacion' },
										{ model: Clase, as: 'tamanoPapelFactura' },
										{ model: Clase, as: 'tituloFactura' },
										{ model: Clase, as: 'subtituloFactura' },
										{ model: Clase, as: 'tamanoPapelNotaVenta' }]
									}).then(function (configuracionFactura) {
										res.json({
											sucursalPrincipal: sucursalPrincipalEncontrada,
											venta: venta,
											configuracion: configuracionFactura,
											sucursal: venta.sucursal,
											numero_literal: venta.numero_literal, sucursalDestino: ((venta.almacenTraspaso) ? venta.almacenTraspaso.sucursal : null)
										});
									});
								}
							}
						} else {
							SucursalActividadDosificacion.find({
								where: {
									id_actividad: venta.actividad.id,
									id_sucursal: venta.sucursal.id
								},
								include: [{ model: Dosificacion, as: 'dosificacion', include: [{ model: Clase, as: 'pieFactura' }] }]
							}).then(function (sucursalActividadDosificacion) {
								var dosificacion = sucursalActividadDosificacion.dosificacion;
								if (configuracionGeneralFactura.usar) {
									res.json({
										sucursalPrincipal: sucursalPrincipalEncontrada,
										venta: venta, configuracion: configuracionGeneralFactura, sucursal: venta.sucursal,
										numero_literal: venta.numero_literal, pieFactura: dosificacion.pieFactura, sucursalDestino: ((venta.almacenTraspaso) ? venta.almacenTraspaso.sucursal : null)
									});
								} else {
									ConfiguracionFactura.find({
										where: {
											id_sucursal: venta.sucursal.id
										},
										include: [{ model: Clase, as: 'impresionFactura' },
										{ model: Clase, as: 'tipoFacturacion' },
										{ model: Clase, as: 'tamanoPapelFactura' },
										{ model: Clase, as: 'tituloFactura' },
										{ model: Clase, as: 'subtituloFactura' },
										{ model: Clase, as: 'tamanoPapelNotaVenta' },

										{ model: Clase, as: 'tamanoPapelFacturaServicio' },
										{ model: Clase, as: 'tamanoPapelNotaTraspaso' },
										{ model: Clase, as: 'tamanoPapelNotaBaja' },
										{ model: Clase, as: 'tamanoPapelNotaPedido' },
										{ model: Clase, as: 'tamanoPapelCierreCaja' },
										{ model: Clase, as: 'formatoPapelFactura' },
										{ model: Clase, as: 'formatoColorFactura' },
										{ model: Clase, as: 'formatoConFirmaFactura' },
										{ model: Clase, as: 'formatoPapelFacturaServicio' },
										{ model: Clase, as: 'formatoColorFacturaServicio' },
										{ model: Clase, as: 'tipoConfiguracion' },
										{ model: Clase, as: 'formatoPapelNotaVenta' },
										{ model: Clase, as: 'formatoColorNotaVenta' },
										{ model: Clase, as: 'tipoConfiguracionNotaVenta' },
										{ model: Clase, as: 'formatoConFirmaNotaVenta' },
										{ model: Clase, as: 'formatoPapelNotaTraspaso' },
										{ model: Clase, as: 'formatoColorNotaTraspaso' },
										{ model: Clase, as: 'tipoConfiguracionNotaTraspaso' },
										{ model: Clase, as: 'formatoPapelNotaBaja' },
										{ model: Clase, as: 'formatoColorNotaBaja' },
										{ model: Clase, as: 'tipoConfiguracionNotaBaja' }]
									}).then(function (configuracionFactura) {
										res.json({
											sucursalPrincipal: sucursalPrincipalEncontrada,
											venta: venta,
											configuracion: configuracionFactura,
											sucursal: venta.sucursal,
											numero_literal: venta.numero_literal,
											pieFactura: dosificacion.pieFactura, sucursalDestino: ((venta.almacenTraspaso) ? venta.almacenTraspaso.sucursal : null)
										});
									});
								}
							});
						}
					});

				});
			})
		})


		.put(ensureAuthorizedlogged, function (req, res) {
			sequelize.transaction(function (t) {
				if (req.body.saldoRestante == 0) {
					var anticipo = 0
				} else {
					var anticipo = req.body.saldoRestante * (-1);
				}
				var pagoV = req.body.pago - anticipo
				return Venta.find({
					where: { id: req.params.id },
					include: [{
						model: Almacen, as: 'almacen', required: true,
						include: [{ model: Sucursal, as: 'sucursal', where: { activo: true }, required: true }]
					}], transaction: t
				}).then(function (ventaEncontrada) {
					if (!ventaEncontrada) throw new Error('Sucursal Deshabilitada, no se pueden hacer cambios.')
					return Venta.update({
						a_cuenta: ventaEncontrada.a_cuenta + pagoV,
						saldo: ventaEncontrada.total - (ventaEncontrada.a_cuenta + pagoV)
					}, {
						where: {
							id: ventaEncontrada.id
						}, transaction: t
					}).then(function (affectedRows) {
						return PagoVenta.create({
							id_venta: ventaEncontrada.id,
							a_cuenta_anterior: ventaEncontrada.a_cuenta,
							saldo_anterior: ventaEncontrada.saldo,
							monto_pagado: pagoV,
							id_usuario: req.body.id_usuario_cajero,
							numero_documento: ventaEncontrada.almacen.sucursal.nota_recibo_correlativo
						}, {
							transaction: t
						}).then(function (detalleVentaCreada) {
							return Sucursal.update({
								nota_recibo_correlativo: ventaEncontrada.almacen.sucursal.nota_recibo_correlativo + 1
							}, {
								where: {
									id: ventaEncontrada.almacen.sucursal.id
								}, transaction: t
							}).then(function (affectedRows) {
								if (anticipo != 0) {
									return Sucursal.find({
										where: { id: ventaEncontrada.almacen.sucursal.id }, transaction: t
									}).then(function (sucursalEncontrada) {
										return ClienteAnticipo.create({
											id_cliente: parseInt(ventaEncontrada.id_cliente),
											monto_anticipo: anticipo,
											fecha: req.body.fecha,
											monto_salida: 0,
											saldo: anticipo,
											id_sucursal: ventaEncontrada.almacen.sucursal.id,
											numero_correlativo_anticipo: sucursalEncontrada.anticipo_cliente_correlativo,
											eliminado: false
										}, {
											transaction: t
										}).then(function (clienteCreado) {
											var correlativo = sucursalEncontrada.anticipo_cliente_correlativo + 1
											return Sucursal.update({
												anticipo_cliente_correlativo: correlativo
											}, {
												where: { id: ventaEncontrada.almacen.sucursal.id }, transaction: t
											}).then(function (Actualizado) {
												return ClienteAnticipo.find({
													where: { id: clienteCreado.id },
													include: [{ model: Sucursal, as: 'sucursal' }, { model: Cliente, as: 'cliente' }], transaction: t
												}).then(function (encontrado) {
													var pago = NumeroLiteral.Convertir(parseFloat(pagoV).toFixed(2).toString());
													return new Promise(function (fulfill, reject) {
														fulfill({ anticipo: encontrado, mensaje: "¡Saldo de cuenta actualizado satisfactoriamente!", pago: pago, venta: ventaEncontrada });
													})
												}).catch(function (err) {
													return new Promise(function (fulfill, reject) {
														reject((err.stack !== undefined) ? err.stack : err);
													});
												});

											}).catch(function (err) {
												return new Promise(function (fulfill, reject) {
													reject((err.stack !== undefined) ? err.stack : err);
												});
											});

										}).catch(function (err) {
											return new Promise(function (fulfill, reject) {
												reject((err.stack !== undefined) ? err.stack : err);
											});
										});
									}).catch(function (err) {
										return new Promise(function (fulfill, reject) {
											reject((err.stack !== undefined) ? err.stack : err);
										});
									});
								} else {
									var pago = NumeroLiteral.Convertir(parseFloat(pagoV).toFixed(2).toString());
									return new Promise(function (fulfill, reject) {
										fulfill({ anticipo: {}, mensaje: "¡Saldo de cuenta actualizado satisfactoriamente!", pago: pago, venta: ventaEncontrada });
									})
								}
							}).catch(function (err) {
								return new Promise(function (fulfill, reject) {
									reject((err.stack !== undefined) ? err.stack : err);
								});
							});
						}).catch(function (err) {
							return new Promise(function (fulfill, reject) {
								reject((err.stack !== undefined) ? err.stack : err);
							});
						});
					}).catch(function (err) {
						return new Promise(function (fulfill, reject) {
							reject((err.stack !== undefined) ? err.stack : err);
						});
					});
				}).catch(function (err) {
					return new Promise(function (fulfill, reject) {
						reject((err.stack !== undefined) ? err.stack : err);
					});
				});
			}).then(function (result) {
				res.json(result);
			}).catch(function (err) {
				res.json({ hasError: true, mensaje: err.stack ? err.stack : err });
			});
		});
	router.route('/compensacion/ventas/:id/empresa/:id_empresa/cliente/:id_cliente')
		.put(ensureAuthorizedlogged, function (req, res) {
			sequelize.transaction(function (t) {
				return Venta.find({
					where: { id: req.params.id },
					include: [{
						model: Almacen, as: 'almacen', required: true,
						include: [{ model: Sucursal, as: 'sucursal', where: { activo: true }, required: true },
						]
					}, {
						model: Movimiento, as: 'movimiento',
						include: [{ model: Clase, as: 'clase' }]
					}], transaction: t
				}).then(function (ventaEncontrada) {
					if (!ventaEncontrada) throw new Error('Sucursal deshabilitada, no se pueden hacer cambios.')
					return Venta.update({
						a_cuenta: ventaEncontrada.a_cuenta + req.body.pago,
						a_cuenta_dolares: ventaEncontrada.a_cuenta_dolares + req.body.pagado_dolares,
						saldo: ventaEncontrada.total - (ventaEncontrada.a_cuenta + req.body.pago),
						saldo_dolares: ventaEncontrada.total - (ventaEncontrada.a_cuenta_dolares + req.body.pago)

					}, {
						where: {
							id: ventaEncontrada.id
						}, transaction: t
					}).then(function (affectedRows) {
						return PagoVenta.create({
							id_venta: ventaEncontrada.id,
							a_cuenta_anterior: ventaEncontrada.a_cuenta,
							saldo_anterior: ventaEncontrada.saldo,
							monto_pagado: req.body.pago,
							id_usuario: req.body.id_usuario_cajero,
							numero_documento: ventaEncontrada.almacen.sucursal.anticipo_compensacion_cliente_correlativo
						}, {
							transaction: t
						}).then(function (PagoVentaCreado) {
							return Sucursal.update({
								anticipo_compensacion_cliente_correlativo: ventaEncontrada.almacen.sucursal.anticipo_compensacion_cliente_correlativo + 1
							}, {
								where: {
									id: ventaEncontrada.almacen.sucursal.id
								}, transaction: t
							}).then(function (affectedRows) {
								return ClienteAnticipo.findAll({
									where: { id_cliente: req.params.id_cliente, saldo: { $gt: 0 } }, transaction: t
								}).then(function (AnticiposEncontrados) {
									return guardarAnticiposCliente(req, res, AnticiposEncontrados, ventaEncontrada.almacen.sucursal, req.body.pago, ventaEncontrada, t, PagoVentaCreado)
								}).catch(function (err) {
									return new Promise(function (fulfill, reject) {
										reject((err.stack !== undefined) ? err.stack : err);
									});
								})

								/* var pago = NumeroLiteral.Convertir(parseFloat(req.body.pago).toFixed(2).toString());
								res.json({ mensaje: "¡Saldo de cuenta actualizado satisfactoriamente!", pago: pago, venta: ventaEncontrada }); */
							}).catch(function (err) {
								return new Promise(function (fulfill, reject) {
									reject((err.stack !== undefined) ? err.stack : err);
								});
							});
						}).catch(function (err) {
							return new Promise(function (fulfill, reject) {
								reject((err.stack !== undefined) ? err.stack : err);
							});
						});
					}).catch(function (err) {
						return new Promise(function (fulfill, reject) {
							reject((err.stack !== undefined) ? err.stack : err);
						});
					});
				}).catch(function (err) {
					return new Promise(function (fulfill, reject) {
						reject((err.stack !== undefined) ? err.stack : err);
					});
				});
			}).then(function (result) {
				res.json(result[0]);
			}).catch(function (err) {
				res.json({ hasError: true, mensaje: err.stack ? err.stack : err });
			});
		});
	function guardarAnticiposCliente(req, res, AnticiposEncontrados, sucursal, pago, ventaEncontrada, t, PagoVentaCreado) {
		var cantidadTotal = req.body.pago
		var promises = []
		for (var i = 0; i < AnticiposEncontrados.length; i++) {
			var anticipo = AnticiposEncontrados[i];


			if (cantidadTotal > 0) {
				var cantidadParcial;
				if (cantidadTotal > anticipo.saldo) {
					cantidadParcial = anticipo.saldo;
					cantidadTotal = cantidadTotal - anticipo.saldo
				} else {
					cantidadParcial = cantidadTotal;
					cantidadTotal = 0;
				}

				if (cantidadParcial > 0) {
					promises.push(guardarDetalleHijosAnticipo(req, res, anticipo, cantidadParcial, sucursal, pago, ventaEncontrada, t, PagoVentaCreado))
				}
			}
		}
		return Promise.all(promises)
	}
	function guardarDetalleHijosAnticipo(req, res, anticipo, cantidadParcial, sucursal, pago, ventaEncontrada, t, PagoVentaCreado) {
		return Sucursal.find({
			where: { id: sucursal.id }, transaction: t
		}).then(function (sucursalEncontrada) {
			return ClienteAnticipo.update({
				monto_salida: anticipo.monto_salida + cantidadParcial,
				saldo: anticipo.saldo - (anticipo.monto_salida + cantidadParcial)
			}, {
				where: { id: anticipo.id },
				transaction: t
			}).then(function (anticipoActualizado) {
				return ClienteAnticipo.create({
					id_cliente: parseInt(req.params.id_cliente),
					id_pago_venta: PagoVentaCreado.id,
					monto_anticipo: anticipo.monto_anticipo,
					fecha: req.body.fecha,
					monto_salida: cantidadParcial,
					saldo: anticipo.saldo - cantidadParcial,
					id_sucursal: sucursal.id,
					eliminado: false,
					id_padre: anticipo.id
				}, {
					transaction: t
				}).then(function (clienteCreado) {
					return ClienteAnticipo.find({
						where: { id: clienteCreado.id },
						include: [{ model: Sucursal, as: 'sucursal' }, { model: Cliente, as: 'cliente' }], transaction: t
					}).then(function (encontrado) {
						var pago = NumeroLiteral.Convertir(parseFloat(req.body.pago).toFixed(2).toString());
						return new Promise(function (fulfill, reject) {
							fulfill({ mensaje: "¡Saldo de cuenta actualizado satisfactoriamente!", pago: pago, venta: ventaEncontrada, anticipo: encontrado });
						});
					}).catch(function (err) {
						return new Promise(function (fulfill, reject) {
							reject((err.stack !== undefined) ? err.stack : err);
						});
					})
				}).catch(function (err) {
					return new Promise(function (fulfill, reject) {
						reject((err.stack !== undefined) ? err.stack : err);
					});
				})
			}).catch(function (err) {
				return new Promise(function (fulfill, reject) {
					reject((err.stack !== undefined) ? err.stack : err);
				});
			});
		}).catch(function (err) {
			return new Promise(function (fulfill, reject) {
				reject((err.stack !== undefined) ? err.stack : err);
			});
		})
	}
	router.route('/compensacion/compra/:id/empresa/:id_empresa/proveedor/:id_proveedor')
		.put(ensureAuthorizedlogged, function (req, res) {
			sequelize.transaction(function (t) {
				return Compra.find({
					where: { id: req.params.id },
					include: [{
						model: Almacen, as: 'almacen', required: true,
						include: [{ model: Sucursal, as: 'sucursal', where: { activo: true }, required: true },
						]
					}, {
						model: Movimiento, as: 'movimiento',
						include: [{ model: Clase, as: 'clase' }]
					}], transaction: t
				}).then(function (compraEncontrada) {
					if (!compraEncontrada) throw new Error('Sucursal deshabilitada, no se pueden hacer cambios.')
					return Compra.update({
						a_cuenta: compraEncontrada.a_cuenta + req.body.pago,
						saldo: compraEncontrada.total - (compraEncontrada.a_cuenta + req.body.pago)
					}, {
						where: {
							id: compraEncontrada.id
						}, transaction: t
					}).then(function (affectedRows) {
						return PagoCompra.create({
							id_compra: compraEncontrada.id,
							a_cuenta_anterior: compraEncontrada.a_cuenta,
							saldo_anterior: compraEncontrada.saldo,
							monto_pagado: req.body.pago,
							id_usuario: req.body.id_usuario_cajero,
							numero_documento: compraEncontrada.almacen.sucursal.anticipo_compensacion_proveedor_correlativo
						}, {
							transaction: t
						}).then(function (PagoCompraCreado) {
							return Sucursal.update({
								anticipo_compensacion_proveedor_correlativo: compraEncontrada.almacen.sucursal.anticipo_compensacion_proveedor_correlativo + 1
							}, {
								where: {
									id: compraEncontrada.almacen.sucursal.id
								}, transaction: t
							}).then(function (affectedRows) {
								return ProveedorAnticipo.findAll({
									where: { id_proveedor: req.params.id_proveedor, saldo: { $gt: 0 } }, transaction: t
								}).then(function (AnticiposEncontrados) {
									return guardarAnticiposProveedor(req, res, AnticiposEncontrados, compraEncontrada.almacen.sucursal, req.body.pago, compraEncontrada, t, PagoCompraCreado)
								}).catch(function (err) {
									return new Promise(function (fulfill, reject) {
										reject((err.stack !== undefined) ? err.stack : err);
									});
								})

								/* var pago = NumeroLiteral.Convertir(parseFloat(req.body.pago).toFixed(2).toString());
								res.json({ mensaje: "¡Saldo de cuenta actualizado satisfactoriamente!", pago: pago, venta: ventaEncontrada }); */
							}).catch(function (err) {
								return new Promise(function (fulfill, reject) {
									reject((err.stack !== undefined) ? err.stack : err);
								});
							});
						}).catch(function (err) {
							return new Promise(function (fulfill, reject) {
								reject((err.stack !== undefined) ? err.stack : err);
							});
						});
					}).catch(function (err) {
						return new Promise(function (fulfill, reject) {
							reject((err.stack !== undefined) ? err.stack : err);
						});
					});
				}).catch(function (err) {
					return new Promise(function (fulfill, reject) {
						reject((err.stack !== undefined) ? err.stack : err);
					});
				});
			}).then(function (result) {
				res.json(result[0]);
			}).catch(function (err) {
				res.json({ hasError: true, mensaje: err.stack ? err.stack : err });
			});
		});
	function guardarAnticiposProveedor(req, res, AnticiposEncontrados, sucursal, pago, compraEncontrada, t, PagoCompraCreado) {
		var cantidadTotal = req.body.pago
		var promises = []
		for (var i = 0; i < AnticiposEncontrados.length; i++) {
			var anticipo = AnticiposEncontrados[i];


			if (cantidadTotal > 0) {
				var cantidadParcial;
				if (cantidadTotal > anticipo.saldo) {
					cantidadParcial = anticipo.saldo;
					cantidadTotal = cantidadTotal - anticipo.saldo
				} else {
					cantidadParcial = cantidadTotal;
					cantidadTotal = 0;
				}

				if (cantidadParcial > 0) {
					promises.push(guardarDetalleHijosAnticipoProveedor(req, res, anticipo, cantidadParcial, sucursal, pago, compraEncontrada, t, PagoCompraCreado))
				}
			}
		}
		return Promise.all(promises)
	}
	function guardarDetalleHijosAnticipoProveedor(req, res, anticipo, cantidadParcial, sucursal, pago, compraEncontrada, t, PagoCompraCreado) {
		return Sucursal.find({
			where: { id: sucursal.id }, transaction: t
		}).then(function (sucursalEncontrada) {
			return ProveedorAnticipo.update({
				monto_salida: anticipo.monto_salida + cantidadParcial,
				saldo: anticipo.saldo - (anticipo.monto_salida + cantidadParcial)
			}, {
				where: { id: anticipo.id },
				transaction: t
			}).then(function (anticipoActualizado) {
				return ProveedorAnticipo.create({
					id_proveedor: parseInt(req.params.id_proveedor),
					id_pago_compra: PagoCompraCreado.id,
					monto_anticipo: anticipo.monto_anticipo,
					fecha: req.body.fecha,
					monto_salida: cantidadParcial,
					saldo: anticipo.saldo - cantidadParcial,
					id_sucursal: sucursal.id,
					eliminado: false,
					id_padre: anticipo.id
				}, {
					transaction: t
				}).then(function (ProvedorAnticipoCreado) {
					return ProveedorAnticipo.find({
						where: { id: ProvedorAnticipoCreado.id },
						include: [{ model: Sucursal, as: 'sucursal' }, { model: Proveedor, as: 'proveedor' }], transaction: t
					}).then(function (encontrado) {
						var pago = NumeroLiteral.Convertir(parseFloat(req.body.pago).toFixed(2).toString());
						return new Promise(function (fulfill, reject) {
							fulfill({ mensaje: "¡Saldo de cuenta actualizado satisfactoriamente!", pago: pago, compra: compraEncontrada, anticipo: encontrado });
						});
					}).catch(function (err) {
						return new Promise(function (fulfill, reject) {
							reject((err.stack !== undefined) ? err.stack : err);
						});
					})
				}).catch(function (err) {
					return new Promise(function (fulfill, reject) {
						reject((err.stack !== undefined) ? err.stack : err);
					});
				})
			}).catch(function (err) {
				return new Promise(function (fulfill, reject) {
					reject((err.stack !== undefined) ? err.stack : err);
				});
			});
		}).catch(function (err) {
			return new Promise(function (fulfill, reject) {
				reject((err.stack !== undefined) ? err.stack : err);
			});
		})
	}
	router.route('/ventas/:id_empresa/inicio/:inicio/fin/:fin/:sucursal')
		.get(ensureAuthorizedlogged, function (req, res) {
			var { id_empresa, inicio, fin, sucursal } = req.params

			if (!(id_empresa && sucursal)) return res.json({ error: true, message: "Parámetros incorrectos", messageType: "error" })
			try {
				inicio = inicio != '0' ? inicio.split('/').reverse().join('-') : new Date.getFullYear() + "/01/01"
				fin = fin != '0' ? fin.split('/').reverse().join('-') : "CURRENT_TIMESTAMP"
				let qry = `SELECT venta.id id_venta,tpago.nombre_corto tipo_pago,v_clase.nombre_corto clase_venta,dv.id id_detalle_venta,dv.cantidad v_cantidad,dv.precio_unitario v_precio,dv.total total_ventas,inv.costo_unitario_neto,inv.id id_inventario FROM inv_venta venta INNER JOIN agil_almacen alm ON alm.id=venta.almacen INNER JOIN agil_sucursal suc ON suc.id=alm.sucursal INNER JOIN inv_movimiento mov ON mov.id=venta.movimiento INNER JOIN gl_clase v_clase ON v_clase.id=mov.clase AND v_clase.nombre_corto IN ( "PFR", "FACT", "SERV" ) INNER JOIN inv_detalle_venta dv ON dv.venta=venta.id LEFT JOIN inv_inventario inv ON inv.id=dv.inventario INNER JOIN gl_clase tpago ON tpago.id=venta.tipo_pago`
				qry += ` WHERE suc.empresa=${id_empresa} AND venta.activa=TRUE  AND mov.fecha BETWEEN "${inicio} 00:00:00" AND "${fin} 23:59:59" `
				if (sucursal != "0") qry += `  AND suc.id=${sucursal}`
				sequelize.query(qry, { type: sequelize.QueryTypes.SELECT })
					.then(function (data) {
						qry = `SELECT cenco.id id_cenco, cenco.nombre AS cenco,prod.nombre AS producto,dcom.importe, clasmov.nombre_corto AS tipo FROM inv_compra compra INNER JOIN inv_movimiento mov ON mov.id=compra.movimiento INNER JOIN gl_clase clasmov ON clasmov.id=mov.clase INNER JOIN inv_detalle_compra dcom ON dcom.compra=compra.id INNER JOIN gl_clase cenco ON cenco.id=dcom.centro_costo INNER JOIN agil_producto prod ON prod.id=dcom.producto LEFT JOIN agil_almacen almacen ON almacen.id=compra.almacen INNER JOIN sys_usuario usu ON usu.id=compra.usuario WHERE (cenco.nombre_corto !="ALM" OR cenco.nombre_corto IS NULL) AND compra.fecha BETWEEN "${inicio} 00:00:00" AND "${fin} 23:59:59" AND usu.empresa=${id_empresa}`
						if (sucursal != 0) qry += ` AND almacen.sucursal=${sucursal}`
						qry += ` ORDER BY cenco.nombre ASC`
						sequelize.query(qry, {
							type: sequelize.QueryTypes.SELECT
						})
							.then(function (otros) {
								res.json({ error: false, data, otros });
							})
							.catch(e => res.json({ error: true, message: "<b>Ocurrió un error</b><br>" + e, messageType: "error" }))
					})
					.catch(e => res.json({ error: true, message: "<b>Ocurrió un error</b><br>" + e, messageType: "error" }))
			} catch (e) {
				res.json({ error: true, message: "<b>Ocurrió un error</b><br>" + e, messageType: "error" })
			}

		});

	router.route('/compras/:id/empresa/:id_empresa')
		.get(ensureAuthorizedlogged, function (req, res) {
			Compra.find({
				where: {
					id: req.params.id
				},
				include: [{ model: Clase, as: 'tipoMovimiento', required: false }, { model: Sucursal, as: 'sucursal', required: false }, { model: Proveedor, as: 'proveedor', required: false },
				{
					model: DetalleCompra, as: 'detallesCompra', include: [{ model: Clase, as: 'servicio', required: false }, { model: Producto, as: 'producto', required: false },
					{ model: Inventario, as: 'inventario', required: false }]
				},
				{ model: Almacen, as: 'almacen', required: false, include: [{ model: Sucursal, as: 'sucursal', required: false }] },
				//{model:Clase,as:'actividad'},
				{ model: Clase, as: 'tipoPago', required: false },
				{ model: Movimiento, as: 'movimiento', required: false, include: [{ model: Clase, as: 'clase' }] }]

			}).then(function (compra) {
				if (compra.sucursal == undefined) {
					compra.sucursal = compra.almacen.sucursal;
				}
				compra.numero_literal = NumeroLiteral.Convertir(parseFloat(compra.total).toFixed(2).toString());
				compra.numero_literal_dolares = NumeroLiteral.Convertir(parseFloat(compra.total_dolares).toFixed(2).toString(), 'Dolares');

				ConfiguracionGeneralFactura.find({
					where: {
						id_empresa: req.params.id_empresa
					},
					include: [{ model: Clase, as: 'impresionFactura' },
					{ model: Clase, as: 'tipoFacturacion' },
					{ model: Clase, as: 'tamanoPapelFactura' },
					{ model: Clase, as: 'tituloFactura' },
					{ model: Clase, as: 'subtituloFactura' },
					{ model: Clase, as: 'pieFactura' },
					{ model: Clase, as: 'tamanoPapelNotaVenta' },]
				}).then(function (configuracionGeneralFactura) {
					if (configuracionGeneralFactura.usar) {
						res.json({ compra: compra, configuracion: configuracionGeneralFactura, sucursal: compra.sucursal, numero_literal: compra.numero_literal });
					} else {
						ConfiguracionFactura.find({
							where: {
								id_sucursal: compra.sucursal.id
							},
							include: [{ model: Clase, as: 'impresionFactura' },
							{ model: Clase, as: 'tipoFacturacion' },
							{ model: Clase, as: 'tamanoPapelFactura' },
							{ model: Clase, as: 'tituloFactura' },
							{ model: Clase, as: 'subtituloFactura' },
							{ model: Clase, as: 'pieFactura' },
							{ model: Clase, as: 'tamanoPapelNotaVenta' },]
						}).then(function (configuracionFactura) {
							res.json({
								compra: compra,
								configuracion: configuracionFactura,
								sucursal: compra.sucursal,
								numero_literal: compra.numero_literal
							});
						});
					}
				});

			});
		})

	// router.route('/ingreso-por-inventario/:id_empresa')
	// 	.get(ensureAuthorizedlogged, function (req, res) {
	// 		Movimiento.findAll({
	// 			include: [{ model: DetalleMovimiento, as: 'detallesMovimiento', where: { id_producto: { $not: null } }, include: [{ model: Inventario, as: 'inventario' }, { model: Producto, as: 'producto', required: true }] },
	// 			{ model: Clase, as: 'clase', where: { nombre_corto: Diccionario.ING_POR_INVENTARIO } }, {
	// 				model: Almacen, as: 'almacen',
	// 				include: [{ model: Sucursal, as: 'sucursal', where: { id_empresa: req.params.id_empresa } }]
	// 			}]
	// 		}).then(function (productos) {
	// 			res.json(productos);
	// 		}).catch(function (err) {
	// 			res.json({ mensaje: (err.stack !== undefined) ? err.stack : err, hasErr: true })
	// 		})
	// 	});

	router.route('/ingreso-por-inventario/prueba')
		.get(ensureAuthorizedlogged, function (req, res) {
			var ids = req.query.ids;
			DetalleMovimiento.findAll({
				where: { movimiento: ids },
				include: [
					{ model: Inventario, as: 'inventario' },
					{ model: Producto, as: 'producto', required: true },
					{
						model: Movimiento, as: 'movimiento',
						include: [
							{
								model: Almacen, as: 'almacen',
								include: [{ model: Sucursal, as: 'sucursal' }]
							}
						]
					}
				]
			}).then(function (productos) {
				res.json(productos);
			}).catch(function (err) {
				res.json({ mensaje: (err.stack !== undefined) ? err.stack : err, hasErr: true })
			})

		});

	router.route('/ingreso-por-inventario/:id_empresa')
		.get(ensureAuthorizedlogged, function (req, res) {
			Movimiento.findAll({
				where: Sequelize.literal('EXISTS (SELECT id FROM inv_detalle_movimiento WHERE inv_movimiento.id = inv_detalle_movimiento.movimiento LIMIT 1)'),
				include: [
					{ model: Clase, as: 'clase', where: { nombre_corto: Diccionario.ING_POR_INVENTARIO } }, {
						model: Almacen, as: 'almacen',
						include: [{ model: Sucursal, as: 'sucursal', where: { id_empresa: req.params.id_empresa } }]
					}]
			}).then(function (productos) {
				res.json(productos);
			}).catch(function (err) {
				res.json({ mensaje: (err.stack !== undefined) ? err.stack : err, hasErr: true })
			})
		});

	router.route('/ingreso-por-inventario/detalle/:id_movimiento')
		.get(ensureAuthorizedlogged, function (req, res) {
			DetalleMovimiento.findAll({
				where: { id_movimiento: req.params.id_movimiento, id_producto: { $not: null } },
				include: [{ model: Inventario, as: 'inventario' }, { model: Producto, as: 'producto', required: true }]
			}).then(function (productos) {
				res.json(productos);
			}).catch(function (err) {
				res.json({ mensaje: (err.stack !== undefined) ? err.stack : err, hasErr: true })
			})
		});

	router.route('/actualizar-movimiento-detalle/:id')
		.put(ensureAuthorizedlogged, function (req, res) {
			var imp = req.body.cantidad * req.body.costo_unitario ? req.body.costo_unitario : 0
			var imp_dolares = req.body.cantidad * req.body.costo_unitario_dolares ? req.body.costo_unitario_dolares : 0
			var total = imp - req.body.descuento + req.body.recargo - req.body.ice - req.body.excento
			var total_dolares = imp_dolares - req.body.descuento + req.body.recargo - req.body.ice - req.body.excento

			DetalleMovimiento.update({
				cantidad: req.body.cantidad,
				costo_unitario: req.body.costo_unitario ? req.body.costo_unitario : 0,
				costo_unitario_dolares: req.body.costo_unitario_dolares ? req.body.costo_unitario_dolares : 0,
				importe: imp,
				importe_dolares: imp_dolares,
				total: total,
				total_dolares: total_dolares
			}, {
				where: { id: req.params.id }

			}).then(function (detalleMovimientoActualizado) {
				Inventario.update({
					cantidad: req.body.cantidad,
					costo_unitario: req.body.costo_unitario ? req.body.costo_unitario : 0,
					costo_unitario_dolares: req.body.costo_unitario_dolares ? req.body.costo_unitario_dolares : 0,
					lote: req.body.inventario.lote,
					fecha_vencimiento: req.body.inventario.fecha_vencimiento,
					costo_total: total,
					costo_total_dolares: total_dolares
				}, {
					where: {
						id: req.body.id_inventario
					}

				}).then(function (inventarioActualizado) {
					res.json({ mensaje: "actualizado satisfactoriamente!" });
				});
			});
			// DetalleMovimiento.update({
			// 	cantidad: req.body.cantidad,
			// 	costo_unitario: req.body.costo_unitario
			// }, {
			// 		where: { id: req.params.id }

			// 	}).then(function (detalleMovimientoActualizado) {
			// 		Inventario.update({
			// 			cantidad: req.body.cantidad,
			// 			costo_unitario: req.body.costo_unitario,
			// 			lote: req.body.inventario.lote,
			// 			fecha_vencimiento: req.body.inventario.fecha_vencimiento
			// 		}, {
			// 				where: {
			// 					id: req.body.id_inventario
			// 				}

			// 			}).then(function (inventarioActualizado) {
			// 				res.json({ mensaje: "actualizado satisfactoriamente!" });
			// 			});
			// 	});
		});

	router.route('/movimientos')
		.get(ensureAuthorizedlogged, function (req, res) {
			Movimiento.findAll({

			}).then(function (movimiento) {
				res.json(movimiento);
			})
		});



	router.route('/cliente/verificar-credito/:id_cliente/tipo/:id_tipo')
		.get(ensureAuthorizedlogged, function (req, res) {
			Venta.findAll({
				where: {
					id_cliente: req.params.id_cliente,
					saldo: { $ne: 0 },
					id_tipo_pago: req.params.id_tipo
				}
			}).then(function (Ventas) {
				res.json({ ventas: Ventas });

			});
		});
	var contador = 0
	router.route('/actualizarMovimientos/empresa/:id_empresa')
		.put(ensureAuthorizedlogged, function (req, res) {
			req.body.mensaje = ""
			var inicio = new Date(2018, 05, 25)
			var fin = new Date(2018, 06, 30)
			inicio.setHours(0, 0, 0, 0, 0);
			fin.setHours(23, 59, 59, 59);
			req.body.actualizados = 0
			contador = 0
			req.body.ids = []
			sequelize.transaction(function (t) {
				var promises1 = [];
				var a = 0
				return DetalleVenta.findAll({

					include: [{
						model: Producto, as: 'producto', include: [
							{ model: Clase, as: 'tipoProducto' }, {
								model: ProductoBase, as: 'productosBase',
								include: [{ model: Producto, as: 'productoBase' }]
							}
						]
					}, {
						model: Venta, as: 'venta', where: { id: req.params.id_empresa }, include: [{
							model: Almacen, as: 'almacen',
							include: [{
								model: Sucursal, as: 'sucursal', where: { activo: true }, required: true,
								include: [{ model: Empresa, as: 'empresa' }]
							}]
						}]
					}], transaction: t
				}).then(function (detallesVenta) {
					detallesVenta.forEach(function (detalleVenta, index, array) {
						if (detalleVenta.venta.activa) {
							/* for (var i = 0; i < venta.detallesVenta.length; i++) { */
							/* var detalle = venta.detallesVenta[i]; */
							promises1.push(DetalleMovimiento.find({
								where: {
									id_movimiento: detalleVenta.venta.dataValues.id_movimiento, id_producto: detalleVenta.dataValues.id_producto,
									cantidad: detalleVenta.dataValues.cantidad
								}, transaction: t
							}).then(function (detalleMovimientoEncontrado) {
								if (!detalleMovimientoEncontrado) {
									req.body.actualizados++
									return Movimiento.find({
										where: { id: detalleVenta.venta.id_movimiento }, transaction: t
									}).then(function (movimientoEncontrado) {
										var arrgloInv = []/* promises.push(calcularCostosEgresos(detalle, detalle.producto, detalle.cantidad, arrgloInv, movimientoEncontrado, index, array, res, venta, t)) */
										if (detalleVenta.producto.tipoProducto.nombre_corto == Diccionario.TIPO_PRODUCTO_BASE) {
											return calcularCostosEgresos(detalleVenta, detalleVenta.producto, detalleVenta.cantidad, arrgloInv,
												movimientoEncontrado, index, array, res, detalleVenta.venta, t, detalleVenta)
										} else if (detalleVenta.producto.tipoProducto.nombre_corto == Diccionario.TIPO_PRODUCTO_INTERMEDIO) {
											var promises = [];
											for (var i = 0; i < detalleVenta.producto.productosBase.length; i++) {
												if ((i + 1) == detalleVenta.producto.productosBase.length) {
													promises.push(calcularCostosEgresos(detalleVenta, detalleVenta.producto.productosBase[i].productoBase, detalleVenta.producto.productosBase[i].formulacion * detalleVenta.cantidad, arrgloInv,
														movimientoEncontrado, index, array, res, detalleVenta.venta, t, detalleVenta));
												} else {
													promises.push(calcularCostosEgresos(detalleVenta, detalleVenta.producto.productosBase[i].productoBase, detalleVenta.producto.productosBase[i].formulacion * detalleVenta.cantidad, arrgloInv,
														movimientoEncontrado, index - 1, array, res, detalleVenta.venta, t, detalleVenta));
												}
											}

										} else {
											var promises = [];
											for (var i = 0; i < detalleVenta.producto.productosBase.length; i++) {
												if (detalleVenta.producto.productosBase[i].productoBase.tipoProducto.nombre_corto == Diccionario.TIPO_PRODUCTO_BASE) {
													if ((i + 1) == detalleVenta.producto.productosBase.length) {
														promises.push(calcularCostosEgresos(detalleVenta, detalleVenta.producto.productosBase[i].productoBase, detalleVenta.producto.productosBase[i].formulacion * detalleVenta.cantidad, detalleVenta.producto.productosBase[i].productoBase.inventarios,
															movimientoEncontrado, index, array, res, detalleVenta.venta, t, detalleVenta));
													} else {
														promises.push(calcularCostosEgresos(detalleVenta, detalleVenta.producto.productosBase[i].productoBase, detalleVenta.producto.productosBase[i].formulacion * detalleVenta.cantidad, detalleVenta.producto.productosBase[i].productoBase.inventarios,
															movimientoEncontrado, index - 1, array, res, detalleVenta.venta, t, detalleVenta));
													}
												} else if (detalleVenta.producto.productosBase[i].productoBase.tipoProducto.nombre_corto == Diccionario.TIPO_PRODUCTO_INTERMEDIO) {
													var innerpromises = [];
													for (var j = 0; j < detalleVenta.producto.productosBase[i].productoBase.productosBase.length; j++) {
														if ((j + 1) == detalleVenta.producto.productosBase[i].productoBase.productosBase.length) {
															innerpromises.push(calcularCostosEgresos(detalleVenta, detalleVenta.producto.productosBase[i].productoBase.productosBase[j].productoBase,
																detalleVenta.producto.productosBase[i].formulacion * detalleVenta.producto.productosBase[i].productoBase.productosBase[j].formulacion * detalleVenta.cantidad,
																detalleVenta.producto.productosBase[i].productoBase.productosBase[j].productoBase.inventarios, movimientoEncontrado, index, array, res, detalleVenta.venta, t, detalleVenta));
														} else {
															innerpromises.push(calcularCostosEgresos(detalleVenta, detalleVenta.producto.productosBase[i].productoBase.productosBase[j].productoBase,
																detalleVenta.producto.productosBase[i].formulacion * detalleVenta.producto.productosBase[i].productoBase.productosBase[j].formulacion * detalleVenta.cantidad,
																detalleVenta.producto.productosBase[i].productoBase.productosBase[j].productoBase.inventarios, movimientoEncontrado, index - 1, array, res, detalleVenta.venta, t, detalleVenta));
														}
													}
													promises.push(Promise.all(innerpromises));
												}
											}
											promises1.push(Promise.all(promises));
										}
									})

								} else {
									var promises = [];
									promises1.push(Promise.all(promises));
								}
							}))
						} else {
							console.log(detalleVenta.venta.factura)
						}

						/* 	} */

					});
					return Promise.all(promises1);
				})
				/* return Promise.all(promises1); */

			}).then(function (result) {

				res.json({ mensaje: "Movimientos Creados de los detalles de las Ventas total movimientos creados =" + contador });

			}).catch(function (err) {
				var error = (err.stack) ? err.stack : err
				res.json({ hasError: true, mensaje: error });
			});

		});
	router.route('/servicios-venta/empresa/:id_empresa/busqueda/:texto_busqueda')
		.get(ensureAuthorizedlogged, function (req, res) {
			var condicionBusqueda = {
				eliminado: false,
				id_empresa: req.params.id_empresa
			}
			if (req.params.texto_busqueda != "0") {
				condicionBusqueda.nombre = { $like: req.params.texto_busqueda + '%' }
				condicionBusqueda.habilitado = true
			}
			ServicioVenta.findAll({
				where: condicionBusqueda
			}).then(function (Servicios) {
				res.json({ servicios: Servicios });
			});
		})
		.post(ensureAuthorizedlogged, function (req, res) {
			req.body.forEach(function (servicio, index, array) {
				if (servicio.id) {
					ServicioVenta.update({
						nombre: servicio.nombre,
						precio: servicio.precio,
						descripcion: servicio.descripcion,
						descuento: servicio.descuento,
						descuento_fijo: servicio.descuento_fijo,
						habilitado: servicio.habilitado,
						eliminado: servicio.eliminado,
					}, {
						where: {
							id: servicio.id
						}
					}).then(function (Servicios) {
						if (index === (array.length - 1)) {
							res.json({ mensaje: "Datos agregados satisfactoriamente!" });
						}

					});
				} else {
					ServicioVenta.create({
						id_empresa: req.params.id_empresa,
						nombre: servicio.nombre,
						precio: servicio.precio,
						descripcion: servicio.descripcion,
						descuento: servicio.descuento,
						descuento_fijo: servicio.descuento_fijo,
						habilitado: servicio.habilitado,
						eliminado: servicio.eliminado,
					}).then(function (Servicios) {
						if (index === (array.length - 1)) {
							res.json({ mensaje: "Datos agregados satisfactoriamente!" });
						}
					});
				}
			})

		});
	function CrearVentasServicioMasiva(req, res, t) {
		var promises2 = [];
		req.body.ventas.forEach(function (venta, index, array) {
			var movimiento = venta.movimiento.nombre_corto;
			var id_movimiento = venta.movimiento.id;
			/* 	var venta = req.body; */
			var factura = {};
			factura.venta = venta;

			promises2.push(SucursalActividadDosificacion.find({
				where: {
					id_actividad: venta.actividad.id,
					id_sucursal: venta.sucursal.id,
					expirado: false
				},
				transaction: t,
				include: [{ model: Dosificacion, as: 'dosificacion', include: [{ model: Clase, as: 'pieFactura' }] },
				{ model: Sucursal, as: 'sucursal', where: { activo: true }, required: true, include: [{ model: Empresa, as: 'empresa' }] }]
			}).then(function (sucursalActividadDosificacion) {
				if (!sucursalActividadDosificacion) throw new Error('Sucursal deshabilitada, no se pueden hacer cambios.')
				var dosificacion = sucursalActividadDosificacion.dosificacion;
				venta.factura = dosificacion.correlativo + (index);
				venta.pieFactura = dosificacion.pieFactura;
				venta.codigo_control = CodigoControl.obtenerCodigoControl(dosificacion.autorizacion.toString(),
					dosificacion.correlativo.toString(),
					venta.cliente.nit.toString(),
					formatearFecha(venta.fechaTexto).toString(),
					parseFloat(venta.total).toFixed(2),
					dosificacion.llave_digital.toString());
				venta.autorizacion = dosificacion.autorizacion.toString();
				venta.fecha_limite_emision = dosificacion.fecha_limite_emision;
				venta.numero_literal = NumeroLiteral.Convertir(parseFloat(venta.total).toFixed(2).toString());
				venta.numero_literal_dolares = NumeroLiteral.Convertir(parseFloat(venta.total_dolares).toFixed(2).toString(), 'Dolares');
				/* if (sucursalActividadDosificacion.sucursal.empresa.usar_pedidos) {
					venta.pedido = sucursalActividadDosificacion.sucursal.pedido_correlativo;
				} */


				return Cliente.find({
					where: {
						nit: venta.cliente.nit,
						razon_social: venta.cliente.razon_social
					}
					, transaction: t
				}).then(function (ClienteEncontrado) {
					if (!ClienteEncontrado) {
						return Cliente.create({
							id_empresa: venta.id_empresa,
							nit: venta.cliente.nit,
							razon_social: venta.cliente.razon_social
						}, { transaction: t }).then(function (clienteCreado) {
							return crearVentaServicio(req, venta, res, clienteCreado.id, dosificacion, true, sucursalActividadDosificacion.sucursal, t, id_movimiento);
						}).catch(function (err) {
							return new Promise(function (fulfill, reject) {
								reject(err);
							});
						});
					} else {
						return crearVentaServicio(req, venta, res, ClienteEncontrado.id, dosificacion, true, sucursalActividadDosificacion.sucursal, t, id_movimiento);
					}
				}).catch(function (err) {
					return new Promise(function (fulfill, reject) {
						reject(err);
					});
				})

			}).catch(function (err) {
				return new Promise(function (fulfill, reject) {
					reject(err);
				});
			}))

		})
		return Promise.all(promises2);
	}
	function CrearClientesVentasMasivas(req, res, t, id_empresa) {
		var promises2 = [];
		req.body.arregloClientes.forEach(function (cliente, index, array) {
			promises2.push(Cliente.findOrCreate({
				where: {
					nit: cliente.nit,
					id_empresa: id_empresa,
				},
				transaction: t,
				lock: t.LOCK.UPDATE,
				defaults: {
					id_empresa: id_empresa,
					nit: cliente.nit,
					razon_social: cliente.razon_social
				}
			}).spread(function (ClienteEnc, created4) {

				if (index == (array.length - 1)) {
					return CrearVentasServicioMasiva(req, res, t)
				}

			}))
		})
		return Promise.all(promises2);
	}
	router.route('/importacion-ventas-servicio')
		.post(ensureAuthorizedlogged, function (req, res) {
			var promesas = []
			var promises2 = [];
			var promises3 = []
			SucursalActividadDosificacion.find({
				where: {
					id_actividad: req.body.ventas[0].actividad.id,
					id_sucursal: req.body.ventas[0].sucursal.id,
					expirado: false
				},
				include: [{ model: Dosificacion, as: 'dosificacion', include: [{ model: Clase, as: 'pieFactura' }] },
				{ model: Sucursal, as: 'sucursal', where: { activo: true }, required: true, include: [{ model: Empresa, as: 'empresa' }] }]
			}).then(function (sucursalActividadDosificacion) {
				if (!sucursalActividadDosificacion) return res.json({ mensaje: 'Sucursal deshabilitada, no se pueden hacer cambios.', hasErr: true, hasError: true, message: 'Sucursal deshabilitada, no se pueden hacer cambios.' })
				var dosificacion = sucursalActividadDosificacion.dosificacion;
				sequelize.transaction(function (t) {
					for (let index = 0; index < req.body.arregloServicios.length; index++) {
						var ser = ServicioVenta.findOrCreate({
							where: {
								nombre: req.body.arregloServicios[index].nombre,
								id_empresa: req.body.arregloServicios[index].id_empresa,
							},
							transaction: t,
							lock: t.LOCK.UPDATE,
							defaults: {
								id_empresa: req.body.arregloServicios[index].id_empresa,
								nombre: req.body.arregloServicios[index].nombre,
								precio: req.body.arregloServicios[index].precio,
								descripcion: "",
								descuento: 0,
								descuento_fijo: false,
								habilitado: true,
								eliminado: false
							}
						})
						promises2.push(ser)
					}
					promesas.unshift(promises2)
					promesas.unshift(promises3)
					return Promise.all(promesas)
				}).then(function (result) {
					sequelize.transaction(function (y) {
						var promm = []
						for (let index = 0; index < req.body.ventas.length; index++) {
							req.body.ventas[index].factura = dosificacion.correlativo + (index);
							req.body.ventas[index].pieFactura = dosificacion.pieFactura;
							req.body.ventas[index].codigo_control = CodigoControl.obtenerCodigoControl(dosificacion.autorizacion.toString(),
								(dosificacion.correlativo + (index)).toString(),
								req.body.ventas[index].cliente.nit.toString(),
								formatearFecha(req.body.ventas[index].fechaTexto).toString(),
								parseFloat(req.body.ventas[index].total).toFixed(2),
								dosificacion.llave_digital.toString());
							req.body.ventas[index].autorizacion = dosificacion.autorizacion.toString();
							req.body.ventas[index].fecha_limite_emision = dosificacion.fecha_limite_emision;
							req.body.ventas[index].numero_literal = NumeroLiteral.Convertir(parseFloat(req.body.ventas[index].total).toFixed(2).toString());
							req.body.ventas[index].numero_literal_dolares = NumeroLiteral.Convertir(parseFloat(req.body.ventas[index].total_dolares).toFixed(2).toString(), 'Dolares');
							promm.push(aaaaaaaVentaServicio(req, index, y, res, dosificacion, sucursalActividadDosificacion))
						}
						return Promise.all(promm)
					}).then(function name(result) {
						res.json({ mensaje: "Importación satisfactoriamente!" })
					}).catch(function (err) {
						res.json({ hasError: true, message: err.stack });
					})
				}).catch(function (err) {
					res.json({ hasError: true, message: err.stack });
				});
			})
		})

	function aaaaaaaVentaServicio(req, index, y, res, dosificacion, sucursalActividadDosificacion) {
		var movimiento = req.body.ventas[index].movimiento.nombre_corto;
		var id_movimiento = req.body.ventas[index].movimiento.id;
		return Cliente.find({
			where: {
				nit: req.body.ventas[index].cliente.nit,
				razon_social: req.body.ventas[index].cliente.razon_social
			}
			, transaction: y
		}).then(function (ClienteEncontrado) {
			if (!ClienteEncontrado) {
				return Cliente.create({
					id_empresa: req.body.ventas[index].id_empresa,
					nit: req.body.ventas[index].cliente.nit,
					razon_social: req.body.ventas[index].cliente.razon_social
				}, { transaction: y }).then(function (clienteCreado) {
					return crearVentaServicio(req, req.body.ventas[index], res, clienteCreado.id, dosificacion, true, sucursalActividadDosificacion.sucursal, y, id_movimiento);
				}).catch(function (err) {
					return new Promise(function (fulfill, reject) {
						reject(err);
					});
				});
			} else {
				return crearVentaServicio(req, req.body.ventas[index], res, ClienteEncontrado.id, dosificacion, true, sucursalActividadDosificacion.sucursal, y, id_movimiento);
			}
		}).catch(function (err) {
			return new Promise(function (fulfill, reject) {
				reject(err);
			});
		})
	}

	function eliminarDetalleVentaBase(req, res, detalleVenta, t, venta) {
		var promises = []
		detalleVenta.detallesVentaProductoFinal.forEach(function (mov) {
			promises.push(DetalleMovimiento.destroy({
				where: {
					id: mov.id_detalle_movimiento
				}, transaction: t
			}).then(function (detalleMovimientoEliminado) {
				return DetalleVentaProductoFinal.destroy({
					where: {
						id: mov.id
					}, transaction: t
				}).then(function (detalleVPF) {
					return Inventario.find({
						where: {
							id: mov.detalleMovimiento.id_inventario
						}, transaction: t
					}).then(function (inventarioEncontrado) {
						inventarioEncontrado.cantidad += mov.detalleMovimiento.cantidad
						return Inventario.update(
							{
								cantidad: inventarioEncontrado.cantidad
							}, {
							where: {
								id: mov.detalleMovimiento.id_inventario
							}, transaction: t
						}).then(function (InventarioActualizado) {

						}).catch(function (err) {
							return new Promise(function (fulfill, reject) {
								reject(err);
							});
						});
					}).catch(function (err) {
						return new Promise(function (fulfill, reject) {
							reject(err);
						});
					});
				}).catch(function (err) {
					return new Promise(function (fulfill, reject) {
						reject(err);
					});
				});
			}).catch(function (err) {
				return new Promise(function (fulfill, reject) {
					reject(err);
				});
			}));
		})
		/* detalleVenta.producto.productosBase.forEach(function (productoBase) {
			for (var i = 0; i < venta.movimientoActual.detallesMovimiento.length; i++) {
				var element = venta.movimientoActual.detallesMovimiento[i];
				if (element.id_producto == productoBase.id_producto_base && element.cantidad == parseInt(productoBase.formulacion)) {
					
				}
		
			}
		
		}) */
		return Promise.all(promises);
	}
	router.route('/eliminar-detalle-venta/movimiento/:id_movimiento')
		.put(ensureAuthorizedlogged, function (req, res) {
			var detalleVenta = req.body.detalleVenta
			var venta = req.body.venta
			sequelize.transaction(function (t) {
				if (venta.movimiento.nombre_corto == 'TRAS' && venta.ordenReposicion) {
					return DetalleVenta.destroy({
						where: {
							id: detalleVenta.id
						}, transaction: t
					}).then(function (detalleCompraEliminado) {
					}).catch(function (err) {
						return new Promise(function (fulfill, reject) {
							reject(err);
						});
					});
				} else if (detalleVenta.producto.tipoProducto.nombre_corto == "PFINAL") {
					return DetalleVenta.destroy({
						where: {
							id: detalleVenta.id
						}, transaction: t
					}).then(function (detalleCompraEliminado) {
						return eliminarDetalleVentaBase(req, res, detalleVenta, t, venta)
					})
				} else {

					// devolver inventarios de detalleVenta de Producto final
					for (let index = 0; index < detalleVenta.detallesVentaProductoFinal.length; index++) {
						const ventaProductofinal = detalleVenta.detallesVentaProductoFinal[index];
						const detMoviento = detalleVenta.detallesVentaProductoFinal[index].detalleMovimiento;

						Inventario.update({
							cantidad: sequelize.literal('cantidad + ' + detMoviento.cantidad),
							costo_total: sequelize.literal('cantidad * costo_unitario')
						}, {
							where: { id: detMoviento.id_inventario }
						}).then(function (actualizado) {
							// borrar  DetalleMovimiento
							DetalleMovimiento.destroy({
								where: { id: detMoviento.id }
							}).then(function (detalleMovimientoEliminado) {
								// borrar DetalleVentaProductoFinal
								DetalleVentaProductoFinal.destroy({
									where: { id: ventaProductofinal.id }
								}).then(function (ventaProductofinalEliminado) {

								})
							})
						})

						if (index == (detalleVenta.detallesVentaProductoFinal.length - 1)) {
							// borrando detalle venta
							return DetalleVenta.destroy({
								where: {
									id: detalleVenta.id
								}, transaction: t
							}).then(function (detalleCompraEliminado) {

							})
						}
					}

				}
			}).then(function name(result) {
				res.json({ mensaje: "detalle venta eliminado!" })
			}).catch(function (err) {
				res.json({ hasError: true, mensaje: err.stack ? err.stack : err });
			});
		})
	router.route('/importar-compras-ingresos-diarios/empresa/:id_empresa')
		.post(ensureAuthorizedlogged, function (req, res) {
			Tipo.find({
				where: { nombre_corto: 'MOVING' }
			}).then(function (tipoMovimiento) {
				Tipo.find({
					where: { nombre_corto: 'CCO' }
				}).then(function (tipoCentroCosto) {
					var promises = []
					sequelize.transaction(function (t) {
						req.body.proveedores.forEach(function (proveedor, index, array) {
							promises.push(Proveedor.findOrCreate({
								where: {
									id_empresa: req.params.id_empresa,
									nit: proveedor.nit,
									razon_social: proveedor.razon_social
								},
								defaults: {
									id_empresa: req.params.id_empresa,
									nit: proveedor.nit,
									razon_social: proveedor.razon_social
								},
								transaction: t,
								lock: t.LOCK.UPDATE,
							}).spread(function (proveedorCreado, created) {
								return new Promise(function (fulfill, reject) {
									fulfill(proveedorCreado);
								});
							}).catch(function (err) {
								return new Promise(function (fulfill, reject) {
									reject(err);
								});
							}));
						})
						if (req.body.centrosCosto.length > 0) {
							req.body.centrosCosto.forEach(function (centroCosto, index, array) {
								promises.push(Clase.findOrCreate(
									{
										where: {
											nombre: centroCosto.nombre,
											id_tipo: tipoCentroCosto.id
										},
										defaults: {
											nombre: centroCosto.nombre,
											id_tipo: tipoCentroCosto.id,
											habilitado: true,
											eliminado: false
										},
										transaction: t,
										lock: t.LOCK.UPDATE,
									}).spread(function (centroCostoCreado, created) {
										return new Promise(function (fulfill, reject) {
											fulfill(centroCostoCreado);
										});
									}).catch(function (err) {
										return new Promise(function (fulfill, reject) {
											reject(err);
										});
									}));
							})
						}
						if (req.body.productos.length > 0) {
							req.body.productos.forEach(function (producto, index, array) {
								promises.push(Producto.findOrCreate({
									where: {
										nombre: producto.nombre,
										codigo: producto.codigo,
										id_empresa: req.params.id_empresa
									},
									defaults: {
										nombre: producto.nombre,
										codigo: producto.codigo,
										unidad_medida: producto.unidad_medida,
										id_empresa: req.params.id_empresa
									},
									transaction: t,
									lock: t.LOCK.UPDATE,
								}).spread(function (productoCreado, created) {
									return new Promise(function (fulfill, reject) {
										fulfill(productoCreado);
									});
								}).catch(function (err) {
									return new Promise(function (fulfill, reject) {
										reject(err);
									});
								}));
							})
						}
						req.body.compras.forEach(function (compra, index, array) {
							conceptoMovimiento = compra.movimiento
							promises.push(Almacen.find({
								where: { nombre: compra.almacen.nombre }, transaction: t,
								include: [{ model: Sucursal, as: 'sucursal', where: { id_empresa: compra.id_empresa, activo: true }, required: true }]
							}).then(function (almacenEncontrado) {
								if (!almacenEncontrado) throw new Error('Sucursal deshabilitada, no se pueden hacer cambios.')
								return Movimiento.create({
									id_tipo: tipoMovimiento.id,
									id_clase: conceptoMovimiento.id,
									id_almacen: almacenEncontrado.id,
									fecha: compra.fecha
								}, {
									transaction: t
								}).then(function (movimientoCreado) {
									return Proveedor.findOrCreate({
										where: {
											id_empresa: compra.id_empresa,
											nit: compra.proveedor.nit,
											razon_social: compra.proveedor.razon_social
										},
										defaults: {
											id_empresa: compra.id_empresa,
											nit: compra.proveedor.nit,
											razon_social: compra.proveedor.razon_social
										},
										transaction: t,
										lock: t.LOCK.UPDATE,
									}).spread(function (proveedorCreado, created) {

										return crearCompraImportacion(compra, res, proveedorCreado.id, movimientoCreado.id, conceptoMovimiento.id, tipoCentroCosto, almacenEncontrado, t);
									}).catch(function (err) {
										return new Promise(function (fulfill, reject) {
											reject(err);
										});
									});
								}).catch(function (err) {
									return new Promise(function (fulfill, reject) {
										reject(err);
									});
								});
							}).catch(function (err) {
								return new Promise(function (fulfill, reject) {
									reject(err);
								});
							}));

						})
						return Promise.all(promises)
					}).then(function name(result) {
						res.json({ mensaje: "Importación satisfactoriamente!" })
					}).catch(function (err) {
						res.json({ hasError: true, mensaje: err.stack ? err.stack : err });
					})
				})
			})
		})
	function crearCompraImportacion(compra, res, idProveedor, idMovimiento, idTipo, tipoCentroCosto, almacenEncontrado, t) {
		return Compra.create({
			id_tipo_movimiento: idTipo,
			id_almacen: almacenEncontrado.id,
			id_proveedor: idProveedor,
			id_movimiento: idMovimiento,
			factura: compra.factura,
			autorizacion: compra.autorizacion,
			fecha: compra.fecha,
			codigo_control: compra.codigo_control,
			importe: compra.importe ? compra.importe : 0,
			importe_dolares: compra.importe_dolares ? compra.importe_dolares : 0,
			id_tipo_pago: compra.tipoPago.id,
			dias_credito: compra.dias_credito,
			a_cuenta: compra.a_cuenta,
			saldo: compra.saldo,
			descuento_general: compra.descuento_general,
			descuento: compra.descuento,
			recargo: compra.recargo,
			ice: compra.ice,
			excento: compra.excento,
			tipo_descuento: compra.tipo_descuento,
			tipo_recargo: compra.tipo_recargo,
			total: compra.total ? compra.total : 0,
			total_dolares: compra.total_dolares ? compra.total_dolares : 0,
			id_usuario: compra.id_usuario,
			usar_producto: compra.usar_producto,
			observacion: compra.observacion,
			dui: compra.dui,
			tipo_retencion: compra.tipo_retencion
		}, {
			transaction: t
		}).then(function (compraCreada) {
			var promises = []
			compra.detallesCompra.forEach(function (detalleCompra, index, array) {
				promises.push(Producto.findOrCreate({
					where: {
						nombre: detalleCompra.producto.nombre,
						codigo: detalleCompra.producto.codigo,
						id_empresa: compra.id_empresa
					},
					transaction: t,
					lock: t.LOCK.UPDATE,
				}).spread(function (productoCreado, created) {
					return Clase.find(
						{
							where: {
								nombre: detalleCompra.centroCosto.nombre,
								id_tipo: tipoCentroCosto.id
							},
							transaction: t,
						}).then(function (centroCostoCreado) {
							return crearDetalleCompraImportacion(detalleCompra, idMovimiento, compraCreada.id, almacenEncontrado.id, productoCreado.id, centroCostoCreado, res, compra, t);
						}).catch(function (err) {
							return new Promise(function (fulfill, reject) {
								reject(err);
							});
						});
				}).catch(function (err) {
					return new Promise(function (fulfill, reject) {
						reject(err);
					});
				}));
			});
			return Promise.all(promises)
		}).catch(function (err) {
			return new Promise(function (fulfill, reject) {
				reject(err);
			});
		});
	}
	function crearDetalleCompraImportacion(detalleCompra, idMovimiento, idCompra, idAlmacen, idProducto, centroCosto, res, compra, t) {
		if (centroCosto.nombre_corto == "ALM") {
			var costo_unitario_neto = (Math.round((((detalleCompra.importe - detalleCompra.descuento) * 1) / detalleCompra.cantidad) * 100) / 100);
			if (compra.movimiento.nombre_corto == "ID" || compra.movimiento.nombre_corto == "IPI") {
				costo_unitario_neto = (Math.round((((detalleCompra.importe - detalleCompra.descuento) * 0.87) / detalleCompra.cantidad) * 100) / 100);
			}
			return Inventario.create({
				id_almacen: idAlmacen,
				id_producto: idProducto,
				cantidad: detalleCompra.cantidad,
				costo_unitario: detalleCompra.costo_unitario ? detalleCompra.costo_unitario : 0,
				costo_total: detalleCompra.costo_unitario ? detalleCompra.costo_unitario * detalleCompra.cantidad : 0,
				costo_unitario_dolares: detalleCompra.costo_unitario_dolares ? detalleCompra.costo_unitario_dolares : 0,
				costo_total_dolares: detalleCompra.costo_unitario_dolares ? detalleCompra.costo_unitario_dolares * detalleCompra.cantidad : 0,
				fecha_vencimiento: detalleCompra.fecha_vencimiento,
				lote: detalleCompra.lote,
				costo_unitario_neto: costo_unitario_neto
			}, {
				transaction: t
			}).then(function (inventarioCreado) {
				return DetalleCompra.create({
					id_compra: idCompra,
					id_producto: idProducto,
					id_centro_costo: centroCosto.id,
					costo_unitario: detalleCompra.costo_unitario ? detalleCompra.costo_unitario : 0,
					costo_unitario_dolares: detalleCompra.costo_unitario_dolares ? detalleCompra.costo_unitario_dolares : 0,
					cantidad: detalleCompra.cantidad,
					importe: detalleCompra.importe ? detalleCompra.importe : 0,
					importe_dolares: detalleCompra.importe_dolares ? detalleCompra.importe_dolares : 0,
					descuento: detalleCompra.descuento,
					recargo: detalleCompra.recargo,
					ice: detalleCompra.ice,
					excento: detalleCompra.excento,
					tipo_descuento: detalleCompra.tipo_descuento.toUpperCase() == "%" ? true : false,
					tipo_recargo: detalleCompra.tipo_recargo.toUpperCase() == "%" ? true : false,
					total: detalleCompra.total,
					total_dolares: detalleCompra.total_dolares ? detalleCompra.total_dolares : 0,
					id_inventario: inventarioCreado.id,
					observacion: detalleCompra.observacion || '',
					correlativo_produccion: detalleCompra.correlativo_produccion ? parseFloat(detalleCompra.correlativo_produccion) : null
				}, {
					transaction: t
				}).then(function (detalleCompraCreada) {
					return DetalleMovimiento.create({
						id_movimiento: idMovimiento,
						id_producto: idProducto,
						costo_unitario: detalleCompra.costo_unitario ? detalleCompra.costo_unitario : 0,
						costo_unitario_dolares: detalleCompra.costo_unitario_dolares ? detalleCompra.costo_unitario_dolares : 0,
						cantidad: detalleCompra.cantidad,
						importe: (detalleCompra.costo_unitario * detalleCompra.cantidad),
						importe_dolares: (detalleCompra.costo_unitario_dolares ? detalleCompra.costo_unitario_dolares : 0 * detalleCompra.cantidad),
						descuento: detalleCompra.descuento,
						recargo: detalleCompra.recargo,
						ice: detalleCompra.ice,
						excento: detalleCompra.excento,
						tipo_descuento: detalleCompra.tipo_descuento.toUpperCase() == "%" ? true : false,
						tipo_recargo: detalleCompra.tipo_recargo.toUpperCase() == "%" ? true : false,
						total: detalleCompra.total,
						total_dolares: detalleCompra.total_dolares ? detalleCompra.total_dolares : 0,
						fecha_vencimiento: detalleCompra.fecha_vencimiento,
						lote: detalleCompra.lote,
						id_inventario: inventarioCreado.id
					}, {
						transaction: t
					}).then(function (detalleMovimientoCreado) {
						return new Promise(function (fulfill, reject) {
							fulfill();
						});
					}).catch(function (err) {
						return new Promise(function (fulfill, reject) {
							reject(err);
						});
					});
				}).catch(function (err) {
					return new Promise(function (fulfill, reject) {
						reject(err);
					});
				});
			}).catch(function (err) {
				return new Promise(function (fulfill, reject) {
					reject(err);
				});
			});
		} else {
			DetalleCompra.create({
				id_compra: idCompra,
				id_producto: idProducto,
				id_centro_costo: centroCosto.id,
				costo_unitario: detalleCompra.costo_unitario ? detalleCompra.costo_unitario : 0,
				costo_unitario_dolares: detalleCompra.costo_unitario_dolares ? detalleCompra.costo_unitario_dolares : 0,
				cantidad: detalleCompra.cantidad,
				importe: detalleCompra.importe ? detalleCompra.importe : 0,
				importe_dolares: detalleCompra.importe_dolares ? detalleCompra.importe_dolares : 0,
				descuento: detalleCompra.descuento,
				recargo: detalleCompra.recargo,
				ice: detalleCompra.ice,
				excento: detalleCompra.excento,
				tipo_descuento: detalleCompra.tipo_descuento.toUpperCase() == "%" ? true : false,
				tipo_recargo: detalleCompra.tipo_recargo.toUpperCase() == "%" ? true : false,
				total: detalleCompra.total,
				total_dolares: detalleCompra.total_dolares ? detalleCompra.total_dolares : 0,
				observacion: detalleCompra.observacion || '',
				correlativo_produccion: detalleCompra.correlativo_produccion ? parseFloat(detalleCompra.correlativo_produccion) : null
			}).then(function (detalleCompraCreada) {
				return new Promise(function (fulfill, reject) {
					fulfill();
				});
			}).catch(function (err) {
				return new Promise(function (fulfill, reject) {
					reject(err);
				});
			});
		}
	}
	router.route('/importar-ventas-Traspaso/empresa/:id_empresa')
		.post(ensureAuthorizedlogged, function (req, res) {
			sequelize.transaction(function (t) {
				venta = req.body.ventas[0]
				var id_movimiento = venta.movimiento.id;

				return Sucursal.find({
					where: {
						nombre: venta.sucursal_origen,
						id_empresa: req.params.id_empresa
					},
					transaction: t,
					include: [{ model: Empresa, as: 'empresa' }]
				}).then(function (sucursal) {
					if (!sucursal.activo) throw new Error('Sucursal de origen está deshabilitada, no se puede hacer cambios.')
					venta.sucursal = sucursal
					return Sucursal.find({
						where: {
							nombre: venta.sucursal_destino,
							id_empresa: req.params.id_empresa
						},
						transaction: t,
						include: [{ model: Empresa, as: 'empresa' }]
					}).then(function (sucursalDestino) {
						if (!sucursalDestino.activo) throw new Error('Sucursal de destino está deshabilitada, no se puede hacer cambios.')
						return Almacen.find({
							where: {
								nombre: venta.almacen_origen,
								id_sucursal: sucursal.id,
							},
							transaction: t,
						}).then(function (almacenOrigen) {
							venta.almacen = almacenOrigen
							return Almacen.find({
								where: {
									nombre: venta.almacen_destino,
									id_sucursal: sucursalDestino.id,
								},
								transaction: t
							}).then(function (almacenDestino) {
								venta.almacenDestino = almacenDestino
								return Tipo.find({
									where: { nombre_corto: Diccionario.MOV_EGRE },
									transaction: t
								}).then(function (tipoMovimiento) {
									return Movimiento.create({
										id_tipo: tipoMovimiento.id,
										id_clase: id_movimiento,
										id_almacen: venta.almacen.id,
										fecha: venta.fecha
									}, { transaction: t }).then(function (movimientoCreado) {
										return ConfiguracionIso.find({
											where: { id_sucursal: venta.sucursal.id, eliminado: false }, transaction: t,
											include: [{ model: Clase, as: 'tipoDocumento', where: { nombre_corto: 'TRASPASOSUC' } }]
										}).then(function (configiso) {
											venta.factura = sucursal.nota_traspaso_correlativo;
											return Venta.create({
												id_almacen: venta.almacen.id,
												id_movimiento: movimientoCreado.id,
												fecha: venta.fecha,
												importe: venta.importe,
												importe_dolares: venta.importe_dolares,
												total: venta.total,
												total_dolares: venta.total_dolares,
												id_usuario: venta.id_usuario,
												activa: true,
												id_almacen_traspaso: venta.almacenDestino.id,
												factura: venta.factura,
												observacion: venta.observacion,
												ver_dolares: venta.ver_dolares,
												numero_iso_traspaso: configiso ? almacenOrigen.numero_correlativo_iso_traspaso_salida ? almacenOrigen.numero_correlativo_iso_traspaso_salida : null : null,
												config_doc_iso: configiso ? configiso.id : null
											}, { transaction: t }).then(function (ventaCreada) {
												req.body.id_venta = ventaCreada.id
												return Almacen.update({
													numero_correlativo_iso_traspaso_salida: almacenOrigen.numero_correlativo_iso_traspaso_salida ? almacenOrigen.numero_correlativo_iso_traspaso_salida + 1 : almacenOrigen.numero_correlativo_iso_traspaso_salida,
												}, {
													where: {

														id: almacenOrigen.id,
													},
													transaction: t,
												}).then(function (almacenOrigenActualizado) {
													return Sucursal.update({
														nota_traspaso_correlativo: (venta.factura + 1)
													}, {
														where: { id: venta.sucursal.id },
														transaction: t
													}).then(function (correlativoActualizada) {
														return Tipo.find({
															where: { nombre_corto: Diccionario.MOV_ING },
															transaction: t
														}).then(function (tipoMovimiento) {
															return Clase.find({
																where: { nombre_corto: Diccionario.ING_TRASPASO },
																transaction: t
															}).then(function (conceptoMovimiento) {
																return Movimiento.create({
																	id_tipo: tipoMovimiento.id,
																	id_clase: conceptoMovimiento.id,
																	id_almacen: venta.almacenDestino.id,
																	fecha: venta.fecha
																}, { transaction: t }).then(async function (movimientoIngresoCreado) {
																	var promises = [];
																	venta.configuracion = {};
																	venta.detalles = []
																	venta.detalles = await venta.detallesVenta.reduce(async function (val, detalleVenta, index, array) {
																		let productoEncontrado = await Producto.find({
																			where: { codigo: detalleVenta.producto.codigo, nombre: detalleVenta.producto.nombre, id_empresa: venta.id_empresa },
																			transaction: t,
																			include: [
																				{ model: Clase, as: 'tipoProducto' }, {
																					model: ProductoBase, as: 'productosBase',
																					include: [{ model: Producto, as: 'productoBase' }]
																				}
																			]
																		})
																		detalleVenta.producto = productoEncontrado
																		var condicionInventario = {
																			id_producto: productoEncontrado.id, id_almacen: venta.almacen.id,
																			cantidad: { $gt: 0 }
																		}
																		if (detalleVenta.lote) {
																			condicionInventario.lote = detalleVenta.lote
																		}
																		if (detalleVenta.fecha_vencimiento) {
																			var inicio = new Date(detalleVenta.fecha_vencimiento); inicio.setHours(0, 0, 0, 0, 0);
																			var fin = new Date(detalleVenta.fecha_vencimiento); fin.setHours(23, 59, 59, 0, 0);

																			condicionInventario.fecha_vencimiento = { $between: [inicio, fin] }
																		}
																		let encontrado = await Inventario.findAll({
																			where: condicionInventario,
																			order: [['id', 'asc']],
																			transaction: t
																		})
																		detalleVenta.costos = encontrado
																		var promises = []

																		if (productoEncontrado.tipoProducto) {
																			val = agregarDetalleVentaTraspaso(t, req, movimientoCreado, ventaCreada, detalleVenta, venta, productoEncontrado, encontrado, sucursal, index, array)
																		} else {
																			let err = productoEncontrado.nombre + " no tiene tipo producto definido no se puedo generar el registro del traspaso registro. "
																			return new Promise(function (fulfill, reject) {
																				reject(err);
																			});
																		}
																		return val
																	}, {});
																	var promises = []
																	var totalVenta = 0, totalImporte = 0;
																	venta.detalles.forEach(function (detalleVenta, index, array) {
																		if (detalleVenta.costos.length > 0) {
																			detalleVenta.precio_unitario = detalleVenta.costos[0].costo_unitario;
																			detalleVenta.importe = detalleVenta.cantidad * detalleVenta.costos[0].costo_unitario;
																			detalleVenta.total = detalleVenta.cantidad * detalleVenta.costos[0].costo_unitario;
																			totalImporte += detalleVenta.importe;
																			totalVenta += detalleVenta.total
																			promises.push(calcularCostosIngresos(detalleVenta, movimientoIngresoCreado, venta.almacenDestino.id, venta, t));
																			promises.push(crearDetalleVenta(movimientoCreado, ventaCreada, detalleVenta, detalleVenta.precio_unitario, detalleVenta.importe, detalleVenta.importe_dolares, detalleVenta.total, detalleVenta.total_dolares, index, array, res, venta, t, sucursal));
																		}


																		if (index == (array.length - 1)) {
																			return Venta.update({
																				importe: totalImporte,
																				total: totalVenta
																			}, {
																				where: { id: ventaCreada.id },
																				transaction: t
																			}).then(function (correlativoActualizada) {

																			})
																		}
																	});
																	return Promise.all(promises);
																}).catch(function (err) {
																	return new Promise(function (fulfill, reject) {
																		reject(err);
																	});
																});
															}).catch(function (err) {
																return new Promise(function (fulfill, reject) {
																	reject(err);
																});
															});
														}).catch(function (err) {
															return new Promise(function (fulfill, reject) {
																reject(err);
															});
														});
													}).catch(function (err) {
														return new Promise(function (fulfill, reject) {
															reject(err);
														});
													});
												}).catch(function (err) {
													return new Promise(function (fulfill, reject) {
														reject(err);
													});
												});
											}).catch(function (err) {
												return new Promise(function (fulfill, reject) {
													reject(err);
												});
											});
										}).catch(function (err) {
											return new Promise(function (fulfill, reject) {
												reject(err);
											});
										});
									}).catch(function (err) {
										return new Promise(function (fulfill, reject) {
											reject(err);
										});
									});
								}).catch(function (err) {
									return new Promise(function (fulfill, reject) {
										reject(err);
									});
								});
							}).catch(function (err) {
								return new Promise(function (fulfill, reject) {
									reject(err);
								});
							});
						}).catch(function (err) {
							return new Promise(function (fulfill, reject) {
								reject(err);
							});
						});
					}).catch(function (err) {
						return new Promise(function (fulfill, reject) {
							reject(err);
						});
					});
				}).catch(function (err) {
					return new Promise(function (fulfill, reject) {
						reject(err);
					});
				});

			}).then(function name(result) {
				res.json({ mensaje: "Importación satisfactoriamente!" })
			}).catch(function (err) {
				res.json({ hasError: true, mensaje: err.stack ? err.stack : err });
			})
		})

	function agregarDetalleVentaTraspaso(t, req, movimientoCreado, ventaCreada, detalleVenta, venta, ProductoEncontrado, encontrado, sucursal, index, array) {
		detalleVenta.producto = ProductoEncontrado
		detalleVenta.costos = encontrado
		let paraRectificacionDescuento = []
		if (detalleVenta.producto.id) {
			if (detalleVenta.producto.activar_inventario) {
				if (detalleVenta.costos.length > 1) {
					let datosDetalle = [], cantidadTotal = detalleVenta.cantidad, i = 0, detalleVentaOriginal = JSON.parse(JSON.stringify(detalleVenta));
					while (i < detalleVenta.costos.length && cantidadTotal > 0) {
						detalleVenta.inventarioProducto = detalleVenta.costos[i];
						let cantidadDisponible = obtenerInventarioTotalPorFechaVencimiento(detalleVenta, datosDetalle);
						if (cantidadDisponible > 0) {
							let nuevoDetalleVenta = JSON.parse(JSON.stringify(detalleVentaOriginal));
							let cantidadParcial;

							if (cantidadTotal > cantidadDisponible) {
								cantidadParcial = cantidadDisponible;
								cantidadTotal = cantidadTotal - cantidadDisponible
							} else {
								cantidadParcial = cantidadTotal;
								cantidadTotal = 0;
							}
							nuevoDetalleVenta.cantidad = cantidadParcial;
							if (sucursal.empresa.usar_vencimientos) {
								nuevoDetalleVenta.fecha_vencimiento = detalleVenta.costos[i].fecha_vencimiento;
								nuevoDetalleVenta.lote = detalleVenta.costos[i].lote;
							}
							nuevoDetalleVenta.costos = [];
							nuevoDetalleVenta.costos.push(detalleVenta.costos[i]);
							nuevoDetalleVenta.inventario = detalleVenta.costos[i];
							paraRectificacionDescuento.push(nuevoDetalleVenta);
							venta.detalles.push(nuevoDetalleVenta);
							i++;
						}

					}
				} else {
					if (detalleVenta.costos.length > 0) {
						if (sucursal.empresa.usar_vencimientos) {
							detalleVenta.fecha_vencimiento = detalleVenta.costos[0].fecha_vencimiento;
							detalleVenta.lote = detalleVenta.costos[0].lote;
							detalleVenta.inventario = detalleVenta.costos[0];
						}
					}
					venta.detalles.push(detalleVenta);
				}



			} else {
				venta.detalles.push(detalleVenta);
			}

		}
		return venta.detalles

	}
	router.route('/importar-ventas-facturacion/empresa/:id_empresa')
		.post(ensureAuthorizedlogged, function (req, res) {
			sequelize.transaction(function (t) {
				var promises = []
				for (var i = 0; i < req.body.clientes.length; i++) {
					var cliente = req.body.clientes[i];
					Cliente.findOrCreate({
						where: {
							nit: cliente.nit,
							id_empresa: req.params.id_empresa,
						},
						defaults: {
							id_empresa: req.params.id_empresa,
							nit: cliente.nit,
							razon_social: cliente.razon_social
						}
					}).spread(function (ClienteEnc, created4) {
					})
				}
				req.body.ventas.forEach(function (venta, index, array) {
					promises.push(Tipo.find({
						where: { nombre_corto: Diccionario.MOV_EGRE },
						transaction: t
					}).then(function (tipoMovimiento) {
						var id_movimiento = venta.movimiento.id;
						return Almacen.find({
							where: { nombre: venta.almacen.nombre },
							include: [{
								model: Sucursal, as: 'sucursal', where: { id_empresa: req.params.id_empresa },
								include: [{ model: Empresa, as: 'empresa' }]
							}], transaction: t
						}).then(function (almacenEncontrado) {
							if (!almacenEncontrado.sucursal.activo) throw new Error('Sucursal ' + almacenEncontrado.sucursal.nombre + ' está deshabilitada, no se pueden hacer cambios.')
							return Movimiento.create({
								id_tipo: tipoMovimiento.id,
								id_clase: id_movimiento,
								id_almacen: almacenEncontrado.id,
								fecha: venta.fecha
							}, { transaction: t }).then(function (movimientoCreado) {
								//SI ES FACTURACION
								return Sucursal.find({
									where: { nombre: venta.sucursal.nombre, id_empresa: req.params.id_empresa }, transaction: t
								}).then(function (sucursalEncontrada) {

									return Clase.find({
										where: { nombre: venta.actividad }, transaction: t
									}).then(function (actividadEncontrada) {
										return SucursalActividadDosificacion.find({
											where: {
												id_actividad: actividadEncontrada.id,
												id_sucursal: sucursalEncontrada.id,
												expirado: false
											},
											transaction: t,
											include: [{ model: Dosificacion, as: 'dosificacion', include: [{ model: Clase, as: 'pieFactura' }] },
											{ model: Sucursal, as: 'sucursal', include: [{ model: Empresa, as: 'empresa' }] }]
										}).then(function (sucursalActividadDosificacion) {
											var dosificacion = sucursalActividadDosificacion.dosificacion;
											//venta.factura = dosificacion.correlativo + index;
											venta.pieFactura = dosificacion.pieFactura;
											venta.codigo_control = CodigoControl.obtenerCodigoControl(dosificacion.autorizacion.toString(),
												dosificacion.correlativo.toString(),
												venta.cliente.nit,
												formatearFecha(venta.fechaTexto.split('T')[0].split('-').reverse().join('/')).toString(),
												parseFloat(venta.total).toFixed(2),
												dosificacion.llave_digital.toString());
											venta.autorizacion = dosificacion.autorizacion.toString();
											venta.fecha_limite_emision = dosificacion.fecha_limite_emision;
											venta.numero_literal = NumeroLiteral.Convertir(parseFloat(venta.total).toFixed(2).toString());
											venta.numero_literal_dolares = NumeroLiteral.Convertir(parseFloat(venta.total_dolares).toFixed(2).toString(), 'Dolares');
											if (sucursalActividadDosificacion.sucursal.empresa.usar_pedidos) {
												venta.pedido = sucursalActividadDosificacion.sucursal.pedido_correlativo;
											}

											return Cliente.findOrCreate({
												where: {
													nit: venta.cliente.nit,
													id_empresa: req.body.id_empresa,
												},
												transaction: t,
												lock: t.LOCK.UPDATE,
												defaults: {
													id_empresa: req.body.id_empresa,
													nit: venta.cliente.nit,
													razon_social: venta.cliente.razon_social
												}
											}).spread(function (clienteCreado, created4) {
												return crearVentaImportacion(venta, req, clienteCreado.id, movimientoCreado, dosificacion, true, sucursalActividadDosificacion.sucursal, t, index, array, almacenEncontrado, actividadEncontrada);
											}).catch(function (err) {
												return new Promise(function (fulfill, reject) {
													reject(err);
												});
											});

										}).catch(function (err) {
											return new Promise(function (fulfill, reject) {
												reject(err);
											});
										});
									}).catch(function (err) {
										return new Promise(function (fulfill, reject) {
											reject(err);
										});
									});
								}).catch(function (err) {
									return new Promise(function (fulfill, reject) {
										reject(err);
									});
								});
							}).catch(function (err) {
								return new Promise(function (fulfill, reject) {
									reject(err);
								});
							});



						}).catch(function (err) {
							return new Promise(function (fulfill, reject) {
								reject(err);
							});
						});
					}).catch(function (err) {
						return new Promise(function (fulfill, reject) {
							reject(err);
						});
					}));

				});
				return Promise.all(promises)
			}).then(function name(result) {

				res.json({ mensaje: "Importación satisfactoriamente!" })
			}).catch(function (err) {
				res.json({ hasError: true, mensaje: err.stack ? err.stack : err });
			})
		})
	function crearVentaImportacion(venta, req, idCliente, movimientoCreado, dosificacion, esFactura, sucursal, t, index1, array1, almacen, actividad) {
		return Venta.create({
			id_almacen: almacen.id,
			id_cliente: idCliente,
			id_movimiento: movimientoCreado.id,
			id_actividad: actividad.id,
			factura: venta.factura,
			autorizacion: venta.autorizacion,
			fecha: venta.fecha,
			codigo_control: venta.codigo_control,
			fecha_limite_emision: venta.fecha_limite_emision,
			importe: venta.importe ? venta.importe : 0,
			importe_dolares: venta.importe_dolares ? venta.importe_dolares : 0,
			id_tipo_pago: venta.tipoPago.id,
			dias_credito: venta.dias_credito,
			a_cuenta: venta.a_cuenta,
			saldo: venta.saldo,
			total: venta.total ? venta.total : 0,
			total_dolares: venta.total_dolares ? venta.total_dolares : 0,
			id_usuario: venta.id_usuario,
			activa: true,
			pagado: venta.pagado,
			pagado_dolares: venta.pagado_dolares,
			cambio: venta.cambio,
			cambio_dolares: venta.cambio_dolares,
			pedido: venta.pedido,
			despachado: venta.despachado,
			id_vendedor: (venta.vendedor ? venta.vendedor.id : null),
			observacion: venta.observacion,
			total_descuento: venta.total_descuento_general,
			total_descuento_dolares: venta.total_descuento_dolares,
			total_ice: venta.total_ice,
			total_ice_dolares: venta.total_ice_dolares,
			total_recargo: venta.total_recargo_general,
			total_recargo_dolares: venta.total_recargo_dolares,
			total_exento: venta.total_exento,
			total_excento_dolares: venta.total_excento_dolares,
			ver_dolares: venta.ver_dolares,
			numero_tarjeta_credito: venta.numero_tarjeta_credito ? venta.numero_tarjeta_credito : null,
			monto_tarjeta_credito: venta.monto_tarjeta_credito ? venta.monto_tarjeta_credito : 0
		}, { transaction: t }).then(function (ventaCreada) {
			venta.ventaCreada = ventaCreada
			return Dosificacion.update({
				correlativo: (venta.factura + 1)
			}, {
				where: { id: dosificacion.id },
				transaction: t
			}).then(function (dosificacionActualizada) {
				var promises = []
				venta.detalles = []
				venta.detallesVenta.forEach(function (detalleVenta, index, array) {
					promises.push(Producto.find({
						where: { nombre: detalleVenta.producto.nombre, codigo: detalleVenta.producto.codigo, id_empresa: req.params.id_empresa },
						include: [
							{ model: Clase, as: 'tipoProducto' }, {
								model: ProductoBase, as: 'productosBase',
								include: [{ model: Producto, as: 'productoBase' }]
							}
						], transaction: t
					}).then(function (ProductoEncontrado) {
						detalleVenta.producto = ProductoEncontrado
						var condicionInventario = {
							id_producto: ProductoEncontrado.id, id_almacen: almacen.id,
							cantidad: { $gt: 0 }
						}
						if (detalleVenta.lote) {
							condicionInventario.lote = detalleVenta.lote
						}
						if (detalleVenta.fecha_vencimiento) {
							var inicio = new Date(detalleVenta.fecha_vencimiento); inicio.setHours(0, 0, 0, 0, 0);
							var fin = new Date(detalleVenta.fecha_vencimiento); fin.setHours(23, 59, 59, 0, 0);

							condicionInventario.fecha_vencimiento = { $between: [inicio, fin] }
						}
						return Inventario.findAll({
							where: condicionInventario, transaction: t,
							order: [['id', 'asc']]
						}).then(function (encontrado) {
							detalleVenta.costos = encontrado
							agregarDetalleVenta(t, req, movimientoCreado, ventaCreada, detalleVenta, venta, ProductoEncontrado, encontrado, sucursal, index, array)
							//venta.detalles.concat(detalleVenta2)
						}).catch(function (err) {
							return new Promise(function (fulfill, reject) {
								reject(err);
							});
						});
					}))

				})

				return Promise.all(promises)

			}).catch(function (err) {
				return new Promise(function (fulfill, reject) {
					reject(err);
				});
			});
		}).catch(function (err) {
			return new Promise(function (fulfill, reject) {
				reject(err);
			});
		});
	}
	function agregarDetalleVenta(t, req, movimientoCreado, ventaCreada, detalleVenta, venta, ProductoEncontrado, encontrado, sucursal, index, array) {
		detalleVenta.producto = ProductoEncontrado
		detalleVenta.costos = encontrado
		if (detalleVenta.producto.id) {
			if (detalleVenta.producto.activar_inventario) {
				if (detalleVenta.costos.length > 1) {
					var datosDetalle = [], cantidadTotal = detalleVenta.cantidad, i = 0, detalleVentaOriginal = JSON.parse(JSON.stringify(detalleVenta));
					while (i < detalleVenta.costos.length && cantidadTotal > 0) {
						detalleVenta.inventarioProducto = detalleVenta.costos[i];
						if (detalleVenta.descuento > 0) {
							if (detalleVenta.tipo_descuento) {
								venta.total_descuento_general += (((detalleVenta.precio_unitario * detalleVenta.descuento) / 100) * detalleVenta.cantidad)
							} else {
								venta.total_descuento_general += detalleVenta.descuento
							}
						}
						if (detalleVenta.recargo > 0) {
							if (detalleVenta.tipo_recargo) {
								venta.total_recargo += (((detalleVenta.precio_unitario * detalleVenta.recargo) / 100) * detalleVenta.cantidad)
							} else {
								venta.total_recargo += detalleVenta.recargo
							}
						}
						var paraRectificacionDescuento = []
						while (i < detalleVenta.costos.length && cantidadTotal > 0) {
							detalleVenta.inventarioProducto = detalleVenta.costos[i];
							var cantidadDisponible = obtenerInventarioTotalPorFechaVencimiento(detalleVenta, datosDetalle);
							if (cantidadDisponible > 0) {
								var nuevoDetalleVenta = JSON.parse(JSON.stringify(detalleVentaOriginal));
								var cantidadParcial;

								if (cantidadTotal > cantidadDisponible) {
									cantidadParcial = cantidadDisponible;
									cantidadTotal = cantidadTotal - cantidadDisponible
								} else {
									cantidadParcial = cantidadTotal;
									cantidadTotal = 0;
								}
								nuevoDetalleVenta.cantidad = cantidadParcial;
								if (sucursal.empresa.usar_vencimientos) {
									nuevoDetalleVenta.fecha_vencimiento = detalleVenta.costos[i].fecha_vencimiento;
									nuevoDetalleVenta.lote = detalleVenta.costos[i].lote;
								}
								nuevoDetalleVenta.costos = [];
								nuevoDetalleVenta.costos.push(detalleVenta.costos[i]);
								nuevoDetalleVenta.inventario = detalleVenta.costos[i];
								paraRectificacionDescuento.push(nuevoDetalleVenta);
								nuevoDetalleVenta = calcularImporte(nuevoDetalleVenta, detalleVenta.ice, detalleVenta.excento);
								venta.detalles.push(nuevoDetalleVenta);
							}
						}
						i++;
					}
					var totalDescuento = detalleVenta.descuento ? detalleVenta.descuento > 0 ? (detalleVenta.descuento / detalleVenta.cantidad) : 0 : 0
					var totalRecargo = detalleVenta.recargo ? detalleVenta.recargo > 0 ? (detalleVenta.recargo / detalleVenta.cantidad) : 0 : 0
					var total_ice = detalleVenta.ice ? detalleVenta.ice > 0 ? (detalleVenta.ice / detalleVenta.cantidad) : 0 : 0
					var total_exento = detalleVenta.excento ? detalleVenta.excento > 0 ? (detalleVenta.excento / detalleVenta.cantidad) : 0 : 0
					if (!detalleVenta.tipo_descuento) {
						venta.total_descuento_general = detalleVenta.descuento;
						for (var index = 0; index < paraRectificacionDescuento.length; index++) {
							paraRectificacionDescuento[index].descuento = Math.round((totalDescuento * paraRectificacionDescuento[index].cantidad) * 100) / 100
						}
					}
					if (!detalleVenta.tipo_recargo) {
						venta.total_recargo_general = detalleVenta.recargo;
						for (var index = 0; index < paraRectificacionDescuento.length; index++) {
							paraRectificacionDescuento[index].recargo = Math.round((totalRecargo * paraRectificacionDescuento[index].cantidad) * 100) / 100
						}
					}
					if (total_ice > 0) {
						venta.total_ice = detalleVenta.ice;
						for (var index = 0; index < paraRectificacionDescuento.length; index++) {
							paraRectificacionDescuento[index].ice = Math.round((total_ice * paraRectificacionDescuento[index].cantidad) * 100) / 100
						}
					}
					if (total_exento > 0) {
						venta.total_exento = detalleVenta.excento;
						for (var index = 0; index < paraRectificacionDescuento.length; index++) {
							paraRectificacionDescuento[index].excento = Math.round((total_exento * paraRectificacionDescuento[index].cantidad) * 100) / 100
						}
					}
					for (var index = 0; index < paraRectificacionDescuento.length; index++) {
						var detalleCorregido = calcularImporte(paraRectificacionDescuento[index], paraRectificacionDescuento[index].ice, paraRectificacionDescuento[index].excento);
						venta.detalles.push(detalleCorregido);
					}
				} else {
					if (detalleVenta.costos.length > 0) {
						if (sucursal.empresa.usar_vencimientos) {
							detalleVenta.fecha_vencimiento = detalleVenta.costos[0].fecha_vencimiento;
							detalleVenta.lote = detalleVenta.costos[0].lote;
							detalleVenta.inventario = detalleVenta.costos[0];
						}
					}
					detalleVenta = calcularImporte(detalleVenta, detalleVenta.ice, detalleVenta.excento);
					venta.detalles.push(detalleVenta);
				}



			} else {
				detalleVenta = calcularImporte(detalleVenta, detalleVenta.ice, detalleVenta.excento);
				venta.detalles.push(detalleVenta);
			}

		}
		if (index == (array.length - 1)) {
			sequelize.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED }, function (tu) {
				promises2 = []
				venta.detalles.forEach(function (detalleVenta, index, array) {
					promises2.push(crearDetalleVentaImportacion(movimientoCreado, ventaCreada, detalleVenta, detalleVenta.precio_unitario, detalleVenta.importe, detalleVenta.total, index, array, req, venta, tu, sucursal));
				});
				return Promise.all(promises2)
			}).then(function (result) {
				return new Promise(function (fulfill, reject) {
					fulfill();
				});
			}).catch(function (err) {
				return new Promise(function (fulfill, reject) {
					reject(err);
				});
			});
		}

	}
	function obtenerInventarioTotalPorFechaVencimiento(detalleVenta, datosDetalle) {

		var cantidadTotal = detalleVenta.inventarioProducto.cantidad;
		if (datosDetalle.length > 0) {
			for (var j = 0; j < datosDetalle.length; j++) {
				if (datosDetalle[j].producto.id == detalleVenta.producto.id && datosDetalle[j].costos[0].id == detalleVenta.inventarioProducto.id && !datosDetalle[j].id) {
					cantidadTotal = cantidadTotal - datosDetalle[j].cantidad;
				}
			}
		}
		return cantidadTotal;


	}
	function calcularImporte(detalleVenta, ice, excento, dolares) {
		let descuento, recargo;
		if (dolares) {
			detalleVenta.importe_dolares = Math.round((detalleVenta.cantidad * detalleVenta.precio_unitario_dolares) * 1000) / 1000;
			if (detalleVenta.tipo_descuento) {
				descuento = detalleVenta.importe_dolares * (detalleVenta.descuento / 100);
			} else {
				descuento = detalleVenta.descuento;
			}
			if (detalleVenta.tipo_recargo) {
				recargo = detalleVenta.importe_dolares * (detalleVenta.recargo / 100);
			} else {
				recargo = detalleVenta.recargo;
			}
			detalleVenta.total = Math.round((detalleVenta.importe_dolares - descuento + recargo - ice - excento) * 1000) / 1000;
		} else {
			detalleVenta.importe = Math.round((detalleVenta.cantidad * detalleVenta.precio_unitario) * 1000) / 1000;
			if (detalleVenta.tipo_descuento) {
				descuento = detalleVenta.importe * (detalleVenta.descuento / 100);
			} else {
				descuento = detalleVenta.descuento;
			}
			if (detalleVenta.tipo_recargo) {
				recargo = detalleVenta.importe * (detalleVenta.recargo / 100);
			} else {
				recargo = detalleVenta.recargo;
			}
			detalleVenta.total = Math.round((detalleVenta.importe - descuento + recargo - ice - excento) * 1000) / 1000;
		}
		return detalleVenta
	}
	function crearDetalleVentaImportacion(movimientoCreado, ventaCreada, detalleVenta, precio_unitario, importe, total, index, array, req, venta, t, sucursal) {

		console.log("la sucursalllllll ============================================== ", sucursal);
		if (sucursal.empresa.dataValues.usar_peps) {
			if (detalleVenta.producto.tipoProducto.nombre_corto == Diccionario.TIPO_PRODUCTO_BASE) {
				return calcularCostosEgresosImportacion(detalleVenta, detalleVenta.producto, detalleVenta.cantidad, detalleVenta.costos,
					movimientoCreado, index, array, req, venta, t, ventaCreada);
			} else if (detalleVenta.producto.tipoProducto.nombre_corto == Diccionario.TIPO_PRODUCTO_INTERMEDIO) {
				var promises = [];
				for (var i = 0; i < detalleVenta.producto.productosBase.length; i++) {
					if ((i + 1) == detalleVenta.producto.productosBase.length) {
						promises.push(calcularCostosEgresosImportacion(detalleVenta, detalleVenta.producto.productosBase[i].productoBase, detalleVenta.producto.productosBase[i].formulacion * detalleVenta.cantidad, detalleVenta.producto.productosBase[i].productoBase.inventarios,
							movimientoCreado, index, array, req, venta, t, ventaCreada));
					} else {
						promises.push(calcularCostosEgresosImportacion(detalleVenta, detalleVenta.producto.productosBase[i].productoBase, detalleVenta.producto.productosBase[i].formulacion * detalleVenta.cantidad, detalleVenta.producto.productosBase[i].productoBase.inventarios,
							movimientoCreado, index - 1, array, req, venta, t, ventaCreada));
					}
				}
				return Promise.all(promises);
			} else {
				var promises = [];
				for (var i = 0; i < detalleVenta.producto.productosBase.length; i++) {
					if (detalleVenta.producto.productosBase[i].productoBase.tipoProducto.nombre_corto == Diccionario.TIPO_PRODUCTO_BASE) {
						if ((i + 1) == detalleVenta.producto.productosBase.length) {
							promises.push(calcularCostosEgresosImportacion(detalleVenta, detalleVenta.producto.productosBase[i].productoBase, detalleVenta.producto.productosBase[i].formulacion * detalleVenta.cantidad, detalleVenta.producto.productosBase[i].productoBase.inventarios,
								movimientoCreado, index, array, req, venta, t, ventaCreada));
						} else {
							promises.push(calcularCostosEgresosImportacion(detalleVenta, detalleVenta.producto.productosBase[i].productoBase, detalleVenta.producto.productosBase[i].formulacion * detalleVenta.cantidad, detalleVenta.producto.productosBase[i].productoBase.inventarios,
								movimientoCreado, index - 1, array, req, venta, t, ventaCreada));
						}
					} else if (detalleVenta.producto.productosBase[i].productoBase.tipoProducto.nombre_corto == Diccionario.TIPO_PRODUCTO_INTERMEDIO) {
						var innerpromises = [];
						for (var j = 0; j < detalleVenta.producto.productosBase[i].productoBase.productosBase.length; j++) {
							if ((j + 1) == detalleVenta.producto.productosBase[i].productoBase.productosBase.length) {
								innerpromises.push(calcularCostosEgresosImportacion(detalleVenta, detalleVenta.producto.productosBase[i].productoBase.productosBase[j].productoBase,
									detalleVenta.producto.productosBase[i].formulacion * detalleVenta.producto.productosBase[i].productoBase.productosBase[j].formulacion * detalleVenta.cantidad,
									detalleVenta.producto.productosBase[i].productoBase.productosBase[j].productoBase.inventarios, movimientoCreado, index, array, req, venta, t, ventaCreada));
							} else {
								innerpromises.push(calcularCostosEgresosImportacion(detalleVenta, detalleVenta.producto.productosBase[i].productoBase.productosBase[j].productoBase,
									detalleVenta.producto.productosBase[i].formulacion * detalleVenta.producto.productosBase[i].productoBase.productosBase[j].formulacion * detalleVenta.cantidad,
									detalleVenta.producto.productosBase[i].productoBase.productosBase[j].productoBase.inventarios, movimientoCreado, index - 1, array, req, venta, t, ventaCreada));
							}
						}
						promises.push(Promise.all(innerpromises));
					}
				}
				return Promise.all(promises);
			}
		}

	}
	function calcularCostosEgresosImportacion(detalleVenta, producto, cantidad, inventarios, movimientoCreado, index, array, req, venta, t, detalleVentaCreada) {
		var cantidadTotal = cantidad;
		var condicionInventario = {
			id_producto: producto.id, id_almacen: venta.almacen.id,
			cantidad: { $gt: 0 }
		}
		if (detalleVenta.lote) {
			condicionInventario.lote = detalleVenta.lote
		}
		if (detalleVenta.fecha_vencimiento) {
			var inicio = new Date(detalleVenta.fecha_vencimiento); inicio.setHours(0, 0, 0, 0, 0);
			var fin = new Date(detalleVenta.fecha_vencimiento); fin.setHours(23, 59, 59, 0, 0);

			condicionInventario.fecha_vencimiento = { $between: [inicio, fin] }
		}

		if (producto.activar_inventario) {
			if (inventarios.length > 0) {
				var promises = [];
				for (var i = 0; i < inventarios.length; i++) {
					if (cantidadTotal > 0) {
						var cantidadParcial;
						if (cantidadTotal > inventarios[i].cantidad) {
							cantidadParcial = inventarios[i].cantidad;
							cantidadTotal = cantidadTotal - inventarios[i].cantidad
						} else {
							cantidadParcial = cantidadTotal;
							cantidadTotal = 0;
						}
						if (cantidadParcial > 0) {
							return DetalleVenta.create({
								id_venta: venta.ventaCreada.id,
								id_producto: detalleVenta.producto.id,
								precio_unitario: detalleVenta.precio_unitario,
								precio_unitario_dolares: detalleVenta.precio_unitario_dolares,
								cantidad: detalleVenta.cantidad,
								importe: detalleVenta.importe ? detalleVenta.importe : 0,
								importe_dolares: detalleVenta.importe_dolares ? detalleVenta.importe_dolares : 0,
								descuento: detalleVenta.descuento,
								recargo: detalleVenta.recargo,
								ice: detalleVenta.ice,
								excento: detalleVenta.excento,
								descuento_dolares: detalleVenta.descuento_dolares,
								recargo_dolares: detalleVenta.recargo_dolares,
								ice_dolares: detalleVenta.ice_dolares,
								excento_dolares: detalleVenta.excento_dolares,
								tipo_descuento: detalleVenta.tipo_descuento.toUpperCase() == "%" ? true : false,
								tipo_recargo: detalleVenta.tipo_recargo.toUpperCase() == "%" ? true : false,
								total: detalleVenta.total ? detalleVenta.total : 0,
								total_dolares: detalleVenta.total_dolares ? detalleVenta.total_dolares : 0,
								fecha_vencimiento: detalleVenta.fecha_vencimiento,
								lote: detalleVenta.lote,
								id_inventario: (detalleVenta.costos.length > 0) ? detalleVenta.costos[0].id : null,
								observaciones: detalleVenta.observaciones
							}, { transaction: t }).then(function (detalleVentaCreada) {
								return crearMovimientoEgresoYActualizarInventarioImportacion(movimientoCreado, detalleVenta, producto, cantidad, inventarios, cantidadParcial, inventarios[i], index, array, i, req, venta, t, detalleVentaCreada);
							})
						}
					} else {

					}
				}
				return Promise.all(promises);
			} else {

				return new Promise(function (fulfill, reject) {
					fulfill(venta);
				});

			}
		} else {

			return new Promise(function (fulfill, reject) {
				fulfill(venta);
			});

		}

	}
	function crearMovimientoEgresoYActualizarInventarioImportacion(movimientoCreado, detalleVenta, producto, cantidad, inventarios, cantidadParcial, costo, index, array, i, res, datosVenta, t, detalleVentaCreada) {
		return DetalleMovimiento.create({
			id_movimiento: movimientoCreado.id,
			id_producto: producto.id,
			cantidad: cantidadParcial,
			costo_unitario: costo.costo_unitario ? costo.costo_unitario : 0,
			costo_unitario_dolares: costo.costo_unitario_dolares ? costo.costo_unitario_dolares : 0,
			importe: (cantidadParcial * (costo.costo_unitario ? costo.costo_unitario : 0)),
			importe_dolares: (cantidadParcial * (costo.costo_unitario_dolares ? costo.costo_unitario_dolares : 0)),
			total: (cantidadParcial * (costo.costo_unitario ? costo.costo_unitario : 0)),
			total_dolares: (cantidadParcial * (costo.costo_unitario_dolares ? costo.costo_unitario_dolares : 0)),
			descuento: detalleVenta.descuento,
			recargo: detalleVenta.recargo,
			ice: detalleVenta.ice,
			excento: detalleVenta.excento,
			descuento_dolares: detalleVenta.descuento_dolares,
			recargo_dolares: detalleVenta.recargo_dolares,
			ice_dolares: detalleVenta.ice_dolares,
			excento_dolares: detalleVenta.excento_dolares,
			tipo_descuento: detalleVenta.tipo_descuento.toUpperCase() == "%" ? true : false,
			tipo_recargo: detalleVenta.tipo_recargo.toUpperCase() == "%" ? true : false,
			fecha_vencimiento: detalleVenta.fecha_vencimiento,
			lote: detalleVenta.lote,
			id_inventario: costo.id
		}, { transaction: t }).then(function (detalleMovimientoCreado) {
			return DetalleVentaProductoFinal.create({
				id_detalle_venta: detalleVentaCreada.id,
				id_detalle_movimiento: detalleMovimientoCreado.id
			},
				{ transaction: t }).then(function (creado) {
					sequelize.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED }, function (tu) {
						return Inventario.find({
							where: {
								id: costo.id
							},
							transaction: tu,
							lock: tu.LOCK.UPDATE
						}).then(function (inventario) {
							return Inventario.update({
								cantidad: inventario.cantidad - cantidadParcial,
								costo_total: ((inventario.cantidad - cantidadParcial) * (costo.costo_unitario ? costo.costo_unitario : 0)),
								costo_total_dolares: ((inventario.cantidad - cantidadParcial) * (costo.costo_unitario_dolares ? costo.costo_unitario_dolares : 0))
							}, {
								where: {
									id: inventario.id
								},
								transaction: tu
							}).then(function (result) {
								contador++
								return new Promise(function (fulfill, reject) {
									fulfill(datosVenta);
								});
							});
						});
					}).then(function (result) {
						return new Promise(function (fulfill, reject) {
							fulfill(datosVenta);
						});
					}).catch(function (err) {
						return new Promise(function (fulfill, reject) {
							reject(err);
						});
					});
				}).catch(function (err) {
					return new Promise(function (fulfill, reject) {
						reject(err);
					});
				});
		}).catch(function (err) {
			return new Promise(function (fulfill, reject) {
				reject(err);
			});
		});
	}

	router.route('/importar-pagos-compra/empresa/:id_empresa')
		.post(ensureAuthorizedlogged, function (req, res) {
			Clase.find({
				where: { nombre_corto: 'ID' }
			}).then(function (conceptoMovimiento) {
				var promises = []
				var a_cuenta = 0
				var saldo = 0
				sequelize.transaction(function (t) {
					req.body.pagos.forEach(function (pago, index, array) {
						promises.push(Compra.find({
							where: { factura: pago.factura },
							include: [{ model: Movimiento, as: 'movimiento', where: { id_clase: conceptoMovimiento.id } }, {
								model: Almacen, as: 'almacen',
								include: [{ model: Sucursal, as: 'sucursal', where: { id_empresa: req.params.id_empresa, id: pago.sucursal.id } }]
							}],
							transaction: t
						}).then(function (compraEncontrada) {
							if (!compraEncontrada.almacen.sucursal.activo) throw new Error('Sucursal ' + compraEncontrada.almacen.sucursal.nombre + ' está deshabilitada, no se pueden hacer cambios.')
							var pagoV = pago.monto

							if (index == 0) {
								a_cuenta = compraEncontrada.a_cuenta
								saldo = compraEncontrada.saldo
							} else {
								var i = index - 1
								if (pago.factura == req.body.pagos[i].factura) {
									a_cuenta = a_cuenta + req.body.pagos[i].monto
									saldo = saldo - req.body.pagos[i].monto
								} else {
									a_cuenta = compraEncontrada.a_cuenta
									saldo = compraEncontrada.saldo
								}
							}
							return Compra.update({
								a_cuenta: a_cuenta + pagoV,
								saldo: compraEncontrada.total - (a_cuenta + pagoV)
							}, {
								where: {
									id: compraEncontrada.id
								},
								transaction: t
							}).then(function (affectedRows) {
								if (index == 0) {
									a_cuenta = compraEncontrada.a_cuenta
									saldo = compraEncontrada.saldo
								} else {
									var i = index - 1
									if (pago.factura == req.body.pagos[i].factura) {
										a_cuenta = a_cuenta + req.body.pagos[i].monto
										saldo = saldo - req.body.pagos[i].monto
									} else {
										a_cuenta = compraEncontrada.a_cuenta
										saldo = compraEncontrada.saldo
									}
								}
								return PagoCompra.create({
									id_compra: compraEncontrada.id,
									a_cuenta_anterior: a_cuenta,
									saldo_anterior: saldo,
									monto_pagado: pagoV,
									id_usuario: pago.id_usuario_cajero,
									numero_documento: compraEncontrada.almacen.sucursal.nota_recibo_correlativo + (index)
								}, {
									transaction: t
								}).then(function (detalleVentaCreada) {
									return Sucursal.update({
										nota_recibo_correlativo: compraEncontrada.almacen.sucursal.nota_recibo_correlativo + (index + 1)
									}, {
										where: {
											id: compraEncontrada.almacen.sucursal.id
										},
										transaction: t
									}).then(function (affectedRows) {
										return new Promise(function (fulfill, reject) {
											fulfill();
										});
										return new Promise(function (fulfill, reject) {
											fulfill();
										});
										//logica de anticipos va aqui
									}).catch(function (err) {
										return new Promise(function (fulfill, reject) {
											reject(err);
										});
									});
								}).catch(function (err) {
									return new Promise(function (fulfill, reject) {
										reject(err);
									});
								});
							}).catch(function (err) {
								return new Promise(function (fulfill, reject) {
									reject(err);
								});
							});
						}).catch(function (err) {
							return new Promise(function (fulfill, reject) {
								reject(err);
							});
						}));
					})
					return Promise.all(promises)
				}).then(function name(result) {
					res.json({ mensaje: "Importación satisfactoriamente!" })
				}).catch(function (err) {
					res.json({ hasError: true, mensaje: err.stack ? err.stack : err });
				})
			})
		})
	router.route('/importar-pagos-ventas/empresa/:id_empresa')
		.post(ensureAuthorizedlogged, function (req, res) {
			Clase.find({
				where: { nombre_corto: Diccionario.EGRE_FACTURACION }
			}).then(function (conceptoMovimiento) {
				var promises = []
				var a_cuenta = 0
				var saldo = 0
				sequelize.transaction(function (t) {
					req.body.pagos.forEach(function (pago, index, array) {
						promises.push(Venta.find({
							where: { factura: pago.factura, autorizacion: pago.autorizacion },
							include: [{
								model: Almacen, as: 'almacen',
								include: [{ model: Sucursal, as: 'sucursal', where: { id_empresa: req.params.id_empresa } },
								]
							}, {
								model: Movimiento, as: 'movimiento', where: { id_clase: conceptoMovimiento.id },
								include: [{ model: Clase, as: 'clase' }]
							}],
							transaction: t
						}).then(function (ventaEncontrada) {
							if (!ventaEncontrada.almacen.sucursal.activo) throw new Error('Sucursal ' + ventaEncontrada.almacen.sucursal.nombre + ' está deshabilitada, no se pueden hacer cambios.')
							var pagoV = pago.monto
							if (index == 0) {
								a_cuenta = ventaEncontrada.a_cuenta
								saldo = ventaEncontrada.saldo
							} else {
								var i = index - 1
								if (pago.factura == req.body.pagos[i].factura) {
									a_cuenta = a_cuenta + req.body.pagos[i].monto
									saldo = saldo - req.body.pagos[i].monto
								} else {
									a_cuenta = ventaEncontrada.a_cuenta
									saldo = ventaEncontrada.saldo
								}
							}
							return Venta.update({
								a_cuenta: a_cuenta + pagoV,
								saldo: ventaEncontrada.total - (a_cuenta + pagoV)
							}, {
								where: {
									id: ventaEncontrada.id
								},
								transaction: t
							}).then(function (affectedRows) {
								if (index == 0) {
									a_cuenta = ventaEncontrada.a_cuenta
									saldo = ventaEncontrada.saldo
								} else {
									var i = index - 1
									if (pago.factura == req.body.pagos[i].factura) {
										a_cuenta = a_cuenta + req.body.pagos[i].monto
										saldo = saldo - req.body.pagos[i].monto
									} else {
										a_cuenta = ventaEncontrada.a_cuenta
										saldo = ventaEncontrada.saldo
									}
								}
								return PagoVenta.create({
									id_venta: ventaEncontrada.id,
									a_cuenta_anterior: a_cuenta,
									saldo_anterior: saldo,
									monto_pagado: pagoV,
									id_usuario: pago.id_usuario_cajero,
									numero_documento: ventaEncontrada.almacen.sucursal.nota_recibo_correlativo + (index)
								}, {
									transaction: t
								}).then(function (detalleVentaCreada) {
									return Sucursal.update({
										nota_recibo_correlativo: ventaEncontrada.almacen.sucursal.nota_recibo_correlativo + (index + 1)
									}, {
										where: {
											id: ventaEncontrada.almacen.sucursal.id
										},
										transaction: t
									}).then(function (affectedRows) {
										return new Promise(function (fulfill, reject) {
											fulfill();
										});
										return new Promise(function (fulfill, reject) {
											fulfill();
										});
										//logica de anticipos va aqui
									}).catch(function (err) {
										return new Promise(function (fulfill, reject) {
											reject(err);
										});
									});
								}).catch(function (err) {
									return new Promise(function (fulfill, reject) {
										reject(err);
									});
								});
							}).catch(function (err) {
								return new Promise(function (fulfill, reject) {
									reject(err);
								});
							});
						}).catch(function (err) {
							return new Promise(function (fulfill, reject) {
								reject(err);
							});
						}));
					})
					return Promise.all(promises)
				}).then(function name(result) {
					res.json({ mensaje: "Importación satisfactoriamente!" })
				}).catch(function (err) {
					res.json({ hasError: true, mensaje: err.stack ? err.stack : err });
				})
			})
		})

	router.route('/revision-inventarios/empresa/:id_empresa')
		.post(ensureAuthorizedlogged, function (req, res) {
			var invFaltantes = [];
			Almacen.find({
				where: {
					id: req.body.almacen
				},
				include: [
					{
						model: Sucursal, as: 'sucursal'
					}
				]
			}).then((alm) => {
				if (!alm.sucursal.activo) return res.jon({ mensaje: 'Sucursal ' + alm.sucursal.nombre + ' está deshabilitada, no se pueden hacer cambios.' })
				req.body.detalles.forEach(function (detalle, index, array) {
					if (detalle.producto.activar_inventario) {
						var cantidadVenta = detalle.cantidad;

						Inventario.findAll({
							where: { id_producto: detalle.producto.id, id_almacen: req.body.almacen, cantidad: { $gt: 0 } },
							attributes: [[sequelize.fn('sum', sequelize.col('cantidad')), 'cantidadTotal']],
							group: ["`inv_inventario`.`producto`"],
							raw: true
						}).then(function (inventarios) {
							if (inventarios.length > 0) {
								if (cantidadVenta <= inventarios[0].cantidadTotal) {

								} else {
									invFaltantes.push(detalle.producto);
								}
							} else {
								if (detalle.producto.activar_inventario) {

								}
								invFaltantes.push(detalle.producto);
							}
							if (index === (array.length - 1)) {
								console.log(invFaltantes);
								res.json({ mensaje: "Datos agregados satisfactoriamente!", faltantes: invFaltantes });
							}
						});
					} else {
						invFaltantes.push(detalle.producto);
						if (index === (array.length - 1)) {
							console.log(invFaltantes);
							res.json({ mensaje: "Datos agregados satisfactoriamente!", faltantes: invFaltantes });
						}
					}
				})
			}).catch((err) => {
				res.json({ mensaje: err.stack, hasErr: true, hasError: true, message: err.stack })
			})
		});

	var obtenerSaldo = function (detMovs) {
		var dato = {};
		dato.detallesMovimiento = JSON.parse(JSON.stringify(detMovs));
		for (var i = 0; i < dato.detallesMovimiento.length; i++) {
			dato.detallesMovimiento[i].costo_unitario = Math.round((dato.detallesMovimiento[i].costo_unitario * 0.87) * 100) / 100;
			if (i == 0 && dato.detallesMovimiento[i].movimiento.tipo.nombre_corto == "MOVING" && dato.detallesMovimiento[i].movimiento.clase.nombre_corto == "III") {
				dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i].cantidad;
				dato.detallesMovimiento[i].saldoValuado = Math.round((dato.detallesMovimiento[i].saldoFisico * dato.detallesMovimiento[i].costo_unitario) * 100) / 100;
				dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre;
			} else if (i == 0 && dato.detallesMovimiento[i].movimiento.tipo.nombre_corto == "MOVING") {
				dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i].cantidad;
				dato.detallesMovimiento[i].saldoValuado = Math.round((dato.detallesMovimiento[i].saldoFisico * dato.detallesMovimiento[i].costo_unitario) * 100) / 100;
				dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre;
			}
			else {
				if (dato.detallesMovimiento[i].movimiento.tipo.nombre_corto == "MOVING") {
					if (i > 0) {
						dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i - 1].saldoFisico + dato.detallesMovimiento[i].cantidad;
						dato.detallesMovimiento[i].saldoValuado = Math.round((dato.detallesMovimiento[i - 1].saldoValuado + (dato.detallesMovimiento[i].cantidad * dato.detallesMovimiento[i].costo_unitario)) * 100) / 100;
						dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre;
					} else {
						dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i].cantidad;
						dato.detallesMovimiento[i].saldoValuado = Math.round(((dato.detallesMovimiento[i].cantidad * dato.detallesMovimiento[i].costo_unitario)) * 100) / 100;
						dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre;
					}
				} else {
					if (dato.detallesMovimiento[i].movimiento.venta) {
						//dato.detallesMovimiento[i].costo_unitario=dato.detallesMovimiento[i].costo_unitario*0.87;
						if (i > 0) {
							dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i - 1].saldoFisico - dato.detallesMovimiento[i].cantidad;
							dato.detallesMovimiento[i].saldoValuado = Math.round((dato.detallesMovimiento[i - 1].saldoValuado - (dato.detallesMovimiento[i].cantidad * dato.detallesMovimiento[i].costo_unitario)) * 100) / 100;
							dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre + " Nro. " + dato.detallesMovimiento[i].movimiento.venta.factura;
						} else {
							dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i].cantidad;
							dato.detallesMovimiento[i].saldoValuado = Math.round(((dato.detallesMovimiento[i].cantidad * dato.detallesMovimiento[i].costo_unitario)) * 100) / 100;
							dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre + " Nro. " + dato.detallesMovimiento[i].movimiento.venta.factura;
						}
					} else {
						if (i > 0) {
							dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i - 1].saldoFisico - dato.detallesMovimiento[i].cantidad;
							dato.detallesMovimiento[i].saldoValuado = Math.round((dato.detallesMovimiento[i - 1].saldoValuado - (dato.detallesMovimiento[i].cantidad * dato.detallesMovimiento[i].costo_unitario)) * 100) / 100;
							dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre;
						} else {
							dato.detallesMovimiento[i].saldoFisico = dato.detallesMovimiento[i].cantidad;
							dato.detallesMovimiento[i].saldoValuado = Math.round(((dato.detallesMovimiento[i].cantidad * dato.detallesMovimiento[i].costo_unitario)) * 100) / 100;
							dato.detallesMovimiento[i].tipo = dato.detallesMovimiento[i].movimiento.clase.nombre;
						}
					}
				}

			}
			dato.detallesMovimiento[i].saldoV = dato.detallesMovimiento[i].saldoValuado.toFixed(2);
		}

		if (dato.detallesMovimiento.length > 0) {
			dato.detallesMovimiento[dato.detallesMovimiento.length - 1].tipo = "SALDO ANTERIOR";
			dato.detallesMovimiento[dato.detallesMovimiento.length - 1].movimiento.compra = null;
			dato.detallesMovimiento[dato.detallesMovimiento.length - 1].movimiento.venta = null;
			return dato.detallesMovimiento[dato.detallesMovimiento.length - 1];
		} else {
			return 0;
		}
	}

	router.route('/productos/movimientos-consolidados/empresa/:id_empresa/sucursal/:id_sucursal/almacen/:id_almacen/grupo/:grupo/inicio/:inicio/fin/:fin')
		.get(ensureAuthorizedlogged, function (req, res) {
			var fechaInicial = req.params.inicio.split('/').reverse().join('-') + " 00:00:00";
			var fechaFinal = req.params.fin.split('/').reverse().join('-') + " 23:59:59";
			var baseFin = new Date(fechaInicial);
			var fin = new Date(baseFin.setDate(baseFin.getDate() - 1));
			let i = new Date(fechaInicial).getFullYear()
			let f = new Date(fechaFinal).getFullYear()
			var fechaInicio = new Date(fechaInicial).getFullYear() + "-01-01 00:00:00";
			let a = new Date(fechaInicial).getMonth()
			let b = new Date(fechaFinal).getMonth();
			let mes = parseInt(fin.getMonth()) + 1;
			var fechaFin = fin.getFullYear() + "-" + mes + "-" + fin.getDate() + " 23:59:59"
			var query = ''
			var select1 = 'SELECT DISTINCT producto_base.id AS id_producto, producto_base.nombre, producto_base.codigo, producto_base.unidad_medida, IFNULL(inv_inicial_ing.cantidad, 0) AS inv_inicial_ing, IFNULL(inv_inicial_egr.cantidad, 0) AS inv_inicial_egr, IFNULL(ing_compras.cantidad, 0) AS ing_compras, IFNULL(ing_devoluciones.cantidad, 0) AS ing_devoluciones, IFNULL(ing_traspaso.cantidad, 0) AS ing_traspaso, IFNULL(ing_ajustes.cantidad, 0) AS ing_ajustes, IFNULL(egr_ventas.cantidad, 0) AS egr_ventas, IFNULL(egr_consumo.cantidad, 0) AS egr_consumo, IFNULL(egr_traspaso.cantidad, 0) AS egr_traspaso, IFNULL(egr_trasp_almacen.cantidad, 0) AS egr_trasp_almacen, IFNULL(egr_trasp_mant.cantidad, 0) AS egr_trasp_mant, IFNULL(egr_dotacion.cantidad, 0) AS egr_dotacion, IFNULL(egr_bajas.cantidad, 0) AS egr_bajas';
			var select2 = 'SELECT DISTINCT producto_base.id AS id_producto, producto_base.nombre, producto_base.codigo, producto_base.unidad_medida, IFNULL(inv_inicial_ing.cantidad, 0) AS inv_inicial_ing, IFNULL(inv_inicial_egr.cantidad, 0) AS inv_inicial_egr, IFNULL(ing_saldo_ant.cantidad, 0) AS ing_saldo_ant, IFNULL(egr_saldo_ant.cantidad, 0) AS egr_saldo_ant, IFNULL(ing_compras.cantidad, 0) AS ing_compras, IFNULL(ing_devoluciones.cantidad, 0) AS ing_devoluciones, IFNULL(ing_traspaso.cantidad, 0) AS ing_traspaso, IFNULL(ing_ajustes.cantidad, 0) AS ing_ajustes, IFNULL(egr_ventas.cantidad, 0) AS egr_ventas, IFNULL(egr_consumo.cantidad, 0) AS egr_consumo, IFNULL(egr_traspaso.cantidad, 0) AS egr_traspaso, IFNULL(egr_trasp_almacen.cantidad, 0) AS egr_trasp_almacen, IFNULL(egr_trasp_mant.cantidad, 0) AS egr_trasp_mant, IFNULL(egr_dotacion.cantidad, 0) AS egr_dotacion, IFNULL(egr_bajas.cantidad, 0) AS egr_bajas';

			var from = ' FROM agil_producto producto_base INNER JOIN inv_detalle_movimiento detalleMovimiento ON detalleMovimiento.producto=producto_base.id INNER JOIN inv_inventario inventario ON inventario.id=detalleMovimiento.inventario INNER JOIN inv_movimiento movimiento ON movimiento.id=detalleMovimiento.movimiento INNER JOIN agil_almacen almacen ON almacen.id=movimiento.almacen'

			var inv_inicial_ing = ' LEFT JOIN ( SELECT detalle.producto AS producto,SUM(detalle.cantidad) AS cantidad FROM inv_detalle_movimiento detalle INNER JOIN inv_movimiento movimiento ON movimiento.id=detalle.movimiento INNER JOIN gl_tipo tipo ON tipo.id=movimiento.tipo INNER JOIN gl_clase clase ON clase.id=movimiento.clase WHERE movimiento.fecha BETWEEN "' + fechaInicio + '" AND "' + fechaFinal + '" AND tipo.nombre_corto="MOVING" AND clase.nombre_corto="III" AND movimiento.almacen=' + req.params.id_almacen + ' GROUP BY detalle.producto) AS inv_inicial_ing ON inv_inicial_ing.producto=producto_base.id'

			var inv_inicial_egr = ' LEFT JOIN ( SELECT detalle.producto AS producto,SUM(detalle.cantidad) AS cantidad FROM inv_detalle_movimiento detalle INNER JOIN inv_movimiento movimiento ON movimiento.id=detalle.movimiento INNER JOIN gl_tipo tipo ON tipo.id=movimiento.tipo INNER JOIN gl_clase clase ON clase.id=movimiento.clase WHERE movimiento.fecha BETWEEN "' + fechaInicio + '" AND "' + fechaFinal + '" AND tipo.nombre_corto="MOVEGR" AND clase.nombre_corto="III" AND movimiento.almacen=' + req.params.id_almacen + ' GROUP BY detalle.producto) AS inv_inicial_egr ON inv_inicial_egr.producto=producto_base.id'

			var ing_saldo_ant = ' LEFT JOIN ( SELECT detalle.producto AS producto,SUM(detalle.cantidad) AS cantidad FROM inv_detalle_movimiento detalle INNER JOIN inv_movimiento movimiento ON movimiento.id=detalle.movimiento INNER JOIN gl_tipo tipo ON tipo.id=movimiento.tipo INNER JOIN gl_clase clase ON clase.id=movimiento.clase WHERE movimiento.fecha BETWEEN "' + fechaInicio + '" AND "' + fechaFin + '" AND tipo.nombre_corto="MOVING" AND clase.nombre_corto IN ("III","IPCSF","IPI","ID","IPRB","IPD","IPT","IPA") AND movimiento.almacen=' + req.params.id_almacen + ' GROUP BY detalle.producto) AS ing_saldo_ant ON ing_saldo_ant.producto=producto_base.id'

			var egr_saldo_ant = ' LEFT JOIN ( SELECT detalle.producto AS producto,SUM(detalle.cantidad) AS cantidad FROM inv_detalle_movimiento detalle INNER JOIN inv_movimiento movimiento ON movimiento.id=detalle.movimiento INNER JOIN gl_tipo tipo ON tipo.id=movimiento.tipo INNER JOIN gl_clase clase ON clase.id=movimiento.clase WHERE movimiento.fecha BETWEEN "' + fechaInicio + '" AND "' + fechaFin + '" AND tipo.nombre_corto="MOVEGR" AND clase.nombre_corto IN ("FACT","PFR","CONSUM","TRAS","TRAS_ALM","SMOT","EPPS","BAJA") AND movimiento.almacen=' + req.params.id_almacen + ' GROUP BY detalle.producto) AS egr_saldo_ant ON egr_saldo_ant.producto=producto_base.id'

			var ing_compras = ' LEFT JOIN ( SELECT detalle.producto AS producto,SUM(detalle.cantidad) AS cantidad FROM inv_detalle_movimiento detalle INNER JOIN inv_movimiento movimiento ON movimiento.id=detalle.movimiento INNER JOIN gl_tipo tipo ON tipo.id=movimiento.tipo INNER JOIN gl_clase clase ON clase.id=movimiento.clase WHERE movimiento.fecha BETWEEN "' + fechaInicial + '" AND "' + fechaFinal + '" AND tipo.nombre_corto="MOVING" AND clase.nombre_corto IN ("IPCSF","IPI","ID","IPRB") AND movimiento.almacen=' + req.params.id_almacen + ' GROUP BY detalle.producto) AS ing_compras ON ing_compras.producto=producto_base.id'

			var ing_devoluciones = ' LEFT JOIN ( SELECT detalle.producto AS producto,SUM(detalle.cantidad) AS cantidad FROM inv_detalle_movimiento detalle INNER JOIN inv_movimiento movimiento ON movimiento.id=detalle.movimiento INNER JOIN gl_tipo tipo ON tipo.id=movimiento.tipo INNER JOIN gl_clase clase ON clase.id=movimiento.clase WHERE movimiento.fecha BETWEEN "' + fechaInicial + '" AND "' + fechaFinal + '" AND tipo.nombre_corto="MOVING" AND clase.nombre_corto="IPD" AND movimiento.almacen=' + req.params.id_almacen + ' GROUP BY detalle.producto) AS ing_devoluciones ON ing_devoluciones.producto=producto_base.id'

			var ing_traspaso = ' LEFT JOIN ( SELECT detalle.producto AS producto,SUM(detalle.cantidad) AS cantidad FROM inv_detalle_movimiento detalle INNER JOIN inv_movimiento movimiento ON movimiento.id=detalle.movimiento INNER JOIN gl_tipo tipo ON tipo.id=movimiento.tipo INNER JOIN gl_clase clase ON clase.id=movimiento.clase WHERE movimiento.fecha BETWEEN "' + fechaInicial + '" AND "' + fechaFinal + '" AND tipo.nombre_corto="MOVING" AND clase.nombre_corto="IPT" AND movimiento.almacen=' + req.params.id_almacen + ' GROUP BY detalle.producto) AS ing_traspaso ON ing_traspaso.producto=producto_base.id'

			var ing_ajustes = ' LEFT JOIN ( SELECT detalle.producto AS producto,SUM(detalle.cantidad) AS cantidad FROM inv_detalle_movimiento detalle INNER JOIN inv_movimiento movimiento ON movimiento.id=detalle.movimiento INNER JOIN gl_tipo tipo ON tipo.id=movimiento.tipo INNER JOIN gl_clase clase ON clase.id=movimiento.clase WHERE movimiento.fecha BETWEEN "' + fechaInicial + '" AND "' + fechaFinal + '" AND tipo.nombre_corto="MOVING" AND clase.nombre_corto="IPA" AND movimiento.almacen=' + req.params.id_almacen + ' GROUP BY detalle.producto) AS ing_ajustes ON ing_ajustes.producto=producto_base.id'

			var egr_ventas = ' LEFT JOIN ( SELECT detalle.producto AS producto,SUM(detalle.cantidad) AS cantidad FROM inv_detalle_movimiento detalle INNER JOIN inv_movimiento movimiento ON movimiento.id=detalle.movimiento INNER JOIN gl_tipo tipo ON tipo.id=movimiento.tipo INNER JOIN gl_clase clase ON clase.id=movimiento.clase WHERE movimiento.fecha BETWEEN "' + fechaInicial + '" AND "' + fechaFinal + '" AND tipo.nombre_corto="MOVEGR" AND clase.nombre_corto IN ("FACT","PFR") AND movimiento.almacen=' + req.params.id_almacen + ' GROUP BY detalle.producto) AS egr_ventas ON egr_ventas.producto=producto_base.id'

			var egr_consumo = ' LEFT JOIN ( SELECT detalle.producto AS producto,SUM(detalle.cantidad) AS cantidad FROM inv_detalle_movimiento detalle INNER JOIN inv_movimiento movimiento ON movimiento.id=detalle.movimiento INNER JOIN gl_tipo tipo ON tipo.id=movimiento.tipo INNER JOIN gl_clase clase ON clase.id=movimiento.clase WHERE movimiento.fecha BETWEEN "' + fechaInicial + '" AND "' + fechaFinal + '" AND tipo.nombre_corto="MOVEGR" AND clase.nombre_corto="CONSUM" AND movimiento.almacen=' + req.params.id_almacen + ' GROUP BY detalle.producto) AS egr_consumo ON egr_consumo.producto=producto_base.id'

			var egr_traspaso = ' LEFT JOIN ( SELECT detalle.producto AS producto,SUM(detalle.cantidad) AS cantidad FROM inv_detalle_movimiento detalle INNER JOIN inv_movimiento movimiento ON movimiento.id=detalle.movimiento INNER JOIN gl_tipo tipo ON tipo.id=movimiento.tipo INNER JOIN gl_clase clase ON clase.id=movimiento.clase WHERE movimiento.fecha BETWEEN "' + fechaInicial + '" AND "' + fechaFinal + '" AND tipo.nombre_corto="MOVEGR" AND clase.nombre_corto="TRAS" AND movimiento.almacen=' + req.params.id_almacen + ' GROUP BY detalle.producto) AS egr_traspaso ON egr_traspaso.producto=producto_base.id'

			var egr_trasp_almacen = ' LEFT JOIN ( SELECT detalle.producto AS producto,SUM(detalle.cantidad) AS cantidad FROM inv_detalle_movimiento detalle INNER JOIN inv_movimiento movimiento ON movimiento.id=detalle.movimiento INNER JOIN gl_tipo tipo ON tipo.id=movimiento.tipo INNER JOIN gl_clase clase ON clase.id=movimiento.clase WHERE movimiento.fecha BETWEEN "' + fechaInicial + '" AND "' + fechaFinal + '" AND tipo.nombre_corto="MOVEGR" AND clase.nombre_corto="TRAS_ALM" AND movimiento.almacen=' + req.params.id_almacen + ' GROUP BY detalle.producto) AS egr_trasp_almacen ON egr_trasp_almacen.producto=producto_base.id'

			var egr_trasp_mant = ' LEFT JOIN ( SELECT detalle.producto AS producto,SUM(detalle.cantidad) AS cantidad FROM inv_detalle_movimiento detalle INNER JOIN inv_movimiento movimiento ON movimiento.id=detalle.movimiento INNER JOIN gl_tipo tipo ON tipo.id=movimiento.tipo INNER JOIN gl_clase clase ON clase.id=movimiento.clase WHERE movimiento.fecha BETWEEN "' + fechaInicial + '" AND "' + fechaFinal + '" AND tipo.nombre_corto="MOVEGR" AND clase.nombre_corto="SMOT" AND movimiento.almacen=' + req.params.id_almacen + ' GROUP BY detalle.producto) AS egr_trasp_mant ON egr_trasp_mant.producto=producto_base.id'

			var egr_dotacion = ' LEFT JOIN ( SELECT detalle.producto AS producto,SUM(detalle.cantidad) AS cantidad FROM inv_detalle_movimiento detalle INNER JOIN inv_movimiento movimiento ON movimiento.id=detalle.movimiento INNER JOIN gl_tipo tipo ON tipo.id=movimiento.tipo INNER JOIN gl_clase clase ON clase.id=movimiento.clase WHERE movimiento.fecha BETWEEN "' + fechaInicial + '" AND "' + fechaFinal + '" AND tipo.nombre_corto="MOVEGR" AND clase.nombre_corto="EPPS" AND movimiento.almacen=' + req.params.id_almacen + ' GROUP BY detalle.producto) AS egr_dotacion ON egr_dotacion.producto=producto_base.id'

			var egr_bajas = ' LEFT JOIN ( SELECT detalle.producto AS producto,SUM(detalle.cantidad) AS cantidad FROM inv_detalle_movimiento detalle INNER JOIN inv_movimiento movimiento ON movimiento.id=detalle.movimiento INNER JOIN gl_tipo tipo ON tipo.id=movimiento.tipo INNER JOIN gl_clase clase ON clase.id=movimiento.clase WHERE movimiento.fecha BETWEEN "' + fechaInicial + '" AND "' + fechaFinal + '" AND tipo.nombre_corto="MOVEGR" AND clase.nombre_corto="BAJA" AND movimiento.almacen=' + req.params.id_almacen + ' GROUP BY detalle.producto) AS egr_bajas ON egr_bajas.producto=producto_base.id'

			var whre = ' WHERE producto_base.empresa=' + req.params.id_empresa + ' AND almacen.id = ' + req.params.id_almacen + ' AND movimiento.fecha < "' + fechaFinal + '" AND producto_base.activar_inventario = TRUE ORDER BY producto_base.codigo ASC'




			// si es enero no se debe recuperar saldo anterior solo inventarios iniciales
			if (a == 0 && b == 0 && i == f) {
				query += select1;
				query += from;
				query += inv_inicial_ing
				query += inv_inicial_egr
			} else {
				// recuperar todo
				query += select2;
				query += from;
				query += inv_inicial_ing
				query += inv_inicial_egr
				query += ing_saldo_ant
				query += egr_saldo_ant
			}
			query += ing_compras;
			query += ing_devoluciones;
			query += ing_traspaso;
			query += ing_ajustes;
			query += egr_ventas;
			query += egr_consumo;
			query += egr_traspaso;
			query += egr_trasp_almacen;
			query += egr_trasp_mant;
			query += egr_dotacion;
			query += egr_bajas;
			query += whre;

			sequelize.query(query, {
				type: sequelize.QueryTypes.SELECT
			})
				.then(registros => {
					res.json(registros)
				})

		});
	router.route('/detallesVentas-express/mesero/:mesero/liquidacion/:id_liquidacion')
		.get(ensureAuthorizedlogged, function (req, res) {
			DetalleVenta.findAll({
				include: [{
					model: DetalleComboVenta, as: 'detallesCombo', required: false,
					include: [{ model: Producto, as: 'producto' }]
				},
				{ model: Producto, as: 'producto' },
				{ model: ProductoPromocion, as: 'promocionActual' }, {
					model: Venta, as: 'venta',
					include: [{
						model: LiquidacionVentasMesa, as: 'liquidacion',
						where: { id: req.params.id_liquidacion }
					},
					{ model: Almacen, as: 'almacen' },
					{ model: MeseroVenta, as: 'mesero', where: { id: req.params.mesero } }]
				}]
			}).then(function (DetalleVentaEncontrada) {
				res.json({ detalles: DetalleVentaEncontrada });
			});
		})
	router.route('/ventas/mesas/mesero/:mesero/mesa/:mesa/user/:id_usuario')
		.get(ensureAuthorizedlogged, function (req, res) {
			DetalleVenta.findAll({
				include: [{ model: Producto, as: 'producto' }, { model: ProductoPromocion, as: 'promocionActual' }, {
					model: Venta, as: 'venta',
					where: { mesa: req.params.mesa, mesa_activa: true, usuario: req.params.id_usuario, activa: true },
					include: [{ model: Almacen, as: 'almacen' }, { model: MeseroVenta, as: 'mesero', where: { id: req.params.mesero } }]
				}]
			}).then(function (ventas) {
				res.json(ventas);
			});
		})
		.put(ensureAuthorizedlogged, function (req, res) {
			var id_sucursal = 0
			var venta = {}
			ventas = req.body.datosVentasMesas.reduce(function (val, x) {
				id_sucursal = x.venta.almacen.id_sucursal
				if (val.length > 0) {
					bandera = false
					for (var index = 0; index < val.length; index++) {
						var element = val[index];
						if (element == x.id_venta) {
							bandera = true
						}
					}
					if (!bandera) {
						var arreglo = { id_venta: x.id_venta, id_movimiento: x.venta.id_movimiento }
						val.push(arreglo)
					}
				} else {
					var arreglo = { id_venta: x.id_venta, id_movimiento: x.venta.id_movimiento, id_sucursal: x.venta.almacen.id_sucursal }
					val.push(arreglo)
				}
				return val
			}, [])
			sequelize.transaction(function (t) {
				return LiquidacionVentasMesa.create({
					id_usuario: req.params.id_usuario,
					fecha: req.body.fecha,
					total: req.body.total,
					visa: req.body.visa,
					pago_efectivo: req.body.pago_efectivo
				}, { transaction: t }).then(function (liquidacionCreada) {
					req.body.id_liquidacion = liquidacionCreada.id
					var promises = []
					if (req.body.movimiento.nombre_corto == Diccionario.EGRE_FACTURACION) {
						return SucursalActividadDosificacion.find({
							where: {
								id_actividad: req.body.actividad.id,
								id_sucursal: id_sucursal,
								expirado: false
							},
							transaction: t,
							include: [{ model: Dosificacion, as: 'dosificacion', include: [{ model: Clase, as: 'pieFactura' }] },
							{ model: Sucursal, as: 'sucursal', include: [{ model: Empresa, as: 'empresa' }] }]
						}).then(function (sucursalActividadDosificacion) {
							if (!sucursalActividadDosificacion.sucursal.activo) throw new Error('Sucursal ' + sucursalActividadDosificacion.sucursal.nombre + ' está deshabilitada, no se pueden hacer cambios.')
							var dosificacion = sucursalActividadDosificacion.dosificacion;
							venta.factura = dosificacion.correlativo;
							venta.pieFactura = dosificacion.pieFactura;
							venta.codigo_control = CodigoControl.obtenerCodigoControl(dosificacion.autorizacion.toString(),
								dosificacion.correlativo.toString(),
								req.body.cliente.nit.toString(),
								formatearFecha(req.body.fechaTexto).toString(),
								parseFloat(req.body.total).toFixed(2),
								dosificacion.llave_digital.toString());
							venta.autorizacion = dosificacion.autorizacion.toString();
							venta.fecha_limite_emision = dosificacion.fecha_limite_emision;
							return Dosificacion.update({
								correlativo: (venta.factura + 1)
							}, {
								where: { id: dosificacion.id },
								transaction: t
							}).then(function (disoficacionActualizada) {
								if (!req.body.cliente.id) {
									return Cliente.create({
										id_empresa: req.body.id_empresa,
										nit: req.body.cliente.nit,
										razon_social: req.body.cliente.razon_social
									}, { transaction: t }).then(function (clienteCreado) {
										var promises = []
										ventas.forEach(function (x, i, a) {
											promises.push(ActualizarVentaLiquidacion(venta, req, clienteCreado.id, liquidacionCreada, x, t));
										})
										return Promise.all(promises)
									}).catch(function (err) {
										return new Promise(function (fulfill, reject) {
											reject((err.stack !== undefined) ? err.stack : err);
										});
									});;
								} else {
									var promises = []
									ventas.forEach(function (x, i, a) {
										promises.push(ActualizarVentaLiquidacion(venta, req, req.body.cliente.id, liquidacionCreada, x, t));
									})
									return Promise.all(promises)
								}


							})
						}).catch(function (err) {
							return new Promise(function (fulfill, reject) {
								reject((err.stack !== undefined) ? err.stack : err);
							});
						});;
						//SI ES PROFORMA
					} else if (req.body.movimiento.nombre_corto == Diccionario.EGRE_PROFORMA) {
						req.body.actividad = {}
						return Sucursal.find({
							where: {
								id: id_sucursal
							},
							transaction: t,
							include: [{ model: Empresa, as: 'empresa' }]
						}).then(function (sucursal) {
							if (!sucursal.activo) throw new Error('Sucursal ' + sucursal.nombre + ' está deshabilitada, no se pueden hacer cambios.')
							venta.factura = sucursal.nota_venta_correlativo;
							venta.actividad = { id: null };
							return Sucursal.update({
								nota_venta_correlativo: venta.factura + 1

							}, { where: { id: id_sucursal }, transaction: t }).then(function (sucursalActualizada) {
								if (!req.body.cliente.id) {
									return Cliente.create({
										id_empresa: req.body.id_empresa,
										nit: req.body.cliente.nit,
										razon_social: req.body.cliente.razon_social
									}, { transaction: t }).then(function (clienteCreado) {
										var promises = []
										ventas.forEach(function (x, i, a) {
											promises.push(ActualizarVentaLiquidacion(venta, req, clienteCreado.id, liquidacionCreada, x, t));
										});
										return Promise.all(promises)
									}).catch(function (err) {
										return new Promise(function (fulfill, reject) {
											reject((err.stack !== undefined) ? err.stack : err);
										});
									});;
								} else {
									var promises = []
									ventas.forEach(function (x, i, a) {
										promises.push(ActualizarVentaLiquidacion(venta, req, req.body.cliente.id, liquidacionCreada, x, t));
									});
									return Promise.all(promises)
								}
							})
						}).catch(function (err) {
							return new Promise(function (fulfill, reject) {
								reject((err.stack !== undefined) ? err.stack : err);
							});
						});;
						//SI ES PREFACTURACION
					}
				}).catch(function (err) {
					return new Promise(function (fulfill, reject) {
						reject((err.stack !== undefined) ? err.stack : err);
					});
				});
			}).then(function (result) {
				DetalleVenta.findAll({
					include: [{ model: DetalleComboVenta, as: 'detallesCombo', required: false, include: [{ model: Producto, as: 'producto' }] }, { model: Producto, as: 'producto' }, { model: ProductoPromocion, as: 'promocionActual' }, {
						model: Venta, as: 'venta',
						include: [{ model: LiquidacionVentasMesa, as: 'liquidacion', where: { id: req.body.id_liquidacion } }, { model: Almacen, as: 'almacen' }, { model: MeseroVenta, as: 'mesero', where: { id: req.params.mesero } }]
					}]
				}).then(function (DetalleVentaEncontrada) {
					res.json({ mensaje: 'liquidación satisfactoriamente!', liquidacion: req.body, detalles: DetalleVentaEncontrada });
				})

			}).catch(function (err) {
				res.json({ hasError: true, message: err.stack });
			})
		})
	function ActualizarVentaLiquidacion(venta, req, idcliente, liquidacionCreada, x, t) {
		return Movimiento.update({
			id_clase: req.body.movimiento.id,
		}, { where: { id: x.id_movimiento }, transaction: t }).then(function (movimientoCreado) {
			return Venta.update({
				id_liquidacion: liquidacionCreada.id,
				mesa_activa: false,
				id_actividad: req.body.actividad.id,
				factura: venta.factura,
				autorizacion: venta.autorizacion,
				codigo_control: venta.codigo_control,
				fecha_limite_emision: venta.fecha_limite_emision,
				id_cliente: idcliente,
				observacion_traspaso: venta.observacion_traspaso || ''
			}, {
				where: { id: x.id_venta }, transaction: t
			}).then(function (actualizado) {
				return new Promise(function (fulfill, reject) {
					fulfill();
				});
			}).catch(function (err) {
				return new Promise(function (fulfill, reject) {
					reject((err.stack !== undefined) ? err.stack : err);
				});
			});

		}).catch(function (err) {
			return new Promise(function (fulfill, reject) {
				reject((err.stack !== undefined) ? err.stack : err);
			});
		});
	}
	// inventarios/empresa/:id_empresa/almacen/:id_almacen/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/cantidad/:cantidad/grupo/:id_grupo/user/:id_usuario/verEstado/:verEstado/subGrupo/:id_subgrupo
	router.route('/inventarios/reporte/:id_empresa/almacen/:id_almacen/busqueda/:texto_busqueda/grupo/:id_grupo/subGrupo/:id_subgrupo')
		.get(ensureAuthorizedlogged, function (req, res) {
			let conBusqueda = false
			let condicion =
				" where\
			inv_movimiento.almacen = :almacen \
			and agil_producto.empresa = :empresa "

			if (req.params.texto_busqueda !== '0') {
				condicion += "and agil_producto.nombre like concat(:busqueda,'%') "
				conBusqueda = true

			}
			condicion += "group by agil_producto.id"
			let query = "select \
			almacen,\
			codigo,\
			nombre,\
			unidad_medida,\
			precio_unitario,\
			descripcion,\
			inventario_minimo,\
			grupo,\
			subgrupo,\
			caracteristica_especial1,\
			caracteristica_especial2,\
			codigo_fabrica,\
			(costo_total/cantidad_actual) as costo_unitario,\
			costo_total,\
			cantidad_actual as cantidad,\
			ingress,\
			egrees,\
			costo_total,\
			costo_valuado as total_peps,\
			((ingresos_valuados - egresos_valuados) /cantidad_actual) as costo_unitario_peps, \
			ingresos_valuados, \
			egresos_valuados \
			from\
			(select\
			agil_almacen.nombre as almacen,\
			agil_producto.nombre,\
			agil_producto.codigo,\
			agil_producto.unidad_medida,\
			agil_producto.precio_unitario,\
			agil_producto.descripcion,\
			agil_producto.inventario_minimo,\
			clase_grupo.nombre as grupo,\
			clase_subgrupo.nombre as subgrupo,\
			agil_producto.caracteristica_especial1,\
			agil_producto.caracteristica_especial2,\
			agil_producto.codigo_fabrica,\
			sum(if(gl_tipo.nombre='MOVIMIENTO DE INGRESO',(inv_detalle_movimiento.importe),0)) as ingress,\
			sum(if(gl_tipo.nombre='MOVIMIENTO DE EGRESO',(inv_detalle_movimiento.costo_unitario*inv_detalle_movimiento.cantidad),0)) as egrees,\
			sum(if(gl_tipo.nombre='MOVIMIENTO DE INGRESO',inv_detalle_movimiento.importe,0) - if(gl_tipo.nombre='MOVIMIENTO DE EGRESO',(inv_detalle_movimiento.costo_unitario*inv_detalle_movimiento.cantidad),0)) as costo_total, \
			sum(if(gl_tipo.nombre='MOVIMIENTO DE INGRESO',inv_detalle_movimiento.cantidad,0)- if(gl_tipo.nombre='MOVIMIENTO DE EGRESO',inv_detalle_movimiento.cantidad,0)) as cantidad_actual, \
			sum(if(gl_tipo.nombre='MOVIMIENTO DE INGRESO',(IFNULL(inv_inventario.costo_unitario_neto, inv_detalle_movimiento.costo_unitario)*inv_detalle_movimiento.cantidad),0) - if(gl_tipo.nombre='MOVIMIENTO DE EGRESO',(IFNULL(inv_inventario.costo_unitario_neto, inv_detalle_movimiento.costo_unitario)*inv_detalle_movimiento.cantidad),0)) as costo_valuado, \
			sum(if(gl_tipo.nombre='MOVIMIENTO DE INGRESO',(IFNULL(inv_inventario.costo_unitario_neto, inv_detalle_movimiento.costo_unitario)*inv_detalle_movimiento.cantidad),0)) as ingresos_valuados, \
			sum(if(gl_tipo.nombre='MOVIMIENTO DE EGRESO',(IFNULL(inv_inventario.costo_unitario_neto, inv_detalle_movimiento.costo_unitario)*inv_detalle_movimiento.cantidad),0)) as egresos_valuados \
			from\
			inv_detalle_movimiento\
			inner join inv_inventario on inv_detalle_movimiento.inventario=inv_inventario.id\
			inner join agil_producto on inv_detalle_movimiento.producto=agil_producto.id\
			inner join gl_clase as clase_grupo on agil_producto.grupo = clase_grupo.id "+ (req.params.id_grupo !== '0' ? "and clase_grupo.id= " + parseInt(req.params.id_grupo) : "") + " \
			inner join gl_clase as clase_subgrupo on agil_producto.subgrupo = clase_subgrupo.id "+ (req.params.id_subgrupo !== '0' ? "and clase_subgrupo.id= " + parseInt(req.params.id_subgrupo) : "") + " \
			inner join inv_movimiento on inv_movimiento.id = inv_detalle_movimiento.movimiento\
			inner join gl_clase on gl_clase.id = inv_movimiento.clase\
			inner join agil_almacen on agil_almacen.id = inv_movimiento.almacen\
			inner join gl_tipo on inv_movimiento.tipo = gl_tipo.id" + condicion + ") movimiento"
			if (conBusqueda) {
				sequelize.query(query, { replacements: { almacen: parseInt(req.params.id_almacen), empresa: parseInt(req.params.id_empresa), busqueda: req.params.texto_busqueda }, type: sequelize.QueryTypes.SELECT }).then((result) => {
					res.json({ reporte: result })
				}).catch(err => {
					res.json({ hasErr: true, mensaje: 'No se puedo generar el reporte.' })
				})
			} else {
				sequelize.query(query, { replacements: { almacen: parseInt(req.params.id_almacen), empresa: parseInt(req.params.id_empresa) }, type: sequelize.QueryTypes.SELECT }).then((result) => {
					res.json({ reporte: result })
				}).catch(err => {
					res.json({ hasErr: true, mensaje: 'No se puedo generar el reporte.' })
				})
			}
		});
	router.route('/ventas/mail/:token')
		.get(function (req, res) {
			var decodeInfo = jwt.decode(req.params.token, Diccionario.ClaveSuperSecreta);
			req.params.id = decodeInfo.venta.id
			req.params.id_empresa = decodeInfo.empresa
			Sucursal.findAll({
				where: {
					id_empresa: req.params.id_empresa,
					numero: 0
				}
			}).then(function (sucursalPrincipalEncontrada) {
				Venta.find({
					where: {
						id: req.params.id
					},
					include: [{ model: Cliente, as: 'cliente' }, { model: Usuario, as: 'usuario', attributes: ['nombre_usuario'], include: [{ model: Empresa, as: 'empresa', attributes: ['imagen', 'nit', 'direccion', 'razon_social'] }] },
					{
						model: DetalleVenta, as: 'detallesVenta',
						include: [{ model: Producto, as: 'producto' }, { model: ServicioVenta, as: 'servicio' },
						{ model: Inventario, as: 'inventario' }]
					}, { model: Sucursal, as: 'sucursal' }, { model: Clase, as: 'movimientoServicio' },
					{ model: Almacen, as: 'almacen', include: [{ model: Sucursal, as: 'sucursal' }] },
					{ model: Almacen, as: 'almacenTraspaso', include: [{ model: Sucursal, as: 'sucursal' }], required: false },
					{ model: Clase, as: 'actividad' },
					{ model: Clase, as: 'tipoPago' },
					{ model: Movimiento, as: 'movimiento', include: [{ model: Clase, as: 'clase' }] }]
				}).then(function (venta) {
					if (venta.sucursal) {
						venta.numero_literal = NumeroLiteral.Convertir(parseFloat(venta.total).toFixed(2).toString());
					} else {
						venta.sucursal = venta.almacen.sucursal;
						if (venta.movimiento.clase.nombre_corto == Diccionario.EGRE_FACTURACION ||
							venta.movimiento.clase.nombre_corto == Diccionario.EGRE_PROFORMA) {
							venta.numero_literal = NumeroLiteral.Convertir(parseFloat(venta.total).toFixed(2).toString());
							venta.numero_literal_dolares = NumeroLiteral.Convertir(parseFloat(venta.total_dolares).toFixed(2).toString(), 'Dolares');
						}
					}
					ConfiguracionGeneralFactura.find({
						where: {
							id_empresa: req.params.id_empresa
						},
						include: [{ model: Clase, as: 'impresionFactura' },
						{ model: Clase, as: 'tipoFacturacion' },
						{ model: Clase, as: 'tamanoPapelFactura' },
						{ model: Clase, as: 'tituloFactura' },
						{ model: Clase, as: 'subtituloFactura' },
						{ model: Clase, as: 'pieFactura' },
						{ model: Clase, as: 'tamanoPapelNotaVenta' },
						{ model: Clase, as: 'tamanoPapelFacturaServicio' },
						{ model: Clase, as: 'tamanoPapelNotaTraspaso' },
						{ model: Clase, as: 'tamanoPapelNotaBaja' },
						{ model: Clase, as: 'tamanoPapelNotaPedido' },
						{ model: Clase, as: 'tamanoPapelCierreCaja' },
						{ model: Clase, as: 'formatoPapelFactura' },
						{ model: Clase, as: 'formatoColorFactura' },
						{ model: Clase, as: 'formatoConFirmaFactura' },
						{ model: Clase, as: 'formatoPapelFacturaServicio' },
						{ model: Clase, as: 'formatoColorFacturaServicio' },
						{ model: Clase, as: 'tipoConfiguracion' },
						{ model: Clase, as: 'formatoPapelNotaVenta' },
						{ model: Clase, as: 'formatoColorNotaVenta' },
						{ model: Clase, as: 'tipoConfiguracionNotaVenta' },
						{ model: Clase, as: 'formatoConFirmaNotaVenta' },
						{ model: Clase, as: 'formatoPapelNotaTraspaso' },
						{ model: Clase, as: 'formatoColorNotaTraspaso' },
						{ model: Clase, as: 'tipoConfiguracionNotaTraspaso' },
						{ model: Clase, as: 'formatoPapelNotaBaja' },
						{ model: Clase, as: 'formatoColorNotaBaja' },
						{ model: Clase, as: 'tipoConfiguracionNotaBaja' }]
					}).then(function (configuracionGeneralFactura) {
						if (venta.movimiento) {
							if (venta.movimiento.clase.nombre_corto == Diccionario.EGRE_FACTURACION) {
								SucursalActividadDosificacion.find({
									where: {
										id_actividad: venta.actividad.id,
										id_sucursal: venta.sucursal.id,
										expirado: false
									},
									include: [{ model: Dosificacion, as: 'dosificacion', include: [{ model: Clase, as: 'pieFactura' }] }]
								}).then(function (sucursalActividadDosificacion) {
									var dosificacion = sucursalActividadDosificacion.dosificacion;
									if (configuracionGeneralFactura.usar) {
										res.json({
											sucursalPrincipal: sucursalPrincipalEncontrada, venta: venta, configuracion: configuracionGeneralFactura, sucursal: venta.sucursal,
											numero_literal: venta.numero_literal, pieFactura: dosificacion.pieFactura, sucursalDestino: ((venta.almacenTraspaso) ? venta.almacenTraspaso.sucursal : null)
										});
									} else {
										ConfiguracionFactura.find({
											where: {
												id_sucursal: venta.sucursal.id
											},
											include: [{ model: Clase, as: 'impresionFactura' },
											{ model: Clase, as: 'tipoFacturacion' },
											{ model: Clase, as: 'tamanoPapelFactura' },
											{ model: Clase, as: 'tituloFactura' },
											{ model: Clase, as: 'subtituloFactura' },
											{ model: Clase, as: 'tamanoPapelNotaVenta' },

											{ model: Clase, as: 'tamanoPapelFacturaServicio' },
											{ model: Clase, as: 'tamanoPapelNotaTraspaso' },
											{ model: Clase, as: 'tamanoPapelNotaBaja' },
											{ model: Clase, as: 'tamanoPapelNotaPedido' },
											{ model: Clase, as: 'tamanoPapelCierreCaja' },
											{ model: Clase, as: 'formatoPapelFactura' },
											{ model: Clase, as: 'formatoColorFactura' },
											{ model: Clase, as: 'formatoConFirmaFactura' },
											{ model: Clase, as: 'formatoPapelFacturaServicio' },
											{ model: Clase, as: 'formatoColorFacturaServicio' },
											{ model: Clase, as: 'tipoConfiguracion' },
											{ model: Clase, as: 'formatoPapelNotaVenta' },
											{ model: Clase, as: 'formatoColorNotaVenta' },
											{ model: Clase, as: 'tipoConfiguracionNotaVenta' },
											{ model: Clase, as: 'formatoConFirmaNotaVenta' },
											{ model: Clase, as: 'formatoPapelNotaTraspaso' },
											{ model: Clase, as: 'formatoColorNotaTraspaso' },
											{ model: Clase, as: 'tipoConfiguracionNotaTraspaso' },
											{ model: Clase, as: 'formatoPapelNotaBaja' },
											{ model: Clase, as: 'formatoColorNotaBaja' },
											{ model: Clase, as: 'tipoConfiguracionNotaBaja' }]
										}).then(function (configuracionFactura) {
											res.json({
												sucursalPrincipal: sucursalPrincipalEncontrada,
												venta: venta,
												configuracion: configuracionFactura,
												sucursal: venta.sucursal,
												numero_literal: venta.numero_literal,
												pieFactura: dosificacion.pieFactura, sucursalDestino: ((venta.almacenTraspaso) ? venta.almacenTraspaso.sucursal : null)
											});
										}).catch(function (err) {
											res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
										});
									}
								}).catch(function (err) {
									res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
								});
							} else {
								if (configuracionGeneralFactura.usar) {
									res.json({
										sucursalPrincipal: sucursalPrincipalEncontrada,
										venta: venta, configuracion: configuracionGeneralFactura, sucursal: venta.sucursal,
										numero_literal: venta.numero_literal, sucursalDestino: ((venta.almacenTraspaso) ? venta.almacenTraspaso.sucursal : null)
									});
								} else {
									ConfiguracionFactura.find({
										where: {
											id_sucursal: venta.sucursal.id
										},
										include: [{ model: Clase, as: 'impresionFactura' },
										{ model: Clase, as: 'tipoFacturacion' },
										{ model: Clase, as: 'tamanoPapelFactura' },
										{ model: Clase, as: 'tituloFactura' },
										{ model: Clase, as: 'subtituloFactura' },
										{ model: Clase, as: 'tamanoPapelNotaVenta' }]
									}).then(function (configuracionFactura) {
										res.json({
											sucursalPrincipal: sucursalPrincipalEncontrada,
											venta: venta,
											configuracion: configuracionFactura,
											sucursal: venta.sucursal,
											numero_literal: venta.numero_literal, sucursalDestino: ((venta.almacenTraspaso) ? venta.almacenTraspaso.sucursal : null)
										});
									}).catch(function (err) {
										res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
									});
								}
							}
						} else {
							SucursalActividadDosificacion.find({
								where: {
									id_actividad: venta.actividad.id,
									id_sucursal: venta.sucursal.id,
									expirado: false
								},
								include: [{ model: Dosificacion, as: 'dosificacion', include: [{ model: Clase, as: 'pieFactura' }] }]
							}).then(function (sucursalActividadDosificacion) {
								var dosificacion = sucursalActividadDosificacion.dosificacion;
								if (configuracionGeneralFactura.usar) {
									res.json({
										sucursalPrincipal: sucursalPrincipalEncontrada,
										venta: venta, configuracion: configuracionGeneralFactura, sucursal: venta.sucursal,
										numero_literal: venta.numero_literal, pieFactura: dosificacion.pieFactura, sucursalDestino: ((venta.almacenTraspaso) ? venta.almacenTraspaso.sucursal : null)
									});
								} else {
									ConfiguracionFactura.find({
										where: {
											id_sucursal: venta.sucursal.id
										},
										include: [{ model: Clase, as: 'impresionFactura' },
										{ model: Clase, as: 'tipoFacturacion' },
										{ model: Clase, as: 'tamanoPapelFactura' },
										{ model: Clase, as: 'tituloFactura' },
										{ model: Clase, as: 'subtituloFactura' },
										{ model: Clase, as: 'tamanoPapelNotaVenta' },

										{ model: Clase, as: 'tamanoPapelFacturaServicio' },
										{ model: Clase, as: 'tamanoPapelNotaTraspaso' },
										{ model: Clase, as: 'tamanoPapelNotaBaja' },
										{ model: Clase, as: 'tamanoPapelNotaPedido' },
										{ model: Clase, as: 'tamanoPapelCierreCaja' },
										{ model: Clase, as: 'formatoPapelFactura' },
										{ model: Clase, as: 'formatoColorFactura' },
										{ model: Clase, as: 'formatoConFirmaFactura' },
										{ model: Clase, as: 'formatoPapelFacturaServicio' },
										{ model: Clase, as: 'formatoColorFacturaServicio' },
										{ model: Clase, as: 'tipoConfiguracion' },
										{ model: Clase, as: 'formatoPapelNotaVenta' },
										{ model: Clase, as: 'formatoColorNotaVenta' },
										{ model: Clase, as: 'tipoConfiguracionNotaVenta' },
										{ model: Clase, as: 'formatoConFirmaNotaVenta' },
										{ model: Clase, as: 'formatoPapelNotaTraspaso' },
										{ model: Clase, as: 'formatoColorNotaTraspaso' },
										{ model: Clase, as: 'tipoConfiguracionNotaTraspaso' },
										{ model: Clase, as: 'formatoPapelNotaBaja' },
										{ model: Clase, as: 'formatoColorNotaBaja' },
										{ model: Clase, as: 'tipoConfiguracionNotaBaja' }]
									}).then(function (configuracionFactura) {
										res.json({
											sucursalPrincipal: sucursalPrincipalEncontrada,
											venta: venta,
											configuracion: configuracionFactura,
											sucursal: venta.sucursal,
											numero_literal: venta.numero_literal,
											pieFactura: dosificacion.pieFactura, sucursalDestino: ((venta.almacenTraspaso) ? venta.almacenTraspaso.sucursal : null)
										});
									}).catch(function (err) {
										res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
									});
								}
							}).catch(function (err) {
								res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
							});
						}
					}).catch(function (err) {
						res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
					});
				}).catch(function (err) {
					res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
				});
			}).catch(function (err) {
				res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
			});
		})
	router.route('/reporte/precios/compra/:id_empresa')
		.get(ensureAuthorizedlogged, async (req, res) => {
			try {
				const productos = await Producto.findAll({
					where: { id_empresa: req.params.id_empresa },
					attributes: ['id', 'nombre', 'codigo', 'unidad_medida'],
					include: [
						{
							model: Clase, as: 'grupo', attributes: ['nombre']
						},
						{
							model: Clase, as: 'subgrupo', attributes: ['nombre']
						}
					],
					order: [['nombre', 'asc']]
				})
				for (let index = 0; index < productos.length; index++) {
					productos[index].dataValues.movimientos = await DetalleMovimiento.findAll({
						where: {
							id_producto: productos[index].id
						},
						attributes: ['costo_unitario', 'createdAt'],
						order: [['createdAt', 'desc']],
						limit: 3
					})
				}
				const reporte = [
					[
						"Código",
						"Descripción",
						"Unidad",
						"Grupo",
						"Sub-grupoO",
						"Último precio de compra",
						"Promedio últimos 3 precios"
					]
				];
				for (let index = 0; index < productos.length; index++) {
					const column = [];
					column.push(productos[index].codigo); //Código
					column.push(productos[index].nombre); //Detalle
					column.push(productos[index].unidad); //Unidad
					const grupo = productos[index].grupo && productos[index].grupo.nombre && productos[index].grupo.nombre || '';
					column.push(grupo); //Grupo
					const subgrupo = productos[index].subgrupo && productos[index].subgrupo.nombre && productos[index].subgrupo.nombre || '';
					column.push(subgrupo); //Sub grupo
					const ultimo_costo = productos[index].dataValues.movimientos && productos[index].dataValues.movimientos[0] && productos[index].dataValues.movimientos[0].costo_unitario || 0;
					column.push(ultimo_costo.toFixed(2)); //Último precio
					const promedio = ultimo_costo && (productos[index].dataValues.movimientos.reduce((total, siguiente) => { return (total + siguiente.costo_unitario) }, 0) / productos[index].dataValues.movimientos.length);
					column.push(promedio.toFixed(2)); //Promedio
					reporte.push(column)
				}
				res.json({ reporte: reporte });
			} catch (err) {
				res.json({ mensaje: err.stack, hasErr: true })
			}

		});

	router.route('/devolucion-producto-venta/:id_detalle')
		.post(ensureAuthorizedlogged, function (req, res) {
			Sucursal.find({
				where: { id: req.body.id_sucursal }
			}).then(function (sucursalEncontrada) {
				DetalleVentaProductoDevolucion.create({
					id_detalle_venta: req.params.id_detalle,
					fecha: req.body.fecha,
					entrega: req.body.entrega,
					recibe: req.body.recibe,
					observaciones: req.body.observaciones,
					numero_documento: sucursalEncontrada.numero_correlativo_devolucion_item
				}).then(function (devolucionItem) {
					Sucursal.update({
						numero_correlativo_devolucion_item: sucursalEncontrada.numero_correlativo_devolucion_item + 1
					}, {
						where: { id: req.body.id_sucursal }
					}).then(function (sucursalActualizada) {
						res.json({ mensaje: "Guardado satisfactoriamente!", devolucionItem: devolucionItem })
					})
				})
			})
		})

	router.route('/almacenes/sucursales')
		.post(ensureAuthorizedlogged, function (req, res) {
			Almacen.findAll({
				where: { id_sucursal: { $in: req.body.sucursales } },
				include: [{ model: Sucursal, as: 'sucursal' }]
			}).then(function (almacenes) {
				res.json({ almacenes: almacenes })
			}).catch((err) => {
				res.json({ hasErr: true, mensaje: err.stack })
			})
		})

	router.route('/reposicion-producto-venta/:id_detalle')
		.post(ensureAuthorizedlogged, function (req, res) {
			Sucursal.find({
				where: { id: req.body.id_sucursal }
			}).then(function (sucursalEncontrada) {
				if (!sucursalEncontrada.activo) return res.json({ mensaje: 'Sucursal deshabilitada, no se pueden hacer cambios.', hasError: true, hasErr: true })
				if (req.body.tipo_reposicion.nombre_corto == "FABRICANTE") {
					DetalleVentaProductoReposicion.create({
						id_detalle_venta: req.params.id_detalle,
						fecha: req.body.fecha,
						entrega: req.body.entrega,
						recibe: req.body.recibe,
						numero_serie: req.body.numero_serie,
						observaciones: req.body.observaciones,
						numero_documento: sucursalEncontrada.numero_correlativo_reposicion_item,
						tipo_reposicion: req.body.tipo_reposicion.id
					}).then(function (reposicionItem) {
						Sucursal.update({
							numero_correlativo_reposicion_item: sucursalEncontrada.numero_correlativo_reposicion_item + 1
						}, {
							where: { id: req.body.id_sucursal }
						}).then(function (sucursalActualizada) {
							res.json({ mensaje: "Guardado satisfactoriamente!", reposicionItem: reposicionItem })
						})
					})
				} else if (req.body.tipo_reposicion.nombre_corto == "CAMBIO_ITEM") {
					DetalleVenta.create({
						id_venta: req.body.detalleVentaNuevo.venta,
						id_producto: req.body.detalleVentaNuevo.producto.id,
						precio_unitario: req.body.detalleVentaNuevo.precio_unitario,
						precio_unitario_dolares: req.body.detalleVentaNuevo.precio_unitario_dolares,
						cantidad: req.body.detalleVentaNuevo.cantidad,
						importe: req.body.detalleVentaNuevo.importe ? req.body.detalleVentaNuevo.importe : 0,
						importe_dolares: req.body.detalleVentaNuevo.importe_dolares ? req.body.detalleVentaNuevo.importe_dolares : 0,
						descuento: req.body.detalleVentaNuevo.descuento,
						recargo: req.body.detalleVentaNuevo.recargo,
						ice: req.body.detalleVentaNuevo.ice,
						excento: req.body.detalleVentaNuevo.excento,
						descuento_dolares: req.body.detalleVentaNuevo.descuento_dolares,
						recargo_dolares: req.body.detalleVentaNuevo.recargo_dolares,
						ice_dolares: req.body.detalleVentaNuevo.ice_dolares,
						excento_dolares: req.body.detalleVentaNuevo.excento_dolares,
						tipo_descuento: req.body.detalleVentaNuevo.tipo_descuento,
						tipo_recargo: req.body.detalleVentaNuevo.tipo_recargo,
						total: req.body.detalleVentaNuevo.total ? req.body.detalleVentaNuevo.total : 0,
						total_dolares: req.body.detalleVentaNuevo.total_dolares ? req.body.detalleVentaNuevo.total_dolares : 0,
						fecha_vencimiento: req.body.detalleVentaNuevo.inventario.fecha_vencimiento,
						lote: req.body.detalleVentaNuevo.inventario.lote,
						id_inventario: req.body.detalleVentaNuevo.inventario ? req.body.detalleVentaNuevo.inventario.id : null,
						observaciones: req.body.detalleVentaNuevo.observaciones,
						cambio_item: true
					}).then(function (detalleVentaCreada) {
						DetalleMovimiento.create({
							id_movimiento: req.body.detalleVentaNuevo.id_movimiento,
							id_producto: req.body.detalleVentaNuevo.producto.id,
							cantidad: req.body.detalleVentaNuevo.cantidad,
							costo_unitario: req.body.detalleVentaNuevo.inventario.costo_unitario ? req.body.detalleVentaNuevo.inventario.costo_unitario : 0,
							costo_unitario_dolares: req.body.detalleVentaNuevo.inventario.costo_unitario_dolares ? req.body.detalleVentaNuevo.inventario.costo_unitario_dolares : 0,
							importe: (req.body.detalleVentaNuevo.cantidad * (req.body.detalleVentaNuevo.inventario.costo_unitario ? req.body.detalleVentaNuevo.inventario.costo_unitario : 0)),
							importe_dolares: (req.body.detalleVentaNuevo.cantidad * (req.body.detalleVentaNuevo.inventario.costo_unitario_dolares ? req.body.detalleVentaNuevo.inventario.costo_unitario_dolares : 0)),
							total: (req.body.detalleVentaNuevo.cantidad * (req.body.detalleVentaNuevo.inventario.costo_unitario ? req.body.detalleVentaNuevo.inventario.costo_unitario : 0)),
							total_dolares: (req.body.detalleVentaNuevo.cantidad * (req.body.detalleVentaNuevo.inventario.costo_unitario_dolares ? req.body.detalleVentaNuevo.inventario.costo_unitario_dolares : 0)),
							descuento: req.body.detalleVentaNuevo.descuento,
							recargo: req.body.detalleVentaNuevo.recargo,
							ice: req.body.detalleVentaNuevo.ice,
							excento: req.body.detalleVentaNuevo.excento,
							descuento_dolares: req.body.detalleVentaNuevo.descuento_dolares,
							recargo_dolares: req.body.detalleVentaNuevo.recargo_dolares,
							ice_dolares: req.body.detalleVentaNuevo.ice_dolares,
							excento_dolares: req.body.detalleVentaNuevo.excento_dolares,
							tipo_descuento: req.body.detalleVentaNuevo.tipo_descuento,
							tipo_recargo: req.body.detalleVentaNuevo.tipo_recargo,
							fecha_vencimiento: req.body.detalleVentaNuevo.inventario.fecha_vencimiento,
							lote: req.body.detalleVentaNuevo.inventario.lote,
							id_inventario: req.body.detalleVentaNuevo.inventario.id
						}).then(function (detalleMovimientoCreado) {
							Inventario.update(
								{
									cantidad: sequelize.literal('cantidad - ' + req.body.detalleVentaNuevo.cantidad)
								}, {
								where: {
									id: req.body.detalleVentaNuevo.inventario.id
								}
							}).then(function (InventarioActualizado) {
								Venta.update({
									importe: sequelize.literal('importe + ' + req.body.detalleVentaNuevo.importe),
									total: sequelize.literal('total + ' + req.body.detalleVentaNuevo.total),
									importe_dolares: sequelize.literal('importe_dolares + ' + req.body.detalleVentaNuevo.importe_dolares),
									total_dolares: sequelize.literal('total_dolares + ' + req.body.detalleVentaNuevo.total_dolares),
								}, {
									where: { id: req.body.detalleVentaNuevo.venta }
								}).then(function (ven) {
									DetalleVentaProductoReposicion.create({
										id_detalle_venta: req.params.id_detalle,
										fecha: req.body.fecha,
										entrega: req.body.entrega,
										recibe: req.body.recibe,
										id_producto_cambio: detalleVentaCreada.id,
										precio_venta: req.body.precio_venta,
										monto_faltante: req.body.monto_faltante,
										observaciones: req.body.observaciones,
										numero_documento: sucursalEncontrada.numero_correlativo_reposicion_item,
										tipo_reposicion: req.body.tipo_reposicion.id
									}).then(function (reposicionItem) {
										Sucursal.update({
											numero_correlativo_reposicion_item: sucursalEncontrada.numero_correlativo_reposicion_item + 1
										}, {
											where: { id: req.body.id_sucursal }
										}).then(function (sucursalActualizada) {
											res.json({ mensaje: "Guardado satisfactoriamente!", reposicionItem: reposicionItem })
										})
									})
								});
							})
						})
					})
				} else {
					DetalleVentaProductoReposicion.create({
						id_detalle_venta: req.params.id_detalle,
						fecha: req.body.fecha,
						entrega: req.body.entrega,
						recibe: req.body.recibe,
						monto: req.body.monto,
						observaciones: req.body.observaciones,
						numero_documento: sucursalEncontrada.numero_correlativo_reposicion_item,
						tipo_reposicion: req.body.tipo_reposicion.id
					}).then(function (reposicionItem) {
						Sucursal.update({
							numero_correlativo_reposicion_item: sucursalEncontrada.numero_correlativo_reposicion_item + 1
						}, {
							where: { id: req.body.id_sucursal }
						}).then(function (sucursalActualizada) {
							res.json({ mensaje: "Guardado satisfactoriamente!", reposicionItem: reposicionItem })
						})
					})
				}
			})
		})


	router.route('/modificar-libro-compra/:id_compra')
		.put(ensureAuthorizedlogged, function (req, res) {
			var compra = req.body;
			Compra.find({
				where: {
					id: req.params.id_compra
				},
				include: [{
					model: Almacen, as: 'almacen',
					include: [{
						model: Sucursal, as: 'sucursal'
					}]
				}]
			}).then((compraenc) => {
				if (!compraenc.almacen.sucursal.activo) return res.json({ mensaje: 'Sucursal ' + compraenc.almacen.sucursal.nombre + ' está deshabilitada, no se pueden hacer cambios.' })
				Compra.update({
					id_proveedor: compra.proveedor.id,
					factura: compra.factura,
					autorizacion: compra.autorizacion,
					fecha: compra.fecha,
					codigo_control: compra.codigo_control,
					observacion: compra.observacion,
				}, {
					where: {
						id: req.params.id_compra
					}
				}).then(function (compraActualizada) {
					res.json({ mensaje: "Compra actualizada satisfactoriamente!" });
				})
			}).catch((err) => {
				res.json({ mensaje: err.stack, hasErr: true, hasError: true, message: err.stack })
			})
		})
	router.route('/cerrar-traspaso-venta/:id_venta/:id_almacen')
		.post(ensureAuthorizedlogged, function (req, res) {
			Venta.find({
				where: {
					id: req.params.id_venta
				},
				include: [
					{ model: GestionOrdenReposicion, as: 'ordenReposicion' },
					{ model: MeseroVenta, as: 'mesero', include: [{ model: Persona, as: 'persona' }] },
					{ model: Cliente, as: 'cliente' },
					{
						model: DetalleVenta, as: 'detallesVenta',
						include: [{ model: DetalleComboVenta, as: 'detallesCombo', required: false, include: [{ model: Producto, as: 'producto' }] }, { model: Inventario, as: 'inventario' }, { model: ProductoPromocion, as: 'promocionActual' }, { model: ProductoPromocionPuntaje, as: 'promocionActualPuntaje' }, { model: ServicioVenta, as: 'servicio' },
						{ model: DetalleVentaProductoFinal, as: 'detallesVentaProductoFinal', required: false, include: [{ model: DetalleMovimiento, as: 'detalleMovimiento' }] },
						{ model: DetalleVentaProductoDevolucion, as: 'detallesVentaProductoDevolucion', required: false },
						{
							model: DetalleVentaProductoReposicion, as: 'detallesVentaProductoReposicion', required: false,
							include: [
								{ model: Clase, as: 'tipoReposicion' },
								{
									model: DetalleVenta, as: 'producto_venta', required: false,
									include: [{ model: Producto, as: 'producto' }]
								}
							]
						},
						{
							model: Producto, as: 'producto', include: [
								{ model: Clase, as: 'tipoProducto' },
								{ model: Inventario, as: 'inventarios', required: false, where: { id_almacen: req.params.id_almacen, cantidad: { $gte: 0 } } },
								{
									model: ProductoBase, as: 'productosBase', required: false,
									include: [{
										model: Producto, as: 'productoBase', required: false,
										include: [{ model: Inventario, as: 'inventarios', required: false, where: { id_almacen: req.params.id_almacen, cantidad: { $gte: 0 } } },
										{ model: Clase, as: 'tipoProducto' },
										{
											model: ProductoBase, as: 'productosBase', required: false,
											include: [{
												model: Producto, as: 'productoBase', required: false,
												include: [{ model: Inventario, as: 'inventarios', required: false, where: { id_almacen: req.params.id_almacen, cantidad: { $gte: 0 } } },
												{ model: Clase, as: 'tipoProducto' }]
											}]
										}]
									}]
								}
							]
						}]
					},
					{ model: Sucursal, as: 'sucursal' }, { model: Clase, as: 'movimientoServicio' },
					{ model: Almacen, as: 'almacen', include: [{ model: Sucursal, as: 'sucursal' }] },
					{ model: Almacen, as: 'almacenTraspaso', include: [{ model: Sucursal, as: 'sucursal' }], required: false },
					{ model: Clase, as: 'actividad' },
					{ model: Clase, as: 'tipoPago' },
					{ model: Movimiento, as: 'movimiento', include: [{ model: Clase, as: 'clase' }] }],
				order: [[{ model: DetalleVenta, as: 'detallesVenta' }, 'id', 'ASC']]
			}).then(function (venta) {
				if (!venta.sucursal.activo) return res.json({ mensaje: 'Sucursal ' + venta.sucursal.nombre + ' está deshabilitada, no se pueden hacer cambios.', hasError: true, hasErr: true, message: 'Sucursal ' + venta.sucursal.nombre + ' está deshabilitada, no se pueden hacer cambios.' })
				// validando inventarios disponibles antes de guardar ==============
				let detallesNoValidos = ["<span style='color:#dd3333'>No cuenta con la cantidad de inventarios disponibles</span><br/>"];
				venta.detallesVenta.forEach(function (detalleVenta, index, array) {
					detalleVenta.costos = []
					detalleVenta.costos = detalleVenta.producto.inventarios.reduce((val, x) => {
						if (x.cantidad > 0) {
							val.push(x)
						}
						return val
					}, [])
					if (detalleVenta.producto.activar_inventario) {
						Inventario.findAll({
							where: { id_producto: detalleVenta.producto.id, id_almacen: venta.almacen.id, cantidad: { $gt: 0 } },
							attributes: [[sequelize.fn('sum', sequelize.col('cantidad')), 'cantidadTotal']],
							group: ["`inv_inventario`.`producto`"],
							raw: true
						}).then(function (inventarios) {
							var sumaTotalInventarios = inventarios.length > 0 ? inventarios[0].cantidadTotal : 0;
							if (detalleVenta.cantidad > sumaTotalInventarios) {
								detallesNoValidos.push("<span style='font-size: 12px;'>" + detalleVenta.producto.nombre + "</span><span style='font-size: 12px;color:#FF892A'> solicitada: " + detalleVenta.cantidad + "</span><span style='font-size: 12px;color:#dd3333'> disponible: " + sumaTotalInventarios + "</span><br/>");
							}

							if (index === (array.length - 1)) {
								if (detallesNoValidos.length == 1) {
									generarMovimientoTraspaso(req, res, venta);
								} else {
									res.json({ hasError: true, message: "", detalles: detallesNoValidos });
								}
							}
						});
					} else {
						if (index === (array.length - 1)) {
							generarMovimientoTraspaso(req, res, venta);
						}
					}

				})
			})
		});
	function generarMovimientoTraspaso(req, res, venta) {
		sequelize.transaction((t) => {
			return Venta.update({
				confirmar_traspaso: true
			}, { where: { id: venta.id }, transaction: t }).then(function (ventaActualizada) {
				return Tipo.find({
					where: { nombre_corto: Diccionario.MOV_ING },
					transaction: t
				}).then(function (tipoMovimiento) {
					return Clase.find({
						where: { nombre_corto: Diccionario.ING_TRASPASO },
						transaction: t
					}).then(function (conceptoMovimiento) {
						return Movimiento.create({
							id_tipo: tipoMovimiento.id,
							id_clase: conceptoMovimiento.id,
							id_almacen: venta.almacenTraspaso.id,
							fecha: venta.fecha
						}, { transaction: t }).then(function (movimientoIngresoCreado) {
							let promises = []
							venta.detallesVenta.forEach(function (detalleVenta, index, array) {
								promises.push(calcularCostosIngresos(detalleVenta, movimientoIngresoCreado, venta.almacenTraspaso.id, venta, t));
								promises.push(verificarTipoProductoDetalleVenta(detalleVenta, detalleVenta.producto, detalleVenta.cantidad, venta.movimiento, index, array, res, venta, t, detalleVenta))
							});
							return Promise.all(promises)
						}).catch(function (err) {
							return new Promise(function (fulfill, reject) {
								reject(err);
							});
						});
					}).catch(function (err) {
						return new Promise(function (fulfill, reject) {
							reject(err);
						});
					});
				}).catch(function (err) {
					return new Promise(function (fulfill, reject) {
						reject(err);
					});
				});
			}).catch(function (err) {
				return new Promise(function (fulfill, reject) {
					reject(err);
				});
			});
		}).then((result) => {
			res.json({ actualizados: result.length });
		}).catch((err) => {
			res.json({ hasErr: true, mensaje: err.stack })
		})
	}

	router.route('/traspasos-campamento/fecha/:fecha/sincronizar/:sincronizar')
		.post(ensureAuthorizedlogged, async function (req, res) {
			try {
				if (req.params.sincronizar == 'true') {
					await Venta.update({
						campamento_sincronizado: req.params.sincronizar == 'true' ? true : false,
						fecha_sincronizado: req.params.fecha
					}, { where: { id: { $in: req.body.ids.split(',') } } })
				} else {
					for (const traspaso of req.body) {
						await Venta.update({
							campamento_sincronizado: req.params.sincronizar == 'true' ? true : false,
							fecha_sincronizado: req.params.fecha
						}, { where: { id: traspaso.id } })
					}
				}
				res.json({ mensaje: 'Fecha sincronización establesida sadisfactoriamente!' })

			} catch (err) {
				res.json({ hasErr: true, mensaje: err.stack ? err.stack : err })
			}


		})
	router.route('/traspasos-campamento/:ids')
		.get(ensureAuthorizedlogged, async function (req, res) {
			try {

				let traspasos = await Venta.findAll({
					where: { id: { $in: req.params.ids.split(',') } },
					include: [{
						model: DetalleVenta, as: 'detallesVenta',
						include: [
							{
								model: Producto, as: 'producto', include: [
									{ model: Clase, as: 'tipoProducto' }
								]
							}]
					},
					{
						model: Almacen, as: 'almacenTraspaso',
						include: [{
							model: Sucursal, as: 'sucursal'
						}]
					}, {
						model: Almacen, as: 'almacen',
						include: [{
							model: Sucursal, as: 'sucursal'
						}]
					}]
				})
				res.json({ traspasos: traspasos })

			} catch (err) {
				res.json({ hasErr: true, mensaje: err.stack ? err.stack : err })
			}


		})
	router.route('/traspasos-campamento/pagina/:pagina/items_pagina/:items_pagina/texto_busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/sucursal/:id_sucursal/almacen/:id_almacen/fecha/:fecha')
		.get(ensureAuthorizedlogged, async function (req, res) {
			try {
				let textOrder = "";
				let condicionTraspasos = {
					fecha_sincronizado: { $ne: null }
				}

				if (req.params.id_almacen !== '0') condicionTraspasos.id_almacen_traspaso = req.params.id_almacen;
				let condicionSucursalDestino = req.params.id_sucursal !== '0' ? { id: req.params.id_sucursal } : {}
				if (req.params.fecha != 0) {
					let inicio = new Date(req.params.fecha); inicio.setHours(0, 0, 0, 0);
					let fin = new Date(req.params.fecha); fin.setHours(23, 59, 59, 59);
					condicionTraspasos.fecha = { $between: [inicio, fin] };

				}

				textOrder = req.params.columna + " " + req.params.direccion

				let datosbusqueda = {
					where: condicionTraspasos,
					attributes: [[sequelize.fn('GROUP_CONCAT', sequelize.col('`inv_venta`.`id`')), 'ids']
						, 'fecha_sincronizado', 'campamento_sincronizado'],
					include: [
						{
							model: Almacen, as: 'almacenTraspaso',
							include: [{
								model: Sucursal, as: 'sucursal', where: condicionSucursalDestino
							}]
						}, {
							model: Almacen, as: 'almacen',
							include: [{
								model: Sucursal, as: 'sucursal'
							}]
						}],
				}
				datosbusqueda.group = ["`inv_venta`.`fecha_sincronizado`"]

				let count = await Venta.count(
					datosbusqueda
				)
				if (req.params.items_pagina != '0') {
					textOrder = textOrder + " limit " + (req.params.items_pagina * (req.params.pagina - 1)) + ", " + req.params.items_pagina
				}
				datosbusqueda.order = sequelize.literal(textOrder)
				let traspasos = await Venta.findAll(
					datosbusqueda
				)
				for (const traspaso of traspasos) {
					condicionTraspasos.id = { $in: traspaso.dataValues.ids.split(',') }
					datosbusqueda.attributes = ['id', 'factura', 'fecha_sincronizado', 'campamento_sincronizado'],

						datosbusqueda.group = ["`inv_venta`.`id`"]

					traspaso.dataValues.ventas = await Venta.findAll(
						datosbusqueda
					)
				}
				res.json({ traspasos: traspasos, paginas: Math.ceil(count.length / req.params.items_pagina) });
			} catch (err) {
				res.json({ hasErr: true, mensaje: err.stack ? err.stack : err })
			}

		});

	router.route('/validar-importar-ventas-prueba/empresa/:id_empresa')
		.post(ensureAuthorizedlogged, async function (req, res) {
			var ventas = req.body.ventas
			// var detallesNoValidos = ["<span style='color:#dd3333'>No cuenta con la cantidad de inventarios disponibles</span><br/>"];
			var detallesNoValidos = [];
			var ventasValidas = [];
			// recorrer ventas
			for (let index = 0; index < ventas.length; index++) {
				const venta = ventas[index];
				console.log(venta);

				// eliminar detalles productos duplicados, convertirlos en unico y dentro agregar sus detalles que son
				var simpleArray = venta.detallesVenta
				var helper = {};
				var resultDetalles = await simpleArray.reduce(function (r, o) {
					var key = o.producto.codigo;
					if (!helper[key]) {
						helper[key] = Object.assign({}, o); // create a copy of o
						helper[key].detalles = [];
						helper[key].detalles.push(Object.assign({}, o))
						r.push(helper[key]);
					} else {
						helper[key].cantidad += o.cantidad;
						helper[key].detalles.push(Object.assign({}, o))
					}
					return r;
				}, []);
				console.log(resultDetalles);

				// obtener sucursal
				await Sucursal.find({
					where: {
						nombre: venta.sucursal_origen,
						id_empresa: req.params.id_empresa
					}
				}).then(async function (sucursal) {
					if (sucursal) {
						if (!sucursal.activo) {
							detallesNoValidos.push("<span style='font-size: 12px;'>Nro Venta: " + venta.numero + " la Sucursal " + sucursal.nombre + " de origen está deshabilitada, no se puede hacer cambios. </span><br/>");
							// aqui poner el reponse 
							if (index === (ventas.length - 1)) {
								res.json({ ventas: ventasValidas, noValidos: detallesNoValidos })
							}
						} else {
							venta.sucursal = sucursal
							// obtener almacen
							await Almacen.find({
								where: {
									nombre: venta.almacen_origen,
									id_sucursal: sucursal.id,
								}
							}).then(async function (almacenOrigen) {
								// recorrer detalles ventas
								var detallesValidos = [];
								if (almacenOrigen) {
									venta.almacen = almacenOrigen;
									for (let j = 0; j < resultDetalles.length; j++) {
										const detalle = resultDetalles[j];
										let productoEncontrado = await Producto.find({
											where: { codigo: detalle.producto.codigo, nombre: detalle.producto.nombre, id_empresa: venta.id_empresa }
										})
										if (productoEncontrado) {
											detalle.producto = productoEncontrado
											let encontradoActual = await Inventario.findAll({
												where: { id_producto: detalle.producto.id, id_almacen: venta.almacen.id, cantidad: { $gt: 0 } },
												attributes: [[sequelize.fn('sum', sequelize.col('cantidad')), 'cantidadTotal']],
												group: ["`inv_inventario`.`producto`"],
												raw: true
											});
											var sumaTotalInventarios = encontradoActual.length > 0 ? encontradoActual[0].cantidadTotal : 0;
											// validar o comprobar si la cantidad de inventarios alcanza 
											if (detalle.cantidad > sumaTotalInventarios) {
												detallesNoValidos.push("<span style='font-size: 12px;'>Nro Venta: " + venta.numero + " Item: " + detalle.producto.nombre + "</span><span style='font-size: 12px;color:#FF892A'> solicitada: " + detalle.cantidad + "</span><span style='font-size: 12px;color:#dd3333'> disponible: " + sumaTotalInventarios + "</span><br/>");
											} else {
												if (detalle.cantidad > 0) {
													detallesValidos.push(...detalle.detalles);
												} else {
													detallesNoValidos.push("<span style='font-size: 12px;'>Nro Venta: " + venta.numero + " Item: " + detalle.producto.nombre + "</span><span style='font-size: 12px;color:#FF892A'> solicitada: " + detalle.cantidad + "</span><span style='font-size: 12px;color:#dd3333'> la cantidad deve ser mayor a cero</span><br/>");
												}
												console.log(detallesValidos);
											}

											if (j === (resultDetalles.length - 1)) {
												venta.detallesVenta = detallesValidos;
												// comprobar o agregar solo los que tienen detalles con cantidad ====
												if (venta.detallesVenta.length > 0) {
													ventasValidas.push(venta);
												}
												console.log(venta);
											}
										} else {
											detallesNoValidos.push("<span style='font-size: 12px;'>Nro Venta: " + venta.numero + " Item: " + detalle.producto.nombre + "</span><span style='font-size: 12px;color:#dd3333'> No se Encontro el item</span><br/>");
											if (j === (resultDetalles.length - 1)) {
												venta.detallesVenta = detallesValidos;
												// comprobar o agregar solo los que tienen detalles con cantidad ====
												if (venta.detallesVenta.length > 0) {
													ventasValidas.push(venta);
												}
												console.log(venta);
											}
										}

									}
								} else {
									detallesNoValidos.push("<span style='font-size: 12px;'>Nro Venta: " + venta.numero + " el almacen " + venta.almacen_origen + "</span><span style='font-size: 12px;color:#dd3333'> No se encontro </span><br/>");
									// aqui poner el reponse 
									if (index === (ventas.length - 1)) {
										res.json({ ventas: ventasValidas, noValidos: detallesNoValidos })
									}
								}


								// aqui poner el reponse 
								if (index === (ventas.length - 1)) {
									res.json({ ventas: ventasValidas, noValidos: detallesNoValidos })
								}

							})
						}
					} else {
						detallesNoValidos.push("<span style='font-size: 12px;'>Nro Venta: " + venta.numero + " la sucursal " + venta.sucursal_origen + "</span><span style='font-size: 12px;color:#dd3333'> No se encontro </span><br/>");
						// aqui poner el reponse 
						if (index === (ventas.length - 1)) {
							res.json({ ventas: ventasValidas, noValidos: detallesNoValidos })
						}
					}

				});

			}

			res.json({ mensaje: "Importación satisfactoriamente!" })
		})


	function fecha_excel(fecha_desde_excel) {
		var fecha_minima_angular_indice_excel_1970 = 25569 - 1 //fecha minima angular. el -1 es para ajustar que el resultado da 1 anterior a la fecha real.
		var fecha_excel = new Date(1 / 1 / 1970)
		var diferencia_de_fecha = fecha_desde_excel - fecha_minima_angular_indice_excel_1970
		return fecha_excel.setTime(fecha_excel.getTime() + diferencia_de_fecha * 86400000)
	}

	function ordenarTraspasosExcel(ventasValidas, movimientoTraspaso, id_empresa, id_usuario) {
		var ventaKey = {};
		var ventasFomateados = ventasValidas.reduce(function (r, o) {
			var key = o.A;
			if (!ventaKey[key]) {
				ventaKey[key] = Object.assign({}, {
					numero: o.A,
					sucursal_origen: o.B,
					almacen_origen: o.C,
					sucursal_destino: o.D,
					almacen_destino: o.E,
					fecha: new Date(fecha_excel(o.F)),
					movimiento: movimientoTraspaso,
					id_empresa: id_empresa,
					id_usuario: id_usuario
				}); // create a copy of o
				ventaKey[key].detallesVenta = [];
				ventaKey[key].detallesVenta.push(Object.assign({},
					{
						producto: {
							codigo: o.G,
							nombre: o.H
						},
						fecha_vencimiento: o.I,
						lote: o.J,
						precio_unitario: o.K,
						cantidad: o.L,
						centroCosto: {}, descuento: 0, recargo: 0, ice: 0, excento: 0, tipo_descuento: false, tipo_recargo: false, eliminado: false,
						descuento_dolares: 0,
						recargo_dolares: 0,
						ice_dolares: 0,
						excento_dolares: 0,
						importe: o.K * o.L,
						total: o.K * o.L
					}
				))
				r.push(ventaKey[key]);
			} else {
				ventaKey[key].detallesVenta.push(Object.assign({},
					{
						producto: {
							codigo: o.G,
							nombre: o.H
						},
						fecha_vencimiento: o.I,
						lote: o.J,
						precio_unitario: o.K,
						cantidad: o.L,
						centroCosto: {}, descuento: 0, recargo: 0, ice: 0, excento: 0, tipo_descuento: false, tipo_recargo: false, eliminado: false,
						descuento_dolares: 0,
						recargo_dolares: 0,
						ice_dolares: 0,
						excento_dolares: 0,
						importe: o.K * o.L,
						total: o.K * o.L
					}
				))
			}
			return r;
		}, []);

		return ventasFomateados;
	}

	// para redondeo de numeros
	function round(value, decimals) {
		return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
	}

	router.route('/validar-importar-ventas/empresa/:id_empresa')
		.post(ensureAuthorizedlogged, async function (req, res) {
			var ventas = req.body.ventas
			var movimientoTraspaso = await Clase.find({
				where: { nombre_corto: Diccionario.EGRE_TRASPASO }
			});
			var detallesNoValidos = [];
			var ventasValidas = [];
			// agrupando ventas que tengan el mismo producto, sucursal y almacen =========== 
			var helper = {};
			var resultDetalles = await ventas.reduce(function (r, o) {
				var key = o.G + '-' + o.B + '-' + o.C;
				if (!helper[key]) {
					helper[key] = Object.assign({}, o); // create a copy of o
					helper[key].detalles = [];
					helper[key].cantidad = o.L ? o.L : 0;
					helper[key].detalles.push(Object.assign({}, o))
					r.push(helper[key]);
				} else {
					helper[key].cantidad += o.L ? o.L : 0;
					helper[key].detalles.push(Object.assign({}, o))
				}
				return r;
			}, []);
			// recorrer el resultado y verificar el inventario =========
			for (let index = 0; index < resultDetalles.length; index++) {
				const venta = resultDetalles[index];
				// obtener sucursal
				await Sucursal.find({
					where: {
						nombre: venta.B,
						id_empresa: req.params.id_empresa
					}
				}).then(async function (sucursal) {
					if (sucursal) {
						if (!sucursal.activo) {
							detallesNoValidos.push("<span style='font-size: 12px;'>Nro Venta: " + venta.A + " la Sucursal " + sucursal.nombre + " de origen está deshabilitada, no se puede hacer cambios. </span><br/>");
							// aqui poner el reponse 
							if (index === (ventas.length - 1)) {
								var traspasosValidos = await ordenarTraspasosExcel(ventasValidas, movimientoTraspaso, req.params.id_empresa, req.body.id_usuario)
								res.json({ ventas: ventasValidas, noValidos: detallesNoValidos })
							}
						} else {
							venta.sucursal = sucursal
							// obtener almacen
							await Almacen.find({
								where: {
									nombre: venta.C,
									id_sucursal: sucursal.id,
								}
							}).then(async function (almacenOrigen) {
								// recorrer detalles ventas
								if (almacenOrigen) {
									venta.almacen = almacenOrigen;
									let productoEncontrado = await Producto.find({
										where: { codigo: venta.G, nombre: venta.H, id_empresa: req.params.id_empresa }
									})
									if (productoEncontrado) {
										let encontradoActual = await Inventario.findAll({
											where: { id_producto: productoEncontrado.id, id_almacen: almacenOrigen.id, cantidad: { $gt: 0 } },
											attributes: [[sequelize.fn('sum', sequelize.col('cantidad')), 'cantidadTotal']],
											group: ["`inv_inventario`.`producto`"],
											raw: true
										});
										var sumaTotalInventarios = encontradoActual.length > 0 ? encontradoActual[0].cantidadTotal : 0;
										// validar o comprobar si la cantidad de inventarios alcanza 
										if (venta.cantidad > sumaTotalInventarios) {
											detallesNoValidos.push("<span style='font-size: 12px;'>Sucursal: " + venta.B + " Almacen: " + venta.C + " Item: " + productoEncontrado.nombre + "</span><br class='br-message' /><span style='font-size: 12px;color:#FF892A'> solicitada: " + round(venta.cantidad, 2) + "</span><span style='font-size: 12px;color:#dd3333'> disponible: " + sumaTotalInventarios + "</span><br/>");
										} else {
											// verificando si la cantidad es ,ayor a cero
											if (venta.cantidad > 0) {
												var detallesC = venta.detalles.filter(p => p.L > 0);
												var detallesE = venta.detalles.filter(p => p.L == 0 || !p.L);
												// insertando solo los que tienen mayor a cero
												if (detallesE.length > 0) {
													let ventasE = detallesE.map(x => x.A).join(", ");
													detallesNoValidos.push("<span style='font-size: 12px;'>Los traspasos: </span><span style='font-size: 12px;color:#FF892A'>" + ventasE + "</span><span style='font-size: 12px;'> Item: " + productoEncontrado.nombre + "</span><br class='br-message'/><span style='font-size: 12px;color:#dd3333'> la cantidad deve ser mayor a cero</span><br/>");
												}

												if (detallesC.length > 0) ventasValidas.push(...detallesC)
											} else {
												detallesNoValidos.push("<span style='font-size: 12px;'>Sucursal: " + venta.B + " Almacen: " + venta.C + " Item: " + productoEncontrado.nombre + "</span><br class='br-message'/><span style='font-size: 12px;color:#FF892A'> solicitada: " + round(venta.cantidad, 2) + "</span><span style='font-size: 12px;color:#dd3333'> la cantidad deve ser mayor a cero</span><br/>");
											}
										}
									} else {
										detallesNoValidos.push("<span style='font-size: 12px;'>Nro Venta: " + venta.A + " Item: " + venta.H + "</span><span style='font-size: 12px;color:#dd3333'> No se Encontro el item</span><br/>");
									}
								} else {
									detallesNoValidos.push("<span style='font-size: 12px;'>Nro Venta: " + venta.A + " el almacen " + venta.C + "</span><span style='font-size: 12px;color:#dd3333'> No se encontro </span><br/>");
								}

								// aqui poner el reponse 
								if (index === (resultDetalles.length - 1)) {
									var traspasosValidos = await ordenarTraspasosExcel(ventasValidas, movimientoTraspaso, req.params.id_empresa, req.body.id_usuario)
									res.json({ ventas: traspasosValidos, noValidos: detallesNoValidos })
								}
							})
						}
					} else {
						detallesNoValidos.push("<span style='font-size: 12px;'>Nro Venta: " + venta.A + " la sucursal " + venta.B + "</span><span style='font-size: 12px;color:#dd3333'> No se encontro </span><br/>");
						// aqui poner el reponse 
						if (index === (resultDetalles.length - 1)) {
							var traspasosValidos = await ordenarTraspasosExcel(ventasValidas, movimientoTraspaso, req.params.id_empresa, req.body.id_usuario)
							res.json({ ventas: traspasosValidos, noValidos: detallesNoValidos })
						}
					}
				});
			}
			res.json({ mensaje: "Importación satisfactoriamente!" })
		})

	router.route('/configuracion-calificacion-eval-proveedor/empresa/:id_empresa')
		.post(ensureAuthorizedlogged, async function (req, res) {
			for (const conf of req.body.configuraciones) {
				if (conf.id) {
					await ConfiguracionCalificacionProveedor.update({
						id_concepto: conf.id_concepto,
						porcentaje: conf.porcentaje
					}, {
						where: { id: conf.id }
					})
				} else {
					await ConfiguracionCalificacionProveedor.create({
						id_empresa: req.params.id_empresa,
						id_concepto: conf.id_concepto,
						porcentaje: conf.porcentaje
					})
				}
			}
			res.json({ mensaje: 'Configuraciones guardadas satisfactoriamente!' })
		})
		.get(ensureAuthorizedlogged, async function (req, res) {
			try {
				let configuraciones = await ConfiguracionCalificacionProveedor.findAll({
					where: { id_empresa: req.params.id_empresa },
					include: [{ model: Clase, as: 'concepto' }]
				})
				res.json({ configuraciones: configuraciones })
			} catch (error) {
				res.json({ hasErr: true, mensaje: error.stack ? error.stack : error });
			}
		})
	router.route('/obtener-correlativo-detalle-produccion/fecha/:fecha/id_almacen/:id_almacen')
		.get(ensureAuthorizedlogged, async function (req, res) {
			try {
				var inicio = new Date(req.params.fecha); inicio.setHours(0, 0, 0, 0);
				var fin = new Date(req.params.fecha); fin.setHours(23, 59, 59, 59);
				let condicionCompra = { fecha: { $between: [inicio, fin] } };

				let detalle = await DetalleCompra.find({
					attributes: [[sequelize.fn('max', sequelize.col('correlativo_produccion')), 'correlativo_produccion']],
					include: [{
						model: Compra, as: 'compra',
						attributes: [[sequelize.fn('max', sequelize.col('`compra`.`id`')), 'id_comra']],
						where: condicionCompra,
						include: [{
							model: Almacen, as: 'almacen',
							attributes: [[sequelize.fn('max', sequelize.col('`compra.almacen`.`id`')), 'id_almacen']],
							where: { id: req.params.id_almacen }
						}]
					}]
				})
				res.json({ correlativo: detalle.correlativo_produccion })
			} catch (error) {
				res.json({ hasErr: true, mensaje: error.stack ? error.stack : error });
			}
		})

	router.route('/verificar-doc-rendicion-compras/:id_sucursal/doc/:doc')
		.get(async function (req, res) {
			try {
				let condicionCompra = {
					$and: [
						{ doc_rendicion: req.params.doc },
						{ compra_rendida: false },
						{
							$or: [
								sequelize.where(sequelize.col('`almacen.sucursal`.`id`'),
									{ $eq: req.params.id_sucursal }
								),
								sequelize.where(sequelize.col('`sucursal`.`id`'),
									{ $eq: req.params.id_sucursal }
								),
							],
						}
					],

				}
				let compras = await Compra.findAll({
					where: condicionCompra,
					include: [{ model: Clase, as: 'tipoMovimiento' },
					{ model: Sucursal, as: 'sucursal' }, { model: PagoCompra, as: 'pagosCompra' },/* {model:Clase,as:'tipoMovimiento'},{ model: Sucursal, as: 'sucursal',where: condicionSucursal }, */ {
						model: Movimiento, as: 'movimiento',
						include: [{ model: Clase, as: 'clase', }]
					}, {
						model: DetalleCompra, as: 'detallesCompra',
						include: [{ model: Producto, as: 'producto' }, { model: Clase, as: 'servicio' },
						{ model: Clase, as: 'centroCosto',/*,where:{nombre_corto:'ALM'}*/ }]
					},
					{
						model: ConfiguracionIso, as: 'configuracionesIso', required: false
					},
					{ model: Clase, as: 'tipoPago', },
					{ model: Usuario, as: 'usuario' },
					{ model: Proveedor, as: 'proveedor' },
					{
						model: Almacen, as: 'almacen',
						include: [{
							model: Sucursal, as: 'sucursal',
						}]
					}]
				})
				res.json({ compras: compras });

			} catch (err) {
				res.json({ hasError: true, mensaje: (err.stack) ? err.stack : err });
			}

		});

	router.route('/inventarios-negativos/empresa/:id_empresa')
		.get(async function (req, res) {
			try {
				let inventariosEmpresa = await Inventario.findAll({
					where: { cantidad: { $lt: 0 } },
					include: [
						{
							model: Producto, as: 'producto',
							include: [
								{ model: Clase, as: 'grupo' },
								{ model: Clase, as: 'subgrupo' }
							]
						},
						{
							model: Almacen, as: 'almacen',
							include: [
								{ model: Sucursal, as: 'sucursal', where: { id_empresa: req.params.id_empresa } }
							]
						}
					]
				})
				res.json({ inventariosEmpresa: inventariosEmpresa })
			} catch (error) {
				res.json({ hasErr: true, mensaje: error.stack ? error.stack : error });
			}
		})
	router.route('/actualizar-registros-inv')
		.post(function (req, res) {
			sequelize.transaction(async (t) => {
				try {
					let inventario = req.body

					await Inventario.update({
						costo_unitario: inventario.costo_unitario,
						costo_total: inventario.cantidad * inventario.costo_unitario,
					}, {
						where: { id: inventario.id }, transaction: t

					})
					await ActualizarRegistrosInvTraspasos(inventario, t);
					await ActualizarRegistrosInvOperaciones(inventario, t);
					await ActualizarRegistrosInvBajas(inventario, t);
					await ActualizarRegistrosInvIngresoTraspasos(inventario, t);
					await ActualizarRegistrosInvMantenimiento(inventario, t);
					await ActualizarRegistrosInvRopaTrabajo(inventario, t);

					return new Promise(function (fulfill, reject) {
						fulfill({ mensaje: "Registros actualizado!" });
					});
				} catch (err) {
					return new Promise(function (fulfill, reject) {
						reject({ mensaje: (err.stack !== undefined) ? err.stack : err, hasErr: true });
					});
				}
			}).then((result) => {
				res.json({ actualizados: result.mensaje });
			}).catch((err) => {
				res.json({ hasErr: true, mensaje: err.stack })
			})


		})
	async function ActualizarRegistrosInvTraspasos(inventario, t) {

		let ventasTraspaso = await ObtenerVentasInventarioClase(inventario, 'TRAS', t);
		for (const traspaso of ventasTraspaso) {
			let movimientos = await Movimiento.findAll({
				where: { createdAt: traspaso.movimiento.createdAt },
				include: [{ model: DetalleMovimiento, as: "detallesMovimiento" }],
				transaction: t
			})
			let totalGeneral = 0
			for (const detalleVenta of traspaso.detallesVenta) {
				if (inventario.id_producto == detalleVenta.id_producto && detalleVenta.id_inventario == inventario.id) {
					let total = detalleVenta.cantidad * inventario.costo_unitario
					await DetalleVenta.update({
						precio_unitario: inventario.costo_unitario,
						importe: total,
						total: total
					}, { where: { id: detalleVenta.id }, transaction: t })
					totalGeneral += total
				} else {
					totalGeneral += detalleVenta.cantidad * inventario.costo_unitario
				}

			}
			await Venta.update({
				importe: totalGeneral,
				total: totalGeneral
			}, { where: { id: traspaso.id }, transaction: t })
			for (const movimiento of movimientos) {
				if (traspaso.id_movimiento == movimiento.id) {
					for (const detalleMov of movimiento.detallesMovimiento) {
						if (inventario.id_producto == detalleMov.id_producto && detalleMov.id_inventario == inventario.id) {
							let total = detalleMov.cantidad * inventario.costo_unitario
							await DetalleMovimiento.update({
								costo_unitario: inventario.costo_unitario,
								importe: total,
								total: total
							}, { where: { id: detalleMov.id }, transaction: t })
						}
					}
				} else {
					let detalleMov = await DetalleMovimiento.find({
						where: { id_movimiento: movimiento.id }, transaction: t
					})
					let inventarioT = await Inventario.find({
						where: { id: detalleMov.id_inventario }, transaction: t
					})
					inventarioT.costo_unitario = inventario.costo_unitario
					await ActualizarRegistrosInvTraspasos(inventarioT, t)
				}
			}
		}
	}
	async function ActualizarRegistrosInvOperaciones(inventario, t) {


		let ventasConsumo = await SolicitudReposicion.findAll({
			include: [{
				model: Movimiento, as: 'movimiento',
				include: [{ model: DetalleMovimiento, as: 'detallesMovimiento', where: { id_inventario: inventario.id } },
				{ model: Clase, as: 'clase', where: { nombre_corto: 'CONSUM' } }]
			}], transaction: t
		})
		for (const consumo of ventasConsumo) {
			let totalGeneral = 0
			let movimiento = await Movimiento.find({
				where: { id: consumo.id_movimiento },
				include: [{ model: DetalleMovimiento, as: "detallesMovimiento" }],
				transaction: t
			})
			for (const detalleMov of movimiento.detallesMovimiento) {
				if (inventario.id_producto == detalleMov.id_producto && detalleMov.id_inventario == inventario.id) {
					let total = detalleMov.cantidad * inventario.costo_unitario
					await DetalleMovimiento.update({
						costo_unitario: inventario.costo_unitario,
						importe: total,
						total: total
					}, { where: { id: detalleMov.id }, transaction: t })
					totalGeneral += total
				} else {
					totalGeneral += detalleMov.cantidad * inventario.costo_unitario
				}

			}
			await SolicitudReposicion.update({
				monto: totalGeneral
			}, { where: { id: consumo.id } })
		}
	}
	async function ObtenerVentasInventarioClase(inventario, nombreClase, t) {
		return await Venta.findAll({
			include: [{ model: DetalleVenta, as: 'detallesVenta' }, {
				model: Movimiento, as: 'movimiento',
				include: [{ model: DetalleMovimiento, as: 'detallesMovimiento', where: { id_inventario: inventario.id } },
				{ model: Clase, as: 'clase', where: { nombre_corto: nombreClase } }]
			}], transaction: t
		})
	}

	async function ActualizarRegistrosInvBajas(inventario, t) {


		//Seleccionar ventas con el inventario
		let ventasBaja = await ObtenerVentasInventarioClase(inventario, 'BAJA', t);
		//Modificar los montos con el inventario
		for (const baja of ventasBaja) {
			let totalGeneral = 0
			for (const detalleVenta of baja.detallesVenta) {
				if (inventario.id_producto == detalleVenta.id_producto && detalleVenta.id_inventario == inventario.id) {
					let total = detalleVenta.cantidad * inventario.costo_unitario
					await DetalleVenta.update({
						precio_unitario: inventario.costo_unitario,
						importe: total,
						total: total
					}, { where: { id: detalleVenta.id }, transaction: t })
					totalGeneral += total
				} else {
					totalGeneral += detalleVenta.cantidad * inventario.costo_unitario
				}

			}
			await Venta.update({
				importe: totalGeneral,
				total: totalGeneral
			}, { where: { id: baja.id }, transaction: t })
			let movimiento = await Movimiento.find({
				where: { id: baja.id_movimiento },
				include: [{ model: DetalleMovimiento, as: "detallesMovimiento" }],
				transaction: t
			})
			for (const detalleMov of movimiento.detallesMovimiento) {
				if (inventario.id_producto == detalleMov.id_producto && detalleMov.id_inventario == inventario.id) {
					let total = detalleMov.cantidad * inventario.costo_unitario
					await DetalleMovimiento.update({
						costo_unitario: inventario.costo_unitario,
						importe: total,
						total: total
					}, { where: { id: detalleMov.id }, transaction: t })
				}
			}
		}
	}
	async function ActualizarRegistrosInvIngresoTraspasos(inventario, t) {
		let costo_unitario = inventario.costo_unitario;

		//Buscando ingreso por almacen en detalles movimiento
		let detalle = await DetalleMovimiento.find({
			where: { id_inventario: inventario.id },
			include: {
				model: Movimiento, as: 'movimiento',
				include: { model: Clase, as: 'clase', where: { nombre_corto: Diccionario.ING_TRASPASO } }
			}, transaction: t
		})

		let costo_total = detalle.cantidad * inventario.costo_unitario;
		//Ajustando los los valores de costo_unutario importe y total.
		await DetalleMovimiento.update({
			costo_unitario: costo_unitario,
			importe: costo_total,
			total: costo_total
		}, { where: { id: detalle.id }, transaction: t })
		//seleccionar ventas elabordas con el inventario

	}
	async function ActualizarRegistrosInvProformas(inventario, t) {
		/* let ventasProformas = await ObtenerVentasInventarioClase(inventario, 'PFR', t);
		//modificar los montos con el inventario
		for (const ventaFactura of ventasFacturas) {
			let totalGeneral = 0
			let importeGeneral = 0
			for (const detalle of ventaFactura.detallesVenta) {
				detalle.precio_unitario = inventario.costo_unitario;
				let detalleVenta = calcularImporte(detalle, detalle.ice, detalle.excento, false);
				if (inventario.id_producto == detalleVenta.id_producto && detalleVenta.id_inventario == inventario.id) {
					await DetalleVenta.update({
						precio_unitario: inventario.costo_unitario,
						importe: detalleVenta.importe,
						total: detalleVenta.total
					}, { where: { id: detalleVenta.id }, transaction: t });
				}
				totalGeneral += detalleVenta.total;
				importeGeneral += detalleVenta.importe;
			}
			await Venta.update({
				importe: totalGeneral,
				total: totalGeneral
			}, { where: { id: ventaFactura.id }, transaction: t })
			let movimiento = await Movimiento.find({
				where: { id: ventaFactura.id_movimiento },
				include: [{ model: DetalleMovimiento, as: "detallesMovimiento" }],
				transaction: t
			})
			for (const detalle of movimiento.detallesMovimiento) {
				if (inventario.id_producto == detalleMov.id_producto && detalleMov.id_inventario == inventario.id) {
					let detalleMov = calcularImporte(detalle, detalle.ice, detalle.excento, false);
	
					await DetalleMovimiento.update({
						costo_unitario: detalleMov.costo_unitario,
						importe: detalleMov.importe,
						total: detalleMov.total
					}, { where: { id: detalleMov.id }, transaction: t })
				}
			}
		} */
	}
	async function ActualizarRegistrosInvFacturas(inventario, t) {
		/* let ventasFacturas = await ObtenerVentasInventarioClase(inventario, 'FACT', t);
		//modificar los montos con el inventario
		for (const ventaFactura of ventasFacturas) {
			let totalGeneral = 0
			let importeGeneral = 0
			for (const detalle of ventaFactura.detallesVenta) {
				detalle.precio_unitario = inventario.costo_unitario;
				let detalleVenta = calcularImporte(detalle, detalle.ice, detalle.excento, false);
				if (inventario.id_producto == detalleVenta.id_producto && detalleVenta.id_inventario == inventario.id) {
					await DetalleVenta.update({
						precio_unitario: inventario.costo_unitario,
						importe: detalleVenta.importe,
						total: detalleVenta.total
					}, { where: { id: detalleVenta.id }, transaction: t });
				}
				totalGeneral += detalleVenta.total;
				importeGeneral += detalleVenta.importe;
			}
			await Venta.update({
				importe: totalGeneral,
				total: totalGeneral
			}, { where: { id: ventaFactura.id }, transaction: t })
			let movimiento = await Movimiento.find({
				where: { id: ventaFactura.id_movimiento },
				include: [{ model: DetalleMovimiento, as: "detallesMovimiento" }],
				transaction: t
			})
			for (const detalle of movimiento.detallesMovimiento) {
				if (inventario.id_producto == detalleMov.id_producto && detalleMov.id_inventario == inventario.id) {
					let detalleMov = calcularImporte(detalle, detalle.ice, detalle.excento, false);
	
					await DetalleMovimiento.update({
						costo_unitario: detalleMov.costo_unitario,
						importe: detalleMov.importe,
						total: detalleMov.total
					}, { where: { id: detalleMov.id }, transaction: t })
				}
			}
		} */
	}
	async function ActualizarRegistrosInvMantenimiento(inventario, t) {
		let costo_total = 0;
		//Buscando SALIDA MANTENIMIENTO OT en detalles movimiento
		let detalles = await DetalleMovimiento.findAll({
			where: { id_inventario: inventario.id },
			include: {
				model: Movimiento, as: 'movimiento',
				include: { model: Clase, as: 'clase', where: { nombre_corto: Diccionario.EGRE_OT } }
			}, transaction: t
		})
		//Ajustando los los valores de costo_unutario importe y total.
		for (const detalle of detalles) {
			costo_total = inventario.cantidad * inventario.costo_unitario
			await DetalleMovimiento.update({
				costo_unitario: inventario.costo_unitario,
				importe: costo_total,
				total: costo_total
			}, { where: { id: detalle.id }, transaction: t })
		}
	}
	async function ActualizarRegistrosInvRopaTrabajo(inventario, t) {
		let costo_unitario = 0;
		let costo_total = 0;

		//Buscando DOTACIÓN EPPS en detalles movimiento
		let detalles = await DetalleMovimiento.findAll({
			where: { id_inventario: inventario.id },
			include: {
				model: Movimiento, as: 'movimiento',
				include: { model: Clase, as: 'clase', where: { nombre_corto: Diccionario.EGRE_EPPS } }
			}, transaction: t
		})
		//Ajustando los los valores de costo_unutario importe y total.
		for (const detalle of detalles) {
			costo_total = inventario.cantidad * inventario.costo_unitario
			await DetalleMovimiento.update({
				costo_unitario: inventario.costo_unitario,
				importe: costo_total,
				total: costo_total
			}, { where: { id: detalle.id }, transaction: t })
		}

	}
	router.route('/inventarios-valuados/empresa/:id_empresa/tipo/:tipo')
		.get(async function (req, res) {
			try {
				var tipoM = 'ID';
				switch (Number(req.params.tipo)) {
					case 1:
						tipoM = 'ID';
						break;
					case 2:
						tipoM = 'IPI';
						break;
					case 3:
						tipoM = 'IPA';
						break;
					case 4:
						tipoM = 'IPT';
						break;
					case 5:
						tipoM = 'IPCSF';
						break;
					case 6:
						tipoM = 'ICAJCH';
						break;
					default:
						tipoM = 'ID';
				}

				let inventariosEmpresa = await sequelize.query('SELECT \
				`inv_inventario`.`id`, \
				`inv_inventario`.`almacen` AS `id_almacen`,\
				`inv_inventario`.`producto` AS `id_producto`,\
				`inv_inventario`.`cantidad`,\
				`inv_inventario`.`costo_unitario`,\
				`detallesCompra`.`compra` AS `id_compra`,\
				`detallesCompra`.`costo_unitario` AS `costo_unitario_compra`,\
				`detallesCompra`.`cantidad` AS `cantidad_compra`,\
				`detallesCompra`.`importe` AS `importe`,\
				`detallesCompra`.`descuento` AS `descuento`,\
				`detallesCompra`.`total` AS `total`,\
				`detallesCompra.compra`.`movimiento` AS `id_movimiento`,\
				`detallesCompra.compra`.`fecha` AS `fecha`,\
				`detallesCompra.compra.movimiento.clase`.`nombre_corto` AS 	`clase`\
			FROM\
				`inv_inventario` AS `inv_inventario`\
				LEFT OUTER JOIN `inv_detalle_compra` AS `detallesCompra` ON `inv_inventario`.`id` = `detallesCompra`.`inventario`\
				LEFT OUTER JOIN `inv_compra` AS `detallesCompra.compra` ON `detallesCompra`.`compra` = `detallesCompra.compra`.`id`\
				LEFT OUTER JOIN `inv_movimiento` AS `detallesCompra.compra.movimiento` ON `detallesCompra.compra`.`movimiento` = `detallesCompra.compra.movimiento`.`id`\
				LEFT OUTER JOIN `gl_clase` AS `detallesCompra.compra.movimiento.clase` ON `detallesCompra.compra.movimiento`.`clase` = `detallesCompra.compra.movimiento.clase`.`id`\
				LEFT OUTER JOIN `agil_almacen` AS `almacen` ON `inv_inventario`.`almacen` = `almacen`.`id`\
				INNER JOIN `agil_sucursal` AS `almacen.sucursal` ON `almacen`.`sucursal` = `almacen.sucursal`.`id` AND `almacen.sucursal`.`empresa` = ' + req.params.id_empresa + '\
				WHERE `detallesCompra.compra.movimiento.clase`.`nombre_corto` = "'+ tipoM + '"', {
					type: sequelize.QueryTypes.SELECT
				})
				for (let index = 0; index < inventariosEmpresa.length; index++) {
					const inventario = inventariosEmpresa[index];
					// console.log(inventario)
					if (inventario.id_compra) {
						if (inventario.clase == "ID" || inventario.clase == "IPI") {
							let costo_valuado = (Math.round((((inventario.importe - inventario.descuento) * 0.87) / inventario.cantidad_compra) * 100) / 100);
							let invActualizado = await Inventario.update({
								costo_unitario_neto: costo_valuado,
							}, {
								where: {
									id: inventario.id
								}
							})
						} else {
							let costo_valuado = (Math.round((((inventario.importe - inventario.descuento) * 1) / inventario.cantidad_compra) * 100) / 100);
							let invActualizado = await Inventario.update({
								costo_unitario_neto: costo_valuado,
							}, {
								where: {
									id: inventario.id
								}
							})

						}

					} else {
						let invActualizado = await Inventario.update({
							costo_unitario_neto: inventario.costo_unitario,
						}, {
							where: {
								id: inventario.id
							}
						})
					}

				}
				res.json({ inventariosEmpresa: 'siii' })
			} catch (error) {
				res.json({ hasErr: true, mensaje: error.stack ? error.stack : error });
			}
		})


	//Solo es para crear precio por sucursal y tipo de precio de la empresa HONCE STRORE
	router.route('/registrar/precios/sucursal')
		.post(async function (req, res) {

			try {
				let productosPreciosXsucursal = await sequelize.query('SELECT P.producto,P.sucursal,P.tipo_precio,P.precio_unitario,P.rango_positivo,P. rango_negativo\
					FROM\
						agil_producto_tipo_precio P\
					WHERE\
					P.sucursal IN (256,265,267)\
					and P.eliminado = 0', { type: sequelize.QueryTypes.SELECT })

				for (let i = 0; i < productosPreciosXsucursal.length; i++) {
					const prodXsucursal = productosPreciosXsucursal[i];

					let encontrado = []
					for (let j = 0; j < productosPreciosXsucursal.length; j++) {
						const busqueda = productosPreciosXsucursal[j];
						if (prodXsucursal.producto == busqueda.producto && busqueda.sucursal == 256 && busqueda.tipo_precio == 118501) {
							encontrado.push({ producto: busqueda.producto, sucursal: 265, tipo_precio: 118501, precio_unitario: busqueda.precio_unitario, rango_positivo: busqueda.rango_positivo, rango_negativo: busqueda.rango_negativo })
							encontrado.push({ producto: busqueda.producto, sucursal: 267, tipo_precio: 118501, precio_unitario: busqueda.precio_unitario, rango_positivo: busqueda.rango_positivo, rango_negativo: busqueda.rango_negativo })
						}
						if (prodXsucursal.producto == busqueda.producto && busqueda.sucursal == 256 && busqueda.tipo_precio == 118502) {
							encontrado.push({ producto: busqueda.producto, sucursal: 265, tipo_precio: 118502, precio_unitario: busqueda.precio_unitario, rango_positivo: busqueda.rango_positivo, rango_negativo: busqueda.rango_negativo })
							encontrado.push({ producto: busqueda.producto, sucursal: 267, tipo_precio: 118502, precio_unitario: busqueda.precio_unitario, rango_positivo: busqueda.rango_positivo, rango_negativo: busqueda.rango_negativo })
						}
						if (prodXsucursal.producto == busqueda.producto && busqueda.sucursal == 265 && busqueda.tipo_precio == 118501) {
							encontrado.push({ producto: busqueda.producto, sucursal: 256, tipo_precio: 118501, precio_unitario: busqueda.precio_unitario, rango_positivo: busqueda.rango_positivo, rango_negativo: busqueda.rango_negativo })
							encontrado.push({ producto: busqueda.producto, sucursal: 267, tipo_precio: 118501, precio_unitario: busqueda.precio_unitario, rango_positivo: busqueda.rango_positivo, rango_negativo: busqueda.rango_negativo })
						}
						if (prodXsucursal.producto == busqueda.producto && busqueda.sucursal == 265 && busqueda.tipo_precio == 118502) {
							encontrado.push({ producto: busqueda.producto, sucursal: 256, tipo_precio: 118502, precio_unitario: busqueda.precio_unitario, rango_positivo: busqueda.rango_positivo, rango_negativo: busqueda.rango_negativo })
							encontrado.push({ producto: busqueda.producto, sucursal: 267, tipo_precio: 118502, precio_unitario: busqueda.precio_unitario, rango_positivo: busqueda.rango_positivo, rango_negativo: busqueda.rango_negativo })
						}
						if (prodXsucursal.producto == busqueda.producto && busqueda.sucursal == 267 && busqueda.tipo_precio == 118501) {
							encontrado.push({ producto: busqueda.producto, sucursal: 256, tipo_precio: 118501, precio_unitario: busqueda.precio_unitario, rango_positivo: busqueda.rango_positivo, rango_negativo: busqueda.rango_negativo })
							encontrado.push({ producto: busqueda.producto, sucursal: 265, tipo_precio: 118501, precio_unitario: busqueda.precio_unitario, rango_positivo: busqueda.rango_positivo, rango_negativo: busqueda.rango_negativo })
						}
						if (prodXsucursal.producto == busqueda.producto && busqueda.sucursal == 267 && busqueda.tipo_precio == 118502) {
							encontrado.push({ producto: busqueda.producto, sucursal: 256, tipo_precio: 118502, precio_unitario: busqueda.precio_unitario, rango_positivo: busqueda.rango_positivo, rango_negativo: busqueda.rango_negativo })
							encontrado.push({ producto: busqueda.producto, sucursal: 265, tipo_precio: 118502, precio_unitario: busqueda.precio_unitario, rango_positivo: busqueda.rango_positivo, rango_negativo: busqueda.rango_negativo })

						}
						if (j == productosPreciosXsucursal.length - 1) {

							for (let p = 0; p < encontrado.length; p++) {
								const comparar = encontrado[p];
								var datoExist = false
								let registroComparar = await sequelize.query('SELECT P.producto,P.sucursal,P.tipo_precio,P.precio_unitario,P.rango_positivo,P. rango_negativo\
									FROM\
										agil_producto_tipo_precio P\
									WHERE\
									P.sucursal IN (256,265,267)\
									and P.eliminado = 0', { type: sequelize.QueryTypes.SELECT })

								for (let l = 0; l < registroComparar.length; l++) {
									const registrComp = registroComparar[l];
									if ((registrComp.producto == comparar.producto) && (registrComp.sucursal == comparar.sucursal) && (registrComp.tipo_precio == comparar.tipo_precio)) {
										datoExist = true
									}

								}
								if (!datoExist) {

									let invActualizado = await ProductoTipoPrecio.create({
										id_producto: comparar.producto,
										id_tipo_precio: comparar.tipo_precio,
										id_sucursal: comparar.sucursal,
										precio_unitario: comparar.precio_unitario,
										rango_positivo: comparar.rango_positivo,
										rango_negativo: comparar.rango_negativo,
										eliminado: 0
									})
								}

							}
						}



					}

				}
			} catch (err) {
				return new Promise(function (fulfill, reject) {
					reject({ mensaje: (err.stack !== undefined) ? err.stack : err, hasErr: true });
				});
			}



		})








}

