module.exports = function (router, forEach, decodeBase64Image, fs, Empresa, Sucursal, Almacen, Clase, SucursalActividadDosificacion, Dosificacion,
	schedule, ConfiguracionFactura, ensureAuthorizedlogged, ConfiguracionIso , sequelize, CorrelativoOt, Tipo,ContabilidadCuenta) {

	router.route('/sucursales')
		.post(ensureAuthorizedlogged, function (req, res) {
			Sucursal.create({
				id_empresa: req.body.id_empresa,
				nombre: req.body.nombre,
				numero: req.body.numero,
				direccion: req.body.direccion,
				telefono1: req.body.telefono1,
				telefono2: req.body.telefono2,
				telefono3: req.body.telefono3,
				id_departamento: req.body.id_departamento,
				id_municipio: req.body.id_municipio,
				nota_venta_correlativo: req.body.nota_venta_correlativo,
				nota_traspaso_correlativo: req.body.nota_traspaso_correlativo,
				nota_baja_correlativo: req.body.nota_baja_correlativo,
				pedido_correlativo: req.body.pedido_correlativo,
				frase_pedido: req.body.frase_pedido,
				copias_impresion_pedido: req.body.copias_impresion_pedido,
				nota_recibo_correlativo: req.body.nota_recibo_correlativo,
				imprimir_pedido_corto: req.body.imprimir_pedido_corto,
				cotizacion_correlativo: req.body.cotizacion_correlativo,
				pre_factura_correlativo: req.body.pre_factura_correlativo,
				fecha_reinicio_correlativo: req.body.fecha_reinicio_correlativo,
				correlativo_proforma: req.body.correlativo_proforma
			}).then(function (sucursalCreada) {
				req.body.almacenes.forEach(function (almacen, index, array) {
					if (!almacen.eliminado) {
						Almacen.create({
							id_sucursal: sucursalCreada.id,
							nombre: almacen.nombre,
							numero: almacen.numero,
							direccion: almacen.direccion,
							telefono: almacen.telefono,
							id_cuenta:almacen.cuenta?almacen.cuenta.id:null
						}).then(function (almacenCreado) {

						});
					}
				});
				req.body.actividadesDosificaciones.forEach(function (actividadDosificacion, index, array) {
					if (!actividadDosificacion.eliminado) {
						SucursalActividadDosificacion.create({
							id_sucursal: sucursalCreada.id,
							id_actividad: actividadDosificacion.id_actividad,
							id_dosificacion: actividadDosificacion.id_dosificacion,
							expirado: false
						}).then(function (actividadDosificacionCreado) {

						});
					}
				});
				Tipo.findAll({
					where:{empresa:req.body.id_empresa, nombre_corto:"MTM_TM"},
					include:[{model: Clase, as:'clases' }]
				})
				.then(tipo=>{
					if(tipo[0].clases.length>0){
						tipo[0].clases.forEach(clase=>{
							CorrelativoOt.create({
								id_sucursal:sucursalCreada.id,
								id_especialidad: clase.id,
								activo: 1,
								numeracion:1,
							})
							.then(especialidadGuardada=>{
								console.log(especialidadGuardada);
							})
						})
					}
				})
				res.json(sucursalCreada);
			});
		});
		router.route('/sucursales/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda')
		.get(ensureAuthorizedlogged, function (req, res) {
			var condicionSucursal = { id_empresa: req.params.id_empresa};
			if (parseInt(req.params.texto_busqueda)) {
				condicionSucursal = { id_empresa: req.params.id_empresa, numero: parseInt(req.params.texto_busqueda)}
			} else if (req.params.texto_busqueda != 0) {
				condicionSucursal = {
					id_empresa: req.params.id_empresa,
					$or: [
						{
							nombre: {
								$like: "%" + req.params.texto_busqueda + "%"
							}
						},
						{
							direccion: {
								$like: "%" + req.params.texto_busqueda + "%"
							}
						}
					]
				};
			}

			Sucursal.findAndCountAll({
				offset: (req.params.items_pagina * (req.params.pagina - 1)), limit: req.params.items_pagina,
				where: condicionSucursal,
				include: [{ model: Empresa, as: 'empresa' },
				{ model: Almacen, as: 'almacenes', include:[{model:ContabilidadCuenta,as:'cuenta'}]},
				{
					model: SucursalActividadDosificacion, as: 'actividadesDosificaciones',
					include: [{ model: Clase, as: 'actividad' },
					{ model: Dosificacion, as: 'dosificacion' }]
				},
				{ model: Clase, as: 'departamento' },
				{ model: Clase, as: 'municipio' },
				{
					model: ConfiguracionFactura, as: 'configuracionFactura',
					include: [{ model: Clase, as: 'tamanoPapelNotaVenta' },
					{ model: Clase, as: 'tamanoPapelNotaTraspaso' },
					{ model: Clase, as: 'tamanoPapelNotaBaja' },
					{ model: Clase, as: 'tamanoPapelNotaPedido' },
					{ model: Clase, as: 'tamanoPapelCierreCaja' }]
				}]
			}).then(function (data) {
				res.json({ sucursales: data.rows, paginas: Math.ceil(data.count / req.params.items_pagina) });
			}).catch(function (err) {
                res.json({ mensaje: err.message === undefined ? err.stack : err.message, hasErr: true })
            });
		});
	router.route('/sucursales/empresa/:id_empresa')
		.get(ensureAuthorizedlogged, function (req, res) {
			Sucursal.findAll({
				where: { id_empresa: req.params.id_empresa },
				include: [{ model: Empresa, as: 'empresa' },
				{ model: Almacen, as: 'almacenes', include:[{model:ContabilidadCuenta,as:'cuenta'}]},
				{
					model: SucursalActividadDosificacion, as: 'actividadesDosificaciones',
					include: [{ model: Clase, as: 'actividad' },
					{ model: Dosificacion, as: 'dosificacion' }]
				},
				{ model: Clase, as: 'departamento' },
				{ model: Clase, as: 'municipio' },
				{
					model: ConfiguracionFactura, as: 'configuracionFactura',
					include: [{ model: Clase, as: 'tamanoPapelNotaVenta' },
					{ model: Clase, as: 'tamanoPapelNotaTraspaso' },
					{ model: Clase, as: 'tamanoPapelNotaBaja' },
					{ model: Clase, as: 'tamanoPapelNotaPedido' },
					{ model: Clase, as: 'tamanoPapelCierreCaja' }]
				}]
			}).then(function (sucursales) {
				res.json(sucursales);
			});
		});

	router.route('/configuracion/factura/sucursales/empresa/:id_empresa')
		.get(ensureAuthorizedlogged, function (req, res) {
			Sucursal.findAll({
				where: { id_empresa: req.params.id_empresa },
			}).then(function (sucursales) {
				res.json(sucursales);
			});
		})
	router.route('/reiniciar-correlativo/sucursales')
		.put(ensureAuthorizedlogged, function (req, res) {
			/*req.body.sucursales.forEach(function (sucursal, array, index) {
				var comprobante_ingreso_correlativo = (sucursal.reiniciar_comprobante_caja_chica_correlativo) ? 0 : sucursal.comprobante_ingreso_correlativo;
				var comprobante_egreso_correlativo = (sucursal.reiniciar_comprobante_egreso_correlativo) ? 0 : sucursal.comprobante_egreso_correlativo;
				var comprobante_traspaso_correlativo = (sucursal.reiniciar_comprobante_traspaso_correlativo) ? 0 : sucursal.comprobante_traspaso_correlativo;
				var comprobante_caja_chica_correlativo = (sucursal.reiniciar_comprobante_caja_chica_correlativo) ? 0 : sucursal.comprobante_caja_chica_correlativo;
				Sucursal.update({
					comprobante_ingreso_correlativo: comprobante_ingreso_correlativo,
					comprobante_egreso_correlativo: comprobante_egreso_correlativo,
					comprobante_traspaso_correlativo: comprobante_traspaso_correlativo,
					comprobante_caja_chica_correlativo: comprobante_caja_chica_correlativo,
					fecha_reinicio_correlativo: req.body.fecha
				}, {
					where: {
						id: sucursal.id
					}
				}).then(function (sucursalesActualizadas) {
					res.json({ message: "Numero Correlativos Reiniciados satisfactoriamente!" });
				});
			});*/
			res.json({ message: "Numero Correlativos Reiniciados satisfactoriamente!" });
		})
	router.route('/configuracion/factura/sucursal/:id_sucursal')
		.put(ensureAuthorizedlogged, function (req, res) {
			Sucursal.update({
				id_empresa: req.body.id_empresa,
				nombre: req.body.nombre,
				numero: req.body.numero,
				direccion: req.body.direccion,
				telefono1: req.body.telefono1,
				telefono2: req.body.telefono2,
				telefono3: req.body.telefono3,
				id_departamento: req.body.id_departamento,
				id_municipio: req.body.id_municipio,
				nota_venta_correlativo: req.body.nota_venta_correlativo,
				nota_traspaso_correlativo: req.body.nota_traspaso_correlativo,
				nota_baja_correlativo: req.body.nota_baja_correlativo,
				pedido_correlativo: req.body.pedido_correlativo,
				frase_pedido: req.body.frase_pedido,
				copias_impresion_pedido: req.body.copias_impresion_pedido,
				nota_recibo_correlativo: req.body.nota_recibo_correlativo,
				imprimir_pedido_corto: req.body.imprimir_pedido_corto,
				cotizacion_correlativo: req.body.cotizacion_correlativo,
				pre_factura_correlativo: req.body.pre_factura_correlativo,
				despacho_correlativo: req.body.despacho_correlativo,
				despacho_recivo_correlativo: req.body.despacho_recivo_correlativo,
				ropa_trabajo_correlativo: req.body.ropa_trabajo_correlativo,
				comprobante_ingreso_correlativo: req.body.comprobante_ingreso_correlativo,
				comprobante_egreso_correlativo: req.body.comprobante_egreso_correlativo,
				comprobante_traspaso_correlativo: req.body.comprobante_traspaso_correlativo,
				comprobante_caja_chica_correlativo: req.body.comprobante_caja_chica_correlativo,
				reiniciar_comprobante_ingreso_correlativo: req.body.reiniciar_comprobante_ingreso_correlativo,
				reiniciar_comprobante_egreso_correlativo: req.body.reiniciar_comprobante_egreso_correlativo,
				reiniciar_comprobante_traspaso_correlativo: req.body.reiniciar_comprobante_traspaso_correlativo,
				reiniciar_comprobante_caja_chica_correlativo: req.body.reiniciar_comprobante_caja_chica_correlativo,
				caja_chica_ingreso_correlativo: req.body.caja_chica_ingreso_correlativo,
				caja_chica_egreso_correlativo: req.body.caja_chica_egreso_correlativo,
				vale_caja_chica_correlativo: req.body.vale_caja_chica_correlativo,
				numero_rendicion_fondo_gasto_correlativo: req.body.numero_rendicion_fondo_gasto_correlativo,
				anticipo_cliente_correlativo: req.body.anticipo_cliente_correlativo,
				anticipo_proveedor_correlativo: req.body.anticipo_proveedor_correlativo,
				anticipo_compensacion_cliente_correlativo: req.body.anticipo_compensacion_cliente_correlativo,
				anticipo_compensacion_proveedor_correlativo: req.body.anticipo_compensacion_proveedor_correlativo,
				correlativo_proforma: req.body.correlativo_proforma,
				numero_correlativo_prestamo_rrhh: req.body.numero_correlativo_prestamo_rrhh,
				numero_correlativo_caja_chica_incremento: req.body.numero_correlativo_caja_chica_incremento,
				numero_correlativo_ot: req.body.numero_correlativo_ot,
				numero_correlativo_ot_mecanica: req.body.numero_correlativo_ot_mecanica,
				numero_correlativo_ot_chaperia: req.body.numero_correlativo_ot_chaperia,
				numero_correlativo_modulo_pedido: req.body.numero_correlativo_modulo_pedido,
				numero_correlativo_reposicion_almacen: req.body.numero_correlativo_reposicion_almacen,
				numero_correlativo_solicitud_almacen: req.body.numero_correlativo_solicitud_almacen,
				nota_venta_farmacia_correlativo: req.body.nota_venta_farmacia_correlativo,
				numero_correlativo_devolucion_item: req.body.numero_correlativo_devolucion_item,
				numero_correlativo_reposicion_item: req.body.numero_correlativo_reposicion_item,
				numero_correlativo_ingreso_por_ajuste: req.body.numero_correlativo_ingreso_por_ajuste,
				numero_correlativo_ingreso_produccion: req.body.numero_correlativo_ingreso_produccion

			}, {
				where: {
					id: req.params.id_sucursal
				}
			}).then(function (sucursalActualizada) {
				var datos = req.body.configuracionFactura;
				ConfiguracionFactura.update({
					//id_tamano_papel_nota_venta:req.body.ConfiguracionFactura.tamanoPapelNotaVenta.id, 
					id_tamano_papel_nota_venta: req.body.configuracionFactura.tamanoPapelNotaVenta.id,
					id_tamano_papel_cierre_caja: req.body.configuracionFactura.tamanoPapelCierreCaja.id,
					id_tamano_papel_nota_baja: req.body.configuracionFactura.tamanoPapelNotaBaja.id,
					id_tamano_papel_nota_pedido: req.body.configuracionFactura.tamanoPapelNotaPedido.id,
					id_tamano_papel_nota_traspaso: req.body.configuracionFactura.tamanoPapelNotaTraspaso.id,

				}, {
					where: { id_sucursal: req.params.id_sucursal }
				}).then(function (actividadDosificacionCreado) {
					if (req.body.almacenes.length > 0) {
						req.body.almacenes.forEach(function (almacen, index, array) {
							if (!almacen.eliminado) {
								Almacen.update({
									numero_correlativo_iso_compra: almacen.numero_correlativo_iso_compra,
									numero_correlativo_iso_consumo: almacen.numero_correlativo_iso_consumo,
									numero_correlativo_iso_orden_compra: almacen.numero_correlativo_iso_orden_compra,
									numero_correlativo_iso_traspaso_salida: almacen.numero_correlativo_iso_traspaso_salida,
									numero_correlativo_iso_dotacion_ropa: almacen.numero_correlativo_iso_dotacion_ropa,
									numero_correlativo_iso_baja: almacen.numero_correlativo_iso_baja
								}, {
									where: { id: almacen.id }
								}).then(function (almacenActualizado) {

								});
							}
						});
					}
					res.json({ message: "Actualizado satisfactoriamente!" });
				})
			});
		})
	router.route('/sucursales/:id_sucursal')
		.put(ensureAuthorizedlogged, function (req, res) {
			Sucursal.update({
				id_empresa: req.body.id_empresa,
				nombre: req.body.nombre,
				numero: req.body.numero,
				direccion: req.body.direccion,
				telefono1: req.body.telefono1,
				telefono2: req.body.telefono2,
				telefono3: req.body.telefono3,
				id_departamento: req.body.id_departamento,
				id_municipio: req.body.id_municipio,
				nota_venta_correlativo: req.body.nota_venta_correlativo,
				nota_traspaso_correlativo: req.body.nota_traspaso_correlativo,
				nota_baja_correlativo: req.body.nota_baja_correlativo,
				pedido_correlativo: req.body.pedido_correlativo,
				frase_pedido: req.body.frase_pedido,
				copias_impresion_pedido: req.body.copias_impresion_pedido,
				nota_recibo_correlativo: req.body.nota_recibo_correlativo,
				imprimir_pedido_corto: req.body.imprimir_pedido_corto,
				cotizacion_correlativo: req.body.cotizacion_correlativo,
				pre_factura_correlativo: req.body.pre_factura_correlativo,
				correlativo_proforma: req.body.correlativo_proforma
			}, {
				where: {
					id: req.params.id_sucursal
				}
			}).then(function (sucursalActualizada) {
				req.body.almacenes.forEach(function (almacen, index, array) {
					if (almacen.eliminado) {
						Almacen.destroy({
							where: { id: almacen.id }
						}).then(function (almacenEliminado) {
							if (index === (array.length - 1)) {
								res.json({ message: "Actualizado satisfactoriamente!" });
							}
						});
					} else {
						if (almacen.id) {
							Almacen.update({
								nombre: almacen.nombre,
								numero: almacen.numero,
								direccion: almacen.direccion,
								telefono: almacen.telefono,
								id_cuenta:almacen.cuenta?almacen.cuenta.id:null
							}, {
								where: { id: almacen.id }
							}).then(function (almacenActualizado) {
								if (index === (array.length - 1)) {
									res.json({ message: "Actualizado satisfactoriamente!" });
								}
							});
						} else {
							Almacen.create({
								id_sucursal: req.params.id_sucursal,
								nombre: almacen.nombre,
								numero: almacen.numero,
								direccion: almacen.direccion,
								telefono: almacen.telefono,
								id_cuenta:almacen.cuenta?almacen.cuenta.id:null
							}).then(function (almacenCreado) {
								if (index === (array.length - 1)) {
									res.json({ message: "Actualizado satisfactoriamente!" });
								}
							});
						}
					}
				});

				req.body.actividadesDosificaciones.forEach(function (actividadDosificacion, index, array) {
					if (actividadDosificacion.eliminado) {
						SucursalActividadDosificacion.destroy({
							where: { id: actividadDosificacion.id }
						}).then(function (actividadDosificacionEliminado) {
							if (index === (array.length - 1)) {
								res.json({ message: "Actualizado satisfactoriamente!" });
							}
						});
					} else {
						if (!actividadDosificacion.id) {
							var idsucursal = parseInt(req.params.id_sucursal)
							SucursalActividadDosificacion.create({

								id_sucursal: idsucursal,
								id_actividad: actividadDosificacion.id_actividad,
								id_dosificacion: actividadDosificacion.id_dosificacion,
								expirado: false

							}).then(function (actividadDosificacionActualizado) {
								if (index === (array.length - 1)) {
									res.json({ message: "Asignado satisfactoriamente!" });
								}
							})
						} else {
							var idsucursal = parseInt(req.params.id_sucursal)
							SucursalActividadDosificacion.update({

								id_sucursal: idsucursal,
								id_actividad: actividadDosificacion.id_actividad,
								id_dosificacion: actividadDosificacion.id_dosificacion,
								expirado: actividadDosificacion.dosificacion.expirado
							}, {
								where: { id: actividadDosificacion.id }
							}).then(function (actividadDosificacionActualizado) {
								if (index === (array.length - 1)) {
									res.json({ message: "Asignado satisfactoriamente!" });
								}
							})
						}
						/* var id = 0
						if (actividadDosificacion.id != undefined) {
							id = actividadDosificacion.id
						}
						SucursalActividadDosificacion.find({
							where: { id: id },
						
						}).then(function (actividadDosificacionActualizado) {
							if (!actividadDosificacionActualizado) {
								var idsucursal = parseInt(req.params.id_sucursal)
								SucursalActividadDosificacion.create({

									id_sucursal: idsucursal,
									id_actividad: actividadDosificacion.id_actividad,
									id_dosificacion: actividadDosificacion.id_dosificacion,
									expirado: false

								}).then(function (actividadDosificacionActualizado) {
									if (index === (array.length - 1)) {
										res.json({ message: "Asignado satisfactoriamente!" });
									}
								})

							} else {
								if (actividadDosificacionActualizado.id_dosificacion != actividadDosificacion.id_dosificacion) {
									SucursalActividadDosificacion.update({
										expirado: true
									}, {
											where: { id: actividadDosificacionActualizado.id }
										}).then(function (actividadDosificacionCreado) {
											SucursalActividadDosificacion.create({
												id_sucursal: req.params.id_sucursal,
												id_actividad: actividadDosificacion.id_actividad,
												id_dosificacion: actividadDosificacion.id_dosificacion,
												expirado: false
											}).then(function (actividadDosificacionCreado) {
												if (index === (array.length - 1)) {
													res.json({ message: "Actualizado satisfactoriamente!" });
												}
											});
										});
								} else {
									if (index === (array.length - 1)) {
										res.json({ message: "Actualizado satisfactoriamente!" });
									}
								}
							}
						}); */

					}
				});
			});
		})

		.delete(ensureAuthorizedlogged, function (req, res) {
			Almacen.destroy({
				where: {
					id_sucursal: req.params.id_sucursal
				}
			}).then(function (affectedRows) {
				Sucursal.destroy({
					where: {
						id: req.params.id_sucursal
					}
				}).then(function (affectedRows) {
					res.json({ message: "Eliminado Satisfactoriamente!" });
				});
			});
		});

	actualizarPedido();

	function actualizarPedido() {
		var rule = new schedule.RecurrenceRule();
		rule.minute = 17;
		rule.hour = 7;
		rule.dayOfWeek = [0, 1, 2, 3, 4, 5, 6];
		var j = schedule.scheduleJob(rule, function () {
			console.log('The answer to life, the universe, and everything!');
			console.log(new Date());
			Sucursal.update({
				pedido_correlativo: 1
			}, {
				where: {

				}
			}).then(function (sucursalActualizada) {

			});
		});
	}


	//iso

	router.route('/configuracion-iso/sucursal/:id_sucursal')
		.get(ensureAuthorizedlogged, function (req, res) {
			ConfiguracionIso.findAll({
				where: { id_sucursal: req.params.id_sucursal, eliminado: false },
				include: [{ model: Clase, as: 'tipoDocumento' }]
			}).then(function (datos) {
				res.json({ configuracionesIso: datos })
			})
		})
		.post(ensureAuthorizedlogged, function (req, res) {
			req.body.forEach(function (config, index, array) {
				if (config.id) {
					ConfiguracionIso.update({
						id_tipo_documento: config.tipoDocumento.id,
						nombre: config.nombre,
						revicion: config.revicion,
						codigo: config.codigo,
						fecha_aprobacion: config.fecha_aprobacion,
						eliminado: config.eliminado,
						activo: config.activo,
						predefinido: config.predefinido
					}, {
						where: { id: config.id }
					})
				} else {
					
					sequelize.query("SELECT max(version_impresion) AS version_impresion FROM agil_configuracion_iso WHERE tipo_documento="+config.tipoDocumento.id+" AND sucursal="+req.params.id_sucursal,
						{ type: sequelize.QueryTypes.SELECT })
					.then( isoConfig => {
						if(isoConfig.length == 1 ) {
							isoConfig[0].version_impresion != null ? (config.version_impresion=isoConfig[0].version_impresion + 1 ): (config.version_impresion = 1);
						}else{
							config.version_impresion = 1;
						}
						ConfiguracionIso.create({
							id_sucursal: req.params.id_sucursal,
							id_tipo_documento: config.tipoDocumento.id,
							nombre: config.nombre,
							revicion: config.revicion,
							codigo: config.codigo,
							fecha_aprobacion: config.fecha_aprobacion,
							eliminado: false,
							activo: config.activo ? config.activo : 0,
							predefinido: config.predefinido ? config.predefinido : 0,
							version_impresion: config.version_impresion ? config.version_impresion : null
						})
					})
					
				}
				if (index === (array.length - 1)) {
					res.json({ mensaje: "Guardado Satisfactoriamente!" })
				}
			});
		})

	router.route('/habilitacion/sucursal')
		.post(ensureAuthorizedlogged, (req, res) => {
			Sucursal.update({
				activo: req.body.activo
			}, {
				where: {
					id: req.body.id_sucursal,
					id_empresa: req.body.id_empresa
				}
			}).then(function (sucursalActualizada) {
				res.json({ mensaje: 'Estado actualizado...' });
			}).catch((err) => {
				res.json({ mensaje: err.stack, hasErr: true });
			})
		})

	router.route('/habilitar/sucursal-iso')
		.post(ensureAuthorizedlogged, (req, res) => {
			ConfiguracionIso.update({
				activo: req.body.activo,
				predefinido: req.body.predefinido
			}, {
				where: {
					id: req.body.id
				}
			}).then(function (sucursalActualizada) {
				res.json({ mensaje: 'Estado actualizado...' });
			}).catch((err) => {
				res.json({ mensaje: err.stack, hasErr: true });
			})
		})

		router.route('/sucursal/mantenimiento/correlativos/:id_sucursal')
		.get(ensureAuthorizedlogged, function (req, res) {
			CorrelativoOt.findAll({
				where: { id_sucursal: req.params.id_sucursal },
				include: [{ model: Clase, as: 'especialidad' }]
			}).then(function (datos) {
				res.json({ mantenimientos: datos })
			})
		})
		.post(ensureAuthorizedlogged, (req, res) => {
			if(req.body.tipos.length>0){
				req.body.tipos.forEach(config=>{
					CorrelativoOt.update({
						activo: config.activo,
						numeracion: Number.isInteger(config.numeracion) ? config.numeracion : Math.ceil(Number(config.numeracion))
					}, {
						where: {
							id: config.id
						}
					}).then(function (sucursalActualizada) {
						res.json({ mensaje: 'Configuraciones actualizadas con éxito.' });
					}).catch((err) => {
						res.json({ mensaje: 'Error al actualizar configuraciones', hasErr: true });
					})
				})
			}else{
				res.json({ mensaje: 'No existen configuraciones a guardar', hasErr: true });
			}
			
		})

	router.route('/facturacion-electronica/sucursal/:id_sucursal')
		.put( ensureAuthorizedlogged, async( req, res ) => {
			try {
				const { id_sucursal } = req.params
				if(!id_sucursal ) return res.json({ error: true, message: '<b>No se actualizó la sucursal</b></br><small>Párametros incorrectos</small>'})
				let suc = await Sucursal.update({ usar_facturacion_en_linea: true }, { where: { id:id_sucursal }})
				return res.json({ error: false, message: 'Sucursal actualizado'})
			} catch (e) {
				return res.json({ error: true, message: e.message })
			}
		})
		
}