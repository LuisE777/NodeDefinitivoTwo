module.exports = function (router, sequelize, forEach, decodeBase64Image, fs, Empresa, Proveedor, Compra, CompraReprogramacionPago, Pedido, ProveedorAnticipo, Sucursal, ensureAuthorizedlogged, Producto, EvaluacionProveedor, DetalleCalificacionProveedor, Clase, DetalleCompra,
	ConfiguracionCalificacionProveedor, Persona, Usuario, MedicoPaciente, RrhhEmpleadoFicha, RrhhEmpleadoCargo, EvaluacionProveedorCalificacion, EvaluacionProveedorGeneral, DetalleEvaluacionProveedorGeneral, EvaluacionProveedorCalificacionGeneral, Tipo, Movimiento,CuentasBancoProveedor) {
	router.route('/proveedores/comprobante/compra/empresa/:id_empresa')
		.post(ensureAuthorizedlogged, function (req, res) {
			sequelize.transaction(async function (t) {
				const proveedorNuevo = await Proveedor.create({
					id_empresa: req.params.id_empresa,
					razon_social: req.body.razon_social,
					nit: req.body.nit,
					estado: "V"
				}, { transaction: t }).catch(function (err) {
					return new Promise(function (fulfill, reject) {
						reject((err.stack !== undefined) ? err.stack : err);
					});
				});
				return new Promise((f, r) => { f(proveedorNuevo) })
			}).then(function (result) {
				res.json({ proveedorNuevo: result, mensaje: 'Proveedor creado satisfactoriamente' })
			}).catch(function (err) {
				res.json({ hasError: true, message: err.stack });
			})
		});
	router.route('/proveedores')

		.post(ensureAuthorizedlogged, function (req, res) {
			Proveedor.find({
				where: {
					$or: [{ nit: req.body.nit }, { codigo: req.body.codigo }],
					id_empresa: req.body.id_empresa
				},
			}).then(function (proveedor) {
				if (proveedor) {

					Proveedor.update({
						id_empresa: req.body.id_empresa,
						razon_social: req.body.razon_social,
						codigo: req.body.codigo,
						nit: req.body.nit,
						direccion: req.body.direccion,
						telefono1: req.body.telefono1,
						telefono2: req.body.telefono2,
						email: req.body.email,
						contacto: req.body.contacto,
						rubro: req.body.rubro,
						categoria: req.body.categoria,
						ubicacion_geografica: req.body.ubicacion_geografica,
						fecha1: req.body.fecha1,
						fecha2: req.body.fecha2,
						texto1: req.body.texto1,
						texto2: req.body.texto2
					}, {
						where: {
							id: proveedor.id
						}

					}).then(function (clienteCreado) {
						guardarContratosProvedor(req, res, proveedor)
						res.json(proveedor);
					});


				} else {
					Proveedor.create({
						id_empresa: req.body.id_empresa,
						razon_social: req.body.razon_social,
						codigo: req.body.codigo,
						nit: req.body.nit,
						direccion: req.body.direccion,
						telefono1: req.body.telefono1,
						telefono2: req.body.telefono2,
						email: req.body.email,
						contacto: req.body.contacto,
						rubro: req.body.rubro,
						categoria: req.body.categoria,
						ubicacion_geografica: req.body.ubicacion_geografica,
						fecha1: req.body.fecha1,
						fecha2: req.body.fecha2,
						texto1: req.body.texto1,
						texto2: req.body.texto2,
						estado: "V"
					}).then(async function (proveedorCreado) {
						if(req.body.banco){
							const nroCuentaCreado = await CuentasBancoProveedor.create({
								id_proveedor: proveedorCreado.id,
								id_banco: req.body.banco.id,
								nro_cuenta: req.body.nro_cuenta?req.body.nro_cuenta:0,
								predefinido: true,
								eliminado: false
							})
						}
						guardarContratosProvedor(req, res, proveedorCreado)
						res.json(proveedorCreado);
					});
				}
			});
		});

	function guardarContratosProvedor(req, res, proveedor) {
		if (req.body.documento_nit1) {
			fs.writeFileSync('./documentos/proveedores/documento-nit-' + proveedor.id + "-" + req.body.documento_nit1[0].nombre, req.body.documento_nit1[0].data, 'binary', function (err) {
				if (err)
					console.log(err);
				else
					console.log("The file was saved!");
			});

			Proveedor.update({
				documento_nit: req.body.documento_nit1[0].nombre
			}, {
				where: { id: proveedor.id }
			}).then(function (affecteedRows) {
			});
		}
		if (req.body.documento_funda_empresa1) {
			fs.writeFileSync('./documentos/proveedores/documento-fundaempresa-' + proveedor.id + "-" + req.body.documento_funda_empresa1[0].nombre, req.body.documento_funda_empresa1[0].data, 'binary', function (err) {
				if (err)
					console.log(err);
				else
					console.log("The file was saved!");
			});

			Proveedor.update({
				documento_funda_empresa: req.body.documento_funda_empresa1[0].nombre
			}, {
				where: { id: proveedor.id }
			}).then(function (affecteedRows) {
			});
		}
		if (req.body.documento_ci1) {
			fs.writeFileSync('./documentos/proveedores/documento-ci-' + proveedor.id + "-" + req.body.documento_ci1[0].nombre, req.body.documento_ci1[0].data, 'binary', function (err) {
				if (err)
					console.log(err);
				else
					console.log("The file was saved!");
			});

			Proveedor.update({
				documento_ci: req.body.documento_ci1[0].nombre
			}, {
				where: { id: proveedor.id }
			}).then(function (affecteedRows) {
			});
		}
		if (req.body.documento_licencia_funcionamiento1) {
			fs.writeFileSync('./documentos/proveedores/documento-licencia-funcionamiento-' + proveedor.id + "-" + req.body.documento_licencia_funcionamiento1[0].nombre, req.body.documento_licencia_funcionamiento1[0].data, 'binary', function (err) {
				if (err)
					console.log(err);
				else
					console.log("The file was saved!");
			});

			Proveedor.update({
				documento_licencia_funcionamiento: req.body.documento_licencia_funcionamiento1[0].nombre
			}, {
				where: { id: proveedor.id }
			}).then(function (affecteedRows) {
			});
		}
		if (req.body.documento_seguro_social1) {
			fs.writeFileSync('./documentos/proveedores/documento-seguro-social-' + proveedor.id + "-" + req.body.documento_seguro_social1[0].nombre, req.body.documento_seguro_social1[0].data, 'binary', function (err) {
				if (err)
					console.log(err);
				else
					console.log("The file was saved!");
			});

			Proveedor.update({
				documento_seguro_social: req.body.documento_seguro_social1[0].nombre
			}, {
				where: { id: proveedor.id }
			}).then(function (affecteedRows) {
			});
		}

	}
	router.route('/proveedor/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda')
		.get(ensureAuthorizedlogged, function (req, res) {
			var condicionProveedor = { id_empresa: req.params.id_empresa, estado: "V" };
			if (parseInt(req.params.texto_busqueda)) {
				condicionProveedor = { id_empresa: req.params.id_empresa, nit: parseInt(req.params.texto_busqueda), estado: "V" }
			} else if (req.params.texto_busqueda != 0) {
				condicionProveedor = {
					id_empresa: req.params.id_empresa,
					estado: "V",
					$or: [
						{
							codigo: {
								$like: "%" + req.params.texto_busqueda + "%"
							}
						},
						{
							razon_social: {
								$like: "%" + req.params.texto_busqueda + "%"
							}
						},
						{
							direccion: {
								$like: "%" + req.params.texto_busqueda + "%"
							}
						},
						{
							rubro: {
								$like: "%" + req.params.texto_busqueda + "%"
							}
						},
						{
							categoria: {
								$like: "%" + req.params.texto_busqueda + "%"
							}
						},
						{
							ubicacion_geografica: {
								$like: "%" + req.params.texto_busqueda + "%"
							}
						}

					]
				};
			}

			Proveedor.findAndCountAll({

				where: condicionProveedor,
				include: [{ model: Empresa, as: 'empresa' }],
				order: [['id', 'asc']]
			}).then(function (data) {
				Proveedor.findAll({
					offset: (req.params.items_pagina * (req.params.pagina - 1)), limit: req.params.items_pagina,
					where: condicionProveedor,
					include: [{ model: Empresa, as: 'empresa' }],
					order: [['id', 'asc']]
				}).then(function (proveedores) {
					res.json({ proveedores: proveedores, paginas: Math.ceil(data.count / req.params.items_pagina) });
				});
			});
		});
	router.route('/proveedores/empresa/:id_empresa')
		.get(ensureAuthorizedlogged, function (req, res) {
			Proveedor.findAll({
				where: { id_empresa: req.params.id_empresa },
				include: [{ model: Empresa, as: 'empresa' }]
			}).then(function (proveedores) {
				res.json(proveedores);
			});
		});

	router.route('/proveedores/empresa')
		.post(ensureAuthorizedlogged, function (req, res) {
			req.body.proveedores.forEach(function (proveedor, index, array) {
				Proveedor.find({
					where: {
						id_empresa: req.body.id_empresa,
						$or: [{ nit: proveedor.nit }, { codigo: proveedor.codigo }]
					},
				}).then(function (proveedorEncontrado) {
					if (proveedorEncontrado) {
						Proveedor.update({
							razon_social: proveedor.razon_social,
							codigo: proveedor.codigo,
							nit: proveedor.nit,
							direccion: proveedor.direccion,
							telefono1: proveedor.telefono1,
							telefono2: proveedor.telefono2,
							email: proveedor.email,
							contacto: proveedor.contacto,
							rubro: proveedor.rubro,
							categoria: proveedor.categoria,
							ubicacion_geografica: proveedor.ubicacion_geografica,
							fecha1: proveedor.fecha1,
							fecha2: proveedor.fecha2,
							texto1: proveedor.texto1,
							texto2: proveedor.texto2
						}, {
							where: {
								id: proveedorEncontrado.id
							}
						}).then(function (clienteCreado) {
							if (index === (array.length - 1)) {
								res.json({ mensaje: "¡Datos de Proveedores actualizados satisfactoriamente!" });
							}
						});
					} else {
						Proveedor.create({
							id_empresa: req.body.id_empresa,
							razon_social: proveedor.razon_social,
							codigo: proveedor.codigo,
							nit: proveedor.nit,
							direccion: proveedor.direccion,
							telefono1: proveedor.telefono1,
							telefono2: proveedor.telefono2,
							email: proveedor.email,
							contacto: proveedor.contacto,
							rubro: proveedor.rubro,
							categoria: proveedor.categoria,
							ubicacion_geografica: proveedor.ubicacion_geografica,
							fecha1: proveedor.fecha1,
							fecha2: proveedor.fecha2,
							texto1: proveedor.texto1,
							texto2: proveedor.texto2,
							estado: "V"
						}).then(function (proveedorCreado) {
							if (index === (array.length - 1)) {
								res.json({ mensaje: "Proveedores creados satisfactoriamente!" });
							}
						});
					}
				});
			});
		});

	router.route('/proveedor-vencimiento-Deudas/:id')
		.put(ensureAuthorizedlogged, function (req, res) {
			var inicio_fecha_anterior = new Date(req.body.fecha_anterior);
			inicio_fecha_anterior.setHours(0, 0, 0, 0, 0);
			var fin_fecha_anterior = new Date(req.body.fecha_anterior);
			fin_fecha_anterior.setHours(23, 59, 59, 0, 0);
			Compra.update({
				dias_credito: req.body.dias_credito,
			}, {
				where: {
					id: req.params.id
				}
			}).then(function (compraActualizada) {
				CompraReprogramacionPago.update({
					activo: false
				}, {
					where: {
						//fecha_reprogramacion:{ $between: [inicio_fecha_anterior, fin_fecha_anterior] },
						id_compra: req.params.id
					}

				}).then(function (compraReproActializada) {
					CompraReprogramacionPago.create({
						id_compra: req.params.id,
						fecha_reprogramacion: req.body.fecha_reprogramacion,
						fecha_anterior: req.body.fecha_anterior,
						activo: true
					}).then(function (FechasReporgrmacionCreadas) {
						res.json({ mensaje: "¡Reprogramacion satisfactoriamente!" });
					});
				});
			});
		})
	router.route('/proveedores/:id_proveedor')
		.put(ensureAuthorizedlogged, function (req, res) {
			Proveedor.update({
				razon_social: req.body.razon_social,
				codigo: req.body.codigo,
				nit: req.body.nit,
				direccion: req.body.direccion,
				telefono1: req.body.telefono1,
				telefono2: req.body.telefono2,
				email: req.body.email,
				contacto: req.body.contacto,
				rubro: req.body.rubro,
				categoria: req.body.categoria,
				ubicacion_geografica: req.body.ubicacion_geografica,
				fecha1: req.body.fecha1,
				fecha2: req.body.fecha2,
				texto1: req.body.texto1,
				texto2: req.body.texto2
			}, {
				where: {
					id: req.params.id_proveedor
				}
			}).then(function (proveedorCreado) {
				guardarContratosProvedor(req, res, req.body)
				res.json(req.body);
			});
		})

		.delete(ensureAuthorizedlogged, function (req, res) {
			Compra.findAll({
				where: {
					id_proveedor: req.params.id_proveedor
				}
			}).then(function (comprasProvedor) {
				Pedido.findAll({
					where: {
						id_proveedor: req.params.id_proveedor
					}
				}).then(function (pedidosProvedor) {
					if (comprasProvedor.length == 0 && pedidosProvedor.length == 0) {
						Proveedor.destroy({
							where: {
								id: req.params.id_proveedor
							}
						}).then(function (affectedRows) {
							res.json({ mensaje: "Eliminado Satisfactoriamente!" });
						});
					} else {
						res.json({ mensaje: "El Provedor cuenta con movimientos Realizados no es posible eliminar!" });
					}

				});
			});
		});

	router.route('/proveedores/empresa/:id_empresa/texto/:texto')
		.get(ensureAuthorizedlogged, function (req, res) {
			var orCondition = [];
			if (parseInt(req.params.texto)) {
				orCondition.push({ nit: parseInt(req.params.texto) });
			} else {
				orCondition.push({ razon_social: { $like: "%" + req.params.texto + "%" } });
			}
			Proveedor.findAll({
				where: {
					$and: { id_empresa: req.params.id_empresa, estado: "V", $or: orCondition }
				}
			}).then(function (proveedores) {
				res.json(proveedores);
			});
		});

	router.route('/proveedores/productos/empresa/:id_empresa/:id_proveedor')
		.get(ensureAuthorizedlogged, function (req, res) {
			sequelize.query('select productos from agil_proveedor where id = ' + req.params.id_proveedor, { type: sequelize.QueryTypes.SELECT })
				.then(function (productos) {
					res.json({ productos: productos[0].productos })
				}).catch(function (err) {
					res.json({ mensaje: (err.stack !== undefined) ? err.stack : err, hasErr: true })
				})
		})
	router.route('/proveedores/productos/empresa/:id_empresa')
		.post(ensureAuthorizedlogged, function (req, res) {
			var productos = ""
			req.body.productos.forEach(function (id) {
				if (productos.length == 0) {
					productos += id
				} else {
					productos += "," + id
				}
			})
			Proveedor.update({
				productos: productos
			}, {
				where: { id: req.body.id_proveedor }
			}).then(function (productosProveedorActualizados) {
				res.json({ mensaje: 'Productos del proveedor actualizados' })
			}).catch(function (err) {
				res.json({ mensaje: (err.stack !== undefined) ? err.stack : err, hasErr: true })
			})
		})

	router.route('/anticipo-proveedor/proveedor/:id_proveedor')
		.post(ensureAuthorizedlogged, function (req, res) {
			Sucursal.find({
				where: { id: req.body.id_sucursal }
			}).then(function (sucursalEncontrada) {
				ProveedorAnticipo.create({
					id_proveedor: parseInt(req.params.id_proveedor),
					monto_anticipo: req.body.monto_anticipo,
					fecha: req.body.fecha,
					monto_salida: req.body.monto_salida,
					saldo: req.body.saldo,
					id_sucursal: req.body.id_sucursal,
					numero_correlativo_anticipo: sucursalEncontrada.anticipo_proveedor_correlativo,
					eliminado: false
				}).then(function (provedorAnticipoCreado) {
					var correlativo = sucursalEncontrada.anticipo_proveedor_correlativo + 1
					Sucursal.update({
						anticipo_proveedor_correlativo: correlativo
					}, {
						where: { id: req.body.id_sucursal }
					}).then(function (Actualizado) {
						ProveedorAnticipo.find({
							where: { id: provedorAnticipoCreado.id },
							include: [{ model: Sucursal, as: 'sucursal' }, { model: Proveedor, as: 'proveedor' }]
						}).then(function (encontrado) {
							res.json({ mensaje: "anticipo guardado satisfactoriamente!", anticipo: encontrado });
						})

					})

				});
			})
		})
		.get(ensureAuthorizedlogged, function (req, res) {
			ProveedorAnticipo.findAll({
				where: { id_proveedor: req.params.id_proveedor, padre: null }
			}).then(function (clientesAnticipos) {
				res.json(clientesAnticipos);
			})

		})

	router.route('/busquedaProveedorCodigo/empresa/:id_empresa/texto/:texto')
		.get(function (req, res) {
			Proveedor.findAll({
				where: {
					id_empresa: req.params.id_empresa,
					codigo: req.params.texto,
					estado: "V"
				}
			}).then(function (proveedor) {
				res.json(proveedor);
			});
		});

	router.route('/busquedaProveedorNit/empresa/:id_empresa/texto/:texto')
		.get(function (req, res) {
			Proveedor.findAll({
				where: {
					id_empresa: req.params.id_empresa,
					nit: req.params.texto,
					estado: "V"
				}
			}).then(function (proveedor) {
				res.json(proveedor);
			});
		});
	router.route('/registro-evaluacion-proveedor/proveedor/:id_proveedor/inicio/:inicio/fin/:fin/pagina/:pagina/items_pagina/:items_pagina/texto_busqueda/:texto_busqueda/columna/:columna/direccion/:direccion')
		.get(async function (req, res) {
			try {
				let condicionEvaluacion = { id_proveedor: req.params.id_proveedor, eliminado: false }
				if (req.params.inicio != 0) {
					let inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0);
					let fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 59);
					condicionEvaluacion.fecha_elaboracion = { $between: [inicio, fin] };
				}
				let datosBusqueda = {
					where: condicionEvaluacion,
					limit: req.params.items_pagina,
				}

				let datos = await EvaluacionProveedor.findAndCountAll(datosBusqueda)
				datosBusqueda.offset = (req.params.items_pagina * (req.params.pagina - 1))
				if (req.params.items_pagina == 0) {
					delete datosBusqueda['offset'];
					delete datosBusqueda['limit'];
				}
				let registros = await EvaluacionProveedor.findAll(datosBusqueda)
				res.json({ registros: registros, paginas: Math.ceil(datos.count / req.params.items_pagina) });

			} catch (err) {
				res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
			}
		})

	router.route('/registro-evaluacion-proveedor/proveedor/:id_proveedor/inicio/:inicio/fin/:fin/fecha_elaboracion/:fecha_elaboracion/configuracion_iso/:id_configuracion_iso/usuario/:id_usuario')
		.get(async function (req, res) {
			sequelize.transaction(async function (t) {
				let condicionCompra = { id_proveedor: req.params.id_proveedor, id_almacen: { $ne: null } }
				if (req.params.inicio != 0) {
					let inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0);
					let fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 59);
					condicionCompra.fecha = { $between: [inicio, fin] };
				}

				/* let data = await DetalleCalificacionProveedor.findAll({
					transaction: t,
					attributes: [[sequelize.fn('GROUP_CONCAT', sequelize.fn('DISTINCT', sequelize.col('`agil_detalle_calificacion_proveedor`.`id`'))), 'ids']],
					include: [{ model: Compra, as: 'compra', where: condicionCompra }]
				})
				let detalles = data[0] */
				let data = await DetalleCompra.findAll({
					transaction: t,
					attributes: [[sequelize.fn('GROUP_CONCAT', sequelize.fn('DISTINCT', sequelize.col('`inv_detalle_compra`.`id`'))), 'ids']],
					include: [{
						model: Producto, as: 'producto',
						attributes: [[sequelize.fn('GROUP_CONCAT', sequelize.fn('DISTINCT', sequelize.col('`producto`.`grupo`'))), 'ids_grupos']],
					},
					{
						model: Compra, as: 'compra', where: condicionCompra,
						attributes: [[sequelize.fn('GROUP_CONCAT', sequelize.fn('DISTINCT', sequelize.col('`compra`.`factura`'))), 'facturas'], [sequelize.fn('GROUP_CONCAT', sequelize.fn('DISTINCT', sequelize.col('`compra`.`id`'))), 'ids_compras']], where: condicionCompra
					}]
				})

				let detalleCompra = data[0]
				data = await DetalleCalificacionProveedor.findAll({
					transaction: t,
					attributes: [[sequelize.fn('GROUP_CONCAT', sequelize.fn('DISTINCT', sequelize.col('`agil_detalle_calificacion_proveedor`.`id`'))), 'ids']],
					include: [{
						model: Compra, as: 'compra', include: [{
							model: Movimiento, as: 'movimiento',
							include: [{
								model: Clase, as: 'clase', where: { nombre_corto: { $in: ['ID', 'IPI', 'IPRS', 'IPRB'] } },
								include: [{ model: Tipo, as: 'tipo', where: { nombre_corto: 'MOVING' } }]
							}]
						}], where: {
							id: {
								$in: detalleCompra.dataValues.compra.dataValues.ids_compras.split(','),
							}
						}
					}]
				})
				let detalles = data[0]
				let registros = detalles.dataValues.ids;
				if (!detalleCompra.dataValues.ids) {
					throw new Error('el proveedor no cuenta con compras realizadas en ese periodo.');
				}
				data = await Clase.findAll({
					attributes: [[sequelize.fn('GROUP_CONCAT', sequelize.fn('DISTINCT', sequelize.col('`nombre`'))), 'nombres']],
					where: { id: detalleCompra.dataValues.producto.dataValues.ids_grupos.split(',') }
				})
				let grupos = data[0]
				let usuario = await Usuario.find({
					where: { id: req.params.id_usuario },
					transaction: t,
					include: [{ model: Persona, as: 'persona' }]
				})
				let cargo = '';
				let area = '';
				if (usuario.dataValues.id_empleado) {
					let empleado = await MedicoPaciente.find({
						where: {
							id: usuario.dataValues.id_empleado
						},
						transaction: t,
						include: [
							{
								model: RrhhEmpleadoFicha, as: 'empleadosFichas',
								where: { activo: true },
								include: [{ model: Clase, as: 'area' },
								{
									model: RrhhEmpleadoCargo, as: 'cargos',
									include: [{
										model: Clase, as: "cargo",
										attributes: [[sequelize.fn('GROUP_CONCAT', sequelize.fn('DISTINCT', sequelize.col('`empleadosFichas.cargos.cargo`.`nombre`'))), 'nombres']]
									}]
								}]
							},

						]
					})
					let ficha = empleado.dataValues.empleadosFichas[0]
					if (ficha.dataValues.cargos.length > 0) {
						let datosCargo = ficha.dataValues.cargos[0]
						cargo = datosCargo.dataValues.cargo.dataValues.nombres
					}
					if (ficha.dataValues.area) {
						area = ficha.dataValues.area.dataValues.nombre
					}
				}
				let proveedor = await Proveedor.find({ where: { id: req.params.id_proveedor }, transaction: t })
				let telefonos = ''
				telefonos += (proveedor.dataValues.telefono1 ? proveedor.dataValues.telefono1 : '');
				telefonos += (proveedor.dataValues.telefono2 ? ',' + proveedor.dataValues.telefono2 : '');
				telefonos += (proveedor.dataValues.email ? ',' + proveedor.dataValues.email : '');
				let evaluacion = await EvaluacionProveedor.create({
					id_proveedor: req.params.id_proveedor,
					razon_social_proveedor: proveedor.dataValues.razon_social,
					direccion: proveedor.dataValues.direccion,
					telefono: telefonos,
					responsable_venta: proveedor.contacto,
					nombre_usuario: usuario.dataValues.persona.dataValues.nombre_completo,
					cargo: cargo,
					area: area,
					fecha_elaboracion: req.params.fecha_elaboracion,
					inicio: req.params.inicio,
					fin: req.params.fin,
					registros: detalles.dataValues.ids,
					productos: grupos.dataValues.nombres,
					id_configuracion_iso: req.params.id_configuracion_iso,
					eliminado: false,
				}, { transaction: t })
				let conceptosEvaluacion = await DetalleCalificacionProveedor.findAll({
					where: { id: { $in: registros.split(',') } }, transaction: t,
					attributes: [[sequelize.fn('sum', sequelize.col('`agil_detalle_calificacion_proveedor`.`puntuacion`')), 'total'], [sequelize.fn('count', sequelize.col('`agil_detalle_calificacion_proveedor`.`puntuacion`')), 'tamanio']],
					include: [{ model: Clase, as: 'concepto', include: [{ model: Tipo, as: 'tipo', where: { id_empresa: usuario.dataValues.id_empresa } }, { model: ConfiguracionCalificacionProveedor, as: 'configuracionesCalificacionesProv' }] }],
					group: ['`agil_detalle_calificacion_proveedor`.`concepto`']
				})
				let totalGeneral = 0
				let registrados = 0
				let detallesConceptoNoRegistrados = []
				for (const item of conceptosEvaluacion) {
					if (item.dataValues.tamanio > 0) {
						let total = 0
						let configuracionesCalificacionesProv = item.dataValues.concepto.dataValues.configuracionesCalificacionesProv[0]
						total = (item.dataValues.total / item.dataValues.tamanio) * (configuracionesCalificacionesProv.dataValues.porcentaje / 100)
						registrados = true
						await EvaluacionProveedorCalificacion.create({
							id_evaluacion: evaluacion.dataValues.id,
							id_concepto: item.dataValues.concepto.id,
							total: total
						}, { transaction: t })
						totalGeneral += total
					} else {
						detallesConceptoNoRegistrados.push(item.dataValues.concepto.dataValues.nombre)
					}
				}
				if (registrados == 0) {
					throw new Error('No se puede generar, porque no existen calificaciones en el periodo seleccionado.');
				}
				let tipoProveedor = totalGeneral >= 8.1 ? 'A' : totalGeneral <= 8 && totalGeneral >= 5.1 ? 'B' : 'C'
				await EvaluacionProveedor.update({
					total: totalGeneral,
					tipo_proveedor: tipoProveedor
				}, { where: { id: evaluacion.id }, transaction: t })

				return new Promise((f, r) => { f(evaluacion) })
			}).then(function (result) {
				res.json({ evaluacion: result, mensaje: 'Registro creado satisfactoriamente' })
			}).catch(function (err) {
				res.json({ mensaje: err.message !== undefined ? err.message : err.stack ? err.stack : err, hasErr: true })
			})
		})
	router.route('/registro-evaluacion-proveedor/:id_evaluacion')
		.get(async function (req, res) {
			try {
				let condicionEvaluacion = { id: req.params.id_evaluacion }
				let evaluacion = await EvaluacionProveedor.find({
					where: condicionEvaluacion,
					include: [{ model: EvaluacionProveedorCalificacion, as: 'calificaciones', include: [{ model: Clase, as: 'concepto' }] }]
				})
				res.json({ evaluacion: evaluacion })
			} catch (err) {
				res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
			}
		})

	router.route('/registro-evaluacion-proveedor-gral/empresa/:id_empresa/inicio/:inicio/fin/:fin/pagina/:pagina/items_pagina/:items_pagina/texto_busqueda/:texto_busqueda/columna/:columna/direccion/:direccion')
		.get(async function (req, res) {
			try {
				let condicionEvaluacion = { eliminado: false }
				if (req.params.inicio != 0) {
					let inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0);
					let fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 59);
					condicionEvaluacion.fecha = { $between: [inicio, fin] };
				}
				let datosBusqueda = {
					where: condicionEvaluacion,
					limit: req.params.items_pagina,
					include: [{ model: Usuario, as: 'usuario', where: { id_empresa: req.params.id_empresa } }]
				}

				let datos = await EvaluacionProveedorGeneral.findAndCountAll(datosBusqueda)
				datosBusqueda.offset = (req.params.items_pagina * (req.params.pagina - 1))
				if (req.params.items_pagina == 0) {
					delete datosBusqueda['offset'];
					delete datosBusqueda['limit'];
				}
				let registros = await EvaluacionProveedorGeneral.findAll(datosBusqueda)
				res.json({ registros: registros, paginas: Math.ceil(datos.count / req.params.items_pagina) });

			} catch (err) {
				res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
			}
		})

	router.route('/registro-evaluacion-proveedor-gral/inicio/:inicio/fin/:fin/fecha_elaboracion/:fecha_elaboracion/configuracion_iso/:id_configuracion_iso/usuario/:id_usuario/tipo_proveedor/:tipo_proveedor')
		.get(async function (req, res) {
			sequelize.transaction(async function (t) {
				let proveedoresSinCompra = []

				let usuario = await Usuario.find({
					where: { id: req.params.id_usuario },
					transaction: t,
					include: [{ model: Persona, as: 'persona' }]
				})
				let registrados=0
				let cargo = '';
				let area = '';
				let proveedores = await Proveedor.findAll({
					where: { id_empresa: usuario.dataValues.id_empresa, estado: 'V' }
				})
				if (usuario.dataValues.id_empleado) {
					let empleado = await MedicoPaciente.find({
						where: {
							id: usuario.dataValues.id_empleado
						},
						transaction: t,
						include: [
							{
								model: RrhhEmpleadoFicha, as: 'empleadosFichas',
								where: { activo: true },
								include: [{ model: Clase, as: 'area' },
								{
									model: RrhhEmpleadoCargo, as: 'cargos',
									include: [{
										model: Clase, as: "cargo",
										attributes: [[sequelize.fn('GROUP_CONCAT', sequelize.fn('DISTINCT', sequelize.col('`empleadosFichas.cargos.cargo`.`nombre`'))), 'nombres']]
									}]
								}]
							},

						]
					})
					let ficha = empleado.dataValues.empleadosFichas[0]
					if (ficha.dataValues.cargos.length > 0) {
						let datosCargo = ficha.dataValues.cargos[0]
						cargo = datosCargo.dataValues.cargo.dataValues.nombres
					}
					if (ficha.dataValues.area) {
						area = ficha.dataValues.area.dataValues.nombre
					}
				}
				let condicionCompra = {}
				if (req.params.inicio != 0) {
					let inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0);
					let fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 59);
					condicionCompra.fecha = { $between: [inicio, fin] };
				}
				let evaluacion = await EvaluacionProveedorGeneral.create({
					id_usuario: usuario.dataValues.id,
					tipo_proveedor: req.params.tipo_proveedor,
					fecha: req.params.fecha_elaboracion,
				}, { transaction: t })
				for (const proveedor of proveedores) {
					condicionCompra = { id_proveedor: proveedor.dataValues.id, id_almacen: { $ne: null } }

					let data = await DetalleCompra.findAll({
						transaction: t,
						attributes: [[sequelize.fn('GROUP_CONCAT', sequelize.fn('DISTINCT', sequelize.col('`inv_detalle_compra`.`id`'))), 'ids']],
						include: [{
							model: Producto, as: 'producto',
							attributes: [[sequelize.fn('GROUP_CONCAT', sequelize.fn('DISTINCT', sequelize.col('`producto`.`grupo`'))), 'ids_grupos']],
						},
						{
							model: Compra, as: 'compra', where: condicionCompra,
							attributes: [[sequelize.fn('GROUP_CONCAT', sequelize.fn('DISTINCT', sequelize.col('`compra`.`factura`'))), 'facturas'], [sequelize.fn('GROUP_CONCAT', sequelize.fn('DISTINCT', sequelize.col('`compra`.`id`'))), 'ids_compras']], where: condicionCompra
						}]
					})

					let detalleCompra = data[0]

					if (!detalleCompra.dataValues.ids) {
						proveedoresSinCompra.push(proveedor.dataValues.razon_social);
					} else {
						data = await DetalleCalificacionProveedor.findAll({
							transaction: t,
							attributes: [[sequelize.fn('GROUP_CONCAT', sequelize.fn('DISTINCT', sequelize.col('`agil_detalle_calificacion_proveedor`.`id`'))), 'ids']],
							include: [{
								model: Compra, as: 'compra', include: [{
									model: Movimiento, as: 'movimiento',
									include: [{
										model: Clase, as: 'clase', where: { nombre_corto: { $in: ['ID', 'IPI', 'IPRS', 'IPRB'] } },
										include: [{ model: Tipo, as: 'tipo', where: { nombre_corto: 'MOVING' } }]
									}]
								}], where: {
									id: {
										$in: detalleCompra.dataValues.compra.dataValues.ids_compras.split(','),
									}
								}
							}]
						})
						let detalles = data[0]
						let registros = detalles.dataValues.ids;
						let nombres_grupos = null
						let grupos = null
						if (detalleCompra.dataValues.producto.dataValues.ids_grupos) {
							data = await Clase.findAll({
								attributes: [[sequelize.fn('GROUP_CONCAT', sequelize.fn('DISTINCT', sequelize.col('`nombre`'))), 'nombres']],
								where: { id: detalleCompra.dataValues.producto.dataValues.ids_grupos.split(',') }
							})
							grupos = data[0]
						}
						nombres_grupos = grupos ? grupos.dataValues.nombres : null
						if (registros) {


							let conceptosEvaluacion = await DetalleCalificacionProveedor.findAll({
								where: { id: { $in: registros.split(',') } }, transaction: t,
								attributes: [[sequelize.fn('sum', sequelize.col('`agil_detalle_calificacion_proveedor`.`puntuacion`')), 'total'], [sequelize.fn('count', sequelize.col('`agil_detalle_calificacion_proveedor`.`puntuacion`')), 'tamanio']],
								include: [{ model: Clase, as: 'concepto', include: [{ model: Tipo, as: 'tipo', where: { id_empresa: usuario.dataValues.id_empresa } }, { model: ConfiguracionCalificacionProveedor, as: 'configuracionesCalificacionesProv' }] }],
								group: ['`agil_detalle_calificacion_proveedor`.`concepto`']
							})
							let totalGeneral = await conceptosEvaluacion.reduce((total, x) => {
								if (x.dataValues.tamanio>0) {
									registrados++
									if (x.dataValues.concepto) {
										let configuracionesCalificacionesProv = x.dataValues.concepto.dataValues.configuracionesCalificacionesProv[0]
										if (configuracionesCalificacionesProv) {
											total += (x.dataValues.total / x.dataValues.tamanio) * (configuracionesCalificacionesProv.dataValues.porcentaje / 100)
										} else {
											console.log(x)
										}
									} else {
										console.log(x)
									}
								}
								return total
							}, 0)
							let tipoProveedor = totalGeneral >= 8.1 ? 'A' : totalGeneral <= 8 && totalGeneral >= 5.1 ? 'B' : 'C'
							if (req.params.tipo_proveedor != 0) {
								if (req.params.tipo_proveedor == tipoProveedor) {
									let telefonos = ''
									telefonos += (proveedor.dataValues.telefono1 ? proveedor.dataValues.telefono1 : '');
									telefonos += (proveedor.dataValues.telefono2 ? ',' + proveedor.dataValues.telefono2 : '');
									telefonos += (proveedor.dataValues.email ? ',' + proveedor.dataValues.email : '');
									let detalleEvaluacion = await DetalleEvaluacionProveedorGeneral.create({
										id_evaluacion_general: evaluacion.dataValues.id,
										id_proveedor: proveedor.dataValues.id,
										razon_social_proveedor: proveedor.dataValues.razon_social,
										direccion: proveedor.dataValues.direccion,
										telefono: telefonos,
										responsable_venta: proveedor.dataValues.contacto,
										nombre_usuario: usuario.dataValues.persona.dataValues.nombre_completo,
										cargo: cargo,
										area: area,
										fecha_elaboracion: req.params.fecha_elaboracion,
										inicio: req.params.inicio,
										fin: req.params.fin,
										registros: detalles.dataValues.ids,
										productos: nombres_grupos,
										id_configuracion_iso: req.params.id_configuracion_iso,
										total: totalGeneral,
										tipo_proveedor: tipoProveedor
									}, { transaction: t })

									for (const item of conceptosEvaluacion) {
										if (item.dataValues.tamanio > 0) {
											let total = 0
											let configuracionesCalificacionesProv = item.dataValues.concepto.dataValues.configuracionesCalificacionesProv[0]
											if (configuracionesCalificacionesProv) {
												total = (item.dataValues.total / item.dataValues.tamanio) * (configuracionesCalificacionesProv.dataValues.porcentaje / 100)
											} else {
												console.log(configuracionesCalificacionesProv)
											}
											await EvaluacionProveedorCalificacionGeneral.create({
												id_detalle_evaluacion: detalleEvaluacion.dataValues.id,
												id_concepto: item.dataValues.concepto.id,
												total: total
											}, { transaction: t })
										}
									}
								}
							} else {
								let telefonos = ''
								telefonos += (proveedor.dataValues.telefono1 ? proveedor.dataValues.telefono1 : '');
								telefonos += (proveedor.dataValues.telefono2 ? ',' + proveedor.dataValues.telefono2 : '');
								telefonos += (proveedor.dataValues.email ? ',' + proveedor.dataValues.email : '');
								let detalleEvaluacion = await DetalleEvaluacionProveedorGeneral.create({
									id_evaluacion_general: evaluacion.dataValues.id,
									id_proveedor: proveedor.dataValues.id,
									razon_social_proveedor: proveedor.dataValues.razon_social,
									direccion: proveedor.dataValues.direccion,
									telefono: telefonos,
									responsable_venta: proveedor.contacto,
									nombre_usuario: usuario.dataValues.persona.dataValues.nombre_completo,
									cargo: cargo,
									area: area,
									fecha_elaboracion: req.params.fecha_elaboracion,
									inicio: req.params.inicio,
									fin: req.params.fin,
									registros: detalles.dataValues.ids,
									productos: grupos ? grupos.dataValues.nombres : null,
									id_configuracion_iso: req.params.id_configuracion_iso,
									total: totalGeneral,
									tipo_proveedor: tipoProveedor
								}, { transaction: t })

								for (const item of conceptosEvaluacion) {
									if (item.dataValues.tamanio > 0) {
									let total = 0
									let configuracionesCalificacionesProv = item.dataValues.concepto.dataValues.configuracionesCalificacionesProv[0]
									if (configuracionesCalificacionesProv) {
										total = (item.dataValues.total / item.dataValues.tamanio) * (configuracionesCalificacionesProv.dataValues.porcentaje / 100)
									} else {
										console.log(configuracionesCalificacionesProv)
									}
									await EvaluacionProveedorCalificacionGeneral.create({
										id_evaluacion: detalleEvaluacion.dataValues.id,
										id_concepto: item.dataValues.concepto.id,
										total: total
									}, { transaction: t })
								}
								}
							}
						}
					}
				}
				
				if(registrados==0){
					throw new Error('No se puede generar, porque no existen calificaciones en el periodo seleccionado.');
				}
				return new Promise((f, r) => { f({ evaluacion: evaluacion, proveedoresSinCompra: proveedoresSinCompra.join(', ') }) })
			}).then(function (result) {
				res.json({ datos: result, mensaje: 'Registro creado satisfactoriamente', })
			}).catch(function (err) {
				res.json({ mensaje: err.message !== undefined ? err.message : err.stack ? err.stack : err, hasErr: true })
			})
		})
	router.route('/registro-evaluacion-proveedor-gral/:id_evaluacion')
		.get(async function (req, res) {
			try {
				let condicionEvaluacion = { id: req.params.id_evaluacion }
				let evaluacion = await EvaluacionProveedorGeneral.find({
					where: condicionEvaluacion,
					include: [{
						model: DetalleEvaluacionProveedorGeneral, as: 'detallesEvaluacion',
						include: [{ model: EvaluacionProveedorCalificacionGeneral, as: 'calificaciones', include: [{ model: Clase, as: 'concepto' }] }]
					}]
				})
				res.json({ evaluacion: evaluacion })
			} catch (err) {
				res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
			}
		})
	router.route('/proveedor/bancos/asfi')
        .get(ensureAuthorizedlogged,  async function (req, res) {
			try {
				const tipo = await Tipo.find({ where:{ nombre_corto: "BASIFI" } })
				const bancos = await Clase.findAll({ where: { tipo: tipo.id}})
				res.json({ bancos: bancos })
			} catch (error) {
				return new Promise(function (fulfill, reject) {
                	reject((error.stack !== undefined) ? error.stack : error);
				});
			}
		})

	router.route('/proveedor/nrocuentas/bancos/empresa')
        .post(ensureAuthorizedlogged, async function (req, res) {
			let predef = false;
			if(req.body.predefinido){
				predef = true
			}
			const nroCuentaCreado = await CuentasBancoProveedor.create({
				id_proveedor: req.body.id,
				id_banco: req.body.banco.id,
				nro_cuenta: req.body.nro_cuenta,	
				predefinido: predef,
				eliminado: false
			})
			res.json({nroCuentaCreado: nroCuentaCreado})
		})
	
	router.route('/proveedor/bancos/nrocuenta/:id_proveedor')
        .get(ensureAuthorizedlogged, async function (req, res) {
			try {
				const cuentasBancariasProveed = await CuentasBancoProveedor.findAll({ 
					where:{id_proveedor: req.params.id_proveedor},
					include:[{model:Clase, as: 'banco',
						include:[{model:Tipo, as: 'tipo', where:{ nombre_corto: "BASIFI" } }]
					}]
				})
				res.json({cuentasBancariasProveed: cuentasBancariasProveed})
			} catch (error) {
				return new Promise(function (fulfill, reject) {
                	reject((error.stack !== undefined) ? error.stack : error);
				});
			}
		})

	router.route('/eliminar/proveedor/nrocuentas/bancos/empresa')
        .post(ensureAuthorizedlogged, async function (req, res) {
			const nroCuentaCreado = await CuentasBancoProveedor.update({
				eliminado: true
			},{where: { id: req.body.id}})
			res.json({message: 'Cuenta Eliminado Correctamente', hasError:nroCuentaCreado[0]?false:true})

		})

	router.route('/predefinido/seleccionado/proveedor/nrocuentas/bancos/empresa')
        .post(ensureAuthorizedlogged, async function (req, res) {
			try {
				let cuentasBancoProv = req.body.cuentas
				for (let i = 0; i < cuentasBancoProv.length; i++) {
					const cuentaProveedor = cuentasBancoProv[i];
					const nroCuentaCreado = await CuentasBancoProveedor.update({
						predefinido: cuentaProveedor.predefinido
					},{where: { id: cuentaProveedor.id}})
				}
				res.json({message: 'Cuenta Predefinida Asignada Correctamente'})
			} catch (error) {
				return new Promise(function (fulfill, reject) {
                	reject((error.stack !== undefined) ? error.stack : error);
				});
			}
		})
	




}