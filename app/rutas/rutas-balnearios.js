module.exports = function (router, sequelize, Sequelize, Usuario, Tipo, Clase, Empresa, Persona, ensureAuthorizedlogged, Sucursal, Ambientes, EncargadoVenta, Producto, VentaAmbiente, Inventario, Movimiento, DetalleMovimiento, SucursalActividadDosificacion, Cliente, Venta, DetalleVenta, Dosificacion, ConfiguracionGeneralFactura, ConfiguracionFactura, EntragaDetalleVentaCliente, DetalleComboVenta, DetalleVentaProductoFinal, Diccionario, 
    CodigoControl, NumeroLiteral, ComandaVenta, DetalleComanda) {

    router.route('/balnearios/ambientes/:id_empresa')
    // LISTA DE AMBIENTE 
		.get( async (req, res) => {
            let { id_empresa } = req.params
            if(!id_empresa) return res.json({error: true, message:"Parámetros incorrectos", messageType:"error"})
            try {
                let data = await Ambientes.findAll({
                    include:[
                        { model: Clase, as:'tipo_ambiente'},
                        { model: Clase, as:'estado_ambiente'},
                        { model: Clase, as:'unidadMedida'},
                        { model: Producto, as:'producto', attributes:['id','nombre','id_empresa','unidad_medida', 'precio_unitario','rango_negativo','rango_positivo','descripcion', 'id_ambiente'],
                            include: [{model: Clase, as: 'tipoProducto'}]
                        },
                        { model: Sucursal, as:'sucursal', attributes:['id','id_empresa','nombre','numero','direccion','activo'], where: {empresa: id_empresa}},
                        { model: VentaAmbiente, as: 'ventaAmbiente', required: false, where: {liquidado: false} }
                    ]
                 })
                res.json({error:false, data: data, message:"recuperdos con éxitos", messageType:"success"})
            } catch (e) {
                res.json({error: true, message:"<b>Error al obtener ambiente</b><br>"+e, messageType:"error"})
            }
        })
    //GUARDAR ACTUALIZAR AMBIENTE
		.post( async (req, res) => {
            let { id, id_tipo, numero, id_estado, id_sucursal, id_unidad_medida, producto, habilitado, tiempo } = req.body
            let { id_empresa  } = req.params
            if( !(id_tipo && id_estado && id_sucursal && id_unidad_medida && id_empresa) ) return res.json({error: true, message:"Parámetros incorrectos", messageType:"error"})
            try {
                if(!id){
                    Ambientes.create({ id_tipo, numero, id_estado, id_sucursal, id_unidad_medida, tiempo, habilitado: true, eliminado: false })
                    .then(async ambiente=> {
                        let tipo = await Clase.findById(id_tipo,{raw:true})
                        let tipo_producto = await Clase.find({where: {nombre_corto: 'PBASE'}, include: [{model: Tipo, as: 'tipo', where: {nombre_corto: 'TPS'}}]})
                        Producto.create({
                            id_empresa,
                            nombre: tipo ? tipo.nombre +' '+ numero : null,
                            unidad_medida: producto ? producto.unidad_medida ? producto.unidad_medida : null: null,
                            precio_unitario: producto ? producto.precio_unitario ? producto.precio_unitario : null : null,
                            rango_negativo: producto ? producto.rango_negativo ? producto.rango_negativo: null : null,
                            rango_positivo: producto ? producto.rango_positivo ? producto.rango_positivo : null : null,
                            descripcion: producto ? producto.descripcion ? producto.descripcion : null : null,
                            id_tipo_producto: tipo_producto ? tipo_producto.id : null,
                            imagen: './img/icon-producto-default.png',
                            id_ambiente: ambiente.id
                        })
                         .then(producto => {
                             res.json({error:false, data: ambiente, message:"Ambiente creado con éxito", messageType:"success"})
                         })
                    })
                }else{
                    Ambientes.findById(id, { include: [{model:Producto, as:'producto', required:false}]})
                    .then(async amb => {
                        let ambienteAnterior = amb.toJSON();
                        if(!producto) producto = ambienteAnterior.producto;
                        let nombreProducto = ambienteAnterior ? ambienteAnterior.producto.nombre : null;
                        if(ambienteAnterior && ambienteAnterior.id_tipo != id_tipo){
                            let tipo = await Clase.findById(id_tipo,{raw:true})
                            nombreProducto = tipo.nombre +" "+numero;
                        }
                        Ambientes.update({ id_tipo, numero, id_estado, id_sucursal, id_unidad_medida, habilitado, eliminado: false }, { where: { id } })
                        .then(ambiente=> {
                            if(producto && producto.id){
                                Producto.update({
                                    nombre: nombreProducto,
                                    unidad_medida: producto.unidad_medida ? producto.unidad_medida : null,
                                    precio_unitario: producto.precio_unitario ? producto.precio_unitario : null,
                                    rango_negativo: producto.rango_negativo ? producto.rango_negativo: null,
                                    rango_positivo: producto.rango_positivo ? producto.rango_positivo : null,
                                    descripcion: producto ? producto.descripcion ? producto.descripcion : null : null,
                                }, { where: { id: producto.id}})
                                .then(producto => {
                                    res.json({error:false, data: ambiente, message:"Ambiente editado con éxito", messageType:"success"})
                                })
                            }else{
                                res.json({error:false, data: ambiente, message:"Ambiente editado con éxito", messageType:"success"})
                            } 
                        })
                    })
                }
            } catch (e) {
                res.json({error: true, message:`<b>Error al ${ id ? 'editar' : 'guardar'} ambiente.</b><br>`+e, messageType:"error"})
            }
        })
    //OBTENER AMBIENTE POR ID
    router.route('/balnearios/ambiente/:id')
        .get( (req, res) => {
            let { id } = req.params
            if(!id) return res.json({error: true, message:"Parámetros incorrectos", messageType:"error"})
            Ambientes.findById(id,{
                include:[
                    { model: Clase, as:'tipo_ambiente'},
                    { model: Clase, as:'estado_ambiente'},
                    { model: Producto, as:'producto', attributes:['id','nombre','id_empresa','unidad_medida', 'precio_unitario','rango_negativo','rango_positivo','descripcion']},
                    { model: Sucursal, as:'sucursal', attributes:['id','id_empresa','nombre','numero','direccion','activo']}
                ]
            })
            .then(ambiente => {
                res.json({error:false, data: ambiente, message:"Ambiente recuperdo con éxitos", messageType:"success"})
            })
        })
    //ELIMINAR ACTIVAR AMBIENTE
    router.route('/balnearios/ambiente/:id')
        .put(async (req, res) => {
            let { id } = req.params
            if(!id) return res.json({error: true, message:"Parámetros incorrectos", messageType:"error"})
            try {
                let ambiente = await Ambientes.findById(id, { raw:true})
                Ambientes.update({ eliminado: !ambiente.eliminado }, { where: { id } })
                res.json({error:false, message:`Ambiente ${ ambiente.eliminado ? 'eliminado' : 'activado' } con éxito`, messageType:"success"})
                
            } catch (e) {
                res.json({error: true, message:`<b>Error al eliminar/activar ambiente.</b><br>`+e, messageType:"error"})
            }
        })
    // LISTA DE AMBIENTES ACTIVOS 
    router.route('/balnearios/ambientes-activos/:id_empresa/sucursal/:id_sucursal/estado/:id_estado')
        .get( async (req, res) => {
            let { id_empresa, id_sucursal, id_estado } = req.params
            let condicionAmbiente = { habilitado: true }
            if(!id_empresa && !id_sucursal && !id_estado && !id_estado) return res.json({error: true, message:"Parámetros incorrectos", messageType:"error"})
            
            if (id_sucursal != 0) {
                condicionAmbiente.id_sucursal = id_sucursal
            }

            if (id_estado != 0) {
                condicionAmbiente.id_estado = id_estado
            }

            try {
                let data = await Ambientes.findAll({
                    where: condicionAmbiente,
                    include:[
                        { model: Clase, as:'tipo_ambiente'},
                        { model: Clase, as:'estado_ambiente'},
                        { model: Clase, as:'unidadMedida'},
                        { model: Producto, as:'producto', attributes:['id','nombre','id_empresa','unidad_medida', 'precio_unitario','rango_negativo','rango_positivo','descripcion', 'id_ambiente'],
                            include: [{model: Clase, as: 'tipoProducto'}]
                        },
                        { model: Sucursal, as:'sucursal', attributes:['id','id_empresa','nombre','numero','direccion','activo'], where: {empresa: id_empresa}},
                        { model: VentaAmbiente, as: 'ventaAmbiente', required: false, where: {liquidado: false},
                            include: [{model: EncargadoVenta, as: 'encargado', required: false,
                                include: [{model: Persona, as: 'persona', required: false}]
                            }]
                        }
                    ]
                    })
                res.json({error:false, data: data, message:"recuperdos con éxitos", messageType:"success"})
            } catch (e) {
                res.json({error: true, message:"<b>Error al obtener ambiente</b><br>"+e, messageType:"error"})
            }
        })
    // OBTENER EL ULTIMO NUMERO DE AMBIENTE EN SUCURSAL
    router.route('/balnearios/ambiente/numero/:id_sucursal/:id_tipo')
        .get(async (req, res) => {
            const { id_sucursal, id_tipo } = req.params
            if(!id_sucursal && !id_tipo) return res.json({error: true, message:"Parámetros incorrectos", messageType:"error"})
            Ambientes.findAll({
                where: {id_sucursal, id_tipo},
                attributes: ['numero'],
                order:[['id','desc']],
                limit: 1
            })
            .then(result => {
                let numero = result[0] ? result[0].numero : 0;
                res.json({ error: false, data: numero, message:"Número recuperado con éxito", messageType:"success" })
            })
        })
    
    // OBTENER TIPOS DE AMBIENTES
    router.route('/balnearios/ambiente/tipo/:id_empresa')
    .get(async (req, res) => {
        const { id_empresa } = req.params
        if(!id_empresa) return res.json({error: true, message:"Parámetros incorrectos", messageType:"error"})
        try {
            // let tipo = await Tipo.findOne({
            //     where: { $or:[{ empresa: id_empresa}, {empresa: null}], nombre_corto:"TIPAMB"},
            //     include: [ { model: Clase, as: 'clases', where: { habilitado: true, eliminado: false } } ]
            // })

            Tipo.findOrCreate({
                where: { id_empresa, nombre_corto:"TIPAMB"},
                defaults: {
                    id_empresa: req.params.id_empresa,
                    nombre_corto:"TIPAMB",
                    nombre: "TIPO AMBIENTE"
                },
                include: [ { model: Clase, as: 'clases', required: false, where: { habilitado: true, eliminado: false } } ]
            }).spread(function (tipoA, created) {
				res.json({ error: false, data: tipoA ? tipoA.clases ? tipoA.clases : [] : [], message:"Clases recuperados con éxito", messageType:"success" })
			});


            
        } catch (e) {
            res.json({ error: true, message:"<b>Ocurrió un error al recuperar tipos de ambientes</b><br>"+e, messageType:"error" })
        }
        
    })



    
    
    router.route('/balnearios/vendedores/:id_empresa')
    // LISTA DE VENDEDORES 
		.get( async (req, res) => {
            let { id_empresa } = req.params
            if(!id_empresa) return res.json({error: true, message:"Parámetros incorrectos", messageType:"error"})
            try {
                let data = await EncargadoVenta.findAll({ 
                    where: {eliminado: false},
                    include:[
                        { model: Persona, as:'persona', attributes:['id','nombre_completo','apellido_paterno','apellido_materno','nombres','direccion','ci','telefono']}
                    ]
                 })
                res.json({error:false, data: data, message:"recuperdos con éxitos", messageType:"success"})
            } catch (e) {
                res.json({error: true, message:"<b>Error al obtener ambiente</b><br>"+e, messageType:"error"})
            }
        })
    //GUARDAR ACTUALIZAR VENDEDOR
		.post( async (req, res) => {
            let { id, id_persona, codigo, activo, eliminado, persona } = req.body
            const { id_empresa } = req.params
            if( !(id_empresa && persona) ) return res.json({error: true, message:"Parámetros incorrectos", messageType:"error"})
            let nominatividad = []
            if(persona.apellido_paterno) nominatividad.push(persona.apellido_paterno)
            if(persona.apellido_materno) nominatividad.push(persona.apellido_materno)
            if(persona.nombres) nominatividad.push(persona.nombres)
            let nombre_completo = nominatividad.join(' ')
            try {
                if(!id){
                    Persona.create({ 
                        nombre_completo,
                        apellido_paterno:persona.apellido_paterno ? persona.apellido_paterno : null,
                        apellido_materno:persona.apellido_materno ? persona.apellido_materno : null, 
                        nombres:persona.nombres, 
                        ci: persona.ci ? persona.ci.toString() : null, 
                        direccion: persona.direccion ? persona.direccion : null, 
                        telefono: persona.telefono ? persona.telefono.toString() : null 
                    })
                    .then(per=> {
                        EncargadoVenta.create({
                            id_persona: per.id,
                            id_empresa,
                            codigo: codigo ? codigo : null,
                            activo: true,
                            eliminado: false
                        })
                        .then(encargado => {
                            res.json({error:false, data: encargado, message:"Encargado creado con éxito", messageType:"success"})
                        })
                    })
                }else{
                    if( !id_persona ) return res.json({error: true, message:"Parámetros incorrectos", messageType:"error"})
                    Persona.update({ 
                        nombre_completo,
                        apellido_paterno:persona.apellido_paterno ? persona.apellido_paterno : null,
                        apellido_materno:persona.apellido_materno ? persona.apellido_materno : null, 
                        nombres:persona.nombres,
                        ci: persona.ci ? persona.ci.toString() : null, 
                        direccion: persona.direccion ? persona.direccion : null, 
                        telefono: persona.telefono ? persona.telefono.toString() : null
                    }, { where: { id: id_persona}})
                    .then(per => {
                        EncargadoVenta.update({ id_empresa, codigo: codigo ? codigo : null, activo, eliminado }, { where : { id}})
                        .then(encargado => res.json({error:false, message:"Encargado actualizado correctamente", messageType:"success"}))
                    })       
                }
            } catch (e) {
                res.json({error: true, message:`<b>Error al ${ id ? 'editar' : 'guardar'} encargado.</b><br>`+e, messageType:"error"})
            }
        })
    //OBTENER VENDEDOR POR ID
    router.route('/balnearios/vendedor/:id')
        .get(function (req, res) {
            let { id } = req.params
            if(!id) return res.json({error: true, message:"Parámetros incorrectos", messageType:"error"})
            EncargadoVenta.findById(id,{
                include:[ { model: Persona, as:'persona', attributes:['id','nombre_completo','apellido_paterno','apellido_materno','nombres','direccion','ci','telefono']} ]
            })
            .then(ambiente => {
                res.json({error:false, data: ambiente, message:"Encargado recuperdo con éxito", messageType:"success"})
            })
        })
    // ELIMINAR INACTIVAR VENDEDOR
    router.route('/balnearios/vendedor/:id/:eliminar')
        .put( async (req, res) => {
            let { id, eliminar } = req.params
            if(!id) return res.json({error: true, message:"Parámetros incorrectos", messageType:"error"})
            try {
                let vendedor = await EncargadoVenta.findById(id,{ raw: true})
                if(eliminar == '1' || eliminar == 'true'){
                    EncargadoVenta.update({ activo: vendedor.eliminado ? 0 : vendedor.activo, eliminado: !vendedor.eliminado },{ where: { id } })
                    res.json({error:false, message:`Encargado eliminado satisfactoriamente`, messageType:"success"})
                }else{
                    if(vendedor.eliminado) return res.json({error: true, message:`<b>El encargado está eliminado.</b><br>No se puede activar mientras este eliminado`, messageType:"error"})
                    EncargadoVenta.update({ activo: !vendedor.activo  },{where: { id } })
                    res.json({error:false,  message:`Encargado ${vendedor.activo ? 'inactivado' : 'activado' } satisfactoriamente`, messageType:"success"})
                }
            } catch (e) {
                res.json({error: true, message:`<b>Error al ${ eliminar ? 'eliminar' : 'inactivar'} ambiente.</b><br>`+e, messageType:"error"})
            }
        })
    
    function formatearFecha(fecha) {
        var mes = fecha.split('/')[1];
        var dia = fecha.split('/')[0];
        return fecha.split('/')[2] + mes + dia;
    }
    
    router.route('/ventas-ambiente')
		.post(ensureAuthorizedlogged, function (req, res) {
			var movimiento = req.body.movimiento.nombre_corto;
			var venta = req.body;
			Sucursal.find({
				where: {
					id: venta.sucursal.id,
					activo: true
				}
			}).then((suc) => {
				if (!suc) return res.json({ mensaje: 'Sucursal Deshabilitada, no se puede realizar cambios.', message: 'Sucursal Deshabilitada, no se puede realizar cambios.', hasErr: true, hasError: true })
					// validando inventarios disponibles antes de guardar ==============
				var detallesNoValidos = ["<span style='color:#dd3333'>No cuenta con la cantidad de inventarios disponibles</span><br/>"];
				venta.detallesVenta.forEach(function (detalleVenta, index, array) {
					if (detalleVenta.producto.activar_inventario && !detalleVenta.id) {
						if (detalleVenta.costos.length > 1) {
							Inventario.findAll({
								where: { id_producto: detalleVenta.producto.id, id_almacen: venta.almacen.id, cantidad: { $gt: 0 } },
								attributes: [[sequelize.fn('sum', sequelize.col('cantidad')), 'cantidadTotal']],
								group: ["`inv_inventario`.`producto`"],
								raw: true
							}).then(function (inventarios) {
								var sumaTotalInventarios = inventarios.length > 0 ? inventarios[0].cantidadTotal : 0;
								if (detalleVenta.cantidad > sumaTotalInventarios) {
									detallesNoValidos.push("<span style='font-size: 12px;'>" + detalleVenta.producto.nombre + "</span><span style='font-size: 12px;color:#FF892A'> solicitada: " + detalleVenta.cantidad + "</span><span style='font-size: 12px;color:#dd3333'> disponible: " + sumaTotalInventarios + "</span><br/>");
								}

								if (index === (array.length - 1)) {
									if (detallesNoValidos.length == 1) {
										if (venta.id) {
                                            modificarSalidaAmbiente(req, res);
                                        }else{
                                            crearSalidaAmbiente(req, res);
                                        }
									} else {
										res.json({ hasError: true, message: "", detalles: detallesNoValidos });
									}
								}
							});
						} else {
							Inventario.find({
								where: {
									id: detalleVenta.costos[0].id
								}
							}).then(function (inventario) {
								if (detalleVenta.cantidad > inventario.cantidad) {
									detallesNoValidos.push("<span style='font-size: 12px;'>" + detalleVenta.producto.nombre + "</span><span style='font-size: 12px;color:#FF892A'> solicitada: " + detalleVenta.cantidad + "</span><span style='font-size: 12px;color:#dd3333'> disponible: " + inventario.cantidad + "</span><br/>");
								}

								if (index === (array.length - 1)) {
									if (detallesNoValidos.length == 1) {
										if (venta.id) {
                                            modificarSalidaAmbiente(req, res);
                                        }else{
                                            crearSalidaAmbiente(req, res);
                                        }
									} else {
										res.json({ hasError: true, message: "", detalles: detallesNoValidos });
									}
								}
							})
						}
					} else {
						if (index === (array.length - 1)) {
                            if (venta.id) {
                                modificarSalidaAmbiente(req, res);
                            }else{
                                crearSalidaAmbiente(req, res);
                            }
						}
					}
				});
			}).catch((err) => {
				res.json({ mensaje: err.stack, message: err.stack, hasErr: true, hasError: true })
			})
		});
	
    function crearSalidaAmbiente(req, res) {
        sequelize.transaction(function (t) {
            var movimiento = req.body.movimiento.nombre_corto;
            var id_movimiento = req.body.movimiento.id;
            var venta = req.body;
            var factura = {};
            factura.venta = venta;
            return Tipo.find({
                where: { nombre_corto: Diccionario.MOV_EGRE },
                transaction: t
            }).then(function (tipoMovimiento) {
                return Movimiento.create({
                    id_tipo: tipoMovimiento.id,
                    id_clase: id_movimiento,
                    id_almacen: venta.almacen.id,
                    fecha: venta.fecha
                }, { transaction: t }).then(function (movimientoCreado) {
                    //SI ES FACTURACION
                    if (movimiento == Diccionario.EGRE_FACTURACION) {
                        return SucursalActividadDosificacion.find({
                            where: {
                                id_actividad: venta.actividad.id,
                                id_sucursal: venta.sucursal.id,
                                expirado: false
                            },
                            transaction: t,
                            include: [{ model: Dosificacion, as: 'dosificacion', include: [{ model: Clase, as: 'pieFactura' }] },
                            { model: Sucursal, as: 'sucursal', include: [{ model: Empresa, as: 'empresa' }] }]
                        }).then(function (sucursalActividadDosificacion) {
                            var dosificacion = sucursalActividadDosificacion.dosificacion;
                            venta.factura = dosificacion.correlativo;
                            venta.pieFactura = dosificacion.pieFactura;
                            venta.codigo_control = CodigoControl.obtenerCodigoControl(dosificacion.autorizacion.toString(),
                                dosificacion.correlativo.toString(),
                                venta.cliente.nit.toString(),
                                formatearFecha(venta.fechaTexto).toString(),
                                parseFloat(venta.total).toFixed(2),
                                dosificacion.llave_digital.toString());
                            venta.autorizacion = dosificacion.autorizacion.toString();
                            venta.fecha_limite_emision = dosificacion.fecha_limite_emision;
                            if (sucursalActividadDosificacion.sucursal.empresa.usar_pedidos) {
                                venta.pedido = sucursalActividadDosificacion.sucursal.pedido_correlativo;
                            }
                            
                            venta.numero_literal = NumeroLiteral.Convertir(parseFloat(venta.total).toFixed(2).toString());
                            venta.numero_literal_dolares = NumeroLiteral.Convertir(parseFloat(venta.total_dolares).toFixed(2).toString(), 'Dolares');
                            if (!venta.cliente.id) {
                                return Cliente.create({
                                    id_empresa: venta.id_empresa,
                                    nit: venta.cliente.nit,
                                    razon_social: venta.cliente.razon_social
                                }, { transaction: t }).then(function (clienteCreado) {
                                    return crearVentaAmbiente(req, venta, res, clienteCreado.id, movimientoCreado, dosificacion, true, sucursalActividadDosificacion.sucursal, t);
                                });
                            } else {
                                return crearVentaAmbiente(req, venta, res, venta.cliente.id, movimientoCreado, dosificacion, true, sucursalActividadDosificacion.sucursal, t);
                            }
                        });
                        //SI ES PROFORMA
                    } else if (movimiento == Diccionario.EGRE_PROFORMA) {
                        return Sucursal.find({
                            where: {
                                id: venta.sucursal.id
                            },
                            transaction: t,
                            include: [{ model: Empresa, as: 'empresa' }]
                        }).then(function (sucursal) {
                            venta.factura = sucursal.nota_venta_correlativo;
                            venta.numero_literal = NumeroLiteral.Convertir(parseFloat(venta.total).toFixed(2).toString());
                            venta.numero_literal_dolares = NumeroLiteral.Convertir(parseFloat(venta.total_dolares).toFixed(2).toString(), 'Dolares');
                            venta.actividad = { id: null };

                            venta.pedido = sucursal.pedido_correlativo;

                            if (!venta.cliente.id) {
                                return Cliente.create({
                                    id_empresa: venta.id_empresa,
                                    nit: venta.cliente.nit,
                                    razon_social: venta.cliente.razon_social
                                }, { transaction: t }).then(function (clienteCreado) {
                                    return crearVentaAmbiente(req, venta, res, clienteCreado.id, movimientoCreado, null, false, sucursal, t);
                                });
                            } else {
                                return crearVentaAmbiente(req, venta, res, venta.cliente.id, movimientoCreado, null, false, sucursal, t);
                            }
                        });
                        //SI ES PREFACTURACION
                    }
                });
            });
        }).then(function (result) {
            //console.log(result);
            //var resV = (result.length ? (result[0].length ? (result[0][0].length ? (result[0][0][0].length ? result[0][0][0][0] : result[0][0][0]) : result[0][0]) : result[0]) : result);
            res.json({ venta: req.body });
        }).catch(function (err) {
            res.json({ hasError: true, message: err.stack });
        });
    }
    function modificarSalidaAmbiente(req, res) {
        var venta = req.body;
        sequelize.transaction(function (t) {
            return Sucursal.find({
                where: {
                    id: venta.sucursal.id
                },
                transaction: t,
                include: [{ model: Empresa, as: 'empresa' }]
            }).then(function (sucursal) {
                // venta.factura = sucursal.nota_venta_correlativo;
                venta.numero_literal = NumeroLiteral.Convertir(parseFloat(venta.total).toFixed(2).toString());
                venta.numero_literal_dolares = NumeroLiteral.Convertir(parseFloat(venta.total_dolares).toFixed(2).toString(), 'Dolares');
                // venta.actividad = { id: null };
                // if (sucursal.empresa.usar_pedidos) {
                //     venta.pedido = sucursal.pedido_correlativo;
                // }
                venta.pedido = sucursal.pedido_correlativo;
                // let ventaSinID = venta.detallesVenta.find(v => !v.id);

                let sumDetVentas = venta.detallesVenta.reduce((val, x) => {
					if(!x.id)val += x.total
					return val
				}, 0)

                if (!venta.cliente.id) {
                    return Cliente.create({
                        id_empresa: venta.id_empresa,
                        nit: venta.cliente.nit,
                        razon_social: venta.cliente.razon_social
                    }, { transaction: t }).then(function (clienteCreado) {
                        // modificar venta y crear nuevos detalless =========================
                        if (sumDetVentas > 0) {
                            // crear comanda ==============
                            return ComandaVenta.create({
                                id_venta: venta.id,
                                numero: sucursal.pedido_correlativo,
                                fecha: new Date(),
                                total: sumDetVentas
                            }, {transaction: t}).then(function (comandaCreado) {
                                venta.id_comanda = comandaCreado.id
                                return modificarVentaAmbiente(req, venta, res, venta.cliente.id, null, null, false, sucursal, t);
                            })
                        }else{
                            return modificarVentaAmbiente(req, venta, res, venta.cliente.id, null, null, false, sucursal, t);
                        }
                    });
                } else {
                    // modificar venta y crear nuevos detalless =========================
                    if (sumDetVentas > 0) {
                        // crear comanda ==============
                        return ComandaVenta.create({
                            id_venta: venta.id,
                            numero: sucursal.pedido_correlativo,
                            fecha: new Date(),
                            total: sumDetVentas
                        }, {transaction: t}).then(function (comandaCreado) {
                            venta.id_comanda = comandaCreado.id
                            return modificarVentaAmbiente(req, venta, res, venta.cliente.id, null, null, false, sucursal, t);
                        })
                    }else{
                        return modificarVentaAmbiente(req, venta, res, venta.cliente.id, null, null, false, sucursal, t);
                    }
                }
            });
        }).then(function (result) {
            res.json({ venta: req.body });
        }).catch(function (err) {
            res.json({ hasError: true, message: err.stack });
        });
    }

    function modificarVentaAmbiente(req, venta, res, idCliente, movimientoCreado, dosificacion, esFactura, sucursal, t) {
        return Venta.update({
            id_cliente: idCliente,
            fecha: venta.fecha,
            importe: venta.importe ? venta.importe : 0,
            importe_dolares: venta.importe_dolares ? venta.importe_dolares : 0,
            total: venta.total ? venta.total : 0,
            total_dolares: venta.total_dolares ? venta.total_dolares : 0,
            id_usuario: venta.id_usuario,
            activa: true,
            pagado: venta.pagado,
            pagado_dolares: venta.pagado_dolares,
            cambio: venta.cambio,
            cambio_dolares: venta.cambio_dolares,
            observacion: venta.observacion,
            total_descuento: venta.total_descuento_general,
            total_descuento_dolares: venta.total_descuento_dolares,
            total_ice: venta.total_ice,
            total_ice_dolares: venta.total_ice_dolares,
            total_recargo: venta.total_recargo_general,
            total_recargo_dolares: venta.total_recargo_dolares,
            total_exento: venta.total_exento,
            total_excento_dolares: venta.total_excento_dolares,
            ver_dolares: venta.ver_dolares,
            numero_tarjeta_credito: venta.numero_tarjeta_credito ? venta.numero_tarjeta_credito : null,
            monto_tarjeta_credito: venta.monto_tarjeta_credito ? venta.monto_tarjeta_credito : 0,
            usar_descuento_general: venta.usar_descuento_general,
            tipo_descuento: venta.tipo_descuento,
            descuento: venta.descuento,
            tipo_recargo: venta.tipo_recargo,
            recargo: venta.recargo,
            ice: venta.ice,
            excento: venta.excento
        }, { 
            where: {
                id: venta.id 
            }, 
            transaction: t 
        }).then(function (ventaCreada) {
            // req.body.id_venta = ventaCreada.id
            // creando relacion ambien con venta
            return VentaAmbiente.update({
                id_encargado: venta.encargado ? venta.encargado.id : null,
                liquidado: false,
                fecha: venta.fecha,
                hora_inicio: venta.hora_inicioTime ? venta.hora_inicioTime : null,
                hora_fin: venta.hora_finTime ? venta.hora_finTime : null 
            }, { 
                where: {
                    id: venta.id_venta_ambiente 
                }, 
                transaction: t 
            }).then(function (VentaAmbienteCreado) {
                var promisesVenta = [];
                if (venta.id_comanda) {
                    var suc2Prom = Sucursal.update({
                        pedido_correlativo: (venta.pedido + 1)
                    }, {
                        where: { id: venta.sucursal.id },
                        transaction: t
                    });
                    promisesVenta.push(suc2Prom);
                }
    
                promisesVenta.unshift(ConfiguracionGeneralFactura.find({
                    where: {
                        id_empresa: venta.id_empresa
                    },
                    transaction: t,
                    include: [{ model: Clase, as: 'impresionFactura' },
                    { model: Clase, as: 'tipoFacturacion' },
                    { model: Clase, as: 'tamanoPapelFactura' },
                    { model: Clase, as: 'tituloFactura' },
                    { model: Clase, as: 'subtituloFactura' },
                    { model: Clase, as: 'tamanoPapelNotaVenta' },
                    { model: Clase, as: 'tamanoPapelFacturaServicio' },
                    { model: Clase, as: 'tamanoPapelNotaTraspaso' },
                    { model: Clase, as: 'tamanoPapelNotaBaja' },
                    { model: Clase, as: 'tamanoPapelNotaPedido' },
                    { model: Clase, as: 'tamanoPapelCierreCaja' },
                    { model: Clase, as: 'formatoPapelFactura' },
                    { model: Clase, as: 'formatoColorFactura' },
                    { model: Clase, as: 'formatoConFirmaFactura' },
                    { model: Clase, as: 'formatoPapelFacturaServicio' },
                    { model: Clase, as: 'formatoColorFacturaServicio' },
                    { model: Clase, as: 'tipoConfiguracion' },
                    { model: Clase, as: 'formatoPapelNotaVenta' },
                    { model: Clase, as: 'formatoColorNotaVenta' },
                    { model: Clase, as: 'tipoConfiguracionNotaVenta' },
                    { model: Clase, as: 'formatoConFirmaNotaVenta' },
                    { model: Clase, as: 'formatoPapelNotaTraspaso' },
                    { model: Clase, as: 'formatoColorNotaTraspaso' },
                    { model: Clase, as: 'tipoConfiguracionNotaTraspaso' },
                    { model: Clase, as: 'formatoPapelNotaBaja' },
                    { model: Clase, as: 'formatoColorNotaBaja' },
                    { model: Clase, as: 'tipoConfiguracionNotaBaja' }]
                }).then(function (configuracionGeneralFactura) {
                    if (configuracionGeneralFactura.usar) {
                        return Sucursal.findAll({
                            where: {
                                id_empresa: venta.id_empresa,
                                numero: 0
                            }
                        }).then(function (sucursalPrincipalEncontrada) {
                            var promises = [];
                            venta.sucursalPrincipal = sucursalPrincipalEncontrada;
                            venta.configuracion = configuracionGeneralFactura;
                            venta.detallesVenta.forEach(function (detalleVenta, index, array) {
                                if (!detalleVenta.id) {
                                    promises.push(crearDetalleVenta({id: venta.id_movimiento}, venta, detalleVenta, detalleVenta.precio_unitario, detalleVenta.importe, detalleVenta.importe_dolares, detalleVenta.total, detalleVenta.total_dolares, index, array, res, venta, t, sucursal));
                                }
                            });
                            return Promise.all(promises)
                        });
                    } else {
                        return ConfiguracionFactura.find({
                            where: {
                                id_sucursal: venta.sucursal.id
                            },
                            transaction: t,
                            include: [{ model: Clase, as: 'impresionFactura' },
                            { model: Clase, as: 'tipoFacturacion' },
                            { model: Clase, as: 'tamanoPapelFactura' },
                            { model: Clase, as: 'tituloFactura' },
                            { model: Clase, as: 'subtituloFactura' },
                            { model: Clase, as: 'tamanoPapelNotaVenta' },
                            { model: Clase, as: 'tamanoPapelFacturaServicio' },
                            { model: Clase, as: 'tamanoPapelNotaTraspaso' },
                            { model: Clase, as: 'tamanoPapelNotaBaja' },
                            { model: Clase, as: 'tamanoPapelNotaPedido' },
                            { model: Clase, as: 'tamanoPapelCierreCaja' },
                            { model: Clase, as: 'formatoPapelFactura' },
                            { model: Clase, as: 'formatoColorFactura' },
                            { model: Clase, as: 'formatoConFirmaFactura' },
                            { model: Clase, as: 'formatoPapelFacturaServicio' },
                            { model: Clase, as: 'formatoColorFacturaServicio' },
                            { model: Clase, as: 'tipoConfiguracion' },
                            { model: Clase, as: 'formatoPapelNotaVenta' },
                            { model: Clase, as: 'formatoColorNotaVenta' },
                            { model: Clase, as: 'tipoConfiguracionNotaVenta' },
                            { model: Clase, as: 'formatoConFirmaNotaVenta' },
                            { model: Clase, as: 'formatoPapelNotaTraspaso' },
                            { model: Clase, as: 'formatoColorNotaTraspaso' },
                            { model: Clase, as: 'tipoConfiguracionNotaTraspaso' },
                            { model: Clase, as: 'formatoPapelNotaBaja' },
                            { model: Clase, as: 'formatoColorNotaBaja' },
                            { model: Clase, as: 'tipoConfiguracionNotaBaja' }]
                        }).then(function (configuracionFactura) {
                            return Sucursal.findAll({
                                where: {
                                    id_empresa: venta.id_empresa,
                                    numero: 0
                                }
                            }).then(function (sucursalPrincipalEncontrada) {
                                var promises = [];
                                venta.sucursalPrincipal = sucursalPrincipalEncontrada;
                                venta.configuracion = configuracionFactura;
                                venta.detallesVenta.forEach(function (detalleVenta, index, array) {
                                    if (!detalleVenta.id) {
                                        promises.push(crearDetalleVenta({id: venta.id_movimiento}, venta, detalleVenta, detalleVenta.precio_unitario, detalleVenta.importe, detalleVenta.importe_dolares, detalleVenta.total, detalleVenta.total_dolares, index, array, res, venta, t, sucursal));
                                    }
                                });
                                return Promise.all(promises)
                            });
                        });
                    }
                }));
                return Promise.all(promisesVenta);
            })
            
        });
    }

    function crearVentaAmbiente(req, venta, res, idCliente, movimientoCreado, dosificacion, esFactura, sucursal, t) {
        return Venta.create({
            id_almacen: venta.almacen.id,
            id_cliente: idCliente,
            id_movimiento: movimientoCreado.id,
            id_actividad: venta.actividad.id,
            factura: venta.factura,
            autorizacion: venta.autorizacion,
            fecha: venta.fecha,
            codigo_control: venta.codigo_control,
            fecha_limite_emision: venta.fecha_limite_emision,
            importe: venta.importe ? venta.importe : 0,
            importe_dolares: venta.importe_dolares ? venta.importe_dolares : 0,
            id_tipo_pago: venta.tipoPago.id,
            dias_credito: venta.dias_credito,
            a_cuenta: venta.a_cuenta,
            saldo: venta.saldo,
            a_cuenta_dolares: venta.a_cuenta_dolares,
            saldo_dolares: venta.saldo_dolares,
            total: venta.total ? venta.total : 0,
            total_dolares: venta.total_dolares ? venta.total_dolares : 0,
            id_usuario: venta.id_usuario,
            activa: true,
            pagado: venta.pagado,
            pagado_dolares: venta.pagado_dolares,
            cambio: venta.cambio,
            cambio_dolares: venta.cambio_dolares,
            pedido: venta.pedido,
            despachado: venta.despachado,
            id_vendedor: (venta.vendedor ? venta.vendedor.id : null),
            observacion: venta.observacion,
            total_descuento: venta.total_descuento_general,
            total_descuento_dolares: venta.total_descuento_dolares,
            total_ice: venta.total_ice,
            total_ice_dolares: venta.total_ice_dolares,
            total_recargo: venta.total_recargo_general,
            total_recargo_dolares: venta.total_recargo_dolares,
            total_exento: venta.total_exento,
            total_excento_dolares: venta.total_excento_dolares,
            ver_dolares: venta.ver_dolares,
            id_mesero: venta.mesero ? venta.mesero.id : null,
            mesa: venta.mesa,
            mesa_activa: true,
            numero_tarjeta_credito: venta.numero_tarjeta_credito ? venta.numero_tarjeta_credito : null,
            monto_tarjeta_credito: venta.monto_tarjeta_credito ? venta.monto_tarjeta_credito : 0,
            usar_descuento_general: venta.usar_descuento_general,
            tipo_descuento: venta.tipo_descuento,
            descuento: venta.descuento,
            tipo_recargo: venta.tipo_recargo,
            recargo: venta.recargo,
            ice: venta.ice,
            excento: venta.excento,
            observacion_traspaso: venta.observacion_traspaso || ''
        }, { transaction: t }).then(function (ventaCreada) {
            req.body.id_venta = ventaCreada.id
            // creando relacion ambien con venta
            return VentaAmbiente.create({
                id_venta: ventaCreada.id,
                id_ambiente: venta.id_ambiente,
                id_encargado: venta.encargado ? venta.encargado.id : null,
                liquidado: false,
                fecha: venta.fecha,
                hora_inicio: venta.hora_inicioTime ? venta.hora_inicioTime : null,
                hora_fin: venta.hora_finTime ? venta.hora_finTime : null 
            }, { transaction: t }).then(function (VentaAmbienteCreado) {
                // actualizando estado ambiente
                return Ambientes.update({
                    id_estado: venta.id_estado
                }, {
                    where: {
                        id: venta.id_ambiente
                    },
                    transaction: t
                }).then(function (ambienteActualizado) {
                    return ComandaVenta.create({
                        id_venta: ventaCreada.id,
                        numero: sucursal.pedido_correlativo,
                        fecha: new Date(),
                        total: venta.total ? venta.total : 0,
                    }, {transaction: t}).then(function (comandaCreado) {
                        venta.id_comanda = comandaCreado.id
                        var promisesVenta = [];
                        if (esFactura) {
                            var dosProm = Dosificacion.update({
                                correlativo: (venta.factura + 1)
                            }, {
                                where: { id: dosificacion.id },
                                transaction: t
                            });
                            promisesVenta.push(dosProm);
                        } else {
                            var sucProm = Sucursal.update({
                                nota_venta_correlativo: (venta.factura + 1)
                            }, {
                                where: { id: venta.sucursal.id },
                                transaction: t
                            });
                            promisesVenta.push(sucProm);
                        }
            
                        if (venta.id_comanda) {
                            var suc2Prom = Sucursal.update({
                                pedido_correlativo: (venta.pedido + 1)
                            }, {
                                where: { id: venta.sucursal.id },
                                transaction: t
                            });
                            promisesVenta.push(suc2Prom);
                        }
            
                        promisesVenta.unshift(ConfiguracionGeneralFactura.find({
                            where: {
                                id_empresa: venta.id_empresa
                            },
                            transaction: t,
                            include: [{ model: Clase, as: 'impresionFactura' },
                            { model: Clase, as: 'tipoFacturacion' },
                            { model: Clase, as: 'tamanoPapelFactura' },
                            { model: Clase, as: 'tituloFactura' },
                            { model: Clase, as: 'subtituloFactura' },
                            { model: Clase, as: 'tamanoPapelNotaVenta' },
                            { model: Clase, as: 'tamanoPapelFacturaServicio' },
                            { model: Clase, as: 'tamanoPapelNotaTraspaso' },
                            { model: Clase, as: 'tamanoPapelNotaBaja' },
                            { model: Clase, as: 'tamanoPapelNotaPedido' },
                            { model: Clase, as: 'tamanoPapelCierreCaja' },
                            { model: Clase, as: 'formatoPapelFactura' },
                            { model: Clase, as: 'formatoColorFactura' },
                            { model: Clase, as: 'formatoConFirmaFactura' },
                            { model: Clase, as: 'formatoPapelFacturaServicio' },
                            { model: Clase, as: 'formatoColorFacturaServicio' },
                            { model: Clase, as: 'tipoConfiguracion' },
                            { model: Clase, as: 'formatoPapelNotaVenta' },
                            { model: Clase, as: 'formatoColorNotaVenta' },
                            { model: Clase, as: 'tipoConfiguracionNotaVenta' },
                            { model: Clase, as: 'formatoConFirmaNotaVenta' },
                            { model: Clase, as: 'formatoPapelNotaTraspaso' },
                            { model: Clase, as: 'formatoColorNotaTraspaso' },
                            { model: Clase, as: 'tipoConfiguracionNotaTraspaso' },
                            { model: Clase, as: 'formatoPapelNotaBaja' },
                            { model: Clase, as: 'formatoColorNotaBaja' },
                            { model: Clase, as: 'tipoConfiguracionNotaBaja' }]
                        }).then(function (configuracionGeneralFactura) {
                            if (configuracionGeneralFactura.usar) {
                                return Sucursal.findAll({
                                    where: {
                                        id_empresa: venta.id_empresa,
                                        numero: 0
                                    }
                                }).then(function (sucursalPrincipalEncontrada) {
                                    var promises = [];
                                    venta.sucursalPrincipal = sucursalPrincipalEncontrada;
                                    venta.configuracion = configuracionGeneralFactura;
                                    venta.detallesVenta.forEach(function (detalleVenta, index, array) {
                                        promises.push(crearDetalleVenta(movimientoCreado, ventaCreada, detalleVenta, detalleVenta.precio_unitario, detalleVenta.importe, detalleVenta.importe_dolares, detalleVenta.total, detalleVenta.total_dolares, index, array, res, venta, t, sucursal));
                                    });
                                    return Promise.all(promises)
                                });
                            } else {
                                return ConfiguracionFactura.find({
                                    where: {
                                        id_sucursal: venta.sucursal.id
                                    },
                                    transaction: t,
                                    include: [{ model: Clase, as: 'impresionFactura' },
                                    { model: Clase, as: 'tipoFacturacion' },
                                    { model: Clase, as: 'tamanoPapelFactura' },
                                    { model: Clase, as: 'tituloFactura' },
                                    { model: Clase, as: 'subtituloFactura' },
                                    { model: Clase, as: 'tamanoPapelNotaVenta' },
                                    { model: Clase, as: 'tamanoPapelFacturaServicio' },
                                    { model: Clase, as: 'tamanoPapelNotaTraspaso' },
                                    { model: Clase, as: 'tamanoPapelNotaBaja' },
                                    { model: Clase, as: 'tamanoPapelNotaPedido' },
                                    { model: Clase, as: 'tamanoPapelCierreCaja' },
                                    { model: Clase, as: 'formatoPapelFactura' },
                                    { model: Clase, as: 'formatoColorFactura' },
                                    { model: Clase, as: 'formatoConFirmaFactura' },
                                    { model: Clase, as: 'formatoPapelFacturaServicio' },
                                    { model: Clase, as: 'formatoColorFacturaServicio' },
                                    { model: Clase, as: 'tipoConfiguracion' },
                                    { model: Clase, as: 'formatoPapelNotaVenta' },
                                    { model: Clase, as: 'formatoColorNotaVenta' },
                                    { model: Clase, as: 'tipoConfiguracionNotaVenta' },
                                    { model: Clase, as: 'formatoConFirmaNotaVenta' },
                                    { model: Clase, as: 'formatoPapelNotaTraspaso' },
                                    { model: Clase, as: 'formatoColorNotaTraspaso' },
                                    { model: Clase, as: 'tipoConfiguracionNotaTraspaso' },
                                    { model: Clase, as: 'formatoPapelNotaBaja' },
                                    { model: Clase, as: 'formatoColorNotaBaja' },
                                    { model: Clase, as: 'tipoConfiguracionNotaBaja' }]
                                }).then(function (configuracionFactura) {
                                    return Sucursal.findAll({
                                        where: {
                                            id_empresa: venta.id_empresa,
                                            numero: 0
                                        }
                                    }).then(function (sucursalPrincipalEncontrada) {
                                        var promises = [];
                                        venta.sucursalPrincipal = sucursalPrincipalEncontrada;
                                        venta.configuracion = configuracionFactura;
                                        venta.detallesVenta.forEach(function (detalleVenta, index, array) {
                                            promises.push(crearDetalleVenta(movimientoCreado, ventaCreada, detalleVenta, detalleVenta.precio_unitario, detalleVenta.importe, detalleVenta.importe_dolares, detalleVenta.total, detalleVenta.total_dolares, index, array, res, venta, t, sucursal));
                                        });
                                        return Promise.all(promises)
                                    });
                                });
                            }
                        }));
                        return Promise.all(promisesVenta);
                    });
                    
                })
                
            })
            
        });
    }

    function crearDetalleVenta(movimientoCreado, ventaCreada, detalleVenta, precio_unitario, importe, importe_dolares, total, total_dolares, index, array, res, venta, t, sucursal) {
        return DetalleVenta.create({
            id_venta: ventaCreada.id,
            id_producto: detalleVenta.producto.id,
            precio_unitario: detalleVenta.precio_unitario ? detalleVenta.precio_unitario : 0,
            precio_unitario_dolares: detalleVenta.precio_unitario_dolares ? detalleVenta.precio_unitario_dolares : 0,
            cantidad: detalleVenta.cantidad,
            importe: importe ? importe : 0,
            importe_dolares: importe_dolares ? importe_dolares : 0,
            descuento: (detalleVenta.descuento !== detalleVenta.total_descuento ? detalleVenta.total_descuento ? detalleVenta.total_descuento : detalleVenta.descuento ? detalleVenta.descuento : 0 : detalleVenta.descuento ? detalleVenta.descuento : 0),
            recargo: (detalleVenta.recargo !== detalleVenta.total_recargo ? detalleVenta.total_recargo ? detalleVenta.total_recargo : detalleVenta.recargo ? detalleVenta.recargo : 0 : detalleVenta.recargo ? detalleVenta.recargo : 0),
            ice: detalleVenta.ice,
            excento: detalleVenta.excento,
            descuento_dolares: detalleVenta.descuento_dolares,
            recargo_dolares: detalleVenta.recargo_dolares,
            ice_dolares: detalleVenta.ice_dolares,
            excento_dolares: detalleVenta.excento_dolares,
            tipo_descuento: detalleVenta.tipo_descuento,
            tipo_recargo: detalleVenta.tipo_recargo,
            total: total,
            total_dolares: total_dolares,
            fecha_vencimiento: detalleVenta.fecha_vencimiento,
            lote: detalleVenta.lote,
            id_inventario: (detalleVenta.costos.length > 0) ? detalleVenta.costos[0].id : null,
            id_promocion: detalleVenta.producto.promocionActual ? detalleVenta.producto.promocionActual.id : null,
            id_promocion_puntaje: detalleVenta.promocionPuntaje ? detalleVenta.promocionPuntaje.id : null,
            observaciones: detalleVenta.observaciones
        }, { transaction: t }).then(function (detalleVentaCreada) {
            return DetalleComanda.create({
                id_comanda: venta.id_comanda,
                id_producto: detalleVenta.producto.id,
                precio_unitario: detalleVenta.precio_unitario ? detalleVenta.precio_unitario : 0,
                cantidad: detalleVenta.cantidad,
                total: total
            },{ transaction: t }).then(function (params) {
                var promises = [];
                if (detalleVentaCreada.id_promocion_puntaje) {
                    detalleVenta.promocionActualPuntaje = detalleVenta.promocionPuntaje;
                }

                if (!detalleVenta.producto.restar_solo_despacho) {
                    if (detalleVenta.promosCumple) {
                        if (detalleVenta.promosCumple.length > 0) {
                            for (var i = 0; i < detalleVenta.promosCumple.length; i++) {
                                var promocumple = detalleVenta.promosCumple[i]
                                promises.push(guardarPromocionCumples(promocumple, detalleVentaCreada.id, t, venta, detalleVenta.producto.id_empresa))
                            }
                        }
                    }
                    if (detalleVenta.producto.combo) {
                        if (detalleVenta.producto.productosBase.length > 0) {
                            for (var i = 0; i < detalleVenta.producto.productosBase.length; i++) {
                                var productoCombo = detalleVenta.producto.productosBase[i]
                                promises.push(guardaDetalleCombo(productoCombo, detalleVentaCreada, t, venta, detalleVenta.producto.id_empresa))
                            }
                        }
                    }
                    if (sucursal.empresa.dataValues.usar_peps) {
                        if (!venta.id_orden_reposicion) {
                            promises.push(verificarTipoProductoDetalleVenta(detalleVenta, detalleVenta.producto, detalleVenta.cantidad, movimientoCreado, index, array, res, venta, t, detalleVentaCreada))
                        }
                        return Promise.all(promises);
                    }
                } else {
                    return new Promise(function (fulfill, reject) {
                        fulfill(venta);
                    });
                }
            })
            
        });
    }

    function verificarTipoProductoDetalleVenta(detalleVenta, producto, cantidad, movimientoCreado, index, array, res, venta, t, detalleVentaCreada, promises) {
        promises = []
        if (producto.tipoProducto.nombre_corto == Diccionario.TIPO_PRODUCTO_BASE) {
            promises.push(calcularCostosEgresos(detalleVenta, producto, cantidad, detalleVenta.costos,
                movimientoCreado, index, array, res, venta, t, detalleVentaCreada));
            return Promise.all(promises);
        } else if (producto.tipoProducto.nombre_corto == Diccionario.TIPO_PRODUCTO_INTERMEDIO) {
            for (var i = 0; i < producto.productosBase.length; i++) {
                if ((i + 1) == producto.productosBase.length) {
                    promises.push(calcularCostosEgresos(detalleVenta, producto.productosBase[i].productoBase, producto.productosBase[i].formulacion * detalleVenta.cantidad, producto.productosBase[i].productoBase.inventarios,
                        movimientoCreado, index, array, res, venta, t, detalleVentaCreada));
                } else {
                    promises.push(calcularCostosEgresos(detalleVenta, producto.productosBase[i].productoBase, producto.productosBase[i].formulacion * detalleVenta.cantidad, producto.productosBase[i].productoBase.inventarios,
                        movimientoCreado, index - 1, array, res, venta, t, detalleVentaCreada));
                }
            }
            return Promise.all(promises);
        } else {
            for (var i = 0; i < producto.productosBase.length; i++) {
                promises.push(verificarTipoProductoDetalleVenta(detalleVenta, producto.productosBase[i].productoBase, producto.productosBase[i].formulacion * detalleVenta.cantidad, movimientoCreado, index, array, res, venta, t, detalleVentaCreada))
            }
            return Promise.all(promises);
        }
    }

    function calcularCostosEgresos(detalleVenta, producto, cantidad, inventarios, movimientoCreado, index, array, res, venta, t, detalleVentaCreada) {
        var cantidadTotal = cantidad;
        var condicionInventario = {
            id_producto: producto.id, id_almacen: venta.almacen.id,
            cantidad: { $gt: 0 }
        }
        if (detalleVenta.lote) {
            condicionInventario.lote = detalleVenta.lote
        }
        if (detalleVenta.fecha_vencimiento) {
            var inicio = new Date(detalleVenta.fecha_vencimiento); inicio.setHours(0, 0, 0, 0, 0);
            var fin = new Date(detalleVenta.fecha_vencimiento); fin.setHours(23, 59, 59, 0, 0);

            condicionInventario.fecha_vencimiento = { $between: [inicio, fin] }
        }
        if (inventarios.length == 0) {
            return Inventario.findAll({
                where: condicionInventario, transaction: t,
                order: [['id', 'asc']]
            }).then(function (encontrado) {
                inventarios = encontrado
                if (producto.activar_inventario) {
                    if (inventarios.length > 0) {
                        var promises = [];
                        for (var i = 0; i < inventarios.length; i++) {
                            if (cantidadTotal > 0) {
                                var cantidadParcial;
                                if (cantidadTotal > inventarios[i].cantidad) {
                                    cantidadParcial = inventarios[i].cantidad;
                                    cantidadTotal = cantidadTotal - inventarios[i].cantidad
                                } else {
                                    cantidadParcial = cantidadTotal;
                                    cantidadTotal = 0;
                                }

                                if (cantidadParcial > 0) {
                                    var rrr = crearMovimientoEgresoYActualizarInventario(movimientoCreado, detalleVenta, producto, cantidad, inventarios, cantidadParcial, inventarios[i], index, array, i, res, venta, t, detalleVentaCreada);
                                    promises.push(new Promise(function (fulfill, reject) {
                                        fulfill(venta);
                                    }));
                                }
                            }
                        }
                        return Promise.all(promises);
                    } else {
                        return new Promise(function (fulfill, reject) {
                            fulfill(venta);
                        });
                    }
                } else {
                    return new Promise(function (fulfill, reject) {
                        fulfill(venta);
                    });
                }
            }).catch(function (err) {
                return new Promise(function (fulfill, reject) {
                    reject(err);
                });
            })
        } else {
            if (producto.activar_inventario) {
                if (inventarios.length > 0) {
                    var promises = [];

                    for (var i = 0; i < inventarios.length; i++) {
                        if (cantidadTotal > 0) {
                            var cantidadParcial;
                            if (cantidadTotal > inventarios[i].cantidad) {
                                cantidadParcial = inventarios[i].cantidad;
                                cantidadTotal = cantidadTotal - inventarios[i].cantidad
                            } else {
                                cantidadParcial = cantidadTotal;
                                cantidadTotal = 0;
                            }

                            if (cantidadParcial > 0) {
                                var rrr = crearMovimientoEgresoYActualizarInventario(movimientoCreado, detalleVenta, producto, cantidad, inventarios, cantidadParcial, inventarios[i], index, array, i, res, venta, t, detalleVentaCreada);
                                promises.push(new Promise(function (fulfill, reject) {
                                    fulfill(venta);
                                }));
                            } 
                        }
                    }
                    return Promise.all(promises);
                } else {
                    return new Promise(function (fulfill, reject) {
                        fulfill(venta);
                    });
                }
            } else {
                return new Promise(function (fulfill, reject) {
                    fulfill(venta);
                });
            }
        }
    }

    function crearMovimientoEgresoYActualizarInventario(movimientoCreado, detalleVenta, producto, cantidad, inventarios, cantidadParcial, costo, index, array, i, res, datosVenta, t, detalleVentaCreada) {
        return DetalleMovimiento.create({
            id_movimiento: movimientoCreado.id,
            id_producto: producto.id,
            cantidad: cantidadParcial,
            costo_unitario: costo.costo_unitario ? costo.costo_unitario : 0,
            costo_unitario_dolares: costo.costo_unitario_dolares ? costo.costo_unitario_dolares : 0,
            importe: (cantidadParcial * (costo.costo_unitario ? costo.costo_unitario : 0)),
            importe_dolares: (cantidadParcial * (costo.costo_unitario_dolares ? costo.costo_unitario_dolares : 0)),
            total: (cantidadParcial * (costo.costo_unitario ? costo.costo_unitario : 0)),
            total_dolares: (cantidadParcial * (costo.costo_unitario_dolares ? costo.costo_unitario_dolares : 0)),
            descuento: ((detalleVenta.descuento / cantidad) * cantidadParcial),
            recargo: ((detalleVenta.recargo / cantidad) * cantidadParcial),
            ice: ((detalleVenta.ice / cantidad) * cantidadParcial),
            excento: ((detalleVenta.excento / cantidad) * cantidadParcial),
            descuento_dolares: ((detalleVenta.descuento_dolares / cantidad) * cantidadParcial),
            recargo_dolares: ((detalleVenta.recargo_dolares / cantidad) * cantidadParcial),
            ice_dolares: ((detalleVenta.ice_dolares / cantidad) * cantidadParcial),
            excento_dolares: ((detalleVenta.excento_dolares / cantidad) * cantidadParcial),
            tipo_descuento: detalleVenta.tipo_descuento,
            tipo_recargo: detalleVenta.tipo_recargo,
            fecha_vencimiento: detalleVenta.fecha_vencimiento,
            lote: detalleVenta.lote,
            id_inventario: costo.id
        }, { transaction: t }).then(function (detalleMovimientoCreado) {
            return DetalleVentaProductoFinal.create({
                id_detalle_venta: detalleVentaCreada.id,
                id_detalle_movimiento: detalleMovimientoCreado.id
            },
                { transaction: t }).then(function (creado) {
                    sequelize.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED }, function (tu) {
                        return Inventario.find({
                            where: {
                                id: costo.id
                            },
                            transaction: tu,
                            lock: tu.LOCK.UPDATE
                        }).then(function (inventario) {
                            return Inventario.update({
                                cantidad: inventario.cantidad - cantidadParcial,
                                costo_total: ((inventario.cantidad - cantidadParcial) * costo.costo_unitario),
                                costo_total_dolares: ((inventario.cantidad - cantidadParcial) * (costo.costo_unitario_dolares ? costo.costo_unitario_dolares : 0))
                            }, {
                                where: {
                                    id: inventario.id
                                },
                                transaction: tu
                            }).then(function (result) {
                                return new Promise(function (fulfill, reject) {
                                    fulfill(datosVenta);
                                });
                            });
                        });
                    }).then(function (result) {
                        return new Promise(function (fulfill, reject) {
                            fulfill(datosVenta);
                        });
                    }).catch(function (err) {
                        return new Promise(function (fulfill, reject) {
                            reject(err);
                        });
                    });
                }).catch(function (err) {
                    return new Promise(function (fulfill, reject) {
                        reject(err);
                    });
                });
        }).catch(function (err) {
            return new Promise(function (fulfill, reject) {
                reject(err);
            });
        });
    }

    function guardarPromocionCumples(promoCumple, IdDetalleVenta, t, venta, id_empresa) {
        if (promoCumple.cliente.id) {
            return EntragaDetalleVentaCliente.create({
                id_cliente: promoCumple.cliente.id,
                id_detalle_venta: IdDetalleVenta,
                descuento: promoCumple.descuento,
                cantidad: promoCumple.cantidad,
                fecha: promoCumple.fecha
            }, { transaction: t }).then(function (creados) {
                return new Promise(function (fulfill, reject) {
                    fulfill(venta);
                });
            })
        } else {
            return Cliente.create({
                id_empresa: id_empresa,
                nit: promoCumple.cliente.nit,
                razon_social: promoCumple.cliente.razon_social
            }, { transaction: t }).then(function (clienteCreado) {
                return EntragaDetalleVentaCliente.create({
                    id_cliente: clienteCreado.id,
                    id_detalle_venta: IdDetalleVenta,
                    descuento: promoCumple.descuento,
                    cantidad: promoCumple.cantidad,
                    fecha: promoCumple.fecha
                }, { transaction: t }).then(function (creados) {
                    return new Promise(function (fulfill, reject) {
                        fulfill(venta);
                    });
                })
            }).catch(function (err) {
                return new Promise(function (fulfill, reject) {
                    reject(err);
                });
            });
        }
    }
    function guardaDetalleCombo(producto, detalleVenta, t, venta, id_empresa) {
        return DetalleComboVenta.create({
            id_detalle_venta: detalleVenta.id,
            id_producto: producto.productoBase.id,
            precio_unitario: producto.productoBase.precio_unitario,
            cantidad: producto.formulacion * detalleVenta.cantidad,
            total: (producto.formulacion * detalleVenta.cantidad) * producto.productoBase.precio_unitario,
            mostrar: producto.habilitar_cambio
        }, { transaction: t }).then(function (detalleComboCreado) {
            return new Promise(function (fulfill, reject) {
                fulfill(venta);
            });
        }).catch(function (err) {
            return new Promise(function (fulfill, reject) {
                reject(err);
            });
        });
    }

    router.route('/balnearios/ventas/liquidacion')
		// .get(ensureAuthorizedlogged, function (req, res) {
		// 	DetalleVenta.findAll({
		// 		include: [{ model: Producto, as: 'producto' }, { model: ProductoPromocion, as: 'promocionActual' }, {
		// 			model: Venta, as: 'venta',
		// 			where: { mesa: req.params.mesa, mesa_activa: true, usuario: req.params.id_usuario, activa: true },
		// 			include: [{ model: Almacen, as: 'almacen' }, { model: MeseroVenta, as: 'mesero', where: { id: req.params.mesero } }]
		// 		}]
		// 	}).then(function (ventas) {
		// 		res.json(ventas);
		// 	});
		// })
		.put(ensureAuthorizedlogged, function (req, res) {
			var id_sucursal = 0
			var venta = {}
			
			sequelize.transaction(function (t) {
                // actualizar liquidacion
                if (req.body.movimiento.nombre_corto == Diccionario.EGRE_FACTURACION) {
                    return SucursalActividadDosificacion.find({
                        where: {
                            id_actividad: req.body.actividad.id,
                            id_sucursal: req.body.sucursal.id,
                            expirado: false
                        },
                        transaction: t,
                        include: [{ model: Dosificacion, as: 'dosificacion', include: [{ model: Clase, as: 'pieFactura' }] },
                        { model: Sucursal, as: 'sucursal', include: [{ model: Empresa, as: 'empresa' }] }]
                    }).then(function (sucursalActividadDosificacion) {
                        if (!sucursalActividadDosificacion.sucursal.activo) throw new Error('Sucursal ' + sucursalActividadDosificacion.sucursal.nombre + ' está deshabilitada, no se pueden hacer cambios.')
                        var dosificacion = sucursalActividadDosificacion.dosificacion;
                        venta.factura = dosificacion.correlativo;
                        venta.pieFactura = dosificacion.pieFactura;
                        venta.codigo_control = CodigoControl.obtenerCodigoControl(dosificacion.autorizacion.toString(),
                            dosificacion.correlativo.toString(),
                            req.body.cliente.nit.toString(),
                            formatearFecha(req.body.fechaTexto).toString(),
                            parseFloat(req.body.total).toFixed(2),
                            dosificacion.llave_digital.toString());
                        venta.autorizacion = dosificacion.autorizacion.toString();
                        venta.fecha_limite_emision = dosificacion.fecha_limite_emision;
                        return Dosificacion.update({
                            correlativo: (venta.factura + 1)
                        }, {
                            where: { id: dosificacion.id },
                            transaction: t
                        }).then(function (disoficacionActualizada) {
                            if (!req.body.cliente.id) {
                                return Cliente.create({
                                    id_empresa: req.body.id_empresa,
                                    nit: req.body.cliente.nit,
                                    razon_social: req.body.cliente.razon_social
                                }, { transaction: t }).then(function (clienteCreado) {
                                    var promises = []
                                    promises.push(ActualizarVentaLiquidacion(venta, req, clienteCreado.id, t));
                                    return Promise.all(promises)
                                }).catch(function (err) {
                                    return new Promise(function (fulfill, reject) {
                                        reject((err.stack !== undefined) ? err.stack : err);
                                    });
                                });;
                            } else {
                                var promises = []
                                promises.push(ActualizarVentaLiquidacion(venta, req, req.body.cliente.id, t));
                                return Promise.all(promises)
                            }
                        })
                    }).catch(function (err) {
                        return new Promise(function (fulfill, reject) {
                            reject((err.stack !== undefined) ? err.stack : err);
                        });
                    });;
                    //SI ES PROFORMA
                } else if (req.body.movimiento.nombre_corto == Diccionario.EGRE_PROFORMA) {
                    venta.actividad = { id: null };
                    if (!req.body.cliente.id) {
                        return Cliente.create({
                            id_empresa: req.body.id_empresa,
                            nit: req.body.cliente.nit,
                            razon_social: req.body.cliente.razon_social
                        }, { transaction: t }).then(function (clienteCreado) {
                            var promises = []
                            promises.push(ActualizarVentaLiquidacion(venta, req, clienteCreado.id, t));
                            return Promise.all(promises)
                        }).catch(function (err) {
                            return new Promise(function (fulfill, reject) {
                                reject((err.stack !== undefined) ? err.stack : err);
                            });
                        });
                    } else {
                        var promises = []
                        promises.push(ActualizarVentaLiquidacion(venta, req, req.body.cliente.id, t));
                        return Promise.all(promises)
                    }
                    //SI ES PREFACTURACION
                }
				
			}).then(function (result) {
				DetalleVenta.findAll({
					include: [{ model: DetalleComboVenta, as: 'detallesCombo', required: false, include: [{ model: Producto, as: 'producto' }] }, { model: Producto, as: 'producto' }, { model: ProductoPromocion, as: 'promocionActual' }, {
						model: Venta, as: 'venta',
                        where:{
                            id: req.body.id
                        },
						include: [ { model: Almacen, as: 'almacen' }]
					}]
				}).then(function (DetalleVentaEncontrada) {
					res.json({ mensaje: 'liquidación satisfactoriamente!', liquidacion: req.body, detalles: DetalleVentaEncontrada });
				})

			}).catch(function (err) {
				res.json({ hasError: true, message: err.stack });
			})
		})
	function ActualizarVentaLiquidacion(venta, req, idcliente, t) {
		return Movimiento.update({
			id_clase: req.body.movimiento.id,
		}, { where: { id: req.body.id_movimiento }, transaction: t }).then(function (movimientoCreado) {
			return Venta.update({
				id_actividad: req.body.actividad ? req.body.actividad.id : null,
				factura: venta.factura,
				autorizacion: venta.autorizacion,
				codigo_control: venta.codigo_control,
				fecha_limite_emision: venta.fecha_limite_emision,
				id_cliente: idcliente,
				observacion_traspaso: venta.observacion_traspaso || ''
			}, {
				where: { id: req.body.id }, transaction: t
			}).then(function (actualizado) {
				return VentaAmbiente.update({
                    liquidado: true,
                }, {
                    where: { id: req.body.id_venta_ambiente }, transaction: t
                }).then(function (actualizado) {
                    return Ambientes.update({
                        id_estado:  req.body.id_estado
                    }, {
                        where: { id: req.body.ambiente.id }, transaction: t
                    }).then(function (actualizado) {
                        return new Promise(function (fulfill, reject) {
                            fulfill();
                        });
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

    //OBTENER  COMANDA VENTA
    router.route('/balnearios/comanda/:id_comanda')
        .get( (req, res) => {
            let { id_comanda } = req.params
            if(!id_comanda) return res.json({error: true, message:"Parámetros incorrectos", messageType:"error"})
            ComandaVenta.find({
                where: { id: id_comanda},
                include:[
                    { 
                        model: DetalleComanda, as:'DetallesComanda',
                        include: [{model: Producto, as: 'producto'}]
                    }
                ]
            })
            .then(comanda => {
                res.json({error:false, comanda: comanda, message:"Ambiente recuperdo con éxitos", messageType:"success"})
            })
        })
    
	
}