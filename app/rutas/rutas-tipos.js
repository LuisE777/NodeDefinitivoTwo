
module.exports = function (router, Tipo, Clase, Venta, DetalleVenta, Cliente, Almacen, Sucursal, Compra, DetalleCompra, Proveedor,
	Producto, Usuario, Movimiento, VentaReprogramacionPago, CompraReprogramacionPago, RrhhClaseAsuencia, sequelize, ensureAuthorizedlogged, CorrelativoOt, MantenimientoEspecialidadPrecios,CompraProgramacionPago,DetalleCompraProgramacionPago,CorrelativosEmpresa,AsientoContabilidad,ComprobanteContabilidad) {

	router.route('/tipos/:nombre_corto')
		.get(ensureAuthorizedlogged, function (req, res) {
			Tipo.find({
				where: {
					nombre_corto: req.params.nombre_corto
				},
				include: [{ model: Clase, as: 'clases', where: { eliminado: false } }, { model: RrhhClaseAsuencia, as: 'ausencias' }]
			}).then(function (entidad) {
				res.json(entidad);
			}).catch((err) => {
				res.json({ hasErr: true, mensaje: err.stack })
			})
		});
	router.route('/tipos/:nombre_corto/empresa/:id_empresa')
		.get(ensureAuthorizedlogged, function (req, res) {
			Tipo.find({
				where: {
					nombre_corto: req.params.nombre_corto,
					id_empresa: req.params.id_empresa
				},
				include: [
					{ model: Clase, as: 'clases', required: false, where: { eliminado: false, habilitado: true }, include: [{model: CorrelativoOt, as: 'correlativoOt', include: [{model: Sucursal, as: 'sucursal', } ]} ] }, 
					{ model: RrhhClaseAsuencia, as: 'ausencias', required: false }]
			}).then(function (entidad) {
				res.json(entidad);
			});
		});
	router.route('/tipos-lista/:nombre_corto/empresa/:id_empresa')
		.get(ensureAuthorizedlogged, function (req, res) {
			Tipo.findAll({
				where: {
					nombre_corto: req.params.nombre_corto,
					id_empresa: req.params.id_empresa
				},
				include: [{ model: Clase, as: 'clases', required: false, 
				where: { eliminado: false, padre: null, habilitado: true } }, { model: RrhhClaseAsuencia, as: 'ausencias', required: false }]
			}).then(function (tipos) {
				res.json({ tipos: tipos });
			});
		});
	router.route('/clases/:nombre_corto')
		.get(ensureAuthorizedlogged, function (req, res) {
			Clase.findAll({
				where: {
					nombre_corto: req.params.nombre_corto, eliminado: false
				}
			}).then(function (entidad) {
				res.json(entidad);
			});
		});
	router.route('/clases/:nombre_corto/:id_empresa')
		.get(ensureAuthorizedlogged, function (req, res) {
			/* Tipo.find({
				where:{id_empresa:req.params.id_empresa},
				include:[{model:Clase,as:'clases',where:{nombre_corto: req.params.nombre_corto, eliminado: false}}]
				
			}).then(function(tipoencontrado){
				res.json(tipoencontrado.clases);
			}) */
			Clase.findAll({
				where: {
					nombre_corto: req.params.nombre_corto, eliminado: false
				},
				include: [{ model: Tipo, as: 'tipo', where: { id_empresa: req.params.id_empresa } }]
			}).then(function (entidad) {
				res.json(entidad);
			});
		});
	router.route('/tipos/empresa/:id_empresa/padre/:id_padre')
		.get(ensureAuthorizedlogged, function (req, res) {
			Tipo.find({
				where: {
					id_empresa: req.params.id_empresa
				},
				include: [{ model: Clase, as: 'clases', where: { habilitado: true, eliminado: false, id_padre: { $in: req.params.id_padre.split(',') } } }]
			}).then(function (entidad) {
				res.json(entidad);
			});
		});
	router.route('/clase/:nombre')
		.get(ensureAuthorizedlogged, function (req, res) {
			Clase.find({
				where: {
					nombre: req.params.nombre
				}
			}).then(function (entidad) {
				res.json({ clase: entidad });
			});
		});
	router.route('/heredados-clases/:id_padre')
		.get(ensureAuthorizedlogged, function (req, res) {
			Clase.findAll({
				where: {
					id_padre: req.params.id_padre
				}
			}).then(function (entidad) {
				res.json({ clases: entidad });
			});
		})
		.post(ensureAuthorizedlogged, function (req, res) {
			Clase.findAll({
				where: {
					nombre: req.params.id_padre
				}
			}).then(function (entidad) {
				res.json({ clases: entidad });
			});
		});
	router.route('/paises/:nombre_corto')
		.get(ensureAuthorizedlogged, function (req, res) {

			var condicion = { $like: "%" + req.params.nombre_corto + "%" }

			Clase.findAll({
				where: {
					eliminado: false,
					nombre_corto: condicion
				}
				, include: [{ model: Tipo, as: 'tipo' }]
			}).then(function (entidad) {
				res.json(entidad);
			});
		});
	router.route('/tipos')
		.get(ensureAuthorizedlogged, function (req, res) {
			Tipo.findAll({
				include: [{ model: Clase, as: 'clases' }]
			}).then(function (entity) {
				res.json(entity);
			});
		});
	router.route('/sangre/tipos')
		.get((req, res) => {
			Tipo.findAll({
				include: [{ model: Clase, as: 'clases' }],
				where: {
					nombre_corto: 'tipo_sangre'
				}
			}).then(function (entity) {
				res.json(entity);
			}).catch((err) => {
				res.json({ hasErr: true, mensaje: 'Error al recabar información.' })
			})
		});

	router.route('/tipos/:id_tipo')
		.put(ensureAuthorizedlogged, function (req, res) {
			Tipo.update({
				nombre: req.body.nombre,
				nombre_corto: req.body.nombre_corto,
				padre: req.body.padre ? req.body.padre : false,
				usar_herencia: req.body.usar_herencia ? req.body.usar_herencia : false,
			}, {
				where: { id: req.params.id_tipo }
			}).then(function (tipoActualizado) {
				if (req.body.clases.length > 0) {
					req.body.clases.forEach(function (clase, index, array) {
						if (clase.eliminado) {
							Clase.update({
								eliminado: clase.eliminado
							}, {
								where: { id: clase.id }
							}).then(function (claseEliminado) {

							});
						} else {
							if (clase.id) {
								Clase.update({
									nombre: clase.nombre,
									nombre_corto: clase.nombre_corto,
									habilitado: clase.habilitado,
									eliminado: clase.eliminado?clase.eliminado:false,
									id_padre: clase.padre ? clase.padre.id : null,
									icono: clase.icono ? clase.icono : null
								}, {
									where: { id: clase.id }
								}).then(function (claseActualizada) {

								});
							} else {
								Clase.create({
									nombre: clase.nombre,
									nombre_corto: clase.nombre_corto,
									id_tipo: req.params.id_tipo,
									habilitado:  clase.habilitado ? clase.habilitado : false,
									eliminado: false,
									id_padre: clase.padre ? clase.padre.id : null,
									icono: clase.icono ? clase.icono : null
								}).then(function (claseCreado) {
									if(req.body.nombre_corto == "MTM_TM" && claseCreado.id_padre === null){
										Sucursal.findAll({where:{empresa:req.body.id_empresa}})
										.then(sucursales=>{
											sucursales.forEach(suc=>{
												CorrelativoOt.create({
													id_sucursal:suc.id,
													id_especialidad: claseCreado.id,
													activo: 1,
													numeracion:1,
												})
											})
										})
										.then(especCreado=>{})
									}
									console.log(claseCreado)

								});
							}
						}

						if (index === (array.length - 1)) {
							res.json({ message: "Actualizado satisfactoriamente!" });
						}
					});
				} else {
					res.json({ message: "Actualizado satisfactoriamente!" });
				}
			}).catch((err) => res.json({ message: err.stack, hasErr: true }))
		});

	router.route('/tipos/empresa/:id_empresa')
		.get(ensureAuthorizedlogged, function (req, res) {
			var condicionTipo = { id_empresa: null }
			if (req.params.id_empresa != 0) {
				condicionTipo.id_empresa = req.params.id_empresa;
			}
			Tipo.findAll({
				where: condicionTipo,
				include: [{ model: Clase, as: 'clases', include: [{ model: Clase, as: 'padre' }] }]
			}).then(function (entity) {
				res.json(entity);
			});
		});

	router.route('/clases-tipo-herencia/tipo/:id_tipo')
		.get((req, res) => {
			Clase.findAll({
				where: { id_tipo: req.params.id_tipo, padre: null, habilitado: true, eliminado: false }
			}).then(function (ClassTypeFound) {
				res.json({ ClasesTipo: ClassTypeFound })
			})
		})
	router.route('/tipos-herencia/empresa/:id_empresa')
		.get((req, res) => {
			var condicionTipo = { id_empresa: req.params.id_empresa, padre: true }
			if (req.params.id_empresa == 0) {
				req.params.id_empresa = null
				condicionTipo = sequelize.literal('`empresa` is null and  `padre` = true;')
			}
			Tipo.findAll({
				where: condicionTipo
			}).then(function (typesFound) {
				res.json({ tipos: typesFound })
			})
		})
	router.route('/tipos/empresa')
		.post(ensureAuthorizedlogged, function (req, res) {
			Tipo.create({
				nombre: req.body.nombre,
				nombre_corto: req.body.nombre_corto,
				id_empresa: req.body.id_empresa,
				padre: req.body.padre ? req.body.padre : false,
				usar_herencia: req.body.usar_herencia ? req.body.usar_herencia : false,
			}).then(function (tipoCreado) {
				if (req.body.clases.length > 0) {
					req.body.clases.forEach(function (clase, index, array) {
						if (!clase.eliminado) {
							Clase.create({
								nombre: clase.nombre,
								nombre_corto: clase.nombre_corto,
								id_tipo: tipoCreado.id,
								id_padre: clase.padre ? clase.padre.id : null,
								eliminado: false,
								habilitado: true
							}).then(function (instanceCreated) {
								if (index === (array.length - 1)) {
									res.json({ mensaje: 'Creado satisfactoriamente!' });
								}
							});
						} else {
							if (index === (array.length - 1)) {
								res.json({ mensaje: 'Creado satisfactoriamente!' });
							}
						}
					});
				} else {
					res.json({ mensaje: 'Creado satisfactoriamente!' });
				}
			});
		});

	router.route('/vencimientos-creditos/:id_empresa')
		.get(ensureAuthorizedlogged, function (req, res) {
			Clase.find({
				where: { nombre: "VENCIMIENTO DE CRÉDITOS" },
				include: [{ model: Tipo, as: 'tipo', where: { id_empresa: req.params.id_empresa } }]
			}).then(function (diasVencimientoCreditos) {
				var diasParametro = parseInt(diasVencimientoCreditos.nombre_corto);
				var fechaActual = new Date();
				Venta.findAll({
					where: { saldo: { $gt: 0 }, activa: true },
					include: [{ model: VentaReprogramacionPago, as: 'ventaReprogramacionPagos' },
					{
						model: DetalleVenta, as: 'detallesVenta',
						include: [{ model: Producto, as: 'producto' }]
					},
					{ model: Clase, as: 'tipoPago', where: { nombre_corto: "CRE" } },
					{ model: Usuario, as: 'usuario' },
					{ model: Cliente, as: 'cliente' },
					{
						model: Movimiento, as: 'movimiento',
						include: [{ model: Clase, as: 'clase' }]
					},
					{
						model: Almacen, as: 'almacen',
						include: [{
							model: Sucursal, as: 'sucursal',
							where: { id_empresa: req.params.id_empresa }
						}]
					}],
					/*order: [ [ { model: PagoVenta, as: 'pagosVenta' }, 'createdAt' ,'DESC'] ]*/
					order: [['fecha', 'asc']]
				}).then(function (ventas) {
					var ventasFiltradas = [];
					if (ventas.length > 0) {
						ventas.forEach(function (venta, index, arrayP) {
							var timeDiff = Math.abs(fechaActual.getTime() - venta.fecha.getTime());
							var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
							var diferencia = venta.dias_credito - diffDays;
							if (diferencia <= diasParametro) {
								ventasFiltradas.push(venta);
							}
							if (index === (arrayP.length - 1)) {
								res.json(ventasFiltradas);
							}
						});
					} else {
						res.json(ventasFiltradas);
					}
				});
			});
		});

	router.route('/alertas/vencimientos-creditos/cantidad/:id_empresa')
		.get(function (req, res) {
			Clase.find({
				where: { nombre: "VENCIMIENTO DE CRÉDITOS" },
				include: [{ model: Tipo, as: 'tipo', where: { id_empresa: req.params.id_empresa } }]
			}).then(function (diasVencimientoCreditos) {
				var diasParametro = parseInt(diasVencimientoCreditos.nombre_corto);
				// Venta.count({
				// 	where: [sequelize.where(sequelize.fn('DATEDIFF', sequelize.fn("NOW") , sequelize.literal('`inv_venta`.`fecha`')), {
				// 		$lte: diasParametro
				// 	}), { saldo: { $gt: 0 },  activa: true }],
				// 	include: [{ model: VentaReprogramacionPago, as: 'ventaReprogramacionPagos' },
				// 	{
				// 		model: DetalleVenta, as: 'detallesVenta',
				// 		include: [{ model: Producto, as: 'producto' }]
				// 	},
				// 	{ model: Clase, as: 'tipoPago', where: { nombre_corto: "CRE" } },
				// 	{ model: Usuario, as: 'usuario' },
				// 	{ model: Cliente, as: 'cliente' },
				// 	{
				// 		model: Movimiento, as: 'movimiento',
				// 		include: [{ model: Clase, as: 'clase' }]
				// 	},
				// 	{
				// 		model: Almacen, as: 'almacen',
				// 		include: [{
				// 			model: Sucursal, as: 'sucursal',
				// 			where: { id_empresa: req.params.id_empresa }
				// 		}]
				// 	}]
				// }).then(function (ventas) {
				// 	res.json({cantidad_creditos:ventas});
				// });

				sequelize.query("SELECT count( DISTINCT ( `inv_venta`.`id` ) ) AS `cantidad_creditos` \
				FROM `inv_venta` AS `inv_venta` \
				INNER JOIN `inv_detalle_venta` AS `detallesVenta` ON `inv_venta`.`id` = `detallesVenta`.`venta` \
				INNER JOIN `gl_clase` AS `tipoPago` ON `inv_venta`.`tipo_pago` = `tipoPago`.`id` AND `tipoPago`.`nombre_corto` = 'CRE'\
				INNER JOIN `agil_almacen` AS `almacen` ON `inv_venta`.`almacen` = `almacen`.`id`\
				INNER JOIN `agil_sucursal` AS `almacen.sucursal` ON `almacen`.`sucursal` = `almacen.sucursal`.`id` AND `almacen.sucursal`.`empresa` = "+ req.params.id_empresa + " \
				WHERE \
				`inv_venta`.`dias_credito` - DATEDIFF( now( ), `inv_venta`.`fecha` ) <= "+ diasParametro + " AND ( `inv_venta`.`saldo` > 0 AND `inv_venta`.`activa` = TRUE )",
					{ type: sequelize.QueryTypes.SELECT }).then(function (ventas) {
						res.json(ventas[0]);
					});
			});
		});

	function sumaFecha(d, fecha) {
		var Fecha = new Date(fecha);
		var dia = Fecha.getDate(),
			mes = Fecha.getMonth() + 1,
			anio = Fecha.getFullYear(),
			addTime = d * 86400;
		var date = Fecha.setSeconds(addTime)
		fecha = new Date(Fecha);
		return (Fecha);
	}

	//Vencimientos de deudas 
	router.route('/vencimientos-deudas/:id_empresa/:razon_social/:factura/:desde/:hasta/:filtroFecha')
		.get(ensureAuthorizedlogged, function (req, res) {
			var empre = req.params.id_empresa
			var condicionProveedor = {}
			var condicionCompra = { saldo: { $gt: 0 }}
			if(req.params.razon_social != 0){
				condicionProveedor.razon_social =  { $like: '%' +req.params.razon_social+ '%' } 
			}
			var fechaInicio = ''
			var fechaFin = ''
			var fechaInicioFact = ''
			var fechaFinFact = ''
			if(req.params.filtroFecha == 'true'){
				if(req.params.desde !=0 && req.params.hasta != 0 ){
					fechaInicio = new Date(req.params.desde).setHours(0, 0, 0, 0, 0);
					fechaFin = new Date(req.params.hasta).setHours(23, 59, 59, 0, 0);
				}
			}else{
				if(req.params.desde !=0 && req.params.hasta != 0 ){
					fechaInicioFact = new Date(req.params.desde)
					fechaInicioFact.setHours(0, 0, 0, 0, 0);
					fechaFinFact = new Date(req.params.hasta)
					fechaFinFact.setHours(23, 59, 59, 0, 0);
					condicionCompra = {fecha: {$between: [fechaInicioFact, fechaFinFact]}, saldo: { $gt: 0 }}
				}
				if(req.params.desde != 0 && req.params.hasta == 0 ){
					fechaInicioFact = new Date(req.params.desde)
					fechaInicioFact.setHours(0, 0, 0, 0, 0);
					condicionCompra = {fecha: {$gte: fechaInicioFact}, saldo: { $gt: 0 }}
				}
				if(req.params.desde == 0 && req.params.hasta != 0 ){
					fechaFinFact = new Date(req.params.hasta)
					fechaFinFact.setHours(23, 59, 59, 0, 0);
					condicionCompra = {fecha: {$lte: fechaFinFact}, saldo: { $gt: 0 }}
				}
			}
			if(req.params.factura != 0){
				condicionCompra.factura = req.params.factura
			}
			

			Clase.find({
				where: { nombre: "VENCIMIENTO DE DEUDAS" },
				include: [{ model: Tipo, as: 'tipo', where: { id_empresa: req.params.id_empresa } }]
			}).then(function (diasVencimientoDeudas) {
				/* var diasParametro = parseInt(diasVencimientoDeudas.nombre_corto);
				var fechaActual = new Date(); */
				Compra.findAll({
					where: condicionCompra,
					include: [{ model: CompraReprogramacionPago, as: 'compraReprogramacionPagos' },
					{ model: DetalleCompra, as: 'detallesCompra' },
					{ model: Clase, as: 'tipoPago', where: { nombre_corto: "CRE" } },
					{ model: Proveedor, as: 'proveedor', where: condicionProveedor },
					{
						model: Almacen, as: 'almacen',
						include: [{
							model: Sucursal, as: 'sucursal',
							where: { id_empresa: req.params.id_empresa }
						}]
					}],
					order: [['fecha', 'asc']]
				}).then(function (compras) {
					var comprasFiltradas = [];
					if (compras.length > 0) {
						compras.forEach(function (compra, index, arrayP) {
							/* var timeDiff = Math.abs(fechaActual.getTime() - compra.fecha.getTime());
							var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
							var diferencia = compra.dias_credito - diffDays;
							if (diferencia <= diasParametro) { */
								var fecha = new Date(compra.fecha);
								compra.dataValues.fecha_vencimiento = sumaFecha(compra.dias_credito, fecha);
								for (var j = 0; j < compra.compraReprogramacionPagos.length; j++) {
									if (compra.compraReprogramacionPagos[j].activo) {
										compra.dataValues.fecha_anterior = compra.compraReprogramacionPagos[j].fecha_anterior
									}
								}
								if(fechaInicio && fechaFin){
									if(compra.dataValues.fecha_vencimiento >= fechaInicio && compra.dataValues.fecha_vencimiento <=fechaFin ){
										comprasFiltradas.push(compra);
									}
								}else{
									comprasFiltradas.push(compra);
								}
							//}
							if (index === (arrayP.length - 1)) {	
								res.json(comprasFiltradas);
							}
						});
					} else {
						res.json(comprasFiltradas);
					}
				});
			});
		});
	
	//Programacion de Deudas
	router.route('/ProgramarPagoYmodifCompra/modificacion-creacion')
		.post(async function (req, res) {
			var estadoCompraVerificacion = []
			for (let i = 0; i < req.body.detalles.length; i++) {
				const verificEstado = req.body.detalles[i];
				const estadoProgPagCompVerificacion = await Compra.find({
					where: { id: verificEstado.id},
					include:[{ model: Proveedor, as: 'proveedor'}]
				})
				if(estadoProgPagCompVerificacion.estado_programacion_pago == true){
					estadoCompraVerificacion.push("N° Fact "+estadoProgPagCompVerificacion.factura+" de "+estadoProgPagCompVerificacion.proveedor.razon_social+" <br>")
				}
			}
			if(estadoCompraVerificacion.length == 0){
				const CorrelativosProgrPagosEmpresaEncontrado = await CorrelativosEmpresa.find({
					where: { id_empresa: req.body.id_empresa}
				})
				const estadoProgra = await Clase.find({
					include:[{model:Tipo, as:'tipo', where:{nombre_corto:'EPGP'}}],
					where:{nombre_corto:'PEND'}
				});
				const regProgramado = await CompraProgramacionPago.create({ 
					id_empresa: req.body.id_empresa ,
					fecha: new Date(),
					correlativo: CorrelativosProgrPagosEmpresaEncontrado.numero_correlativo_programacion_pago + 1,
					id_usuario: req.body.id_usuario
				});
				//var detallesEstados = []
				for (let j = 0; j < req.body.detalles.length; j++) {
					const comprasID = req.body.detalles[j];
					const estadoPrograCompra = await Compra.update({ estado_programacion_pago: true }, {
						where: {
							id: comprasID.id
						}
					})
					const detalleCreada = await	DetalleCompraProgramacionPago.create({ 
						id_programacion_pago: regProgramado.id,
						id_compra: comprasID.id,
						id_usuario: null,
						fecha_vencimiento: comprasID.fecha_vencimiento,
						id_estado: estadoProgra.id
					})
					//detallesEstados.push(estadoPrograCompra)
				}
				const actualizarCorrlativo = await CorrelativosEmpresa.update({ numero_correlativo_programacion_pago: regProgramado.correlativo }, {
					where: {
						id: CorrelativosProgrPagosEmpresaEncontrado.id
					}
				})
				const CompProgramacPagos = await CompraProgramacionPago.find({
					include:[{ model: DetalleCompraProgramacionPago, as: 'DetallesCompraProgramacionPago',
							include:[
								{ model: Clase, as: 'estado'},
								{ model: Compra, as: 'compra',
									include:[{model: Proveedor, as: 'proveedor'},
											{model: AsientoContabilidad, as: 'asientosContab', where:{eliminado: false},
											 include:[{model: ComprobanteContabilidad, as:'comprobante',
													include:[ {model: Clase, as: 'tipoComprobante'}] 
												}]
										}
									]
								}
							]
							}],
					where: { id: regProgramado.id}
				})
				res.json({ mensaje: "Registro Creado", CompProgramacPagos: CompProgramacPagos, estadoCompraVerificacion:estadoCompraVerificacion })
			} else{
				res.json({ mensaje: "Registro ya fue Programado Anteriormente", estadoCompraVerificacion: estadoCompraVerificacion })
			}
			//var datos = {regProgramado:regProgramado,detallesCreados:detallesCreados,detallesEstados:detallesEstados }
			//res.json({ mensaje: "Registro Creado", CompProgramacPagos: CompProgramacPagos })
		})

	//LISTA DE ESTADOS
	router.route('/listaProgrPagosEmpresa/estadoGlobal')
		.get(ensureAuthorizedlogged, async function (req, res) {
			const estadoProgra = await Clase.findAll({
				include:[{model:Tipo, as:'tipo', where:{nombre_corto:'EPGP'}}]
			});
			res.json(estadoProgra);
		});

	
	//LISTA DE PROGRAMACION DE PAGOS
	router.route('/listaProgrPagosEmpresa/:id_empresa/:razon_social/:factura/:desde/:hasta/:correlativo/:estado')
		.get(ensureAuthorizedlogged, async function (req, res) {
			var queryCompProgPago = {id_empresa: req.params.id_empresa}
			var condicionProveedor = {}
			//var condicionCompra = { saldo: { $gt: 0 }}
			var condicionCompra = {}
			var CondicionProgrPago = {}
			var CondicionDetProgrPago = {}
			if(req.params.razon_social != 0){
				condicionProveedor.razon_social =  { $like: '%' +req.params.razon_social+ '%' } 
			}
			if(req.params.factura != 0){
				condicionCompra.factura = req.params.factura
			}
			if(req.params.correlativo != 0){
				queryCompProgPago.correlativo = req.params.correlativo
			}
			if(req.params.estado != 0){
				CondicionDetProgrPago.id_estado = req.params.estado
			}
			var fechaInicio = ''
			var fechaFin = ''
			if(req.params.desde !=0 && req.params.hasta != 0 ){
				fechaInicio = new Date(req.params.desde)
				fechaInicio.setHours(0, 0, 0, 0, 0);
				fechaFin = new Date(req.params.hasta)
				fechaFin.setHours(23, 59, 59, 0, 0);
				queryCompProgPago = {fecha: {$between: [fechaInicio, fechaFin]} }
			}
			if(req.params.desde != 0 && req.params.hasta == 0 ){
				fechaInicio = new Date(req.params.desde)
				fechaInicio.setHours(0, 0, 0, 0, 0);
				queryCompProgPago = {fecha: {$gte: fechaInicio} }
			}
			if(req.params.desde == 0 && req.params.hasta != 0 ){
				fechaFin = new Date(req.params.hasta)
				fechaFin.setHours(23, 59, 59, 0, 0);
				queryCompProgPago = {fecha: {$lte: fechaFin} }
			}
			const detalleProgramacPagos = await DetalleCompraProgramacionPago.findAll({
				where: CondicionDetProgrPago,
						include:[{ model: CompraProgramacionPago, as: 'CompraProgramacionPago', where: queryCompProgPago},
								{ model: Usuario, as: 'usuario'},	
								{ model: Clase, as: 'estado'},
								{ model: Compra, as: 'compra',
									where: condicionCompra,
									include:[{ model: Proveedor, as: 'proveedor', where: condicionProveedor}]
								}],
				order: [['id', 'desc']]
			}).then(function (detalleProgramacPagos) {
				res.json(detalleProgramacPagos);
			});
		});

	router.route('/programarPagoAprobadoCompra/aprobacion')
		.post(async function (req, res) {
			const estadoPrograPend = await Clase.find({
				include:[{model:Tipo, as:'tipo', where:{nombre_corto:'EPGP'}}],
				where:{nombre_corto:'PEND'}
			});
			const estadoProgra = await Clase.find({
				include:[{model:Tipo, as:'tipo', where:{nombre_corto:'EPGP'}}],
				where:{nombre_corto:'APRO'}
			});
			const estadoPrograRech = await Clase.find({
				include:[{model:Tipo, as:'tipo', where:{nombre_corto:'EPGP'}}],
				where:{nombre_corto:'RECH'}
			});
			var estadoCompraVerificacion = []
			for (let i = 0; i < req.body.detalles.length; i++) {
				const verificEstado = req.body.detalles[i];
				const estadoProgPagCompVerificacion = await DetalleCompraProgramacionPago.find({
					where: { id: verificEstado.id},
					include:[{ model: Compra, as: 'compra',
							include:[{ model: Proveedor, as: 'proveedor'}]
							}]
				})
				if(estadoProgPagCompVerificacion.id_estado == estadoPrograRech.id){
					estadoCompraVerificacion.push("N° Fact "+estadoProgPagCompVerificacion.compra.factura+" de "+estadoProgPagCompVerificacion.compra.proveedor.razon_social+"<br>")
				}
			}
			if(estadoCompraVerificacion.length == 0){
				for (let i = 0; i < req.body.detalles.length; i++) {
					const comprasID = req.body.detalles[i];
					const ModEstadoPrograCompra = await DetalleCompraProgramacionPago.update({ id_estado: estadoProgra.id, id_usuario: req.body.id_usuario }, {
						where: {
							id: comprasID.id,
							id_estado: estadoPrograPend.id
						}
					})
					
				}
				res.json({ mensaje: "Editado", estadoCompraVerificacion:estadoCompraVerificacion })
			}else{
				res.json({ mensaje: "Ya esta Rechazado", estadoCompraVerificacion:estadoCompraVerificacion })
			}
				
		}) 

	router.route('/programarPagoRechazarCompra/rechazar')
		.post(async function (req, res) {
			const estadoProgra = await Clase.find({
				include:[{model:Tipo, as:'tipo', where:{nombre_corto:'EPGP'}}],
				where:{nombre_corto:'RECH'}
			});
			const estadoPrograPend = await Clase.find({
				include:[{model:Tipo, as:'tipo', where:{nombre_corto:'EPGP'}}],
				where:{nombre_corto:'PEND'}
			});

			const estadoPrograAprob = await Clase.find({
				include:[{model:Tipo, as:'tipo', where:{nombre_corto:'EPGP'}}],
				where:{nombre_corto:'APRO'}
			});
			var estadoCompraVerificacion = []
			for (let i = 0; i < req.body.detalles.length; i++) {
				const verificEstado = req.body.detalles[i];
				const estadoProgPagCompVerificacion = await DetalleCompraProgramacionPago.find({
					where: { id: verificEstado.id},
					include:[{ model: Compra, as: 'compra',
							include:[{ model: Proveedor, as: 'proveedor'}]
							}]
				})
				if(estadoProgPagCompVerificacion.id_estado == estadoPrograAprob.id){
					estadoCompraVerificacion.push("N° Fact "+estadoProgPagCompVerificacion.compra.factura+" de "+estadoProgPagCompVerificacion.compra.proveedor.razon_social+"<br>")
				}
			}
			if(estadoCompraVerificacion.length == 0){
				for (let i = 0; i < req.body.detalles.length; i++) {
					const comprasID = req.body.detalles[i];
						const verifEstadoPrograPend = await DetalleCompraProgramacionPago.find({
							where:{id: comprasID.id}
						});
						const estadoPrograCompra = await DetalleCompraProgramacionPago.update({ id_estado: estadoProgra.id, id_usuario: req.body.id_usuario }, {
							where: {
								id: comprasID.id,
								id_estado: estadoPrograPend.id
							}
						})
						if(verifEstadoPrograPend.id_estado == estadoPrograPend.id ){
							const estado = await Compra.update({ estado_programacion_pago: 0 }, 
								{
								where: {
									id: comprasID.compra.id
								}
							})
						}
				}
				res.json({ mensaje: "Editado", estadoCompraVerificacion:estadoCompraVerificacion  })
			}else{
				res.json({ mensaje: "ya esta Aprobado", estadoCompraVerificacion:estadoCompraVerificacion  })
			}
		})
		
	router.route('/listaCompraPrograPagoImpresion/programacionCompra')
		.post(async function (req, res) {
			const CompProgramacPagos = await CompraProgramacionPago.find({
				include:[{ model: DetalleCompraProgramacionPago, as: 'DetallesCompraProgramacionPago',
						include:[{ model: Clase, as: 'estado'},
								{ model: Compra, as: 'compra',
									include:[
										{model: Proveedor, as: 'proveedor'},
										{model: AsientoContabilidad, as: 'asientosContab', where: {eliminado: false},
											include:[{model: ComprobanteContabilidad, as:'comprobante', where: {eliminado: false},
													include:[ {model: Clase, as: 'tipoComprobante'}] 
												}]
										}
									]
								}
							]
						}],
				where: { id: req.body.compra.id_programacion_pago}
			})
			res.json({ mensaje: "Editado", CompProgramacPagos:CompProgramacPagos })
		})
	
	router.route('/alertas/vencimientos-deudas/cantidad/:id_empresa')
		.get(function (req, res) {
			Clase.find({
				where: { nombre: "VENCIMIENTO DE DEUDAS" },
				include: [{ model: Tipo, as: 'tipo', where: { id_empresa: req.params.id_empresa } }]
			}).then(function (diasVencimientoDeudas) {
				var diasParametro = parseInt(diasVencimientoDeudas.nombre_corto);
				// Compra.count({
				// 	// where: { saldo: { $gt: 0 } },
				// 	distinct: true,
				// 	where: [sequelize.where(sequelize.fn('timestampdiff', sequelize.literal('day'), sequelize.fn("NOW") , sequelize.col('fecha')), {
				// 		$lte: diasParametro
				// 	}), { saldo: { $gt: 0 } }],
				// 	include: [{ model: CompraReprogramacionPago, as: 'compraReprogramacionPagos' },
				// 	{ model: DetalleCompra, as: 'detallesCompra' },
				// 	//{model:PagoVenta,as: 'pagosVenta'},
				// 	{ model: Clase, as: 'tipoPago', where: { nombre_corto: "CRE" } },
				// 	{ model: Proveedor, as: 'proveedor' },
				// 	{
				// 		model: Almacen, as: 'almacen',
				// 		include: [{
				// 			model: Sucursal, as: 'sucursal',
				// 			where: { id_empresa: req.params.id_empresa }
				// 		}]
				// 	}],
				// 	/*order: [ [ { model: PagoVenta, as: 'pagosVenta' }, 'createdAt' ,'DESC'] ]*/
				// 	order: [['fecha', 'asc']]
				// }).then(function (compras) {

				// 	res.json({cantidad_deudas:compras});

				// });
				sequelize.query("SELECT count( DISTINCT ( `inv_compra`.`id` ) ) AS `cantidad_deudas` \
				FROM `inv_compra` AS `inv_compra` \
				LEFT OUTER JOIN `inv_compra_reprogramacion_pago` AS `compraReprogramacionPagos` ON `inv_compra`.`id` = `compraReprogramacionPagos`.`compra` \
				LEFT OUTER JOIN `inv_detalle_compra` AS `detallesCompra` ON `inv_compra`.`id` = `detallesCompra`.`compra` \
				INNER JOIN `gl_clase` AS `tipoPago` ON `inv_compra`.`tipo_pago` = `tipoPago`.`id` AND `tipoPago`.`nombre_corto` = 'CRE' \
				LEFT OUTER JOIN `agil_proveedor` AS `proveedor` ON `inv_compra`.`proveedor` = `proveedor`.`id` \
				LEFT OUTER JOIN `agil_almacen` AS `almacen` ON `inv_compra`.`almacen` = `almacen`.`id` \
				INNER JOIN `agil_sucursal` AS `almacen.sucursal` ON `almacen`.`sucursal` = `almacen.sucursal`.`id` AND `almacen.sucursal`.`empresa` = "+ req.params.id_empresa + " \
				WHERE \
				`inv_compra`.`dias_credito` - DATEDIFF( now( ), `inv_compra`.`fecha` ) <= "+ diasParametro + " AND ( `inv_compra`.`saldo` > 0 )",
					{ type: sequelize.QueryTypes.SELECT }).then(function (ventas) {
						res.json(ventas[0]);
					});

			});
		});

	router.route('/tipos-padre/empresa/:id_empresa/padre/:id_padre')
		.get(ensureAuthorizedlogged, function (req, res) {
			Tipo.find({
				where: {
					id_empresa: req.params.id_empresa
				},
				include: [{ model: Clase, as: 'clases', where: { eliminado: false, id_padre: { $in: req.params.id_padre.split(',') } }, include: [{ model: Clase, as: 'padre' }] }]
			}).then(function (entidad) {
				res.json(entidad);
			});
		});

	router.route('/mantenimiento/especialidades/nombre_corto/:nombre_corto/empresa/:id_empresa/sucursal/:id_sucursal')
	.get(ensureAuthorizedlogged, function (req, res) {
		var sucursal = parseInt(req.params.id_sucursal);
		if(sucursal > 0){
			var condicionSucursal = {
				id:sucursal
			}
		}else{
			var condicionSucursal = {
				numero:0
			}
		}
		Tipo.find({
			where: {
				nombre_corto: req.params.nombre_corto,
				id_empresa: req.params.id_empresa
			},
			include: [
				{ model: Clase, as: 'clases', required: false, where: { eliminado: false, habilitado: true }, 
					include: [{model: CorrelativoOt, as: 'correlativoOt', where: {activo:true}, include: [{model: Sucursal, as: 'sucursal', where: condicionSucursal} ]} ] }]
		}).then(function (entidad) {
			res.json(entidad);
		});
	});


	// OBTENER SISTEMAS DE TIPO MANTENIMIENTO
	router.route('/mantenimiento/sistemas/id_padre/:id_padre/busqueda/:busqueda')
	.get(ensureAuthorizedlogged, function (req, res) {
		const {id_padre, busqueda} = req.params
		var condicion = { padre:id_padre, eliminado: false}
		if(busqueda.length > 1) condicion.nombre={$like: "%"+busqueda+"%"}
		Clase.findAll({
			where: condicion
		})
		.then(registros =>{
			Tipo.find({
				where: {nombre_corto: 'MTM_SOT'}
			})
			.then(tipo=>{
				res.json({error:false, sistemas:registros, tipo:tipo, message:'MTM_SOT'});
			})
			.catch(err=>{ res.json({error:true, message:''+err}) })
		})
		.catch(err=>{res.json({error:true, message:''+err}) })
	});

	// OBTENER SISTEMAS Y ESPECIALIDES
	router.route('/mantenimiento/especialidades/nombre_corto/:nombre_corto/busqueda/:busqueda/empresa/:empresa')
	.get(ensureAuthorizedlogged, function (req, res) {
		const {nombre_corto, busqueda, empresa} = req.params
		var condicion ={eliminado:false}
		var cond = {eliminado:false, habilitado:true}
		
		Tipo.find({
			where:{empresa: empresa, nombre_corto:nombre_corto}
		})
		.then(tipo=>{
			condicion.tipo=tipo.id;
			if(busqueda.length > 1) {
				condicion=sequelize.literal('`gl_clase`.`eliminado` = false AND `gl_clase`.`tipo` = '+tipo.id+' AND  `padre`.`padre` IS NOT NULL AND (`gl_clase`.`nombre` LIKE "%'+busqueda+'%" OR `padre`.`nombre` LIKE "%'+busqueda+'%")');
			}
			Clase.findAll({
				where: condicion,
				include: [{model:Clase, as:'padre', where:cond}]
			})
			.then(registros =>{
				res.json({error:false, especialidades:registros, tipo:tipo, message:nombre_corto});
			})
			.catch(err=>{
				res.json({error:true, err:err})
			})
		})
		.catch(e=>{
			res.json({error:true, message:"No existe nombre corto "+nombre_corto+" en la empresa \n"+e})
		})
	});

	// OBTENER PRECIOS DE LAS ESPECIALIDADES
	router.route('/mantenimiento/precios/nombre_corto/:nombre_corto/busqueda/:busqueda/empresa/:empresa')
	.get(ensureAuthorizedlogged, function (req, res) {
		const {nombre_corto, busqueda, empresa} = req.params
		var condicion ={eliminado:false, habilitado: true}
		var cond = {eliminado:false, habilitado:true}
		if(busqueda.length > 1) {
			condicion=sequelize.literal('`gl_clase`.`eliminado` = false AND `gl_clase`.`habilitado` = true AND  `padre`.`padre` IS NOT NULL AND (`gl_clase`.`nombre` LIKE "%'+busqueda+'%" OR `padre`.`nombre` LIKE "%'+busqueda+'%")');
		}
		Tipo.find({
			where:{empresa: empresa, nombre_corto:nombre_corto}
		})
		.then(tipo=>{
			condicion.tipo=tipo.id;
			Clase.findAll({
				where: condicion,
				include: [
					{model:Clase, as:'padre', where:cond},
					{model: MantenimientoEspecialidadPrecios, as:'PreciosEspecialidad'}
				]
			})
			.then(registros =>{
				res.json({error:false, especialidades:registros});
			})
			.catch(err=>{
				res.json({error:true, err:err})
			})
		})
		.catch(e=>{
			res.json({error:true, message:"No existe nombre corto MTM_TEM en la empresa \n"+e})
		})
	})

	router.route('/cargos-empresa/empresa/:id_empresa')
		.get(ensureAuthorizedlogged, function (req, res) {
			Tipo.find({
				where: {
					nombre_corto: 'RRHH_CARGO',
					id_empresa: req.params.id_empresa
				},
				include: [
					{ model: Clase, as: 'clases', required: false, where: { eliminado: false }, include: [{model: CorrelativoOt, as: 'correlativoOt', include: [{model: Sucursal, as: 'sucursal', } ]} ] }, 
					{ model: RrhhClaseAsuencia, as: 'ausencias', required: false }]
			}).then(function (entidad) {
				res.json(entidad);
			});
		});
	
	router.route('/tipos-empresa/:nombre_corto/empresa/:id_empresa')
        .get(function (req, res) {
            Tipo.find({
                where: {
                    nombre_corto: req.params.nombre_corto,
                    id_empresa: req.params.id_empresa
                },
                include: [{ model: Clase, as: 'clases', required: false, where: { eliminado: false } }]
            }).then(function (entidad) {
                res.json(entidad);
            }).catch(function (err) {
                res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
            });;
        });
}