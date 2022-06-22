module.exports = function (router, sequelize, Sequelize, ensureAuthorizedAdministrador, fs, forEach, jwt, md5, Tipo, Clase, CajaChica, SolicitudCajaChica, Empresa, ConceptoMovimientoCajaChica, MedicoPaciente, Usuario, Persona, ContabilidadCuenta,
    Movimiento, Proveedor, Compra, Sucursal, CierreCajaChica, DetalleCompra, Producto, ensureAuthorizedlogged, RrhhEmpleadoFicha, ValeCajaChica, CajaChicaNivelGasto, CajaChicaGasto, CajaChicaRendicionFondo, CajaChicaDetalleRendicionFondo, CajaChicaDetalleRendicionFondoCentroCosto,
    RrhhViajeConductor, CajaChicaCentroCosto, RrhhAnticipo, ConfiguracionContableComprobante, ConfiguracionContableMovimientoCentroCosto, ConfiguracionContableMovimientoAuxiliar,
    EmpresaIntegracion, IntegracionAplicacion, Aplicacion,DetalleMovimiento) {

    router.route('/solicitud-caja-chica')
        .post(ensureAuthorizedlogged, function (req, res) {
            Sucursal.find({
                where: {
                    id: req.body.sucursal.id
                }
            }).then((suc) => {
                if (!suc.activo) return res.json({ mensaje: 'Sucursal deshabilitada, no se pueden hacer cambios.', hasErr: true })
                if (req.body.id) {
                    if (req.body.eliminado) {
                        SolicitudCajaChica.update({
                            eliminado: req.body.eliminado,
                            id_estado: req.body.estado.id
                        }, {
                            where: { id: req.body.id }
                        }).then(function (SolicitudCreada) {

                            var cajasChicas = req.body.cajasChicas ? req.body.cajasChicas : [];
                            if (cajasChicas.length > 0) {
                                // actualizar eliminar caja chica ========================
                                for (let index = 0; index < cajasChicas.length; index++) {
                                    const cajachica = cajasChicas[index];
                                    CajaChica.update({
                                        eliminado: req.body.eliminado
                                    }, {
                                        where: { id: cajachica.id }
                                    }).then(function (cajaActulaizado) {

                                    })
                                }
                            }
                            res.json({ mensaje: 'Actualizado Satisfactoriamente!' });
                        });
                    } else {
                        SolicitudCajaChica.update({
                            //id_usuario: req.body.usuario.id,
                            //fecha: req.body.fecha,
                            id_solicitante: req.body.solicitante.id,
                            id_concepto: req.body.concepto.id,
                            monto: req.body.monto,
                            eliminado: req.body.eliminado,
                            id_estado: req.body.estado.id,
                            detalle: req.body.detalle,
                            id_sucursal: req.body.sucursal.id,
                            id_autorizador: req.body.autorizador,
                            id_proveedor: req.body.proveedor ? req.body.proveedor.id : null,
                            numero_orden_compra: req.body.numero_orden_compra
                        }, {
                            where: { id: req.body.id }
                        }).then(function (SolicitudCreada) {
                            res.json({ mensaje: 'Actualizado Satisfactoriamente!' });
                        });
                    }

                } else {
                    SolicitudCajaChica.create({
                        id_usuario: req.body.usuario.id,
                        fecha: req.body.fecha,
                        id_solicitante: req.body.solicitante.id,
                        detalle: req.body.detalle,
                        id_concepto: req.body.concepto.id,
                        monto: req.body.monto,
                        eliminado: false,
                        id_estado: req.body.estado.id,
                        id_sucursal: req.body.sucursal.id,
                        id_autorizador: req.body.autorizador,
                        id_proveedor: req.body.proveedor ? req.body.proveedor.id : null,
                        numero_orden_compra: req.body.numero_orden_compra
                    }).then(function (SolicitudCreada) {
                        res.json({ mensaje: 'Creado Satisfactoriamente!' });
                    });
                }
            }).catch((err) => {
                res.json({ mensaje: err.stack })
            })
        })
    router.route('/caja-chica-detalles-rendicion/:id_solicitud')
        .get(function (req, res) {
            CajaChicaRendicionFondo.find({
                where: { id_solicitud: req.params.id_solicitud },
                include: [{
                    model: CajaChicaDetalleRendicionFondo, as: 'gastos', where: { eliminado: false },
                    include: [{
                        model: CajaChicaDetalleRendicionFondoCentroCosto, as: 'datosCentrosCosto',
                        include: [{ model: Clase, as: 'centro_costo' }]
                    },
                    { model: CajaChicaGasto, as: 'gasto', include: [{ model: ContabilidadCuenta, as: 'cuenta' }] },
                    { model: Clase, as: 'area' }]
                },
                { model: Clase, as: 'rendicion' }, { model: Clase, as: 'vehiculo' }, { model: RrhhViajeConductor, as: 'conductor' }]
            }).then(function (encontrado) {
                res.json({ rendicion: encontrado })
            })
        })
    router.route('/verificar-solicitudes-caja-chica')
        .put(ensureAuthorizedlogged, function (req, res) {
            const ids = req.body.solicitudes.map(solicitud => solicitud.id)
            SolicitudCajaChica.findAll({
                where: {
                    id: { $in: ids }
                },
                include: [
                    {
                        model: Sucursal, as: 'sucursal', where: { activo: false }, required: true
                    }
                ]
            }).then((sucs) => {
                if (sucs.length > 0) return res.json({ mensaje: 'Una o más Sucursales estan deshabilitadas, no se pueden hacer cambios.', hasErr: true, hasError: true })
                Tipo.find({
                    where: { nombre_corto: 'ES_CCH' }
                }).then(function (tipoE) {
                    Clase.find({
                        where: { id_tipo: tipoE.id, nombre_corto: 'VERIFICADO' }
                    }).then(function (claseE) {
                        req.body.solicitudes.forEach(function (solicitud, index, array) {
                            SolicitudCajaChica.update({
                                id_estado: claseE.id,
                                id_verificador: req.body.id_verificador
                            }, {
                                where: { id: solicitud.id }
                            }).then(function (SolicitudActualizada) {
                                if (index === (array.length - 1)) {
                                    if (index > 1) {
                                        res.json({ mensaje: 'Actualizados Satisfactoriamente!' });
                                    } else {
                                        res.json({ mensaje: 'Actualizado Satisfactoriamente!' });
                                    }
                                }
                            });
                        })
                    })
                })
            })
        })

    router.route('/alertas/cajachica/cantidad/:id_empresa')
        .get(function (req, res) {
            var condicionCajaChica = { id_verificador: null }
            var datosbusqueda = {
                distinct: true,
                where: condicionCajaChica,
                include: [{ model: CajaChicaRendicionFondo, as: 'rendicionFondo', required: true }, { model: Sucursal, as: 'sucursal', where: { activo: true }, required: true },
                {
                    model: CajaChica, as: 'cajasChicas', required: true,
                    include: [{ model: Usuario, as: 'usuario', include: [{ model: Persona, as: 'persona' }] }, { model: Sucursal, as: 'sucursal', where: { activo: true }, required: true },
                    {
                        model: ConceptoMovimientoCajaChica, as: 'concepto',
                        include: [{ model: Clase, as: 'concepto' }]
                    },
                    { model: ContabilidadCuenta, as: 'cuenta' },
                    {
                        model: Compra, as: 'compra',
                        include: [{ model: Proveedor, as: 'proveedor' },
                        { model: Sucursal, as: 'sucursal' },
                        {
                            model: Movimiento, as: 'movimiento', required: false,
                            include: [{ model: Clase, as: 'clase' }]
                        }]
                    }]
                },
                {
                    model: MedicoPaciente, as: 'solicitante',
                    include: [{ model: Persona, as: 'persona' }]
                },
                {
                    model: ConceptoMovimientoCajaChica, as: 'concepto',
                    include: [{ model: Clase, as: 'concepto', where: { nombre_corto: "KARDEX" } }]
                },
                { model: Clase, as: 'estado' },
                {
                    model: Usuario, as: 'usuario', where: { id_empresa: req.params.id_empresa },
                    include: [{ model: Persona, as: 'persona' }]
                }]
            }
            SolicitudCajaChica.count(
                datosbusqueda
            ).then(function (cajasChicas) {
                res.json({ cantidad_cajachica: cajasChicas })
            }).catch(function (err) {
                res.json({ mensaje: err.stack !== undefined ? err.stack : err.message, hasErr: true })
            });
        })
    router.route('/alertas-solicitud-caja-chica/empresa/:id_empresa/historico/:historico/mes/:mes/anio/:anio/verificador/:id_verificador/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion')
        .get(ensureAuthorizedlogged, function (req, res) {
            var condicionSolicitudCajaChica = { id_verificador: null }
            var inicio = ""
            var fin = ""
            if (req.params.historico != 0) {
                condicionSolicitudCajaChica.id_verificador = req.params.id_verificador
            }
            if (req.params.anio != 0) {
                var aniofin = parseInt(req.params.anio) + 1
                inicio = new Date(req.params.anio, 0, 1)
                fin = new Date(aniofin, 0, 0)

                condicionSolicitudCajaChica.fecha = { $between: [inicio, fin] }
                if (req.params.mes != 0) {
                    var mes = parseInt(req.params.mes) - 1

                    inicio = new Date(req.params.anio, mes, 1)
                    fin = new Date(req.params.anio, req.params.mes, 0)
                    condicionSolicitudCajaChica.fecha = { $between: [inicio, fin] }
                }
            }
            var condicionBeneficiario = {},
                condicionCajaChica = { id_padre: null, saldo: { $ne: 0 } };
            if (req.params.texto_busqueda != '0') {
                if (isNaN(parseInt(req.params.texto_busqueda))) {
                    condicionBeneficiario = { nombre_completo: { $like: "%" + req.params.texto_busqueda + "%" } }
                } else {
                    condicionCajaChica.numero_correlativo = req.params.texto_busqueda
                }
            }
            var textOrder = ""
            if (req.params.columna == 'beneficiario_devolucion') {
                textOrder = "`solicitante.persona.nombre_completo` " + req.params.direccion
            } else if (req.params.columna == 'fecha_devolucion') {
                textOrder = "fecha " + req.params.direccion
            } else if (req.params.columna == 'monto_devolucion') {
                textOrder = "monto " + req.params.direccion
            } else if (req.params.columna == 'doc_devolucion') {
                textOrder = "cajasChicas.numero_correlativo " + req.params.direccion
            } else {
                textOrder = req.params.columna + " " + req.params.direccion
            }
            if (req.params.items_pagina != '0') {
                textOrder = textOrder + " limit " + (req.params.items_pagina * (req.params.pagina - 1)) + ", " + req.params.items_pagina
            }

            var datosbusqueda = {

                where: condicionSolicitudCajaChica,
                include: [{ model: CajaChicaRendicionFondo, as: 'rendicionFondo', required: true }, { model: Sucursal, as: 'sucursal', where: { activo: true }, required: true },
                {
                    model: CajaChica, as: 'cajasChicas', where: condicionCajaChica, required: true,
                    include: [{ model: Usuario, as: 'usuario', include: [{ model: Persona, as: 'persona' }] }, { model: Sucursal, as: 'sucursal', where: { activo: true }, required: true },
                    {
                        model: ConceptoMovimientoCajaChica, as: 'concepto',
                        include: [{ model: Clase, as: 'concepto' }]
                    },
                    { model: ContabilidadCuenta, as: 'cuenta' },
                    {
                        model: Compra, as: 'compra',
                        include: [{ model: Proveedor, as: 'proveedor' },
                        { model: Sucursal, as: 'sucursal' },
                        {
                            model: Movimiento, as: 'movimiento', required: false,
                            include: [{ model: Clase, as: 'clase' }]
                        }]
                    }]
                },
                {
                    model: MedicoPaciente, as: 'solicitante',
                    include: [{ model: Persona, as: 'persona', where: condicionBeneficiario }]
                },
                {
                    model: ConceptoMovimientoCajaChica, as: 'concepto',
                    include: [{ model: Clase, as: 'concepto', where: { nombre_corto: "KARDEX" } }]
                },
                { model: Clase, as: 'estado' },
                {
                    model: Usuario, as: 'usuario', where: { id_empresa: req.params.id_empresa },
                    include: [{ model: Persona, as: 'persona' }]
                }],
                //order: [['nombre', 'asc']]

            }
            datosbusqueda.group = ["`agil_solicitud_caja_chica`.`id`"]
            SolicitudCajaChica.count(
                datosbusqueda
            ).then(function (count) {
                datosbusqueda.order = sequelize.literal(textOrder)
                SolicitudCajaChica.findAll(
                    datosbusqueda
                ).then(function (solicitudes) {
                    res.json({ solicitudes: solicitudes, paginas: Math.ceil(count.length / req.params.items_pagina) });
                })
            })
        })
    router.route('/solicitud-conceptos-caja-chica/empresa/:id_empresa')
        .post(ensureAuthorizedlogged, function (req, res) {
            req.body.forEach(function (concepto, index, array) {
                if (concepto.id) {
                    ConceptoMovimientoCajaChica.update({
                        nombre: concepto.nombre,
                        id_movimiento: concepto.concepto.id,
                        habilitado: concepto.habilitado,

                    },
                        {
                            where: {
                                id: concepto.id
                            }
                        }).then(function (SolicitudCreada) {
                            if (index === (array.length - 1)) {
                                res.json({ mensaje: 'Guarado Satisfactoriamente!' });
                            }
                        });
                } else {
                    ConceptoMovimientoCajaChica.create({
                        nombre: concepto.nombre,
                        id_movimiento: concepto.concepto.id,
                        id_empresa: req.params.id_empresa,
                        habilitado: concepto.habilitado,
                        eliminado: false
                    }).then(function (SolicitudCreada) {
                        if (index === (array.length - 1)) {
                            res.json({ mensaje: 'Guarado Satisfactoriamente!' });
                        }
                    });
                }
            });
        })
        .get(ensureAuthorizedlogged, function (req, res) {
            ConceptoMovimientoCajaChica.findAll({
                where: { id_empresa: req.params.id_empresa },
                include: { model: Clase, as: 'concepto' }
            }).then(function (SolicitudCreada) {
                res.json(SolicitudCreada);
            });
        })

    router.route('/caja-chica/sucursal/:id_sucursal/empresa/:id_empresa/fecha/:fecha/saldoInicial/:saldo/usuario/:id_usuario')
        .get(ensureAuthorizedlogged, function (req, res) {
            CajaChica.findAll({
                include: [
                    { model: Sucursal, as: 'sucursal', where: { id: req.params.id_sucursal }, required: true },
                    {
                        model: SolicitudCajaChica, as: 'solicitud', required: false, where: { eliminado: false },
                        include: [
                            { model: Clase, as: 'estado' },
                            {
                                model: MedicoPaciente, as: 'solicitante',
                                include: [{ model: Persona, as: 'persona' }]
                            }
                        ]
                    },
                    {
                        model: ConceptoMovimientoCajaChica, as: 'concepto', where: { id_empresa: req.params.id_empresa },
                        include: [{ model: Clase, as: 'concepto' }]
                    },
                    { model: ContabilidadCuenta, as: 'cuenta' },
                    {
                        model: Compra, as: 'compra',
                        include: [
                            { model: Proveedor, as: 'proveedor' },
                            { model: Sucursal, as: 'sucursal', required: false },
                            {
                                model: Movimiento, as: 'movimiento', required: false,
                                include: [{ model: Clase, as: 'clase' }]
                            }
                        ]
                    }
                ],
                where: { id_padre: null, cerrada: false, eliminado: false },
                order: [['fecha', 'asc']]
            }).then(function (DatosCajas) {
                let cajas = []
                if (DatosCajas.length > 0) {
                    for (const caja of DatosCajas) {
                        if (caja.solicitud) {
                            if (!caja.solicitud.eliminado) {
                                cajas.push(caja)
                            }
                        } else {
                            cajas.push(caja)
                        }
                    }
                }
                if (cajas.length > 0) {
                    CierreCajaChica.findAll({
                        include: [{ model: Usuario, as: 'usuario', include: [{ model: Persona, as: 'persona' }] }, {
                            model: CajaChica, as: 'detalleCierreCaja', where: { id_sucursal: req.params.id_sucursal }
                            , include: [{
                                model: ConceptoMovimientoCajaChica, as: 'concepto',
                                include: [{ model: Clase, as: 'concepto' }]
                            }]
                            /* include: [{ model: CajaChicaCentroCosto, as: 'centrosCosto', required: false },
                            { model: Sucursal, as: 'sucursal', where: { id: req.params.id_sucursal } },
                            {
                                model: ConceptoMovimientoCajaChica, as: 'concepto', where: { id_empresa: req.params.id_empresa },
                                include: [{ model: Clase, as: 'concepto' }]
                            },
                            ] */
                        }]
                    }).then(function (cierreCaja) {
                        var ultimoSaldo = 0
                        cierreCaja.map(function (dato, index, array) {
                            if (index != 0) {
                                dato.saldo_inicial = ultimoSaldo
                            }
                            dato.saldo_final = dato.saldo_inicial
                            dato.detalleCierreCaja.map(function (detalle, idx, arr) {
                                if (detalle.concepto.concepto.nombre == "INGRESO") {
                                    dato.saldo_final += detalle.monto
                                } else {
                                    dato.saldo_final -= detalle.monto
                                }
                                if (idx == (arr.length - 1)) {
                                    ultimoSaldo = dato.saldo_final;
                                }
                            })
                        })

                        console.log(ultimoSaldo)
                        CierreCajaChica.create({
                            inicio: cajas[0].fecha,
                            fin: cajas[cajas.length - 1].fecha,
                            fecha: req.params.fecha,
                            saldo_inicial: ultimoSaldo,
                            id_usuario: req.params.id_usuario
                        }).then(function (cierreCajaChicaCreado) {
                            cajas.forEach(function (caja, index, array) {
                                if (caja.solicitud) {
                                    if (!caja.solicitud.eliminado) {
                                        CajaChica.update({
                                            id_cierre_caja_chica: cierreCajaChicaCreado.id,
                                            cerrada: true
                                        }, {
                                            where: { id: caja.id }
                                        }).then(function (cajaChicaActualizada) {
                                            if (index === (array.length - 1)) {
                                                CierreCajaChica.findAll({
                                                    where: { id: cierreCajaChicaCreado.id },
                                                    include: [{ model: Usuario, as: 'usuario', include: [{ model: Persona, as: 'persona' }] }, {
                                                        model: CajaChica, as: 'detalleCierreCaja',
                                                        include: [{ model: CajaChicaCentroCosto, as: 'centrosCosto', required: false },
                                                        { model: Sucursal, as: 'sucursal', where: { id: req.params.id_sucursal }, required: true },
                                                        {
                                                            model: ConceptoMovimientoCajaChica, as: 'concepto', where: { id_empresa: req.params.id_empresa },
                                                            include: [{ model: Clase, as: 'concepto' }]
                                                        },
                                                        ]
                                                    }]
                                                }).then(function (cierreCaja) {
                                                    cierreCaja.map(function (dato, index, array) {
                                                        if (index != 0) {
                                                            dato.saldo_inicial = ultimoSaldo
                                                        }
                                                        dato.saldo_final = dato.saldo_inicial
                                                        dato.detalleCierreCaja.map(function (detalle, idx, arr) {
                                                            if (detalle.concepto.concepto.nombre == "INGRESO") {
                                                                dato.saldo_final += detalle.monto
                                                            } else {
                                                                dato.saldo_final -= detalle.monto
                                                            }
                                                            if (idx == (arr.length - 1)) {
                                                                ultimoSaldo = dato.saldo_final;
                                                            }
                                                        })
                                                    })
                                                    CierreCajaChica.update({
                                                        saldo_final: ultimoSaldo
                                                    }, {
                                                        where: { id: cierreCajaChicaCreado.id },
                                                    }).then(function (actualizado) {
                                                        CierreCajaChica.find({
                                                            where: { id: cierreCajaChicaCreado.id },
                                                            include: [{
                                                                model: CajaChica, as: 'detalleCierreCaja',
                                                                include: [{ model: Sucursal, as: 'sucursal', where: { id: req.params.id_sucursal } }, {
                                                                    model: SolicitudCajaChica, as: 'solicitud',
                                                                    include: [{ model: Clase, as: 'estado' },
                                                                    {
                                                                        model: MedicoPaciente, as: 'solicitante',
                                                                        include: [{ model: Persona, as: 'persona' }]
                                                                    }]
                                                                },
                                                                {
                                                                    model: ConceptoMovimientoCajaChica, as: 'concepto', where: { id_empresa: req.params.id_empresa },
                                                                    include: [{ model: Clase, as: 'concepto' }]
                                                                },
                                                                { model: ContabilidadCuenta, as: 'cuenta' },
                                                                {
                                                                    model: Compra, as: 'compra', include: [{ model: Proveedor, as: 'proveedor' },
                                                                    { model: Sucursal, as: 'sucursal' },
                                                                    {
                                                                        model: Movimiento, as: 'movimiento', required: false,
                                                                        include: [{ model: Clase, as: 'clase' }]
                                                                    }]
                                                                }]
                                                            }],
                                                            order: [[{ model: CajaChica, as: 'detalleCierreCaja' }, 'id', 'asc']]
                                                        }).then(function (datosEncontrados) {
                                                            res.json({ cierreCaja: datosEncontrados });
                                                        })
                                                    })
                                                })
                                            }
                                        })
                                    } else {
                                        if (index === (array.length - 1)) {
                                            CierreCajaChica.findAll({
                                                where: { id: cierreCajaChicaCreado.id },
                                                include: [{ model: Usuario, as: 'usuario', include: [{ model: Persona, as: 'persona' }] }, {
                                                    model: CajaChica, as: 'detalleCierreCaja',
                                                    include: [{ model: CajaChicaCentroCosto, as: 'centrosCosto', required: false },
                                                    { model: Sucursal, as: 'sucursal', where: { id: req.params.id_sucursal } },
                                                    {
                                                        model: ConceptoMovimientoCajaChica, as: 'concepto', where: { id_empresa: req.params.id_empresa },
                                                        include: [{ model: Clase, as: 'concepto' }]
                                                    },
                                                    ]
                                                }]
                                            }).then(function (cierreCaja) {
                                                cierreCaja.map(function (dato, index, array) {
                                                    if (index != 0) {
                                                        dato.saldo_inicial = ultimoSaldo
                                                    }
                                                    dato.saldo_final = dato.saldo_inicial
                                                    dato.detalleCierreCaja.map(function (detalle, idx, arr) {
                                                        if (detalle.concepto.concepto.nombre == "INGRESO") {
                                                            dato.saldo_final += detalle.monto
                                                        } else {
                                                            dato.saldo_final -= detalle.monto
                                                        }
                                                        if (idx == (arr.length - 1)) {
                                                            ultimoSaldo = dato.saldo_final;
                                                        }
                                                    })
                                                })
                                                CierreCajaChica.update({
                                                    saldo_final: ultimoSaldo
                                                }, {
                                                    where: { id: cierreCajaChicaCreado.id },
                                                }).then(function (actualizado) {
                                                    CierreCajaChica.find({
                                                        where: { id: cierreCajaChicaCreado.id },
                                                        include: [{
                                                            model: CajaChica, as: 'detalleCierreCaja',
                                                            include: [{ model: Sucursal, as: 'sucursal', where: { id: req.params.id_sucursal }, required: true }, {
                                                                model: SolicitudCajaChica, as: 'solicitud',
                                                                include: [{ model: Clase, as: 'estado' },
                                                                {
                                                                    model: MedicoPaciente, as: 'solicitante',
                                                                    include: [{ model: Persona, as: 'persona' }]
                                                                }]
                                                            },
                                                            {
                                                                model: ConceptoMovimientoCajaChica, as: 'concepto', where: { id_empresa: req.params.id_empresa },
                                                                include: [{ model: Clase, as: 'concepto' }]
                                                            },
                                                            { model: ContabilidadCuenta, as: 'cuenta' },
                                                            {
                                                                model: Compra, as: 'compra', include: [{ model: Proveedor, as: 'proveedor' },
                                                                { model: Sucursal, as: 'sucursal' },
                                                                {
                                                                    model: Movimiento, as: 'movimiento', required: false,
                                                                    include: [{ model: Clase, as: 'clase' }]
                                                                }]
                                                            }]
                                                        }],
                                                        order: [[{ model: CajaChica, as: 'detalleCierreCaja' }, 'id', 'asc']]
                                                    }).then(function (datosEncontrados) {
                                                        res.json({ cierreCaja: datosEncontrados });
                                                    })
                                                })
                                            })
                                        }
                                    }

                                } else {
                                    CajaChica.update({
                                        id_cierre_caja_chica: cierreCajaChicaCreado.id,
                                        cerrada: true
                                    }, {
                                        where: { id: caja.id }
                                    }).then(function (cajaChicaActualizada) {
                                        if (index === (array.length - 1)) {
                                            CierreCajaChica.findAll({
                                                where: { id: cierreCajaChicaCreado.id },
                                                include: [{ model: Usuario, as: 'usuario', include: [{ model: Persona, as: 'persona' }] }, {
                                                    model: CajaChica, as: 'detalleCierreCaja',
                                                    include: [{ model: CajaChicaCentroCosto, as: 'centrosCosto', required: false },
                                                    { model: Sucursal, as: 'sucursal', where: { id: req.params.id_sucursal } },
                                                    {
                                                        model: ConceptoMovimientoCajaChica, as: 'concepto', where: { id_empresa: req.params.id_empresa },
                                                        include: [{ model: Clase, as: 'concepto' }]
                                                    },
                                                    ]
                                                }]
                                            }).then(function (cierreCaja) {
                                                cierreCaja.map(function (dato, index, array) {
                                                    if (index != 0) {
                                                        dato.saldo_inicial = ultimoSaldo
                                                    }
                                                    dato.saldo_final = dato.saldo_inicial
                                                    dato.detalleCierreCaja.map(function (detalle, idx, arr) {
                                                        if (detalle.concepto.concepto.nombre == "INGRESO") {
                                                            dato.saldo_final += detalle.monto
                                                        } else {
                                                            dato.saldo_final -= detalle.monto
                                                        }
                                                        if (idx == (arr.length - 1)) {
                                                            ultimoSaldo = dato.saldo_final;
                                                        }
                                                    })
                                                })
                                                CierreCajaChica.update({
                                                    saldo_final: ultimoSaldo
                                                }, {
                                                    where: { id: cierreCajaChicaCreado.id },
                                                }).then(function (actualizado) {
                                                    CierreCajaChica.find({
                                                        where: { id: cierreCajaChicaCreado.id },
                                                        include: [{
                                                            model: CajaChica, as: 'detalleCierreCaja',
                                                            include: [{ model: Sucursal, as: 'sucursal', where: { id: req.params.id_sucursal }, required: true }, {
                                                                model: SolicitudCajaChica, as: 'solicitud',
                                                                include: [{ model: Clase, as: 'estado' },
                                                                {
                                                                    model: MedicoPaciente, as: 'solicitante',
                                                                    include: [{ model: Persona, as: 'persona' }]
                                                                }]
                                                            },
                                                            {
                                                                model: ConceptoMovimientoCajaChica, as: 'concepto', where: { id_empresa: req.params.id_empresa },
                                                                include: [{ model: Clase, as: 'concepto' }]
                                                            },
                                                            { model: ContabilidadCuenta, as: 'cuenta' },
                                                            {
                                                                model: Compra, as: 'compra', include: [{ model: Proveedor, as: 'proveedor' },
                                                                { model: Sucursal, as: 'sucursal', where: { activo: true }, required: true },
                                                                {
                                                                    model: Movimiento, as: 'movimiento', required: false,
                                                                    include: [{ model: Clase, as: 'clase' }]
                                                                }]
                                                            }]
                                                        }],
                                                        order: [[{ model: CajaChica, as: 'detalleCierreCaja' }, 'id', 'asc']]
                                                    }).then(function (datosEncontrados) {
                                                        res.json({ cierreCaja: datosEncontrados });
                                                    })
                                                })
                                            })
                                        }
                                    })
                                }

                            })

                        })
                    })
                } else {
                    res.json({ cierreCaja: [] });
                }
            });

        })
    router.route('/cierre-caja-chica/recalcular/sucursal/:id_sucursal/empresa/:id_empresa')
        .get(function (req, res) {
            CierreCajaChica.findAll({
                include: [{ model: Usuario, as: 'usuario', include: [{ model: Persona, as: 'persona' }] }, {
                    model: CajaChica, as: 'detalleCierreCaja',
                    include: [{ model: CajaChicaCentroCosto, as: 'centrosCosto', required: false },
                    { model: Sucursal, as: 'sucursal', where: { id: req.params.id_sucursal, activo: true }, required: true },
                    {
                        model: ConceptoMovimientoCajaChica, as: 'concepto', where: { id_empresa: req.params.id_empresa },
                        include: [{ model: Clase, as: 'concepto' }]
                    },
                    ]
                }],
                order: [['id', 'asc']]
            }).then(function (cierreCaja) {
                cierreCaja.forEach(function (dato, index, array) {
                    var ultimoSaldo = 0;
                    if (index != 0) {
                        // actualizar saldo inicial ====
                        dato.saldo_inicial = array[index - 1].saldo_final;

                        CierreCajaChica.update({
                            saldo_inicial: dato.saldo_inicial
                        }, {
                            where: { id: dato.id },
                        }).then(function (actualizado) {


                        })

                    }
                    dato.saldo_final = dato.saldo_inicial
                    dato.detalleCierreCaja.forEach(function (detalle, idx, arr) {
                        if (detalle.concepto.concepto.nombre == "INGRESO") {
                            dato.saldo_final += detalle.monto
                        } else {
                            dato.saldo_final -= detalle.monto
                        }
                        if (idx == (arr.length - 1)) {
                            // ultimoSaldo = dato.saldo_final;
                            CierreCajaChica.update({
                                saldo_final: dato.saldo_final
                            }, {
                                where: { id: dato.id },
                            }).then(function (actualizadocierre) {

                            })
                        }
                    })

                    if (index == (array.length - 1)) {
                        res.json({ cierreCaja: 'actualizado' });
                    }

                })





            })
        })
    router.route('/cierre-caja-chica/sucursal/:id_sucursal/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion')
        .get(ensureAuthorizedlogged, function (req, res) {
            if (req.params.columna == 'fechaElaboracionHC') {
                textOrder = "fecha " + req.params.direccion
            } else if (req.params.columna == 'fechaInicioHC') {
                textOrder = "`inicio` " + req.params.direccion
            } else if (req.params.columna == 'fechaFinHC') {
                textOrder = "`fin` " + req.params.direccion
            } else if (req.params.columna == 'saldoInicialHC') {
                textOrder = "`saldo_inicial` " + req.params.direccion
            } else if (req.params.columna == 'montoHI') {
                textOrder = "monto " + req.params.direccion
            } else {
                textOrder = req.params.columna + " " + req.params.direccion
            }
            // if (req.params.items_pagina != '0') {
            //     textOrder = textOrder + " limit " + (req.params.items_pagina * (req.params.pagina - 1)) + ", " + req.params.items_pagina
            // }

            CierreCajaChica.count({
                distinct: true,
                include: [{ model: Usuario, as: 'usuario', where: { id_empresa: req.params.id_empresa }, include: [{ model: Persona, as: 'persona' }] }, {
                    model: CajaChica, as: 'detalleCierreCaja', required: true
                }],
                order: sequelize.literal(textOrder)
            }).then(function (data) {
                var offlimit = (req.params.items_pagina * (req.params.pagina - 1));
                // if (offlimit>0) {
                //     offlimit = offlimit +1;
                // }
                CierreCajaChica.findAll({
                    offset: (req.params.items_pagina * (req.params.pagina - 1)), limit: req.params.items_pagina,
                    include: [{ model: Usuario, as: 'usuario', where: { id_empresa: req.params.id_empresa }, include: [{ model: Persona, as: 'persona' }] }, {
                        model: CajaChica, as: 'detalleCierreCaja', required: true
                    }],
                    order: sequelize.literal(textOrder)
                }).then(function (datosEncontrados) {
                    res.json({ cierreCaja: datosEncontrados, paginas: Math.ceil(data / req.params.items_pagina) });
                    /*      res.json({ cierreCaja: datosEncontrados }); */
                })
            })
        })
    router.route('/datos-cierre-caja-chica/:id_cierre_caja/empresa/:id_empresa/sucursal/:id_sucursal')
        .get(ensureAuthorizedlogged, function (req, res) {
            CierreCajaChica.find({
                where: { id: req.params.id_cierre_caja },
                include: [{ model: Usuario, as: 'usuario', include: [{ model: Persona, as: 'persona' }] }, {
                    model: CajaChica, as: 'detalleCierreCaja',
                    include: [{ model: CajaChicaCentroCosto, as: 'centrosCosto', required: false }, {
                        model: CajaChica, as: 'cajaChicaSolicitud', include: [{
                            model: SolicitudCajaChica, as: 'solicitud',
                            include: [
                                {
                                    model: MedicoPaciente, as: 'solicitante',
                                    include: [{ model: Persona, as: 'persona' }]
                                }]
                        }]
                    },
                    { model: Sucursal, as: 'sucursal', where: { id: req.params.id_sucursal, activo: true }, required: true }, {
                        model: SolicitudCajaChica, as: 'solicitud',
                        include: [{ model: Clase, as: 'estado' },
                        {
                            model: MedicoPaciente, as: 'solicitante',
                            include: [{ model: Persona, as: 'persona' }]
                        }]
                    },
                    {
                        model: ConceptoMovimientoCajaChica, as: 'concepto', where: { id_empresa: req.params.id_empresa },
                        include: [{ model: Clase, as: 'concepto' }]
                    },
                    { model: ContabilidadCuenta, as: 'cuenta', include: [{ model: Clase, as: 'tipoAuxiliar', required: false }] },
                    {
                        model: Compra, as: 'compra', required: false, include: [{ model: Proveedor, as: 'proveedor' }, {
                            model: DetalleCompra, as: 'detallesCompra',
                            include: [
                                { model: Clase, as: 'centroCosto' }]
                        },
                        { model: Clase, as: 'tipoMovimiento', required: false },
                        { model: Sucursal, as: 'sucursal' },
                        {
                            model: Movimiento, as: 'movimiento', required: false,
                            include: [{ model: Clase, as: 'clase' }]
                        }]
                    }]
                }],
            }).then(function (datosEncontrados) {
                res.json({ cierreCaja: datosEncontrados });
                /*      res.json({ cierreCaja: datosEncontrados }); */
            })
        })
    router.route('/cierre-caja-chica/sucursal/:id_sucursal/empresa/:id_empresa')
        .get(ensureAuthorizedlogged, function (req, res) {
            CierreCajaChica.findAll({
                include: [{
                    model: CajaChica, as: 'detalleCierreCaja',
                    include: [{ model: Sucursal, as: 'sucursal', where: { id: req.params.id_sucursal, activo: true }, required: true }, {
                        model: SolicitudCajaChica, as: 'solicitud',
                        include: [{ model: Clase, as: 'estado' },
                        {
                            model: MedicoPaciente, as: 'solicitante',
                            include: [{ model: Persona, as: 'persona' }]
                        }]
                    },
                    {
                        model: ConceptoMovimientoCajaChica, as: 'concepto', where: { id_empresa: req.params.id_empresa },
                        include: [{ model: Clase, as: 'concepto' }]
                    },
                    { model: ContabilidadCuenta, as: 'cuenta' },
                    {
                        model: Compra, as: 'compra', include: [{ model: Proveedor, as: 'proveedor' },
                        { model: Sucursal, as: 'sucursal' },
                        {
                            model: Movimiento, as: 'movimiento', required: false,
                            include: [{ model: Clase, as: 'clase' }]
                        }]
                    }]
                }],
                order: [[{ model: CajaChica, as: 'detalleCierreCaja' }, 'id', 'asc']]
            }).then(function (datosEncontrados) {
                res.json({ cierreCaja: datosEncontrados });
                /*      res.json({ cierreCaja: datosEncontrados }); */
            })

        })
    //start pagator caja chica
    router.route('/caja-chica/sucursal/:id_sucursal/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion')
        .get(ensureAuthorizedlogged, function (req, res) {
            var textOrder = ""
            if (req.params.columna == 'fechaHI') {
                textOrder = "fecha " + req.params.direccion
            } else if (req.params.columna == 'sucursalHI') {
                textOrder = "`sucursal.nombre` " + req.params.direccion
            } else if (req.params.columna == 'docHI') {
                textOrder = "numero_correlativo " + req.params.direccion
            } else if (req.params.columna == 'cuentaHI') {
                textOrder = "`cuenta.nombre` " + req.params.direccion
            } else if (req.params.columna == 'conceptoHI') {
                textOrder = "`concepto.nombre` " + req.params.direccion
            } else if (req.params.columna == 'montoHI') {
                textOrder = "monto " + req.params.direccion
            } else {
                textOrder = req.params.columna + " " + req.params.direccion
            }
            var condicionCajaChica = { id_solicitud: null, eliminado: false }
            if (req.params.texto_busqueda != 0) {
                condicionCajaChica = {
                    id_solicitud: null, eliminado: false,
                    $or: [
                        {
                            numero_correlativo: parseInt(req.params.texto_busqueda),
                        }
                    ]
                };
            }
            var datosbusqueda = {
                offset: (req.params.items_pagina * (req.params.pagina - 1)), limit: req.params.items_pagina,
                include: [{ model: Usuario, as: 'usuario', include: [{ model: Persona, as: 'persona' }] },
                { model: CajaChica, as: 'cajaChicaSolicitud', include: [{ model: SolicitudCajaChica, as: 'solicitud', include: [{ model: MedicoPaciente, as: 'solicitante', include: [{ model: Persona, as: 'persona' }] }] }] },
                { model: Sucursal, as: 'sucursal', where: { id: req.params.id_sucursal, activo: true }, required: true },
                { model: ConceptoMovimientoCajaChica, as: 'concepto', where: { id_empresa: req.params.id_empresa }, include: [{ model: Clase, as: 'concepto', where: { nombre_corto: 'INGRESO' } }] }, { model: ContabilidadCuenta, as: 'cuenta' }, { model: Compra, as: 'compra', include: [{ model: Proveedor, as: 'proveedor' }, { model: Sucursal, as: 'sucursal' }, { model: Movimiento, as: 'movimiento', required: false, include: [{ model: Clase, as: 'clase' }] }] }],
                where: condicionCajaChica,
                order: sequelize.literal(textOrder)
            }
            if (req.params.items_pagina == 0) {
                delete datosbusqueda.offset
                delete datosbusqueda.limit
            }
            CajaChica.findAndCountAll({
                include: [{ model: Usuario, as: 'usuario', include: [{ model: Persona, as: 'persona' }] },
                { model: CajaChica, as: 'cajaChicaSolicitud', include: [{ model: SolicitudCajaChica, as: 'solicitud', include: [{ model: MedicoPaciente, as: 'solicitante', include: [{ model: Persona, as: 'persona' }] }] }] },
                { model: Sucursal, as: 'sucursal', where: { id: req.params.id_sucursal, activo: true }, required: true },
                { model: ConceptoMovimientoCajaChica, as: 'concepto', where: { id_empresa: req.params.id_empresa }, include: [{ model: Clase, as: 'concepto', where: { nombre_corto: 'INGRESO' } }] }, { model: ContabilidadCuenta, as: 'cuenta' }, { model: Compra, as: 'compra', include: [{ model: Proveedor, as: 'proveedor' }, { model: Sucursal, as: 'sucursal' }, { model: Movimiento, as: 'movimiento', required: false, include: [{ model: Clase, as: 'clase' }] }] }],
                where: condicionCajaChica,
                order: sequelize.literal(textOrder)
            }).then(function (data) {
                CajaChica.findAll(datosbusqueda).then(function (solicitudes) {
                    res.json({ ingresos: solicitudes, paginas: Math.ceil(data.count / req.params.items_pagina) });
                });
            });
        })

    //Ruta de los ingresos sin filtro
    router.route('/caja-chica-SolicitudesPDF/sucursal/:id_sucursal/empresa/:id_empresa')
        .get(ensureAuthorizedlogged, function (req, res) {

            CajaChica.findAll({
                //offset: (req.params.items_pagina * (req.params.pagina - 1)), limit: req.params.items_pagina,
                include: [{ model: Sucursal, as: 'sucursal', where: { id: req.params.id_sucursal, activo: true }, required: true },
                { model: ConceptoMovimientoCajaChica, as: 'concepto', where: { id_empresa: req.params.id_empresa }, include: [{ model: Clase, as: 'concepto', where: { nombre_corto: 'INGRESO' } }] },
                { model: ContabilidadCuenta, as: 'cuenta' },
                { model: Compra, as: 'compra', include: [{ model: Proveedor, as: 'proveedor' }, { model: Sucursal, as: 'sucursal' }, { model: Movimiento, as: 'movimiento', required: false, include: [{ model: Clase, as: 'clase' }] }] },
                { model: CajaChica, as: 'cajaChicaSolicitud', include: [{ model: SolicitudCajaChica, as: 'solicitud', include: [{ model: MedicoPaciente, as: 'solicitante', include: [{ model: Persona, as: 'persona', required: false }] }] }] }
                ],
                where: { id_solicitud: null, eliminado: false },
                // order: sequelize.literal(textOrder)
            }).then(function (solicitudes) {
                res.json({ ingresos: solicitudes });
            });

        })


    router.route('/caja-chica/eliminar-ingreso/caja/:id_caja')
        .post(ensureAuthorizedlogged, function (req, res) {
            sequelize.transaction(function (t) {
                return CajaChica.find({
                    where: { id: req.params.id_caja }, transaction: t
                }).then(function (cajaEncontrada) {
                    return Sucursal.find({
                        where: cajaEncontrada.id_sucursal
                    }).then((suc) => {
                        if (!suc.activo) throw new Error('Sucursal deshabilitada, no se pueden hacer cambios.')
                        if (cajaEncontrada.id_caja_chica_solicitud) {
                            return CajaChica.update({
                                eliminado: true
                            }, {
                                where: { id: req.params.id_caja }, transaction: t
                            }).then(function (actualizado) {
                                return CajaChica.find({
                                    where: { id: cajaEncontrada.id_caja_chica_solicitud }, transaction: t
                                }).then(function (cajaSolicitudEncontrada) {
                                    return CajaChica.update({
                                        eliminado: true
                                    }, {
                                        where: { id: cajaEncontrada.id_caja_chica_solicitud }, transaction: t
                                    }).then(function (actualizado) {
                                        return CajaChica.find({
                                            where: { id: cajaSolicitudEncontrada.id_padre }, transaction: t
                                        }).then(function (cajaPadreEncontrada) {
                                            if (cajaPadreEncontrada.saldo != 0) {
                                                return CajaChica.update({
                                                    pagado: cajaPadreEncontrada.pagado - cajaEncontrada.monto,
                                                    saldo: cajaPadreEncontrada.saldo + cajaEncontrada.monto
                                                }, {
                                                    where: { id: cajaPadreEncontrada.id }, transaction: t
                                                }).then(function (actualizado) {
                                                    return new Promise(function (fulfill, reject) {
                                                        fulfill()
                                                    });
                                                }).catch(function (err) {
                                                    return new Promise(function (fulfill, reject) {
                                                        reject((err.stack !== undefined) ? err.stack : err);
                                                    });
                                                });
                                            } else {
                                                return Clase.find({
                                                    where: { nombre_corto: 'DESEMBOLSADO' }, transaction: t
                                                }).then(function (claseEncontrada) {
                                                    return CajaChica.update({
                                                        pagado: cajaPadreEncontrada.pagado - cajaEncontrada.monto,
                                                        saldo: cajaPadreEncontrada.saldo + cajaEncontrada.monto,
                                                    }, {
                                                        where: { id: cajaPadreEncontrada.id }, transaction: t
                                                    }).then(function (actualizado) {
                                                        return SolicitudCajaChica.update({
                                                            id_estado: claseEncontrada.id,
                                                        }, {
                                                            where: { id: cajaPadreEncontrada.id_solicitud }, transaction: t
                                                        }).then(function (SolicitudActualizada) {
                                                            return new Promise(function (fulfill, reject) {
                                                                fulfill()
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
                        } else {
                            return CajaChica.update({
                                eliminado: true
                            }, {
                                where: { id: req.params.id_caja }, transaction: t
                            }).then(function (actualizado) {
                                res.json({ mensaje: 'Eliminado Satisfactoriamente' })
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
                })
            }).then(function (result) {
                res.json({ mensaje: 'Eliminado Satisfactoriamente' })
            }).catch(function (err) {
                var error = (err.stack) ? err.stack : err
                res.json({ hasError: true, mensaje: error });
            });

        })
    //Start paginador solicitudes
    router.route('/solocitudes-caja-chica/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/solicitante/:solicitante/usuario/:usuario/estado/:estado/concepto/:concepto/movimiento/:movimiento/usuario-no-autorizado/:id_usuario_no_autorizado/autorizador/:autorizador/inicio/:inicio/fin/:fin/proveedor/:proveedor/campo/:campo/area/:area/doc/:doc/empleado_usuario/:id_empleado_usuario')
        .get(ensureAuthorizedlogged, function (req, res) {

            var condicionSolicitudCajaChica = {}, condicionCampo = {}, condicionArea = {};
            var condicionCajaChica = {}
            var datosCajaChica = {
                model: CajaChica, as: 'cajasChicas', required: false, where: condicionCajaChica,
                include: [{ model: ConceptoMovimientoCajaChica, as: 'concepto' },
                {
                    model: Usuario, as: 'usuario',
                    include: [{ model: Persona, as: 'persona' }]
                }]
            }
            if (req.params.inicio != 0) {
                var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0);
                var fin = new Date(req.params.fin); fin.setHours(23, 59, 0, 0);
                condicionSolicitudCajaChica.fecha = { $between: [inicio, fin] };
            }
            if (req.params.campo != '0') {
                condicionCampo.id = req.params.campo
            }
            if (req.params.campo != '0') {
                condicionCampo.id = req.params.campo
            }
            if (req.params.area != '0') {
                condicionArea.id = req.params.area
            }
            // if (req.params.inicio != 0) {
            //     var inicio = req.params.inicio.split('/').reverse().join('-');
            //     var fin = req.params.fin.split('/').reverse().join('-');
            //     condicionSolicitudCajaChica.fecha = { $between: [inicio, fin] }
            // }
            /* var condicionSolicitud={} */
            var condicionPersonaUsuario = {};
            var condicionPersonaSolicitanter = {};
            if (req.params.estado != 0) {
                condicionSolicitudCajaChica.id_estado = req.params.estado
            }
            if (req.params.doc != 0) {
                condicionCajaChica.numero_correlativo = req.params.doc
                datosCajaChica.required = true
            }
            if (req.params.concepto != 0) {
                condicionSolicitudCajaChica.id_concepto = req.params.concepto
            }
            if (req.params.usuario != 0) {
                condicionPersonaUsuario.nombre_completo = {
                    $like: "%" + req.params.usuario + "%"
                }
            }
            if (req.params.solicitante != 0) {
                condicionPersonaSolicitanter.nombre_completo = {
                    $like: "%" + req.params.solicitante + "%"
                }
            }
            if (req.params.id_usuario_no_autorizado != 0) {
                condicionSolicitudCajaChica.id_usuario = parseInt(req.params.id_usuario_no_autorizado)
            }

            if (req.params.texto_busqueda != 0) {
                condicionSolicitudCajaChica = {
                    $or: [
                        {
                            detalle: {
                                $like: "%" + req.params.texto_busqueda + "%"
                            }
                        }
                    ]
                };
            }
            var condicionConceptoClase = {}
            if (req.params.movimiento != '0') {
                condicionConceptoClase.id = req.params.movimiento
            }

            var condicionPersonaAutorizador;
            if (req.params.autorizador != 0) {
                condicionPersonaAutorizador = {
                    nombre_completo: {
                        $like: "%" + req.params.autorizador + "%"
                    }
                }
            }

            var textOrder = ""
            if (req.params.columna == 'usuario_solicitante') {
                textOrder = "`usuario.persona.nombre_completo` " + req.params.direccion
            } else if (req.params.columna == 'concepto') {
                textOrder = "`concepto.nombre` " + req.params.direccion
            } else if (req.params.columna == 'beneficiario') {
                textOrder = "`solicitante.persona.nombre_completo` " + req.params.direccion
            } else if (req.params.columna == 'autorizador') {
                textOrder = "`autorizador.persona.nombre_completo` " + req.params.direccion
            } else if (req.params.columna == 'verificador') {
                textOrder = "`verificador.persona.nombre_completo` " + req.params.direccion
            } else if (req.params.columna == 'fecha') {
                textOrder = "fecha " + req.params.direccion
            } else if (req.params.columna == 'detalle') {
                textOrder = "detalle " + req.params.direccion
            } else if (req.params.columna == 'estado') {
                textOrder = "`estado.nombre` " + req.params.direccion
            } else if (req.params.columna == 'monto') {
                textOrder = "monto " + req.params.direccion
            } else if (req.params.columna == 'proveedor') {
                textOrder = "`proveedor.razon_social` " + req.params.direccion
            } else {
                textOrder = req.params.columna + " " + req.params.direccion
            }
            var modelProveedor = { model: Proveedor, as: 'proveedor', required: false }
            var condicionProveedor = {}
            if (req.params.proveedor != 0) {
                if (isNaN(parseInt(req.params.proveedor))) {
                    condicionProveedor.razon_social = {
                        $like: "%" + req.params.proveedor + "%"
                    }
                } else {
                    condicionProveedor.nit = req.params.proveedor
                }

                modelProveedor = { model: Proveedor, as: 'proveedor', where: condicionProveedor }
            }
            if (req.params.id_empleado_usuario != "0") {
                condicionSolicitudCajaChica.id_solicitante = req.params.id_empleado_usuario
                SolicitudCajaChica.findAndCountAll({
                    where: condicionSolicitudCajaChica,
                    include: [modelProveedor, {
                        model: Usuario, as: 'autorizador',
                        include: [{ model: Persona, as: 'persona' }]
                    }, { model: Sucursal, as: 'sucursal', where: { activo: true }, required: true }, {
                            model: MedicoPaciente,
                            as: 'solicitante', include: [{ model: RrhhEmpleadoFicha, as: 'empleadosFichas', where: { activo: true }, required: false, include: [{ model: Clase, as: 'area', where: condicionArea, required: false }] }, { model: Clase, as: 'campo', where: condicionCampo }, { model: Persona, as: 'persona', where: condicionPersonaSolicitanter }]
                        },
                        {
                            model: ConceptoMovimientoCajaChica, as: 'concepto',
                            include: [{ model: Clase, as: 'concepto', where: condicionConceptoClase }]
                        },
                        { model: Clase, as: 'estado' }, {
                            model: Usuario, as: 'usuario',
                            where: { id_empresa: req.params.id_empresa },
                            include: [{ model: Persona, as: 'persona', where: condicionPersonaUsuario }]
                        }, datosCajaChica]
                }).then(function (data) {
                    if (req.params.items_pagina != '0') {
                        textOrder = textOrder + " limit " + (req.params.items_pagina * (req.params.pagina - 1)) + ", " + req.params.items_pagina
                    }

                    SolicitudCajaChica.findAll({
                        where: condicionSolicitudCajaChica,
                        include: [modelProveedor, {
                            model: Usuario, as: 'autorizador',
                            include: [{ model: Persona, as: 'persona' }]
                        }, { model: Sucursal, as: 'sucursal', where: { activo: true }, required: true }, {
                                model: MedicoPaciente,
                                as: 'solicitante', include: [{ model: RrhhEmpleadoFicha, as: 'empleadosFichas', where: { activo: true }, required: false, include: [{ model: Clase, as: 'area', where: condicionArea, required: false }] }, { model: Clase, as: 'campo', where: condicionCampo }, { model: Persona, as: 'persona', where: condicionPersonaSolicitanter }]
                            },
                            {
                                model: ConceptoMovimientoCajaChica, as: 'concepto',
                                include: [{ model: Clase, as: 'concepto', where: condicionConceptoClase }]
                            },
                            { model: Clase, as: 'estado' }, {
                                model: Usuario, as: 'usuario',
                                where: { id_empresa: req.params.id_empresa },
                                include: [{ model: Persona, as: 'persona', where: condicionPersonaUsuario }]
                            }, datosCajaChica],
                        group: ['id'],
                        order: sequelize.literal(textOrder)
                    }).then(function (solicitudes) {
                        res.json({ solicitudes: solicitudes, paginas: Math.ceil(data.count / req.params.items_pagina) });
                    });

                });
            } else {
                SolicitudCajaChica.findAndCountAll({
                    where: condicionSolicitudCajaChica,
                    include: [modelProveedor, {
                        model: Usuario, as: 'autorizador',
                        include: [{ model: Persona, as: 'persona', where: condicionPersonaAutorizador }]
                    }, { model: Sucursal, as: 'sucursal', where: { activo: true }, required: true }, {
                            model: MedicoPaciente,
                            as: 'solicitante', include: [{ model: RrhhEmpleadoFicha, as: 'empleadosFichas', where: { activo: true }, required: false, include: [{ model: Clase, as: 'area', where: condicionArea, required: false }] }, { model: Clase, as: 'campo', where: condicionCampo }, { model: Persona, as: 'persona', where: condicionPersonaSolicitanter }]
                        },
                        {
                            model: ConceptoMovimientoCajaChica, as: 'concepto',
                            include: [{ model: Clase, as: 'concepto', where: condicionConceptoClase }]
                        },
                        { model: Clase, as: 'estado' }, {
                            model: Usuario, as: 'usuario',
                            where: { id_empresa: req.params.id_empresa },
                            include: [{ model: Persona, as: 'persona', where: condicionPersonaUsuario }]
                        }, datosCajaChica]
                }).then(function (data) {
                    if (req.params.items_pagina != '0') {
                        textOrder = textOrder + " limit " + (req.params.items_pagina * (req.params.pagina - 1)) + ", " + req.params.items_pagina
                    }

                    SolicitudCajaChica.findAll({
                        where: condicionSolicitudCajaChica,
                        include: [modelProveedor, {
                            model: Usuario, as: 'autorizador',
                            include: [{ model: Persona, as: 'persona', where: condicionPersonaAutorizador }]
                        }, { model: Sucursal, as: 'sucursal', where: { activo: true }, required: true }, {
                                model: MedicoPaciente,
                                as: 'solicitante', include: [{ model: RrhhEmpleadoFicha, as: 'empleadosFichas', where: { activo: true }, required: false, include: [{ model: Clase, as: 'area', where: condicionArea, required: false }] }, { model: Clase, as: 'campo', where: condicionCampo }, { model: Persona, as: 'persona', where: condicionPersonaSolicitanter }]
                            },
                            {
                                model: ConceptoMovimientoCajaChica, as: 'concepto',
                                include: [{ model: Clase, as: 'concepto', where: condicionConceptoClase }]
                            },
                            { model: Clase, as: 'estado' }, {
                                model: Usuario, as: 'usuario',
                                where: { id_empresa: req.params.id_empresa },
                                include: [{ model: Persona, as: 'persona', where: condicionPersonaUsuario }]
                            }, datosCajaChica],
                        group: ['id'],
                        order: sequelize.literal(textOrder)
                    }).then(function (solicitudes) {
                        res.json({ solicitudes: solicitudes, paginas: Math.ceil(data.count / req.params.items_pagina) });
                    });

                });
            }
        });
    //End paginador

    //Ruta de todo solicitud caja chica
    router.route('/todo-solicitudes-caja-chica/inicio/:inicio/fin/:fin/empresa/:id_empresa/estado/:estado/solicitante/:solicitante/usuario/:usuario/usuario_no_autorizado/:id_usuario_no_autorizado')
        .get(function (req, res) {

            var condicionCajaChica = {};
            if (req.params.inicio != 0 && req.params.fin != 0) {
                var inicio = req.params.inicio.split('/').reverse().join('-');
                var fin = req.params.fin.split('/').reverse().join('-');
                condicionCajaChica.fecha = { $between: [inicio, fin] }
            }
            var condicionPersonaUsuario = {};
            var condicionPersonaSolicitanter = {};
            var condicionConceptoClase = {}

            if (req.params.estado != 0) {
                condicionCajaChica.id_estado = req.params.estado
            }
            /*if (req.params.concepto != 0) {
                condicionCajaChica.id_concepto = req.params.concepto
            }*/
            if (req.params.usuario != 0) {
                condicionPersonaUsuario.nombre_completo = {
                    $like: "%" + req.params.usuario + "%"
                }
            }
            if (req.params.solicitante != 0) {
                condicionPersonaSolicitanter.nombre_completo = {
                    $like: "%" + req.params.solicitante + "%"
                }
            }
            if (req.params.id_usuario_no_autorizado != 0) {
                condicionCajaChica.id_usuario = parseInt(req.params.id_usuario_no_autorizado)
            }

            SolicitudCajaChica.findAll({
                where: condicionCajaChica,
                include: [{
                    model: Usuario, as: 'autorizador',
                    include: [{ model: Persona, as: 'persona' }]
                }, { model: Sucursal, as: 'sucursal', where: { activo: true }, required: true }, { model: MedicoPaciente, as: 'solicitante', include: [{ model: Persona, as: 'persona', where: condicionPersonaSolicitanter }] }, { model: ConceptoMovimientoCajaChica, as: 'concepto', include: [{ model: Clase, as: 'concepto', where: condicionConceptoClase }] }, { model: Clase, as: 'estado' }, { model: Usuario, as: 'usuario', where: { id_empresa: req.params.id_empresa }, include: [{ model: Persona, as: 'persona', where: condicionPersonaUsuario }] }],
                //offset: (req.params.items_pagina * (req.params.pagina - 1)),
                //limit: req.params.items_pagina,
                //order: sequelize.literal(textOrder)
            }).then(function (solicitudes) {
                res.json({ solicitudes: solicitudes })
            });
        })

    //paginator caja chica

    router.route('/caja-chica-fondoarendir-ingreso/sucursal/:id_sucursal/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion')
        .get(ensureAuthorizedlogged, function (req, res) {
            var condicionSolicitudCajaChica = { id_sucursal: req.params.id_sucursal, id_solicitante: { $ne: null }, eliminado: false },
                condicionBeneficiario = {},
                condicionCajaChica = { id_padre: null, saldo: { $ne: 0 } };
            if (req.params.texto_busqueda != '0') {
                if (isNaN(parseInt(req.params.texto_busqueda))) {
                    condicionBeneficiario = { nombre_completo: { $like: "%" + req.params.texto_busqueda + "%" } }
                } else {
                    condicionCajaChica.numero_correlativo = req.params.texto_busqueda
                }
            }
            var textOrder = ""
            if (req.params.columna == 'beneficiario_devolucion') {
                textOrder = "`solicitante.persona.nombre_completo` " + req.params.direccion
            } else if (req.params.columna == 'fecha_devolucion') {
                textOrder = "fecha " + req.params.direccion
            } else if (req.params.columna == 'monto_devolucion') {
                textOrder = "monto " + req.params.direccion
            } else if (req.params.columna == 'doc_devolucion') {
                textOrder = "cajasChicas.numero_correlativo " + req.params.direccion
            } else {
                textOrder = req.params.columna + " " + req.params.direccion
            }
            if (req.params.items_pagina != '0') {
                textOrder = textOrder + " limit " + (req.params.items_pagina * (req.params.pagina - 1)) + ", " + req.params.items_pagina
            }
            var datosbusqueda = {
                where: condicionSolicitudCajaChica,
                include: [{
                    model: CajaChica, as: 'cajasChicas', where: condicionCajaChica,
                    include: [{ model: Usuario, as: 'usuario', include: [{ model: Persona, as: 'persona' }] }, {
                        model: Compra, as: 'compra',
                        include: [{ model: Proveedor, as: 'proveedor' }]
                    }, { model: ContabilidadCuenta, as: 'cuenta' }]
                }, {
                    model: Usuario, as: 'autorizador',
                    include: [{ model: Persona, as: 'persona' }]
                }, { model: CajaChicaRendicionFondo, as: 'rendicionFondo' },
                {
                    model: Usuario, as: 'verificador',
                    include: [{ model: Persona, as: 'persona' }]
                }, { model: Sucursal, as: 'sucursal', where: { activo: true }, required: true }, { model: MedicoPaciente, as: 'solicitante', include: [{ model: Persona, as: 'persona', where: condicionBeneficiario }] },
                { model: ConceptoMovimientoCajaChica, as: 'concepto', where: { nombre: 'FONDOS A RENDIR' }, include: [{ model: Clase, as: 'concepto' }] }, { model: Clase, as: 'estado' },
                { model: Usuario, as: 'usuario', include: [{ model: Persona, as: 'persona' }] }],

            }
            datosbusqueda.group = ["`agil_solicitud_caja_chica`.`id`"]
            SolicitudCajaChica.count(
                datosbusqueda
            ).then(function (count) {
                datosbusqueda.order = sequelize.literal(textOrder)
                SolicitudCajaChica.findAll(
                    datosbusqueda
                ).then(function (solicitudes) {
                    res.json({ solicitudes: solicitudes, paginas: Math.ceil(count.length / req.params.items_pagina) });
                })
            })
        })
    router.route('/caja-chica/sucursal/:id_sucursal/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/solicitante/:solicitante/usuario/:usuario/estado/:estado/concepto/:concepto/movimiento/:movimiento/usuario-no-autorizado/:id_usuario_no_autorizado/rendiciones/:rendiciones/inicio/:inicio/fin/:fin/campo/:campo/proveedor/:proveedor')
        .get(ensureAuthorizedlogged, function (req, res) {
            var condicionCajaChica = { id_sucursal: req.params.id_sucursal };
            //  var condicionSolicitud={}
            var condicionPersonaUsuario = {};
            var condicionPersonaSolicitanter = {};
            var condicionTipo = {}
            if (req.params.inicio != 0) {
                var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0);
                var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 59);
                condicionCajaChica.fecha = { $between: [inicio, fin] };

            }
            if (req.params.estado != 0) {
                condicionCajaChica.id_estado = req.params.estado
            }
            if (req.params.rendiciones != 0) {
                condicionTipo.nombre_corto = "DESEMBOLSADO"
            }
            if (req.params.concepto != 0) {
                condicionCajaChica.id_concepto = req.params.concepto
            }
            if (req.params.usuario != 0) {
                condicionPersonaUsuario.nombre_completo = {
                    $like: "%" + req.params.usuario + "%"
                }
            }
            if (req.params.solicitante != 0) {
                condicionPersonaSolicitanter.nombre_completo = {
                    $like: "%" + req.params.solicitante + "%"
                }
            }
            if (req.params.id_usuario_no_autorizado != 0) {
                condicionCajaChica.id_usuario = parseInt(req.params.id_usuario_no_autorizado)
            }

            if (req.params.texto_busqueda != 0) {
                condicionCajaChica = {
                    $or: [
                        {
                            detalle: {
                                $like: "%" + req.params.texto_busqueda + "%"
                            }
                        }
                    ]
                };
            }
            var condicionConceptoClase = {}
            if (req.params.movimiento != '0') {
                condicionConceptoClase.id = req.params.movimiento
            }
            var condicionCampo = {}
            if (req.params.campo != '0') {
                condicionCampo.id = req.params.campo
            }
            var ordenArreglo = []
            var textOrder = ""
            if (req.params.columna == 'usuario_solicitante') {
                textOrder = "`usuario.persona.nombre_completo` " + req.params.direccion
            } else if (req.params.columna == 'concepto') {
                textOrder = "`concepto.nombre` " + req.params.direccion
            } else if (req.params.columna == 'beneficiario') {
                textOrder = "`solicitante.persona.nombre_completo` " + req.params.direccion
            } else if (req.params.columna == 'autorizador') {
                textOrder = "`autorizador.persona.nombre_completo` " + req.params.direccion
            } else if (req.params.columna == 'verificador') {
                textOrder = "`verificador.persona.nombre_completo` " + req.params.direccion
            } else if (req.params.columna == 'movimiento') {
                textOrder = "`concepto.concepto.nombre` " + req.params.direccion
            } else if (req.params.columna == 'fecha') {
                textOrder = "fecha " + req.params.direccion
            } else if (req.params.columna == 'detalle') {
                textOrder = "detalle " + req.params.direccion
            } else if (req.params.columna == 'estado') {
                textOrder = "`estado.nombre` " + req.params.direccion
            } else if (req.params.columna == 'monto') {
                textOrder = "monto " + req.params.direccion
            } else if (req.params.columna == 'doc') {
                textOrder = "cajasChicas.numero_correlativo " + req.params.direccion
            } else if (req.params.columna == 'proveedor') {
                textOrder = "`proveedor.razon_social` " + req.params.direccion
            } else if (req.params.columna == 'campo') {
                textOrder = "`solicitante.campo.nombre` " + req.params.direccion
            } else {
                textOrder = req.params.columna + " " + req.params.direccion
            }

            var modelProveedor = { model: Proveedor, as: 'proveedor', required: false }
            var condicionProveedor = {}
            if (req.params.proveedor != 0) {
                if (isNaN(parseInt(req.params.proveedor))) {
                    condicionProveedor.razon_social = {
                        $like: "%" + req.params.proveedor + "%"
                    }
                } else {
                    condicionProveedor.nit = req.params.proveedor
                }

                modelProveedor = { model: Proveedor, as: 'proveedor', where: condicionProveedor }
            }
            if (req.params.items_pagina != '0') {
                textOrder = textOrder + " limit " + (req.params.items_pagina * (req.params.pagina - 1)) + ", " + req.params.items_pagina
            }
            var datosbusqueda = {
                //offset: 
                where: condicionCajaChica,
                include: [modelProveedor,
                    {
                        model: Usuario, as: 'autorizador', required: false,
                        include: [{ model: Persona, as: 'persona' }]
                    },
                    {
                        model: Usuario, as: 'verificador', required: false,
                        include: [{ model: Persona, as: 'persona' }]
                    }, { model: Sucursal, as: 'sucursal', where: { activo: true }, required: true },
                    {
                        model: ConceptoMovimientoCajaChica, as: 'concepto',
                        include: [{ model: Clase, as: 'concepto', where: condicionConceptoClase }]
                    },
                    { model: Clase, as: 'estado' },
                    {
                        model: Usuario, as: 'usuario', where: { id_empresa: req.params.id_empresa },
                        include: [{ model: Persona, as: 'persona', where: condicionPersonaUsuario }]
                    },
                    {
                        model: MedicoPaciente, as: 'solicitante',
                        include: [{
                            model: RrhhEmpleadoFicha, as: 'empleadosFichas', where: { activo: true }, required: false,
                            include: [{ model: Clase, as: 'area' }]
                        },
                        { model: Clase, as: 'campo', where: condicionCampo },
                        { model: Persona, as: 'persona', where: condicionPersonaSolicitanter }]
                    }, {
                        model: CajaChica, as: 'cajasChicas', required: false,
                        include: [{ model: ConceptoMovimientoCajaChica, as: 'concepto' },
                        {
                            model: Usuario, as: 'usuario',
                            include: [{ model: Persona, as: 'persona' }]
                        }]
                    }
                ],
                order: sequelize.literal(textOrder)
            }
            Sucursal.find({
                where: {
                    id: req.params.id_sucursal
                }
            }).then((suc) => {
                if (!suc.activo) return res.json({ mensaje: 'Sucursal deshabilitada, no se puede recabar la información requerida.', hasError: true, hasErr: true, totalRlCaja: 0, total: 0, solicitudes: [], TotalVales: 0, paginas: 0 })
                SolicitudCajaChica.findAndCountAll(
                    datosbusqueda
                ).then(function (data) {
                    datosbusqueda.group = ['`agil_solicitud_caja_chica`.`id`'],
                        SolicitudCajaChica.findAll(
                            datosbusqueda
                        ).then(function (solicitudes) {
                            sequelize.query("SELECT SUM(c.monto) as total from agil_vale_caja_chica as c inner join agil_solicitud_caja_chica as s on c.solicitud=s.id inner join agil_sucursal as ss on s.sucursal = ss.id inner join gl_clase as cl on c.estado=cl.id\
                    where cl.nombre_corto='PENDIENTE' and  c.eliminado=false and ss.empresa ="+ req.params.id_empresa + " and s.sucursal=" + req.params.id_sucursal, { type: sequelize.QueryTypes.SELECT })
                                .then(function (vales) {
                                    sequelize.query("SELECT SUM(c.monto) as total from agil_caja_chica as c inner JOIN agil_concepto_movimiento_caja_chica as m on c.concepto=m.id INNER JOIN gl_clase as g on m.movimiento=g.id\
                    where g.nombre_corto='INGRESO' and c.eliminado=false and c.cerrada = false and c.padre is null and m.empresa ="+ req.params.id_empresa + " and c.sucursal=" + req.params.id_sucursal, { type: sequelize.QueryTypes.SELECT })
                                        .then(function (ingreso) {
                                            sequelize.query("SELECT SUM(c.monto) as total from agil_caja_chica as c inner JOIN agil_concepto_movimiento_caja_chica as m on c.concepto=m.id INNER JOIN gl_clase as g on m.movimiento=g.id\
                    where g.nombre_corto='INGRESO'and c.cerrada = true and c.eliminado=false and c.padre is null and m.empresa ="+ req.params.id_empresa + " and c.sucursal=" + req.params.id_sucursal, { type: sequelize.QueryTypes.SELECT })
                                                .then(function (ingresoCerrados) {
                                                    sequelize.query("SELECT SUM(c.monto) as total from agil_caja_chica as c inner JOIN agil_concepto_movimiento_caja_chica as m on c.concepto=m.id INNER JOIN gl_clase as g on m.movimiento=g.id\
                        where g.nombre_corto='GASTO' and c.eliminado=false and c.cerrada = false and c.padre is null and m.empresa ="+ req.params.id_empresa + " and c.sucursal=" + req.params.id_sucursal +
                                                        " or g.nombre_corto='KARDEX' and c.cerrada = false and c.padre is null and m.empresa =" + req.params.id_empresa + " and c.sucursal=" + req.params.id_sucursal + "\
                                            or g.nombre_corto='ANTICIPO' and c.cerrada = false and c.padre is null and m.empresa =" + req.params.id_empresa + " and c.sucursal=" + req.params.id_sucursal + "\
                                            or g.nombre_corto='PROVEEDOR' and c.cerrada = false and c.padre is null and m.empresa =" + req.params.id_empresa + " and c.sucursal=" + req.params.id_sucursal, { type: sequelize.QueryTypes.SELECT })
                                                        .then(function (egreso) {
                                                            sequelize.query("SELECT SUM(c.monto) as total from agil_caja_chica as c inner JOIN agil_concepto_movimiento_caja_chica as m on c.concepto=m.id INNER JOIN gl_clase as g on m.movimiento=g.id\
                        where g.nombre_corto='GASTO' and c.eliminado=false and c.cerrada = true and c.padre is null and m.empresa ="+ req.params.id_empresa + " and c.sucursal=" + req.params.id_sucursal +
                                                                " or g.nombre_corto='KARDEX' and c.cerrada = true and c.padre is null and m.empresa =" + req.params.id_empresa + " and c.sucursal=" + req.params.id_sucursal + "\
                                                    or g.nombre_corto='ANTICIPO' and c.cerrada = true and c.padre is null and m.empresa =" + req.params.id_empresa + " and c.sucursal=" + req.params.id_sucursal + "\
                                                    or g.nombre_corto='PROVEEDOR' and c.cerrada = true and c.padre is null and m.empresa =" + req.params.id_empresa + " and c.sucursal=" + req.params.id_sucursal, { type: sequelize.QueryTypes.SELECT })
                                                                .then(function (egresosCerrados) {
                                                                    var total = 0
                                                                    var totalRlCaja = 0
                                                                    if (ingreso[0].total != null) {
                                                                        total = ingreso[0].total
                                                                        // totalRlCaja = ingreso[0].total
                                                                    }
                                                                    if (egresosCerrados[0].total != null) {
                                                                        total -= egresosCerrados[0].total
                                                                        totalRlCaja -= egresosCerrados[0].total
                                                                    }
                                                                    if (egreso[0].total != null) {
                                                                        total -= egreso[0].total
                                                                    }
                                                                    if (ingresoCerrados[0].total != null) {
                                                                        total += ingresoCerrados[0].total
                                                                        totalRlCaja += ingresoCerrados[0].total
                                                                    }
                                                                    /* if (req.params.columna == "usuario_solicitante") {
                                                                        solicitudes = solicitudes.sort(function (a, b) {
                                                                            if (req.params.direccion) {
                                                                                return a.usuario.persona.nombre_completo < b.usuario.persona.nombre_completo;
                                                                            } else {
                                                                                return a.usuario.persona.nombre_completo > b.usuario.persona.nombre_completo;
                                                                            }
        
                                                                        });
                                                                        res.json({ totalRlCaja: totalRlCaja, total: total, solicitudes: solicitudes, TotalVales: vales[0].total, paginas: Math.ceil(data.count / req.params.items_pagina) });
                                                                    } else if (req.params.columna == "id") { */
                                                                    res.json({ totalRlCaja: totalRlCaja, total: total, solicitudes: solicitudes, TotalVales: vales[0].total, paginas: Math.ceil(data.count / req.params.items_pagina) });
                                                                    /* } */

                                                                });
                                                        });
                                                });
                                        });
                                })
                        });
                });
            }).catch((err) => {
                res.json({ mensaje: err.stack, hasError: true, hasErr: true, totalRlCaja: 0, total: 0, solicitudes: [], TotalVales: 0, paginas: 0 })
            })
        });
    //fin paginator

    //Ruta Caja chica para el PDF
    router.route('/caja-chicaPDF/sucursal/:id_sucursal/empresa/:id_empresa/usuario-no-autorizado/:id_usuario_no_autorizado/inicio/:inicio/fin/:fin/concepto/:concepto/estado/:estado/movimiento/:movimiento/solicitante/:solicitante/usuario/:usuario')
        .get(ensureAuthorizedlogged, function (req, res) {

            var condicionCajaChica = { id_sucursal: req.params.id_sucursal };

            if (req.params.inicio != "0" && req.params.fin != "0") {
                var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0);
                var fin = new Date(req.params.fin); fin.setHours(23, 59, 0, 0);
                condicionCajaChica.fecha = { $between: [inicio, fin] };
            }

            if (req.params.concepto != 0) {
                condicionCajaChica.id_concepto = req.params.concepto
            }
            //  var condicionSolicitud={}
            /*var condicionPersonaUsuario = {};
            var condicionPersonaSolicitanter = {};
            var condicionTipo = {}
            if (req.params.estado != 0) {
                condicionCajaChica.id_estado = req.params.estado
            }
            if (req.params.rendiciones != 0) {
                condicionTipo.nombre_corto = "DESEMBOLSADO"
            }
            if (req.params.concepto != 0) {
                condicionCajaChica.id_concepto = req.params.concepto
            }
            if (req.params.usuario != 0) {
                condicionPersonaUsuario.nombre_completo = {
                    $like: "%" + req.params.usuario + "%"
                }
            }
            */
            var condicionPersonaUsuario = {};
            if (req.params.usuario != 0) {
                condicionPersonaUsuario.nombre_completo = {
                    $like: "%" + req.params.usuario + "%"
                }
            }
            var condicionPersonaSolicitante = {}
            if (req.params.solicitante != 0) {
                condicionPersonaSolicitante.nombre_completo = {
                    $like: "%" + req.params.solicitante + "%"
                }
            }
            if (req.params.estado != 0) {
                condicionCajaChica.id_estado = req.params.estado
            }

            if (req.params.id_usuario_no_autorizado != 0) {
                condicionCajaChica.id_usuario = parseInt(req.params.id_usuario_no_autorizado)
            }


            var condicionConceptoClase = {}
            if (req.params.movimiento != '0') {
                condicionConceptoClase.id = req.params.movimiento
            }
            var ordenArreglo = []

            var datosbusqueda = {
                // offset: (req.params.items_pagina * (req.params.pagina - 1)), limit: req.params.items_pagina,
                where: condicionCajaChica,
                include: [{
                    model: Usuario, as: 'autorizador',
                    include: [{ model: Persona, as: 'persona' }]
                },
                {
                    model: Usuario, as: 'verificador',
                    include: [{ model: Persona, as: 'persona' }]
                },
                { model: Sucursal, as: 'sucursal', where: { activo: true }, required: true }, { model: MedicoPaciente, as: 'solicitante', include: [{ model: RrhhEmpleadoFicha, as: 'empleadosFichas', where: { activo: true }, required: false, include: [{ model: Clase, as: 'area' }] }, { model: Clase, as: 'campo' }, { model: Persona, as: 'persona', where: condicionPersonaSolicitante }] }, { model: ConceptoMovimientoCajaChica, as: 'concepto', include: [{ model: Clase, as: 'concepto', where: condicionConceptoClase }] }, { model: Clase, as: 'estado' }, { model: Usuario, as: 'usuario', where: { id_empresa: req.params.id_empresa }, include: [{ model: Persona, as: 'persona', where: condicionPersonaUsuario }] },
                { model: CajaChica, as: 'cajasChicas', include: [{ model: Compra, as: 'compra', include: [{ model: Proveedor, as: 'proveedor' }, { model: Movimiento, as: 'movimiento', include: [{ model: Clase, as: 'clase' }] }] }, { model: ContabilidadCuenta, as: 'cuenta' }] }]
                ///order: sequelize.literal(textOrder)
            }
            Sucursal.find({
                where: {
                    id: req.params.id_sucursal
                }
            }).then((suc) => {
                if (!suc.activo) return res.json({ hasError: true, hasErr: true, mensaje: 'Sucursal deshabilitada, no se puede obtener información.', totalRlCaja: 0, total: 0, solicitudes: [] });
                SolicitudCajaChica.findAll(
                    datosbusqueda
                ).then(function (solicitudes) {
                    sequelize.query("SELECT SUM(c.monto) as total from agil_caja_chica as c inner JOIN agil_concepto_movimiento_caja_chica as m on c.concepto=m.id INNER JOIN gl_clase as g on m.movimiento=g.id\
                    where g.nombre_corto='INGRESO'and c.cerrada = false and c.padre is null and m.empresa ="+ req.params.id_empresa + " and c.sucursal=" + req.params.id_sucursal, { type: sequelize.QueryTypes.SELECT })
                        .then(function (ingreso) {
                            sequelize.query("SELECT SUM(c.monto) as total from agil_caja_chica as c inner JOIN agil_concepto_movimiento_caja_chica as m on c.concepto=m.id INNER JOIN gl_clase as g on m.movimiento=g.id\
                    where g.nombre_corto='INGRESO'and c.cerrada = true and c.padre is null and m.empresa ="+ req.params.id_empresa + " and c.sucursal=" + req.params.id_sucursal, { type: sequelize.QueryTypes.SELECT })
                                .then(function (ingresoCerrados) {
                                    sequelize.query("SELECT SUM(c.monto) as total from agil_caja_chica as c inner JOIN agil_concepto_movimiento_caja_chica as m on c.concepto=m.id INNER JOIN gl_clase as g on m.movimiento=g.id\
                        where g.nombre='GASTO' and c.cerrada = false and c.padre is null and m.empresa ="+ req.params.id_empresa + " and c.sucursal=" + req.params.id_sucursal +
                                        " or g.nombre_corto='KARDEX' and c.cerrada = false and c.padre is null and m.empresa =" + req.params.id_empresa + " and c.sucursal=" + req.params.id_sucursal + "\
                                            or g.nombre_corto='ANTICIPO' and c.cerrada = false and c.padre is null and m.empresa =" + req.params.id_empresa + " and c.sucursal=" + req.params.id_sucursal, { type: sequelize.QueryTypes.SELECT })
                                        .then(function (egreso) {
                                            sequelize.query("SELECT SUM(c.monto) as total from agil_caja_chica as c inner JOIN agil_concepto_movimiento_caja_chica as m on c.concepto=m.id INNER JOIN gl_clase as g on m.movimiento=g.id\
                        where g.nombre='GASTO' and c.cerrada = true and c.padre is null and m.empresa ="+ req.params.id_empresa + " and c.sucursal=" + req.params.id_sucursal +
                                                " or g.nombre_corto='KARDEX' and c.cerrada = true and c.padre is null and m.empresa =" + req.params.id_empresa + " and c.sucursal=" + req.params.id_sucursal + "\
                                                    or g.nombre_corto='ANTICIPO' and c.cerrada = true and c.padre is null and m.empresa =" + req.params.id_empresa + " and c.sucursal=" + req.params.id_sucursal, { type: sequelize.QueryTypes.SELECT })
                                                .then(function (egresosCerrados) {
                                                    var total = 0
                                                    var totalRlCaja = 0
                                                    if (ingreso[0].total != null) {
                                                        total = ingreso[0].total
                                                        // totalRlCaja = ingreso[0].total
                                                    }
                                                    if (egresosCerrados[0].total != null) {
                                                        total -= egresosCerrados[0].total
                                                        totalRlCaja -= egresosCerrados[0].total
                                                    }
                                                    if (egreso[0].total != null) {
                                                        total -= egreso[0].total
                                                    }
                                                    if (ingresoCerrados[0].total != null) {
                                                        total += ingresoCerrados[0].total
                                                        totalRlCaja += ingresoCerrados[0].total
                                                    }
                                                    if (req.params.columna = "usuario_solicitante") {
                                                        solicitudes = solicitudes.sort(function (a, b) {
                                                            if (req.params.direccion) {
                                                                return a.usuario.persona.nombre_completo < b.usuario.persona.nombre_completo;
                                                            } else {
                                                                return a.usuario.persona.nombre_completo > b.usuario.persona.nombre_completo;
                                                            }

                                                        });
                                                        res.json({ totalRlCaja: totalRlCaja, total: total, solicitudes: solicitudes });
                                                    } else if (req.params.columna = "id") {
                                                        res.json({ totalRlCaja: totalRlCaja, total: total, solicitudes: solicitudes });
                                                    }

                                                });
                                        });
                                });
                        });
                });
            })
        });

    router.route('/cobros-caja-chica/solicitud/:id_solicitud')
        .get(ensureAuthorizedlogged, function (req, res) {
            SolicitudCajaChica.find(
                {
                    where: { id: req.params.id_solicitud },
                    include: [{ model: Sucursal, as: 'sucursal', where: { activo: true }, required: true }, { model: Proveedor, as: 'proveedor', required: false },
                    { model: ValeCajaChica, as: 'vale', include: [{ model: Clase, as: 'estado' }] },
                    {
                        model: CajaChica, as: 'cajasChicas', where: { eliminado: false }, required: false,
                        include: [{ model: CajaChicaCentroCosto, as: 'centrosCosto', required: false }, { model: Usuario, as: 'usuario', include: [{ model: Persona, as: 'persona' }] }, { model: Sucursal, as: 'sucursal' },
                        {
                            model: ConceptoMovimientoCajaChica, as: 'concepto',
                            include: [{ model: Clase, as: 'concepto' }]
                        },
                        { model: ContabilidadCuenta, as: 'cuenta' }, {
                            model: Compra, as: 'compra',
                            include: [{ model: Clase, as: 'tipoMovimiento', required: false }, {
                                model: DetalleCompra, as: 'detallesCompra',
                                include: [{ model: Clase, as: 'servicio' },
                                { model: Producto, as: 'producto' },
                                { model: Clase, as: 'centroCosto' }]
                            },
                            { model: Proveedor, as: 'proveedor' },
                            { model: Sucursal, as: 'sucursal' },
                            {
                                model: Movimiento, as: 'movimiento', required: false,
                                include: [{ model: Clase, as: 'clase' }]
                            }]
                        }]
                    },
                    {
                        model: Usuario, as: 'autorizador',
                        include: [{ model: Persona, as: 'persona' }]
                    },
                    {
                        model: Usuario, as: 'verificador',
                        include: [{ model: Persona, as: 'persona' }]
                    },
                    {
                        model: MedicoPaciente, as: 'solicitante',
                        include: [{ model: Persona, as: 'persona' }]
                    },
                    { model: ConceptoMovimientoCajaChica, as: 'concepto', include: [{ model: Clase, as: 'concepto' }] }, { model: Clase, as: 'estado' },
                    {
                        model: Usuario, as: 'usuario',
                        include: [{ model: Persona, as: 'persona' }]
                    }],

                }
            ).then(function (solicitud) {
                res.json({ solicitud: solicitud })
            })
        })

    router.route('/fondo-a-rendir-caja-chica/solicitud/:id_solicitud')
        .get(ensureAuthorizedlogged, function (req, res) {
            SolicitudCajaChica.find(
                {
                    where: { id: req.params.id_solicitud }, attributes: ['id', 'id_sucursal', 'monto'],
                    include: [{
                        model: CajaChica, as: 'cajasChicas', attributes: ['id', 'numero_correlativo', 'sucursal'], where: { eliminado: false }, required: false,
                        include: [{ model: Usuario, as: 'usuario', include: [{ model: Persona, as: 'persona' }] }]
                    }, { model: Clase, as: 'estado', attributes: ['nombre'] },
                    {
                        model: MedicoPaciente, as: 'solicitante', attributes: ['id'],
                        include: [{
                            model: RrhhEmpleadoFicha, as: 'empleadosFichas', attributes: ['id'], required: false,
                            include: [{ model: Clase, as: 'area' }]
                        },
                        { model: Clase, as: 'campo' },
                        { model: Persona, as: 'persona' }]
                    }, {
                        model: Usuario, as: 'autorizador', attributes: ['id'],
                        include: [{ model: Persona, as: 'persona' }]
                    }],
                    order: sequelize.literal("`solicitante.empleadosFichas.id` DESC  limit 1")

                }
            ).then(function (solicitud) {
                Sucursal.find({
                    where: {
                        id: solicitud.id_sucursal
                    }
                }).then((suc) => {
                    CajaChicaRendicionFondo.find({
                        where: { id_solicitud: solicitud.id },
                        include: [{
                            model: CajaChicaDetalleRendicionFondo, as: 'gastos', where: { eliminado: false },
                            include: [{ model: CajaChicaDetalleRendicionFondoCentroCosto, as: 'datosCentrosCosto', include: [{ model: Clase, as: 'centro_costo' }] }, { model: CajaChicaGasto, as: 'gasto' },
                            { model: Clase, as: 'area' }]
                        },
                        { model: Clase, as: 'rendicion' }, { model: Clase, as: 'vehiculo' }, { model: RrhhViajeConductor, as: 'conductor' }]
                    }).then(function (encontrado) {
                        CajaChicaNivelGasto.findAll({
                            include: [{
                                model: CajaChicaGasto, as: 'gastos',
                                include: [{
                                    model: CajaChicaDetalleRendicionFondo, as: 'detallesRendicionesFondos', where: { eliminado: false },
                                    include: [{ model: CajaChicaDetalleRendicionFondoCentroCosto, as: 'datosCentrosCosto', include: [{ model: Clase, as: 'centro_costo' }] }, { model: CajaChicaGasto, as: 'gasto' },
                                    { model: Clase, as: 'area' }, { model: CajaChicaRendicionFondo, as: 'rendicionFondo', attributes: ['id'], where: { id_solicitud: solicitud.id } }]
                                }]
                            }],
                            order: [['numero', 'asc'], [{ model: CajaChicaGasto, as: 'gastos' }, 'numero', 'asc']]
                        }).then(function (datosImp) {
                            solicitud.dataValues.rendicionFondo = encontrado
                            if (suc.activo) {
                                res.json({ solicitud: solicitud, datosImp: datosImp })
                            } else {
                                res.json({ mensaje: 'Sucursal deshabilitada, no se puede obtener información.', solicitud: {}, datosImp: [], hasErr: true, hasError: true })
                            }
                        })
                    })
                }).catch((err) => {
                    res.json({ mensaje: err.stack, solicitud: {}, datosImp: [], hasErr: true, hasError: true })
                })
            })
        })
    async function crearCompraServicio(compra, req, idProveedor, idtipo, t) {
        try {

            var pagado = 0
            if (!compra.id) {
                compraCreada = await Compra.create({
                    id_sucursal: compra.sucursal.id,
                    id_tipo_movimiento: idtipo,
                    id_proveedor: idProveedor,
                    factura: compra.factura,
                    autorizacion: compra.autorizacion,
                    fecha: compra.fecha,
                    codigo_control: compra.codigo_control,
                    importe: compra.importe,
                    id_tipo_pago: compra.id_tipo_pago,
                    dias_credito: compra.dias_credito,
                    a_cuenta: compra.a_cuenta,
                    saldo: compra.saldo,
                    descuento_general: compra.descuento_general,
                    descuento: compra.descuento,
                    recargo: compra.recargo,
                    ice: compra.ice,
                    excento: compra.excento,
                    tipo_descuento: compra.tipo_descuento,
                    tipo_recargo: compra.tipo_recargo,
                    total: compra.total,
                    id_usuario: compra.id_usuario,
                    usar_producto: compra.usar_producto,
                    observacion: compra.observacion,
                    dui: compra.dui,
                    tipo_retencion: compra.tipo_retencion
                }, {
                    transaction: t
                })
                let total = compra.total
                if (req.body.descuentoGasolina) {
                    total = compra.importe
                }
                if (req.body.solicitud.cajasChicas.length > 0) {
                    padre = req.body.solicitud.cajasChicas[0].id
                    pagado = total
                    monto = req.body.solicitud.cajasChicas[0].monto
                    saldo = req.body.solicitud.cajasChicas[0].saldo - pagado
                } else {
                    padre = null
                    monto = total
                    saldo = total
                }
                if (req.body.solicitud.concepto.concepto.nombre == "GASTO") {
                    padre = null
                    monto = total
                    pagado = total
                    saldo = 0
                }

                SucursalEncontrada = await Sucursal.find({
                    where: {
                        id: compra.sucursal.id,//your where conditions, or without them if you need ANY entry
                    }, transaction: t
                })
                CajaCreada = await CajaChica.create({
                    id_solicitud: req.body.solicitud.id,
                    fecha: req.body.fecha,
                    id_cuenta: req.body.cuenta.id,
                    id_campo: req.body.campo,
                    id_usuario: req.body.id_usuario,
                    id_compra: compraCreada.id,
                    eliminado: false,
                    detalle: req.body.detalle,
                    monto: monto,
                    pagado: pagado,
                    saldo: saldo,
                    id_padre: padre,
                    id_concepto: req.body.concepto.id,
                    cerrada: false,
                    id_sucursal: compra.sucursal.id,
                    numero_correlativo: SucursalEncontrada.caja_chica_egreso_correlativo
                }, {
                    transaction: t
                })
                req.body.CajaCreadaid = CajaCreada.id
                await Sucursal.update({
                    caja_chica_egreso_correlativo: SucursalEncontrada.caja_chica_egreso_correlativo + 1
                }, {
                    where: {
                        id: compra.sucursal.id,
                    }

                    , transaction: t
                })
                if (padre) {
                    let CajaChicaSolicitudIncremento = req.body.solicitud.cajasChicas.find(function (x) {
                        return x.concepto.nombre == 'INCREMENTO' && x.id_padre == null
                    })
                    if (CajaChicaSolicitudIncremento) {
                        if (CajaChicaSolicitudIncremento.saldo > 0) {
                            let PagadoIncremento = pagado > CajaChicaSolicitudIncremento.saldo ? CajaChicaSolicitudIncremento.pagado + CajaChicaSolicitudIncremento.saldo : CajaChicaSolicitudIncremento.pagado + pagado
                            let SaldoIncremento = pagado > CajaChicaSolicitudIncremento.saldo ? 0 : CajaChicaSolicitudIncremento.saldo - pagado
                            await CajaChica.update({
                                pagado: PagadoIncremento,
                                saldo: SaldoIncremento
                            }, {
                                where: { id: CajaChicaSolicitudIncremento.id }, transaction: t
                            })
                            pagado = pagado < CajaChicaSolicitudIncremento.saldo ? 0 : pagado - CajaChicaSolicitudIncremento.saldo
                        }
                    }
                    let pagadoCajaPrincipal = req.body.solicitud.cajasChicas[0].pagado + pagado
                    let SaldoCajaPrincipal = req.body.solicitud.cajasChicas[0].saldo - pagado
                    await CajaChica.update({
                        pagado: pagadoCajaPrincipal,
                        saldo: SaldoCajaPrincipal
                    }, {
                        where: { id: padre }, transaction: t
                    })
                    await SolicitudCajaChica.update({
                        id_estado: req.body.solicitud.estado.id,
                    }, {
                        where: { id: req.body.solicitud.id }, transaction: t
                    })
                    let promises = []
                    for (let i = 0; i < req.body.campos.length; i++) {
                        let campo = req.body.campos[i];
                        await CajaChicaCentroCosto.create({
                            id_caja_chica: CajaCreada.id,
                            id_centro_costo: campo.id
                        }, {
                            transaction: t
                        })
                    }
                    promises.push(crearDetalleCompraServicio(compra, compraCreada.id, req, t));
                    return Promise.all(promises)


                } else {
                    await SolicitudCajaChica.update({
                        id_estado: req.body.solicitud.estado.id,
                    }, {
                        where: { id: req.body.solicitud.id }, transaction: t
                    })
                    var promises = []
                    for (var i = 0; i < req.body.campos.length; i++) {
                        var campo = req.body.campos[i];
                        await CajaChicaCentroCosto.create({
                            id_caja_chica: CajaCreada.id,
                            id_centro_costo: campo.id
                        }, {
                            transaction: t
                        })
                    }
                    promises.push(crearDetalleCompraServicio(compra, compraCreada.id, req, t));
                    return Promise.all(promises)

                }
            } else {
                await Compra.update({
                    id_sucursal: compra.sucursal.id,
                    id_tipo_movimiento: compra.movimiento.clase.id,
                    id_proveedor: idProveedor,
                    factura: compra.factura,
                    autorizacion: compra.autorizacion,
                    fecha: compra.fecha,
                    codigo_control: compra.codigo_control,
                    importe: compra.importe,
                    id_tipo_pago: compra.id_tipo_pago,
                    dias_credito: compra.dias_credito,
                    a_cuenta: compra.a_cuenta,
                    saldo: compra.saldo,
                    descuento_general: compra.descuento_general,
                    descuento: compra.descuento,
                    recargo: compra.recargo,
                    ice: compra.ice,
                    excento: compra.excento,
                    tipo_descuento: compra.tipo_descuento,
                    tipo_recargo: compra.tipo_recargo,
                    total: compra.total,
                    id_usuario: compra.id_usuario,
                    usar_producto: compra.usar_producto,
                    observacion: compra.observacion,
                    dui: compra.dui,
                    tipo_retencion: compra.tipo_retencion,
                }, {
                    where: {
                        id: compra.id
                    }, transaction: t
                })
                await SolicitudCajaChica.update({
                    id_estado: req.body.solicitud.estado.id,
                }, {
                    where: { id: req.body.solicitud.id }, transaction: t
                })
                await ActualizarDetalleCompra(req, compra, t)


            }
        } catch (error) {
            return new Promise(function (fulfill, reject) {
                reject((err.stack !== undefined) ? err.stack : err);
            });
        }
    }

    function crearDetalleCompraServicio(compra, idCompra, req, t) {
        var promises = []

        compra.detallesCompra.forEach(function (detalleCompra, index, array) {
            if (detalleCompra.servicio.id != undefined && detalleCompra.servicio.id != null) {
                promises.push(DetalleCompra.create({
                    id_compra: idCompra,
                    costo_unitario: detalleCompra.costo_unitario,
                    cantidad: detalleCompra.cantidad,
                    importe: detalleCompra.importe,
                    descuento: detalleCompra.descuento,
                    recargo: detalleCompra.recargo,
                    ice: detalleCompra.ice,
                    excento: detalleCompra.excento,
                    tipo_descuento: detalleCompra.tipo_descuento,
                    tipo_recargo: detalleCompra.tipo_recargo,
                    total: detalleCompra.total,
                    it: detalleCompra.it,
                    iue: detalleCompra.iue,
                    id_servicio: detalleCompra.servicio.id,
                    id_caja_chica_detalle_rendicion: detalleCompra.id_caja_chica_detalle_rendicion
                }, {
                    transaction: t
                }).then(function (detalleCompraCreada) {

                    return new Promise(function (fulfill, reject) {
                        fulfill()
                    });

                }).catch(function (err) {
                    return new Promise(function (fulfill, reject) {
                        reject((err.stack !== undefined) ? err.stack : err);
                    });
                }));
            } else {
                promises.push(Tipo.find({
                    where: { nombre_corto: 'SERVICIOS_COMPRA', id_empresa: compra.sucursal.id_empresa },
                    transaction: t
                }).then(function (serviciosCompraEncontrado) {
                    return Clase.findOrCreate({
                        where: {
                            nombre: detalleCompra.servicio.nombre.toUpperCase(),
                            id_tipo: serviciosCompraEncontrado.id,
                        },
                        defaults: {
                            nombre: detalleCompra.servicio.nombre.toUpperCase(),
                            nombre_corto: detalleCompra.servicio.nombre.toUpperCase(),
                            id_tipo: serviciosCompraEncontrado.id,
                            eliminado: false,
                            habilitado: true
                        }, transaction: t
                    }).spread(function (Ccreado, created) {
                        return DetalleCompra.create({
                            id_compra: idCompra,
                            costo_unitario: detalleCompra.costo_unitario,
                            cantidad: detalleCompra.cantidad,
                            importe: detalleCompra.importe,
                            descuento: detalleCompra.descuento,
                            recargo: detalleCompra.recargo,
                            ice: detalleCompra.ice,
                            excento: detalleCompra.excento,
                            tipo_descuento: detalleCompra.tipo_descuento,
                            tipo_recargo: detalleCompra.tipo_recargo,
                            total: detalleCompra.total,
                            it: detalleCompra.it,
                            iue: detalleCompra.iue,
                            id_servicio: Ccreado.id,
                            id_caja_chica_detalle_rendicion: detalleCompra.id_caja_chica_detalle_rendicion
                        }, {
                            transaction: t
                        }).then(function (detalleCompraCreada) {

                            return new Promise(function (fulfill, reject) {
                                fulfill()
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
                }))
            }
        })
        return Promise.all(promises);
    }
    function actualizarAnticipos(anticipo, req, t, CajaCreada, total) {
        return RrhhAnticipo.update({
            total: total,
        }, {
            where: { id: anticipo.id }, transaction: t
        }).then(function (empleadoaAnticipo) {

            /*  if (index === (array.length - 1)) { */
            return CajaChica.find({
                where: { id: CajaCreada.id }, transaction: t,
                include: [{ model: Sucursal, as: 'sucursal' }, { model: ConceptoMovimientoCajaChica, as: 'concepto', include: [{ model: Clase, as: 'concepto' }] }, { model: ContabilidadCuenta, as: 'cuenta' }, { model: Compra, as: 'compra', include: [{ model: Proveedor, as: 'proveedor' }, { model: Sucursal, as: 'sucursal' }, { model: Movimiento, as: 'movimiento', required: false, include: [{ model: Clase, as: 'clase' }] }] }]
            }, { model: MedicoPaciente, as: 'solicitante', include: [{ model: Persona, as: 'persona' }] }, { model: ConceptoMovimientoCajaChica, as: 'concepto', include: [{ model: Clase, as: 'concepto' }] }, { model: Clase, as: 'estado' }, {
                model: Usuario, as: 'usuario', include: [{ model: Persona, as: 'persona' }]

            }).then(function (data) {
                return new Promise(function (fulfill, reject) {
                    fulfill(data)
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

        /*  } */

    }

    function crearAnticipoRrhh(CajaCreada, req, t) {
        return Clase.find({
            where: { nombre_corto: "EXTRAORDI" }, transaction: t,
            include: [{ model: Tipo, as: 'tipo', where: { id_empresa: req.body.concepto.id_empresa } }]
        }).then(function (clase) {
            return RrhhEmpleadoFicha.find({
                where: { id_empleado: req.body.solicitud.id_empleado, activo: true }, transaction: t
            }).then(function (fichaEncontrada) {
                return RrhhAnticipo.create({
                    id_ficha: fichaEncontrada.id,
                    fecha: CajaCreada.fecha,
                    monto: CajaCreada.monto,
                    total: req.body.monto,
                    id_tipo: clase.id,
                    salario_basico: fichaEncontrada.haber_basico,
                    eliminado: false,
                    entregado: false,
                    detalle: CajaCreada.detalle,
                    tipo_porcential: false,
                    id_caja_chica: CajaCreada.id
                }, {
                    transaction: t
                }).then(function (empleadoaAnticipo) {
                    return RrhhAnticipo.findAll({
                        where: { ficha: fichaEncontrada.id, id_tipo: { $ne: clase.id } }, transaction: t,
                    }).then(function (anticipos) {
                        var anteriorMonto = 0
                        var promises = []
                        if (anticipos.length > 0) {
                            anticipos.forEach(function (anticipo, index, array) {
                                /*   var total = req.body.montoExtraoridnario + anticipo.monto */
                                if (index == 0) {
                                    var total = CajaCreada.monto + anticipo.monto
                                } else {
                                    var total = anticipo.monto + anteriorMonto
                                }
                                anteriorMonto = total

                                promises.push(actualizarAnticipos(anticipo, req, t, CajaCreada, total))

                            })
                            return Promise.all(promises)



                        } else {
                            return RrhhAnticipo.update({
                                total: CajaCreada.monto,
                                salario_basico: fichaEncontrada.haber_basico,
                            }, {
                                where: { id: empleadoaAnticipo.id }, transaction: t
                            }).then(function (empleadoaAnticipo) {
                                return CajaChica.find({
                                    where: { id: CajaCreada.id }, transaction: t,
                                    include: [{ model: Sucursal, as: 'sucursal' }, { model: ConceptoMovimientoCajaChica, as: 'concepto', include: [{ model: Clase, as: 'concepto' }] }, { model: ContabilidadCuenta, as: 'cuenta' }, { model: Compra, as: 'compra', include: [{ model: Proveedor, as: 'proveedor' }, { model: Sucursal, as: 'sucursal' }, { model: Movimiento, as: 'movimiento', required: false, include: [{ model: Clase, as: 'clase' }] }] }]
                                }, { model: MedicoPaciente, as: 'solicitante', include: [{ model: Persona, as: 'persona' }] }, { model: ConceptoMovimientoCajaChica, as: 'concepto', include: [{ model: Clase, as: 'concepto' }] }, { model: Clase, as: 'estado' }, {
                                    model: Usuario, as: 'usuario', include: [{ model: Persona, as: 'persona' }]

                                }).then(function (data) {
                                    return new Promise(function (fulfill, reject) {
                                        fulfill(data)
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
            })
        }).catch(function (err) {
            return new Promise(function (fulfill, reject) {
                reject((err.stack !== undefined) ? err.stack : err);
            });
        });


    }
    router.route('/caja-chica/:id_empresa')
        .post(ensureAuthorizedlogged, function (req, res) {
            if (req.body.rendicionActiva === true) {
                req.body.id_caja_chica_detalle_rendicion = req.body.compra.id_caja_chica_detalle_rendicion ? req.body.compra.id_caja_chica_detalle_rendicion : req.body.compra.detallesCompra[0].id_caja_chica_detalle_rendicion
            }
            sequelize.transaction(function (t) {
                var promises = [];
                var a = 0
                var pagado = 0
                var padre = null
                var monto = 0
                var saldo = 0
                return Sucursal.find({
                    where: {
                        id: req.body.compra && req.body.compra.sucursal.id || req.body.sucursal && req.body.sucursal.id,//your where conditions, or without them if you need ANY entry
                    },
                    transaction: t
                }).then(function (SucursalEncontrada) {
                    if (!SucursalEncontrada.activo) throw new Error('Sucursal deshabilitada, no se pueden hacer cambios.')
                    if (req.body.solicitud) {
                        if (req.body.Desembolso) {
                            if (!req.body.id) {
                                return CajaChica.create({
                                    fecha: req.body.fecha,
                                    id_sucursal: req.body.sucursal.id,
                                    id_cuenta: req.body.cuenta.id,
                                    id_campo: req.body.campo,
                                    eliminado: false,
                                    monto: req.body.total,
                                    saldo: req.body.total,
                                    pagado: 0,
                                    detalle: req.body.detalle,
                                    id_concepto: req.body.concepto.id,
                                    cerrada: false,
                                    id_solicitud: req.body.solicitud.id,
                                    numero_correlativo: SucursalEncontrada.caja_chica_egreso_correlativo,
                                    id_usuario: req.body.id_usuario
                                }, {
                                    transaction: t
                                }).then(function (CajaCreada) {
                                    req.body.CajaCreadaid = CajaCreada.id
                                    return Sucursal.update({
                                        caja_chica_egreso_correlativo: SucursalEncontrada.caja_chica_egreso_correlativo + 1
                                    }, {
                                        where: {
                                            id: req.body.compra && req.body.compra.sucursal.id || req.body.sucursal && req.body.sucursal.id,
                                        }

                                        , transaction: t
                                    }).then(function (actualizado) {
                                        return SolicitudCajaChica.update({
                                            id_estado: req.body.solicitud.estado.id,
                                        }, {
                                            where: { id: req.body.solicitud.id }, transaction: t
                                        }).then(function (SolicitudCreada) {
                                            if (req.body.Anticipo == true) {
                                                return crearAnticipoRrhh(CajaCreada, req, t)
                                            } else {
                                                return CajaChica.find({
                                                    where: { id: CajaCreada.id }, transaction: t,
                                                    include: [{ model: Sucursal, as: 'sucursal' }, { model: ConceptoMovimientoCajaChica, as: 'concepto', include: [{ model: Clase, as: 'concepto' }] }, { model: ContabilidadCuenta, as: 'cuenta' }, { model: Compra, as: 'compra', include: [{ model: Proveedor, as: 'proveedor' }, { model: Sucursal, as: 'sucursal' }, { model: Movimiento, as: 'movimiento', required: false, include: [{ model: Clase, as: 'clase' }] }] }]
                                                }, { model: MedicoPaciente, as: 'solicitante', include: [{ model: Persona, as: 'persona' }] }, { model: ConceptoMovimientoCajaChica, as: 'concepto', include: [{ model: Clase, as: 'concepto' }] }, { model: Clase, as: 'estado' }, {
                                                    model: Usuario, as: 'usuario', include: [{ model: Persona, as: 'persona' }]

                                                }).then(function (data) {
                                                    return new Promise(function (fulfill, reject) {
                                                        fulfill(data)
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
                                    });
                                }).catch(function (err) {
                                    return new Promise(function (fulfill, reject) {
                                        reject((err.stack !== undefined) ? err.stack : err);
                                    });
                                });

                            } else {
                                return CajaChica.update({
                                    fecha: req.body.fecha,
                                    id_sucursal: req.body.compra && req.body.compra.sucursal.id || req.body.sucursal && req.body.sucursal.id,
                                    id_cuenta: req.body.cuenta.id,
                                    id_campo: req.body.campo,
                                    eliminado: req.body.eliminado,
                                    monto: req.body.total,
                                    saldo: req.body.total,
                                    pagado: 0,
                                    detalle: req.body.detalle,
                                    id_concepto: req.body.concepto.id,
                                    cerrada: req.body.cerrada,
                                }, {
                                    where: { id: req.body.id },
                                    transaction: t
                                }).then(function (CajaActualizada) {
                                    return CajaChica.find({
                                        where: { id: req.body.id }, transaction: t,
                                        include: [{ model: Sucursal, as: 'sucursal' }, { model: ConceptoMovimientoCajaChica, as: 'concepto', include: [{ model: Clase, as: 'concepto' }] }, { model: ContabilidadCuenta, as: 'cuenta' }, { model: Compra, as: 'compra', include: [{ model: Proveedor, as: 'proveedor' }, { model: Sucursal, as: 'sucursal' }, { model: Movimiento, as: 'movimiento', required: false, include: [{ model: Clase, as: 'clase' }] }] }]
                                    }, { model: MedicoPaciente, as: 'solicitante', include: [{ model: Persona, as: 'persona' }] }, { model: ConceptoMovimientoCajaChica, as: 'concepto', include: [{ model: Clase, as: 'concepto' }] }, { model: Clase, as: 'estado' }, {
                                        model: Usuario, as: 'usuario', include: [{ model: Persona, as: 'persona' }]

                                    }).then(function (data) {
                                        return new Promise(function (fulfill, reject) {
                                            fulfill(data)
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
                        } else {
                            var compra = req.body.compra;
                            if (!compra.id) {
                                if (compra.usar_producto) {
                                    return Tipo.find({
                                        where: { nombre_corto: 'MOVING' }, transaction: t
                                    }).then(function (tipoMovimiento) {
                                        return Clase.find({
                                            where: { nombre_corto: 'ID' }, transaction: t
                                        }).then(function (conceptoMovimiento) {
                                            if (compra.movimiento.clase.id) {
                                                conceptoMovimiento = compra.movimiento.clase
                                            }
                                            return Movimiento.create({
                                                id_tipo: tipoMovimiento.id,
                                                id_clase: conceptoMovimiento.id,
                                                fecha: compra.fecha
                                            }, {
                                                transaction: t
                                            }).then(function (movimientoCreado) {
                                                if (!compra.proveedor.id) {
                                                    return Proveedor.create({
                                                        id_empresa: req.params.id_empresa,
                                                        nit: compra.proveedor.nit,
                                                        razon_social: compra.proveedor.razon_social,
                                                        estado: "V"
                                                    }, {
                                                        transaction: t
                                                    }).then(function (proveedorCreado) {
                                                        if (req.body.rendicionActiva == true) {
                                                            return CajaChicaDetalleRendicionFondo.update({
                                                                id_gasto: req.body.gasto.id,
                                                            }, {
                                                                where: { id: req.body.id_caja_chica_detalle_rendicion }, transaction: t
                                                            }).then(function (detalleActualizado) {
                                                                return CajaChicaDetalleRendicionFondoCentroCosto.destroy({
                                                                    where: { id_detalle_rendicion_fondo: req.body.id_caja_chica_detalle_rendicion }, transaction: t
                                                                }).then(function (eliminados) {
                                                                    var promesa = []
                                                                    if (req.body.campos.length > 0) {
                                                                        req.body.campos.forEach(function (cc, i, a) {
                                                                            var g = { id: req.body.id_caja_chica_detalle_rendicion }
                                                                            var fr = {}
                                                                            promesa.push(guardarCentroCosto(cc, fr, g, t, i, a))
                                                                        })
                                                                    }
                                                                    promesa.push(crearCompra(compra, res, proveedorCreado.id, movimientoCreado.id, conceptoMovimiento.id, req, t))
                                                                    return Promise.all(promesa)
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
                                                            return crearCompra(compra, res, proveedorCreado.id, movimientoCreado.id, conceptoMovimiento.id, req, t);
                                                        }
                                                    }).catch(function (err) {
                                                        return new Promise(function (fulfill, reject) {
                                                            reject((err.stack !== undefined) ? err.stack : err);
                                                        });
                                                    });
                                                } else {
                                                    if (req.body.rendicionActiva == true) {
                                                        return CajaChicaDetalleRendicionFondo.update({
                                                            id_gasto: req.body.gasto.id,
                                                        }, {
                                                            where: { id: req.body.id_caja_chica_detalle_rendicion }, transaction: t
                                                        }).then(function (detalleActualizado) {
                                                            return CajaChicaDetalleRendicionFondoCentroCosto.destroy({
                                                                where: { id_detalle_rendicion_fondo: req.body.id_caja_chica_detalle_rendicion }, transaction: t
                                                            }).then(function (eliminados) {
                                                                var promesa = []
                                                                if (req.body.campos.length > 0) {
                                                                    req.body.campos.forEach(function (cc, i, a) {
                                                                        var g = { id: req.body.id_caja_chica_detalle_rendicion }
                                                                        var fr = {}
                                                                        promesa.push(guardarCentroCosto(cc, fr, g, t, i, a))
                                                                    })
                                                                }
                                                                promesa.push(crearCompra(compra, res, compra.proveedor.id, movimientoCreado.id, conceptoMovimiento.id, req, t))
                                                                return Promise.all(promesa)
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
                                                        return crearCompra(compra, res, compra.proveedor.id, movimientoCreado.id, conceptoMovimiento.id, req, t);
                                                    }

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
                                    }).catch(function (err) {
                                        return new Promise(function (fulfill, reject) {
                                            reject((err.stack !== undefined) ? err.stack : err);
                                        });
                                    });
                                } else {
                                    return Tipo.find({
                                        where: { nombre_corto: 'MOVING' }, transaction: t
                                    }).then(function (tipoMovimiento) {
                                        return Clase.find({
                                            where: { nombre_corto: 'ID' }, transaction: t
                                        }).then(function (conceptoMovimiento) {
                                            if (compra.movimiento.clase) {
                                                conceptoMovimiento = compra.movimiento.clase
                                            }
                                            if (compra.movimiento.clase.id) {
                                                conceptoMovimiento = compra.movimiento.clase
                                            }
                                            /*   return Movimiento.create({
                                                  id_tipo: tipoMovimiento.id,
                                                  id_clase: conceptoMovimiento.id,
                                                  fecha: compra.fecha
                                              }, {
                                                      transaction: t
                                                  }).then(function (movimientoCreado) { */
                                            if (!compra.proveedor.id) {
                                                return Proveedor.create({
                                                    id_empresa: compra.id_empresa,
                                                    nit: compra.proveedor.nit,
                                                    razon_social: compra.proveedor.razon_social,
                                                    estado: "V"
                                                }, {
                                                    transaction: t
                                                }).then(function (proveedorCreado) {
                                                    if (req.body.rendicionActiva == true) {
                                                        return CajaChicaDetalleRendicionFondo.update({
                                                            id_gasto: req.body.gasto.id,
                                                        }, {
                                                            where: { id: req.body.id_caja_chica_detalle_rendicion }, transaction: t
                                                        }).then(function (detalleActualizado) {
                                                            return CajaChicaDetalleRendicionFondoCentroCosto.destroy({
                                                                where: { id_detalle_rendicion_fondo: req.body.id_caja_chica_detalle_rendicion }, transaction: t
                                                            }).then(function (eliminados) {
                                                                var promesa = []
                                                                if (req.body.campos.length > 0) {
                                                                    req.body.campos.forEach(function (cc, i, a) {
                                                                        var g = { id: req.body.id_caja_chica_detalle_rendicion }
                                                                        var fr = {}
                                                                        promesa.push(guardarCentroCosto(cc, fr, g, t, i, a))
                                                                    })
                                                                }
                                                                promesa.push(crearCompraServicio(compra, req, proveedorCreado.id, conceptoMovimiento.id, t))
                                                                return Promise.all(promesa)
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
                                                        return crearCompraServicio(compra, req, proveedorCreado.id, conceptoMovimiento.id, t)
                                                    }
                                                }).catch(function (err) {
                                                    return new Promise(function (fulfill, reject) {
                                                        reject((err.stack !== undefined) ? err.stack : err);
                                                    });
                                                });
                                            } else {
                                                if (req.body.rendicionActiva == true) {
                                                    return CajaChicaDetalleRendicionFondo.update({
                                                        id_gasto: req.body.gasto.id,
                                                    }, {
                                                        where: { id: req.body.id_caja_chica_detalle_rendicion }, transaction: t
                                                    }).then(function (detalleActualizado) {
                                                        return CajaChicaDetalleRendicionFondoCentroCosto.destroy({
                                                            where: { id_detalle_rendicion_fondo: req.body.id_caja_chica_detalle_rendicion }, transaction: t
                                                        }).then(function (eliminados) {
                                                            var promesa = []
                                                            if (req.body.campos.length > 0) {
                                                                req.body.campos.forEach(function (cc, i, a) {
                                                                    var g = { id: req.body.id_caja_chica_detalle_rendicion }
                                                                    var fr = {}
                                                                    promesa.push(guardarCentroCosto(cc, fr, g, t, i, a))
                                                                })
                                                            }
                                                            promesa.push(crearCompraServicio(compra, req, compra.proveedor.id, conceptoMovimiento.id, t))
                                                            return Promise.all(promesa)
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
                                                    return crearCompraServicio(compra, req, compra.proveedor.id, conceptoMovimiento.id, t)
                                                }

                                            }
                                            /* }).catch(function (err) {
                                                return new Promise(function (fulfill, reject) {
                                                    reject((err.stack !== undefined) ? err.stack : err);
                                                });
                                            }); */
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
                            } else {
                                if (compra.usar_producto) {
                                    return Tipo.find({
                                        where: { nombre_corto: 'MOVING' }, transaction: t
                                    }).then(function (tipoMovimiento) {
                                        return Clase.find({
                                            where: { nombre_corto: 'ID' }, transaction: t
                                        }).then(function (conceptoMovimiento) {
                                            if (compra.movimiento.clase.id) {
                                                conceptoMovimiento = compra.movimiento.clase
                                            }
                                            return Movimiento.update({
                                                id_tipo: tipoMovimiento.id,
                                                id_clase: conceptoMovimiento.id,
                                                fecha: compra.fecha
                                            }, {
                                                where: { id: compra.movimiento.id },
                                                transaction: t
                                            }).then(function (movimientoActualizado) {
                                                if (!compra.proveedor.id) {
                                                    return Proveedor.create({
                                                        id_empresa: req.params.id_empresa,
                                                        nit: compra.proveedor.nit,
                                                        razon_social: compra.proveedor.razon_social,
                                                        estado: "V"
                                                    }, {
                                                        transaction: t
                                                    }).then(function (proveedorCreado) {
                                                        return crearCompra(compra, res, proveedorCreado.id, compra.movimiento.id, conceptoMovimiento.id, req, t);

                                                    });
                                                } else {
                                                    return crearCompra(compra, res, compra.proveedor.id, compra.movimiento.id, conceptoMovimiento.id, req, t);

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
                                    }).catch(function (err) {
                                        return new Promise(function (fulfill, reject) {
                                            reject((err.stack !== undefined) ? err.stack : err);
                                        });
                                    });
                                } else {
                                    return Tipo.find({
                                        where: { nombre_corto: 'MOVING' }, transaction: t
                                    }).then(function (tipoMovimiento) {
                                        return Clase.find({
                                            where: { nombre_corto: 'ID' }, transaction: t
                                        }).then(function (conceptoMovimiento) {
                                            if (compra.movimiento.clase) {
                                                conceptoMovimiento = compra.movimiento.clase
                                            }
                                            /* return Movimiento.update({
                                                id_tipo: tipoMovimiento.id,
                                                id_clase: conceptoMovimiento.id,
                                                fecha: compra.fecha
                                            }, {
                                                    where: { id: compra.movimiento.id },
                                                    transaction: t
                                                }).then(function (movimientoActualizado) { */
                                            if (!compra.proveedor.id) {

                                                return Proveedor.create({
                                                    id_empresa: compra.id_empresa,
                                                    nit: compra.proveedor.nit,
                                                    razon_social: compra.proveedor.razon_social,
                                                    estado: "V"
                                                }, {
                                                    transaction: t
                                                }).then(function (proveedorCreado) {
                                                    return crearCompraServicio(compra, req, proveedorCreado.id, conceptoMovimiento.id, t)
                                                }).catch(function (err) {
                                                    return new Promise(function (fulfill, reject) {
                                                        reject((err.stack !== undefined) ? err.stack : err);
                                                    })
                                                });
                                            } else {
                                                return crearCompraServicio(compra, req, compra.proveedor.id, conceptoMovimiento.id, t)
                                            }
                                            /*   }).catch(function (err) {
                                                  return new Promise(function (fulfill, reject) {
                                                      reject((err.stack !== undefined) ? err.stack : err);
                                                  })
                                              }) */
                                        }).catch(function (err) {
                                            return new Promise(function (fulfill, reject) {
                                                reject((err.stack !== undefined) ? err.stack : err);
                                            })
                                        })
                                    }).catch(function (err) {
                                        return new Promise(function (fulfill, reject) {
                                            reject((err.stack !== undefined) ? err.stack : err);
                                        })
                                    })
                                }
                            }
                        }
                    } else if (req.body.ingreso) {
                        if (!req.body.id) {
                            if (req.body.ingreso.cajasChicas.length > 0) {
                                padre = req.body.ingreso.cajasChicas[0].id
                                pagado = req.body.total
                                monto = req.body.ingreso.cajasChicas[0].monto
                                saldo = req.body.ingreso.cajasChicas[0].saldo - pagado
                            } else {
                                padre = null
                                monto = req.body.total
                                saldo = req.body.total
                            }
                            if (req.body.ingreso.concepto.concepto.nombre == "GASTO") {
                                padre = null
                                monto = req.body.total
                                pagado = req.body.total
                                saldo = 0
                            }
                            return Sucursal.find({
                                where: {
                                    id: req.body.sucursal.id,//your where conditions, or without them if you need ANY entry
                                }, transaction: t
                            }).then(function (SucursalEncontrada) {
                                return CajaChica.create({
                                    id_solicitud: req.body.ingreso.id,
                                    fecha: req.body.fecha,
                                    id_cuenta: req.body.cuenta.id,
                                    id_usuario: req.body.id_usuario,
                                    id_campo: req.body.campo,
                                    id_compra: null,
                                    eliminado: false,
                                    detalle: req.body.detalle,
                                    monto: monto,
                                    pagado: pagado,
                                    saldo: saldo,
                                    id_padre: padre,
                                    id_concepto: req.body.concepto.id,
                                    cerrada: false,
                                    id_sucursal: req.body.sucursal.id,
                                    numero_correlativo: SucursalEncontrada.caja_chica_egreso_correlativo
                                }, {
                                    transaction: t
                                }).then(function (CajaCreada) {
                                    req.body.CajaCreadaid = CajaCreada.id
                                    return Sucursal.update({
                                        caja_chica_egreso_correlativo: SucursalEncontrada.caja_chica_egreso_correlativo + 1
                                    }, {
                                        where: {
                                            id: req.body.sucursal.id,
                                        }, transaction: t
                                    }).then(function (actualizado) {
                                        if (padre) {
                                            return CajaChica.update({
                                                pagado: req.body.ingreso.cajasChicas[0].pagado + pagado,
                                                saldo: req.body.ingreso.cajasChicas[0].saldo - pagado,
                                            }, {
                                                where: { id: padre }, transaction: t
                                            }).then(function (dato) {
                                                return SolicitudCajaChica.update({
                                                    id_estado: req.body.ingreso.estado.id,
                                                }, {
                                                    where: { id: req.body.ingreso.id }, transaction: t
                                                }).then(function (SolicitudActualizada) {
                                                    return Empresa.find({
                                                        where: { id: req.body.sucursal.id_empresa }, transaction: t
                                                    }).then(function (empresaEncontrada) {
                                                        return CajaChica.create({
                                                            fecha: req.body.fecha,
                                                            id_sucursal: req.body.sucursal.id,
                                                            id_cuenta: req.body.cuenta.id,
                                                            id_campo: req.body.campo,
                                                            id_usuario: req.body.id_usuario,
                                                            eliminado: false,
                                                            monto: req.body.total,
                                                            saldo: 0,
                                                            pagado: req.body.total,
                                                            detalle: req.body.detalle,
                                                            id_concepto: req.body.concepto.id,
                                                            cerrada: false,
                                                            numero_correlativo: SucursalEncontrada.caja_chica_ingreso_correlativo,
                                                            id_caja_chica_solicitud: CajaCreada.id
                                                        }, {
                                                            transaction: t
                                                        }).then(function (CajaCreadaIngreso) {
                                                            req.body.CajaCreadaIngresoid = CajaCreadaIngreso.id
                                                            return Sucursal.update({
                                                                caja_chica_ingreso_correlativo: SucursalEncontrada.caja_chica_ingreso_correlativo + 1
                                                            }, {
                                                                where: {
                                                                    id: req.body.sucursal.id,
                                                                }, transaction: t
                                                            }).then(function (actualizado) {
                                                                return CajaChica.find({
                                                                    where: { id: CajaCreadaIngreso.id }, transaction: t,
                                                                    include: [{ model: Sucursal, as: 'sucursal' }, { model: ConceptoMovimientoCajaChica, as: 'concepto', include: [{ model: Clase, as: 'concepto' }] }, { model: ContabilidadCuenta, as: 'cuenta' }, { model: Compra, as: 'compra', include: [{ model: Proveedor, as: 'proveedor' }, { model: Sucursal, as: 'sucursal' }, { model: Movimiento, as: 'movimiento', required: false, include: [{ model: Clase, as: 'clase' }] }] }]
                                                                }, { model: MedicoPaciente, as: 'solicitante', include: [{ model: Persona, as: 'persona' }] }, { model: ConceptoMovimientoCajaChica, as: 'concepto', include: [{ model: Clase, as: 'concepto' }] }, { model: Clase, as: 'estado' }, {
                                                                    model: Usuario, as: 'usuario', include: [{ model: Persona, as: 'persona' }]

                                                                }).then(function (data) {
                                                                    if (saldo == 0) {
                                                                        return Clase.find({
                                                                            where: { nombre_corto: 'PROCESADO' }, transaction: t
                                                                        }).then(function (claseEncontrada) {
                                                                            return SolicitudCajaChica.update({
                                                                                id_estado: claseEncontrada.id,
                                                                            }, {
                                                                                where: { id: req.body.ingreso.id }, transaction: t
                                                                            }).then(function (SolicitudActualizada) {

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
                                                                        return new Promise(function (fulfill, reject) {
                                                                            fulfill(data)
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
                                                        }).catch(function (err) {
                                                            return new Promise(function (fulfill, reject) {
                                                                reject((err.stack !== undefined) ? err.stack : err);
                                                            });
                                                        });
                                                    });
                                                    //return Promise.all(promises);


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
                                        } else {
                                            return SolicitudCajaChica.update({
                                                id_estado: req.body.ingreso.estado.id,
                                            }, {
                                                where: { id: req.body.ingreso.id }, transaction: t
                                            }).then(function (SolicitudActualizada) {
                                                return Empresa.find({
                                                    where: { id: req.body.sucursal.id_empresa }, transaction: t
                                                }).then(function (empresaEncontrada) {

                                                    return Sucursal.find({
                                                        where: {
                                                            id: req.body.sucursal.id,//your where conditions, or without them if you need ANY entry
                                                        },
                                                        transaction: t
                                                    }).then(function (SucursalEncontrada) {
                                                        return CajaChica.create({
                                                            fecha: req.body.fecha,
                                                            id_sucursal: req.body.sucursal.id,
                                                            id_cuenta: req.body.cuenta.id,
                                                            id_campo: req.body.campo,
                                                            eliminado: false,
                                                            monto: req.body.total,
                                                            id_usuario: req.body.id_usuario,
                                                            saldo: 0,
                                                            pagado: req.body.total,
                                                            detalle: req.body.detalle,
                                                            id_concepto: req.body.concepto.id,
                                                            cerrada: false,
                                                            numero_correlativo: SucursalEncontrada.caja_chica_ingreso_correlativo
                                                        }, {
                                                            transaction: t
                                                        }).then(function (CajaCreada) {
                                                            req.body.CajaCreadaid = CajaCreada.id
                                                            return Sucursal.update({
                                                                caja_chica_ingreso_correlativo: SucursalEncontrada.caja_chica_ingreso_correlativo + 1
                                                            }, {
                                                                where: {
                                                                    id: req.body.sucursal.id,
                                                                }

                                                                , transaction: t
                                                            }).then(function (actualizado) {
                                                                return CajaChica.find({
                                                                    where: { id: CajaCreada.id }, transaction: t,
                                                                    include: [{ model: Sucursal, as: 'sucursal' }, { model: ConceptoMovimientoCajaChica, as: 'concepto', include: [{ model: Clase, as: 'concepto' }] }, { model: ContabilidadCuenta, as: 'cuenta' }, { model: Compra, as: 'compra', include: [{ model: Proveedor, as: 'proveedor' }, { model: Sucursal, as: 'sucursal' }, { model: Movimiento, as: 'movimiento', required: false, include: [{ model: Clase, as: 'clase' }] }] }]
                                                                }, { model: MedicoPaciente, as: 'solicitante', include: [{ model: Persona, as: 'persona' }] }, { model: ConceptoMovimientoCajaChica, as: 'concepto', include: [{ model: Clase, as: 'concepto' }] }, { model: Clase, as: 'estado' }, {
                                                                    model: Usuario, as: 'usuario', include: [{ model: Persona, as: 'persona' }]

                                                                }).then(function (data) {
                                                                    if (saldo == 0) {
                                                                        return Clase.find({
                                                                            where: { nombre_corto: 'PROCESADO' }, transaction: t
                                                                        }).then(function (claseEncontrada) {
                                                                            return SolicitudCajaChica.update({
                                                                                id_estado: claseEncontrada.id,
                                                                            }, {
                                                                                where: { id: req.body.ingreso.id }, transaction: t
                                                                            }).then(function (SolicitudActualizada) {

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
                                                                        return new Promise(function (fulfill, reject) {
                                                                            fulfill(data)
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
                                                        }).catch(function (err) {
                                                            return new Promise(function (fulfill, reject) {
                                                                reject((err.stack !== undefined) ? err.stack : err);
                                                            });
                                                        });
                                                    });





                                                    // return Promise.all(promises);
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
                            }).catch(function (err) {
                                return new Promise(function (fulfill, reject) {
                                    reject((err.stack !== undefined) ? err.stack : err);
                                });
                            });
                            //falta

                        } else {
                            //hay que pensar bien como va ser la edicion para las devol
                            /* return CajaChica.update({
                                fecha: req.body.fecha,
                                id_sucursal: req.body.sucursal.id,
                                id_cuenta: req.body.cuenta.id,
                                id_campo: req.body.campo,
                                eliminado: req.body.eliminado,
                                monto: req.body.total,
                                saldo: 0,
                                pagado: req.body.total,
                                detalle: req.body.detalle,
                                id_concepto: req.body.concepto.id,
                                cerrada: req.body.cerrada,
                            }, {
                                    where: { id: req.body.id },
                                    transaction: t
                                }).then(function (CajaActualizada) {
                                    return CajaChica.find({
                                        where: { id: req.body.id }, transaction: t,
                                        include: [{ model: Sucursal, as: 'sucursal' }, { model: ConceptoMovimientoCajaChica, as: 'concepto', include: [{ model: Clase, as: 'concepto' }] }, { model: ContabilidadCuenta, as: 'cuenta' }, { model: Compra, as: 'compra', include: [{ model: Proveedor, as: 'proveedor' }, { model: Sucursal, as: 'sucursal' }, { model: Movimiento, as: 'movimiento', required: false, include: [{ model: Clase, as: 'clase' }] }] }]
                                    }, { model: MedicoPaciente, as: 'solicitante', include: [{ model: Persona, as: 'persona' }] }, { model: ConceptoMovimientoCajaChica, as: 'concepto', include: [{ model: Clase, as: 'concepto' }] }, { model: Clase, as: 'estado' }, {
                                            model: Usuario, as: 'usuario', include: [{ model: Persona, as: 'persona' }]
     
                                        }).then(function (data) {
                                            return new Promise(function (fulfill, reject) {
                                                fulfill(data)
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
                                }); */
                        }
                        console.log("aqui ")
                    } else {
                        if (!req.body.id) {
                            return Sucursal.find({
                                where: {
                                    id: req.body.sucursal.id,//your where conditions, or without them if you need ANY entry
                                },
                                transaction: t
                            }).then(function (SucursalEncontrada) {
                                return CajaChica.create({
                                    fecha: req.body.fecha,
                                    id_sucursal: req.body.sucursal.id,
                                    id_cuenta: req.body.cuenta.id,
                                    id_campo: req.body.campo,
                                    eliminado: false,
                                    monto: req.body.total,
                                    saldo: 0,
                                    pagado: req.body.total,
                                    detalle: req.body.detalle,
                                    id_concepto: req.body.concepto.id,
                                    cerrada: false,
                                    numero_correlativo: SucursalEncontrada.caja_chica_ingreso_correlativo,
                                    id_usuario: req.body.id_usuario
                                }, {
                                    transaction: t
                                }).then(function (CajaCreada) {
                                    req.body.CajaCreadaid = CajaCreada.id
                                    return Sucursal.update({
                                        caja_chica_ingreso_correlativo: SucursalEncontrada.caja_chica_ingreso_correlativo + 1
                                    }, {
                                        where: {
                                            id: req.body.sucursal.id,
                                        }

                                        , transaction: t
                                    }).then(function (actualizado) {
                                        return CajaChica.find({
                                            where: { id: CajaCreada.id }, transaction: t,
                                            include: [{ model: Sucursal, as: 'sucursal' }, { model: ConceptoMovimientoCajaChica, as: 'concepto', include: [{ model: Clase, as: 'concepto' }] }, { model: ContabilidadCuenta, as: 'cuenta' }, { model: Compra, as: 'compra', include: [{ model: Proveedor, as: 'proveedor' }, { model: Sucursal, as: 'sucursal' }, { model: Movimiento, as: 'movimiento', required: false, include: [{ model: Clase, as: 'clase' }] }] }]
                                        }, { model: MedicoPaciente, as: 'solicitante', include: [{ model: Persona, as: 'persona' }] }, { model: ConceptoMovimientoCajaChica, as: 'concepto', include: [{ model: Clase, as: 'concepto' }] }, { model: Clase, as: 'estado' }, {
                                            model: Usuario, as: 'usuario', include: [{ model: Persona, as: 'persona' }]

                                        }).then(function (data) {
                                            return new Promise(function (fulfill, reject) {
                                                fulfill(data)
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
                            });
                        } else {
                            return CajaChica.update({
                                fecha: req.body.fecha,
                                id_sucursal: req.body.sucursal.id,
                                id_cuenta: req.body.cuenta.id,
                                id_campo: req.body.campo,
                                eliminado: req.body.eliminado,
                                monto: req.body.total,
                                saldo: 0,
                                pagado: req.body.total,
                                detalle: req.body.detalle,
                                id_concepto: req.body.concepto.id,
                                cerrada: req.body.cerrada,
                            }, {
                                where: { id: req.body.id },
                                transaction: t
                            }).then(function (CajaActualizada) {
                                return CajaChica.find({
                                    where: { id: req.body.id }, transaction: t,
                                    include: [{ model: Sucursal, as: 'sucursal' }, { model: ConceptoMovimientoCajaChica, as: 'concepto', include: [{ model: Clase, as: 'concepto' }] }, { model: ContabilidadCuenta, as: 'cuenta' }, { model: Compra, as: 'compra', include: [{ model: Proveedor, as: 'proveedor' }, { model: Sucursal, as: 'sucursal' }, { model: Movimiento, as: 'movimiento', required: false, include: [{ model: Clase, as: 'clase' }] }] }]
                                }, { model: MedicoPaciente, as: 'solicitante', include: [{ model: Persona, as: 'persona' }] }, { model: ConceptoMovimientoCajaChica, as: 'concepto', include: [{ model: Clase, as: 'concepto' }] }, { model: Clase, as: 'estado' }, {
                                    model: Usuario, as: 'usuario', include: [{ model: Persona, as: 'persona' }]

                                }).then(function (data) {
                                    return new Promise(function (fulfill, reject) {
                                        fulfill(data)
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
                    }
                }).catch(function (err) {
                    return new Promise(function (fulfill, reject) {
                        reject((err.stack !== undefined) ? err.stack : err);
                    });
                });
            }).then(function (result) {
                if (req.body.id_caja_chica_detalle_rendicion != undefined && req.body.id_caja_chica_detalle_rendicion != null) {
                    CajaChicaDetalleRendicionFondo.update({
                        rembolsado: true
                    }, {
                        where: { id: req.body.id_caja_chica_detalle_rendicion }
                    }).then(function (actualizadoRendiocnFondo) {
                        CajaChica.find({
                            where: { id: req.body.CajaCreadaid },
                            include: [{ model: Sucursal, as: 'sucursal' }, { model: ConceptoMovimientoCajaChica, as: 'concepto', include: [{ model: Clase, as: 'concepto' }] }, { model: ContabilidadCuenta, as: 'cuenta' }, { model: Compra, as: 'compra', include: [{ model: DetalleCompra, as: 'detallesCompra', include: [{ model: Producto, as: 'producto' }, { model: Clase, as: 'centroCosto' }] }, { model: Proveedor, as: 'proveedor' }, { model: Sucursal, as: 'sucursal' }, { model: Movimiento, as: 'movimiento', required: false, include: [{ model: Clase, as: 'clase' }] }] }]
                        }, { model: MedicoPaciente, as: 'solicitante', include: [{ model: Persona, as: 'persona' }] }, { model: ConceptoMovimientoCajaChica, as: 'concepto', include: [{ model: Clase, as: 'concepto' }] }, { model: Clase, as: 'estado' }, {
                            model: Usuario, as: 'usuario', include: [{ model: Persona, as: 'persona' }]

                        }).then(function (data) {
                            var mensaje = ""
                            if (req.body.id) {
                                mensaje = "Actualizado Satisfactoriamente"
                            } else {
                                mensaje = "Creado Satisfactoriamente"
                            }
                            res.json({ mensaje: mensaje, cajaChica: data });
                        })
                    })
                } else {
                    CajaChica.find({
                        where: { id: req.body.CajaCreadaid },
                        include: [{ model: Sucursal, as: 'sucursal' }, { model: ConceptoMovimientoCajaChica, as: 'concepto', include: [{ model: Clase, as: 'concepto' }] }, { model: ContabilidadCuenta, as: 'cuenta' }, { model: Compra, as: 'compra', include: [{ model: DetalleCompra, as: 'detallesCompra', include: [{ model: Producto, as: 'producto' }, { model: Clase, as: 'centroCosto' }] }, { model: Proveedor, as: 'proveedor' }, { model: Sucursal, as: 'sucursal' }, { model: Movimiento, as: 'movimiento', required: false, include: [{ model: Clase, as: 'clase' }] }] }]
                    }, { model: MedicoPaciente, as: 'solicitante', include: [{ model: Persona, as: 'persona' }] }, { model: ConceptoMovimientoCajaChica, as: 'concepto', include: [{ model: Clase, as: 'concepto' }] }, { model: Clase, as: 'estado' }, {
                        model: Usuario, as: 'usuario', include: [{ model: Persona, as: 'persona' }]

                    }).then(function (data) {
                        var mensaje = ""
                        if (req.body.id) {
                            mensaje = "Actualizado Satisfactoriamente"
                        } else {
                            mensaje = "Creado Satisfactoriamente"
                        }
                        res.json({ mensaje: mensaje, cajaChica: data });
                    })
                }
            }).catch(function (err) {
                var error = (err.stack) ? err.stack : err
                res.json({ hasError: true, mensaje: error });
            });

        })
    function crearDetalleCompra(detalleCompra, idMovimiento, idCompra, idAlmacen, idProducto, idCentroCosto, res, compra, t) {
        return DetalleCompra.create({
            id_compra: idCompra,
            id_producto: idProducto,
            id_centro_costo: idCentroCosto,
            costo_unitario: detalleCompra.costo_unitario,
            cantidad: detalleCompra.cantidad,
            importe: detalleCompra.importe,
            descuento: detalleCompra.descuento,
            recargo: detalleCompra.recargo,
            ice: detalleCompra.ice,
            excento: detalleCompra.excento,
            tipo_descuento: detalleCompra.tipo_descuento,
            tipo_recargo: detalleCompra.tipo_recargo,
            total: detalleCompra.total,
            it: detalleCompra.it,
            iue: detalleCompra.iue,
            id_caja_chica_detalle_rendicion: detalleCompra.id_caja_chica_detalle_rendicion
        }, {
            transaction: t
        }).then(function (detalleCompraCreada) {

            return new Promise(function (fulfill, reject) {
                fulfill()
            });

        }).catch(function (err) {
            return new Promise(function (fulfill, reject) {
                reject((err.stack !== undefined) ? err.stack : err);
            });
        });
    }

    function crearDatosDetalle(compra, idMovimiento, req, res, t, empresaEncontrada, compraCreada) {
        var promises2 = []
        var promises = []
        if (req.body.campos.length > 0) {
            for (var i = 0; i < req.body.campos.length; i++) {
                var campo = req.body.campos[i];
                promises.push(CajaChicaCentroCosto.create({
                    id_caja_chica: req.body.CajaCreadaid,
                    id_centro_costo: campo.id
                }, {
                    transaction: t
                }).then(function (dato) {

                }))
            }
        }
        for (var index = 0; index < compra.detallesCompra.length; index++) {
            var array = compra.detallesCompra.length
            var detalleCompra = compra.detallesCompra[index];
            if (detalleCompra.id) {
                if (!detalleCompra.eliminado) {
                    if (detalleCompra.centroCosto.nombre_corto == "ALM") {
                        promises.push(DetalleCompra.update({
                            cantidad: detalleCompra.cantidad,
                            costo_unitario: detalleCompra.costo_unitario ? detalleCompra.costo_unitario : 0,
                            costo_unitario_dolares: detalleCompra.costo_unitario_dolares ? detalleCompra.costo_unitario_dolares : 0,
                            importe: detalleCompra.importe ? detalleCompra.importe : 0,
                            importe_dolares: detalleCompra.importe_dolares ? detalleCompra.importe_dolares : 0,
                            total: detalleCompra.total,
                            total_dolares: detalleCompra.total_dolares,
                            observacion: detalleCompra.observacion || ''
                        }, {
                            where: {
                                id: detalleCompra.id
                            },transaction: t
                        }).then(function (detalleCompraActualizado) {

                            DetalleMovimiento.find({
                                where: {
                                    id_inventario: detalleCompra.id_inventario,
                                    id_movimiento: compra.movimiento.id,
                                    id_producto: detalleCompra.producto.id
                                },transaction: t
                            }).then(function (detalleMovimiento) {
                                Inventario.find({
                                    where: {
                                        id: detalleCompra.id_inventario
                                    },transaction: t
                                }).then(function (inventario) {
                                    var diferencia = 0, cantidadInventario = inventario.cantidad;
                                    if (detalleCompra.cantidad > detalleMovimiento.cantidad) {
                                        diferencia = detalleCompra.cantidad - detalleMovimiento.cantidad;
                                        cantidadInventario = cantidadInventario + diferencia;
                                    } else if (detalleCompra.cantidad < detalleMovimiento.cantidad) {
                                        diferencia = detalleMovimiento.cantidad - detalleCompra.cantidad;
                                        cantidadInventario = cantidadInventario - diferencia;
                                    }

                                    var costo_unitario_neto = (Math.round((((detalleCompra.importe - detalleCompra.descuento) * 1) / detalleCompra.cantidad) * 100) / 100);
                                    if (compra.movimiento.clase.nombre_corto == "ID" || compra.movimiento.clase.nombre_corto == "IPI") {
                                        costo_unitario_neto = (Math.round((((detalleCompra.importe - detalleCompra.descuento) * 0.87) / detalleCompra.cantidad) * 100) / 100);
                                    }
                                    Inventario.update({
                                        cantidad: cantidadInventario,
                                        costo_unitario: detalleCompra.costo_unitario ? detalleCompra.costo_unitario : 0,
                                        costo_unitario_dolares: detalleCompra.costo_unitario_dolares ? detalleCompra.costo_unitario_dolares : 0,
                                        costo_total: detalleCompra.costo_unitario * cantidadInventario,
                                        costo_total_dolares: (detalleCompra.costo_unitario_dolares ? detalleCompra.costo_unitario_dolares : 0) * cantidadInventario,
                                        fecha_vencimiento: (detalleCompra.inventario.fechaVencimientoTexto ? new Date(detalleCompra.inventario.fechaVencimientoTexto.split('/')[1] + "/" + detalleCompra.inventario.fechaVencimientoTexto.split('/')[0] + "/" + detalleCompra.inventario.fechaVencimientoTexto.split('/')[2]) : null),
                                        lote: detalleCompra.inventario.lote,
                                        costo_unitario_neto: costo_unitario_neto
                                    }, {
                                        where: {
                                            id: inventario.id
                                        },transaction: t
                                    }).then(function (inventarioActualizado) {
                                        DetalleMovimiento.update({
                                            cantidad: detalleCompra.cantidad,
                                            costo_unitario: detalleCompra.costo_unitario ? detalleCompra.costo_unitario : 0,
                                            costo_unitario_dolares: detalleCompra.costo_unitario_dolares ? detalleCompra.costo_unitario_dolares : 0,
                                            importe: detalleCompra.importe ? detalleCompra.importe : 0,
                                            importe_dolares: detalleCompra.importe_dolares ? detalleCompra.importe_dolares : 0,
                                            total: detalleCompra.total ? detalleCompra.total : 0,
                                            total_dolares: detalleCompra.total_dolares ? detalleCompra.total_dolares : 0
                                        }, {
                                            where: {
                                                id: detalleMovimiento.id
                                            },transaction: t
                                        }).then(function (detalleMovimientoActualizado) {
                                            return new Promise(function (fulfill, reject) {
                                                fulfill()
                                            });
                                        }).catch(function (err) {
                                            return new Promise(function (fulfill, reject) {
                                                reject((err.stack !== undefined) ? err.stack : err);
                                            });
                                        })
                                    });
                                });
                            });

                        }));
                    }


                } else {

                    promises.push(DetalleCompra.destroy({
                        where: {
                            id: detalleCompra.id
                        }, transaction: t
                    }).then(function (detalleCompraEliminado) {
                        return new Promise(function (fulfill, reject) {
                            fulfill()
                        });
                    }).catch(function (err) {
                        return new Promise(function (fulfill, reject) {
                            reject((err.stack !== undefined) ? err.stack : err);
                        });
                    }))

                }
            } else if (!detalleCompra.producto.id) {
                promises.push(Producto.create({
                    nombre: detalleCompra.producto.nombre,
                    codigo: detalleCompra.producto.codigo,
                    unidad_medida: detalleCompra.producto.unidad_medida,
                    id_empresa: compra.id_empresa
                }, {
                    transaction: t
                }).then(function (productoCreado) {
                    if (!detalleCompra.centroCosto.id) {
                        return Tipo.find({
                            where: { nombre_corto: 'CCO' }, transaction: t
                        }).then(function (tipoCentroCosto) {
                            Clase.create({
                                nombre: detalleCompra.centroCosto.nombre,
                                id_tipo: tipoCentroCosto.id
                            }, {
                                transaction: t
                            }).then(function (centroCostoCreado) {
                                /*  if (empresaEncontrada.dataValues.usar_peps) { */
                                promises.push(crearDetalleCompra(detalleCompra, idMovimiento, compraCreada.id, null, productoCreado.id, centroCostoCreado.id, res, compra, t));
                                /*    } else {
                                       promises.push(crearDetalleCompraPonderado(detalleCompra, idMovimiento, compraCreada.id, null, productoCreado.id, centroCostoCreado.id, res, compra, t));
                                   } */

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
                        /* if (empresaEncontrada.dataValues.usar_peps) { */
                        promises.push(crearDetalleCompra(detalleCompra, idMovimiento, compraCreada.id, null, productoCreado.id, detalleCompra.centroCosto.id, res, compra, t))
                        /*    } else {
                               promises.push(crearDetalleCompraPonderado(detalleCompra, idMovimiento, compraCreada.id, null, productoCreado.id, detalleCompra.centroCosto.id, res, compra, t))
                           } */
                    }
                }).catch(function (err) {
                    return new Promise(function (fulfill, reject) {
                        reject((err.stack !== undefined) ? err.stack : err);
                    });
                }));
            } else {
                if (!detalleCompra.centroCosto.id) {
                    promises.push(Tipo.find({
                        where: { nombre_corto: 'CCO' }, transaction: t
                    }).then(function (tipoCentroCosto) {
                        return Clase.create({
                            nombre: detalleCompra.centroCosto.nombre,
                            id_tipo: tipoCentroCosto.id
                        }, {
                            transaction: t
                        }).then(function (centroCostoCreado) {

                            promises.push(crearDetalleCompra(detalleCompra, idMovimiento, compraCreada.id, compra.almacen.id, detalleCompra.producto.id, centroCostoCreado.id, res, compra, t));

                        }).catch(function (err) {
                            return new Promise(function (fulfill, reject) {
                                reject((err.stack !== undefined) ? err.stack : err);
                            });
                        });
                    }).catch(function (err) {
                        return new Promise(function (fulfill, reject) {
                            reject((err.stack !== undefined) ? err.stack : err);
                        });
                    }));
                } else {

                    promises.push(crearDetalleCompra(detalleCompra, idMovimiento, compraCreada.id, compra.almacen.id, detalleCompra.producto.id, detalleCompra.centroCosto.id, res, compra, t))

                }
            }
        };
        return Promise.all(promises);
    }
    function crearCompra(compra, res, idProveedor, idMovimiento, idTipo, req, t) {
        var pagado = 0, saldo = 0, monto = 0, padre = null;
        var promises = []
        if (!compra.id) {
            return Compra.create({
                id_tipo_movimiento: idTipo,
                id_proveedor: idProveedor,
                id_movimiento: idMovimiento,
                factura: compra.factura,
                autorizacion: compra.autorizacion,
                fecha: compra.fecha,
                codigo_control: compra.codigo_control,
                importe: compra.importe,
                id_tipo_pago: compra.id_tipo_pago,
                descuento_general: compra.descuento_general,
                descuento: compra.descuento,
                recargo: compra.recargo,
                ice: compra.ice,
                excento: compra.excento,
                tipo_descuento: compra.tipo_descuento,
                tipo_recargo: compra.tipo_recargo,
                total: compra.total,
                id_usuario: compra.id_usuario,
                observacion: compra.observacion,
                dui: compra.dui,
                id_sucursal: compra.sucursal.id,
                tipo_retencion: compra.tipo_retencion ? compra.tipo_retencion : false
            }, {
                transaction: t
            }).then(function (compraCreada) {
                if (req.body.solicitud.concepto.concepto.nombre_corto == "KARDEX") {
                    return CajaChica.findAll({
                        where: { id_solicitud: req.body.solicitud.id, id_padre: null }, transaction: t
                    }).then(function (cajasChicasPadre) {
                        var promises = []
                        var diff = compra.importe
                        return Sucursal.find({
                            where: {
                                id: compra.sucursal.id,//your where conditions, or without them if you need ANY entry
                            }, transaction: t
                        }).then(function (SucursalEncontrada) {
                            for (var i = 0; i < cajasChicasPadre.length; i++) {
                                var element = cajasChicasPadre[i];
                                padre = element.id
                                pagado = diff
                                monto = element.monto
                                if (pagado > element.saldo) {
                                    diff = pagado - element.saldo
                                    saldo = element.saldo - element.saldo
                                    pagado = element.saldo
                                } else {
                                    diff = 0
                                    saldo = element.saldo - pagado
                                }
                                if (element.saldo > 0 && pagado > 0) {
                                    promises.push(CajaChica.create({
                                        id_solicitud: req.body.solicitud.id,
                                        fecha: req.body.fecha,
                                        id_cuenta: req.body.cuenta.id,
                                        id_campo: req.body.campo,
                                        id_compra: compraCreada.id,
                                        eliminado: false,
                                        detalle: req.body.detalle,
                                        monto: monto,
                                        pagado: pagado,
                                        saldo: saldo,
                                        id_padre: padre,
                                        id_concepto: req.body.concepto.id,
                                        cerrada: false,
                                        id_sucursal: compra.sucursal.id,
                                        id_usuario: req.body.id_usuario,
                                        numero_correlativo: SucursalEncontrada.caja_chica_egreso_correlativo + i
                                    }, {
                                        transaction: t
                                    }).then(function (CajaCreada) {
                                        req.body.CajaCreadaid = CajaCreada.id
                                        return new Promise(function (fulfill, reject) {
                                            fulfill(CajaCreada);
                                        });


                                    }).catch(function (err) {
                                        return new Promise(function (fulfill, reject) {
                                            reject((err.stack !== undefined) ? err.stack : err);
                                        });
                                    }))

                                }

                            }
                            diff = compra.importe
                            for (var i = 0; i < cajasChicasPadre.length; i++) {
                                var element = cajasChicasPadre[i];
                                padre = element.id
                                pagado = diff
                                monto = element.monto
                                if (pagado > element.saldo) {
                                    diff = pagado - element.saldo
                                    saldo = element.saldo - element.saldo
                                    pagado = element.saldo
                                } else {
                                    diff = 0
                                    saldo = element.saldo - pagado
                                }
                                if (pagado > 0) {
                                    promises.push(CajaChica.update({
                                        pagado: pagado,
                                        saldo: saldo,
                                    }, {
                                        where: { id: padre }, transaction: t
                                    }).then(function (dato) {
                                        return new Promise(function (fulfill, reject) {
                                            fulfill();
                                        });
                                    }).catch(function (err) {
                                        return new Promise(function (fulfill, reject) {
                                            reject((err.stack !== undefined) ? err.stack : err);
                                        });
                                    }))

                                }
                            }
                            promises.push(Sucursal.update({
                                caja_chica_egreso_correlativo: SucursalEncontrada.caja_chica_egreso_correlativo + cajasChicasPadre.length + 1
                            }, {
                                where: {
                                    id: compra.sucursal.id,
                                }
                                , transaction: t
                            }).then(function (actualizado) {
                                return new Promise(function (fulfill, reject) {
                                    fulfill();
                                });
                            }).catch(function (err) {
                                return new Promise(function (fulfill, reject) {
                                    reject((err.stack !== undefined) ? err.stack : err);
                                });
                            }));
                            promises.push(SolicitudCajaChica.update({
                                id_estado: req.body.solicitud.estado.id,
                            }, {
                                where: { id: req.body.solicitud.id }, transaction: t
                            }).then(function (SolicitudActualizada) {
                                return Empresa.find({
                                    where: { id: compra.id_empresa }, transaction: t
                                }).then(function (empresaEncontrada) {


                                    return crearDatosDetalle(compra, idMovimiento, req, res, t, empresaEncontrada, compraCreada)

                                }).catch(function (err) {
                                    return new Promise(function (fulfill, reject) {
                                        reject((err.stack !== undefined) ? err.stack : err);
                                    });
                                })

                            }).catch(function (err) {
                                return new Promise(function (fulfill, reject) {
                                    reject((err.stack !== undefined) ? err.stack : err);
                                });
                            }));

                            return Promise.all(promises)
                        }).catch(function (err) {
                            return new Promise(function (fulfill, reject) {
                                reject((err.stack !== undefined) ? err.stack : err);
                            });
                        });
                    })
                } else {
                    if (req.body.solicitud.cajasChicas.length > 0) {
                        padre = req.body.solicitud.cajasChicas[0].id

                        if (compra.movimiento.clase.nombre_corto == 'IPRB') {
                            pagado = compra.total
                        } else {
                            pagado = compra.importe
                        }

                        monto = req.body.solicitud.cajasChicas[0].monto
                        saldo = req.body.solicitud.cajasChicas[0].saldo - pagado
                    } else {
                        padre = null
                        monto = compra.importe
                        saldo = compra.importe
                    }
                    if (req.body.solicitud.concepto.concepto.nombre == "GASTO") {
                        padre = null
                        if (compra.movimiento.clase.nombre_corto == 'IPRB') {
                            monto = compra.total
                            pagado = compra.total
                        } else {
                            monto = compra.importe
                            pagado = compra.importe
                        }
                        saldo = 0
                    }

                    return Sucursal.find({
                        where: {
                            id: compra.sucursal.id,//your where conditions, or without them if you need ANY entry
                        }, transaction: t
                    }).then(function (SucursalEncontrada) {
                        return CajaChica.create({
                            id_solicitud: req.body.solicitud.id,
                            fecha: req.body.fecha,
                            id_cuenta: req.body.cuenta.id,
                            id_campo: req.body.campo,
                            id_compra: compraCreada.id,
                            eliminado: false,
                            detalle: req.body.detalle,
                            monto: monto,
                            pagado: pagado,
                            saldo: saldo,
                            id_padre: padre,
                            id_concepto: req.body.concepto.id,
                            cerrada: false,
                            id_sucursal: compra.sucursal.id,
                            id_usuario: req.body.id_usuario,
                            numero_correlativo: SucursalEncontrada.caja_chica_egreso_correlativo
                        }, {
                            transaction: t
                        }).then(function (CajaCreada) {
                            req.body.CajaCreadaid = CajaCreada.id
                            return Sucursal.update({
                                caja_chica_egreso_correlativo: SucursalEncontrada.caja_chica_egreso_correlativo + 1
                            }, {
                                where: {
                                    id: compra.sucursal.id,
                                }

                                , transaction: t
                            }).then(function (actualizado) {
                                if (padre) {
                                    return CajaChica.update({
                                        pagado: req.body.solicitud.cajasChicas[0].pagado + pagado,
                                        saldo: req.body.solicitud.cajasChicas[0].saldo - pagado,
                                    }, {
                                        where: { id: padre }, transaction: t
                                    }).then(function (dato) {
                                        return SolicitudCajaChica.update({
                                            id_estado: req.body.solicitud.estado.id,
                                        }, {
                                            where: { id: req.body.solicitud.id }, transaction: t
                                        }).then(function (SolicitudActualizada) {
                                            return Empresa.find({
                                                where: { id: compra.id_empresa }, transaction: t
                                            }).then(function (empresaEncontrada) {


                                                return crearDatosDetalle(compra, idMovimiento, req, res, t, empresaEncontrada, compraCreada)




                                                //return Promise.all(promises);
                                            }).catch(function (err) {
                                                return new Promise(function (fulfill, reject) {
                                                    reject((err.stack !== undefined) ? err.stack : err);
                                                });
                                            })
                                            /* return CajaChica.find({
                                                where: { id: CajaCreada.id }, transaction: t,
                                                include: [{ model: Sucursal, as: 'sucursal' }, { model: ConceptoMovimientoCajaChica, as: 'concepto', include: [{ model: Clase, as: 'concepto' }] }, { model: ContabilidadCuenta, as: 'cuenta' }, { model: Compra, as: 'compra', include: [{ model: Proveedor, as: 'proveedor' }, { model: Sucursal, as: 'sucursal' }, { model: Movimiento, as: 'movimiento', required: false, include: [{ model: Clase, as: 'clase' }] }] }]
                                            }, { model: MedicoPaciente, as: 'solicitante', include: [{ model: Persona, as: 'persona' }] }, { model: ConceptoMovimientoCajaChica, as: 'concepto', include: [{ model: Clase, as: 'concepto' }] }, { model: Clase, as: 'estado' }, {
                                                    model: Usuario, as: 'usuario', include: [{ model: Persona, as: 'persona' }]
 
                                                }).then(function (data) {
                                                    return new Promise(function (fulfill, reject) {
                                                        fulfill(data)
                                                    });
                                                }).catch(function (err) {
                                                    return new Promise(function (fulfill, reject) {
                                                        reject((err.stack !== undefined) ? err.stack : err);
                                                    });
                                                }); */
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
                                } else {
                                    return SolicitudCajaChica.update({
                                        id_estado: req.body.solicitud.estado.id,
                                    }, {
                                        where: { id: req.body.solicitud.id }, transaction: t
                                    }).then(function (SolicitudActualizada) {
                                        return Empresa.find({
                                            where: { id: compra.id_empresa }, transaction: t
                                        }).then(function (empresaEncontrada) {

                                            return crearDatosDetalle(compra, idMovimiento, req, res, t, empresaEncontrada, compraCreada)

                                            // return Promise.all(promises);
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
        } else {
            return Compra.update({
                id_tipo_movimiento: idTipo,
                id_proveedor: idProveedor,
                id_movimiento: idMovimiento,
                factura: compra.factura,
                autorizacion: compra.autorizacion,
                fecha: compra.fecha,
                codigo_control: compra.codigo_control,
                importe: compra.importe,
                id_tipo_pago: compra.id_tipo_pago,
                descuento_general: compra.descuento_general,
                descuento: compra.descuento,
                recargo: compra.recargo,
                ice: compra.ice,
                excento: compra.excento,
                tipo_descuento: compra.tipo_descuento,
                tipo_recargo: compra.tipo_recargo,
                total: compra.total,
                id_usuario: compra.id_usuario,
                observacion: compra.observacion,
                dui: compra.dui,
                id_proveedor: idProveedor,
                id_sucursal: compra.sucursal.id,
                tipo_retencion: compra.tipo_retencion ? compra.tipo_retencion : false
            }, {
                where: { id: compra.id },
                transaction: t
            }).then(function (compraActualizada) {
                let compraCreada = req.body.compra
                if (req.body.solicitud.cajasChicas.length > 0) {
                    padre = req.body.solicitud.cajasChicas[0].id

                    if (compra.movimiento.clase.nombre_corto == 'IPRB') {
                        pagado = compra.total
                    } else {
                        pagado = compra.importe
                    }

                    monto = req.body.solicitud.cajasChicas[0].monto
                    saldo = req.body.solicitud.cajasChicas[0].saldo - pagado
                } else {
                    padre = null
                    monto = compra.importe
                    saldo = compra.importe
                }
                if (req.body.solicitud.concepto.concepto.nombre == "GASTO") {
                    padre = null
                    if (compra.movimiento.clase.nombre_corto == 'IPRB') {
                        monto = compra.total
                        pagado = compra.total
                    } else {
                        monto = compra.importe
                        pagado = compra.importe
                    }
                    saldo = 0
                }
                if (req.body.id) {
                    return CajaChica.update({
                        //id_solicitud: req.body.solicitud.id,
                        fecha: req.body.fecha,
                        id_cuenta: req.body.cuenta.id,
                        id_compra: compraCreada.id,
                        id_campo: req.body.campo,
                        eliminado: false,
                        detalle: req.body.detalle,
                        monto: monto,
                        pagado: pagado,
                        saldo: saldo,
                        id_padre: padre,
                        id_concepto: req.body.concepto.id,
                        cerrada: req.body.cerrada,
                        id_sucursal: compra.sucursal.id,
                        // numero_correlativo: SucursalEncontrada.caja_chica_egreso_correlativo
                    }, {
                        where: { id: req.body.id },
                        transaction: t
                    }).then(function (CajaCreada) {
                        req.body.CajaCreadaid = req.body.id
                        if (padre) {
                            return CajaChica.update({
                                pagado: req.body.solicitud.cajasChicas[0].pagado + pagado,
                                saldo: req.body.solicitud.cajasChicas[0].saldo - pagado,
                            }, {
                                where: { id: padre }, transaction: t
                            }).then(function (dato) {
                                return SolicitudCajaChica.update({
                                    id_estado: req.body.solicitud.estado.id,
                                }, {
                                    where: { id: req.body.solicitud.id }, transaction: t
                                }).then(function (SolicitudCreada) {
                                    return Movimiento.update({
                                        fecha: compra.fecha,
                                    }, {
                                        where: {
                                            id: compra.movimiento.id
                                        }, transaction: t
                                    }).then(function (movimientoActualizado) {
                                        return ActualizarDetalleCompra(req, compra, t)
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
                            })
                        } else {
                            return SolicitudCajaChica.update({
                                id_estado: req.body.solicitud.estado.id,
                            }, {
                                where: { id: req.body.solicitud.id }, transaction: t
                            }).then(function (SolicitudCreada) {
                                return Movimiento.update({
                                    fecha: compra.fecha,
                                }, {
                                    where: {
                                        id: compra.movimiento.id
                                    }, transaction: t
                                }).then(function (movimientoActualizado) {
                                    return ActualizarDetalleCompra(req, compra, t)
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
                        }
                    }).catch(function (err) {
                        return new Promise(function (fulfill, reject) {
                            console.log(err)
                            reject((err.stack !== undefined) ? err.stack : err);
                        });
                    });
                } else {
                    if (req.body.solicitud.concepto.concepto.nombre_corto == "KARDEX") {
                        return CajaChica.findAll({
                            where: { id_solicitud: req.body.solicitud.id, id_padre: null }, transaction: t
                        }).then(function (cajasChicasPadre) {
                            var promises = []
                            var diff = compra.importe
                            return Sucursal.find({
                                where: {
                                    id: compra.sucursal.id,//your where conditions, or without them if you need ANY entry
                                }, transaction: t
                            }).then(function (SucursalEncontrada) {
                                for (var i = 0; i < cajasChicasPadre.length; i++) {
                                    var element = cajasChicasPadre[i];
                                    padre = element.id
                                    pagado = diff
                                    monto = element.monto
                                    if (pagado > element.saldo) {
                                        diff = pagado - element.saldo
                                        saldo = element.saldo - element.saldo
                                        pagado = element.saldo
                                    } else {
                                        diff = 0
                                        saldo = element.saldo - pagado
                                    }
                                    if (element.saldo > 0 && pagado > 0) {
                                        promises.push(CajaChica.create({
                                            id_solicitud: req.body.solicitud.id,
                                            fecha: req.body.fecha,
                                            id_cuenta: req.body.cuenta.id,
                                            id_campo: req.body.campo,
                                            id_compra: compraCreada.id,
                                            eliminado: false,
                                            detalle: req.body.detalle,
                                            monto: monto,
                                            pagado: pagado,
                                            saldo: saldo,
                                            id_padre: padre,
                                            id_concepto: req.body.concepto.id,
                                            cerrada: false,
                                            id_sucursal: compra.sucursal.id,
                                            id_usuario: req.body.id_usuario,
                                            numero_correlativo: SucursalEncontrada.caja_chica_egreso_correlativo + i
                                        }, {
                                            transaction: t
                                        }).then(function (CajaCreada) {
                                            req.body.CajaCreadaid = CajaCreada.id
                                            return new Promise(function (fulfill, reject) {
                                                fulfill(CajaCreada);
                                            });


                                        }).catch(function (err) {
                                            return new Promise(function (fulfill, reject) {
                                                reject((err.stack !== undefined) ? err.stack : err);
                                            });
                                        }))

                                    }

                                }
                                diff = compra.importe
                                for (var i = 0; i < cajasChicasPadre.length; i++) {
                                    var element = cajasChicasPadre[i];
                                    padre = element.id
                                    pagado = diff
                                    monto = element.monto
                                    if (pagado > element.saldo) {
                                        diff = pagado - element.saldo
                                        saldo = element.saldo - element.saldo
                                        pagado = element.saldo
                                    } else {
                                        diff = 0
                                        saldo = element.saldo - pagado
                                    }
                                    if (pagado > 0) {
                                        promises.push(CajaChica.update({
                                            pagado: pagado,
                                            saldo: saldo,
                                        }, {
                                            where: { id: padre }, transaction: t
                                        }).then(function (dato) {
                                            return new Promise(function (fulfill, reject) {
                                                fulfill();
                                            });
                                        }).catch(function (err) {
                                            return new Promise(function (fulfill, reject) {
                                                reject((err.stack !== undefined) ? err.stack : err);
                                            });
                                        }))

                                    }
                                }
                                promises.push(Sucursal.update({
                                    caja_chica_egreso_correlativo: SucursalEncontrada.caja_chica_egreso_correlativo + cajasChicasPadre.length + 1
                                }, {
                                    where: {
                                        id: compra.sucursal.id,
                                    }
                                    , transaction: t
                                }).then(function (actualizado) {
                                    return new Promise(function (fulfill, reject) {
                                        fulfill();
                                    });
                                }).catch(function (err) {
                                    return new Promise(function (fulfill, reject) {
                                        reject((err.stack !== undefined) ? err.stack : err);
                                    });
                                }));
                                promises.push(SolicitudCajaChica.update({
                                    id_estado: req.body.solicitud.estado.id,
                                }, {
                                    where: { id: req.body.solicitud.id }, transaction: t
                                }).then(function (SolicitudActualizada) {
                                    return Empresa.find({
                                        where: { id: compra.id_empresa }, transaction: t
                                    }).then(function (empresaEncontrada) {


                                        return crearDatosDetalle(compra, idMovimiento, req, res, t, empresaEncontrada, compraCreada)

                                    }).catch(function (err) {
                                        return new Promise(function (fulfill, reject) {
                                            reject((err.stack !== undefined) ? err.stack : err);
                                        });
                                    })

                                }).catch(function (err) {
                                    return new Promise(function (fulfill, reject) {
                                        reject((err.stack !== undefined) ? err.stack : err);
                                    });
                                }));

                                return Promise.all(promises)
                            }).catch(function (err) {
                                return new Promise(function (fulfill, reject) {
                                    reject((err.stack !== undefined) ? err.stack : err);
                                });
                            });
                        })
                    } else {
                        if (req.body.solicitud.cajasChicas.length > 0) {
                            padre = req.body.solicitud.cajasChicas[0].id

                            if (compra.movimiento.clase.nombre_corto == 'IPRB') {
                                pagado = compra.total
                            } else {
                                pagado = compra.importe
                            }

                            monto = req.body.solicitud.cajasChicas[0].monto
                            saldo = req.body.solicitud.cajasChicas[0].saldo - pagado
                        } else {
                            padre = null
                            monto = compra.importe
                            saldo = compra.importe
                        }
                        if (req.body.solicitud.concepto.concepto.nombre == "GASTO") {
                            padre = null
                            if (compra.movimiento.clase.nombre_corto == 'IPRB') {
                                monto = compra.total
                                pagado = compra.total
                            } else {
                                monto = compra.importe
                                pagado = compra.importe
                            }
                            saldo = 0
                        }

                        return Sucursal.find({
                            where: {
                                id: compra.sucursal.id,//your where conditions, or without them if you need ANY entry
                            }, transaction: t
                        }).then(function (SucursalEncontrada) {
                            return CajaChica.create({
                                id_solicitud: req.body.solicitud.id,
                                fecha: req.body.fecha,
                                id_cuenta: req.body.cuenta.id,
                                id_campo: req.body.campo,
                                id_compra: compraCreada.id,
                                eliminado: false,
                                detalle: req.body.detalle,
                                monto: monto,
                                pagado: pagado,
                                saldo: saldo,
                                id_padre: padre,
                                id_concepto: req.body.concepto.id,
                                cerrada: false,
                                id_sucursal: compra.sucursal.id,
                                id_usuario: req.body.id_usuario,
                                numero_correlativo: SucursalEncontrada.caja_chica_egreso_correlativo
                            }, {
                                transaction: t
                            }).then(function (CajaCreada) {
                                req.body.CajaCreadaid = CajaCreada.id
                                return Sucursal.update({
                                    caja_chica_egreso_correlativo: SucursalEncontrada.caja_chica_egreso_correlativo + 1
                                }, {
                                    where: {
                                        id: compra.sucursal.id,
                                    }

                                    , transaction: t
                                }).then(function (actualizado) {
                                    if (padre) {
                                        return CajaChica.update({
                                            pagado: req.body.solicitud.cajasChicas[0].pagado + pagado,
                                            saldo: req.body.solicitud.cajasChicas[0].saldo - pagado,
                                        }, {
                                            where: { id: padre }, transaction: t
                                        }).then(function (dato) {
                                            return SolicitudCajaChica.update({
                                                id_estado: req.body.solicitud.estado.id,
                                            }, {
                                                where: { id: req.body.solicitud.id }, transaction: t
                                            }).then(function (SolicitudActualizada) {
                                                return Empresa.find({
                                                    where: { id: compra.id_empresa }, transaction: t
                                                }).then(function (empresaEncontrada) {


                                                    return crearDatosDetalle(compra, idMovimiento, req, res, t, empresaEncontrada, compraCreada)




                                                    //return Promise.all(promises);
                                                }).catch(function (err) {
                                                    return new Promise(function (fulfill, reject) {
                                                        reject((err.stack !== undefined) ? err.stack : err);
                                                    });
                                                })
                                                /* return CajaChica.find({
                                                    where: { id: CajaCreada.id }, transaction: t,
                                                    include: [{ model: Sucursal, as: 'sucursal' }, { model: ConceptoMovimientoCajaChica, as: 'concepto', include: [{ model: Clase, as: 'concepto' }] }, { model: ContabilidadCuenta, as: 'cuenta' }, { model: Compra, as: 'compra', include: [{ model: Proveedor, as: 'proveedor' }, { model: Sucursal, as: 'sucursal' }, { model: Movimiento, as: 'movimiento', required: false, include: [{ model: Clase, as: 'clase' }] }] }]
                                                }, { model: MedicoPaciente, as: 'solicitante', include: [{ model: Persona, as: 'persona' }] }, { model: ConceptoMovimientoCajaChica, as: 'concepto', include: [{ model: Clase, as: 'concepto' }] }, { model: Clase, as: 'estado' }, {
                                                        model: Usuario, as: 'usuario', include: [{ model: Persona, as: 'persona' }]
     
                                                    }).then(function (data) {
                                                        return new Promise(function (fulfill, reject) {
                                                            fulfill(data)
                                                        });
                                                    }).catch(function (err) {
                                                        return new Promise(function (fulfill, reject) {
                                                            reject((err.stack !== undefined) ? err.stack : err);
                                                        });
                                                    }); */
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
                                    } else {
                                        return SolicitudCajaChica.update({
                                            id_estado: req.body.solicitud.estado.id,
                                        }, {
                                            where: { id: req.body.solicitud.id }, transaction: t
                                        }).then(function (SolicitudActualizada) {
                                            return Empresa.find({
                                                where: { id: compra.id_empresa }, transaction: t
                                            }).then(function (empresaEncontrada) {

                                                return crearDatosDetalle(compra, idMovimiento, req, res, t, empresaEncontrada, compraCreada)

                                                // return Promise.all(promises);
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

                        }).catch(function (err) {
                            return new Promise(function (fulfill, reject) {
                                reject((err.stack !== undefined) ? err.stack : err);
                            });
                        });
                    }
                }

            }).catch(function (err) {
                return new Promise(function (fulfill, reject) {
                    reject((err.stack !== undefined) ? err.stack : err);
                });
            });
        }
    }
    router.route('/caja-chica/incremento/solicitud/:id_solicitud')
        .post(ensureAuthorizedlogged, function (req, res) {
            SolicitudCajaChica.find({
                where: { id: req.params.id_solicitud },
                include: [{ model: Sucursal, as: 'sucursal' },
                {
                    model: CajaChica, as: 'cajasChicas', where: { eliminado: false }, required: false, include: [{
                        model: Compra, as: 'compra', required: false,
                    }, { model: Usuario, as: 'usuario', include: [{ model: Persona, as: 'persona' }] }]
                }]
            }).then(function (solicitudEncontrada) {
                if (!solicitudEncontrada.sucursal.activo) return res.json({ mensaje: 'Sucursal deshabilitada, no se pueden hacer cambios.' })
                var monto = 0;
                if (solicitudEncontrada.cajasChicas) {
                    if (solicitudEncontrada.cajasChicas.length == 1) {
                        if (solicitudEncontrada.incremento > 0) {
                            monto = solicitudEncontrada.monto - solicitudEncontrada.incremento + req.body.incremento
                        } else {
                            monto = solicitudEncontrada.monto + req.body.incremento
                        }
                        CajaChica.create({
                            id_solicitud: solicitudEncontrada.id,
                            fecha: req.body.fecha_incremento,
                            id_cuenta: solicitudEncontrada.cajasChicas[0].id_cuenta,
                            eliminado: false,
                            detalle: solicitudEncontrada.detalle,
                            monto: req.body.incremento,
                            pagado: 0,
                            saldo: req.body.incremento,
                            id_concepto: req.body.concepto.id,
                            cerrada: false,
                            id_usuario: req.body.id_usuario,
                            id_sucursal: solicitudEncontrada.cajasChicas[0].id_sucursal,
                            numero_correlativo: solicitudEncontrada.sucursal.numero_correlativo_caja_chica_incremento + 1
                        }).then(function (CajaCreada) {
                            Sucursal.update({
                                numero_correlativo_caja_chica_incremento: solicitudEncontrada.sucursal.numero_correlativo_caja_chica_incremento + 1
                            }, { where: { id: solicitudEncontrada.sucursal.id } }).then(function (sucActualiada) {
                                res.json({ mensaje: 'Actualizado Satisfactoriamente!' })
                            })
                        })
                        /* SolicitudCajaChica.update({
                            monto: monto,
                            incremento: req.body.incremento,
                            fecha_incremento: req.body.fecha_incremento,
                            numero_correlativo_incremento: solicitudEncontrada.sucursal.numero_correlativo_caja_chica_incremento
                        }, {
                                where: { id: req.params.id_solicitud },
                            }).then(function (SolicitudActualizada) {
                                Sucursal.update({
                                    numero_correlativo_caja_chica_incremento: solicitudEncontrada.sucursal.numero_correlativo_caja_chica_incremento + 1
                                }, { where: { id: solicitudEncontrada.sucursal.id } }).then(function (sucActualiada) {
                                    var montoCaja = 0;
                                    var saldoCaja = 0;
                                    if (solicitudEncontrada.incremento > 0) {
                                        montoCaja = solicitudEncontrada.cajasChicas[0].monto - solicitudEncontrada.incremento + req.body.incremento
                                        saldoCaja = solicitudEncontrada.cajasChicas[0].saldo - solicitudEncontrada.incremento + req.body.incremento
                                    } else {
                                        montoCaja = solicitudEncontrada.cajasChicas[0].monto + req.body.incremento
                                        saldoCaja = solicitudEncontrada.cajasChicas[0].saldo + req.body.incremento
                                    }
                                    CajaChica.update({
                                        monto: montoCaja,
                                        saldo: saldoCaja
                                    }, {
                                            where: { id: solicitudEncontrada.cajasChicas[0].id }
                                        }).then(function (CajaActualizada) {
                                            res.json({ mensaje: 'Actualizado Satisfactoriamente!' })
                                        })
                                })
 
                            }) */
                    } else {
                        res.json({ mensaje: 'la solicitud ya tiene registro de kardex no se pude realizar el incremento' })
                    }
                } else {
                    res.json({ mensaje: 'aun no se realizo el desembolso!' })
                }

            })

        })
    router.route('/vale-caja-chica')
        .put(ensureAuthorizedlogged, function (req, res) {
            Clase.find({
                where: { nombre: 'PROCESADO' },
                include: [{
                    model: Tipo, as: 'tipo',
                    where: { nombre_corto: 'ESTADOS-VCC' }
                }]
            }).then(function (estadoEncontrado) {
                ValeCajaChica.update({
                    id_estado: estadoEncontrado.id,
                    //eliminado: false
                }, {
                    where: { id: req.body.id }
                }).then(function (ValeCreado) {
                    ValeCajaChica.find({
                        where: { id: req.body.id },
                        include: [{ model: SolicitudCajaChica, as: 'solicitud', include: { model: MedicoPaciente, as: 'solicitante', include: [{ model: Persona, as: 'persona' }] } }, { model: Clase, as: 'estado' }]
                    }).then(function (valeEncontrado) {
                        res.json({ vale: valeEncontrado, mensaje: 'Vale caja chica creado Satisfactoriamente!' })
                    })

                })

            })
        })
        .post(ensureAuthorizedlogged, function (req, res) {
            Clase.find({
                where: { nombre: 'PENDIENTE' },
                include: [{
                    model: Tipo, as: 'tipo',
                    where: { nombre_corto: 'ESTADOS-VCC' }
                }]
            }).then(function (estadoEncontrado) {
                Sucursal.find({
                    where: { id: req.body.solicitud.id_sucursal }
                }).then(function (SucursalEncontrada) {
                    if (!SucursalEncontrada.activo) return res.json({ mensaje: 'Sucursal deshabilitada, no se puede crear vale.', vale: {}, hasError: true, hasErr: true })
                    ValeCajaChica.create({
                        id_solicitud: req.body.solicitud.id,
                        fecha: req.body.fecha,
                        monto: req.body.solicitud.monto,
                        id_estado: estadoEncontrado.id,
                        numero_correlativo: SucursalEncontrada.vale_caja_chica_correlativo,
                        eliminado: false
                    }).then(function (ValeCreado) {
                        Sucursal.update({
                            vale_caja_chica_correlativo: SucursalEncontrada.vale_caja_chica_correlativo + 1
                        }, {
                            where: { id: req.body.solicitud.id_sucursal }
                        }).then(function (SucursalEncontrada) {
                            ValeCajaChica.find({
                                where: { id: ValeCreado.id },
                                include: [{ model: SolicitudCajaChica, as: 'solicitud', include: { model: MedicoPaciente, as: 'solicitante', include: [{ model: Persona, as: 'persona' }] } }, { model: Clase, as: 'estado' }]
                            }).then(function (valeEncontrado) {
                                res.json({ vale: valeEncontrado, mensaje: 'Vale caja chica creado Satisfactoriamente!' })
                            })

                        })

                    })
                })

            })

        })
    router.route('/nivel-caja-chica/:id_empresa')
        .get(function (req, res) {
            CajaChicaNivelGasto.findAll({ where: { id_empresa: req.params.id_empresa, eliminado: false } }).then({

            }).then(function (nivelesEncontrados) {
                res.json({ niveles: nivelesEncontrados })
            })
        })
        .post(ensureAuthorizedlogged, function (req, res) {
            req.body.forEach(function (nivel, i, a) {
                if (nivel.id) {
                    CajaChicaNivelGasto.update({
                        numero: nivel.numero,
                        nombre: nivel.nombre,
                        eliminado: nivel.eliminado
                    }, {
                        where: { id: nivel.id }
                    }).then(function (actualizado) {
                        if (i === (a.length) - 1) {
                            res.json({ mensaje: 'Registro Actualizado Satisfactoriamente!' })
                        }
                    })


                } else {
                    CajaChicaNivelGasto.create({
                        numero: nivel.numero,
                        nombre: nivel.nombre,
                        id_empresa: req.params.id_empresa,
                        eliminado: nivel.eliminado
                    }).then(function (creado) {
                        if (i === (a.length) - 1) {
                            res.json({ mensaje: 'Registro Actualizado Satisfactoriamente!' })
                        }
                    })
                }

            })
        })

    router.route('/nivel-caja-chica-gastos/:id_empresa')
        .get(function (req, res) {
            CajaChicaGasto.findAll({
                where: { eliminado: false },
                include: [{ model: ConceptoMovimientoCajaChica, as: 'concepto', include: [{ model: Clase, as: 'concepto' }] }, { model: ContabilidadCuenta, as: 'cuenta' }, { required: true, model: CajaChicaNivelGasto, as: 'nivel', where: { id_empresa: req.params.id_empresa, eliminado: false } }]
            }).then(function (gastosEncontrados) {
                res.json({ gastos: gastosEncontrados })
            })
        })
        .post(ensureAuthorizedlogged, function (req, res) {
            req.body.forEach(function (gasto, i, a) {
                if (gasto.id) {
                    CajaChicaGasto.update({
                        numero: gasto.numero,
                        id_nivel: gasto.nivel.id,
                        nombre: gasto.nombre,
                        id_cuenta: gasto.cuenta.id,
                        combustible_recorrido: gasto.combustible_recorrido,
                        eliminado: gasto.eliminado,
                        usar_producto: gasto.usar_producto,
                        id_concepto: gasto.concepto.id
                    }, {
                        where: { id: gasto.id }
                    }).then(function (actualizado) {
                        if (i === (a.length) - 1) {
                            res.json({ mensaje: 'Registro Actualizado Satisfactoriamente!' })
                        }
                    })
                } else {
                    CajaChicaGasto.create({
                        numero: gasto.numero,
                        id_nivel: gasto.nivel.id,
                        nombre: gasto.nombre,
                        id_cuenta: gasto.cuenta.id,
                        combustible_recorrido: gasto.combustible_recorrido,
                        eliminado: false,
                        usar_producto: gasto.usar_producto,
                        id_concepto: gasto.concepto.id
                    }).then(function (creado) {
                        if (i === (a.length) - 1) {
                            res.json({ mensaje: 'Registro Actualizado Satisfactoriamente!' })
                        }
                    })
                }

            })
        })
    router.route('/rendicion-fondo-caja-chica-gastos/:id_rendicion?')
        .get(function (req, res) {
            CajaChicaRendicionFondo.find({
                where: { id: req.params.id_rendicion },
                include: [{
                    model: CajaChicaDetalleRendicionFondo, as: 'gastos', where: { eliminado: false },
                    include: [{ model: CajaChicaDetalleRendicionFondoCentroCosto, as: 'datosCentrosCosto', include: [{ model: Clase, as: 'centro_costo' }] }, { model: CajaChicaGasto, as: 'gasto' },
                    { model: Clase, as: 'area' }]
                },
                { model: Clase, as: 'rendicion' }, { model: Clase, as: 'vehiculo' }, { model: RrhhViajeConductor, as: 'conductor' }]
            }).then(function (encontrado) {
                res.json({ fr: encontrado })
            })
        })
        .post(ensureAuthorizedlogged, function (req, res) {
            sequelize.transaction(function (t) {
                return Sucursal.find({
                    where: { id: req.body.solicitud.id_sucursal }, transaction: t
                }).then(function (sucursalEncontrada) {
                    if (!sucursalEncontrada.activo) throw new Error('Sucursal deshabilitada, ')
                    if (!req.body.id) {
                        return guardarCajaChicaRendicionFondo(req, sucursalEncontrada, t)
                    } else {
                        return actualizarCajaChicaRendicionFondo(req, sucursalEncontrada, t)
                    }
                }).catch(function (err) {
                    return new Promise(function (fulfill, reject) {
                        reject((err.stack !== undefined) ? err.stack : err);
                    });
                })
            }).then(function (result) {
                CajaChicaRendicionFondo.find({
                    where: { id: req.body.id_fr },
                    include: [
                        { model: Clase, as: 'rendicion' }, { model: Clase, as: 'vehiculo' }, { model: RrhhViajeConductor, as: 'conductor' }]
                }).then(function (encontrado) {
                    CajaChicaNivelGasto.findAll({
                        include: [{
                            model: CajaChicaGasto, as: 'gastos',
                            include: [{
                                model: CajaChicaDetalleRendicionFondo, as: 'detallesRendicionesFondos', where: { eliminado: false },
                                include: [{ model: CajaChicaDetalleRendicionFondoCentroCosto, as: 'datosCentrosCosto', include: [{ model: Clase, as: 'centro_costo' }] }, { model: CajaChicaGasto, as: 'gasto' },
                                { model: Clase, as: 'area' }, { model: CajaChicaRendicionFondo, as: 'rendicionFondo', attributes: ['id'], where: { id: req.body.id_fr } }]
                            }]
                        }],
                        order: [['numero', 'asc'], [{ model: CajaChicaGasto, as: 'gastos' }, 'numero', 'asc']]
                    }).then(function (datosImp) {
                        if (req.body.id) {
                            res.json({ mensaje: 'Actualizado Satisfactoriamente', datosImp: datosImp, fr: encontrado })
                        } else {
                            res.json({ mensaje: 'Creado Satisfactoriamente', datosImp: datosImp, fr: encontrado })
                        }
                    })
                })
            }).catch(function (err) {
                var error = (err.stack) ? err.stack : err
                res.json({ hasError: true, mensaje: error });
            });

        })

    //nuevo registro    fondo a rendir     
    function guardarCajaChicaRendicionFondo(req, sucursalEncontrada, t) {
        return CajaChicaRendicionFondo.create({
            id_solicitud: req.body.solicitud.id,
            id_rendicion: req.body.rendicion.id,
            fecha: req.body.fecha,
            fecha_salida: req.body.fecha_salida,
            fecha_entrada: req.body.fecha_entrada,
            odometro_salida: req.body.odometro_salida,
            odometro_entrada: req.body.odometro_entrada,
            id_conductor: req.body.conductor ? req.body.conductor.id : null,
            id_vehiculo: req.body.vehiculo ? req.body.vehiculo.id : null,
            total: req.body.total,
            litros: req.body.litros,
            numero_correlativo: sucursalEncontrada.numero_rendicion_fondo_gasto_correlativo,
            id_empresa: req.body.id_empresa
        }, {
            transaction: t
        }).then(function (fRcreado) {
            req.body.id_fr = fRcreado.id
            return Sucursal.update({
                numero_rendicion_fondo_gasto_correlativo: sucursalEncontrada.numero_rendicion_fondo_gasto_correlativo + 1
            }, {
                where: { id: sucursalEncontrada.id }, transaction: t
            }).then(function (actulizado) {
                var promesa = []
                req.body.gastos.forEach(function (g, i, a) {
                    promesa.push(guardarDetalleRendicionFondo(g, fRcreado, t, i, a))
                })
                return Promise.all(promesa)
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
    function actualizarCajaChicaRendicionFondo(req, sucursalEncontrada, t) {
        return CajaChicaRendicionFondo.update({
            //id_solicitud: req.body.solicitud.id,
            id_rendicion: req.body.rendicion.id,
            fecha: req.body.fecha,
            fecha_salida: req.body.fecha_salida,
            fecha_entrada: req.body.fecha_entrada,
            odometro_salida: req.body.odometro_salida,
            odometro_entrada: req.body.odometro_entrada,
            id_conductor: req.body.conductor ? req.body.conductor.id : null,
            id_vehiculo: req.body.vehiculo ? req.body.vehiculo.id : null,
            total: req.body.total,
            litros: req.body.litros,
            id_empresa: req.body.id_empresa
            //numero_correlativo: sucursalEncontrada.numero_rendicion_fondo_gasto_correlativo
        }, {
            where: { id: req.body.id },
            transaction: t
        }).then(function (frActulizado) {
            req.body.id_fr = req.body.id
            var promesa = []
            req.body.gastos.forEach(function (g, i, a) {
                promesa.push(guardarDetalleRendicionFondo(g, req.body, t, i, a))
            })
            return Promise.all(promesa)
        }).catch(function (err) {
            return new Promise(function (fulfill, reject) {
                reject((err.stack !== undefined) ? err.stack : err);
            });
        })


    }
    function guardarDetalleRendicionFondo(g, fr, t, i, a) {
        if (g.id) {
            return CajaChicaDetalleRendicionFondo.update({
                //id_rendicion_fondo: fr.id,
                id_gasto: g.gasto.id,
                fecha: g.fecha,
                numero_factura_recargo: g.numero_factura_recargo,
                detalle: g.detalle,
                monto: g.monto,
                id_area: g.area.id,
                eliminado: g.eliminado,
                usar_factura: g.usar_factura,
                rembolsado: g.rembolsado,
            }, {
                where: { id: g.id },
                transaction: t
            }).then(function (detalleActualizado) {
                return CajaChicaDetalleRendicionFondoCentroCosto.destroy({
                    where: { id_detalle_rendicion_fondo: g.id }, transaction: t
                }).then(function (eliminados) {
                    var promesa = []
                    if (g.centrosCosto) {
                        if (g.centrosCosto.length > 0) {
                            g.centrosCosto.forEach(function (cc) {
                                promesa.push(guardarCentroCosto(cc, fr, g, t, i, a))
                            })
                            return Promise.all(promesa)
                        } else {
                            if (i === (a.length - 1)) {
                                return new Promise(function (fulfill, reject) {
                                    fulfill(fr);
                                });
                            }
                        }
                    } else {
                        if (i === (a.length - 1)) {
                            return new Promise(function (fulfill, reject) {
                                fulfill(fr);
                            });
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
        } else {
            return CajaChicaDetalleRendicionFondo.create({
                id_rendicion_fondo: fr.id,
                id_gasto: g.gasto.id,
                id_compra: g.id_compra,
                fecha: g.fecha,
                numero_factura_recargo: g.numero_factura_recargo,
                detalle: g.detalle,
                monto: g.monto,
                id_area: g.area.id,
                eliminado: false,
                usar_factura: g.usar_factura,
                rembolsado: false
            }, {
                transaction: t
            }).then(function (detalleCreado) {
                var promesa = []
                if (g.centrosCosto) {
                    if (g.centrosCosto.length > 0) {
                        g.centrosCosto.forEach(function (cc) {
                            promesa.push(guardarCentroCosto(cc, fr, detalleCreado, t, i, a))
                        })
                        if (g.id_compra) {
                            promesa.push(Compra.update({
                                compra_rendida: true
                            }, {
                                where: { id: g.id_compra }, transaction: t
                            }))
                        }
                        return Promise.all(promesa)
                    } else {
                        if (i === (a.length - 1)) {
                            if (g.id_compra) {
                                Compra.update({
                                    compra_rendida: true
                                }, {
                                    where: { id: g.id_compra }, transaction: t
                                }).then(function (actua) {
                                    return new Promise(function (fulfill, reject) {
                                        fulfill(fr);
                                    });
                                })
                            } else {
                                return new Promise(function (fulfill, reject) {
                                    fulfill(fr);
                                });
                            }
                        }
                    }
                } else {
                    if (i === (a.length - 1)) {
                        if (g.id_compra) {
                            Compra.update({
                                compra_rendida: true
                            }, {
                                where: { id: g.id_compra }, transaction: t
                            }).then(function (actua) {
                                return new Promise(function (fulfill, reject) {
                                    fulfill(fr);
                                });
                            })
                        } else {
                            return new Promise(function (fulfill, reject) {
                                fulfill(fr);
                            });
                        }
                    }
                }
            }).catch(function (err) {
                return new Promise(function (fulfill, reject) {
                    reject((err.stack !== undefined) ? err.stack : err);
                });
            })
        }
    }
    function guardarCentroCosto(cc, fr, detalleCreado, t, i, a) {
        return CajaChicaDetalleRendicionFondoCentroCosto.create({
            id_detalle_rendicion_fondo: detalleCreado.id,
            id_centro_costo: cc.id
        }, {
            transaction: t
        }).then(function (ccCreado) {
            if (i === (a.length - 1)) {
                return new Promise(function (fulfill, reject) {
                    fulfill(fr);
                });
            }
        }).catch(function (err) {
            return new Promise(function (fulfill, reject) {
                reject((err.stack !== undefined) ? err.stack : err);
            });
        })
    }
    router.route('/rendicion-caja-chica/solicitud/:id_solicitud')
        .get(function (req, res) {
            CajaChicaRendicionFondo.find({
                where: { id_solicitud: req.params.id_solicitud }
            }).then(function (rendicionEncontrada) {
                res.json({ rendicion: rendicionEncontrada })
            })
        })
    //fin nuevo registro fondo a rendir
    router.route('/configuracion-contable-comprobantes/empresa/:id_empresa')
        .get(function (req, res) {
            ConfiguracionContableComprobante.findAll({
                where: { eliminado: false },
                include: [{ model: Clase, as: 'tipoComprobante' }, { model: Sucursal, as: 'sucursal', where: { id_empresa: req.params.id_empresa, activo: true }, required: true },
                {
                    model: EmpresaIntegracion, as: 'integracion',
                    include: [{ model: IntegracionAplicacion, as: 'moduloIntegracion', include: [{ model: Aplicacion, as: 'aplicacion' }] }]
                },
                {
                    model: ConfiguracionContableMovimientoCentroCosto, as: 'movimientosCentrosCosto',
                    include: { model: Clase, as: 'movimiento' }
                },
                {
                    model: ConfiguracionContableMovimientoAuxiliar, as: 'movimientosAuxiliares',
                    include: { model: Clase, as: 'movimiento' }
                },
                { model: ContabilidadCuenta, as: 'contraCuentaDebe', include: [{ model: Clase, as: 'tipoAuxiliar', required: false }] },
                { model: ContabilidadCuenta, as: 'contraCuentaHaber', include: [{ model: Clase, as: 'tipoAuxiliar', required: false }] }]
            }).then(function (conf) {
                res.json(conf)
            }).catch(function (err) {
                var error = (err.stack) ? err.stack : err
                res.json({ hasError: true, mensaje: error });
            });
        })
        .post(function (req, res) {
            sequelize.transaction(function (t) {
                var promises = []
                req.body.forEach(function (conf) {
                    if (conf.id) {
                        promises.push(actualizarConfiguracionContableComprobante(req, conf, t))
                    } else {
                        promises.push(crearConfiguracionContableComprobante(req, conf, t))
                    }
                })
                return Promise.all(promises)
            }).then(function (result) {
                res.json({ mensaje: 'Guardado Satisfactoriamente' })
            }).catch(function (err) {
                var error = (err.stack) ? err.stack : err
                res.json({ hasError: true, mensaje: error });
            });

        })
    function actualizarConfiguracionContableComprobante(req, conf, t) {
        return Sucursal.find({
            where: {
                id: conf.sucursal.id
            }, transaction: t
        }).then((suc) => {
            if (!suc.activo) throw new Error('Sucursal(es) deshabilitada(s), no se pueden hacer cambios.')
            return ConfiguracionContableComprobante.update({
                id_integracion: conf.integracion.id,
                id_sucursal: conf.sucursal.id,
                id_tipo_comprobante: conf.tipoComprobante ? conf.tipoComprobante.id : null,
                glosa_general: conf.glosa_general,
                usar_auxiliar: conf.usar_auxiliar,
                usar_centro_costo: conf.usar_centro_costo,
                id_contra_cuenta_debe: conf.contraCuentaDebe ? conf.contraCuentaDebe.id : null,
                glosa_debe: conf.glosa_debe,
                id_contra_cuenta_haber: conf.contraCuentaHaber ? conf.contraCuentaHaber.id : null,
                glosa_haber: conf.glosa_haber,
                eliminado: conf.eliminado
            }, {
                where: { id: conf.id }, transaction: t
            }).then(function (confAcutlizada) {
                var promises = []
                promises.push(actulizarCentrosCostoConfiguracionContable(req, conf, t))
                promises.push(actualizarCuentasAuxConfiguracionContable(req, conf, t))

                return Promise.all(promises)
            }).catch(function (err) {
                return new Promise(function (fulfill, reject) {
                    reject((err.stack !== undefined) ? err.stack : err);
                });
            })
        }).catch((err) => {
            return new Promise((f, r) => r(err.stack))
        })

    }
    function crearConfiguracionContableComprobante(req, conf, t) {
        return Sucursal.find({
            where: {
                id: conf.sucursal.id
            }, transaction: t
        }).then((suc) => {
            if (!suc.activo) throw new Error('Sucursal(es) deshabilitada(s), no se pueden hacer cambios.')
            return ConfiguracionContableComprobante.create({
                id_integracion: conf.integracion.id,
                id_sucursal: conf.sucursal.id,
                id_tipo_comprobante: conf.tipoComprobante ? conf.tipoComprobante.id : null,
                glosa_general: conf.glosa_general,
                usar_auxiliar: conf.usar_auxiliar,
                usar_centro_costo: conf.usar_centro_costo,
                id_contra_cuenta_debe: conf.contraCuentaDebe.id,
                glosa_debe: conf.glosa_debe,
                id_contra_cuenta_haber: conf.contraCuentaHaber.id,
                glosa_haber: conf.glosa_haber,
                eliminado: false
            }, { transaction: t }).then(function (confCreada) {
                var promises = []
                if (conf.movimientosCentrosCosto) {
                    for (var i = 0; i < conf.movimientosCentrosCosto.length; i++) {
                        var centro = conf.movimientosCentrosCosto[i];
                        promises.push(crearCentrosCostoConfiguracionContable(req, confCreada, centro, t))
                    }
                }
                if (conf.movimientosAuxiliares) {
                    for (var i = 0; i < conf.movimientosAuxiliares.length; i++) {
                        var cuentaAux = conf.movimientosAuxiliares[i];
                        promises.push(crearCuentaAuxConfiguracionContable(req, confCreada, cuentaAux, t))
                    }
                }
                return Promise.all(promises)
            }).catch(function (err) {
                return new Promise(function (fulfill, reject) {
                    reject((err.stack !== undefined) ? err.stack : err);
                });
            })
        }).catch((err) => {
            return new Promise((f, r) => r(err.stack))
        })
    }
    function actulizarCentrosCostoConfiguracionContable(req, conf, t) {

        return ConfiguracionContableMovimientoCentroCosto.destroy({
            where: { id_configuracion_contable_comprobate: conf.id }, transaction: t
        }).then(function (centrosEliminados) {
            var promises = []
            if (conf.movimientosCentrosCosto) {
                for (var i = 0; i < conf.movimientosCentrosCosto.length; i++) {
                    var element = conf.movimientosCentrosCosto[i];
                    promises.push(crearCentrosCostoConfiguracionContable(req, conf, element, t))
                }
            }
            return Promise.all(promises)
        }).catch(function (err) {
            return new Promise(function (fulfill, reject) {
                reject((err.stack !== undefined) ? err.stack : err);
            });
        })
    }
    function crearCentrosCostoConfiguracionContable(req, conf, centro, t) {
        return ConfiguracionContableMovimientoCentroCosto.create({
            id_movimiento_caja_chica: centro.id,
            id_configuracion_contable_comprobate: conf.id
        }, { transaction: t }).then(function (centroCreado) {
            return new Promise(function (fulfill, reject) {
                fulfill();
            });
        }).catch(function (err) {
            return new Promise(function (fulfill, reject) {
                reject((err.stack !== undefined) ? err.stack : err);
            });
        })
    }
    function actualizarCuentasAuxConfiguracionContable(req, conf, t) {
        /* if (i === 0) { */
        return ConfiguracionContableMovimientoAuxiliar.destroy({
            where: { id_configuracion_contable_comprobate: conf.id }, transaction: t
        }).then(function (cuentasAuxEliminadas) {
            var promises = []
            if (conf.movimientosAuxiliares) {
                for (var i = 0; i < conf.movimientosAuxiliares.length; i++) {
                    var element = conf.movimientosAuxiliares[i];
                    promises.push(crearCuentaAuxConfiguracionContable(req, conf, element, t))
                }
            }
            return Promise.all(promises)

        }).catch(function (err) {
            return new Promise(function (fulfill, reject) {
                reject((err.stack !== undefined) ? err.stack : err);
            });
        })
        /*  } else {
             return crearCuentaAuxConfiguracionContable(req, conf, cuentaAux, t)
         } */
    }
    function crearCuentaAuxConfiguracionContable(req, conf, cuentaAux, t) {
        return ConfiguracionContableMovimientoAuxiliar.create({
            id_movimiento_caja_chica: cuentaAux.id,
            id_configuracion_contable_comprobate: conf.id
        }, { transaction: t }).then(function (centroCreado) {
            return new Promise(function (fulfill, reject) {
                fulfill();
            });
        }).catch(function (err) {
            return new Promise(function (fulfill, reject) {
                reject((err.stack !== undefined) ? err.stack : err);
            });
        })
    }
    router.route('/lista-vales-caja/sucursal/:id_sucursal/pagina/:pagina/items-pagina/:items_pagina/busqueda/:texto_busqueda/columna/:columna/direccion/:direccion/estado/:id_estado')
        .get(ensureAuthorizedlogged, function (req, res) {
            var condicionSolicitudCajaChica = { id_sucursal: req.params.id_sucursal, id_solicitante: { $ne: null }, eliminado: false },
                CondicionVale = { id_estado: req.params.id_estado },
                condicionCajaChica = { id_padre: null, saldo: { $ne: 0 } },
                condicionBeneficiario = {};
            if (req.params.texto_busqueda != '0') {
                if (isNaN(parseInt(req.params.texto_busqueda))) {
                    condicionBeneficiario = { nombre_completo: { $like: "%" + req.params.texto_busqueda + "%" } }
                } else {
                    CondicionVale.monto = parseInt(req.params.texto_busqueda)
                }
            }
            var textOrder = ""
            if (req.params.columna == 'beneficiario_devolucion') {
                textOrder = "`solicitante.persona.nombre_completo` " + req.params.direccion
            } else if (req.params.columna == 'fecha_devolucion') {
                textOrder = "fecha " + req.params.direccion
            } else if (req.params.columna == 'monto_devolucion') {
                textOrder = "monto " + req.params.direccion
            } else if (req.params.columna == 'doc_devolucion') {
                textOrder = "cajasChicas.numero_correlativo " + req.params.direccion
            } else {
                textOrder = req.params.columna + " " + req.params.direccion
            }
            if (req.params.items_pagina != '0') {
                textOrder = textOrder + " limit " + (req.params.items_pagina * (req.params.pagina - 1)) + ", " + req.params.items_pagina
            }
            var datosbusqueda = {
                where: CondicionVale,
                include: [{
                    model: SolicitudCajaChica, as: 'solicitud', where: condicionSolicitudCajaChica,
                    include: [{
                        model: MedicoPaciente, as: 'solicitante',
                        include: [{ model: Persona, as: 'persona', where: condicionBeneficiario }]
                    }]
                },
                { model: Clase, as: 'estado' }]
            }
            datosbusqueda.group = ["`agil_vale_caja_chica`.`id`"]
            ValeCajaChica.count(
                datosbusqueda
            ).then(function (count) {
                datosbusqueda.order = sequelize.literal(textOrder)
                ValeCajaChica.findAll(
                    datosbusqueda
                ).then(function (solicitudes) {
                    res.json({ vales: solicitudes, paginas: Math.ceil(count.length / req.params.items_pagina) });
                })
            })
        })
    router.route('/verificar-doc-rendicion/:id_sucursal/doc/:doc')
        .get(async function (req, res) {
            try {
                detalle = await CajaChica.findAll({
                    where: { id_sucursal: req.params.id_sucursal, numero_correlativo: req.params.doc },

                    include: [{
                        model: SolicitudCajaChica, as: 'solicitud', include: [{
                            model: MedicoPaciente, as: 'solicitante',
                            include: [{ model: Persona, as: 'persona' }]
                        },
                        {
                            model: ConceptoMovimientoCajaChica, as: 'concepto',
                            include: [{
                                model: Clase, as: 'concepto', where: { nombre_corto: 'KARDEX' },
                                include: [{ model: Tipo, as: 'tipo', where: { nombre_corto: 'CM_CCH' } }]
                            }]
                        },]
                    }]
                })
                res.json(detalle);

            } catch (err) {
                res.json({ hasError: true, mensaje: (err.stack) ? err.stack : err });
            }

        });

    router.route('/caja-chica/eliminar-devolucion/caja/:id_caja')
        .post(ensureAuthorizedlogged, function (req, res) {
            sequelize.transaction(async function (t) {
                try {
                    let cajaEncontrada = await CajaChica.find({
                        where: { id: req.params.id_caja }, transaction: t
                    })

                    await CajaChica.update({
                        eliminado: true
                    }, {
                        where: { id: req.params.id_caja }, transaction: t
                    })

                    let cajaPadreEncontrada = await CajaChica.find({
                        where: { id: cajaEncontrada.id_padre }, transaction: t
                    })
                    if (cajaPadreEncontrada.saldo != 0) {
                        await CajaChica.update({
                            pagado: cajaPadreEncontrada.pagado - cajaEncontrada.monto,
                            saldo: cajaPadreEncontrada.saldo + cajaEncontrada.monto
                        }, {
                            where: { id: cajaPadreEncontrada.id }, transaction: t
                        })
                    }
                    return new Promise(function (fulfill, reject) {
                        fulfill({ mensaje: 'Eliminado Satisfactoriamente' })
                    });
                } catch (err) {
                    return new Promise(function (fulfill, reject) {
                        reject({ mensaje: (err.stack !== undefined) ? err.stack : err, hasErr: true });
                    });
                }

            }).then(function (result) {
                res.json(result)
            }).catch(function (err) {
                res.json(err);
            });

        })
    function ActualizarDetalleCompra(req, compra, t) {
        var promises = []
        if (req.body.campos.length > 0) {
            return CajaChicaCentroCosto.destroy({
                where: { id_caja_chica: req.body.id }, transaction: t
            }).then(function (eliminados) {
                for (var i = 0; i < req.body.campos.length; i++) {
                    var campo = req.body.campos[i];
                    promises.push(CajaChicaCentroCosto.create({
                        id_caja_chica: req.body.id,
                        id_centro_costo: campo.id
                    }, {
                        transaction: t
                    }).then(function (dato) {

                    }))
                }

            })
        }
        for (var index = 0; index < compra.detallesCompra.length; index++) {
            var array = compra.detallesCompra.length
            var detalleCompra = compra.detallesCompra[index];
            if (detalleCompra.id) {
                if (!detalleCompra.eliminado) {
                    promises.push(DetalleCompra.update({
                        cantidad: detalleCompra.cantidad,
                        costo_unitario: detalleCompra.costo_unitario,
                        importe: detalleCompra.importe,
                        total: detalleCompra.total,
                    }, {
                        where: {
                            id: detalleCompra.id
                        }, transaction: t
                    }).then(function (detalleCompraActualizado) {
                        return new Promise(function (fulfill, reject) {
                            fulfill()
                        });
                    }).catch(function (err) {
                        return new Promise(function (fulfill, reject) {
                            reject((err.stack !== undefined) ? err.stack : err);
                        });
                    }))

                } else {

                    promises.push(DetalleCompra.destroy({
                        where: {
                            id: detalleCompra.id
                        }, transaction: t
                    }).then(function (detalleCompraEliminado) {
                        return new Promise(function (fulfill, reject) {
                            fulfill()
                        });
                    }).catch(function (err) {
                        return new Promise(function (fulfill, reject) {
                            reject((err.stack !== undefined) ? err.stack : err);
                        });
                    }))

                }
            } else {
                if (compra.usar_producto) {
                    if (!detalleCompra.producto.id) {
                        promises.push(Producto.create({
                            nombre: detalleCompra.producto.nombre,
                            codigo: detalleCompra.producto.codigo,
                            unidad_medida: detalleCompra.producto.unidad_medida,
                            id_empresa: compra.id_empresa
                        }, {
                            transaction: t
                        }).then(function (productoCreado) {
                            if (!detalleCompra.centroCosto.id) {
                                return Tipo.find({
                                    where: { nombre_corto: 'CCO' }, transaction: t
                                }).then(function (tipoCentroCosto) {
                                    return Clase.create({
                                        nombre: detalleCompra.centroCosto.nombre,
                                        id_tipo: tipoCentroCosto.id
                                    }, {
                                        transaction: t
                                    }).then(function (centroCostoCreado) {
                                        return crearDetalleCompra(detalleCompra, compra.movimiento.id, compra.id, null, productoCreado.id, detalleCompra.centroCosto.id, res, compra)
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
                                return crearDetalleCompra(detalleCompra, compra.movimiento.id, compra.id, null, productoCreado.id, detalleCompra.centroCosto.id, res, compra)
                            }
                        }).catch(function (err) {
                            return new Promise(function (fulfill, reject) {
                                reject((err.stack !== undefined) ? err.stack : err);
                            });
                        }));
                    } else {
                        if (!detalleCompra.centroCosto.id) {
                            promises.push(Tipo.find({
                                where: { nombre_corto: 'CCO' }
                            }).then(function (tipoCentroCosto) {
                                return Clase.create({
                                    nombre: detalleCompra.centroCosto.nombre,
                                    id_tipo: tipoCentroCosto.id
                                }, {
                                    transaction: t
                                }).then(function (centroCostoCreado) {
                                    return crearDetalleCompra(detalleCompra, compra.movimiento.id, compra.id, null, detalleCompra.producto.id, detalleCompra.centroCosto.id, res, compra)
                                }).catch(function (err) {
                                    return new Promise(function (fulfill, reject) {
                                        reject((err.stack !== undefined) ? err.stack : err);
                                    });
                                });
                            }).catch(function (err) {
                                return new Promise(function (fulfill, reject) {
                                    reject((err.stack !== undefined) ? err.stack : err);
                                });
                            }));
                        } else {
                            return crearDetalleCompra(detalleCompra, compra.movimiento.id, compra.id, null, detalleCompra.producto.id, detalleCompra.centroCosto.id, res, compra)
                        }

                    }
                } else {
                    crearDetalleCompraServicio(detalleCompra, compra.id, res);
                }
            }
        };
        return Promise.all(promises)
    }
}

