angular.module('agil.servicios')
	.factory('IndexDbBuscarProductos', ['$indexedDB', '$q', function ($indexedDB, $q) {
		var res = async function (id_empresa) {
			try {
				let productos, productosVenta, delay;
				return $indexedDB.openStore('agil_producto', async (store) => {
					// build query				// update scope
					productosVenta = await store.getAll();
					productos = productosVenta.filter((x) => x.id_empresa == id_empresa);
					delay = $q.defer();
					delay.resolve(vista);
					return delay.promise;
				});
			} catch (error) {
				console.error(error)
			}

		};
		return res;
	}])
	.factory('IndexDbConfigVentaVistaDatos', ['$indexedDB', '$q', function ($indexedDB, $q) {
		var res = async function (id_empresa) {
			try {
				let vista, VistasVenta, delay;
				return $indexedDB.openStore('agil_configuracion_venta_vista', async (storeVistaVenta) => {
					// build query				// update scope
					VistasVenta = await storeVistaVenta.getAll();
					vista = VistasVenta.find((x) => x.id_empresa == id_empresa);
					delay = $q.defer();
					delay.resolve(vista);
					return delay.promise;
				});
			} catch (error) {
				console.error(error)
			}

		};
		return res;
	}])

	.factory('IndexDbSaveConfigVentaVistaDatos', ['$indexedDB', '$q', function ($indexedDB, $q) {
		var res = function (vistaRecord, id_empresa) {
			try {
				$indexedDB.openStore('agil_configuracion_venta_vista', async (storeVistaVenta) => {
					// build query				// update scope
					let VistasVenta = await storeVistaVenta.getAll();
					let vista = VistasVenta.find((x) => x.id_empresa == id_empresa);
					if (vista) {
						storeVistaVenta.upsert({
							"id": vistaRecord.id,
							"id_empresa": vistaRecord.id_empresa,
							"mostrar_producto": vistaRecord.mostrar_producto,
							"mostrar_codigo_producto": vistaRecord.mostrar_codigo_producto,
							"mostrar_unidad_producto": vistaRecord.mostrar_unidad_producto,
							"mostrar_precio_unitario": vistaRecord.mostrar_precio_unitario,
							"mostrar_cantidad": vistaRecord.mostrar_cantidad,
							"mostrar_importe": vistaRecord.mostrar_importe,
							"mostrar_descuento": vistaRecord.mostrar_descuento,
							"mostrar_recargo": vistaRecord.mostrar_recargo,
							"mostrar_ice": vistaRecord.mostrar_ice,
							"mostrar_excento": vistaRecord.mostrar_excento,
							"mostrar_total": vistaRecord.mostrar_total,
							"mostrar_fecha_vencimiento": vistaRecord.mostrar_fecha_vencimiento,
							"mostrar_lote": vistaRecord.mostrar_lote,
							"createdAt": vistaRecord.createdAt,
							"updatedAt": vistaRecord.updatedAt,
						}).then(function (data) {
							console.log(`registro creado ${data}`)
						}).catch(function (err) {
							console.log(`error al crear registro: ${err}`)
						})
					} else {
						storeVistaVenta.insert({
							"id": vistaRecord.id,
							"id_empresa": vistaRecord.id_empresa,
							"mostrar_producto": vistaRecord.mostrar_producto,
							"mostrar_codigo_producto": vistaRecord.mostrar_codigo_producto,
							"mostrar_unidad_producto": vistaRecord.mostrar_unidad_producto,
							"mostrar_precio_unitario": vistaRecord.mostrar_precio_unitario,
							"mostrar_cantidad": vistaRecord.mostrar_cantidad,
							"mostrar_importe": vistaRecord.mostrar_importe,
							"mostrar_descuento": vistaRecord.mostrar_descuento,
							"mostrar_recargo": vistaRecord.mostrar_recargo,
							"mostrar_ice": vistaRecord.mostrar_ice,
							"mostrar_excento": vistaRecord.mostrar_excento,
							"mostrar_total": vistaRecord.mostrar_total,
							"mostrar_fecha_vencimiento": vistaRecord.mostrar_fecha_vencimiento,
							"mostrar_lote": vistaRecord.mostrar_lote,
							"createdAt": vistaRecord.createdAt,
							"updatedAt": vistaRecord.updatedAt,
						}).then(function (data) {
							console.log(`registro creado ${data}`)
						}).catch(function (err) {
							console.log(`error al crear registro: ${err}`)
						})
					}


				});

			} catch (error) {
				console.error(error)
			}
		}
		return res;
	}])

	.factory('IndexDbEmpresa', ['$resource', function ($resource) {
		return $resource(restServerSFE + "empresa/indexdb/sync/:id_empresa", {},
			{
				'update': { method: 'PUT' }
			});
	}])
	.factory('IndexDbEmpresaSync', ['IndexDbEmpresa', '$q', function (IndexDbEmpresa, $q) {
		const res = function (id_empresa) {
			const delay = $q.defer();
			IndexDbEmpresa.get({ id_empresa: id_empresa }, function (entidad) {
				delay.resolve(entidad);
			}, function (error) {
				delay.reject(error);
			});
			return delay.promise;
		};
		return res;
	}])
	.factory('SincronizacionesDiariasIndexDb', ['$indexedDB', '$q',
		'ClienteIndexDb', 'Productos', 'IndexDbEmpresaSync', function ($indexedDB, $q,
			ClienteIndexDb, Productos, IndexDbEmpresaSync) {
			let res = async (fechaATexto, id_empresa) => {
				try {
					let delay = $q.defer();
					let sincronizacionData = ['clientes', 'productos', 'empresa']

					const guardarDatosSincronizacion = async (nombre) => {

						try {
							switch (nombre) {
								case 'clientes':
									let clientes = await ClienteIndexDb(id_empresa);
									$indexedDB.openStore('agil_cliente', async (store) => {
										await store.clear();
										for (const cliente of clientes) {
											$indexedDB.openStore('agil_cliente', async (storeCLiente) => {
												await await storeCLiente.insert({
													id: cliente.id,
													id_empresa: cliente.id_empresa,
													codigo: cliente.codigo,
													razon_social: cliente.razon_social,
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
													createdAt: cliente.createdAt,
													updatedAt: cliente.updatedAt,
													latitud: cliente.latitud,
													longitud: cliente.longitud,
													documento_nit: cliente.documento_nit,
													documento_funda_empresa: cliente.documento_funda_empresa,
													documento_ci: cliente.documento_ci,
													documento_licencia_funcionamiento: cliente.documento_licencia_funcionamiento,
													documento_seguro_social: cliente.documento_seguro_social,
													linea_credito: cliente.linea_credito,
													plazo_credito: cliente.plazo_credito,
													usar_limite_credito: cliente.usar_limite_credito,
													bloquear_limite_credito: cliente.bloquear_limite_credito,
													id_tipo_precio_venta: cliente.id_tipo_precio_venta,
												})
											})
										}

									});
									break;
								case 'productos':
									let productos = await Productos(id_empresa);
									$indexedDB.openStore('agil_producto', async (store) => {
										store.clear().then(async () => {
											for (const producto of productos) {
												$indexedDB.openStore('agil_producto', async (storeProducto) => {
													storeProducto.insert({
														'id_empresa': producto.id_empresa,
														'nombre': producto.nombre,
														'imagen': producto.imagen,
														'codigo': producto.codigo,
														'unidad_medida': producto.unidad_medida,
														'precio_unitario': producto.precio_unitario,
														'utilidad_esperada': producto.utilidad_esperada,
														'inventario_minimo': producto.inventario_minimo,
														'descripcion': producto.descripcion,
														'id_grupo': producto.id_grupo,
														'id_subgrupo': producto.id_subgrupo,
														'caracteristica_especial1': producto.caracteristica_especial1,
														'caracteristica_especial2': producto.caracteristica_especial2,
														'codigo_fabrica': producto.codigo_fabrica,
														'createdAt': producto.createdAt,
														'updatedAt': producto.updatedAt,
														'comision': producto.comision,
														'publicar_panel': producto.publicar_panel,
														'alerta': producto.alerta,
														'descuento': producto.descuento,
														'descuento_fijo': producto.descuento_fijo,
														'tipo_producto': producto.tipo_producto,
														'activar_inventario': producto.activar_inventario,
														'marca': producto.marca,
														'modelo': producto.modelo,
														'anio': producto.anio,
														'almacen_erp': producto.almacen_erp,
														'id_cuenta': producto.id_cuenta,
														'rango_positivo': producto.rango_positivo,
														'rango_negativo': producto.rango_negativo,
														'activo_fijo': producto.activo_fijo,
														'precio_unitario_dolares': producto.precio_unitario_dolares,
														'usar_promocion': producto.usar_promocion,
														'restar_solo_despacho': producto.restar_solo_despacho,
														'usar_promocion_en_dias_habilitados': producto.usar_promocion_en_dias_habilitados,
														'cantidad_prestacion_compra': producto.cantidad_prestacion_compra,
														'indice_rotacion': producto.indice_rotacion,
														'unidad_economica': producto.unidad_economica,
														'id_relacion': producto.id_relacion,
														'combo': producto.combo,
														'sujeto_mantenimiento': producto.sujeto_mantenimiento,
														'usar_herencia': producto.usar_herencia,
														'id_ambiente': producto.id_ambiente,
													}).then(function (data) {
														console.log(`registro creado ${data}`)
													}).catch(function (err) {
														console.log(`error al crear registro: ${err}`)
													})
												});
											}

										}).catch(function (err) {
											console.log(`error al crear registro: ${err}`)
										})

									});
									break;
								case 'empresa':
									let res = await IndexDbEmpresaSync(id_empresa);
									let { error, empresa: empresaInfo } = res;
									if (error) return console.log("no se puede recuparar los datos de la empresa")
									$indexedDB.openStore('sfe_empresa', async (store) => {
										await store.clear();
										await store.insert({
											empresa,
											razonSocial,
											nit,
											token,
											codigoSistema,
											codigoAmbiente,
											codigoModalidad,
											tokenSin,
											firmaDigital,
											passwordFirma,
											activo,
											cufdAutomatico
										} = empresaInfo);

									})
									for (const sucursalData of empresaInfo.sucursal) {
										$indexedDB.openStore('sfe_sucursal', async (storesuc) => {
											await storesuc.clear();
											await storesuc.insert({
												sucursal,
												nombre,
												idEmpresa,
												codigoSucursal,
												activo,
											} = sucursalData);
											$indexedDB.openStore('sfe_cuis', async (store) => {
												await store.clear();
												for (const record of sucursalData.cuis) {
													await store.insert({
														codigoCuis,
														idSucursal,
														idPos,
														fechaVigencia,
														periodo
													} = record);
													$indexedDB.openStore('sfe_cufd', async (storeCufd) => {
														await storeCufd.clear();
														for (const recordCufd of record.cufd) {
															await storeCufd.insert({
																codigoCufd,
																idCuis,
																codigoControl,
																fechaEmision,
																fechaVigencia
															} = recordCufd);
														}
													})
												}
											})
											$indexedDB.openStore('sfe_punto_venta', async (store) => {
												await store.clear();
												for (const record of sucursalData.puntoVenta) {
													await store.insert({
														nombre,
														idSucursal,
														idTipoPuntoVenta,
														codigo,
														activo,
														correlativo
													} = record);
												}
											})
										})
									}
									break;
								default:
									break;
							}


						} catch (error) {
							console.error(error)
						}
					}
					const guardarsincronizacion = async (store) => {
						for (const tipoSincronizacion of sincronizacionData) {
							store.insert({
								nombre: tipoSincronizacion,
								fecha: new Date()
							}).then(function (data) {
								guardarDatosSincronizacion(tipoSincronizacion)
							}).catch(function (err) {
								console.log(`error al crear registro: ${err}`)
							})
						}



					}
					$indexedDB.openStore('sincronizacion_diaria', async (store) => {
						let allRecords = await store.getAll();
						if (allRecords.length > 0) {
							if (fechaATexto(allRecords[0].fecha) != fechaATexto(new Date())) {
								store.clear().then(function () {
									guardarsincronizacion(store);
								});
							}
						} else {
							store.clear().then(function () {
								guardarsincronizacion(store);
							});

						}

					});
				} catch (error) {
					console.error(error)
				}
			};
			return res;
		}])


	/* lista de sucursales usuario */
	.factory('IndexDbListaSucursalesUsuario', ['$q', '$indexedDB', function ($q, $indexedDB) {
		var res = function (id_usuario) {
			try {
				let delay, allRecords, sucursales;
				return $indexedDB.openStore('agil_usuario_sucursal', async (store) => {
					// build query				// update scope
					allRecords = await store.getAll();
					sucursales = allRecords.filter((x) => x.id_usuario == id_usuario);
					delay = $q.defer();
					delay.resolve({ sucursales });
					return delay.promise;
				});
			} catch (error) {
				console.error(error)
			}
		};
		return res;
	}])
	.factory('IndexDbSaveSucursalesUsuario', ['$indexedDB', function ($indexedDB) {
		var res = function (info) {
			try {
				const saveSucursalUsuario = (store, data) => {
					store.insert({
						id: data.id,
						id_usuario: data.id_usuario,
						id_sucursal: data.id_sucursal,
						createdAt: data.createdAt,
						updatedAt: data.updatedAt
					}).then(function (data) {
						console.log(`registro creado ${data}`)
					}).catch(function (err) {
						console.log(`error al crear registro: ${err}`)
					})
				}
				$indexedDB.openStore('agil_usuario_sucursal', async (store) => {
					// build query				// update scope
					store.clear().then(function () {
						for (const sucursalUsuario of info.sucursales) {
							saveSucursalUsuario(store, sucursalUsuario)
						}
					});

				});
			} catch (err) {
				console.error(err)
			}
		}
		return res;

	}])
	/* lista de sucursales usuario */
	/* lista de servicios venta */
	.factory('IndexDbSaveServiciosVentas', ['$indexedDB', function ($indexedDB) {
		var res = (info) => {
			try {
				const saveServiciosVenta = (store, data) => {
					store.insert({
						id_empresa: data.id_empresa,
						nombre: data.nombre,
						precio: data.precio,
						descripcion: data.descripcion,
						descuento: data.descuento,
						descuento_fijo: data.descuento_fijo,
						habilitado: data.habilitado,
						eliminado: data.eliminado,
						createdAt: data.createdAt,
						updatedAt: data.updatedAt
					}).then(function (data) {
						console.log(`registro creado ${data}`)
					}).catch(function (err) {
						console.log(`error al crear registro: ${err}`)
					})
				}
				$indexedDB.openStore('agil_usuario_sucursal', async (store) => {
					// build query				// update scope
					store.clear().then(function () {
						for (const servicio of info.servicios) {
							saveServiciosVenta(store, servicio)
						}
					});

				});
			} catch (err) {
				console.error(err)
			}
		}
		return res;
	}])

	.factory('IndexDbListaServiciosVentas', ['$indexedDB', '$q', function ($indexedDB, $q) {
		var res = function (id_empresa, texto) {
			try {
				let delay, allRecords, sucursales;
				return $indexedDB.openStore('agil_usuario_sucursal', async (store) => {
					// build query				// update scope
					allRecords = await store.getAll();
					sucursales = allRecords.filter((x) => x.id_empresa == id_empresa);
					delay = $q.defer();
					delay.resolve({ sucursales });
					return delay.promise;
				});
			} catch (error) {
				console.error(error)
			}
		};
		return res;
	}])
	/* lista de servicios venta */

	.factory('IndexDbOpcionesAplicacionUsuario', ['$indexedDB', '$q', function ($indexedDB, $q) {
		var res = async function (idUsuario) {
			try {
				let appOptions, userAppOptions, delay;

				return $indexedDB.openStore('sys_usuario_aplicacion_opcion', async (storeUserAppOptions) => {
					userAppOptions = await storeUserAppOptions.getAll();
					return $indexedDB.openStore('sys_opcion_aplicacion', async (storeOptions) => {
						// build query				
						try {
							/*  StoreAppOptions = await storeOptions.getAll(); */
							appOptions = userAppOptions.filter((x) => x.id_usuario_aplicacion == idUsuario);
							for (const appOption of appOptions) {
								foundOption = await storeOptions.find(appOption.id_opcion_aplicacion)
								if (foundOption) {
									appOption.opcion = foundOption;
								}

							}
							delay = $q.defer();
							delay.resolve({ opciones: appOptions });
							return delay.promise;

						} catch (error) {
							console.error(error)
						}
					});
				});

			} catch (error) {
				console.error(error)
			}

		};
		return res;
	}])

	.factory('IndexDbSaveOpcionesAplicacionUsuario', ['$indexedDB', '$q', function ($indexedDB, $q) {
		var res = function (appOptionsRecord, id_usuario) {
			try {
				let userAppOptions, appOptions, foundOptions;
				const saveUserOptionsRecord = (storeUserAppOptions, appOptionRecord) => {
					storeUserAppOptions.insert({
						'id': appOptionRecord.id,
						'id_usuario_aplicacion': appOptionRecord.id_usuario_aplicacion,
						'id_opcion_aplicacion': appOptionRecord.id_opcion_aplicacion,
						'puede_ver': appOptionRecord.puede_ver,
						'puede_crear': appOptionRecord.puede_crear,
						'puede_modificar': appOptionRecord.puede_modificar,
						'puede_eliminar': appOptionRecord.puede_eliminar,
						'createdAt': appOptionRecord.createdAt,
						'updatedAt': appOptionRecord.updatedAt
					}).then(function (data) {
						saveOpcionAplicacion(appOptionRecord.opcion);
					}).catch(function (err) {
						console.log(`error al crear registro: ${err}`)
					})
				}
				const saveOpcionAplicacion = (optionRecord) => {
					$indexedDB.openStore('sys_opcion_aplicacion', (storeOptions) => {
						storeOptions.find(optionRecord.id).then((foundOption) => {
							storeOptions.upsert({
								'id': optionRecord.id,
								'id_aplicacion': optionRecord.id_aplicacion,
								'nombre': optionRecord.nombre,
								'createdAt': optionRecord.createdAt,
								'updatedAt': optionRecord.updatedAt
							}).then(function (data) {
								console.log(`registro creado ${data}`)
							}).catch(function (err) {
								console.log(`error al crear registro: ${err}`)
							})
						}).catch((error) => {
							storeOptions.insert({
								'id': optionRecord.id,
								'id_aplicacion': optionRecord.id_aplicacion,
								'nombre': optionRecord.nombre,
								'createdAt': optionRecord.createdAt,
								'updatedAt': optionRecord.updatedAt
							}).then(function (data) {
								console.log(`registro creado ${data}`)
							}).catch(function (err) {
								console.log(`error al crear registro: ${err}`)
							})
						});
					});
				}
				$indexedDB.openStore('sys_usuario_aplicacion_opcion', async (storeUserAppOptions) => {
					// build query				
					userAppOptions = await storeUserAppOptions.getAll();
					appOptions = userAppOptions.find((x) => x.id_usuario == id_usuario);
					if (appOptions) {
						for (const appOptionRecord of appOptionsRecord.opciones) {
							foundOptions = userAppOptions.find((x) => x.id == appOptionRecord.id);
							if (foundOptions) {
								storeUserAppOptions.upsert({
									'id': appOptionRecord.id,
									'id_usuario_aplicacion': appOptionRecord.id_usuario_aplicacion,
									'id_opcion_aplicacion': appOptionRecord.id_opcion_aplicacion,
									'puede_ver': appOptionRecord.puede_ver,
									'puede_crear': appOptionRecord.puede_crear,
									'puede_modificar': appOptionRecord.puede_modificar,
									'puede_eliminar': appOptionRecord.puede_eliminar,
									'createdAt': appOptionRecord.createdAt,
									'updatedAt': appOptionRecord.updatedAt
								}).then(function (data) {
									saveOpcionAplicacion(appOptionRecord.opcion);
								}).catch(function (err) {
									console.log(`error al crear registro: ${err}`)
								})
							} else {
								saveUserOptionsRecord(storeUserAppOptions, appOptionRecord);
							}
						}

					} else {
						for (const appOptionRecord of appOptionsRecord.opciones) {
							saveUserOptionsRecord(storeUserAppOptions, appOptionRecord);
						}
					}


				});

			} catch (error) {
				console.error(error)
			}
		}
		return res;
	}])
