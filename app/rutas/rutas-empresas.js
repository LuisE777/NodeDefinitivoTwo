module.exports = function (router, decodeBase64Image, fs, Empresa, Sucursal, Clase, Tipo, signs3,
	ConfiguracionVentaVista, ConfiguracionCompraVista, sequelize, EmpresaAplicacion, Aplicacion,
	Usuario, ensureAuthorizedlogged, EmpresaIntegracion, IntegracionAplicacion, UsuarioGrupos, OpcionAplicacion, CorrelativosEmpresa, ConfiguracionIsoEmpresa, axios, FormData, restApiSFE) {

	router.route('/empresas')

		.post(ensureAuthorizedlogged, function (req, res) {
			Empresa.create({
				razon_social: req.body.razon_social,
				nit: req.body.nit,
				direccion: req.body.direccion,
				telefono1: req.body.telefono1,
				telefono2: req.body.telefono2,
				telefono3: req.body.telefono3,
				id_departamento: req.body.id_departamento,
				id_municipio: req.body.id_municipio,
				usar_panel: req.body.usar_panel,
				usar_vencimientos: req.body.usar_vencimientos,
				usar_servicios: req.body.usar_servicios,
				usar_consumos: req.body.usar_consumos,
				usar_descuentos: req.body.usar_descuentos,
				usar_georeferenciacion: req.body.usar_georeferenciacion,
				usar_pedidos: req.body.usar_pedidos,
				usar_pantalla_cliente: req.body.usar_pantalla_cliente,
				usar_pantalla_despacho: req.body.usar_pantalla_despacho,
				usar_mesas: req.body.usar_mesas,
				usar_salas: req.body.usar_salas,
				usar_contabilidad: req.body.usar_contabilidad,
				usar_medico: req.body.usar_medico,
				usar_mantenimiento: req.body.usar_mantenimiento,
				usar_cuentas_auxiliares: req.body.usar_cuentas_auxiliares,
				usar_proformas: req.body.usar_proformas,
				usar_creditos: req.body.usar_creditos,
				usar_destinos: req.body.usar_destinos,
				usar_razon_social: req.body.usar_razon_social,
				usar_correlativos_clientes: req.body.usar_correlativos_clientes,
				usar_correlativos_destinos: req.body.usar_correlativos_destinos,
				usar_funciones_erp: req.body.usar_funciones_erp,
				usar_estado_resultados_no_contables: req.body.usar_estado_resultados_no_contables,
				usar_peps: req.body.usar_peps,
				usar_edicion_venta: req.body.usar_edicion_venta,
				usar_venta_servicio: req.body.usar_venta_servicio,
				usar_facturacion_masiva: req.body.usar_facturacion_masiva,
				usar_cotizacion: req.body.usar_cotizacion,
				usar_tipo_precio: req.body.usar_tipo_precio,
				usar_pago_anticipado: req.body.usar_pago_anticipado,
				usar_ceros_plan_cuenta: req.body.usar_ceros_plan_cuenta,
				usar_importacion_compra: req.body.usar_importacion_compra,
				usar_importacion_venta: req.body.usar_importacion_venta,
				usar_vencimiento_productos: req.body.usar_vencimiento_productos,
				usar_vencimiento_creditos: req.body.usar_vencimiento_creditos,
				usar_vencimiento_deudas: req.body.usar_vencimiento_deudas,
				usar_filtro_lote: req.body.usar_filtro_lote,
				ver_costos_dolares: req.body.ver_costos_dolares,
				tipo_cambio_dolar: req.body.tipo_cambio_dolar,
				restar_solo_despacho: req.body.restar_solo_despacho,
				usar_anticipo_caja_chica: req.body.usar_anticipo_caja_chica,
				usar_anticipo_recursos_humanos: req.body.usar_anticipo_recursos_humanos,
				usar_mantenimiento_externo_propio: req.body.usar_mantenimiento_externo_propio,
				usar_promocion_producto: req.body.usar_promocion_producto,
				usar_prestacion_compra: req.body.usar_prestacion_compra,
				usar_indice_rotacion_producto: req.body.usar_indice_rotacion_producto,
				usar_restaurante_express: req.body.usar_restaurante_express,
				usar_productos_derivados_panel: req.body.usar_productos_derivados_panel,
				usar_promocion_producto_puntos: req.body.usar_promocion_producto_puntos,
				usar_calificaciones_proveedor: req.body.usar_calificaciones_proveedor,
				usar_precio_por_sucursal: req.body.usar_precio_por_sucursal,
				usar_combo_producto_final: req.body.usar_combo_producto_final,
				usar_configuracion_iso: req.body.usar_configuracion_iso,
				representante_legal: req.body.representante_legal,
				repr_ci: req.body.repr_ci,
				repr_extension_ci: req.body.repr_extension_ci,
				repr_direccion: req.body.repr_direccion,
				repr_telefono: req.body.repr_telefono,
				repr_correo_electronico: req.body.repr_correo_electronico,
				usar_panel_cotizaciones: req.body.usar_panel_cotizaciones,
				usar_devoluciones: req.body.usar_devoluciones,
				usar_generador_series: req.body.usar_generador_series,
				usar_ingreso_por_ajuste: req.body.usar_ingreso_por_ajuste,
				usar_traspaso_automatico: req.body.usar_traspaso_automatico,
				usar_produccion_compra: req.body.usar_produccion_compra,
				nombre_comercial: req.body.nombre_comercial,
				usar_programacion_pago_proveedor: req.body.usar_programacion_pago_proveedor,
				usar_relacion_compra_rendicion: req.body.usar_relacion_compra_rendicion,
				usar_envio_correos: req.body.usar_envio_correos,
				usar_correo_imstitucional: req.body.usar_correo_imstitucional,
				email_host: req.body.usar_correo_imstitucional?req.body.email_host:'smtp.gmail.com',
				email_puerto: req.body.usar_correo_imstitucional?req.body.email_puerto:'465',
				email_empresa_aplicacion: req.body.email_empresa_aplicacion,
				email_password_aplicacion: req.body.email_password_aplicacion,
				asunto_email: req.body.asunto_email,
				usar_facturacion_electronica: req.body.usar_facturacion_electronica
			}).then(function (empresaCreada) {
				Sucursal.create({
					id_empresa: empresaCreada.id,
					nombre: req.body.sucursal.nombre,
					numero: req.body.sucursal.numero,
					direccion: req.body.sucursal.direccion,
					telefono1: req.body.sucursal.telefono1,
					telefono2: req.body.sucursal.telefono2,
					telefono3: req.body.sucursal.telefono3,
					id_departamento: req.body.sucursal.id_departamento,
					id_municipio: req.body.sucursal.id_municipio,
					nota_venta_correlativo: req.body.sucursal.nota_venta_correlativo
				}).then(function (sucursalCreada) {
					Tipo.create({
						id_empresa: empresaCreada.id,
						nombre: "GRUPOS PRODUCTOS",
						nombre_corto: "GRUPOS PRODUCTOS"
					}).then(function (grupoProd) {
						Tipo.create({
							id_empresa: empresaCreada.id,
							nombre: "SUBGRUPOS PRODUCTOS",
							nombre_corto: "SUBGRUPOS PRODUCTOS"
						}).then(function (subGrupoProd) {
							Tipo.create({
								id_empresa: empresaCreada.id,
								nombre: "RELACIONES PRODUCTOS",
								nombre_corto: "RELACIONES PRODUCTOS"
							}).then(function (RELpRO) {
								Tipo.create({
									id_empresa: empresaCreada.id,
									nombre: "VENCIMIENTOS",
									nombre_corto: "VENCIMIENTOS"
								}).then(function (venCreado) {
									Clase.create({
										id_tipo: venCreado.id,
										nombre: "VENCIMIENTO DE PRODUCTOS",
										nombre_corto: "10",
										eliminado: false,
										habilitado: true
									}).then(function (venPROCreado) {
										Clase.create({
											id_tipo: venCreado.id,
											nombre: "VENCIMIENTO DE CRÉDITOS",
											nombre_corto: "10",
											eliminado: false,
											habilitado: true
										}).then(function (venCRECreado) {
											Clase.create({
												id_tipo: venCreado.id,
												nombre: "VENCIMIENTO DE DEUDAS",
												nombre_corto: "10",
												eliminado: false,
												habilitado: true
											}).then(function (venDECreado) {
												ConfiguracionVentaVista.create({
													mostrar_producto: true,
													mostrar_precio_unitario: true,
													mostrar_cantidad: true,
													mostrar_importe: true,
													mostrar_descuento: false,
													mostrar_recargo: false,
													mostrar_ice: false,
													mostrar_excento: false,
													mostrar_total: true,
													mostrar_fecha_vencimiento: false,
													mostrar_lote: false,
													mostrar_codigo_producto: true,
													mostrar_unidad_producto: true,
													id_empresa: empresaCreada.id
												}).then(function (configuracionVentaVistaCreada) {
													ConfiguracionCompraVista.create({
														mostrar_producto: true,
														mostrar_costo_unitario: true,
														mostrar_cantidad: true,
														mostrar_importe: true,
														mostrar_descuento: false,
														mostrar_recargo: false,
														mostrar_ice: false,
														mostrar_excento: false,
														mostrar_total: true,
														mostrar_fecha_vencimiento: false,
														mostrar_lote: false,
														mostrar_codigo_producto: true,
														mostrar_unidad_producto: true,
														mostrar_it_retencion: true,
														mostrar_iue: true,
														mostrar_pagado: true,
														id_empresa: empresaCreada.id
													}).then(function (configuracionCompraVistaCreada) {
														var imagen;
														if (req.body.imagen.indexOf('default') > -1) {
															imagen = req.body.imagen;
														} else {
															var imagenEmpresa = decodeBase64Image(req.body.imagen);
															fs.writeFileSync('./img/empresa-' + empresaCreada.id + '.jpg', imagenEmpresa.data, 'base64', function (err) { });
															imagen = 'img/empresa-' + empresaCreada.id + '.jpg';
														}
										
														if (req.body.usar_facturacion_electronica) {
															var form = new FormData();
															form.append('empresa',empresaCreada.id);
															form.append('razonSocial',req.body.razon_social);
															form.append('nit',req.body.nit);
															form.append('codigoSistema',req.body.facturacionConfigEmpresa.codigoSistema ? req.body.facturacionConfigEmpresa.codigoSistema : '');
															form.append('codigoAmbiente',req.body.facturacionConfigEmpresa.codigoAmbiente ? req.body.facturacionConfigEmpresa.codigoAmbiente : '');
															form.append('codigoModalidad',req.body.facturacionConfigEmpresa.codigoModalidad ? req.body.facturacionConfigEmpresa.codigoModalidad : '');
															form.append('tokenSin',req.body.facturacionConfigEmpresa.tokenSin ? req.body.facturacionConfigEmpresa.tokenSin : '');
															// if(req.body.facturacionConfigEmpresa.docFirma) form.append('docFirma', req.body.facturacionConfigEmpresa.docFirma.data, req.body.facturacionConfigEmpresa.docFirma.name);
															form.append('passwordFirma',req.body.facturacionConfigEmpresa.passwordFirma ? req.body.facturacionConfigEmpresa.passwordFirma : '');
															form.append('cufdAutomatico',req.body.facturacionConfigEmpresa.cufdAutomatico ? 1 : 0);
															form.append('idEmpresa', empresaCreada.id);
															form.append('sucursal', sucursalCreada.id);
															form.append('nombreSucursal', sucursalCreada.nombre);
															form.append('codigoSucursal', sucursalCreada.numero);
															
															axios.post(restApiSFE + 'empresa/crear',  form,{
																headers: {
																  ...form.getHeaders(),
																}
															}).then(resp => {
																console.log(resp.data);
																actualizarImagenEmpresa(empresaCreada, req, res, null, imagen, resp.data.token);
																// res.json({ empresa: empresaCreada, url: imagen, image_name: 'empresa-' + empresaCreada.id + '.jpg' });
															}).catch(function (err) {
																if (err.response.data) {
																	let message = err.response.data
																	res.json({ mensaje: message.error ? message.error : err.message, hasErr: true, empresa: empresaCreada })
																}else{
																	res.json({ mensaje: err.message === undefined ? err.stack : err.message, hasErr: true, empresa: empresaCreada })
																}
															});
														}else{
															actualizarImagenEmpresa(empresaCreada, req, res, null, imagen);
														}
													}).catch(function (err) {
														res.json({ mensaje: err.message === undefined ? err.stack : err.message, hasErr: true })
													});
												});
											});
										});
									});
								});
							});
						});
					});
				});
			});
		})

		.get(ensureAuthorizedlogged, function (req, res) {
			Empresa.findAll({
				include: [{ model: Clase, as: 'departamento' },
				{ model: Clase, as: 'municipio' },
				{ model: Sucursal, as: 'sucursales' }]
			}).then(function (entidades) {
				res.json(entidades);
			});
		});

	function actualizarImagenEmpresa(empresaCreada, req, res, signedRequest, imagen, token) {
		Empresa.update({
			imagen: imagen,
			token
		}, {
			where: { id: empresaCreada.id }
		}).then(function (affecteedRows) {
			if(req.body.rolUsuario == "SUPER-ADMINISTRADOR"){
				EmpresaAplicacion.destroy({
					where: {
						id_empresa: empresaCreada.id
					}
	
				}).then(function (empresaAplicacionActualizado) {
					if (req.body.aplicaciones.length > 0) {
						req.body.aplicaciones.forEach(function (aplicacion, index, array) {
							EmpresaAplicacion.findOrCreate({
								where: { id_aplicacion: aplicacion.id, id_empresa: empresaCreada.id },
								defaults: {
									d_aplicacion: aplicacion.id,
									id_empresa: empresaCreada.id
								}
							}).spread(function (cargoEncontrado, created) {
								if (index === (array.length - 1)) {
									req.body.integraciones.forEach(function (integracion, i, a) {
										var id = (integracion.id_integracion) ? integracion.id_integracion : integracion.id
										EmpresaIntegracion.findOrCreate({
											where: {
												id_integracion: id,
												id_empresa: empresaCreada.id
											},
											defaults: {
												id_integracion: id,
												id_empresa: empresaCreada.id,
												usar_integracion: integracion.usar_integracion
											}
										}).spread(function (IntegracionEncontrada, created) {
											if (created == false) {
												EmpresaIntegracion.update({
													usar_integracion: integracion.usar_integracion
												}, { where: { id: IntegracionEncontrada.id } }).then(function (intActualizada) {
													if (i === (a.length - 1)) {
														res.json({ empresa: empresaCreada, url: imagen, signedRequest: signedRequest, image_name: 'empresa-' + empresaCreada.id + '.jpg' });
													}
												})
											} else {
												if (i === (a.length - 1)) {
													res.json({ empresa: empresaCreada, url: imagen, signedRequest: signedRequest, image_name: 'empresa-' + empresaCreada.id + '.jpg' });
												}
											}
										})
									})
	
								}
	
							}).catch(function (err) {
								res.json({ mensaje: err.message === undefined ? err.stack : err.message, hasErr: true })
							});
	
						});
					}else{
						res.json({ empresa: empresaCreada, url: imagen, signedRequest: signedRequest, image_name: 'empresa-' + empresaCreada.id + '.jpg' });
					}
				}).catch(function (err) {
					res.json({ mensaje: err.message === undefined ? err.stack : err.message, hasErr: true })
				});
			}else{
				res.json({ empresa: empresaCreada, url: imagen, signedRequest: signedRequest, image_name: 'empresa-' + empresaCreada.id + '.jpg' });
			}

			
		}).catch(function (err) {
			res.json({ mensaje: err.message === undefined ? err.stack : err.message, hasErr: true })
		});
	}

	router.route('/empresas/:id_empresa')
		.put(ensureAuthorizedlogged, function (req, res) {
			Empresa.update({
				razon_social: req.body.razon_social,
				nit: req.body.nit,
				direccion: req.body.direccion,
				telefono1: req.body.telefono1,
				telefono2: req.body.telefono2,
				telefono3: req.body.telefono3,
				id_departamento: req.body.id_departamento,
				id_municipio: req.body.id_municipio,
				usar_panel: req.body.usar_panel,
				usar_vencimientos: req.body.usar_vencimientos,
				usar_servicios: req.body.usar_servicios,
				usar_consumos: req.body.usar_consumos,
				usar_descuentos: req.body.usar_descuentos,
				usar_georeferenciacion: req.body.usar_georeferenciacion,
				usar_pedidos: req.body.usar_pedidos,
				usar_pantalla_cliente: req.body.usar_pantalla_cliente,
				usar_pantalla_despacho: req.body.usar_pantalla_despacho,
				usar_mesas: req.body.usar_mesas,
				usar_salas: req.body.usar_salas,
				usar_contabilidad: req.body.usar_contabilidad,
				usar_medico: req.body.usar_medico,
				usar_mantenimiento: req.body.usar_mantenimiento,
				usar_cuentas_auxiliares: req.body.usar_cuentas_auxiliares,
				usar_proformas: req.body.usar_proformas,
				usar_creditos: req.body.usar_creditos,
				usar_destinos: req.body.usar_destinos,
				usar_razon_social: req.body.usar_razon_social,
				usar_correlativos_clientes: req.body.usar_correlativos_clientes,
				usar_correlativos_destinos: req.body.usar_correlativos_destinos,
				usar_funciones_erp: req.body.usar_funciones_erp,
				usar_estado_resultados_no_contables: req.body.usar_estado_resultados_no_contables,
				usar_peps: req.body.usar_peps,
				usar_edicion_venta: req.body.usar_edicion_venta,
				usar_venta_servicio: req.body.usar_venta_servicio,
				usar_facturacion_masiva: req.body.usar_facturacion_masiva,
				usar_cotizacion: req.body.usar_cotizacion,
				usar_tipo_precio: req.body.usar_tipo_precio,
				usar_pago_anticipado: req.body.usar_pago_anticipado,
				usar_ceros_plan_cuenta: req.body.usar_ceros_plan_cuenta,
				usar_importacion_compra: req.body.usar_importacion_compra,
				usar_importacion_venta: req.body.usar_importacion_venta,
				usar_vencimiento_productos: req.body.usar_vencimiento_productos,
				usar_vencimiento_creditos: req.body.usar_vencimiento_creditos,
				usar_vencimiento_deudas: req.body.usar_vencimiento_deudas,
				usar_filtro_lote: req.body.usar_filtro_lote,
				ver_costos_dolares: req.body.ver_costos_dolares,
				tipo_cambio_dolar: req.body.tipo_cambio_dolar,
				usar_anticipo_caja_chica: req.body.usar_anticipo_caja_chica,
				usar_anticipo_recursos_humanos: req.body.usar_anticipo_recursos_humanos,
				usar_integracion: req.body.usar_integracion,
				usar_mantenimiento_externo_propio: req.body.usar_mantenimiento_externo_propio,
				usar_promocion_producto: req.body.usar_promocion_producto,
				restar_solo_despacho: req.body.restar_solo_despacho,
				usar_prestacion_compra: req.body.usar_prestacion_compra,
				usar_indice_rotacion_producto: req.body.usar_indice_rotacion_producto,
				usar_restaurante_express: req.body.usar_restaurante_express,
				usar_productos_derivados_panel: req.body.usar_productos_derivados_panel,
				usar_promocion_producto_puntos: req.body.usar_promocion_producto_puntos,
				usar_calificaciones_proveedor: req.body.usar_calificaciones_proveedor,
				usar_precio_por_sucursal: req.body.usar_precio_por_sucursal,
				usar_combo_producto_final: req.body.usar_combo_producto_final,
				usar_configuracion_iso: req.body.usar_configuracion_iso,
				representante_legal: req.body.representante_legal,
				repr_ci: req.body.repr_ci,
				repr_extension_ci: req.body.repr_extension_ci,
				repr_direccion: req.body.repr_direccion,
				repr_telefono: req.body.repr_telefono,
				repr_correo_electronico: req.body.repr_correo_electronico,
				usar_panel_cotizaciones: req.body.usar_panel_cotizaciones,
				usar_devoluciones: req.body.usar_devoluciones,
				usar_generador_series: req.body.usar_generador_series,
				usar_ingreso_por_ajuste: req.body.usar_ingreso_por_ajuste,
				usar_traspaso_automatico: req.body.usar_traspaso_automatico,
				usar_produccion_compra: req.body.usar_produccion_compra,
				nombre_comercial: req.body.nombre_comercial,
				usar_programacion_pago_proveedor: req.body.usar_programacion_pago_proveedor,
				usar_relacion_compra_rendicion: req.body.usar_relacion_compra_rendicion,
				usar_envio_correos: req.body.usar_envio_correos,
				usar_correo_imstitucional: req.body.usar_correo_imstitucional,
				email_host: req.body.usar_correo_imstitucional?req.body.email_host:'smtp.gmail.com',
				email_puerto: req.body.usar_correo_imstitucional?req.body.email_puerto:'465',
				email_empresa_aplicacion: req.body.email_empresa_aplicacion,
				email_password_aplicacion: req.body.email_password_aplicacion,
				asunto_email: req.body.asunto_email,
				usar_facturacion_electronica: req.body.usar_facturacion_electronica
			}, {
				where: {
					id: req.params.id_empresa
				}
			}).then(function (empresaActualizada) {
				var imagen;
				if ((req.body.imagen.indexOf('default') > -1 || req.body.imagen.indexOf("persona-" + req.body.id) > -1 || req.body.imagen.indexOf(req.body.id) > -1) && req.body.imagen.length < 200) {
					imagen = req.body.imagen;
				} else {
					var imgPerson = decodeBase64Image(req.body.imagen);
					fs.writeFileSync('./img/empresa-' + req.body.id + '.jpg', imgPerson.data, 'base64', function (err) { });
					imagen = 'img/empresa-' + req.body.id + '.jpg';
				}
				
				if (req.body.usar_facturacion_electronica && req.body.facturacionConfigEmpresa) {
					if(req.body.facturacionConfigEmpresa.id){
						var form = new FormData();
						form.append('razonSocial',req.body.razon_social);
						form.append('nit',req.body.nit);
						form.append('codigoSistema',req.body.facturacionConfigEmpresa.codigoSistema);
						form.append('codigoAmbiente',req.body.facturacionConfigEmpresa.codigoAmbiente);
						form.append('codigoModalidad',req.body.facturacionConfigEmpresa.codigoModalidad);
						form.append('tokenSin',req.body.facturacionConfigEmpresa.tokenSin);
						// if(req.body.facturacionConfigEmpresa.docFirma) form.append('docFirma', req.body.facturacionConfigEmpresa.docFirma.data, req.body.facturacionConfigEmpresa.docFirma.name);
						form.append('passwordFirma',req.body.facturacionConfigEmpresa.passwordFirma);
						form.append('cufdAutomatico', (req.body.facturacionConfigEmpresa.cufdAutomatico ? 1 : 0));
						form.append('idEmpresa', req.body.id);
						form.append('sucursal', req.body.id_sucursal);
						form.append('nombreSucursal', req.body.nombreSucursal);
						form.append('codigoSucursal', req.body.codigoSucursal);
						
						axios.put(restApiSFE + 'empresa/actualizar/'+req.body.id,  form,{
							headers: {
								...form.getHeaders(),
								'Content-Type': undefined
							}
						}).then(resp => {
							actualizarImagenEmpresa(req.body, req, res, null, imagen);
						}).catch(function (err) {
							if (err.response.data) {
								if (err.response.data.error.includes('CUIS')) {
									actualizarImagenEmpresa(req.body, req, res, null, imagen);
								}else{
									let message = err.response.data
									res.json({ mensaje: message.error ? message.error : err.message, hasErr: true })
								}
							}else{
								res.json({ mensaje: err.message === undefined ? err.stack : err.message, hasErr: true })
							}
						});
					}else{
						var form = new FormData();
						form.append('empresa',req.body.id);
						form.append('razonSocial',req.body.razon_social);
						form.append('nit',req.body.nit);
						form.append('codigoSistema',req.body.facturacionConfigEmpresa.codigoSistema ? req.body.facturacionConfigEmpresa.codigoSistema : '');
						form.append('codigoAmbiente',req.body.facturacionConfigEmpresa.codigoAmbiente ? req.body.facturacionConfigEmpresa.codigoAmbiente : '');
						form.append('codigoModalidad',req.body.facturacionConfigEmpresa.codigoModalidad ? req.body.facturacionConfigEmpresa.codigoModalidad : '');
						form.append('tokenSin',req.body.facturacionConfigEmpresa.tokenSin ? req.body.facturacionConfigEmpresa.tokenSin : '');
						// if(req.body.facturacionConfigEmpresa.docFirma) form.append('docFirma', req.body.facturacionConfigEmpresa.docFirma.data, req.body.facturacionConfigEmpresa.docFirma.name);
						form.append('passwordFirma',req.body.facturacionConfigEmpresa.passwordFirma ? req.body.facturacionConfigEmpresa.passwordFirma : '');
						form.append('cufdAutomatico',req.body.facturacionConfigEmpresa.cufdAutomatico ? 1 : 0);
						form.append('idEmpresa', req.body.id);
						form.append('sucursal', req.body.id_sucursal);
						form.append('nombreSucursal', req.body.nombreSucursal);
						form.append('codigoSucursal', req.body.codigoSucursal);
						
						axios.post(restApiSFE + 'empresa/crear',  form,{
							headers: {
								...form.getHeaders(),
							}
						}).then(resp => {
							console.log(resp.data);
							actualizarImagenEmpresa(req.body, req, res, null, imagen, resp.data.token);
							// res.json({ empresa: empresaCreada, url: imagen, image_name: 'empresa-' + empresaCreada.id + '.jpg' });
						}).catch(function (err) {
							if (err.response.data) {
								let message = err.response.data
								res.json({ mensaje: message.error ? message.error : err.message, hasErr: true })
							}else{
								res.json({ mensaje: err.message === undefined ? err.stack : err.message, hasErr: true })
							}
						});
					}
				}else{
					actualizarImagenEmpresa(req.body, req, res, null, imagen);
				}
			}).catch(function (err) {
				res.json({ mensaje: err.message === undefined ? err.stack : err.message, hasErr: true })
			});
		})

		.get(function (req, res) {
			var condicion;
			if (req.params.id_empresa == "0") {
				condicion = {};
			} else {
				condicion = { id: req.params.id_empresa };
			}
			Empresa.findAll({
				attributes: Object.keys(Empresa.attributes).concat([[sequelize.literal('(SELECT id FROM agil_sucursal WHERE empresa = `agil_empresa`.`id` ORDER BY id ASC LIMIT 1)'), 'id_sucursal'],[sequelize.literal('(SELECT nombre FROM agil_sucursal WHERE empresa = `agil_empresa`.`id` ORDER BY id ASC LIMIT 1)'), 'nombreSucursal'], [sequelize.literal('(SELECT numero FROM agil_sucursal WHERE empresa = `agil_empresa`.`id` ORDER BY id ASC LIMIT 1)'), 'codigoSucursal']]),
				where: condicion,
				include: [{ model: Clase, as: 'departamento' }, { model: EmpresaAplicacion, as: 'aplicacionesEmpresa' },
				{ model: Clase, as: 'municipio' }, { model: EmpresaIntegracion, as: 'integraciones', include: [{ model: IntegracionAplicacion, as: 'moduloIntegracion', include: [{ model: Aplicacion, as: 'aplicacion' }] }] }]
			}).then(function (entidades) {
				res.json(entidades);
			}).catch(function (err) {
				console.log(err)
			})
		})

		.delete(ensureAuthorizedlogged, function (req, res) {
			Empresa.destroy({
				where: {
					id: req.params.id_empresa
				}
			}).then(function (affectedRows) {
				Sucursal.destroy({
					where: {
						id_empresa: req.params.id_empresa
					}
				}).then(function (affectedRows) {
					res.json({ message: "Eliminado Satisfactoriamente!" });
				});
			});
		});
	router.route('/sistema/aplicaciones')
		.get(ensureAuthorizedlogged, function (req, res) {
			if (req.query.app.length > 0) {
				Aplicacion.findAll({
					where: { id: { $in: req.query.app.split(',') } }
				}).then(function (Aplicaciones) {
					res.json(Aplicaciones);
				});
			} else {
				Aplicacion.findAll({

				}).then(function (Aplicaciones) {
					res.json(Aplicaciones);
				});
			}

		})
	router.route('/sistema/aplicaciones/empresa/:id_empresa')
		.get(ensureAuthorizedlogged, function (req, res) {
			EmpresaAplicacion.findAll({
				where: { id_empresa: req.params.id_empresa },
				include: [{ model: Aplicacion, as: 'aplicacion', include: [{ model: OpcionAplicacion, as: 'opciones' }] }]
			}).then(function (Aplicaciones) {
				res.json(Aplicaciones);
			});
		})
	router.route('/empresas/:id_empresa/configuracion-venta-vista')
		.get(ensureAuthorizedlogged, function (req, res) {
			ConfiguracionVentaVista.find({
				where: {
					id_empresa: req.params.id_empresa
				}
			}).then(function (configuracionVentaVista) {
				res.json(configuracionVentaVista);
			});
		})

		.put(ensureAuthorizedlogged, function (req, res) {
			ConfiguracionVentaVista.update({
				mostrar_producto: req.body.mostrar_producto,
				mostrar_precio_unitario: req.body.mostrar_precio_unitario,
				mostrar_cantidad: req.body.mostrar_cantidad,
				mostrar_importe: req.body.mostrar_importe,
				mostrar_descuento: req.body.mostrar_descuento,
				mostrar_recargo: req.body.mostrar_recargo,
				mostrar_ice: req.body.mostrar_ice,
				mostrar_excento: req.body.mostrar_excento,
				mostrar_total: req.body.mostrar_total,
				mostrar_fecha_vencimiento: req.body.mostrar_fecha_vencimiento,
				mostrar_lote: req.body.mostrar_lote,
				mostrar_codigo_producto: req.body.mostrar_codigo_producto,
				mostrar_unidad_producto: req.body.mostrar_unidad_producto,

			}, {
				where: {
					id_empresa: req.params.id_empresa
				}
			}).then(function (actualizada) {
				res.json({ mensaje: "¡Actualizado Satisfactoriamente!" });
			});
		});

	router.route('/empresas/:id_empresa/configuracion-compra-vista')
		.get(ensureAuthorizedlogged, function (req, res) {
			ConfiguracionCompraVista.find({
				where: {
					id_empresa: req.params.id_empresa
				}
			}).then(function (configuracionCompraVista) {
				res.json(configuracionCompraVista);
			});
		})

		.put(ensureAuthorizedlogged, function (req, res) {
			ConfiguracionCompraVista.update({
				mostrar_producto: req.body.mostrar_producto,
				mostrar_costo_unitario: req.body.mostrar_costo_unitario,
				mostrar_cantidad: req.body.mostrar_cantidad,
				mostrar_importe: req.body.mostrar_importe,
				mostrar_descuento: req.body.mostrar_descuento,
				mostrar_recargo: req.body.mostrar_recargo,
				mostrar_ice: req.body.mostrar_ice,
				mostrar_excento: req.body.mostrar_excento,
				mostrar_total: req.body.mostrar_total,
				mostrar_fecha_vencimiento: req.body.mostrar_fecha_vencimiento,
				mostrar_lote: req.body.mostrar_lote,
				mostrar_codigo_producto: req.body.mostrar_codigo_producto,
				mostrar_unidad_producto: req.body.mostrar_unidad_producto,
				mostrar_it_retencion: req.body.mostrar_it_retencion,
				mostrar_iue: req.body.mostrar_iue,
				mostrar_pagado: req.body.mostrar_pagado,

			}, {
				where: {
					id_empresa: req.params.id_empresa
				}
			}).then(function (actualizada) {
				res.json({ mensaje: "¡Actualizado Satisfactoriamente!" });
			});
		});

	router.route('/grupos/empresa/:id_empresa')
		.get(ensureAuthorizedlogged, function (req, res) {
			sequelize.query("SELECT gl_clase.id, gl_clase.nombre, gl_clase.habilitado FROM gl_clase,gl_tipo where gl_tipo.nombre_corto='GRUPOS PRODUCTOS' and gl_clase.tipo=gl_tipo.id and gl_tipo.empresa=" + req.params.id_empresa, { type: sequelize.QueryTypes.SELECT })
				.then(function (dato) {
					res.json(dato);;
				});
		});

	router.route('/grupos/empresa/:id_empresa/user/:id_usuario')
		.get(ensureAuthorizedlogged, function (req, res) {
			sequelize.query("SELECT DISTINCT gl_clase.id, gl_clase.nombre, gl_clase.habilitado FROM gl_clase inner join gl_tipo on gl_clase.tipo = gl_tipo.id where gl_clase.id in (SELECT grupo from sys_usuario_grupos where usuario =" + req.params.id_usuario + ") and gl_tipo.empresa = " + req.params.id_empresa, { type: sequelize.QueryTypes.SELECT })
				.then(function (dato) {
					res.json(dato);
				});
		});
	router.route('/subgrupos/empresa/:id_empresa/user/:id_usuario')
		.get(ensureAuthorizedlogged, function (req, res) {
			sequelize.query("SELECT DISTINCT gl_clase.id, gl_clase.nombre, gl_clase.habilitado FROM gl_clase inner join gl_tipo on gl_clase.tipo = gl_tipo.id where gl_clase.habilitado= true and gl_tipo.empresa = " + req.params.id_empresa + " and gl_tipo.nombre = 'SUBGRUPOS PRODUCTOS'", { type: sequelize.QueryTypes.SELECT })
				.then(function (dato) {
					res.json(dato);
				}).catch((err) => {
					res.json({ mensaje: 'Error al obtener lista de subproductos: rutas-empresa:584', hasErr: true })
				})
		});
	router.route('/gruposv2/empresa/:id_empresa/user/:id_usuario')
		.get(ensureAuthorizedlogged, function (req, res) {
			Tipo.find({
				where: { id_empresa: req.params.id_empresa, nombre_corto: 'GRUPOS PRODUCTOS' },
				include: [{ model: Clase, as: 'clases', include: [{ model: UsuarioGrupos, as: 'clasegrupo', where: { id_usuario: req.params.id_usuario } }] }]
			}).then(function (dato) {
				res.json(dato);
			});
		});

	router.route('/empresa/:id_empresa')
		.get(ensureAuthorizedlogged, function (req, res) {
			Empresa.findAll({
				include: [{
					model: Usuario, as: 'usuarios', where: { id_empresa: req.params.id_empresa }
				}]
			}).then(function (empresa) {
				res.json(empresa);
			})
		})

	router.route('/subgrupos/empresa/:id_empresa')
		.get(ensureAuthorizedlogged, function (req, res) {
			sequelize.query("SELECT gl_clase.id, gl_clase.nombre,gl_clase.padre as id_padre, gl_clase.habilitado FROM gl_clase,gl_tipo where gl_tipo.nombre_corto='SUBGRUPOS PRODUCTOS' and gl_clase.tipo=gl_tipo.id and gl_tipo.empresa=" + req.params.id_empresa, { type: sequelize.QueryTypes.SELECT })
				.then(function (dato) {
					res.json(dato);
				});


		});
	router.route('/integraciones-aplicacion')
		.get(ensureAuthorizedlogged, function (req, res) {
			IntegracionAplicacion.findAll({
				include: [{ model: Aplicacion, as: 'aplicacion' }]
			}).then(function (dato) {
				res.json(dato);
			});


		});
	router.route('/integraciones-empresa-aplicacion/:id_empresa')
		.get(ensureAuthorizedlogged, function (req, res) {
			EmpresaIntegracion.findAll({
				where: { id_empresa: req.params.id_empresa, usar_integracion: true },
				include: [{ model: IntegracionAplicacion, as: 'moduloIntegracion', include: [{ model: Aplicacion, as: 'aplicacion' }] }]
			}).then(function (dato) {
				res.json(dato);
			});


		});
	/* correlativos empresa */
	router.route('/correlativos/empresa/:id_empresa')
		.get(ensureAuthorizedlogged, function (req, res) {
			CorrelativosEmpresa.find({
				where: { id_empresa: req.params.id_empresa },
			}).then(function (dato) {
				res.json({ correlativos: dato });
			});

		})
		.post(ensureAuthorizedlogged, function (req, res) {
			if (req.body.id) {
				CorrelativosEmpresa.update({
					numero_correlativo_llamada_atencion: req.body.numero_correlativo_llamada_atencion,
					numero_correlativo_programacion_pago: req.body.numero_correlativo_programacion_pago,
					numero_correlativo_transaccion_cobro: req.body.numero_correlativo_transaccion_cobro,
					numero_correlativo_transaccion_pago: req.body.numero_correlativo_transaccion_pago
				}, {
					where: { id: req.body.id },
				}).then(function (actualizado) {
					res.json({ mensaje: 'Actualizado Satisfactoriamente!' });
				});
			} else {
				CorrelativosEmpresa.create({
					id_empresa: req.params.id_empresa,
					numero_correlativo_llamada_atencion: req.body.numero_correlativo_llamada_atencion,
					numero_correlativo_programacion_pago: req.body.numero_correlativo_programacion_pago,
					numero_correlativo_transaccion_cobro: req.body.numero_correlativo_transaccion_cobro,
					numero_correlativo_transaccion_pago: req.body.numero_correlativo_transaccion_pago
					
				}).then(function (creado) {
					res.json({ mensaje: 'Creado Satisfactoriamente!' });
				});
			}
		});
	/* correlativos empresa */
	router.route('/configuracion-iso/empresa/:id_empresa/concepto/:nombre_corto')
	.get(ensureAuthorizedlogged, function (req, res) {
		ConfiguracionIsoEmpresa.find({
			where: { id_empresa: req.params.id_empresa, eliminado: false, activo: true },
			include: [{ model: Clase, as: 'tipoDocumento',where:{nombre_corto:req.params.nombre_corto} }]
		})
		.then( (datos) => res.json({ error: false, configuracionIso: datos }) )
		.catch( (e) => res.json({ error: true, message: e }) )
	})
	router.route('/configuracion-iso/empresa/:id_empresa')
	.get(ensureAuthorizedlogged, function (req, res) {
		ConfiguracionIsoEmpresa.findAll({
			where: { id_empresa: req.params.id_empresa, eliminado: false },
			include: [{ model: Clase, as: 'tipoDocumento' }]
		}).then(function (datos) {
			res.json({ configuracionesIso: datos })
		})
	})
	.post(ensureAuthorizedlogged, function (req, res) {
		req.body.forEach(function (config, index, array) {
			if (config.id) {
				ConfiguracionIsoEmpresa.update({
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
				
				sequelize.query("SELECT max(version_impresion) AS version_impresion FROM agil_configuracion_iso_empresa WHERE tipo_documento="+config.tipoDocumento.id+" AND empresa="+req.params.id_empresa,
					{ type: sequelize.QueryTypes.SELECT })
				.then( isoConfig => {
					if(isoConfig.length == 1 ) {
						isoConfig[0].version_impresion != null ? (config.version_impresion=isoConfig[0].version_impresion + 1 ): (config.version_impresion = 1);
					}else{
						config.version_impresion = 1;
					}
					ConfiguracionIsoEmpresa.create({
						id_empresa: req.params.id_empresa,
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
	router.route('/habilitar/empresa-iso')
	.post(ensureAuthorizedlogged, (req, res) => {
		ConfiguracionIsoEmpresa.update({
			activo: req.body.activo,
			predefinido: req.body.predefinido
		}, {
			where: {
				id: req.body.id
			}
		}).then(function (Actualizada) {
			res.json({ mensaje: 'Estado actualizado...' });
		}).catch((err) => {
			res.json({ mensaje: err.stack, hasErr: true });
		})
	})
}