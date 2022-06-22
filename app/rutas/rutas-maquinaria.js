module.exports = function (router, sequelize, Sequelize, Usuario, Producto, Diccionario, Clase, Sucursal, Empresa, ProductoBase, Almacen, ContabilidadCuenta, Persona, MantenimientoOrdenTrabajo, MantenimientoOrdenTrabajoManoObra,
    MantenimientoOrdenTrabajoMaterial, MantenimientoOrdenTrabajoServicioExterno, MantenimientoOrdenTrabajoSistema,
    Inventario, Clase, ensureAuthorizedlogged, VehiculoExterno, Cliente, InventarioRecepcion, MedicoPaciente, Proveedor, MantenimientoEspecialidadPrecios, Tipo, Movimiento, DetalleMovimiento, NumeroLiteral, PagoOT, CorrelativoOt, ContabilidadCuentaGrupo, ConfigMantenimiento, ContabilidadCuentaCampo) {
    router.route('/orden-de-trabajo/empresa/:id_empresa/correctivo/:correctivo/preventivo/:preventivo/rutina/:rutina/entrega/:entrega')
        .get(ensureAuthorizedlogged, function (req, res) {
            var condicionMantenimiento = {}
            var condicionProducto = { id_empresa: req.params.id_empresa }
            if (req.params.correctivo != "false") {
                if (req.params.preventivo != "false") {
                    if (req.params.rutina != "false") {
                        if (req.params.entrega != "false") {
                            condicionMantenimiento = {
                                $or: [{ nombre_corto: Diccionario.PREVENTIVO },
                                { nombre_corto: Diccionario.CORRECTIVO },
                                { nombre_corto: Diccionario.RUTINA },
                                { nombre_corto: Diccionario.ENTREGA }]
                            }
                        } else {
                            condicionMantenimiento = {
                                $or: [{ nombre_corto: Diccionario.PREVENTIVO },
                                { nombre_corto: Diccionario.CORRECTIVO },
                                { nombre_corto: Diccionario.RUTINA }]
                            }
                        }
                    } else {
                        if (req.params.entrega != "false") {
                            condicionMantenimiento = {
                                $or: [{ nombre_corto: Diccionario.PREVENTIVO },
                                { nombre_corto: Diccionario.CORRECTIVO },
                                { nombre_corto: Diccionario.ENTREGA }]
                            }
                        } else {
                            condicionMantenimiento = {
                                $or: [{ nombre_corto: Diccionario.PREVENTIVO },
                                { nombre_corto: Diccionario.CORRECTIVO }]
                            }
                        }
                    }
                }
                else {
                    if (req.params.rutina != "false") {
                        if (req.params.entrega != "false") {
                            condicionMantenimiento = {
                                $or: [{ nombre_corto: Diccionario.CORRECTIVO },
                                { nombre_corto: Diccionario.RUTINA },
                                { nombre_corto: Diccionario.ENTREGA }]
                            }
                        } else {
                            condicionMantenimiento = {
                                $or: [{ nombre_corto: Diccionario.CORRECTIVO },
                                { nombre_corto: Diccionario.RUTINA }]
                            }
                        }
                    } else {
                        if (req.params.entrega != "false") {
                            condicionMantenimiento = {
                                $or: [{ nombre_corto: Diccionario.CORRECTIVO },
                                { nombre_corto: Diccionario.ENTREGA }]
                            }
                        } else {
                            condicionMantenimiento = { $or: [{ nombre_corto: Diccionario.CORRECTIVO }] }
                        }
                    }
                }
            } else {
                if (req.params.preventivo != "false") {
                    if (req.params.rutina != "false") {
                        if (req.params.entrega != "false") {
                            condicionMantenimiento = {
                                $or: [{ nombre_corto: Diccionario.PREVENTIVO },
                                { nombre_corto: Diccionario.RUTINA },
                                { nombre_corto: Diccionario.ENTREGA }]
                            }
                        } else {
                            condicionMantenimiento = {
                                $or: [{ nombre_corto: Diccionario.PREVENTIVO },
                                { nombre_corto: Diccionario.RUTINA }]
                            }
                        }
                    } else {
                        if (req.params.entrega != "false") {
                            condicionMantenimiento = {
                                $or: [{ nombre_corto: Diccionario.PREVENTIVO },
                                { nombre_corto: Diccionario.ENTREGA }]
                            }
                        } else {
                            condicionMantenimiento = { $or: [{ nombre_corto: Diccionario.PREVENTIVO }] }
                        }
                    }
                }
                else {
                    if (req.params.rutina != "false") {
                        if (req.params.entrega != "false") {
                            condicionMantenimiento = {
                                $or: [{ nombre_corto: Diccionario.RUTINA },
                                { nombre_corto: Diccionario.ENTREGA }]
                            }
                        } else {
                            condicionMantenimiento = { $or: [{ nombre_corto: Diccionario.RUTINA }] }
                        }
                    } else {
                        if (req.params.entrega != "false") {
                            condicionMantenimiento = { $or: [{ nombre_corto: Diccionario.ENTREGA }] }
                        } else {
                            condicionMantenimiento = {

                                id: null

                            }
                        }
                    }
                }
            }
            MantenimientoOrdenTrabajo.findAll({
                include: [{ model: Producto, as: 'producto', where: condicionProducto },
                { model: Clase, as: 'tipoMantenimiento', where: condicionMantenimiento }]
            }).then(function (Encontrado) {
                res.json(Encontrado)
            })
        })

    router.route('/orden-de-trabajo/empresa/:id_empresa')
        .put(ensureAuthorizedlogged, function (req, res) {
            MantenimientoOrdenTrabajo.update({
                //id_producto: req.body.vehiculo.id,
                observacion: req.body.observacion,
                diagnostico: req.body.diagnostico,
                id_prioridad: req.body.id_prioridad,
                // tiempo_estimado: req.body.tiempo_estimado,
                fecha_hora_aviso: req.body.fecha_hora_aviso,
                fecha_hora_inicio: req.body.fecha_hora_inicio,
                fecha_hora_fin: req.body.fecha_hora_fin,
                importe_facturado: req.body.importe_facturado,
                id_campo: req.body.campo ? req.body.campo.id : null
                //id_tipo_mantenimiento: req.body.tipo_mantenimiento,
            }, {
                where: { id: req.body.id }
            }).then(function (OrdenTrabajoActualizada) {
                var parabrisas_delantero = req.body.mantenimiento_ot[0].parabrisas_delantero ? req.body.mantenimiento_ot[0].parabrisas_delantero : false;
                var parabrisas_trasero = req.body.mantenimiento_ot[0].parabrisas_trasero ? req.body.mantenimiento_ot[0].parabrisas_trasero : false;
                var vidrio_techo_solar = req.body.mantenimiento_ot[0].vidrio_techo_solar ? req.body.mantenimiento_ot[0].vidrio_techo_solar : false;
                var radio = req.body.mantenimiento_ot[0].radio ? req.body.mantenimiento_ot[0].radio : false;
                var retrovisor = req.body.mantenimiento_ot[0].retrovisor ? req.body.mantenimiento_ot[0].retrovisor : false;
                var llanta_auxilio = req.body.mantenimiento_ot[0].llanta_auxilio ? req.body.mantenimiento_ot[0].llanta_auxilio : false;
                var tapa_valvulas = req.body.mantenimiento_ot[0].tapa_valvulas ? req.body.mantenimiento_ot[0].tapa_valvulas : false;
                var gata = req.body.mantenimiento_ot[0].gata ? req.body.mantenimiento_ot[0].gata : false;
                var faroles_delanteros = req.body.mantenimiento_ot[0].faros_delanteros ? req.body.mantenimiento_ot[0].faros_delanteros : false;
                var guiniadores = req.body.mantenimiento_ot[0].guiniadores ? req.body.mantenimiento_ot[0].guiniadores : false;
                var limpia_parabrisas_delantero = req.body.mantenimiento_ot[0].limpia_parabrisas_delantero ? req.body.mantenimiento_ot[0].limpia_parabrisas_delantero : false;
                var limpia_parabrisas_trasero = req.body.mantenimiento_ot[0].limpia_parabrisas_trasero ? req.body.mantenimiento_ot[0].limpia_parabrisas_trasero : false;
                var ventanas_delanteras = req.body.mantenimiento_ot[0].ventanas_delanteras ? req.body.mantenimiento_ot[0].ventanas_delanteras : false;
                var ventanas_traseras = req.body.mantenimiento_ot[0].ventanas_traseras ? req.body.mantenimiento_ot[0].ventanas_traseras : false;
                var encendedor = req.body.mantenimiento_ot[0].encendedor ? req.body.mantenimiento_ot[0].encendedor : false;
                var antena = req.body.mantenimiento_ot[0].antena ? req.body.mantenimiento_ot[0].antena : false;
                var emblema = req.body.mantenimiento_ot[0].emblema ? req.body.mantenimiento_ot[0].emblema : false;
                var tapa_cubos = req.body.mantenimiento_ot[0].tapa_cubos ? req.body.mantenimiento_ot[0].tapa_cubos : false;
                var herramientas = req.body.mantenimiento_ot[0].herramientas ? req.body.mantenimiento_ot[0].herramientas : false;
                var tapa_tanque_combustible = req.body.mantenimiento_ot[0].tapa_tanque_combustible ? req.body.mantenimiento_ot[0].tapa_tanque_combustible : false;
                var stops = req.body.mantenimiento_ot[0].stops ? req.body.mantenimiento_ot[0].stops : false;
                var sobrepisos = req.body.mantenimiento_ot[0].sobrepisos ? req.body.mantenimiento_ot[0].sobrepisos : false;
                var otros = req.body.mantenimiento_ot[0].otros ? req.body.mantenimiento_ot[0].otros : "";
                InventarioRecepcion.update({
                    parabrisas_delantero: parabrisas_delantero,
                    parabrisas_trasero: parabrisas_trasero,
                    vidrio_techo_solar: vidrio_techo_solar,
                    radio: radio,
                    retrovisor: retrovisor,
                    llanta_auxilio: llanta_auxilio,
                    tapa_valvulas: tapa_valvulas,
                    gata: gata,
                    faroles_delanteros: faroles_delanteros,
                    guiniadores: guiniadores,
                    limpia_parabrisas_delantero: limpia_parabrisas_delantero,
                    limpia_parabrisas_trasero: limpia_parabrisas_trasero,
                    ventanas_delanteras: ventanas_delanteras,
                    ventanas_traseras: ventanas_traseras,
                    encendedor: encendedor,
                    antena: antena,
                    emblema: emblema,
                    tapa_cubos: tapa_cubos,
                    herramientas: herramientas,
                    tapa_tanque_combustible: tapa_tanque_combustible,
                    stops: stops,
                    sobrepisos: sobrepisos,
                    otros: otros
                }, {
                    where: { id_mantenimiento_ot: req.body.id }
                }
                ).then(function (inventarioReposicion) {
                    if (req.body.manosDeObra.length > 0) {
                        req.body.manosDeObra.forEach(function (manoDeObra, index, array) {
                            if (manoDeObra.id) {
                                MantenimientoOrdenTrabajoManoObra.update({
                                    // id_orden_trabajo: OrdenTrabajoActualizada.id,
                                    id_especialidad: manoDeObra.especialidad.id,
                                    fecha_inicio: manoDeObra.fecha_inicio,
                                    fecha_fin: manoDeObra.fecha_fin,
                                    diagnostico: manoDeObra.diagnostico,
                                    id_persona: manoDeObra.encargado.id,
                                    importe_interno: manoDeObra.importe_interno,
                                    total_cliente: manoDeObra.total_cliente
                                }, {
                                    where: {
                                        id: manoDeObra.id
                                    }
                                }).then(function (ManoDeObraActualizada) {
                                    if (index == (array.length - 1)) {
                                        if (req.body.materiales.length > 0) {
                                            req.body.materiales.forEach(function (material, index2, array2) {
                                                if (material.id) {
                                                    MantenimientoOrdenTrabajoMaterial.update({
                                                        //id_orden_trabajo: OrdenTrabajoActualizada.id,
                                                        id_producto: material.producto.id,
                                                        cantidad: material.cantidad,
                                                        importe: material.total,
                                                        importe_interno: manoDeObra.importe_interno,
                                                        total_cliente: manoDeObra.total_cliente

                                                    }, {
                                                        where: {
                                                            id: material.id
                                                        }
                                                    }).then(function (MaterialCreado) {
                                                        if (index2 == (array2.length - 1)) {
                                                            if (req.body.serviciosExternos.length > 0) {
                                                                req.body.serviciosExternos.forEach(function (servicioExterno, index3, array3) {
                                                                    if (servicioExterno.id) {
                                                                        MantenimientoOrdenTrabajoServicioExterno.update({
                                                                            //id_orden_trabajo: OrdenTrabajoActualizada.id,
                                                                            empresa: servicioExterno.empresa,
                                                                            servicio: servicioExterno.servicio,
                                                                            fecha_inicio: servicioExterno.fecha_inicio,
                                                                            fecha_fin: servicioExterno.fecha_fin,
                                                                            importe_interno: manoDeObra.importe_interno,
                                                                            total_cliente: manoDeObra.total_cliente
                                                                        }, {
                                                                            where: {
                                                                                id: servicioExterno.id
                                                                            }
                                                                        }).then(function (ServicioExternoCreado) {
                                                                            if (index3 == (array3.length - 1)) {
                                                                                res.json({ message: "Orden de trabajo actualizada satisfactoriamente!" })
                                                                            }
                                                                        })
                                                                    } else {
                                                                        MantenimientoOrdenTrabajoServicioExterno.create({
                                                                            id_orden_trabajo: req.body.id,
                                                                            empresa: servicioExterno.empresa,
                                                                            servicio: servicioExterno.servicio,
                                                                            fecha_inicio: servicioExterno.fecha_inicio,
                                                                            fecha_fin: servicioExterno.fecha_fin,
                                                                        }, {
                                                                            where: {
                                                                                id: servicioExterno.id
                                                                            }
                                                                        }).then(function (ServicioExternoCreado) {
                                                                            if (index3 == (array3.length - 1)) {
                                                                                res.json({ message: "Orden de trabajo actualizada satisfactoriamente!" })
                                                                            }
                                                                        })
                                                                    }
                                                                }, this);
                                                            } else {
                                                                res.json({ message: "Orden de trabajo actualizada satisfactoriamente!" });
                                                            }
                                                        }
                                                    })
                                                } else {
                                                    MantenimientoOrdenTrabajoMaterial.create({
                                                        id_orden_trabajo: req.body.id,
                                                        id_producto: material.producto.id,
                                                        cantidad: material.cantidad,
                                                        importe: material.total,
                                                    }).then(function (MaterialCreado) {
                                                        if (index2 == (array2.length - 1)) {
                                                            if (req.body.serviciosExternos.length > 0) {
                                                                req.body.serviciosExternos.forEach(function (servicioExterno, index3, array3) {
                                                                    if (servicioExterno.id) {
                                                                        MantenimientoOrdenTrabajoServicioExterno.update({
                                                                            //id_orden_trabajo: OrdenTrabajoActualizada.id,
                                                                            empresa: servicioExterno.empresa,
                                                                            servicio: servicioExterno.servicio,
                                                                            fecha_inicio: servicioExterno.fecha_inicio,
                                                                            fecha_fin: servicioExterno.fecha_fin,
                                                                        }, {
                                                                            where: {
                                                                                id: servicioExterno.id
                                                                            }
                                                                        }).then(function (ServicioExternoCreado) {
                                                                            if (index3 == (array3.length - 1)) {
                                                                                res.json({ message: "Orden de trabajo actualizada satisfactoriamente!" })
                                                                            }
                                                                        })
                                                                    } else {
                                                                        MantenimientoOrdenTrabajoServicioExterno.create({
                                                                            id_orden_trabajo: req.body.id,
                                                                            empresa: servicioExterno.empresa,
                                                                            servicio: servicioExterno.servicio,
                                                                            fecha_inicio: servicioExterno.fecha_inicio,
                                                                            fecha_fin: servicioExterno.fecha_fin,
                                                                        }).then(function (ServicioExternoCreado) {
                                                                            if (index3 == (array3.length - 1)) {
                                                                                res.json({ message: "Orden de trabajo actualizada satisfactoriamente!" })
                                                                            }
                                                                        })
                                                                    }
                                                                }, this);
                                                            } else {
                                                                res.json({ message: "Orden de trabajo actualizada satisfactoriamente!" });
                                                            }
                                                        }
                                                    })
                                                }
                                            }, this);
                                        } else {
                                            res.json({ message: "Orden de trabajo actualizada satisfactoriamente!" });
                                        }
                                    }
                                })
                            } else {
                                MantenimientoOrdenTrabajoManoObra.create({
                                    id_orden_trabajo: req.body.id,
                                    id_especialidad: manoDeObra.especialidad.id,
                                    fecha_inicio: manoDeObra.fecha_inicio,
                                    fecha_fin: manoDeObra.fecha_fin,
                                    diagnostico: manoDeObra.diagnostico,
                                    id_persona: manoDeObra.encargado.id
                                }).then(function (ManoDeObraActualizada) {
                                    if (index == (array.length - 1)) {
                                        if (req.body.materiales > 0) {
                                            req.body.materiales.forEach(function (material, index2, array2) {
                                                if (material.id) {
                                                    MantenimientoOrdenTrabajoMaterial.update({
                                                        //id_orden_trabajo: OrdenTrabajoActualizada.id,
                                                        id_producto: material.producto.id,
                                                        cantidad: material.cantidad,
                                                        importe: material.total,
                                                    }, {
                                                        where: {
                                                            id: material.id
                                                        }
                                                    }).then(function (MaterialCreado) {
                                                        if (index2 == (array2.length - 1)) {
                                                            req.body.serviciosExternos.forEach(function (servicioExterno, index3, array3) {
                                                                if (servicioExterno.id) {
                                                                    MantenimientoOrdenTrabajoServicioExterno.update({
                                                                        //id_orden_trabajo: OrdenTrabajoActualizada.id,
                                                                        empresa: servicioExterno.empresa,
                                                                        servicio: servicioExterno.servicio,
                                                                        fecha_inicio: servicioExterno.fecha_inicio,
                                                                        fecha_fin: servicioExterno.fecha_fin,
                                                                    }, {
                                                                        where: {
                                                                            id: servicioExterno.id
                                                                        }
                                                                    }).then(function (ServicioExternoCreado) {
                                                                        if (index3 == (array3.length - 1)) {
                                                                            res.json({ message: "Orden de trabajo actualizada satisfactoriamente!" })
                                                                        }
                                                                    })
                                                                } else {
                                                                    MantenimientoOrdenTrabajoServicioExterno.create({
                                                                        id_orden_trabajo: req.body.id,
                                                                        empresa: servicioExterno.empresa,
                                                                        servicio: servicioExterno.servicio,
                                                                        fecha_inicio: servicioExterno.fecha_inicio,
                                                                        fecha_fin: servicioExterno.fecha_fin,
                                                                    }, {
                                                                        where: {
                                                                            id: servicioExterno.id
                                                                        }
                                                                    }).then(function (ServicioExternoCreado) {
                                                                        if (index3 == (array3.length - 1)) {
                                                                            res.json({ message: "Orden de trabajo actualizada satisfactoriamente!" })
                                                                        }
                                                                    })
                                                                }
                                                            }, this);
                                                        }
                                                    })
                                                } else {
                                                    MantenimientoOrdenTrabajoMaterial.create({
                                                        id_orden_trabajo: req.body.id,
                                                        id_producto: material.producto.id,
                                                        cantidad: material.cantidad,
                                                        importe: material.total,
                                                    }).then(function (MaterialCreado) {
                                                        if (index2 == (array2.length - 1)) {
                                                            req.body.serviciosExternos.forEach(function (servicioExterno, index3, array3) {
                                                                if (servicioExterno.id) {
                                                                    MantenimientoOrdenTrabajoServicioExterno.update({
                                                                        //id_orden_trabajo: OrdenTrabajoActualizada.id,
                                                                        empresa: servicioExterno.empresa,
                                                                        servicio: servicioExterno.servicio,
                                                                        fecha_inicio: servicioExterno.fecha_inicio,
                                                                        fecha_fin: servicioExterno.fecha_fin,
                                                                    }, {
                                                                        where: {
                                                                            id: servicioExterno.id
                                                                        }
                                                                    }).then(function (ServicioExternoCreado) {
                                                                        if (index3 == (array3.length - 1)) {
                                                                            res.json({ message: "Orden de trabajo actualizada satisfactoriamente!" })
                                                                        }
                                                                    })
                                                                } else {
                                                                    MantenimientoOrdenTrabajoServicioExterno.create({
                                                                        id_orden_trabajo: req.body.id,
                                                                        empresa: servicioExterno.empresa,
                                                                        servicio: servicioExterno.servicio,
                                                                        fecha_inicio: servicioExterno.fecha_inicio,
                                                                        fecha_fin: servicioExterno.fecha_fin,
                                                                    }).then(function (ServicioExternoCreado) {
                                                                        if (index3 == (array3.length - 1)) {
                                                                            res.json({ message: "Orden de trabajo actualizada satisfactoriamente!" })
                                                                        }
                                                                    })
                                                                }
                                                            }, this);
                                                        }
                                                    })
                                                }
                                            }, this);
                                        } else {
                                            res.json({ message: "Orden de trabajo actualizada satisfactoriamente!" });
                                        }
                                    }
                                })
                            }
                        }, this);
                    } else {
                        res.json({ message: "Orden de trabajo actualizada satisfactoriamente!" });
                    }
                })
            })
        })

        .post(ensureAuthorizedlogged, function (req, res) {
            sequelize.transaction(function (t) {

                var idSucursal = "";
                var idProducto = "";
                if (req.body.mantenimiento_externo == true) {
                    idProducto = null;
                    idSucursal = req.body.sucursal.id;
                } else {
                    idProducto = req.body.vehiculo.id_producto;
                    idSucursal = req.body.sucursal.id;
                }
                if (req.body.mantenimiento_externo) {
                    if (!req.body.cliente_ot.id) {
                        return Cliente.create({
                            razon_social: req.body.cliente_ot.razon_social,
                            nit: req.body.cliente_ot.nit,
                            telefono1: req.body.cliente_ot.propietario_telefono ? req.body.cliente_ot.propietario_telefono.toString() : null,
                            telefono2: req.body.cliente_ot.propietario_celular ? req.body.cliente_ot.propietario_celular.toString() : null,
                            id_empresa: parseInt(req.params.id_empresa)
                        }, {
                            transaction: t
                        }).then(function (clienteCreado) {
                            return crearVehiculoOt(req, clienteCreado, idSucursal,
                                idProducto, t)
                        }).catch(function (err) {
                            return new Promise(function (fulfill, reject) {
                                reject((err.stack !== undefined) ? err.stack : err);
                            });
                        })
                    } else {
                        // return crearVehiculoOt(req, req.body.cliente_ot, idSucursal,
                        //     idProducto, t)

                        return Cliente.update({
                            telefono1: req.body.cliente_ot.propietario_telefono ? req.body.cliente_ot.propietario_telefono.toString() : req.body.cliente_ot.telefono1 ? req.body.cliente_ot.telefono1 : null,
                            telefono2: req.body.cliente_ot.propietario_celular ? req.body.cliente_ot.propietario_celular.toString() : req.body.cliente_ot.telefono2 ? req.body.cliente_ot.telefono2 : null
                        }, {
                            where: { id: req.body.cliente_ot.id }, transaction: t
                        }).then(function (clienteCreado) {
                            return crearVehiculoOt(req, req.body.cliente_ot, idSucursal,
                                idProducto, t)
                        }).catch(function (err) {
                            return new Promise(function (fulfill, reject) {
                                reject((err.stack !== undefined) ? err.stack : err);
                            });
                        })
                    }
                } else {
                    var cliente = { id: null }
                    return crearVehiculoOt(req, cliente, idSucursal,
                        idProducto, t)
                }
            }).then(function (result) {
                if (req.body.id) {
                    res.json({ mensaje: 'Mantenimiento actualizado satisfactoriamente!' })
                } else {
                    res.json({ mensaje: 'Mantenimiento creada satisfactoriamente!' })
                }
            }).catch(function (err) {
                res.json({ mensaje: (err.stack !== undefined) ? err.stack : err, hasErr: true })
            });
        })
    function crearVehiculoOt(req, cliente, idSucursal, idProducto, t) {
        if (req.body.mantenimiento_externo == true) {
            if (!req.body.vehiculo.id) {
                return VehiculoExterno.create({
                    marca: req.body.vehiculo.marca,
                    chasis: req.body.vehiculo.chasis,
                    modelo: req.body.vehiculo.modelo,
                    placa: req.body.vehiculo.placa,
                    color: req.body.vehiculo.color,
                    km: req.body.vehiculo.km,
                    anio: req.body.vehiculo.anio,
                    id_empresa: req.params.id_empresa
                }).then(function (vehiculoCreado) {
                    return crearOrdenMatenimiento(req, cliente, idSucursal, idProducto, vehiculoCreado.id, t)
                }).catch(function (err) {
                    return new Promise(function (fulfill, reject) {
                        reject((err.stack !== undefined) ? err.stack : err);
                    });
                })
            } else {
                return VehiculoExterno.update({
                    marca: req.body.vehiculo.marca,
                    chasis: req.body.vehiculo.chasis,
                    modelo: req.body.vehiculo.modelo,
                    placa: req.body.vehiculo.placa,
                    color: req.body.vehiculo.color,
                    km: req.body.vehiculo.km,
                    anio: req.body.vehiculo.anio,
                    id_empresa: req.params.id_empresa
                },
                    {
                        where: { id: req.body.vehiculo.id }, transaction: t
                    }).then(function (vehiculoActualizado) {
                        return crearOrdenMatenimiento(req, cliente, idSucursal, idProducto, req.body.vehiculo.id, t)
                    }).catch(function (err) {
                        return new Promise(function (fulfill, reject) {
                            reject((err.stack !== undefined) ? err.stack : err);
                        });
                    })

            }
        } else {
            return crearOrdenMatenimiento(req, cliente, idSucursal, idProducto, req.body.vehiculo.id, t)
        }

    }

    function stringToDateTime(fecha) {
        var dt = fecha.split(/\/|\s/);
        dat = new Date(dt.slice(0, 3).reverse().join('/') + ' ' + dt[3]);
        return dat;
    }

    function crearOrdenMatenimiento(req, cliente, idSucursal, idProducto, idVehiculo, t) {
        if (req.body.id) {
            /* if (req.body.fecha_hora_inicio) {
                req.body.fecha_hora_inicio = req.body.edit ? req.body.fecha_hora_inicio : stringToDateTime(req.body.fecha_hora_inicio);
            }
            if (req.body.fecha_hora_fin) {
                req.body.fecha_hora_fin = req.body.edit ? req.body.fecha_hora_fin : stringToDateTime(req.body.fecha_hora_fin);
            } */
            /* let fecha_aviso = req.body.fecha_hora_aviso ? req.body.fecha_hora_aviso.split(" ") : ''
            fecha_aviso = fecha_aviso[0] ? fecha_aviso[0].split('/').reverse().join('-')+" "+fecha_aviso[1]: '' */
            return PagoOT.findAll({
                // attributes: ['monto_pagado',[sequelize.fn('sum', sequelize.col('monto_pagado')), 'monto_total']],
                where: { id_ot: req.body.id }
                // group: ["id_ot"]
            }).then(function (pagosOTS) {
                // console.log(totalMonto)
                var saldoActual = req.body.saldo ? req.body.saldo : 0;
                var totalACuenta = req.body.a_cuenta ? req.body.a_cuenta : 0;
                // if (totalMonto.length > 0 &&  req.body.estado.nombre_corto == 'FINALIZADO') {
                //     saldoActual = saldoActual - totalMonto[0].dataValues.monto_total;
                //     totalACuenta = totalMonto[0].dataValues.monto_total;
                // }
                var totalMonto = pagosOTS.reduce((a, b) => a + b.monto_pagado, 0);
                if (totalMonto > 0 && req.body.estado.nombre_corto == 'FINALIZADO') {
                    saldoActual = saldoActual - totalMonto;
                    totalACuenta = totalMonto;
                }

                return MantenimientoOrdenTrabajo.update({
                    id_producto: idProducto,
                    observacion: req.body.observacion,
                    diagnostico: req.body.diagnostico,
                    id_prioridad: req.body.id_prioridad,
                    tiempo_estimado: req.body.tiempo_estimado,
                    fecha_hora_aviso: req.body.fecha_hora_aviso ? req.body.fecha_hora_aviso : null,

                    fecha_hora_inicio: req.body.fecha_hora_inicio ? req.body.fecha_hora_inicio : null,
                    fecha_hora_fin: req.body.fecha_hora_fin ? req.body.fecha_hora_fin : null,
                    /* id_tipo_mantenimiento: req.body.tipo_mantenimiento, */
                    id_usuario: req.body.id_usuario,
                    /* correlativo_ot: datosSucursal.numero_correlativo_ot, */
                    /* id_sucursal: datosSucursal.id, */
                    id_vehiculo: idVehiculo,
                    id_cliente: cliente.id,
                    importe_facturado: req.body.importe_facturado,
                    id_estado: req.body.id_estado,
                    km: req.body.vehiculo.km,
                    descuento: req.body.descuento ? req.body.descuento : 0,
                    observacion_descuento: req.body.observacion_descuento,
                    tipo_pago: req.body.tipo_pago ? req.body.tipo_pago.id : null,
                    dias_credito: req.body.dias_credito ? req.body.dias_credito : 0,
                    a_cuenta: totalACuenta,
                    saldo: saldoActual,
                    asignarATodos: req.body.asignarATodos,
                    porcentaje: req.body.porcentaje,
                    montoPorcentajeDeseado: req.body.montoPorcentajeDeseado,
                    numero_manual: req.body.numero_manual,
                    id_campo: req.body.campo ? req.body.campo.id : null
                    /*  mantenimiento_externo: req.body.mantenimiento_externo */
                }, {
                    where: { id: req.body.id },
                    transaction: t
                }).then(function (OrdenTrabajoCreada) {
                    return VehiculoExterno.update({
                        color: req.body.vehiculo.color,
                        km: req.body.vehiculo.km
                    },
                        { where: { id: idVehiculo }, transaction: t })
                        .then(vehiculoGuardado => {
                            return InventarioRecepcion.update({
                                parabrisas_delantero: req.body.InventariosRecepcion.parabrisas_delantero ? req.body.InventariosRecepcion.parabrisas_delantero : false,
                                parabrisas_trasero: req.body.InventariosRecepcion.parabrisas_trasero ? req.body.InventariosRecepcion.parabrisas_trasero : false,
                                vidrio_techo_solar: req.body.InventariosRecepcion.vidrio_techo_solar ? req.body.InventariosRecepcion.vidrio_techo_solar : false,
                                radio: req.body.InventariosRecepcion.radio ? req.body.InventariosRecepcion.radio : false,
                                retrovisor: req.body.InventariosRecepcion.retrovisor ? req.body.InventariosRecepcion.retrovisor : false,
                                llanta_auxilio: req.body.InventariosRecepcion.llanta_auxilio ? req.body.InventariosRecepcion.llanta_auxilio : false,
                                tapa_valvulas: req.body.InventariosRecepcion.tapa_valvulas ? req.body.InventariosRecepcion.tapa_valvulas : false,
                                gata: req.body.InventariosRecepcion.gata ? req.body.InventariosRecepcion.gata : false,
                                faroles_delanteros: req.body.InventariosRecepcion.faroles_delanteros ? req.body.InventariosRecepcion.faroles_delanteros : false,
                                guiniadores: req.body.InventariosRecepcion.guiniadores ? req.body.InventariosRecepcion.guiniadores : false,
                                limpia_parabrisas_delantero: req.body.InventariosRecepcion.limpia_parabrisas_delantero ? req.body.InventariosRecepcion.limpia_parabrisas_delantero : false,
                                limpia_parabrisas_trasero: req.body.InventariosRecepcion.limpia_parabrisas_trasero ? req.body.InventariosRecepcion.limpia_parabrisas_trasero : false,
                                ventanas_delanteras: req.body.InventariosRecepcion.ventanas_delanteras ? req.body.InventariosRecepcion.ventanas_delanteras : false,
                                ventanas_traseras: req.body.InventariosRecepcion.ventanas_traseras ? req.body.InventariosRecepcion.ventanas_traseras : false,
                                encendedor: req.body.InventariosRecepcion.encendedor ? req.body.InventariosRecepcion.encendedor : false,
                                antena: req.body.InventariosRecepcion.antena ? req.body.InventariosRecepcion.antena : false,
                                emblema: req.body.InventariosRecepcion.emblema ? req.body.InventariosRecepcion.emblema : false,
                                tapa_cubos: req.body.InventariosRecepcion.tapa_cubos ? req.body.InventariosRecepcion.tapa_cubos : false,
                                herramientas: req.body.InventariosRecepcion.herramientas ? req.body.InventariosRecepcion.herramientas : false,
                                tapa_tanque_combustible: req.body.InventariosRecepcion.tapa_tanque_combustible ? req.body.InventariosRecepcion.tapa_tanque_combustible : false,
                                stops: req.body.InventariosRecepcion.stops ? req.body.InventariosRecepcion.stops : false,
                                sobrepisos: req.body.InventariosRecepcion.sobrepisos ? req.body.InventariosRecepcion.sobrepisos : false,
                                otros: req.body.InventariosRecepcion.otros ? req.body.InventariosRecepcion.otros : "",
                                id_tamanio_tanque: req.body.InventariosRecepcion.tamanioTanque ? req.body.InventariosRecepcion.tamanioTanque.id : null
                            }, {
                                where: { id: req.body.InventariosRecepcion.id },
                                transaction: t
                            }).then(function (inventarioReposicion) {
                                var promise = []
                                return MantenimientoOrdenTrabajoSistema.destroy({
                                    where: { id_orden_trabajo: req.body.id }, transaction: t
                                }).then(async function (sistemaEliminados) {
                                    if (req.body.sistemas.length != 0) {

                                        await req.body.sistemas.forEach(function (sistema, index4, array4) {
                                            promise.push(crearSistemas(req, t, req.body, sistema))
                                        })

                                    }
                                    if (req.body.manosDeObra.length != 0) {
                                        var manosObrasC = req.body.manosDeObra;
                                        /* if (req.body.manosDeObraTemp) {
                                             manosObrasC = req.body.manosDeObraTemp;
                                        } */
                                        await manosObrasC.forEach(function (manoDeObra, index, array) {
                                            if (manoDeObra.fecha_inicio) {
                                                // manoDeObra.fecha_inicio = manoDeObra.id?manoDeObra.fecha_inicio:stringToDateTime(manoDeObra.fecha_inicio);
                                                manoDeObra.fecha_inicio = manoDeObra.edit ? stringToDateTime(manoDeObra.fecha_inicio) : manoDeObra.fecha_inicio;
                                            }
                                            if (manoDeObra.fecha_fin) {
                                                // manoDeObra.fecha_fin = manoDeObra.id?manoDeObra.fecha_fin:stringToDateTime(manoDeObra.fecha_fin);
                                                manoDeObra.fecha_fin = manoDeObra.edit ? stringToDateTime(manoDeObra.fecha_fin) : manoDeObra.fecha_fin;
                                            }

                                            promise.push(crearManodeobra(req, t, req.body, manoDeObra))
                                        })
                                    }
                                    if (req.body.materiales.length != 0) {
                                        var materialSinID = req.body.materiales.filter(mt => mt.id === undefined);
                                        var materialConID = req.body.materiales.filter(mt => mt.id != undefined);
                                        var helper = {};
                                        var materialesAgrupados = materialSinID.reduce(function (r, o) {
                                            var key = o.producto.id;
                                            if (!helper[key]) {
                                                helper[key] = Object.assign({}, o); // create a copy of o
                                                r.push(helper[key]);
                                            } else {
                                                helper[key].cantidad += o.cantidad;
                                                helper[key].importe = helper[key].cantidad * o.costo_unitario;
                                            }
                                            return r;
                                        }, []);
                                        materialConID = materialConID.concat(materialesAgrupados);
                                        await materialConID.forEach(function (material, index2, array2) {
                                            promise.push(crearMateriales(req, t, req.body, material))
                                        }, this);

                                    }
                                    if (req.body.serviciosExternos.length != 0) {
                                        await req.body.serviciosExternos.forEach(function (servicioExterno, index3, array3) {
                                            if (servicioExterno.fecha_inicio) {
                                                servicioExterno.fecha_inicio = servicioExterno.edit ? stringToDateTime(servicioExterno.fecha_inicio) : servicioExterno.fecha_inicio;
                                            }
                                            if (servicioExterno.fecha_fin) {
                                                servicioExterno.fecha_fin = servicioExterno.edit ? stringToDateTime(servicioExterno.fecha_fin) : servicioExterno.fecha_fin;
                                            }
                                            promise.push(crearServiciosExternos(req, t, req.body, servicioExterno))
                                        }, this);

                                    }
                                    if (req.body.estado.nombre_corto == 'FINALIZADO') {
                                        var saldoGeneral = req.body.importe_facturado;
                                        await pagosOTS.forEach(function (pago, index4, array4) {
                                            promise.push(actualizarSaldoPagosOT(index4, t, pago, saldoGeneral))
                                            saldoGeneral = saldoGeneral - pago.monto_pagado

                                        })
                                    }
                                    return Promise.all(promise)
                                })

                            }).catch(function (err) {
                                return new Promise(function (fulfill, reject) {
                                    reject((err.stack !== undefined) ? err.stack : err);
                                });
                            })

                        })
                        .catch(err => {
                            return new Promise(function (fulfill, reject) {
                                reject((err.stack !== undefined) ? err.stack : err);
                            });
                        })
                }).catch(function (err) {
                    return new Promise(function (fulfill, reject) {
                        reject((err.stack !== undefined) ? err.stack : err);
                    });
                })
            })


        } else {
            return CorrelativoOt.find({
                where: { id_sucursal: idSucursal, id_especialidad: req.body.tipo_mantenimiento }, transaction: t
            }).then(sucursalCorrelativo => {
                return MantenimientoOrdenTrabajo.create({
                    id_producto: idProducto,
                    observacion: req.body.observacion,
                    diagnostico: req.body.diagnostico,
                    id_prioridad: req.body.id_prioridad,
                    tiempo_estimado: req.body.tiempo_estimado,
                    fecha_hora_aviso: req.body.fecha_hora_aviso,
                    fecha_hora_inicio: req.body.fecha_hora_inicio,
                    fecha_hora_fin: req.body.fecha_hora_fin,
                    id_tipo_mantenimiento: req.body.tipo_mantenimiento,
                    id_usuario: req.body.id_usuario,
                    correlativo_ot: sucursalCorrelativo.numeracion,
                    id_sucursal: idSucursal,
                    id_vehiculo: idVehiculo,
                    id_cliente: cliente.id,
                    mantenimiento_externo: req.body.mantenimiento_externo,
                    id_estado: req.body.estado.id,
                    km: req.body.vehiculo.km,
                    descuento: req.body.descuento ? req.body.descuento : 0,
                    observacion_descuento: req.body.observacion_descuento,
                    asignarATodos: req.body.asignarATodos,
                    porcentaje: req.body.porcentaje,
                    montoPorcentajeDeseado: req.body.montoPorcentajeDeseado,
                    numero_manual: req.body.numero_manual,
                    id_campo: req.body.campo ? req.body.campo.id : null
                }, {
                    transaction: t
                }).then(function (OrdenTrabajoCreada) {
                    return CorrelativoOt.update({
                        numeracion: sucursalCorrelativo.numeracion + 1
                    },
                        {
                            where: { id: sucursalCorrelativo.id },
                            transaction: t
                        }).then(function (sucursalActualizada) {
                            return InventarioRecepcion.create({
                                id_mantenimiento_ot: OrdenTrabajoCreada.id,
                                parabrisas_delantero: req.body.InventariosRecepcion ? req.body.InventariosRecepcion.parabrisas_delantero : false,
                                parabrisas_trasero: req.body.InventariosRecepcion ? req.body.InventariosRecepcion.parabrisas_trasero : false,
                                vidrio_techo_solar: req.body.InventariosRecepcion ? req.body.InventariosRecepcion.vidrio_techo_solar : false,
                                radio: req.body.InventariosRecepcion ? req.body.InventariosRecepcion.radio : false,
                                retrovisor: req.body.InventariosRecepcion ? req.body.InventariosRecepcion.retrovisor : false,
                                llanta_auxilio: req.body.InventariosRecepcion ? req.body.InventariosRecepcion.llanta_auxilio : false,
                                tapa_valvulas: req.body.InventariosRecepcion ? req.body.InventariosRecepcion.tapa_valvulas : false,
                                gata: req.body.InventariosRecepcion ? req.body.InventariosRecepcion.gata : false,
                                faroles_delanteros: req.body.InventariosRecepcion ? req.body.InventariosRecepcion.faroles_delanteros : false,
                                guiniadores: req.body.InventariosRecepcion ? req.body.InventariosRecepcion.guiniadores : false,
                                limpia_parabrisas_delantero: req.body.InventariosRecepcion ? req.body.InventariosRecepcion.limpia_parabrisas_delantero : false,
                                limpia_parabrisas_trasero: req.body.InventariosRecepcion ? req.body.InventariosRecepcion.limpia_parabrisas_trasero : false,
                                ventanas_delanteras: req.body.InventariosRecepcion ? req.body.InventariosRecepcion.ventanas_delanteras : false,
                                ventanas_traseras: req.body.InventariosRecepcion ? req.body.InventariosRecepcion.ventanas_traseras : false,
                                encendedor: req.body.InventariosRecepcion ? req.body.InventariosRecepcion.encendedor : false,
                                antena: req.body.InventariosRecepcion ? req.body.InventariosRecepcion.antena : false,
                                emblema: req.body.InventariosRecepcion ? req.body.InventariosRecepcion.emblema : false,
                                tapa_cubos: req.body.InventariosRecepcion ? req.body.InventariosRecepcion.tapa_cubos : false,
                                herramientas: req.body.InventariosRecepcion ? req.body.InventariosRecepcion.herramientas : false,

                                tapa_tanque_combustible: req.body.InventariosRecepcion ? req.body.InventariosRecepcion.tapa_tanque_combustible : false,
                                stops: req.body.InventariosRecepcion ? req.body.InventariosRecepcion.stops : false,
                                sobrepisos: req.body.InventariosRecepcion ? req.body.InventariosRecepcion.sobrepisos : false,
                                otros: req.body.InventariosRecepcion ? req.body.InventariosRecepcion.otros : "",
                                id_tamanio_tanque: req.body.InventariosRecepcion ? req.body.InventariosRecepcion.tamanioTanque ? req.body.InventariosRecepcion.tamanioTanque.id : null : null
                            }, {
                                transaction: t
                            }).then(function (inventarioReposicion) {
                                return VehiculoExterno.update(
                                    {
                                        marca: req.body.vehiculo.marca ? req.body.vehiculo.marca : null,
                                        chasis: req.body.vehiculo.chasis ? req.body.vehiculo.chasis : null,
                                        placa: req.body.vehiculo.placa ? req.body.vehiculo.placa : null,
                                        color: req.body.vehiculo.color ? req.body.vehiculo.color : null,
                                        km: req.body.vehiculo.km ? req.body.vehiculo.km : null,
                                        anio: req.body.vehiculo.anio ? req.body.vehiculo.anio : null,
                                        modelo: req.body.vehiculo.modelo ? req.body.vehiculo.modelo : null

                                    },
                                    {
                                        where: { id: req.body.vehiculo.id }, transaction: t
                                    }
                                ).then(actualizado => {
                                    var promise = []
                                    return MantenimientoOrdenTrabajoSistema.destroy({
                                        where: { id_orden_trabajo: OrdenTrabajoCreada.id }, transaction: t
                                    }).then(async function (sistemaEliminados) {

                                        if (req.body.manosDeObra.length != 0) {
                                            await req.body.manosDeObra.forEach(function (manoDeObra, index, array) {
                                                manoDeObra.fecha_fin = manoDeObra.fecha_fin ? stringToDateTime(manoDeObra.fecha_fin) : null;
                                                manoDeObra.fecha_inicio = manoDeObra.fecha_inicio ? stringToDateTime(manoDeObra.fecha_inicio) : null;
                                                promise.push(crearManodeobra(req, t, OrdenTrabajoCreada, manoDeObra))
                                            });

                                        }
                                        if (req.body.sistemas.length != 0) {
                                            await req.body.sistemas.forEach(function (sistema, index4, array4) {
                                                promise.push(crearSistemas(req, t, OrdenTrabajoCreada, sistema))
                                            })

                                        }
                                        if (req.body.materiales.length != 0) {
                                            await req.body.materiales.forEach(function (material, index2, array2) {
                                                promise.push(crearMateriales(req, t, OrdenTrabajoCreada, material))
                                            });

                                        }
                                        if (req.body.serviciosExternos.length != 0) {
                                            await req.body.serviciosExternos.forEach(function (servicioExterno, index3, array3) {
                                                promise.push(crearServiciosExternos(req, t, OrdenTrabajoCreada, servicioExterno))
                                            });

                                        }
                                        return Promise.all(promise)
                                    })
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
        }
    }

    function actualizarSaldoPagosOT(index4, t, pago, saldoGeneral) {
        return PagoOT.update({
            saldo_anterior: saldoGeneral
        }, {
            where: { id: pago.id }, transaction: t
        }).then(function (pagoActualizado) {

        }).catch(function (err) {
            return new Promise(function (fulfill, reject) {
                reject((err.stack !== undefined) ? err.stack : err);
            });
        })
    }


    function crearSistemas(req, t, OrdenTrabajoCreada, sistema) {

        return MantenimientoOrdenTrabajoSistema.create({
            id_orden_trabajo: OrdenTrabajoCreada.id,
            id_orden_trabajo_sistema: sistema.id,
            importe_interno: sistema.importe_interno ? sistema.importe_interno : 0,
            total_cliente: sistema.total_cliente ? sistema.total_cliente : 0
        }, {
            transaction: t
        }).then(function (params) {

        }).catch(function (err) {
            return new Promise(function (fulfill, reject) {
                reject((err.stack !== undefined) ? err.stack : err);
            });
        })

    }
    function crearManodeobra(req, t, OrdenTrabajoCreada, manoDeObra) {
        if (manoDeObra.horas && typeof manoDeObra.horas != 'number') {
            let hora = manoDeObra.horas.split(":");
            manoDeObra.horas = Number(hora[0])
            manoDeObra.minutos = Number(hora[1])
        }
        if (manoDeObra.id) {
            if (manoDeObra.eliminado) {
                return MantenimientoOrdenTrabajoManoObra.destroy({
                    where: { id: manoDeObra.id }, transaction: t
                }).then(function (ManoDeObraEliminado) {

                }).catch(function (err) {
                    return new Promise(function (fulfill, reject) {
                        reject((err.stack !== undefined) ? err.stack : err);
                    });
                })
            } else {
                return MantenimientoOrdenTrabajoManoObra.update({
                    id_especialidad: manoDeObra.especialidad.id,
                    fecha_inicio: manoDeObra.fecha_inicio,
                    fecha_fin: manoDeObra.fecha_fin,
                    trabajo_realizado: manoDeObra.trabajo_realizado,
                    id_persona: manoDeObra.encargado ? manoDeObra.encargado.id : null,
                    importe_interno: manoDeObra.importe_interno,
                    total_cliente: manoDeObra.total_cliente,
                    horas: manoDeObra.horas,
                    minutos: manoDeObra.minutos,
                    requerimiento_trabajo: manoDeObra.requerimiento_trabajo
                }, {
                    where: { id: manoDeObra.id }, transaction: t
                }).then(function (ManoDeObraCreada) {
                }).catch(function (err) {
                    return new Promise(function (fulfill, reject) {
                        reject((err.stack !== undefined) ? err.stack : err);
                    });
                })
            }
        } else {
            return MantenimientoOrdenTrabajoManoObra.create({
                id_orden_trabajo: OrdenTrabajoCreada.id,
                id_especialidad: manoDeObra.especialidad.id,
                fecha_inicio: manoDeObra.fecha_inicio,
                fecha_fin: manoDeObra.fecha_fin,
                trabajo_realizado: manoDeObra.trabajo_realizado,
                id_persona: manoDeObra.encargado ? manoDeObra.encargado.id : null,
                horas: manoDeObra.horas,
                minutos: manoDeObra.minutos,
                requerimiento_trabajo: manoDeObra.requerimiento_trabajo
            }, {
                transaction: t
            }).then(function (ManoDeObraCreada) {
            }).catch(function (err) {
                return new Promise(function (fulfill, reject) {
                    reject((err.stack !== undefined) ? err.stack : err);
                });
            })
        }

    }

    function crearMateriales(req, t, OrdenTrabajoCreada, material) {

        if (material.id) {
            if (material.eliminado) {
                // === reponer inventario ========+
                return Movimiento.find({
                    where: { id: material.movimiento }, include: [
                        { model: DetalleMovimiento, as: 'detallesMovimiento' }
                    ], transaction: t
                })
                    .then(movimientoRecuperado => {
                        if (movimientoRecuperado.detallesMovimiento.length > 0) {
                            var detalles = movimientoRecuperado.detallesMovimiento;
                            detalles.forEach((detalleMovimientoEncontrado, i, arr) => {
                                sequelize.transaction({
                                    isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
                                }, tr => {
                                    let qr = "UPDATE inv_inventario inv INNER JOIN inv_inventario inven ON inv.id=inven.id \
                                        SET inv.cantidad=inven.cantidad+"+ detalleMovimientoEncontrado.cantidad + ",\
                                        inv.costo_total=(inven.cantidad+"+ detalleMovimientoEncontrado.cantidad + ")*inv.costo_unitario,\
                                        inv.costo_total_dolares = (inven.cantidad+"+ detalleMovimientoEncontrado.cantidad + ")*(IFNULL(inven.costo_unitario_dolares, 0))\
                                        WHERE inv.id="+ detalleMovimientoEncontrado.id_inventario;
                                    return sequelize.query(qr, {
                                        transaction: tr, lock: tr.LOCK.UPDATE, type: sequelize.QueryTypes.UPDATE
                                    }).then(inventarioActualizado => {
                                        return DetalleMovimiento.destroy({
                                            where: { id: detalleMovimientoEncontrado.id }, transaction: tr
                                        }).then(function (detalleMovimientoEliminado) {
                                            if (i === detalles.length - 1) {
                                                return Movimiento.destroy({
                                                    where: { id: detalleMovimientoEncontrado.id_movimiento }, transaction: tr
                                                }).then(function (MovientoEliminado) {
                                                    return MantenimientoOrdenTrabajoMaterial.destroy({
                                                        where: { id: material.id }, transaction: tr
                                                    }).then(function (materialEliminado) {

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
                                            }
                                        }).catch(function (err) {
                                            return new Promise(function (fulfill, reject) {
                                                reject((err.stack !== undefined) ? err.stack : err);
                                            });
                                        })
                                    }).catch(err => {
                                        return new Promise(function (fulfill, reject) {
                                            reject((err.stack !== undefined) ? err.stack : err);
                                        });
                                    })

                                }).then(function (transaccionCreada) {
                                    console.log(transaccionCreada);
                                }).catch(function (err) {
                                    console.log(err);
                                })


                            })
                        } else {

                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })


                /* return DetalleMovimiento.findAll({
                     where: {
                         id_movimiento: material.movimiento, id_producto: material.id_producto
                     }, transaction: t
                 }).then(function (detallesMovimientoEncontrado) {
                         detallesMovimientoEncontrado.forEach((detalleMovimientoEncontrado, i, arr)=>{
                             sequelize.transaction({
                                 isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
                             }, tr=>{
                                 let qr="UPDATE inv_inventario inv INNER JOIN inv_inventario inven ON inv.id=inven.id \
                                         SET inv.cantidad=inven.cantidad+"+detalleMovimientoEncontrado.cantidad+",\
                                         inv.costo_total=(inven.cantidad+"+detalleMovimientoEncontrado.cantidad+")*inv.costo_unitario,\
                                         inv.costo_total_dolares = (inven.cantidad+"+detalleMovimientoEncontrado.cantidad+")*(IFNULL(inven.costo_unitario_dolares, 0))\
                                         WHERE inv.id="+detalleMovimientoEncontrado.id_inventario;
                                 return sequelize.query(qr, {transaction:tr, lock: tr.LOCK.UPDATE, type: sequelize.QueryTypes.UPDATE
                                 }).then(inventarioActualizado=>{
                                     return DetalleMovimiento.destroy({
                                         where: { id: detalleMovimientoEncontrado.id }, transaction: tr
                                     }).then(function (detalleMovimientoEliminado) {
                                         return Movimiento.find({
                                             where:{id: detalleMovimientoEncontrado.id_movimiento}, transaction: tr
                                         })
                                         .then(data=>{
                                             if(data){
                                                 return Movimiento.destroy({
                                                     where: { id: detalleMovimientoEncontrado.id_movimiento }, transaction: tr
                                                 }).then(function (MovientoEliminado) {
                                                     return MantenimientoOrdenTrabajoMaterial.destroy({
                                                         where: { id: material.id }, transaction: tr
                                                     }).then(function (materialEliminado) {
         
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
                                             }
                                         })
                                         .catch(err=>{
                                             console.log(err);
                                         })
                                     }).catch(function (err) {
                                         return new Promise(function (fulfill, reject) {
                                             reject((err.stack !== undefined) ? err.stack : err);
                                         });
                                     })
                                 }).catch(err=>{
                                     return new Promise(function (fulfill, reject) {
                                         reject((err.stack !== undefined) ? err.stack : err);
                                     });
                                 })
                                 
                             }).then(function (transaccionCreada) {
                                 console.log(transaccionCreada);
                             }).catch(function (err) {
                                 console.log(err);
                             })
 
                             
                         })
                 }); */

                // === fin reponer inventario ========
            } else {
                MantenimientoOrdenTrabajoMaterial.update({
                    id_producto: material.producto.id,
                    cantidad: material.cantidad,
                    importe: material.costo_unitario,
                    importe_interno: material.importe_interno,
                    total_cliente: material.total_cliente
                }, {
                    where: { id: material.id }, transaction: t
                }).then(function (MaterialCreado) {
                }).catch(function (err) {
                    return new Promise(function (fulfill, reject) {
                        reject((err.stack !== undefined) ? err.stack : err);
                    });
                })
            }
        } else {
            if (!material.eliminado) {
                // ===== descuento en inventario ====
                var Mypromise = [];
                return Tipo.find({
                    where: { nombre_corto: Diccionario.MOV_EGRE },
                    transaction: t
                }).then(function (tipoMovimiento) {
                    return Clase.find({
                        where: { nombre_corto: Diccionario.EGRE_OT },
                        transaction: t
                    }).then(function (conceptoMovimiento) {
                        return Movimiento.create({
                            id_tipo: tipoMovimiento.id,
                            id_clase: conceptoMovimiento.id,
                            id_almacen: material.almacen.id,
                            fecha: new Date()
                        }, { transaction: t }).then(function (movimientoEgresoCreado) {
                            return MantenimientoOrdenTrabajoMaterial.create({
                                id_orden_trabajo: OrdenTrabajoCreada.id,
                                id_producto: material.producto.id,
                                cantidad: material.cantidad,
                                importe: material.costo_unitario,
                                movimiento: movimientoEgresoCreado.id
                            }, {
                                transaction: t
                            }).then(function (actualizado) {

                                Mypromise.push(calcularCostosEgresos(0, material, material.cantidad, material.producto.inventarios, movimientoEgresoCreado, 0, 0, 0, 0, t))
                                return Promise.all(Mypromise).then(function (data) {
                                    return new Promise(function (fulfill, reject) {
                                        fulfill('OT actualizado')
                                    })
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


            }
        }

    }

    function calcularCostosEgresos(detalleVenta, material, cantidad, inventarios, movimientoCreado, index, array, res, venta, t) {
        var promesas = []
        var cantidadTotal = cantidad;
        if (material.producto.activar_inventario) {
            return Inventario.findAll({
                where: {
                    almacen: material.almacen.id,
                    producto: material.producto.id,
                    cantidad: { $gt: 0 }
                },
                transaction: t
            })
                .then(inv => {
                    if (inv !== undefined) {
                        if (inv.length > 0) {

                            for (var i = 0; i < inv.length; i++) {
                                if (cantidadTotal > 0) {
                                    var cantidadParcial;
                                    if (cantidadTotal > inv[i].cantidad) {
                                        cantidadParcial = inv[i].cantidad;
                                        cantidadTotal = cantidadTotal - inv[i].cantidad
                                    } else {
                                        cantidadParcial = cantidadTotal;
                                        cantidadTotal = 0;
                                    }
                                    if (cantidadParcial > 0) {
                                        promesas.push(crearMovimientoEgresoYActualizarInventario(movimientoCreado, material.producto, inv, cantidadParcial, inventarios[i], t))
                                    }
                                }
                            }
                        } else {
                            promesas.push(new Promise(function (fulfill, reject) {
                                reject('Producto ' + producto.nombre + ' sin inventario disponible, no se puede cerrar la solicitud');
                            }))
                        }
                    } else {
                        promesas.push(new Promise(function (fulfill, reject) {
                            reject('Producto ' + producto.nombre + ' sin inventario disponible, no se puede cerrar la solicitud')
                        }))
                    }
                })
                .catch(err => {

                })


        } else {
            promesas.push(new Promise(function (fulfill, reject) {
                fulfill('Producto no inventariado.');
            }))
        }
        return Promise.all(promesas);
    }

    function crearMovimientoEgresoYActualizarInventario(movimientoCreado, producto, inv, cantidadParcial, costo, t) {
        return DetalleMovimiento.create({
            id_movimiento: movimientoCreado.id,
            id_producto: producto.id,
            cantidad: cantidadParcial,
            costo_unitario: costo.costo_unitario,
            importe: (cantidadParcial * costo.costo_unitario),
            total: (cantidadParcial * costo.costo_unitario),
            descuento: (producto.descuento * cantidadParcial),
            recargo: (0 * cantidadParcial),
            ice: (0 * cantidadParcial),
            excento: (0 * cantidadParcial),
            tipo_descuento: producto.descuento_fijo,
            tipo_recargo: 0,
            fecha_vencimiento: producto.inventarios[0].fecha_vencimiento,
            lote: producto.inventarios[0].lote,
            id_inventario: costo.id
        }, { transaction: t }).then(async function (detalleMovimientoCreado) {
            return await Inventario.find({
                where: {
                    id: costo.id
                }
            }, { transaction: t }).then(async function (inventario) {
                if (inventario.cantidad >= cantidadParcial) {
                    return await Inventario.update({
                        cantidad: inventario.cantidad - cantidadParcial,
                        costo_total: ((inventario.cantidad - cantidadParcial) * costo.costo_unitario)
                    }, {
                        where: {
                            id: inventario.id
                        }
                    }, { transaction: t }).then(function (result) {
                        return new Promise(function (fulfill, reject) {
                            fulfill(result);
                        });
                    }).catch(function (err) {
                        return new Promise(function (fulfill, reject) {
                            reject((err.stack !== undefined) ? err.stack : err);
                        });
                    });
                } else {
                    return new Promise(function (fulfill, reject) {
                        reject('Error: La cantidad disponible es menor a la cantidad solicitada.');
                    });
                }
            }).catch(function (err) {
                return new Promise(function (fulfill, reject) {
                    reject((err.stack !== undefined) ? err.stack : err);
                });
            });
        });
    }

    function crearServiciosExternos(req, t, OrdenTrabajoCreada, servicioExterno) {

        if (servicioExterno.id) {
            if (servicioExterno.eliminado) {
                return MantenimientoOrdenTrabajoServicioExterno.destroy({
                    where: { id: servicioExterno.id }, transaction: t
                }).then(function (servicioExternoEliminado) {

                }).catch(function (err) {
                    return new Promise(function (fulfill, reject) {
                        reject((err.stack !== undefined) ? err.stack : err);
                    });
                })
            } else {
                MantenimientoOrdenTrabajoServicioExterno.update({
                    id_empresa: servicioExterno.empresa.id,
                    servicio: servicioExterno.servicio,
                    fecha_inicio: servicioExterno.fecha_inicio,
                    fecha_fin: servicioExterno.fecha_fin,
                    numero_factura: servicioExterno.numero_factura,
                    importe: servicioExterno.importe,
                    autorizacion: servicioExterno.autorizacion,
                    codigo_control: servicioExterno.codigo_control,
                    importe_interno: servicioExterno.importe_interno,
                    total_cliente: servicioExterno.total_cliente
                }, {
                    where: { id: servicioExterno.id }, transaction: t
                }).then(function (ServicioExternoCreado) {
                }).catch(function (err) {
                    return new Promise(function (fulfill, reject) {
                        reject((err.stack !== undefined) ? err.stack : err);
                    });
                })
            }
        } else {
            MantenimientoOrdenTrabajoServicioExterno.create({
                id_orden_trabajo: OrdenTrabajoCreada.id,
                id_empresa: servicioExterno.empresa.id,
                servicio: servicioExterno.servicio,
                fecha_inicio: servicioExterno.fecha_inicio,
                fecha_fin: servicioExterno.fecha_fin,
                numero_factura: servicioExterno.numero_factura,
                importe: servicioExterno.importe,
                autorizacion: servicioExterno.autorizacion,
                codigo_control: servicioExterno.codigo_control,
                importe_interno: servicioExterno.importe_interno,
                total_cliente: servicioExterno.total_cliente
            }, {
                transaction: t
            }).then(function (ServicioExternoCreado) {
            }).catch(function (err) {
                return new Promise(function (fulfill, reject) {
                    reject((err.stack !== undefined) ? err.stack : err);
                });
            })
        }

    }

    function actualizarCorrelativoOT(correlativo_ot, id_sucursal) {
        correlativo_ot = correlativo_ot + 1;
        console.log(correlativo_ot);
        return Sucursal.update({
            numero_correlativo_ot: correlativo_ot
        }, {
            where: { id: id_sucursal }
        });
    }

    router.route('/vehiculos-externos')
        .post(ensureAuthorizedlogged, function (req, res) {
            VehiculoExterno.create({
                marca: req.body.marca,
                chasis: req.body.chasis,
                modelo: req.body.modelo,
                placa: req.body.placa,
                color: req.body.color,
                km: req.body.kms,
                anio: req.body.anio,
                id_empresa: req.body.id_empresa
            }).then(function (vehiculo) {
                res.json(vehiculo)
            })
        })

    router.route('/cliente-mantenimiento')
        .post(ensureAuthorizedlogged, function (req, res) {
            Cliente.create({
                id_empresa: req.body.id_empresa,
                razon_social: req.body.propietario_vehiculo,
                telefono1: req.body.propietario_telefono.toString(),
                telefono2: req.body.propietario_celular.toString()

            }).then(function (cliente) {
                res.json(cliente);
            })

        })

    router.route('/mantenimiento/vehiculo/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/inicio/:inicio/fin/:fin/tipo_activo/:tipo_activo/placa/:placa/marca/:marca/modelo/:modelo/anio/:anio/tipo_mantenimiento/:tipo_mantenimiento/numero_ot/:numero_ot/estado_ot/:estado_ot/campamento/:campamento/sucursal/:sucursal/internoExterno/:internoExterno/admin/:admin/usuario/:usuario')
        .get(ensureAuthorizedlogged, function (req, res) {
            var condicionVehiculo = {
            }
            var condicionCliente = {}
            var condicionMatenimiento = { mantenimiento_externo: req.params.internoExterno != "0" ? true : false }
            if (req.params.inicio != 0 && req.params.fin == 0) {
                var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0);
                var fin = new Date(); fin.setDate(fin.getDate() + 3); fin.setHours(23, 59, 59, 59);
                condicionMatenimiento.fecha_hora_aviso = { $between: [inicio, fin] }
            } else if (req.params.inicio == 0 && req.params.fin != 0) {
                var inicio = new Date('01/01/2010'); inicio.setHours(0, 0, 0, 0);
                var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 59);
                condicionMatenimiento.fecha_hora_aviso = { $between: [inicio, fin] }
            } else if (req.params.inicio != 0 && req.params.fin != 0) {
                var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0);
                var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 59);
                condicionMatenimiento.fecha_hora_aviso = { $between: [inicio, fin] }
            }
            if (req.params.placa != 0) {
                if (req.params.internoExterno != '0') {
                    condicionVehiculo.placa = { $like: '%' + req.params.placa + '%' }
                } else {
                    condicionVehiculo.placa = { $like: '%' + req.params.placa + '%' }
                }
            }
            if (req.params.marca != 0) {
                condicionVehiculo.marca = { $like: '%' + req.params.marca + '%' }
            }
            if (req.params.modelo != 0) {
                condicionVehiculo.modelo = { $like: '%' + req.params.modelo + '%' }
            }
            if (req.params.anio != 0) {
                condicionVehiculo.anio = { $like: '%' + req.params.anio + '%' }
            }
            if (req.params.tipo_mantenimiento != 0) {
                condicionMatenimiento.id_tipo_mantenimiento = req.params.tipo_mantenimiento
            }
            if (req.params.numero_ot != 0) {
                condicionMatenimiento.correlativo_ot = req.params.numero_ot
            }
            if (req.params.sucursal != 0) {
                condicionMatenimiento.id_sucursal = req.params.sucursal
            }
            if (req.params.tipo_activo != 0) {
                condicionMatenimiento.tipo_activo = req.params.tipo_activo
            }
            if (req.params.estado_ot != 0) {
                condicionMatenimiento.id_estado = req.params.estado_ot
            }
            if (req.params.texto_busqueda != 0) {
                if (isNaN(parseInt(req.params.texto_busqueda))) {
                    condicionCliente.razon_social = { $like: '%' + req.params.texto_busqueda + '%' }
                } else {
                    condicionCliente.nit = req.params.texto_busqueda
                }
            }
            if (req.params.admin != "1" && req.params.usuario) {
                condicionMatenimiento.usuario = req.params.usuario
            }
            var textOrder = ""
            textOrder = req.params.columna + " " + req.params.direccion
            if (req.params.items_pagina != '0') {
                textOrder = textOrder + " limit " + (req.params.items_pagina * (req.params.pagina - 1)) + ", " + req.params.items_pagina
            }
            if (req.params.internoExterno != '0') {
                var datosbusqueda = {
                    where: condicionMatenimiento,
                    include: [{ model: Usuario, as: 'usuario', where: { id_empresa: req.params.id_empresa } }, { model: Clase, as: 'estado' }, { model: Clase, as: 'tipoMantenimiento' },
                    { model: VehiculoExterno, as: 'vehiculo', where: condicionVehiculo }, { model: Sucursal, as: 'sucursal' },
                    { model: Cliente, as: 'cliente_ot', attributes: ['id', 'id_empresa', 'razon_social', 'telefono1', 'telefono2', 'nit'] }]
                }
                datosbusqueda.group = ["`agil_mantenimiento_orden_trabajo`.`id`"]
                MantenimientoOrdenTrabajo.count(
                    datosbusqueda
                ).then(function (count) {
                    datosbusqueda.order = sequelize.literal(textOrder)
                    delete datosbusqueda.group
                    MantenimientoOrdenTrabajo.findAll(
                        datosbusqueda
                    ).then(function (mantenimientos) {
                        res.json({ mantenimientos: mantenimientos, paginas: Math.ceil(count.length / req.params.items_pagina) });
                    })
                })
            } else {
                var datosbusqueda = {
                    where: condicionMatenimiento,
                    include: [{ model: Usuario, as: 'usuario', where: { id_empresa: req.params.id_empresa } },
                    { model: Clase, as: 'estado' },
                    { model: Clase, as: 'tipoMantenimiento' },
                    { model: Producto, as: 'producto' },
                    { model: VehiculoExterno, as: 'vehiculo', where: condicionVehiculo },
                    { model: Sucursal, as: 'sucursal' },
                    { model: Cliente, as: 'cliente_ot', attributes: ['id', 'id_empresa', 'razon_social', 'telefono1', 'telefono2', 'nit'] }]
                }
                datosbusqueda.group = ["`agil_mantenimiento_orden_trabajo`.`id`"]
                MantenimientoOrdenTrabajo.count(
                    datosbusqueda
                ).then(function (count) {
                    datosbusqueda.order = sequelize.literal(textOrder)
                    delete datosbusqueda.group
                    MantenimientoOrdenTrabajo.findAll(
                        datosbusqueda
                    ).then(function (mantenimientos) {
                        res.json({ mantenimientos: mantenimientos, paginas: Math.ceil(count.length / req.params.items_pagina) });
                    })
                })
            }

        });
    router.route('/mantenimiento-vehiculo/empresa/:id_empresa/Mantenimiento/:id_mantenimiento')
        .get(ensureAuthorizedlogged, function (req, res) {
            MantenimientoOrdenTrabajo.find({
                where: { id: req.params.id_mantenimiento },
                include: [{ model: Sucursal, as: 'sucursal' }, { model: Producto, as: 'producto' },
                { model: Clase, as: 'estado' },
                { model: Clase, as: 'campo' },
                { model: Clase, as: 'tipoMantenimiento' },
                {
                    model: MantenimientoOrdenTrabajoManoObra, as: 'manosDeObra',
                    include: [
                        { model: Persona, as: 'encargado' },
                        {
                            model: Clase, as: 'especialidad', include: [
                                { model: MantenimientoEspecialidadPrecios, as: "PreciosEspecialidad" },
                                { model: Clase, as: 'padre' }]
                        }
                    ]
                },
                { model: MantenimientoOrdenTrabajoMaterial, as: 'materiales', include: [{ model: Producto, as: "producto" }, { model: Movimiento, as: 'movimientoKardex' }] },
                {
                    model: MantenimientoOrdenTrabajoServicioExterno, as: 'serviciosExternos',
                    include: [{ model: Proveedor, as: 'empresa' }]
                },
                { model: MantenimientoOrdenTrabajoSistema, as: 'sistemas', include: [{ model: Clase, as: 'ordenTrabajoSistema', attributes: ['nombre', 'nombre_corto'] }] },
                { model: InventarioRecepcion, as: 'InventariosRecepcion', include: [{ model: Clase, as: 'tamanioTanque' }] },
                { model: VehiculoExterno, as: 'vehiculo' },
                { model: Cliente, as: 'cliente_ot', attributes: ['id', 'id_empresa', 'razon_social', 'telefono1', 'telefono2', 'nit'] },
                { model: Clase, as: 'Prioridad' }],
                order: [
                    [{ model: MantenimientoOrdenTrabajoManoObra, as: 'manosDeObra' }, 'createdAt', 'ASC']
                ],
            }).then(function (MantenimeintoEncontrado) {
                if (MantenimeintoEncontrado.producto != null) {
                    VehiculoExterno.findOne({
                        where: {
                            placa: MantenimeintoEncontrado.producto.codigo
                        }
                    })
                        .then(vehiculo => {
                            res.json({ mantenimiento: MantenimeintoEncontrado, vehiculo: vehiculo })
                        })
                } else {
                    res.json({ mantenimiento: MantenimeintoEncontrado })
                }
            })
        })

    router.route('/mantenimiento-vehiculo/liquidacion/empresa/:id_empresa/Mantenimiento/:id_mantenimiento')
        .get(ensureAuthorizedlogged, function (req, res) {
            MantenimientoOrdenTrabajo.find({
                where: { id: req.params.id_mantenimiento },
                include: [{ model: Sucursal, as: 'sucursal' }, { model: Producto, as: 'producto' },
                { model: Clase, as: 'tipoMantenimiento' },
                { model: Clase, as: 'campo' },
                { model: MantenimientoOrdenTrabajoManoObra, as: 'manosDeObra', include: [{ model: Persona, as: 'encargado' }, { model: Clase, as: 'especialidad' }] },
                { model: MantenimientoOrdenTrabajoMaterial, as: 'materiales', include: [{ model: Producto, as: "producto" }] },
                {
                    model: MantenimientoOrdenTrabajoServicioExterno, as: 'serviciosExternos',
                    include: [{ model: Proveedor, as: 'empresa' }]
                },
                { model: MantenimientoOrdenTrabajoSistema, as: 'sistemas', include: [{ model: Clase, as: 'ordenTrabajoSistema', attributes: ['nombre', 'nombre_corto'] }] },
                { model: InventarioRecepcion, as: 'InventariosRecepcion', include: [{ model: Clase, as: 'tamanioTanque' }] },
                { model: VehiculoExterno, as: 'vehiculo' },
                { model: Cliente, as: 'cliente_ot', attributes: ['id', 'id_empresa', 'razon_social', 'telefono1', 'telefono2', 'nit'] },
                { model: Clase, as: 'Prioridad' }],
            }).then(function (MantenimeintoEncontrado) {
                res.json({ mantenimiento: MantenimeintoEncontrado })
            })
        })
    router.route('/mantenimiento-vehiculo/empresa/:id_empresa/busqueda/:buscar')
        .get(ensureAuthorizedlogged, function (req, res) {
            var condicionn = {
                id_empresa: req.params.id_empresa
            }
            if (req.params.buscar != 0) {
                condicion = {
                    id_empresa: req.params.id_empresa,
                    sujeto_mantenimiento: true,
                    $or: [
                        {
                            codigo: {
                                $like: "%" + req.params.buscar + "%"
                            }
                        }
                    ]
                };
            }
            Producto.findAll({
                where: condicion,
                include: [{ model: Almacen, required: false, as: 'almacenErp', include: [{ model: Sucursal, required: false, as: 'sucursal' }] }],

            }).then(function (datos) {
                res.json(datos)
            })

        });

    router.route('/mantenimiento-encargado/empresa/:id_empresa/busqueda/:buscar')
        .get(ensureAuthorizedlogged, function (req, res) {

            var condicionCuenta;
            var condicionEmpresa = { id_empresa: req.params.id_empresa }
            if (req.params.buscar != 0) {
                condicionCuenta = {
                    $or: [
                        {
                            nombres: {
                                $like: "%" + req.params.buscar + "%"
                            }
                        },
                        {
                            apellido_materno: {
                                $like: "%" + req.params.buscar + "%"
                            }
                        },
                        {
                            apellido_paterno: {
                                $like: "%" + req.params.buscar + "%"
                            }
                        }
                    ]
                };
            } else {
                condicionCuenta = {}
            }

            Persona.findAll({
                include: [{ model: MedicoPaciente, as: 'medicoPaciente', where: { es_empleado: true, eliminado: false, id_empresa: req.params.id_empresa } }],
                where: condicionCuenta
            }).then(function (cuentas) {
                res.json(cuentas)
            })

        });

    router.route('/mantenimiento-sucursales/id_empresa/:id_empresa')
        .get(ensureAuthorizedlogged, function (req, res) {
            Sucursale.findAll({
                where: { id_empresa: req.params.id_empresa }
            }).then(function (sucursales) {
                res.json({ sucursales: sucursales })
            })
        })

    router.route('/mantenimiento-empresa/id_empresa/:id_empresa')
        .get(ensureAuthorizedlogged, function (req, res) {
            Empresa.findAll({
                attributes: ['usar_mantenimiento_externo_propio'],
                where: { id: req.params.id_empresa }
            }).then(function (empresa) {
                res.json(empresa)
            })
        })

    router.route('/mantenimiento-vehiculo-externo/empresa/:id_empresa/busqueda/:buscar')
        .get(ensureAuthorizedlogged, function (req, res) {
            VehiculoExterno.findAll({
                where: {
                    id_empresa: req.params.id_empresa,
                    placa: { $like: '%' + req.params.buscar + '%' }
                }
            }).then(function (vehiculos) {
                res.json(vehiculos)
            });
        })
    router.route('/registros-vehiculo-externo-mantenimiento/vehiculo/:id_vehiculo')
        .get(ensureAuthorizedlogged, function (req, res) {
            MantenimientoOrdenTrabajo.findAll({
                where: { id_vehiculo: req.params.id_vehiculo },
                include: [{ model: Cliente, as: 'cliente_ot' }],
                limit: 1,
                order: [['id', 'desc']]
            }).then(function (registroOt) {
                res.json({ ultimoRegistroOT: registroOt[0] })
            });
        })
    router.route('/lista-vehiculos-ot/empresa/:id_empresa/marca/:marca/modelo/:modelo/placa/:placa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion')
        .get(ensureAuthorizedlogged, function (req, res) {
            var condicionVehiculo = {
                id_empresa: req.params.id_empresa
            }
            if (req.params.texto_busqueda != 0) {
                condicionVehiculo = {
                    id_empresa: req.params.id_empresa,
                    $or: [{ marca: { $like: '%' + req.params.texto_busqueda + '%' } },
                    { chasis: { $like: '%' + req.params.texto_busqueda + '%' } },
                    { modelo: { $like: '%' + req.params.texto_busqueda + '%' } },
                    { placa: { $like: '%' + req.params.texto_busqueda + '%' } },
                    { color: { $like: '%' + req.params.texto_busqueda + '%' } },
                    { anio: { $like: '%' + req.params.texto_busqueda + '%' } }]
                }
            }
            var textOrder = ""
            textOrder = req.params.columna + " " + req.params.direccion
            if (req.params.items_pagina != '0') {
                textOrder = textOrder + " limit " + (req.params.items_pagina * (req.params.pagina - 1)) + ", " + req.params.items_pagina
            }
            var datosbusqueda = {
                where: condicionVehiculo
            }
            datosbusqueda.group = ["`agil_vehiculos_externos`.`id`"]
            VehiculoExterno.count(
                datosbusqueda
            ).then(function (count) {
                datosbusqueda.order = sequelize.literal(textOrder)
                delete datosbusqueda.group
                VehiculoExterno.findAll(
                    datosbusqueda
                ).then(function (listaVehiculos) {
                    res.json({ listaVehiculos: listaVehiculos, paginas: Math.ceil(count.length / req.params.items_pagina) });
                })
            })
        })
    router.route('/kardex-vehiculos-ot/vehiculo/:id_vehiculo/inicio/:inicio/fin/:fin/estado/:estado/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion')
        .get(ensureAuthorizedlogged, function (req, res) {
            var condicionVehiculo = {
                id: req.params.id_vehiculo
            }
            var condicionCliente = {}
            var condicionMatenimiento = {}
            if (req.params.inicio != 0 && req.params.fin == 0) {
                var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0);
                var fin = new Date(); fin.setDate(fin.getDate() + 3); fin.setHours(23, 59, 59, 59);
                condicionMatenimiento.fecha_hora_aviso = { $between: [inicio, fin] }
            } else if (req.params.inicio == 0 && req.params.fin != 0) {
                var inicio = new Date('01/01/2010'); inicio.setHours(0, 0, 0, 0);
                var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 59);
                condicionMatenimiento.fecha_hora_aviso = { $between: [inicio, fin] }
            } else if (req.params.inicio != 0 && req.params.fin != 0) {
                var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0);
                var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 59);
                condicionMatenimiento.fecha_hora_aviso = { $between: [inicio, fin] }
            }

            if (req.params.estado != 0) {
                condicionMatenimiento.id_estado = req.params.estado
            }
            if (req.params.texto_busqueda != 0) {
                if (isNaN(parseInt(req.params.texto_busqueda))) {
                    condicionCliente.razon_social = { $like: '%' + req.params.texto_busqueda + '%' }
                } else {
                    condicionCliente.nit = req.params.texto_busqueda
                }
            }
            var textOrder = ""
            textOrder = req.params.columna + " " + req.params.direccion
            if (req.params.items_pagina != '0') {
                textOrder = textOrder + " limit " + (req.params.items_pagina * (req.params.pagina - 1)) + ", " + req.params.items_pagina
            }
            var datosbusqueda = {
                where: condicionMatenimiento,
                include: [{ model: Clase, as: 'estado' }, { model: Clase, as: 'tipoMantenimiento' },
                { model: VehiculoExterno, as: 'vehiculo', where: condicionVehiculo },
                { model: Cliente, as: 'cliente_ot', attributes: ['id', 'id_empresa', 'razon_social', 'telefono1', 'telefono2', 'nit'], where: condicionCliente }]
            }
            /* MantenimientoOrdenTrabajo.findAll({
                offset: (req.params.items_pagina * (req.params.pagina - 1)), limit: req.params.items_pagina,
                where: condicionMantenimiento,
                include: [{ model: Producto, as: 'producto', where: condicionProducto },
                { model: Clase, as: 'tipoMantenimiento' },
                { model: MantenimientoOrdenTrabajoManoObra, as: 'manosDeObra', include: [{ model: Persona, as: 'encargado' }, { model: Clase, as: 'especialidad' }] },
                { model: MantenimientoOrdenTrabajoMaterial, as: 'materiales', include: [{ model: Producto, as: "producto" }] },
                { model: MantenimientoOrdenTrabajoServicioExterno, as: 'serviciosExternos' },
                { model: MantenimientoOrdenTrabajoSistema, as: 'sistemas' },
                { model: Clase, as: 'Prioridad' }],
 
                order: [ordenArreglo]
            } */
            datosbusqueda.group = ["`agil_mantenimiento_orden_trabajo`.`id`"]
            MantenimientoOrdenTrabajo.count(
                datosbusqueda
            ).then(function (count) {
                datosbusqueda.order = sequelize.literal(textOrder)
                delete datosbusqueda.group
                MantenimientoOrdenTrabajo.findAll(
                    datosbusqueda
                ).then(function (KardexVehiculo) {
                    res.json({ KardexVehiculo: KardexVehiculo, paginas: Math.ceil(count.length / req.params.items_pagina) });
                })
            })
        })
    router.route('/orden-de-trabajo/mano-obra/factor/:factor/:idpersona')
        .get(ensureAuthorizedlogged, function (req, res) {
            sequelize.query('select ((SELECT haber_basico from agil_rrhh_empleado_ficha where id_empleado = (select id from agil_medico_paciente where persona = :idpersona) and activo = TRUE) / ' + req.params.factor + ') as salario_hora', { replacements: { idpersona: req.params.idpersona }, type: sequelize.QueryTypes.SELECT })
                .then(result => {
                    res.json({ salario: result[0].salario_hora ? result[0].salario_hora : 0 })
                }).catch((err) => {
                    res.json({ mensaje: (err.stack !== undefined) ? err.stack : err, hasErr: true })
                })
        })

    router.route('/mantenimiento-ot/:id/empresa/:id_empresa')
        .put(ensureAuthorizedlogged, function (req, res) {
            sequelize.transaction(function (t) {
                if (req.body.saldoRestante == 0) {
                    var anticipo = 0
                } else {
                    var anticipo = req.body.saldoRestante * (-1);
                }
                var pagoV = req.body.pago - anticipo
                return MantenimientoOrdenTrabajo.find({
                    where: { id: req.params.id },
                    include: [
                        { model: Sucursal, as: 'sucursal' },
                        { model: Clase, as: 'estado' }
                    ], transaction: t
                }).then(function (ventaEncontrada) {
                    return MantenimientoOrdenTrabajo.update({
                        a_cuenta: ventaEncontrada.a_cuenta + pagoV,
                        saldo: (ventaEncontrada.importe_facturado && ventaEncontrada.estado.nombre == 'FINALIZADO') ? ventaEncontrada.importe_facturado - (ventaEncontrada.a_cuenta + pagoV) : 0
                    }, {
                        where: {
                            id: ventaEncontrada.id
                        }, transaction: t
                    }).then(function (affectedRows) {
                        return PagoOT.create({
                            id_ot: ventaEncontrada.id,
                            a_cuenta_anterior: ventaEncontrada.a_cuenta,
                            saldo_anterior: ventaEncontrada.saldo,
                            monto_pagado: pagoV,
                            id_usuario: req.body.id_usuario_cajero,
                            numero_documento: ventaEncontrada.sucursal.nota_recibo_correlativo,
                            anticipo: req.body.anticipo ? req.body.anticipo : false
                        }, {
                            transaction: t
                        }).then(function (detalleVentaCreada) {
                            return Sucursal.update({
                                nota_recibo_correlativo: ventaEncontrada.sucursal.nota_recibo_correlativo + 1
                            }, {
                                where: {
                                    id: ventaEncontrada.sucursal.id
                                }, transaction: t
                            }).then(function (affectedRows) {
                                var pago = NumeroLiteral.Convertir(parseFloat(pagoV).toFixed(2).toString());
                                return new Promise(function (fulfill, reject) {
                                    fulfill({ anticipo: {}, mensaje: "¡Saldo de cuenta actualizado satisfactoriamente!", pago: pago, venta: ventaEncontrada });
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
            }).then(function (result) {
                res.json(result);
            }).catch(function (err) {
                res.json({ hasError: true, mensaje: err.stack ? err.stack : err });
            });
        });

    router.route('/especialidad-precios/empresa/:id_empresa/especiades/:id_especialidad')
        .get(ensureAuthorizedlogged, function (req, res) {
            MantenimientoEspecialidadPrecios.findAll({
                include: [{ model: Clase, as: 'especialidad', where: { eliminado: false, id: { $in: req.params.id_especialidad.split(',') } } }]
            }).then(function (entidad) {
                res.json({ 'especialidades': entidad });
            });
        });

    router.route('/especialidades-precios/empresa/:id_empresa')
        .put(ensureAuthorizedlogged, function (req, res) {
            if (req.body.especialidades.length > 0) {
                req.body.especialidades.forEach(function (clase, index, array) {
                    if (clase.id) {
                        MantenimientoEspecialidadPrecios.update({
                            id_especialidad: clase.especialidad ? clase.especialidad.id : null,
                            precio: clase.precio
                        }, {
                            where: { id: clase.id }
                        }).then(function (claseActualizada) {

                        });
                    } else {
                        MantenimientoEspecialidadPrecios.create({
                            id_especialidad: clase.especialidad ? clase.especialidad.id : null,
                            precio: clase.precio
                        }).then(function (claseCreado) {

                        });
                    }

                    if (index === (array.length - 1)) {
                        res.json({ message: "Actualizado satisfactoriamente!" });
                    }
                });
            }


        });

    router.route('/mantenimiento/interno/empresa/:id_empresa/id_producto/:id_producto')
        .get(ensureAuthorizedlogged, function (req, res) {
            VehiculoExterno.findOne({
                where: { id_producto: req.params.id_producto, empresa: req.params.id_empresa },
                include: [{ model: Producto, as: 'producto', where: { sujeto_mantenimiento: true } }]
            })
                .then(function (vehiculo) {
                    res.json({ hasError: false, vehiculo: vehiculo })
                })
                .catch(e => {
                    res.json({ hasError: true, err: e })
                })
        })
    //     sequelize.transaction((t)=>{
    //         return 
    //     }).then((result)=>{
    //         res.json({salario:result})
    //     }).catch((err)=>{
    //         res.json({ mensaje: (err.stack !== undefined) ? err.stack : err, hasErr: true })
    //     })
    // })
    router.route('/mantenimiento/interno/empresa/:empresa/inicio/:inicio/fin/:fin/externo/:externo')
        .get(ensureAuthorizedlogged, function (req, res) {
            let inicio = req.params.inicio.split("/").reverse().join("-") + " 00:00:00";
            let fin = req.params.fin.split("/").reverse().join("-") + " 23:59:59";
            let qry = "SELECT mant.nombre AS tipo_mantenimiento,ot.correlativo_ot AS nro_ot,ot.numero_manual AS nro_ot_manual,fecha_hora_aviso AS fecha,vehiculo.marca AS marca_vehiculo,vehiculo.modelo AS modelo_vehiculo,vehiculo.placa AS placa_vehiculo,cliente.razon_social AS cliente,ot.km,recep.parabrisas_delantero,recep.parabrisas_trasero,recep.vidrio_techo_solar,recep.radio,recep.retrovisor,recep.modelo,recep.tapa_valvulas,recep.gata,recep.faroles_delanteros,recep.guiniadores,recep.limpia_parabrisas_delantero,recep.limpia_parabrisas_trasero,recep.ventanas_delanteras,recep.ventanas_traseras,recep.encendedor,recep.antena,recep.emblema,recep.tapa_cubos,recep.herramientas,recep.tapa_tanque_combustible,recep.stops,recep.sobrepisos,tanque.nombre AS tamanio_tanque,recep.otros,ot.observacion,ot.diagnostico,prioridad.nombre AS prioridad,tiempo_estimado,fecha_hora_inicio AS fecha_inicio_ot,fecha_hora_fin AS fecha_fin_ot,sistema.nombre AS sistema,especialidad.nombre AS especialidad,persona.nombre_completo AS encargado,ot_mano_obra.fecha_inicio AS fecha_inicio_mano_obra,ot_mano_obra.fecha_fin AS fecha_fin_mano_obra,ot_mano_obra.horas,ot_mano_obra.minutos,importe_facturado,ot.observacion AS observacion_descuento,ot.descuento AS descuento,tipoPago.nombre AS tipo_pago,ot.dias_credito,ot.a_cuenta,ot.saldo,usu.nombre_usuario,suc.nombre AS sucursal,estado.nombre AS estado FROM agil_mantenimiento_orden_trabajo ot LEFT JOIN gl_clase prioridad ON prioridad.id=ot.prioridad LEFT JOIN gl_clase mant ON mant.id=ot.tipo_mantenimiento INNER JOIN sys_usuario usu ON usu.id=ot.usuario LEFT JOIN agil_sucursal suc ON suc.id=ot.sucursal LEFT JOIN agil_vehiculos_externos vehiculo ON vehiculo.id=ot.id_vehiculo LEFT JOIN agil_cliente cliente ON cliente.id=ot.id_cliente LEFT JOIN gl_clase estado ON estado.id=ot.estado LEFT JOIN gl_clase tipoPago ON tipoPago.id=ot.tipo_pago LEFT JOIN agil_inventario_de_recepcion recep ON recep.id=ot.id LEFT JOIN agil_mantenimiento_orden_trabajo_sistema sisord ON sisord.orden_trabajo=ot.id LEFT JOIN gl_clase sistema ON sistema.id=sisord.orden_trabajo_sistema LEFT JOIN agil_mantenimiento_orden_trabajo_mano_obra ot_mano_obra ON ot_mano_obra.orden_trabajo=ot.id LEFT JOIN gl_clase especialidad ON especialidad.id=ot_mano_obra.especialidad LEFT JOIN gl_persona persona ON persona.id=ot_mano_obra.persona LEFT JOIN gl_clase tanque ON tanque.id=recep.tamanio_tanque WHERE ot.mantenimiento_externo=";
            req.params.externo === "0" ? qry += "0" : qry += "1";
            qry += " AND usu.empresa=" + req.params.empresa + " AND ot.createdAt BETWEEN '" + inicio + "' AND '" + fin + "' ORDER BY ot.createdAt ASC";
            sequelize.query(qry, {
                type: sequelize.QueryTypes.SELECT
            })
                .then(function (ots) {
                    res.json({ hasError: false, ordenes: ots })
                })
                .catch(e => {
                    res.json({ hasError: true, err: e })
                })
        })

    router.route('/mantenimiento/empresa/:empresa/inicio/:inicio/fin/:fin/externo/:externo')
        .get(ensureAuthorizedlogged, function (req, res) {
            let inicio = req.params.inicio.split("/").reverse().join("-") + " 00:00:00";
            let fin = req.params.fin.split("/").reverse().join("-") + " 23:59:59";
            let qry = 'SELECT tipo.nombre AS tipo_mantenimiento,ot.correlativo_ot AS numero_ot,ot.numero_manual AS numero_manual,ot.fecha_hora_aviso AS fecha, ot.mantenimiento_externo AS externo,vehiculo.placa AS placa,vehiculo.marca AS marca,vehiculo.modelo AS modelo,'
            req.params.externo === "1" ? qry += 'cliente.razon_social AS cliente,' : ''
            qry += 'producto.codigo AS codigo,producto.nombre AS item,material.cantidad AS cantidad,material.importe AS costo_inventario,usuario.nombre_usuario AS usuario,sucursal.nombre AS sucursal,estado.nombre AS estado, almacen.nombre AS nombre_almacen FROM agil_mantenimiento_orden_trabajo ot INNER JOIN agil_sucursal sucursal ON sucursal.id=ot.sucursal LEFT JOIN agil_mantenimiento_orden_trabajo_material material ON material.orden_trabajo=ot.id INNER JOIN inv_movimiento movimiento ON movimiento.id=material.movimiento LEFT JOIN agil_almacen almacen ON almacen.id=movimiento.almacen INNER JOIN agil_producto producto ON producto.id=material.id_producto INNER JOIN gl_clase estado ON estado.id=ot.estado INNER JOIN gl_clase tipo ON tipo.id=ot.tipo_mantenimiento INNER JOIN agil_vehiculos_externos vehiculo ON vehiculo.id=ot.id_vehiculo '
            req.params.externo === "1" ? qry += 'INNER JOIN agil_cliente cliente ON cliente.id=ot.id_cliente ' : ''
            qry += 'INNER JOIN sys_usuario usuario ON usuario.id=ot.usuario WHERE ot.fecha_hora_aviso BETWEEN "' + inicio + '" AND "' + fin + '" AND ot.mantenimiento_externo='
            req.params.externo === "0" ? qry += '0' : qry += '1';
            qry += ' AND usuario.empresa=' + req.params.empresa + ' ORDER BY ot.fecha_hora_aviso ASC, ot.correlativo_ot ASC';
            sequelize.query(qry, {
                type: sequelize.QueryTypes.SELECT
            })
                .then(function (ots) {
                    res.json({ hasError: false, message: 'Datos recuperados con éxito.', ots: ots })
                })
                .catch(e => {
                    res.json({ hasError: true, message: 'Error al recuperar las órdenes de trabajo.', error: e })
                })
        })
    router.route('/orden-de-trabajo/materiales/:ids')
        .get(ensureAuthorizedlogged, async function (req, res) {
            try {
                let detalles = await DetalleMovimiento.findAll({
                    where: Sequelize.literal('`producto.grupo.cuentasGrupo`.cuenta = `producto.grupo.cuentasGrupo.cuenta.camposCuenta`.cuenta \
          AND `movimiento.materialTrabajo.ordenTrabajo`.campo = `producto.grupo.cuentasGrupo.cuenta.camposCuenta`.campo'),
                    attributes: ['total'],
                    include: [
                        {
                            model: Producto, as: 'producto',
                            include: [{
                                model: Clase, as: 'grupo',
                                include: [{
                                    model: ContabilidadCuentaGrupo, as: 'cuentasGrupo',
                                    include: [
                                        {
                                            model: ContabilidadCuenta, as: "cuenta",
                                            include: [
                                                {
                                                    model: ContabilidadCuentaCampo,
                                                    as: "camposCuenta",

                                                }
                                            ]
                                        },
                                    ]
                                }]
                            }, { model: Clase, as: 'subgrupo' }]
                        },
                        {
                            model: Movimiento, as: 'movimiento',
                            include: [{
                                model: MantenimientoOrdenTrabajoMaterial, as: 'materialTrabajo',
                                where: { id_orden_trabajo: { $in: req.params.ids.split(',') } },
                                include: [{ model: MantenimientoOrdenTrabajo, as: 'ordenTrabajo', where: { id_comprobante: null } }]
                            },
                            {
                                model: Almacen, as: 'almacen',
                                include: [{ model: ContabilidadCuenta, as: 'cuenta' }, { model: Sucursal, as: 'sucursal' }]
                            }]
                        }],
                })
                /* let NuevosDetalles=[]
                 for (const detalle of detalles) {
                     let encontrado = NuevosDetalles.find((nuevoDetalle)=>{
                         return detalle.producto.group == nuevoDetalle.producto.group
                         && detalle.movimiento.almacen == nuevoDetalle.movimiento.almacen
                         && detalle.movimiento.materialTrabajo.ordenTrabajo.id_campo
                         == nuevoDetalle.movimiento.materialTrabajo.ordenTrabajo.id_campo;
                     })
                     if(encontrado){
                         encontrado.total+=detalle.total;
                     }else{
                         NuevosDetalles.push(encontrado);
                     }
                 } */
                let arregloDetalles = detalles.reduce((NuevosDetalles, detalle) => {
                    if (NuevosDetalles.length > 0) {
                        let encontrado = NuevosDetalles.find((nuevoDetalle) => {
                            return detalle.producto.id_grupo == nuevoDetalle.producto.id_grupo
                                && detalle.movimiento.id_almacen == nuevoDetalle.movimiento.id_almacen
                                && detalle.movimiento.materialTrabajo.ordenTrabajo.id_campo
                                == nuevoDetalle.movimiento.materialTrabajo.ordenTrabajo.id_campo;
                        })
                        if (encontrado) {
                            encontrado.total += detalle.total;
                        } else {
                            NuevosDetalles.push(detalle);
                        }
                    } else {
                        NuevosDetalles.push(detalle);
                    }
                    return NuevosDetalles
                }, [])
                res.json(arregloDetalles);
            } catch (error) {
                res.json({ hasError: true, err: error })
            }

        })
    router.route('/mantenimiento/configuraciones/empresa/:id_empresa')
        .get(ensureAuthorizedlogged, function (req, res) {
            ConfigMantenimiento.find({ where: { id_empresa: req.params.id_empresa } })
                .then((result) => {
                    res.json({ error: false, config: result })
                }).catch((err) => {
                    res.json({ error: true, err: err })
                });
        })
        .post(ensureAuthorizedlogged, function (req, res) {
            const { id, id_empresa, mantenimiento_default, factor_hhmm, hrs_hombre, especialidades_grupal } = req.body
            if (id) {
                ConfigMantenimiento.update({
                    id_empresa: id_empresa ? id_empresa : req.params.id_empresa,
                    mantenimiento_default: mantenimiento_default,
                    factor_hhmm: factor_hhmm,
                    hrs_hombre: hrs_hombre,
                    especialidades_grupal: especialidades_grupal
                }, {
                    where: { id: id }
                })
                    .then(editado => res.json({ error: false, data: editado, message: "Configuraciones editados con éxito.", messageType: "success" }))
                    .catch(err => res.json({ error: true, message: "Error al editar configuraciones. <br> " + err, messageType: "error" }))
            } else {
                ConfigMantenimiento.create({
                    id_empresa: id_empresa ? id_empresa : req.params.id_empresa,
                    mantenimiento_default: mantenimiento_default,
                    factor_hhmm: factor_hhmm,
                    hrs_hombre: hrs_hombre,
                    especialidades_grupal: especialidades_grupal
                })
                    .then(guardado => res.json({ error: false, data: guardado, message: "Configuraciones guardados con éxito.", messageType: "success" }))
                    .catch(err => res.json({ error: true, message: "Error al guardar las configuraciones. <br> " + err, messageType: "error" }))
            }

        })
    router.route('/mantenimiento/filtro/tipos-activo-fijo/empresa/:id_empresa')
        .get(ensureAuthorizedlogged, function (req, res) {
            let qry = "SELECT grupo.id,grupo.nombre FROM agil_mantenimiento_orden_trabajo mto INNER JOIN gl_clase grupo ON grupo.id=mto.tipo_activo INNER JOIN agil_producto prod ON prod.id=mto.producto WHERE prod.empresa=" + req.params.id_empresa + " GROUP BY grupo.id"
            sequelize.query(qry, {
                type: sequelize.QueryTypes.SELECT
            })
                .then((result) => {
                    res.json({ error: false, activos_fijos: result })
                }).catch((err) => {
                    res.json({ error: true, err: err })
                });
        })


}   