module.exports = function (router, ComprobanteContabilidad, AsientoContabilidad, ContabilidadCuenta, ClasificacionCuenta, Sucursal, Clase, Usuario, Diccionario, Empresa, Persona, Compra, Venta, MonedaTipoCambio, NumeroLiteral, ContabilidadCuentaAuxiliar, Tipo, sequelize, ensureAuthorizedlogged, AsientoContabilidadCentroCosto,
	CierreCajaChica, Proveedor, ContabilidadConfiguracionGeneralTipoCuenta, Movimiento, Proforma, ProformaContabilidad, ProformaFacturaAnulada,
	RRHHPlanillaSueldos, RRHHPlanillaCargasSociales, RrhhAnticipo, RRHHDetallePlanillaSueldos, RRHHDetallePlanillaAguinaldos, AreaCostos, ComprobanteCentroCostos, SolicitudReposicion, MantenimientoOrdenTrabajo,
	RrhhEmpleadoDotacionRopa, CajaChica) {

	router.route('/comprobantes/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/fecha-inicio/:inicio/fecha-fin/:fin/columna/:columna/direccion/:direccion/monto/:monto/tipo-comprobante/:tipo_comprobante/sucursal/:sucursal/usuario/:usuario/numero/:numero/busqueda/:busqueda/gloza/:gloza')
		.get(ensureAuthorizedlogged, function (req, res) {
			var ordenArreglo = [];
			var condicionComprobante = {}
			if (req.params.columna == "sucursal") {
				ordenArreglo.push({ model: Sucursal, as: 'sucursal' });
				req.params.columna = "nombre";
			} else if (req.params.columna == "usaurio") {
				ordenArreglo.push({ model: Persona, as: 'persona' });
				req.params.columna = "nombres";
			} else if (req.params.columna == "comprobante") {
				ordenArreglo.push({ model: Clase, as: 'tipoComprobante' });
				req.params.columna = "nombre";
			}
			ordenArreglo.push(req.params.columna);
			ordenArreglo.push(req.params.direccion);
			var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0, 0);
			var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 0);
			condicionComprobante = {
				$or: [
					{
						fecha: {
							$between: [inicio, fin]
						}
					}
				]
			};
			var condicionSucursal = { id_empresa: req.params.id_empresa };
			if (req.params.numero != 0) {
				condicionComprobante.$or[0].numero = parseInt(req.params.numero);
			}
			if (req.params.busqueda != 0) {
				condicionComprobante = {
					$or: [
						{
							gloza: {
								$like: "%" + req.params.busqueda + "%"
							},

						}
					]
				};
			}
			if (req.params.gloza != 0) {
				condicionComprobante.$or[0].gloza = {
					$like: "%" + req.params.gloza + "%"
				};
			}
			if (req.params.tipo_comprobante != 0) {
				condicionComprobante.$or[0].id_tipo = parseInt(req.params.tipo_comprobante);
			}
			if (req.params.monto != 0) {
				condicionComprobante.$or[0].importe = parseFloat(req.params.monto);
			}
			if (req.params.sucursal != 0) {
				condicionSucursal = {
					id_empresa: req.params.id_empresa,
					id: req.params.sucursal,
					activo: true
				};
			}
			var condicionPersona = {}
			if (req.params.usuario != 0) {
				condicionPersona = {
					$or: [
						{
							nombre_completo: {
								$like: "%" + req.params.usuario + "%"
							}

						}
					]
				}
			}
			ComprobanteContabilidad.findAndCountAll({
				where: condicionComprobante,
				include: [
					{ model: Sucursal, as: 'sucursal', attributes: ['id', 'nombre'], where: condicionSucursal }],
			}).then(function (data) {
				if (req.params.items_pagina == "0") {
					ComprobanteContabilidad.findAll({

						where: condicionComprobante,
						include: [
							{ model: Clase, as: 'tipoComprobante', attributes: ['id', 'nombre'] },
							{ model: Usuario, as: 'usuario', include: [{ model: Persona, as: 'persona', attributes: ['id', 'nombre_completo', 'nombres'], where: condicionPersona }] },
							{
								model: Sucursal, as: 'sucursal', attributes: ['id', 'nombre'], where: condicionSucursal,
								
							}],
						order: [ordenArreglo]
					}).then(function (comprobantes) {
						res.json({ comprobantes: comprobantes });
					});
				} else {
					ComprobanteContabilidad.findAll({

						offset: (req.params.items_pagina * (req.params.pagina - 1)), limit: req.params.items_pagina,
						where: condicionComprobante,
						include: [
							{ model: Clase, as: 'tipoComprobante', attributes: ['id', 'nombre'] },
							{ model: Usuario, as: 'usuario', include: [{ model: Persona, as: 'persona', attributes: ['id', 'nombre_completo', 'nombres'], where: condicionPersona }] },
							{
								model: Sucursal, as: 'sucursal', attributes: ['id', 'nombre'], where: condicionSucursal,
								
							}],
						order: [ordenArreglo]
					}).then(function (comprobantes) {
						res.json({ comprobantes: comprobantes, paginas: Math.ceil(data.count / req.params.items_pagina) });
					});
				}
			});
		});
	router.route('/comprobante-contabilidad-edicion/compra/asiento/:id')
		.get(ensureAuthorizedlogged, function (req, res) {
			Compra.find({
				where: { id_asiento_contabilidad: req.params.id },
				include: [{ model: Proveedor, as: 'proveedor' }]
			}).then(function (CompraEncontrada) {
				res.json({ compra: CompraEncontrada });
			}).catch(function (err) {
				res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
			});
		})
	router.route('/comprobante-contabilidad-edicion/id/:id')
		.get(ensureAuthorizedlogged, function (req, res) {
			ComprobanteContabilidad.find({
				where: { id: req.params.id },
				include: [{ model: MonedaTipoCambio, as: 'tipoCambio' },
				{
					model: AsientoContabilidad, as: 'asientosContables',required:true,
					where: { eliminado: false },
					include: [{ model: Compra, as: 'lc_comp_compra' }, { model: AsientoContabilidadCentroCosto, as: 'centrosCostos' },
					{ model: ContabilidadCuentaAuxiliar, as: 'cuentaAux' },
					{
						model: ContabilidadCuenta, as: 'cuenta',
						include: [{ model: Clase, as: 'tipoAuxiliar' }]
					}]
				},
				{ model: Clase, as: 'tipoComprobante' },
				{ model: Usuario, as: 'usuario', include: [{ model: Persona, as: 'persona' }] },
				{
					model: Sucursal, as: 'sucursal',
					include: [{ model: Empresa, as: 'empresa' }]
				}]
			}).then(function (comprobante) {
				res.json({ comprobante: comprobante });
			}).catch(function (err) {
				res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
			});
		})
	router.route('/lista-asientos-contabilidad-comprobantes/empresa/:id_empresa/inicio/:inicio/fin/:fin')
		.get(ensureAuthorizedlogged, function (req, res) {
			sequelize.query("SELECT\
			DISTINCT `agil_asiento_contabilidad`.`id` AS id,\
			`agil_asiento_contabilidad`.`debe_bs` AS debe_bs,\
			`agil_asiento_contabilidad`.`haber_bs` AS haber_bs,\
			`agil_asiento_contabilidad`.`debe_sus` AS debe_sus,\
			`agil_asiento_contabilidad`.`haber_sus` AS haber_sus,\
			`agil_asiento_contabilidad`.`glosa`  AS gloza,\
			`cuenta`.`codigo` AS codigo_cuenta,\
			`cuenta`.`nombre` AS nombre_cuenta,\
			`comprobante`.`numero` AS `numero_comprobante`,\
			`comprobante`.`fecha` AS `fecha_comprobante`,\
			`comprobante`.`gloza` AS `gloza_comprobante`,\
			`comprobante`.`eliminado` AS `eliminado`,\
			`comprobante.tipoComprobante`.`nombre` AS `tipo_comprobante`,\
			`centro_costo`.`nombre` AS `nombre_centro_costos`,\
			`contabilidad_cuenta_auxiliar`.`nombre` AS `nombre_cuenta_auxiliar`,\
			`comprobante.sucursal`.`nombre` AS `nombre_sucursal`,\
			`centro_costo`.`nombre_corto` AS `numero_centro_costo`\
			 FROM\
				`agil_asiento_contabilidad` AS `agil_asiento_contabilidad`\
				LEFT OUTER JOIN `agil_contabilidad_cuenta` AS `cuenta` ON `agil_asiento_contabilidad`.`cuenta` = `cuenta`.`id`\
				LEFT JOIN agil_comprobante_contabilidad AS `comprobante` ON `agil_asiento_contabilidad`.`comprobante` = `comprobante`.`id`\
				LEFT OUTER JOIN `gl_clase` AS `comprobante.tipoComprobante` ON `comprobante`.`tipo` = `comprobante.tipoComprobante`.`id`\
				LEFT OUTER JOIN `agil_sucursal` AS `comprobante.sucursal` ON `comprobante`.`sucursal` = `comprobante.sucursal`.`id`\
				INNER JOIN `agil_empresa` AS `comprobante.sucursal.empresa` ON `comprobante.sucursal`.`empresa` = `comprobante.sucursal.empresa`.`id` \
				AND `comprobante.sucursal.empresa`.`id` =" + req.params.id_empresa + " and `comprobante`.`fecha`  BETWEEN '" + req.params.inicio.split('/').reverse().join('-') + " 00:00:00' AND '" + req.params.fin.split('/').reverse().join('-') + " 23:59:59'\
				LEFT JOIN  agil_contabilidad_cuenta_auxiliar AS `contabilidad_cuenta_auxiliar` ON `agil_asiento_contabilidad`.`id` = `contabilidad_cuenta_auxiliar`.`asiento`\
				LEFT JOIN agil_asiento_contabilidad_centro_costo AS `contabilidad_centro_costo` ON `contabilidad_centro_costo`.`id`=( select agil_asiento_contabilidad_centro_costo.id from agil_asiento_contabilidad_centro_costo where  agil_asiento_contabilidad_centro_costo.asiento_contabilidad =  agil_asiento_contabilidad.id order by id asc limit 1)\
				LEFT JOIN `gl_clase` AS `centro_costo` ON `contabilidad_centro_costo`.`centro_costo` = `centro_costo`.`id`\
				 WHERE \
				`agil_asiento_contabilidad`.`eliminado` = FALSE \
			ORDER BY \
				`comprobante`.`numero` ASC;", { type: sequelize.QueryTypes.SELECT }).then(function (result) {
				res.json({ comprobantes: result })
			}).catch(function (err) {
				res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
			});
		})
	router.route('/comprobante-contabilidad/usuario/:id_usuario')
		.get(ensureAuthorizedlogged, function (req, res) {
			ComprobanteContabilidad.findAll({
				where: {
					id_usuario: req.params.id_usuario,
					eliminado: false
				},
				include: [{ model: AsientoContabilidad, as: 'asientosContables', where: { eliminado: false }, include: [{ model: ContabilidadCuenta, as: 'cuenta' }] }, { model: Clase, as: 'tipoComprobante' }, { model: Sucursal, as: 'sucursal' }, { model: Usuario, as: 'usuario' }]
			}).then(function (contabilidadComprobante) {
				res.json(contabilidadComprobante)
			})
		})
	router.route('/comprobante-contabilidad/monedaCambio/empresa/:id_empresa')
		.post(ensureAuthorizedlogged, function (req, res) {
			req.body.forEach(function (dia, index, array) {
				var inicio = new Date(dia.fecha); inicio.setHours(0, 0, 0, 0, 0);
				var fin = new Date(dia.fecha); fin.setHours(23, 59, 59, 59);
				MonedaTipoCambio.find({
					where: {
						fecha: {
							$between: [inicio, fin]
						}, id_empresa: req.params.id_empresa
					}
				}).then(function (monedaCambio) {
					if (!monedaCambio) {
						MonedaTipoCambio.create({
							fecha: dia.fecha,
							ufv: parseFloat(dia.ufb),
							dolar: parseFloat(dia.dolar),
							id_empresa: req.params.id_empresa
						}).then(function (MonedaTipoCambioActualizado) {
							if (index === (array.length - 1)) {
								res.json({ message: "datos actualizados satisfactoriamente!" })
							}
						})
					} else {
						MonedaTipoCambio.update({
							fecha: dia.fecha,
							ufv: parseFloat(dia.ufb),
							dolar: parseFloat(dia.dolar)
						}, {
							where: { id: monedaCambio.id }
						}).then(function (menedaTipoCambioActualizado) {
							if (index === (array.length - 1)) {
								res.json({ message: "datos actualizados satisfactoriamente!" })
							}
						})
					}

				}, this);
			})
		})
	router.route('/comprobante-contabilidad/monedaCambio/:fecha/empresa/:id_empresa')
		.get(ensureAuthorizedlogged, function (req, res) {
			var inicio = new Date(req.params.fecha); inicio.setHours(0, 0, 0, 0, 0);
			var fin = new Date(req.params.fecha); fin.setHours(23, 59, 59, 59);

			MonedaTipoCambio.find({
				where: {
					fecha: {
						$between: [inicio, fin]
					}, id_empresa: req.params.id_empresa
				}
			}).then(function (MonedaCambio) {
				res.json({ monedaCambio: MonedaCambio })
			})
		})

	router.route('/ultima-fecha-comprobante/empresa/:id_empresa/tipo/:id_tipo')
		.get(ensureAuthorizedlogged, function (req, res) {
			var condicionSucursal = { id_empresa: req.params.id_empresa }
			ComprobanteContabilidad.findAll({
				limit: 1,
				where: {
					id_tipo: req.params.id_tipo,
				},
				include: [{ model: Sucursal, as: 'sucursal', where: condicionSucursal }],
				order: [['id', 'DESC']]
			}).then(function (Comprobante) {
				res.json({ comprobante: Comprobante[0] })
			})
		})
	router.route('/comprobante-contabilidad/monedaCambio/mes/:mes/anio/:anio/empresa/:id_empresa')
		.get(ensureAuthorizedlogged, function (req, res) {
			var condicion = {}
			if (req.params.mes != "a") {
				var inicio = new Date(req.params.anio, req.params.mes, 1); inicio.setHours(0, 0, 0, 0, 0);
				var fin = new Date(req.params.anio, (parseInt(req.params.mes) + 1), 0); fin.setHours(23, 59, 59, 59);
				condicion = {
					fecha: {
						$between: [inicio, fin]
					}, id_empresa: req.params.id_empresa
				}
			} else {
				req.params.mes = 0
				var inicio = new Date(req.params.anio, req.params.mes, 1); inicio.setHours(0, 0, 0, 0, 0);
				var fin = new Date(req.params.anio, (parseInt(req.params.mes) + 12), 0); fin.setHours(23, 59, 59, 59);
				condicion = {
					fecha: {
						$between: [inicio, fin]
					}, id_empresa: req.params.id_empresa
				}
			}
			MonedaTipoCambio.findAll({
				where: condicion,
				order: [['fecha', 'asc']]
			}).then(function (MonedasCambio) {
				res.json(MonedasCambio)
			})
		})
	router.route('/comprobante-contabilidad/monedaCambio/:id_moneda')
		.put(ensureAuthorizedlogged, function (req, res) {
			MonedaTipoCambio.update({
				fecha: req.body.fecha,
				ufv: parseFloat(req.body.ufv),
				dolar: parseFloat(req.body.dolar)
			}, {
				where: {
					id: req.params.id_moneda
				}
			}).then(function (monedaActualizada) {
				res.json({ mensaje: "cambio moneda actualizado satisfactoriamente!" })
			})
		})

	router.route('/comprobante-contabilidad/favorito/:id_comprobante')
		.put(ensureAuthorizedlogged, function (req, res) {
			ComprobanteContabilidad.find({
				where: {

					id: req.params.id_comprobante,
				},
			}).then(function (comprobanteEncontrado) {
				var favorito = "";
				if (comprobanteEncontrado.favorito == null) {
					favorito = true
				}
				if (comprobanteEncontrado.favorito == true) {
					favorito = false
				} else {
					favorito = true
				}
				ComprobanteContabilidad.update({
					favorito: favorito
				}, {
					where: {
						id: req.params.id_comprobante,
					},
				}).then(function (ComprobanteActualizado) {
					res.json({ mensaje: "comprobante actualizado satisfactoriamente!" })
				})
			})

		})
	router.route('/comprobante-cuenta/:id_cuenta/periodo/:inicio/:fin/pagina/:pagina/items_pagina/:items_pagina/texto_busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/cuenta_auxiliar/:cuenta_auxiliar/centro_costos/:centro_costos')
		.get(ensureAuthorizedlogged, function (req, res) {
			var condicionComprobante = { eliminado: false }
			var condicionCuentaAuxiliar = { model: ContabilidadCuentaAuxiliar, as: 'cuentaAux' }
			var condicionCentroCostos = { model: Clase, as: 'centroCosto' }
			if (req.params.inicio != 0 && req.params.fin != 0) {
				var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0, 0);
				var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 59);
				var condicionComprobante = {
					eliminado: false,
					$or: [
						{
							fecha: {
								$between: [inicio, fin]
							}
						}
					]
				};
			}

			if (req.params.cuenta_auxiliar != 0) {
				condicionCuentaAuxiliar = {
					model: ContabilidadCuentaAuxiliar, as: 'cuentaAux', where: {
						$or: [
							{
								nombre: {
									$like: "%" + req.params.cuenta_auxiliar + "%"
								},

							}
						]
					}
				}
			}

			if (req.params.centro_costos != 0) {
				condicionCentroCostos = {
					model: Clase, as: 'centroCosto', where: {
						$or: [
							{
								nombre: {
									$like: "%" + req.params.centro_costos + "%"
								},

							}
						]
					}
				}
			}

			if (req.params.items_pagina != 0) {
				AsientoContabilidad.count({
					distinct: true,
					where: { eliminado: false },
					include: [condicionCuentaAuxiliar,
						{
							model: AsientoContabilidadCentroCosto, as: 'centrosCostos',
							include: [condicionCentroCostos]
						}, {
							model: ComprobanteContabilidad, as: 'comprobante', where: condicionComprobante,
							include: [{ model: Clase, as: 'tipoComprobante' }]
						}
						, {
							model: ContabilidadCuenta, as: 'cuenta', where: {
								id: req.params.id_cuenta,
								eliminado: false
							}
						}],
					order: [
						[{ model: ComprobanteContabilidad, as: 'comprobante' }, 'fecha', 'ASC']
					]
				}).then(function (data) {
					AsientoContabilidad.findAll({
						offset: (req.params.items_pagina * (req.params.pagina - 1)), limit: req.params.items_pagina,
						where: { eliminado: false },
						include: [condicionCuentaAuxiliar,
							{
								model: AsientoContabilidadCentroCosto, as: 'centrosCostos',
								include: [condicionCentroCostos]
							}, {
								model: ComprobanteContabilidad, as: 'comprobante', where: condicionComprobante,
								include: [{ model: Clase, as: 'tipoComprobante' }]
							}
							, {
								model: ContabilidadCuenta, as: 'cuenta', where: {
									id: req.params.id_cuenta,
									eliminado: false
								}
							}],
						order: [
							[{ model: ComprobanteContabilidad, as: 'comprobante' }, 'fecha', 'ASC']
						]
					}).then(function (asientos) {
						res.json({ asientos: asientos, paginas: Math.ceil(data / req.params.items_pagina) });
					}).catch((err) => {
						res.json({ hasErr: true, mensaje: err.mensaje, stack: err.stack })
					});
				})
			} else {
				AsientoContabilidad.findAll({
					where: { eliminado: false },
					include: [condicionCuentaAuxiliar,
						{
							model: AsientoContabilidadCentroCosto, as: 'centrosCostos',
							include: [condicionCentroCostos]
						}, {
							model: ComprobanteContabilidad, as: 'comprobante', where: condicionComprobante,
							include: [{ model: Clase, as: 'tipoComprobante' }]
						}
						, {
							model: ContabilidadCuenta, as: 'cuenta', where: {
								id: req.params.id_cuenta,
								eliminado: false
							}
						}],
					order: [
						[{ model: ComprobanteContabilidad, as: 'comprobante' }, 'fecha', 'ASC']
					]
				}).then(function (asientos) {
					res.json({ asientos: asientos, paginas: asientos.length / 10 });
				}).catch((err) => {
					res.json({ hasErr: true, mensaje: err.mensaje, stack: err.stack })
				});
			}
		})

	router.route('/comprobante-cuenta-general/periodo/:inicio/:fin/cuenta_auxiliar/:cuenta_auxiliar/centro_costos/:centro_costos/empresa/:id_empresa')
		.get(function (req, res) {
			var condicionComprobante = { eliminado: false }
			var condicionCuentaAuxiliar = { model: ContabilidadCuentaAuxiliar, as: 'cuentaAux' }
			var condicionCentroCostos = { model: Clase, as: 'centroCosto' }
			if (req.params.inicio != 0 && req.params.fin != 0) {
				var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0, 0);
				var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 59);
				var condicionComprobante = {
					eliminado: false,
					$or: [
						{
							fecha: {
								$between: [inicio, fin]
							}
						}
					]
				};
			}

			if (req.params.cuenta_auxiliar != 0) {
				condicionCuentaAuxiliar = {
					model: ContabilidadCuentaAuxiliar, as: 'cuentaAux', where: {
						$or: [
							{
								nombre: {
									$like: "%" + req.params.cuenta_auxiliar + "%"
								},

							}
						]
					}
				}
			}

			if (req.params.centro_costos != 0) {
				condicionCentroCostos = {
					model: Clase, as: 'centroCosto', where: {
						$or: [
							{
								nombre: {
									$like: "%" + req.params.centro_costos + "%"
								},

							}
						]
					}
				}
			}

			ContabilidadCuenta.findAll({
				where: {
					eliminado: false,
					id_empresa: req.params.id_empresa
				},
				include: [
					{
						model: ClasificacionCuenta, as: 'clasificacion',
						include: [{ model: Clase, as: 'saldo' }]
					},
					{
						model: AsientoContabilidad, as: 'cuenta', required: true,
						where: { eliminado: false },
						include: [condicionCuentaAuxiliar,
							{
								model: AsientoContabilidadCentroCosto, as: 'centrosCostos',
								include: [condicionCentroCostos]
							}, {
								model: ComprobanteContabilidad, as: 'comprobante', where: condicionComprobante, required: true,
								include: [{ model: Clase, as: 'tipoComprobante' }]
							}]
					}
				]
			}).then(function (asientos) {
				res.json({ asientos: asientos, paginas: asientos.length / 10 });
			}).catch((err) => {
				res.json({ hasErr: true, mensaje: err.mensaje, stack: err.stack })
			});

		})

	router.route('/comprobante-cuenta-reporte/:id_cuenta/inicio/:inicio/fin/:fin')
		.get(ensureAuthorizedlogged, function (req, res) {
			var condicionComprobante = {}
			if (req.params.inicio != 0 && req.params.fin != 0) {
				//var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0, 0);
				//var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 59);
				var inicio = req.params.inicio.split('/').reverse().join('-');
				var fin = req.params.fin.split('/').reverse().join('-');
				var condicionComprobante = {
					$or: [
						{
							fecha: {
								$between: [inicio, fin]
							}
						}
					]
				};
			} else {
				condicionComprobante = {}
			}
			AsientoContabilidad.findAll({
				include: [{
					model: ComprobanteContabilidad, as: 'comprobante', where: condicionComprobante, order: [['fecha', 'DESC']],
					include: [{ model: Clase, as: 'tipoComprobante' }]
				}
					, {
					model: ContabilidadCuenta, as: 'cuenta', where: { id: req.params.id_cuenta, eliminado: false }
				}]
			}).then(function (asientos) {
				res.json({ asientos: asientos });
			});
		})


	router.route('/comprobantes/totalGeneral/empresa/:id_empresa')
		.get(ensureAuthorizedlogged, function (req, res) {
			var condicionSucursal = { id_empresa: req.params.id_empresa };
			// OJO: Agregado agil_sucursal = 1, los comprobantes de de las sucursales deshabilitadas no se sumaran
			sequelize.query("Select SUM(importe) as total from agil_comprobante_contabilidad inner join agil_sucursal on agil_sucursal.id = agil_comprobante_contabilidad.sucursal where agil_sucursal.activo = 1 AND agil_sucursal.empresa =" + req.params.id_empresa, { type: sequelize.QueryTypes.SELECT }).then(function (result) {
				res.json({ total: result })
			})
		});
	router.route('/comprobantes/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/fecha-inicio/:inicio/fecha-fin/:fin/columna/:columna/direccion/:direccion/busqueda/:texto_busqueda')
		.get(ensureAuthorizedlogged, function (req, res) {
			var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0, 0);
			var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 59);
			var ordenArreglo = [];
			if (req.params.columna == "sucursal") {
				ordenArreglo.push({ model: Sucursal, as: 'sucursal' });
				req.params.columna = "nombre";
			} else if (req.params.columna == "usaurio") {
				ordenArreglo.push({ model: Persona, as: 'persona' });
				req.params.columna = "nombres";
			} else if (req.params.columna == "comprobante") {
				ordenArreglo.push({ model: Clase, as: 'tipoComprobante' });
				req.params.columna = "nombre";
			}
			ordenArreglo.push(req.params.columna);
			ordenArreglo.push(req.params.direccion);
			if (req.params.inicio != 0) {
				if (req.params.texto_busqueda != 0) {
					var condicionComprobante = {
						$or: [
							{
								gloza: {
									$like: "%" + req.params.texto_busqueda + "%"
								},
								fecha: {
									$between: [inicio, fin]
								}
							}
						]
					};
				} else {
					var condicionComprobante = {
						$or: [
							{
								fecha: {
									$between: [inicio, fin]
								}
							}
						]
					};
				}

			} else {
				var condicionComprobante = {
					$or: [
						{
							favorito: true
						}
					]
				};
			}
			var condicionSucursal = { id_empresa: req.params.id_empresa, activo: true };

			ComprobanteContabilidad.findAndCountAll({
				where: condicionComprobante,
				include: [{ model: AsientoContabilidad, as: 'asientosContables', where: { eliminado: false }, include: [{ model: ContabilidadCuentaAuxiliar, as: 'cuentaAux' }, { model: ContabilidadCuenta, as: 'cuenta' }] }, { model: Clase, as: 'tipoComprobante' }, { model: Usuario, as: 'usuario', include: [{ model: Persona, as: 'persona' }] },
				{ model: Sucursal, as: 'sucursal', where: condicionSucursal, include: [{ model: Empresa, as: 'empresa' }] }],

			}).then(function (data) {
				ComprobanteContabilidad.findAll({
					offset: (req.params.items_pagina * (req.params.pagina - 1)), limit: req.params.items_pagina,
					where: condicionComprobante,
					include: [{ model: AsientoContabilidad, as: 'asientosContables', where: { eliminado: false }, include: [{ model: ContabilidadCuentaAuxiliar, as: 'cuentaAux' }, { model: ContabilidadCuenta, as: 'cuenta', include: [{ model: Clase, as: 'tipoAuxiliar' }] }] }, { model: Clase, as: 'tipoComprobante' },
					{ model: Usuario, as: 'usuario', include: [{ model: Persona, as: 'persona' }] },
					{ model: Sucursal, as: 'sucursal', where: condicionSucursal, include: [{ model: Empresa, as: 'empresa' }] }],
					order: [ordenArreglo]
				}).then(function (comprobantes) {
					res.json({ comprobantes: comprobantes, paginas: Math.ceil(data.count / req.params.items_pagina) });
				});
			});
		});
	router.route('/comprobante-cuenta-espesifica/empresa/:id_empresa/busqueda/:buscar')
		.get(ensureAuthorizedlogged, function (req, res) {
			var condicionCuenta;
			if (req.params.buscar != 0) {
				condicionCuenta = {
					id_empresa: req.params.id_empresa,
					eliminado: false,
					tipo_especifica: false,
					$or: [
						{
							nombre: {
								$like: req.params.buscar + "%"
							}
						},
						{
							codigo: {
								$like: req.params.buscar + "%"
							}
						}
					]
				};
			} else {
				condicionCuenta = {
					id_empresa: req.params.id_empresa, eliminado: { $not: true }
				}
			}
			ContabilidadConfiguracionGeneralTipoCuenta.find({
				where: {
					id_empresa: req.params.id_empresa,
					usar_en_comprobante: true
				},
				include: [{ model: Clase, as: 'tipoCuenta' }]
			}).then(function (configTipoCuenta) {
				ContabilidadCuenta.findAll({
					where: condicionCuenta,
					include: [{ model: Clase, as: 'tipoAuxiliar' }, { model: Clase, as: 'tipoCuenta', where: { id: configTipoCuenta.tipoCuenta.id } },
					{
						model: ClasificacionCuenta, as: 'clasificacion',
						include: [{ model: Clase, as: 'saldo' }, { model: Clase, as: 'movimiento' }]
					},
					{ model: Clase, as: 'claseCalculo' }]

				}).then(function (cuentas) {
					res.json(cuentas)
				})
			}).catch(function (err) {
				res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
			});
		});
	router.route('/comprobante-cuenta/empresa/:id_empresa/busqueda/:buscar')
		.get(ensureAuthorizedlogged, function (req, res) {
			var condicionCuenta;
			if (req.params.buscar != 0) {
				condicionCuenta = {
					id_empresa: req.params.id_empresa,
					eliminado: false,
					$or: [
						{
							nombre: {
								$like: req.params.buscar + "%"
							}
						},
						{
							codigo: {
								$like: req.params.buscar + "%"
							}
						}
					]
				};
			} else {
				condicionCuenta = {
					id_empresa: req.params.id_empresa, eliminado: { $not: true }
				}
			}
			ContabilidadCuenta.findAll({
				where: condicionCuenta,
				include: [{ model: Clase, as: 'tipoAuxiliar' }, { model: Clase, as: 'tipoCuenta' },
				{
					model: ClasificacionCuenta, as: 'clasificacion',
					include: [{ model: Clase, as: 'saldo' ,required:false}, { model: Clase, as: 'movimiento' ,required:false}]
				},
				{ model: Clase, as: 'claseCalculo' }]

			}).then(function (cuentas) {
				res.json(cuentas)
			}).catch(function (err) {
				res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
			});

		});
	router.route('/comprobante-cuenta-filtro/empresa/:id_empresa/busqueda/:buscar')
		.get(ensureAuthorizedlogged, function (req, res) {
			var condicionCuenta;
			if (req.params.buscar != 0) {
				condicionCuenta = {
					id_empresa: req.params.id_empresa,
					eliminado: false,
					$or: [
						{
							nombre: {
								$like: "%" + req.params.buscar + "%"
							}
						},
						{
							codigo: {
								$like: req.params.buscar + "%"
							}
						}
					]
				};
			} else {
				condicionCuenta = {
					id_empresa: req.params.id_empresa, eliminado: { $not: true }
				}
			}
			ContabilidadCuenta.findAll({
				where: condicionCuenta,
				include: [{ model: Clase, as: 'tipoAuxiliar' }, { model: Clase, as: 'tipoCuenta' },
				{ model: ClasificacionCuenta, as: 'clasificacion' },
				{ model: Clase, as: 'claseCalculo' }]

			}).then(function (cuentas) {
				res.json(cuentas)
			}).catch(function (err) {
				res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
			});

		});
	router.route('/comprobante-cuenta/asientos/:id_cuenta')
		.get(ensureAuthorizedlogged, function (req, res) {
			AsientoContabilidad.findAll({
				where: {
					id_cuenta: req.params.id_cuenta,
					eliminado: false
				},
				include: [{
					model: ContabilidadCuenta, as: 'cuenta', include: [
						{
							model: ClasificacionCuenta, as: "clasificacion",
							include: [{ model: Clase, as: 'saldo' }, { model: Clase, as: 'movimiento' }]
						},
						{
							model: Clase, as: 'tipoCuenta'
						},
						{
							model: Clase, as: 'claseCalculo'
						}
					]
				},
				{
					model: ComprobanteContabilidad, as: 'comprobante', include: [{ model: Clase, as: 'tipoComprobante' }]
				}]
			}).then(function (asientosContables) {
				res.json(asientosContables)
			})
		})

	// router.route('/contabilidad-cuentas/empresa/:id_empresa/busqueda/:query')
	// .get(ensureAuthorizedlogged,function (req, res) {
	// 	ContabilidadCuenta.findAll({
	// 		where: {
	// 			id_empresa: req.params.id_empresa,
	// 			eliminado: false
	// 		},
	// 		include: [{ model: Clase, as: 'tipoCuenta' }, { model: Clase, as: 'claseCalculo' }, { model: Clase, as: 'vincularCuenta' }, { model: ClasificacionCuenta, as: 'claseCuenta' }, { model: ClasificacionCuenta, as: 'clasificacion', include: [{ model: Clase, as: 'saldo' }, { model: Clase, as: 'movimiento' }] }]
	// 	}).then(function (ListaCuenta) {
	// 		res.json(ListaCuenta)
	// 	})


	// })

	function guardarAsientos(req, res, comprobante, ComprobanteCreado, arrayDatos, t, centrosCostos_) {
		const promises = []
		for (let i = 0; i < arrayDatos.length; i++) {
			let asientoContable = arrayDatos[i];
			if (asientoContable.debe_bs == null) {
				asientoContable.debe_bs = "0";
			}
			if (asientoContable.debe_sus == null) {
				asientoContable.debe_sus = "0";
			}
			if (asientoContable.haber_bs == null) {
				asientoContable.haber_bs = "0";
			}
			if (asientoContable.haber_sus == null) {
				asientoContable.haber_sus = "0";
			}
			const idCentroCosto = []
			if (asientoContable.centroCosto) {
				const tieneID = asientoContable.centroCosto.id && true || false;
				if (tieneID) {
					idCentroCosto.push(asientoContable.centroCosto.id)
				} else {
					const centrosCostosMultiples = asientoContable.centroCosto.split(' ').map(centro => centro.trim())
					const centrosEncontrados = centrosCostos_.filter(centro => (centrosCostosMultiples.indexOf(centro.nombre) > -1))
					for (let index = 0; index < centrosEncontrados.length; index++) {
						idCentroCosto.push(centrosEncontrados[index].id)
					}
				}
			}
			if (asientoContable.cuentaEncontrada) {
				promises.push(crearAsiento(req, res, comprobante, ComprobanteCreado, arrayDatos, t, asientoContable, idCentroCosto))
			} else {
				console.log(asientoContable)
			}
		}
		return Promise.all(promises);
	}
	function crearAsiento(req, res, comprobante, ComprobanteCreado, arrayDatos, t, asientoContable, idCentroCosto) {
		let saldoCuentaSus = (parseFloat(asientoContable.cuentaEncontrada.saldo) + parseFloat(asientoContable.haber_sus) - parseFloat(asientoContable.debe_sus))
		let saldoCuentaBs = (parseFloat(asientoContable.cuentaEncontrada.saldo) + parseFloat(asientoContable.haber_bs) - parseFloat(asientoContable.debe_bs))
		return AsientoContabilidad.create({
			id_comprobante: ComprobanteCreado.id,
			id_cuenta: asientoContable.cuentaEncontrada.id,
			glosa: asientoContable.gloza,
			// id_centro_costo: asientoContable.centroCosto,
			debe_bs: parseFloat(asientoContable.debe_bs),
			haber_bs: parseFloat(asientoContable.haber_bs),
			debe_sus: parseFloat(asientoContable.debe_sus),
			haber_sus: parseFloat(asientoContable.haber_sus),
			eliminado: false,
			saldo_cuenta_bs: saldoCuentaBs ? saldoCuentaBs : null,
			saldo_cuenta_sus: saldoCuentaSus ? saldoCuentaSus : null
		}, {
			transaction: t
		}).then(function (asientroCreado) {
			const promi = []
			for (let index = 0; index < idCentroCosto.length; index++) {
				promi.push(AsientoContabilidadCentroCosto.create({
					id_asiento_contabilidad: asientroCreado.id,
					id_centro_costo: idCentroCosto[index]
				}))
			}
			const tieneAuxiliar = asientoContable.auxiliares && (asientoContable.auxiliares.length > 0 ? true : false) || false;
			if (tieneAuxiliar) promi.push(ContabilidadCuentaAuxiliar.create({
				nombre: asientoContable.auxiliares,
				id_cuenta: asientoContable.cuentaEncontrada.id,
				id_asiento: asientroCreado.id
			}, { transaction: t }))

			promi.push(actualizarCuenta(req, res, comprobante, ComprobanteCreado, arrayDatos, t, asientoContable))
			return Promise.all(promi)
		}).catch(function (err) {
			return new Promise(function (fulfill, reject) {
				reject(err);
			});
		});

	}
	function actualizarCuenta(req, res, comprobante, ComprobanteCreado, arrayDatos, t, asientoContable) {
		asientoContable.cuentaEncontrada.debe = (asientoContable.cuentaEncontrada.debe == null) ? 0 : asientoContable.cuentaEncontrada.debe;
		asientoContable.cuentaEncontrada.haber = (asientoContable.cuentaEncontrada.haber == null) ? 0 : asientoContable.cuentaEncontrada.haber;
		asientoContable.cuentaEncontrada.debe += parseFloat(asientoContable.debe_bs)
		asientoContable.cuentaEncontrada.haber += parseFloat(asientoContable.haber_bs)
		if (asientoContable.cuentaEncontrada.debe > asientoContable.cuentaEncontrada.haber) {
			asientoContable.cuentaEncontrada.saldo = asientoContable.cuentaEncontrada.debe - asientoContable.cuentaEncontrada.haber
		} else {
			asientoContable.cuentaEncontrada.saldo = asientoContable.cuentaEncontrada.haber - asientoContable.cuentaEncontrada.debe
		}
		return ContabilidadCuenta.update({
			debe: asientoContable.cuentaEncontrada.debe,
			haber: asientoContable.cuentaEncontrada.haber,
			saldo: asientoContable.cuentaEncontrada.saldo
		}, {
			transaction: t,
			where: { id: asientoContable.cuentaEncontrada.id }
		}).then(function (CuentaActualizada) {
			/* if (asientos) {
				return eliminarYActulizarCuentas(req, res, comprobante, ComprobanteCreado, asientos, t)
			} */
		})
	}
	router.route('/importar-comprobantes/usuario/:id_usuario/empresa/:id_empresa')
		.post(ensureAuthorizedlogged, function (req, res) {
			req.body.mensaje = ""
			Tipo.find({
				where: {
					id_empresa: req.params.id_empresa,
					nombre_corto: 'CENCOS'
				}
			}).then((tipoCencos) => {
				Clase.findAll({
					where: {
						id_tipo: tipoCencos.id
					}
				}).then((centrosCostos_) => {
					sequelize.transaction(function (t) {
						var a = 0
						return Tipo.find({
							where: { nombre_corto: 'TCMC' }, transaction: t,
						}).then(function (tipoEncontrado) {
							return recorrerComprobantes(req, res, t, tipoEncontrado, centrosCostos_)
						});

					}).then(function (result) {
						res.json({ mensaje: "Comprobantes Importados satisfactoriamente!" });
					}).catch(function (err) {
						var error = (err.stack) ? err.stack : err
						res.json({ hasError: true, mensaje: error });
					});
				})
			}).catch(function (err) {
				var error = (err.stack) ? err.stack : err
				res.json({ hasError: true, mensaje: error });
			});
		})

	function recorrerComprobantes(req, res, t, tipoEncontrado, centrosCostos_) {
		var promises = [];
		req.body.forEach(function (comprobante, index, array) {
			var inicio = new Date(comprobante.fecha)
			var fin = new Date(comprobante.fecha)
			inicio.setHours(0, 0, 0, 0);
			fin.setHours(23, 59, 59, 999);
			promises.push(ComprobanteContabilidad.find({
				where: { fecha: { $between: [inicio, fin] }, numero: comprobante.codigo }, transaction: t,
				include: [{ model: Sucursal, as: 'sucursal', where: { id_empresa: req.params.id_empresa } }, { model: Clase, as: 'tipoComprobante', where: { nombre: comprobante.tipo_comprobante } }]
			}).then(function (comprobanteEncontrado) {
				if (comprobanteEncontrado) {
					if (!comprobanteEncontrado.sucursal.activo) throw new Error('Sucursal ' + comprobanteEncontrado.sucursal.nombre + ' está deshabilitada, no se pueden hacer cambios.')
					return Clase.find({
						where: { nombre: comprobante.tipo_comprobante, id_tipo: tipoEncontrado.id }, transaction: t,
					}).then(function (tipoComprobanteEncontrado) {
						return Sucursal.find({
							transaction: t,
							where: {
								id_empresa: req.params.id_empresa,
								nombre: comprobante.sucursal//your where conditions, or without them if you need ANY entry
							}
						}).then(function (sucursalEncontrada) {
							if (!sucursalEncontrada.activo) throw new Error('La sucursal ' + sucursalEncontrada.nombre + ' está deshabilitada. No se pueden realizar cambios.')
							return ActualizarComprobante(req, res, tipoComprobanteEncontrado, comprobante, comprobanteEncontrado, sucursalEncontrada, t, centrosCostos_)
						});
					});
				} else {
					return Clase.find({
						where: { nombre: comprobante.tipo_comprobante, id_tipo: tipoEncontrado.id }, transaction: t,
					}).then(function (tipoComprobanteEncontrado) {
						return Sucursal.find({
							transaction: t,
							where: {
								id_empresa: req.params.id_empresa,
								nombre: comprobante.sucursal//your where conditions, or without them if you need ANY entry
							}
						}).then(function (sucursalEncontrada) {
							if (!sucursalEncontrada.activo) throw new Error('La sucursal ' + sucursalEncontrada.nombre + ' está deshabilitada. No se pueden realizar cambios.')
							return GuardarComprobante(req, res, tipoComprobanteEncontrado, comprobante, sucursalEncontrada, t, centrosCostos_)
						});
					});

				}
			}));
		});
		return Promise.all(promises);
	}
	function ActualizarComprobante(req, res, tipoComprobanteEncontrado, comprobante, comprobanteEncontrado, SucursalEncontrada, t, centrosCostos_) {
		return ComprobanteContabilidad.update({
			id_tipo: tipoComprobanteEncontrado.id,
			abierto: false,
			numero: comprobante.codigo,
			fecha: comprobante.fecha,
			id_sucursal: SucursalEncontrada.id,
			gloza: comprobante.gloza,
			id_usuario: req.params.id_usuario,
			eliminado: comprobante.eliminado,
			importe: comprobante.importe,
			id_tipo_cambio: comprobante.tipoCambio.id,
			//fecha_creacion: comprobante.fechaActual,
			//eliminado: false
		}, {
			transaction: t,
			where: { id: comprobanteEncontrado.id }
		}).then(function (ComprobanteActualizado) {
			return AsientoContabilidad.findAll({
				transaction: t,
				where: { id_comprobante: comprobanteEncontrado.id }
			}).then(function (AsientosEncontrados) {
				return eliminarYActulizarCuentas(req, res, tipoComprobanteEncontrado, comprobante, comprobanteEncontrado, AsientosEncontrados, t, centrosCostos_)
			})
		})

	}
	function eliminarYActulizarCuentas(req, res, tipoComprobanteEncontrado, comprobante, comprobanteEncontrado, AsientosEncontrados, t, centrosCostos_) {
		var promises = []
		AsientosEncontrados.forEach(function (dato, index, array) {
			promises.push(ContabilidadCuenta.find({
				transaction: t,
				where: { id: dato.id_cuenta, id_empresa: req.params.id_empresa }
			}).then(function (cuentaEncontrada) {
				cuentaEncontrada.debe = (cuentaEncontrada.debe == null) ? 0 : cuentaEncontrada.debe - dato.debe_bs;
				cuentaEncontrada.haber = (cuentaEncontrada.haber == null) ? 0 : cuentaEncontrada.haber - dato.haber_bs;

				if (cuentaEncontrada.debe > cuentaEncontrada.haber) {
					cuentaEncontrada.saldo = cuentaEncontrada.debe - cuentaEncontrada.haber
				} else {
					cuentaEncontrada.saldo = cuentaEncontrada.haber - cuentaEncontrada.debe
				}
				return ContabilidadCuenta.update({
					debe: cuentaEncontrada.debe,
					haber: cuentaEncontrada.haber,
					saldo: cuentaEncontrada.saldo
				}, {
					transaction: t,
					where: { id: cuentaEncontrada.id }
				}).then(function (CuentaActualizada) {
					if (index === (array.length - 1)) {
						return AsientoContabilidad.destroy({
							transaction: t,
							where: { id_comprobante: comprobanteEncontrado.id }
						}).then(function (AsientosEliminados) {
							return encontrarCuentas(req, res, comprobante, comprobanteEncontrado, t, centrosCostos_)
						})
					}
				})
			}))
		})
		return Promise.all(promises);
	}
	function GuardarComprobante(req, res, tipoComprobanteEncontrado, comprobante, SucursalEncontrada, t, centrosCostos_) {
		return ComprobanteContabilidad.create({
			id_tipo: tipoComprobanteEncontrado.id,
			abierto: false,
			numero: comprobante.codigo,
			fecha: comprobante.fecha,
			id_sucursal: SucursalEncontrada.id,
			gloza: comprobante.gloza,
			id_usuario: req.params.id_usuario,
			eliminado: comprobante.eliminado,
			importe: comprobante.importe,
			id_tipo_cambio: comprobante.tipoCambio.id,
			fecha_creacion: comprobante.fechaActual,
			eliminado: false
		}, {
			transaction: t,
		}).then(function (ComprobanteCreado) {
			return encontrarCuentas(req, res, comprobante, ComprobanteCreado, t, centrosCostos_)
		})

	}
	function encontrarCuentas(req, res, comprobante, ComprobanteCreado, t, centrosCostos_) {
		var arrayDatos = [], promises = []
		comprobante.asientosContables.forEach(function (dato, index, array) {

			promises.push(ContabilidadCuenta.find({
				where: { codigo: dato.numero_cuenta, id_empresa: req.params.id_empresa }, transaction: t
			}).then(function (cuentaEncontrada) {
				dato.cuentaEncontrada = cuentaEncontrada
				arrayDatos.push(dato)
				if (index === (array.length - 1)) {
					return guardarAsientos(req, res, comprobante, ComprobanteCreado, comprobante.asientosContables, t, centrosCostos_)
				}
			}))
		})
		return Promise.all(promises);
	}
	router.route('/comprobante-contabolidad')
		.post(ensureAuthorizedlogged, function (req, res) {
			var d1 = new Date(req.body.fecha)
			var d2 = new Date()
			var fechaCrear = d1.getMonth()
			var fechaActual = d2.getMonth()
			var diaGuardado = d1.getDate()
			var primerDia = new Date(d1.getFullYear(), d1.getMonth(), 1);
			var ultimoDia = new Date(d1.getFullYear(), d1.getMonth() + 1, 0);
			ultimoDia.setHours(23, 59, 59, 59);
			let date1 = new Date(req.body.fecha)
			/*let date2 = new Date()
			let dateDiff = date2.getTime() - date1.getTime()
			date2.setDate((date2.getDate() + 1))
			let text_date1 = date1.toISOString().split('T')[0]
			let text_Date2 = date2.toISOString().split('T')[0]
			if (dateDiff >= 1 & text_date1 !== text_Date2 && !req.body.id) { */
			sequelize.transaction(async function (transaction) {
				const lsuc = await Sucursal.find({
					where: {
						id: req.body.id_sucursal.id
					}, transaction: transaction
				})
				if (!lsuc.activo) throw new Error('Sucursal ' + lsuc.nombre + ' está deshabilitada, no se pueden hacer cambios.')
				const ComprobanteCorrelativoEncontrado = await ComprobanteContabilidad.findAll({
					limit: 1,
					where: {
						id_tipo: req.body.tipoComprobante.id,
						fecha: {
							$between: [primerDia, ultimoDia]
						}
					},
					include: [{ model: Sucursal, as: 'sucursal', where: { id_empresa: req.body.id_sucursal.id_empresa } }], // confirmar lógica, la sucursal debe ser la misma que viene en el comprobante, para comparar fechas de los comprobantes???
					order: [['id', 'DESC']],
					transaction: transaction
				})

				for (let index = 0; index < ComprobanteCorrelativoEncontrado.length; index++) {
					let fechaComprobante = new Date(ComprobanteCorrelativoEncontrado[0].dataValues.fecha)
					date1.setHours(fechaComprobante.getHours())
					date1.setMinutes(fechaComprobante.getMinutes())
					date1.setSeconds(fechaComprobante.getSeconds() + 1)
					date1.setMilliseconds(fechaComprobante.getMilliseconds())
					if (fechaComprobante.getTime() > date1.getTime()) {
						return new Promise((f, r) => r({ mensaje: "¡Ya Existe uno o más comprobantes con fechas posteriores a: " + date1.toISOString().split('T')[0].split('-').reverse().join('/') + ". el ultimo comprobante esta con fecha:" + ComprobanteCorrelativoEncontrado[0].dataValues.fecha.toISOString().split('T')[0].split('-').reverse().join('/') + " y correlativo:" + ComprobanteCorrelativoEncontrado[0].dataValues.numero }))
					}
				}
				let numero = 0;
				const SucursalEncontrada = await Sucursal.find({
					where: {
						id: req.body.id_sucursal.id
					},
					attributes: ['comprobante_ingreso_correlativo', 'comprobante_egreso_correlativo', 'comprobante_traspaso_correlativo', 'comprobante_caja_chica_correlativo', 'activo', 'nombre'],
					transaction: transaction
				}).catch((err) => {
					return new Promise((f, r) => r({ mensaje: 'Error al obtener datos del número correlativo de comprobante.', stack: err.stack, hasErr: true }))
				})
				if (!SucursalEncontrada.activo) throw new Error('La sucursal ' + SucursalEncontrada.nombre + ' está deshabilitada. No se pueden realizar cambios.')
				if (req.body.crearRegistroCompAntiguo) {
					const ComprobanteEncontrado = await ComprobanteContabilidad.findAll({
						limit: 1,
						where: {
							id_tipo: req.body.tipoComprobante.id,
							fecha: {
								$between: [primerDia, ultimoDia]
							}
						},
						include: [{ model: Sucursal, as: 'sucursal', where: { id_empresa: req.body.id_sucursal.id_empresa } }], // confirmar lógica, la sucursal debe ser la misma que viene en el comprobante, para comparar fechas de los comprobantes???
						order: [['id', 'DESC']],
						transaction: transaction
					}).catch((err) => {
						return new Promise((f, r) => r({ mensaje: 'Error en busqueda de comprobantes', stack: err, hasErr: true }))
					})

					for (let index = 0; index < ComprobanteEncontrado.length; index++) {
						let fechaComprobante = new Date(ComprobanteEncontrado[0].dataValues.fecha)
						date1.setHours(fechaComprobante.getHours())
						date1.setMinutes(fechaComprobante.getMinutes())
						date1.setSeconds(fechaComprobante.getSeconds() + 1)
						date1.setMilliseconds(fechaComprobante.getMilliseconds())
						if (fechaComprobante.getTime() > date1.getTime()) {
							return new Promise((f, r) => r({ mensaje: "¡Ya Existe uno o más comprobantes con fechas posteriores a: " + date1.toISOString().split('T')[0].split('-').reverse().join('/') }))
						}
					}
					const ultimoComprobanteEnFecha = await sequelize.query(
						"SELECT MAX(`agil_comprobante_contabilidad`.numero) AS correlativo \
							FROM `agil_comprobante_contabilidad` AS `agil_comprobante_contabilidad`\
							INNER JOIN `agil_sucursal` AS `sucursal` ON `agil_comprobante_contabilidad`.`sucursal` = `sucursal`.`id` \
							AND `sucursal`.`empresa` = "+ req.body.id_sucursal.id_empresa +
						" WHERE `agil_comprobante_contabilidad`.`fecha` BETWEEN '" + fechaATextoFitro(primerDia) +
						" 00:00:00' AND '" + fechaATextoFitro(ultimoDia) + " 23:59:59' AND `agil_comprobante_contabilidad`.`tipo` = " + req.body.tipoComprobante.id, { type: sequelize.QueryTypes.SELECT }).catch((err) => {
							return new Promise((f, r) => r({ mensaje: 'Error al buscar el correlativo antiguo para asignar.', stack: err.stack, hasErr: true }))
						})
					if (ultimoComprobanteEnFecha.length === 0) {
						numero = 1
					} else {
						numero = ultimoComprobanteEnFecha[0].correlativo + 1
					}
				} else {
					const ultimoFechaComprobante = await sequelize.query(
						"SELECT MAX(`agil_comprobante_contabilidad`.`fecha`) AS fecha \
							FROM `agil_comprobante_contabilidad` AS `agil_comprobante_contabilidad`\
							INNER JOIN `agil_sucursal` AS `sucursal` ON `agil_comprobante_contabilidad`.`sucursal` = `sucursal`.`id` \
							AND `sucursal`.`empresa` = "+ req.body.id_sucursal.id_empresa +
						" WHERE `agil_comprobante_contabilidad`.`tipo` = " + req.body.tipoComprobante.id, { type: sequelize.QueryTypes.SELECT }).catch((err) => {
							return new Promise((f, r) => r({ mensaje: 'Error al buscar el correlativo antiguo para asignar.', stack: err.stack, hasErr: true }))
						})
					if (ultimoFechaComprobante[0].fecha) {
						date1.setHours(ultimoFechaComprobante[0].fecha.getHours())
						date1.setMinutes(ultimoFechaComprobante[0].fecha.getMinutes())
						date1.setSeconds(ultimoFechaComprobante[0].fecha.getSeconds() + 1)
						date1.setMilliseconds(ultimoFechaComprobante[0].fecha.getMilliseconds())
						if (ultimoFechaComprobante[0].fecha.getTime() > date1.getTime()) {
							return new Promise((f, r) => r({ mensaje: "¡no se puede registrar comprobantes que esten en fecha menor a: " + ultimoFechaComprobante[0].fecha.toISOString().split('T')[0].split('-').reverse().join('/') }))
						}
					}
					if (req.body.tipoComprobante.nombre == "INGRESO") { numero = SucursalEncontrada.comprobante_ingreso_correlativo += 1 }
					if (req.body.tipoComprobante.nombre == "EGRESO") { numero = SucursalEncontrada.comprobante_egreso_correlativo += 1 }
					if (req.body.tipoComprobante.nombre == "TRASPASO") { numero = SucursalEncontrada.comprobante_traspaso_correlativo += 1 }
					if (req.body.tipoComprobante.nombre == "CAJA CHICA") { numero = SucursalEncontrada.comprobante_caja_chica_correlativo += 1 }
				}
				if (numero <= 0) {
					return new Promise((f, r) => r({ mensaje: "ERROR : No se pudo asignar el número correlativo al comprobante." }))
				}
				let ComprobanteCreado = await ComprobanteContabilidad.create({
					id_tipo: req.body.tipoComprobante.id,
					abierto: req.body.abierto,
					numero: numero,
					fecha: req.body.fecha,
					id_sucursal: req.body.id_sucursal.id,
					gloza: req.body.gloza,
					id_usuario: req.body.id_usuario,
					eliminado: req.body.eliminado,
					importe: req.body.importe,
					id_tipo_cambio: req.body.tipoCambio.id,
					fecha_creacion: req.body.fechaActual
				}, { transaction: transaction }).catch((err) => {
					return new Promise((f, r) => r({ mensaje: 'Error al empezar la creación del comprobante.', stack: err.stack, hasErr: true }))
				})
				if (req.body.crearRegistroCompAntiguo) {
				} else {
					let correlativoSucursalActualizado = await Sucursal.update({
						comprobante_ingreso_correlativo: SucursalEncontrada.comprobante_ingreso_correlativo,
						comprobante_egreso_correlativo: SucursalEncontrada.comprobante_egreso_correlativo,
						comprobante_traspaso_correlativo: SucursalEncontrada.comprobante_traspaso_correlativo,
						comprobante_caja_chica_correlativo: SucursalEncontrada.comprobante_caja_chica_correlativo,
					}, {
						where: {
							id: req.body.id_sucursal.id,
						},
						transaction: transaction

					}).catch((err) => {
						return new Promise((f, r) => r({ mensaje: "Error al actualizar el número correlativo de comprobantes.", stack: err.stack, hasErr: true }))
					})
				}
				if (req.body.id_cierre_caja) {
					let CierreCajaChicaActualizado = await CierreCajaChica.update({
						id_comprobante: ComprobanteCreado.id
					}, {
						where: { id: req.body.id_cierre_caja }, transaction: transaction
					}).catch((err) => {
						return new Promise((f, r) => r({ mensaje: 'Error al asignare comprobate al cierre de caja.', stack: err.stack }))
					})
				}
				if (req.body.id_planilla_sueldo) {
					let planillaSueldoActualizado = await RRHHPlanillaSueldos.update({
						id_comprobante: ComprobanteCreado.id
					}, {
						where: { id: req.body.id_planilla_sueldo }, transaction: transaction
					}).catch((err) => {
						return new Promise((f, r) => r({ mensaje: 'Error al asignar comprobante a la planilla de sueldo.', stack: err.stack }))
					})
				}
				if (req.body.id_planilla_carga_social) {
					let planillaSueldoActualizado = await RRHHPlanillaCargasSociales.update({
						id_comprobante: ComprobanteCreado.id
					}, {
						where: { id: req.body.id_planilla_carga_social }, transaction: transaction
					}).catch((err) => {
						return new Promise((f, r) => r({ mensaje: 'Error al asignar comprobante a la planilla de sueldo.', stack: err.stack }))
					})
				}
				var conteoAsientos = 0;
				var totalHaber = 0; totalDebe = 0, totalSaldo = 0;
				for (let index = 0; index < req.body.asientosContables.length; index++) {
					let asientoContable = req.body.asientosContables[index]
					if (asientoContable.eliminado != true && asientoContable.cuenta != "") {
						if (asientoContable.debe_bs == null) {
							asientoContable.debe_bs = "0";
						}
						if (asientoContable.debe_sus == null) {
							asientoContable.debe_sus = "0";
						}
						if (asientoContable.haber_bs == null) {
							asientoContable.haber_bs = "0";
						}
						if (asientoContable.haber_sus == null) {
							asientoContable.haber_sus = "0";
						}
						totalHaber += parseFloat(asientoContable.haber_bs)
						totalDebe += parseFloat(asientoContable.debe_bs)
						let asientoCreado = await AsientoContabilidad.create({
							id_comprobante: ComprobanteCreado.id,
							id_cuenta: asientoContable.cuenta.id,
							glosa: asientoContable.glosa,
							debe_bs: parseFloat(asientoContable.debe_bs),
							haber_bs: parseFloat(asientoContable.haber_bs),
							debe_sus: parseFloat(asientoContable.debe_sus),
							haber_sus: parseFloat(asientoContable.haber_sus),
							eliminado: asientoContable.eliminado,
							id_compra: asientoContable.id_compra,
							id_venta: asientoContable.id_venta,
						}, { transaction: transaction })
						if (asientoContable.lc_comp_compra) {
							if (asientoContable.lc_comp_compra.asignado) {
								let idProveedor = asientoContable.lc_comp_compra.proveedor.id
								if (!idProveedor) {
									let proveedorCreado = await Proveedor.create({
										id_empresa: req.body.id_sucursal.id_empresa,
										razon_social: asientoContable.lc_comp_compra.proveedor.razon_social,
										nit: asientoContable.lc_comp_compra.proveedor.nit,
										estado: "V"
									}, {
										transaction: transaction
									}).catch(err => {
										return new Promise((f, r) =>
											r({ mensaje: err.stack ? err.stack : err, hasErr: true }))
									})
									idProveedor = proveedorCreado.id
								}
								const tipoMovimiento = await Tipo.find({
									where: { nombre_corto: 'MOVING' }, transaction: transaction
								}).catch(err => {
									return new Promise((f, r) =>
										r({ mensaje: err.stack ? err.stack : err, hasErr: true }))
								})
								const conceptoMovimiento = await Clase.find({
									where: { nombre_corto: 'IC', id_tipo: tipoMovimiento.id }, transaction: transaction
								}).catch(err => {
									return new Promise((f, r) =>
										r({ mensaje: err.stack ? err.stack : err, hasErr: true }))
								})
								const movimientoCreado = await Movimiento.create({
									id_tipo: tipoMovimiento.id,
									id_clase: conceptoMovimiento.id,
									fecha: asientoContable.lc_comp_compra.fecha2
								}, { transaction: transaction })
								const compracreada = await Compra.create({
									id_almacen: asientoContable.cuenta.id_almacen_lc,
									id_movimiento: movimientoCreado.id,
									contabilizado: true,
									//id_asiento_contabilidad: asientoCreado.id,
									id_proveedor: idProveedor,
									factura: asientoContable.lc_comp_compra.factura,
									autorizacion: asientoContable.lc_comp_compra.autorizacion,
									fecha: asientoContable.lc_comp_compra.fecha2,
									codigo_control: asientoContable.lc_comp_compra.codigo_control,
									importe: asientoContable.lc_comp_compra.importe ? asientoContable.lc_comp_compra.importe : 0,
									descuento_general: asientoContable.lc_comp_compra.descuento_general,
									descuento: asientoContable.lc_comp_compra.descuento,
									recargo: asientoContable.lc_comp_compra.recargo,
									ice: asientoContable.lc_comp_compra.ice,
									excento: asientoContable.lc_comp_compra.excento,
									tipo_descuento: asientoContable.lc_comp_compra.tipo_descuento,
									tipo_recargo: asientoContable.lc_comp_compra.tipo_recargo,
									total: asientoContable.lc_comp_compra.total ? asientoContable.lc_comp_compra.total : 0,
									observacion: asientoContable.lc_comp_compra.observacion,
									id_usuario: req.body.id_usuario,
									descuento_gasolina: asientoContable.lc_comp_compra.descuento_gasolina
								}, {
									transaction: transaction
								}).catch((err) => new Promise((f, r) => {
									r({ mensaje: "ERROR al crear asignación de la compra a los asientos contrables.", stack: err.message })
								}))
								await AsientoContabilidad.update({
									id_compra: compracreada.id,
								}, { where:{id:asientoCreado.id},transaction: transaction }).catch((err) => {
									new Promise((f, r) => r({ mensaje: 'ERROR al crear asientos contbales.', stack: err.stack, hasErr: true }))
								})
							}
						}
						if (asientoContable.centroCosto) {
							if (asientoContable.centroCosto.length > 0) {
								for (let i = 0; i < asientoContable.centroCosto.length; i++) {
									let cc = asientoContable.centroCosto[i];
									let asientoCentoCostoCreado = await AsientoContabilidadCentroCosto.create({
										id_asiento_contabilidad: asientoCreado.id,
										id_centro_costo: cc.id
									}, { transaction: transaction }).catch((err) => {
										new Promise((f, r) => r({ mensaje: "ERROR al crear asignación de centro de costro a los asientos contrables.", stack: err.stack }))
									})
								}
							}
						}
						if (asientoContable.cuentaAux) {
							let cuentaAuxiliarCreada = await ContabilidadCuentaAuxiliar.create({
								debe: asientoContable.cuentaAux.debe,
								haber: asientoContable.cuentaAux.haber,
								saldo: asientoContable.cuentaAux.saldo,
								descripcion: asientoContable.cuentaAux.nombre,
								nombre: asientoContable.cuentaAux.nombre,
								id_cuenta: asientoContable.cuenta.id,
								id_asiento: asientoCreado.id
							}, { transaction: transaction }).catch((err) => {
								new Promise((f, r) => r({ mensaje: "ERROR al crear cuenta auxiliar.", stack: err.stack }))
							})
						}
						await actualizarDebeHaberCuenta(asientoContable, transaction, "suma")
						if (asientoContable.id_venta) {
							ventaActualizada = await Venta.update({
								contabilizado: true
							}, {
								where: {
									id: asientoContable.id_venta,
								},
								transaction: transaction
							}).catch((err) => {
								new Promise((f, r) => r({ mensaje: "ERROR al actualizar la venta id" + asientoContable.id_venta + " de cuenta: '" + asientoContable.cuenta.nombre + "'" }))
							})

						} else if (asientoContable.id_compra) {
							compraActualizada = await Compra.update({
								contabilizado: true,
								//id_asiento_contabilidad:asientoCreado.id
							}, {
								where: {
									id: asientoContable.id_compra,
								},
								transaction: transaction
							}).catch((err) => {
								new Promise((f, r) => r({ mensaje: "ERROR al actualizar la compra id" + asientoContable.id_compra + " de cuenta: '" + asientoContable.cuenta.nombre + "'" }))
							})
						} else if (asientoContable.id_proforma_anulada) {
							await ProformaFacturaAnulada.update({
								id_asiento_contabilidad: asientoCreado.id,
							}, {
								transaction: transaction,
								where: { id: asientoContable.id_proforma_anulada }
							}).catch((err) => {
								new Promise((f, r) => r({ mensaje: "ERROR al actualizar la  factura anulada " + asientoContable.numero_factura_proforma + " de cuenta: '" + asientoContable.cuenta.nombre + "'" }))
							})
						} else if (asientoContable.numero_factura_proforma &&
							asientoContable.sucursalProforma && asientoContable.autorizacion_proforma) {
							await Proforma.update({
								contabilizado: true,
							}, {
								transaction: transaction,
								where: {
									factura: asientoContable.numero_factura_proforma,
									autorizacion: asientoContable.autorizacion_proforma,
									id_sucursal: asientoContable.sucursalProforma
								}
							}).catch((err) => {
								new Promise((f, r) => r({ mensaje: "ERROR al actualizar la proforma factura" + asientoContable.numero_factura_proforma + " de cuenta: '" + asientoContable.cuenta.nombre + "'" }))
							})
							proformasParaAsignarAsiento = await Proforma.findAll({
								transaction: transaction,
								where: {
									factura: asientoContable.numero_factura_proforma,
									autorizacion: asientoContable.autorizacion_proforma,
									id_sucursal: asientoContable.sucursalProforma
								}
							}).catch((err) => {
								new Promise((f, r) => r({ mensaje: "ERROR al actualizar la proforma factura" + asientoContable.numero_factura_proforma + " de cuenta: '" + asientoContable.cuenta.nombre + "'" }))
							})
							for (const proformaPAA of proformasParaAsignarAsiento) {
								await ProformaContabilidad.create({
									id_proforma: proformaPAA.dataValues.id,
									id_asiento_contabilidad: asientoCreado.dataValues.id,
									monto: proformaPAA.dataValues.totalImporteBs,
									totalImporteSus: proformaPAA.dataValues.totalImporteSus,
									cambio_dolar: proformaPAA.dataValues.cambio_dolar,
									fecha_factura: proformaPAA.dataValues.fecha_factura,
									factura: proformaPAA.dataValues.factura,
									autorizacion: proformaPAA.dataValues.autorizacion,
								}, { transaction: transaction })
							}
						} else if (asientoContable.id_anticipo_regular) {
							await RrhhAnticipo.update({
								id_asiento_contabilidad: asientoCreado.dataValues.id
							}, {
								where: { id: asientoContable.id_anticipo_regular }
							})
						} else if (asientoContable.id_detalle_planilla_sueldo) {
							await RRHHDetallePlanillaSueldos.update({
								id_asiento_contabilidad: asientoCreado.dataValues.id
							}, {
								where: { id: asientoContable.id_detalle_planilla_sueldo }
							})
						} else if (asientoContable.id_detalle_planilla_aguinaldo) {
							await RRHHDetallePlanillaAguinaldos.update({
								id_asiento_contabilidad: asientoCreado.dataValues.id
							}, {
								where: { id: asientoContable.id_detalle_planilla_aguinaldo }
							})
						}

					} else {
						conteoAsientos += 1
					}
				}
				if (req.body.ids_ventas) {
					await Venta.update({
						id_comprobante: ComprobanteCreado.id
					}, { where: { id: { $in: req.body.ids_ventas } }, transaction: transaction })
				}
				if (req.body.ids_mantenimiento) {
					await MantenimientoOrdenTrabajo.update({
						id_comprobante: ComprobanteCreado.id
					}, { where: { id: { $in: req.body.ids_mantenimiento } }, transaction: transaction })
				}
				if (req.body.ids_ropas_trabajo) {
					await RrhhEmpleadoDotacionRopa.update({
						id_comprobante: ComprobanteCreado.id
					}, { where: { id: { $in: req.body.ids_ropas_trabajo.split(',') } }, transaction: transaction })
				}
				if (req.body.ids_solicitudes) {
					for (const item of req.body.ids_solicitudes) {
						await SolicitudReposicion.update({
							id_comprobante: ComprobanteCreado.id
						}, { where: { id: item }, transaction: transaction })
					}
				}
				if (req.body.ids_cajas_chicas) {
					for (const item of req.body.ids_cajas_chicas) {
						await CajaChica.update({
							id_comprobante: ComprobanteCreado.id
						}, { where: { id: { $in: req.body.ids_cajas_chicas } }, transaction: transaction })
					}
				}
				return new Promise((f, r) => { f(ComprobanteCreado) })
			}).then((result) => {
				/* let asientosActivos = req.body.asientosContables.reduce((accumulator, currentValue) => {
					return accumulator + (currentValue.eliminado ? 0 : 1)
				}, 0)
				if (result.length > 0 && result.length - 1 == asientosActivos) { */
				res.json({ mensaje: "Comprobante creado correctamente", comprobante: result })
				/* 	} else {
						res.json({ mensaje: "El proceso terminó correctamente, pero NO GUARDO correctamente los datos discrepan en el último control de conteo de asientos recibidos y guardados, se sugiere contactar con atención al cliente...", hasErr: true, stack: 'Error:La cantidad de datos recibidos y los guardados no coinciden.' })
					} */
			}).catch((err) => {
				res.json({ hasErr: true, mensaje: err.mensaje, stack: err.stack ? err.stack : "" })
			})
			/* } else {
				res.json({ hasErr: true, mensaje: 'No se puede crear un comprobante con fecha posterior a la actual.', stack: 'No se puede crear un comprobante con fecha posterior a la actual.' })
			} */
		})

	router.route('/comprobante-contabolidad/:id_comprobante')
		.post(ensureAuthorizedlogged, function (req, res) {
			sequelize.transaction(async (t) => {
				await ComprobanteContabilidad.update({
					eliminado: true
				}, {
					where: { id: req.params.id_comprobante }, transaction: t
				})
				let AsientosContablesAntiguos = await AsientoContabilidad.findAll({
					include: [{
						model: ContabilidadCuenta, as: 'cuenta'
					}], where: {
						id_comprobante: req.params.id_comprobante,
						eliminado: false
					},
					transaction: t
				}).catch(err => new Promise((f, r) => r({ mensaje: err.stack ? err.stack : err, hasErr: true })))
				for (let index = 0; index < AsientosContablesAntiguos.length; index++) {
					let asientoContableAntiguo = AsientosContablesAntiguos[index];
					await actualizarDebeHaberCuenta(asientoContableAntiguo, t, "resta")
				}
			}).then((result) => {
				res.json({ mensaje: "eliminado satisfactoriamente!" })
			}).catch((err) => {
				res.json({ hasErr: true, mensaje: err.stack })
			})


		})
		.put(ensureAuthorizedlogged, function (req, res) {
			sequelize.transaction(async (t) => {
				const sucursalEnc = await Sucursal.find({
					where: {
						id: req.body.id_sucursal.id
					},
					transaction: t
				})
				if (sucursalEnc && !sucursalEnc.activo) throw new Error('Sucursal ' + sucursalEnc.nombre, ' está deshabilitada, no se pueden hacer cambios.')
				await ComprobanteContabilidad.update({
					id_tipo: req.body.tipoComprobante.id,
					fecha: req.body.fecha,
					id_sucursal: req.body.id_sucursal.id,
					gloza: req.body.gloza,
					id_usuario: req.body.id_usuario,
					importe: req.body.importe,
					id_tipo_cambio: req.body.tipoCambio.id,
					abierto: req.body.abierto
				}, {
					where: {
						id: req.body.id
					},
					transaction: t
				}).catch(err => new Promise((f, r) => r({ mensaje: 'Se intentó actualizar pero NO se actualizó el registro de comprobante.', hasErr: true })))
				let AsientosContablesAntiguos = await AsientoContabilidad.findAll({
					include: [{
						model: ContabilidadCuenta, as: 'cuenta'
					}], where: {
						id_comprobante: req.params.id_comprobante
					},
					transaction: t
				}).catch(err => new Promise((f, r) => r({ mensaje: err.stack ? err.stack : err, hasErr: true })))
				for (let index = 0; index < AsientosContablesAntiguos.length; index++) {
					let asientoContableAntiguo = AsientosContablesAntiguos[index];
					await actualizarDebeHaberCuenta(asientoContableAntiguo, t, "resta")
				}
				for (let index = 0; index < req.body.asientosContables.length; index++) {
					let asientoContable = req.body.asientosContables[index];
					if (asientoContable.eliminado != true && asientoContable.cuenta != "") {
						if (asientoContable.debe_bs == null) {
							asientoContable.debe_bs = "0";
						}
						if (asientoContable.debe_sus == null) {
							asientoContable.debe_sus = "0";
						}
						if (asientoContable.haber_bs == null) {
							asientoContable.haber_bs = "0";
						}
						if (asientoContable.haber_sus == null) {
							asientoContable.haber_sus = "0";
						}
						var idCentroCosto = null
						if (asientoContable.centroCosto) {
							idCentroCosto = asientoContable.centroCosto.id
						}
						if (asientoContable.id) {
							await AsientoContabilidad.update({
								id_cuenta: asientoContable.cuenta.id,
								glosa: asientoContable.glosa,
								debe_bs: parseFloat(asientoContable.debe_bs),
								haber_bs: parseFloat(asientoContable.haber_bs),
								debe_sus: parseFloat(asientoContable.debe_sus),
								haber_sus: parseFloat(asientoContable.haber_sus),
								eliminado: asientoContable.eliminado
							}, {
								where: {
									id: asientoContable.id
								},
								transaction: t
							}).catch(err => new Promise((f, r) => r({ mensaje: err.stack ? err.stack : err, hasErr: true })))
							if (asientoContable.centroCosto) {
								if (asientoContable.centroCosto.length > 0) {
									await AsientoContabilidadCentroCosto.destroy({
										where: { id_asiento_contabilidad: asientoContable.id },
										transaction: t
									}).catch(err => new Promise((f, r) => r({ mensaje: err.stack ? err.stack : err, hasErr: true })))
									for (let i = 0; i < asientoContable.centroCosto.length; i++) {
										let cc = asientoContable.centroCosto[i];
										await AsientoContabilidadCentroCosto.create({
											id_asiento_contabilidad: asientoContable.id,
											id_centro_costo: cc.id
										}, { transaction: t }).catch(err => new Promise((f, r) =>
											r({ mensaje: err.stack ? err.stack : err, hasErr: true })))
									}
								}
							}
							if (asientoContable.cuentaAux) {
								await crearCuentaAuxiliarNUEVAFUNCION(asientoContable, t)
							}
							if (asientoContable.lc_comp_compra) {
								if (asientoContable.lc_comp_compra.asignado) {
									let idProveedor = asientoContable.lc_comp_compra.proveedor.id
									if (!idProveedor) {
										let proveedorCreado = await Proveedor.create({
											id_empresa: req.body.id_sucursal.id_empresa,
											razon_social: asientoContable.lc_comp_compra.proveedor.razon_social,
											nit: asientoContable.lc_comp_compra.proveedor.nit,
											estado: "V"
										}, {
											transaction: t
										}).catch(err => {
											new Promise((f, r) =>
												r({ mensaje: err.stack ? err.stack : err, hasErr: true }))
										})
										idProveedor = proveedorCreado.id
									}
									if (asientoContable.lc_comp_compra.id) {
										await Compra.update({
											id_almacen: asientoContable.cuenta.id_almacen_lc,
											contabilizado: true,
											id_asiento_contabilidad: asientoContable.id,
											id_proveedor: idProveedor,
											factura: asientoContable.lc_comp_compra.factura,
											autorizacion: asientoContable.lc_comp_compra.autorizacion,
											fecha: asientoContable.lc_comp_compra.fecha2,
											codigo_control: asientoContable.lc_comp_compra.codigo_control,
											importe: asientoContable.lc_comp_compra.importe ? asientoContable.lc_comp_compra.importe : 0,
											descuento_general: asientoContable.lc_comp_compra.descuento_general,
											descuento: asientoContable.lc_comp_compra.descuento,
											recargo: asientoContable.lc_comp_compra.recargo,
											ice: asientoContable.lc_comp_compra.ice,
											excento: asientoContable.lc_comp_compra.excento,
											tipo_descuento: asientoContable.lc_comp_compra.tipo_descuento,
											tipo_recargo: asientoContable.lc_comp_compra.tipo_recargo,
											total: asientoContable.lc_comp_compra.total ? asientoContable.lc_comp_compra.total : 0,
											observacion: asientoContable.lc_comp_compra.observacion,
											id_usuario: req.body.id_usuario,
											descuento_gasolina: asientoContable.lc_comp_compra.descuento_gasolina
										}, {
											transaction: t, where: { id: asientoContable.lc_comp_compra.id }
										}).catch((err) => new Promise((f, r) => {
											r({ mensaje: "ERROR al crear asignación de la compra a los asientos contrables.", stack: err.message })
										}))
									} else {
										const tipoMovimiento = await Tipo.find({
											where: { nombre_corto: 'MOVING' }, transaction: t
										}).catch(err => {
											return new Promise((f, r) =>
												r({ mensaje: err.stack ? err.stack : err, hasErr: true }))
										})
										const conceptoMovimiento = await Clase.find({
											where: { nombre_corto: 'IC', id_tipo: tipoMovimiento.id }, transaction: t
										}).catch(err => {
											return new Promise((f, r) =>
												r({ mensaje: err.stack ? err.stack : err, hasErr: true }))
										})
										const movimientoCreado = await Movimiento.create({
											id_tipo: tipoMovimiento.id,
											id_clase: conceptoMovimiento.id,
											fecha: asientoContable.lc_comp_compra.fecha2,
										}, { transaction: t })
										await Compra.create({
											id_almacen: asientoContable.cuenta.id_almacen_lc,
											id_movimiento: movimientoCreado.id,
											contabilizado: true,
											id_asiento_contabilidad: asientoContable.id,
											id_proveedor: idProveedor,
											factura: asientoContable.lc_comp_compra.factura,
											autorizacion: asientoContable.lc_comp_compra.autorizacion,
											fecha: asientoContable.lc_comp_compra.fecha2,
											codigo_control: asientoContable.lc_comp_compra.codigo_control,
											importe: asientoContable.lc_comp_compra.importe ? asientoContable.lc_comp_compra.importe : 0,
											descuento_general: asientoContable.lc_comp_compra.descuento_general,
											descuento: asientoContable.lc_comp_compra.descuento,
											recargo: asientoContable.lc_comp_compra.recargo,
											ice: asientoContable.lc_comp_compra.ice,
											excento: asientoContable.lc_comp_compra.excento,
											tipo_descuento: asientoContable.lc_comp_compra.tipo_descuento,
											tipo_recargo: asientoContable.lc_comp_compra.tipo_recargo,
											total: asientoContable.lc_comp_compra.total ? asientoContable.lc_comp_compra.total : 0,
											observacion: asientoContable.lc_comp_compra.observacion,
											id_usuario: req.body.id_usuario,
											descuento_gasolina: asientoContable.lc_comp_compra.descuento_gasolina
										}, {
											transaction: t
										}).catch((err) => new Promise((f, r) => {
											r({ mensaje: "ERROR al crear asignación de la compra a los asientos contrables.", stack: err.message })
										}))
									}
								} else if (asientoContable.lc_comp_compra.eliminado) {
									// await Compra.destroy({
									// 	transaction: t, where: { id: asientoContable.lc_comp_compra.id }
									// }).catch((err) => new Promise((f, r) => {
									// 	r({ mensaje: "ERROR al crear asignación de la compra a los asientos contrables.", stack: err.message })
									// }))
								}
							}
						} else {
							const asientroCreado = await AsientoContabilidad.create({
								id_cuenta: asientoContable.cuenta.id,
								id_comprobante: req.body.id,
								glosa: asientoContable.glosa,
								debe_bs: parseFloat(asientoContable.debe_bs),
								haber_bs: parseFloat(asientoContable.haber_bs),
								debe_sus: parseFloat(asientoContable.debe_sus),
								haber_sus: parseFloat(asientoContable.haber_sus),
								eliminado: asientoContable.eliminado,
							}, { transaction: t }).catch(err => new Promise((f, r) => r({ mensaje: err.stack ? err.stack : err, hasErr: true })))
							if (asientoContable.centroCosto) {
								if (asientoContable.centroCosto.length > 0) {
									for (let i = 0; i < asientoContable.centroCosto.length; i++) {
										let cc = asientoContable.centroCosto[i];
										await AsientoContabilidadCentroCosto.create({
											id_asiento_contabilidad: asientroCreado.id,
											id_centro_costo: cc.id
										}, { transaction: t }).catch(err => new Promise((f, r) => r({ mensaje: err.stack ? err.stack : err, hasErr: true })))
									}
								}
							}
							if (asientoContable.cuentaAux) {
								await crearCuentaAuxiliarNUEVAFUNCION(asientoContable, t, asientroCreado)
							}
						}
						await actualizarDebeHaberCuenta(asientoContable, t, "suma")

					} else {
						await AsientoContabilidad.update({
							eliminado: asientoContable.eliminado,
						}, {
							where: {
								id: asientoContable.id
							}
						}, { transaction: t }).catch(err => new Promise((f, r) => r({ mensaje: err.stack ? err.stack : err, hasErr: true })))
						await actualizarDebeHaberCuenta(asientoContable, t, "resta")
					}
				}
			}).then((result) => {
				res.json({ mensaje: 'Actualizado satisfactoriamente.' })
			}).catch((err) => {
				res.json({ hasErr: true, mensaje: err.stack })
			})
		})
		.get(ensureAuthorizedlogged, function (req, res) {
			ComprobanteContabilidad.find({
				where: { id: req.params.id_comprobante },
				include: [{ model: MonedaTipoCambio, as: 'tipoCambio' }, {
					model: AsientoContabilidad, as: 'asientosContables', where: { eliminado: false }, include: [{ model: Compra, as: 'lc_comp_compra' }, { model: ContabilidadCuentaAuxiliar, as: 'cuentaAux', required: false }, {
						model: ContabilidadCuenta, as: 'cuenta', required: false, include: [{ model: Clase, as: 'tipoAuxiliar', required: false },
						{
							model: Clase, as: 'especificaTexto1'
						},
						{
							model: Clase, as: 'especificaTexto2'
						},
						{
							model: Clase, as: 'especificaTexto3'
						}]
					}, {
						model: AsientoContabilidadCentroCosto, as: 'centrosCostos', required: false, include: [{ model: Clase, as: 'centroCosto' }]
					}]
				}, { model: Clase, as: 'tipoComprobante' }],

			}).then(function (comprobante) {
				if (comprobante) {
					var importeLiteral = NumeroLiteral.Convertir(parseFloat(comprobante.importe).toFixed(2).toString());
					res.json({ comprobante: comprobante, importeLiteral: importeLiteral, hasError: false });
				}else{
					res.json({ mensaje: 'El Comprobante no tiene Asientos', hasError: true });
				}
				
			});
		})
	async function actualizarDebeHaberCuenta(asientoContable, t, tipo) {
		let CuentaEncontrada = await ContabilidadCuenta.find({
			where: { id: asientoContable.cuenta.id },
			transaction: t
		}).catch((err) => {
			new Promise((f, r) => r({ mensaje: "ERROR al buscar la cuenta: '" + asientoContable.cuenta.nombre + "'", hasErr: true, stack: err.stack }))
		})
		CuentaEncontrada.debe = (CuentaEncontrada.debe == null) ? 0 : CuentaEncontrada.debe;
		CuentaEncontrada.haber = (CuentaEncontrada.haber == null) ? 0 : CuentaEncontrada.haber;
		if (tipo === "suma") {
			CuentaEncontrada.debe += parseFloat(asientoContable.debe_bs)
			CuentaEncontrada.haber += parseFloat(asientoContable.haber_bs)
		} else if (tipo === "resta") {
			CuentaEncontrada.debe -= parseFloat(asientoContable.debe_bs)
			CuentaEncontrada.haber -= parseFloat(asientoContable.haber_bs)
		}

		if (CuentaEncontrada.debe > CuentaEncontrada.haber) {
			CuentaEncontrada.saldo = CuentaEncontrada.debe - CuentaEncontrada.haber
		} else {
			CuentaEncontrada.saldo = CuentaEncontrada.haber - CuentaEncontrada.debe
		}
		await ContabilidadCuenta.update({
			debe: CuentaEncontrada.debe,
			haber: CuentaEncontrada.haber,
			saldo: CuentaEncontrada.saldo
		}, {
			where: { id: asientoContable.cuenta.id },
			transaction: t
		}).catch((err) => {
			new Promise((f, r) => r({ mensaje: "ERROR al actualizar la cuenta: '" + asientoContable.cuenta.nombre + "'", hasErr: true, stack: err.stack }))
		})
	}
	function crearCuentaAuxiliar(asientoContable, ContabilidadCuentaAuxiliarres, index, array, asientoCreado) {
		if (asientoCreado) {
			asientoContable.id = asientoCreado.id
		}
		if (asientoContable.cuentaAux.id) {
			ContabilidadCuentaAuxiliar.update({
				debe: asientoContable.cuentaAux.debe,
				haber: asientoContable.cuentaAux.haber,
				saldo: asientoContable.cuentaAux.saldo,
				descripcion: asientoContable.cuentaAux.nombre,
				nombre: asientoContable.cuentaAux.nombre,
				id_cuenta: asientoContable.cuenta.id,
				id_asiento: asientoContable.id
			}, {
				where: { id: asientoContable.cuentaAux.id }
			})
		} else {
			ContabilidadCuentaAuxiliar.create({
				debe: asientoContable.cuentaAux.debe,
				haber: asientoContable.cuentaAux.haber,
				saldo: asientoContable.cuentaAux.saldo,
				descripcion: asientoContable.cuentaAux.nombre,
				nombre: asientoContable.cuentaAux.nombre,
				id_cuenta: asientoContable.cuenta.id,
				id_asiento: asientoContable.id
			}).then(function (cuentaAuxCreate) {
				if (index === (array.length - 1)) {
					res.json({ mensaje: "¡Comprobante actualizado satisfactoriamente!" });
				}
			})
		}
	}
	//NUEVA FUNCION PARA PODER UTILIZAR TRANSACCIONES, DISPUESTA PARA LA ACTUALIZACIÓN DE EDICIÓN EN COMPROBANTES
	async function crearCuentaAuxiliarNUEVAFUNCION(asientoContable, transaction, asientoCreado) {
		if (asientoCreado) {
			asientoContable.id = asientoCreado.id
		}
		if (asientoContable.cuentaAux.id) {
			return await ContabilidadCuentaAuxiliar.update({
				debe: asientoContable.cuentaAux.debe,
				haber: asientoContable.cuentaAux.haber,
				saldo: asientoContable.cuentaAux.saldo,
				descripcion: asientoContable.cuentaAux.nombre,
				nombre: asientoContable.cuentaAux.nombre,
				id_cuenta: asientoContable.cuenta.id,
				id_asiento: asientoContable.id
			}, {
				where: { id: asientoContable.cuentaAux.id },
				transaction: transaction
			})
		} else {
			return await ContabilidadCuentaAuxiliar.create({
				debe: asientoContable.cuentaAux.debe,
				haber: asientoContable.cuentaAux.haber,
				saldo: asientoContable.cuentaAux.saldo,
				descripcion: asientoContable.cuentaAux.nombre,
				nombre: asientoContable.cuentaAux.nombre,
				id_cuenta: asientoContable.cuenta.id,
				id_asiento: asientoContable.id
			}, { transaction: transaction })
		}
	}
	function fechaATextoFitro(fecha) {
		fech = new Date(fecha)
		var mes = (fech.getMonth() + 1)
		if (mes < 10) {
			mes = "0" + mes
		}
		var dia = fech.getDate()
		if (dia < 10) {
			dia = "0" + dia
		}
		fecha = fech.getFullYear() + "-" + mes + "-" + dia;
		return fecha

	}
	// arreglar compra comprobantes borrar luego de usar 
	router.route('/arreglar-movimiento-compra-comprobante-contabolidad/:id_almacen')
		.post(function (req, res) {
			sequelize.transaction(async function (transaction) {
				const compras = await Compra.findAll({
					where: {
						id_almacen: req.params.id_almacen, id_movimiento: null, fecha: {
							$between: ['2020-06-01 00:00:00', '2020-09-29 23:59:59']
						},
						include: [
							{
								model: Sucursal, as: 'Sucursal', attributes: ['id', 'nombre', 'activo']
							}
						]
					}, transaction: transaction
				})
				for (const compra of compras) {
					if (!compra.sucursal.activo) throw new Error('Sucursal ' + compra.sucursal.nombre + ' está deshabilitada, no se pueden hacer cambios.')
					const tipoMovimiento = await Tipo.find({
						where: { nombre_corto: 'MOVING' }, transaction: transaction
					})
					const conceptoMovimiento = await Clase.find({
						where: { nombre_corto: 'IC', id_tipo: tipoMovimiento.id }, transaction: transaction
					})
					const movimientoCreado = await Movimiento.create({
						id_tipo: tipoMovimiento.id,
						id_clase: conceptoMovimiento.id,
						fecha: compra.fecha
					}, { transaction: transaction })
					await Compra.update({
						id_movimiento: movimientoCreado.id,
					}, {
						where: { id: compra.id },
						transaction: transaction
					})
				}

			}).then((result) => {
				res.json({ mensaje: "Movimientos asignados a compras comprobante satisfactoriamente!" })
			}).catch((err) => {
				res.json({ hasErr: true, mensaje: err.stack ? err.stack : err })
			})
		})

	router.route('/comprobante-cuenta/asientos/saldos')
		.post(async function (req, res) {
			sequelize.transaction((t) => {
				return ContabilidadCuenta.findAll({
					include: [
						{
							model: ClasificacionCuenta, as: "clasificacion",
							include: [{ model: Clase, as: 'saldo' }, { model: Clase, as: 'movimiento' }]
						},
						{
							model: Clase, as: 'tipoCuenta'
						},
						{
							model: Clase, as: 'claseCalculo'
						}
					],
					transaction: t
				}).then((cuentas) => {
					const promesas = [];
					for (let index = 0; index < cuentas.length; index++) {
						promesas.push(AsientoContabilidad.findAll({
							where: {
								id_cuenta: cuentas[index].id,
								eliminado: false
							},
							include: [{
								model: ContabilidadCuenta, as: 'cuenta', include: [
									{
										model: ClasificacionCuenta, as: "clasificacion",
										include: [{ model: Clase, as: 'saldo' }, { model: Clase, as: 'movimiento' }]
									},
									{
										model: Clase, as: 'tipoCuenta'
									},
									{
										model: Clase, as: 'claseCalculo'
									}
								]
							},
							{
								model: ComprobanteContabilidad, as: 'comprobante', include: [{ model: Clase, as: 'tipoComprobante' }]
							}],
							order: sequelize.literal('id asc'),
							transaction: t
						}).then((asientos) => {
							const promasiento = []
							let total_cuenta_bs = 0;
							let total_cuenta_sus = 0;
							for (let aindex = 0; aindex < asientos.length; aindex++) {
								let saldo_cuenta_bs = 0;
								let saldo_cuenta_sus = 0;
								if (cuentas[index].clasificacion.nombre === "Activo") {
									saldo_cuenta_bs = total_cuenta_bs + asientos[aindex].debe_bs - asientos[aindex].haber_bs;
									saldo_cuenta_sus = total_cuenta_sus + asientos[aindex].debe_sus - asientos[aindex].haber_sus;
								} else if (cuentas[index].clasificacion.nombre === "Pasivo") {
									saldo_cuenta_bs = total_cuenta_bs - asientos[aindex].haber_bs + asientos[aindex].debe_bs;
									saldo_cuenta_sus = total_cuenta_sus - asientos[aindex].haber_sus + asientos[aindex].debe_sus;
								}
								total_cuenta_bs += saldo_cuenta_bs;
								total_cuenta_sus += saldo_cuenta_sus;
								promasiento.push(AsientoContabilidad.update({
									saldo_cuenta_bs: saldo_cuenta_bs,
									saldo_cuenta_sus: saldo_cuenta_sus
								}, {
									where: {
										id: asientos[aindex].id
									},
									transaction: t
								}))
							}
							return Promise.all(promasiento)
						}).catch((err) => {
							throw new error(err)
						}))
					}
					return Promise.all(promesas)
				}).catch((err) => {
					throw new error(err)
				})
			}).then((result) => {
				res.json(result)
			}).catch((err) => {
				res.json(err)
			})
		})

	router.route('/comprobante-area/empresa/:id_empresa')
		.post(function (req, res) {
			for (let index = 0; index < req.body.areasCentroCostos.length; index++) {
				const area = req.body.areasCentroCostos[index];
				if (!area.id) {
					AreaCostos.create({ id_empresa: req.params.id_empresa, nombre: area.nombre, descripcion: area.descripcion });
				}
				else {
					AreaCostos.update({ nombre: area.nombre, descripcion: area.descripcion }, {
						where: {
							id: area.id
						}
					});
				}
			}
			res.json({ mensaje: "Se registro Correctamente" })
			/* AreaCostos.create({id_empresa:req.body.id_empresa, nombre:req.body.nombre, descripcion:req.body.descripcion}); */
		})
		.get(function (req, res) {
			AreaCostos.findAll({
				where: {
					id_empresa: req.params.id_empresa,
					eliminado: false
				}
			})
				.then(function (listaAreasCostos) {
					res.json({ listaAreasCostos: listaAreasCostos })
				})
		})

	router.route('/comprobante-area-costo/eliminar')
		.post(function (req, res) {
			AreaCostos.update({ eliminado: true }, {
				where: {
					id: req.body.id
				}
			}).then(function (eliminado) {
				res.json({ mensaje: "Se Elimino el Registro" })
			});

		})


	router.route('/comprobante-CentroCosto/empresa/:id_empresaa')
		.get(function (req, res) {
			Clase.findAll({
				include: [{
					model: Tipo, as: "tipo", where: {
						id_empresa: req.params.id_empresaa,
						nombre_corto: "CENCOS"
					}
				}],
				where: {
					eliminado: false,
					habilitado: true
				}
			})
				.then(function (listaCentroCostos) {
					res.json({ listaCentroCostos: listaCentroCostos })
				})
		})

	router.route('/comprobante-areaCentroCostos/empresa/:id_empresaa/cencos/:id_cencos')
		.get(function (req, res) {
			var condicion = { eliminado: false };
			if (req.params.id_cencos != 0) {
				condicion.id_centro_costos = req.params.id_cencos
			}
			ComprobanteCentroCostos.findAll({
				include: [
					{
						model: AreaCostos, as: 'area_costo', where: {
							id_empresa: req.params.id_empresaa
						}
					},
					{ model: Clase, as: 'centro_costo' }
				],
				where: condicion
			})
				.then(function (listaDetallCentroCostos) {
					res.json({ listaDetallCentroCostos: listaDetallCentroCostos })
				})
		})
	router.route('/comprobante-centro-costo')
		.post(function (req, res) {
			ComprobanteCentroCostos.create({ id_centro_costos: req.body.centroCostoss.id, id_area_costos: req.body.areaCosto.id, descripcion: req.body.descripcion })
				.then(function () {
					res.json({ mensaje: "Se registro Correctamente" })
				})
		})
	router.route('/comprobante-centro-costoModif')
		.post(function (req, res) {
			ComprobanteCentroCostos.update({ id_centro_costos: req.body.centroCostoss.id, id_area_costos: req.body.areaCosto.id, descripcion: req.body.descripcion }, {
				where: {
					id: req.body.id
				}
			}).then(function (modifidado) {
				res.json({ mensaje: "Registro Modificado" })
			});

		})
	router.route('/comprobante-centro-costo/eliminar')
		.post(function (req, res) {
			ComprobanteCentroCostos.update({ eliminado: true }, {
				where: {
					id: req.body.id
				}
			}).then(function (eliminado) {
				res.json({ mensaje: "Se Elimino el Registro" })
			});
		})

	router.route('/comprobante-centro-costo/tik')
		.post(function (req, res) {
			ComprobanteCentroCostos.update({ prorrateo: req.body.prorrateo }, {
				where: {
					id: req.body.id
				}
			}).then(function (eliminado) {
				res.json({ mensaje: "Registro Modificado" })
			});
		})


	router.route('/lista-centro-costos-tablas/empresa/:id_empresa/gestion/:gestion/mes/:mes')
		.get(ensureAuthorizedlogged, function (req, res) {
			var primerDiaMes = ''
			var ultimoDiaMes = ''
			if (req.params.gestion && req.params.mes != 0) {

				var mes = new Date(req.params.gestion, parseInt(req.params.mes), 0);
				primerDia = new Date(Date.UTC(req.params.gestion, parseInt(req.params.mes) - 1, 1, 0, 0, 0));
				ultimoDiaUtc = new Date(Date.UTC(req.params.gestion, parseInt(req.params.mes) - 1, mes.getDate(), 23, 59, 59));
				// === corregir fecha formato
				// var ultimoDiaMes= ultimoDia.toLocaleString();
				primerDiaMes = primerDia.toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2');
				ultimoDiaMes = ultimoDiaUtc.toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2');
			} else {
				primerDiaMes = req.params.gestion + '-01-01 00:00:00'
				ultimoDiaMes = req.params.gestion + '-12-31 23:59:59'
			}

			sequelize.query(
				"SELECT\
				DISTINCT joinCuenta_Padre.nombreCuentaPadre AS nombreCuentaPadreJ,\
				joinCuenta_Grupo.nombreCuentaGrupo AS nombreCuentaGrupoJ,\
				joinCuenta_subGrupo.nombreCuentaSubGrupo AS nombreCuentaSubGrupoJ,\
				`agil_asiento_contabilidad`.`id` AS id,\
				`agil_asiento_contabilidad`.`debe_bs` AS debe_bs,\
				`agil_asiento_contabilidad`.`haber_bs` AS haber_bs,\
				`agil_asiento_contabilidad`.`debe_sus` AS debe_sus,\
				`agil_asiento_contabilidad`.`haber_sus` AS haber_sus,\
				`agil_asiento_contabilidad`.`glosa` AS gloza,\
				`cuenta`.`codigo` AS codigo_cuenta,\
				`cuenta`.`nombre` AS nombre_cuenta,\
				`comprobante`.`numero` AS `numero_comprobante`,\
				`comprobante`.`fecha` AS `fecha_comprobante`,\
				`comprobante`.`gloza` AS `gloza_comprobante`,\
				`comprobante`.`eliminado` AS `eliminado`,\
				`comprobante.tipoComprobante`.`nombre` AS `tipo_comprobante`,\
				`centro_costo`.`nombre` AS `nombre_centro_costos`,\
				`centro_costo`.`nombre_corto` AS `numero_centro_costo`,\
				`contabilidad_cuenta_auxiliar`.`nombre` AS `nombre_cuenta_auxiliar`,\
				`comprobante.sucursal`.`nombre` AS `nombre_sucursal`,\
				`area_costo`.`nombre` AS `nombre_area`,\
				clasificac_cuenta.nombre AS clasif_cuenta,\
				clasif_movimient.nombre AS clasif_nombre_mov\
			FROM\
				`agil_asiento_contabilidad` AS `agil_asiento_contabilidad`\
				LEFT OUTER JOIN `agil_contabilidad_cuenta` AS `cuenta` ON `agil_asiento_contabilidad`.`cuenta` = `cuenta`.`id`\
				LEFT JOIN agil_comprobante_contabilidad AS `comprobante` ON `agil_asiento_contabilidad`.`comprobante` = `comprobante`.`id`\
				LEFT OUTER JOIN `gl_clase` AS `comprobante.tipoComprobante` ON `comprobante`.`tipo` = `comprobante.tipoComprobante`.`id`\
				LEFT OUTER JOIN `agil_sucursal` AS `comprobante.sucursal` ON `comprobante`.`sucursal` = `comprobante.sucursal`.`id`\
				INNER JOIN agil_contabilidad_clasificacion_cuenta AS clasificac_cuenta ON cuenta.clasificacion = clasificac_cuenta.id\
				LEFT OUTER JOIN `gl_clase` AS clasif_movimient ON clasificac_cuenta.movimiento = clasif_movimient.id\
				INNER JOIN `agil_empresa` AS `comprobante.sucursal.empresa` ON `comprobante.sucursal`.`empresa` = `comprobante.sucursal.empresa`.`id` AND `comprobante.sucursal.empresa`.`id` = " + req.params.id_empresa + " and `comprobante`.`fecha`  BETWEEN '" + primerDiaMes + "' AND '" + ultimoDiaMes + "'\
				LEFT JOIN agil_contabilidad_cuenta_auxiliar AS `contabilidad_cuenta_auxiliar` ON `agil_asiento_contabilidad`.`id` = `contabilidad_cuenta_auxiliar`.`asiento`\
				LEFT JOIN agil_asiento_contabilidad_centro_costo AS `contabilidad_centro_costo` ON `contabilidad_centro_costo`.`id` =(SELECT agil_asiento_contabilidad_centro_costo.id FROM agil_asiento_contabilidad_centro_costo WHERE agil_asiento_contabilidad_centro_costo.asiento_contabilidad = agil_asiento_contabilidad.id ORDER BY id ASC LIMIT 1)\
				LEFT JOIN `gl_clase` AS `centro_costo` ON `contabilidad_centro_costo`.`centro_costo` = `centro_costo`.`id`AND centro_costo.eliminado = FALSE\
				LEFT JOIN `agil_comprobante_centro_costos` AS `comprob_centro_costos` ON `contabilidad_centro_costo`.`centro_costo`=`comprob_centro_costos`.`id_centro_costos`AND `comprob_centro_costos`.`eliminado` = FALSE\
				LEFT JOIN `agil_area_costos` AS area_costo ON `comprob_centro_costos`.`id_area_costos` = `area_costo`.`id` AND area_costo.eliminado= FALSE\
				INNER JOIN (SELECT nombre as nombreCuentaSubGrupo, id as idCuentaSubGrupo FROM agil_contabilidad_cuenta) AS joinCuenta_subGrupo ON joinCuenta_subGrupo.idCuentaSubGrupo=cuenta.cuenta_padre\
				INNER JOIN (SELECT nombre AS nombreCuentaGrupo, id AS idCuentaGrupo FROM agil_contabilidad_cuenta) AS joinCuenta_Grupo ON joinCuenta_Grupo.idCuentaGrupo = (SELECT cuenta_padre FROM agil_contabilidad_cuenta WHERE id=cuenta.cuenta_padre)\
				INNER JOIN (SELECT nombre AS nombreCuentaPadre, id AS idCuentaPadre FROM agil_contabilidad_cuenta) AS joinCuenta_Padre ON joinCuenta_Padre.idCuentaPadre = (SELECT cuenta_padre FROM agil_contabilidad_cuenta WHERE  id =(SELECT cuenta_padre FROM agil_contabilidad_cuenta WHERE id=cuenta.cuenta_padre))\
			WHERE\
			 `agil_asiento_contabilidad`.`eliminado` = FALSE \
			ORDER BY\
			`comprobante`.`numero` ASC;", {
				type: sequelize.QueryTypes.SELECT
			}).then(function (result) {
				res.json({ asientos: result })
			}).catch(function (err) {
				res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
			});
		})



	router.route('/lista-proformas-tablas/empresa/:id_empresa/gestion/:gestion/mes/:mes')
		.get(ensureAuthorizedlogged, function (req, res) {
			var mes = ''
			if (req.params.mes != 0) {
				mes = (req.params.mes) - 1
			} else {
				mes = req.params.mes + '0,1,2,3,4,5,6,7,8,9,10,11'
			}

			sequelize.query(
				"SELECT\
				DISTINCT detalleProforma.id AS id_detalleProforma,\
					detalleProforma.importe AS importe_detalleProforma,\
					detalleProforma.centro_costo AS id_centroCosto_proforma,\
					proforma.empresa AS empresa_proforma,\
					proforma.fecha_proforma AS fecha_proforma,\
					proforma.periodo_mes AS periodoMes_proforma,\
					proforma.periodo_anio AS periodoAnio_proforma,\
					centro_costo.id AS id_centro_costo,\
					centro_costo.nombre as nombre_centroCosto,\
					area_costo.nombre AS nombre_areaCosto,\
					cliente.razon_social AS nombre_cliente,\
					cliente.nit AS nit_cliente,\
					proforma.correlativo AS numero_proforma,\
					proforma.eliminado AS estado_proforma,\
					proforma.factura AS nroFactura_proforma,\
					act_proforma.nombre AS nombreActividad_proforma,\
					serv_proforma.nombre AS nombreServicio_servicio\
				FROM\
					agil_detalle_proforma AS detalleProforma\
					LEFT JOIN agil_proforma AS proforma ON detalleProforma.proforma = proforma.id\
					LEFT JOIN gl_clase AS centro_costo ON detalleProforma.centro_costo = centro_costo.id AND centro_costo.eliminado=FALSE\
					LEFT JOIN agil_comprobante_centro_costos AS comp_centro ON centro_costo.id = comp_centro.id_centro_costos AND comp_centro.eliminado=FALSE\
					LEFT JOIN agil_area_costos AS area_costo ON comp_centro.id_area_costos = area_costo.id AND area_costo.eliminado=FALSE\
					LEFT JOIN agil_cliente AS cliente ON proforma.cliente = cliente.id\
					INNER JOIN gl_clase AS act_proforma ON proforma.actividad = act_proforma.id\
					INNER JOIN agil_servicio AS serv_proforma ON detalleProforma.servicio =serv_proforma.id\
			 WHERE\
			  		proforma.empresa = " + req.params.id_empresa + "\
					AND proforma.periodo_mes IN ("+ mes + ")\
					AND proforma.periodo_anio = "+ req.params.gestion + "\
			ORDER BY\
					proforma.periodo_mes ASC;"

				, {
					type: sequelize.QueryTypes.SELECT
				}).then(function (result) {
					res.json({ asientos: result })
				}).catch(function (err) {
					res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
				});
		})

	router.route('/lista-costos-tablas/empresa/:id_empresa/gestion/:gestion/mes/:mes')
		.get(ensureAuthorizedlogged, function (req, res) {
			var mes = ''
			if (req.params.mes != 0) {
				mes = (req.params.mes) - 1
			} else {
				mes = req.params.mes + '0,1,2,3,4,5,6,7,8,9,10,11'
			}

			var anio = req.params.gestion

			if (req.params.gestion && req.params.mes == 0) {
				var fechaDesde = anio + "-" + 01 + "-" + 01 + " 00:00:00";
				var fechaHasta = anio + "-" + 12 + "-" + 31 + " 23:59:59";
			} else {
				var mess = req.params.mes

				let dias = new Date(req.params.gestion, mess, 0).getDate();
				var fechaDesde = anio + "-" + mess + "-" + 01 + " 00:00:00";
				var fechaHasta = anio + "-" + mess + "-" + dias + " 23:59:59";
			}
			sequelize.query(
				"SELECT\
				registros.nombreCuentaPadreJI AS nombreCuentaPadreJ,\
				registros.nombreCuentaGrupoJI AS nombreCuentaGrupoJ,\
				registros.nombreCuentaSubGrupoJI AS nombreCuentaSubGrupoJ,\
				registros.idI AS id,\
				registros.nombre_cuentaI AS nombre_cuenta,\
				registros.debe_bsI AS debe_bs,\
				registros.haber_bsI AS haber_bs,\
				registros.saldoI AS saldo,\
				registros.nombre_centro_costosI AS nombre_centro_costos,\
				registros.nombre_areaI AS nombre_area,\
				registros.fecha_comprobanteI AS periodo_mes\
				FROM(\
					SELECT DISTINCT\
						joinCuenta_Padre.nombreCuentaPadre AS nombreCuentaPadreJI,\
						joinCuenta_Grupo.nombreCuentaGrupo AS nombreCuentaGrupoJI,\
						joinCuenta_subGrupo.nombreCuentaSubGrupo AS nombreCuentaSubGrupoJI,\
						agil_asiento_contabilidad.id AS idI,\
						cuenta.nombre AS nombre_cuentaI,\
						agil_asiento_contabilidad.debe_bs AS debe_bsI,\
						agil_asiento_contabilidad.haber_bs AS haber_bsI,\
						agil_asiento_contabilidad.haber_bs - agil_asiento_contabilidad.debe_bs AS saldoI,\
						centro_costo.nombre AS nombre_centro_costosI,\
						area_costo.nombre AS nombre_areaI,\
						(MONTH(comprobante.fecha)-1) AS fecha_comprobanteI\
					FROM agil_asiento_contabilidad AS agil_asiento_contabilidad\
						LEFT OUTER JOIN agil_contabilidad_cuenta AS cuenta ON agil_asiento_contabilidad.cuenta = cuenta.id\
						LEFT JOIN agil_comprobante_contabilidad AS comprobante ON agil_asiento_contabilidad.comprobante = comprobante.id\
						LEFT OUTER JOIN gl_clase AS comprobante_tipoComprobante ON comprobante.tipo = comprobante_tipoComprobante.id\
						LEFT OUTER JOIN agil_sucursal AS comprobante_sucursal ON comprobante.sucursal = comprobante_sucursal.id\
						INNER JOIN agil_empresa AS comprobante_sucursal_empresa ON comprobante_sucursal.empresa = comprobante_sucursal_empresa.id AND comprobante.fecha  BETWEEN '"+ fechaDesde + "' AND '" + fechaHasta + "'\
						LEFT JOIN agil_contabilidad_cuenta_auxiliar AS contabilidad_cuenta_auxiliar ON agil_asiento_contabilidad.id = contabilidad_cuenta_auxiliar.asiento\
						LEFT JOIN agil_asiento_contabilidad_centro_costo AS contabilidad_centro_costo ON contabilidad_centro_costo.id =(SELECT agil_asiento_contabilidad_centro_costo.id FROM agil_asiento_contabilidad_centro_costo WHERE agil_asiento_contabilidad_centro_costo.asiento_contabilidad = agil_asiento_contabilidad.id \
						ORDER BY id ASC LIMIT 1 \
						)\
						LEFT JOIN gl_clase AS centro_costo ON contabilidad_centro_costo.centro_costo = centro_costo.id AND centro_costo.eliminado=FALSE\
						LEFT JOIN agil_comprobante_centro_costos AS comprob_centro_costos ON contabilidad_centro_costo.centro_costo=comprob_centro_costos.id_centro_costos AND comprob_centro_costos.eliminado = FALSE\
						LEFT JOIN agil_area_costos AS area_costo ON comprob_centro_costos.id_area_costos = area_costo.id AND area_costo.eliminado= FALSE\
						INNER JOIN (SELECT nombre as nombreCuentaSubGrupo, id as idCuentaSubGrupo FROM agil_contabilidad_cuenta) AS joinCuenta_subGrupo ON joinCuenta_subGrupo.idCuentaSubGrupo=cuenta.cuenta_padre\
						INNER JOIN (SELECT nombre AS nombreCuentaGrupo, id AS idCuentaGrupo FROM agil_contabilidad_cuenta) AS joinCuenta_Grupo ON joinCuenta_Grupo.idCuentaGrupo = (SELECT cuenta_padre FROM agil_contabilidad_cuenta WHERE id=cuenta.cuenta_padre)\
						INNER JOIN (SELECT nombre AS nombreCuentaPadre, id AS idCuentaPadre FROM agil_contabilidad_cuenta) AS joinCuenta_Padre ON joinCuenta_Padre.idCuentaPadre = (SELECT cuenta_padre FROM agil_contabilidad_cuenta WHERE  id =(SELECT cuenta_padre FROM agil_contabilidad_cuenta WHERE id=cuenta.cuenta_padre))\
					WHERE agil_asiento_contabilidad.eliminado = FALSE \
					AND comprobante_sucursal_empresa.id = " + req.params.id_empresa + "\
					AND joinCuenta_Padre.nombreCuentaPadre = 'INGRESOS'\
				UNION ALL\
					SELECT DISTINCT\
						joinCuenta_Padre.nombreCuentaPadre AS nombreCuentaPadreJG,\
						joinCuenta_Grupo.nombreCuentaGrupo AS nombreCuentaGrupoJG,\
						joinCuenta_subGrupo.nombreCuentaSubGrupo AS nombreCuentaSubGrupoJG,\
						agil_asiento_contabilidad.id AS idG,\
						cuenta.nombre AS nombre_cuentaG,\
						agil_asiento_contabilidad.debe_bs AS debe_bsG,\
						agil_asiento_contabilidad.haber_bs AS haber_bsG,\
						agil_asiento_contabilidad.haber_bs - agil_asiento_contabilidad.debe_bs AS saldoG,\
						centro_costo.nombre AS nombre_centro_costosG,\
						area_costo.nombre AS nombre_areaG,\
						(MONTH(comprobante.fecha)-1) AS fecha_comprobanteG\
					FROM agil_asiento_contabilidad AS agil_asiento_contabilidad\
						LEFT OUTER JOIN agil_contabilidad_cuenta AS cuenta ON agil_asiento_contabilidad.cuenta = cuenta.id\
						LEFT JOIN agil_comprobante_contabilidad AS comprobante ON agil_asiento_contabilidad.comprobante = comprobante.id\
						LEFT OUTER JOIN gl_clase AS comprobante_tipoComprobante ON comprobante.tipo = comprobante_tipoComprobante.id\
						LEFT OUTER JOIN agil_sucursal AS comprobante_sucursal ON comprobante.sucursal = comprobante_sucursal.id\
						INNER JOIN agil_empresa AS comprobante_sucursal_empresa ON comprobante_sucursal.empresa = comprobante_sucursal_empresa.id AND comprobante.fecha  BETWEEN '"+ fechaDesde + "' AND '" + fechaHasta + "'\
						LEFT JOIN agil_contabilidad_cuenta_auxiliar AS contabilidad_cuenta_auxiliar ON agil_asiento_contabilidad.id = contabilidad_cuenta_auxiliar.asiento\
						LEFT JOIN agil_asiento_contabilidad_centro_costo AS contabilidad_centro_costo ON contabilidad_centro_costo.id =(SELECT agil_asiento_contabilidad_centro_costo.id FROM agil_asiento_contabilidad_centro_costo WHERE agil_asiento_contabilidad_centro_costo.asiento_contabilidad = agil_asiento_contabilidad.id \
						ORDER BY id ASC LIMIT 1 \
						)\
						LEFT JOIN gl_clase AS centro_costo ON contabilidad_centro_costo.centro_costo = centro_costo.id AND centro_costo.eliminado=FALSE\
						LEFT JOIN agil_comprobante_centro_costos AS comprob_centro_costos ON contabilidad_centro_costo.centro_costo=comprob_centro_costos.id_centro_costos AND comprob_centro_costos.eliminado = FALSE\
						LEFT JOIN agil_area_costos AS area_costo ON comprob_centro_costos.id_area_costos = area_costo.id AND area_costo.eliminado= FALSE\
						INNER JOIN (SELECT nombre as nombreCuentaSubGrupo, id as idCuentaSubGrupo FROM agil_contabilidad_cuenta) AS joinCuenta_subGrupo ON joinCuenta_subGrupo.idCuentaSubGrupo=cuenta.cuenta_padre\
						INNER JOIN (SELECT nombre AS nombreCuentaGrupo, id AS idCuentaGrupo FROM agil_contabilidad_cuenta) AS joinCuenta_Grupo ON joinCuenta_Grupo.idCuentaGrupo = (SELECT cuenta_padre FROM agil_contabilidad_cuenta WHERE id=cuenta.cuenta_padre)\
						INNER JOIN (SELECT nombre AS nombreCuentaPadre, id AS idCuentaPadre FROM agil_contabilidad_cuenta) AS joinCuenta_Padre ON joinCuenta_Padre.idCuentaPadre = (SELECT cuenta_padre FROM agil_contabilidad_cuenta WHERE  id =(SELECT cuenta_padre FROM agil_contabilidad_cuenta WHERE id=cuenta.cuenta_padre))\
					WHERE `agil_asiento_contabilidad`.`eliminado` = FALSE \
					AND comprobante_sucursal_empresa.id = " + req.params.id_empresa + "\
					AND joinCuenta_Padre.nombreCuentaPadre = 'GASTOS'\
				UNION ALL\
					SELECT DISTINCT\
						IFNULL(NULL, 'PROFORMAS') AS nombreCuentaPadreJP,\
						NULL AS nombreCuentaGrupoJP,\
						NULL AS nombreCuentaSubGrupoJP,\
						proforma.id AS idP,\
						NULL AS nombre_cuentaP,\
						IFNULL(NULL, 0) AS debe_bsP,\
						SUM(detalleProforma.importe) AS haber_bsP,\
						SUM(detalleProforma.importe)-IFNULL(NULL, 0) AS saldoP,\
						centro_costo.nombre AS nombre_centroCostoP,\
						area_costo.nombre AS nombre_areaCostoP,\
						proforma.periodo_mes AS fecha_proform\
					FROM\
						agil_detalle_proforma AS detalleProforma \
						LEFT JOIN agil_proforma AS proforma ON detalleProforma.proforma=proforma.id\
						LEFT JOIN gl_clase AS centro_costo ON detalleProforma.centro_costo = centro_costo.id AND centro_costo.eliminado=FALSE\
						LEFT JOIN agil_comprobante_centro_costos AS comp_centro ON centro_costo.id = comp_centro.id_centro_costos AND comp_centro.eliminado=FALSE\
						LEFT JOIN agil_area_costos AS area_costo ON comp_centro.id_area_costos = area_costo.id AND area_costo.eliminado=FALSE\
					WHERE\
						proforma.empresa = " + req.params.id_empresa + "\
						AND proforma.periodo_mes IN ("+ mes + ")\
						AND proforma.periodo_anio="+ req.params.gestion + "\
						AND proforma.eliminado=FALSE\
						GROUP BY proforma.id, centro_costo .id\
				) as registros", {
				type: sequelize.QueryTypes.SELECT
			}).then(function (result) {
				res.json({ asientos: result })
			}).catch(function (err) {
				res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
			});
		})
	router.route('/comprobante-contabilidad/compra/verificada/empresa/:id_empresa')
		.post(ensureAuthorizedlogged, function (req, res) {
			const transacion = sequelize.transaction(async (t) => {
				let saldo = 0
				if(req.body.tipoPago.nombre_corto == 'CRE'){
					saldo = req.body.total
				}

				const [compraActualizada] = await Compra.update({
					factura: req.body.factura,
					autorizacion: req.body.autorizacion,
					fecha: req.body.fechaModificadaVerificacion,
					codigo_control: req.body.codigo_control,
					observacion: req.body.observacion,
					verificado_para_comprobante: true,
					id_tipo_pago: req.body.tipoPago.id,
					dias_credito: req.body.dias_credito ? req.body.dias_credito : 0,
					a_cuenta: req.body.a_cuenta,
					saldo: saldo
				}, {
					where: { id: req.body.id },
					transaction: t
				})
				if (!compraActualizada) throw new Error('Ocurrió un error al guarda!')
				return 'Guardado Correctamente.'
			}).then((result) => {
				res.json({ mensaje: result })
			}).catch((err) => {
				res.json({ hasErr: true, mensaje: err.stack })
			})
		})



	router.route('/asignar-compra-asieento-haber')
		.post(function (req, res) {
			const transacion = sequelize.transaction(async (t) => {

				let asientosDebe = await AsientoContabilidad.findAll({
					where: { debe_bs: { $ne: 0 } },
					attributes: [
						'id',
						'glosa',
						'comprobante',
						[sequelize.fn('SUM', sequelize.col('debe_bs')), 'total_bs'],
					],
					include: [{
						model: Compra, as: 'lc_comp_compra', required: true,
						include: [{
							model: Movimiento, as: 'movimiento',
							include: [{
								model: Clase, as: 'clase', where: {
									nombre_corto: {
										$in: [
											Diccionario.MOVING_POR_IMPORTACION,
											Diccionario.MOVING_DIARIO,
											Diccionario.MOVING_POR_COMPRA_SIN_FACTURA,
											Diccionario.MOVING_POR_RETENCION_BIENES,
										]
									}
								}
							}]
						}, { model: Proveedor, as: 'proveedor' }]
					}],
					group: ["`lc_comp_compra.asiento_contabilidad`"], transacion: t
				})

				let asientos = []
				for (const asientodebe of asientosDebe) {
					let asientosHaber = await AsientoContabilidad.findAll({
						where: { haber_bs: { $ne: 0 }, id_comprobante: asientodebe.dataValues.comprobante },
						include: [{ model: ContabilidadCuentaAuxiliar, as: 'cuentaAux', where: { nombre: { $like: '%' + asientodebe.dataValues.lc_comp_compra.dataValues.proveedor.dataValues.razon_social + '%' } }, required: true }],
						transacion: t
					})
					for (const asientohaber of asientosHaber) {
						let continuar = true
						if (asientos.length > 0) {
							let encontrado = asientos.find(x => {
								return x.dataValues.id == asientohaber.dataValues.id
							})
							continuar = encontrado ? false : true
						}
						if (continuar) {
							let igual = false
							let ids = []
							if (asientodebe.dataValues.lc_comp_compra.dataValues.proveedor.dataValues.razon_social && asientohaber.dataValues.cuentaAux.dataValues.nombre) {
								igual = asientohaber.dataValues.cuentaAux.dataValues.nombre.toUpperCase().includes(asientodebe.dataValues.lc_comp_compra.dataValues.proveedor.dataValues.razon_social.toUpperCase().trim());
							}
							if (igual) {
								if (asientodebe.dataValues.lc_comp_compra.dataValues.movimiento.dataValues.clase.dataValues.nombre_corto == Diccionario.MOVING_POR_IMPORTACION || asientodebe.dataValues.lc_comp_compra.dataValues.movimiento.dataValues.clase.dataValues.nombre_corto == Diccionario.MOVING_DIARIO) {
									ids = [asientohaber.dataValues.id - 1, asientohaber.dataValues.id - 2]
								} else if (asientodebe.dataValues.lc_comp_compra.dataValues.movimiento.dataValues.clase.dataValues.nombre_corto == Diccionario.MOVING_POR_COMPRA_SIN_FACTURA) {
									ids = [asientohaber.dataValues.id - 1]
								} else if (asientodebe.dataValues.lc_comp_compra.dataValues.movimiento.dataValues.clase.dataValues.nombre_corto == Diccionario.MOVING_POR_RETENCION_SERVICIOS) {
									ids = [asientohaber.dataValues.id - 1, asientohaber.dataValues.id - 2]
								} else if (asientodebe.dataValues.lc_comp_compra.dataValues.movimiento.dataValues.clase.dataValues.nombre_corto == Diccionario.MOVING_POR_RETENCION_BIENES) {
									ids = [asientohaber.dataValues.id - 1, asientohaber.dataValues.id - 2]
								}
								let asientosDebe2 = await AsientoContabilidad.findAll({
									attributes: [
										'id',
										'glosa',
										'comprobante',
										[sequelize.fn('SUM', sequelize.col('debe_bs')), 'total_bs'],
									],
									where: { id: { $in: ids } },
									transacion: t
								})
								if (asientosDebe2[0].dataValues.total_bs === asientohaber.dataValues.haber_bs
									&& igual) {
									await Compra.update({
										id_asiento_contabilidad: asientohaber.dataValues.id,
									}, {
										where: { id: asientodebe.dataValues.lc_comp_compra.id }
									})
									let continuar2 = true
									let encontrado2 = asientos.find(x => {
										return x.dataValues.id == asientohaber.dataValues.id
									})
									continuar = encontrado2 ? false : true
									if (continuar2) {
										asientos.push(asientosHaber.shift())
									}
								}
							}
						}
					}
				}
				let asientosDebeServicio = await AsientoContabilidad.findAll({
					where: { debe_bs: { $ne: 0 } },
					attributes: [
						'id',
						'glosa',
						'comprobante',
						[sequelize.fn('SUM', sequelize.col('debe_bs')), 'total_bs'],
					],
					include: [{
						model: Compra, as: 'lc_comp_compra', required: true,
						include: [{ model: Clase, as: 'tipoMovimiento' }, { model: Proveedor, as: 'proveedor' }]
					}],
					group: ["`lc_comp_compra.asiento_contabilidad`"], transacion: t
				})


				for (const asientodebe of asientosDebeServicio) {
					let asientosHaberServicio = await AsientoContabilidad.findAll({
						where: { haber_bs: { $ne: 0 }, id_comprobante: asientodebe.dataValues.comprobante },
						include: [{ model: ContabilidadCuentaAuxiliar, as: 'cuentaAux', where: { nombre: { $like: '%' + asientodebe.dataValues.lc_comp_compra.dataValues.proveedor.dataValues.razon_social + '%' } }, required: true }],
						transacion: t
					})
					for (const asientohaber of asientosHaberServicio) {
						let igual = false
						let ids = []
						if (asientodebe.dataValues.lc_comp_compra.dataValues.proveedor.dataValues.razon_social && asientohaber.dataValues.cuentaAux.dataValues.nombre) {
							igual = asientohaber.dataValues.cuentaAux.dataValues.nombre.toUpperCase().includes(asientodebe.dataValues.lc_comp_compra.dataValues.proveedor.dataValues.razon_social.toUpperCase().trim());
						}
						if (igual) {
							ids = [asientohaber.dataValues.id - 1, asientohaber.dataValues.id - 2]

							let asientosDebe2 = await AsientoContabilidad.findAll({
								attributes: [
									'id',
									'glosa',
									'comprobante',
									[sequelize.fn('SUM', sequelize.col('debe_bs')), 'total_bs'],
								],
								where: { id: { $in: ids } },
								transacion: t
							})
							if (asientosDebe2[0].dataValues.total_bs === asientohaber.dataValues.haber_bs
								&& igual) {
								console.log("asignar asiento haber a la compra")
								await Compra.update({
									id_asiento_contabilidad: asientohaber.dataValues.id,
								}, {
									where: { id: asientodebe.dataValues.lc_comp_compra.id }
								})
							}
						}

					}
				}
			}).then((result) => {
				res.json({ mensaje: result })
			}).catch((err) => {
				res.json({ hasErr: true, mensaje: err.stack })
			})
		})

	router.route('/asignar-compra-asientos')
		.post(function (req, res) {
			const transacion = sequelize.transaction(async (t) => {
				let asientosHaber = await AsientoContabilidad.findAll({
					where: { haber_bs: { $ne: 0 } },
					include: [{
						model: Compra, as: 'lc_comp_compra', required: true,
						include: [{
							model: Movimiento, as: 'movimiento',
							include: [{
								model: Clase, as: 'clase', where: {
									nombre_corto: {
										$in: [
											Diccionario.MOVING_POR_IMPORTACION,
											Diccionario.MOVING_DIARIO,
											Diccionario.MOVING_POR_COMPRA_SIN_FACTURA,
											Diccionario.MOVING_POR_RETENCION_BIENES,
										]
									}
								}
							}]
						}, { model: Proveedor, as: 'proveedor' }]
					}],
					transacion: t
				})

				for (const asientohaber of asientosHaber) {
					let ids = []
					if (asientohaber.dataValues.tipoMovimiento) {
						asientohaber.dataValues.lc_comp_compra.dataValues.movimiento = { clase: asientohaber.dataValues.tipoMovimiento }
					}
					if (asientohaber.dataValues.lc_comp_compra.dataValues.movimiento.dataValues.clase.dataValues.nombre_corto == Diccionario.MOVING_POR_IMPORTACION || asientohaber.dataValues.lc_comp_compra.dataValues.movimiento.dataValues.clase.dataValues.nombre_corto == Diccionario.MOVING_DIARIO) {
						ids = [asientohaber.dataValues.id - 1, asientohaber.dataValues.id - 2]
					} else if (asientohaber.dataValues.lc_comp_compra.dataValues.movimiento.dataValues.clase.dataValues.nombre_corto == Diccionario.MOVING_POR_COMPRA_SIN_FACTURA) {
						ids = [asientohaber.dataValues.id - 1]
					} else if (asientohaber.dataValues.lc_comp_compra.dataValues.movimiento.dataValues.clase.dataValues.nombre_corto == Diccionario.MOVING_POR_RETENCION_SERVICIOS) {
						ids = [asientohaber.dataValues.id - 1, asientohaber.dataValues.id - 2]
					} else if (asientohaber.dataValues.lc_comp_compra.dataValues.movimiento.dataValues.clase.dataValues.nombre_corto == Diccionario.MOVING_POR_RETENCION_BIENES) {
						ids = [asientohaber.dataValues.id - 1, asientohaber.dataValues.id - 2]
					}

					asientosDebe = await AsientoContabilidad.findAll({
						attributes: [
							'id',
							'glosa',
							'comprobante',
							[sequelize.fn('SUM', sequelize.col('debe_bs')), 'total_bs'],
						],
						where: { id: { $in: ids } },
						transacion: t
					})
					if (asientosDebe[0].dataValues.total_bs === asientohaber.dataValues.haber_bs) {
						console.log("estos son sus asientos debe de la compra:" + ids)
						await AsientoContabilidad.update({
							id_compra: asientohaber.dataValues.lc_comp_compra.dataValues.id,
						}, {
							where: { id: { $in: ids } },
							transacion: t
						})
					}

				}
				let asientosHaberServicio = await AsientoContabilidad.findAll({
					include: [{
						model: Compra, as: 'lc_comp_compra', required: true,
						include: [{ model: Clase, as: 'tipoMovimiento' }, { model: Proveedor, as: 'proveedor' }]
					}],
					transacion: t
				})
				for (const asientohaber of asientosHaberServicio) {
					let ids = []
					ids = [asientohaber.dataValues.id - 1, asientohaber.dataValues.id - 2]
					asientosDebe = await AsientoContabilidad.findAll({
						attributes: [
							'id',
							'glosa',
							'comprobante',
							[sequelize.fn('SUM', sequelize.col('debe_bs')), 'total_bs'],
						],
						where: { id: { $in: ids } },
						transacion: t
					})
					if (asientosDebe[0].dataValues.total_bs === asientohaber.dataValues.haber_bs) {
						console.log("estos son sus asientos debe de la compra de servicio:" + ids)
						await AsientoContabilidad.update({
							id_compra: asientohaber.dataValues.lc_comp_compra.dataValues.id,
						}, {
							where: { id: { $in: ids } },
							transacion: t
						})
					}

				}

			}).then((result) => {
				res.json({ mensaje: result })
			}).catch((err) => {
				res.json({ hasErr: true, mensaje: err.stack })
			})
		})

}
