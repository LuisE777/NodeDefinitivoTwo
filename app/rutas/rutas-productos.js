module.exports = function (router, forEach, decodeBase64Image, fs, Empresa, Producto, Proveedor, Cliente, Clase, Inventario, ComisionVendedorProducto,
	Usuario, DetalleVenta, DetalleMovimiento, Movimiento, Venta, Compra, DetalleCompra, Almacen, Sucursal, signs3, Tipo, ProductoBase, sequelize,
	ContabilidadCuenta, UsuarioGrupos, ActivosFijos, ActivosFijosValores, ProductoTipoPrecio, Diccionario, ensureAuthorizedlogged, ProductoPromocion, ProductoPromocionPuntaje,
	ProductoPrecioPorSucursal, RrhhEmpleadoDotacionRopaItem, RrhhEmpleadoDotacionRopa, Persona, MedicoPaciente, VehiculoExterno, MantenimientoOrdenTrabajoMaterial, MantenimientoOrdenTrabajo, ProductoPadre, SolicitudReposicion) {
	router.route('/productos')
		.post(ensureAuthorizedlogged, function (req, res) {
			Producto.create({
				id_empresa: req.body.id_empresa,
				nombre: req.body.nombre,
				codigo: req.body.codigo,
				unidad_medida: req.body.unidad_medida?req.body.unidad_medida.descripcion:null,
				precio_unitario: req.body.precio_unitario,
				utilidad_esperada: req.body.utilidad_esperada,
				inventario_minimo: req.body.inventario_minimo,
				descripcion: req.body.descripcion,
				id_grupo: req.body.grupo.id,
				id_subgrupo: req.body.subgrupo.id,
				caracteristica_especial1: req.body.caracteristica_especial1,
				caracteristica_especial2: req.body.caracteristica_especial2,
				codigo_fabrica: req.body.codigo_fabrica,
				comision: req.body.comision,
				publicar_panel: req.body.publicar_panel,
				alerta: req.body.alerta,
				descuento: req.body.descuento,
				descuento_fijo: req.body.descuento_fijo,
				id_tipo_producto: req.body.tipoProducto.id,
				activar_inventario: req.body.activar_inventario,
				marca: req.body.marca,
				modelo: req.body.modelo,
				anio: req.body.anio,
				id_almacen_erp: (req.body.almacenErp ? req.body.almacenErp.id : null),
				id_cuenta: (req.body.cuenta ? req.body.cuenta.id : null),
				rango_positivo: req.body.rango_positivo,
				rango_negativo: req.body.rango_negativo,
				activo_fijo: req.body.activo_fijo,
				precio_unitario_dolares: req.body.precio_unitario_dolares,
				cantidad_prestacion_compra: req.body.cantidad_prestacion_compra,
				indice_rotacion: req.body.indice_rotacion,
				unidad_economica: req.body.unidad_economica,
				combo: req.body.combo,
				sujeto_mantenimiento: req.body.sujeto_mantenimiento,
				id_relacion: req.body.relacion ? req.body.relacion.id : null,
				usar_herencia: req.body.usar_herencia,
				codigoActividad:req.body.activEconomica?req.body.activEconomica.codigoCaeb: null,
				codigoProductoServ:req.body.productoServicio?req.body.productoServicio.codigoProducto:null,
				numero_imei:req.body.numero_imei?req.body.numero_imei:null,
				codigoUnidadMedida:req.body.unidad_medida?req.body.unidad_medida.codigoTipoUnidadMedida:null
			}).then(async function (productoCreado) {
				if (req.body.padres && req.body.padres.length > 0) {
					await ProductoPadre.destroy({
						where: {
							id_producto: productoCreado.id
						}})
					for (const padre of req.body.padres) {
						await ProductoPadre.create({
							id_producto_padre: padre.id,
							id_producto: productoCreado.id
						})


					}
				}
				req.body.productosBase.forEach(function (productoBase, index, array) {
					if (!productoBase.eliminado) {
						ProductoBase.create({
							id_producto: productoCreado.id,
							id_producto_base: productoBase.productoBase.id,
							formulacion: productoBase.productoBase.formulacion,
							habilitar_cambio: productoBase.habilitar_cambio ? productoBase.habilitar_cambio : false
						}).then(function (ProductoBaseCreado) {

						});
					}
				});
				if (req.body.sujeto_mantenimiento) {
					VehiculoExterno.create({
						marca: req.body.marca ? req.body.marca : null,
						chasis: req.body.codigo_fabrica ? req.body.codigo_fabrica : null,
						placa: req.body.codigo ? req.body.codigo : null,
						color: null,
						km: null,
						anio: req.body.anio ? req.body.anio : null,
						modelo: req.body.modelo ? req.body.modelo : null,
						id_empresa: req.body.id_empresa ? req.body.id_empresa.toString() : 0,
						id_producto: productoCreado.id
					})
						.then(vehiculoCreado => {
							console.log(vehiculoCreado);
						})
						.catch(err => {
							console.log('error', err);
						})
				}
				if (req.body.activo_fijo) {
					ActivosFijos.create({
						id_usuario: req.body.usuario,
						id_empresa: req.body.id_empresa,
						id_producto: productoCreado.dataValues.id,
						fecha_ingreso: new Date(req.body.fecha_ingreso.split('/').reverse()),
						revaluado: false,
						eliminado: false
					}).then(function (ACtivoCreado) {
						ActivosFijosValores.create({
							id_usuario: req.body.usuario,
							id_activo: ACtivoCreado.dataValues.id,
							mes: (new Date(req.body.fecha_ingreso.split('/').reverse()).getMonth() + 1),
							anio: (new Date(req.body.fecha_ingreso.split('/').reverse()).getFullYear()),
							valor: req.body.valor_actualizado,
							incremento_actualizacion: 0,
							valor_actualizado: req.body.valor_actualizado,
							depreciacion_acumulada: req.body.depreciacion_acumulada,
							incremento_actualizacion_depreciacion_acumulada: 0,
							depreciacion_acumulada_actualizada: req.body.depreciacion_acumulada,
							depreciacion: 0,//(req.body.depreciacion_acumulada/10)/12,
							total_depreciacion_acumulada: req.body.depreciacion_acumulada,
							valor_neto: req.body.valor_actualizado - req.body.depreciacion_acumulada,
							eliminado: false
						});
					})
				}

				Clase.find({
					where: { nombre_corto: 'OAL' }
				}).then(function (clase) {
					if (clase.nombre == "ONLINE") {
						var imagen;
						if (req.body.imagen.indexOf('default') > -1) {
							actualizarImagenProducto(productoCreado, req, res, null, req.body.imagen);
						} else {
							signs3('agil_imagenes/producto-' + productoCreado.id + '.jpg', 'image/jpeg', function (signedRequest, url) {
								actualizarImagenProducto(productoCreado, req, res, signedRequest, url);
							});
						}
					} else {
						var imagen;
						if (req.body.imagen.indexOf('default') > -1) {
							imagen = req.body.imagen;
						} else {
							var imagenProducto = decodeBase64Image(req.body.imagen);
							fs.writeFileSync('./img/producto-' + productoCreado.id + '.jpg', imagenProducto.data, 'base64', function (err) { });
							imagen = 'img/producto-' + productoCreado.id + '.jpg';
						}
						actualizarImagenProducto(productoCreado, req, res, null, imagen);
					}
				});
			});
		});

	//Ruta para crear un nuevo producto en compras
	router.route('/productos/compras')
		.post(ensureAuthorizedlogged, function (req, res) {
			Producto.create({
				id_empresa: req.body.id_empresa,
				nombre: req.body.nombre,
				codigo: req.body.codigo,
				id_grupo: req.body.grupo.id,
				unidad_medida: req.body.unidMedida?req.body.unidMedida.descripcion:null,
				id_tipo_producto: req.body.tipoProducto.id,
				codigoActividad: req.body.activEconomica?req.body.activEconomica.codigoCaeb:null,
				codigoProductoServ:req.body.productoServicio?req.body.productoServicio.codigoProducto:null,
				codigoUnidadMedida:req.body.unidMedida?req.body.unidMedida.codigoTipoUnidadMedida:null
			}).then(function (productoCreado) {
				req.body.productosBase.forEach(function (productoBase, index, array) {
					if (!productoBase.eliminado) {
						ProductoBase.create({
							id_producto: productoCreado.id,
							id_producto_base: productoBase.productoBase.id,
							formulacion: productoBase.productoBase.formulacion,
							habilitar_cambio: productoBase.habilitar_cambio ? productoBase.habilitar_cambio : false
						}).then(function (ProductoBaseCreado) {

						});
					}
				});

				Clase.find({
					where: { nombre_corto: 'OAL' }
				}).then(function (clase) {
					if (clase.nombre == "ONLINE") {
						var imagen;
						if (req.body.imagen.indexOf('default') > -1) {
							actualizarImagenProducto(productoCreado, req, res, null, req.body.imagen);
						} else {
							signs3('agil_imagenes/producto-' + productoCreado.id + '.jpg', 'image/jpeg', function (signedRequest, url) {
								actualizarImagenProducto(productoCreado, req, res, signedRequest, url);
							});
						}
					} else {
						var imagen;
						if (req.body.imagen.indexOf('default') > -1) {
							imagen = req.body.imagen;
						} else {
							var imagenProducto = decodeBase64Image(req.body.imagen);
							fs.writeFileSync('./img/producto-' + productoCreado.id + '.jpg', imagenProducto.data, 'base64', function (err) { });
							imagen = 'img/producto-' + productoCreado.id + '.jpg';
						}
						actualizarImagenProducto(productoCreado, req, res, null, imagen);
					}
				});
			});
		});

	router.route('/productos/empresa/:id_empresa')
		.get(ensureAuthorizedlogged, function (req, res) {
			Producto.findAll({
				where: { id_empresa: req.params.id_empresa, codigo: { $not: null } },
				include: [{ model: Empresa, as: 'empresa' }],
				order: [['codigo', 'ASC']]
			}).then(function (resp) {
				res.json(resp);
			});
		});

	router.route('/productos/kardex/empresa/:id_empresa/almacen/:id_almacen/grupo/:grupo')
		//saldo por producto
		.get(ensureAuthorizedlogged, function (req, res) {

			var condicion = { id_empresa: req.params.id_empresa, activar_inventario: true }
			if (req.params.grupo != 0) {
				condicion = { id_grupo: req.params.grupo, id_empresa: req.params.id_empresa, activar_inventario: true }
			}

			// var fechaInicial = new Date(2016, 1, 0);
			// var fechaFinal = new Date();
			// var condicionMovimiento = { id_almacen: req.params.id_almacen }
			// condicionMovimiento.fecha = { $between: [fechaInicial, fechaFinal]

			Producto.findAll({
				attributes: ['id', 'nombre', 'codigo', 'unidad_medida'],
				where: condicion,
				include: [{ model: Empresa, as: 'empresa', attributes: ['id', 'razon_social'] },
				{
					model: DetalleMovimiento, as: "detallesMovimiento", required: true,
					include: [{ model: Inventario, as: 'inventario' },
					{
						model: Movimiento, as: 'movimiento', required: true,
						include: [{
							model: Compra, as: 'compra', required: false,
							include: [{ model: Proveedor, as: 'proveedor' }]
						},
						{
							model: Venta, as: 'venta', required: false,
							include: [{ model: Cliente, as: 'cliente' }]
						},
						{
							model: Almacen, as: 'almacen', where: { id: req.params.id_almacen }, required: true,
							include: [{ model: Sucursal, as: 'sucursal' }]
						},
						{ model: Tipo, as: 'tipo' },
						{ model: Clase, as: 'clase' }]
					}
					],
					// order: [[{ model: Movimiento, as: 'movimiento' }, 'fecha', 'ASC']]
				}],

				order: [[{ raw: '`detallesMovimiento`.`createdAt` DESC' }]]

			}).then(function (resp) {
				res.json(resp);
			});
		});
	router.route('/productos/empresa/:id_empresa/user/:id_usuario')
		.get(ensureAuthorizedlogged, function (req, res) {
			UsuarioGrupos.findAll({
				where: { id_usuario: req.params.id_usuario }
			}).then(function (grupos) {
				var gruposUser = grupos.map(function (grupo) {
					return grupo.id_grupo
				})
				Producto.findAll({
					where: { id_empresa: req.params.id_empresa, codigo: { $not: null }, id_grupo: { $in: gruposUser } },
					include: [{ model: Empresa, as: 'empresa' }, { model: Clase, as: 'tipoProducto', where: { nombre_corto: Diccionario.TIPO_PRODUCTO_BASE } }],
					order: [['codigo', 'ASC']]
				}).then(function (resp) {
					res.json(resp);
				});
			})
		});
	router.route('/productos/kardex/:id_producto/almacen/:id_almacen/fecha-inicial/:fecha_inicio/fecha-final/:fecha_fin/lote/:lote/:saldo')
		.get(ensureAuthorizedlogged, function (req, res) {
			///pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion
			var condicionMovimiento = { id_almacen: req.params.id_almacen }
			var desde = false
			var hasta = false
			var fecha_desde;
			var fecha_hasta;
			// if (req.params.mes != "0" && req.params.anio != "0") {
			// 	var fecha_desde = new Date(parseInt(req.params.anio), parseInt(req.params.mes) - 1, 1, 0, 0, 0)
			// 	var fecha_hasta = new Date(parseInt(req.params.anio), parseInt(req.params.mes), -1, 0, 0, 0)
			// 	fecha_hasta.setHours(23)
			// 	fecha_hasta.setMinutes(59)
			// 	fecha_hasta.setSeconds(59)
			// 	condicionMovimiento.fecha = { $between: [fecha_desde, fecha_hasta] }
			// } else {
			if (req.params.fecha_inicio != "0") {
				fecha_desde = req.params.fecha_inicio.split('/').reverse().join('-') + "T00:00:00.000Z";
				// fecha_desde.setHours(0, 0, 0, 0, 0);
				desde = true
			}
			if (req.params.fecha_fin != "0") {
				fecha_hasta = req.params.fecha_fin.split('/').reverse().join('-') + "T23:59:59.000Z";
				// fecha_hasta.setHours(23)
				// fecha_hasta.setMinutes(59)
				// fecha_hasta.setSeconds(59)
				hasta = true
			}
			// }
			if (desde && hasta) {
				condicionMovimiento.fecha = { $between: [fecha_desde, fecha_hasta] }
			} else if (desde && !hasta) {
				condicionMovimiento.fecha = {
					$gte: [fecha_desde]
				}
			} else if (!desde && hasta) {
				condicionMovimiento.fecha = {
					$lte: [fecha_hasta]
				}
			}
			// else if (!desde && !hasta && (req.params.anio != "0")) {
			// 	if (req.params.mes != "0") {
			// 		fecha_desde = new Date(parseInt(req.params.anio), parseInt(req.params.mes) - 1, 1, 0, 0, 0, 0)
			// 		fecha_hasta = new Date(parseInt(req.params.anio), parseInt(req.params.mes), 1, 0, 0, 0, 0)
			// 	} else {
			// 		fecha_desde = new Date(parseInt(req.params.anio), 0, 1, 0, 0, 0, 0)
			// 		fecha_hasta = new Date(parseInt(req.params.anio), 11, 31, 23, 59, 59, 0)
			// 	}
			// 	condicionMovimiento.fecha = { $between: [fecha_desde, fecha_hasta] }
			// }
			// var fechaInicial = req.params.fecha_inicio == 0 ? new Date(2016, 1, 0) : new Date(2016, 1, 0)//new Date(req.params.fecha_inicio.split('/').reverse().join('-') + "T00:00:00.000Z");
			// var fechaFinal = req.params.fecha_inicio == 0 ? new Date() : new Date(req.params.fecha_inicio.split('/').reverse().join('-') + "T00:00:00.000Z");

			var condicionMovimientoSaldo = { id_almacen: req.params.id_almacen }
			var condicionDetalleMovimientoSaldoAnterior = { id_producto: req.params.id_producto }
			if (req.params.fecha_inicio != 0) {
				condicionMovimientoSaldo.fecha = { $lte: [req.params.fecha_inicio.split('/').reverse().join('-') + "T00:00:00.000Z"] }
			}
			var condicionInventario = { id_producto: req.params.id_producto };
			if (req.params.lote != "0") {
				condicionInventario.lote = req.params.lote
			}
			if (req.params.saldo != "0") {
				DetalleMovimiento.findAll({
					where: condicionDetalleMovimientoSaldoAnterior,
					include: [{
						model: Inventario, as: 'inventario', where: condicionInventario, include: [{
							model: DetalleCompra, as: 'detallesCompra', required: false,
							include: [
								{
									model: Compra, as: 'compra', required: false,
									include: [{ model: Clase, as: 'tipoMovimiento', required: false }]
								}
							]
						}]
					},
					{
						model: Movimiento, as: 'movimiento',
						where: condicionMovimientoSaldo,
						include: [{
							model: Compra, as: 'compra', required: false,
							include: [{ model: Proveedor, as: 'proveedor' }]
						},
						{
							model: Venta, as: 'venta', required: false,
							include: [{ model: Cliente, as: 'cliente' }]
						},
						{
							model: Venta, as: 'ventaEliminada', required: false,
							include: [{ model: Cliente, as: 'cliente', required: false }]
						},
						{
							model: SolicitudReposicion, as: 'solicitud', required: false,
							include: [{ model: Clase, as: 'area', required: false }]
						},
						{
							model: RrhhEmpleadoDotacionRopaItem, as: 'dotacionesRopaItem', required: false,
							include: [{
								model: RrhhEmpleadoDotacionRopa, as: 'dotacionRopa', required: false,
								include: [{
									model: MedicoPaciente, as: 'empleado', required: false,
									include: [{ model: Persona, as: 'persona', required: false }]
								}]
							}]
						},
						{
							model: MantenimientoOrdenTrabajoMaterial, as: 'materialTrabajo', required: false,
							include: [{ model: MantenimientoOrdenTrabajo, as: 'ordenTrabajo', required: false }]
						},
						{
							model: Almacen, as: 'almacen', required: false,
							include: [{ model: Sucursal, as: 'sucursal' }]
						},
						{ model: Tipo, as: 'tipo' },
						{ model: Clase, as: 'clase' }]
					}
					],
					order: [[{ model: Movimiento, as: 'movimiento' }, 'fecha', 'ASC']]
				}).then(function (productosSaldoAnterior) {
					DetalleMovimiento.findAll({
						where: { id_producto: req.params.id_producto },
						include: [{
							model: Inventario, as: 'inventario', where: condicionInventario, include: [{
								model: DetalleCompra, as: 'detallesCompra', required: false,
								include: [
									{
										model: Compra, as: 'compra', required: false,
										include: [{ model: Clase, as: 'tipoMovimiento', required: false }]
									}
								]
							}]
						},
						{
							model: Movimiento, as: 'movimiento',
							where: condicionMovimiento,
							include: [{
								model: Compra, as: 'compra', required: false,
								include: [{ model: Proveedor, as: 'proveedor' }]
							},
							{
								model: Venta, as: 'venta', required: false,
								include: [{ model: Cliente, as: 'cliente' }]
							},
							{
								model: Venta, as: 'ventaEliminada', required: false,
								include: [{ model: Cliente, as: 'cliente', required: false }]
							},
							{
								model: SolicitudReposicion, as: 'solicitud', required: false,
								include: [{ model: Clase, as: 'area', required: false }]
							},
							{
								model: RrhhEmpleadoDotacionRopaItem, as: 'dotacionesRopaItem', required: false,
								include: [{
									model: RrhhEmpleadoDotacionRopa, as: 'dotacionRopa', required: false,
									include: [{
										model: MedicoPaciente, as: 'empleado', required: false,
										include: [{ model: Persona, as: 'persona', required: false }]
									}]
								}]
							},
							{
								model: MantenimientoOrdenTrabajoMaterial, as: 'materialTrabajo', required: false,
								include: [{ model: MantenimientoOrdenTrabajo, as: 'ordenTrabajo', required: false }]
							},
							{
								model: Almacen, as: 'almacen', required: false,
								include: [{ model: Sucursal, as: 'sucursal' }]
							},
							{ model: Tipo, as: 'tipo' },
							{ model: Clase, as: 'clase' }]
						}
						],
						order: [[{ model: Movimiento, as: 'movimiento' }, 'fecha', 'ASC']]

					}).then(function (productos) {
						res.json({ saldoAnterior: productosSaldoAnterior, kardex: productos });
						/*DetalleMovimiento.findAll(limite).then(function (productos) {
							res.json({ kardex: productos, paginas: Math.ceil(datosCount.count / req.params.items_pagina) })
		
							//res.json(productos);
						});*/
					}).catch(function (err) {
						res.json({ mensaje: err.stack, hasErr: true, kardex: [] })
					})
				}).catch(function (err) {
					res.json({ mensaje: err.stack, hasErr: true, kardex: [] })
				})
			} else {
				DetalleMovimiento.findAll({
					where: { id_producto: req.params.id_producto },
					include: [{
						model: Inventario, as: 'inventario', where: condicionInventario, include: [{
							model: DetalleCompra, as: 'detallesCompra', required: false,
							include: [
								{
									model: Compra, as: 'compra', required: false,
									include: [{ model: Clase, as: 'tipoMovimiento', required: false }]
								}
							]
						}]
					},
					{
						model: Movimiento, as: 'movimiento',
						where: condicionMovimiento,
						include: [{
							model: Compra, as: 'compra', required: false,
							include: [{ model: Proveedor, as: 'proveedor' }]
						},
						{
							model: Venta, as: 'venta', required: false,
							include: [{ model: Cliente, as: 'cliente' }]
						},
						{
							model: Venta, as: 'ventaEliminada', required: false,
							include: [{ model: Cliente, as: 'cliente' }]
						},
						{
							model: SolicitudReposicion, as: 'solicitud', required: false,
							include: [{ model: Clase, as: 'area', required: false }]
						},
						{
							model: RrhhEmpleadoDotacionRopaItem, as: 'dotacionesRopaItem', required: false,
							include: [{
								model: RrhhEmpleadoDotacionRopa, as: 'dotacionRopa', required: false,
								include: [{
									model: MedicoPaciente, as: 'empleado', required: false,
									include: [{ model: Persona, as: 'persona', required: false }]
								}]
							}]
						},
						{
							model: MantenimientoOrdenTrabajoMaterial, as: 'materialTrabajo', required: false,
							include: [{ model: MantenimientoOrdenTrabajo, as: 'ordenTrabajo', required: false }]
						},
						{
							model: Almacen, as: 'almacen', required: false,
							include: [{ model: Sucursal, as: 'sucursal' }]
						},
						{ model: Tipo, as: 'tipo' },
						{ model: Clase, as: 'clase' }]
					}
					],
					order: [[{ model: Movimiento, as: 'movimiento' }, 'fecha', 'ASC']]

				}).then(function (productos) {
					res.json({ saldoAnterior: 0, kardex: productos });
					/*DetalleMovimiento.findAll(limite).then(function (productos) {
						res.json({ kardex: productos, paginas: Math.ceil(datosCount.count / req.params.items_pagina) })
	
						//res.json(productos);
					});*/
				}).catch(function (err) {
					res.json({ mensaje: err.stack, hasErr: true, kardex: [] })
				})
			}


			//	var busquedaQuery = (req.params.texto_busqueda === "0") ? "" : " AND p.nombre like '%" + req.params.texto_busqueda + "%'";
			// if (req.params.items_pagina != 0) {
			// 	var limite = {
			// 		where: { id_producto: req.params.id_producto },
			// 		offset: (req.params.items_pagina * (req.params.pagina - 1)),
			// 		limit: req.params.items_pagina,
			// 		include: [{ model: Inventario, as: 'inventario' },
			// 		{
			// 			model: Movimiento, as: 'movimiento',
			// 			where: condicionMovimiento,
			// 			include: [{
			// 				model: Compra, as: 'compra', required: false,
			// 				include: [{ model: Proveedor, as: 'proveedor' }]
			// 			},
			// 			{
			// 				model: Venta, as: 'venta', required: false,
			// 				include: [{ model: Cliente, as: 'cliente' }]
			// 			},
			// 			{
			// 				model: Almacen, as: 'almacen', required: false,
			// 				include: [{ model: Sucursal, as: 'sucursal' }]
			// 			},
			// 			{ model: Tipo, as: 'tipo' },
			// 			{ model: Clase, as: 'clase' }]
			// 		}
			// 		],
			// 		order: [[{ model: Movimiento, as: 'movimiento' }, 'fecha', 'ASC']]
			// 	}
			// } else {
			// 	var limite = {
			// 		where: { id_producto: req.params.id_producto },
			// 		include: [{ model: Inventario, as: 'inventario' },
			// 		{
			// 			model: Movimiento, as: 'movimiento',
			// 			where: condicionMovimiento,
			// 			include: [{
			// 				model: Compra, as: 'compra', required: false,
			// 				include: [{ model: Proveedor, as: 'proveedor' }]
			// 			},
			// 			{
			// 				model: Venta, as: 'venta', required: false,
			// 				include: [{ model: Cliente, as: 'cliente' }]
			// 			},
			// 			{
			// 				model: Almacen, as: 'almacen', required: false,
			// 				include: [{ model: Sucursal, as: 'sucursal' }]
			// 			},
			// 			{ model: Tipo, as: 'tipo' },
			// 			{ model: Clase, as: 'clase' }]
			// 		}
			// 		],
			// 		order: [[{ model: Movimiento, as: 'movimiento' }, 'fecha', 'ASC']]
			// 	}
			// }

			// DetalleMovimiento.findAll({
			// 	where: { id_producto: req.params.id_producto },
			// 	include: [{ model: Inventario, as: 'inventario' },
			// 	{
			// 		model: Movimiento, as: 'movimiento',
			// 		where: condicionMovimiento,
			// 		include: [{
			// 			model: Compra, as: 'compra', required: false,
			// 			include: [{ model: Proveedor, as: 'proveedor' }]
			// 		},
			// 		{
			// 			model: Venta, as: 'venta', required: false,
			// 			include: [{ model: Cliente, as: 'cliente' }]
			// 		},
			// 		{
			// 			model: Almacen, as: 'almacen', required: false,
			// 			include: [{ model: Sucursal, as: 'sucursal' }]
			// 		},
			// 		{ model: Tipo, as: 'tipo' },
			// 		{ model: Clase, as: 'clase' }]
			// 	}
			// 	],
			// 	order: [[{ model: Movimiento, as: 'movimiento' }, 'fecha', 'ASC']]

			// }).then(function (productos) {
			// 	res.json(productos);
			// 	/*DetalleMovimiento.findAll(limite).then(function (productos) {
			// 		res.json({ kardex: productos, paginas: Math.ceil(datosCount.count / req.params.items_pagina) })

			// 		//res.json(productos);
			// 	});*/
			// });
		});

	router.route('/productos/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/grupo/:id_grupo/user/:id_user/relacion/:id_relacion/sub-grupo/:id_sub_grupo')
		.get(function (req, res) {
			var gruposProductos = ''
			UsuarioGrupos.findAll({
				where: { id_usuario: req.params.id_user }
			}).then(function (grupos) {
				if (grupos.length == 0) {
					res.json({ productos: [], hasError: true, mensaje: 'Los grupos del usuario no cuentan con productos.' });
				} else {
					grupos.forEach(function (grupo, i) {
						if (i == grupos.length - 1) {
							gruposProductos += grupo.id_grupo + ''
						} else {
							gruposProductos += grupo.id_grupo + ','
						}
					})
					var condicionProducto = "empresa=" + req.params.id_empresa, paginas, limit;
					if (req.params.texto_busqueda != 0) {
						condicionProducto = condicionProducto + " and (\
					codigo LIKE '%"+ req.params.texto_busqueda + "%' or \
					producto.nombre LIKE '%"+ req.params.texto_busqueda + "%' or \
					unidad_medida LIKE '%"+ req.params.texto_busqueda + "%' or \
					descripcion LIKE '%"+ req.params.texto_busqueda + "%' or \
					grupo.nombre LIKE '%"+ req.params.texto_busqueda + "%' or \
					tipoProducto.nombre LIKE '"+ req.params.texto_busqueda + "' or \
					producto.caracteristica_especial1 LIKE '%"+ req.params.texto_busqueda + "%' or \
					producto.caracteristica_especial2 LIKE '%"+ req.params.texto_busqueda + "%' or \
					subgrupo.nombre LIKE '%"+ req.params.texto_busqueda + "%')";

					}
					if (req.params.id_grupo != 0) {
						condicionProducto += ' and producto.grupo =' + req.params.id_grupo
					}
					if (req.params.id_sub_grupo != 0) {
						condicionProducto += ' and producto.subgrupo =' + req.params.id_sub_grupo
					}
					if (req.params.id_relacion != 0) {
						condicionProducto += ' and producto.relacion =' + req.params.id_relacion
					}
					sequelize.query("select count(producto.id) as cantidad_productos \
								from agil_producto as producto \
								LEFT OUTER JOIN gl_clase AS tipoProducto ON (producto.tipo_producto = tipoProducto.id)\
								LEFT OUTER JOIN gl_clase AS grupo ON (producto.grupo = grupo.id) \
								LEFT OUTER JOIN gl_clase AS relacion ON (producto.relacion = relacion.id)\
								LEFT OUTER JOIN gl_clase AS subgrupo ON (producto.subgrupo = subgrupo.id) \
								WHERE "+ condicionProducto + " and producto.grupo in (" + gruposProductos + ")", { type: sequelize.QueryTypes.SELECT })
						.then(function (data) {
							if (req.params.items_pagina != 0) {
								limit = " LIMIT " + (req.params.items_pagina * (req.params.pagina - 1)) + "," + req.params.items_pagina;
								paginas = Math.ceil(data[0].cantidad_productos / req.params.items_pagina);
							} else {
								limit = "";
								paginas = 1;
							}
							sequelize.query("select relacion.nombre as nombre_relacion,producto.id,producto.caracteristica_especial1,producto.caracteristica_especial2,producto.publicar_panel,producto.activar_inventario,producto.codigo,producto.nombre as nombre,producto.imagen,producto.unidad_medida,producto.precio_unitario,producto.precio_unitario_dolares,producto.inventario_minimo,producto.usar_promocion,producto.descripcion,tipoProducto.nombre as tipoProducto,grupo.nombre as grupo,subgrupo.nombre as subgrupo\
						from agil_producto as producto\
						LEFT OUTER JOIN gl_clase AS tipoProducto ON (producto.tipo_producto = tipoProducto.id)\
						LEFT OUTER JOIN gl_clase AS grupo ON (producto.grupo = grupo.id)\
						LEFT OUTER JOIN gl_clase AS relacion ON (producto.relacion = relacion.id)\
						LEFT OUTER JOIN gl_clase AS subgrupo ON (producto.subgrupo = subgrupo.id)\
						WHERE "+ condicionProducto + " and producto.grupo in (" + gruposProductos + ")\
						ORDER BY producto."+ req.params.columna + " " + req.params.direccion + limit, { type: sequelize.QueryTypes.SELECT })
								.then(function (productos) {
									if (productos.length > 0) {
										var idsProductos = productos.map(function (producto) {
											return producto.id
										})
										ProductoTipoPrecio.findAll({
											where: { id_producto: { $in: idsProductos }, eliminado: false },
											include: [{ model: Clase, as: 'tipoPrecio' }]
										}).then(function (precios) {
											if (precios.length > 0) {
												for (var index = 0; index < productos.length; index++) {
													var tiposprecios = precios.filter(function (precio) {
														return precio.id_producto === productos[index].id
													})
													if (tiposprecios.length > 0) {
														var tiposPrecio = tiposprecios.map(function (data_precio) {
															// mensajetooltip += (data_precio.tipoPrecio.nombre + ':' + data_precio.precio_unitario + '&#013') // for linebreaks &#013;&#010;
															var dat = { nombre: data_precio.tipoPrecio.nombre, precio_unitario: data_precio.precio_unitario }
															return dat
														})
														productos[index].tipoPrecio = tiposPrecio
													} else {
														productos[index].tipoPrecio = []
													}
												}
												res.json({ productos: productos, paginas: paginas, precios: precios });
											} else {
												res.json({ productos: productos, paginas: paginas, precios: precios });
											}
										}).catch(function (err) {
											res.json({ productos: [], hasErr: true, mensaje: err.stack });
										});
									} else {
										res.json({ productos: productos, paginas: paginas });
									}

								}).catch(function (err) {
									res.json({ productos: [], hasErr: true, mensaje: err.stack });
								});
						}).catch(function (err) {
							res.json({ productos: [], hasErr: true, mensaje: err.stack });
						});
				}
			}).catch(function (err) {
				res.json({ productos: [], hasErr: true, mensaje: err.stack });
			})
		});

	router.route('/productos/empresa')
		.post(ensureAuthorizedlogged, function (req, res) {
			Tipo.find({
				where: {
					nombre_corto: 'TPS'
				},
				include: [{ model: Clase, as: 'clases', where: { eliminado: false } }]
			}).then(function (entidad) {
				var producto_base = entidad.clases.find(function (tipo) {
					return tipo.nombre_corto === 'PBASE'
				})
				var producto_intermedio = entidad.clases.find(function (tipo) {
					return tipo.nombre_corto === 'PINTER'
				})
				var producto_final = entidad.clases.find(function (tipo) {
					return tipo.nombre_corto === 'PFINAL'
				})
				// Clase.find({
				// 	where: { nombre_corto: 'PBASE' }
				// }).then(function (clase) {
				Tipo.find({
					where: {
						nombre_corto: "GRUPOS PRODUCTOS",
						id_empresa: req.body.id_empresa
					}
				}).then(function (tipoGrupoEncontrado) {
					Tipo.find({
						where: {
							nombre_corto: "SUBGRUPOS PRODUCTOS",
							id_empresa: req.body.id_empresa
						}
					}).then(function (tipoSubGrupoEncontrado) {
						req.body.productos.forEach(function (producto, index, array) {
							sequelize.transaction(function (t) {
								var tipo_producto;
								if (producto.tipo_producto === 'base') {
									tipo_producto = producto_base.id
									producto.activar_inventario = true
								}
								if (producto.tipo_producto === 'intermedio') {
									tipo_producto = producto_intermedio.id
									producto.activar_inventario = false
								}
								if (producto.tipo_producto === 'final') {
									tipo_producto = producto_final.id
									producto.activar_inventario = false
								}
								return Producto.find({
									where: {
										$or: [{ codigo: producto.codigo }],
										id_empresa: req.body.id_empresa
									},
									transaction: t
								}).then(function (productoEncontrado) {
									return Clase.findOrCreate({
										where: {
											nombre: producto.grupo,
											id_tipo: tipoGrupoEncontrado.id
										},
										defaults: {
											nombre: producto.grupo,
											id_tipo: tipoGrupoEncontrado.id,
											habilitado: true,
											eliminado: false
										},
										transaction: t,
										lock: t.LOCK.UPDATE
									}).spread(function (claseGrupoEncontrado, created) {
										return Clase.findOrCreate({
											where: {
												nombre: producto.subgrupo,
												id_tipo: tipoSubGrupoEncontrado.id
											},
											defaults: {
												nombre: producto.subgrupo,
												id_tipo: tipoSubGrupoEncontrado.id,
												habilitado: true,
												eliminado: false
											},
											transaction: t,
											lock: t.LOCK.UPDATE
										}).spread(function (claseSubGrupoEncontrado, created) {
											if (productoEncontrado) {
												return Producto.update({
													nombre: producto.nombre,
													codigo: producto.codigo,
													unidad_medida: producto.unidad_medida,
													precio_unitario: producto.precio_unitario,
													utilidad_esperada: producto.utilidad_esperada,
													inventario_minimo: producto.inventario_minimo,
													descripcion: producto.descripcion,
													id_grupo: claseGrupoEncontrado.id,
													id_subgrupo: claseSubGrupoEncontrado.id,
													caracteristica_especial1: producto.caracteristica_especial1,
													caracteristica_especial2: producto.caracteristica_especial2,
													imagen: './img/icon-producto-default.png',
													codigo_fabrica: producto.codigo_fabrica,
													comision: producto.comision,
													alerta: producto.alerta,
													descuento: producto.descuento,
													descuento_fijo: producto.descuento_fijo,
													marca: producto.marca,
													id_tipo_producto: tipo_producto ? tipo_producto : producto_base,
													activo_fijo: req.body.activo_fijo,
													activar_inventario: producto.activar_inventario,
													precio_unitario_dolares: req.body.precio_unitario_dolares,
													indice_rotacion: producto.indice_rotacion,
													usar_herencia: req.body.usar_herencia,

												}, {
													where: {
														id: productoEncontrado.id
													},
													transaction: t
												}).then(function (creado) {
													return new Promise(function (fulfill, reject) {
														fulfill(creado)
													});
												}).catch(function (err) {
													return new Promise(function (fulfill, reject) {
														reject((err.stack !== undefined) ? err.stack : err);
													});
												});
											} else {
												return Producto.create({
													id_empresa: req.body.id_empresa,
													nombre: producto.nombre,
													codigo: producto.codigo,
													unidad_medida: producto.unidad_medida,
													precio_unitario: producto.precio_unitario,
													utilidad_esperada: producto.utilidad_esperada,
													inventario_minimo: producto.inventario_minimo,
													descripcion: producto.descripcion,
													id_grupo: claseGrupoEncontrado.id,
													id_subgrupo: claseSubGrupoEncontrado.id,
													caracteristica_especial1: producto.caracteristica_especial1,
													caracteristica_especial2: producto.caracteristica_especial2,
													imagen: './img/icon-producto-default.png',
													codigo_fabrica: producto.codigo_fabrica,
													comision: producto.comision,
													alerta: producto.alerta,
													descuento: producto.descuento,
													descuento_fijo: producto.descuento_fijo,
													id_tipo_producto: tipo_producto ? tipo_producto : producto_base,
													marca: producto.marca,
													activo_fijo: producto.activo_fijo,
													activar_inventario: producto.activar_inventario,
													precio_unitario_dolares: producto.precio_unitario_dolares,
													indice_rotacion: producto.indice_rotacion,
													usar_herencia: req.body.usar_herencia,

												}, { transaction: t }).then(function (creado) {
													return new Promise(function (fulfill, reject) {
														fulfill(creado)
													});
												}).catch(function (err) {
													return new Promise(function (fulfill, reject) {
														reject((err.stack !== undefined) ? err.stack : err);
													});
												});
											}
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
								})
							}).then(function (result) {
								if (index === (array.length - 1)) {
									res.json({ mensaje: "¡Datos de Productos actualizados satisfactoriamente!" });
								}
							}).catch(function (err) {
								res.json({ hasError: true, mensaje: err.stack ? err.stack : err });
							});
						});


					}).catch(function (err) {
						res.json({ hasError: true, mensaje: err.stack });
					});
				}).catch(function (err) {
					res.json({ hasError: true, mensaje: err.stack });
				});
				// });
			}).catch(function (err) {
				res.json({ hasError: true, mensaje: err.stack });
			});;
		});

	function crearFormulacion(producto, req, t) {
		return Producto.find({
			where: {
				codigo: producto.codigo_final.toString(),
				id_empresa: req.params.id_empresa
			},
			transaction: t
		}).then(function (productoFinal) {
			if (productoFinal) {
				return Producto.find({
					where: {
						codigo: producto.codigo_base.toString(),
						id_empresa: req.params.id_empresa
					},
					transaction: t
				}).then(function (productoBase) {
					if (productoBase) {
						return ProductoBase.findOrCreate({
							where: {
								id_producto: productoFinal.dataValues.id,
								id_producto_base: productoBase.id
							},
							transaction: t,
							lock: t.LOCK.UPDATE,
							defaults: {
								id_producto: productoFinal.dataValues.id,
								id_producto_base: productoBase.id,
								formulacion: parseFloat(producto.formulacion),
								habilitar_cambio: productoBase.habilitar_cambio ? productoBase.habilitar_cambio : false
							}
						}).spread(function (ProductoCr, created) {
							if (!created) {
								return ProductoBase.update({
									id_producto: productoFinal.dataValues.id,
									id_producto_base: productoBase.id,
									formulacion: parseFloat(producto.formulacion),
									habilitar_cambio: productoBase.habilitar_cambio ? productoBase.habilitar_cambio : false
								}, { transaction: t, where: { id: ProductoCr.id } }).then(function (dato) {
									return new Promise(function (fullfill, reject) {
										fullfill()
									})
								});
							}
						})

					} else {
						return new Promise(function (fullfill, reject) {
							fullfill({ hasErr: true, mensaje: 'No se encuentra en la base de datos el producto: ' + producto.nombre_base + ' Código: ' + producto.codigo_base })
						})
					}
				});
			} else {
				return new Promise(function (fullfill, reject) {
					fullfill({ hasErr: true, mensaje: 'No se encuentra en la base de datos el producto: ' + producto.nombre_final + ' Código: ' + producto.codigo_final })
				})
			}
		});
	}

	router.route('/productos/formulacion/empresa/:id_empresa')
		.post(ensureAuthorizedlogged, function (req, res) {
			var promesas = []
			sequelize.transaction(function (t) {
				for (let index = 0; index < req.body.length; index++) {
					promesas.push(crearFormulacion(req.body[index], req, t))
				}
				return Promise.all(promesas)
			}).then(function (result) {
				if (result.length > 0) {
					var mensajes = []
					result.forEach(function (dato) {
						if (dato !== undefined) {
							if (dato.hasErr) {
								mensajes.push(dato.mensaje)
							}
						}
					});
					if (mensajes.length === result.length) {
						mensajes.unshift('No se guardo')
						res.json({ hasErr: true, mensaje: 'No se guardo', mensajes: mensajes })
					} else if (mensajes.length === 0) {
						res.json({ mensaje: 'Guardado correctamente.' })
					} else {
						mensajes.unshift('Cantidad guardados correctamente: ' + (result.length - mensajes.length) + ', Cantidad no guardados: ' + mensajes.length)
						res.json({ hasErr: true, mensaje: 'Cantidad guardados correctamente: ' + (result.length - mensajes.length) + ', Cantidad no guardados: ' + mensajes.length, mensajes: mensajes })
					}
				} else {
					res.json({ mensaje: 'No se guardo, ocurrio un error.' })
				}
				// res.json({ mensaje: "¡Formulación de Productos actualizados satisfactoriamente!" });
			}).catch(function (err) {
				res.json({ hasError: true, mensaje: err.stack });
			});
		});

	router.route('/productos/:id_producto')
		.put(ensureAuthorizedlogged, function (req, res) {
			Producto.update({
				id_empresa: req.body.id_empresa,
				nombre: req.body.nombre,
				codigo: req.body.codigo,
				unidad_medida: req.body.unidad_medida?req.body.unidad_medida.descripcion:null,
				precio_unitario: req.body.precio_unitario,
				utilidad_esperada: req.body.utilidad_esperada,
				inventario_minimo: req.body.inventario_minimo,
				descripcion: req.body.descripcion,
				id_grupo: req.body.grupo.id,
				id_subgrupo: req.body.subgrupo.id,
				caracteristica_especial1: req.body.caracteristica_especial1,
				caracteristica_especial2: req.body.caracteristica_especial2,
				//imagen:imagen,
				codigo_fabrica: req.body.codigo_fabrica,
				comision: req.body.comision,
				publicar_panel: req.body.publicar_panel,
				alerta: req.body.alerta,
				descuento: req.body.descuento,
				descuento_fijo: req.body.descuento_fijo,
				id_tipo_producto: req.body.tipoProducto.id,
				activar_inventario: req.body.activar_inventario,
				marca: req.body.marca,
				modelo: req.body.modelo,
				anio: req.body.anio,
				id_almacen_erp: (req.body.almacenErp ? req.body.almacenErp.id : null),
				id_cuenta: (req.body.cuenta ? req.body.cuenta.id : null),
				rango_positivo: req.body.rango_positivo,
				rango_negativo: req.body.rango_negativo,
				activo_fijo: req.body.activo_fijo,
				precio_unitario_dolares: req.body.precio_unitario_dolares,
				usar_promocion: req.body.usar_promocion,
				usar_promocion_en_dias_habilitados: req.body.usar_promocion_en_dias_habilitados,
				cantidad_prestacion_compra: req.body.cantidad_prestacion_compra,
				restar_solo_despacho: req.body.restar_solo_despacho,
				indice_rotacion: req.body.indice_rotacion,
				unidad_economica: req.body.unidad_economica,
				id_relacion: req.body.relacion ? req.body.relacion.id : null,
				combo: req.body.combo,
				sujeto_mantenimiento: req.body.sujeto_mantenimiento,
				usar_herencia: req.body.usar_herencia,
				codigoActividad:req.body.activEconomica?req.body.activEconomica.codigoCaeb:null,
				codigoProductoServ:req.body.productoServicio?req.body.productoServicio.codigoProducto:null,
				numero_imei:req.body.numero_imei?req.body.numero_imei: null,
				codigoUnidadMedida:req.body.unidad_medida?req.body.unidad_medida.codigoTipoUnidadMedida:null
			}, {
				where: {
					id: req.params.id_producto
				}
			}).then(async function (productoCreado) {
				if (req.body.padres && req.body.padres.length > 0) {
					await ProductoPadre.destroy({
						where: {
							id_producto: req.body.id
						}})
					for (const padre of req.body.padres) {
						await ProductoPadre.create({
							id_producto_padre: padre.id,
							id_producto: req.body.id
						})
					}
				}else{
					await ProductoPadre.destroy({
						where: {
							id_producto: req.body.id
						}})
				}
				if (req.body.sujeto_mantenimiento) {
					VehiculoExterno.findOne({ where: { id_producto: req.params.id_producto } })
						.then(data => {
							if (!data) {
								VehiculoExterno.create({
									marca: req.body.marca ? req.body.marca : null,
									chasis: req.body.codigo_fabrica ? req.body.codigo_fabrica : null,
									placa: req.body.codigo ? req.body.codigo : null,
									color: null,
									km: null,
									anio: req.body.anio ? req.body.anio : null,
									modelo: req.body.modelo ? req.body.modelo : null,
									id_empresa: req.body.id_empresa ? req.body.id_empresa.toString() : 0,
									id_producto: req.params.id_producto
								})
									.then(vehiculoCreado => {
										console.log(vehiculoCreado);
									})
									.catch(err => {
										console.log('error', err);
									})
							} else {
								VehiculoExterno.update({
									marca: req.body.marca ? req.body.marca : null,
									chasis: req.body.codigo_fabrica ? req.body.codigo_fabrica : null,
									placa: req.body.codigo ? req.body.codigo : null,
									anio: req.body.anio ? req.body.anio : null,
									modelo: req.body.modelo ? req.body.modelo : null,
								}, {
									where: { id_producto: req.params.id_producto }
								})
									.then(vehiculoCreado => {
										console.log(vehiculoCreado);
									})
									.catch(err => {
										console.log('error', err);
									})
							}
						})
						.catch(e => {
							console.log(e);
						})
				}
				if (req.body.activo_fijo) {
					ActivosFijos.findAll({
						where: { id_producto: req.params.id_producto, id_empresa: req.body.id_empresa, id_usuario: req.body.usuario, eliminado: false }
					}).then(function (existeActivo) {
						if (existeActivo.length > 0) {

							ActivosFijos.update({
								fecha_ingreso: new Date(req.body.fecha_ingreso.split('/').reverse())
							}, {
								where: { id: existeActivo[0].id }
							}
							).then(function (ACtivoCreado) {
								ActivosFijosValores.update({
									mes: (new Date(req.body.fecha_ingreso.split('/').reverse()).getMonth() + 1),
									anio: (new Date(req.body.fecha_ingreso.split('/').reverse()).getFullYear()),
									valor: req.body.valor_actualizado,
									incremento_actualizacion: 0,
									valor_actualizado: req.body.valor_actualizado,
									depreciacion_acumulada: req.body.depreciacion_acumulada,
									incremento_actualizacion_depreciacion_acumulada: 0,
									depreciacion_acumulada_actualizada: req.body.depreciacion_acumulada,
									depreciacion: 0,//(req.body.depreciacion_acumulada/10)/12,
									total_depreciacion_acumulada: req.body.depreciacion_acumulada,
									valor_neto: req.body.valor_actualizado - req.body.depreciacion_acumulada,
									eliminado: false
								}, {
									where: { id_activo: existeActivo[0].id }
								}
								);
							})
						} else {
							ActivosFijos.create({
								id_usuario: req.body.usuario,
								id_empresa: req.body.id_empresa,
								id_producto: req.params.id_producto,
								fecha_ingreso: new Date(req.body.fecha_ingreso.split('/').reverse()),
								revaluado: false,
								eliminado: false
							}).then(function (ACtivoCreado) {
								ActivosFijosValores.create({
									id_usuario: req.body.usuario,
									id_activo: ACtivoCreado.dataValues.id,
									mes: (new Date(req.body.fecha_ingreso.split('/').reverse()).getMonth() + 1),
									anio: (new Date(req.body.fecha_ingreso.split('/').reverse()).getFullYear()),
									valor: req.body.valor_actualizado,
									incremento_actualizacion: 0,
									valor_actualizado: req.body.valor_actualizado,
									depreciacion_acumulada: req.body.depreciacion_acumulada,
									incremento_actualizacion_depreciacion_acumulada: 0,
									depreciacion_acumulada_actualizada: req.body.depreciacion_acumulada,
									depreciacion: 0,//(req.body.depreciacion_acumulada/10)/12,
									total_depreciacion_acumulada: req.body.depreciacion_acumulada,
									valor_neto: req.body.valor_actualizado,
									eliminado: false
								});
							})
						}
					});
				}

				req.body.productosBase.forEach(function (productoBase, index, array) {
					if (productoBase.eliminado) {
						ProductoBase.destroy({
							where: { id: productoBase.id }
						}).then(function (productoBaseEliminado) {

						});
					} else {
						if (productoBase.id) {
							ProductoBase.update({
								id_producto: productoCreado.id,
								id_producto_base: productoBase.productoBase.id,
								formulacion: productoBase.productoBase.formulacion,
								habilitar_cambio: productoBase.habilitar_cambio ? productoBase.habilitar_cambio : false
							}, {
								where: { id: productoBase.id }
							}).then(function (productoBaseActualizado) {

							});
						} else {
							ProductoBase.create({
								id_producto: req.params.id_producto,
								id_producto_base: productoBase.productoBase.id,
								formulacion: productoBase.productoBase.formulacion,
								habilitar_cambio: productoBase.habilitar_cambio ? productoBase.habilitar_cambio : false
							}).then(function (productoBaseCreado) {

							});
						}
					}
				});
				Clase.find({
					where: { nombre_corto: 'OAL' }
				}).then(function (clase) {
					if (clase.nombre == "ONLINE") {
						if ((req.body.imagen.indexOf('default') > -1 || req.body.imagen.indexOf("producto-" + req.body.id) > -1 || req.body.imagen.indexOf(req.body.id) > -1) && req.body.imagen.length < 200) {
							actualizarImagenProducto(req.body, req, res, null, req.body.imagen);
						} else {
							signs3('agil_imagenes/producto-' + req.body.id + '.jpg', 'image/jpeg', function (signedRequest, url) {
								actualizarImagenProducto(req.body, req, res, signedRequest, url);
							});
						}
					} else {
						if ((req.body.imagen.indexOf('default') > -1 || req.body.imagen.indexOf("producto-" + req.body.id) > -1 || req.body.imagen.indexOf(req.body.id) > -1) && req.body.imagen.length < 200) {
							actualizarImagenProducto(req.body, req, res, null, req.body.imagen);
						} else {
							var imgPerson = decodeBase64Image(req.body.imagen);
							fs.writeFileSync('./img/producto-' + req.body.id + '.jpg', imgPerson.data, 'base64', function (err) { });
							var imagen = 'img/producto-' + req.body.id + '.jpg';
							actualizarImagenProducto(req.body, req, res, null, imagen);
						}
					}
				});
			});
		})

		.delete(function (req, res) {
			DetalleMovimiento.find({
				where: {
					id_producto: req.params.id_producto
				},
			}).then(function (detalleMovimientoProducto) {
				if (!detalleMovimientoProducto) {
					Producto.destroy({
						where: {
							id: req.params.id_producto
						}
					}).then(function (affectedRows) {
						res.json({ message: "Eliminado Satisfactoriamente!" });
					});
				} else {
					res.json({ movimiento: detalleMovimientoProducto, message: "Atencion no se puede eliminar este item porque tiene movimientos!" });
				}

			})

		})

		.get(ensureAuthorizedlogged, function (req, res) {
			Producto.find({

				where: { id: req.params.id_producto },
				include: [
					{ model: Empresa, as: 'empresa' }, /* { model: Clase, as: 'relacion' }, */
					{ model: ActivosFijos, as: 'activo', include: [{ model: ActivosFijosValores, as: 'valores'/* ,attributes: ['incremento_actualizacion', 'varlor_actualizado'] */ }] },
					{ model: Clase, as: 'tipoProducto' },
					{ model: Clase, as: 'grupo' },
					{ model: ProductoTipoPrecio, as: 'tiposPrecio', required: false, where: { eliminado: false }, include: [{ model: Clase, as: 'tipoPrecio' }, { model: Sucursal, as: 'sucursal' }] },
					{ model: ProductoPrecioPorSucursal, as: 'preciosPorSucursales', required: false, include: [{ model: Sucursal, as: 'sucursal' }] },
					{ model: Clase, as: 'subgrupo' },
					{
						model: Almacen, as: 'almacenErp',
						include: [{ model: Sucursal, as: 'sucursal' },]
					},
					{ model: ContabilidadCuenta, as: 'cuenta' },
					{
						model: ProductoBase, as: 'productosBase',
						include: [{ model: Producto, as: 'productoBase' }]
					}]
			}).then(async function (producto) {
				padres = await ProductoPadre.findAll({
					where: {
						id_producto: producto.dataValues.id
					},
					include: [{ model: Producto, as: 'padre' }]
				})

				producto.dataValues.padres = []
				if (padres.length > 0) {
					for (const value of padres) {
						producto.dataValues.padres.push(value.padre)
					}


				}
				res.json(producto);
			});
		});

	function actualizarImagenProducto(productoCreado, req, res, signedRequest, imagen) {
		Producto.update({
			imagen: imagen
		}, {
			where: { id: productoCreado.id }
		}).then(function (affecteedRows) {
			if (req.body.tiposPrecio.length > 0) {
				req.body.tiposPrecio.forEach(function (tipoP, index, array) {
					if (tipoP.id) {
						ProductoTipoPrecio.update({
							id_producto: productoCreado.id,
							id_sucursal: tipoP.sucursal.id,
							id_tipo_precio: tipoP.tipoPrecio.id,
							precio_unitario: tipoP.precio_unitario,
							rango_positivo: tipoP.rango_positivo,
							rango_negativo: tipoP.rango_negativo,
							eliminado: tipoP.eliminado
						}, {
							where: { id: tipoP.id }
						}).then(function (actualizado) {
							if (index === (array.length - 1)) {
								CrearProductosPorSucursal(productoCreado, req, res, signedRequest, imagen)
							}
						})
					} else {
						ProductoTipoPrecio.create({
							id_producto: productoCreado.id,
							id_sucursal: tipoP.sucursal.id,
							id_tipo_precio: tipoP.tipoPrecio.id,
							precio_unitario: tipoP.precio_unitario,
							rango_positivo: tipoP.rango_positivo,
							rango_negativo: tipoP.rango_negativo,
							eliminado: false
						}).then(function (creado) {
							if (index === (array.length - 1)) {
								CrearProductosPorSucursal(productoCreado, req, res, signedRequest, imagen)
							}
						})
					}

				})
			} else {
				CrearProductosPorSucursal(productoCreado, req, res, signedRequest, imagen)
			}
		});
	}
	function CrearProductosPorSucursal(productoCreado, req, res, signedRequest, imagen) {
		if (req.body.preciosPorSucursales ? req.body.preciosPorSucursales.length : 0 > 0) {
			req.body.preciosPorSucursales.forEach(function (precioSucursal, index, array) {
				if (precioSucursal.id) {
					ProductoPrecioPorSucursal.update({
						id_producto: productoCreado.id,
						id_sucursal: precioSucursal.sucursal.id,
						precio_unitario: precioSucursal.precio_unitario,
						rango_positivo: precioSucursal.rango_positivo,
						rango_negativo: precioSucursal.rango_negativo,
						eliminado: precioSucursal.eliminado
					}, {
						where: { id: precioSucursal.id }
					}).then(function (actualizado) {
						if (index === (array.length - 1)) {
							res.json({ producto: productoCreado, url: imagen, signedRequest: signedRequest, image_name: 'producto-' + productoCreado.id + '.jpg' });
						}
					})
				} else {
					ProductoPrecioPorSucursal.create({
						id_producto: productoCreado.id,
						id_sucursal: precioSucursal.sucursal.id,
						precio_unitario: precioSucursal.precio_unitario,
						rango_positivo: precioSucursal.rango_positivo,
						rango_negativo: precioSucursal.rango_negativo,
						eliminado: false
					}).then(function (creado) {
						if (index === (array.length - 1)) {
							res.json({ producto: productoCreado, url: imagen, signedRequest: signedRequest, image_name: 'producto-' + productoCreado.id + '.jpg' });
						}
					})
				}

			})
		} else {
			res.json({ producto: productoCreado, url: imagen, signedRequest: signedRequest, image_name: 'producto-' + productoCreado.id + '.jpg' });
		}
	}
	router.route('/productos/productos-padre/:id_empresa')
		.get(ensureAuthorizedlogged, async function (req, res) {
			try {
				let productos = await Producto.findAll({ where: { usar_herencia: true, id_empresa: req.params.id_empresa } })
				res.json({ productos: productos })
			} catch (err) {
				res.json({ hasError: true, mensaje: (err.stack) ? err.stack : err });
			}
		})
	router.route('/productos/empresa/:id_empresa/cliente/:id_cliente/texto/:texto/sucursales/:ids')
		.get(ensureAuthorizedlogged, function (req, res) {
			var condicionProducto = { id_empresa: req.params.id_empresa };
			if (req.params.texto != 0) {
				condicionProducto = { id_empresa: req.params.id_empresa, $or: [{ nombre: { $like: '%' + req.params.texto + '%' } }, { codigo: req.params.texto }, { descripcion: { $like: '%' + req.params.texto + '%' } }] };
			}

			Producto.findAll({
				where: condicionProducto,
				include: [{
					model: DetalleVenta, as: 'detallesVenta',
					include: [{ model: Venta, as: 'venta', where: { id_cliente: req.params.id_cliente } }]
				},
				{ model: Clase, as: 'tipoProducto' },
				{
					model: Inventario, as: 'inventarios', where: { id_almacen: { $not: null } }, required: false,
					include: [{ model: Almacen, as: 'almacen', where: { id_sucursal: { $in: req.params.ids.split(',') } } }]
				}],
				order: [['nombre', 'ASC']]
			}).then(function (productos) {
				productos = (productos) ? productos : [];
				var ids = [];
				for (var i = 0; i < productos.length; i++) {
					ids.push(productos[i].id);;
				}
				var condicionProductosRestantes;
				condicionProductosRestantes = (ids.length > 0) ? { id: { $notIn: ids }, id_empresa: req.params.id_empresa } : {};
				if (req.params.texto != 0 && ids.length > 0) {
					condicionProductosRestantes = { id: { $notIn: ids }, id_empresa: req.params.id_empresa, $or: [{ nombre: { $like: '%' + req.params.texto + '%' } }, { codigo: req.params.texto }, { descripcion: { $like: '%' + req.params.texto + '%' } }] }
				} else if (req.params.texto != 0 && ids.length == 0) {
					condicionProductosRestantes = { id_empresa: req.params.id_empresa, $or: [{ nombre: { $like: '%' + req.params.texto + '%' } }, { codigo: req.params.texto }, { descripcion: { $like: '%' + req.params.texto + '%' } }] }
				}
				Producto.findAll({
					where: condicionProductosRestantes,
					include: [{
						model: Inventario, as: 'inventarios', where: { id_almacen: { $not: null } }, required: false,
						include: [{ model: Almacen, as: 'almacen', where: { id_sucursal: { $in: req.params.ids.split(',') } } }]
					},
					{ model: Clase, as: 'tipoProducto' }],
					order: [['nombre', 'ASC']]
				}).then(function (productosRestantes) {
					productos = productos.concat(productosRestantes);
					res.json(productos);
				});
			});
		});

	router.route('/productos-panel/paginacion/empresa/:id_empresa/almacen/:id_almacen/user/:id_usuario/pagina/:pagina/texto/:texto/grupo/:id_grupo')
		.get(ensureAuthorizedlogged, function (req, res) {
			UsuarioGrupos.findAll({
				where: { id_usuario: req.params.id_usuario }
			}).then(function (grupos) {
				var gruposUsuario = grupos.map(function (grupo) {
					return grupo.id_grupo
				})
				var uuu = req.params.pagina;
				var condicionGrupo = { $in: gruposUsuario }
				if (req.params.id_grupo != 0) {
					condicionGrupo = req.params.id_grupo;
				}

				var condicionProducto = { id_empresa: req.params.id_empresa, publicar_panel: true, id_grupo: condicionGrupo, usar_herencia: false };
				if (req.params.texto != 0) {
					condicionProducto = { id_empresa: req.params.id_empresa, publicar_panel: true, id_grupo: condicionGrupo, usar_herencia: false, $or: [{ nombre: { $like: '%' + req.params.texto + '%' } }, { codigo: req.params.texto }, { descripcion: { $like: '%' + req.params.texto + '%' } }] };
				}

				Producto.findAll({
					offset: (15 * (req.params.pagina - 1)), limit: 15,
					where: condicionProducto,
					include: [{ model: ProductoPromocion, as: 'promociones', required: false, where: { habilitado: true }, include: [{ model: Clase, as: 'dia' }] },
					{ model: ProductoTipoPrecio, as: 'tiposPrecio', where: { eliminado: false }, required: false, include: [{ model: Clase, as: 'tipoPrecio' }, { model: Sucursal, as: 'sucursal', attributes: ["id"], include: [{ model: Almacen, as: 'almacenes', attributes: ["id"] }] }] },
					{ model: ProductoPrecioPorSucursal, as: 'preciosPorSucursales', where: { eliminado: false }, required: false, include: [{ model: Sucursal, as: 'sucursal', attributes: ["id"], include: [{ model: Almacen, as: 'almacenes', attributes: ["id"] }] }] },
					{ model: Inventario, as: 'inventarios', required: false, where: { id_almacen: req.params.id_almacen, cantidad: { $gte: 0 } } },
					{ model: Clase, as: 'tipoProducto' },
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
					}],
					order: [['createdAt', 'DESC']]
				}).then(function (productos) {
					res.json(productos);
				}).catch(function (err) {
					res.json([{ hasError: true, mensaje: err.stack + '---LN 523 rutas productos' }]);
				});
			}).catch(function (err) {
				res.json([{ hasError: true, mensaje: err.stack + '---LN 517 rutas productos' }]);
			});
		});
	router.route('/venta-lista-hermanos-productos-editables/almacen/:id_almacen')
		.put(ensureAuthorizedlogged, async function (req, res) {
			index = 0
			for (const producto of req.body) {
				producto.listaHermanos = []
				/* 	clase = await Clase.find({
						where: { id: producto.productoBase.id_relacion },
						include: [{ model: Clase, as: 'padre' }]
					}) */
				condicionRelacionPadre = { id_producto_padre: producto.productoBase.id_padre }
				data = await Producto.findAll({
					where: condicionRelacionPadre,
					include: [{
						model: ProductoPadre, as: 'hijos',
						where: condicionRelacionPadre
					}, { model: Clase, as: 'grupo' }, { model: ProductoPromocion, as: 'promociones', required: false, where: { habilitado: true }, include: [{ model: Clase, as: 'dia' }] },
					{ model: ProductoTipoPrecio, as: 'tiposPrecio', where: { eliminado: false }, required: false, include: [{ model: Clase, as: 'tipoPrecio' }, { model: Sucursal, as: 'sucursal', attributes: ["id"], include: [{ model: Almacen, as: 'almacenes', attributes: ["id"] }] }] },
					{ model: ProductoPrecioPorSucursal, as: 'preciosPorSucursales', where: { eliminado: false }, required: false, include: [{ model: Sucursal, as: 'sucursal', attributes: ["id"], include: [{ model: Almacen, as: 'almacenes', attributes: ["id"] }] }] },
					{ model: Inventario, as: 'inventarios', required: false, where: { id_almacen: req.params.id_almacen, cantidad: { $gte: 0 } } },
					{ model: Clase, as: 'tipoProducto' },
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
					}],
				})
				producto.listaHermanos = data
				index++
				if (index == (req.body.length)) {
					res.json({ productos: req.body })
				}
			}
		});
	router.route('/productos-panel-relacion/paginacion/empresa/:id_empresa/almacen/:id_almacen/user/:id_usuario/pagina/:pagina/texto/:texto/grupo/:id_grupo/padre/:id_padre')
		.get(ensureAuthorizedlogged, async function (req, res) {
			UsuarioGrupos.findAll({
				where: { id_usuario: req.params.id_usuario }
			}).then(async function (grupos) {
				let productoPadre = {
					model: ProductoPadre, as: 'hijos', required: false,
					where: condicionRelacionPadre
				}
				var condicionRelacionPadre = {}
				var gruposUsuario = grupos.map(function (grupo) {
					return grupo.id_grupo
				})
				var uuu = req.params.pagina;
				var condicionGrupo = { $in: gruposUsuario }
				if (req.params.id_grupo != 0) {
					condicionGrupo = req.params.id_grupo;
				}

				var condicionProducto = { id_empresa: req.params.id_empresa, publicar_panel: true, id_grupo: condicionGrupo };
				if (req.params.texto != 0) {
					condicionProducto = { id_empresa: req.params.id_empresa, publicar_panel: true, id_grupo: condicionGrupo, $or: [{ nombre: { $like: '%' + req.params.texto + '%' } }, { codigo: req.params.texto }, { descripcion: { $like: '%' + req.params.texto + '%' } }] };
				}
				if (req.params.id_padre != 0) {
					let hijos = await ProductoPadre.findAll({
						attributes: [[sequelize.fn('GROUP_CONCAT', sequelize.fn('DISTINCT', sequelize.col('`producto`'))), 'ids']],
						where: { id_producto_padre: req.params.id_padre }
					})
					//condicionRelacionPadre = { id_producto_padre: req.params.id_padre }
					condicionProducto.id = { $in: hijos[0].dataValues.ids.split(',') }
				} else {
					condicionProducto.usar_herencia = true
					condicionProducto.id = sequelize.literal('`agil_producto`.id not IN (SELECT producto FROM agil_producto_padre)')
				}
				Producto.findAll({
					where: condicionProducto,
					include: [productoPadre, { model: Clase, as: 'grupo' }, { model: ProductoPromocion, as: 'promociones', required: false, where: { habilitado: true }, include: [{ model: Clase, as: 'dia' }] },
						{ model: ProductoTipoPrecio, as: 'tiposPrecio', where: { eliminado: false }, required: false, include: [{ model: Clase, as: 'tipoPrecio' }, { model: Sucursal, as: 'sucursal', attributes: ["id"], include: [{ model: Almacen, as: 'almacenes', attributes: ["id"] }] }] },
						{ model: ProductoPrecioPorSucursal, as: 'preciosPorSucursales', where: { eliminado: false }, required: false, include: [{ model: Sucursal, as: 'sucursal', attributes: ["id"], include: [{ model: Almacen, as: 'almacenes', attributes: ["id"] }] }] },
						{ model: Inventario, as: 'inventarios', required: false, where: { id_almacen: req.params.id_almacen, cantidad: { $gte: 0 } } },
						{ model: Clase, as: 'tipoProducto' },
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
						}],
					order: [['createdAt', 'DESC']]
				}).then(function (productos) {
					res.json(productos);
				}).catch(function (err) {
					res.json([{ hasError: true, mensaje: err.stack + '---LN 523 rutas productos' }]);
				});
			}).catch(function (err) {
				res.json([{ hasError: true, mensaje: err.stack + '---LN 517 rutas productos' }]);
			});
		});
		router.route('/productos-padre/:id_padre')
		.get(ensureAuthorizedlogged,async  function (req, res) {
			try {
				
		
			let ids=req.params.id_padre.split(",")
			/* let ids2=[]
			for (const value of ids) {
				ids2.push(parseInt(value))
			} */
			let padre = await ProductoPadre.find({
				where:{id_producto:{$in:req.params.id_padre.split(",")}}
			});
			if(padre){
			padreAnterior = await ProductoPadre.find({
				where:{id_producto:padre.id_producto_padre}
			});
		}
			res.json({id:padreAnterior?padreAnterior.id_producto_padre:0})
		} catch (error) {
			console.log(error)	
		}
		});
	router.route('/productos-panel/empresa/:id_empresa/almacen/:id_almacen/user/:id_usuario')
		.get(ensureAuthorizedlogged, function (req, res) {
			UsuarioGrupos.findAll({
				where: { id_usuario: req.params.id_usuario }
			}).then(function (grupos) {
				var gruposUsuario = grupos.map(function (grupo) {
					return grupo.id_grupo
				})
				Producto.findAll({
					where: { id_empresa: req.params.id_empresa, publicar_panel: true, id_grupo: { $in: gruposUsuario } },
					include: [
						{ model: ProductoTipoPrecio, as: 'tiposPrecio', required: false, include: [{ model: Clase, as: 'tipoPrecio' }] },
						{ model: Inventario, as: 'inventarios', required: false, where: { id_almacen: req.params.id_almacen, cantidad: { $gte: 0 } } },
						{ model: Clase, as: 'tipoProducto' },
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
						}],
					order: [[{ model: Inventario, as: 'inventarios' }, 'updatedAt', 'DESC']]
				}).then(function (productos) {
					res.json(productos);
				}).catch(function (err) {
					res.json([{ hasError: true, mensaje: err.stack + '---LN 523 rutas productos' }]);
				});
			}).catch(function (err) {
				res.json([{ hasError: true, mensaje: err.stack + '---LN 517 rutas productos' }]);
			});
		});

	router.route('/productos-app/empresa/:id_empresa/user/:id_usuario')
		.get(function (req, res) {
			UsuarioGrupos.findAll({
				where: { id_usuario: req.params.id_usuario }
			}).then(function (grupos) {
				var gruposUsuario = grupos.map(function (grupo) {
					return grupo.id_grupo
				})
				Producto.findAll({
					where: { id_empresa: req.params.id_empresa, publicar_panel: true, id_grupo: { $in: gruposUsuario } },
					order: [['updatedAt', 'DESC']]
				}).then(function (productos) {
					res.json({ productos: productos });
				}).catch(function (err) {
					res.json([{ hasError: true, mensaje: err.stack + '---LN 523 rutas productos' }]);
				});
			}).catch(function (err) {
				res.json([{ hasError: true, mensaje: err.stack + '---LN 517 rutas productos' }]);
			});
		});

	router.route('/productos-panel/empresa/:id_empresa/user/:id_usuario')
		.get(ensureAuthorizedlogged, function (req, res) {
			UsuarioGrupos.findAll({
				where: { id_usuario: req.params.id_usuario }
			}).then(function (grupos) {
				var gruposUsuario = grupos.map(function (grupo) {
					return grupo.id_grupo
				})
				Producto.findAll({
					where: { id_empresa: req.params.id_empresa, publicar_panel: true, id_grupo: { $in: gruposUsuario } },
					include: [
						{ model: ProductoTipoPrecio, as: 'tiposPrecio', required: false, include: [{ model: Clase, as: 'tipoPrecio' }] },
						{ model: Inventario, as: 'inventarios', required: false, include: [{ model: Almacen, as: 'almacen' }] },
						{ model: Clase, as: 'tipoProducto' },
						{
							model: ProductoBase, as: 'productosBase', required: false,
							include: [{
								model: Producto, as: 'productoBase', required: false,
								include: [{ model: Inventario, as: 'inventarios', required: false, include: [{ model: Almacen, as: 'almacen' }] },
								{ model: Clase, as: 'tipoProducto' },
								{
									model: ProductoBase, as: 'productosBase', required: false,
									include: [{
										model: Producto, as: 'productoBase', required: false,
										include: [{ model: Inventario, as: 'inventarios', required: false, include: [{ model: Almacen, as: 'almacen' }] },
										{ model: Clase, as: 'tipoProducto' }]
									}]
								}]
							}]
						}],
					order: [[{ model: Inventario, as: 'inventarios' }, 'updatedAt', 'DESC']]
				}).then(function (productos) {
					Sucursal.findAll({
						where: { id_empresa: req.params.id_empresa },
						attributes: ['id', 'nombre'],
						include: [{ model: Almacen, as: 'almacenes', attributes: ['id', 'id_sucursal', 'nombre'] }]
					}).then(function (sucursales) {
						res.json([productos, sucursales]);
					})

				}).catch(function (err) {
					res.json([{ hasError: true, mensaje: err.stack + '---LN 523 rutas productos' }]);
				});
			}).catch(function (err) {
				res.json([{ hasError: true, mensaje: err.stack + '---LN 517 rutas productos' }]);
			});
		});

	router.route('/comision-productos-vendedor/empresa/:id_empresa/usuario/:id_usuario')
		.get(ensureAuthorizedlogged, function (req, res) {
			var gruposProductos = []
			UsuarioGrupos.findAll({
				where: { id_usuario: req.params.id_usuario }
			}).then(function (grupos) {
				if (grupos.length == 0) {
					res.json([{ mensaje: 'El usuario no cuenta con grupos de productos asignados!' }])
				} else {
					grupos.map(function (grupo, i) {
						gruposProductos.push(grupo.id_grupo)
						if (i == grupos.length - 1) {
							obtenerComisionesProductoVendedor(req, res, true, gruposProductos);
						}
					})
				}
			}).catch(function (err) {
				res.json([{ mensaje: err.stack }])
			})
		})

		.put(ensureAuthorizedlogged, function (req, res) {
			Usuario.update({
				comision_general: req.body.comision_general,
				comision_activa: req.body.comision_activa,
			}, {
				where: { id: req.params.id_usuario }
			}).then(function (usuarioActualizado) {
				req.body.productos.forEach(function (producto, index, array) {
					ComisionVendedorProducto.update({
						comision: producto.comisionesVendedores[0].comision
					}, {
						where: { id: producto.comisionesVendedores[0].id }
					}).then(function (comisionesVendedor) {
						if (index === (array.length - 1)) {
							res.json({ mensaje: "Comisiones de Productos actualizados satisfactoriamente!" });
						}
					});
				});
			});
		});

	function obtenerComisionesProductoVendedor(req, res, verificar, gruposProductos) {
		var configuracionesPremisa = obtenerComisionesProductoPremisa(req, true, gruposProductos);
		configuracionesPremisa.then(function (entities) {
			if (entities.length > 0) {
				if (verificar) {
					// verificarProductosFaltantes(req, res, entities);
					devolverComisiones(entities, res);
				} else {
					devolverComisiones(entities, res);
				}
			} else {
				crearComisionesProductoVendedor(req, res, gruposProductos);
			}
		});
	}

	function obtenerComisionesProductoPremisa(req, required, gruposProductos) {

		return Producto.findAll({
			where: { id_empresa: req.params.id_empresa, id_grupo: { $in: gruposProductos } },
			include: [{ model: ComisionVendedorProducto, as: 'comisionesVendedores', where: { id_usuario: req.params.id_usuario }, required: required }]
		});

		//old change at 06/04/2018
		// return Producto.findAll({
		// 	where: { id_empresa: req.params.id_empresa },
		// 	include: [{ model: ComisionVendedorProducto, as: 'comisionesVendedores', where: { id_usuario: req.params.id_usuario }, required: required }]
		// });
	}

	function verificarProductosFaltantes(req, res, originalEntities) {
		var productIds = [];
		for (var i = 0; i < originalEntities.length; i++) {
			productIds.push(originalEntities[i].id);
		}
		Producto.findAll({
			where: { id_empresa: req.params.id_empresa, id: { $notIn: productIds } }
		}).then(function (productosFaltantes) {
			if (productosFaltantes.length > 0) {
				for (var i = 0; i < productosFaltantes.length; i++) {
					productosFaltantes[i] = productosFaltantes[i].id;
				}
				crearComisionesVendedor(req, res, productosFaltantes);
			} else {
				devolverComisiones(originalEntities, res)
			}
		});
	}

	function devolverComisiones(entities, res) {
		res.json(entities);
	}

	function crearComisionesProductoVendedor(req, res, gruposProductos) {
		Producto.findAll({
			where: {
				id_empresa: req.params.id_empresa, id_grupo: { $in: gruposProductos }, activo_fijo: false
			}
		}).then(function (productos) {
			productos.forEach(function (producto, index, array) {
				ComisionVendedorProducto.create({
					id_producto: producto.id,
					id_usuario: req.params.id_usuario
				}).then(function (score) {
					if (index === (array.length - 1)) {
						obtenerComisionesProductoVendedor(req, res, false, gruposProductos);
						// res.json(productos)
					}
				});
			});
		});
	}

	function crearComisionesVendedor(req, res, ids) {
		Producto.findAll({
			where: {
				id: { $in: ids }, activo_fijo: false
			}
		}).then(function (productos) {
			productos.forEach(function (producto, index, array) {
				ComisionVendedorProducto.create({
					id_producto: producto.id,
					id_usuario: req.params.id_usuario
				}).then(function (score) {
					if (index === (array.length - 1)) {
						obtenerComisionesProductoVendedor(req, res, false);
					}
				});
			});
		});
	}

	router.route('/vencimientos-productos/:id_empresa')
		.get(ensureAuthorizedlogged, function (req, res) {
			Clase.find({
				where: { nombre: "VENCIMIENTO DE PRODUCTOS" },
				include: [{ model: Tipo, as: 'tipo', where: { id_empresa: req.params.id_empresa } }]
			}).then(function (diasVencimientoDeudas) {
				var diasParametro = parseInt(diasVencimientoDeudas.nombre_corto);
				var fechaActual = new Date();
				Inventario.findAll({
					where: { fecha_vencimiento: { $not: null }, cantidad: { $gt: 0 } },
					include: [{
						model: Producto, as: 'producto', where: { id_empresa: req.params.id_empresa },
						include: [{ model: Clase, as: 'tipoProducto' }]
					},
					{
						model: Almacen, as: 'almacen',
						include: [{ model: Sucursal, as: 'sucursal' }]
					}],
					order: [['fecha_vencimiento', 'asc']]
				}).then(function (inventarios) {
					var inventariosFiltrados = [];
					if (inventarios.length > 0) {
						inventarios.forEach(function (inventario, index, arrayP) {
							var timeDiff = Math.abs(fechaActual.getTime() - inventario.fecha_vencimiento.getTime());
							var diferencia = Math.ceil(timeDiff / (1000 * 3600 * 24));
							if (diferencia <= diasParametro) {
								inventariosFiltrados.push(inventario);
							}
							if (index === (arrayP.length - 1)) {
								res.json(inventariosFiltrados);
							}
						});
					} else {
						res.json(inventariosFiltrados);
					}
				});
			});
		});

	router.route('/producto/empresa/:id_empresa/siguiente-codigo')
		.get(ensureAuthorizedlogged, function (req, res) {
			sequelize.query("SELECT MAX(CAST(SUBSTRING(codigo, 3, 5) AS UNSIGNED)) as ultimo_codigo FROM agil_producto where empresa=" + req.params.id_empresa, { type: sequelize.QueryTypes.SELECT })
				.then(function (dato) {
					if (dato[0].ultimo_codigo >= 99999) {
						sequelize.query("SELECT MAX(CAST(SUBSTRING(codigo, 3, 6) AS UNSIGNED)) as ultimo_codigo FROM agil_producto where empresa=" + req.params.id_empresa + " and SUBSTRING(codigo,1,2) = 'FC'", { type: sequelize.QueryTypes.SELECT })
							.then(function (dato2) {
								if (dato[0].ultimo_codigo > dato2[0].ultimo_codigo) {
									res.json(dato2[0]);
								} else {
									res.json(dato[0]);
								}
							});
					} else {
						res.json(dato[0]);
					}
				});
		});

	router.route('/catalogo-productos/empresa/:id_empresa/grupo/:id_grupo/user/:id_usuario')
		.get(ensureAuthorizedlogged, function (req, res) {
			var condicionProducto = "empresa=" + req.params.id_empresa
			if (req.params.id_grupo != 0) {
				Producto.findAll({
					where: { id_empresa: req.params.id_empresa, id_grupo: req.params.id_grupo },
					include: [{ model: Clase, as: 'grupo' }, { model: Clase, as: 'subgrupo' }]
				}).then(function (productos) {
					res.json({ catalogo: productos });
				}).catch(function (err) {
					res.json({ catalogo: [], hasError: true, mensaje: err.stack });
				});
			} else {
				UsuarioGrupos.findAll({
					where: { id_usuario: req.params.id_usuario }
				}).then(function (grupos) {
					var grupoLiteral = '('
					var grupoArray = []
					grupos.forEach(function (grupo, i) {
						grupoArray.push(grupo.id_grupo)
					})
					Producto.findAll({
						where: { id_empresa: req.params.id_empresa, id_grupo: { $in: grupoArray } },
						include: [{ model: Clase, as: 'grupo' }, { model: Clase, as: 'subgrupo' }]
					}).then(function (productos) {
						res.json({ catalogo: productos });
					}).catch(function (err) {
						res.json({ catalogo: [], hasError: true, mensaje: err.stack });
					});
				}).catch(function (err) {
					res.json({ catalogo: [], hasError: true, mensaje: err.stack });
				});
			}
		});

	//buscar por subgrupo de productos, paginador Asignacion de producos proveedor (Pedidos).
	router.route('/productos/asignacion/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/subgrupo/:id_subgrupo/user/:id_user')
		.get(ensureAuthorizedlogged, function (req, res) {
			var gruposProductos = ''
			UsuarioGrupos.findAll({
				where: { id_usuario: req.params.id_user }
			}).then(function (grupos) {
				if (grupos.length == 0) {
					res.json({ productos: [], hasError: true, mensaje: 'Los grupos del usuario no cuentan con productos.' });
				} else {
					grupos.forEach(function (grupo, i) {
						if (i == grupos.length - 1) {
							gruposProductos += grupo.id_grupo + ''
						} else {
							gruposProductos += grupo.id_grupo + ','
						}
					})
					var condicionProducto = "empresa=" + req.params.id_empresa, paginas, limit;
					if (req.params.texto_busqueda != 0) {
						condicionProducto = condicionProducto + " and (\
					codigo LIKE '%"+ req.params.texto_busqueda + "%' or \
					producto.nombre LIKE '%"+ req.params.texto_busqueda + "%' or \
					unidad_medida LIKE '%"+ req.params.texto_busqueda + "%' or \
					descripcion LIKE '%"+ req.params.texto_busqueda + "%' or \
					grupo.nombre LIKE '%"+ req.params.texto_busqueda + "%' or \
					subgrupo.nombre LIKE '%"+ req.params.texto_busqueda + "%')";
					}
					if (req.params.id_subgrupo != 0) {
						condicionProducto += ' and producto.subgrupo =' + req.params.id_subgrupo
					}
					sequelize.query("select count(producto.id) as cantidad_productos \
								from agil_producto as producto \
								LEFT OUTER JOIN gl_clase AS grupo ON (producto.grupo = grupo.id) \
								LEFT OUTER JOIN gl_clase AS subgrupo ON (producto.subgrupo = subgrupo.id) \
								WHERE "+ condicionProducto + " and producto.grupo in (" + gruposProductos + ")", { type: sequelize.QueryTypes.SELECT })
						.then(function (data) {
							if (req.params.items_pagina != 0) {
								limit = " LIMIT " + (req.params.items_pagina * (req.params.pagina - 1)) + "," + req.params.items_pagina;
								paginas = Math.ceil(data[0].cantidad_productos / req.params.items_pagina);
							} else {
								limit = "";
								paginas = 1;
							}
							sequelize.query("select producto.id,producto.publicar_panel,producto.activar_inventario,producto.codigo,producto.nombre as nombre,producto.imagen,producto.unidad_medida,producto.precio_unitario,producto.precio_unitario_dolares,producto.inventario_minimo,producto.usar_promocion,producto.usar_promocion_en_dias_habilitados,producto.descripcion,tipoProducto.nombre as tipoProducto,grupo.nombre as grupo, grupo.id as id_grupo,subgrupo.nombre as subgrupo, subgrupo.id as id_subgrupo\
						from agil_producto as producto\
						LEFT OUTER JOIN gl_clase AS tipoProducto ON (producto.tipo_producto = tipoProducto.id)\
						LEFT OUTER JOIN gl_clase AS grupo ON (producto.grupo = grupo.id)\
						LEFT OUTER JOIN gl_clase AS subgrupo ON (producto.subgrupo = subgrupo.id)\
						WHERE "+ condicionProducto + " and producto.grupo in (" + gruposProductos + ") \
						ORDER BY producto."+ req.params.columna + " " + req.params.direccion + limit, { type: sequelize.QueryTypes.SELECT })
								.then(function (productos) {
									res.json({ productos: productos, paginas: paginas });
								}).catch(function (err) {
									res.json({ productos: [], hasError: true, mensaje: err.stack });
								});
						}).catch(function (err) {
							res.json({ productos: [], hasError: true, mensaje: err.stack });
						});
				}
			}).catch(function (err) {
				res.json({ productos: [], hasError: true, mensaje: err.stack });
			})
		});

	// Paginador productos asignados proveedor (Pedidos)
	router.route('/productos/asignados/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/subgrupo/:id_subgrupo/user/:id_user/:ids')
		.get(ensureAuthorizedlogged, function (req, res) {
			var gruposProductos = ''
			UsuarioGrupos.findAll({
				where: { id_usuario: req.params.id_user }
			}).then(function (grupos) {
				if (grupos.length == 0) {
					res.json({ productos: [], hasError: true, mensaje: 'Los grupos del usuario no cuentan con productos.' });
				} else {
					grupos.forEach(function (grupo, i) {
						if (i == grupos.length - 1) {
							gruposProductos += grupo.id_grupo + ''
						} else {
							gruposProductos += grupo.id_grupo + ','
						}
					})
					var condicionProducto = "producto.id in (" + req.params.ids + ") and empresa=" + req.params.id_empresa, paginas, limit;
					if (req.params.texto_busqueda != 0) {
						condicionProducto = condicionProducto + " and (\
					codigo LIKE '%"+ req.params.texto_busqueda + "%' or \
					producto.nombre LIKE '%"+ req.params.texto_busqueda + "%' or \
					unidad_medida LIKE '%"+ req.params.texto_busqueda + "%' or \
					descripcion LIKE '%"+ req.params.texto_busqueda + "%' or \
					grupo.nombre LIKE '%"+ req.params.texto_busqueda + "%' or \
					subgrupo.nombre LIKE '%"+ req.params.texto_busqueda + "%')";
					}
					if (req.params.id_subgrupo != 0) {
						condicionProducto += ' and producto.subgrupo =' + req.params.id_subgrupo
					}
					sequelize.query("select count(producto.id) as cantidad_productos \
								from agil_producto as producto \
								LEFT OUTER JOIN gl_clase AS grupo ON (producto.grupo = grupo.id) \
								LEFT OUTER JOIN gl_clase AS subgrupo ON (producto.subgrupo = subgrupo.id) \
								WHERE "+ condicionProducto + " and producto.grupo in (" + gruposProductos + ")", { type: sequelize.QueryTypes.SELECT })
						.then(function (data) {
							if (req.params.items_pagina != 0) {
								limit = " LIMIT " + (req.params.items_pagina * (req.params.pagina - 1)) + "," + req.params.items_pagina;
								paginas = Math.ceil(data[0].cantidad_productos / req.params.items_pagina);
							} else {
								limit = "";
								paginas = 1;
							}
							sequelize.query("select producto.id,producto.publicar_panel,producto.activar_inventario,producto.codigo,producto.nombre as nombre,producto.imagen,producto.unidad_medida,producto.precio_unitario,producto.precio_unitario_dolares,producto.inventario_minimo,producto.usar_promocion,producto.descripcion,tipoProducto.nombre as tipoProducto,grupo.nombre as grupo, grupo.id as id_grupo,subgrupo.nombre as subgrupo, subgrupo.id as id_subgrupo\
						from agil_producto as producto\
						LEFT OUTER JOIN gl_clase AS tipoProducto ON (producto.tipo_producto = tipoProducto.id)\
						LEFT OUTER JOIN gl_clase AS grupo ON (producto.grupo = grupo.id)\
						LEFT OUTER JOIN gl_clase AS subgrupo ON (producto.subgrupo = subgrupo.id)\
						WHERE "+ condicionProducto + " and producto.grupo in (" + gruposProductos + ") \
						ORDER BY producto."+ req.params.columna + " " + req.params.direccion + limit, { type: sequelize.QueryTypes.SELECT })
								.then(function (productos) {
									res.json({ productos: productos, paginas: paginas });
								}).catch(function (err) {
									res.json({ productos: [], hasError: true, mensaje: err.stack });
								});
						}).catch(function (err) {
							res.json({ productos: [], hasError: true, mensaje: err.stack });
						});
				}
			}).catch(function (err) {
				res.json({ productos: [], hasError: true, mensaje: err.stack });
			})
		});
	router.route('/importar-precios-productos/:id_empresa')
		.post(ensureAuthorizedlogged, function (req, res) {
			var promises = []
			sequelize.transaction(function (t) {
				req.body.forEach(function (producto, index, array) {
					promises.push(Producto.find({
						where: { id_empresa: req.params.id_empresa, codigo: producto.codigo }, transaction: t
					}).then(function (ProductoEncontrado) {
						return ProductoTipoPrecio.findOrCreate({
							where: {
								id_producto: ProductoEncontrado.id,
								id_tipo_precio: producto.tipoPrecio.id,
							},
							transaction: t,
							lock: t.LOCK.UPDATE,
							defaults: {
								id_producto: ProductoEncontrado.id,
								id_sucursal: producto.sucursal.id,
								id_tipo_precio: producto.tipoPrecio.id,
								precio_unitario: producto.precio_unitario,
								rango_positivo: producto.rango_positivo,
								rango_negativo: producto.rango_negativo,
								eliminado: false
							}
						}).spread(function (precoProducto, created) {
							if (!created) {
								return ProductoTipoPrecio.update({
									precio_unitario: producto.precio_unitario,
									rango_positivo: producto.rango_positivo,
									rango_negativo: producto.rango_negativo,
									eliminado: false
								}, {
									where: { id: precoProducto.id }, transaction: t
								}).then(function (actualizado) {
									return new Promise(function (fulfill, reject) {
										fulfill();
									});
								}).catch(function (err) {
									return new Promise(function (fulfill, reject) {
										reject((err.stack !== undefined) ? err.stack : err);
									});
								})
							} else {
								return new Promise(function (fulfill, reject) {
									fulfill();
								});
							}
						}).catch(function (err) {
							return new Promise(function (fulfill, reject) {
								reject((err.stack !== undefined) ? err.stack : err);
							});
						})
					}).catch(function (err) {
						return new Promise(function (fulfill, reject) {
							reject((err.stack !== undefined) ? err.stack : err);
						});
					}))

				})
				return Promise.all(promises);
			}).then(function (result) {
				res.json({ mensaje: "¡Datos de Productos actualizados satisfactoriamente!" });
			}).catch(function (err) {
				res.json({ hasError: true, mensaje: err.stack });
			});
		})

	router.route('/producto/movimientosRealizados')
		.post(function (req, res) {
			// DetalleMovimiento.findAll({
			// 	// where: { id_empresa: req.params.id_empresa, codigo: { $not: null } },
			// 	include: [
			// 		{ 
			// 			model: Producto, as: 'producto',
			// 			where: { codigo:  req.body.codigo}
			// 		},
			// 		{
			// 			model: Movimiento, as: 'movimiento',
			// 			include: [
			// 				{ 
			// 					model: Clase, as: 'clase'
			// 				}
			// 			]
			// 		}
			// 	],
			// 	// order: [['codigo', 'ASC']]
			// })
			sequelize.query("SELECT\
		`inv_detalle_movimiento`.`id`,\
		`inv_detalle_movimiento`.`costo_unitario`,\
		`inv_detalle_movimiento`.`cantidad`,\
		`inv_detalle_movimiento`.`importe`,\
		`inv_detalle_movimiento`.`descuento`,\
		`inv_detalle_movimiento`.`recargo`,\
		`inv_detalle_movimiento`.`ice`,\
		`inv_detalle_movimiento`.`excento`,\
		`inv_detalle_movimiento`.`total`,\
		`inv_detalle_movimiento`.`fecha_vencimiento`,\
		`inv_detalle_movimiento`.`lote`,\
		`inv_detalle_movimiento`.`inventario` AS `id_inventario`,\
		`inv_detalle_movimiento`.`createdAt`,\
		`inv_detalle_movimiento`.`updatedAt`,\
		`producto`.`nombre` AS `producto`,\
		`producto`.`codigo` AS `codigo`,\
		`movimiento`.`fecha` AS `fecha`,\
		`movimiento.clase`.`nombre` AS `movimiento`,\
		`movimiento.almacen`.`nombre` AS `almacen`,\
		`inv_venta`.`factura` AS `factura`,\
		`inv_compra`.`factura` AS `factura_compra`\
		FROM\
			`inv_detalle_movimiento` AS `inv_detalle_movimiento`\
			INNER JOIN `agil_producto` AS `producto` ON `inv_detalle_movimiento`.`producto` = `producto`.`id`\
			AND `producto`.`codigo` = '"+ req.body.codigo + "'\
			LEFT OUTER JOIN `inv_movimiento` AS `movimiento` ON `inv_detalle_movimiento`.`movimiento` = `movimiento`.`id`\
			LEFT JOIN `inv_venta` ON `inv_venta`.`movimiento`=`movimiento`.`id`\
			LEFT JOIN `inv_compra` ON `inv_compra`.`movimiento`=`movimiento`.`id`\
			LEFT OUTER JOIN `agil_almacen` AS `movimiento.almacen` ON `movimiento`.`almacen` = `movimiento.almacen`.`id`\
			LEFT OUTER JOIN `gl_clase` AS `movimiento.clase` ON `movimiento`.`clase` = `movimiento.clase`.`id`;",
				{ type: sequelize.QueryTypes.SELECT })
				.then(function (resp) {
					res.json(resp);
				});
		});

	router.route('/producto/ventaRealizado/:id_movimiento')
		.get(function (req, res) {
			DetalleMovimiento.find({
				where: { id: req.params.id_movimiento }
				// include: [
				// 	{
				// 		model: Producto, as: 'producto',
				// 		include: [
				// 			{ 
				// 				model: Inventario, as: 'inventarios'	
				// 			}
				// 		]
				// 	}
				// ]
			}).then(function (detalle) {
				Movimiento.find({
					where: { id: detalle.id_movimiento },
					include: [
						{
							model: Venta, as: 'venta',
							include: [
								{
									model: DetalleVenta, as: 'detallesVenta',
									where: { producto: detalle.id_producto }
								}
							]
						}
					]
				}).then(function (movi) {
					res.json({ movimiento: movi, DetalleMovimiento: detalle });
				});
			});
		})
	router.route('/producto/promociones/:id_producto')
		.post(function (req, res) {
			req.body.forEach(function (promo, i, a) {
				if (promo.id) {
					ProductoPromocion.update({
						id_dia: promo.dia.id,
						nombre: promo.nombre,
						precio: promo.precio,
						tipo_promocion: promo.tipo_promocion,
						hora_inicio: promo.hora_inicio,
						hora_fin: promo.hora_fin,
						habilitado: promo.habilitado
					}, { where: { id: promo.id } }).then(function (dato) {
						if (i === (a.length - 1)) {
							res.json({ mensaje: "Guardado Satisfactoriamente!" })
						}
					})
				} else {
					ProductoPromocion.create({
						id_producto: req.params.id_producto,
						id_dia: promo.dia.id,
						nombre: promo.nombre,
						precio: promo.precio,
						tipo_promocion: promo.tipo_promocion,
						hora_inicio: promo.hora_inicio,
						hora_fin: promo.hora_fin,
						habilitado: promo.habilitado
					}).then(function (dato) {
						if (i === (a.length - 1)) {
							res.json({ mensaje: "Guardado Satisfactoriamente!" })
						}
					})
				}

			})

		})
		.get(function (req, res) {
			condicion = {
				where: { id_producto: req.params.id_producto },
				include: [{ model: Clase, as: 'dia' }]
			}
			ProductoPromocion.findAll(condicion).then(function (datos) {
				res.json({ promociones: datos })
			})
		})

	router.route('/producto/promociones-puntaje/:id_producto')
		.post(function (req, res) {
			req.body.forEach(function (promo, i, a) {
				if (promo.id) {
					var fecha_inicio = new Date(promo.fecha_inicio.split('/').reverse()); fecha_inicio.setHours(0, 0, 0, 0, 0);
					var fecha_fin = new Date(promo.fecha_fin.split('/').reverse()); fecha_fin.setHours(0, 0, 0, 0, 0);
					ProductoPromocionPuntaje.update({
						id_dia: promo.dia.id,
						fecha_inicio: fecha_inicio,
						fecha_fin: fecha_fin,
						puntaje: promo.puntaje,
						tipo_promocion: promo.tipo_promocion,
						hora_inicio: promo.hora_inicio,
						hora_fin: promo.hora_fin,
						habilitado: promo.habilitado
					}, { where: { id: promo.id } }).then(function (dato) {
						if (i === (a.length - 1)) {
							res.json({ mensaje: "Guardado Satisfactoriamente!" })
						}
					})
				} else {
					var fecha_inicio = new Date(promo.fecha_inicio.split('/').reverse()); fecha_inicio.setHours(0, 0, 0, 0, 0);
					var fecha_fin = new Date(promo.fecha_fin.split('/').reverse()); fecha_fin.setHours(0, 0, 0, 0, 0);
					ProductoPromocionPuntaje.create({
						id_producto: req.params.id_producto,
						id_dia: promo.dia.id,
						fecha_inicio: fecha_inicio,
						fecha_fin: fecha_fin,
						habilitado: promo.habilitado,
						tipo_promocion: promo.tipo_promocion,
						hora_inicio: promo.hora_inicio,
						hora_fin: promo.hora_fin,
						puntaje: promo.puntaje
					}).then(function (dato) {
						if (i === (a.length - 1)) {
							res.json({ mensaje: "Guardado Satisfactoriamente!" })
						}
					})
				}
			})
		})
		.get(function (req, res) {
			condicion = {
				where: { id_producto: req.params.id_producto },
				include: [{ model: Clase, as: 'dia' }]
			}
			ProductoPromocionPuntaje.findAll(condicion).then(function (datos) {
				res.json({ promociones: datos })
			})
		})
	router.route('/producto/promociones-puntaje/habilitados/:id_producto')
		.get(function (req, res) {
			condicion = {
				where: { id_producto: req.params.id_producto, habilitado: true },
				include: [{ model: Clase, as: 'dia' }]
			}
			ProductoPromocionPuntaje.findAll(condicion).then(function (datos) {
				res.json({ promociones: datos })
			})
		})
	router.route('/producto/movimientoRealizado/:id_mov')
		.put(function (req, res) {
			var dataBody = {};
			if (req.body.fecha_vencimiento != null && req.body.fecha_vencimiento != "null") {
				dataBody.fecha_vencimiento = req.body.fecha_vencimiento;
			}
			if (req.body.lote != null && req.body.lote != "null") {
				dataBody.lote = req.body.lote;
			}
			if (req.body.id_inventario != null && req.body.id_inventario != "") {
				dataBody.id_inventario = req.body.id_inventario;
			}
			DetalleMovimiento.update(dataBody, {
				where: { id: req.params.id_mov }
			}).then(function (ven) {
				if (req.body.id_detalleV) {
					var dataVenta = {};
					if (req.body.fecha_vencimientoV != null && req.body.fecha_vencimientoV != "null") {
						dataVenta.fecha_vencimiento = req.body.fecha_vencimientoV;
					}
					if (req.body.loteV != null && req.body.loteV != "null") {
						dataVenta.lote = req.body.loteV;
					}
					if (req.body.id_inventarioV != null && req.body.id_inventarioV != "") {
						dataVenta.id_inventario = req.body.id_inventarioV;
					}
					DetalleVenta.update(dataVenta, {
						where: { id: req.body.id_detalleV }
					}).then(function (vend) {
						res.json({ mensaje: 'Se actualizo la venta!' });
					});
				} else {
					res.json({ mensaje: 'Se actualizo el movimiento!' });
				}
			});
		});

	router.route('/productos/unidades_medida/empresa/:id_empresa')
		.get(function (req, res) {
			sequelize.query("select DISTINCT p.unidad_medida from agil_producto as p\
			where p.empresa ="+ req.params.id_empresa
				, { type: sequelize.QueryTypes.SELECT })
				.then(function (unidadesMedida) {
					res.json({ unidadesMedida: unidadesMedida })
				});
		});
	router.route('/productos/producto/:id_producto/relacion/:id_relacion')
		.get(function (req, res) {
			/* sequelize.query("select  p.unidad_medida from agil_producto as p\
			where p.empresa ="+ req.params.id_empresa
				, { type: sequelize.QueryTypes.SELECT }) */
			Producto.findAll({
				include: [{
					model: ProductoPadre, as: 'hijos', required: true,
					where: { id_producto_padre: req.params.id_producto }
				}]
			}).then(function (Productos) {
				res.json({ productos: Productos })
			});
		});

	router.route('/productos/producto/relacion-padre/:id')
		.get(function (req, res) {
			Producto.findAll({
				include: [{
					model: ProductoPadre, as: 'hijos', required: true,
					where: { id_producto_padre: req.params.id }
				}]
			}).then(function (Productos) {
				res.json({ productos: Productos })
			});
		});

	router.route('/productos/heredados/empresa')
		.post(ensureAuthorizedlogged, async function (req, res) {
			//Declaraciones para usar como tipos de productos.
			for (const producto of req.body.productos) {
				let datos = []
				let padre = await Producto.find({
					where: { id_producto_padre: producto.codigo_padre, id_empresa: req.body.id_empresa }
				})
				let hijo = await Producto.find({
					where: { codigo: producto.codigo, id_empresa: req.body.id_empresa }
				})
				if (padre && hijo) {
					await ProductoPadre.create({
						id_producto_padre: padre.id,
						id_producto: hijo.id
					})
				} else {
					datos.push(producto)
				}
			}
			res.json({ mensaje: 'importado satisfactoriamente', registrosNoAsignados: datos })
		});

	function verificarRelaciones(relacion, t, empresa, tipo) {
		return Clase.find({
			where: {
				nombre: relacion,
				id_tipo: tipo.id
			},
			transaction: t
		}).then((relacionBusq) => {
			if (relacionBusq) {
				//retornar la relación si esta ya existe, para poder usar el id mas tarde.
				return { relacion: relacionBusq, existe: true }
			} else {
				return Clase.create({
					id_empresa: empresa,
					id_tipo: tipo.id,
					habilitado: true,
					eliminado: false,
					nombre: relacion,
					nombre_corto: relacion,

				}, { transaction: t }).then(function (RELpRO) {
					//retornar la relacion creada para usar el id mas tarde.
					return { relacion: RELpRO, existe: true }
				}).catch(function (err) {
					//rechazar la transaccion en caso de error.
					return new Promise(function (fullfil, reject) {
						reject({ hasErr: true, mensaje: err.stack })
					})
				})
			}
		}).catch(function (err) {
			//rechazar la transaccion en caso de error.
			return new Promise(function (fullfil, reject) {
				reject({ hasErr: true, mensaje: err.stack })
			})
		})
	}

	function asignarRelacionesPadre(relacion, t, empresa, relaciones, tipo) {
		//seleccionar las relaciones para obtener el id
		let elHijo = relaciones.find((rel) => {
			return ((rel.relacion.nombre ? rel.relacion.nombre.toLowerCase() : null) === relacion.relacion.toLowerCase() && rel.relacion.id_tipo === tipo.id)
		})
		let elpadre = relaciones.find((rel) => {
			return ((rel.relacion.nombre ? rel.relacion.nombre.toLowerCase() : null) === (relacion.padre ? relacion.padre.toLowerCase() : null) && rel.relacion.id_tipo === tipo.id)
		})
		//verificar que se no sea null o undefined
		// if (!elpadre) {
		// 	return new Promise((f, r) => {
		// 		f({ relacion: relacion.relacion, padre: false })
		// 	})
		// }
		if (!elHijo) {
			return new Promise((f, r) => {
				r({ relacion: relacion.relacion, padre: false })
			})
		}

		//actualizar la clase
		return Clase.update({
			id_tipo: tipo.id,
			habilitado: true,
			eliminado: false,
			id_padre: (elpadre ? elpadre.relacion ? elpadre.relacion.id : null : null),
		}, {
			where: {
				id: elHijo.relacion.id,
				id_tipo: tipo.id
			},
			transaction: t
		}).then((result) => {
			//Si result es 0 no se actualizó por tanto existe un problema.
			if (result) {
				return new Promise((f, r) => {
					f({ rel: relacion.relacion, actualizado: true })
				})
			} else {
				return new Promise((f, r) => {
					f({ rel: relacion.relacion, actualizado: false })
				})
				// f({ rel: relacion.relacion, actualizado: false })
			}

		}).catch(function (err) {
			//rechazar la transaccion en caso de error.
			return new Promise(function (fullfil, reject) {
				reject({ hasErr: true, mensaje: err.stack })
			})
		})
	}
	//Verifica si el producto existe, si no existe, crea uno nuevo.
	function verificarProductos(producto, t, empresa, relaciones, tiposProducto, grupo, subgrupo) {

		//Capturar la relación según el nombre en el producto para asignar el id.
		// let relacion;

		//Capturara el tipo de producto según el nombre para asignar el id.
		let tipo;
		// try {
		let relacion = relaciones.find((d) => {
			return (d.relacion.nombre.toLowerCase().trim() === (producto.relacion ? producto.relacion.trim().toLowerCase() : null))
		})
		if (producto.tipo_producto) {
			tipo = tiposProducto.find((d) => {
				return d.nombre.toLowerCase().includes(producto.tipo_producto.toLowerCase())
			})
		}
		// } catch (error) {
		// 	return new Promise((f, r) => r({ hasErr: true, error: error.stack }))
		// }
		return Clase.find({
			where: {
				nombre: producto.grupo,
				id_tipo: grupo.id
			},
			transaction: t
		}).then(grupoProductoBuscado => {
			return Clase.find({
				where: {
					nombre: producto.subgrupo,
					id_tipo: grupo.id
				},
				transaction: t
			}).then(subGrupoProductoBuscado => {
				return Producto.find({
					where: { nombre: producto.nombre, codigo: producto.codigo, id_empresa: empresa },
					transaction: t
				}).then((prodcutoBuscado) => {
					if (prodcutoBuscado) {
						//El producto existe, continuar...
						return Producto.update({
							id_relacion: (relacion ? relacion.relacion.id : null),
							publicar_panel: true,
							activar_inventario: (producto.tipo_producto.toLowerCase() !== "final" ? true : false)
						}, {
							where: {
								id: prodcutoBuscado.id
							}
						}).then(pactualizado => {
							return new Promise((f, r) => f({ producto: producto.nombre, nuevo: false, actualizado: true }))
						}).catch(err => {
							return new Promise((f, r) => {
								r(err)
							})
						})


					} else {
						//Crear el producto ya que no existe...
						return Producto.create({
							id_empresa: empresa,
							nombre: producto.nombre,
							codigo: producto.codigo,
							unidad_medida: producto.unidad_medida,
							precio_unitario: producto.precio_unitario,
							// utilidad_esperada: producto.utilidad_esperada,
							inventario_minimo: producto.inventario_minimo,
							descripcion: producto.descripcion,
							id_grupo: grupoProductoBuscado ? grupoProductoBuscado.id : null,
							id_subgrupo: subGrupoProductoBuscado ? subGrupoProductoBuscado.id : null,
							caracteristica_especial1: producto.caracteristica_especial1,
							caracteristica_especial2: producto.caracteristica_especial2,
							codigo_fabrica: producto.codigo_fabrica,
							comision: producto.comision,
							publicar_panel: true,
							alerta: producto.alerta,
							descuento: producto.descuento,
							descuento_fijo: producto.descuento_fijo,
							id_tipo_producto: tipo ? tipo.id ? tipo.id : null : null,
							activar_inventario: (producto.tipo_producto.toLowerCase() !== "final" ? true : false),
							marca: producto.marca,
							modelo: producto.modelo ? null : null,
							anio: producto.anio ? null : null,
							// id_almacen_erp: (producto.almacenErp ? producto.almacenErp.id : null),
							// id_cuenta: (producto.cuenta ? producto.cuenta.id : null),
							rango_positivo: producto.rango_positivo ? null : null,
							rango_negativo: producto.rango_negativo ? null : null,
							// activo_fijo: producto.activo_fijo,
							// precio_unitario_dolares: producto.precio_unitario_dolares,
							// cantidad_prestacion_compra: producto.cantidad_prestacion_compra,
							// indice_rotacion: producto.indice_rotacion,
							// unidad_economica: producto.unidad_economica,
							id_relacion: (relacion ? relacion.relacion.id : null)
						}, {
							transaction: t
						}).then((productoCreado) => {
							//devolver el producto.
							return new Promise((f, r) => f({ producto: producto.nombre, nuevo: true, actualizado: false }))
						}).catch(err => {
							//rechazar la transacción en caso de error.
							return new Promise((f, r) => {
								r({ producto: producto.nombre, mensaje: err.stack })
							})
						})
					}
				}).catch(err => {
					//rechazar la transacción en caso de error.
					return new Promise((f, r) => {
						r({ producto: producto.nombre, mensaje: err.stack })
					})
				})
			}).catch(err => {
				//rechazar la transacción en caso de error.
				return new Promise((f, r) => {
					r({ producto: producto.nombre, mensaje: err.stack })
				})
			})
		}).catch(err => {
			//rechazar la transacción en caso de error.
			return new Promise((f, r) => {
				r({ producto: producto.nombre, mensaje: err.stack })
			})
		})
	}


	router.route('/productoss/crear-inventario/empresa/:id_empresa')
		//saldo por producto
		.get(async function (req, res) {
			await sequelize.query("SELECT DV.id as id_DV, DV.producto as prod_DV, P.codigo as codig_product,A.nombre as almacenn,S.nombre as sucursall,\
			sum(DV.cantidad) as cant_DV, DV.precio_unitario as precio_DV ,DV.inventario as inv_DV,V.id as id_venta, V.movimiento as mov_v,V.fecha as fecha_v,V.almacen as almac_v, \
			M.id as id_m, M.almacen as almac_m, M.tipo as tipo_m, M.clase as clase_m,M.createdAt AS fecha_creac,M.updatedAt as fecha_updat,\
			 DM.id as id_DM , DM.producto as prod_dm,\
			 sum(DM.cantidad) AS cantid_dm, DM.inventario as inv_dm, (sum(DV.cantidad)-sum(DM.cantidad)) as faltantes ,\
			(SELECT sum(ii.cantidad) as k FROM `inv_inventario` as ii  WHERE ii.producto = DM.producto  and ii.almacen=M.almacen GROUP BY producto)as cant_disponible \
			FROM inv_detalle_venta AS DV \
			INNER JOIN inv_venta AS V ON DV.venta = V.id\
			INNER JOIN inv_movimiento AS M ON V.movimiento=M.id\
			INNER JOIN inv_detalle_movimiento AS DM ON M.id=DM.movimiento\
			INNER JOIN agil_producto AS P on DV.producto = P.id\
			INNER JOIN sys_usuario as U on V.usuario=U.id\
			INNER JOIN agil_almacen as A ON M.almacen = A.id\
			INNER JOIN agil_sucursal as S ON A.sucursal = S.id\
			WHERE U.empresa = 35 \
			AND DV.cantidad != DM.cantidad\
			AND V.movimiento = M.id\
			AND DV.producto = DM.producto\
			AND V.almacen = M.almacen\
			AND DV.inventario= DM.inventario\
			GROUP BY V.movimiento, DV.producto, V.almacen,DV.inventario\
			HAVING (sum(DV.cantidad)-sum(DM.cantidad))>0\
			ORDER BY DV.id ASC, DM.id ASC, V.almacen ASC, DV.producto ASC", { type: sequelize.QueryTypes.SELECT })
				.then(async function (data) {





					for (let index = 0; index < data.length; index++) {
						var items = data[index]
						var cantidadTotal = items.faltantes
						if (items.mov_v == 90472 && items.prod_DV == 40917) {
							console.log(items)
						}
						await Inventario.findAll({
							where: { id_almacen: items.almac_m, id_producto: items.prod_dm, cantidad: { $gt: 0 } },
							order: [['id', 'asc']]
						}).then(async function (inventarioss) {
							if (inventarioss.length > 1) {
								for (var i = 0; i < inventarioss.length; i++) {
									var inventario = inventarioss[i]
									if (cantidadTotal > 0) {
										var cantidadParcial;
										if (cantidadTotal > inventario.cantidad) {
											cantidadParcial = inventario.cantidad;
											cantidadTotal = cantidadTotal - inventario.cantidad
										} else {
											cantidadParcial = cantidadTotal;
											cantidadTotal = 0;
										}

										if (cantidadParcial > 0) {
											await DetalleMovimiento.create({
												id_producto: items.prod_dm,
												id_movimiento: items.mov_v,
												costo_unitario: inventario.costo_unitario,
												cantidad: cantidadParcial,
												importe: inventario.costo_unitario * cantidadParcial,
												recargo: 0,
												ice: 0,
												excento: 0,
												tipo_descuento: 0,
												tipo_recargo: 0,
												descuento: 0,
												total: inventario.costo_unitario * cantidadParcial,
												fecha_vencimiento: null,
												lote: null,
												id_inventario: inventario.id

											}).then(async function (inventarioCreado) {

												await Inventario.update({
													cantidad: inventario.cantidad - cantidadParcial,
													costo_total: inventario.costo_unitario * (inventario.cantidad - cantidadParcial)
												}, {
													where: { id: inventario.id }

												}).then(function (detalleMovimientoActualizado) {
													/* DetalleVenta.create({
														id_venta: items.id_venta,
														id_producto: items.prod_dm,
														precio_unitario: items.precio_DV,
														precio_unitario_dolares:0,
														cantidad: cantidadParcial,
														importe: items.precio_DV * cantidadParcial,
														importe_dolares:0,
														descuento: 0,
														recargo: 0,
														ice:0,
														excento: 0,
														descuento_dolares: 0,
														recargo_dolares: 0,
														ice_dolares: 0,
														excento_dolares: 0,
														tipo_descuento: 0,
														tipo_recargo: 0,
														total: items.precio_DV * cantidadParcial,
														total_dolares: 0,
														fecha_vencimiento:null,
														lote: null,
														id_inventario: inventario.id,
														observaciones: null
								
													}).then(function (inventarioCreado) { 
	
													}) */
												})
											})
										}
									}
								}
							} else {
								if (inventarioss.length == 1) {

									if (inventarioss[0].cantidad >= cantidadTotal) {

										await DetalleMovimiento.create({
											id_producto: items.prod_dm,
											id_movimiento: items.mov_v,
											costo_unitario: inventarioss[0].costo_unitario,
											cantidad: cantidadTotal,
											importe: inventarioss[0].costo_unitario * cantidadTotal,
											recargo: 0,
											ice: 0,
											excento: 0,
											tipo_descuento: 0,
											tipo_recargo: 0,
											descuento: 0,
											total: inventarioss[0].costo_unitario * cantidadTotal,
											fecha_vencimiento: null,
											lote: null,
											id_inventario: inventarioss[0].id

										}).then(async function (inventarioCreado) {
											await Inventario.findOne({
												where: { id: inventarioss[0].id }
											}).then(async function (params) {
												await Inventario.update({
													cantidad: inventarioss[0].cantidad - cantidadTotal,
													costo_total: inventarioss[0].costo_unitario * (inventarioss[0].cantidad - cantidadTotal)
												}, {
													where: { id: inventarioss[0].id }

												}).then(function (detalleMovimientoActualizado) {
													/* 	DetalleVenta.create({
															id_venta: items.id_venta,
															id_producto: items.prod_dm,
															precio_unitario: items.precio_DV,
															precio_unitario_dolares:0,
															cantidad: cantidadTotal,
															importe: items.precio_DV * cantidadTotal,
															importe_dolares:0,
															descuento: 0,
															recargo: 0,
															ice:0,
															excento: 0,
															descuento_dolares: 0,
															recargo_dolares: 0,
															ice_dolares: 0,
															excento_dolares: 0,
															tipo_descuento: 0,
															tipo_recargo: 0,
															total: items.precio_DV * cantidadTotal,
															total_dolares: 0,
															fecha_vencimiento:null,
															lote: null,
															id_inventario: inventarioss[0].id,
															observaciones: null
									
														}).then(function (inventarioCreado) { 
		
														}) */
												})
											});


										})
									}
								}
							}



						})


					}

					res.json({ mensaje: "terminoooo" });
				});
		});






	router.route('/productoss/inventario-kardex-cant-iguales/empresa/:id_empresa')
		//igualando cantidades de los productos en kardex e inventarios 
		.get(async function (req, res) {
			await sequelize.query("SELECT\
					igual.id_prod AS id_productoo,\
					igual.codigo_prod as codigo_productoo,\
					igual.almac_ing as id_almacenn,\
					igual.sucur_ing as id_sucursall,\
					igual.almac_gastt as nomb_almacenn,\
					igual.sucur_gastoss as nombre_sacursall,\
					igual.cant_ing as cant_ingresoss,\
					igual.cant_egreso as cant_egresoss,\
					igual.saldo_cant_kardex as cant_kardex,\
					igual.cantid_invent as cant_inventarios,\
					igual.diferencias*-1 as diferencias\
			FROM (\
					SELECT  P.id as id_prod,\
					P.codigo as codigo_prod,\
					ingresos.id_almac AS almac_ing,\
					ingresos.id_sucur as sucur_ing,\
					egreso.nomb_Almac AS almac_gastt,\
					egreso.nomb_sucur as sucur_gastoss,\
					egreso.id_almac AS almac_gast,\
					egreso.id_sucur as sucur_gasto,\
					IFNULL(SUM(ingresos.cant_DM), 0) as cant_ing,\
					IFNULL(egreso.cant_DM, 0) as cant_egreso,\
					IFNULL(SUM(ingresos.cant_DM )- egreso.cant_DM,ingresos.cant_DM) as saldo_cant_kardex,\
					invent.cant_inv as cantid_invent,\
					IFNULL(IFNULL(SUM(ingresos.cant_DM )- egreso.cant_DM,ingresos.cant_DM)-invent.cant_inv,invent.cant_inv) AS diferencias\
					FROM agil_producto AS P\
					INNER JOIN (SELECT DM.producto AS prod_DM, M.almacen AS id_almac ,A.nombre AS nomb_Almac,S.id AS id_sucur,S.nombre AS nomb_sucur,SUM(DM.cantidad) AS cant_DM  \
								FROM inv_detalle_movimiento AS DM\
								INNER JOIN inv_inventario AS I ON DM.inventario = I.id\
								INNER JOIN inv_movimiento AS M ON DM.movimiento = M.id\
								INNER JOIN agil_producto AS P ON DM.producto = P.id\
								LEFT JOIN agil_almacen as A ON I.almacen = A.id\
								LEFT JOIN agil_sucursal as S ON A.sucursal = S.id\
								WHERE \
								P.empresa = 35\
								AND M.tipo = 6\
								GROUP BY DM.producto,A.id, S.id\
								ORDER BY DM.producto) as ingresos ON  P.id = ingresos.prod_DM\
					INNER JOIN (SELECT DM.producto AS prod_DM, M.almacen AS id_almac ,A.nombre AS nomb_Almac,S.id AS id_sucur,S.nombre AS nomb_sucur, SUM(DM.cantidad) AS cant_DM  \
								FROM inv_detalle_movimiento AS DM\
								INNER JOIN inv_inventario AS I ON DM.inventario = I.id\
								INNER JOIN inv_movimiento AS M ON DM.movimiento = M.id\
								INNER JOIN agil_producto AS P ON DM.producto = P.id\
								LEFT JOIN agil_almacen as A ON I.almacen = A.id\
								LEFT JOIN agil_sucursal as S ON A.sucursal = S.id\
								WHERE \
								P.empresa = 35\
								AND M.tipo = 7\
								GROUP BY DM.producto, A.id \
								ORDER BY DM.producto) as egreso ON  P.id = egreso.prod_DM\
						INNER JOIN (SELECT I.producto as prod_inv,I.almacen as id_alm_inv, Al.nombre AS nomb_almac,Su.id as id_sur_inv, Su.nombre as nomb_sucursal,SUM(I.cantidad) as cant_inv\
								FROM inv_inventario I\
								INNER JOIN agil_producto AS f ON I.producto = f.id\
								LEFT JOIN agil_almacen as Al ON I.almacen = Al.id\
								LEFT JOIN agil_sucursal as Su ON Al.sucursal = Su.id\
								WHERE \
								f.empresa = 35\
								GROUP BY I.producto, Al.id , Su.id\
								ORDER BY I.producto \
								) as invent ON P.id = invent.prod_inv\
					WHERE P.empresa = 35\
					AND P.codigo is not null \
					AND ingresos.prod_DM=egreso.prod_DM\
					AND ingresos.id_almac=egreso.id_almac\
					AND ingresos.id_sucur=egreso.id_sucur\
					AND ingresos.prod_DM=invent.prod_inv\
					AND ingresos.id_almac=invent.id_alm_inv\
					AND ingresos.id_sucur=invent.id_sur_inv\
					GROUP BY P.id,ingresos.id_almac\
					ORDER BY ingresos.id_sucur, ingresos.id_almac,P.id \
			) AS igual\
			WHERE\
			igual.diferencias<0\
			ORDER BY igual.diferencias ASC", { type: sequelize.QueryTypes.SELECT })
				.then(async function (data) {

					for (let index = 0; index < data.length; index++) {
						var items = data[index]
						var cantidadTotal = items.diferencias
						/* if (items.id_productoo == 40890 && items.id_almacenn == 75) {
							console.log(items)
						} */
						await Inventario.findAll({
							where: { id_almacen: items.id_almacenn, id_producto: items.id_productoo, cantidad: { $gt: 0 } },
							order: [['id', 'asc']]
						}).then(async function (inventarioss) {
							if (inventarioss.length > 1) {
								for (var i = 0; i < inventarioss.length; i++) {
									var inventario = inventarioss[i]
									if (cantidadTotal > 0) {
										var cantidadParcial;
										if (cantidadTotal > inventario.cantidad) {
											cantidadParcial = inventario.cantidad;
											cantidadTotal = cantidadTotal - inventario.cantidad
										} else {
											cantidadParcial = cantidadTotal;
											cantidadTotal = 0;
										}

										if (cantidadParcial > 0) {
											await Inventario.update({
												cantidad: inventario.cantidad - cantidadParcial,
												costo_total: inventario.costo_unitario * (inventario.cantidad - cantidadParcial)
											}, {
												where: { id: inventario.id }

											}).then(async function (inventarioDescontado) {
											})
										}
									}
								}
							} else {
								if (inventarioss.length == 1) {

									if (inventarioss[0].cantidad >= cantidadTotal) {

										await Inventario.findOne({
											where: { id: inventarioss[0].id }
										}).then(async function (params) {
											await Inventario.update({
												cantidad: inventarioss[0].cantidad - cantidadTotal,
												costo_total: inventarioss[0].costo_unitario * (inventarioss[0].cantidad - cantidadTotal)
											}, {
												where: { id: inventarioss[0].id }

											}).then(function (inventarioDescontado) {

											})
										});
									}
								}
							}
						})
					}
					res.json({ mensaje: "terminoooo" });
				});
		});

	router.route('/productoss/crear-movimientos/empresa/:id_empresa')
		//saldo por producto
		.get(async function (req, res) {
			await sequelize.query("SELECT \
		DV.id as id_DV,\
		DV.producto as id_producto_dv, \
		P.codigo as codigo_prod, \
		DV.cantidad as cantidad_DV, \
		DV.importe as importe_DV, \
		V.movimiento as id_mov_v, \
		V.fecha as fecha_v, \
		V.almacen_traspaso as almac_trasp,\
		M.fecha as fecha_m,\
		M.createdAt as fecha_creat,\
		M.updatedAt as fecha_updat,\
		M.almacen as id_almacen_M, \
		M.clase as clase_M,\
		invent.cant_inv as cantid_inv_disp,\
		invent.cant_inv - DV.cantidad as faltantes\
		FROM inv_detalle_venta AS DV\
		INNER JOIN inv_venta AS V ON DV.venta = V.id\
		INNER JOIN agil_producto as P ON DV.producto=P.id\
		INNER JOIN sys_usuario as U ON V.usuario = U.id\
		INNER JOIN inv_movimiento AS M ON V.movimiento = M.id\
		INNER JOIN (SELECT I.producto as prod_inv,I.almacen as id_alm_inv,Su.id as id_sur_inv, Su.nombre as nomb_sucursal,SUM(I.cantidad) as cant_inv\
			FROM inv_inventario I\
			INNER JOIN agil_producto AS f ON I.producto = f.id\
			LEFT JOIN agil_almacen as Al ON I.almacen = Al.id\
			LEFT JOIN agil_sucursal as Su ON Al.sucursal = Su.id\
			WHERE \
			f.empresa = 35\
			GROUP BY I.producto, Al.id , Su.id\
			ORDER BY I.producto \
			) as invent ON P.id = invent.prod_inv AND M.almacen = invent.id_alm_inv\
		WHERE DV.inventario IS NULL\
		AND U.empresa = 35\
		HAVING V.fecha>'2021-03-01 20:00:00'\
		ORDER BY V.fecha, DV.producto", { type: sequelize.QueryTypes.SELECT })
				.then(async function (data) {


					for (let index = 0; index < data.length; index++) {
						var items = data[index]
						var cantidadTotal = items.cantidad_DV

						await Inventario.findAll({
							where: { id_almacen: items.id_almacen_M, id_producto: items.id_producto_dv, cantidad: { $gt: 0 } },
							order: [['id', 'asc']]
						}).then(async function (inventarioss) {
							if (inventarioss.length > 1) {
								for (var i = 0; i < inventarioss.length; i++) {
									var inventario = inventarioss[i]
									if (cantidadTotal > 0) {
										var cantidadParcial;
										if (cantidadTotal > inventario.cantidad) {
											cantidadParcial = inventario.cantidad;
											cantidadTotal = cantidadTotal - inventario.cantidad
										} else {
											cantidadParcial = cantidadTotal;
											cantidadTotal = 0;
										}

										if (cantidadParcial > 0) {
											await DetalleVenta.update({
												id_inventario: inventario.id
											}, {
												where: { id: items.id_DV }

											}).then(async function (detall_inv_modif) {

												await Inventario.update({
													cantidad: inventario.cantidad - cantidadParcial,
													costo_total: inventario.costo_unitario * (inventario.cantidad - cantidadParcial)
												}, {
													where: { id: inventario.id }

												}).then(async function (detalleMov_rest) {
													await DetalleMovimiento.create({
														id_producto: items.id_producto_dv,
														id_movimiento: items.id_mov_v,
														costo_unitario: inventario.costo_unitario,
														cantidad: cantidadParcial,
														importe: inventario.costo_unitario * cantidadParcial,
														recargo: 0,
														ice: 0,
														excento: 0,
														tipo_descuento: 0,
														tipo_recargo: 0,
														descuento: 0,
														total: inventario.costo_unitario * cantidadParcial,
														fecha_vencimiento: null,
														lote: null,
														id_inventario: inventario.id

													}).then(async function (movimEgreso_Creado) {

													})


												})
											})


										}
									}
								}

								var costoUnit_inv = inventarioss[inventarioss.length - 1].costo_unitario
								await Inventario.create({
									id_almacen: items.almac_trasp,
									id_producto: items.id_producto_dv,
									cantidad: items.cantidad_DV,
									costo_unitario: costoUnit_inv,
									costo_total: costoUnit_inv * items.cantidad_DV,
									fecha_vencimiento: null,
									lote: null
								}).then(async function (inventarioIgresoCreado) {
									await Movimiento.findOne({
										where: {
											fecha: items.fecha_m,
											createdAt: items.fecha_creat,
											updatedAt: items.fecha_updat,
											id_almacen: items.almac_trasp,
											id_tipo: 6
										}
									}).then(async function (ingreso_encontrado) {
										await DetalleMovimiento.create({

											id_producto: items.id_producto_dv,
											id_movimiento: ingreso_encontrado.id,
											costo_unitario: inventarioIgresoCreado.costo_unitario,
											cantidad: items.cantidad_DV,
											importe: inventarioIgresoCreado.costo_unitario * items.cantidad_DV,
											recargo: 0,
											ice: 0,
											excento: 0,
											tipo_descuento: 0,
											tipo_recargo: 0,
											descuento: 0,
											total: inventarioIgresoCreado.costo_unitario * items.cantidad_DV,
											fecha_vencimiento: null,
											lote: null,
											id_inventario: inventarioIgresoCreado.id

										}).then(async function (movimIngreso_Creado) {

										})
									})

								})

							} else {

								if (inventarioss.length == 1) {


									if (inventarioss[0].cantidad >= cantidadTotal) {
										await DetalleVenta.update({
											id_inventario: inventarioss[0].id
										}, {
											where: { id: items.id_DV }

										}).then(async function (detall_inv_modif) {

											await DetalleMovimiento.create({

												id_producto: items.id_producto_dv,
												id_movimiento: items.id_mov_v,
												costo_unitario: inventarioss[0].costo_unitario,
												cantidad: cantidadParcial,
												importe: inventarioss[0].costo_unitario * cantidadTotal,
												recargo: 0,
												ice: 0,
												excento: 0,
												tipo_descuento: 0,
												tipo_recargo: 0,
												descuento: 0,
												total: inventarioss[0].costo_unitario * cantidadTotal,
												fecha_vencimiento: null,
												lote: null,
												id_inventario: inventarioss[0].id

											}).then(async function (movimEgreso_Creado) {
												await Inventario.findOne({
													where: { id: inventarioss[0].id }
												}).then(async function (params) {
													await Inventario.update({
														cantidad: inventarioss[0].cantidad - cantidadTotal,
														costo_total: inventarioss[0].costo_unitario * (inventarioss[0].cantidad - cantidadTotal)
													}, {
														where: { id: inventarioss[0].id }

													}).then(async function (detalleMov_rest) {
														var costoUnit_inv = inventarioss[0].costo_unitario
														await Inventario.create({
															id_almacen: items.almac_trasp,
															id_producto: items.id_producto_dv,
															cantidad: items.cantidad_DV,
															costo_unitario: costoUnit_inv,
															costo_total: costoUnit_inv * items.cantidad_DV,
															fecha_vencimiento: null,
															lote: null
														}).then(async function (inventarioIgresoCreado) {
															await Movimiento.findOne({
																where: {
																	fecha: items.fecha_m,
																	createdAt: items.fecha_creat,
																	updatedAt: items.fecha_updat,
																	id_almacen: items.almac_trasp,
																	id_tipo: 6
																}
															}).then(async function (ingreso_encontrado) {
																await DetalleMovimiento.create({

																	id_producto: items.id_producto_dv,
																	id_movimiento: ingreso_encontrado.id,
																	costo_unitario: inventarioIgresoCreado.costo_unitario,
																	cantidad: items.cantidad_DV,
																	importe: inventarioIgresoCreado.costo_unitario * items.cantidad_DV,
																	recargo: 0,
																	ice: 0,
																	excento: 0,
																	tipo_descuento: 0,
																	tipo_recargo: 0,
																	descuento: 0,
																	total: inventarioIgresoCreado.costo_unitario * items.cantidad_DV,
																	fecha_vencimiento: null,
																	lote: null,
																	id_inventario: inventarioIgresoCreado.id

																}).then(async function (movimIngreso_Creado) {

																})
															})
														})
													})
												})
											})
										})
									}
								}
							}
						})

					}
					res.json({ mensaje: "terminoooo" });
				});
		});

	//* Obtiene productos por nombre para facturación
	router.route('/productos/facturacion/:id_empresa/:id_almacen/:texto')
	.get( async( req, res ) => {
		try {
			const { id_empresa, id_almacen, texto } = req.params
			if(!( id_empresa || id_almacen || texto ) ) return res.json({ error: true, message:'<b class="small">Parámetros incorrectos</b>'})
			let query = `SELECT p.id,p.codigo, p.codigoUnidadMedida,p.nombre,p.unidad_medida,  p.descripcion, p.precio_unitario,
			p.activar_inventario,p.codigoActividad,p.codigoProductoServ,
			p.numero_imei,i.costo_unitario,i.costo_unitario_neto,
			i.fecha_vencimiento,i.lote,SUM(i.cantidad) disponible 
			FROM agil_producto p 
			INNER JOIN inv_inventario i ON i.producto=p.id 
			AND i.almacen=${ id_almacen} 
			WHERE codigoUnidadMedida IS NOT NULL AND p.codigoActividad IS NOT NULL AND p.codigoProductoServ AND p.empresa=${ id_empresa } 
			AND (p.nombre LIKE "%${ texto}%" 
			OR p.codigo LIKE "%${texto}%") 
			GROUP BY p.id 
			ORDER BY i.id ASC`
			let data = await sequelize.query(query,{ type: sequelize.QueryTypes.SELECT })
			if(data == 0 ) return res.json({ error: true, message: '<b class="small">Productos no encontrados</b>'})
			return res.json({ error: false, data })
		} catch (e) {
			res.json({ error: true, message: "<b class='small'" + e.toString() + "</b>" })
		}
	})









}