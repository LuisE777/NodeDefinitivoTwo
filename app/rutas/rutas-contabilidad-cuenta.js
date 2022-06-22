module.exports = function (router, ContabilidadCuenta, ClasificacionCuenta, Tipo, Clase, Usuario, Diccionario, ClienteCuenta, ProveedorCuenta, ConfiguracionCuenta, sequelize, Cliente, Proveedor, MedicoPaciente, Persona, ContabilidadConfiguracionGeneralTipoCuenta, ensureAuthorizedlogged, ContabilidadCuentaGrupo, AsientoContabilidad,ContabilidadCuentaCampo) {

	router.route('/contabilidad-cuentas/empresa/:id_empresa')
		.get(ensureAuthorizedlogged, function (req, res) {
			ContabilidadCuenta.findAll({
				where: {
					id_empresa: req.params.id_empresa,
					eliminado: false
				},
				include: [{ model: Clase, as: 'tipoCuenta' }, { model: Clase, as: 'claseCalculo' }, { model: ClasificacionCuenta, as: 'clasificacion', include: [{ model: Clase, as: 'saldo' }, { model: Clase, as: 'movimiento' }] }],

			}).then(function (ListaCuenta) {
				res.json(ListaCuenta)
			})

		})
	router.route('/contabilidad-configuracion-general-tipos-cuentas/empresa/:id_empresa')
		.post(ensureAuthorizedlogged, function (req, res) {
			req.body.forEach(function (dato, index, array) {
				if (dato.id) {
					ContabilidadConfiguracionGeneralTipoCuenta.update({
						id_tipo_cuenta: dato.tipoCuenta.id,
						digitos: dato.digitos,
						usar_en_comprobante: dato.usar_en_comprobante
					}, {
						where: { id: dato.id }
					}).then(function (actualizado) {
						if (index === (array.length - 1)) {
							res.json({ mensaje: "Guardado satisfactoriamente!" })
						}
					})
				} else {
					ContabilidadConfiguracionGeneralTipoCuenta.create({
						id_tipo_cuenta: dato.tipoCuenta.id,
						digitos: dato.digitos,
						id_empresa: req.params.id_empresa,
						usar_en_comprobante: dato.usar_en_comprobante
					}).then(function (creado) {
						if (index === (array.length - 1)) {
							res.json({ mensaje: "Guardado satisfactoriamente!" })
						}
					})
				}
			})
		})
		.get(ensureAuthorizedlogged, function (req, res) {
			ContabilidadConfiguracionGeneralTipoCuenta.findAll({
				where: {
					id_empresa: req.params.id_empresa,
				},
				include: [{ model: Clase, as: 'tipoCuenta' }]
			}).then(function (ListaCuenta) {
				res.json(ListaCuenta)
			})

		})
	router.route('/validar-codigo/empresa/:id_empresa')
		.post(ensureAuthorizedlogged, function (req, res) {
			ContabilidadCuenta.find({
				where: {
					id_empresa: req.params.id_empresa,
					codigo: req.body.codigo,
					eliminado: false
				}
			}).then(function (entidad) {
				if (entidad) {
					res.json({
						type: true,
						message: "¡el codigo ya Exsiste!"
					});
				} else {
					res.json({
						type: false,
						message: "Codigo Disponible"
					});
				}
			});
		});
	router.route('/contabilidad-cuentas/asignar-cuenta-cliente')
		.post(ensureAuthorizedlogged, function (req, res) {
			ClienteCuenta.create({
				id_cuenta: req.body.cuenta.id,
				id_cliente: req.body.id_cliente
			}).then(function (clienteCuentaActualizado) {
				res.json({ cliente: clienteCuentaActualizado, menssage: "cuenta asignada satisfactoriamente" })
			})

		})
	router.route('/contabilidad-cuentas/asignar-cuenta-proveedor')
		.post(ensureAuthorizedlogged, function (req, res) {
			if (req.body.id) {
				ProveedorCuenta.update({
					id_cuenta: req.body.cuenta.id,
					id_tipo: req.body.id_tipo
				}, { where: { id: req.body.id } }).then(function (proveedorCuentaActualizado) {
					res.json({ proveedor: proveedorCuentaActualizado, menssage: "cuenta actualizada satisfactoriamente" })
				})
			} else {
				ProveedorCuenta.create({
					id_cuenta: req.body.cuenta.id,
					id_proveedor: req.body.id_proveedor,
					id_tipo: req.body.id_tipo
				}).then(function (proveedorCuentaActualizado) {
					res.json({ proveedor: proveedorCuentaActualizado, menssage: "cuenta asignada satisfactoriamente" })
				})
			}
		})
	router.route('/configuracion-cuentas/:id_empresa')
		.get(ensureAuthorizedlogged, function (req, res) {
			ConfiguracionCuenta.findAll({
				where: {
					id_empresa: req.params.id_empresa,
				}, include: [{ model: Clase, as: 'concepto', include: [{ model: Clase, as: 'padre' }] }, { model: ContabilidadCuenta, as: 'cuenta' }, { model: Tipo, as: 'tipo' }],
				order: [['id', 'asc']]
			}).then(function (ListaConfiguracionCuenta) {
				res.json({ lista: ListaConfiguracionCuenta, menssage: "plantilla actualizada satisfactoriamente!" })
			})
		})
	router.route('/configuracion-cuentas/empresa/:id_empresa')
		.get(ensureAuthorizedlogged, async function (req, res) {
			try {
				const tipoConfPlanilla = await Tipo.find({
					where: {
						nombre_corto: "COF_PL_PC"
					},
					include: [{ model: Clase, as: 'clases', include: [{ model: Clase, as: 'hijos' }] }]
				})

				const movEgre = await Tipo.find({
					where: {
						nombre_corto: Diccionario.MOV_EGRE
					}
				})

				const movIng = await Tipo.find({
					where: {
						nombre_corto: Diccionario.MOV_ING
					}
				})
				for (const clase of tipoConfPlanilla.clases) {
					for (const hijo of clase.hijos) {
						if (clase.nombre_corto == "EGRESOS") {
							await ConfiguracionCuenta.findOrCreate({
								where: {
									id_empresa: req.params.id_empresa,
									nombre: hijo.nombre,
									id_tipo: movEgre.id,
									id_concepto: hijo.id,
									id_configuracion: clase.id,
								}, defaults: {
									id_concepto: hijo.id,
									id_configuracion: clase.id,
									id_empresa: req.params.id_empresa, id_tipo: movEgre.id, nombre: hijo.nombre
								}

							})
						} else {
							await ConfiguracionCuenta.findOrCreate({
								where: {
									id_empresa: req.params.id_empresa,
									nombre: hijo.nombre,
									id_tipo: movIng.id,
									id_concepto: hijo.id,
									id_configuracion: clase.id,
								}, defaults: {
									id_concepto: hijo.id,
									id_configuracion: clase.id,
									id_empresa: req.params.id_empresa, id_tipo: movIng.id, nombre: hijo.nombre
								}

							})
						}
					}
				}
				const ListaConfiguracionCuenta = await ConfiguracionCuenta.findAll({
					where: {
						id_empresa: req.params.id_empresa,

					}, include: [{ model: ContabilidadCuenta, as: 'cuenta' }, { model: Clase, as: 'concepto' }, { model: Clase, as: 'configuracion' }, { model: Tipo, as: 'tipo' }], order: [['id', 'asc']]
				})
				res.json({ lista: ListaConfiguracionCuenta, menssage: "plantilla actualizada satisfactoriamente!" })



			} catch (error) {
				res.json({ mensaje: error, hasErr: true })
			}
		})
		.put(ensureAuthorizedlogged, async function (req, res) {
			try {
				for (const conf of req.body) {
					await ConfiguracionCuenta.update({
						id_cuenta: conf.cuenta ? conf.cuenta.id : null,
						valor: conf.valor,
					}, {
						where: {
							id: conf.id
						}
					})
				}
				res.json({ menssage: "Actualizado Sadisfactoriamente!" })
			} catch (error) {
				res.json({ menssage: error, hasErr: true })
			}
		})
	router.route('/contabilidad-cuenta/:id')
		.put(ensureAuthorizedlogged, function (req, res) {
			if (req.body.eliminado == true) {

				AsientoContabilidad.count({
					where: {
						id_cuenta: req.body.id,
						eliminado: false
					}
				}).then(function (catidadAsientos) {
					if (catidadAsientos > 0) {
						res.json({ mensaje: "la Cuenta ya tiene asientos contables!", hasError: true });
					} else {
						ContabilidadCuenta.update({
							eliminado: true
						}, {
							where: {
								id: req.body.id
							}
						}).then(function (ContabilidadCuentaActualizada) {
							res.json({ mensaje: "Eliminado satisfactoriamente!", hasError: false });
						})

					}

				})



			} else {
				var idTipoAux = null, id_texto1 = null, id_texto2 = null, id_texto3 = null
				if (req.body.tipoAuxiliar) {
					idTipoAux = req.body.tipoAuxiliar.id
				}
				if (req.body.especifica_texto1) {
					id_texto1 = req.body.especifica_texto1.id
				}
				if (req.body.especifica_texto2) {
					id_texto2 = req.body.especifica_texto2.id
				}
				if (req.body.especifica_texto3) {
					id_texto3 = req.body.especifica_texto3.id
				}
				ContabilidadConfiguracionGeneralTipoCuenta.findAll({
					where: {
						id_empresa: req.body.id_empresa,
					},
					include: [{ model: Clase, as: 'tipoCuenta' }]
				}).then(function (configTipoCuenta) {
					var tipoConfiguracion = configTipoCuenta.find(function (dato) {
						return dato.id_tipo_cuenta === req.body.tipoCuenta.id
					})
					sequelize.transaction(function (t) {
						if (req.body.tipoCuenta.nombre_corto == 1) {
							var codigoCuentaPadre = null
							return ActualizarCuenta(idTipoAux, req, res, t,
								id_texto1,
								id_texto2,
								id_texto3, null)
						} else {
							var codigoCuentaPadre = obtenercodigoCuentaPadre(req.body.codigo, req.body.tipoCuenta, tipoConfiguracion, req.body.usar_ceros_delante, configTipoCuenta);
							return ContabilidadCuenta.find({
								where: {
									$or: [{ codigo: codigoCuentaPadre }],
									id_empresa: req.body.id_empresa
								},
								transaction: t
							}).then(function (cuentaPadreEncontrada) {
								if (cuentaPadreEncontrada) {
									return ActualizarCuenta(idTipoAux, req, res, t,
										id_texto1,
										id_texto2,
										id_texto3, cuentaPadreEncontrada.id)
								} else {
									return ActualizarCuenta(idTipoAux, req, res, t,
										id_texto1,
										id_texto2,
										id_texto3, null)
								}

							})
						}

					}).then(function (result) {
						res.json({ mensaje: "¡Cuenta creada satisfactoriamente!" });

					}).catch(function (err) {
						res.json({ hasError: true, mensaje: err.stack ? err.stack : err });
					});
				})

			}
		})
	router.route('/contabilidad-cuenta/:id/empresa/:id_empresa')
		.get(ensureAuthorizedlogged, function (req, res) {
			ContabilidadCuenta.find({
				where: { id: req.params.id, empresa: req.params.id_empresa }
			})
				.then(function (cuenta) {
					res.json(cuenta)
				})
				.catch((err) => {
					res.json({ message: "Error al recuperar la cuenta" })
				})
		})
	async function ActualizarCuenta(idTipoAux, req, res, t,
		id_texto1,
		id_texto2,
		id_texto3, idPadre) {
		try {
			await ContabilidadCuenta.update({
				id_tipo_personal: req.body.tipoPersonal ? req.body.tipoPersonal.id : null,
				id_empresa: req.body.id_empresa,
				codigo: req.body.codigo,
				nombre: req.body.nombre,
				descripcion: req.body.descripcion,
				debe: req.body.debe,
				haber: req.body.haber,
				saldo: req.body.saldo,
				id_clasificacion: (req.body.clasificacion ? req.body.clasificacion.id : null),
				id_tipo_cuenta: (req.body.tipoCuenta ? req.body.tipoCuenta.id : null),
				bimonetaria: req.body.bimonetaria,
				aplicar_calculo: req.body.aplicar_calculo,
				monto: req.body.monto,
				eliminado: req.body.eliminado,
				id_tipo_auxiliar: idTipoAux,
				especifica: req.body.especifica,
				id_especifica_texto1: id_texto1,
				id_especifica_texto2: id_texto2,
				id_especifica_texto3: id_texto3,
				tipo_especifica: req.body.tipo_especifica,
				vincular_cuenta: req.body.vincular_cuenta,
				cuenta_activo: req.body.cuenta_activo,
				estado_resultado: req.body.estado_resultado,
				id_cuenta_padre: req.body.cuentaPadre ? req.body.cuentaPadre.id : idPadre,
				no_monetaria: req.body.no_monetaria,
				libro_de_compra: req.body.libro_de_compra,
				id_almacen_lc: req.body.id_almacen_lc ? req.body.id_almacen_lc : null,
				cuenta_vinculada_lc: req.body.cuenta_vinculada_lc,
				resultado_acumulado: req.body.resultado_acumulado,
				id_cuenta_depreciacion: req.body.id_cuenta_depreciacion,
				patrimonial: req.body.patrimonial,
				//id_grupo: grupo
			}, {
				where: {
					id: req.body.id
				}, transaction: t
			})
			if(req.body.campos){
				await ContabilidadCuentaCampo.destroy({
					where: { id_cuenta: req.body.id }, transaction: t
				})
				let campos = []
				for (const campo of req.body.campos) {
					let encontrado = await ContabilidadCuentaCampo.find({
						where: { id_campo: campo.id }, transaction: t
					})
					if (!encontrado) campos.push(campo.id)
				}

				if (campos.length > 0) {
					for (const campo of campos) {

						await ContabilidadCuentaCampo.create({
							id_cuenta: req.body.id,
							id_campo: campo
						}, { transaction: t })
					}
				}
			}
			if(req.body.campos.length>0){
				await ContabilidadCuentaCampo.destroy({
					where: { id_cuenta: req.body.id }, transaction: t
				})
				for (const campo of req.body.campos) {
					await ContabilidadCuentaCampo.create({
						id_cuenta:req.body.id,
						id_campo:campo.id
					},{
						 transaction: t
					})
				}
			}
			if (req.body.grupos.length > 0) {
				await ContabilidadCuentaGrupo.destroy({
					where: { id_cuenta: req.body.id }, transaction: t
				})
				let grupos = []
			/* 	for (const grupo of req.body.grupos) {
					let encontrado = await ContabilidadCuentaGrupo.find({
						where: { id_grupo: grupo.id }, transaction: t
					})
					if (!encontrado){ grupos.push(grupo.id)}else if(req.body.campos.length>0){
						grupos.push(grupo.id)
					}
				}

				if (grupos.length > 0) { */
					for (const grupo of req.body.grupos) {

						await ContabilidadCuentaGrupo.create({
							id_cuenta: req.body.id,
							id_grupo: grupo.id
						}, { transaction: t })
					}
				/* } */
			}
			if (req.body.cuentaC != null) {
				return ClienteCuenta.findOrCreate({
					where: { id_cuenta: req.body.id },
					defaults: {
						id_cuenta: req.body.id,
						id_cliente: req.body.cuentaC.cliente.id
					}, transaction: t,
					lock: t.LOCK.UPDATE
				}).spread(function (ficha, created) {
					if (!created) {
						return ClienteCuenta.update({
							id_cliente: req.body.cuentaC.cliente.id
						}, {
							where: { id_cuenta: req.body.cuentaC.id }, transaction: t
						}).then(function (actualizado) {
							return guardarCuentaespecificas(req, res, Clase)
						}).catch(function (err) {
							return new Promise(function (fulfill, reject) {
								reject((err.stack !== undefined) ? err.stack : err);
							});
						})
					} else {
						return guardarCuentaespecificas(req, res, Clase)
					}
				}).catch(function (err) {
					return new Promise(function (fulfill, reject) {
						reject((err.stack !== undefined) ? err.stack : err);
					});
				})
			} else if (req.body.cuentaP != null) {
				return ProveedorCuenta.findOrCreate({
					where: { id_cuenta: req.body.id },
					defaults: {
						id_cuenta: req.body.id,
						id_proveedor: req.body.cuentaP.proveedor.id,
						id_tipo: req.body.cuentaP.tipo.id
					}, transaction: t,
					lock: t.LOCK.UPDATE
				}).spread(function (ficha, created) {
					if (!created) {
						ProveedorCuenta.update({
							id_proveedor: req.body.cuentaP.proveedor.id,
							id_tipo: req.body.cuentaP.tipo.id
						}, {
							where: { id_cuenta: req.body.cuentaP.id }, transaction: t
						}).then(function (actualizado) {
							return guardarCuentaespecificas(req, res, Clase)
						}).catch(function (err) {
							return new Promise(function (fulfill, reject) {
								reject((err.stack !== undefined) ? err.stack : err);
							});
						})
					} else {
						return guardarCuentaespecificas(req, res, Clase)
					}
				}).catch(function (err) {
					return new Promise(function (fulfill, reject) {
						reject((err.stack !== undefined) ? err.stack : err);
					});
				})
			} else {
				return guardarCuentaespecificas(req, res, Clase)
			}


		} catch (error) {
			console.log(error)
		}
	}
	router.route('/contabilidad-cuenta')
		.post(ensureAuthorizedlogged, function (req, res) {
			sequelize.transaction(function (t) {
				var idTipoAux = null, id_texto1 = null, id_texto2 = null, id_texto3 = null
				if (req.body.tipoAuxiliar) {
					idTipoAux = req.body.tipoAuxiliar.id
				}
				if (req.body.especifica_texto1) {
					id_texto1 = req.body.especifica_texto1.id
				}
				if (req.body.especifica_texto2) {
					id_texto2 = req.body.especifica_texto2.id
				}
				if (req.body.especifica_texto3) {
					id_texto3 = req.body.especifica_texto3.id
				}

				return ContabilidadConfiguracionGeneralTipoCuenta.findAll({
					where: {
						id_empresa: req.body.id_empresa,
					},
					include: [{ model: Clase, as: 'tipoCuenta' }]
				}).then(function (configTipoCuenta) {
					var tipoConfiguracion = configTipoCuenta.find(function (dato) {
						return dato.id_tipo_cuenta === req.body.tipoCuenta.id
					})

					if (req.body.tipoCuenta.nombre_corto == 1) {
						return crearContabilidadCuenta(req, res, tipoConfiguracion, idTipoAux,
							id_texto1,
							id_texto2,
							id_texto3, null, t)
					} else {
						var codigoCuentaPadre = obtenercodigoCuentaPadre(req.body.codigo, req.body.tipoCuenta, tipoConfiguracion, req.body.usar_ceros_delante, configTipoCuenta);
						return ContabilidadCuenta.find({
							where: { id_empresa: req.body.id_empresa, codigo: codigoCuentaPadre }, transaction: t
						}).then(function (cuentaEncontrada) {
							return crearContabilidadCuenta(req, res, tipoConfiguracion, idTipoAux,
								id_texto1,
								id_texto2,
								id_texto3, cuentaEncontrada.id, t)
						}).catch(function (err) {
							return new Promise(function (fulfill, reject) {
								reject((err.stack !== undefined) ? err.stack : err);
							});
						})
					}
				}).catch(function (err) {
					return new Promise(function (fulfill, reject) {
						reject((err.stack !== undefined) ? err.stack : err);
					});
				})
			}).then(function (result) {
				res.json({ mensaje: "¡Cuenta creada satisfactoriamente!" });

			}).catch(function (err) {
				res.json({ hasError: true, mensaje: err.stack ? err.stack : err });
			});
		})
	async function verificarGrupo(req, res, t) {
		let idsGrupos = []
		for (const grupo of req.body.grupos) {
			let encontrado = await ContabilidadCuentaGrupo.find({
				where: { id_grupo: grupo.id }, transaction: t
			})
			if (!encontrado) idsGrupos.push(grupo.id)
		}

		return idsGrupos

	}
	async function crearContabilidadCuenta(req, res, tipoConfiguracion, idTipoAux,
		id_texto1,
		id_texto2,
		id_texto3, idPadre, t) {
		try {
			let cuentaCreada = await ContabilidadCuenta.create({
				id_empresa: req.body.id_empresa,
				id_tipo_personal: req.body.tipoPersonal ? req.body.tipoPersonal.id : null,
				codigo: req.body.codigo,
				nombre: req.body.nombre,
				descripcion: req.body.descripcion ? req.body.descripcion : null,
				debe: req.body.debe,
				haber: req.body.haber,
				saldo: req.body.saldo,
				id_clasificacion: req.body.clasificacion.id,
				id_tipo_cuenta: req.body.tipoCuenta.id,
				bimonetaria: req.body.bimonetaria,
				aplicar_calculo: req.body.aplicar_calculo,
				monto: req.body.monto,
				id_calculo: (req.body.claseCalculo ? req.body.claseCalculo.id : null),
				eliminado: req.body.eliminado,
				id_tipo_auxiliar: idTipoAux,
				especifica: req.body.especifica,
				id_especifica_texto1: id_texto1,
				id_especifica_texto2: id_texto2,
				id_especifica_texto3: id_texto3,
				tipo_especifica: req.body.tipo_especifica,
				vincular_cuenta: req.body.vincular_cuenta,
				cuenta_activo: req.body.cuenta_activo,
				estado_resultado: req.body.estado_resultado,
				id_cuenta_padre: req.body.cuentaPadre ? req.body.cuentaPadre.id : idPadre,
				no_monetaria: req.body.no_monetaria,
				resultado_acumulado: req.body.resultado_acumulado,
				libro_de_compra: req.body.libro_de_compra,
				id_almacen_lc: req.body.id_almacen_lc ? req.body.id_almacen_lc : null,
				cuenta_vinculada_lc: req.body.cuenta_vinculada_lc,
				id_cuenta_depreciacion: req.body.id_cuenta_depreciacion,
				patrimonial: req.body.patrimonial,
				//id_grupo: grupo
			}, {
				transaction: t
			})
			if(req.body.campos.length>0){
				await ContabilidadCuentaCampo.destroy({
					where: { id_cuenta: req.body.id }, transaction: t
				})
				for (const campo of req.body.campos) {
					await ContabilidadCuentaCampo.destroy({
						id_cuenta:req.body.id,
						id_campo:campo.id
					},{
						 transaction: t
					})
				}
			}
			if (req.body.grupos.length > 0) {
				await ContabilidadCuentaGrupo.destroy({
					where: { id_cuenta: cuentaCreada.id }
				})
				let grupos = []
				for (const grupo of req.body.grupos) {
					let encontrado = await ContabilidadCuentaGrupo.find({
						where: { id_grupo: grupo.id }, transaction: t
					})
					if (!encontrado){ grupos.push(grupo.id)}else if(req.body.campos.length>0){
						grupos.push(grupo.id)
					}
				}
				if (grupos.length > 0) {
					for (const grupo of grupos) {

						await ContabilidadCuentaGrupo.create({
							id_cuenta: cuentaCreada.id,
							id_grupo: grupo
						})
					}
				}
			}
			if (req.body.cliente != null) {
				return ClienteCuenta.create({
					id_cuenta: cuentaCreada.id,
					id_cliente: req.body.cuentaC.cliente.id
				}, {
					transaction: t
				}).then(function (CuentaClienteCreado) {
					return guardarCuentaespecificas(req, res, Clase, t)
				}).catch(function (err) {
					return new Promise(function (fulfill, reject) {
						reject((err.stack !== undefined) ? err.stack : err);
					});
				})
			} else if (req.body.proveedor != null) {
				return ProveedorCuenta.create({
					id_cuenta: cuentaCreada.id,
					id_proveedor: req.body.cuentaP.proveedor.id,
					id_tipo: req.body.cuentaP.tipoCuenta.id
				}, {
					transaction: t
				})
					.then(function (CuentaClienteCreado) {
						return guardarCuentaespecificas(req, res, Clase, t)
					}).catch(function (err) {
						return new Promise(function (fulfill, reject) {
							reject((err.stack !== undefined) ? err.stack : err);
						});
					})
			} else {
				return guardarCuentaespecificas(req, res, Clase, t)
			}



		} catch (error) {

		}
	}
	function guardarCuentaespecificas(req, res, Clase, t) {
		if (req.body.especifica) {
			var a = 1
			return Clase.update({
				nombre_corto: req.body.especifica_texto1.nombre_corto
			}, {
				where: { id: req.body.especifica_texto1.id }, transaction: t
			}).then(function (creado) {
				return Clase.update({
					nombre_corto: req.body.especifica_texto2.nombre_corto
				}, {
					where: { id: req.body.especifica_texto2.id }, transaction: t
				}).then(function (creado) {
					return Clase.update({
						nombre_corto: req.body.especifica_texto3.nombre_corto
					}, {
						where: { id: req.body.especifica_texto3.id }, transaction: t
					}).then(function (params) {
						return new Promise(function (fulfill, reject) {
							fulfill();
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
			})
		} else {
			return new Promise(function (fulfill, reject) {
				fulfill();
			});
		}
	}
	router.route('/contabilidad-cuentas/clasificaciones')
		.get(ensureAuthorizedlogged, function (req, res) {
			ClasificacionCuenta.findAll({
				// where: {id_empresa: req.params.id_empresa},
				include: [{ model: Clase, as: 'saldo' }, { model: Clase, as: 'movimiento' }],

			}).then(function (clasificacionesCuenta) {
				Clase.findAll({
					where: [{
						nombre_corto: {
							$like: "%" + "CONTCLS" + "%"
						}
					}],
				}).then(function (listaClasificaiones) {
					res.json({ clasificaciones: clasificacionesCuenta });
				})
			});
		})
	router.route('/contabilidad-cuentas/clasificaciones/id/:id_empresa')
		.get(ensureAuthorizedlogged, function (req, res) {
			ClasificacionCuenta.findAll({
				where: { id_empresa: req.params.id_empresa },
				include: [{ model: Clase, as: 'tipoClasificacion' }, { model: Clase, as: 'saldo' }, { model: Clase, as: 'movimiento' }],

			}).then(function (clasificacionesCuenta) {
				Clase.findAll({
					where: [{
						nombre_corto: {
							$like: "%" + "CONTCLS" + "%"
						}
					}],
				}).then(function (listaClasificaiones) {
					res.json({ clasificaciones: clasificacionesCuenta });
				})
			});
		})
	router.route('/contabilidad-cuentas/clasificaciones')
		.post(ensureAuthorizedlogged, function (req, res) {
			ClasificacionCuenta.create({
				id_empresa: req.body.id_empresa,
				nombre: req.body.nombre,
				id_saldo: req.body.saldo.id,
				id_movimiento: req.body.movimiento.id,
				id_tipo: req.body.tipoClasificacion.id
			}).then(function (clasificionCuenta) {
				res.json({ mensaje: "Cotización creada sadisfactoriamente..." })
			});
		})

	router.route('/contabilidad-cuentas/clasificaciones/edicion/id/:id_empresa')
		.put(ensureAuthorizedlogged, function (req, res) {
			req.body.forEach(function (clasificacion, index, array) {
				if (!clasificacion.eliminado) {
					if (clasificacion.id) {
						ClasificacionCuenta.update({
							nombre: clasificacion.nombre,
							id_saldo: (clasificacion.saldo ? clasificacion.saldo.id : null),
							id_movimiento: (clasificacion.movimiento ? clasificacion.movimiento.id : null),
							id_tipo: (clasificacion.tipoClasificacion ? clasificacion.tipoClasificacion.id : null),
							usar_centro_costo:clasificacion.usar_centro_costo
						}, {
							where: {
								id: clasificacion.id
							}
						});
					} else {
						ClasificacionCuenta.create({
							id_empresa: req.params.id_empresa,
							nombre: clasificacion.nombre,
							id_saldo: (clasificacion.saldo ? clasificacion.saldo.id : null),
							id_movimiento: (clasificacion.movimiento ? clasificacion.movimiento.id : null),
							id_tipo: (clasificacion.tipoClasificacion ? clasificacion.tipoClasificacion.id : null),
							id_empresa: req.params.id_empresa
						});
					}
				} else {
					ClasificacionCuenta.destroy({
						where: {
							id: clasificacion.id
						}
					});
				}

				if (index == (array.length - 1)) {
					res.json({ mensaje: "Clasificaciones actualizadas satisfactoriamente!" })
				}

			});

		})

	router.route('/contabilidad-cuentas/clasificaciones/:id')
		.put(ensureAuthorizedlogged, function (req, res) {
			ClasificacionCuenta.update({
				id_empresa: req.body.id_empresa,
				nombre: req.body.nombre,
				descripcion: req.body.descripcion,
				numero_documento: req.body.numero_documento,
				fecha: req.body.fecha,
				importe: req.body.importe,
				id_usuario: req.body.id_usuario
			}, {
				where: {
					id: req.params.id
				}
			});
		})

	router.route('/contabilidad-cuentas/empresa/:id_empresa/clasificacion/:id_clasificacion/tipo/:id_tipo/monto/:monto/pagina/:pagina/items-pagina/:items_pagina/busqueda/:busqueda/columna/:columna/direccion/:direccion')
		.get(ensureAuthorizedlogged, async function (req, res) {
			try {

				let condicionCuenta = {}, ordenArreglo = [], paginas;
				if (req.params.columna == "clasificacion") {
					ordenArreglo.push({ model: ClasificacionCuenta, as: 'clasificacion' });
					req.params.columna = "nombre";
				} else if (req.params.columna == "tipoCuenta") {
					ordenArreglo.push({ model: Clase, as: 'tipoCuenta' });
					req.params.columna = "nombre";
				}
				ordenArreglo.push(req.params.columna);
				ordenArreglo.push(req.params.direccion);

				if (req.params.busqueda != 0) {
					condicionCuenta =
					{
						$or: [
							{
								nombre: {
									$like: "%" + req.params.busqueda + "%"
								}
							},
							{
								codigo: {
									$like: "%" + req.params.busqueda + "%"
								}
							}
						]
					}
				}

				condicionCuenta.id_empresa = parseInt(req.params.id_empresa);

				if (req.params.id_clasificacion != 0) {
					condicionCuenta.id_clasificacion = parseInt(req.params.id_clasificacion);
				}
				if (req.params.id_tipo != 0) {
					condicionCuenta.id_tipo_cuenta = parseInt(req.params.id_tipo);
				}
				if (req.params.monto != 0) {
					condicionCuenta =
					{
						$or: [
							{
								debe: parseFloat(req.params.monto)
							},
							{
								haber: parseFloat(req.params.monto)
							},
							{
								saldo: parseFloat(req.params.monto)
							}
						]
					}

				}
				let datosCuenta = {
					where: condicionCuenta,
					include: [{ model: ProveedorCuenta, as: 'cuentaP', include: [{ model: Proveedor, as: 'proveedor' }, { model: Clase, as: 'tipo' }] }, { model: ClienteCuenta, as: 'cuentaC', include: [{ model: Cliente, as: 'cliente' }] },
					{
						model: ClasificacionCuenta, as: "clasificacion",
						include: [{ model: Clase, as: 'saldo' }, { model: Clase, as: 'movimiento' }]
					},
					{
						model: Clase, as: 'tipoCuenta'
					},
					{
						model: Clase, as: 'claseCalculo'
					},
					{
						model: Clase, as: 'tipoAuxiliar'
					},
					{
						model: ContabilidadCuentaGrupo, as: 'gruposCuenta',
						include: [{ model: Clase, as: 'grupo' }]
					},
					{
						model: ContabilidadCuentaCampo, as: 'camposCuenta',
						include: [{ model: Clase, as: 'campo' }]
					},
					{
						model: ContabilidadCuenta, as: 'cuentaPadre',
					}
					],
					group: ["`agil_contabilidad_cuenta`.`id`"],
					order: [ordenArreglo]
				}
				condicionCuenta.eliminado = false
				if (req.params.items_pagina != 0) {
					datosCuenta.offset = (req.params.items_pagina * (req.params.pagina - 1));
					datosCuenta.limit = req.params.items_pagina;
				}
				let cuentas = await ContabilidadCuenta.findAndCountAll(datosCuenta)
				datosCuenta.attributes= [[sequelize.fn('sum', sequelize.col('`agil_contabilidad_cuenta`.`debe`')), 'debe'],'id_tipo_auxiliar',['calculo','id_calculo'],['tipo_personal','id_tipo_personal'],
				['clasificacion','id_clasificacion'],
				['tipo_cuenta','id_tipo_cuenta'],'codigo','nombre',['empresa','id_empresa']]
				datosCuenta.attributes.push([sequelize.fn('sum', sequelize.col('`agil_contabilidad_cuenta`.`haber`')), 'haber'])
				datosCuenta.attributes.push([sequelize.fn('sum', sequelize.col('`agil_contabilidad_cuenta`.`saldo`')), 'saldo'])
				delete datosCuenta.group;
				delete datosCuenta.include;
				//let cuentasTotal = await ContabilidadCuenta.findAll(datosCuenta)
				delete datosCuenta.offset;
				delete datosCuenta.limit;				
				let cuentasTotalGenera = await ContabilidadCuenta.findAll(datosCuenta)
				paginas = Math.ceil(cuentas.count.length / req.params.items_pagina)
				res.json({ cuentas: cuentas.rows, paginas: paginas,cuentasTotalGenera:cuentasTotalGenera[0] });


			} catch (error) {
				res.json({ hasError: true, message: error.stack ? error.stack : error });
			}
			/* ContabilidadCuenta.count({
				distinct: true,
				where: condicionCuenta,
				include: [{ model: ClasificacionCuenta, as: 'clasificacion' }],

			}).then(function (data) {
				var datosCuenta = {
					where: condicionCuenta,
					include: [{ model: ProveedorCuenta, as: 'cuentaP', include: [{ model: Proveedor, as: 'proveedor' }, { model: Clase, as: 'tipo' }] }, { model: ClienteCuenta, as: 'cuentaC', include: [{ model: Cliente, as: 'cliente' }] },
					{
						model: ClasificacionCuenta, as: "clasificacion",
						include: [{ model: Clase, as: 'saldo' }, { model: Clase, as: 'movimiento' }]
					},
					{
						model: Clase, as: 'tipoCuenta'
					},
					{
						model: Clase, as: 'claseCalculo'
					},
					{
						model: Clase, as: 'tipoAuxiliar'
					},
					{
						model: ContabilidadCuentaGrupo, as: 'gruposCuenta',
						include: [{ model: Clase, as: 'grupo' }]
					}

					],
					group: ["`agil_contabilidad_cuenta`.`id`"],
					order: [ordenArreglo]
				}

				if (req.params.items_pagina != 0) {
					paginas = Math.ceil(data / req.params.items_pagina);
					datosCuenta.offset = (req.params.items_pagina * (req.params.pagina - 1));
					datosCuenta.limit = req.params.items_pagina;
				} else {
					paginas = 1;
				}

				ContabilidadCuenta.findAll(
					datosCuenta
				).then(function (cuentas) {
					res.json({ cuentas: cuentas, paginas: paginas });
				});
			}) */
		});
	function obtenercodigoCuenta(codigo, tipo) {
		var nuevoString = "0"
		if (tipo == 2) {
			nuevoString = codigo.substring(0, 1);
		} else if (tipo == 3) {
			nuevoString = codigo.substring(0, 2);
		} else if (tipo == 4) {
			nuevoString = codigo.substring(0, 3);
		}

		return nuevoString;
	}
	function obtenercodigoCuentaPadre(codigo, tipoCuenta, tipoConfiguracion, usar_ceros_delante, configTipoCuenta) {
		if (usar_ceros_delante) {
			/* 	var totalDigitos = 0
				configTipoCuenta.forEach(function (dato) {
					totalDigitos += dato.digitos
				}) */
			nuevoString = codigo.slice(0, (-tipoConfiguracion.digitos));
			for (var i = 0; i < tipoConfiguracion.digitos; i++) {
				nuevoString += "0"
			}
			console.log(nuevoString)
		} else {
			/* var tipoConfiguracion2 = configTipoCuenta.find(function (dato) {
				return dato.id_tipo_cuenta === tipoCuenta.id
			}) */
			nuevoString = codigo.slice(0, (-tipoConfiguracion.digitos));
		}
		return nuevoString;
	}
	router.route('/cuentas/empresa')
		.post(ensureAuthorizedlogged, function (req, res) {
			var promises = []
			ContabilidadConfiguracionGeneralTipoCuenta.findAll({
				where: {
					id_empresa: req.body.id_empresa,
				},
				include: [{ model: Clase, as: 'tipoCuenta' }]
			}).then(function (configTipoCuenta) {

				sequelize.transaction(function (t) {
					req.body.cuentas.forEach(function (cuenta, index, array) {

						promises.push(ClasificacionCuenta.findOrCreate({
							where: { nombre: cuenta.clasificacion.nombre, id_empresa: req.body.id_empresa },
							defaults: { nombre: cuenta.clasificacion.nombre, id_empresa: req.body.id_empresa },
							transaction: t,
							lock: t.LOCK.UPDATE
						}).then(function (claficiacionEncontrada) {
							return Tipo.find({
								where: { nombre_corto: Diccionario.TIPOS_CUENTA_CONTABILIDAD, id_empresa: req.body.id_empresa },
								transaction: t
							}).then(function (TipoEncontrado) {
								return Clase.findOrCreate({
									where: { nombre: cuenta.tipoCuenta.nombre, id_tipo: TipoEncontrado.id },
									defaults: {
										nombre: cuenta.tipoCuenta.nombre,
										id_tipo: TipoEncontrado.id,
										habilitado: true,
										eliminado: false
									},
									transaction: t,
									lock: t.LOCK.UPDATE
								}).then(function (claseEncontrada) {
									var tipoConfiguracion = configTipoCuenta.find(function (dato) {
										return dato.id_tipo_cuenta === claseEncontrada[0].id
									})
									return ContabilidadCuenta.find({
										where: {
											$or: [{ codigo: cuenta.codigo }],
											id_empresa: req.body.id_empresa,
											eliminado: false
										},
										transaction: t
									}).then(function (cuentaEncontrada) {
										if (cuentaEncontrada) {
											return ContabilidadCuenta.update({
												id_empresa: req.body.id_empresa,
												codigo: cuenta.codigo,
												nombre: cuenta.nombre,
												descripcion: cuenta.descripcion,
												debe: cuenta.debe,
												haber: cuenta.haber,
												saldo: cuenta.saldo,
												id_clasificacion: claficiacionEncontrada[0].id,
												id_tipo_cuenta: claseEncontrada[0].id,
												bimonetaria: cuenta.bimonetaria,
												no_monetaria: cuenta.no_monetaria,
												eliminado: false,
												patrimonial: cuenta.patrimonial
											}, {
												where: {
													id: cuentaEncontrada.id
												},
												transaction: t
											}).then(function (cuentaActualizada) {
												var codigoCuentaPadre = obtenercodigoCuentaPadre(cuenta.codigo, claseEncontrada[0], tipoConfiguracion, req.body.usar_ceros_delante, configTipoCuenta);
												return ContabilidadCuenta.find({
													where: {
														$or: [{ codigo: codigoCuentaPadre }],
														id_empresa: req.body.id_empresa
													},
													transaction: t
												}).then(function (cuentaPadreEncontrada) {
													if (cuentaPadreEncontrada) {
														return ContabilidadCuenta.update({
															id_cuenta_padre: cuentaPadreEncontrada.id
														}, {
															where: {
																id: cuentaEncontrada.id
															},
															transaction: t
														});
													} else {
														return new Promise(function (fulfill, reject) {
															fulfill({});
														});
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
										} else {
											return ContabilidadCuenta.create({
												id_empresa: req.body.id_empresa,
												codigo: cuenta.codigo,
												nombre: cuenta.nombre,
												descripcion: cuenta.descripcion,
												debe: cuenta.debe,
												haber: cuenta.haber,
												saldo: cuenta.saldo,
												id_clasificacion: claficiacionEncontrada[0].id,
												id_tipo_cuenta: claseEncontrada[0].id,
												bimonetaria: cuenta.bimonetaria,
												no_monetaria: cuenta.no_monetaria,
												eliminado: false,
												patrimonial: cuenta.patrimonial

											}, { transaction: t }).then(function (cuentaCreada) {
												var codigoCuentaPadre = obtenercodigoCuentaPadre(cuentaCreada.codigo, claseEncontrada[0], tipoConfiguracion, req.body.usar_ceros_delante, configTipoCuenta);
												return ContabilidadCuenta.find({
													where: {
														$or: [{ codigo: codigoCuentaPadre }],
														id_empresa: req.body.id_empresa
													},
													transaction: t
												}).then(function (cuentaPadreEncontrada) {
													if (cuentaPadreEncontrada) {
														return ContabilidadCuenta.update({
															id_cuenta_padre: cuentaPadreEncontrada.id
														}, {
															where: {
																id: cuentaCreada.id
															},
															transaction: t
														}).catch(function (err) {
															return new Promise(function (fulfill, reject) {
																reject((err.stack !== undefined) ? err.stack : err);
															});
														});
													} else {
														return new Promise(function (fulfill, reject) {
															fulfill({});
														});
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
						}))

					});
					return Promise.all(promises)
				}).then(function (result) {
					res.json({ mensaje: "¡Cuentas creados satisfactoriamente!" });
				}).catch(function (err) {
					res.json({ hasError: true, message: err.stack });
				});
			})


		});

		router.route('/cuentas-clientes/index/empresa/:id_empresa')
		.get(ensureAuthorizedlogged, function (req, res) {			
				Cliente.findAll({
					where: {
						id_empresa: req.params.id_empresa
					}

				}).then(function (clientes) {
					res.json(clientes)
				});
		})
	router.route('/cuentas-auxiliares/empresa/:id_empresa/tipo/:tipo')
		.get(ensureAuthorizedlogged, function (req, res) {
			if (req.params.tipo == Diccionario.CUENTA_AUXILIAR_CLIENTE) {
				Cliente.findAll({
					where: {
						id_empresa: req.params.id_empresa
					}

				}).then(function (clientes) {
					res.json(clientes)
				});
			}
			if (req.params.tipo == Diccionario.CUENTA_AUXILIAR_PROVEEDOR) {
				Proveedor.findAll({
					where: {
						id_empresa: req.params.id_empresa,
						estado: "V"
					}
				}).then(function (proveedores) {
					res.json(proveedores)
				});
			}
			if (req.params.tipo == Diccionario.CUENTA_AUXILIAR_EMPLEADO) {
				MedicoPaciente.findAll({
					where: {
						id_empresa: req.params.id_empresa,
						es_empleado: true
					},
					include: [{ model: Persona, as: 'persona' }]
				}).then(function (empleados) {
					res.json(empleados)
				});
			}
		})

	router.route('/contabilidad-cuenta/global/empresa/:empresa/gestion/:gestion/mes/:mes/inicio/:inicio/fin/:fin')
		.get(ensureAuthorizedlogged, function (req, res) {
			if (req.params.mes != 0) {
				let mes = Number(req.params.mes);
				let dias = new Date(req.params.gestion, mes, 0).getDate();
				var fecha_inicio = req.params.gestion + "-" + mes + "-01 00:00:00"
				var fecha_fin = req.params.gestion + "-" + mes + "-" + dias + " 23:59:59";
			} else {
				let diaInicio = req.params.inicio.split("/")[0]
				let diafin = req.params.fin.split("/")[0]
				let mesinico = parseInt(req.params.inicio.split("/")[1])
				let mesfin = parseInt(req.params.fin.split("/")[1])
				var fecha_inicio = req.params.gestion + "-" + mesinico + "-" + diaInicio + " 00:00:00"
				var fecha_fin = req.params.gestion + "-" + mesfin + "-" + diafin + " 23:59:59"
			}
			var qr = 'SELECT DISTINCT asiento.id AS asientoID,comprobante.id AS comprobanteID,DATE_FORMAT(comprobante.fecha,"%d/%m/%Y") AS fecha,cuenta.codigo AS codigo,cuenta.nombre AS cuenta,CONCAT_WS("-",SUBSTRING(tipo.nombre,1,1),comprobante.numero) AS comp,asiento.glosa AS descripcion,asiento.debe_bs AS debeBs,asiento.haber_bs AS haberBs,clasificacion.nombre AS clasificacion,tipoSaldo.nombre_corto AS tipoSaldo,auxiliar.nombre AS auxiliar,tipo.nombre AS tipo FROM agil_asiento_contabilidad asiento INNER JOIN agil_contabilidad_cuenta cuenta ON cuenta.id=asiento.cuenta INNER JOIN agil_contabilidad_clasificacion_cuenta clasificacion ON clasificacion.id=cuenta.clasificacion INNER JOIN gl_clase tipoSaldo ON tipoSaldo.id=clasificacion.saldo INNER JOIN agil_comprobante_contabilidad comprobante ON comprobante.id=asiento.comprobante INNER JOIN gl_clase tipo ON tipo.id=comprobante.tipo LEFT JOIN agil_contabilidad_cuenta_auxiliar auxiliar ON auxiliar.asiento=asiento.id WHERE cuenta.empresa=' + req.params.empresa + ' AND comprobante.eliminado=FALSE AND asiento.eliminado=FALSE AND comprobante.fecha BETWEEN "' + fecha_inicio + '" AND "' + fecha_fin + '" GROUP BY asiento.id ORDER BY cuenta.codigo ASC, comprobante.fecha ASC'
			sequelize.query(qr, { type: sequelize.QueryTypes.SELECT })
				.then(data => {
					if (data.length > 0) {
						var regs = []
						saldoBs = 0;
						data.forEach((registro, i, arr) => {
							let datos = []
							let saldo = registro.tipoSaldo === "DEDE" ? registro.debeBs - registro.haberBs : registro.haberBs - registro.debeBs;
							saldoBs += saldo;
							if (i === 0) {
								regs.push([
									registro.fecha,
									registro.codigo,
									registro.cuenta.toUpperCase(),
									registro.comp,
									registro.descripcion,
									registro.debeBs,
									registro.haberBs,
									saldo,
									registro.clasificacion.toUpperCase(),
									registro.tipoSaldo === "DEDE" ? "DEUDOR" : "ACREEDOR",
									registro.tipo.toUpperCase(),
									registro.auxiliar ? registro.auxiliar.toUpperCase() : ""
								]);
							} else {
								let data = []
								datos.push(registro.fecha)
								datos.push(registro.codigo)
								datos.push(registro.cuenta.toUpperCase())
								datos.push(registro.comp)
								datos.push(registro.descripcion)
								datos.push(registro.debeBs)
								datos.push(registro.haberBs)
								if (registro.codigo != arr[i - 1].codigo) saldoBs = saldo
								datos.push(saldoBs)
								datos.push(registro.clasificacion.toUpperCase())
								datos.push(registro.tipoSaldo === "DEDE" ? "DEUDOR" : "ACREEDOR")
								datos.push(registro.tipo.toUpperCase())
								datos.push(registro.auxiliar ? registro.auxiliar.toUpperCase() : "")
								regs.push(datos);
							}
						})
						res.json({ hasError: false, message: 'Datos encontrados', cuentas: regs })
					} else {
						res.json({ hasError: true, message: 'No se encontraron registros en el periodo' })
					}
				})
				.catch(err => {
					res.json({ hasError: true, message: 'Error al recuperar los registros contables', err: err })
				})
		})
	
	router.route('/contabilidad-cuenta/buscar/:id_empresa/:id_clasificacion/:id_tipo/:texto')
		.get(ensureAuthorizedlogged, async(req, res) => {
			try {
				let { id_empresa, id_clasificacion, id_tipo, texto } = req.params
				if(!(id_empresa || texto) ) return res.json({ error: true, message: 'Parámetros incorrectos'})
				let condicion = { 
					id_empresa,
					$or: [
						{
							codigo: {
								$like: "%" + texto + "%"
							}
						},
						{
							nombre: {
								$like: "%" + texto + "%"
							}
						}
					],
					id_tipo_cuenta: id_tipo,
					id_clasificacion
				}
				let data = await ContabilidadCuenta.findAll({ 
					where: 	condicion
				})
				return res.json({ error: false, data })
			} catch (e) {
				return res.json({ error: true, message: 'Ocurrió un error'+e.menssage})
			}
		})

}
