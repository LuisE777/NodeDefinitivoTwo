module.exports = function (router, forEach, decodeBase64Image, fs, Empresa, Producto, Proveedor, Cliente, Clase, Inventario, ComisionVendedorProducto,
	Usuario, DetalleVenta, DetalleMovimiento, Movimiento, Venta, Compra, DetalleCompra, Almacen, Sucursal, signs3, Tipo, VentaReprogramacionPago, UsuarioGrupos, ProductoBase, ProductoTipoPrecio, ensureAuthorizedlogged, ProductoPromocionPuntaje, ProductoPrecioPorSucursal, sequelize, SolicitudReposicion,
	DetalleSolicitudProducto) {

	router.route('/productos/empresa/:id_empresa/texto/:texto')
		.get(ensureAuthorizedlogged, function (req, res) {
			Producto.findAll({
				where: {
					id_empresa: req.params.id_empresa,
					$or: [{ nombre: { $like: '%' + req.params.texto + '%' } },
					{ codigo: { $like: '%' + req.params.texto + '%' } },
					{ codigo_fabrica: { $like: '%' + req.params.texto + '%' } },
					{ descripcion: { $like: '%' + req.params.texto + '%' } }]
				},
				include: [{ model: Clase, as: 'tipoProducto' }]
			}).then(function (productos) {
				res.json(productos);
			});
		});
	router.route('/productos-mantenimiento/almacen/:id_almacen/texto/:texto')
		.get(ensureAuthorizedlogged, function (req, res) {
			Producto.findAll({
				where: {
					$or: [{ nombre: { $like: '%' + req.params.texto + '%' } },
					{ codigo: { $like: '%' + req.params.texto + '%' } },
					{ codigo_fabrica: { $like: '%' + req.params.texto + '%' } },
					{ descripcion: { $like: '%' + req.params.texto + '%' } }]
				},
				include: [{ model: Clase, as: 'tipoProducto' }, {
					model: Inventario, as: 'inventarios', required: true, where: { id_almacen: req.params.id_almacen },
					include: [{ model: DetalleMovimiento, required: true, as: 'detallesMovimiento' }]
				}]
			}).then(function (productos) {
				res.json(productos);
			});
		});

	router.route('/productos/empresa/:id_empresa/texto/:texto/user/:id_usuario/almacen/:id_almacen')
		.get(ensureAuthorizedlogged, function (req, res) {
			if (req.params.id_almacen === 0) {
				req.params.id_almacen = undefined
			}
			UsuarioGrupos.findAll({
				where: { id_usuario: req.params.id_usuario }
			}).then(function (grupos) {
				var gurposUsuario = grupos.map(function (grupo) {
					return grupo.id_grupo
				})
				Producto.count({
					where: {
						id_empresa: req.params.id_empresa,
						id_grupo: { $in: gurposUsuario },
						$or: [{ nombre: { $like: '%' + req.params.texto + '%' } },
						{ codigo: { $like: '%' + req.params.texto + '%' } },
						{ codigo_fabrica: { $like: '%' + req.params.texto + '%' } },
						{ descripcion: { $like: '%' + req.params.texto + '%' } },
						{ caracteristica_especial1: { $like: '%' + req.params.texto + '%' } },
						{ caracteristica_especial2: { $like: '%' + req.params.texto + '%' } }]
					}
				}).then(function (pEncontrado) {
					if (pEncontrado > 0) {
						Producto.findAll({
							where: {
								id_empresa: req.params.id_empresa,
								id_grupo: { $in: gurposUsuario },
								$or: [{ nombre: { $like: '%' + req.params.texto + '%' } },
								{ codigo: { $like: '%' + req.params.texto + '%' } },
								{ codigo_fabrica: { $like: '%' + req.params.texto + '%' } },
								{ descripcion: { $like: '%' + req.params.texto + '%' } },
								{ caracteristica_especial1: { $like: '%' + req.params.texto + '%' } },
								{ caracteristica_especial2: { $like: '%' + req.params.texto + '%' } }]
							},
							include: [{ model: ProductoTipoPrecio, as: 'tiposPrecio', where: { eliminado: false }, required: false, include: [{ model: Clase, as: 'tipoPrecio' }, { model: Sucursal, as: 'sucursal', attributes: ["id"], include: [{ model: Almacen, as: 'almacenes', attributes: ["id"] }] }] },
							{ model: ProductoPrecioPorSucursal, as: 'preciosPorSucursales', where: { eliminado: false }, required: false, include: [{ model: Sucursal, as: 'sucursal', attributes: ["id"], include: [{ model: Almacen, as: 'almacenes', attributes: ["id"] }] }] },
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
						}).then(function (productos) {
							res.json(productos);
						});
					} else {
						Producto.findAll({
							where: {
								id_empresa: req.params.id_empresa,
								id_grupo: { $in: gurposUsuario },
							},
							include: [{ model: ProductoTipoPrecio, as: 'tiposPrecio', where: { eliminado: false }, required: false, include: [{ model: Clase, as: 'tipoPrecio' }, { model: Sucursal, as: 'sucursal', attributes: ["id"], include: [{ model: Almacen, as: 'almacenes', attributes: ["id"] }] }] },
							{ model: ProductoPrecioPorSucursal, as: 'preciosPorSucursales', where: { eliminado: false }, required: false, include: [{ model: Sucursal, as: 'sucursal', attributes: ["id"], include: [{ model: Almacen, as: 'almacenes', attributes: ["id"] }] }] },
							{ model: Clase, as: 'tipoProducto' },
							{ model: Inventario, as: 'inventarios', where: { lote: { $like: '%' + req.params.texto + '%' }, id_almacen: req.params.id_almacen, cantidad: { $gte: 0 } } },
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
						}).then(function (productos) {
							res.json(productos);
						});
					}
				})

			})
		});

	router.route('/productos-venta/empresa/:id_empresa/texto/:texto/user/:id_usuario/almacen/:id_almacen/cliente/:id_cliente')
		.get(ensureAuthorizedlogged, function (req, res) {
			if (req.params.id_almacen === 0) {
				req.params.id_almacen = undefined
			}
			UsuarioGrupos.findAll({
				where: { id_usuario: req.params.id_usuario }
			}).then(function (grupos) {
				var gurposUsuario = grupos.map(function (grupo) {
					return grupo.id_grupo
				})
				Producto.count({
					where: {
						id_empresa: req.params.id_empresa,
						id_grupo: { $in: gurposUsuario },
						$or: [{ nombre: { $like: '%' + req.params.texto + '%' } },
						{ codigo: { $like: '%' + req.params.texto + '%' } },
						{ codigo_fabrica: { $like: '%' + req.params.texto + '%' } },
						{ descripcion: { $like: '%' + req.params.texto + '%' } },
						{ caracteristica_especial1: { $like: '%' + req.params.texto + '%' } },
						{ caracteristica_especial2: { $like: '%' + req.params.texto + '%' } }]
					}
				}).then(function (pEncontrado) {
					if (pEncontrado > 0) {
						Producto.findAll({
							attributes: Object.keys(Producto.attributes).concat([
								[sequelize.literal('(SELECT CONCAT_WS(",",`precio_unitario`, DATE_FORMAT(`detallesVenta.venta`.`fecha`,"%d/%m/%Y"))  FROM `inv_detalle_venta` AS `inv_detalle_venta` INNER  JOIN `inv_venta` AS `detallesVenta.venta` ON `inv_detalle_venta`.`venta` = `detallesVenta.venta`.`id` AND `detallesVenta.venta`.`cliente` = ' + req.params.id_cliente + ' WHERE `inv_detalle_venta`.`producto` = `agil_producto`.`id` ORDER BY `inv_detalle_venta`.`id` DESC LIMIT 1)'), 'precioVenta']]),
							where: {
								id_empresa: req.params.id_empresa,
								id_grupo: { $in: gurposUsuario },
								$or: [{ nombre: { $like: '%' + req.params.texto + '%' } },
								{ codigo: { $like: '%' + req.params.texto + '%' } },
								{ codigo_fabrica: { $like: '%' + req.params.texto + '%' } },
								{ descripcion: { $like: '%' + req.params.texto + '%' } },
								{ caracteristica_especial1: { $like: '%' + req.params.texto + '%' } },
								{ caracteristica_especial2: { $like: '%' + req.params.texto + '%' } }]
							},
							include: [
								{
									model: ProductoTipoPrecio, as: 'tiposPrecio',
									where: { eliminado: false }, required: false,
									include: [
										{ model: Clase, as: 'tipoPrecio' },
										{
											model: Sucursal, as: 'sucursal', attributes: ["id"],
											include: [{ model: Almacen, as: 'almacenes', attributes: ["id"] }]
										}
									]
								},
								{ model: ProductoPrecioPorSucursal, as: 'preciosPorSucursales', where: { eliminado: false }, required: false, include: [{ model: Sucursal, as: 'sucursal', attributes: ["id"], include: [{ model: Almacen, as: 'almacenes', attributes: ["id"] }] }] },
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
						}).then(function (productos) {
							res.json(productos);
						});
					} else {
						Producto.findAll({
							where: {
								id_empresa: req.params.id_empresa,
								id_grupo: { $in: gurposUsuario },
							},
							include: [{ model: ProductoTipoPrecio, as: 'tiposPrecio', where: { eliminado: false }, required: false, include: [{ model: Clase, as: 'tipoPrecio' }, { model: Sucursal, as: 'sucursal', attributes: ["id"], include: [{ model: Almacen, as: 'almacenes', attributes: ["id"] }] }] },
							{ model: ProductoPrecioPorSucursal, as: 'preciosPorSucursales', where: { eliminado: false }, required: false, include: [{ model: Sucursal, as: 'sucursal', attributes: ["id"], include: [{ model: Almacen, as: 'almacenes', attributes: ["id"] }] }] },
							{ model: Clase, as: 'tipoProducto' },
							{ model: Inventario, as: 'inventarios', where: { lote: { $like: '%' + req.params.texto + '%' }, id_almacen: req.params.id_almacen, cantidad: { $gte: 0 } } },
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
						}).then(function (productos) {
							res.json(productos);
						});
					}
				})

			})
		});

	router.route('/productos-codigo/empresa/:id_empresa/codigo/:texto')
		.get(ensureAuthorizedlogged, function (req, res) {
			var texto = req.params.texto;
			var id_empresa = req.params.id_empresa;
			Producto.findAll({
				where: { codigo: texto, id_empresa: id_empresa }
			}).then(function (productoCodigo) {
				res.json(productoCodigo);
			})
		});


	router.route('/inventarios-venta-edicion/producto/:id_producto/almacen/:id_almacen/fecha/:fecha')
		.get(ensureAuthorizedlogged, function (req, res) {
			var inicio = new Date(2014, 1, 1)
			var fin = new Date(req.params.fecha); fin.setHours(23, 59, 59, 0, 0);

			Inventario.findAll({
				where: { id_producto: req.params.id_producto, id_almacen: req.params.id_almacen, cantidad: { $gt: 0 } },
				include: [{ model: DetalleCompra, as: 'detallesCompra', include: [{ model: Compra, as: 'compra' }] }, {
					model: DetalleMovimiento, as: "detallesMovimiento",
					include: [{
						model: Movimiento, as: 'movimiento', where: { fecha: { $between: [inicio, fin] } },
						include: [{ model: Tipo, as: 'tipo', where: { nombre_corto: 'MOVING' } },
						{ model: Clase, as: 'clase' }]
					}]
				}],
				order: [['fecha_vencimiento', 'ASC']]
			}).then(function (inventarios) {
				res.json(inventarios);
			});
		});
	router.route('/inventarios/producto/:id_producto/almacen/:id_almacen/:lote?')
		.get(ensureAuthorizedlogged, function (req, res) {
			if (req.params.lote) {
				Inventario.findAll({
					where: { id_producto: req.params.id_producto, id_almacen: req.params.id_almacen, lote: req.params.lote, cantidad: { $gt: 0 } },
					include: [{
						model: DetalleMovimiento, as: "detallesMovimiento",
						include: [{
							model: Movimiento, as: 'movimiento',
							include: [{ model: Tipo, as: 'tipo', where: { nombre_corto: 'MOVING' } },
							{ model: Clase, as: 'clase' }]
						}]
					}],
					order: [['fecha_vencimiento', 'ASC']]
				}).then(function (inventarios) {
					res.json(inventarios);
				});
			} else {
				Inventario.findAll({
					where: { id_producto: req.params.id_producto, id_almacen: req.params.id_almacen, cantidad: { $gt: 0 } },
					include: [{
						model: DetalleMovimiento, as: "detallesMovimiento",
						include: [{
							model: Movimiento, as: 'movimiento',
							include: [{ model: Tipo, as: 'tipo', where: { nombre_corto: 'MOVING' } },
							{ model: Clase, as: 'clase' }]
						}]
					}],
					order: [['fecha_vencimiento', 'ASC']]
				}).then(function (inventarios) {
					res.json(inventarios);
				});
			}
		});
	router.route('/inventarios-antiguos/producto/:id_producto/almacen/:id_almacen/:lote?')
		.get(ensureAuthorizedlogged, async function (req, res) {
			try {
				let condicionInventario = { id_producto: req.params.id_producto, id_almacen: req.params.id_almacen };
				if (req.params.lote) {
					condicionInventario.lote = req.params.lote
				}
				let inventarios = await Inventario.findAll({
					where: condicionInventario,
					include: [{
						model: DetalleMovimiento, as: "detallesMovimiento",
						include: [{
							model: Movimiento, as: 'movimiento',
							include: [{ model: Tipo, as: 'tipo', where: { nombre_corto: 'MOVING' } },
							{ model: Clase, as: 'clase' }]
						}]
					}],
					order: [['fecha_vencimiento', 'ASC']]
				})
				for (const inventario of inventarios) {
					inventario.dataValues.ventasFactura=await Venta.findAll({
						include:[{model:Movimiento,as:'movimiento',
					include:[{model:DetalleMovimiento,as:'detallesMovimiento', where:{id_inventario:inventario.dataValues.id}},
					{model:Clase,as:'clase',where:{nombre_corto:'FACT'}}]}]
					})
					
					inventario.dataValues.ventasProforma=await Venta.findAll({
						include:[{model:Movimiento,as:'movimiento',
					include:[{model:DetalleMovimiento,as:'detallesMovimiento', where:{id_inventario:inventario.dataValues.id}},
					{model:Clase,as:'clase',where:{nombre_corto:'PFR'}}]}]
					})

					inventario.dataValues.ventasTraspaso=await Venta.findAll({
						include:[{model:Movimiento,as:'movimiento',
					include:[{model:DetalleMovimiento,as:'detallesMovimiento', where:{id_inventario:inventario.dataValues.id}},
					{model:Clase,as:'clase',where:{nombre_corto:'TRAS'}}]}]
					})

					inventario.dataValues.ventasTraspasoAlmacen=await Venta.findAll({
						include:[{model:Movimiento,as:'movimiento',
					include:[{model:DetalleMovimiento,as:'detallesMovimiento', where:{id_inventario:inventario.dataValues.id}},
					{model:Clase,as:'clase',where:{nombre_corto:'TRAS_ALM'}}]}]
					})

					inventario.dataValues.ventasBaja=await Venta.findAll({
						include:[{model:Movimiento,as:'movimiento',
					include:[{model:DetalleMovimiento,as:'detallesMovimiento', where:{id_inventario:inventario.dataValues.id}},
					{model:Clase,as:'clase',where:{nombre_corto:'BAJA'}}]}]
					})

					inventario.dataValues.ventasAjuste=await Venta.findAll({
						include:[{model:Movimiento,as:'movimiento',
					include:[{model:DetalleMovimiento,as:'detallesMovimiento', where:{id_inventario:inventario.dataValues.id}},
					{model:Clase,as:'clase',where:{nombre_corto:'AJU'}}]}]
					})

					inventario.dataValues.ventasServicio=await Venta.findAll({
						include:[{model:Movimiento,as:'movimiento',
					include:[{model:DetalleMovimiento,as:'detallesMovimiento', where:{id_inventario:inventario.dataValues.id}},
					{model:Clase,as:'clase',where:{nombre_corto:'SERV'}}]}]
					})

					inventario.dataValues.ventasConsumo=await Movimiento.findAll({						
					include:[{model:SolicitudReposicion,as:'solicitud'},{model:DetalleMovimiento,as:'detallesMovimiento', where:{id_inventario:inventario.dataValues.id}},
					{model:Clase,as:'clase',where:{nombre_corto:'CONSUM'}}]
					})

					inventario.dataValues.ventasMantenimiento=await Venta.findAll({
						include:[{model:Movimiento,as:'movimiento',
					include:[{model:DetalleMovimiento,as:'detallesMovimiento', where:{id_inventario:inventario.dataValues.id}},
					{model:Clase,as:'clase',where:{nombre_corto:'SMOT'}}]}]
					})

					inventario.dataValues.ventasDotacionEpps=await Venta.findAll({
						include:[{model:Movimiento,as:'movimiento',
					include:[{model:DetalleMovimiento,as:'detallesMovimiento', where:{id_inventario:inventario.dataValues.id}},
					{model:Clase,as:'clase',where:{nombre_corto:'EPPS'}}]}]
					})
				}
				res.json(inventarios);

			} catch (error) {
				res.json({ hasErr: true, mensaje: error.stack ? error.stack : error });
			}


		});
	router.route('/ventas-no-despachadas/sucursal/:id_sucursal')
		.get(ensureAuthorizedlogged, function (req, res) {
			Venta.findAll({
				where: { despachado: false },
				include: [{
					model: DetalleVenta, as: "detallesVenta",
					include: [{ model: Producto, as: "producto" }]
				},
				{ model: Almacen, as: 'almacen', where: { id_sucursal: req.params.id_sucursal } }],
				order: [['createdAt', 'ASC']]
			}).then(function (ventas) {
				res.json(ventas);
			});
		});

	router.route('/venta/:id_venta/despachar')
		.put(ensureAuthorizedlogged, function (req, res) {
			Venta.update({
				despachado: true
			}, {
				where: { id: req.params.id_venta }
			}).then(function (ven) {
				res.json({ mensaje: 'Se despacho la venta!' });
			});
		});

}