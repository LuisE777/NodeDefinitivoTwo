module.exports = function (router, forEach, decodeBase64Image, fs, Empresa, Cliente, RutaCliente, Venta,
	VentaReprogramacionPago, sequelize, ClienteRazon, GtmClienteDestino, GtmDestino, Clase, ClienteAnticipo, Sucursal, ensureAuthorizedlogged,EntragaDetalleVentaCliente) {

	router.route('/clientes')
		.post(function (req, res) {
			Cliente.find({
				where: {
					$or: [{ nit: req.body.nit }, { codigo: req.body.codigo }],
					id_empresa: req.body.id_empresa
				},
			}).then(function (cliente) {
				if (cliente) {
					Cliente.update({
						destino: req.body.destino, //aumentamos esto
						razon_social: req.body.razon_social,
						codigo: req.body.codigo,
						nit: req.body.nit,
						direccion: req.body.direccion,
						telefono1: req.body.telefono1,
						telefono2: req.body.telefono2,
						telefono3: req.body.telefono3,
						contacto: req.body.contacto,
						rubro: req.body.rubro,
						categoria: req.body.categoria,
						ubicacion_geografica: req.body.ubicacion_geografica,
						fecha1: req.body.fecha1,
						fecha2: req.body.fecha2,
						texto1: req.body.texto1,
						texto2: req.body.texto2,
						latitud: req.body.latitud,
						longitud: req.body.longitud,
						linea_credito: req.body.linea_credito,
						plazo_credito: req.body.plazo_credito,
						usar_limite_credito: req.body.usar_limite_credito,
						bloquear_limite_credito: req.body.bloquear_limite_credito,
						id_tipo_precio_venta: req.body.tipoPrecioVenta?req.body.tipoPrecioVenta.id:null
					}, {
							where: {
								id: cliente.id
							}
						}).then(function (clienteCreado) {
							guardarContratosCliente(req, res, cliente)
							req.body.clientes_razon.forEach(function (cliente_razon, index, array) {
								if (!cliente_razon.eliminado) {
									ClienteRazon.create({
										id_cliente: cliente.id,
										razon_social: cliente_razon.razon_social,
										nit: cliente_razon.nit,
										codigo_sap: cliente_razon.codigo_sap,
									}).then(function (clienteRazonCreado) {
									});
								}
							});

							req.body.cliente_destinos.forEach(function (clienteDestino, index, array) {
								if (!clienteDestino.eliminado) {
									GtmClienteDestino.create({
										id_cliente: cliente.id,
										id_destino: clienteDestino.id_destino,

									}).then(function (GtmClienteDestinoCreado) {
									});
								}
							});

							res.json({ mensaje: "??Ya existia un cliente con codigo o nit iguales, por lo que se actualizo!" });
						});
				} else {
					if (req.body.correlativo) {
						Clase.find({
							where: { id: req.body.correlativo.id }
						}).then(function (correlativoEncontrado) {
							var numero_correlativo = correlativoEncontrado.nombre_corto.split("-")[0]
							var maximo = parseInt(correlativoEncontrado.nombre_corto.split("-")[1])
							if (numero_correlativo > maximo) {
								numero_correlativo = null
							}
							Cliente.create({
								destino: req.body.destino, //aumentamos esto
								id_empresa: req.body.id_empresa,
								razon_social: req.body.razon_social,
								codigo: numero_correlativo,
								nit: req.body.nit,
								direccion: req.body.direccion,
								telefono1: req.body.telefono1,
								telefono2: req.body.telefono2,
								telefono3: req.body.telefono3,
								contacto: req.body.contacto,
								rubro: req.body.rubro,
								categoria: req.body.categoria,
								ubicacion_geografica: req.body.ubicacion_geografica,
								fecha1: req.body.fecha1,
								fecha2: req.body.fecha2,
								texto1: req.body.texto1,
								texto2: req.body.texto2,
								latitud: req.body.latitud,
								longitud: req.body.longitud,
								linea_credito: req.body.linea_credito,
								plazo_credito: req.body.plazo_credito,
								usar_limite_credito: req.body.usar_limite_credito,
								bloquear_limite_credito: req.body.bloquear_limite_credito,
								id_tipo_precio_venta: req.body.tipoPrecioVenta?req.body.tipoPrecioVenta.id:null
							}).then(function (clienteCreado) {
								var numero = parseInt(numero_correlativo) + 1
								var nombre_corto = numero + "-" + maximo
								if (numero_correlativo > maximo) {
									nombre_corto = maximo - maximo
								}
								Clase.update({
									nombre_corto: nombre_corto
								}, {
										where: { id: req.body.correlativo.id }
									}).then(function (correlativoActualizado) {
										guardarContratosCliente(req, res, clienteCreado)
										req.body.clientes_razon.forEach(function (cliente_razon, index, array) {
											if (!cliente_razon.eliminado) {
												ClienteRazon.create({
													id_cliente: clienteCreado.id,
													razon_social: cliente_razon.razon_social,
													nit: cliente_razon.nit,
													codigo_sap: cliente_razon.codigo_sap,

												}).then(function (clienteRazonCreado) {
												});
											}
										});

										req.body.cliente_destinos.forEach(function (clienteDestino, index, array) {
											if (!clienteDestino.eliminado) {
												GtmClienteDestino.create({
													id_cliente: clienteCreado.id,
													id_destino: clienteDestino.id_destino,

												}).then(function (GtmClienteDestinoCreado) {
												});
											}
										});
									})
								res.json({ mensaje: "??Cliente creado satisfactoriamente!" });
							});
						})
					} else {
						Cliente.create({
							destino: req.body.destino, //aumentamos esto
							id_empresa: req.body.id_empresa,
							razon_social: req.body.razon_social,
							codigo: req.body.codigo,
							nit: req.body.nit,
							direccion: req.body.direccion,
							telefono1: req.body.telefono1,
							telefono2: req.body.telefono2,
							telefono3: req.body.telefono3,
							contacto: req.body.contacto,
							rubro: req.body.rubro,
							categoria: req.body.categoria,
							ubicacion_geografica: req.body.ubicacion_geografica,
							fecha1: req.body.fecha1,
							fecha2: req.body.fecha2,
							texto1: req.body.texto1,
							texto2: req.body.texto2,
							latitud: req.body.latitud,
							longitud: req.body.longitud,
							linea_credito: req.body.linea_credito,
							plazo_credito: req.body.plazo_credito,
							usar_limite_credito: req.body.usar_limite_credito,
							bloquear_limite_credito: req.body.bloquear_limite_credito
						}).then(function (clienteCreado) {
							guardarContratosCliente(req, res, clienteCreado)
							req.body.clientes_razon.forEach(function (cliente_razon, index, array) {
								if (!cliente_razon.eliminado) {
									ClienteRazon.create({
										id_cliente: clienteCreado.id,
										razon_social: cliente_razon.razon_social,
										nit: cliente_razon.nit,
										codigo_sap: cliente_razon.codigo_sap,

									}).then(function (clienteRazonCreado) {
									});
								}
							});

							req.body.cliente_destinos.forEach(function (clienteDestino, index, array) {
								if (!clienteDestino.eliminado) {
									GtmClienteDestino.create({
										id_cliente: clienteCreado.id,
										id_destino: clienteDestino.id_destino,

									}).then(function (GtmClienteDestinoCreado) {
									});
								}
							});
							res.json({ mensaje: "??Cliente creado satisfactoriamente!" });
						});
					}

				}
			}).catch(function (err) {
				res.json({ mensaje: err.stack, hasErr: true })
			})
		});
	function guardarContratosCliente(req, res, cliente) {
		if (req.body.documento_nit1) {
			fs.writeFileSync('./documentos/clientes/documento-nit-' + cliente.id + "-" + req.body.documento_nit1[0].nombre, req.body.documento_nit1[0].data, 'binary', function (err) {
				if (err)
					console.log(err);
				else
					console.log("The file was saved!");
			});

			Cliente.update({
				documento_nit: req.body.documento_nit1[0].nombre
			}, {
					where: { id: cliente.id }
				}).then(function (affecteedRows) {
				});
		}
		if (req.body.documento_funda_empresa1) {
			fs.writeFileSync('./documentos/clientes/documento-fundaempresa-' + cliente.id + "-" + req.body.documento_funda_empresa1[0].nombre, req.body.documento_funda_empresa1[0].data, 'binary', function (err) {
				if (err)
					console.log(err);
				else
					console.log("The file was saved!");
			});

			Cliente.update({
				documento_funda_empresa: req.body.documento_funda_empresa1[0].nombre
			}, {
					where: { id: cliente.id }
				}).then(function (affecteedRows) {
				});
		}
		if (req.body.documento_ci1) {
			fs.writeFileSync('./documentos/clientes/documento-ci-' + cliente.id + "-" + req.body.documento_ci1[0].nombre, req.body.documento_ci1[0].data, 'binary', function (err) {
				if (err)
					console.log(err);
				else
					console.log("The file was saved!");
			});

			Cliente.update({
				documento_ci: req.body.documento_ci1[0].nombre
			}, {
					where: { id: cliente.id }
				}).then(function (affecteedRows) {
				});
		}
		if (req.body.documento_licencia_funcionamiento1) {
			fs.writeFileSync('./documentos/clientes/documento-licencia-funcionamiento-' + cliente.id + "-" + req.body.documento_licencia_funcionamiento1[0].nombre, req.body.documento_licencia_funcionamiento1[0].data, 'binary', function (err) {
				if (err)
					console.log(err);
				else
					console.log("The file was saved!");
			});

			Cliente.update({
				documento_licencia_funcionamiento: req.body.documento_licencia_funcionamiento1[0].nombre
			}, {
					where: { id: cliente.id }
				}).then(function (affecteedRows) {
				});
		}
		if (req.body.documento_seguro_social1) {
			fs.writeFileSync('./documentos/clientes/documento-seguro-social-' + cliente.id + "-" + req.body.documento_seguro_social1[0].nombre, req.body.documento_seguro_social1[0].data, 'binary', function (err) {
				if (err)
					console.log(err);
				else
					console.log("The file was saved!");
			});

			Cliente.update({
				documento_seguro_social: req.body.documento_seguro_social1[0].nombre
			}, {
					where: { id: cliente.id }
				}).then(function (affecteedRows) {
				});
		}

	}
	router.route('/clientes/empresa')
		.post(function (req, res) {
			req.body.clientes.forEach(function (cliente, index, array) {
				Cliente.find({
					where: {
						id_empresa: req.body.id_empresa,
						$or: [{ nit: cliente.nit }, { codigo: cliente.codigo }]
					},
				}).then(function (clienteEncontrado) {
					if (clienteEncontrado) {
						Cliente.update({
							razon_social: cliente.razon_social,
							codigo: cliente.codigo,
							nit: cliente.nit,
							direccion: cliente.direccion,
							telefono1: cliente.telefono1,
							telefono2: cliente.telefono2,
							telefono3: cliente.telefono3,
							contacto: cliente.contacto,
							rubro: cliente.rubro,
							categoria: cliente.categoria,
							ubicacion_geografica: cliente.ubicacion_geografica,
							fecha1: cliente.fecha1,
							fecha2: cliente.fecha2,
							texto1: cliente.texto1,
							texto2: cliente.texto2,
							latitud: cliente.latitud,
							longitud: cliente.longitud,
							id_tipo_precio_venta: cliente.tipoPrecioVenta ? cliente.tipoPrecioVenta.id : null
						}, {
								where: {
									id: clienteEncontrado.id
								}
							}).then(function (clienteCreado) {
								crearRutaCliente(cliente.ruta1, clienteEncontrado.id);
								crearRutaCliente(cliente.ruta2, clienteEncontrado.id);
								crearRutaCliente(cliente.ruta3, clienteEncontrado.id);

								if (index === (array.length - 1)) {
									res.json({ mensaje: "??Datos de Clientes actualizados satisfactoriamente!" });
								}
							});
					} else {
						Cliente.create({
							id_empresa: req.body.id_empresa,
							razon_social: cliente.razon_social,
							codigo: cliente.codigo,
							nit: cliente.nit,
							direccion: cliente.direccion,
							telefono1: cliente.telefono1,
							telefono2: cliente.telefono2,
							telefono3: cliente.telefono3,
							contacto: cliente.contacto,
							rubro: cliente.rubro,
							categoria: cliente.categoria,
							ubicacion_geografica: cliente.ubicacion_geografica,
							fecha1: cliente.fecha1,
							fecha2: cliente.fecha2,
							texto1: cliente.texto1,
							texto2: cliente.texto2,
							latitud: cliente.latitud,
							longitud: cliente.longitud,
							id_tipo_precio_venta: cliente.tipoPrecioVenta ? cliente.tipoPrecioVenta.id : null
						}).then(function (clienteCreado) {
							crearRutaCliente(cliente.ruta1, clienteCreado.id);
							crearRutaCliente(cliente.ruta2, clienteCreado.id);
							crearRutaCliente(cliente.ruta3, clienteCreado.id);
							if (index === (array.length - 1)) {
								res.json({ mensaje: "Clientes creados satisfactoriamente!" });
							}
						});
					}
				});
			});
		});

	function crearRutaCliente(idRuta, idCliente) {
		if (idRuta != null) {
			RutaCliente.find({
				where: { id_cliente: idCliente, id_ruta: idRuta }
			}).then(function (rutaClienteEncontrada) {
				if (!rutaClienteEncontrada) {
					RutaCliente.create({
						id_cliente: idCliente,
						id_ruta: idRuta
					}).then(function (rutaClienteCreada) {

					})
				}
			})
		}
	}

	router.route('/clientes-upload-razonsocial/empresa/:idEmpresa')
		.post(function (req, res) {
			req.body.forEach(function (cliente_razon, index, array) {
				if (cliente_razon.codigo) {
					Cliente.find({
						where: {
							id_empresa: req.params.idEmpresa,
							codigo: cliente_razon.codigo
						}
					}).then(function (clienteEncontrado) {
						if (clienteEncontrado) {
							ClienteRazon.findOrCreate({
								where: {
									nit: cliente_razon.nit,
									id_cliente: clienteEncontrado.id,
								},
								defaults: {
									id_cliente: clienteEncontrado.id,
									razon_social: cliente_razon.razon_social,
									nit: cliente_razon.nit,
									codigo_sap: cliente_razon.codigo_sap,
								}
							}).spread(function (cargoClase, created) {
								/* 	if (created) {
										ClienteRazon.update({
											id_cliente: clienteEncontrado.id,
											razon_social: cliente_razon.razon_social,
											nit: cliente_razon.nit,
											codigo_sap: cliente_razon.codigo_sap,
										}, {
												where: { nit: cliente_razon.nit }
											}).then(function (clienteRazonCreado) {
												if (index == array.length - 1) {
													res.json({ mensaje: "guardados satisfactoriamente!" })
												}
											})
									} else { */
								if (index == array.length - 1) {
									res.json({ mensaje: "guardados satisfactoriamente!" })
								}
								/* } */
							})
						} else {
							if (index == array.length - 1) {
								res.json({ mensaje: "guardados satisfactoriamente!" })
							}
						}
					})
				} else {
					if (index == array.length - 1) {
						res.json({ mensaje: "guardados satisfactoriamente!" })
					}

				}

			})
		})
	router.route('/cliente-vencimiento-credito/:id')
		.put(function (req, res) {
			var inicio_fecha_anterior = new Date(req.body.fecha_anterior);
			inicio_fecha_anterior.setHours(0, 0, 0, 0, 0);
			var fin_fecha_anterior = new Date(req.body.fecha_anterior);
			fin_fecha_anterior.setHours(23, 59, 59, 0, 0);
			Venta.update({
				dias_credito: req.body.dias_credito,
			}, {
					where: {
						id: req.params.id
					}

				}).then(function (ventaActializada) {
					VentaReprogramacionPago.update({
						activo: false
					}, {
							where: {
								//fecha_reprogramacion:{ $between: [inicio_fecha_anterior, fin_fecha_anterior] },
								id_venta: req.params.id
							}

						}).then(function (ventaReproActializada) {
							VentaReprogramacionPago.create({
								id_venta: req.params.id,
								fecha_reprogramacion: req.body.fecha_reprogramacion,
								fecha_anterior: req.body.fecha_anterior,
								activo: true
							}).then(function (FechasReporgrmacionCreadas) {
								res.json({ mensaje: "??Reprogramacion satisfactoriamente!" });
							});
						});
				});
		})
	router.route('/clientes/:id_cliente')
		.put(function (req, res) {
			Cliente.update({
				razon_social: req.body.razon_social,
				codigo: req.body.codigo,
				nit: req.body.nit,
				direccion: req.body.direccion,
				telefono1: req.body.telefono1,
				telefono2: req.body.telefono2,
				telefono3: req.body.telefono3,
				contacto: req.body.contacto,
				rubro: req.body.rubro,
				categoria: req.body.categoria,
				ubicacion_geografica: req.body.ubicacion_geografica,
				fecha1: req.body.fecha1,
				fecha2: req.body.fecha2,
				texto1: req.body.texto1,
				texto2: req.body.texto2,
				latitud: req.body.latitud,
				longitud: req.body.longitud,
				linea_credito: req.body.linea_credito,
				plazo_credito: req.body.plazo_credito,
				usar_limite_credito: req.body.usar_limite_credito,
				bloquear_limite_credito: req.body.bloquear_limite_credito,
				id_tipo_precio_venta: req.body.tipoPrecioVenta ? req.body.tipoPrecioVenta.id ? req.body.tipoPrecioVenta.id : null : null
			}, {
					where: {
						id: req.params.id_cliente
					}
				}).then(function (clienteActualizado) {
					guardarContratosCliente(req, res, req.body)
					req.body.clientes_razon.forEach(function (cliente_razon, index, array) {
						if (cliente_razon.eliminado) {
							ClienteRazon.destroy({
								where: { id: cliente_razon.id } // esta bien? 
							}).then(function (clienteEliminado) {

							});
						} else {
							if (cliente_razon.id) {
								ClienteRazon.update({
									razon_social: cliente_razon.razon_social,
									nit: cliente_razon.nit,
									codigo_sap: cliente_razon.codigo_sap,
								}, {
										where: { id: cliente_razon.id }
									}).then(function (clienteRazonActualizado) {

									});
							} else {
								ClienteRazon.create({
									id_cliente: req.params.id_cliente,
									razon_social: cliente_razon.razon_social,
									nit: cliente_razon.nit,
									codigo_sap: cliente_razon.codigo_sap,
								}).then(function (clienteRazonCreado) {

								});
							}
						}
					});

					//UPDATE DESTINO

					req.body.cliente_destinos.forEach(function (clienteDestino, index, array) {
						if (clienteDestino.eliminado) {
							GtmClienteDestino.destroy({
								where: { id: clienteDestino.id } // esta bien? 
							}).then(function (GtmClienteDestinoEliminado) {

							});
						} else {
							if (!clienteDestino.id) {
								GtmClienteDestino.create({
									id_cliente: req.params.id_cliente,
									id_destino: clienteDestino.id_destino,
								}).then(function (GtmClienteDestinoCreado) {

								});
							}
						}
					});
					res.json({ mensaje: "??Cliente Destino actualizado satisfactoriamente!" });
				});
		})

		.delete(ensureAuthorizedlogged,function (req, res) {
			Cliente.destroy({
				where: {
					id: req.params.id_cliente
				}
			}).then(function (affectedRows) {
				res.json({ message: "Eliminado Satisfactoriamente!" });
			});
		})

		.get(function (req, res) {
			Cliente.find({
				where: {
					id: req.params.id_cliente
				},

				include: [{ model: Clase, as: 'tipoPrecioVenta' }, { model: ClienteRazon, as: 'clientes_razon' },
				{ model: GtmClienteDestino, as: 'cliente_destinos', include: [{ model: GtmDestino, as: 'destino' }] }]
			}).then(function (cliente) {
				res.json(cliente);
			});
		});

	router.route('/clientes/empresa/:id_empresa/texto/:texto')
		.get(function (req, res) {
			var orCondition = []; console.log(req.params.texto);
			if (req.params.texto == 0) {
				orCondition.push({ nit: req.params.texto });
			} else if (parseInt(req.params.texto)) {
				orCondition.push({ nit: parseInt(req.params.texto) });
			}
			orCondition.push({ razon_social: { $like: "%" + req.params.texto + "%" } }); console.log(orCondition);
			Cliente.findAll({
				where: {
					$and: { id_empresa: req.params.id_empresa, $or: orCondition }
				},
				include: [{ model: Clase, as: 'tipoPrecioVenta' },{model:EntragaDetalleVentaCliente,as:'entregasDetalleVentaCliente'}]

			}).then(function (clientes) {
				res.json(clientes);
			});
		});

	router.route('/cliente/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda')
		.get(function (req, res) {
			var condicionCliente = { id_empresa: req.params.id_empresa/*,codigo:{$not:null}*/ };

			if (parseInt(req.params.texto_busqueda)) {
				condicionCliente = { id_empresa: req.params.id_empresa/*,codigo:{$not:null}*/, nit: parseInt(req.params.texto_busqueda) }
			} else if (req.params.texto_busqueda != 0) {
				condicionCliente = {
					id_empresa: req.params.id_empresa,/*codigo:{$not:null},*/
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
			if (req.params.items_pagina != 0) {
				Cliente.findAndCountAll({

					where: condicionCliente,
					include: [{ model: Empresa, as: 'empresa' }],
					order: [['id', 'asc']]
				}).then(function (data) {
					Cliente.findAll({
						offset: (req.params.items_pagina * (req.params.pagina - 1)), limit: req.params.items_pagina,
						where: condicionCliente,
						include: [{model:ClienteRazon, as: 'clientes_razon'},
									{model:GtmClienteDestino, as: 'cliente_destinos', include: [{ model: GtmDestino, as: "destino" }]	}	],
						/* 	include: [{ model: Clase, as: 'tipoPrecioVenta' }, { model: Empresa, as: 'empresa' },
							{
								model: ClienteRazon, as: 'clientes_razon'
							},
							{
								model: GtmClienteDestino, as: 'cliente_destinos', include: [{ model: GtmDestino, as: "destino" }]
							}], */
						order: [['id', 'asc']]
					}).then(function (clientes) {
						res.json({ clientes: clientes, paginas: Math.ceil(data.count / req.params.items_pagina) });
					});
				});
			} else {
				Cliente.findAndCountAll({

					where: condicionCliente,
					include: [{ model: Empresa, as: 'empresa' }],
					order: [['id', 'asc']]
				}).then(function (data) {
					Cliente.findAll({
						where: condicionCliente,
						include: [{model:ClienteRazon, as: 'clientes_razon'}],
						include: [{model:ClienteRazon, as: 'clientes_razon'},
									{model:GtmClienteDestino, as: 'cliente_destinos', include: [{ model: GtmDestino, as: "destino" }]	}	],
						/* include: [{ model: Empresa, as: 'empresa' }, { model: Clase, as: 'tipoPrecioVenta' },
						{
							model: ClienteRazon, as: 'clientes_razon'
						},
						{
							model: GtmClienteDestino, as: 'cliente_destinos', include: [{ model: GtmDestino, as: "destino" }]
						}], */
						order: [['id', 'asc']]
					}).then(function (clientes) {
						res.json({ clientes: clientes, paginas: 1 });
					});
				});
			}
		});


	router.route('/clientes/empresa/:id_empresa')
		.get(function (req, res) {
			Cliente.findAll({
				attributes: ['id', 'razon_social', 'nit', 'latitud', 'longitud'],
				where: { id_empresa: req.params.id_empresa },
				//include: [{ model: Empresa, as: 'empresa' }]
			}).then(function (usuarios) {
				res.json(usuarios);
			});
		});

	router.route('/cliente/empresa/:id_empresa/siguiente-codigo')
		.get(function (req, res) {
			sequelize.query("SELECT MAX(CAST(SUBSTRING(codigo, 4, length(codigo)-3) AS UNSIGNED)) as ultimo_codigo FROM agil_cliente where empresa=" + req.params.id_empresa + " and codigo like 'CLI%'", { type: sequelize.QueryTypes.SELECT })
				.then(function (dato) {
					res.json(dato[0]);;
				});
		});



	// VALIDACION DE CODIGO Y NIT DE CLIENTE
	router.route('/busquedaClienteCodigo/empresa/:id_empresa/texto/:texto')
		.get(function (req, res) {
			Cliente.findAll({
					where: { id_empresa: req.params.id_empresa, 
							 codigo: req.params.texto}
				}).then(function (cliente) {
					res.json(cliente);
				});
			});

	router.route('/busquedaClienteNit/empresa/:id_empresa/texto/:texto')
		.get(function (req, res) {
			Cliente.findAll({
				where: { id_empresa: req.params.id_empresa, 
						 nit: req.params.texto
					   }
			}).then(function (cliente) {
				res.json(cliente);
			});
		});


	router.route('/clientes-razon/:id_cliente')
		.post(function (req, res) {
			ClienteRazon.create({
				id_cliente: req.params.id_cliente,
				razon_social: req.body.razon_social,
				nit: req.body.nit,
			}).then(function (clienteRazonCreado) {
				res.json(clienteRazonCreado);
			});
		});

	router.route('/clientes-destino/:id_cliente')
		.post(function (req, res) {
			GtmDestino.create({
				id_empresa: req.body.id_empresa,
				destino: req.body.destino,
				direccion: req.body.direccion,
				eliminado: false
			}).then(function (destinoCreado) {
				GtmClienteDestino.create({
					id_cliente: req.params.id_cliente,
					id_destino: destinoCreado.id,
				}).then(function (clienteDestinoCreado) {
					res.json(clienteDestinoCreado);
				});
			});
		});

	router.route('/clientes-pedido/:id_empresa')
		.post(function (req, res) {
			Cliente.create({
				id_empresa: req.params.id_empresa,
				razon_social: req.body.razon_social,
				nit: 0,
				telefono1: req.body.telefono,
				contacto: req.body.contacto
			}).then(function (clienteCreado) {
				res.json(clienteCreado);
			});
		});

	router.route('/informacion-cliente/:id_cliente')
		.get(function (req, res) {
			Cliente.find({
				
				where: {id:req.params.id_cliente},
					include: [{ model: Clase, as: 'tipoPrecioVenta' }, { model: Empresa, as: 'empresa' },
					{
						model: ClienteRazon, as: 'clientes_razon'
					},
					{
						model: GtmClienteDestino, as: 'cliente_destinos', include: [{ model: GtmDestino, as: "destino" }]
					}],
				order: [['id', 'asc']]
			}).then(function (clienteEncontrado) {
				res.json({ cliente: clienteEncontrado});
			});
		})
	router.route('/anticipo-cliente/cliente/:id_cliente')
		.post(function (req, res) {
			Sucursal.find({
				where: { id: req.body.id_sucursal }
			}).then(function (sucursalEncontrada) {
				if(!sucursalEncontrada.activo) return res.json({mensaje:'La sucursal '+sucursalEncontrada.nombre+' est?? deshabilitada. No se pueden realizar cambios.', hasErr:true})
				ClienteAnticipo.create({
					id_cliente: parseInt(req.params.id_cliente),
					monto_anticipo: req.body.monto_anticipo,
					fecha: req.body.fecha,
					monto_salida: req.body.monto_salida,
					saldo: req.body.saldo,
					id_sucursal: req.body.id_sucursal,
					numero_correlativo_anticipo: sucursalEncontrada.anticipo_cliente_correlativo,
					eliminado: false
				}).then(function (clienteCreado) {
					var correlativo = sucursalEncontrada.anticipo_cliente_correlativo + 1
					Sucursal.update({
						anticipo_cliente_correlativo: correlativo
					}, {
							where: { id: req.body.id_sucursal }
						}).then(function (Actualizado) {
							ClienteAnticipo.find({
								where: { id: clienteCreado.id },
								include: [{ model: Sucursal, as: 'sucursal' }, { model: Cliente, as: 'cliente' }]
							}).then(function (encontrado) {
								res.json({ mensaje: "anticipo guardado satisfactoriamente!", anticipo: encontrado });
							})

						})

				});
			})
		})
		.get(function (req, res) {
			ClienteAnticipo.findAll({
				where: { id_cliente: req.params.id_cliente, padre: null }
			}).then(function (clientesAnticipos) {
				res.json(clientesAnticipos);
			})

		})

	router.route('/clientes-geolocalizacion/empresa/:id_empresa/latitud/:latitud/longitud/:longitud')
		.get(function (req, res) {
			sequelize.query("SELECT id, codigo,razon_social, nit, latitud, longitud, direccion, telefono1, \
				( 6371 * ACOS( SIN( RADIANS( latitud ) ) * SIN( RADIANS( "+ req.params.latitud +" ) ) + COS( RADIANS( longitud - "+ req.params.longitud +" ) ) * COS( RADIANS( latitud ) ) * COS( RADIANS( "+ req.params.latitud +" ) ) ) ) AS distancia\
				FROM agil_cliente WHERE empresa = "+ req.params.id_empresa + "\
		    	HAVING distancia < 0.5\
				ORDER BY distancia ASC", { type: sequelize.QueryTypes.SELECT })
			.then(function (clientes) {
				res.json(clientes);
			});
		});
	
		//* Busca clientes empresa por nit o razon social
		router.route('/clientes/facturacion/:id_empresa/:texto/:nit')
		.get( async(req, res) => {
			try {
				const { id_empresa, texto, nit } = req.params
				if(!(id_empresa || texto )) return res.json({ error: true, message: 'Par??metros incorrectos'})
				let condicion = { id_empresa }
				if(+nit){
					condicion.nit = {
						$like: "%" + texto + "%"
					}
				}else{
					condicion.razon_social = {
						$like: "%" + texto + "%"
					}
				}
				let data = await Cliente.findAll({
					where: condicion
				})
				return res.json({ error: false, data })
			} catch (e) {
				return res.json({ error: true, message: e })
			}
		})
		//* Registra nuevo cliente para facturacion
		.post( async(req, res) => {
			try {
				const { codigo, complemento, correo, direccion, idEmpresa, nit, razon_social, telefono, tipoDocumento, usuario } = req.body
				let cliente = await Cliente.findOne({
					where:{ nit: ""+nit, complemento, id_empresa: idEmpresa }
				})
				if(cliente) return res.json({ error: true, message: `<small>Existe registro de cliente con NIT ${ nit }${ complemento ? ', con complemento'+ complemento : ""}.</small>`})
				let data = await Cliente.create({ 
					codigo,
					complemento,
					id_empresa: idEmpresa,
					correo,
					tipo_doc: tipoDocumento ? tipoDocumento.codigoTipoDocIdentidad : null,
					direccion,
					nit: ""+nit,
					razon_social,
					telefono1: ""+telefono,
					usuario
				})
				return res.json({ error: false, data })
			} catch (e) {
				return res.json({ error: true, message: e })
			}
		});



}