const { Redshift } = require("aws-sdk");
const { text } = require("pdfkit/js/mixins/text");

module.exports = function (router, sequelize, Sequelize, EstadoFinancieroConfiguracionImpresion, EstadoFinancieroGestion, Tipo, Clase, ProveedorCuenta
    , Proveedor, ClienteCuenta, Cliente, ClasificacionCuenta, ContabilidadCuenta, AsientoContabilidad, ComprobanteContabilidad, MonedaTipoCambio, ContabilidadCuentaAuxiliar, Usuario,
    Persona, Sucursal, Empresa, NumeroLiteral, ensureAuthorizedlogged) {

    router.route('/gestiones/:id_empresa')
        .get(ensureAuthorizedlogged, function (req, res) {
            EstadoFinancieroGestion.findAll({
                include: [{ model: Clase, as: 'tipoGestion', include: [{ model: Tipo, as: 'tipo', where: { id_empresa: parseInt(req.params.id_empresa) } }] }]
            }).then(function (datos) {
                res.json(datos)
            })
        })

        .post(ensureAuthorizedlogged, function (req, res) {
            req.body.forEach(function (gestion, index, array) {
                if (gestion.id) {
                    EstadoFinancieroGestion.update({
                        id_tipo: gestion.tipoGestion.id,
                        inicio: gestion.inicio,
                        fin: gestion.fin,
                        habilitado: gestion.habilitado
                    }, {
                        where: { id: gestion.id }
                    }).then(function (entities) {
                        res.json({ mensaje: 'Guardado Satisfactoriamente!' });
                    });
                } else {
                    EstadoFinancieroGestion.create({
                        id_tipo: gestion.tipoGestion.id,
                        inicio: gestion.inicio,
                        fin: gestion.fin,
                        habilitado: gestion.habilitado
                    }).then(function (entities) {
                        res.json({ mensaje: 'Guardado Satisfactoriamente!' });
                    });
                }
            });

        });
    router.route('/configuracion-gestion/:id_empresa')
        .get(ensureAuthorizedlogged, function (req, res) {
            EstadoFinancieroGestion.find({
                where: {
                    habilitado: true
                },
                include: [{ model: Clase, as: 'tipoGestion', include: [{ model: Tipo, as: 'tipo', where: { id_empresa: parseInt(req.params.id_empresa) } }] }]
            }).then(function (datos) {
                res.json({gestion: datos})
            })
        });
    router.route('/configuracion-impresion/:id_empresa')
        .get(ensureAuthorizedlogged, function (req, res) {
            EstadoFinancieroConfiguracionImpresion.find({
                where: { id_empresa: parseInt(req.params.id_empresa) },
                include: [{ model: Clase, as: 'tipoNumeracion' }]
            }).then(function (datos) {
                res.json(datos)
            })
        })
        .post(ensureAuthorizedlogged, function (req, res) {
            if (req.body.id) {
                EstadoFinancieroConfiguracionImpresion.update({
                    id_empresa: parseInt(req.params.id_empresa),
                    lugar_emision: req.body.lugar_emision,
                    fecha_emision: req.body.fecha_emision,
                    id_tipo_numeracion: req.body.tipoNumeracion.id,
                    empesar_numeracion: req.body.empesar_numeracion,
                    firma_uno: req.body.firma_uno,
                    cargo_uno: req.body.cargo_uno,
                    firma_dos: req.body.firma_dos,
                    cargo_dos: req.body.cargo_dos,
                    frase_pie_pagina: req.body.frase_pie_pagina,
                    usar_lugar_emision: req.body.usar_lugar_emision,
                    usar_fecha_emision: req.body.usar_fecha_emision,
                    usar_tipo_numeracion: req.body.usar_tipo_numeracion,
                    usar_empesar_numeracion: req.body.usar_empesar_numeracion,
                    usar_firma_uno: req.body.usar_firma_uno,
                    usar_firma_dos: req.body.usar_firma_dos,
                    usar_frase_pie_pagina: req.body.usar_frase_pie_pagina
                }, {
                    where: { id: req.body.id }
                }).then(function (datos) {
                    res.json({ mensaje: 'guardado Satisfactoriamente!' })
                })
            } else {
                EstadoFinancieroConfiguracionImpresion.create({
                    id_empresa: parseInt(req.params.id_empresa),
                    lugar_emision: req.body.lugar_emision,
                    fecha_emision: req.body.fecha_emision,
                    id_tipo_numeracion: req.body.tipoNumeracion.id,
                    empesar_numeracion: req.body.empesar_numeracion,
                    firma_uno: req.body.firma_uno,
                    cargo_uno: req.body.cargo_uno,
                    firma_dos: req.body.firma_dos,
                    cargo_dos: req.body.cargo_dos,
                    frase_pie_pagina: req.body.frase_pie_pagina,
                    usar_lugar_emision: req.body.usar_lugar_emision,
                    usar_fecha_emision: req.body.usar_fecha_emision,
                    usar_tipo_numeracion: req.body.usar_tipo_numeracion,
                    usar_empesar_numeracion: req.body.usar_empesar_numeracion,
                    usar_firma_uno: req.body.usar_firma_uno,
                    usar_firma_dos: req.body.usar_firma_dos,
                    usar_frase_pie_pagina: req.body.usar_frase_pie_pagina,
                }).then(function (datos) {
                    res.json({ mensaje: 'guardado Satisfactoriamente!' })
                })
            }

        });

    router.route('/contabilidad-cuentas-estado-resultado/empresa/:id_empresa/tipo_periodo/:periodo/tipo/:id_tipo/gestion/:gestion/mes/:mes/inicio/:inicio/fin/:fin/gestion_fin/:gestion_fin')
        .post(/*ensureAuthorized,*/function (req, res) {
            var condicionCuenta = {}, condicionComprobante = {};
            condicionCuenta.id_empresa = parseInt(req.params.id_empresa);
            /* if (req.params.id_tipo != 0) {
                condicionCuenta.id_tipo_cuenta = parseInt(req.params.id_tipo);
            } */
            if (req.params.periodo == 'GESTIÓN') {
                var diaInicio = req.body.fechasImpresion.inicio.split("/")[0]
                var diafin = req.body.fechasImpresion.fin.split("/")[0]
                var mesinico = parseInt(req.body.fechasImpresion.inicio.split("/")[1])
                var mesfin = parseInt(req.body.fechasImpresion.fin.split("/")[1])
                if (mesinico == 1) {
                    var inicio = req.params.gestion + "-" + mesinico + "-" + diaInicio + " 00:00:00"
                    var fin = req.params.gestion + "-" + mesfin + "-" + diafin + " 00:00:00"
                } else {
                    var anio = parseInt(req.params.gestion) + 1
                    var inicio = req.params.gestion + "-" + mesinico + "-" + diaInicio + '00:00:00'
                    var fin = anio + "-" + mesfin + "-" + diafin + '23:59:00'
                }

                /*   inicio.setHours(0, 0, 0, 0, 0);
                  fin.setHours(23, 59, 59, 0, 0); */
                var condicionComprobante = { eliminado: false }
            } else if (req.params.periodo == 'MES') {
                var inicio = new Date(req.params.gestion, req.params.mes, 1)
                var fin = new Date(req.params.gestion, parseInt(req.params.mes) + 1, 0)
                inicio = req.params.gestion + "-" + inicio.getMonth() + "-" + fin.getDate() + " 00:00:00"
                fin = req.params.gestion + "-" + fin.getMonth() + "-" + fin.getDate() + " 23:59:59"
                var condicionComprobante = { eliminado: false }

            } else if (req.params.periodo == 'FECHAS') {
                var inicio = new Date(req.params.inicio)
                var fin = new Date(req.params.fin)
                inicio.setHours(0, 0, 0, 0);
                fin.setHours(23, 59, 59, 59);
                var condicionComprobante = { eliminado: false }
            }
            condicionCuenta.eliminado = false
            // condicionCuenta.cuenta_activo = true
            var cindicionCuenta2 = Object.assign({}, condicionCuenta)
            var condicionClasificacion = {}
            var condicionTipo = {}
            var datosCuenta = {
                attributes: ['id', 'nombre', 'codigo'],

                include: [{
                    model: ContabilidadCuenta, as: 'hijos', attributes: ['id', 'nombre', 'codigo'], include: [{
                        model: ContabilidadCuenta, as: 'hijos', attributes: ['id', 'nombre', 'codigo'], include: [{
                            model: ContabilidadCuenta, attributes: ['id', 'nombre', 'codigo', 'saldo', 'debe', 'haber'], as: 'hijos', where: condicionCuenta, include: [{
                                model: AsientoContabilidad, as: 'cuenta', attributes: ['id','debe_bs', 'haber_bs'], where: { eliminado: false },
                                include: [{ model: ComprobanteContabilidad, as: 'comprobante', attributes: ['id'], where: condicionComprobante }]
                            },{
                                model: ClasificacionCuenta, as: "clasificacion", attributes: ['id', "nombre"], include: [{ model: Clase, as: 'tipoClasificacion', attributes: ['id', 'nombre_corto'], where: condicionClasificacion }, { model: Clase, as: 'saldo' }],
            
                            }]
                        }]
                    }]
                },
                {
                    model: ClasificacionCuenta, as: "clasificacion", attributes: ['id', "nombre"], include: [{ model: Clase, as: 'tipoClasificacion', attributes: ['id', 'nombre_corto'] }, { model: Clase, as: 'saldo' }],

                },
                {
                    model: Clase, as: 'tipoCuenta', attributes: ['id'], where: condicionTipo
                },

                ],

            }
            var datosCuenta2 = {
                attributes: ['id', 'nombre', 'codigo'],

                include: [{
                    model: ContabilidadCuenta, as: 'hijos', attributes: ['id', 'nombre', 'codigo'], include: [{
                        model: ContabilidadCuenta, as: 'hijos', attributes: ['id', 'nombre', 'codigo'], include: [{
                            model: ContabilidadCuenta, attributes: ['id', 'nombre', 'codigo', 'saldo', 'debe', 'haber'], as: 'hijos', where: cindicionCuenta2, include: [{
                                model: AsientoContabilidad, as: 'cuenta', attributes: ['id','debe_bs', 'haber_bs'], where: { eliminado: false },
                                include: [{ model: ComprobanteContabilidad, as: 'comprobante', attributes: ['id'], where: condicionComprobante }]
                            }]
                        }, {
                            model: ClasificacionCuenta, as: "clasificacion", attributes: ['id', "nombre"], include: [{ model: Clase, as: 'tipoClasificacion', attributes: ['id', 'nombre_corto'], where: condicionClasificacion }, { model: Clase, as: 'saldo' }],
        
                        }]
                    }]
                },
                {
                    model: ClasificacionCuenta, as: "clasificacion", attributes: ['id', "nombre"], include: [{ model: Clase, as: 'tipoClasificacion', attributes: ['id', 'nombre_corto'] }, { model: Clase, as: 'saldo' }],

                },
                {
                    model: Clase, as: 'tipoCuenta', attributes: ['id']
                },

                ],
                // group: ["`hijos.hijos.hijos.id`"]

            }
            var grupo = {}
            var subgrupo = {}
            var apropiacion = {}
            var genericas = {}
            if (req.params.periodo != 'COMPARATIVO') {
                Tipo.find({
                    where: {
                        nombre_corto: 'TCC',
                        id_empresa: condicionCuenta.id_empresa
                    },
                    include: [{ model: Clase, as: 'clases' }]
                }).then(function (tipo) {
                    grupo = tipo.clases.find(function (clase) {
                        return clase.nombre_corto == 1;
                    })
                    subgrupo = tipo.clases.find(function (clase) {
                        return clase.nombre_corto == 2;
                    })
                    genericas = tipo.clases.find(function (clase) {
                        return clase.nombre_corto == 3;
                    })
                    apropiacion = tipo.clases.find(function (clase) {
                        return clase.nombre_corto == 4;
                    })
                    MonedaTipoCambio.find({
                        where: {
                            fecha: {
                                $between: [inicio, fin]
                            }, id_empresa: req.params.id_empresa
                        }
                    }).then(function (MonedaCambio) {
                        condicionComprobante.fecha = { $between: [inicio, fin] }
                        condicionTipo.id = subgrupo.id
                        cindicionCuenta2.id_tipo_cuenta = apropiacion.id
                        condicionClasificacion.nombre_corto = { $in: ["4"] }
                        ContabilidadCuenta.findAll(
                            datosCuenta2
                        ).then(function (cuentasVenta) {
                            if (cuentasVenta.length > 0) {
                                cuentasVenta.forEach(function (cuenta, index, array) {
                                    delete condicionTipo.id;
                                    delete condicionComprobante.fecha;
                                    delete condicionCuenta.codigo;
                                    delete condicionClasificacion.nombre_corto;
                                    //condicionTipo.id = genericas.id
                                    condicionCuenta.estado_resultado = true
                                    condicionCuenta.codigo = { $like: cuenta.codigo + "%" }
                                    ContabilidadCuenta.findAll(
                                        datosCuenta
                                    ).then(function (cuentasCostoVenta) {
                                        cuenta.dataValues.cuentasEstadoResultado = cuentasCostoVenta
                                        if (index === (array.length - 1)) {
                                            delete condicionCuenta.codigo;
                                            condicionCuenta.estado_resultado = false
                                            condicionTipo.id = grupo.id
                                            condicionComprobante.fecha = { $between: [inicio, fin] }
                                            condicionCuenta.cuenta_activo = false
                                            condicionClasificacion.nombre_corto = { $in: ["5"] }
                                            ContabilidadCuenta.findAll(
                                                datosCuenta
                                            ).then(function (cuentasGrupoGasto) {
                                                condicionClasificacion.nombre_corto = { $in: ["7", "6"] }
                                                ContabilidadCuenta.findAll(
                                                    datosCuenta
                                                ).then(function (cuentasGrupoIngresoEgreso) {

                                                    res.json({
                                                        cuentasActivos: cuentasGrupoGasto, cuentasPasivosPatrimonios: cuentasGrupoIngresoEgreso, cuentasSubGrupoEstadoResultado: cuentasVenta
                                                        , monedaCambio: MonedaCambio
                                                    })
                                                })
                                            })

                                        }
                                    })
                                })
                            } else {

                                condicionTipo.id = grupo.id
                                condicionComprobante.fecha = { $between: [inicio, fin] }
                                condicionCuenta.cuenta_activo = false
                                condicionClasificacion.nombre_corto = { $in: ["5"] }
                                ContabilidadCuenta.findAll(
                                    datosCuenta
                                ).then(function (cuentasGrupoGasto) {
                                    condicionClasificacion.nombre_corto = { $in: ["7"] }
                                    ContabilidadCuenta.findAll(
                                        datosCuenta
                                    ).then(function (cuentasGrupoIngresoEgreso) {
                                        res.json({
                                            cuentasActivos: cuentasGrupoGasto, cuentasPasivosPatrimonios: cuentasGrupoIngresoEgreso, cuentasSubGrupoEstadoResultado: cuentasVenta
                                            , monedaCambio: MonedaCambio
                                        })
                                    })
                                })

                            }
                        })

                    });
                });
            } else {
            }
        })


    function devolverDatosConsultaBalanceGeneral(req, condicionClasificacion, condicionTipo, condicionCuenta, condicionComprobante, tipo) {
        var texto = ""
        if (tipo == 'g') {
            texto = "SELECT DISTINCT\
            grupo.cuenta_padre AS `id_cuenta_grupo`,\
            grupo.codigo AS `codigo_cuenta_grupo`,\
            grupo.cuenta_padre AS `cuenta_padre`,\
            grupo.nombre AS `nombre`,\
            grupo.id AS `id`,\
            `cuenta.clasificacion.tipoClasificacion`.`nombre` AS `tipo_cuenta_nombre`,\
            grupo.cuenta_activo AS `cuenta_activo`\
        FROM\
            `agil_asiento_contabilidad` AS `agil_asiento_contabilidad`\
            LEFT OUTER JOIN `agil_contabilidad_cuenta` AS `cuenta` ON `agil_asiento_contabilidad`.`cuenta` = `cuenta`.`id`\
            LEFT OUTER JOIN `agil_contabilidad_clasificacion_cuenta` AS `cuenta.clasificacion` ON `cuenta`.`clasificacion` = `cuenta.clasificacion`.`id`\
            INNER JOIN `gl_clase` AS `cuenta.clasificacion.tipoClasificacion` ON `cuenta.clasificacion`.`tipo` = `cuenta.clasificacion.tipoClasificacion`.`id` \
            AND `cuenta.clasificacion.tipoClasificacion`.`nombre_corto` IN "+ condicionClasificacion.tipo + " \
            INNER JOIN agil_contabilidad_cuenta AS generico ON cuenta.cuenta_padre = generico.id\
            INNER JOIN agil_contabilidad_cuenta AS subgrupo ON generico.cuenta_padre = subgrupo.id\
            INNER JOIN agil_contabilidad_cuenta grupo ON subgrupo.cuenta_padre = grupo.id\
            INNER JOIN `gl_clase` AS `cuenta.tipoCuenta` ON `cuenta`.`tipo_cuenta` = `cuenta.tipoCuenta`.`id` \
            INNER JOIN `agil_comprobante_contabilidad` AS `comprobante` ON `agil_asiento_contabilidad`.`comprobante` = `comprobante`.`id` \
            AND `comprobante`.`eliminado` = FALSE \
            AND `comprobante`.`fecha` "+ condicionComprobante.fecha + " \
            LEFT OUTER JOIN `agil_moneda_tipo_cambio` AS `comprobante.tipoCambio` ON `comprobante`.`tipo_cambio` = `comprobante.tipoCambio`.`id`\
            INNER JOIN `agil_sucursal` AS `comprobante.sucursal` ON `comprobante`.`sucursal` = `comprobante.sucursal`.`id` \
            AND `comprobante.sucursal`.`empresa` = "+ req.params.id_empresa + " and `comprobante`.`eliminado` = false and `agil_asiento_contabilidad`.`eliminado` = false \
        GROUP BY\
            grupo.id, `cuenta.clasificacion.tipoClasificacion`.`nombre`"
        } else if (tipo == 'sg') {
            texto = "SELECT DISTINCT\
            subgrupo.cuenta_padre AS `id_cuenta_subgrupo`,\
            subgrupo.codigo AS `codigo_cuenta_subgrupo`,\
            subgrupo.cuenta_padre AS `cuenta_padre`,\
            subgrupo.nombre AS `nombre`,\
            subgrupo.id AS `id`,\
            `cuenta.clasificacion.tipoClasificacion`.`nombre` AS `tipo_cuenta_nombre`,\
            subgrupo.cuenta_activo AS `cuenta_activo`\
        FROM\
            `agil_asiento_contabilidad` AS `agil_asiento_contabilidad`\
            LEFT OUTER JOIN `agil_contabilidad_cuenta` AS `cuenta` ON `agil_asiento_contabilidad`.`cuenta` = `cuenta`.`id`\
            LEFT OUTER JOIN `agil_contabilidad_clasificacion_cuenta` AS `cuenta.clasificacion` ON `cuenta`.`clasificacion` = `cuenta.clasificacion`.`id`\
            INNER JOIN `gl_clase` AS `cuenta.clasificacion.tipoClasificacion` ON `cuenta.clasificacion`.`tipo` = `cuenta.clasificacion.tipoClasificacion`.`id` \
            AND `cuenta.clasificacion.tipoClasificacion`.`nombre_corto` IN "+ condicionClasificacion.tipo + " \
            INNER JOIN agil_contabilidad_cuenta AS generico ON cuenta.cuenta_padre = generico.id\
            INNER JOIN agil_contabilidad_cuenta AS subgrupo ON generico.cuenta_padre = subgrupo.id\
            INNER JOIN agil_contabilidad_cuenta grupo ON subgrupo.cuenta_padre = grupo.id\
            INNER JOIN `gl_clase` AS `cuenta.tipoCuenta` ON `cuenta`.`tipo_cuenta` = `cuenta.tipoCuenta`.`id` \
            AND `cuenta.tipoCuenta`.`id` = "+ condicionTipo.id + " \
            INNER JOIN `agil_comprobante_contabilidad` AS `comprobante` ON `agil_asiento_contabilidad`.`comprobante` = `comprobante`.`id` \
            AND `comprobante`.`eliminado` = FALSE \
            AND `comprobante`.`fecha` "+ condicionComprobante.fecha + " \
            LEFT OUTER JOIN `agil_moneda_tipo_cambio` AS `comprobante.tipoCambio` ON `comprobante`.`tipo_cambio` = `comprobante.tipoCambio`.`id`\
            INNER JOIN `agil_sucursal` AS `comprobante.sucursal` ON `comprobante`.`sucursal` = `comprobante.sucursal`.`id` \
            AND `comprobante.sucursal`.`empresa` = "+ req.params.id_empresa + " and `comprobante`.`eliminado` = false and `agil_asiento_contabilidad`.`eliminado` = false \
        GROUP BY\
            subgrupo.id, `cuenta.clasificacion.tipoClasificacion`.`nombre`"
        } else if (tipo == 'gen') {
            texto = "SELECT DISTINCT\
            generico.cuenta_padre AS `id_cuenta_generico`,\
            generico.codigo AS `codigo_cuenta_generico`,\
            generico.cuenta_padre AS `cuenta_padre`,\
            generico.nombre AS `nombre`,\
            generico.id AS `id`,\
            `cuenta.clasificacion.tipoClasificacion`.`nombre` AS `tipo_cuenta_nombre`,\
            generico.cuenta_activo AS `cuenta_activo`\
        FROM\
            `agil_asiento_contabilidad` AS `agil_asiento_contabilidad`\
            LEFT OUTER JOIN `agil_contabilidad_cuenta` AS `cuenta` ON `agil_asiento_contabilidad`.`cuenta` = `cuenta`.`id`\
            LEFT OUTER JOIN `agil_contabilidad_clasificacion_cuenta` AS `cuenta.clasificacion` ON `cuenta`.`clasificacion` = `cuenta.clasificacion`.`id`\
            INNER JOIN `gl_clase` AS `cuenta.clasificacion.tipoClasificacion` ON `cuenta.clasificacion`.`tipo` = `cuenta.clasificacion.tipoClasificacion`.`id` \
            AND `cuenta.clasificacion.tipoClasificacion`.`nombre_corto` IN "+ condicionClasificacion.tipo + " \
            INNER JOIN agil_contabilidad_cuenta AS generico ON cuenta.cuenta_padre = generico.id\
            INNER JOIN agil_contabilidad_cuenta AS subgrupo ON generico.cuenta_padre = subgrupo.id\
            INNER JOIN agil_contabilidad_cuenta grupo ON subgrupo.cuenta_padre = grupo.id\
            INNER JOIN `gl_clase` AS `cuenta.tipoCuenta` ON `cuenta`.`tipo_cuenta` = `cuenta.tipoCuenta`.`id` \
            INNER JOIN `gl_clase` AS `generico.tipoCuenta` ON `generico`.`tipo_cuenta` = `generico.tipoCuenta`.`id` \
            AND `cuenta.tipoCuenta`.`id` = "+ condicionTipo.id + " \
            INNER JOIN `agil_comprobante_contabilidad` AS `comprobante` ON `agil_asiento_contabilidad`.`comprobante` = `comprobante`.`id` \
            AND `comprobante`.`eliminado` = FALSE \
            AND `comprobante`.`fecha` "+ condicionComprobante.fecha + " \
            LEFT OUTER JOIN `agil_moneda_tipo_cambio` AS `comprobante.tipoCambio` ON `comprobante`.`tipo_cambio` = `comprobante.tipoCambio`.`id`\
            INNER JOIN `agil_sucursal` AS `comprobante.sucursal` ON `comprobante`.`sucursal` = `comprobante.sucursal`.`id` \
            AND `comprobante.sucursal`.`empresa` = "+ req.params.id_empresa + " and `comprobante`.`eliminado` = false and `agil_asiento_contabilidad`.`eliminado` = false \
        GROUP BY\
            generico.id, `cuenta.clasificacion.tipoClasificacion`.`nombre`"
        } else {
            texto = "SELECT DISTINCT\
            cuenta.id AS `id`,	\
            cuenta.nombre AS nombre,\
            cuenta.cuenta_padre AS `cuenta_padre`,\
            cuenta.codigo AS `codigo`,\
            generico.codigo AS `codigo_cuenta_padre_generico`,\
            sum( haber_bs ) AS `haber_bs`,\
            sum( debe_bs ) AS `debe_bs`,\
            sum( haber_sus ) AS `haber_sus`,\
            (sum( debe_bs )-sum( haber_bs )) AS `saldo`,\
            (sum( debe_sus )-sum( haber_sus )) AS `saldo_sus`,\
            sum( debe_sus ) AS `debe_sus`\
            FROM\
            `agil_asiento_contabilidad` AS `agil_asiento_contabilidad`\
            LEFT OUTER JOIN `agil_contabilidad_cuenta` AS `cuenta` ON `agil_asiento_contabilidad`.`cuenta` = `cuenta`.`id`\
            LEFT OUTER JOIN `agil_contabilidad_clasificacion_cuenta` AS `cuenta.clasificacion` ON `cuenta`.`clasificacion` = `cuenta.clasificacion`.`id`\
            INNER JOIN `gl_clase` AS `cuenta.clasificacion.tipoClasificacion` ON `cuenta.clasificacion`.`tipo` = `cuenta.clasificacion.tipoClasificacion`.`id` \
            AND `cuenta.clasificacion.tipoClasificacion`.`nombre_corto` IN "+ condicionClasificacion.tipo + " \
            INNER JOIN agil_contabilidad_cuenta AS generico ON cuenta.cuenta_padre = generico.id\
            INNER JOIN agil_contabilidad_cuenta AS subgrupo ON generico.cuenta_padre = subgrupo.id\
            INNER JOIN agil_contabilidad_cuenta grupo ON subgrupo.cuenta_padre = grupo.id\
            INNER JOIN `gl_clase` AS `cuenta.tipoCuenta` ON `cuenta`.`tipo_cuenta` = `cuenta.tipoCuenta`.`id` \
            AND `cuenta.tipoCuenta`.`id` = "+ condicionTipo.id + "\
            INNER JOIN `agil_comprobante_contabilidad` AS `comprobante` ON `agil_asiento_contabilidad`.`comprobante` = `comprobante`.`id` \
            AND `comprobante`.`eliminado` = FALSE \
            AND `comprobante`.`fecha` "+ condicionComprobante.fecha + " \
            LEFT OUTER JOIN `agil_moneda_tipo_cambio` AS `comprobante.tipoCambio` ON `comprobante`.`tipo_cambio` = `comprobante.tipoCambio`.`id`\
            INNER JOIN `agil_sucursal` AS `comprobante.sucursal` ON `comprobante`.`sucursal` = `comprobante.sucursal`.`id` \
            AND `comprobante.sucursal`.`empresa` = "+ req.params.id_empresa + " and `comprobante`.`eliminado` = false and `agil_asiento_contabilidad`.`eliminado` = false \
        GROUP BY cuenta"
        }
        return texto
    }
    
    router.route('/estados-financieros/resultados-acumulados/empresa/:id_empresa/gestion/:gestion')
        .post(ensureAuthorizedlogged, function (req, res) {
            var condicionCuenta = {}, condicionComprobante = {};
            condicionCuenta.id_empresa = parseInt(req.params.id_empresa);
                var diaInicio = req.body.fechasImpresion.inicio.split("/")[0]
                var diafin = req.body.fechasImpresion.fin.split("/")[0]
                var mesinico = parseInt(req.body.fechasImpresion.inicio.split("/")[1])
                var mesfin = parseInt(req.body.fechasImpresion.fin.split("/")[1])
                var inicio = req.params.gestion + "-" + mesinico + "-" + diaInicio + " 00:00:00"
                var fin = req.params.gestion + "-" + mesfin + "-" + diafin + " 23:59:59"
                condicionComprobante.fecha = " BETWEEN '" + inicio + "' AND '" + fin + "'";
            ContabilidadCuenta.findAll({ where:{resultado_acumulado: true, empresa:req.params.id_empresa}})
            .then(ok=>{
                if(ok.length > 0){
                    let qry = 'SELECT cuenta.codigo,cuenta.nombre,asiento.glosa,asiento.debe_bs,asiento.haber_bs,asiento.debe_sus,asiento.haber_sus FROM agil_asiento_contabilidad asiento INNER JOIN agil_contabilidad_cuenta cuenta ON cuenta.id=asiento.cuenta AND cuenta.empresa='+condicionCuenta.id_empresa+' AND cuenta.resultado_acumulado=1 INNER JOIN agil_comprobante_contabilidad comp ON comp.id=asiento.comprobante AND comp.fecha'+condicionComprobante.fecha+' WHERE asiento.eliminado=0 AND comp.eliminado=0 ORDER BY cuenta.codigo ASC,comp.fecha ASC'
                    sequelize.query(qry, {type: sequelize.QueryTypes.SELECT})
                    .then(registros =>{
                        if(registros.length > 0){
                            let qry = obtenerResultado(condicionCuenta, condicionComprobante)
                            sequelize.query(qry, {type: sequelize.QueryTypes.SELECT})
                            .then(resultado =>{
                                registros.push({
                                    codigo: '',
                                    debe_bs: resultado[0].debe,
                                    debe_sus: resultado[0].debe_sus,
                                    glosa: 'Resultado del periodo',
                                    haber_bs: resultado[0].haber,
                                    haber_sus: resultado[0].haber_sus,
                                    nombre: 'Resultado del periodo'
                                })
                                res.json({ hasError: false, message: 'Datos recuperados exitosamente', data: registros})
                            })
                            .catch(e=> {
                                res.json({hasError:true, message: 'Error al obtener el resultado de la gestion. \n'+ e})
                            })
                        }else{
                            res.json({hasError:true, message: 'No se encontraron registros en el periodo.'})
                        }
                    })
                    .catch(e=> {
                        res.json({hasError:true, message: 'Error al obtener los registros de resultados acumulados. \n'+ e})
                    })
                }else{
                    res.json({hasError:true, message: 'No existe una cuenta de Resultados Acumulados configurada.'})
                }
            })
            .catch(e=>{
                res.json({hasError:true, message: 'Error al verificar la existencia de la cuenta Resultados Acumulados. \n'+ e})
            })
        })

        function obtenerCtasBg(condicionTipo, condicionCuenta, condicionComprobante,apr) {
            var texto = "";
            if(apr){
                texto = "SELECT\
                cuenta.id,\
                cuenta.codigo,\
                cuenta.nombre,\
                cuenta.resultado_acumulado,\
                cuenta.estado_resultado,\
                cuenta.id_cuenta_depreciacion,\
                ROUND(SUM(asiento.debe_bs), 2) AS debe,\
                ROUND(SUM(asiento.haber_bs), 2) AS haber,\
                ROUND(SUM(asiento.debe_sus), 2) AS debe_sus,\
	            ROUND(SUM(asiento.haber_sus), 2) AS haber_sus,\
                cuenta.cuenta_padre AS cuentaPadre,\
                tipoCuenta.nombre AS tipo,\
                tipoSaldo.nombre_corto AS tipoSaldo,\
                clasificacionCuenta.nombre AS clasificacion,\
                clasificacionCuenta.id AS idClasificacion,\
                cuenta.cuenta_activo AS activoFijo,\
                cuenta.no_monetaria AS noMonetaria,\
                tipoMovimiento.nombre_corto AS movimiento\
                FROM agil_asiento_contabilidad AS asiento\
                INNER JOIN agil_contabilidad_cuenta AS cuenta ON cuenta.id=asiento.cuenta AND cuenta.empresa="+condicionCuenta.id_empresa+" AND asiento.eliminado=FALSE\
                INNER JOIN gl_clase AS tipoCuenta ON tipoCuenta.id=cuenta.tipo_cuenta AND tipoCuenta.id="+condicionTipo.id+"\
                INNER JOIN agil_contabilidad_clasificacion_cuenta AS clasificacionCuenta ON clasificacionCuenta.id=cuenta.clasificacion\
                INNER JOIN gl_clase AS tipoMovimiento ON tipoMovimiento.id = clasificacionCuenta.movimiento\
                INNER JOIN gl_clase AS tipoSaldo ON tipoSaldo.id = clasificacionCuenta.saldo\
                INNER JOIN agil_comprobante_contabilidad AS comprobante ON comprobante.id=asiento.comprobante AND asiento.eliminado = FALSE AND comprobante.eliminado=FALSE AND comprobante.fecha "+condicionComprobante.fecha+"\
                GROUP BY cuenta.nombre\
                ORDER BY cuenta.codigo";
            }else{
                texto ="SELECT\
                cuenta.id,\
                cuenta.codigo,\
                cuenta.nombre,\
                cuenta.cuenta_padre AS cuentaPadre,\
                cuenta.id_cuenta_depreciacion,\
                tipoCuenta.nombre AS tipo,\
                tipoSaldo.nombre_corto AS tipoSaldo,\
	            clasificacionCuenta.nombre AS clasificacion,\
                cuenta.cuenta_activo AS activoFijo,\
                cuenta.no_monetaria AS noMonetaria,\
                tipoMovimiento.nombre_corto AS movimiento\
                FROM\
                agil_contabilidad_cuenta AS cuenta\
                INNER JOIN agil_contabilidad_clasificacion_cuenta AS clasificacionCuenta ON clasificacionCuenta.id = cuenta.clasificacion\
                INNER JOIN gl_clase AS tipoCuenta ON tipoCuenta.id = cuenta.tipo_cuenta AND tipoCuenta.id = "+condicionTipo.id+"\
                INNER JOIN gl_clase AS tipoMovimiento ON tipoMovimiento.id = clasificacionCuenta.movimiento\
                INNER JOIN gl_clase AS tipoSaldo ON tipoSaldo.id = clasificacionCuenta.saldo\
                WHERE cuenta.empresa = "+condicionCuenta.id_empresa+" AND cuenta.eliminado = FALSE \
                ORDER BY cuenta.codigo"
            }            
            return texto
        }
        function obtenerResultado(condicionCuenta, condicionComprobante) {
            let qr = 'SELECT ROUND(SUM( asiento.debe_bs ), 2) AS debe, ROUND(SUM( asiento.haber_bs ), 2) AS haber, ROUND(SUM( asiento.debe_bs ) - SUM( asiento.haber_bs ), 2) AS saldo, ROUND(SUM( asiento.debe_sus ), 2) AS debe_sus, ROUND(SUM( asiento.haber_sus ), 2) AS haber_sus, ROUND(SUM( asiento.debe_sus ) - SUM( asiento.haber_sus ), 2) AS saldo_sus\
                FROM agil_asiento_contabilidad AS asiento\
                INNER JOIN agil_contabilidad_cuenta AS cuenta ON cuenta.id = asiento.cuenta \
                AND cuenta.empresa = '+ condicionCuenta.id_empresa+' AND cuenta.eliminado = FALSE\
                INNER JOIN gl_clase AS tipoCuenta ON tipoCuenta.id = cuenta.tipo_cuenta \
                AND tipoCuenta.nombre_corto = "4" \
                INNER JOIN agil_contabilidad_clasificacion_cuenta AS clasificacionCuenta ON clasificacionCuenta.id = cuenta.clasificacion\
                INNER JOIN gl_clase AS tipoMovimiento ON tipoMovimiento.id = clasificacionCuenta.movimiento\
                INNER JOIN gl_clase AS tipoSaldo ON tipoSaldo.id = clasificacionCuenta.saldo\
                INNER JOIN agil_comprobante_contabilidad AS comprobante ON comprobante.id = asiento.comprobante AND asiento.eliminado =  FALSE\
                INNER JOIN agil_sucursal AS sucursal ON comprobante.sucursal = sucursal.id\
                AND comprobante.eliminado = FALSE \
                AND comprobante.fecha '+condicionComprobante.fecha+'\
                WHERE tipoMovimiento.nombre_corto = "AER"';
            return qr;
        }
        function asignarHijos(padre, hijo) {
            for(i = 0; i <padre.length; i++){
                padre[i].hijos = {};
                var hijos = hijo.filter(cta => cta.cuentaPadre === padre[i].id);
                var debe = hijos.reduce((prev, curr) => (prev + curr.debe), 0);
                var haber = hijos.reduce((prev, curr) => (prev + curr.haber), 0);
                var debe_sus = hijos.reduce((prev, curr) => (prev + curr.debe_sus), 0);
                var haber_sus = hijos.reduce((prev, curr) => (prev + curr.haber_sus), 0);
                padre[i].hijos = hijos;
                padre[i].ctaDep != undefined ? (padre[i].debe = debe + padre[i].ctaDep.debe) : (padre[i].debe = debe);
                padre[i].ctaDep != undefined ? (padre[i].haber = haber + padre[i].ctaDep.haber) : (padre[i].haber = haber);
                padre[i].ctaDep != undefined ? (padre[i].debe_sus = debe_sus + padre[i].ctaDep.debe_sus) : (padre[i].debe_sus = debe_sus);
                padre[i].ctaDep != undefined ? (padre[i].haber_sus = haber_sus + padre[i].ctaDep.haber_sus) : (padre[i].haber_sus = haber_sus);
                if(padre[i].tipoSaldo === "DEDE") {
                    padre[i].saldo =  debe - haber;
                    padre[i].saldo_sus =  debe_sus - haber_sus;
                }
                if(padre[i].tipoSaldo === "ACHA"){
                    padre[i].saldo = haber - debe;
                    padre[i].saldo_sus = haber_sus - debe_sus;
                }
            }
            return padre;
        }
        function modificarCtas(aprops, gens) {
            aprops.forEach((apr, i, arr) => {
                if(apr.id_cuenta_depreciacion != null){
                    let x = aprops.findIndex(cuenta => cuenta ? apr.id_cuenta_depreciacion === cuenta.id : -1);
                    if(x != -1){
                        aprops[x].ctaDep = apr;
                        let c = gens.findIndex(gnr => apr.cuentaPadre === gnr.id);
                        if(c != -1) {
                            if(gens[c].hijos === undefined) gens[c].hijos = [];
                            if(gens[c].hijos != undefined) gens[c].hijos.push(apr);
                        }
                        aprops.slice(i,1);
                    }
                }
                if(i === arr.length -1){
                    gens.forEach( (ge, idx) => {
                        if(ge.id_cuenta_depreciacion != null){
                            let y = gens.findIndex(cuenta => ge.id_cuenta_depreciacion === cuenta.id);
                            if(y != -1){
                                if(ge.hijos != undefined) var debe = ge.hijos.reduce((prev, curr) => (prev += curr.debe), 0);
                                if(ge.hijos != undefined) var haber = ge.hijos.reduce((prev, curr) => (prev += curr.haber), 0);
                                if(ge.hijos != undefined) var debe_sus = ge.hijos.reduce((prev, curr) => (prev += curr.debe_sus), 0);
                                if(ge.hijos != undefined) var haber_sus = ge.hijos.reduce((prev, curr) => (prev += curr.haber_sus), 0);
                                gens[y].ctaDep = ge;
                                gens[y].ctaDep.debe = debe;
                                gens[y].ctaDep.haber = haber;
                                gens[y].ctaDep.debe_sus = debe_sus;
                                gens[y].ctaDep.haber_sus = haber_sus;
                                if(ge.tipoSaldo === "DEDE") {
                                    gens[y].ctaDep.saldo =  debe - haber;
                                    gens[y].ctaDep.saldo_sus =  debe_sus - haber_sus;
                                }
                                if(ge.tipoSaldo === "ACHA"){
                                    gens[y].ctaDep.saldo = haber - debe;
                                    gens[y].ctaDep.saldo_sus = haber_sus - debe_sus;
                                }
                                delete gens[idx];
                            }
                        }
                    }); 
                }
            });
           return {apropiacion: aprops, genericas: gens}
        }

    router.route('/contabilidad-cuentas/empresa/:id_empresa/tipo_periodo/:periodo/tipo/:id_tipo/gestion/:gestion/mes/:mes/inicio/:inicio/fin/:fin/gestion_fin/:gestion_fin')
        .post(ensureAuthorizedlogged,function (req, res) {
            var condicionCuenta = {}, condicionComprobante = {};
            condicionCuenta.id_empresa = parseInt(req.params.id_empresa);
            var fecha_inicio;
            var fecha_fin;
            var fecha_inicio1;
            var fecha_fin1;
            if (req.params.periodo == 'GESTIÓN') {
                var diaInicio = req.body.fechasImpresion.inicio.split("/")[0]
                var diafin = req.body.fechasImpresion.fin.split("/")[0]
                var mesinico = parseInt(req.body.fechasImpresion.inicio.split("/")[1])
                var mesfin = parseInt(req.body.fechasImpresion.fin.split("/")[1])
                if (mesinico == 1) {
                    fecha_inicio = req.params.gestion + "-" + mesinico + "-" + diaInicio + " 00:00:00"
                    fecha_fin = req.params.gestion + "-" + mesfin + "-" + diafin + " 23:59:59"
                } else {
                    var anio = parseInt(req.params.gestion) + 1
                    fecha_inicio = req.params.gestion + "-" + mesinico + "-" + diaInicio + '00:00:00'
                    fecha_fin = anio + "-" + mesfin + "-" + diafin + '23:59:00'
                }
            }
            if (req.params.periodo == 'MES') {
                var dInicio = req.body.fechasImpresion.inicio.split("/")[0];
                var mInicio = parseInt(req.body.fechasImpresion.inicio.split("/")[1]);
                
                var fin = new Date(req.params.gestion, parseInt(req.params.mes) + 1, 0)
                var mes = fin.getMonth() + 1
                var diaFin = fin.getDate()
                mes = mes < 10 ? "0" + mes : mes
                diaFin = diaFin < 10 ? "0" + diaFin : diaFin

                fecha_inicio = "" + req.params.gestion + "-" + mInicio + "-" + dInicio + " 00:00:00"
                fecha_fin = "" + req.params.gestion + "-" + mes + "-" + diaFin + " 23:59:59"
            } 
            if (req.params.periodo == 'FECHAS') {
                //TEMPORAL
                fecha_inicio = req.body.fechaFijada.split('/').reverse().join('-') + " 00:00:00"
                fecha_fin = req.body.fecha_fin.split('/').reverse().join('-') + " 23:59:59"
                /*  ORGINAL
                let diaInicio = req.body.fechasImpresion.inicio.split("/")[0]
                let mesInicio = req.body.fechasImpresion.inicio.split("/")[1]
                fecha_inicio = req.params.gestion+"-"+ mesInicio+"-"+ diaInicio+" 00:00:00";
                fecha_final = req.params.fin.split("/");
                fecha_fin = fecha_final[2]+"-"+fecha_final[1]+"-"+fecha_final[0]+ " 23:59:59"; */
            } 
            if(req.params.periodo == 'COMPARATIVO') {
                var diaInicio = req.body.fechasImpresion.inicio.split("/")[0]
                var diafin = req.body.fechasImpresion.fin.split("/")[0]
                var mesinico = parseInt(req.body.fechasImpresion.inicio.split("/")[1])
                var mesfin = parseInt(req.body.fechasImpresion.fin.split("/")[1])
                if (mesinico == 1) {
                    fecha_inicio = req.params.gestion + "-" + mesinico + "-" + diaInicio + " 00:00:00"
                    fecha_fin = req.params.gestion + "-" + mesfin + "-" + diafin + " 23:59:59"
                    fecha_inicio1 = req.params.gestion_fin + "-" + mesinico + "-" + diaInicio + " 00:00:00"
                    fecha_fin1 = req.params.gestion_fin + "-" + mesfin + "-" + diafin + " 23:59:59"
                } else {
                    var anio = parseInt(req.params.gestion) + 1
                    fecha_inicio = req.params.gestion + "-" + mesinico + "-" + diaInicio + '00:00:00'
                    fecha_fin = anio + "-" + mesfin + "-" + diafin + '23:59:00'
                    fecha_inicio1 = req.params.gestion_fin + "-" + mesinico + "-" + diaInicio + " 00:00:00"
                    fecha_fin1 = req.params.gestion_fin + "-" + mesfin + "-" + diafin + " 23:59:59"
                }
            }
            var condicionComprobante = { eliminado: false }
            condicionCuenta.eliminado = false
            var condicionTipo = {}
            var grupo = {}
            var subgrupo = {}
            var genericas = {}
            var apropiacion = {}
            ContabilidadCuenta.findAll({ where:{estado_resultado: true, empresa:req.params.id_empresa}})
            .then(cuentaResultado=>{
                if(cuentaResultado.length === 1){
                    if (req.params.periodo != 'COMPARATIVO') condicionComprobante.fecha = "BETWEEN '" + fecha_inicio + "' AND '" + fecha_fin + "'"
                    qry = obtenerResultado(condicionCuenta, condicionComprobante)
                        sequelize.query(qry, {type: sequelize.QueryTypes.SELECT})
                        .then(resultado =>{
                             Tipo.find({
                            where: {
                                nombre_corto: 'TCC',
                                id_empresa: condicionCuenta.id_empresa
                            },
                            include: [{ model: Clase, as: 'clases' }]
                            }).then(function (tipo) {
                                grupo = tipo.clases.find(function (clase) {
                                    return clase.nombre_corto == 1 && clase.eliminado === false;
                                })
                                subgrupo = tipo.clases.find(function (clase) {
                                    return clase.nombre_corto == 2 && clase.eliminado === false;
                                })
                                genericas = tipo.clases.find(function (clase) {
                                    return clase.nombre_corto == 3 && clase.eliminado === false;
                                })
                                apropiacion = tipo.clases.find(function (clase) {
                                    return clase.nombre_corto == 4 && clase.eliminado === false;
                                })
                                if (req.params.periodo != 'COMPARATIVO') {
                                    condicionComprobante.fecha = "BETWEEN '" + fecha_inicio + "' AND '" + fecha_fin + "'"
                                    condicionTipo.id = apropiacion.id
                                    qry = obtenerCtasBg(condicionTipo, condicionCuenta, condicionComprobante, true)
                                    sequelize.query(qry, {
                                        type: sequelize.QueryTypes.SELECT
                                    })
                                    .then( apropiacion => {
                                        var adv =""
                                        var pr = apropiacion.filter((c, ix, arr) =>{
                                            c.index= ix
                                            return c.estado_resultado == 1
                                        });
                                        if(pr.length == 0){
                                             apropiacion.push({
                                            id:cuentaResultado[0].dataValues.id,
                                            codigo: cuentaResultado[0].dataValues.codigo,
                                            nombre:cuentaResultado[0].dataValues.nombre,
                                            resultado_acumulado: cuentaResultado[0].dataValues.resultado_acumulado,
                                            estado_resultado: cuentaResultado[0].dataValues.estado_resultado,
                                            debe: resultado[0].debe,
                                            haber: resultado[0].haber,
                                            debe_sus: resultado[0].debe_sus,
                                            haber_sus: resultado[0].haber_sus,
                                            cuentaPadre:cuentaResultado[0].dataValues.id_cuenta_padre,
                                            tipo:"APROPIACION",
                                            tipoSaldo: "ACHA",
                                            clasificacion:"PATRIMONIO",
                                            idClasificacion: cuentaResultado[0].dataValues.id_clasificacion,
                                            id_cuenta_depreciacion: cuentaResultado[0].dataValues.id_cuenta_depreciacion,
                                            activoFijo: cuentaResultado[0].dataValues.cuenta_activo,
                                            noMonetaria:cuentaResultado[0].dataValues.no_monetaria,
                                            movimiento: "ABG"
                                           })
                                        }else{
                                            if(pr[0].haber -pr[0].debe != 0) adv = "Existen movimientos de la cuenta"+pr[0].nombre+"que podrian generar variación"
                                            apropiacion[pr[0].index].debe+=resultado[0].debe;
                                            apropiacion[pr[0].index].debe_sus+=resultado[0].debe_sus;
                                            apropiacion[pr[0].index].haber+=resultado[0].haber;
                                            apropiacion[pr[0].index].haber_sus+=resultado[0].haber_sus;
                                        }
                                        condicionTipo.id = genericas.id
                                        qry = obtenerCtasBg(condicionTipo, condicionCuenta, condicionComprobante, false)
                                        sequelize.query(qry, {
                                            type: sequelize.QueryTypes.SELECT
                                        })
                                        .then( genericas => {
                                            /* var aprop = modificarCtas(apropiacion).filter(apro => apro != undefined); */
                                            var data = modificarCtas(apropiacion, genericas, apropiacion);
                                            let dataApr = data.apropiacion.filter(apro => apro != undefined);
                                            let dataGen = data.genericas.filter(gens => gens != undefined);
                                            var ctsGenericas = asignarHijos(dataGen, dataApr);
                                            condicionTipo.id = subgrupo.id
                                            qry = obtenerCtasBg(condicionTipo, condicionCuenta, condicionComprobante, false)
                                            sequelize.query(qry, {
                                                type: sequelize.QueryTypes.SELECT
                                            })
                                            .then( subgrupo => {
                                                var ctsSubrgrupo = asignarHijos(subgrupo, ctsGenericas);
                                                condicionTipo.id = grupo.id
                                                qry = obtenerCtasBg(condicionTipo, condicionCuenta, condicionComprobante, false)
                                                sequelize.query(qry, {
                                                    type: sequelize.QueryTypes.SELECT
                                                })
                                                .then( grupo => {
                                                    var ctsGrupo = asignarHijos(grupo, ctsSubrgrupo);
                                                    res.json({cuentas: ctsGrupo, resultado: resultado[0], cuentaResultado: cuentaResultado[0]})
                                                })
                                            })
                                        })
                                    })
                                } else {//falta modificar
                                    condicionTipo.id = apropiacion.id
                                    condicionCuenta.cuenta_activo = false
                                    condicionComprobante.fecha = "BETWEEN '" + inicio + "' AND '" + fin + "'"
                                    condicionClasificacion.tipo = "( '1' )"
                                    datosCuenta = devolverDatosConsultaBalanceGeneral(req, condicionClasificacion, apropiacion, condicionCuenta, condicionComprobante, 'a')
                                    sequelize.query(datosCuenta, {
                                        type: sequelize.QueryTypes.SELECT
                                    }).then(function (cuentasActivos) {
                                        condicionCuenta.cuenta_activo = true
                                        datosCuenta = devolverDatosConsultaBalanceGeneral(req, condicionClasificacion, apropiacion, condicionCuenta, condicionComprobante, 'a')
                                        sequelize.query(datosCuenta, {
                                            type: sequelize.QueryTypes.SELECT
                                        }).then(function (cuentasGrupoFijo) {
                                            condicionCuenta.cuenta_activo = false
                                            condicionClasificacion.tipo = "( '2','3' )"
                                            datosCuenta = devolverDatosConsultaBalanceGeneral(req, condicionClasificacion, apropiacion, condicionCuenta, condicionComprobante, 'a')
                                            sequelize.query(datosCuenta, {
                                                type: sequelize.QueryTypes.SELECT
                                            }).then(function (cuentasPasivoPatrimonio) {
                                                condicionCuenta.cuenta_activo = false
                                                condicionClasificacion.tipo = "( '1','2','3' )"
                                                datosCuenta = devolverDatosConsultaBalanceGeneral(req, condicionClasificacion, apropiacion, condicionCuenta, condicionComprobante, 'gen')
                                                sequelize.query(datosCuenta, {
                                                    type: sequelize.QueryTypes.SELECT
                                                }).then(function (cuentaGenerica) {
                                                    datosCuenta = devolverDatosConsultaBalanceGeneral(req, condicionClasificacion, apropiacion, condicionCuenta, condicionComprobante, 'sg')
                                                    sequelize.query(datosCuenta, {
                                                        type: sequelize.QueryTypes.SELECT
                                                    }).then(function (cuentaSubGrupo) {
                                                        datosCuenta = devolverDatosConsultaBalanceGeneral(req, condicionClasificacion, apropiacion, condicionCuenta, condicionComprobante, 'g')
                                                        sequelize.query(datosCuenta, {
                                                            type: sequelize.QueryTypes.SELECT
                                                        }).then(function (cuentaGrupo) {
                                                            condicionCuenta.cuenta_activo = false
                                                            condicionClasificacion.tipo = "( '4','5','6' )"
                                                            datosCuenta = devolverDatosConsultaBalanceGeneral(req, condicionClasificacion, apropiacion, condicionCuenta, condicionComprobante, 'gen')
                                                            sequelize.query(datosCuenta, {
                                                                type: sequelize.QueryTypes.SELECT
                                                            }).then(function (cuentaGenericaEERR) {
                                                                datosCuenta = devolverDatosConsultaBalanceGeneral(req, condicionClasificacion, apropiacion, condicionCuenta, condicionComprobante, 'sg')
                                                                sequelize.query(datosCuenta, {
                                                                    type: sequelize.QueryTypes.SELECT
                                                                }).then(function (cuentaSubGrupoEERR) {
                                                                    datosCuenta = devolverDatosConsultaBalanceGeneral(req, condicionClasificacion, apropiacion, condicionCuenta, condicionComprobante, 'g')
                                                                    sequelize.query(datosCuenta, {
                                                                        type: sequelize.QueryTypes.SELECT
                                                                    }).then(function (cuentaGrupoEERR) {
                                                                        condicionClasificacion.tipo = "( '4','5','6' )"
                                                                        datosCuenta = devolverDatosConsultaBalanceGeneral(req, condicionClasificacion, apropiacion, condicionCuenta, condicionComprobante, 'a')
                                                                        sequelize.query(datosCuenta, {
                                                                            type: sequelize.QueryTypes.SELECT
                                                                        }).then(function (cuentasIngresoGastoEERR) {
                                                                            condicionTipo.id = apropiacion.id
                                                                            condicionCuenta.cuenta_activo = false
                                                                            condicionComprobante.fecha = "BETWEEN '" + inicio2 + "' AND '" + fin2 + "'"
                                                                            condicionClasificacion.tipo = "( '1' )"
                                                                            datosCuenta = devolverDatosConsultaBalanceGeneral(req, condicionClasificacion, apropiacion, condicionCuenta, condicionComprobante, 'a')
                                                                            sequelize.query(datosCuenta, {
                                                                                type: sequelize.QueryTypes.SELECT
                                                                            }).then(function (cuentasActivosDos) {
                                                                                condicionCuenta.cuenta_activo = true
                                                                                datosCuenta = devolverDatosConsultaBalanceGeneral(req, condicionClasificacion, apropiacion, condicionCuenta, condicionComprobante, 'a')
                                                                                sequelize.query(datosCuenta, {
                                                                                    type: sequelize.QueryTypes.SELECT
                                                                                }).then(function (cuentasGrupoFijoDos) {
                                                                                    condicionCuenta.cuenta_activo = false
                                                                                    condicionClasificacion.tipo = "( '2','3' )"
                                                                                    datosCuenta = devolverDatosConsultaBalanceGeneral(req, condicionClasificacion, apropiacion, condicionCuenta, condicionComprobante, 'a')
                                                                                    sequelize.query(datosCuenta, {
                                                                                        type: sequelize.QueryTypes.SELECT
                                                                                    }).then(function (cuentasPasivoPatrimonioDos) {
                                                                                        condicionCuenta.cuenta_activo = false
                                                                                        condicionClasificacion.tipo = "( '1','2','3' )"
                                                                                        datosCuenta = devolverDatosConsultaBalanceGeneral(req, condicionClasificacion, apropiacion, condicionCuenta, condicionComprobante, 'gen')
                                                                                        sequelize.query(datosCuenta, {
                                                                                            type: sequelize.QueryTypes.SELECT
                                                                                        }).then(function (cuentaGenericaDos) {
                                                                                            datosCuenta = devolverDatosConsultaBalanceGeneral(req, condicionClasificacion, apropiacion, condicionCuenta, condicionComprobante, 'sg')
                                                                                            sequelize.query(datosCuenta, {
                                                                                                type: sequelize.QueryTypes.SELECT
                                                                                            }).then(function (cuentaSubGrupoDos) {
                                                                                                datosCuenta = devolverDatosConsultaBalanceGeneral(req, condicionClasificacion, apropiacion, condicionCuenta, condicionComprobante, 'g')
                                                                                                sequelize.query(datosCuenta, {
                                                                                                    type: sequelize.QueryTypes.SELECT
                                                                                                }).then(function (cuentaGrupoDos) {
                                                                                                    condicionCuenta.cuenta_activo = false
                                                                                                    condicionClasificacion.tipo = "( '4','5','6' )"
                                                                                                    datosCuenta = devolverDatosConsultaBalanceGeneral(req, condicionClasificacion, apropiacion, condicionCuenta, condicionComprobante, 'gen')
                                                                                                    sequelize.query(datosCuenta, {
                                                                                                        type: sequelize.QueryTypes.SELECT
                                                                                                    }).then(function (cuentaGenericaEERRDos) {
                                                                                                        datosCuenta = devolverDatosConsultaBalanceGeneral(req, condicionClasificacion, apropiacion, condicionCuenta, condicionComprobante, 'sg')
                                                                                                        sequelize.query(datosCuenta, {
                                                                                                            type: sequelize.QueryTypes.SELECT
                                                                                                        }).then(function (cuentaSubGrupoEERRDos) {
                                                                                                            datosCuenta = devolverDatosConsultaBalanceGeneral(req, condicionClasificacion, apropiacion, condicionCuenta, condicionComprobante, 'g')
                                                                                                            sequelize.query(datosCuenta, {
                                                                                                                type: sequelize.QueryTypes.SELECT
                                                                                                            }).then(function (cuentaGrupoEERRDos) {
                                                                                                                condicionClasificacion.tipo = "( '4','5','6' )"
                                                                                                                datosCuenta = devolverDatosConsultaBalanceGeneral(req, condicionClasificacion, apropiacion, condicionCuenta, condicionComprobante, 'a')
                                                                                                                sequelize.query(datosCuenta, {
                                                                                                                    type: sequelize.QueryTypes.SELECT
                                                                                                                }).then(function (cuentasIngresoGastoEERRDos) {
                                                                                                                    res.json({
                                                                                                                        primero: {
                                                                                                                            cuentasFijos: cuentasGrupoFijo, cuentasActivos: cuentasActivos, cuentasPasivosPatrimonios: cuentasPasivoPatrimonio,
                                                                                                                            cuentasSubGrupo: cuentaSubGrupo,
                                                                                                                            cuentasGrupo: cuentaGrupo,
                                                                                                                            cuentasGenerica: cuentaGenerica,
                                                                                                                            cuentasGenericaEERR: cuentaGenericaEERR,
                                                                                                                            cuentasSubGrupoEERR: cuentaSubGrupoEERR,
                                                                                                                            cuentasGrupoEERR: cuentaGrupoEERR,
                                                                                                                            cuentasIngresoGastoEERR: cuentasIngresoGastoEERR,
                                                                                                                        }, segundo: {
                                                                                                                            cuentasFijosDos: cuentasGrupoFijoDos,
                                                                                                                            cuentasActivosDos: cuentasActivosDos,
                                                                                                                            cuentasPasivosPatrimoniosDos: cuentasPasivoPatrimonioDos,
                                                                                                                            cuentasSubGrupoDos: cuentaSubGrupoDos,
                                                                                                                            cuentasGrupoDos: cuentaGrupoDos,
                                                                                                                            cuentasGenericaDos: cuentaGenericaDos,
                                                                                                                            cuentasGenericaEERRDos: cuentaGenericaEERRDos,
                                                                                                                            cuentasSubGrupoEERRDos: cuentaSubGrupoEERRDos,
                                                                                                                            cuentasGrupoEERRDos: cuentaGrupoEERRDos,
                                                                                                                            cuentasIngresoGastoEERRDos: cuentasIngresoGastoEERRDos,
                                                                                                                        }
                                                                                                                    })
                                                                                                                });
                                                                                                            });
                                                                                                        });
                                                                                                    });
                                                                                                });
                                                                                            });
                                                                                        });
                                                                                    });
                                                                                });
                                                                            });
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                }
                            })
                    })
                }else{
                   if(cuentaResultado.length == 0 ) res.json({hasError:true, message: 'No existe una cuenta configurada como Resultado de la Gestión.'})
                   if(cuentaResultado.length > 1 ) res.json({hasError:true, message: 'Existe mas de una cuenta configurada como Resultado de la Gestión.'})
                }
            })
            .catch(e=>{
                res.json({hasError:true, message: 'Error al verificar si existe cuenta de Resultado de la Gestión. \n'+ e})
            })
                

        })

    router.route('/comprobante-contabilidad/empresa/:empresa/inicio/:inicio/fin/:fin')
        .get(ensureAuthorizedlogged, function (req, res) {
            //var inicio = new Date(req.params.inicio); inicio.setHours(0, 0, 0, 0, 0);
            //var fin = new Date(req.params.fin); fin.setHours(23, 59, 59, 0, 0);

            var inicio = new Date(req.params.inicio);//.toISOString().split('T')[0].reverse().join('-')+" T00.00.00.000Z"; 
            var fin = new Date(req.params.fin);
            fin.setHours(23)
            fin.setMinutes(59)

            var queryFecha = { fecha: { $between: [inicio, fin] } }
            var condicionSucursal = { id_empresa: req.params.empresa };
            ComprobanteContabilidad.findAll({
                // offset: (req.params.items_pagina * (req.params.pagina - 1)), limit: req.params.items_pagina,
                where: queryFecha,
                include: [
                    { model: AsientoContabilidad, as: 'asientosContables', where: { eliminado: false }, include: [{ model: ContabilidadCuenta, as: 'cuenta' }] },
                    { model: Sucursal, as: 'sucursal', where: condicionSucursal, include: [{ model: Empresa, as: 'empresa' }] },
                    { model: MonedaTipoCambio, as: 'tipoCambio' }
                ]

            }).then(function (comprobantes) {
                res.json({ comprobantes });
            });
        })

        router.route('/estado-resultados/comercial/empresa/:id_empresa')
        .post(ensureAuthorizedlogged, function (req, res){
            var condicionCuenta = {}, condicionComprobante = {};
            condicionCuenta.id_empresa = parseInt(req.params.id_empresa);
            
            if (req.body.tipoPeriodo.nombre == 'GESTIÓN') {
                var diaInicio = req.body.fechasImpresion.inicio.split("/")[0]
                var diafin = req.body.fechasImpresion.fin.split("/")[0]
                var mesinico = parseInt(req.body.fechasImpresion.inicio.split("/")[1])
                var mesfin = parseInt(req.body.fechasImpresion.fin.split("/")[1])
                var inicio = req.body.gestion.nombre + "-" + mesinico + "-" + diaInicio + " 00:00:00"
                var fin = req.body.gestion.nombre + "-" + mesfin + "-" + diafin + " 23:59:59"
            } else if (req.body.tipoPeriodo.nombre == 'MES') {
                let mes = parseInt(req.body.mes.id)+1;
                var dias = new Date(req.body.gestion.nombre, mes, 0).getDate();
                inicio = req.body.gestion.nombre + "-" + mes + "-01 00:00:00"
                fin = req.body.gestion.nombre + "-" + mes+ "-" + dias + " 23:59:59"

            } else if (req.body.tipoPeriodo.nombre == 'FECHAS') {
                var inicio = req.body.fecha_inicio.split("/").reverse().join("-") + " 00:00:00";
                var fin = req.body.fecha_fin.split("/").reverse().join("-") + " 23:59:59"
            } 
           // cuentas = devolverDatosConsultaBalanceGeneral(req, condicionClasificacion, apropiacion, condicionCuenta, condicionComprobante, 'sg')
            if (req.body.tipoPeriodo.nombre == 'COMPARATIVO'){
                res.json({hasError: true, message:'Funcionalidad por desarrollar'})
            }else{
                let q = "SELECT cuenta.id AS id_apropiacion, cuenta.nombre AS nombre_apropiacion, cuenta.cuenta_padre AS padre_apropiacion, generica.id AS id_generica, generica.nombre AS nombre_generica, generica.cuenta_padre AS padre_generica, clas_gen.nombre AS tipo_generica, subgrupo.id AS id_subgrupo, subgrupo.nombre AS nombre_subgrupo, clas_sub.nombre AS tipo_subgrupo, subgrupo.cuenta_padre AS  padre_subgrupo, grupo.id AS id_grupo, grupo.nombre AS nombre_grupo, 	clas_gru.nombre AS tipo_grupo, grupo.cuenta_padre AS grupo_padre, cuenta.codigo, generica.codigo AS codigo_generica, subgrupo.codigo AS codigo_subgrupo, grupo.codigo AS codigo_grupo,"
                q += " cuenta.nombre, cuenta.resultado_acumulado, cuenta.id_cuenta_depreciacion, ROUND(SUM( asiento.debe_bs ), 2) AS debe, ROUND(SUM( asiento.haber_bs ), 2) AS haber,"
                if(req.body.bimonetario){
                    q += " ROUND(SUM( asiento.debe_sus ), 2) AS debe_sus, ROUND(SUM( asiento.haber_sus ), 2) AS haber_sus,"
                }
                q += " cuenta.cuenta_padre AS cuentaPadre,tipoCuenta.nombre AS tipo,tipoSaldo.nombre_corto AS tipoSaldo,clasificacionCuenta.nombre AS clasificacion,clasificacionCuenta.id AS idClasificacion,cuenta.cuenta_activo AS activoFijo,cuenta.no_monetaria AS noMonetaria,tipoMovimiento.nombre_corto AS movimiento"
                if(req.body.cencosSeleccionados.length>0){
                    q += ", cenco.id AS idCenco,cenco.nombre AS centro_costo "
                }
                q += " FROM agil_asiento_contabilidad asiento "
                if(req.body.cencosSeleccionados.length>0){
                    q += " INNER JOIN agil_asiento_contabilidad_centro_costo acenco ON acenco.asiento_contabilidad=asiento.id INNER JOIN gl_clase cenco ON cenco.id=acenco.centro_costo AND cenco.id IN ("+ req.body.cencosSeleccionados+")"
                }
                q += " INNER JOIN agil_contabilidad_cuenta AS cuenta ON cuenta.id=asiento.cuenta INNER JOIN gl_clase AS tipoCuenta ON tipoCuenta.id=cuenta.tipo_cuenta INNER JOIN agil_contabilidad_clasificacion_cuenta AS clasificacionCuenta ON clasificacionCuenta.id=cuenta.clasificacion INNER JOIN gl_clase AS tipoMovimiento ON tipoMovimiento.id=clasificacionCuenta.movimiento INNER JOIN gl_clase AS tipoSaldo ON tipoSaldo.id=clasificacionCuenta.saldo INNER JOIN agil_comprobante_contabilidad AS comprobante ON comprobante.id=asiento.comprobante INNER JOIN agil_contabilidad_cuenta generica ON generica.id=cuenta.cuenta_padre INNER JOIN gl_clase clas_gen ON clas_gen.id=generica.tipo_cuenta INNER JOIN agil_contabilidad_cuenta subgrupo ON subgrupo.id=generica.cuenta_padre INNER JOIN gl_clase clas_sub ON clas_sub.id=subgrupo.tipo_cuenta INNER JOIN agil_contabilidad_cuenta grupo ON grupo.id=subgrupo.cuenta_padre INNER JOIN gl_clase clas_gru ON clas_gru.id=grupo.tipo_cuenta WHERE cuenta.empresa="+req.params.id_empresa+" AND cuenta.eliminado=FALSE AND asiento.eliminado=FALSE AND comprobante.eliminado=FALSE AND comprobante.fecha BETWEEN '"+inicio+"' AND '"+fin+"' AND tipoMovimiento.nombre_corto='AER' GROUP BY cuenta.id ORDER BY cuenta.codigo"
                sequelize.query(q, {type: sequelize.QueryTypes.SELECT
                })
                .then(cuentas=>{
                    if(cuentas.length > 0){
                        let ctas = organizarCuentasER(cuentas, req.body.bimonetario)
                        ctas.length > 1 ? res.json({ hasError: false, message: 'Datos recuperados exitosamente', data: ctas}):
                        res.json({ hasError: false, message: 'Datos recuperados exitosamente', data: ctas});

                    }else{
                        res.json({ hasError: true, message: 'No se encontraron datos en el periodo seleccionado'})
                    }
                })
                .catch(e=> {
                    res.json({hasError:true, message: 'Error al obtener las cuentas de la base de datos. \n'+ e})
                })
            }
        })
        // cencos para el filtro del ER
        router.route('/cencos/empresa/:id_empresa')
        .get(ensureAuthorizedlogged, function (req, res) {
            Tipo.findAll({
                where:{
                    nombre_corto: "CENCOS",
                    empresa: req.params.id_empresa
                },
                include: [{ model: Clase, as: 'clases' }]
            })
            .then(function (datos) {
                res.json(datos)
            })
            .catch(e=>{
                res.json(e)
            })
        })
        function organizarCuentasER(cuentas, bimonetario){
            if(cuentas.length>0){
                var detalle = []
                var grupos = []
                for (let i = 0; i < cuentas.length; i++) {
                    if(!grupos.includes(cuentas[i].id_grupo)) grupos.push(cuentas[i].id_grupo)
                    
                }
                for (let j = 0; j < grupos.length; j++) {
                    var grupo={}
                    var g = cuentas.find(e=>e.id_grupo===grupos[j])
                    grupo.debe = cuentas.reduce((ac, val,i)=>{if(grupos[j]===val.id_grupo){ ac+=val.debe } return ac },0)
                    grupo.haber = cuentas.reduce((ac, val,i)=>{if(grupos[j]===val.id_grupo){ ac+=val.haber } return ac },0)
                    if(bimonetario) {
                       grupo.debe_sus = cuentas.reduce((ac, val,i)=>{if(grupos[j]===val.id_grupo){ ac+=val.debe_sus } return ac },0)
                       grupo.haber_sus = cuentas.reduce((ac, val,i)=>{if(grupos[j]===val.id_grupo){ ac+=val.haber_sus } return ac },0)
                       g.tipoSaldo === "ACHA" ? grupo.saldoSus = grupo.haber_sus - grupo.debe_sus : grupo.saldoSus = grupo.debe_sus - grupo.haber_sus;
                    }
                    grupo.id=grupos[j]
                    grupo.codigo=g.codigo_grupo
                    grupo.nombre=g.nombre_grupo
                    grupo.tipo_saldo=g.tipoSaldo
                    grupo.tipo=g.tipo_grupo
                    grupo.clasificacion = g.clasificacion
                    g.tipoSaldo === "ACHA" ? grupo.saldoBs = grupo.haber - grupo.debe : grupo.saldoBs = grupo.debe - grupo.haber;
                    //recuperando subgrupos
                    var subgrupos = []
                    for (let i = 0; i < cuentas.length; i++) {
                        if(!subgrupos.includes(cuentas[i].id_subgrupo) && grupos[j]==cuentas[i].padre_subgrupo) subgrupos.push(cuentas[i].id_subgrupo)                        
                    }
                    grupo.subgrupos=[]
                    for (let k = 0; k < subgrupos.length; k++) {
                          var subgrupo={}     
                          var sb = cuentas.find(s=>s.id_subgrupo === subgrupos[k])
                          subgrupo.debe = cuentas.reduce((ac, val,i)=>{if(subgrupos[k]===val.id_subgrupo){ ac+=val.debe } return ac },0)               
                          subgrupo.haber = cuentas.reduce((ac, val,i)=>{if(subgrupos[k]===val.id_subgrupo){ ac+=val.haber } return ac },0) 
                          if(bimonetario) {
                            subgrupo.debe_sus = cuentas.reduce((ac, val,i)=>{if(subgrupos[k]===val.id_subgrupo){ ac+=val.debe_sus } return ac },0)
                            subgrupo.haber_sus = cuentas.reduce((ac, val,i)=>{if(subgrupos[k]===val.id_subgrupo){ ac+=val.haber_sus } return ac },0)
                            sb.tipoSaldo === "ACHA" ? subgrupo.saldoSus = subgrupo.haber_sus - subgrupo.debe_sus : subgrupo.saldoSus = subgrupo.debe_sus - subgrupo.haber_sus;
                         }
                         subgrupo.id=subgrupos[k]
                         subgrupo.codigo = sb.codigo_subgrupo
                         subgrupo.nombre = sb.nombre_subgrupo
                         subgrupo.tipo_saldo = sb.tipoSaldo
                         subgrupo.tipo=sb.tipo_subgrupo
                         subgrupo.clasificacion = sb.clasificacion
                         sb.tipoSaldo === "ACHA" ? subgrupo.saldoBs = subgrupo.haber - subgrupo.debe : subgrupo.saldoBs = subgrupo.debe - subgrupo.haber;

                         //recuperando genericas
                        var genericas = []
                        for (let l = 0; l < cuentas.length; l++) {
                            if(!genericas.includes(cuentas[l].id_generica) && subgrupos[k]==cuentas[l].padre_generica) genericas.push(cuentas[l].id_generica)                        
                        }
                        subgrupo.genericas=[]
                        for (let m = 0; m < genericas.length; m++) {
                            var generica={}
                            let gen = cuentas.find(s=>s.id_generica === genericas[m])
                            generica.debe = cuentas.reduce((ac, val,i)=>{if(genericas[m]===val.id_generica){ ac+=val.debe } return ac },0)               
                            generica.haber = cuentas.reduce((ac, val,i)=>{if(genericas[m]===val.id_generica){ ac+=val.haber } return ac },0) 
                            if(bimonetario) {
                                generica.debe_sus = cuentas.reduce((ac, val,i)=>{if(genericas[m]===val.id_generica){ ac+=val.debe_sus } return ac },0)
                                generica.haber_sus = cuentas.reduce((ac, val,i)=>{if(genericas[m]===val.id_generica){ ac+=val.haber_sus } return ac },0)
                                gen.tipoSaldo === "ACHA" ? generica.saldoSus = generica.haber_sus - generica.debe_sus : generica.saldoSus = generica.debe_sus - generica.haber_sus;

                            }
                            generica.id=genericas[m]
                            generica.codigo = gen.codigo_generica
                            generica.nombre = gen.nombre_generica
                            generica.tipo_saldo = gen.tipoSaldo 
                            generica.tipo=gen.tipo_generica
                            generica.clasificacion = gen.clasificacion
                            gen.tipoSaldo === "ACHA" ? generica.saldoBs = generica.haber - generica.debe : generica.saldoBs = generica.debe - generica.haber;
                            // recuperando apropiaciones
                            generica.apropiaciones=cuentas.filter(cuenta=>cuenta.padre_apropiacion === genericas[m])
                            subgrupo.genericas.push(generica);
                        }
                        grupo.subgrupos.push(subgrupo);
                    }
                    detalle.push(grupo);
                }
            }
            return detalle
        }
        router.route('/estado-patrimonial/empresa/:id_empresa')
        .post(ensureAuthorizedlogged, function (req, res){
            var condicionCuenta = {}, condicionComprobante = {};
            condicionCuenta.id_empresa = parseInt(req.params.id_empresa);
            var diaInicio = req.body.fechasImpresion.inicio.split("/")[0]
            var diafin = req.body.fechasImpresion.fin.split("/")[0]
            var mesinico = parseInt(req.body.fechasImpresion.inicio.split("/")[1])
            var mesfin = parseInt(req.body.fechasImpresion.fin.split("/")[1])
            var inicio = req.body.gestion.nombre + "-" + mesinico + "-" + diaInicio + " 00:00:00"
            var fin = req.body.gestion.nombre + "-" + mesfin + "-" + diafin + " 23:59:59"
            condicionComprobante.fecha = "BETWEEN '" + inicio + "' AND '" + fin + "'";
            ContabilidadCuenta.findAll({ where:{patrimonial: true, empresa:req.params.id_empresa}})
            .then(ok=>{
                if(ok.length > 0){
                    let q = 'SELECT cuenta.codigo,cuenta.nombre,asiento.glosa,asiento.debe_bs,asiento.haber_bs FROM agil_asiento_contabilidad asiento INNER JOIN agil_contabilidad_cuenta cuenta ON cuenta.id=asiento.cuenta AND cuenta.empresa='+req.params.id_empresa+' AND cuenta.patrimonial=1 INNER JOIN agil_comprobante_contabilidad comp ON comp.id=asiento.comprobante AND comp.fecha BETWEEN "'+inicio+'" AND "'+fin+'" WHERE asiento.eliminado=0 ORDER BY cuenta.codigo ASC,comp.fecha ASC'
                    sequelize.query(q, {type: sequelize.QueryTypes.SELECT
                    })
                    .then(cuentas=>{
                        if(cuentas.length > 0){
                            let qry = obtenerResultado(condicionCuenta, condicionComprobante)
                            sequelize.query(qry, {type: sequelize.QueryTypes.SELECT})
                            .then(resultado =>{
                                var ctas = cuentas.reduce(function (acc, obj) {
                                    var key = obj['codigo'];
                                    if (!acc[key]) {
                                    acc[key] = [];
                                    }
                                    acc[key].push(obj);
                                    return acc;
                                }, {});
                                var xyz = Object.values(ctas);
                                var cabecera = ['']
                                var saldosIniciales = ['Saldos al ']
                                var saldosFinales = ['Saldos al ']
                                var registros = []
                                var totalInicial = xyz.reduce((acc, val, i)=>{
                                    saldosIniciales.push(val[0].haber_bs - val[0].debe_bs);
                                    cabecera.push(val[0].nombre)
                                return acc + (val[0].haber_bs - val[0].debe_bs)  
                                }, 0)
                                saldosIniciales.push(totalInicial);
                                var totalFinal = 0
                                for (let j = 0; j < xyz.length; j++) {
                                    const cuenta = xyz[j];
                                    let subt = cuenta.reduce((acc, val)=> acc + (val.haber_bs - val.debe_bs),0)
                                    totalFinal+=subt
                                    saldosFinales.push(subt);
                                    for (let k = 0; k < cuenta.length; k++) {
                                        let datos = []
                                        if(k > 0) {
                                            datos[0]=cuenta[k].glosa
                                            datos[j+1] = cuenta[k].haber_bs - cuenta[k].debe_bs;
                                            datos[xyz.length + 1] = cuenta[k].haber_bs - cuenta[k].debe_bs;
                                        registros.push(datos)  
                                        }
                                    }
                                }
                                let reg = []
                                reg[0]="Resultado de la gestión"
                                reg[saldosFinales.length-1] = resultado[0].haber - resultado[0].debe
                                reg[saldosFinales.length] = resultado[0].haber - resultado[0].debe
                                registros.push(reg)
                                saldosFinales.push(totalFinal);
                                saldosFinales[saldosIniciales.length-2] += resultado[0].haber - resultado[0].debe
                                saldosFinales[saldosIniciales.length-1] += resultado[0].haber - resultado[0].debe
                                let data = []
                                cabecera.push('Total')
                                data.push(cabecera)
                                data.push(saldosIniciales)
                                data = data.concat(registros)
                                data.push(saldosFinales)
                                res.json({ hasError: false, message: 'Datos recuperados exitosamente', data: data})
                            })
                        }else{
                            res.json({ hasError: true, message: 'No se encontraron datos en el periodo seleccionado'})
                        }
                    })
                    .catch(e=> {
                        res.json({hasError:true, message: 'Error al obtener las cuentas de la base de datos. \n'+ e})
                    })
                }else{
                    res.json({hasError:true, message: 'No existen cuentas patrimoniales configuradas \n'})
                }
            })
            .catch(e=>{
                res.json({hasError:true, message: 'Error al verificar la configuracion de cuentas patrimoniales. \n'+ e})
            })
            
        })
        

}