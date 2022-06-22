const cliente = require("../modelos/AGIL/cliente");

module.exports = function (router, sequelize, Sequelize, Compra, Proveedor, Almacen, Sucursal, Empresa, Venta, Cliente, Movimiento, Clase,
	Inventario, Producto, DetalleVenta, DetalleCompra, Usuario, Diccionario, PagoVenta, Persona, VendedorVenta, UsuarioGrupos, ClienteAnticipo, ProveedorAnticipo, PagoCompra, MantenimientoOrdenTrabajo, PagoOT, ensureAuthorizedlogged, Tipo, SolicitudCajaChica, MedicoPaciente, RrhhEmpleadoFicha, ConceptoMovimientoCajaChica, CajaChica, CajaChicaRendicionFondo,
	RrhhViajeConductor, CajaChicaDetalleRendicionFondo, CajaChicaGasto, CajaChicaDetalleRendicionFondoCentroCosto, CajaChicaNivelGasto,
	AsientoContabilidad, ComprobanteContabilidad,CuentaTransaccion,Banco, DetalleTransaccion, Proforma, Cliente, DetallesProformas, Servicios) {

	router.route('/reportes/libro-compras/:id_empresa/gestion/:gestion/mes/:mes/conceptos/:conceptos')
		.get(ensureAuthorizedlogged, async function (req, res) {
			try {
				var meses = new Date(req.params.gestion, parseInt(req.params.mes), 0);
				let anio = req.params.gestion;
				let mes = parseInt(req.params.mes);
				let dias = meses.getDate();
				var primerDia = anio+'-'+mes+'-01';
				var ultimoDia = anio+'-'+mes+'-'+dias;
				var movimientos = req.params.conceptos.toString();
				
				var query ='SELECT DISTINCT compra.id AS id,compra.observacion AS observacion,compra.fecha AS fecha,proveedor.nit AS nit,proveedor.razon_social AS razon_social,compra.factura AS factura,compra.dui AS dui,compra.autorizacion AS autorizacion,compra.importe AS importe,compra.excento+compra.ice AS no_sujeto,compra.importe-compra.excento-compra.ice AS subtotal,compra.excento AS excento,compra.ice AS ice,compra.descuento AS descuento,compra.total AS base_cf,compra.codigo_control AS codigo_control,tipoComprobante.nombre AS tipo_comprobante,comprobante.numero AS numero_comprobante,caja.numero_correlativo AS numero_caja FROM inv_compra compra INNER JOIN sys_usuario usuario ON usuario.id=compra.usuario INNER JOIN agil_proveedor proveedor ON proveedor.id=compra.proveedor LEFT JOIN inv_movimiento movimiento ON movimiento.id=compra.movimiento LEFT JOIN agil_asiento_contabilidad asiento ON asiento.id=compra.asiento_contabilidad AND asiento.eliminado=FALSE LEFT JOIN agil_comprobante_contabilidad comprobante ON comprobante.id=asiento.comprobante AND comprobante.eliminado=FALSE LEFT JOIN gl_clase tipoComprobante ON comprobante.tipo=tipoComprobante.id LEFT JOIN agil_caja_chica caja ON caja.compra=compra.id WHERE usuario.empresa='+req.params.id_empresa+' AND movimiento.clase IN ('+movimientos+') AND compra.fecha BETWEEN "'+ primerDia +' 00:00:00" AND "'+ultimoDia +' 23:59:59" ORDER BY compra.fecha asc';
				sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
				.then(function (registros) {
					let importe =  registros.reduce((acc, act) => (acc+act.importe), 0);
					let noSujeto =  registros.reduce((acc, act) => (acc+act.no_sujeto), 0);
					let subtotal = registros.reduce((acc, act) => (acc+act.subtotal), 0);
					let descuento = registros.reduce((acc, act) => (acc+act.descuento), 0);
					let baseCf = registros.reduce((acc, act) => (acc+act.base_cf), 0);
					let cf = registros.reduce((acc, act) => (acc+ (act.base_cf*.13)), 0);
					res.json({ registros: registros, totales: { importe: importe, noSujeto: noSujeto, subtotal:subtotal, descuento:descuento, baseCf: baseCf, cf:cf} });
				});	
				

			} catch (error) {
				res.json({ hasErr: true, mensaje: error })
			}
		});

	router.route('/reportes/libro-ventas/:id_empresa/gestion/:gestion/mes/:mes/movimiento/:id_movimiento')
		.get(ensureAuthorizedlogged, function (req, res) {
			var mes = new Date(req.params.gestion, parseInt(req.params.mes), 0);
			var primerDia = new Date(req.params.gestion, parseInt(req.params.mes) - 1, 1, 0, 0, 0);
			var ultimoDia = new Date(req.params.gestion, parseInt(req.params.mes) - 1, mes.getDate(), 23, 59, 59);
			var condicionMovimiento = {}
			if (req.params.id_movimiento == "SERV") {
				condicionMovimiento = { nombre_corto: { $in: ["SERV"] } }
			} else if (req.params.id_movimiento == "FACT") {
				condicionMovimiento = { nombre_corto: { $in: ["FACT"] } }
			} else {
				condicionMovimiento = { nombre_corto: { $in: ["FACT", "SERV"] } }
			}
			Empresa.find({
				where: {
					id: req.params.id_empresa
				}
			}).then(function (empresa) {
				Venta.findAll({
					where: {
						fecha: { $between: [primerDia, ultimoDia] }
					},
					include: [{ model: Cliente, as: 'cliente' },
					{ model: Movimiento, as: 'movimiento', include: [{ model: Clase, as: 'clase', where: condicionMovimiento }] },
					{
						model: Almacen, as: 'almacen',
						include: [{ model: Sucursal, as: 'sucursal', where: { id_empresa: req.params.id_empresa } }]
					}]
					// order: [[{raw:'fecha + factura DESC'}]]
				}).then(function (ventas) {
					Venta.findAll({
						where: {
							fecha: { $between: [primerDia, ultimoDia] }
						},
						include: [{ model: Cliente, as: 'cliente' },
						{ model: Clase, as: 'movimientoServicio', condicionMovimiento },
						{
							model: Sucursal, as: 'sucursal', where: { id_empresa: req.params.id_empresa }
						}]
						// order: [[{raw:'fecha + factura DESC'}]]

					}).then(function (ventas2) {

						var entity = ventas.concat(ventas2);
						entity = entity.sort(function (a, b) {
							if (a.fecha == b.fecha) {
								return (a.factura < b.factura) ? -1 : (a.factura > b.factura) ? 1 : 0;
							}
							else {
								return (a.fecha < b.fecha) ? -1 : 1;
							}
							// return a.factura - b.factura;
						});
						// entity = entity.sort(function (a, b) {
						// 	return a.fecha - b.fecha;
						// });
						res.json({ ventas: entity, empresa: empresa });


					});
				});
			});
		});

	router.route('/reportes/inventario/empresa/:id_empresa/sucursal/:id_sucursal/almacen/:id_almacen')
		.get(ensureAuthorizedlogged, function (req, res) {
			var condicionSucursal = {}, condicionAlmacen = {};
			if (req.params.id_sucursal != 0) {
				condicionSucursal = { id: req.params.id_sucursal }
			}
			if (req.params.id_almacen != 0) {
				condicionAlmacen = { id: req.params.id_almacen }
			}

			Inventario.findAll({
				where: { cantidad: { $gt: 0 } },
				include: [{ model: Producto, as: 'producto', required: true },
				{
					model: Almacen, as: 'almacen', where: condicionAlmacen,
					include: [{
						model: Sucursal, as: 'sucursal', where: condicionSucursal,
						include: [{ model: Empresa, as: 'empresa', where: { id: req.params.id_empresa } }]
					}]
				}]
			}).then(function (inventarios) {
				res.json(inventarios);
			});
		});
	router.route('/reportes/empresa/:id_empresa/sucursal/:id_sucursal/almacen/:id_almacen/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/user/:id_usuario')
		.get(ensureAuthorizedlogged, function (req, res) {
			UsuarioGrupos.findAll({
				where: { id_usuario: req.params.id_usuario }
			}).then(function (grupos) {
				var gruposLiteral = "("
				var gruposUsuario = grupos.map(function (grupo, i) {
					if (i == grupos.length - 1) {
						gruposLiteral += grupo.id_grupo + ')'
					} else {
						gruposLiteral += grupo.id_grupo + ','
					}
					return grupo.id_grupo
				})
				var condicionSucursal = {}, condicionAlmacen = {};
				if (req.params.id_sucursal != 0) {
					condicionSucursal = { id: req.params.id_sucursal }
				}
				if (req.params.id_almacen != 0) {
					condicionAlmacen = { id: req.params.id_almacen }
				}
				var condicionProducto = "e.id=" + req.params.id_empresa;
				if (req.params.id_sucursal != 0) {
					condicionProducto = condicionProducto + " and s.activo = 1 and s.id =" + req.params.id_sucursal;
				}
				if (req.params.id_almacen != 0) {
					condicionProducto = condicionProducto + " and a.id =" + req.params.id_almacen;
				}
				if (req.params.texto_busqueda != 0) {
					condicionProducto = condicionProducto + " and (p.codigo like '%" + req.params.texto_busqueda + "%' or  p.nombre like '%" + req.params.texto_busqueda + "%' or p.unidad_medida like '%" + req.params.texto_busqueda + "%' or p.descripcion like '%" + req.params.texto_busqueda + "%' or gr.nombre like '%" + req.params.texto_busqueda + "%' or sgr.nombre like '%" + req.params.texto_busqueda + "%')";
				}
				condicionProducto = condicionProducto + " and i.cantidad != 0 and p.grupo in " + gruposLiteral;

				sequelize.query("SELECT count(p.id), i.id\
							FROM inv_inventario AS i\
							INNER JOIN agil_producto AS p ON (i.producto = p.id)\
							INNER JOIN agil_almacen As a ON (i.almacen = a.id)\
							LEFT JOIN inv_detalle_compra As d ON (i.id = d.inventario)\
							INNER JOIN agil_sucursal As s ON (a.sucursal = s.id)\
							INNER JOIN agil_empresa As e ON (s.empresa = e.id)\
							LEFT JOIN gl_clase As gr ON (p.grupo = gr.id)\
							LEFT JOIN gl_clase As sgr ON (p.subgrupo = sgr.id)\
							where "+ condicionProducto + "\
			                GROUP BY i.id")
					.then(function (data) {
						sequelize.query("SELECT i.id,p.codigo,i.cantidad,sgr.nombre as subgrupo ,gr.nombre as grupo,p.unidad_medida,p.precio_unitario,p.descripcion,p.inventario_minimo,p.caracteristica_especial1,p.caracteristica_especial2,p.codigo_fabrica, p.nombre,i.fecha_vencimiento,i.lote,a.nombre AS nombre_almacen,s.nombre AS nombre_sucursal,i.costo_total AS costo_total, i.costo_unitario AS costo_unitario\
							FROM inv_inventario AS i\
							INNER JOIN agil_producto AS p ON (i.producto = p.id)\
							INNER JOIN agil_almacen As a ON (i.almacen = a.id)\
							LEFT JOIN inv_detalle_compra As d ON (i.id = d.inventario)\
							INNER JOIN agil_sucursal As s ON (a.sucursal = s.id)\
							INNER JOIN agil_empresa As e ON (s.empresa = e.id)\
							LEFT JOIN gl_clase As gr ON (p.grupo = gr.id)\
							LEFT JOIN gl_clase As sgr ON (p.subgrupo = sgr.id)\
							where "+ condicionProducto + "\
			                GROUP BY i.id, d.id  order by "+ req.params.columna + " " + req.params.direccion + " LIMIT " + (req.params.items_pagina * (req.params.pagina - 1)) + "," + req.params.items_pagina)
							.then(function (inventario) {
								res.json({ inventario: inventario[0], paginas: Math.ceil(data[0].length / req.params.items_pagina) });
							});
					});
				//old cahnge at 12/04/2018
				// Inventario.findAndCountAll({
				// 	where: { cantidad: { $gt: 0 } },
				// 	include: [{ model: Producto, as: 'producto', required: true, where: { id_grupo: { $in: gruposUsuario } } },
				// 	{
				// 		model: Almacen, as: 'almacen', where: condicionAlmacen,
				// 		include: [{
				// 			model: Sucursal, as: 'sucursal', where: condicionSucursal,
				// 			include: [{ model: Empresa, as: 'empresa', where: { id: req.params.id_empresa } }]
				// 		}]
				// 	}],
				// 	order: [['id', 'asc']]
				// 	// group:[Inventario, 'id']		
				// }).then(function (data) {
				// 	sequelize.query("SELECT i.id,p.codigo,i.cantidad,sgr.nombre as subgrupo ,gr.nombre as grupo,p.unidad_medida,p.precio_unitario,p.descripcion,p.inventario_minimo,p.caracteristica_especial1,p.caracteristica_especial2,p.codigo_fabrica, p.nombre,i.fecha_vencimiento,i.lote,i.costo_unitario,i.costo_total,a.nombre AS nombre_almacen,s.nombre AS nombre_sucursal\
				// 			FROM inv_inventario AS i\
				// 			INNER JOIN agil_producto AS p ON (i.producto = p.id)\
				// 			INNER JOIN agil_almacen As a ON (i.almacen = a.id)\
				// 			INNER JOIN agil_sucursal As s ON (a.sucursal = s.id)\
				// 			INNER JOIN agil_empresa As e ON (s.empresa = e.id)\
				// 			LEFT JOIN gl_clase As gr ON (p.grupo = gr.id)\
				// 			LEFT JOIN gl_clase As sgr ON (p.subgrupo = sgr.id)\
				// 			where "+ condicionProducto + "\
				//             GROUP BY i.id  order by "+ req.params.columna + " " + req.params.direccion + " LIMIT " + (req.params.items_pagina * (req.params.pagina - 1)) + "," + req.params.items_pagina)
				// 		.then(function (inventario) {
				// 			res.json({ inventario: inventario[0], paginas: Math.ceil(data.count / req.params.items_pagina) });
				// 		});
				// });
			})
		});

	router.route('/reportes/empresa/:id_empresa/sucursal/:id_sucursal/almacen/:id_almacen/user/:id_usuario')
		.get(ensureAuthorizedlogged, function (req, res) {
			UsuarioGrupos.findAll({
				where: { id_usuario: req.params.id_usuario }
			}).then(function (grupos) {
				var gruposLiteral = "("
				var gruposUsuario = grupos.map(function (grupo, i) {
					if (i == grupos.length - 1) {
						gruposLiteral += grupo.id_grupo + ')'
					} else {
						gruposLiteral += grupo.id_grupo + ','
					}
					return grupo.id_grupo
				})
				var condicionProducto = "e.id=" + req.params.id_empresa;
				if (req.params.id_sucursal != 0) {
					condicionProducto = condicionProducto + " and s.activo = 1 and s.id =" + req.params.id_sucursal;
				}
				if (req.params.id_almacen != 0) {
					condicionProducto = condicionProducto + " and a.id =" + req.params.id_almacen;
				}
				condicionProducto = condicionProducto + " and i.cantidad != 0 and p.grupo in " + gruposLiteral;
				sequelize.query("SELECT i.id,p.codigo,i.cantidad,sgr.nombre as subgrupo ,gr.nombre as grupo,p.unidad_medida,p.precio_unitario,p.descripcion,p.inventario_minimo,p.caracteristica_especial1,p.caracteristica_especial2,p.codigo_fabrica, p.nombre,i.fecha_vencimiento,i.lote,i.costo_unitario,i.costo_total,a.nombre AS nombre_almacen,s.nombre AS nombre_sucursal\
							FROM inv_inventario AS i\
							INNER JOIN agil_producto AS p ON (i.producto = p.id)\
							INNER JOIN agil_almacen As a ON (i.almacen = a.id)\
							INNER JOIN agil_sucursal As s ON (a.sucursal = s.id)\
							INNER JOIN agil_empresa As e ON (s.empresa = e.id)\
							LEFT JOIN gl_clase As gr ON (p.grupo = gr.id)\
							LEFT JOIN gl_clase As sgr ON (p.subgrupo = sgr.id)\
							where "+ condicionProducto + "\
			                GROUP BY i.id  order by p.codigo")
					.then(function (inventario) {
						res.json({ inventario: inventario[0] });
					});
			})
		});


	router.route('/reportes/ventas-mensuales/:id_empresa/sucursal/:id_sucursal/inicio/:inicio/fin/:fin')
		.get(ensureAuthorizedlogged, function (req, res) {
			var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0, 0);
			var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 59, 59);
			var condicionVenta = { id_empresa: req.params.id_empresa };
			if (req.params.id_sucursal != 0) {
				condicionVenta.id = req.params.id_sucursal;
			}
			Empresa.find({
				where: {
					id: req.params.id_empresa
				}
			}).then(function (empresa) {
				DetalleVenta.findAll({
					include: [{
						model: Producto, as: 'producto', required: true,
						include: [{ model: Clase, as: 'grupo' }, { model: Clase, as: 'subgrupo' }]
					},
					{
						model: Venta, as: 'venta', where: { fecha: { $between: [inicio, fin] }, activa: true },
						include: [{ model: Cliente, as: 'cliente', required: true },
						{ model: Clase, as: 'tipoPago' },
						{ model: Usuario, as: 'usuario', required: true, attributes: ['id', 'id_persona', 'id_empresa', 'nombre_usuario'] },
						{
							model: VendedorVenta, as: 'vendedor', required: false,
							include: [{ model: Persona, as: 'persona', required: false }]
						},
						{ model: Movimiento, as: 'movimiento', include: [{ model: Clase, as: 'clase', where: { $or: [{ nombre_corto: "FACT" }, { nombre_corto: "PFR" }] } }] },
						{
							model: Almacen, as: 'almacen',
							include: [{ model: Sucursal, as: 'sucursal', where: condicionVenta }]
						}]
					},
					{ model: Inventario, as: 'inventario' }],
					order: [[{ model: Venta, as: 'venta' }, 'fecha', 'ASC']]
				}).then(function (detallesVenta) {
					//res.header('Content-Length', 1114566456456938848);			
					res.json({ detallesVenta: JSON.stringify(detallesVenta), empresa: empresa });
				});
			});
		});
	
	router.route('/reportes-excel/ventas-mensuales/:id_empresa/sucursal/:id_sucursal/inicio/:inicio/fin/:fin')
		.get(ensureAuthorizedlogged, function (req, res) {
			var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0, 0);
			var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 59, 59);
			var condicionVenta = { id_empresa: req.params.id_empresa };
			if (req.params.id_sucursal != 0) {
				condicionVenta.id = req.params.id_sucursal;
			}
			Empresa.find({
				where: {
					id: req.params.id_empresa
				}
			}).then(function (empresa) {
				DetalleVenta.findAll({
					include: [{
						model: Producto, as: 'producto', required: true,
						include: [{ model: Clase, as: 'grupo' }, { model: Clase, as: 'subgrupo' }]
					},
					{
						model: Venta, as: 'venta', where: { fecha: { $between: [inicio, fin] }, activa: true },
						include: [{ model: Cliente, as: 'cliente', required: true },
						{ model: Clase, as: 'tipoPago' },
						{ model: Usuario, as: 'usuario', required: true, attributes: ['id', 'id_persona', 'id_empresa', 'nombre_usuario'] },
						{
							model: VendedorVenta, as: 'vendedor', required: false,
							include: [{ model: Persona, as: 'persona', required: false }]
						},
						{ model: Movimiento, as: 'movimiento', include: [{ model: Clase, as: 'clase', where: { $or: [{ nombre_corto: "FACT" }, { nombre_corto: "PFR" }] } }] },
						{
							model: Almacen, as: 'almacen',
							include: [{ model: Sucursal, as: 'sucursal', where: condicionVenta }]
						}]
					},
					{ model: Inventario, as: 'inventario' }],
					order: [[{ model: Venta, as: 'venta' }, 'fecha', 'ASC']]
				}).then(function (detallesVenta) {
					//res.header('Content-Length', 1114566456456938848);
					if (detallesVenta.length > 0) {
						var datosDetalles = [];
						for (var i = 0; i < detallesVenta.length; i++) {
							var columns = [];
							detallesVenta[i].venta.fecha = new Date(detallesVenta[i].venta.fecha);
							columns.push(detallesVenta[i].venta.fecha);
							columns.push(detallesVenta[i].venta.factura);
							columns.push(detallesVenta[i].venta.autorizacion);
							columns.push(detallesVenta[i].venta.cliente.nit);
							columns.push(detallesVenta[i].venta.cliente.razon_social);
							columns.push(detallesVenta[i].venta.cliente.ubicacion_geografica);
							columns.push(detallesVenta[i].producto.codigo);
							columns.push(detallesVenta[i].producto.nombre);
							columns.push(detallesVenta[i].producto.descripcion);
							columns.push(detallesVenta[i].producto.unidad_medida);
							if (detallesVenta[i].producto.grupo) {
								columns.push(detallesVenta[i].producto.grupo.nombre);
							} else {
								columns.push("");
							}
							columns.push(detallesVenta[i].cantidad);
							columns.push(detallesVenta[i].precio_unitario);
							columns.push(detallesVenta[i].importe);
							columns.push(detallesVenta[i].ice);
							columns.push(0);
							columns.push(0);
							columns.push(detallesVenta[i].importe - detallesVenta[i].ice);
							var descuento = detallesVenta[i].importe - detallesVenta[i].ice - detallesVenta[i].excento + detallesVenta[i].recargo;
							columns.push(detallesVenta[i].descuento);
							columns.push(detallesVenta[i].total);
							columns.push(Math.round((detallesVenta[i].total * 0.13) * 100) / 100);
							columns.push(detallesVenta[i].venta.almacen.sucursal.nombre);
							columns.push(detallesVenta[i].venta.usuario.nombre_usuario);
							columns.push(detallesVenta[i].venta.tipoPago.nombre);
	
							if (empresa.usar_vencimientos) {
								if (detallesVenta[i].inventario) {
									detallesVenta[i].inventario.fecha_vencimiento = new Date(detallesVenta[i].inventario.fecha_vencimiento);
									columns.push(detallesVenta[i].inventario.fecha_vencimiento);
									columns.push(detallesVenta[i].inventario.lote);
								} else if (detallesVenta[i].lote != null) {
									detallesVenta[i].fecha_vencimiento = new Date(detallesVenta[i].fecha_vencimiento);
									columns.push(detallesVenta[i].fecha_vencimiento);
									columns.push(detallesVenta[i].lote);
								} else {
									columns.push("");
									columns.push("");
								}
							}
	
							columns.push((detallesVenta[i].venta.vendedor ? detallesVenta[i].venta.vendedor.persona.nombre_completo : ""));
							columns.push(detallesVenta[i].venta.almacen.nombre);
	
							datosDetalles.push(columns);
						}
						res.json({ hasError: false, detallesVenta: datosDetalles, empresa: empresa });
					}else{
						res.json({ hasError: true, message: 'No se encontraron registros de ventas en el periodo', empresa: empresa });
					}			
					
				}).catch(err=>{
					res.json({ hasError: true, message: err.stack, err: err})
				})
			});
		});

	router.route('/reportes/compras-mensuales/:id_empresa/sucursal/:id_sucursal/inicio/:inicio/fin/:fin')
		.get(ensureAuthorizedlogged, function (req, res) {
			var inicio = new Date(req.params.inicio); 
			var fin = new Date(req.params.fin); 
			let mesInicio = inicio.getMonth() + 1;
			let mesFin = fin.getMonth() +1;
			var fechaInicio = inicio.getFullYear()+"-"+mesInicio+"-"+inicio.getDate()+" 00:00:00";
			var fechaFinal = fin.getFullYear()+"-"+mesFin+"-"+fin.getDate()+" 23:59:59";
			var query = "SELECT * FROM( SELECT compra.fecha AS fecha_factura, compra.factura AS numero_factura,compra.autorizacion AS numero_autorizacion,`compra.proveedor`.nit AS nit_proveedor,`compra.proveedor`.razon_social AS razon_social_proveedor,producto.codigo AS codigo_producto,producto.nombre AS nombre_producto,producto.unidad_medida AS unidad_producto,`producto.grupo`.nombre AS grupo_producto,inv_detalle_compra.cantidad AS cantidad_detalle,inv_detalle_compra.costo_unitario AS pu_detalle,inv_detalle_compra.importe AS importe_detalle,inv_detalle_compra.ice AS ice_detalle,inv_detalle_compra.excento AS excento_detalle,inv_detalle_compra.importe-inv_detalle_compra.ice AS subtotal_detalle,inv_detalle_compra.descuento AS descuento_detalle,inv_detalle_compra.total AS total_detalle,inventario.fecha_vencimiento AS vencimiento_inv,inventario.lote AS lote_inv,`compra.almacen.sucursal`.nombre AS nombre_sucursal,`compra.almacen`.nombre AS nombre_almacen,centroCosto.nombre AS nombre_cenco, inv_detalle_compra.recargo AS recargo_detalle, usuario.nombre_usuario  FROM `inv_detalle_compra` AS `inv_detalle_compra` LEFT JOIN `inv_inventario` AS `inventario` ON `inv_detalle_compra`.`inventario`=`inventario`.`id` LEFT JOIN `agil_producto` AS `producto` ON `inv_detalle_compra`.`producto`=`producto`.`id` LEFT JOIN `gl_clase` AS `producto.grupo` ON `producto`.`grupo`=`producto.grupo`.`id` INNER JOIN `inv_compra` AS `compra` ON `inv_detalle_compra`.`compra`=`compra`.`id` AND `compra`.`fecha` BETWEEN '"+fechaInicio+"' AND '"+fechaFinal+"' LEFT JOIN sys_usuario usuario ON usuario.id=compra.usuario LEFT OUTER JOIN `agil_proveedor` AS `compra.proveedor` ON `compra`.`proveedor`=`compra.proveedor`.`id` LEFT OUTER JOIN `agil_almacen` AS `compra.almacen` ON `compra`.`almacen`=`compra.almacen`.`id` INNER JOIN `agil_sucursal` AS `compra.almacen.sucursal` ON `compra.almacen`.`sucursal`=`compra.almacen.sucursal`.`id`"
			if(req.params.id_sucursal != 0){

				query += " AND `compra.almacen.sucursal`.`id`="+req.params.id_sucursal
			}else{
				query += " AND `compra.almacen.sucursal`.`empresa`="+req.params.id_empresa
			}
			query += " LEFT JOIN `gl_clase` AS `centroCosto` ON `inv_detalle_compra`.`centro_costo`=`centroCosto`.`id`   UNION ALL SELECT compra.fecha AS fecha_factura,compra.factura AS numero_factura,compra.autorizacion AS numero_autorizacion,`compra.proveedor`.nit AS nit_proveedor,`compra.proveedor`.razon_social AS razon_social_proveedor,NULL AS codigo_producto,NULL AS nombre_producto,NULL AS unidad_producto,NULL AS grupo_producto,inv_detalle_compra.cantidad AS cantidad_detalle,inv_detalle_compra.costo_unitario AS pu_detalle,inv_detalle_compra.importe AS importe_detalle,inv_detalle_compra.ice AS ice_detalle,inv_detalle_compra.excento AS excento_detalle,inv_detalle_compra.importe-inv_detalle_compra.ice AS subtotal_detalle,inv_detalle_compra.descuento AS descuento_detalle,inv_detalle_compra.total AS total_detalle,NULL AS vencimiento_inv,NULL AS lote_inv,NULL AS nombre_sucursal,NULL AS nombre_almacen,NULL AS nombre_cenco, inv_detalle_compra.recargo AS recargo_detalle, usuario.nombre_usuario FROM `inv_detalle_compra` AS `inv_detalle_compra` INNER JOIN `gl_clase` AS `servicio` ON `inv_detalle_compra`.`servicio`=`servicio`.`id` INNER JOIN `inv_compra` AS `compra` ON `inv_detalle_compra`.`compra`=`compra`.`id` AND `compra`.`fecha` BETWEEN '"+fechaInicio+"' AND '"+fechaFinal+"' LEFT JOIN sys_usuario usuario ON usuario.id=compra.usuario LEFT JOIN `agil_proveedor` AS `compra.proveedor` ON `compra`.`proveedor`=`compra.proveedor`.`id` LEFT OUTER JOIN `agil_almacen` AS `compra.almacen` ON `compra`.`almacen`=`compra.almacen`.`id` INNER JOIN `agil_sucursal` AS `compra.almacen.sucursal` ON `compra.almacen`.`sucursal`=`compra.almacen.sucursal`.`id`";
			if(req.params.id_sucursal != 0){
				query += " AND `compra.almacen.sucursal`.`id`="+req.params.id_sucursal
			}else{
				query += " AND `compra.almacen.sucursal`.`empresa`="+req.params.id_empresa
			}
			query+=" ) registros ORDER BY registros.fecha_factura ASC;"
			sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
					.then(compras => {
						res.json({compras: compras});
						console.log("asd");
					});
		});

	router.route('/reportes/estado-resultados-no-contable/:id_empresa/inicio/:inicio/fin/:fin')
		.get(ensureAuthorizedlogged, function (req, res) {
			var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0, 0);
			var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 59);
			var condicionVenta = { fecha: { $between: [inicio, fin] }, activa: true };
			Venta.findAll({
				where: condicionVenta,
				include: [{
					model: Movimiento, as: 'movimiento',
					include: [{ model: DetalleMovimiento, as: 'detallesMovimiento' },
					{ model: Clase, as: 'clase' }]
				},
				{ model: DetalleVenta, as: 'detallesVenta' },
				{ model: Clase, as: 'tipoPago' },
				{
					model: Almacen, as: 'almacen',
					include: [{
						model: Sucursal, as: 'sucursal',
						include: [{ model: Empresa, as: 'empresa', where: { id: req.params.id_empresa } }]
					}]
				}]
			}).then(function (entity) {
				res.json(entity);
			});
		});

	router.route('/reportes/estado-cuentas-proveedores/:id_empresa')
		.get(ensureAuthorizedlogged, function (req, res) {
			Proveedor.findAll({
				where: { id_empresa: req.params.id_empresa },
				include: [{
					model: Compra, as: 'compras', where: { 'saldo': { $gt: 0 } }, include: [{ model: Almacen, as: 'almacen', include: [{ model: Sucursal, as: 'sucursal' }] }, { model: Clase, as: 'tipoPago', where: { nombre_corto: Diccionario.TIPO_PAGO_CREDITO } },
					{ model: PagoCompra, as: 'pagosCompra', required: false, include: [{ model: ProveedorAnticipo, as: 'anticipos', required: false },{ model: CuentaTransaccion, as: 'transaccion', required: false}] }]
				}],
			}).then(function (entidad) {
				res.json(entidad);
			});
		});
	router.route('/reportes/estado-cuentas-proveedores/detalle/:id_proveedor') ///para filtro de los detalles de un proveedpr
		.get(ensureAuthorizedlogged, function (req, res) {
			Compra.findAll({
				where: { 'saldo': { $gt: 0 }, id_proveedor:req.params.id_proveedor },
					include: [{ model: Almacen, as: 'almacen', include: [{ model: Sucursal, as: 'sucursal' }] }, { model: Clase, as: 'tipoPago', where: { nombre_corto: Diccionario.TIPO_PAGO_CREDITO } },
					{ model: PagoCompra, as: 'pagosCompra', required: false, include: [{ model: ProveedorAnticipo, as: 'anticipos', required: false },{ model: CuentaTransaccion, as: 'transaccion', required: false}] }]
				
			}).then(function (entidad) {
				res.json(entidad);
			});
		});

	router.route('/reportes/estado-cuentas-clientes/:id_empresa')
		.get(ensureAuthorizedlogged, function (req, res) {
			Cliente.findAll({
				where: { id_empresa: req.params.id_empresa },
				include: [{
					model: Venta, as: 'ventas', where: { tipo_pago: '18', 'saldo': { $gt: 0 }, activa: true },
					include: [{
						model: Movimiento, as: 'movimiento',
						include: [{ model: Clase, as: 'clase' }]
					}]
				}],
			}).then(function (entidad) {
				res.json(entidad);
			});
		});


	router.route('/reportes/estado-cuentas-clientes/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/cuentas-liquidadas/:cuentas_liquidadas')
		.get(ensureAuthorizedlogged, function (req, res) {
			var condicionCliente = { id_empresa: req.params.id_empresa/*,codigo:{$not:null}*/ };
			var cuentasLiquidadas = { saldo: { $gt: 0 }, activa: true };
			console.log(cuentasLiquidadas);
			if (req.params.cuentas_liquidadas != 0) {
				console.log("esto es:" + req.params.cuentas_liquidadas)
				cuentasLiquidadas = { saldo: { $eq: 0 }, activa: true };
				console.log(cuentasLiquidadas);
			}
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

			Cliente.findAndCountAll({
				where: condicionCliente,
				include: [{ model: Empresa, as: 'empresa' }],
				include: [{
					model: Venta, as: 'ventas', where: cuentasLiquidadas,
					include: [{ model: Clase, as: 'tipoPago', where: { nombre_corto: Diccionario.TIPO_PAGO_CREDITO } },
					{ model: PagoVenta, as: 'pagosVenta', required: false, inclide: [{ model: ClienteAnticipo, as: 'anticipos', required: false }] },
					{ model: Almacen, as: 'almacen', include: [{ model: Sucursal, as: 'sucursal' }] },
					{
						model: Movimiento, as: 'movimiento',
						include: [{ model: Clase, as: 'clase' }]
					}]
				}],
				order: [['id', 'asc']]
			}).then(function (data) {
				var paginas = Math.ceil(data.count / req.params.items_pagina);
				var datosCliente = {
					where: condicionCliente,
					include: [{
						model: Venta, as: 'ventas', where: cuentasLiquidadas,
						include: [{ model: Clase, as: 'tipoPago', where: { nombre_corto: Diccionario.TIPO_PAGO_CREDITO } },
						{ model: PagoVenta, as: 'pagosVenta', required: false, include: [{ model: ClienteAnticipo, as: 'anticipos', required: false }] },
						{ model: Almacen, as: 'almacen', include: [{ model: Sucursal, as: 'sucursal' }] },
						{
							model: Movimiento, as: 'movimiento',
							include: [{ model: Clase, as: 'clase' }]
						}]
					}],
					order: [['id', 'asc']]
				}

				if (req.params.items_pagina != 0) {
					datosCliente.offset = (req.params.items_pagina * (req.params.pagina - 1));
					datosCliente.limit = req.params.items_pagina;
				} else {
					paginas = 1;
				}


				Cliente.findAll(
					datosCliente
				).then(function (clientes) {
					res.json({ clientes: clientes, paginas: paginas });
				});
			});
		});

	router.route('/reportes-mantenimiento/estado-cuentas-clientes/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/cuentas-liquidadas/:cuentas_liquidadas')
		.get(ensureAuthorizedlogged, function (req, res) {
			// var condicionCliente = { id_empresa: req.params.id_empresa/*,codigo:{$not:null}*/ };
			// si ot importe es null o saldo mayor a 0
			// estados pendiente y saldo = 0
			// finalizado y saldo > 0


			// var cuentasLiquidadas = { $or: [{saldo: { $gt: 0 }}, {importe_facturado: { $is: null } }]  };

			// ( `agil_mantenimiento_orden_trabajo`.`saldo` = 0 AND `agil_mantenimiento_orden_trabajo`.`importe_facturado` IS NULL ) OR (`agil_mantenimiento_orden_trabajo`.`saldo` > 0 AND `agil_mantenimiento_orden_trabajo`.`importe_facturado` IS NOT NULL)
			// var cuentasLiquidadas = { saldo: { $gt: 0 } };
			// var cuentasLiquidadas = { 
			// 	$or: {
			// 		$and: [{saldo: 0},{importe_facturado: { $is: null }}], 
			// 		$and: [{ saldo: { $gt: 0 } },{importe_facturado: { $ne: null }}]
			// 	}
			// };
			var condicionCliente = Sequelize.literal('`agil_cliente`.`empresa` = '+req.params.id_empresa+' AND (( `mantenimiento_ot`.`saldo` = 0 AND `mantenimiento_ot.estado`.`nombre_corto` = "PENDIENTE" ) OR (`mantenimiento_ot`.`saldo` > 0 AND `mantenimiento_ot.estado`.`nombre_corto` = "FINALIZADO"))');
			var estadosLiquidadas = {
				nombre_corto: {
					$in: ['PENDIENTE', 'FINALIZADO']
				}			
			}

			// 	where: [sequelize.where(sequelize.fn('DATEDIFF', sequelize.fn("NOW") , sequelize.literal('`inv_venta`.`fecha`')), {
				// 		$lte: diasParametro
				// 	}), { saldo: { $gt: 0 },  activa: true }],

			if (req.params.cuentas_liquidadas != 0) {
				console.log("esto es:" + req.params.cuentas_liquidadas)
				// cuentasLiquidadas = { saldo: { $eq: 0 } };
				var condicionCliente = Sequelize.literal('`agil_cliente`.`empresa` = '+req.params.id_empresa+' AND `mantenimiento_ot`.`saldo` = 0 AND `mantenimiento_ot.estado`.`nombre_corto` = "FINALIZADO"');
				estadosLiquidadas = {
					nombre_corto: 'FINALIZADO'		
				}
				// cuentasLiquidadas = { saldo: { $eq: 0 } };
			}
			if (parseInt(req.params.texto_busqueda)) {
				condicionCliente = { id_empresa: req.params.id_empresa/*,codigo:{$not:null}*/, nit: parseInt(req.params.texto_busqueda) }
				// var condicionCliente = Sequelize.literal('`agil_cliente`.`empresa` = '+req.params.id_empresa+' AND (( `mantenimiento_ot`.`saldo` = 0 AND `mantenimiento_ot.estado`.`nombre_corto` = "PENDIENTE" ) OR (`mantenimiento_ot`.`saldo` > 0 AND `mantenimiento_ot.estado`.`nombre_corto` = "FINALIZADO"))');
				condicionCliente = Sequelize.literal('`agil_cliente`.`empresa` = '+req.params.id_empresa+' AND `agil_cliente`.`nit` = '+parseInt(req.params.texto_busqueda)+' AND (( `mantenimiento_ot`.`saldo` = 0 AND `mantenimiento_ot.estado`.`nombre_corto` = "PENDIENTE" ) OR (`mantenimiento_ot`.`saldo` > 0 AND `mantenimiento_ot.estado`.`nombre_corto` = "FINALIZADO"))');
				if (req.params.cuentas_liquidadas != 0) {
					condicionCliente = Sequelize.literal("`agil_cliente`.`empresa` = "+req.params.id_empresa+" AND `agil_cliente`.`nit` = "+parseInt(req.params.texto_busqueda)+" \
				 			AND (`mantenimiento_ot`.`saldo` = 0 AND `mantenimiento_ot.estado`.`nombre_corto` = 'FINALIZADO')");
				}
			} else if (req.params.texto_busqueda != 0) {
				if (req.params.cuentas_liquidadas != 0) {
					condicionCliente = Sequelize.literal("`agil_cliente`.`empresa` = "+req.params.id_empresa+" \
				 			AND (`mantenimiento_ot`.`saldo` = 0 AND `mantenimiento_ot.estado`.`nombre_corto` = 'FINALIZADO' \
								AND (`agil_cliente`.`codigo` LIKE '%"+req.params.texto_busqueda+"%' \
									OR `agil_cliente`.`razon_social` LIKE '%"+req.params.texto_busqueda+"%' \
									OR `agil_cliente`.`direccion` LIKE '%"+req.params.texto_busqueda+"%' \
									OR `agil_cliente`.`rubro` LIKE '%"+req.params.texto_busqueda+"%' \
									OR `agil_cliente`.`categoria` LIKE '%"+req.params.texto_busqueda+"%' \
									OR `agil_cliente`.`ubicacion_geografica` LIKE '%"+req.params.texto_busqueda+"%')\
						    )");
				}else{
					condicionCliente = Sequelize.literal("`agil_cliente`.`empresa` = "+req.params.id_empresa+" \
				 			AND (`mantenimiento_ot`.`saldo` = 0 AND `mantenimiento_ot.estado`.`nombre_corto` = 'PENDIENTE' \
								AND (`agil_cliente`.`codigo` LIKE '%"+req.params.texto_busqueda+"%' \
									OR `agil_cliente`.`razon_social` LIKE '%"+req.params.texto_busqueda+"%' \
									OR `agil_cliente`.`direccion` LIKE '%"+req.params.texto_busqueda+"%' \
									OR `agil_cliente`.`rubro` LIKE '%"+req.params.texto_busqueda+"%' \
									OR `agil_cliente`.`categoria` LIKE '%"+req.params.texto_busqueda+"%' \
									OR `agil_cliente`.`ubicacion_geografica` LIKE '%"+req.params.texto_busqueda+"%')\
						    ) OR ( `mantenimiento_ot`.`saldo` > 0 AND `mantenimiento_ot.estado`.`nombre_corto` = 'FINALIZADO'\
							AND (`agil_cliente`.`codigo` LIKE '%"+req.params.texto_busqueda+"%' \
								OR `agil_cliente`.`razon_social` LIKE '%"+req.params.texto_busqueda+"%' \
								OR `agil_cliente`.`direccion` LIKE '%"+req.params.texto_busqueda+"%' \
								OR `agil_cliente`.`rubro` LIKE '%"+req.params.texto_busqueda+"%' \
								OR `agil_cliente`.`categoria` LIKE '%"+req.params.texto_busqueda+"%' \
								OR `agil_cliente`.`ubicacion_geografica` LIKE '%"+req.params.texto_busqueda+"%'\
							))");
				}
				
				// condicionCliente = {
				// 	id_empresa: req.params.id_empresa,
				// 	$or: [
				// 		{
				// 			codigo: {
				// 				$like: "%" + req.params.texto_busqueda + "%"
				// 			}
				// 		},
				// 		{
				// 			razon_social: {
				// 				$like: "%" + req.params.texto_busqueda + "%"
				// 			}
				// 		},
				// 		{
				// 			direccion: {
				// 				$like: "%" + req.params.texto_busqueda + "%"
				// 			}
				// 		},
				// 		{
				// 			rubro: {
				// 				$like: "%" + req.params.texto_busqueda + "%"
				// 			}
				// 		},
				// 		{
				// 			categoria: {
				// 				$like: "%" + req.params.texto_busqueda + "%"
				// 			}
				// 		},
				// 		{
				// 			ubicacion_geografica: {
				// 				$like: "%" + req.params.texto_busqueda + "%"
				// 			}
				// 		}

				// 	]
				// };
			}


			Cliente.count({
				distinct: true,
				where: condicionCliente,
				include: [{
					model: MantenimientoOrdenTrabajo, as: 'mantenimiento_ot', required: true, //where: cuentasLiquidadas,
					include: [//{ model: Clase, as: 'tipoPago', where: { nombre_corto: Diccionario.TIPO_PAGO_CREDITO } },
					{ model: PagoOT, as: 'pagosOT', required: false },
					{ model: Sucursal, as: 'sucursal' },
					{ model: Cliente, as: 'cliente_ot' },
					{ model: Clase, as: 'estado' }
					]
				},
				{ model: Empresa, as: 'empresa' }
				]
				// group: ["`agil_cliente`.`id`"],
				// order: [['id', 'asc']]
			}).then(function (data) {
				var paginas = Math.ceil(data / req.params.items_pagina);
				var datosCliente = {
					where: condicionCliente,
					include: [{
						model: MantenimientoOrdenTrabajo, as: 'mantenimiento_ot', required: true, //where: cuentasLiquidadas,
						include: [//{ model: Clase, as: 'tipoPago', where: { nombre_corto: Diccionario.TIPO_PAGO_CREDITO } },
						{ model: PagoOT, as: 'pagosOT', required: false },
						{ model: Sucursal, as: 'sucursal' },
						{ model: Cliente, as: 'cliente_ot' },
						{ model: Clase, as: 'estado' }
						]
					},
					{ model: Empresa, as: 'empresa' }
					],
					group: ["`agil_cliente`.`id`"],
					raw : true,
					nest : true
					// order: [['id', 'asc']]
				}

				if (req.params.items_pagina != 0) {
					// datosCliente.offset = (req.params.items_pagina * (req.params.pagina - 1));
					// datosCliente.limit = req.params.items_pagina;
					var textOrder = "`agil_cliente`.`id` ASC limit " + (req.params.items_pagina * (req.params.pagina - 1)) + ", " + req.params.items_pagina
					datosCliente.order = sequelize.literal(textOrder)
				} else {
					paginas = 1;
				}

				// crear otra ruta para obtener las OT del cliente ============
				Cliente.findAll(
					datosCliente
				).then(function (clientes) {
					res.json({ clientes: clientes, paginas: paginas });
				});
			});
		});

	router.route('/reportes-mantenimiento/estado-cuentas-clientes/detalles/:id_cliente/liquidados/:liquidados')
		.get(ensureAuthorizedlogged, function (req, res) {
			// corregir query con el de arribaa =======
			var cuentasLiquidadas = Sequelize.literal('`agil_mantenimiento_orden_trabajo`.`id_cliente` = '+req.params.id_cliente+' AND (( `agil_mantenimiento_orden_trabajo`.`saldo` >= 0 AND `estado`.`nombre_corto` = "PENDIENTE" ) OR (`agil_mantenimiento_orden_trabajo`.`saldo` > 0 AND `estado`.`nombre_corto` = "FINALIZADO"))');
			// var cuentasLiquidadas = { 
			// 	$or: {
			// 		$and: [{saldo: 0},{importe_facturado: { $is: null }}], 
			// 		$and: [{ saldo: { $gt: 0 } },{importe_facturado: { $ne: null }}]
			// 	}
			// };
			var estadosLiquidadas = {
				nombre_corto: {
					$in: ['PENDIENTE', 'FINALIZADO']
				}			
			}

			if (req.params.liquidados == "true") {
				// cuentasLiquidadas = {id_cliente: req.params.id_cliente, saldo: { $eq: 0 } };
				cuentasLiquidadas = Sequelize.literal('`agil_mantenimiento_orden_trabajo`.`id_cliente` = '+req.params.id_cliente+' AND `agil_mantenimiento_orden_trabajo`.`saldo` = 0 AND `estado`.`nombre_corto` = "FINALIZADO"');
				estadosLiquidadas = {
					nombre_corto: 'FINALIZADO'		
				}
			}

			MantenimientoOrdenTrabajo.findAll({
				where: cuentasLiquidadas,
				include: [//{ model: Clase, as: 'tipoPago', where: { nombre_corto: Diccionario.TIPO_PAGO_CREDITO } },
					{ model: PagoOT, as: 'pagosOT', required: false },
					{ model: Sucursal, as: 'sucursal' },
					{ model: Cliente, as: 'cliente_ot' },
					{ model: Clase, as: 'estado' }
				]
			}).then(function (detalles) {
				res.json({ detalles: detalles });
			})
		});

	router.route('/reportes/rendicion/verificado/:id_empresa/:gestion/:mes/:desde/:hasta')
		.get(ensureAuthorizedlogged, function (req, res) {
			let condicionFecha = { $not: null };
			let desde = false;
			let hasta = false;
			let fecha_desde;
			let fecha_hasta;
			if ((req.params.mes !== "0" && req.params.gestion !== "0") &&
				(req.params.mes !== undefined && req.params.gestion !== undefined) &&
				(req.params.mes !== null && req.params.gestion !== null) &&
				(Number.isInteger(parseInt(req.params.mes) && Number.isInteger(parseInt(req.params.gestion))))
			) {
				let fecha_desde = new Date(parseInt(req.params.gestion), parseInt(req.params.mes) - 1, 1, 0, 0, 0)
				let fecha_hasta = new Date(parseInt(req.params.gestion), parseInt(req.params.mes), -1, 0, 0, 0)
				fecha_hasta.setHours(23, 59, 59, 99)
				fecha_desde.setHours(0, 0, 0, 0)
				condicionFecha = { $between: [fecha_desde, fecha_hasta] }
			} else {
				if (req.params.desde !== "0" && req.params.desde !== undefined && req.params.desde !== null && Number.isInteger(parseInt(req.params.desde))) {
					fecha_desde = new Date(parseInt(req.params.desde));
					fecha_desde.setHours(0, 0, 0, 0)
					desde = true
				}
				if (req.params.hasta !== "0" && req.params.hasta !== undefined && req.params.hasta !== null && Number.isInteger(parseInt(req.params.hasta))) {
					fecha_hasta = new Date(parseInt(req.params.hasta));
					fecha_hasta.setHours(23, 59, 59, 99)
					hasta = true
				}
			}
			if (desde && hasta) {
				condicionFecha = { $between: [fecha_desde, fecha_hasta] }
			} else if (desde && !hasta) {
				condicionFecha = {
					$gte: [fecha_desde]
				}
			} else if (!desde && hasta) {
				condicionFecha = {
					$lte: [fecha_hasta]
				}
			} else if (!desde && !hasta && (req.params.gestion !== "0" && req.params.gestion !== undefined && req.params.gestion !== null && Number.isInteger(parseInt(req.params.gestion)))) {
				if (req.params.mes !== "0" && req.params.mes !== undefined && req.params.mes !== null && Number.isInteger(parseInt(req.params.mes))) {
					fecha_desde = new Date(parseInt(req.params.gestion), parseInt(req.params.mes) - 1, 1, 0, 0, 0, 0)
					fecha_hasta = new Date(parseInt(req.params.gestion), parseInt(req.params.mes), 1, 0, 0, 0, 0)
				} else {
					fecha_desde = new Date(parseInt(req.params.gestion), 0, 1, 0, 0, 0, 0)
					fecha_hasta = new Date(parseInt(req.params.gestion), 11, 31, 23, 59, 59, 99)
				}
				condicionFecha = { $between: [fecha_desde, fecha_hasta] }
			}
			if (fecha_desde && fecha_hasta) {
				if (fecha_desde.getTime() > fecha_hasta.getTime()) {
					res.json({
						mensaje: 'Fecha final (hasta) no puede ser menor a la fecha de inicio (desde)',
						hasErr: true,
						stack: 'Fecha final (hasta) no puede ser menor a la fecha de inicio (desde)'
					})
				}
			} else if (fecha_desde) {
				if (fecha_desde.getFullYear() < 2010) {
					res.json({
						mensaje: 'No se aceptan fechas menores a primero de enero de 2010',
						hasErr: true,
						stack: 'No se aceptan fechas menores a primero de enero de 2010'
					})
				}
			}
			let id_empresa = parseInt(req.params.id_empresa)
			let checkNumber = Number.isInteger(id_empresa)
			if (checkNumber) {
				sequelize.transaction((transaction) => {
					// 	let query = "SELECT\
					// 	`agil_caja_chica_rendicion_fondo`.`id`,\
					// 	`agil_caja_chica_rendicion_fondo`.`rendicion`,\
					// 	`agil_caja_chica_rendicion_fondo`.`fecha`,\
					// 	`agil_caja_chica_rendicion_fondo`.`fecha_salida`,\
					// 	`agil_caja_chica_rendicion_fondo`.`fecha_entrada`,\
					// 	`agil_caja_chica_rendicion_fondo`.`odometro_salida`,\
					// 	`agil_caja_chica_rendicion_fondo`.`odometro_entrada`,\
					// 	`agil_caja_chica_rendicion_fondo`.`litros`,\
					// 	`agil_caja_chica_rendicion_fondo`.`numero_correlativo`,\
					// 	`rendicion`.`id` AS `rendicion.id`,\
					// 	`rendicion`.`nombre` AS `rendicion.nombre`,\
					// 	`conductor`.`id` AS `conductor.id`,\
					// 	`conductor`.`nombre` AS `conductor.nombre`,\
					// 	`vehiculo`.`id` AS `vehiculo.id`,\
					// 	`vehiculo`.`nombre` AS `vehiculo.nombre`,\
					// 	`gastos`.`id` AS `gastos.id`,\
					// 	`gastos`.`gasto` AS `gastos.id_gasto`,\
					// 	`gastos`.`fecha` AS `gastos.fecha`,\
					// 	`gastos`.`numero_factura_recargo` AS `gastos.numero_factura_recargo`,\
					// 	`gastos`.`detalle` AS `gastos.detalle`,\
					// 	`gastos`.`monto` AS `gastos.monto`,\
					// 	`gastos`.`area` AS `gastos.id_area`,\
					// 	`gastos`.`usar_factura` AS `gastos.usar_factura`,\
					// 	`gastos`.`rembolsado` AS `gastos.rembolsado`,\
					// 	`gastos`.`eliminado` AS `gastos.eliminado`,\
					// 	`gastos`.`rendicion_fondo` AS `gastos.id_rendicion_fondo`,\
					// 	`gastos`.`createdAt` AS `gastos.createdAt`,\
					// 	`gastos`.`updatedAt` AS `gastos.updatedAt`,\
					// 	`gastos.gasto`.`id` AS `gastos.gasto.id`,\
					// 	`gastos.gasto`.`numero` AS `gastos.gasto.numero`,\
					// 	`gastos.gasto`.`nivel` AS `gastos.gasto.id_nivel`,\
					// 	`gastos.gasto`.`nombre` AS `gastos.gasto.nombre`,\
					// 	`gastos.gasto`.`cuenta` AS `gastos.gasto.id_cuenta`,\
					// 	`gastos.gasto`.`concepto` AS `gastos.gasto.id_concepto`,\
					// 	`gastos.gasto`.`combustible_recorrido` AS `gastos.gasto.combustible_recorrido`,\
					// 	`gastos.gasto`.`usar_producto` AS `gastos.gasto.usar_producto`,\
					// 	`gastos.gasto`.`eliminado` AS `gastos.gasto.eliminado`,\
					// 	`gastos.gasto`.`createdAt` AS `gastos.gasto.createdAt`,\
					// 	`gastos.gasto`.`updatedAt` AS `gastos.gasto.updatedAt`,\
					// 	`gastos.area`.`id` AS `gastos.area.id`,\
					// 	`gastos.area`.`nombre` AS `gastos.area.nombre` \
					// FROM\
					// 	`agil_caja_chica_rendicion_fondo` AS `agil_caja_chica_rendicion_fondo`\
					// 	LEFT OUTER JOIN `gl_clase` AS `rendicion` ON `agil_caja_chica_rendicion_fondo`.`rendicion` = `rendicion`.`id`\
					// 	LEFT OUTER JOIN `agil_rrhh_viaje_conductor` AS `conductor` ON `agil_caja_chica_rendicion_fondo`.`conductor` = `conductor`.`id`\
					// 	LEFT OUTER JOIN `gl_clase` AS `vehiculo` ON `agil_caja_chica_rendicion_fondo`.`vehiculo` = `vehiculo`.`id`\
					// 	LEFT OUTER JOIN `agil_caja_chica_detalle_rendicion_fondo` AS `gastos` ON `agil_caja_chica_rendicion_fondo`.`id` = `gastos`.`rendicion_fondo`\
					// 	LEFT OUTER JOIN `agil_caja_chica_gasto` AS `gastos.gasto` ON `gastos`.`gasto` = `gastos.gasto`.`id`\
					// 	LEFT OUTER JOIN `gl_clase` AS `gastos.area` ON `gastos`.`area` = `gastos.area`.`id` \
					// WHERE\
					// 	`agil_caja_chica_rendicion_fondo`.`fecha` BETWEEN '2019-10-01 00:00:00' \
					// 	AND '2019-10-18 23:59:59' \
					// 	AND `agil_caja_chica_rendicion_fondo`.`empresa` = 35 \
					// GROUP BY\
					// 	`agil_caja_chica_rendicion_fondo`.`id`,`rendicion`.`id`,`conductor`.`id`,`vehiculo`.`id`,`gastos`.`id`,`gastos.gasto`.`id`,`gastos.area`.`id`"
					// 	return sequelize.query(query,{ type: sequelize.QueryTypes.SELECT }).then((result) => {
					// 		return result
					// 	}).catch((err) => new Promise((f, r) => r(({ mensaje: 'Error al obtener tipo', stack: err.stack, hasErr: true }))))
					return CajaChicaRendicionFondo.findAll({
						attributes: ['id', 'id_rendicion', 'fecha', 'fecha_salida', 'fecha_entrada', 'odometro_salida', 'odometro_entrada', 'litros', 'numero_correlativo', 'id_conductor', 'id_vehiculo', 'total'],
						include: [
							{ model: Clase, as: 'rendicion', attributes: ['id', 'nombre'] },
							{ model: RrhhViajeConductor, as: 'conductor', attributes: ['id', 'nombre'] },
							{ model: Clase, as: 'vehiculo', attributes: ['id', 'nombre'] },
							{
								model: SolicitudCajaChica, as: 'solicitud', attributes: ['id', 'monto'], include: [{ model: CajaChica, as: 'cajasChicas', attributes: ['id_solicitud', 'numero_correlativo'] }, {
									model: Usuario, as: 'autorizador',
									include: [{ model: Persona, as: 'persona' }]
								}, {
									model: MedicoPaciente,
									as: 'solicitante', include: [{ model: Persona, as: 'persona' }]
								}]
							},
							{
								model: CajaChicaDetalleRendicionFondo, as: 'gastos',
								include: [
									{ model: Clase, as: 'area', attributes: ['id', 'nombre'] },
									{
										model: CajaChicaGasto, as: 'gasto',
										include: [{ model: CajaChicaNivelGasto, as: 'nivel', attributes: ['numero', 'nombre'] }]
									},
									{
										model: CajaChicaDetalleRendicionFondoCentroCosto, as: 'datosCentrosCosto',
										include: [{ model: Clase, as: 'centro_costo', attributes: ['id', 'nombre'] }]
									}
								]
							}
						],
						where: {
							id_empresa: id_empresa,
							fecha: condicionFecha
						},
						transaction: transaction
					}).then((rendiciones) => {
						return rendiciones
					}).catch((err) => new Promise((f, r) => r(({ mensaje: 'Error al obtener tipo', stack: err.stack, hasErr: true }))))
				}).then((result) => {
					if (result) {
						res.json({ lista: result })
					}
				}).catch((err) => {
					res.json({ mensaje: 'Error desconocido.', stack: err.stack, hasErr: true })
				})
			} else {
				res.json({ mensaje: 'Error de comprobación de parametros.', stack: 'El parametro identificador de empresa es erroneo', hasErr: true })
			}
		});

		/* trabajando aqui*/
		router.route('/reportes/libro-compras/:id_empresa/gestion/:gestion/mes/:mes/concepto/:id_concepto/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion')
		.get(ensureAuthorizedlogged, async function (req, res) {
			try {
				var meses = new Date(req.params.gestion, parseInt(req.params.mes), 0);
				let anio = req.params.gestion;
				let mes = parseInt(req.params.mes);
				let dias = meses.getDate();
				var primerDia = anio+'-'+mes+'-01';
				var ultimoDia = anio+'-'+mes+'-'+dias;
				
				var qryCount ='SELECT COUNT(compra.id) AS regs,SUM(compra.importe) AS importe,SUM(compra.excento+compra.ice) AS no_sujeto,SUM(compra.importe-compra.excento-compra.ice) AS subtotal,SUM(compra.descuento) AS descuentos,SUM(compra.total) AS base_cf,SUM(compra.total*0.13) AS cf FROM inv_compra compra INNER JOIN sys_usuario usuario ON usuario.id=compra.usuario INNER JOIN agil_proveedor proveedor ON proveedor.id=compra.proveedor LEFT JOIN inv_movimiento movimiento ON movimiento.id= compra.movimiento LEFT JOIN agil_asiento_contabilidad asiento ON asiento.compra = compra.id AND asiento.eliminado=FALSE LEFT JOIN agil_comprobante_contabilidad comprobante ON comprobante.id = asiento.comprobante AND comprobante.eliminado=FALSE LEFT JOIN gl_clase tipoComprobante ON comprobante.tipo=tipoComprobante.id LEFT JOIN agil_caja_chica caja ON caja.compra=compra.id WHERE usuario.empresa='+req.params.id_empresa;
				
				var query = 'SELECT compra.id AS id,compra.asiento_contabilidad AS asiento_contabilidad,compra.observacion AS observacion,compra.excento+compra.ice AS no_sujeto,compra.importe-compra.excento-compra.ice AS subtotal,compra.fecha AS fecha,proveedor.nit AS nit,proveedor.razon_social AS razon_social,compra.factura AS factura,compra.dui AS dui,compra.autorizacion AS autorizacion,compra.importe AS importe,compra.excento AS excento,compra.ice AS ice,compra.descuento AS descuento,compra.total AS base_cf,compra.codigo_control AS codigo_control,compra.contabilizado AS contabilizado,';
				if(req.params.id_concepto!=0){
					query+='IFNULL(movimiento.clase,compra.tipo_movimiento) AS tipo_movimiento,';
				}
				query+='tipoComprobante.nombre AS tipo_comprobante,comprobante.numero AS numero_comprobante,caja.numero_correlativo AS numero_caja FROM inv_compra compra INNER JOIN sys_usuario usuario ON usuario.id=compra.usuario INNER JOIN agil_proveedor proveedor ON proveedor.id=compra.proveedor LEFT JOIN inv_movimiento movimiento ON movimiento.id=compra.movimiento LEFT JOIN agil_asiento_contabilidad asiento ON asiento.compra=compra.id AND asiento.eliminado=FALSE LEFT JOIN agil_comprobante_contabilidad comprobante ON comprobante.id=asiento.comprobante AND comprobante.eliminado=FALSE LEFT JOIN gl_clase tipoComprobante ON comprobante.tipo=tipoComprobante.id LEFT JOIN agil_caja_chica caja ON caja.compra=compra.id WHERE usuario.empresa='+req.params.id_empresa;
				
				if(req.params.id_concepto!=0){
					//Esta condicion aplica solo a emserso
					if(req.params.id_concepto === "17708"){
						query+=' AND caja.compra is not null';
						qryCount+=' AND caja.compra is not null';
					}else{
						query+=' AND (compra.tipo_movimiento='+req.params.id_concepto+' OR movimiento.clase='+req.params.id_concepto+')';
						qryCount+=' AND (compra.tipo_movimiento='+req.params.id_concepto+' OR movimiento.clase='+req.params.id_concepto+')';
					}
				}
				query+=' AND compra.fecha BETWEEN "'+primerDia+' 00:00:00" AND "'+ultimoDia+' 23:59:59"';
				qryCount+=' AND compra.fecha BETWEEN "'+primerDia+' 00:00:00" AND "'+ultimoDia+' 23:59:59"';
				if(req.params.texto_busqueda != 0){
					query+=' AND (proveedor.nit like "%'+ req.params.texto_busqueda + '%" OR  proveedor.razon_social like "%' + req.params.texto_busqueda + '%" OR compra.factura like "%' + req.params.texto_busqueda + '%" OR compra.importe like "%' + req.params.texto_busqueda + '%" OR tipoComprobante.nombre like "%' + req.params.texto_busqueda + '%" OR comprobante.numero like "%' + req.params.texto_busqueda + '%" OR caja.numero_correlativo like "%' + req.params.texto_busqueda + '%")';
					qryCount+=' AND (proveedor.nit like "%'+ req.params.texto_busqueda + '%" OR  proveedor.razon_social like "%' + req.params.texto_busqueda + '%" OR compra.factura like "%' + req.params.texto_busqueda + '%" OR compra.importe like "%' + req.params.texto_busqueda + '%" OR tipoComprobante.nombre like "%' + req.params.texto_busqueda + '%" OR comprobante.numero like "%' + req.params.texto_busqueda + '%" OR caja.numero_correlativo like "%' + req.params.texto_busqueda + '%")';
				}
				query+=' ORDER BY '+ req.params.columna+' '+req.params.direccion;
				if(req.params.items_pagina!=0) query+=' LIMIT ' + (req.params.items_pagina * (req.params.pagina - 1)) + ','+ req.params.items_pagina;
				
				sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
					.then(function (registros) {
						sequelize.query(qryCount, { type: sequelize.QueryTypes.SELECT })
						.then(function (totales) {
							
							res.json({ 
								registros: {
									facturas: registros,
									importe: registros.reduce((acc, cur) => (acc+cur.importe),0),
									no_sujeto: registros.reduce((acc, cur) => (acc+cur.no_sujeto),0),
									subtotal: registros.reduce((acc, cur) => (acc+cur.subtotal),0),
									descuentos: registros.reduce((acc, cur) => (acc+cur.descuento),0),
									base_cf: registros.reduce((acc, cur) => (acc+cur.base_cf),0),
									cf: registros.reduce((acc, cur) => (acc+cur.base_cf * 0.13),0),

									
								}, 
								paginas: Math.ceil(totales[0].regs / req.params.items_pagina) > 0 ? Math.ceil(totales[0].regs / req.params.items_pagina) : 1,
								importe: totales[0].importe,
								no_sujeto: totales[0].no_sujeto,
								subtotal: totales[0].subtotal,
								descuentos:totales[0].descuentos,
								base_cf: totales[0].base_cf,
								cf:totales[0].cf
							});
						});	
					});	

			} catch (error) {
				res.json({ hasErr: true, mensaje: error })
			}
		});
	
		
		router.route('/reportes-tablasDinamicas/compras-mensuales/:id_empresa/sucursal/:id_sucursal/inicio/:inicio/fin/:fin')
		.get(ensureAuthorizedlogged, function (req, res) {
			var inicio = new Date(req.params.inicio); 
			var fin = new Date(req.params.fin); 

			let mesInicio = inicio.getMonth() + 1;
			let mesFin = fin.getMonth() +1;
			var fechaInicio = inicio.getFullYear()+"-"+mesInicio+"-"+inicio.getDate()+" 00:00:00";
			var fechaFinal = fin.getFullYear()+"-"+mesFin+"-"+fin.getDate()+" 23:59:59";

			var queryCompraTablaDinanica = "SELECT\
			DISTINCT compra.id AS id_compra,\
				compra.fecha AS fecha_compra,\
				compra.factura AS num_Factura_compra,\
				proveedor.nit AS nit_proveedor,\
				proveedor.razon_social AS razon_social_proveedor,\
				producto.codigo AS codogo_producto,\
				producto.nombre AS nombre_producto,\
				producto.unidad_medida AS unid_medida_producto,\
				producto_grupo.nombre AS nombre_grupo_producto,\
				inv_detalle_compra.cantidad AS cantidad_detalle,\
				inv_detalle_compra.costo_unitario AS pu_detalle,\
				inv_detalle_compra.importe AS importe_detalle,\
				inv_detalle_compra.ice AS ice_detalle,\
				inv_detalle_compra.excento AS excento_detalle,\
				inv_detalle_compra.descuento AS descuento_detalle,\
				inv_detalle_compra.total AS total_detalle,\
				sucursal_compra.nombre AS nombre_sucursal,\
				compra_almacen.nombre AS nombre_almacen,\
				usuario.nombre_usuario AS nombre_usuario,\
				tipoPago.nombre AS nombTipoPago_compra,\
				compra.dias_credito AS diasCredito_compra,\
				caja_chica_compra.compra AS id_cajaChica_compra,\
				compra.usar_producto AS id_productoOservicio_compra,\
				tipo_ingereso.nombre AS nombre_tipo_ingreso\
			FROM\
				inv_compra AS compra\
				INNER JOIN sys_usuario AS usuario ON usuario.id = compra.usuario\
				LEFT JOIN agil_proveedor AS proveedor ON proveedor.id = compra.proveedor\
				LEFT join inv_detalle_compra AS inv_detalle_compra ON inv_detalle_compra.compra = compra.id\
				LEFT JOIN agil_producto AS producto ON producto.id = inv_detalle_compra.producto\
				LEFT JOIN gl_clase AS producto_grupo ON producto.grupo = producto_grupo.id\
				LEFT OUTER JOIN agil_almacen AS compra_almacen ON compra.almacen = compra_almacen.id\
				LEFT JOIN agil_sucursal AS sucursal_compra ON compra_almacen.sucursal = sucursal_compra.id\
				LEFT JOIN gl_clase AS tipoPago ON compra.tipo_pago = tipoPago.id\
				LEFT JOIN agil_caja_chica AS caja_chica_compra ON caja_chica_compra.compra=compra.id\
				LEFT JOIN inv_movimiento AS movimiento ON movimiento.id= compra.movimiento\
				LEFT JOIN gl_clase AS tipo_ingereso ON tipo_ingereso.id = compra.tipo_movimiento\
			WHERE\
				usuario.empresa = "+req.params.id_empresa+""
				if(req.params.id_sucursal != 0){
					queryCompraTablaDinanica +=" AND sucursal_compra.id = "+req.params.id_sucursal
				}else{queryCompraTablaDinanica +="" }
				queryCompraTablaDinanica += " AND compra.fecha BETWEEN '"+fechaInicio+"' AND '"+fechaFinal+"'\
				AND inv_detalle_compra.compra IS NOT  NULL\
				ORDER BY compra.fecha ASC;"

			sequelize.query(queryCompraTablaDinanica ,
			  		{ type: sequelize.QueryTypes.SELECT })
					.then(comprass => {
						res.json({compras: comprass});
					})
					.catch(function (err) {
						res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
					});
		});

	router.route('/lista-proformas-reporte/clienta/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/liquidados/:liquidados')
        .get(ensureAuthorizedlogged, async function (req, res) {
			try {
				let condicionCliente = ''
				let condicionProforma = '(SUM(proforma.monto) - SUM(proforma.a_cuenta)) > 0'
				let condicionLimit = ''
				if(req.params.liquidados != '0' ){
					condicionProforma ='(proforma.monto - proforma.a_cuenta) <= 0'
				}
				if (req.params.texto_busqueda != "0") {
					condicionCliente = "AND cliente.razon_social like '%"+req.params.texto_busqueda+"%' OR cliente.codigo like '%"+req.params.texto_busqueda+"%' OR cliente.nit like '%"+req.params.texto_busqueda+"%'"
				}
				if(req.params.items_pagina != '0' ){
					var offsetW = (req.params.items_pagina * (req.params.pagina - 1));
                	var limitW = req.params.items_pagina;
					condicionLimit = "limit "+offsetW+"," +limitW
				}
				const cantidadProforma = await sequelize.query(
					"SELECT COUNT(*) as contClientes\
					FROM(SELECT COUNT(proforma.cliente), proforma.monto, proforma.a_cuenta\
					FROM agil_cliente  AS cliente\
					INNER JOIN agil_proforma AS proforma  ON proforma.cliente = cliente.id \
					WHERE\
						proforma.empresa = "+req.params.id_empresa+" AND proforma.eliminado = FALSE " +condicionCliente+"\
					GROUP BY proforma.cliente\
					HAVING "+condicionProforma+") as lista\
					",
					{ type: sequelize.QueryTypes.SELECT })
				/* const cantidadProforma = await Cliente.count({
					where: condicionCliente,
					include: [{ model: Proforma, as: 'proformas', required: true}],
					group:["`proformas.cliente`"],
					//having : [{ "proformas.monto" : {$gt : 0 }}]
				}) */
				const datosProforma = await sequelize.query(
					"SELECT cliente.id, cliente.empresa, cliente.codigo, cliente.razon_social,cliente.nit,cliente.direccion, cliente.telefono1,cliente.telefono2,cliente.telefono3,cliente.contacto,cliente.rubro,cliente.categoria,cliente.ubicacion_geografica,cliente.fecha1,cliente.fecha1, proforma.monto, proforma.a_cuenta\
					FROM agil_cliente  AS cliente\
					INNER JOIN agil_proforma AS proforma  ON proforma.cliente = cliente.id \
					WHERE\
						proforma.empresa = "+req.params.id_empresa+" AND proforma.eliminado = FALSE " +condicionCliente+"\
					GROUP BY proforma.cliente\
					HAVING "+condicionProforma+"\
					ORDER BY cliente.razon_social ASC\
					"+condicionLimit,
					{ type: sequelize.QueryTypes.SELECT })
				/* const datosProforma = await Cliente.findAll({
					where: condicionCliente,
					offset: offsetW, limit: limitW,
					include: [{ model: Proforma, as: 'proformas', required: true}]					
				}) */
				res.json({ datosProforma: datosProforma, paginas: Math.ceil(cantidadProforma[0].contClientes / req.params.items_pagina) });
			} catch (error) {
				return new Promise(function (fulfill, reject) {
                	reject((error.stack !== undefined) ? error.stack : error);
            	});
			}
        })

	router.route('/lista-proformas-detalle/clienta/:id_cliente/liquidados/:liquidados/empresa/:id_empresa')
		.get(ensureAuthorizedlogged, async function (req, res) {
			try {
				let condicionProforma = ''
				if(req.params.liquidados == 'true'){
					condicionProforma ='(proforma.monto - proforma.a_cuenta) <= 0'
				}else{
					condicionProforma = '(proforma.monto - proforma.a_cuenta) > 0'
				}
				const datosProformaXcliente = await sequelize.query(
					"SELECT proforma.id as id_proforma, proforma.correlativo, proforma.fecha_proforma, proforma.fecha_factura, proforma.factura,(proforma.monto - proforma.a_cuenta) as saldo, proforma.monto, proforma.a_cuenta, cliente.id as id_cliente, cliente.razon_social, cliente.nit\
					FROM agil_proforma AS proforma\
					INNER JOIN agil_cliente  AS cliente  ON proforma.cliente = cliente.id \
					WHERE\
						proforma.empresa = "+req.params.id_empresa+"\
						AND proforma.cliente = "+req.params.id_cliente+"\
						AND proforma.eliminado = FALSE\
					HAVING "+condicionProforma+"\
					ORDER BY proforma.fecha_proforma ASC",
					{ type: sequelize.QueryTypes.SELECT })
				res.json({ datosProformaXcliente: datosProformaXcliente});
			} catch (error) {
				return new Promise(function (fulfill, reject) {
                	reject((error.stack !== undefined) ? error.stack : error);
            	});
			}
		});

	router.route('/lista-proformas-detalle-transaccion/cliente/empresa/:id_empresa/proforma/:id_proforma')
		.get(ensureAuthorizedlogged, async function (req, res) {
			try {
				const datosProformaXTransac = await sequelize.query(
					"SELECT proforma.id, proforma.monto as totalImpProf, detalleTrans.monto as importe, transaccion.id as id_transaccion, transaccion.correlativo, transaccion.fecha, banco.nombre, banco.numero, transaccion.cerrada\
					FROM agil_proforma AS proforma\
					INNER JOIN agil_cuenta_transaccion_detalle detalleTrans ON proforma.id = detalleTrans.detalle\
					INNER JOIN agil_cuenta_transaccion transaccion ON detalleTrans.transaccion = transaccion.id\
					INNER JOIN agil_banco banco ON banco.id = transaccion.cuenta\
					WHERE proforma.empresa = "+req.params.id_empresa+"\
					AND proforma.id= "+req.params.id_proforma+"\
					AND proforma.eliminado = FALSE",
					{ type: sequelize.QueryTypes.SELECT })

				res.json({ datosProformaXTransac: datosProformaXTransac});
			} catch (error) {
				return new Promise(function (fulfill, reject) {
                	reject((error.stack !== undefined) ? error.stack : error);
            	});
			}
		});


		router.route('/obtener-proformas-detalle-transaccion/cliente/empresa/:id_empresa/transaccion/:id_transaccion')
		.get(ensureAuthorizedlogged, async function (req, res) {
			try {
				const datoTransaccion = await CuentaTransaccion.findAll({
                    where: {id: req.params.id_transaccion},
                    include: [
                        {model: Banco, as: 'cuenta',
                            include: [{ model: Clase, as: 'tipoCuenta' }, 
								{ model: Clase, as: 'tipoMoneda' }]
                        },
                        {model: Clase, as: 'concepto'},
                        {model: Clase, as: 'tipo_documento'},
                        {model: Clase, as: 'estado'},
                        {model: DetalleTransaccion, as: 'detallesTransaccion',
                            include : [{model: Proforma, as : 'proforma',
                                include:[{ model: DetallesProformas, as: 'detallesProformas', 
									include: [{ model: Servicios, as: 'servicio'},
										 { model: Clase, as: 'centroCosto' }] 
								}]
                            }]
                        },
						{ model: Cliente, as: 'cliente' }
                    ],
                    order: [['id', 'asc']]
				})

				res.json({ datoTransaccion: datoTransaccion});
			} catch (error) {
				return new Promise(function (fulfill, reject) {
                	reject((error.stack !== undefined) ? error.stack : error);
            	});
			}
		});

		router.route('/pdf-lista-proformas-detalle/cliente/liquidados/facturados')
		.post(ensureAuthorizedlogged, async function (req, res) {
			try {

				let condicionProforma = ''
				let factIsNotNull = {}
				if(req.body.liquidados == true){
					condicionProforma ='(`proformas`.monto - `proformas`.a_cuenta) <= 0'
				}else{
					condicionProforma = '(`proformas`.monto - `proformas`.a_cuenta) > 0'
					if(req.body.facturados == true){
						factIsNotNull = {factura:{$not:null}}
					}
				}
				const idsClientes = req.body.cliente.map(client => client.id).join(',')
				const datosProformaXcliente = await Cliente.findAll({
					attributes: ['id', 'razon_social', 'nit'],
					include: [{ model: Proforma, as: 'proformas', required: true, 
						attributes: 
                                Object.keys(Proforma.attributes).concat([[sequelize.literal('(`proformas`.`monto` - `proformas`.`a_cuenta`)'), 'saldo' ]]), 
						where:[{empresa: req.body.empresa},{eliminado:false},factIsNotNull]
					}],
				where: Sequelize.literal("`agil_cliente`.`id` IN ("+idsClientes+")"),// [{id: req.params.id_cliente}], //{ "`proformas`.empresa" : {$and : req.params.id_empresa }}//Sequelize.literal("`proformas`.empresa = "+req.params.id_empresa+" AND id = "+req.params.id_cliente+" AND `proformas`.eliminado = FALSE HAVING "+condicionProforma+" ORDER BY razon_social ASC"),
				having: Sequelize.literal(condicionProforma),
				order: [['razon_social', 'asc']]
			})
				res.json({ datosProformaXcliente: datosProformaXcliente});
			} catch (error) {
				return new Promise(function (fulfill, reject) {
                	reject((error.stack !== undefined) ? error.stack : error);
            	});
			}
		});





















}