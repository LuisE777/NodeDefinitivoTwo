module.exports = function (router, ensureAuthorizedAdministrador, fs, forEach, jwt, md5, Banco, Clase, TransaccionSeguimiento, CuentaTransaccion, Cliente, ClienteRazon,
    MedicoPaciente, Persona, sequelize, Proveedor, ProveedorCuenta, Venta, Almacen, Sucursal, PagoVenta, PagoCompra, Compra, Proforma, ensureAuthorizedlogged, 
    DetallesProformas, Servicios, DetalleTransaccion, CorrelativosEmpresa,DetalleCompraProgramacionPago,CompraProgramacionPago, AsientoContabilidad, ComprobanteContabilidad,
    ContabilidadCuenta, ClasificacionCuenta, ConfiguracionCuenta, ConfiguracionContableComprobante, EmpresaIntegracion, IntegracionAplicacion, Aplicacion, Tipo,
    ContabilidadCuentaAuxiliar, Usuario, Empresa, MonedaTipoCambio, Persona, ProformaContabilidad, nodemailer, jwt, Diccionario, CuentasBancoProveedor) {

    router.route('/transacciones/bancos/empresa/:id_empresa')

        .get(ensureAuthorizedAdministrador, function (req, res) {
            Banco.findAll({
                where: {
                    id_empresa: req.params.id_empresa
                },
                include: [{ model: Clase, as: 'tipoCuenta' }, { model: Clase, as: 'tipoMoneda' }]
            }).then(function (entity) {
                res.json(entity);
            });
        });

    function crearTransaccionIngreso(req, t, estado, saldo_transaccion, ids_proformas, ids_ventas, ventas, correlativoEmpresaEncont) {
        return CuentaTransaccion.create({
            fecha: req.body.fecha,
            id_cuenta: req.body.cuenta,
            detalle: req.body.detalle,
            detalle_dos: req.body.detalle_dos,
            id_cliente: ventas[0].cliente.id,
            id_concepto: req.body.concepto,
            observaciones: req.body.observacion,
            ref_doc: req.body.ref_doc + '',
            tipo_doc: req.body.tipo_doc,
            debe: 0,
            haber: req.body.haber,
            saldo: req.body.haber + saldo_transaccion[0].saldo,
            id_estado: estado.id,
            id_empresa: req.params.id_empresa,
            eliminado: false,
            cerrada: false,
            id_usuario: req.params.id_usuario,
            ids_proformas: ids_proformas.join(','),
            ids_ventas: ids_ventas.join(','),
            seguimiento:req.body.seguimiento,
            correlativo: (correlativoEmpresaEncont.numero_correlativo_transaccion_cobro) + (1)
        }, {
            transaction: t
        }).then(function (transaccionRegistrada) {
            return TransaccionSeguimiento.create({
                id_transaccion: transaccionRegistrada.id,
                proveedor: false,
                id_entregado: null,
                id_devuelto: null,
                fecha_entraga: null,
                fecha_devuelto: null,
                id_empresa: req.params.id_empresa,
                eliminado: false
            }, { transaction: t }).then(function (seguimientoCreado) {
                const proms = [seguimientoCreado]
                for (let index = 0; index < ventas.length; index++) {
                    proms.push(crearDetalleTransaccion(t, transaccionRegistrada.id, ventas[index].porCobrar, ventas[index].id))
                }
                return new Promise(function (fulfill, reject) {
                    fulfill(seguimientoCreado);
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
    }
    function crearDetalleTransaccion(t, id_transaccion, monto, id_proforma) {
        return DetalleTransaccion.create({
            id_transaccion,
            fecha: new Date(),
            monto,
            id_proforma
        }, { transaction: t })
    }


    router.route('/transacciones/ingreso/bancos/empresa/:id_empresa/:id_usuario')
        .post(ensureAuthorizedAdministrador, function (req, res) {
            var promisse = []
            var ventaRes = {}
            sequelize.transaction({
                isolationLevel: sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
            }, function (t) {
                promisse.push(
                    Clase.find({
                        where: { nombre_corto: 'SAL_INICIAL' }
                    }).then(function (SALDO_INICIAL) {
                        return CuentaTransaccion.find({
                            where: { id_concepto: SALDO_INICIAL.id, id_cuenta: req.body.cuenta, id_empresa: req.params.id_empresa }
                        }).then(function (transaccionInicial) {
                            return Clase.find({
                                where: { id: req.body.concepto },
                                transaction: t
                            }).then(function (datosConcepto) {
                                if (datosConcepto.nombre_corto == 'SAL_INICIAL') {
                                    if (transaccionInicial !== null && transaccionInicial !== undefined) {
                                        return new Promise(function (fulfill, reject) {
                                            reject("Este Nº "+ req.body.cuenta + " de Cuenta ya tiene saldo inicial"); //// poner el nombre de la cuenta que ya tiene saldo ojooooooooooooo???????????????
                                        });
                                    }else{
                                        return Clase.find({
                                            where: { nombre_corto: 'EN_TRANSITO' },
                                            transaction: t
                                        }).then(function (estadoConfirmado) {
                                            return CuentaTransaccion.create({
                                                fecha: req.body.fecha,
                                                id_cuenta: req.body.cuenta,
                                                detalle: 'Saldo apertura.',
                                                detalle_dos: 'Saldo apertura.',
                                                id_concepto: req.body.concepto,
                                                observaciones: 'Saldo inicial',
                                                tipo_doc: req.body.tipo_doc,
                                                saldo: req.body.monto,
                                                id_estado: estadoConfirmado.id,
                                                id_empresa: req.params.id_empresa,
                                                eliminado: false,
                                                cerrada: false,
                                                id_usuario: req.params.id_usuario,
                                                ids_proformas: null,
                                                seguimiento: false
                                            }, {
                                                transaction: t
                                            }).then(function (transaccionInicial) {
                                                return DetalleTransaccion.create({
                                                    id_transaccion: transaccionInicial.id,
                                                    fecha: new Date(),
                                                    id_proforma: null,
                                                    monto: req.body.monto
                                                }, {
                                                    transaction: t
                                                }).then(function(detalleTrans){
                                                    return new Promise(function (fulfill, reject) {
                                                        fulfill(transaccionInicial, detalleTrans);
                                                    });
                                                }).catch(function (err) {
                                                    return new Promise(function (fulfill, reject) {
                                                        reject((err.stack !== undefined) ? err.stack : err);
                                                    });
                                                })
                                               /*  return new Promise(function (fulfill, reject) {
                                                    fulfill(detalleTransCrear);
                                                }); */
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
                                if (datosConcepto.nombre_corto == 'CTRAN') {
                                    if (transaccionInicial !== null && transaccionInicial !== undefined) {
                                        return sequelize.query(
                                            "SELECT agil_cuenta_transaccion.saldo  \
                                            from agil_cuenta_transaccion where id = (select MAX(agil_cuenta_transaccion.id) from agil_cuenta_transaccion where cuenta = "+ req.body.cuenta + " and empresa =" + req.params.id_empresa + ")",
                                            { type: sequelize.QueryTypes.SELECT, transaction: t }
                                        ).then(function (saldo_transaccion) {
                                            return Clase.find({
                                                where: { nombre_corto: 'EN_TRANSITO' },
                                                transaction: t
                                            }).then(async function (estadoEnTransito) {
                                                const correlativoEmpresaEncontrado = await CorrelativosEmpresa.find({
                                                    where: {id_empresa: req.params.id_empresa}
                                                })
                                                const actualizarCorrelativo = await CorrelativosEmpresa.update({ numero_correlativo_transaccion_cobro: (correlativoEmpresaEncontrado.numero_correlativo_transaccion_cobro) + (1)}, {
                                                    where: {
                                                        id: correlativoEmpresaEncontrado.id
                                                    }
                                                })
                                                const ids_proformas = req.body.ventas.filter(dato => dato.es_proforma).map(proforma => proforma.id)
                                                const ids_ventas = req.body.ventas.filter(dato => !dato.es_proforma).map(venta => venta.id)
                                                const promesas = [crearTransaccionIngreso(req, t, estadoEnTransito, saldo_transaccion, ids_proformas, ids_ventas, req.body.ventas,correlativoEmpresaEncontrado)]
                                                for (let index = 0; index < req.body.ventas.length; index++) {
                                                    const venta = req.body.ventas[index]
                                                    promesas.push(actualizarVentaTransaccion(req, t, venta))
                                                }
                                                return Promise.all(promesas)
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
                                    }else{
                                        return new Promise(function (fulfill, reject) {
                                            reject('No se pueden hacer ingresos a la cuenta, se requiere un ingreso de saldo inicial.');
                                        });
                                    }
                                }
                                if (datosConcepto.nombre_corto == 'PTRAN') {
                                    if (transaccionInicial !== null && transaccionInicial !== undefined){
                                        return sequelize.query(
                                            "SELECT agil_cuenta_transaccion.saldo  \
                                            from agil_cuenta_transaccion \
                                            where id = (select MAX(agil_cuenta_transaccion.id) from agil_cuenta_transaccion where cuenta = "+ req.body.cuenta + " and empresa =" + req.params.id_empresa + ")",
                                            { type: sequelize.QueryTypes.SELECT, transaction: t }
                                        ).then(async function (saldo_transaccionPag) {
                                           
                                            const estadoo = await Clase.find({
                                                where: { nombre_corto: 'EN_TRANSITO' },
                                                transaction: t
                                            })
                                            const correlativoEmpresaEncontrado = await CorrelativosEmpresa.find({
                                                where: {id_empresa: req.params.id_empresa}
                                            })
                                            const actualizarCorrelativo = await CorrelativosEmpresa.update({ numero_correlativo_transaccion_pago: (correlativoEmpresaEncontrado.numero_correlativo_transaccion_pago) + (1)}, {
                                                where: {
                                                    id: correlativoEmpresaEncontrado.id
                                                }
                                            })
                                            return CuentaTransaccion.create({
                                                fecha: req.body.fecha,
                                                id_cuenta: req.body.cuenta,
                                                detalle: req.body.detalle,
                                                detalle_dos: req.body.detalle_dos,
                                                id_proveedor: req.body.pagosProgramad[0].proveedor,
                                                id_concepto: req.body.concepto,
                                                observaciones: req.body.observacion,
                                                ref_doc: req.body.ref_doc + '',
                                                tipo_doc: req.body.tipo_doc,
                                                debe: req.body.debe,
                                                haber: 0,
                                                saldo: saldo_transaccionPag[0].saldo - req.body.debe ,
                                                id_estado: estadoo.id,
                                                id_empresa: req.params.id_empresa,
                                                eliminado: false,
                                                cerrada: false,
                                                id_usuario: req.params.id_usuario,
                                                ids_proformas:null,
                                                ids_ventas: null,
                                                seguimiento: req.body.seguimiento,
                                                correlativo: (correlativoEmpresaEncontrado.numero_correlativo_transaccion_pago) + (1)
                                            }, {
                                                transaction: t
                                            }).then(function (transaccionRegistradaPago) {
                                                return TransaccionSeguimiento.create({
                                                    id_transaccion: transaccionRegistradaPago.id,
                                                    proveedor: false,
                                                    id_entregado: null,
                                                    id_devuelto: null,
                                                    fecha_entraga: null,
                                                    fecha_devuelto: null,
                                                    id_empresa: req.params.id_empresa,
                                                    eliminado: false
                                                }, { transaction: t }).then(function (seguimientoCreadoPago) {
                                                    for(let index = 0; index < req.body.pagosProgramad.length; index++) {
                                                        const transacionDetal = req.body.pagosProgramad[index];
                                                        DetalleTransaccion.create({
                                                            id_transaccion: transaccionRegistradaPago.id,
                                                            fecha: new Date(),
                                                            id_compra: transacionDetal.id_compra,
                                                            monto: transacionDetal.porPagar
                                                        }, {
                                                            transaction: t
                                                        })
                                                        const actualCompra = Compra.update({
                                                            a_cuenta: transacionDetal.porPagar + transacionDetal.a_cuenta ,
                                                            saldo: ((transacionDetal.total) - (transacionDetal.porPagar + transacionDetal.a_cuenta)),
                                                        }, {
                                                            where: { id: transacionDetal.id_compra },
                                                            transaction: t
                                                        })
                                                    }
                                                    return new Promise(function (fulfill, reject) {
                                                        fulfill(transaccionRegistradaPago);
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
                                    }
                                }
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
                )
                return Promise.all(promisse);
            }).then( async function (transaccionCreada) {
                if (transaccionCreada !== undefined) {
                   const concept = await Clase.find({
                        where: { id: req.body.concepto }
                    })
                    if(concept.nombre_corto == 'CTRAN'){
                        if (req.body.venta) {
                            if (req.body.venta.es_proforma) {
                                Proforma.find({
                                    where: {
                                        id: req.body.venta.id
                                    },
                                    include: [{ model: Sucursal, as: 'sucursal' }, { model: Cliente, as: 'cliente' }]
                                }).then(function (proforma) {
                                    proforma.dataValues.saldo = proforma.importe - proforma.a_cuenta
                                    res.json({ mensaje: 'Transacción completada.', venta: proforma })
                                })
                            } else {
                                Venta.find({
                                    where: { id: req.body.venta.id },
                                    include: [{
                                        model: Almacen, as: 'almacen',
                                        include: [{ model: Sucursal, as: 'sucursal' }]

                                    }, { model: Cliente, as: 'cliente' }]
                                }).then(function (ventaEncontrada) {
                                    res.json({ mensaje: 'Transacción completada.', venta: ventaEncontrada })
                                })
                            }
                        } else {
                            Proforma.findAll({
                                where: {
                                    id: { $in: req.body.ventas.filter(dato => dato.es_proforma).map(proforma => proforma.id) }
                                },
                                include: [
                                    { model: DetallesProformas, as: 'detallesProformas', include: [{ model: Servicios, as: 'servicio' }, { model: Clase, as: 'centroCosto' }] },
                                    { model: Cliente, as: 'cliente' }
                                ]
                            }).then((proformas) => {
                                CuentaTransaccion.find({
                                    where: transaccionCreada[0] && transaccionCreada[0][0] && transaccionCreada[0][0].id_transaccion || transaccionCreada[0].id,
                                    include: [
                                        {
                                            model: Banco, as: 'cuenta',
                                            include: [{ model: Clase, as: 'tipoCuenta' }, { model: Clase, as: 'tipoMoneda' }]
                                        },
                                        {
                                            model: DetalleTransaccion, as: 'detallesTransaccion'
                                        },
                                        {
                                            model: Clase, as: 'concepto'
                                        },
                                        {
                                            model: Clase, as: 'tipo_documento'
                                        },
                                        {
                                            model: Clase, as: 'estado'
                                        }
                                    ],
                                    order: [['id', 'asc']]
                                }).then(function (transacciones) {
                                    res.json({ mensaje: 'Transacción completada.', transaccion: transacciones, proformas: proformas, ventas: req.body.ventas })
                                }).catch(function (err) {
                                    res.json({ mensaje: err.stack, hasErr: true });
                                })
                            }).catch((err) => {
                                res.json({ mensaje: err.stack, hasErr: true })
                            })
                        }
                    }
                    if(concept.nombre_corto == 'SAL_INICIAL'){
                        CuentaTransaccion.find({
                            where: transaccionCreada[0] && transaccionCreada[0][0] && transaccionCreada[0][0].id_transaccion || transaccionCreada[0].id,
                            include: [
                                { model: Banco, as: 'cuenta',
                                    include: [{ model: Clase, as: 'tipoCuenta' }, { model: Clase, as: 'tipoMoneda' }]},
                                {model: DetalleTransaccion, as: 'detallesTransaccion'},
                                {model: Clase, as: 'concepto'},
                                {model: Clase, as: 'tipo_documento'},
                                {model: Clase, as: 'estado'}
                            ],
                            order: [['id', 'asc']]
                        }).then(function (transacciones) {
                            res.json({ mensaje: 'Transacción de Saldo Inicial completada.', transaccion: transacciones})
                        }).catch(function (err) {
                            res.json({ mensaje: err.stack, hasErr: true });
                        })
                    }
                    if(concept.nombre_corto == 'PTRAN'){
                        CuentaTransaccion.find({
                            where: transaccionCreada[0] && transaccionCreada[0][0] && transaccionCreada[0][0].id_transaccion || transaccionCreada[0].id,
                            include: [
                                {model: Banco, as: 'cuenta',
                                    include: [{ model: Clase, as: 'tipoCuenta' }, 
                                              { model: Clase, as: 'tipoMoneda' }]},
                                {model: DetalleTransaccion, as: 'detallesTransaccion',
                                    include: [{ model: Compra, as: 'compra'}]
                                },
                                {model: Clase, as: 'concepto'},
                                {model: Clase, as: 'tipo_documento'},
                                {model: Clase, as: 'estado'},
                                {model: Proveedor, as: 'proveedor'}
                                
                            ],
                            order: [['id', 'asc']]
                        }).then(function (transaccionesPago) {
                            res.json({ mensaje: 'Transacción de Pago completado.', transaccion: transaccionesPago})
                        }).catch(function (err) {
                            res.json({ mensaje: err.stack, hasErr: true });
                        })
                    }


                } else { 
                    throw new Error('Se produjo un error y no se puede asegurar los datos, cambios no revertidos.');
                }
               // res.json({ mensaje: err.stack, hasErr: true })
            }).catch(function (err) {
                res.json({ mensaje: (err.stack !== undefined) ? err.stack : err, hasErr: true })
            })
        })

    function actualizarVentaTransaccion(req, t, venta) {
        if (!venta.porCobrar) throw new Error('Error con el monto por cobrar de ' + venta.cliente.razon_social + ' saldo: ' + (venta.saldo || 'Error') + (venta.porCobrar || 'Error'))
        return Proforma.find({
            where: { id: venta.id },
            include: [{ model: Sucursal, as: 'sucursal' }], transaction: t
        }).then(function (proformaEncontrada) {
            const a_cuenta = (proformaEncontrada.dataValues.a_cuenta ? proformaEncontrada.dataValues.a_cuenta : 0) + venta.porCobrar
            const saldoProforma = proformaEncontrada.dataValues.totalImporteBs - a_cuenta
            return Proforma.update({
                fecha_cobro: req.body.fecha,
                a_cuenta: a_cuenta
            }, {
                where: { id: venta.id },
                transaction: t
            })
        }).catch(function (err) {
            return new Promise(function (fulfill, reject) {
                reject((err.stack !== undefined) ? err.stack : err);
            });
        })
    }

    function revisarVentaTransaccion(req, t, venta, estadoEnTransito, transaccion) {
        return CuentaTransaccion.find({
            where: {
                factura: venta.factura,
                autorizacion: venta.autorizacion,
                id_concepto: req.body.concepto,
                id_empresa: req.params.id_empresa
            }
        }).then(function (transaccionEncontrada) {
            if (transaccionEncontrada) {
                if (!venta.es_proforma) {
                    return Venta.find({
                        where: { id: venta.id },
                        include: [{
                            model: Almacen, as: 'almacen',
                            include: [{ model: Sucursal, as: 'sucursal' }]
                        }],
                        transaction: t
                    }).then(function (ventaEncontrada) {
                        // const a_cuenta = (proformaEncontrada.dataValues.a_cuenta ? proformaEncontrada.dataValues.a_cuenta : 0 ) + (req.body.saldo_haber && req.body.saldo_haber || req.body.haber)
                        // const saldoProforma = proformaEncontrada.dataValues.totalImporteBs - a_cuenta
                        if (ventaEncontrada.saldo > 0 && req.body.haber <= ventaEncontrada.saldo) {
                            return Venta.update({
                                a_cuenta: ventaEncontrada.a_cuenta + req.body.haber,
                                saldo: ventaEncontrada.total - (ventaEncontrada.a_cuenta + req.body.haber)
                            }, {
                                where: {
                                    id: ventaEncontrada.id
                                },
                                transaction: t
                            }).then(function (affectedRows) {

                                return PagoVenta.create({
                                    id_venta: ventaEncontrada.id,
                                    a_cuenta_anterior: ventaEncontrada.a_cuenta,
                                    saldo_anterior: ventaEncontrada.saldo,
                                    monto_pagado: req.body.haber,
                                    id_usuario: req.body.id_usuario_cajero,
                                    numero_documento: ventaEncontrada.almacen.sucursal.nota_recibo_correlativo
                                }, {
                                    transaction: t
                                }).then(function (detalleVentaCreada) {
                                    return Sucursal.update({
                                        nota_recibo_correlativo: ventaEncontrada.almacen.sucursal.nota_recibo_correlativo + 1
                                    }, {
                                        where: {
                                            id: ventaEncontrada.almacen.sucursal.id
                                        },
                                        transaction: t
                                    }).then(function (affectedRows) {
                                        return crearTransaccionIngreso(req, t, estadoEnTransito, transaccion, venta,)
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
                        } else if (saldoProforma < 0) {
                            // req.body.haber = 
                            req.body.saldo_haber = (saldoProforma * -1)
                            return Proforma.update({
                                fecha_cobro: req.body.fecha,
                                a_cuenta: a_cuenta + saldoProforma
                            }, {
                                where: { id: venta.id },
                                transaction: t
                            }).then(function (proformaActualizada) {
                                return crearTransaccionIngreso(req, t, estadoEnTransito, transaccion, venta, (a_cuenta + saldoProforma))
                            }).catch(function (err) {
                                return new Promise(function (fulfill, reject) {
                                    reject((err.stack !== undefined) ? err.stack : err);
                                });
                            });
                        } else {
                            return new Promise(function (fulfill, reject) {
                                reject('No se puede realizar la transacción hubo un error desconocido. Rutas transacciones LN - 309');
                            });
                        }
                    }).catch(function (err) {
                        return new Promise(function (fulfill, reject) {
                            reject((err.stack !== undefined) ? err.stack : err);
                        });
                    })
                } else {
                    return Proforma.find({
                        where: { id: venta.id },
                        include: [{ model: Sucursal, as: 'sucursal' }], transaction: t
                    }).then(function (proformaEncontrada) {
                        const a_cuenta = (proformaEncontrada.dataValues.a_cuenta ? proformaEncontrada.dataValues.a_cuenta : 0) + (req.body.saldo_haber && req.body.saldo_haber || req.body.haber)
                        const saldoProforma = proformaEncontrada.dataValues.totalImporteBs - a_cuenta
                        if ((saldoProforma > 0 || saldoProforma === 0)) {
                            return Proforma.update({
                                fecha_cobro: req.body.fecha,
                                a_cuenta: a_cuenta
                            }, {
                                where: { id: venta.id },
                                transaction: t
                            })
                            // .then(function (proformaActualizada) {
                            //     return crearTransaccionIngreso(req, t, estadoEnTransito, transaccion, venta, a_cuenta)
                            // }).catch(function (err) {
                            //     return new Promise(function (fulfill, reject) {
                            //         reject((err.stack !== undefined) ? err.stack : err);
                            //     });
                            // });
                        } else if (saldoProforma < 0) {
                            // req.body.haber = (saldoProforma * -1)
                            req.body.saldo_haber = (saldoProforma * -1)
                            return Proforma.update({
                                fecha_cobro: req.body.fecha,
                                a_cuenta: a_cuenta + saldoProforma
                            }, {
                                where: { id: venta.id },
                                transaction: t
                            })
                            // .then(function (proformaActualizada) {
                            //     return crearTransaccionIngreso(req, t, estadoEnTransito, transaccion, venta, (a_cuenta + saldoProforma))
                            // }).catch(function (err) {
                            //     return new Promise(function (fulfill, reject) {
                            //         reject((err.stack !== undefined) ? err.stack : err);
                            //     });
                            // });
                        } else {
                            return new Promise(function (fulfill, reject) {
                                reject('No se puede realizar la transacción hubo un error desconocido. Rutas transacciones LN - 309');
                            });
                        }
                    }).catch(function (err) {
                        return new Promise(function (fulfill, reject) {
                            reject((err.stack !== undefined) ? err.stack : err);
                        });
                    })
                }
            } else {
                if (!venta.es_proforma) {
                    return Venta.find({
                        where: { id: venta.id },
                        include: [{
                            model: Almacen, as: 'almacen',
                            include: [{ model: Sucursal, as: 'sucursal' }]
                        }],
                        transaction: t
                    }).then(function (ventaEncontrada) {
                        if (ventaEncontrada.saldo > 0 && req.body.haber <= ventaEncontrada.saldo) {
                            return Venta.update({
                                a_cuenta: ventaEncontrada.a_cuenta + req.body.haber,
                                saldo: ventaEncontrada.total - (ventaEncontrada.a_cuenta + req.body.haber)
                            }, {
                                where: {
                                    id: ventaEncontrada.id
                                },
                                transaction: t
                            }).then(function (affectedRows) {
                                return PagoVenta.create({
                                    id_venta: ventaEncontrada.id,
                                    a_cuenta_anterior: ventaEncontrada.a_cuenta,
                                    saldo_anterior: ventaEncontrada.saldo,
                                    monto_pagado: req.body.haber,
                                    id_usuario: req.body.id_usuario_cajero,
                                    numero_documento: ventaEncontrada.almacen.sucursal.nota_recibo_correlativo
                                }, {
                                    transaction: t
                                }).then(function (detalleVentaCreada) {
                                    return Sucursal.update({
                                        nota_recibo_correlativo: ventaEncontrada.almacen.sucursal.nota_recibo_correlativo + 1
                                    }, {
                                        where: {
                                            id: ventaEncontrada.almacen.sucursal.id
                                        },
                                        transaction: t
                                    }).then(function (affectedRows) {
                                        return crearTransaccionIngreso(req, t, estadoEnTransito, transaccion, venta)
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
                        } else if (ventaEncontrada.saldo === 0) {
                            return new Promise(function (fulfill, reject) {
                                reject('No se puede realizar la transacción el saldo por cobrar es 0');
                            });
                        } else if (req.body.haber - 0.005 > ventaEncontrada.saldo) {
                            return new Promise(function (fulfill, reject) {
                                reject('No se puede realizar la transacción el pago es mayor al saldo por cobrar.');
                            });
                        } else {
                            return new Promise(function (fulfill, reject) {
                                reject('No se puede realizar la transacción hubo un error desconocido. Rutas transacciones LN - 261');
                            });
                        }
                    }).catch(function (err) {
                        return new Promise(function (fulfill, reject) {
                            reject((err.stack !== undefined) ? err.stack : err);
                        });
                    })
                } else {
                    return Proforma.find({
                        where: { id: venta.id },
                        include: [{ model: Sucursal, as: 'sucursal' }], transaction: t
                    }).then(function (proformaEncontrada) {
                        const a_cuenta = (proformaEncontrada.dataValues.a_cuenta ? proformaEncontrada.dataValues.a_cuenta : 0) + (req.body.saldo_haber && req.body.saldo_haber || req.body.haber)
                        // const a_cuenta = (proformaEncontrada.dataValues.a_cuenta ? proformaEncontrada.dataValues.a_cuenta : 0 ) + req.body.haber
                        const saldoProforma = proformaEncontrada.dataValues.totalImporteBs - a_cuenta
                        if ((saldoProforma > 0 || saldoProforma === 0)) {
                            return Proforma.update({
                                fecha_cobro: req.body.fecha,
                                a_cuenta: a_cuenta
                            }, {
                                where: { id: venta.id },
                                transaction: t
                            })
                            // .then(function (proformaActualizada) {
                            //     return crearTransaccionIngreso(req, t, estadoEnTransito, transaccion, venta, a_cuenta)
                            // }).catch(function (err) {
                            //     return new Promise(function (fulfill, reject) {
                            //         reject((err.stack !== undefined) ? err.stack : err);
                            //     });
                            // });
                        } else if (saldoProforma < 0) {
                            // req.body.haber = (saldoProforma) *-1
                            req.body.saldo_haber = (saldoProforma * -1)
                            return Proforma.update({
                                fecha_cobro: req.body.fecha,
                                a_cuenta: a_cuenta + saldoProforma
                            }, {
                                where: { id: venta.id },
                                transaction: t
                            })
                            // .then(function (proformaActualizada) {
                            //     return crearTransaccionIngreso(req, t, estadoEnTransito, transaccion, venta, (a_cuenta + saldoProforma))
                            // }).catch(function (err) {
                            //     return new Promise(function (fulfill, reject) {
                            //         reject((err.stack !== undefined) ? err.stack : err);
                            //     });
                            // });
                        } else {
                            return new Promise(function (fulfill, reject) {
                                reject('No se puede realizar la transacción hubo un error desconocido. Rutas transacciones LN - 309');
                            });
                        }
                    }).catch(function (err) {
                        return new Promise(function (fulfill, reject) {
                            reject((err.stack !== undefined) ? err.stack : err);
                        });
                    })
                }
            }
        }).catch(function (err) {
            return new Promise(function (fulfill, reject) {
                reject((err.stack !== undefined) ? err.stack : err);
            });
        })
    }

/*     function crearTransaccionEgreso(req, t, estado, transaccion) {
        return CuentaTransaccion.create({
            fecha: req.body.fecha,
            id_cuenta: req.body.cuenta,
            detalle: req.body.detalle,
            detalle_dos: req.body.detalle_dos,
            id_cliente: (req.body.compra !== null && req.body.compra !== undefined) ? req.body.compra.id_cliente : null,
            id_concepto: req.body.concepto,
            observaciones: req.body.observacion,
            ref_doc: req.body.ref_doc,
            tipo_doc: req.body.tipo_doc,
            debe: req.body.debe,
            haber: req.body.haber,
            saldo: ((req.body.debe * -1) + transaccion[0].saldo),
            id_estado: estado.id,
            id_empresa: req.params.id_empresa,
            eliminado: false,
            id_usuario: req.params.id_usuario,
            seguimiento: req.body.seguimiento
        }, {
            transaction: t
        }).then(function (transaccionRegistrada) {
            return TransaccionSeguimiento.create({
                id_transaccion: transaccionRegistrada.id,
                proveedor: false,
                id_entregado: null,
                id_devuelto: null,
                fecha_entraga: null,
                fecha_devuelto: null,
                id_empresa: req.params.id_empresa,
                eliminado: false
            }, { transaction: t }).then(function (seguimientoCreado) {

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
    } */

/*     router.route('/transacciones/egreso/bancos/empresa/:id_empresa/:id_usuario')
        .post(ensureAuthorizedAdministrador, function (req, res) {
            var promisse = []
            sequelize.transaction(function (t) {
                promisse.push(
                    Clase.find({
                        where: { nombre_corto: 'SAL_INICIAL' }
                    }).then(function (SALDO_INICIAL) {
                        return CuentaTransaccion.find({
                            where: { id_concepto: SALDO_INICIAL.id, id_cuenta: req.body.cuenta, id_empresa: req.params.id_empresa }
                        }).then(function (transaccionInicial) {
                            if (transaccionInicial !== null && transaccionInicial !== undefined) {
                                if (SALDO_INICIAL.id == req.body.concepto) {
                                    return new Promise(function (fulfill, reject) {
                                        reject('No se pueden realizar ingresos de apertura desde egresos.');
                                    });
                                } else {
                                    return Clase.find({
                                        where: { nombre_corto: 'PTRAN' }
                                    }).then(function (COBRO) {
                                        if (COBRO.id === req.body.concepto) {
                                            return sequelize.query(
                                                "SELECT agil_cuenta_transaccion.saldo  \
                                                 from agil_cuenta_transaccion where id = (select MAX(agil_cuenta_transaccion.id) from agil_cuenta_transaccion where cuenta = "+ req.body.cuenta + " and empresa =" + req.params.id_empresa + ")",
                                                { type: sequelize.QueryTypes.SELECT, transaction: t }
                                            ).then(function (transaccion) {
                                                return Clase.find({
                                                    where: { nombre_corto: 'EN_TRANSITO' },
                                                    transaction: t
                                                }).then(function (estadoEnTransito) {
                                                    return CuentaTransaccion.find({
                                                        where: {
                                                            factura: req.body.factura,
                                                            id_concepto: req.body.concepto,
                                                            id_empresa: req.params.id_empresa
                                                        }
                                                    }).then(function (transaccionEncontrada) {
                                                        if (transaccionEncontrada) {
                                                            return Compra.find({
                                                                where: { id: req.body.compra.id },
                                                                include: [{
                                                                    model: Almacen, as: 'almacen',
                                                                    include: [{ model: Sucursal, as: 'sucursal' }]
                                                                }],
                                                                transaction: t
                                                            }).then(function (compraEncontrada) {
                                                                if (compraEncontrada.saldo > 0 && req.body.debe <= compraEncontrada.saldo) {
                                                                    return Compra.update({
                                                                        a_cuenta: compraEncontrada.a_cuenta + req.body.debe,
                                                                        saldo: compraEncontrada.total - (compraEncontrada.a_cuenta + req.body.debe)
                                                                    }, {
                                                                        where: {
                                                                            id: compraEncontrada.id
                                                                        },
                                                                        transaction: t
                                                                    }).then(function (affectedRows) {
                                                                        return PagoCompra.create({
                                                                            id_compra: compraEncontrada.id,
                                                                            a_cuenta_anterior: compraEncontrada.a_cuenta,
                                                                            saldo_anterior: compraEncontrada.saldo,
                                                                            monto_pagado: req.body.debe,
                                                                            id_usuario: req.params.id_usuario,
                                                                            numero_documento: compraEncontrada.almacen.sucursal.nota_recibo_correlativo
                                                                        }, {
                                                                            transaction: t
                                                                        }).then(function (pagoCompraCreada) {
                                                                            return Sucursal.update({
                                                                                nota_recibo_correlativo: compraEncontrada.almacen.sucursal.nota_recibo_correlativo + 1
                                                                            }, {
                                                                                where: {
                                                                                    id: compraEncontrada.almacen.sucursal.id
                                                                                },
                                                                                transaction: t
                                                                            }).then(function (affectedRows) {
                                                                                return crearTransaccionEgreso(req, t, estadoEnTransito, transaccion)
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
                                                                } else if (compraEncontrada.saldo == 0) {
                                                                    return new Promise(function (fulfill, reject) {
                                                                        reject('No se pueden realizar la transaccion, el saldo por pagar es 0.');
                                                                    });
                                                                } else if (req.body.debe > compraEncontrada.saldo) {
                                                                    return new Promise(function (fulfill, reject) {
                                                                        reject('No se pueden realizar la transaccion, el saldo por pagar es menor al monto pagado.');
                                                                    });
                                                                } else {
                                                                    return new Promise(function (fulfill, reject) {
                                                                        reject('No se pueden realizar la transaccion, error desconocido. rutas transacciones LN - 511');
                                                                    });
                                                                }
                                                            }).catch(function (err) {
                                                                return new Promise(function (fulfill, reject) {
                                                                    reject((err.stack !== undefined) ? err.stack : err);
                                                                });
                                                            })
                                                        } else {
                                                            return Compra.find({
                                                                where: { id: req.body.compra.id },
                                                                include: [{
                                                                    model: Almacen, as: 'almacen',
                                                                    include: [{ model: Sucursal, as: 'sucursal' }]
                                                                }],
                                                                transaction: t
                                                            }).then(function (compraEncontrada) {
                                                                if (compraEncontrada.saldo > 0 && req.body.debe <= compraEncontrada.saldo) {
                                                                    return Compra.update({
                                                                        a_cuenta: compraEncontrada.a_cuenta + req.body.debe,
                                                                        saldo: compraEncontrada.total - (compraEncontrada.a_cuenta + req.body.debe)
                                                                    }, {
                                                                        where: {
                                                                            id: compraEncontrada.id
                                                                        },
                                                                        transaction: t
                                                                    }).then(function (affectedRows) {
                                                                        return PagoCompra.create({
                                                                            id_compra: compraEncontrada.id,
                                                                            a_cuenta_anterior: compraEncontrada.a_cuenta,
                                                                            saldo_anterior: compraEncontrada.saldo,
                                                                            monto_pagado: req.body.debe,
                                                                            id_usuario: req.params.id_usuario,
                                                                            numero_documento: compraEncontrada.almacen.sucursal.nota_recibo_correlativo
                                                                        }, {
                                                                            transaction: t
                                                                        }).then(function (pagoCompraCreada) {
                                                                            return Sucursal.update({
                                                                                nota_recibo_correlativo: compraEncontrada.almacen.sucursal.nota_recibo_correlativo + 1
                                                                            }, {
                                                                                where: {
                                                                                    id: compraEncontrada.almacen.sucursal.id
                                                                                },
                                                                                transaction: t
                                                                            }).then(function (affectedRows) {
                                                                                return crearTransaccionEgreso(req, t, estadoEnTransito, transaccion)
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
                                                                } else if (compraEncontrada.saldo == 0) {
                                                                    return new Promise(function (fulfill, reject) {
                                                                        reject('No se pueden realizar la transaccion, el saldo por pagar es 0.');
                                                                    });
                                                                } else if (req.body.debe > compraEncontrada.saldo) {
                                                                    return new Promise(function (fulfill, reject) {
                                                                        reject('No se pueden realizar la transaccion, el saldo por pagar es menor al monto pagado.');
                                                                    });
                                                                } else {
                                                                    return new Promise(function (fulfill, reject) {
                                                                        reject('No se pueden realizar la transaccion, error desconocido. rutas transacciones LN - 511');
                                                                    });
                                                                }
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
                                                reject('No se puede hacer el egreso con concepto de cobro (ingreso).');
                                            });
                                        }
                                    }).catch(function (err) {
                                        return new Promise(function (fulfill, reject) {
                                            reject((err.stack !== undefined) ? err.stack : err);
                                        });
                                    })
                                }
                            } else {
                                return new Promise(function (fulfill, reject) {
                                    reject('No se pueden realizar egresos, la cuenta no cuenta con saldo inicial.');
                                });
                            }
                        }).catch(function (err) {
                            return new Promise(function (fulfill, reject) {
                                reject((err.stack !== undefined) ? err.stack : err);
                            });
                        })
                    })
                )
                return Promise.all(promisse);
            }).then(function (transaccionCreada) {
                if (transaccionCreada !== undefined) {
                    res.json({ mensaje: 'Transacción completada.' })
                } else {
                    throw new Error('Se produjo un error y no se puede asegurar los datos, los cambios no fueron revertidos.');
                }
            }).catch(function (err) {
                res.json({ mensaje: (err.stack !== undefined) ? err.stack : err, hasErr: true })
            })
        }); */

    //Start paginador
    router.route('/transacciones/inicio/bancos/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/nombre/:texto_nombre/cta/:id_cuenta/desde/:desde/hasta/:hasta/concepto/:concepto/ref_doc/:ref_doc/tipo_doc/:tipo_doc/estado/:estado')
        .get(ensureAuthorizedAdministrador, function (req, res) {
            var condicionTransaccion = {};
            var clientes = []
            var proveedores = []
            condicionTransaccion.id_empresa = req.params.id_empresa
            var condicionNombre = { razon_social: { $like: '%' + '%' } }

            if (req.params.id_cuenta != 0) {
                condicionTransaccion.id_cuenta = req.params.id_cuenta
            }
            if (req.params.concepto != 0) {
                condicionTransaccion.concepto = req.params.concepto
            }
            if (req.params.ref_doc != 0) {
                condicionTransaccion.ref_doc = req.params.ref_doc
            }
            if (req.params.tipo_doc != 0) {
                condicionTransaccion.tipo_doc = req.params.tipo_doc
            }
            if (req.params.estado != 0) {
                condicionTransaccion.estado = req.params.estado
            }
            var desde = false
            var hasta = false
            if (req.params.desde != "0") {
                var inicio = new Date(req.params.desde.split('/').reverse()); inicio.setHours(0, 0, 0, 0, 0);
                desde = true
            }
            if (req.params.hasta != "0") {
                var fin = new Date(req.params.hasta.split('/').reverse()); fin.setHours(23, 59, 59, 0, 0);
                hasta = true
            }
            if (desde && hasta) {
                condicionTransaccion.fecha = { $between: [inicio, fin] }

            } else if (desde && !hasta) {
                condicionTransaccion.fecha = {
                    $gte: [inicio]
                }
            } else if (!desde && hasta) {
                condicionTransaccion.fecha = {
                    $lte: [fin]
                }
            } else if (!desde && !hasta) {
                // var hoy = new Date()
                // condicion.fecha = {
                // }
            }
            if (req.params.items_pagina == 0) {
                if (req.params.texto_nombre != 0) {
                    var ids = []
                    condicionNombre.razon_social = { $like: '%' + req.params.texto_nombre + '%' }
                    Cliente.findAll({
                        where: condicionNombre,
                        include: [
                            { model: CuentaTransaccion, as: 'transacciones' }
                        ]
                    }).then(function (clientes) {
                        Proveedor.findAll({
                            where: condicionNombre,
                            include: [
                                { model: CuentaTransaccion, as: 'transacciones' }
                            ]
                        }).then(function (proveedores) {
                            var transIds = []
                            var transCli = []
                            var vproveedores = []
                            var transProv = []
                            clientes.map(function (cliente) {
                                transCli = cliente.transacciones.map(function (transaccion) {
                                    return transaccion.id
                                })
                                Array.prototype.push.apply(transIds, transCli)
                            })
                            proveedores.map(function (proveedor) {
                                transProv = proveedor.transacciones.map(function (transaccion) {
                                    return transacciones.id
                                })
                                Array.prototype.push.apply(transIds, transProv)
                            })
                            condicionTransaccion.id = { $in: transIds }

                            CuentaTransaccion.findAndCountAll({
                                where: condicionTransaccion,
                                include: [
                                    {
                                        model: Cliente, as: 'cliente', where: { id: { $in: ids } }, required: false,
                                        include: [{ model: ClienteRazon, as: 'clientes_razon' }]
                                    },
                                    {
                                        model: Proveedor, as: 'proveedor', where: { id: { $in: ids } }, required: false,
                                        include: [{ model: ProveedorCuenta, as: 'proveedorCuentas', include: [{ model: Clase, as: 'tipo' }] }]
                                    }
                                ]
                            }).then(function (data) {
                                CuentaTransaccion.findAll({
                                    where: condicionTransaccion,
                                    include: [
                                        {
                                            model: Banco, as: 'cuenta',
                                            include: [{ model: Clase, as: 'tipoCuenta' }, { model: Clase, as: 'tipoMoneda' }]
                                        },
                                        {
                                            model: Cliente, as: 'cliente',
                                            include: [{ model: ClienteRazon, as: 'clientes_razon' }]
                                        },
                                        {
                                            model: Proveedor, as: 'proveedor',
                                            include: [{ model: ProveedorCuenta, as: 'proveedorCuentas', include: [{ model: Clase, as: 'tipo' }] }]
                                        },
                                        {
                                            model: Clase, as: 'concepto'
                                        },
                                        {
                                            model: Clase, as: 'tipo_documento'
                                        },
                                        {
                                            model: Clase, as: 'estado'
                                        },
                                        {
                                            model: TransaccionSeguimiento, as: 'seguimientos',
                                            include: [{ model: MedicoPaciente, as: 'entregado_por' }, { model: MedicoPaciente, as: 'devuelto_a' }]
                                        }
                                    ],
                                    order: [['id', 'asc']]
                                }).then(function (transacciones) {
                                    res.json({ transacciones: transacciones, paginas: Math.ceil(data.count / req.params.items_pagina) });
                                }).catch(function (err) {
                                    res.json({ mensaje: err.stack, paginas: 0, hasErr: true, transacciones: [] });
                                })
                            }).catch(function (err) {
                                res.json({ mensaje: err.stack, paginas: 0, hasErr: true, transacciones: [] });
                            })
                        }).catch(function (err) {
                            res.json({ mensaje: err.stack, paginas: 0, hasErr: true, transacciones: [] });
                        })
                    }).catch(function (err) {
                        res.json({ mensaje: err.stack, paginas: 0, hasErr: true, transacciones: [] });
                    })
                } else {
                    CuentaTransaccion.findAndCountAll({
                        where: condicionTransaccion,
                    }).then(function (data) {
                        CuentaTransaccion.findAll({
                            where: condicionTransaccion,
                            include: [
                                {
                                    model: Banco, as: 'cuenta',
                                    include: [{ model: Clase, as: 'tipoCuenta' }, { model: Clase, as: 'tipoMoneda' }]
                                },
                                {
                                    model: Cliente, as: 'cliente',
                                    include: [{ model: ClienteRazon, as: 'clientes_razon', required: false }]
                                },
                                {
                                    model: Proveedor, as: 'proveedor',
                                    include: [{ model: ProveedorCuenta, as: 'proveedorCuentas', required: false, include: [{ model: Clase, as: 'tipo' }] }]
                                },
                                {
                                    model: Clase, as: 'concepto'
                                },
                                {
                                    model: Clase, as: 'tipo_documento'
                                },
                                {
                                    model: Clase, as: 'estado'
                                },
                                {
                                    model: TransaccionSeguimiento, as: 'seguimientos',
                                    include: [{ model: MedicoPaciente, as: 'entregado_por' }, { model: MedicoPaciente, as: 'devuelto_a' }]
                                }
                            ],
                            order: [['id', 'asc']]
                        }).then(function (transacciones) {
                            res.json({ transacciones: transacciones, paginas: 1 });
                        }).catch(function (err) {
                            res.json({ mensaje: err.stack, paginas: 0, hasErr: true, transacciones: [] });
                        })
                    }).catch(function (err) {
                        res.json({ mensaje: err.stack, paginas: 0, hasErr: true, transacciones: [] });
                    })
                }
            } else {
                if (req.params.texto_nombre != 0) {
                    var ids = []
                    condicionNombre.razon_social = { $like: '%' + req.params.texto_nombre + '%' }
                    Cliente.findAll({
                        where: condicionNombre,
                        include: [
                            { model: CuentaTransaccion, as: 'transacciones' }
                        ]
                    }).then(function (clientes) {
                        Proveedor.findAll({
                            where: condicionNombre,
                            include: [
                                { model: CuentaTransaccion, as: 'transacciones' }
                            ]
                        }).then(function (proveedores) {
                            var transIds = []
                            var transCli = []
                            var vproveedores = []
                            var transProv = []
                            clientes.map(function (cliente) {
                                transCli = cliente.transacciones.map(function (transaccion) {
                                    return transaccion.id
                                })
                                Array.prototype.push.apply(transIds, transCli)
                            })
                            proveedores.map(function (proveedor) {
                                transProv = proveedor.transacciones.map(function (transaccion) {
                                    return transacciones.id
                                })
                                Array.prototype.push.apply(transIds, transProv)
                            })
                            condicionTransaccion.id = { $in: transIds }

                            CuentaTransaccion.findAndCountAll({
                                where: condicionTransaccion,
                                include: [
                                    {
                                        model: Cliente, as: 'cliente', where: { id: { $in: ids } }, required: false,
                                        include: [{ model: ClienteRazon, as: 'clientes_razon' }]
                                    },
                                    {
                                        model: Proveedor, as: 'proveedor', where: { id: { $in: ids } }, required: false,
                                        include: [{ model: ProveedorCuenta, as: 'proveedorCuentas', include: [{ model: Clase, as: 'tipo' }] }]
                                    }
                                ]
                            }).then(function (data) {
                                CuentaTransaccion.findAll({
                                    offset: (req.params.items_pagina * (req.params.pagina - 1)), limit: req.params.items_pagina,
                                    where: condicionTransaccion,
                                    include: [
                                        {
                                            model: Banco, as: 'cuenta',
                                            include: [{ model: Clase, as: 'tipoCuenta' }, { model: Clase, as: 'tipoMoneda' }]
                                        },
                                        {
                                            model: Cliente, as: 'cliente',
                                            include: [{ model: ClienteRazon, as: 'clientes_razon' }]
                                        },
                                        {
                                            model: Proveedor, as: 'proveedor',
                                            include: [{ model: ProveedorCuenta, as: 'proveedorCuentas', include: [{ model: Clase, as: 'tipo' }] }]
                                        },
                                        {
                                            model: Clase, as: 'concepto'
                                        },
                                        {
                                            model: Clase, as: 'tipo_documento'
                                        },
                                        {
                                            model: Clase, as: 'estado'
                                        },
                                        {
                                            model: TransaccionSeguimiento, as: 'seguimientos',
                                            include: [{ model: MedicoPaciente, as: 'entregado_por' }, { model: MedicoPaciente, as: 'devuelto_a' }]
                                        }
                                    ],
                                    order: [['id', 'asc']]
                                }).then(function (transacciones) {
                                    res.json({ transacciones: transacciones, paginas: Math.ceil(data.count / req.params.items_pagina) });
                                }).catch(function (err) {
                                    res.json({ mensaje: err.stack, paginas: 0, hasErr: true, transacciones: [] });
                                })
                            }).catch(function (err) {
                                res.json({ mensaje: err.stack, paginas: 0, hasErr: true, transacciones: [] });
                            })
                        }).catch(function (err) {
                            res.json({ mensaje: err.stack, paginas: 0, hasErr: true, transacciones: [] });
                        })
                    }).catch(function (err) {
                        res.json({ mensaje: err.stack, paginas: 0, hasErr: true, transacciones: [] });
                    })
                } else {
                    CuentaTransaccion.findAndCountAll({
                        where: condicionTransaccion,
                    }).then(function (data) {
                        CuentaTransaccion.findAll({
                            offset: (req.params.items_pagina * (req.params.pagina - 1)), limit: req.params.items_pagina,
                            where: condicionTransaccion,
                            include: [
                                {
                                    model: Banco, as: 'cuenta',
                                    include: [{ model: Clase, as: 'tipoCuenta' }, { model: Clase, as: 'tipoMoneda' }]
                                },
                                {
                                    model: Cliente, as: 'cliente',
                                    include: [{ model: ClienteRazon, as: 'clientes_razon', required: false }]
                                },
                                {
                                    model: Proveedor, as: 'proveedor',
                                    include: [{ model: ProveedorCuenta, as: 'proveedorCuentas', required: false, include: [{ model: Clase, as: 'tipo' }] }]
                                },
                                {
                                    model: Clase, as: 'concepto'
                                },
                                {
                                    model: Clase, as: 'tipo_documento'
                                },
                                {
                                    model: Clase, as: 'estado'
                                },
                                {
                                    model: TransaccionSeguimiento, as: 'seguimientos',
                                    include: [{ model: MedicoPaciente, as: 'entregado_por' }, { model: MedicoPaciente, as: 'devuelto_a' }]
                                }
                            ],
                            order: [['id', 'asc']]
                        }).then(function (transacciones) {
                            res.json({ transacciones: transacciones, paginas: Math.ceil(data.count / req.params.items_pagina) });
                        }).catch(function (err) {
                            res.json({ mensaje: err.stack, paginas: 0, hasErr: true, transacciones: [] });
                        })
                    }).catch(function (err) {
                        res.json({ mensaje: err.stack, paginas: 0, hasErr: true, transacciones: [] });
                    })
                }
            }
        });

        router.route('/transacciones/bancos/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/nombre/:texto_nombre/cta/:id_cuenta/desde/:desde/hasta/:hasta/concepto/:concepto/ref_doc/:ref_doc/tipo_doc/:tipo_doc/estado/:estado')
        .get(ensureAuthorizedAdministrador, function (req, res) {
            var condicionTransaccion = {};
            var clientes = []
            var proveedores = []
            condicionTransaccion.id_empresa = req.params.id_empresa
            var condicionNombre = { razon_social: { $like: '%' + '%' } }

            if (req.params.id_cuenta != 0) {
                condicionTransaccion.id_cuenta = req.params.id_cuenta
            }
            if (req.params.concepto != 0) {
                condicionTransaccion.concepto = req.params.concepto
            }
            if (req.params.ref_doc != 0) {
                condicionTransaccion.ref_doc = req.params.ref_doc
            }
            if (req.params.tipo_doc != 0) {
                condicionTransaccion.tipo_doc = req.params.tipo_doc
            }
            if (req.params.estado != 0) {
                condicionTransaccion.estado = req.params.estado
            }
            var desde = false
            var hasta = false
            var fechaIncio = null
            if (req.params.desde != "0") {
                var inicio = new Date(req.params.desde.split('/').reverse()); inicio.setHours(0, 0, 0, 0, 0);
                desde = true
                fechaIncio = inicio
            }
            if (req.params.hasta != "0") {
                var fin = new Date(req.params.hasta.split('/').reverse()); fin.setHours(23, 59, 0, 0, 0);
                hasta = true
            }
            if (desde && hasta) {
                condicionTransaccion.fecha = { $between: [inicio, fin] }

            } else if (desde && !hasta) {
                condicionTransaccion.fecha = {
                    $gte: [inicio]
                }
            } else if (!desde && hasta) {
                condicionTransaccion.fecha = {
                    $lte: [fin]
                }
            } else if (!desde && !hasta) {
                // var hoy = new Date()
                // condicion.fecha = {
                // }
            }
            if (req.params.items_pagina == 0) {
                if (req.params.texto_nombre != 0) {
                    var ids = []
                    condicionNombre.razon_social = { $like: '%' + req.params.texto_nombre + '%' }
                    Cliente.findAll({
                        where: condicionNombre,
                        include: [
                            { model: CuentaTransaccion, as: 'transacciones' }
                        ]
                    }).then(function (clientes) {
                        Proveedor.findAll({
                            where: condicionNombre,
                            include: [
                                { model: CuentaTransaccion, as: 'transacciones' }
                            ]
                        }).then(function (proveedores) {
                            var transIds = []
                            var transCli = []
                            var vproveedores = []
                            var transProv = []
                            clientes.map(function (cliente) {
                                transCli = cliente.transacciones.map(function (transaccion) {
                                    return transaccion.id
                                })
                                Array.prototype.push.apply(transIds, transCli)
                            })
                            proveedores.map(function (proveedor) {
                                transProv = proveedor.transacciones.map(function (transaccion) {
                                    return transacciones.id
                                })
                                 Array.prototype.push.apply(transIds,transProv)
                            })
                            condicionTransaccion.id = { $in: transIds }

                            CuentaTransaccion.findAndCountAll({
                                where: condicionTransaccion,
                                include: [
                                    {
                                        model: Cliente, as: 'cliente', where: { id: { $in: ids } }, required: false,
                                        include: [{ model: ClienteRazon, as: 'clientes_razon' }]
                                    },
                                    {
                                        model: Proveedor, as: 'proveedor', where: { id: { $in: ids } }, required: false,
                                        include: [{ model: ProveedorCuenta, as: 'proveedorCuentas', include: [{ model: Clase, as: 'tipo' }] }]
                                    }
                                ]
                            }).then(function (data) {
                                CuentaTransaccion.findAll({
                                    
                                    where: condicionTransaccion,
                                    include: [
                                        {
                                            model: Banco, as: 'cuenta',
                                            include: [{ model: Clase, as: 'tipoCuenta' }, { model: Clase, as: 'tipoMoneda' }]
                                        },
                                        {
                                            model: Cliente, as: 'cliente',
                                            include: [{ model: ClienteRazon, as: 'clientes_razon' }]
                                        },
                                        {
                                            model: Proveedor, as: 'proveedor',
                                            include: [{ model: ProveedorCuenta, as: 'proveedorCuentas', include: [{ model: Clase, as: 'tipo' }] }]
                                        },
                                        {
                                            model: Clase, as: 'concepto'
                                        },
                                        {
                                            model: Clase, as: 'tipo_documento'
                                        },
                                        {
                                            model: Clase, as: 'estado'
                                        },
                                        {
                                            model: TransaccionSeguimiento, as: 'seguimientos',
                                            include: [{ model: MedicoPaciente, as: 'entregado_por' }, { model: MedicoPaciente, as: 'devuelto_a' }]
                                        }
                                    ],
                                    order: [['id', 'asc']]
                                }).then(function (transacciones) {
                                    res.json({ transacciones: transacciones, paginas: Math.ceil(data.count / req.params.items_pagina) });
                                }).catch(function (err) {
                                    res.json({ mensaje: err.stack, paginas: 0, hasErr: true, transacciones: [] });
                                })
                            }).catch(function (err) {
                                res.json({ mensaje: err.stack, paginas: 0, hasErr: true, transacciones: [] });
                            })
                        }).catch(function (err) {
                            res.json({ mensaje: err.stack, paginas: 0, hasErr: true, transacciones: [] });
                        })
                    }).catch(function (err) {
                        res.json({ mensaje: err.stack, paginas: 0, hasErr: true, transacciones: [] });
                    })
                } else {
                    CuentaTransaccion.findAndCountAll({
                        where: condicionTransaccion,
                    }).then(function (data) {
                        CuentaTransaccion.findAll({
                            where: condicionTransaccion,
                            include: [
                                {
                                    model: Banco, as: 'cuenta',
                                    include: [{ model: Clase, as: 'tipoCuenta' }, { model: Clase, as: 'tipoMoneda' }]
                                },
                                {
                                    model: Cliente, as: 'cliente',
                                    include: [{ model: ClienteRazon, as: 'clientes_razon', required: false }]
                                },
                                {
                                    model: Proveedor, as: 'proveedor',
                                    include: [{ model: ProveedorCuenta, as: 'proveedorCuentas', required: false, include: [{ model: Clase, as: 'tipo' }] }]
                                },
                                {
                                    model: Clase, as: 'concepto'
                                },
                                {
                                    model: Clase, as: 'tipo_documento'
                                },
                                {
                                    model: Clase, as: 'estado'
                                },
                                {
                                    model: TransaccionSeguimiento, as: 'seguimientos',
                                    include: [{ model: MedicoPaciente, as: 'entregado_por' }, { model: MedicoPaciente, as: 'devuelto_a' }]
                                }
                            ],
                            order: [['id', 'asc']]
                        }).then(function (transacciones) {
                            res.json({ transacciones: transacciones, paginas: 1 });
                        }).catch(function (err) {
                            res.json({ mensaje: err.stack, paginas: 0, hasErr: true, transacciones: [] });
                        })
                    }).catch(function (err) {
                        res.json({ mensaje: err.stack, paginas: 0, hasErr: true, transacciones: [] });
                    })
                }
            } else {
                if (req.params.texto_nombre != 0) {
                    var ids = []
                    condicionNombre.razon_social = { $like: '%' + req.params.texto_nombre + '%' }
                    Cliente.findAll({
                        where: condicionNombre,
                        include: [
                            { model: CuentaTransaccion, as: 'transacciones' }
                        ]
                    }).then(function (clientes) {
                        Proveedor.findAll({
                            where: condicionNombre,
                            include: [
                                { model: CuentaTransaccion, as: 'transacciones' }
                            ]
                        }).then(function (proveedores) {
                            var transIds = []
                            var transCli = []
                            var vproveedores = []
                            var transProv = []
                            clientes.map(function (cliente) {
                                transCli = cliente.transacciones.map(function (transaccion) {
                                    return transaccion.id
                                })
                                Array.prototype.push.apply(transIds, transCli)
                            })
                            proveedores.map(function (proveedor) {
                                transProv = proveedor.transacciones.map(function (transaccion) {
                                    return transaccion.id
                                })
                                Array.prototype.push.apply(transIds, transProv)
                            })
                            condicionTransaccion.id = { $in: transIds }

                            CuentaTransaccion.findAndCountAll({
                                where: condicionTransaccion,
                                include: [
                                    {
                                        model: Cliente, as: 'cliente', where: { id: { $in: ids } }, required: false,
                                        include: [{ model: ClienteRazon, as: 'clientes_razon' }]
                                    },
                                    {
                                        model: Proveedor, as: 'proveedor', where: { id: { $in: ids } }, required: false,
                                        include: [{ model: ProveedorCuenta, as: 'proveedorCuentas', include: [{ model: Clase, as: 'tipo' }] }]
                                    }
                                ]
                            }).then(function (data) {
                                CuentaTransaccion.findAll({
                                    offset: (req.params.items_pagina * (req.params.pagina - 1)), limit: req.params.items_pagina,
                                    where: condicionTransaccion,
                                    include: [
                                        {
                                            model: Banco, as: 'cuenta',
                                            include: [{ model: Clase, as: 'tipoCuenta' }, { model: Clase, as: 'tipoMoneda' }]
                                        },
                                        {
                                            model: Cliente, as: 'cliente',
                                            include: [{ model: ClienteRazon, as: 'clientes_razon' }]
                                        },
                                        {
                                            model: Proveedor, as: 'proveedor',
                                            include: [{ model: ProveedorCuenta, as: 'proveedorCuentas', include: [{ model: Clase, as: 'tipo' }] }]
                                        },
                                        {
                                            model: Clase, as: 'concepto'
                                        },
                                        {
                                            model: Clase, as: 'tipo_documento'
                                        },
                                        {
                                            model: Clase, as: 'estado'
                                        },
                                        {
                                            model: TransaccionSeguimiento, as: 'seguimientos',
                                            include: [{ model: MedicoPaciente, as: 'entregado_por' }, { model: MedicoPaciente, as: 'devuelto_a' }]
                                        }
                                    ],
                                    order: [['id', 'asc']]
                                }).then(function (transacciones) {
                                    res.json({ transacciones: transacciones, paginas: Math.ceil(data.count / req.params.items_pagina) });
                                }).catch(function (err) {
                                    res.json({ mensaje: err.stack, paginas: 0, hasErr: true, transacciones: [] });
                                })
                            }).catch(function (err) {
                                res.json({ mensaje: err.stack, paginas: 0, hasErr: true, transacciones: [] });
                            })
                        }).catch(function (err) {
                            res.json({ mensaje: err.stack, paginas: 0, hasErr: true, transacciones: [] });
                        })
                    }).catch(function (err) {
                        res.json({ mensaje: err.stack, paginas: 0, hasErr: true, transacciones: [] });
                    })
                } else {
                    CuentaTransaccion.findAndCountAll({
                        where: condicionTransaccion,
                    }).then(function (data) {
                        CuentaTransaccion.find({
                            where:{
                                id_empresa: req.params.id_empresa,
                                id_cuenta: req.params.id_cuenta
                            },
                            include:[{
                                    model: Clase, as: 'concepto',
                                    where:{nombre_corto: 'SAL_INICIAL'}
                                }]
                        }).then(function (saldInicial) {
                            var fechaIncCalc = null
                            if (req.params.desde != "0") { 
                                var fechaIncioCalc =  new Date(req.params.desde.split('/').reverse()); 
                                    fechaIncioCalc.setDate(fechaIncioCalc.getDate() - 1)
                                var fechaIncioCalculadoo = fechaIncioCalc.toISOString();
                                 fechaIncCalc = fechaIncioCalculadoo.split('T')[0] + ' 23:59:59'                                
                            }

                            sequelize.query("SELECT\
                            IFNULL(SUM(haber),0) - IFNULL(SUM(debe),0)as saldoCalculado\
                            FROM agil_cuenta_transaccion\
                            WHERE\
                                cuenta = "+condicionTransaccion.cuenta+"\
                            AND empresa = "+condicionTransaccion.empresa+"\
                            AND fecha <= '"+fechaIncCalc+"'" , { type: sequelize.QueryTypes.SELECT
                            
                            }).then(function (saldObtenido) {
                                var totalLimit =req.params.items_pagina * (req.params.pagina - 1)
                                 CuentaTransaccion.findAll({
                                    offset: (totalLimit), limit: req.params.items_pagina,
                                    where: condicionTransaccion,
                                    include: [
                                        {
                                            model: Banco, as: 'cuenta',
                                            include: [{ model: Clase, as: 'tipoCuenta' }, { model: Clase, as: 'tipoMoneda' }]
                                        },
                                        {
                                            model: Cliente, as: 'cliente',
                                            include: [{ model: ClienteRazon, as: 'clientes_razon', required: false }]
                                        },
                                        {
                                            model: Proveedor, as: 'proveedor',
                                            include: [{ model: ProveedorCuenta, as: 'proveedorCuentas', required: false, include: [{ model: Clase, as: 'tipo' }] }]
                                        },
                                        {
                                            model: Clase, as: 'concepto'
                                        },
                                        {
                                            model: Clase, as: 'tipo_documento'
                                        },
                                        {
                                            model: Clase, as: 'estado'
                                        },
                                        {
                                            model: TransaccionSeguimiento, as: 'seguimientos',
                                            include: [{ model: MedicoPaciente, as: 'entregado_por' }, { model: MedicoPaciente, as: 'devuelto_a' }]
                                        }
                                    ],
                                    order: [['fecha', 'asc'], ['id', 'asc']] 
                                }).then(async function (transacciones) {
                                    if(totalLimit>0){
                                        const saldoLimitAnt =await CuentaTransaccion.findAll({
                                            where: condicionTransaccion,
                                            order: [['fecha', 'asc'], ['id', 'asc']],
                                            limit: totalLimit
                                        })
                                        var saldoLimitAntCalc = 0
                                        saldoLimitAnt.forEach(function(transaccion){
                                            saldoLimitAntCalc = saldoLimitAntCalc + ((transaccion.haber!=null?transaccion.haber:0) - (transaccion.debe!=null?transaccion.debe:0))
                                        })

                                        var saldAntFecha = saldInicial.saldo + saldObtenido[0].saldoCalculado + saldoLimitAntCalc;
                                        if(transacciones.length>0){
                                            transacciones.forEach(function(transaccion){
                                                transaccion.saldo = ((transaccion.haber!=null?transaccion.haber:0) - (transaccion.debe!=null?transaccion.debe:0)) + saldAntFecha 
                                                saldAntFecha = ((transaccion.haber!=null?transaccion.haber:0) - (transaccion.debe!=null?transaccion.debe:0)) + saldAntFecha
                                            })
                                        }
                                    }else{
                                        var saldAntFecha =(saldInicial? saldInicial.saldo : 0) + saldObtenido[0].saldoCalculado;
                                        var saldoAntFechaInicial = (saldInicial? saldInicial.saldo : 0) + saldObtenido[0].saldoCalculado;
                                        if(transacciones.length>0){
                                            transacciones.forEach(function(transaccion){
                                                transaccion.saldo = ((transaccion.haber!=null?transaccion.haber:0) - (transaccion.debe!=null?transaccion.debe:0)) + saldAntFecha 
                                                saldAntFecha = ((transaccion.haber!=null?transaccion.haber:0) - (transaccion.debe!=null?transaccion.debe:0)) + saldAntFecha
                                            })
                                        }
                                    }
                                    res.json({ transacciones: transacciones, saldoAntFechaInicial:saldoAntFechaInicial, saldAntFecha:saldAntFecha, paginas: Math.ceil(data.count / req.params.items_pagina) });
                                }).catch(function (err) {
                                    res.json({ mensaje: err.stack, paginas: 0, hasErr: true, transacciones: [] });
                                })                          
                            }).catch(function (err) {
                                res.json({ mensaje: err.stack, paginas: 0, hasErr: true, transacciones: [] });
                            })

                  }).catch(function (err) {
                            res.json({ mensaje: err.stack, paginas: 0, hasErr: true, transacciones: [] });
                        })
                    }).catch(function (err) {
                        res.json({ mensaje: err.stack, paginas: 0, hasErr: true, transacciones: [] });
                    })
                }
            }
        });
    //End paginador
    router.route('/transacciones/seguimiento/bancos/empresa/:id_empresa/:id_usuario')
        .post(function (req, res) {
            TransaccionSeguimiento.update({
                proveedor: req.body.proveedor,
                id_entregado: req.body.id_entregado,
                id_devuelto: req.body.id_devuelto,
                fecha_entrega: req.body.fecha_entrega,
                fecha_devolucion: req.body.fecha_devolucion,
                id_empresa: req.params.id_empresa,
                id_usuario: req.params.id_usuario,
                eliminado: false
            }, {
                where: { id: req.body.id }
            }).then(function (seguimientoActualizado) {
                res.json({ mensaje: 'Seguimiento actualizado correctamente.' })
            }).catch(function (err) {
                res.json({ mensaje: err.stack, hasErr: true });
            })
        })

    router.route('/transacciones/comprobante')
        .post(async (req, res) => {
            const concept = await CuentaTransaccion.find({
                include:[{model: Clase, as:'concepto'}],
                where: req.body.id
            })
            if(concept.concepto.nombre_corto == 'CTRAN'){
                CuentaTransaccion.find({
                    attributes: 
                        Object.keys(CuentaTransaccion.attributes).concat([[
                            sequelize.literal('`agil_cuenta_transaccion`.`cuenta`'), 'cuentaBancoAnterior'
                        ]]),
                    where: req.body.id,
                    include: [
                        {
                            model: Banco, as: 'cuenta',
                            include: [{ model: Clase, as: 'tipoCuenta' }, { model: Clase, as: 'tipoMoneda' }]
                        },
                        {
                            model: Clase, as: 'concepto'
                        },
                        {
                            model: Clase, as: 'tipo_documento'
                        },
                        {
                            model: Clase, as: 'estado'
                        },
                        {
                            model: DetalleTransaccion, as: 'detallesTransaccion',
                            attributes: 
                                    Object.keys(DetalleTransaccion.attributes).concat([[
                                        sequelize.literal('`detallesTransaccion`.`monto`'), 'montoAnterior'
                                    ]])
                                  ,
                            include : [{
                                model: Proforma, as : 'proforma',
                                attributes: 
                                    Object.keys(Proforma.attributes).concat([[
                                        sequelize.literal('`detallesTransaccion.proforma`.`a_cuenta`'), 'aCuentaAnterior'
                                    ]])
                                  , 
                                include:[{ model: Cliente, as: 'cliente' }]
                            }]
                        }
                    ],
                    order: [['id', 'asc']]
                }).then(function (transaccion) {
                    Proforma.findAll({
                        where: {
                            id: { $in: transaccion.ids_proformas.split(',') }
                        },
                        include: [
                            { model: DetallesProformas, as: 'detallesProformas', include: [{ model: Servicios, as: 'servicio' }, { model: Clase, as: 'centroCosto' }] },
                            { model: Cliente, as: 'cliente' }
                        ]
                    }).then((proformas) => {
                        res.json({ transaccion: transaccion, proformas: proformas })
                    })
                }).catch(function (err) {
                    res.json({ mensaje: err.stack, hasErr: true });
                })
            }
            if(concept.concepto.nombre_corto == 'SAL_INICIAL'){
                CuentaTransaccion.find({
                    attributes: 
                        Object.keys(CuentaTransaccion.attributes).concat([[
                            sequelize.literal('`agil_cuenta_transaccion`.`cuenta`'), 'cuentaBancoAnterior'
                        ]]),
                    where: req.body.id,
                    include: [
                        {model: Banco, as: 'cuenta',
                            include: [{ model: Clase, as: 'tipoCuenta' }, { model: Clase, as: 'tipoMoneda' }]},
                        {model: Clase, as: 'concepto'},
                        {model: Clase, as: 'tipo_documento'},
                        {model: Clase, as: 'estado'},
                        {model: DetalleTransaccion, as: 'detallesTransaccion'}
                    ],
                    order: [['id', 'asc']]
                }).then(function (transaccion) {
                        res.json({ transaccion: transaccion})
                }).catch(function (err) {
                    res.json({ mensaje: err.stack, hasErr: true });
                })
            }
            if(concept.concepto.nombre_corto == 'PTRAN'){
                CuentaTransaccion.find({
                    attributes: 
                    Object.keys(CuentaTransaccion.attributes).concat([[
                        sequelize.literal('`agil_cuenta_transaccion`.`cuenta`'), 'cuentaBancoAnterior'
                    ]]),
                    where:req.body.id ,
                    include: [
                        {model: Banco, as: 'cuenta',
                            include: [{ model: Clase, as: 'tipoCuenta' }, 
                                      { model: Clase, as: 'tipoMoneda' }]},
                        {model: DetalleTransaccion, as: 'detallesTransaccion',
                            attributes: 
                                Object.keys(DetalleTransaccion.attributes).concat([[
                                    sequelize.literal('`detallesTransaccion`.`monto`'), 'montoAnterior']]),
                            include: [{ model: Compra, as: 'compra',
                                attributes: 
                                Object.keys(Compra.attributes).concat([
                                    [sequelize.literal('`detallesTransaccion.compra`.`a_cuenta`'), 'aCuentaAnterior' ],
                                    [sequelize.literal('(`detallesTransaccion.compra`.`importe`) - (`detallesTransaccion.compra`.`descuento`)'), 'total' ]]), 
                                        include: [{model: Proveedor, as: 'proveedor'}, 
                                                  {model: DetalleCompraProgramacionPago,as: 'DetalleCompraProgramacionPago',
                                                   include:[{model: CompraProgramacionPago, as:'CompraProgramacionPago'},
                                                   {model: Clase, as:'estado', where:{nombre_corto: 'APRO'}, required: false},
                                                            ]
                                        }]
                                    }]
                        },
                        {model: Clase, as: 'concepto'},
                        {model: Clase, as: 'tipo_documento'},
                        {model: Clase, as: 'estado'},
                        {model: Proveedor, as: 'proveedor', 
                        include:[{model: CuentasBancoProveedor,as:'CuentasBancoProveedor', where:{predefinido: true, eliminado: false }, required: false,
                            include: [{ model: Clase, as: 'banco'}]
                            }]
                    }
                        
                    ],
                    order: [['id', 'asc']]
                }).then(function (transaccionesPago) {
                    res.json({transaccion: transaccionesPago})
                }).catch(function (err) {
                    res.json({ mensaje: err.stack, hasErr: true });
                })
            }
            

        })


    router.route('/transacciones/bancos/:id_banco')
        .get(ensureAuthorizedAdministrador, function (req, res) {
            Banco.find({
                where: {
                    id: req.params.id_banco
                },
                include: [{ model: Clase, as: 'tipoCuenta' }, { model: Clase, as: 'tipoMoneda' }]
            }).then(function (entity) {
                res.json(entity);
            });
        })

        .put(ensureAuthorizedlogged, function (req, res) {
            Banco.update({
                nombre: req.body.nombre,
                id_empresa: req.body.id_empresa,
                numero: req.body.numero,
                id_tipo_cuenta: req.body.tipoCuenta.id,
                id_tipo_moneda: req.body.tipoMoneda.id
            }, {
                where: {
                    id: req.body.id
                }
            }).then(function (bancoActualizado) {
                res.json({ "message": "Actualizado Satisfactoriamente!" });
            });
        })

        .delete(ensureAuthorizedAdministrador, function (req, res) {

        });

    router.route('/transacciones/seguimiento/Estados/empresa') ///:id_empresa/:id_usuario/:id_estado
        .put(ensureAuthorizedlogged, function (req, res) {
            Clase.find({
                where: { id: req.body.id_estado }//creo q seria directo - revisar
            }).then(function (estado) {
                if (estado) {
                    CuentaTransaccion.update({
                        id_estado: estado.id,
                        cerrada: true
                    }, {
                        where: { id: req.body.id }
                    }).then(async function (seguimientoActualizado) {
                        const datosTrans = await CuentaTransaccion.find({ /// datos de esa transaccion 
                            where:  { id: req.body.id },
                            include: [
                                {model: DetalleTransaccion, as: 'detallesTransaccion',
                                    include: [{ model: Compra, as: 'compra'}]
                                },
                                {model: Clase, as: 'concepto'}
                            ],
                            order: [['id', 'asc']]
                        })
                        if(datosTrans.concepto.nombre_corto == 'PTRAN'){
                            for (let i = 0; i < datosTrans.detallesTransaccion.length; i++) {
                                const  datosTransDetalle= datosTrans.detallesTransaccion[i];

                                const nroRecivo = await Compra.find({
                                    where: { id: datosTransDetalle.compra.id },
                                    include: [{
                                        model: Almacen, as: 'almacen',
                                        include: [{ model: Sucursal, as: 'sucursal' }]
                                    }]
                                })
                                const crearPagosComprasProgramdas = await PagoCompra.create({
                                    id_compra: datosTransDetalle.compra.id,
                                    a_cuenta_anterior: ((datosTransDetalle.compra.a_cuenta) - (datosTransDetalle.monto)),
                                    saldo_anterior: ((datosTransDetalle.compra.saldo) + (datosTransDetalle.monto)),
                                    monto_pagado: datosTransDetalle.monto,
                                    id_usuario: req.body.id_usuario,
                                    numero_documento: nroRecivo.almacen.sucursal.nota_recibo_correlativo,
                                    id_transaccion: datosTrans.id
                                })
                                const actualNroRecivo = await Sucursal.update({
									nota_recibo_correlativo: nroRecivo.almacen.sucursal.nota_recibo_correlativo + 1
								    }, {where: {id: nroRecivo.almacen.sucursal.id}
								})
                            }
                            res.json({ mensaje: 'Estado actualizado correctamente.' })
                        }else{
                            res.json({ mensaje: 'Estado actualizado correctamente.' })
                        }
                    }).catch(function (err) {
                        res.json({ mensaje: err.stack, hasErr: true });
                    })
                } else {
                    res.json({ mensaje: 'No se puede cambiar la información de estado, porque no se encuentra la información de los estados.' })
                }

            }).catch(function (err) {
                res.json({ mensaje: err.stack, hasErr: true });
            })

        })


    /////la de abajo creo que ya no es necesario ----- verifircar 
    router.route('/transacciones/revision/Estados/empresa') ///:id_empresa/:id_usuario/:id_trans
        .put(ensureAuthorizedlogged, function (req, res) {
            CuentaTransaccion.find({
                where: { id: req.body.id_trans },
                include: [
                    {
                        model: Clase, as: 'estado'
                    }
                ]
            }).then(function (transaccion) {
                Clase.find({
                    where: { id: transaccion.estado.id }
                }).then(function (estado) {
                    if (estado.nombre === "CONFIRMADO") {
                        CuentaTransaccion.update({
                            cerrada: true,
                            // id_empresa: req.params.id_empresa,
                            id_usuario: req.body.id_usuario,
                            // eliminado: false
                        }, {
                            where: { id: transaccion.id, id_empresa: req.body.id_empresa }
                        }).then(function (seguimientoActualizado) {
                            res.json({ mensaje: 'Transacción cerrada correctamente.' })
                        }).catch(function (err) {
                            res.json({ mensaje: err.stack, hasErr: true });
                        })
                    } else {
                        res.json({ mensaje: 'No se puede cerrar, la transacción no esta confirmada.' })
                    }
                })
            }).catch(function (err) {
                res.json({ mensaje: err.stack, hasErr: true });
            })
        })

    router.route('/transacciones/saldo/cuenta/empresa/:id_empresa/:id_cuenta/:fecha_desde/:fecha_hasta')
        .get(ensureAuthorizedlogged, function (req, res) {
            var desde = req.params.fecha_desde.split('/').reverse()//new Date(req.params.fecha_desde.split('/')[2],req.params.fecha_desde.split('/')[1] -1, req.params.fecha_desde.split('/')[0])
            var hasta = req.params.fecha_hasta.split('/').reverse()//new Date(req.params.fecha_hasta.split('/')[2],req.params.fecha_hasta.split('/')[1] -1, req.params.fecha_hasta.split('/')[0]-1)
            sequelize.query("SELECT MAX(agil_cuenta_transaccion.id), agil_cuenta_transaccion.saldo from agil_cuenta_transaccion where cuenta =" + req.params.id_cuenta + " and empresa =" + req.params.id_empresa + " GROUP BY agil_cuenta_transaccion.id", { type: sequelize.QueryTypes.SELECT })
                .then(function (dato) {
                    res.json({ cuenta: dato });
                }).catch(function (err) {
                    res.json({ mensaje: err.stack })
                })
        });

    router.route('/transacciones/saldo/disponible/empresa/:id_empresa/:id_cuenta/:fecha_desde/:fecha_hasta')
        .get(ensureAuthorizedlogged, function (req, res) {

            var saldoDisponible = 0
            sequelize.query("SELECT MIN(agil_cuenta_transaccion.id) as id, agil_cuenta_transaccion.debe, agil_cuenta_transaccion.haber, agil_cuenta_transaccion.saldo \
             from agil_cuenta_transaccion where cuenta = "+ req.params.id_cuenta + " and empresa =" + req.params.id_empresa + " and concepto in (select id from gl_clase where nombre_corto ='SAL_INICIAL')", { type: sequelize.QueryTypes.SELECT })
                .then(function (saldoInicial) {
                    sequelize.query("SELECT agil_cuenta_transaccion.id, agil_cuenta_transaccion.debe, agil_cuenta_transaccion.haber, agil_cuenta_transaccion.saldo \
                     from agil_cuenta_transaccion where cuenta = "+ req.params.id_cuenta + " and empresa =" + req.params.id_empresa + " and estado in (select id from gl_clase where nombre_corto = 'CONFIRMADO') and concepto in (select id from gl_clase where nombre_corto ='PTRAN' or nombre_corto = 'CTRAN')", { type: sequelize.QueryTypes.SELECT })
                        .then(function (transaccionesConfirmadas) {
                            saldoDisponible += saldoInicial[0].saldo
                            if (transaccionesConfirmadas.length > 0) {
                                transaccionesConfirmadas.forEach(function (transaccion, indx) {
                                    if (transaccion.debe !== null) {
                                        saldoDisponible -= transaccion.debe
                                    } else if (transaccion.haber !== null) {
                                        saldoDisponible += transaccion.haber
                                    }
                                    if (indx === transaccionesConfirmadas.length - 1) {
                                        res.json({ saldo: saldoDisponible });
                                    }
                                });
                            } else {
                                res.json({ saldo: (saldoDisponible !== NaN) ? saldoDisponible : 0 });
                            }

                        }).catch(function (err) {
                            res.json({ mensaje: err.stack, hasErr: true })
                        })
                    // res.json({ cuenta: dato });
                }).catch(function (err) {
                    res.json({ mensaje: err.stack })
                })

            // sequelize.query("SELECT MAX(agil_cuenta_transaccion.id), agil_cuenta_transaccion.saldo from agil_cuenta_transaccion where empresa =" + req.params.id_empresa + " and fecha BETWEEN " + ayer + " and " + hoy + "and estado = (select id from gl_clase where nombre_corto = CONFIRMADO)", { type: sequelize.QueryTypes.SELECT })
            //     .then(function (dato) {
            //         res.json({ cuenta: dato });
            //     }).catch(function (err) {
            //         res.json({ mensaje: err.stack })
            //     })
        });
    // Nueva de transacciones elfiltro, buscador lista todos los clientes
    router.route('/transacciones/saldo/proformas/empresa/:id_empresa')
        .get(ensureAuthorizedlogged, function (req, res) {
            var saldoDisponible = 0
            sequelize.query("SELECT gl_clase.id, gl_clase.nombre FROM gl_clase,gl_tipo where gl_tipo.nombre_corto='TIPA' and gl_clase.tipo=gl_tipo.id and gl_clase.nombre_corto= 'CRE'", { type: sequelize.QueryTypes.SELECT })
                .then(function (dato) {
                    sequelize.query(
                        "SELECT agil_proforma.id, agil_proforma.correlativo, agil_proforma.cliente,agil_cliente.razon_social, agil_proforma.factura, agil_proforma.monto, agil_proforma.a_cuenta, (agil_proforma.monto - agil_proforma.a_cuenta) as saldo  from agil_proforma LEFT JOIN agil_cliente ON agil_cliente.id = agil_proforma.cliente  where (agil_proforma.monto - agil_proforma.a_cuenta) > 0 and agil_proforma.empresa =" + req.params.id_empresa + " and agil_proforma.factura is not NULL and agil_proforma.eliminado = false and agil_proforma.tipo_pago = " + dato[0].id + "  GROUP BY agil_proforma.id ORDER BY agil_cliente.razon_social, agil_proforma.factura, agil_proforma.correlativo ASC ", { type: sequelize.QueryTypes.SELECT })
                        .then(function (proformas) {
                            res.json({ proformas: proformas })
                        }).catch(function (err) {
                            res.json({ hasErr: true, mensaje: err.stack })
                        })
                });
        });

// Nueva de transacciones elfiltro, buscador de clientes Act texto
        router.route('/busquedaTransaccion/empresa/:id_empresa/texto/:texto')
		.get(ensureAuthorizedlogged, function (req, res) {
			sequelize.query("SELECT gl_clase.id, gl_clase.nombre FROM gl_clase,gl_tipo where gl_tipo.nombre_corto='TIPA' and gl_clase.tipo=gl_tipo.id and gl_clase.nombre_corto= 'CRE'", { type: sequelize.QueryTypes.SELECT })
                .then(function (dato) {
                    let query  = req.params.texto
                    cliente = query.split('*')[0] 
                    n_factura = query.split('*')[1]
                    n_proforma = query.split('*')[2]
                    
                    if(n_factura == null){
                        n_factura = "";
                    }  
                    if(n_proforma == null){
                        n_proforma = "";
                    }
                    sequelize.query(
                        "SELECT agil_proforma.id, agil_proforma.correlativo, agil_proforma.cliente,agil_cliente.razon_social, agil_proforma.factura, agil_proforma.monto, agil_proforma.a_cuenta, (agil_proforma.monto - agil_proforma.a_cuenta) as saldo  from agil_proforma LEFT JOIN agil_cliente ON agil_cliente.id = agil_proforma.cliente  where (agil_proforma.monto - agil_proforma.a_cuenta) > 0 and agil_proforma.empresa =" + req.params.id_empresa + " and agil_proforma.factura is not NULL and agil_proforma.eliminado = false and agil_proforma.tipo_pago = " + dato[0].id + " AND agil_cliente.razon_social LIKE '%"+cliente+"%' AND agil_proforma.factura LIKE '"+n_factura+"%' AND agil_proforma.correlativo LIKE '"+n_proforma+"%' GROUP BY agil_proforma.id ORDER BY agil_cliente.razon_social,agil_proforma.factura, agil_proforma.correlativo ASC", { type: sequelize.QueryTypes.SELECT })
                        .then(function (proformas) {
                            res.json(proformas)
                        }).catch(function (err) {
                            res.json({ hasErr: true, mensaje: err.stack})
                        })
                });
		});
// busqueda x concepto de pagos 
        router.route('/busquedaTransaccionPago/empresa/:id_empresa/texto/:texto')
		.get(ensureAuthorizedlogged, function (req, res) {
            let query  = req.params.texto
            proveedor = query.split('*')[0]
            n_program = query.split('*')[1]
            if(n_program == null){
                n_program = "";
            }
            sequelize.query(
                "SELECT PP.id AS id_progPago, P.razon_social, C.proveedor, C.factura, C.total, C.a_cuenta, SUM(C.saldo) AS saldo, PP.correlativo AS correlatProgramPago\
                FROM  inv_detalle_compra_programacion_pago AS DPP\
                INNER JOIN inv_compra_programacion_pago AS PP ON DPP.id_programacion_pago = PP.id\
                INNER JOIN inv_compra AS C ON DPP.id_compra = C.id\
                INNER JOIN agil_proveedor AS P ON C.proveedor = P.id\
                INNER JOIN gl_clase  AS estado ON DPP.id_estado = estado.id\
                INNER JOIN gl_clase  AS tipoPagoComp ON C.tipo_pago = tipoPagoComp.id\
                WHERE\
                PP.id_empresa = " + req.params.id_empresa + "\
                AND C.saldo > 0\
                AND estado.nombre_corto = 'APRO'\
                AND tipoPagoComp.nombre_corto = 'CRE'\
                AND P.razon_social LIKE '%"+proveedor+"%'\
                AND PP.correlativo LIKE '%"+n_program+"%'\
                GROUP BY PP.correlativo, P.razon_social\
                ORDER BY PP.correlativo, P.razon_social, C.factura", { type: sequelize.QueryTypes.SELECT })
                .then(function (pagoProgramados) {
                    res.json(pagoProgramados)
                }).catch(function (err) {
                    res.json({ hasErr: true, mensaje: err.stack})
                })
		});

        router.route('/AgregarTransaccionPago/empresa/:id_empresa/:id_usuario')
		.post(function (req, res) {
                sequelize.query(
                    "SELECT PP.id AS id_progPago, P.razon_social, C.id as id_compra, C.proveedor, C.factura, C.fecha, (C.importe - C.descuento) AS total, C.a_cuenta, C.saldo, PP.correlativo AS correlatProgramPago, 0 as saldoAct, C.saldo as porPagar  \
                    FROM  inv_detalle_compra_programacion_pago AS DPP\
                    INNER JOIN inv_compra_programacion_pago AS PP ON DPP.id_programacion_pago = PP.id\
                    INNER JOIN inv_compra AS C ON DPP.id_compra = C.id\
                    INNER JOIN agil_proveedor AS P ON C.proveedor = P.id\
                    INNER JOIN gl_clase  AS estado ON DPP.id_estado = estado.id\
                    INNER JOIN gl_clase  AS tipoPagoComp ON C.tipo_pago = tipoPagoComp.id\
                    WHERE\
                    PP.id_empresa = " + req.params.id_empresa + "\
                    AND C.saldo > 0\
                    AND estado.nombre_corto = 'APRO'\
                    AND tipoPagoComp.nombre_corto = 'CRE'\
                    AND C.proveedor ="+req.body.proveedor+"\
                    AND PP.correlativo = "+req.body.correlatProgramPago+"\
                    ORDER BY PP.correlativo, P.razon_social, C.factura", { type: sequelize.QueryTypes.SELECT })
            .then(function (pagosProgramados) {
                res.json({ mensaje: 'Seguimiento actualizado correctamente.' , pagosProgramados: pagosProgramados})
            }).catch(function (err) {
                res.json({ mensaje: err.stack, hasErr: true });
            })
        }) 

        router.route('/AgregarTransaccionPagoEd/empresa/:id_empresa/:id_usuario')
		.post(function (req, res) {
                sequelize.query(
                    "SELECT PP.id AS id_progPago, P.razon_social, C.id as id_compra, C.proveedor, C.factura, C.fecha, (C.importe - C.descuento) AS total, C.a_cuenta, C.a_cuenta AS aCuentaAnterior,0 AS montoAnterior, C.saldo, PP.correlativo AS correlatProgramPago, 0 as saldoAct, C.saldo as porPagar  \
                    FROM  inv_detalle_compra_programacion_pago AS DPP\
                    INNER JOIN inv_compra_programacion_pago AS PP ON DPP.id_programacion_pago = PP.id\
                    INNER JOIN inv_compra AS C ON DPP.id_compra = C.id\
                    INNER JOIN agil_proveedor AS P ON C.proveedor = P.id\
                    INNER JOIN gl_clase  AS estado ON DPP.id_estado = estado.id\
                    INNER JOIN gl_clase  AS tipoPagoComp ON C.tipo_pago = tipoPagoComp.id\
                    WHERE\
                    PP.id_empresa = " + req.params.id_empresa + "\
                    AND C.saldo > 0\
                    AND estado.nombre_corto = 'APRO'\
                    AND tipoPagoComp.nombre_corto = 'CRE'\
                    AND C.proveedor ="+req.body.proveedor+"\
                    AND PP.correlativo = "+req.body.correlatProgramPago+"\
                    ORDER BY PP.correlativo, P.razon_social, C.factura", { type: sequelize.QueryTypes.SELECT })
            .then(function (pagosProgramados) {
                res.json({ mensaje: 'Seguimiento actualizado correctamente.' , pagosProgramados: pagosProgramados})
            }).catch(function (err) {
                res.json({ mensaje: err.stack, hasErr: true });
            })
        })

//Edicion de transacciones el filtro, buscador de clientes Act
    router.route('/transaccionesEdic/saldo/proformas/empresa/:id_empresa/cliente/:id_cliente')
        .get(ensureAuthorizedlogged, function (req, res) {
            var saldoDisponible = 0
            sequelize.query("SELECT gl_clase.id, gl_clase.nombre FROM gl_clase,gl_tipo where gl_tipo.nombre_corto='TIPA' and gl_clase.tipo=gl_tipo.id and gl_clase.nombre_corto= 'CRE'", { type: sequelize.QueryTypes.SELECT })
                .then(function (dato) {
                    sequelize.query(
                        "SELECT agil_proforma.id, agil_proforma.correlativo, agil_proforma.cliente,agil_cliente.razon_social, agil_proforma.factura, agil_proforma.monto, agil_proforma.monto AS montoAnterior, agil_proforma.a_cuenta, agil_proforma.a_cuenta AS aCuentaAnterior, (agil_proforma.monto - agil_proforma.a_cuenta) as saldo  from agil_proforma LEFT JOIN agil_cliente ON agil_cliente.id = agil_proforma.cliente  where (agil_proforma.monto - agil_proforma.a_cuenta) > 0 and agil_proforma.empresa =" + req.params.id_empresa + " and agil_proforma.factura is not NULL and agil_proforma.eliminado = false and agil_proforma.tipo_pago = " + dato[0].id + "  AND cliente = "+ req.params.id_cliente +" GROUP BY agil_proforma.id ORDER BY agil_proforma.factura, agil_proforma.correlativo ASC", { type: sequelize.QueryTypes.SELECT })
                        .then(function (proformas) {
                            res.json({ proformas: proformas })
                        }).catch(function (err) {
                            res.json({ hasErr: true, mensaje: err.stack })
                        })
                });
        });

    router.route('/transacciones/edicion/empresa/:id_empresa/:id_usuario')
       .post(ensureAuthorizedlogged, async (req, res) => {
            const datosConcepto = await Clase.find({
                where: { id: req.body.concepto.id }
            })
            const saldoAnterior = await CuentaTransaccion.find({//solo para obtener id anterior de transaccion
                where: {id_cuenta: req.body.cuenta.id, id:{$lt: req.body.id} },
                order: [['id', 'desc']],
                limit: 1
            })
            var ddebe = 0; 
            var hhaber = 0;  
            var saldoActual = 0

            if(datosConcepto.nombre_corto == 'CTRAN'){
                hhaber = req.body.totalGRL
                ddebe = 0;
                saldoActual = saldoAnterior.saldo + hhaber

                const transaccionEditar = await CuentaTransaccion.update({
                    fecha: req.body.fecha,
                    id_cuenta: req.body.cuenta.id,
                    detalle: req.body.detalle,
                    id_concepto: req.body.concepto.id,
                    observaciones: req.body.observaciones,
                    ref_doc: req.body.ref_doc + '',
                    tipo_doc: req.body.tipo_doc,
                    debe: ddebe,
                    haber: hhaber,
                    saldo: saldoActual
                }, {where: { id: req.body.id, id_empresa: req.body.id_empresa }})
    
                var proformasIds = [];
                for (let index = 0; index < req.body.detallesTransaccion.length; index++) {
                    const transacionDet = req.body.detallesTransaccion[index];
                    proformasIds.push(transacionDet.proforma.id)
                    if (transacionDet.id) { //Si tiene id modificar
                            const detalleTransActualizados = await DetalleTransaccion.update({
                                fecha: transacionDet.fecha,
                                monto: transacionDet.monto
                            }, {
                                where: {id: transacionDet.id}
                            })
                            const ProformaAcuenta = await Proforma.find({//para actualizar proformas a_cuenta
                                where: { id:transacionDet.proforma.id, id_empresa: req.body.id_empresa }
                            })
                            var acuentaActual = (ProformaAcuenta.a_cuenta - transacionDet.montoAnterior) + transacionDet.monto;
                            const modifProforma = await Proforma.update({
                                fecha_cobro: req.body.fecha,
                                a_cuenta: acuentaActual
                            }, {where: { id:transacionDet.proforma.id, id_empresa: req.body.id_empresa }
                            })
                    } else{//crear detalle 
                        const detalleTransCrear = await DetalleTransaccion.create({
                            id_transaccion: req.body.id,
                            fecha: req.body.fecha,
                            id_proforma: transacionDet.proforma.id,
                            monto: transacionDet.monto
                        }) 
                        const ProformaAcuenta = await Proforma.find({ //para actualizar proformas a_cuenta
                            where: { id:transacionDet.proforma.id, id_empresa: req.body.id_empresa }
                        })
                        var acuentaActualSinId = ProformaAcuenta.a_cuenta + transacionDet.monto;
                        const modifProforma = await Proforma.update({
                            fecha_cobro: req.body.fecha,
                            a_cuenta: acuentaActualSinId
                        }, {
                            where: { id:transacionDet.proforma.id, id_empresa: req.body.id_empresa }
                        })
                    }   
                }
                const modProformaIds = await CuentaTransaccion.update({//añadir ids 
                    ids_proformas: proformasIds.join(',')  
                    }, {where: { id: req.body.id, id_empresa: req.body.id_empresa }
                })
            }
            
            if(datosConcepto.nombre_corto == 'PTRAN'){
                hhaber = 0;
                ddebe = req.body.debe
                saldoActual = saldoAnterior.saldo - ddebe

                const doc_referencia = await CuentaTransaccion.update({//edicion de documento de referncia de pago aprovedores 
                    fecha: req.body.fecha,
                    id_cuenta: req.body.cuenta.id,
                    detalle: req.body.detalle,
                    id_concepto: req.body.concepto.id,
                    observaciones: req.body.observaciones,
                    ref_doc: req.body.ref_doc + '',
                    tipo_doc: req.body.tipo_doc,
                    debe: ddebe,
                    haber: hhaber,
                    saldo: saldoActual
                    }, {where: { id: req.body.id, id_empresa: req.body.id_empresa }
                })
                for (let index = 0; index < req.body.detallesTransaccion.length; index++) {
                    const transacionDet = req.body.detallesTransaccion[index];
                    //proformasIds.push(transacionDet.proforma.id)
                    if (transacionDet.id) { //Si tiene id modificar
                            const detalleTransActualizados = await DetalleTransaccion.update({
                                fecha: transacionDet.fecha,
                                monto: transacionDet.monto
                            }, {
                                where: {id: transacionDet.id}
                            })
                            const compraAcuenta = await Compra.find({//para actualizar compra - a_cuenta
                                where: { id:transacionDet.compra.id }//, id_empresa: req.body.id_empresa
                            })
                            var acuentaActual = (compraAcuenta.a_cuenta - transacionDet.montoAnterior) + transacionDet.monto;
                            const modifCompra = await Compra.update({
                                //fecha_cobro: req.body.fecha,
                                saldo: ((compraAcuenta.importe) - (compraAcuenta.descuento))-(acuentaActual),
                                a_cuenta: acuentaActual
                            }, {where: { id:transacionDet.compra.id }//, id_empresa: req.body.id_empresa
                            })
                    } else{//crear detalle 
                        const detalleTransCrear = await DetalleTransaccion.create({
                            id_transaccion: req.body.id,
                            fecha: req.body.fecha,
                            id_compra: transacionDet.compra.id,
                            monto: transacionDet.monto
                        }) 
                        const compraAcuenta = await Compra.find({ //para actualizar compras a_cuenta
                            where: { id:transacionDet.compra.id }//, id_empresa: req.body.id_empresa
                        })
                        var acuentaActualSinId = compraAcuenta.a_cuenta + transacionDet.monto;
                        const modifProforma = await Compra.update({
                            //fecha_cobro: req.body.fecha,
                            saldo: ((compraAcuenta.importe)-(compraAcuenta.descuento))-(acuentaActualSinId),
                            a_cuenta: acuentaActualSinId
                        }, {
                            where: { id:transacionDet.compra.id }//, id_empresa: req.body.id_empresa
                        })
                    }   
                }
                //return res.json({ mensaje: "Actualizado satisfactoriamente....." }); 
            }
            
            //// para actualizar saldos mayores al id
            const saldosAmodificar = await CuentaTransaccion.findAll({ 
                where: {id_cuenta: req.body.cuenta.id,id:{$gt: req.body.id}},
                order: [['id', 'asc']]
            })
            var saldoMod = saldoActual
            if(saldosAmodificar.length>0){
                for (let index = 0; index < saldosAmodificar.length; index++) {
                    const modifSaldo = saldosAmodificar[index];
                    if(modifSaldo.debe){
                        saldoMod = saldoMod - modifSaldo.debe
                    }
                    if (modifSaldo.haber) {
                        saldoMod = saldoMod + modifSaldo.haber
                    }
                    const saldosTransActualizados = await CuentaTransaccion.update({
                        saldo: saldoMod }, 
                        {where: { id: modifSaldo.id, id_empresa: req.body.id_empresa }
                    })
                }
            }
            // Modifican saldos del Banco Anterior
            if(req.body.cuentaBancoAnterior != req.body.cuenta.id){
               const saldoAnteriorBancoAnterior = await CuentaTransaccion.find({// saldo anterior de la cuenta del banco anterior
                    where: {id_cuenta: req.body.cuentaBancoAnterior, id:{ $lt: req.body.id}},
                    order: [['id', 'desc']],
                    limit: 1
                }) 
                const saldosAmodificarBancoAnterior = await CuentaTransaccion.findAll({//lista de transaciones mayores al id
                    where: {id_cuenta: req.body.cuentaBancoAnterior, id:{ $gt: req.body.id }},
                    order: [['id', 'asc']]
                })

                var saldoModBancoAnterior = saldoAnteriorBancoAnterior.saldo
                if(saldosAmodificarBancoAnterior.length>0){ // modifica todas las transacciones mayores de 
                    for (let index = 0; index < saldosAmodificarBancoAnterior.length; index++) {
                        const modifSaldoBanco = saldosAmodificarBancoAnterior[index];
                        if(modifSaldoBanco.debe){
                            saldoModBancoAnterior = saldoModBancoAnterior - modifSaldoBanco.debe
                        }
                        if (modifSaldoBanco.haber) {
                            saldoModBancoAnterior = saldoModBancoAnterior + modifSaldoBanco.haber
                        }
                        const saldosTransActualizados = await CuentaTransaccion.update({
                            saldo: saldoModBancoAnterior
                            }, {where: { id: modifSaldoBanco.id, id_empresa: req.body.id_empresa }
                        })
                    }
                    res.json({ mensaje: "Actualizado satisfactoriamente....." });  
                }else{
                    res.json({ mensaje: "Actualizado satisfactoriamente....." });  
                }
            }else{
                res.json({ mensaje: "Actualizado satisfactoriamente....." }); 
            }
        })

    router.route('/EliminacionTransacciones/edicion')
        .post(async function (req, res) {
            const datosConcepto = await Clase.find({
                where: { id: req.body.transaccion.concepto.id }
            })
            //eliminacion de detalle transaccion
            DetalleTransaccion.destroy({
                where: {id: req.body.detalle.id}
                }).then(async function (eliminado) {
                    var debe = 0; 
                    var haber = 0;  
                    var saldoActual = 0
                    if(datosConcepto.nombre_corto == 'CTRAN'){
                        //modificacion columna a_cuenta de proformas
                        const ProformaAcuenta = await Proforma.find({
                            where: { id:req.body.detalle.proforma.id}
                        })
                        var acuentaActual = ProformaAcuenta.a_cuenta - req.body.detalle.montoAnterior;
                        const modifProforma = await Proforma.update({
                            fecha_cobro: null,
                            a_cuenta: acuentaActual
                        }, {
                            where: { id:req.body.detalle.proforma.id}
                        })

                    //modificacion de debe o haber y saldo del cliente de la tabla de cuenta_transaccion
                        //get saldo anterior a la fecha
                        const saldoAnterior = await CuentaTransaccion.find({
                            where: {
                                id_cuenta: req.body.transaccion.cuenta.id,
                                id:{
                                    $lt: req.body.transaccion.id
                                } 
                            },
                            order: [['id', 'desc']],
                            limit: 1
                        })
                        const montoDebeHaber = await DetalleTransaccion.find({
                            attributes:
                            [[sequelize.literal('SUM(`monto`)'), 'sumaMontos']],
                            where: {id_transaccion: req.body.transaccion.id},
                            })

                        // funcionalidad del saldo
                            if(req.body.detalle.id){
                                debe = 0;
                                haber = montoDebeHaber.dataValues.sumaMontos
                                saldoActual = saldoAnterior.saldo + haber
                            }else{
                                return res.json({ mensaje: "eliminado satisfactoriamente....." }); 
                            }
                            //obtencion de ids proformas 
                            const idsProformas = await DetalleTransaccion.findAll({
                                where: {id_transaccion: req.body.transaccion.id},
                                })
                            var idsProf = idsProformas.map((actual,index,detalles)=>{    
                                    detalles[index]= actual.dataValues.detalle
                                    return detalles[index]
                                },[])

                            //obtencion de nro facturas
                            const facturasProformas = await DetalleTransaccion.findAll({
                                    attributes:
                                    [[sequelize.literal('`proforma`.`factura`'), 'facturass']],
                                    where: {id_transaccion: req.body.transaccion.id},
                                        include: [{ model: Proforma, as: 'proforma' }] 
                                    })
                            var factProf = facturasProformas.map((actual,index,facturas)=>{    
                                    facturas[index]= actual.dataValues.facturass
                                    return 'Factura N° '+facturas[index]
                                },[])
                        // update de la tabla
                        const transaccionEditar = await CuentaTransaccion.update({
                            detalle: 'Cobro(s)'+factProf.join(','),
                            debe: debe,
                            haber: haber,
                            saldo: saldoActual,
                            ids_proformas: idsProf.join(',')
                        }, {
                            where: { id: req.body.transaccion.id, id_empresa: req.body.transaccion.id_empresa }
                        })
                    }
                    if(datosConcepto.nombre_corto == 'PTRAN'){
                        //modificacion columna a_cuenta de compras
                        const compraAcuenta = await Compra.find({
                            where: { id:req.body.detalle.compra.id}
                        })
                        var acuentaActual = compraAcuenta.a_cuenta - req.body.detalle.montoAnterior;
                        var saldoActualComp = (compraAcuenta.saldo) + (req.body.detalle.montoAnterior)

                        const modifProforma = await Compra.update({
                            a_cuenta: acuentaActual,
                            saldo: saldoActualComp
                        }, {
                            where: { id:req.body.detalle.compra.id}
                        })
                    //modificacion de debe o haber y saldo del proveedor de la tabla de cuenta_transaccion
                        //get saldo anterior a la fecha
                        const saldoAnterior = await CuentaTransaccion.find({
                            where: {
                                id_cuenta: req.body.transaccion.cuenta.id,
                                id:{
                                    $lt: req.body.transaccion.id
                                } 
                            },
                            order: [['id', 'desc']],
                            limit: 1
                        })
                        
                        const montoDebeHaber = await DetalleTransaccion.find({
                            attributes:
                            [[sequelize.literal('SUM(`monto`)'), 'sumaMontos']],
                            where: {id_transaccion: req.body.transaccion.id},
                            })
                        // funcionalidad del saldo  
                        if(req.body.detalle.id){
                            debe = montoDebeHaber.dataValues.sumaMontos
                            haber = 0;
                            saldoActual = saldoAnterior.saldo - debe
                        }else{
                            return res.json({ mensaje: "eliminado satisfactoriamente....." }); 
                        } 
                        //obtencion de nro facturas
                        const facturasCompra = await DetalleTransaccion.findAll({
                            attributes:
                            [[sequelize.literal('`compra`.`factura`'), 'facturass']],
                            where: {id_transaccion: req.body.transaccion.id},
                                include: [{ model: Compra, as: 'compra' }] 
                            })
                        var factComp = facturasCompra.map((actual,index,facturas)=>{    
                                facturas[index]= actual.dataValues.facturass
                                return 'Factura N° '+facturas[index]
                            },[])
                        // update de la tabla
                        const transaccionEditarComp = await CuentaTransaccion.update({
                            detalle: 'Pago(s)'+factComp.join(','),
                            debe: debe,
                            haber: haber,
                            saldo: saldoActual
                        }, {
                            where: { id: req.body.transaccion.id, id_empresa: req.body.transaccion.id_empresa }
                            
                        })
                    }
                //// para actualizar saldos mayores a la fecha
                    const saldosAmodificar = await CuentaTransaccion.findAll({
                        where: {
                            id_cuenta: req.body.transaccion.cuenta.id,
                            id:{
                                $gt: req.body.transaccion.id
                            } 
                        },
                        order: [['id', 'asc']]
                    })
                    var saldoMod = saldoActual
                    if(saldosAmodificar.length>0){
                        for (let index = 0; index < saldosAmodificar.length; index++) {
                            const modifSaldo = saldosAmodificar[index];

                            if(modifSaldo.debe>0){
                                saldoMod = saldoMod - modifSaldo.debe
                            }
                            if (modifSaldo.haber>0) {
                                saldoMod = saldoMod + modifSaldo.haber
                            }
                            const saldosTransActualizados = await CuentaTransaccion.update({
                                saldo: saldoMod
                            }, {
                                where: { id: modifSaldo.id, id_empresa: req.body.transaccion.id_empresa }
                            })
                        }
                    }
                res.json({ mensaje: "Se Elimino el Registro Cobro" })
            });
        })

    router.route('/transaccion/ultima_fecha_comprobante/empresa/:id_empresa/tipo/:id_tipo')
		.get(ensureAuthorizedlogged, async function (req, res) {
            var d1 = new Date();
            var primerDia = new Date(d1.getFullYear(), d1.getMonth(), 1);
            var ultimoDia = new Date(d1.getFullYear(), d1.getMonth() + 1, 0);
            ultimoDia.setHours(23, 59, 59, 59);
			var condicionSucursal = { id_empresa: req.params.id_empresa }
			ComprobanteContabilidad.findAll({
				limit: 1,
				where: {
					id_tipo: req.params.id_tipo,
                    fecha: {
                        $between: [primerDia, ultimoDia]
                    }
				},
				include: [{ model: Sucursal, as: 'sucursal', where: condicionSucursal }],
				order: [['id', 'DESC']]
			}).then(function (Comprobante) {
				res.json({ comprobante: Comprobante })
			})
		})

    router.route('/transacciones/integracion/pagos/proveedores')
        .post(async (req, res) => {
            const concept = await CuentaTransaccion.find({
                include:[{model: Clase, as:'concepto'}],
                where: req.body.id
            })
            if(concept.concepto.nombre_corto == 'PTRAN'){
                CuentaTransaccion.findAll({
                    where:req.body.id ,
                    include: [
                        {model: Banco, as: 'cuenta',
                            include: [{ model: ContabilidadCuenta, as: 'cuenta' }, 
                                      { model: Clase, as: 'tipoMoneda' }]},
                        {model: DetalleTransaccion, as: 'detallesTransaccion', required:true,
                            include: [{ model: Compra, as: 'compra', required:true,
                                    include: [{model: Proveedor, as: 'proveedor'},
                                            {model: AsientoContabilidad,as: 'asientosContab', where: {eliminado: false},
                                            include:[{model: ComprobanteContabilidad, as: 'comprobante', where: {eliminado: false}},
                                                    {model: ContabilidadCuenta, as: 'cuenta',
                                                        include: [{model: ConfiguracionCuenta, as:'CuentaConfiguracion'}, 
                                                                {model: ClasificacionCuenta, as:'clasificacion',
                                                                include: [{model:Clase, as:'tipoClasificacion'},
                                                                         {model:Clase, as:'saldo'}]
                                                                }, 
                                                                {model: Clase, as:'tipoAuxiliar'}
                                                            ],
                                                        /* where: sequelize.literal('NOT EXISTS (SELECT agil_configuracion_cuenta.cuenta FROM agil_configuracion_cuenta  WHERE `detallesTransaccion.compra.asientoContab.comprobante.asientosContables.cuenta`.`id` = agil_configuracion_cuenta.cuenta)') */ 
                                                    }
                                            ] 
                                    }]
                             }]
                        },
                        {model: Clase, as: 'concepto'},
                        {model: Clase, as: 'tipo_documento'},
                        {model: Proveedor, as: 'proveedor'}
                    ],
                    order: [['id', 'asc']]
                }).then(async function (transaccionesPago) {
                    try {
                        const tipoComprobante = await ConfiguracionContableComprobante.findAll({
                            include:[
                                {model: EmpresaIntegracion, as:'integracion', required:true,
                                    include:[{model: IntegracionAplicacion, as:'moduloIntegracion', required:true,
                                            include:[{model: Aplicacion, as:'aplicacion',where:{url:'transacciones'} }]
                                            }] 
                                },
                                {model: Sucursal, as:'sucursal'},
                                {model: Clase, as:'tipoComprobante', where:{nombre_corto: 'TCMCEGR'},
                                    include:[{model: Tipo, as:'tipo',where:{nombre_corto:'TCMC'} }] 
                                }
                            ]
                        })
                        var datosComprob = tipoComprobante
                        res.json({transaccion: transaccionesPago , datosComprob: datosComprob})
                    } catch (error) {
                        res.json({ mensaje: err.stack, hasErr: true });
                    } 
                }).catch(function (err) {
                    res.json({ mensaje: err.stack, hasErr: true });
                })
            }
            if(concept.concepto.nombre_corto == 'CTRAN'){
                try {
                    const transaccionesCobro = await CuentaTransaccion.findAll({
                        where:req.body.id ,
                        include: [
                            {model: Banco, as: 'cuenta',
                                include: [{ model: ContabilidadCuenta, as: 'cuenta' }, 
                                          { model: Clase, as: 'tipoMoneda' }]},
                            {model: DetalleTransaccion, as: 'detallesTransaccion', required:true,
                                include:[{model: Proforma, as: 'proforma',
                                    include:[{model: Clase, as: 'actividadEconomica'},
                                            {model: Cliente, as: 'cliente'},
                                            {model: ProformaContabilidad, as:'ProformasContabilidad',
                                        include: [{model: AsientoContabilidad, as:'asientoContabilidad', where: {eliminado: false},
                                            include:[{model: ComprobanteContabilidad, as: 'comprobante', where: {eliminado: false}},
                                                {model: ContabilidadCuenta, as: 'cuenta',
                                                include: [{model: ClasificacionCuenta, as:'clasificacion',
                                                    include: [{model:Clase, as:'tipoClasificacion'},
                                                                {model:Clase, as:'saldo'}]
                                                        }, 
                                                        {model: Clase, as:'tipoAuxiliar'}
                                                    ],
                                            }]   
                                        }]
                                    }]
                                }]
                            },
                            {model: Clase, as: 'concepto'},
                            {model: Clase, as: 'tipo_documento'},
                            {model: Cliente, as: 'cliente'}
                        ],
                        order: [['id', 'asc']]
                    })
                    const tipoComprobanteCobro = await ConfiguracionContableComprobante.findAll({
                        include:[
                            {model: EmpresaIntegracion, as:'integracion', required:true,
                                include:[{model: IntegracionAplicacion, as:'moduloIntegracion', required:true,
                                        include:[{model: Aplicacion, as:'aplicacion',where:{url:'transacciones'} }]
                                        }] 
                            },
                            {model: Sucursal, as:'sucursal'},
                            {model: Clase, as:'tipoComprobante' ,where:{nombre_corto: 'TCMCING'},
                                include:[{model: Tipo, as:'tipo',where:{nombre_corto:'TCMC'} }] 
                            }
                        ]
                    })

                    res.json({transaccion: transaccionesCobro , datosComprob: tipoComprobanteCobro})
                    // res.json({transaccion: transaccionesCobro }) 
                } catch (error) {
                    res.json({ mensaje: err.stack, hasErr: true });
                }
            }
        })


        // para redondeo de numeros
        function round(value, decimals) {
            return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
        }


        router.route('/ruta/nuevo/comprobante/transaccion/pagos/proveedores')
        .post(async (req, res) => {
           /*  var transa = req.body */
            sequelize.transaction(async function (transaction) {
                const transacContabilizada = await CuentaTransaccion.find({
                    where: {
						id: req.body.id_transaccion,
                        id_empresa: req.body.id_empresa
					},
					attributes: ['id','id_comprobante'],
                    transaction: transaction
                })
                if(!transacContabilizada.id_comprobante ){
                    var d1 = new Date(req.body.fecha)
                    let sumaDebe = 0
                    let sumaHaber = 0
                    if(isNaN(d1)){ return new Promise((f, r) => r({ mensaje: 'Fecha Incorrecta'}))} 
                    
                    var primerDia = new Date(d1.getFullYear(), d1.getMonth(), 1);
                    var ultimoDia = new Date(d1.getFullYear(), d1.getMonth() + 1, 0);
                    ultimoDia.setHours(23, 59, 59, 59);
                    let numero = 0;
                    
                    const SucursalEncontrada = await Sucursal.find({
                        where: {
                            id: req.body.id_sucursal.id,
                            id_empresa: req.body.id_empresa
                        },
                        attributes: ['comprobante_ingreso_correlativo', 'comprobante_egreso_correlativo', 'comprobante_traspaso_correlativo', 'comprobante_caja_chica_correlativo', 'activo', 'nombre'],
                        transaction: transaction
                    }).catch((err) => {
                        return new Promise((f, r) => r({ mensaje: 'Error al obtener datos del número correlativo de comprobante.', stack: err.stack, hasErr: true }))
                    })

                    const ultimoComprobanteEncontrado = await ComprobanteContabilidad.findAll({
                        limit: 1,
                        where: {
                            id_tipo: req.body.tipoComprobante.id,
                            fecha: {
                                $between: [primerDia, ultimoDia]
                            }
                        },
                        include: [{ model: Sucursal, as: 'sucursal', where: {id:req.body.id_sucursal.id, id_empresa: req.body.id_empresa } }],
                        order: [['id', 'DESC']],
                        transaction: transaction
                    }).catch((err) => {
                        return new Promise((f, r) => r({ mensaje: 'Error en busqueda de comprobantes', stack: err, hasErr: true }))
                    })
                    if(!SucursalEncontrada.activo){ return new Promise((f, r) => r({ mensaje: 'La sucursal ' + SucursalEncontrada.nombre + ' está deshabilitada. No se pueden realizar registros.'}))} 

                    if(req.body.asientosContables[0].debe_sus == null){ return new Promise((f, r) => r({ mensaje: 'NO existe UFVs a la fecha seleccionada.'}))} 
                    
                    if(ultimoComprobanteEncontrado.length>0){
                        var ultimoFechaDia = (ultimoComprobanteEncontrado[0].fecha).getDate()
                        var ultimoFechaMes = (ultimoComprobanteEncontrado[0].fecha).getMonth()
                        var ultimoFechaAnio = (ultimoComprobanteEncontrado[0].fecha).getFullYear()
                        var d11 = ultimoComprobanteEncontrado[0].fecha
                        d11.setHours(00, 00, 00, 00);
                        if(req.body.crearRegistroCompAntiguo){
                            if(d1<d11){ return new Promise((f, r) => r({ mensaje: '¡no se puede registrar comprobantes menor a esta fecha: '+ultimoFechaDia+'/'+ultimoFechaMes+'/'+ultimoFechaAnio}))} 
                            numero = ultimoComprobanteEncontrado[0].numero + 1
                        }else{
                            if(d1<d11){ return new Promise((f, r) => r({ mensaje: '¡no se puede registrar comprobantes menor a esta fecha: '+ultimoFechaDia+'/'+ultimoFechaMes+'/'+ultimoFechaAnio}))} 
                            if (req.body.tipoComprobante.nombre_corto == "TCMCEGR") { numero = SucursalEncontrada.comprobante_egreso_correlativo += 1 }
                            if (req.body.tipoComprobante.nombre_corto == "TCMCING") { numero = SucursalEncontrada.comprobante_ingreso_correlativo += 1 }
                        }
                    }else{
                        numero += 1
                    }

                    var fechaComprob  =  new Date(req.body.fecha)
                    var fechaActual = new Date()
                    let ComprobanteCreado = await ComprobanteContabilidad.create({
                        id_tipo: req.body.tipoComprobante.id,
                        abierto: false,
                        numero: numero,
                        fecha: fechaComprob,
                        id_sucursal: req.body.id_sucursal.id,
                        gloza: req.body.gloza,
                        id_usuario: req.body.id_usuario,
                        eliminado: false,
                        importe: req.body.total,
                        id_tipo_cambio: req.body.moneda.id,
                        fecha_creacion: fechaActual
                    }, { transaction: transaction }).catch((err) => {
                        return new Promise((f, r) => r({ mensaje: 'Error en la creacion del comprobante.', stack: err.stack, hasErr: true }))
                    })

                    for (let i = 0; i < req.body.asientosContables.length; i++) {
                        const asientoContable = req.body.asientosContables[i];
                        let asientoCreado = await AsientoContabilidad.create({
                            id_comprobante: ComprobanteCreado.id,
                            id_cuenta: asientoContable.cuenta.id,
                            glosa: asientoContable.glosa,
                            debe_bs: parseFloat(asientoContable.debe_bs),
                            haber_bs: parseFloat(asientoContable.haber_bs),
                            debe_sus: parseFloat(asientoContable.debe_sus),
                            haber_sus: parseFloat(asientoContable.haber_sus),
                            eliminado: false,
                        }, { transaction: transaction }).catch((err) => {
                            new Promise((f, r) => r({ mensaje: 'ERROR al crear asientos contbales.', stack: err.stack, hasErr: true }))
                        })
                        if (asientoContable.cuentaAux) {
                            let cuentaAuxiliarCreada = await ContabilidadCuentaAuxiliar.create({
                                debe: 0,
                                haber: 0,
                                saldo: 0,
                                descripcion: asientoContable.cuentaAux.razon_social,
                                nombre: asientoContable.cuentaAux.razon_social,
                                id_cuenta: asientoContable.cuenta.id,
                                id_asiento: asientoCreado.id
                            }, { transaction: transaction }).catch((err) => {
                                new Promise((f, r) => r({ mensaje: 'ERROR al crear asientos contbales.', stack: err.stack, hasErr: true }))
                            })
                        }
                        sumaDebe += asientoContable.debe_bs
                        sumaHaber += asientoContable.haber_bs
                
                    }
                    if(round(sumaDebe, 2) != round(sumaHaber,2)){ return new Promise((f, r) => r({ mensaje: 'Saldos de DEBE y HABER son distintos'}))} 
                    
                    const transaccionIDcomprobante = await CuentaTransaccion.update(
                        {id_comprobante: ComprobanteCreado.id}, {
                        where: {id: req.body.id_transaccion },
                        transaction: transaction }).catch((err) => {
                        return new Promise((f, r) => r({ mensaje: 'Error al editar la transaccion.', stack: err.stack, hasErr: true }))
                    })

                    //if(ultimoComprobanteEncontrado.length>0){
                        if(!req.body.crearRegistroCompAntiguo){
                            if(req.body.concepto.nombre_corto === 'PTRAN'){
                                const sucursalCorrelativoModif = await Sucursal.update(
                                    {comprobante_egreso_correlativo: numero}, {
                                    where: {id: req.body.id_sucursal.id },
                                    transaction: transaction }).catch((err) => {
                                    return new Promise((f, r) => r({ mensaje: 'Error al modificar correlativo de sucursal', stack: err.stack, hasErr: true }))
                                })
                            }
                            if(req.body.concepto.nombre_corto === 'CTRAN'){
                                const sucursalCorrelativoModif = await Sucursal.update(
                                    {comprobante_ingreso_correlativo: numero}, {
                                    where: {id: req.body.id_sucursal.id },
                                    transaction: transaction }).catch((err) => {
                                    return new Promise((f, r) => r({ mensaje: 'Error al modificar correlativo de sucursal', stack: err.stack, hasErr: true }))
                                })
                            }
                        }
                    //}

                    return ComprobanteCreado.id 
                }else{ return new Promise((f, r) => r({ mensaje: 'Ya fue contabilizada la transacción.'}))} 
            }).then(async (comprobante) => {
                const registroComprobante = await ComprobanteContabilidad.find({
                    where: {id: comprobante },
                    include:[{model: AsientoContabilidad, as: 'asientosContables', required: true,
                            include: [{model: ContabilidadCuenta, as: 'cuenta',  required: true},
                                    {model: ContabilidadCuentaAuxiliar, as: 'cuentaAux'}]
                            },
                            {model: Usuario, as: 'usuario',  required: true,
                                    include: [{model: Empresa, as: 'empresa',required: true},
                                            {model: Persona, as: 'persona',required: true}]
                            },
                            {model: Clase, as: 'tipoComprobante',  required: true},
                            {model: MonedaTipoCambio, as: 'tipoCambio',  required: true}],
                    order: [['id', 'DESC']]
                })
                
				res.json({ mensaje: "Comprobante creado correctamente", registroComprobante: registroComprobante })
			}).catch((err) => {
				res.json({ hasErr: true, mensaje: err.mensaje, stack: err.stack ? err.stack : "" })
			})

            
        })

        router.route('/transaccion/proveedor/send/email')
		//Para envio de email
		.post(function (req, res) {
            let destintarios = req.body.email_destinatario?req.body.email_destinatario.split('; '):[" "];
            for (let i = 0; i < destintarios.length; i++) {
                const pers_destinatarios = destintarios[i];
                        
                let rutaPDF = guardarPDFEmail(req.body) //guarda PDF en la carpeta y retorna el nombre del PDF
                let rutaResp = req.body.transaccion_respaldo?req.body.transaccion_respaldo.split('.')[1]:'';
                
                var transporter = nodemailer.createTransport({
                    host: req.body.empresa.email_host,//'m78.siteground.biz',//'smtp.gmail.com',
                    port: req.body.empresa.email_puerto,//465,//
                    secure: true,
                    auth: {
                        user: req.body.empresa.email_empresa_aplicacion,// 'violetalis54321@gmail.com',
                        pass: req.body.empresa.email_password_aplicacion// 'oqlz sobm gnpz tpxu'
                    },
                    ignoreTLS:true
                });
                var mensajeEmail = '<h4>Sr. Proveedor '+req.body.prov_nombre_razon_social+' le hacemos conocer que hemos realizado la transferencia bancaria (Cuenta Nro. '+req.body.nro_cuenta_Proveedor+' - '+req.body.nombre_cuenta_Proveedor+') según documentos adjuntos. <br> ATTE. <br> '+req.body.empresa.razon_social_empresa+' <br> DEPARTAMENTO CONTABLE <br> TEL: '+req.body.empresa.telefono_empresa+' </h4>'
                var mailOptions = {
                    from: '"'+req.body.empresa.subNombre_email+'" <'+req.body.empresa.email_empresa_aplicacion+'>', // '"AgilSof Mailer" <violetalis54321@gmail.com>', 
                    to: pers_destinatarios, //'liseth.rojas.lopez.LRL@gmail.com',//
                    subject: 'PAGO PROVEEDOR', 
                    // text: 'Hello world?', 
                    html: mensajeEmail,
                    attachments: [
                        {
                            filename: 'Comprobante.pdf', // <= Here: made sure file name match
                            path:  req.body.empresa.URLactual+rutaPDF, // <= Here
                            contentType: 'application/pdf'
                        }
                    ]
                };
                if(req.body.transaccion_respaldo){
                    mailOptions.attachments.push({
                        filename: 'Respaldo.pdf',
                        path:  req.body.empresa.URLactual+rutaResp+'.pdf',
                        contentType: 'application/pdf',
                    })
                }

                // send mail with defined transport object
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        eliminarPDFEmail(rutaPDF)
                        return res.json({ mensaje: 'No se puede completar la petición. Mensaje de error: "' + error.message + '"', hasErr:true})
                    } else {
                        eliminarPDFEmail(rutaPDF)
                        return res.json({ mensaje: 'Correcto',hasErr:false })
                        
                    }
                })

                
            }
		});

        function guardarPDFEmail(email) {
            fs.writeFileSync('./documentos/transaccion/' + email.transaccion + "-" + email.email_destinatario+'.pdf', email.binarioPDF, 'binary', function (err) {
                if (err)
                    console.log(err);
                else
                    console.log("The file was saved!");
            });
            return '/documentos/transaccion/' + email.transaccion + "-" + email.email_destinatario+'.pdf'; //ruta de la documentacion de pdf
        }
        
        function eliminarPDFEmail(rutaPDF) {
            if (fs.existsSync('.'+rutaPDF)) {
                fs.unlinkSync('.'+rutaPDF)
            }
        }

        router.route('/docment/respaldo/transaccion/pago')
		.post(function (req, res) {
            let fecha =  new Date().getTime()
            fs.writeFileSync('./documentos/respaldoTransaccion/' + req.body.id+'-'+fecha+'.pdf', req.body.doc_respaldo2.data, 'binary', function (err) {
                if (err)
                    console.log(err);
                else
                    console.log("The file was saved!");
            });
            var namedoc = './documentos/respaldoTransaccion/' + req.body.id+'-'+fecha+'.pdf';
            CuentaTransaccion.update({
                doc_respaldo: namedoc
            }, {
                where: { id: req.body.id }
            }).then(function (affecteedRows) {
                return res.json({ mensaje: 'Archivo Adjuntado',hasErr:false })
            })
        });


       
















}