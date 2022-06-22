module.exports = function (router, sequelize, Sequelize, Usuario, ActivosFijos, ActivosFijosValores, ActivosFijosConfiguracion, Clase, Producto, Inventario, MonedaTipoCambio, ensureAuthorizedlogged) {

    router.route('/activos/empresa/:id_empresa/pagina/:pagina/items-pagina/:items_pagina/subgrupo/:subgrupo/mes/:mes/year/:anio/codigo/:codigo/activo/:activo/vida/:vida_util/:tipoMes/:tipoAnio/gestion/:mes_gestion/:anio_gestion')
        .get(ensureAuthorizedlogged,function (req, res) {
            var mes = new Date().getMonth() + 1
            var year = new Date().getFullYear()
            var condicionProducto = { id_empresa: req.params.id_empresa, activo_fijo: true };
            var condicionValores = { eliminado: false }
            var condicionConfiguracion = { id_empresa: req.params.id_empresa }
            if (req.params.activo !== "0") {
                condicionProducto.nombre = { $like: req.params.activo + '%' }
            }
            if (req.params.vida_util !== "0") {
                condicionConfiguracion.vida_util = req.params.vida_util
            }
           
            if (req.params.subgrupo !== "0") {
                condicionProducto.id_subgrupo = req.params.subgrupo
            }
            if (req.params.codigo !== "0") {
                condicionProducto.codigo = req.params.codigo
            }

            var fechaUFVInicio= new Date(req.params.anio,parseInt(req.params.mes)-1,1);
            var fechaUFVFin= new Date(req.params.anio,parseInt(req.params.mes),0);
            // ufvs mes filtro
            var fechaUFVInicio1 = new Date(fechaUFVInicio); fechaUFVInicio1.setHours(0, 0, 0, 0, 0);
            var fechaUFVInicio2 = new Date(fechaUFVInicio); fechaUFVInicio2.setHours(23, 59, 59, 59);
            var fechaUFVFin1 = new Date(fechaUFVFin); fechaUFVFin1.setHours(0, 0, 0, 0, 0);
            var fechaUFVFin2 = new Date(fechaUFVFin); fechaUFVFin2.setHours(23, 59, 59, 59);
           
            var busquedaCambio = {};
            var fechaUFVInicioCambioTxt = "";
            var fechaUFVFinCambioTxt = "";
            if (req.params.tipoMes == 'true' && req.params.tipoAnio  == 'false') {
                // ufvs mes anterior filtro
                var fechaUFVInicioAnterior= new Date(req.params.anio,parseInt(req.params.mes)-2,1);
                var fechaUFVFinAnterior= new Date(req.params.anio,parseInt(req.params.mes)-1,0);
                var fechaUFVInicioAnterior1 = new Date(fechaUFVInicioAnterior); fechaUFVInicioAnterior1.setHours(0, 0, 0, 0, 0);
                var fechaUFVInicioAnterior2 = new Date(fechaUFVInicioAnterior); fechaUFVInicioAnterior2.setHours(23, 59, 59, 59);
                var fechaUFVFinAnterior1 = new Date(fechaUFVFinAnterior); fechaUFVFinAnterior1.setHours(0, 0, 0, 0, 0);
                var fechaUFVFinAnterior2 = new Date(fechaUFVFinAnterior); fechaUFVFinAnterior2.setHours(23, 59, 59, 59);

                busquedaCambio = {
                    where: {
                        $or: [
                        {
                            fecha: {
                                $between: [fechaUFVInicioAnterior1, fechaUFVInicioAnterior2]
                            }
                        },
                        {
                            fecha: {
                                $between: [fechaUFVFinAnterior1, fechaUFVFinAnterior2]
                            }
                        }
                        ],id_empresa:req.params.id_empresa
                    },
                    order: [['fecha', 'desc']]
                };
                fechaUFVInicioCambioTxt = fechaATexto(fechaUFVInicioAnterior1);
                fechaUFVFinCambioTxt = fechaATexto(fechaUFVFinAnterior1);
            }else if (req.params.tipoMes == 'false' && req.params.tipoAnio  == 'true') {
                // ufvs inicio gestion filtro
                var fechaUFVInicioGestion= new Date(req.params.anio,parseInt(1)-2,1);
                var fechaUFVFinGestion= new Date(req.params.anio,parseInt(1)-1,0);

                if (parseInt(req.params.mes)==1) {
                    fechaUFVInicioGestion= new Date(req.params.anio,parseInt(1)-2,1);
                    fechaUFVFinGestion= new Date(req.params.anio,parseInt(1)-1,0);
                }

                var fechaUFVInicioGestion1 = new Date(fechaUFVInicioGestion); fechaUFVInicioGestion1.setHours(0, 0, 0, 0, 0);
                var fechaUFVInicioGestion2 = new Date(fechaUFVInicioGestion); fechaUFVInicioGestion2.setHours(23, 59, 59, 59);
                var fechaUFVFinGestion1 = new Date(fechaUFVFinGestion); fechaUFVFinGestion1.setHours(0, 0, 0, 0, 0);
                var fechaUFVFinGestion2 = new Date(fechaUFVFinGestion); fechaUFVFinGestion2.setHours(23, 59, 59, 59);
                busquedaCambio = {
                    where: {
                        $or: [
                        {
                            fecha: {
                                $between: [fechaUFVInicioGestion1, fechaUFVInicioGestion2]
                            }
                        },
                        {
                            fecha: {
                                $between: [fechaUFVFinGestion1, fechaUFVFinGestion2]
                            }
                        }
                        ],id_empresa:req.params.id_empresa
                    },
                    order: [['fecha', 'desc']]
                };
                fechaUFVInicioCambioTxt = fechaATexto(fechaUFVInicioGestion1);
                fechaUFVFinCambioTxt = fechaATexto(fechaUFVFinGestion1);
            }else{
                // ufvs mes filtro
                busquedaCambio = {
                    where: {
                        $or: [{
                            fecha: {
                                $between: [fechaUFVInicio1, fechaUFVInicio2]
                            }
                        },
                        {
                            fecha: {
                                $between: [fechaUFVFin1, fechaUFVFin2]
                            }
                        }
                        ],id_empresa:req.params.id_empresa
                    },
                    order: [['fecha', 'desc']]
                };
                fechaUFVInicioCambioTxt = fechaATexto(fechaUFVInicio1);
                fechaUFVFinCambioTxt = fechaATexto(fechaUFVFin1);
            }

            // ufvs mes inicio gestion filtro
            var fechaUFVInicioConf= new Date(req.params.anio_gestion,parseInt(req.params.mes_gestion)-1,1);
            var fechaUFVFinConf= new Date(req.params.anio_gestion,parseInt(req.params.mes_gestion),0);
            // ufvs mes filtro
            var fechaUFVInicioConf1 = new Date(fechaUFVInicioConf); fechaUFVInicioConf1.setHours(0, 0, 0, 0, 0);
            var fechaUFVInicioConf2 = new Date(fechaUFVInicioConf); fechaUFVInicioConf2.setHours(23, 59, 59, 59);
            var fechaUFVFinConf1 = new Date(fechaUFVFinConf); fechaUFVFinConf1.setHours(0, 0, 0, 0, 0);
            var fechaUFVFinConf2 = new Date(fechaUFVFinConf); fechaUFVFinConf2.setHours(23, 59, 59, 59);
            busquedaCambioInicio = {
                where: {
                    $or: [{
                        fecha: {
                            $between: [fechaUFVInicio1, fechaUFVInicio2]
                        }
                    },
                    {
                        fecha: {
                            $between: [fechaUFVFin1, fechaUFVFin2]
                        }
                    }
                    ],id_empresa:req.params.id_empresa
                },
                order: [['fecha', 'desc']]
            };

            busquedaCambioConfig = {
                where: {
                    $or: [
                    {
                        fecha: {
                            $between: [fechaUFVInicioConf1, fechaUFVInicioConf2]
                        }
                    },
                    {
                        fecha: {
                            $between: [fechaUFVFinConf1, fechaUFVFinConf2]
                        }
                    }
                    ],id_empresa:req.params.id_empresa
                },
                order: [['fecha', 'desc']]
            };

            MonedaTipoCambio.findAll(
                busquedaCambioConfig
            ).then(function (MonedaCambioConfig) {
                if (MonedaCambioConfig.length>1) {
                    MonedaTipoCambio.findAll(
                        busquedaCambioInicio
                    ).then(function (MonedaCambioInicio) {
                        if (MonedaCambioInicio.length>1) {
                            MonedaTipoCambio.findAll(
                                busquedaCambio
                            ).then(function (MonedaCambio) {
                                var datosbusqueda = {
                                    distinct: true,
                                    where: {
                                        id_empresa: req.params.id_empresa,
                                        fecha_ingreso : {
                                            $lte: fechaUFVFin2
                                        }
                                    },
                                    include: [{ model: ActivosFijosValores, as: 'valores', where: condicionValores },
                                    {
                                        model: Producto, as: 'activo', attributes: ['nombre', 'codigo', 'id_subgrupo'],
                                        include: [{ model: Inventario, as: 'inventarios' },
                                        { model: Clase, as: 'subgrupo', include: [{ model: ActivosFijosConfiguracion, as: 'configuracion', where: condicionConfiguracion, required: false }] }], where: condicionProducto
                                    }]
                                };
                
                                var datosbusquedaPage = {
                                    offset: (req.params.items_pagina * (req.params.pagina - 1)), limit: req.params.items_pagina,
                                    where: {
                                        id_empresa: req.params.id_empresa,
                                        fecha_ingreso : {
                                            $lte: fechaUFVFin2
                                        }
                                    },
                                    include: [{ model: ActivosFijosValores, as: 'valores', where: condicionValores },
                                    {
                                        model: Producto, as: 'activo', attributes: ['nombre', 'codigo', 'id_subgrupo'],
                                        include: [{ model: Inventario, as: 'inventarios' },
                                        { model: Clase, as: 'subgrupo', include: [{ model: ActivosFijosConfiguracion, as: 'configuracion', where: condicionConfiguracion, required: false }] }], where: condicionProducto
                                    }]
                                };
        
                                if (req.params.items_pagina == 0) {
                                    delete datosbusquedaPage.offset;
                                    delete datosbusquedaPage.limit;
                                }
                
                                if (MonedaCambio.length === 2) {
                                    ActivosFijos.count(
                                        datosbusqueda
                                    ).then(function (activosCount) {
                                        ActivosFijos.findAll(
                                            datosbusquedaPage
                                        ).then(function (activos) {
                                            if (req.params.tipoMes == 'true' && req.params.tipoAnio  == 'false') {
                                                res.json({ activos: activos, paginas: Math.ceil(activosCount / req.params.items_pagina), ufvInicio: MonedaCambioInicio[1].ufv, ufvFin: MonedaCambioInicio[0].ufv, ufvInicioConfig: MonedaCambioConfig[1].ufv, ufvFinConfig: MonedaCambioConfig[0].ufv, ufvInicioAnterior: MonedaCambio[1].ufv, ufvFinAnterior: MonedaCambio[0].ufv, ufvInicioGestion: 0, ufvFinGestion: 0});
                                            }else if (req.params.tipoMes == 'false' && req.params.tipoAnio  == 'true') {
                                                res.json({ activos: activos, paginas: Math.ceil(activosCount / req.params.items_pagina), ufvInicio: MonedaCambioInicio[1].ufv, ufvFin: MonedaCambioInicio[0].ufv, ufvInicioConfig: MonedaCambioConfig[1].ufv, ufvFinConfig: MonedaCambioConfig[0].ufv, ufvInicioAnterior: 0, ufvFinAnterior: 0, ufvInicioGestion: MonedaCambio[1].ufv, ufvFinGestion: MonedaCambio[0].ufv});
                                            }else{
                                                res.json({ activos: activos, paginas: Math.ceil(activosCount / req.params.items_pagina), ufvInicio: MonedaCambioInicio[1].ufv, ufvFin: MonedaCambioInicio[0].ufv, ufvInicioConfig: MonedaCambioConfig[1].ufv, ufvFinConfig: MonedaCambioConfig[0].ufv, ufvInicioAnterior: 0, ufvFinAnterior: 0, ufvInicioGestion: 0, ufvFinGestion: 0});
                                            }
                                            
                                        }).catch(function (err) {
                                            res.json({ mensaje: err.stack, hasErr: true });
                                        });
                                    }).catch(function (err) {
                                        res.json({ mensaje: err.stack, hasErr: true });
                                    });
                                }else{
                                    if (MonedaCambio.length==1) {
                                        var fechaGetTxt = fechaATexto(MonedaCambio[0].fecha);
                                        if (fechaGetTxt !=  fechaUFVInicioCambioTxt) {
                                            res.json({ mensaje: "No se encuentra la información de la ufv <span style='color:#f8bb86'>"+fechaUFVInicioCambioTxt+"</span> es necesaria para cargar los activos fijos.", activos:[]});
                                        }else{
                                            res.json({ mensaje: "No se encuentra la información de la ufv <span style='color:#f8bb86'>"+fechaUFVFinCambioTxt+"</span> es necesaria para cargar los activos fijos.", activos:[]});
                                        }
                                    }else{
                                        res.json({ mensaje: "No se encuentra la información de las ufv's <span style='color:#f8bb86'>"+fechaUFVInicioCambioTxt+", "+fechaUFVFinCambioTxt+"</span> necesaria para cargar los activos fijos.", activos:[]});
                                    }
                                }
                            }).catch(function (err) {
                                res.json({ mensaje: (err.stack !== undefined) ? err.stack : err, hasErr: true });
                            });        
                        }else{
                            var fechaUFVInicioTxt = fechaATexto(fechaUFVInicio1);
                            var fechaUFVFinTxt = fechaATexto(fechaUFVFin1);
                            if (MonedaCambioInicio.length==1) {
                                var fechaGetTxt = fechaATexto(MonedaCambioInicio[0].fecha);
                                if (fechaGetTxt !=  fechaUFVInicioTxt) {
                                    res.json({ mensaje: "No se encuentra la información de la ufv <span style='color:#f8bb86'>"+fechaUFVInicioTxt+"</span> es necesaria para cargar los activos fijos.", activos:[]});
                                }else{
                                    res.json({ mensaje: "No se encuentra la información de la ufv <span style='color:#f8bb86'>"+fechaUFVFinTxt+"</span> es necesaria para cargar los activos fijos.", activos:[]});
                                }
                            }else{
                                res.json({ mensaje: "No se encuentra la información de las ufv's <span style='color:#f8bb86'>"+fechaUFVInicioTxt+", "+fechaUFVFinTxt+"</span> necesaria para cargar los activos fijos.", activos:[]});
                            }
                        }
                    });
                }else{
                    var fechaConfinicioTxt = fechaATexto(fechaUFVInicioConf1);
                    var fechaConfFinTxt = fechaATexto(fechaUFVFinConf1);
                    if (MonedaCambioConfig.length==1) {
                        var fechaGetTxt = fechaATexto(MonedaCambioConfig[0].fecha);
                        if (fechaGetTxt !=  fechaConfinicioTxt) {
                            res.json({ mensaje: "No se encuentra la información de la ufv <span style='color:#f8bb86'>"+fechaConfFinTxt+"</span> es necesaria para cargar los activos fijos.", activos:[]});
                        }else{
                            res.json({ mensaje: "No se encuentra la información de la ufv <span style='color:#f8bb86'>"+fechaConfinicioTxt+"</span> es necesaria para cargar los activos fijos.", activos:[]});
                        }
                    }else{
                        res.json({ mensaje: "No se encuentra la información de las ufv's <span style='color:#f8bb86'>"+fechaConfinicioTxt+" y "+fechaConfFinTxt+"</span> necesaria para cargar los activos fijos.", activos:[]});
                    }
                   
                }
            });
            
            
            
        });

    var fechaATexto = function (fecha) {
        fech = new Date(fecha)
        fecha = fech.getDate() + "/" + (fech.getMonth() + 1) + "/" + fech.getFullYear();
        return fecha
    }


    router.route('/activos/configuracion/empresa/:id_empresa/:id_usuario')
        .get(ensureAuthorizedlogged,function (req, res) {
            ActivosFijosConfiguracion.findAll({
                where: {
                    id_empresa: req.params.id_empresa
                },
                include: [{ model: Clase, as: 'subgrupo' }]
            }).then(function (configuracion) {
                res.json({ configuracion: configuracion });
            }).catch(function (err) {
                res.json({ mensaje: (err.stack !== undefined) ? err.stack : err, hasErr: true });
            });
        })

        .post(ensureAuthorizedlogged,function (req, res) {
            sequelize.transaction(function (t) {
                var promesas = []
                req.body.forEach(function (detalle) {
                    if (detalle.id) {
                        promesas.push(editarDetalleConfiguracion(detalle, t, req.params));
                    } else {
                        promesas.push(crearDetalleConfiguracion(detalle, t, req.params));
                    }
                })
                return Promise.all(promesas);
            }).then(function (result) {
                if (result) {
                    res.json({ mensaje: 'Configuración actualizada.' });
                } else {
                    res.json({ mensaje: 'Parece haber un error no determinado.', hasErr: true });
                }
            }).catch(function (err) {
                res.json({ mensaje: (err.stack !== undefined) ? err.stack : err, hasErr: true });
            })
        });

    router.route('/activos/revaluacion/:id_empresa/user/:id_usuario')
        .put(ensureAuthorizedlogged, function (req, res) {
            var fecha_revaluacion = new Date(req.body.fecha_revaluacion.split('/').reverse())
            var mesAnterior = new Date(fecha_revaluacion.getFullYear(), fecha_revaluacion.getMonth(), 0, 0, 0, 0, 0)
            var mesActual = new Date(fecha_revaluacion.getFullYear(), fecha_revaluacion.getMonth(), 1, 23, 59, 59, 999)
            MonedaTipoCambio.findAll({
                where: {
                    fecha: {
                        $between: [mesAnterior, mesActual]
                    },id_empresa:req.params.id_empresa
                }
            }).then(function (MonedaCambio) {
                var ufv1 = 0 //MonedaCambio[0].ufv
                var ufv2 = MonedaCambio[0].ufv
                ActivosFijosValores.create({
                    id_usuario: req.params.id_usuario,
                    id_activo: req.body.id,
                    mes: new Date(req.body.fecha_revaluacion.split('/').reverse()).getMonth(),
                    anio: new Date(req.body.fecha_revaluacion.split('/').reverse()).getFullYear(),
                    valor: req.body.valor_revaluacion,
                    incremento_actualizacion: ((req.body.valor_revaluacion / ufv1) * ufv2) - req.body.valor_revaluacion,
                    valor_actualizado: 0,
                    depreciacion_acumulada: 0,
                    incremento_actualizacion_depreciacion_acumulada: 0,
                    depreciacion_acumulada_actualizada: 0,
                    depreciacion: 0,
                    total_depreciacion_acumulada: 0,
                    valor_neto: 0,
                    eliminado: false
                }, {
                        where: {
                            id_activo: req.body.id
                        }
                    }).then(function (configuracion) {
                        res.json({ configuracion: configuracion });
                    }).catch(function (err) {
                        res.json({ mensaje: (err.stack !== undefined) ? err.stack : err, hasErr: true });
                    });
            })
        });

    function crearDetalleConfiguracion(detalle, t, params) {
        return ActivosFijosConfiguracion.create({
            id_usuario: params.id_usuario,
            id_empresa: params.id_empresa,
            id_subgrupo: detalle.subgrupo.id,
            vida_util: detalle.vida_util,
            factor: detalle.factor,
            eliminado: false
        }, { transaction: t }).then(function (res) {
            return new Promise(function (fulfill, reject) {
                fulfill('Detalle configuración creado.');
            });
        }).catch(function (err) {
            return new Promise(function (fulfill, reject) {
                reject((err.stack !== undefined) ? err.stack : err);
            });
        })
    };

    function editarDetalleConfiguracion(detalle, t, params) {
        return ActivosFijosConfiguracion.update({
            id_usuario: params.id_usuario,
            id_empresa: params.id_empresa,
            id_subgrupo: detalle.subgrupo.id,
            vida_util: detalle.vida_util,
            factor: detalle.factor,
            eliminado: detalle.eliminado
        }, { where: { id: detalle.id }, transaction: t }).then(function (res) {
            return new Promise(function (fulfill, reject) {
                fulfill('Detalle configuración actualizado.');
            });
        }).catch(function (err) {
            return new Promise(function (fulfill, reject) {
                reject((err.stack !== undefined) ? err.stack : err);
            });
        })
    }

    router.route('/activos/subgrupos/empresa/:id_empresa')
		.get(ensureAuthorizedlogged, function (req, res) {
			sequelize.query("SELECT gl_clase.id, gl_clase.nombre, gl_clase.habilitado \
            FROM \
                gl_clase \
                INNER JOIN gl_tipo ON gl_clase.tipo = gl_tipo.id \
                INNER JOIN agil_producto ON gl_clase.id = agil_producto.subgrupo \
            WHERE gl_clase.habilitado = TRUE AND gl_tipo.empresa = "+req.params.id_empresa+" \
                AND gl_tipo.nombre = 'SUBGRUPOS PRODUCTOS' \
                AND agil_producto.activo_fijo = TRUE \
            GROUP BY gl_clase.id", { type: sequelize.QueryTypes.SELECT })
				.then(function (dato) {
					res.json(dato);;
				});
        });
    
    router.route('/activos/monedasCambio/:mes/:anio/empresa/:id_empresa')
        .get(ensureAuthorizedlogged,function (req, res) {
            var fechaUFVInicio= new Date(req.params.anio,parseInt(req.params.mes)-1,1);
            var fechaUFVFin= new Date(req.params.anio,parseInt(req.params.mes),0);
            // ufvs mes filtro
            var fechaUFVInicio1 = fechaUFVInicio.setHours(0, 0, 0, 0, 0);
            var fechaUFVInicio2 = fechaUFVInicio.setHours(23, 59, 59, 59);
            var fechaUFVFin1 = fechaUFVFin.setHours(0, 0, 0, 0, 0);
            var fechaUFVFin2 = fechaUFVFin.setHours(23, 59, 59, 59);
            
            MonedaTipoCambio.findAll({
                where: {
                    $or: [{
                        fecha: {
                            $between: [fechaUFVInicio1, fechaUFVInicio2]
                        }
                    },
                    {
                        fecha: {
                            $between: [fechaUFVFin1, fechaUFVFin2]
                        }
                    }
                    ],id_empresa:req.params.id_empresa
                }
            }).then(function (MonedaCambio) {
                if (MonedaCambio.length === 2) {
                    res.json({ ufvInicio: MonedaCambio[0].ufv, ufvFin: MonedaCambio[1].ufv});
                } else {
                    throw new Error("No se encuentra la información de ufv's necesaria para actualizar los activos fijos.")
                }
            }).catch(function (err) {
                res.json({ mensaje: (err.stack !== undefined) ? err.stack : err, hasErr: true });
            });
        })

    router.route('/activos/mensual/:id_empresa')
        .get(ensureAuthorizedlogged,function (req, res) {
            var promesas = []
            var mes = new Date().getMonth() + 1
            var year = new Date().getFullYear()
            var initlastDate = new Date(year, mes - 1, 0)
            var initnextDate = new Date(year, mes, 0)
            var endlastDate = new Date(year, mes - 1, 0, 23, 59, 59, 999)
            var endnextDate = new Date(year, mes, 0, 23, 59, 59, 999)
            MonedaTipoCambio.findAll({
                where: {
                    $or: [{
                        fecha: {
                            $between: [initlastDate, endlastDate]
                        }
                    },
                    {
                        fecha: {
                            $between: [initnextDate, endnextDate]
                        }
                    }
                    ],id_empresa:req.params.id_empresa
                }
            }).then(function (MonedaCambio) {
                if (MonedaCambio.length === 2) {
                    var ufv1 = MonedaCambio[0].ufv;
                    var ufv2 = MonedaCambio[1].ufv;
                    sequelize.transaction(function (t) {
                        return ActivosFijos.findAll({
                            where: {
                                id_empresa: req.params.id_empresa,
                                $or: [{ ultima_actualizacion: { $between: [new Date((new Date().getMonth() > 0 ? new Date().getFullYear() : new Date().getFullYear() - 1), (new Date().getMonth() > 0 ? new Date().getMonth() - 1 : 11), 1, 0, 0), new Date(new Date().getFullYear(), (new Date().getMonth()), 0, 23, 59, 59, 999)] } }, { ultima_actualizacion: { $eq: null } }],
                                fecha_ingreso: { $notBetween: [new Date(new Date().getFullYear(), new Date().getMonth(), 1, 0, 0, 0, 0), new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59, 999)] }
                            },
                            include: [{ model: ActivosFijosValores, as: 'valores', where: { anio: new Date().getFullYear(), $or: [{ mes: (new Date().getMonth()) }, { mes: (new Date().getMonth() + 1) }] } }, { model: Producto, as: 'activo', attributes: ['nombre', 'codigo', 'id_subgrupo'], include: [{ model: Inventario, as: 'inventarios' }, { model: Clase, as: 'subgrupo', include: [{ model: ActivosFijosConfiguracion, as: 'configuracion', required: false }] }] }],
                            transaction: t
                        }).then(function (activosFijos) {
                            if (activosFijos.length > 0) {
                                for (var index = 0; index < activosFijos.length; index++) {
                                    promesas.push(crearValoresActivosFijos(activosFijos[index], t, mes, year, ufv1, ufv2))
                                }
                            } else {
                                var po = new Promise(function (fulfill, reject) {
                                    fulfill({ mensaje: 'No hay activos fijos para actualizar.', normal: true })
                                })
                                promesas.push(po)
                            }
                            return Promise.all(promesas)
                        }).catch(function (err) {
                            return new Promise(function (fulfill, reject) {
                                reject((err.stack !== undefined) ? err.stack : err);
                            });
                        });
                    }).then(function (result) {
                        if (result !== undefined) {
                            var mensaje = ''
                            var err = false
                            if (result.length > 0) {
                                result.forEach(function (obj) {
                                    if (obj.err) {
                                        mensaje += '|' + obj.mensaje + ' | ';
                                        err = true;
                                    }
                                })
                                if (err) {
                                    res.json({ mensaje: mensaje, hasErr: true })
                                } else {

                                }
                                res.json({ mensaje: 'No es necesario actualizar los activos fijos' })
                            } else {
                                res.json({ mensaje: 'No es necesario actualizar los activos fijos' })
                            }
                        }
                    }).catch(function (err) {
                        res.json({ mensaje: (err.stack !== undefined) ? err.stack : err, hasErr: true });
                    });
                } else {
                    throw new Error("No se encuentra la información de ufv's necesaria para actualizar los activos fijos.")
                }
            }).catch(function (err) {
                res.json({ mensaje: (err.stack !== undefined) ? err.stack : err, hasErr: true });
            });
        })
    function crearValoresActivosFijos(activo, t, mes, year, ufv1, ufv2) {
        if (activo.valores.length > 0 && activo.valores.length == 1) {
            var valorAnterior = activo.valores.filter(function (val) {
                return ((val.dataValues.mes === mes - 1) && val.dataValues.anio === year);
            })[0];
        } else {
            return new Promise(function (fulfill, reject) {
                if (activo.valores.length > 2) {
                    reject({ mensaje: 'El activo fijo con código "' + activo.activo.codigo + '" contiene datos en conflicto. No se puede actualizar la depreciación.', err: true });
                } else if (activo.valores.length == 2) {
                    fulfill({ mensaje: 'El activo fijo con código "' + activo.activo.codigo + '" ya fué depreciado el mes actual.', normal: true });
                }
            });
        }

        if (valorAnterior && activo.activo.subgrupo.configuracion && activo.activo.inventarios.length > 0) {
            return ActivosFijosValores.create({
                id_usuario: activo.id_usuario,
                id_activo: activo.id,
                mes: new Date().getMonth() + 1,
                anio: new Date().getFullYear(),
                valor: valorAnterior.dataValues.valor,
                incremento_actualizacion: ((valorAnterior.dataValues.valor / ufv1) * ufv2) - valorAnterior.dataValues.valor,
                valor_actualizado: (((valorAnterior.dataValues.valor / ufv1) * ufv2) - valorAnterior.dataValues.valor) + valorAnterior.dataValues.valor,
                depreciacion_acumulada: valorAnterior.dataValues.total_depreciacion_acumulada,
                incremento_actualizacion_depreciacion_acumulada: ((valorAnterior.dataValues.depreciacion_acumulada / ufv1) * ufv2) - valorAnterior.dataValues.total_depreciacion_acumulada,
                depreciacion_acumulada_actualizada: valorAnterior.dataValues.total_depreciacion_acumulada + (((valorAnterior.dataValues.depreciacion_acumulada / ufv1) * ufv2) - valorAnterior.dataValues.total_depreciacion_acumulada),
                depreciacion: ((((valorAnterior.dataValues.valor / ufv1) * ufv2) - valorAnterior.dataValues.valor) + valorAnterior.dataValues.valor) / activo.activo.subgrupo.configuracion.factor / 12,
                total_depreciacion_acumulada: (valorAnterior.dataValues.total_depreciacion_acumulada + (((valorAnterior.dataValues.depreciacion_acumulada / ufv1) * ufv2) - valorAnterior.dataValues.total_depreciacion_acumulada)) + (((((valorAnterior.dataValues.valor / ufv1) * ufv2) - valorAnterior.dataValues.valor) + valorAnterior.dataValues.valor) / activo.activo.subgrupo.configuracion.factor / 12),
                valor_neto: ((((valorAnterior.dataValues.valor / ufv1) * ufv2) - valorAnterior.dataValues.valor) + valorAnterior.dataValues.valor) - ((valorAnterior.dataValues.total_depreciacion_acumulada + (((valorAnterior.dataValues.depreciacion_acumulada / ufv1) * ufv2) - valorAnterior.dataValues.total_depreciacion_acumulada)) + (((((valorAnterior.dataValues.valor / ufv1) * ufv2) - valorAnterior.dataValues.valor) + valorAnterior.dataValues.valor) / activo.activo.subgrupo.configuracion.factor / 12)),
                eliminado: false
            }, { transaction: t }).then(function (valorCreado) {
                var fechaActualizacion = new Date(year, mes - 1, new Date().getDate(), 0, 0, 0, 0)
                return ActivosFijos.update({
                    ultima_actualizacion: fechaActualizacion
                }, {
                        where: { id: activo.id }, transaction: t
                    }).then(function (activoActualizado) {
                        return new Promise(function (fulfill, reject) {
                            fulfill('Actualizacion de activo fijo: correcta...')
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
            return new Promise(function (fulfill, reject) {
                fulfill('El activo codigo "' + activo.activo.codigo + '" no tiene configuración...')
            });
        }
    }
}