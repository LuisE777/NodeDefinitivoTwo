module.exports = (router, sequelize, Sequelize, Usuario, Cliente, Clase, Sucursal, SucursalActividadDosificacion, Dosificacion,
    Empresa, Tipo, OrdenServicio, Proveedor, Persona, ensureAuthorizedlogged, ConfiguracionIso, DetalleOrdenServicio, Almacen) => {

    router.route('/orden-servicio/:id_orden_servicio/:id_empresa/:id_usuario')
        .get(ensureAuthorizedlogged, (req, res) => {
            OrdenServicio.find({
                where: { id: req.params.id_orden_servicio },
                include: [
                    { model: DetalleOrdenServicio, as: 'detallesOrdenServicios' },
                    { model: Clase, as: 'estado' },
                    { model: Clase, as: 'area_solicitante' },
                    { model: Clase, as: 'area_destino' },
                    { model: Clase, as: 'concepto' },
                    { model: Clase, as: 'detalle' },
                    { model: Cliente, as: 'clientes' },
                    {
                        model: Almacen, as: 'almacen',
                        include: [
                            {
                                model: Sucursal, as: 'sucursal'
                            }
                        ]
                    },
                    {
                        model: ConfiguracionIso, as: 'configuracionesIso', required: false
                    },
                    { model: Clase, as: 'tipoPago' },
                    {
                        model: Proveedor, as: 'proveedor'
                    },
                    { model: Usuario, as: 'usuario', include: [{ model: Persona, as: 'persona' }] }
                ]
            }).then((orden_servicio) => {
                res.json({ orden_servicio: orden_servicio });
            }).catch((err) => {
                res.json({ mensaje: err.stack, hasErr: true });
            })
        })
        .post((req, res) => {
            sequelize.transaction((t) => {
                return Sucursal.find({
                    where: { id: req.body.id_sucursal }, transaction: t
                }).then((sucursalEncontrada) => {
                    if (!sucursalEncontrada) throw new Error('Sucursal no se encuentra, no se pueden hacer cambios.')
                    if (!sucursalEncontrada.activo) throw new Error('Sucursal deshabilitada, no se pueden hacer cambios.')
                    const correlativo = (sucursalEncontrada.numero_correlativo_orden_servicio && sucursalEncontrada.numero_correlativo_orden_servicio || 1)
                    if (req.body.cliente && req.body.cliente.id) {
                        return crearOrdenServicio(req, t, correlativo, sucursalEncontrada)
                    } else {
                        if (req.body.cliente) {
                            return Cliente.create({
                                id_empresa: sucursalEncontrada.id_empresa,
                                // nit: req.body.cliente.nit,
                                razon_social: req.body.cliente.razon_social
                            }, { transaction: t }).then(function (clienteCreado) {
                                req.body.cliente = clienteCreado
                                return crearOrdenServicio(req, t, correlativo, sucursalEncontrada);
                            });
                        } else {
                            return crearOrdenServicio(req, t, correlativo, sucursalEncontrada);
                        }
                    }
                }).catch((err) => {
                    return new Promise((fulfill, reject) => {
                        reject((err.stack !== undefined) ? err.stack : err);
                    });
                })

            }).then(async (result) => {
                res.json({ mensaje: 'Guardado correctamente', id_pedido: result[0].id })
            }).catch((err) => {
                res.json({ mensaje: err.stack && err.stack || err, hasErr: true })
            })
        })
        .put(ensureAuthorizedlogged, (req, res) => {
            sequelize.transaction((t) => {
                return Sucursal.find({
                    where: { id: req.body.id_sucursal }, transaction: t
                }).then((sucursalEncontrada) => {
                    if (!sucursalEncontrada.activo) throw new Error('Sucursal deshabilitada, no se pueden hacer cambios.')
                    return OrdenServicio.update({
                        fecha: req.body.fecha,
                        fecha_entrega: req.body.fecha_entrega,
                        // id_usuario: req.body.id_usuario,
                        // id_compra: null,
                        id_sucursal: req.body.id_sucursal,
                        id_almacen: req.body.id_almacen,
                        activo: true,
                        id_concepto: req.body.id_concepto,
                        cambio_dolar: req.body.cambio_dolar,
                        id_detalle: req.body.id_detalle,
                        id_proveedor: req.body.id_proveedor,
                        // id_cliente: req.body.id_cliente && req.body.id_cliente || null,
                        eliminado: false,
                        id_empresa: req.body.id_empresa,
                        numero_correlativo: sucursalEncontrada.numero_correlativo_orden_servicio,
                        id_area_solicitante: req.body.id_area_solicitante,
                        id_area_destino: req.body.id_area_destino,
                        importe: req.body.importe,
                        id_tipo_pago: req.body.id_tipo_pago,
                        dias_credito: req.body.dias_credito && req.body.dias_credito || 0,
                        a_cuenta: req.body.a_cuenta && req.body.a_cuenta || 0,
                        saldo: req.body.importe - (req.body.a_cuenta && req.body.a_cuenta || 0),
                        id_estado: req.body.id_estado,
                        // numero_iso: almacenObtenido.numero_correlativo_iso_orden_compra ? almacenObtenido.numero_correlativo_iso_orden_compra : 0,
                        // descripcion:,
                        observacion: req.body.observacion,
                        config_doc_iso: req.body.config_doc_iso && req.body.config_doc_iso || null
                    }, {
                        transaction: t
                    }).then((pedidoCreado) => {
                        for (let index = 0; index < req.body.detalles.length; index++) {
                            promises.push(crearDetallePedido(pedidoCreado.id, req.body.detalles[index], req.params.id_empresa, t, req))
                        }
                        return Promise.all(promises)
                    }).catch((err) => {
                        return new Promise((fulfill, reject) => {
                            reject((err.stack !== undefined) ? err.stack : err);
                        });
                    })
                }).catch((err) => {
                    return new Promise((fulfill, reject) => {
                        reject((err.stack !== undefined) ? err.stack : err);
                    });
                })

            }).then(async (result) => {
                res.json({ mensaje: 'Guardado correctamente', datos: result })
            }).catch((err) => {
                res.json({ mensaje: err.stack && err.stack || err, hasErr: true })
            })
        })
        .delete(ensureAuthorizedlogged, (req, res) => {
            OrdenServicio.find({
                where: {
                    id: req.params.id_orden_servicio
                },
                include: [{ model: Clase, as: 'estado' }]
            }).then((ped) => {
                Sucursal.find({
                    where: {
                        id: ped.id_sucursal
                    }
                }).then((suc) => {
                    if (suc && !suc.activo) return res.json({ mensaje: 'Sucursal de pedido deshabilitada, no se puede eliminar.' });
                    Tipo.find({
                        where: {
                            nombre_corto: 'ESTMODPED'
                        },
                        include: [{ model: Clase, as: 'clases', where: { eliminado: false } }]
                    }).then((entidad) => {
                        const estado_parcial = entidad.clases.find(clase => (clase.nombre === 'Parcial'))
                        const estado_anulado = entidad.clases.find(clase => (clase.nombre === 'Anulado'))
                        if (estado_parcial.id === ped.id_estado) {
                            OrdenServicio.update({
                                id_estado: estado_anulado.id
                            }, {
                                where: { id: ped.id }

                            }).then((actualizado) => {
                                res.json({ mensaje: "Anulado satisfactoriamente", estado: estado_anulado })
                            })
                        } else {
                            OrdenServicio.update({
                                eliminado: true
                            }, {
                                where: { id: ped.id }
                            }).then((actualizado) => {
                                res.json({ mensaje: "Eliminado satisfactoriamente", estado: ped.estado })
                            })
                        }
                    }).catch((err) => {
                        res.json({ hasErr: true, mensaje: err.stack })
                    })

                }).catch((err) => {
                    res.json({ hasErr: true, mensaje: err.stack })
                })
            })
        })

    function formatearFecha(fecha) {
        var ini = fecha.split('/');
        var formatea = ini[1] + '/' + ini[0] + '/' + ini[2];
        return new Date(formatea);
    }

    router.route('/orden-servicio/empresa/:id_empresa/desde/:desde/hasta/:hasta/pagina/:pagina/items-pagina/:items_pagina/columna/:columna/direccion/:direccion/busqueda/:texto_busqueda/tipo_pedido/:id_tipo/proveedor/:id_proveedor/nit/:nit/sucursal/:id_sucursal/estado/:estado/usuario/:usuario/:dociso/almacen/:id_almacen')
        .get(ensureAuthorizedlogged, (req, res) => {
            let condicionPersona = {}
            let condicionProveedor = {}
            let condicionUsuario = {}
            let condicionSucursal = {}
            let condicionTipo = {}
            let condicionEstado = {}
            let condicionPedido = { id_empresa: req.params.id_empresa }
            let condicionAlmacen = {}
            let desde = false
            let hasta = false
            let inicio = ""
            let fin = ""
            let textOrder
                switch (req.params.columna) {
                    case 'sucursal':
                        textOrder = '`almacen.sucursal`.`nombre`' + " " + req.params.direccion
                        break;
                    case 'fecha':
                        textOrder = '`orden_servicio`.`fecha`' + " " + req.params.direccion
                        break;
                    case 'almacen':
                        textOrder = '`almacen.nombre`' + " " + req.params.direccion
                        break;  
                    case 'proveedor':
                        textOrder = '`proveedor.razon_social`' + " " + req.params.direccion
                        break;
                    case 'factura':
                        textOrder = '`compra.factura`' + " " + req.params.direccion
                        break;
                    case 'doc_iso':
                        textOrder = '`orden_servicio`.`numero_iso`' + " " + req.params.direccion
                        break;
                    case 'doc':
                        textOrder = '`orden_servicio`.`numero_correlativo`' + " " + req.params.direccion
                        break;
                    default:
                        textOrder = '`orden_servicio`.`id`' + " " + req.params.direccion
                        break;
                }
            if (req.params.items_pagina != '0') textOrder = textOrder + " limit " + (req.params.items_pagina * (req.params.pagina - 1)) + ", " + req.params.items_pagina
            if (req.params.desde != "0") {
                req.params.pagina = 1
                inicio = formatearFecha(req.params.desde); inicio.setHours(0, 0, 0, 0);
                desde = true
            }
            if (req.params.hasta != "0") {
                req.params.pagina = 1
                fin = formatearFecha(req.params.hasta); fin.setHours(23, 59, 59, 59);
                hasta = true
            }
            if (desde && hasta) {
                req.params.pagina = 1
                condicionPedido.fecha = {

                    $between: [inicio, fin]
                }
            } else if (desde && !hasta) {
                req.params.pagina = 1
                condicionPedido.fecha = {
                    $gte: [inicio]
                }
            } else if (!desde && hasta) {
                req.params.pagina = 1
                condicionPedido.fecha = {
                    $lte: [fin]
                }
            }
            if (req.params.id_tipo !== 0) {

            }
            if (req.params.id_proveedor != 0) {
                req.params.pagina = 1
                condicionPedido.id_proveedor = req.params.id_proveedor
            }
            if (req.params.dociso != 0) {
                req.params.pagina = 1
                condicionPedido.numero_iso = parseInt(req.params.dociso);
            }
            if (req.params.nit != 0) {
                req.params.pagina = 1
                condicionProveedor.nit = req.params.nit
            }
            if (req.params.id_sucursal != 0) {
                condicionSucursal.id = req.params.id_sucursal
            }
            if (req.params.id_almacen != 0) {
                condicionAlmacen.id = req.params.id_almacen
            }
            if (req.params.estado != 0) {
                condicionPedido.id_estado = parseInt(req.params.estado)
            }
            if (req.params.usuario != 0) {
                req.params.pagina = 1
                condicionUsuario.id = req.params.usuario
            }
            if (req.params.texto_busqueda != 0) {
                // condicionSucursal.$or = [{ id: { $not: null } }, { nombre: { $like: req.params.texto_busqueda + '%' } }]
                if (isNaN((req.params.texto_busqueda * 1))) {
                    condicionProveedor.razon_social = { $like: req.params.texto_busqueda + '%' }
                } else {
                    condicionPedido.numero_correlativo = parseInt(req.params.texto_busqueda);
                }
            }

            condicionSucursal.id_empresa = req.params.id_empresa
            condicionSucursal.activo = true
            OrdenServicio.findAndCountAll({
                where: condicionPedido,
                include: [
                    /* { model: DetalleOrdenServicio, as: 'detallesOrdenServicios' }, */
                    { model: Clase, as: 'estado' }, {
                        model: Almacen, as: 'almacen', where: condicionAlmacen,
                        include: [
                            {
                                model: Sucursal, as: 'sucursal', where: condicionSucursal
                            }
                        ]
                    },
                    {
                        model: ConfiguracionIso, as: 'configuracionesIso', required: false
                    },
                    { model: Clase, as: 'tipoPago' },
                    {
                        model: Proveedor, as: 'proveedor', where: condicionProveedor
                    },
                    { model: Usuario, as: 'usuario', include: [{ model: Persona, as: 'persona' }] }
                ],
                order: sequelize.literal(textOrder)/* ,
                offset: (req.params.items_pagina * (req.params.pagina - 1)), 
                limit: req.params.items_pagina */
            }).then((pedidos) => {
                res.json({ pedidos: pedidos.rows, paginas: Math.ceil(pedidos.count / req.params.items_pagina) });
            }).catch((err) => {
                res.json({ mensaje: err.stack, hasErr: true });
            })
        })

    function crearDetallePedido(pedido, detalle, empresa, t, req) {
        return DetalleOrdenServicio.create({
            id_orden_servicio: pedido,
            descripcion: detalle.descripcion,
            unidad_medida: detalle.unidad_medida,
            cantidad: detalle.cantidad,
            costo_unitario: detalle.costo_unitario,
            total: detalle.total
        }, {
            transaction: t
        }).then((detallecreado) => {
            return detallecreado
        }).catch((err) => {
            return new Promise((fulfill, reject) => {
                reject((err.stack !== undefined) ? err.stack : err);
            });
        })

    }

    function crearOrdenServicio(req, t, correlativo, sucursalEncontrada) {
        return Almacen.findOne({
            where: { id: req.body.id_almacen },
            transaction: t
        })
            .then(almacenEncontrado => {
                return OrdenServicio.create({
                    fecha: req.body.fecha,
                    fecha_entrega: req.body.fecha_entrega,
                    id_usuario: req.body.id_usuario,
                    // id_compra: null,
                    id_sucursal: req.body.id_sucursal,
                    id_almacen: req.body.id_almacen,
                    activo: true,
                    id_concepto: req.body.id_concepto,
                    cambio_dolar: req.body.cambio_dolar,
                    id_detalle: req.body.id_detalle,
                    id_proveedor: req.body.id_proveedor,
                    id_cliente: req.body.cliente ? req.body.cliente.id : null,
                    eliminado: false,
                    id_empresa: req.body.id_empresa,
                    numero_correlativo: correlativo,
                    id_area_solicitante: req.body.id_area_solicitante,
                    id_area_destino: req.body.id_area_destino,
                    importe: req.body.importe,
                    id_tipo_pago: req.body.id_tipo_pago,
                    dias_credito: req.body.dias_credito && req.body.dias_credito || 0,
                    a_cuenta: req.body.a_cuenta && req.body.a_cuenta || 0,
                    saldo: req.body.importe - (req.body.a_cuenta && req.body.a_cuenta || 0),
                    id_estado: req.body.id_estado,
                    // numero_iso: almacenObtenido.numero_correlativo_iso_orden_compra ? almacenObtenido.numero_correlativo_iso_orden_compra : 0,
                    observacion: req.body.observacion,
                    numero_iso: almacenEncontrado.numero_correlativo_iso_orden_servicio ? almacenEncontrado.numero_correlativo_iso_orden_servicio : null,
                    config_doc_iso: req.body.config_doc_iso && req.body.config_doc_iso || null
                }, {
                    transaction: t
                }).then((pedidoCreado) => {
                    return Almacen.update({
                        numero_correlativo_iso_orden_servicio: req.body.config_doc_iso ? almacenEncontrado.numero_correlativo_iso_orden_servicio + 1 : almacenEncontrado.numero_correlativo_iso_orden_servicio
                    }, { where: { id: req.body.id_almacen }, transaction: t })
                        .then(AlmacenActualizado => {
                            return Sucursal.update({
                                numero_correlativo_orden_servicio: (correlativo + 1),
                            }, { where: { id: sucursalEncontrada.id }, transaction: t })
                                .then((sucursalActualizada) => {
                                    if (req.body.detalles.length > 0) {
                                        let promises = []
                                        for (let index = 0; index < req.body.detalles.length; index++) {
                                            promises.push(crearDetallePedido(pedidoCreado.id, req.body.detalles[index], req.params.id_empresa, t, req))
                                        }
                                        promises.unshift(pedidoCreado)
                                        return Promise.all(promises)
                                    } else {
                                        return new Promise((fulfill, reject) => {
                                            reject('No existen detalles para crear el pedido, agrege algunos productos para crear un pedido de productos.');
                                        });
                                    }
                                })
                                .catch((err) => {
                                    return new Promise((fulfill, reject) => {
                                        reject((err.stack !== undefined) ? err.stack : err);
                                    });
                                })
                        })
                        .catch((err) => {
                            return new Promise((fulfill, reject) => {
                                reject((err.stack !== undefined) ? err.stack : err);
                            });
                        })


                }).catch((err) => {
                    return new Promise((fulfill, reject) => {
                        reject((err.stack !== undefined) ? err.stack : err);
                    });
                })
            })
            .catch((err) => {
                return new Promise((fulfill, reject) => {
                    reject((err.stack !== undefined) ? err.stack : err);
                });
            })
    }

    router.route('/orden-pedido/servicio/:id_pedido')
        .get(ensureAuthorizedlogged, function (req, res) {
            OrdenServicio.find({
                where: {
                    id: req.params.id_pedido
                },
                include: [
                    { model: Proveedor, as: 'proveedor' },
                    { model: Sucursal, as: 'sucursal' },
                    { model: Almacen, as: 'almacen' },
                    { model: Cliente, as: 'clientes' },
                    { model: Clase, as: 'concepto' },
                    { model: Clase, as: 'area_solicitante' },
                    { model: Clase, as: 'area_destino' },
                    { model: Clase, as: 'tipoPago' },
                    { model: Clase, as: 'detalle' },//del numero de orden de servico
                    { model: DetalleOrdenServicio, as: 'detallesOrdenServicios' }
                ]
            }).then(function (pedido) {
                if (!pedido) throw new Error('Error al recuperar uno o varios productos de este pedido.')
                res.json({ pedido: pedido });
            }).catch((err) => {
                res.json({ pedido: {}, hasErr: true, mensaje: err.stack })
            })
        });
    router.route('/guardarEdicion/orden/servicio/:id_usuario')
        .post(ensureAuthorizedlogged, async (req, res) => {
            var clientee = null
            if (!req.body.usar_empresa) {
                clientee = req.body.cliente.id;
            }
            const servicioActualizado = OrdenServicio.update({
                id_proveedor: req.body.proveedor.id,
                fecha: req.body.fecha,
                id_concepto: req.body.concepto.id,
                id_detalle: req.body.detalle.id,
                id_area_solicitante: req.body.area_solicitante.id,
                id_area_destino: req.body.area_destino.id,
                id_cliente: clientee,
                observacion: req.body.observacion,
                id_tipo_pago: req.body.tipoPago.id,
                dias_credito: req.body.dias_credito,
                a_cuenta: req.body.a_cuenta,
                saldo: req.body.saldo,
                importe: req.body.importe,

            }, {
                where: { id: req.body.id }
            })
            for (let index = 0; index < req.body.detallesOrdenServicios.length; index++) {
                let servicio = req.body.detallesOrdenServicios[index];
                if (servicio.id) {
                    //actualizar
                    if (servicio.eliminado) {
                        const detallesEliminado = await DetalleOrdenServicio.destroy(
                            {
                                where: { id: servicio.id }
                            }).then(function (entity) {
                                res.json({ mensaje: "eliminado satisfactoriamente" });
                            });
                    } else {
                        const detalleActualizados = await DetalleOrdenServicio.update({
                            cantidad: (servicio.cantidad && parseFloat(servicio.cantidad)) || parseFloat('0'),
                            costo_unitario: (servicio.cantidad && parseFloat(servicio.costo_unitario)) || parseFloat('0'),
                            total: (servicio.total && parseFloat(servicio.total)) || parseFloat('0')
                        }, {
                            where: { id: servicio.id }
                        })
                    }
                } else {
                    //// crear detalles
                    const detalleServicio = await DetalleOrdenServicio.create({
                        id_orden_servicio: req.body.id,
                        descripcion: servicio.descripcion,
                        unidad_medida: servicio.unidad_medida,
                        cantidad: (servicio.cantidad && parseFloat(servicio.cantidad)) || parseFloat('0'),
                        costo_unitario: (servicio.costo_unitario && parseFloat(servicio.costo_unitario)) || parseFloat('0'),
                        total: (servicio.total && parseFloat(servicio.total)) || parseFloat('0')
                    })
                }
            }
            res.json({ mensaje: "actualizado satisfactoriamente" });
        })

    router.route('/eliminar/orden/servicio/:id_usuario')
        .post(function (req, res) {
            Clase.find({
                where: {
                    eliminado: false,
                    nombre: 'Anulado'
                },
                include: [{ model: Tipo, as: 'tipo', where: { nombre_corto: 'ESTMODPED' } }]
            }).then(function (estado) {
                if (estado) {
                    OrdenServicio.update({ id_estado: estado.id }, {
                        where: {
                            id: req.body.id
                        }
                    }).then(function (eliminado) {
                        res.json({ mensaje: "Se Elimino el Registro", estado: estado })
                    });
                } else {
                    res.json({ mensaje: "NO se encontro el estado 'ANULADO'", hasErr: true })
                }

            })





        })
}
